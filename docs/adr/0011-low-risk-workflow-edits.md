# 0011. Low-risk workflow edits pass the controls guard without the owner's label
Date: 2026-11-22. Status: Accepted.

## Context
Control G1 sent every change under `.github/workflows/` to the owner for the `controls-approved` label. Pull request #39 changed two shell lines in the monthly link check, a read-only report with no required check. It still waited for the owner. The owner asked for any rule that needs him to be kept only where it is strictly necessary, because he runs this estate alone.

The label exists so that nothing can weaken the controls without him seeing it. A workflow edit can do that in a few ways: grant or widen write access, reach a secret or token, pull in third-party code (`uses:`), change when it runs, inject untrusted input through a `${{ }}` expression, skip a step (`if:`, `continue-on-error`), or change a job that produces, or could pretend to be, a required check. An edit to the shell commands of a step in a workflow that can do none of these cannot weaken the controls.

## Decision
G1 lets a workflow edit pass without the label only when all of these hold. The guard checks each one, on the base and on the pull request, and refuses when unsure:
- the workflow already exists and is not the controls guard or controls audit (new, deleted and renamed workflows still need the label);
- it has no write permission beyond `issues` and similar non-code scopes (no `contents`, `actions`, `pull-requests`, `id-token`, `packages`, `pages`, `deployments`, `statuses`, `checks`, `security-events` or `attestations` write, and no `write-all`), and uses no `secrets.`;
- none of its job ids or names is, or begins, a check the `main` ruleset requires;
- every changed line sits inside a step (six spaces or more), and none mentions an action, permission, trigger, token, secret, `env`, `with`, `if`, `continue-on-error`, `shell`, `services`, `container`, credentials or a `${{` expression.

Everything else stays as it was: rulesets, code owners, Dependabot, actions, the guard, the audit, the npm scripts CI runs and anything under `tests/` still need the owner's label, and the label still counts only on the run its own application starts.

## Consequences
- Routine fixes to report-only workflows (link check, reminders, triage) no longer wait for the owner.
- `tests/test_controls_guard.py` shows the exception passing, and shows seven ways around it failing: a new action, an injected expression, a widened permission, a job renamed to a required check, dropped credential hygiene, an edit to the workflow that runs the required checks, and a new workflow. A guard that waves every workflow through fails those tests.
- The rule reads text, not YAML. It errs towards asking: a run line that merely mentions `token` needs the label.
