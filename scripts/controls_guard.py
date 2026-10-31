#!/usr/bin/env python3
"""Controls guard: the second line of defence on every pull request.

Runs from the BASE branch (the `controls-guard` workflow uses pull_request_target), so a pull request
cannot weaken or switch off the checks that judge it. It only READS the pull request's files with
`git show` and `git diff`; it never runs code from the pull request.

Usage: python3 scripts/controls_guard.py BASE_SHA HEAD_SHA [LABEL ...]   (or labels as JSON in GUARD_LABELS)
Exit 0 = pass, 1 = a control failed (each failure is printed as a GitHub error annotation).

G1  Control files (workflows, rulesets, code owners, Dependabot, this guard) changed  -> needs the owner's
    `controls-approved` label. Claude never applies that label; only the repository owner does.
G2  A line removed from a check or validator in tests/                                -> needs the label.
G3  Fewer in-page self-checks (CHECKS.push) than on the base branch                   -> fails.
G4  Fewer injected defects in tests/negative.sh than on the base branch               -> fails.
G5  Version changed but not increased, or the five version places disagree            -> fails.
"""
import json, os, re, subprocess, sys

APPROVAL_LABEL = "controls-approved"
CONTROL_PATHS = (".github/workflows/", ".github/rulesets/", ".github/CODEOWNERS", ".github/dependabot.yml",
                 "scripts/controls_guard.py", "tests/test_controls_guard.py")
CHECK_FILES = re.compile(r"^tests/[^/]+\.(py|mjs|sh)$")


def git(*args):
    return subprocess.run(["git", *args], capture_output=True, text=True, check=False).stdout


def show(sha, path):
    r = subprocess.run(["git", "show", f"{sha}:{path}"], capture_output=True, text=True, check=False)
    return r.stdout if r.returncode == 0 else None


def count_selfchecks(sha):
    n = 0
    for path in git("ls-tree", "-r", "--name-only", sha, "--", "src").split():
        if path.endswith((".js", ".html", ".py")):
            n += (show(sha, path) or "").count("CHECKS.push(")
    return n


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

    changed = git("diff", "--name-only", f"{base}...{head}").split()
    control = [p for p in changed if p.startswith(CONTROL_PATHS)]
    if control:
        (notes if approved else errors).append(
            "G1 control files changed: " + ", ".join(control) +
            ("" if approved else f" (needs the owner's '{APPROVAL_LABEL}' label)"))

    weakened = []
    for line in git("diff", "--numstat", f"{base}...{head}").splitlines():
        parts = line.split("\t")
        if len(parts) == 3 and CHECK_FILES.match(parts[2]) and parts[1] not in ("0", "-"):
            weakened.append(f"{parts[2]} (-{parts[1]} lines)")
    if weakened:
        (notes if approved else errors).append(
            "G2 lines removed from checks: " + ", ".join(weakened) +
            ("" if approved else f" (needs the owner's '{APPROVAL_LABEL}' label)"))

    b, h = count_selfchecks(base), count_selfchecks(head)
    (errors if h < b else notes).append(f"G3 self-check registrations: base {b}, pull request {h}")

    b, h = count_injections(base), count_injections(head)
    (errors if h < b else notes).append(f"G4 injected-defect tests: base {b}, pull request {h}")

    vb, vh = versions(base), versions(head)
    places = {k: v for k, v in vh.items() if v is not None}
    if len(set(places.values())) > 1:
        errors.append("G5 version places disagree: " + ", ".join(f"{k}={v}" for k, v in places.items()))
    old, new = semver(vb.get("package.json")), semver(vh.get("package.json"))
    if old and new and new != old:
        if new < old:
            errors.append(f"G5 version went down: {vb['package.json']} -> {vh['package.json']}")
        else:
            v = vh["package.json"]
            if v not in (show(head, "CHANGELOG.md") or ""):
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
