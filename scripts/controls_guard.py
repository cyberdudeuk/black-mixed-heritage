#!/usr/bin/env python3
"""Controls guard: the second line of defence on every pull request.

Runs from the BASE branch (the `controls-guard` workflow uses pull_request_target), so a pull request
cannot weaken or switch off the checks that judge it. It only READS the pull request's files with
`git show` and `git diff`; it never runs code from the pull request.

Usage: python3 scripts/controls_guard.py BASE_SHA HEAD_SHA [LABEL ...]   (or labels as JSON in GUARD_LABELS)
Exit 0 = pass, 1 = a control failed (each failure is printed as a GitHub error annotation).

G0  The pull request does not contain the latest main                                -> fails ("update the branch").
G1  Control files changed (workflows, actions, rulesets, code owners, Dependabot, the guard and audit,
    the npm scripts CI runs)                                                          -> needs the owner's label.
    Exception (ADR 0011): an edit to the shell commands of an existing workflow that cannot write code, holds
    no secrets and produces no required check passes without the label, as long as every changed line is
    inside a step and touches no action, permission, trigger, token, input, condition or ${{ }} expression.
G2  Any change to anything under tests/ (additions too: one added line can disable a check) -> needs the label.
    The label counts only when applied after the latest push: the workflow ignores it on a push event and
    removes it, so the owner approves exactly the commits they saw. Claude never applies that label.
G3  Fewer in-page self-checks (CHECKS.push) than on the base branch                   -> fails.
G4  Fewer injected defects in tests/negative.sh than on the base branch               -> fails.
G5  Version changed but not increased, or the five version places disagree            -> fails.
"""
import difflib, json, os, re, subprocess, sys

APPROVAL_LABEL = "controls-approved"
CONTROL_PATHS = (".github/workflows/", ".github/actions/", ".github/rulesets/", ".github/CODEOWNERS",
                 ".github/dependabot.yml", "scripts/controls_guard.py", "scripts/controls_audit.py")
CHECK_PATHS = ("tests/",)

# ADR 0011: what a "low-risk workflow edit" may not touch. Anything that matches needs the owner's label.
NEVER_LOW_RISK = (".github/workflows/controls-guard.yml", ".github/workflows/controls-audit.yml")
STRONG_WRITE = re.compile(r"\b(contents|actions|pull-requests|id-token|packages|pages|deployments|statuses|checks|"
                          r"security-events|attestations)\s*:\s*write\b|write-all")
RISKY_LINE = re.compile(r"\$\{\{|\buses\s*:|\bpermissions\b|\bwrite\b|secrets|token|\benv\s*:|\bwith\s*:|"
                        r"persist-credentials|\bif\s*:|continue-on-error|\bshell\s*:|\bservices\s*:|\bcontainer\s*:|"
                        r"pull_request_target|workflow_run|\bon\s*:", re.I)
STEP_INDENT = 6  # steps sit at six spaces under jobs.<id>.steps; job and top-level keys are shallower


def git(*args):
    return subprocess.run(["git", *args], capture_output=True, text=True, check=False).stdout


def show(sha, path):
    r = subprocess.run(["git", "show", f"{sha}:{path}"], capture_output=True, text=True, check=False)
    return r.stdout if r.returncode == 0 else None


def changed_paths(base, head):
    """Every path touched, both sides of a rename, unquoted (a non-ASCII name must not slip past a prefix test)."""
    out = subprocess.run(["git", "-c", "core.quotePath=false", "diff", "--no-renames", "--name-only", "-z",
                          f"{base}...{head}"], capture_output=True, check=False).stdout
    return [p.decode("utf8", "surrogateescape") for p in out.split(b"\0") if p]


_COMMENTS = re.compile(r"/\*.*?\*/|(?:^|(?<=\s))//[^\n]*|^\s*#[^\n]*", re.S | re.M)


def count_selfchecks(sha):
    """Real CHECKS.push( calls in src/, with comments removed so a commented-out or quoted-in-a-comment check
    does not count. Limit: a check whose body is emptied still counts; the in-page checks and their
    deliberate-break tests (tests/negative.sh) cover what each check does."""
    n = 0
    for path in git("ls-tree", "-r", "--name-only", sha, "--", "src").split():
        if path.endswith((".js", ".html", ".py", ".mjs")):
            n += len(re.findall(r"\bCHECKS\.push\(", _COMMENTS.sub("", show(sha, path) or "")))
    return n


def npm_scripts(sha):
    try:
        return json.loads(show(sha, "package.json") or "{}").get("scripts")
    except ValueError:
        return "unreadable"


def count_injections(sha):
    return len(re.findall(r'^\s*expect_fail "', show(sha, "tests/negative.sh") or "", re.M))


def semver(v):
    m = re.fullmatch(r"(\d+)\.(\d+)\.(\d+)", v or "")
    return tuple(int(x) for x in m.groups()) if m else None


def versions(sha):
    """The version as each of the five places states it (None where a file is missing)."""
    out = {}
    try:
        out["package.json"] = json.loads(show(sha, "package.json") or "{}").get("version")
    except ValueError:
        out["package.json"] = None
    try:
        out["package-lock.json"] = json.loads(show(sha, "package-lock.json") or "{}").get("version")
    except ValueError:
        out["package-lock.json"] = None
    m = re.search(r"^version:\s*\"?([\d.]+)", show(sha, "CITATION.cff") or "", re.M)
    out["CITATION.cff"] = m.group(1) if m else None
    try:
        out["codemeta.json"] = json.loads(show(sha, "codemeta.json") or "{}").get("version")
    except ValueError:
        out["codemeta.json"] = None
    found = re.findall(r'version:"([0-9.]+)",docId:"BHM26-PSH-', show(sha, "src/patch_v15.py") or "")
    out["src/patch_v15.py"] = found[-1] if found else None  # the last entry is the current version
    return out


def required_contexts(sha):
    """The status checks the main ruleset requires, as recorded on the base branch."""
    try:
        rules = json.loads(show(sha, ".github/rulesets/main.json") or "{}").get("rules", [])
    except ValueError:
        return None
    out = []
    for r in rules:
        if r.get("type") == "required_status_checks":
            out += [c.get("context", "") for c in r.get("parameters", {}).get("required_status_checks", [])]
    return out


def job_labels(text):
    """Job ids (two spaces under jobs:) and job names (four spaces), which GitHub uses as check names."""
    labels, in_jobs = [], False
    for line in text.splitlines():
        if re.match(r"^jobs\s*:", line):
            in_jobs = True
            continue
        if in_jobs and re.match(r"^\S", line):
            in_jobs = False
        if in_jobs:
            m = re.match(r"^  ([A-Za-z0-9_-]+)\s*:\s*$", line) or re.match(r"^    name\s*:\s*[\"']?([^\"'#]+?)[\"']?\s*(#.*)?$", line)
            if m:
                labels.append(m.group(1).strip())
    return labels


def low_risk_workflow(base, head, path, required):
    """True when this workflow edit can pass without the owner's label (ADR 0011). Fails closed: anything it cannot
    show to be harmless needs the label."""
    if required is None or not path.startswith(".github/workflows/") or path in NEVER_LOW_RISK:
        return False
    if not path.endswith((".yml", ".yaml")):
        return False
    b, h = show(base, path), show(head, path)
    if b is None or h is None:  # added, deleted or renamed workflows always need the label
        return False
    for text in (b, h):
        if STRONG_WRITE.search(text) or "secrets." in text:
            return False
        for job in job_labels(text):
            if any(c == job or c.startswith(job + " (") for c in required):
                return False
    for line in difflib.ndiff(b.splitlines(), h.splitlines()):
        if not line.startswith(("+ ", "- ")):
            continue
        text = line[2:]
        if not text.strip() or text.lstrip().startswith("#"):
            continue
        if len(text) - len(text.lstrip(" ")) < STEP_INDENT or RISKY_LINE.search(text) or "\t" in text:
            return False
    return True


def main(argv):
    if len(argv) < 3:
        print(__doc__)
        return 2
    base, head, labels = argv[1], argv[2], set(argv[3:])
    # in the workflow the labels arrive as JSON in an environment variable, never through the shell
    try:
        labels |= set(json.loads(os.environ.get("GUARD_LABELS") or "[]"))
    except ValueError:
        print("::error::GUARD_LABELS is not valid JSON")
        return 1
    approved = APPROVAL_LABEL in labels
    errors, notes = [], []

    if subprocess.run(["git", "merge-base", "--is-ancestor", base, head], check=False).returncode != 0:
        print("::error::G0 the pull request does not contain the latest main: update the branch, then the guard re-runs")
        print("controls guard: FAILED")
        return 1

    changed = changed_paths(base, head)
    control = [p for p in changed if p.startswith(CONTROL_PATHS)]
    required = required_contexts(base)
    low_risk = [p for p in control if low_risk_workflow(base, head, p, required)]
    control = [p for p in control if p not in low_risk]
    if low_risk:
        notes.append("G1 low-risk workflow edit, no label needed (ADR 0011): " + ", ".join(low_risk))
    if npm_scripts(base) != npm_scripts(head):
        control.append("package.json (scripts)")
    if control:
        (notes if approved else errors).append(
            "G1 control files changed: " + ", ".join(control) +
            ("" if approved else f" (needs the owner's '{APPROVAL_LABEL}' label)"))

    touched = [p for p in changed if p.startswith(CHECK_PATHS)]
    if touched:
        (notes if approved else errors).append(
            "G2 checks changed: " + ", ".join(touched) +
            ("" if approved else f" (needs the owner's '{APPROVAL_LABEL}' label)"))

    b, h = count_selfchecks(base), count_selfchecks(head)
    (errors if h < b else notes).append(f"G3 self-check registrations: base {b}, pull request {h}")

    b, h = count_injections(base), count_injections(head)
    (errors if h < b else notes).append(f"G4 injected-defect tests: base {b}, pull request {h}")

    vb, vh = versions(base), versions(head)
    lost = [k for k in vb if vb[k] is not None and vh.get(k) is None]
    if lost:
        errors.append("G5 the version can no longer be read from: " + ", ".join(lost))
    places = {k: v for k, v in vh.items() if v is not None}
    if len(set(places.values())) > 1:
        errors.append("G5 version places disagree: " + ", ".join(f"{k}={v}" for k, v in places.items()))
    old, new = semver(vb.get("package.json")), semver(vh.get("package.json"))
    if old and new and new != old:
        if new < old:
            errors.append(f"G5 version went down: {vb['package.json']} -> {vh['package.json']}")
        else:
            v = vh["package.json"]
            if not re.search(rf"^\| {re.escape(v)} \|", show(head, "CHANGELOG.md") or "", re.M):
                errors.append(f"G5 CHANGELOG.md has no entry for {v}")
            if not re.search(rf"^## {re.escape(v)}\b", show(head, "docs/release-notes.md") or "", re.M):
                errors.append(f"G5 docs/release-notes.md has no '## {v}' section")
            notes.append(f"G5 version {vb['package.json']} -> {v}")

    for n in notes:
        print("ok:", n)
    for e in errors:
        print(f"::error::{e}")
    print("controls guard:", "FAILED" if errors else "passed")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
