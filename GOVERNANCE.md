# Governance

## Status
The BHM 2026 Hub is an unofficial project made in a personal capacity. It is not published or endorsed by Black History Month UK, HM Government or any employer.

## Roles
| Role | Who | Responsibilities |
|---|---|---|
| Owner | The repository owner | Final decisions on scope, releases, corrections and complaints; repository settings; security reports |
| Maintainers | Named in `.github/CODEOWNERS` | Review pull requests, run the monthly triage, publish releases |
| Contributors | Anyone | Issues, corrections, pull requests, reviews |
| Community reviewers | Volunteers from the communities the hub describes | Review words, motifs, proverbs, recipes and new content |

The hub's **Help run the hub** page sets out the volunteer roles in full; see also [docs/sustainability-proposal.md](docs/sustainability-proposal.md).

## How decisions are made
1. Anyone can propose a change through an issue or pull request.
2. Changes to facts must cite a source the proposer has read; disputed points show both sides.
3. Every pull request is reviewed and its checks must pass before it can merge (see [Checks and balances](#checks-and-balances)).
4. Ideas and wishes are prioritised at the monthly triage, with public support (thumbs-up reactions) as one input, not the only one.
5. If maintainers disagree, the owner decides and records the reason on the issue.

## Checks and balances
Claude prepares, checks and merges routine changes on the owner's behalf. It works through the owner's own GitHub account, so GitHub cannot tell the two apart and cannot require one to approve the other's pull request. Four-eyes control is therefore built from parts that do not depend on Claude judging its own work.

**These controls bind only once the owner has imported the rulesets** in `.github/rulesets/` (admin guide, section 2). On 31 October 2026 `main` had no branch protection and no rulesets. Until the **Controls audit** reports every recorded rule as enforced, Claude does not merge on its own.

| Line | What | Why it is independent of the author |
|---|---|---|
| First | Claude builds the change and runs the full local checks (data, privacy, licences, self-checks on both editions, injected defects), fixing what fails | It is not: this is the author checking its own work |
| Second: machine | GitHub runs the required checks on its own servers: **privacy**, **selfchecks**, **accessibility**, CodeQL (**analyse** ×2) and **controls-guard** | The rulesets make GitHub refuse a merge until all pass on an up-to-date branch. The controls guard runs the copy on `main`, so a pull request cannot weaken the guard that judges it |
| Second: review | A separate Claude agent, given only the diff and the rules, reviews every pull request and posts each finding as a line review thread | Unresolved review threads block merging. The reviewer has not seen how the change was made |
| Owner | The owner applies the `controls-approved` label to a pull request that changes the controls, and can revert any merge | Claude never applies that label. The proxy Claude's sessions run through refuses repository-settings and ruleset writes (HTTP 403, observed 31 October 2026), so Claude cannot change the rules that bind it |
| Watch | The **Controls audit** compares what GitHub enforces with `.github/rulesets/` daily and on every merge, and opens a `controls-drift` issue if anything is weaker | It runs on a schedule on GitHub, whoever made the change |

What the controls guard stops (each has a test that shows it failing, and was shown to pass on the earlier guard that missed it: `tests/test_controls_guard.py`):
- **G0** a branch that does not contain the latest `main`.
- **G1** a change to workflows, actions, rulesets, code owners, Dependabot, the guard, the audit or the npm scripts CI runs, without the owner's label. This includes renames and non-ASCII file names.
- **G2** any change under `tests/`, additions included, without the label. One added line can switch a check off.
- **G3** fewer in-page self-check calls than on `main`. Calls left in comments are not counted.
- **G4** fewer injected-defect tests in `tests/negative.sh`. The label cannot excuse this.
- **G5** a version that goes down, a version file that can no longer be read, the version files disagreeing, or a new version with no changelog row or release-notes section.

The label counts only on the run that its own application starts. A later push makes the guard ignore it and removes it, so an approval covers exactly the commits the owner saw.

How a change goes through:
1. Claude opens the pull request and turns on **auto-merge** (squash).
2. The required checks and the independent review run. Any red check or open finding is Claude's to fix. Claude never skips, disables or weakens a check to get a pass.
3. GitHub merges only when everything has passed. Claude does not merge a pull request that changes the controls, whatever its checks say: those wait for the owner.
4. The **Release** workflow publishes the version. Claude then confirms the release, its checksums and the website.

Limits, stated plainly:
- The review agent is Claude too, so it is a second reading, not a second person. The same account can resolve review threads, so "resolved" means Claude answered the finding, not that someone else agreed.
- The label is a procedural control: the account that applies it is the account Claude uses. Anyone with triage access could also apply it; today only the owner has access.
- Required checks are matched by name and by the GitHub Actions app. A pull request could add its own workflow with a job named `controls-guard`, and it has not been tested whether that could satisfy the requirement. Such a pull request is caught by G1, and by the rule above Claude never merges it.
- G3 counts check calls, not what each check does. A check whose body is emptied still counts. The deliberate-break tests are what catch that.
- The audit cannot see ruleset bypass actors with the default token, and reports bypass as **unverified** rather than passing it. Add a `CONTROLS_AUDIT_TOKEN` secret (fine-grained, this repository, Administration: read) to check it.

To make the controls technical rather than procedural, give Claude its own GitHub identity (a GitHub App or machine account). Then require code-owner review from the owner on `.github/`, `scripts/controls_*` and `tests/`.

## Content principles
These are not negotiable and apply to every contribution: see [docs/content-style-guide.md](docs/content-style-guide.md).
- Every figure links to a source that was read; two independent sources, at least one authoritative, where possible. Wikipedia is not counted as a source.
- The hub never classifies any person's ethnicity; it uses published counts only.
- Living people are named only in a public role; private individuals are not named.
- No personal data in the hub, issues or pull requests.

## Changes to this document
Proposed by pull request and approved by the owner.
