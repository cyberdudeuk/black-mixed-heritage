# 0010. The repository admin may bypass the main ruleset, for pull requests only
Date: 2026-11-15. Status: Accepted.

## Context
The rulesets recorded in `.github/rulesets/` allowed no bypass. While they were not yet in force, pull request #36 was merged without the owner's `controls-approved` label, so the controls guard failed on its final commit. A review afterwards found no check weakened, but nothing had stopped the merge. With no bypass at all, the owner would have no way to merge an urgent fix if a required check were broken for reasons outside the change.

## Decision
The `main` ruleset lists one bypass actor: the **Repository admin** role, in **pull request** mode. The admin can merge a pull request past a failing rule, and GitHub records that it was bypassed; nobody can push to `main` directly. The release tag ruleset keeps no bypass. The **Controls audit** fails if a live ruleset has a bypass actor that is not recorded, or a wider mode than recorded (`always` or `exempt`).

## Consequences
- A bypassed merge is visible on the pull request and in the audit log, so it can be reviewed.
- Agents and collaborators without the admin role cannot bypass; `controls-approved` stays the owner's to apply.
- Changing this needs a change to `main.json`, which the controls guard treats as a control file.
