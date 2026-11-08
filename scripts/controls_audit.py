#!/usr/bin/env python3
"""Controls audit: do the rules GitHub enforces match the rulesets recorded in .github/rulesets/?

Usage: python3 scripts/controls_audit.py ENFORCED_MAIN.json RULESETS.json .github/rulesets
  ENFORCED_MAIN.json  output of GET /repos/{repo}/rules/branches/main
  RULESETS.json       a JSON array of GET /repos/{repo}/rulesets/{id} for every ruleset
Prints a Markdown report; exit 0 when everything recorded is enforced, 1 on drift.
A ruleset may be stricter than recorded; it may not be weaker.
Bypass actors are visible only to a token that can administer rulesets. Without one (the default
GITHUB_TOKEN) the report says bypass is UNVERIFIED rather than passing it.
"""
import glob, json, os, sys


def contexts(rule):
    return {c["context"] for c in (rule.get("parameters") or {}).get("required_status_checks", [])}


def compare(recorded, enforced_rules, where):
    problems = []
    for want in recorded["rules"]:
        have = [r for r in enforced_rules if r["type"] == want["type"]]
        if not have:
            problems.append(f"{where}: rule `{want['type']}` is not enforced")
            continue
        if want["type"] == "required_status_checks":
            missing = contexts(want) - set().union(*(contexts(r) for r in have))
            if missing:
                problems.append(f"{where}: required checks not enforced: {', '.join(sorted(missing))}")
            if want["parameters"].get("strict_required_status_checks_policy") and not any(
                    (r.get("parameters") or {}).get("strict_required_status_checks_policy") for r in have):
                problems.append(f"{where}: branches are not required to be up to date before merging")
        if want["type"] == "pull_request":
            p = [r.get("parameters") or {} for r in have]
            if want["parameters"].get("required_review_thread_resolution") and not any(x.get("required_review_thread_resolution") for x in p):
                problems.append(f"{where}: open review threads do not block merging")
            if want["parameters"].get("dismiss_stale_reviews_on_push") and not any(x.get("dismiss_stale_reviews_on_push") for x in p):
                problems.append(f"{where}: approvals are not dismissed when new commits are pushed")
            if not any(x.get("required_approving_review_count", 0) >= want["parameters"].get("required_approving_review_count", 0) for x in p):
                problems.append(f"{where}: fewer approving reviews required than recorded")
            allowed = set(want["parameters"].get("allowed_merge_methods", []))
            if allowed and not any(set(x.get("allowed_merge_methods", ["merge", "squash", "rebase"])) <= allowed for x in p):
                problems.append(f"{where}: merge methods other than {', '.join(sorted(allowed))} are allowed")
        if want["type"] == "code_scanning":
            order = {"none": 0, "errors": 1, "errors_and_warnings": 2, "all": 3}
            sec = {"none": 0, "critical": 1, "high_or_higher": 2, "medium_or_higher": 3, "all": 4}
            tools = [t for r in have for t in (r.get("parameters") or {}).get("code_scanning_tools", [])]
            for wt in want["parameters"]["code_scanning_tools"]:
                ok = any(t.get("tool") == wt["tool"]
                         and order.get(t.get("alerts_threshold"), 0) >= order[wt["alerts_threshold"]]
                         and sec.get(t.get("security_alerts_threshold"), 0) >= sec[wt["security_alerts_threshold"]] for t in tools)
                if not ok:
                    problems.append(f"{where}: {wt['tool']} code scanning thresholds are weaker than recorded")
    return problems


def main(argv):
    enforced_main = json.load(open(argv[1]))
    rulesets = json.load(open(argv[2]))
    problems, unknown = [], []
    for path in sorted(glob.glob(os.path.join(argv[3], "*.json"))):
        recorded = json.load(open(path))
        name = os.path.basename(path)
        if recorded["target"] == "branch":
            problems += compare(recorded, enforced_main, f"`main` ({name})")
        live = [r for r in rulesets if r.get("target") == recorded["target"] and r.get("enforcement") == "active"
                and set(recorded["conditions"]["ref_name"]["include"]) <= set(((r.get("conditions") or {}).get("ref_name") or {}).get("include", []))]
        if not live:
            problems.append(f"{name}: no active {recorded['target']} ruleset covers {', '.join(recorded['conditions']['ref_name']['include'])}")
        elif recorded["target"] == "tag":
            problems += compare(recorded, [x for r in live for x in r.get("rules", [])], f"tags ({name})")
        for r in live:
            if "bypass_actors" not in r:
                unknown.append(f"{name}: bypass actors of '{r.get('name')}' are not visible to this token")
            elif r.get("bypass_actors"):
                problems.append(f"{name}: ruleset '{r.get('name')}' has bypass actors; recorded rulesets have none")
    print("## Controls audit\n")
    if problems:
        print("The rules GitHub enforces are weaker than those recorded in `.github/rulesets/`:\n")
        print("\n".join(f"- {p}" for p in problems))
        print("\nFix: Settings → Rules → Rulesets → import or edit to match the recorded file. Workflows and Claude cannot change settings.")
        return 1
    print("Every recorded rule is enforced.")
    if unknown:
        print("\nUNVERIFIED (not a pass): " + "; ".join(unknown) +
              ". Add a CONTROLS_AUDIT_TOKEN secret (fine-grained, this repository, Administration: read) to check bypass.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
