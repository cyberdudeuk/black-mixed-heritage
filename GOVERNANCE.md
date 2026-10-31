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
Claude prepares, checks and merges routine changes on the owner's behalf. It works through the owner's own GitHub account, so GitHub cannot tell the two apart and cannot require one to approve the other's pull request. Four-eyes control is therefore built from parts that do not depend on Claude judging its own work:

| Line | What | Independent of the author because |
|---|---|---|
| First | Claude builds the change, runs the full local checks (data, privacy, licences, self-checks on both editions, injected defects) and fixes what fails | — (this is the author checking its own work) |
| Second: machine | GitHub runs the required checks on its own servers: **privacy**, **selfchecks**, **accessibility**, CodeQL (**analyse** ×2) and the **controls-guard** | The rulesets make GitHub refuse to merge until all are green on an up-to-date branch. The controls guard runs the version on `main`, not the pull request's, so a pull request cannot weaken the guard that judges it |
| Second: review | A separate Claude agent, given only the diff and the rules (not the author's reasoning), reviews every pull request; its findings are posted on the pull request and must be resolved | Open review threads block merging. The reviewer has not seen how the change was made, so it does not inherit the author's assumptions |
| Owner | The owner applies the `controls-approved` label to any pull request that changes the controls, and can revert any merge | Claude never applies that label, never imports or edits rulesets, and cannot change repository settings (GitHub refuses settings writes from Claude sessions) |
| Watch | The **Controls audit** compares what GitHub enforces with `.github/rulesets/` every day and on every merge, and opens a `controls-drift` issue if anything has been weakened | Runs on a schedule on GitHub, whoever made the change |

What the controls guard stops (each has a test that shows it failing: `tests/test_controls_guard.py`):
- **G1** a change to workflows, rulesets, code owners, Dependabot or the guard itself, without the owner's `controls-approved` label;
- **G2** a line removed from a check or validator in `tests/`, without the label;
- **G3** fewer in-page self-check registrations than on `main`;
- **G4** fewer injected-defect tests in `tests/negative.sh` than on `main` (the label cannot excuse this);
- **G5** a version that goes down, or the five places that hold the version disagreeing, or a new version with no changelog or release notes entry.

How a change goes through:
1. Claude opens the pull request and turns on **auto-merge** (squash).
2. The required checks and the independent review run. Any red check or open finding is Claude's to fix; it never skips, disables or weakens a check to get green.
3. GitHub merges only when everything is green. A pull request that changes the controls waits for the owner's label.
4. The **Release** workflow publishes the version; Claude confirms the release, its checksums and the website.

Limits, stated plainly: the review agent is Claude too, so it is a second reading, not a second person; the owner's label is a procedural control, because the account that applies it is the account Claude uses. To make both technical, give Claude its own GitHub identity (a GitHub App or machine account) and then require code-owner review from the owner on `.github/` and `tests/`.

## Content principles
These are not negotiable and apply to every contribution: see [docs/content-style-guide.md](docs/content-style-guide.md).
- Every figure links to a source that was read; two independent sources, at least one authoritative, where possible. Wikipedia is not counted as a source.
- The hub never classifies any person's ethnicity; it uses published counts only.
- Living people are named only in a public role; private individuals are not named.
- No personal data in the hub, issues or pull requests.

## Changes to this document
Proposed by pull request and approved by the owner.
