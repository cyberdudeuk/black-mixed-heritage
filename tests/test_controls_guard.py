#!/usr/bin/env python3
"""Checks of the controls guard: each control must FAIL on a pull request that breaks it, and a harmless
change must PASS. A guard that cannot fail proves nothing.

Usage: python3 tests/test_controls_guard.py   (uses a temporary clone; leaves the repository unchanged)
"""
import json, os, re, shutil, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GUARD = os.path.join(ROOT, "scripts", "controls_guard.py")


def run(cmd, cwd):
    return subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, check=False)


def main():
    tmp = tempfile.mkdtemp()
    fails = 0
    try:
        repo = os.path.join(tmp, "r")
        run(["git", "clone", "-q", "--no-hardlinks", ROOT, repo], tmp)
        run(["git", "config", "user.email", "test@example.invalid"], repo)
        run(["git", "config", "user.name", "guard test"], repo)
        base = run(["git", "rev-parse", "HEAD"], repo).stdout.strip()

        def case(name, edit, labels, want_fail, want_text):
            nonlocal fails
            run(["git", "checkout", "-q", "-B", "t", base], repo)
            edit(repo)
            run(["git", "commit", "-q", "-am", name], repo)
            head = run(["git", "rev-parse", "HEAD"], repo).stdout.strip()
            r = run([sys.executable, GUARD, base, head, *labels], repo)
            failed = r.returncode != 0
            if failed != want_fail or want_text not in r.stdout:
                fails += 1
                print(f"WRONG: {name} (exit {r.returncode}, expected {'fail' if want_fail else 'pass'} with '{want_text}')")
                print(r.stdout[-600:])
            else:
                print(f"{'caught' if want_fail else 'passed'}: {name}")

        def sub(path, pat, rep, count=1):
            def f(repo):
                p = os.path.join(repo, path)
                s = open(p, encoding="utf8").read()
                t = re.sub(pat, rep, s, count=count, flags=re.M)
                assert t != s, f"injection did not apply to {path}"
                open(p, "w", encoding="utf8").write(t)
            return f

        def bump_package_only(repo):
            p = os.path.join(repo, "package.json")
            d = json.load(open(p))
            d["version"] = "99.0.0"
            json.dump(d, open(p, "w"), indent=2)

        def lower_all(repo):
            for path, pat, rep in (("package.json", r'"version": "[\d.]+"', '"version": "0.0.1"'),
                                   ("package-lock.json", r'"version": "[\d.]+"', '"version": "0.0.1"'),
                                   ("codemeta.json", r'"version": "[\d.]+"', '"version": "0.0.1"'),
                                   ("CITATION.cff", r'^version: .*$', 'version: "0.0.1"')):
                sub(path, pat, rep)(repo)
            p = os.path.join(repo, "src", "patch_v15.py")
            s = open(p, encoding="utf8").read()
            cur = re.findall(r'version:"([0-9.]+)",docId:"BHM26-PSH-', s)[-1]
            open(p, "w", encoding="utf8").write(s.replace(f'version:"{cur}",docId:"BHM26-PSH-', 'version:"0.0.1",docId:"BHM26-PSH-'))

        case("G1 a workflow changed without the owner's label",
             sub(".github/workflows/checks.yml", r"^name: Checks$", "name: Checks (weakened)"), [], True, "G1 control files changed")
        case("G1 the same change with the owner's label",
             sub(".github/workflows/checks.yml", r"^name: Checks$", "name: Checks (reviewed)"), ["controls-approved"], False, "G1 control files changed")
        case("G2 a line removed from a validator",
             sub("tests/validate_data.py", r"^.*\S.*\n", ""), [], True, "G2 lines removed from checks")
        case("G3 a self-check removed",
             sub_first_check(), [], True, "G3 self-check registrations")
        case("G4 an injected-defect test removed (label cannot excuse it)",
             sub("tests/negative.sh", r'^(\s*)expect_fail "', r"\1true # removed "), ["controls-approved"], True, "G4 injected-defect tests")
        case("G5 the version places disagree",
             bump_package_only, [], True, "G5 version places disagree")
        case("G5 the version goes down",
             lower_all, [], True, "G5 version went down")
        case("a harmless documentation change",
             sub("CONTRIBUTING.md", r"\Z", "\n"), [], False, "controls guard: passed")
        fails += audit_cases(tmp)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)
    print(f"controls guard tests: {'FAILED' if fails else 'all caught'}")
    return 1 if fails else 0


def audit_cases(tmp):
    """The controls audit must report each kind of weakening, and stay quiet when the rules match."""
    audit = os.path.join(ROOT, "scripts", "controls_audit.py")
    rec = os.path.join(ROOT, ".github", "rulesets")
    main_rs = json.load(open(os.path.join(rec, "main.json")))
    tags_rs = json.load(open(os.path.join(rec, "release-tags.json")))
    fails = 0

    def check(name, rules, rulesets, want_fail, want_text):
        a, b = os.path.join(tmp, "a.json"), os.path.join(tmp, "b.json")
        json.dump(rules, open(a, "w"))
        json.dump(rulesets, open(b, "w"))
        r = subprocess.run([sys.executable, audit, a, b, rec], capture_output=True, text=True, check=False)
        if (r.returncode != 0) != want_fail or want_text not in r.stdout:
            print(f"WRONG: audit {name} (exit {r.returncode})")
            print(r.stdout[-500:])
            return 1
        print(f"{'caught' if want_fail else 'passed'}: audit {name}")
        return 0

    good_main = [dict(r) for r in main_rs["rules"]]
    live = [dict(main_rs, bypass_actors=None), dict(tags_rs, bypass_actors=None)]
    fails += check("rules match", good_main, live, False, "Every recorded rule is enforced")
    dropped = json.loads(json.dumps(good_main))
    for r in dropped:
        if r["type"] == "required_status_checks":
            r["parameters"]["required_status_checks"] = [c for c in r["parameters"]["required_status_checks"] if c["context"] != "accessibility"]
    fails += check("a required check dropped", dropped, live, True, "required checks not enforced: accessibility")
    merges = json.loads(json.dumps(good_main))
    for r in merges:
        if r["type"] == "pull_request":
            r["parameters"]["allowed_merge_methods"] = ["merge", "squash"]
    fails += check("merge commits allowed again", merges, live, True, "merge methods other than squash")
    bypass = [dict(main_rs, bypass_actors=[{"actor_type": "RepositoryRole", "actor_id": 5}]), live[1]]
    fails += check("a bypass added", good_main, bypass, True, "has bypass actors")
    fails += check("tag ruleset removed", good_main, live[:1], True, "no active tag ruleset")
    return fails


def sub_first_check():
    def f(repo):
        for dirpath, _, files in os.walk(os.path.join(repo, "src")):
            for name in sorted(files):
                p = os.path.join(dirpath, name)
                if not name.endswith((".js", ".html", ".py")):
                    continue
                s = open(p, encoding="utf8").read()
                if "CHECKS.push(" in s:
                    open(p, "w", encoding="utf8").write(s.replace("CHECKS.push(", "CHECKS_REMOVED(", 1))
                    return
        raise AssertionError("no self-check found to remove")
    return f


if __name__ == "__main__":
    sys.exit(main())
