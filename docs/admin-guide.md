# Repository admin guide

For the owner and maintainers of `cyberdudeuk/black-mixed-heritage`. It covers settings, the workflows, the monthly routine, releases, moderation, the wiki and Discussions, and what to do when something goes wrong. Resilience, security, capacity and recovery are in [operations.md](operations.md); versions and releases in [release-management.md](release-management.md); the reasons behind the main choices in [adr/](adr/README.md). Contributors should read [CONTRIBUTING.md](../CONTRIBUTING.md) instead; readers of the hub should read the [user manual](user-manual.md).

## Contents
1. [What lives where](#1-what-lives-where)
2. [Settings checklist](#2-settings-checklist)
3. [Workflows](#3-workflows)
4. [Labels and statuses](#4-labels-and-statuses)
5. [The monthly routine](#5-the-monthly-routine)
6. [Handling issues](#6-handling-issues)
7. [Personal data and moderation](#7-personal-data-and-moderation)
8. [Reviewing and merging pull requests](#8-reviewing-and-merging-pull-requests)
9. [Making a release](#9-making-a-release)
10. [The website, Teams and the Claude edition](#10-the-website-teams-and-the-claude-edition)
11. [Projects board](#11-projects-board)
12. [Wiki and Discussions](#12-wiki-and-discussions)
13. [When something goes wrong](#13-when-something-goes-wrong)
14. [Quarterly and annual tasks](#14-quarterly-and-annual-tasks)

## 1. What lives where
| Path | What it is | Edit by hand? |
|---|---|---|
| `src/` | Everything the hub is built from: `src.v14.html` (base page), `v*.js` (features and data), `v*_views.html` (page markup), `v15.css`, `patch_v15.py` (assembly, version, change log), `build.mjs`, `build_pages.mjs`, `export.mjs` | Yes |
| `src/vendor/` | Build inputs: map outlines, comparison data, globe, Office templates, Teams library | Rarely |
| `dist/bhm-2026-hub.html` | The hub as one file | No: `npm run build` |
| `site/index.html` | Website and Teams edition | No: `npm run build:pages` |
| `site/404.html`, `robots.txt`, `sitemap.xml`, `.well-known/security.txt` | Static website files | Yes |
| `data/` | Open data exports | No: `npm run build:data` |
| `teams/` | Teams app manifest, icons and package | Through `teams/mkmanifest.mjs` and `teams/package.py` |
| `src/community-events.json` | Community events accepted through **Event intake** pull requests | No: the workflow writes it |
| `scripts/` | `event_intake.py`, which turns an accepted event issue into calendar data | Yes, with `tests/test_event_intake.py` |
| `src/contributors.json` | Contributors who chose to be named | By pull request, by the contributor |
| `scripts/sync_forms.py` | Regenerates the issue forms' page lists from the hub | Run it after adding or renaming a page |
| `tests/` | `ci-selfcheck.mjs` (fast), `ci-axe.mjs` (accessibility), `privacy_scan.py`, `validate_data.py` (open data and website files), `licence_check.py`, `negative.sh` (checks of the checks), `test.mjs` (full suite), `posters.mjs` | Yes |
| `docs/` | This guide, the user manual, operations, release management, architecture and decision records (`adr/`), content style guide, data dictionary, release notes, sustainability proposal, Teams and Pages guide | Yes |
| `docs/wiki/` | The wiki's pages; `wiki.yml` copies them to the wiki on merge | Yes (not in the wiki itself) |
| `THIRD_PARTY_NOTICES.md` | Licence assessment and every third-party component | Yes, whenever a vendored file or dependency changes |
| `.github/` | Workflows, issue forms, discussion forms, labels, code owners, Dependabot | Yes |

See [architecture.md](architecture.md) for which source file holds what.

## 2. Settings checklist
Settings cannot be changed by the workflows; do these by hand in **Settings**.

| Setting | Where | Recommended |
|---|---|---|
| Pages | Settings → Pages | Source: **GitHub Actions** (done) |
| Rulesets for `main` and release tags | Settings → Rules → Rulesets → **New ruleset → Import a ruleset** | Import `.github/rulesets/main.json` and `.github/rulesets/release-tags.json` unchanged. They require a pull request with squash merges only, the checks **privacy**, **selfchecks**, **accessibility**, both **analyse** jobs and **controls-guard** on an up-to-date branch, resolved review threads and no high CodeQL alerts; they block force pushes and deletion, make `v*` tags immutable, and allow no bypass. Do not use the older Settings → Branches page as well. The **Controls audit** workflow opens a `controls-drift` issue while what GitHub enforces is weaker than these files |
| Merge button | Settings → General → Pull requests | Allow **squash merging** only (untick merge commits and rebase merging); default message **Pull request title and description**; tick **Allow auto-merge**, **Always suggest updating pull request branches** and **Automatically delete head branches** |
| Code owner review | Same rule | Optional: "Require review from Code Owners" once there is more than one maintainer (an owner cannot approve their own pull request) |
| Private vulnerability reporting | Settings → Security → Advanced Security (or Code security) | **Enable now**: SECURITY.md and the website's `security.txt` point only to it, so until it is on there is no private way to report a problem |
| Dependabot alerts and security updates | Same page | Enable |
| Secret scanning and push protection | Same page | Enable (free for public repositories) |
| Code scanning | Same page | The `codeql.yml` workflow runs it; or choose "Default setup" instead and delete the workflow |
| Actions permissions | Settings → Actions → General | Allow GitHub Actions and verified creators; **Workflow permissions: read repository contents** (each workflow asks for only what it needs); tick **Allow GitHub Actions to create and approve pull requests**, which the **Event intake** workflow needs to open its pull requests (no workflow approves anything) |
| About box | The cog next to "About" on the repository front page | Description: *Black and Black-Mixed history, heritage and cultures, Africa and the African diaspora: an evidence-based hub for Black History Month 2026 and all year, for the UK public sector. Every figure sourced; accessible; open data. Unofficial.* Website: tick **Use your GitHub Pages website**. Topics (20, the same as `keywords` in `package.json`): `black-history`, `black-history-month`, `african-diaspora`, `africa`, `heritage`, `black-mixed`, `mixed-heritage`, `public-sector`, `uk`, `inclusion`, `race-equality`, `history`, `education`, `open-data`, `linked-data`, `accessibility`, `wcag`, `github-pages`, `microsoft-teams`, `single-file`. Include in the home page: **Releases** on; **Packages** and **Deployments** off |
| Social preview | Settings → General → Social preview | Upload `docs/assets/social-preview.png` (1280×640, no text that goes out of date). The website uses the same design at `site/og.png` |
| Features | Settings → General | Issues on; Projects on (done); Wiki on (done), generated from `docs/wiki/`, see section 12; Discussions on (done), see section 12. Under **Wiki**, tick **Restrict editing to collaborators only**, so the public cannot edit it |
| Releases | The repository front page, right column | Nothing to set: the **Release** workflow publishes releases (section 9) |
| Project board variables | Settings → Secrets and variables → Actions | Optional, for `project.yml`: variable `PROJECT_URL` and secret `PROJECT_TOKEN` (section 11) |
| Interaction limits | Settings → Moderation options | Use temporarily if a thread attracts abuse |
| Collaborators | Settings → Collaborators | Add maintainers with **Maintain** or **Write**; add their usernames to `.github/CODEOWNERS` |

## 3. Workflows
All workflows are in `.github/workflows/`. Each has a comment at the top saying what it does.

| Workflow | Runs when | Permissions | What it does | If it fails |
|---|---|---|---|---|
| **Deploy hub to GitHub Pages** (`pages.yml`) | Push to `main` touching `site/` or `data/`; idea or wish issue changes; every 6 hours; by hand | read contents, write Pages, read issues | Copies `site/` and `data/`, writes `ideas.json` from open idea and wishlist issues (titles, labels and counts only; skips `needs-redaction`) and `checks.json` with the latest result of each repository workflow on `main` (shown on the Assurance page), deploys. Also runs when one of those workflows finishes on `main` | "Get Pages site failed": Pages is not set to GitHub Actions. Otherwise re-run once; see section 13 |
| **Checks** (`checks.yml`) | Every pull request; push to `main`; by hand | read contents | **privacy**: no personal emails or private links in the tree, `tests/privacy_scan.py` on both editions, `tests/validate_data.py` (open data valid and sourced, website files, size budgets, `security.txt` not expired) and `tests/licence_check.py` (every vendored file and dependency listed), `tests/test_event_intake.py`, and actionlint with shellcheck on every workflow. **selfchecks** also runs `tests/negative.sh`, which injects known defects and fails if any check misses one. **selfchecks**: rebuilds `dist/` and `site/` and fails if they differ from the committed files, then runs all in-page self-checks. **accessibility**: axe-core on every page at 1280px light and 390px dark (takes about 30 minutes) | Read the log: it names the file, the check or the page. "out of date" means run `npm run build:all` and commit |
| **Issue triage** (`issue-triage.yml`) | Issue opened or edited | write issues | Adds `triage`, thanks the author, and adds `needs-redaction` with a comment if it finds an email address, UK phone number or National Insurance number | Rare; re-run from the Actions tab |
| **Sync labels** (`labels.yml`) | `.github/labels.json` changes on `main`; by hand | write issues | Creates or updates labels; never deletes | Check the JSON is valid |
| **Monthly link check** (`link-check.yml`) | 2nd of each month; by hand | read contents, write issues | Checks every external link in the hub; updates the open `link-check` issue, or opens one | 403 and 429 answers count as working, because many sites block robots; anything else is worth a look |
| **Monthly triage and freshness check** (`monthly-triage.yml`) | 1st of each month; by hand | write issues | Opens the month's checklist issue labelled `routine` | — |
| **Release** (`release.yml`) | A merge to `main` that changes the version in `package.json`; or a tag `v*` pushed by hand | write contents, attestations | Creates release `vX.Y.Z` from the merge commit with notes from `docs/release-notes.md`, attaches the hub, data, Teams app and `SHA256SUMS.txt`, and signs a build-provenance attestation. Does nothing if the release exists | "has no section": add `## X.Y.Z (date): title` to the release notes and re-run |
| **Website health** (`uptime.yml`) | Every 6 hours; by hand | write issues | Fetches the website, calendar, linked data, `ideas.json` and `security.txt` (three tries each) and checks each is what it should be. Opens or comments on an `uptime` issue on failure; closes it when all pass | Check githubstatus.com; re-run Deploy |
| **Scorecard** (`scorecard.yml`) | Weekly; push to `main`; branch protection changes | read all, write security events | OpenSSF Scorecard of supply-chain practices; results in Security → Code scanning | Each finding names the practice to fix |
| **Sync wiki** (`wiki.yml`) | Push to `main` touching `docs/wiki/`; by hand | write contents | Copies `docs/wiki/*.md` to the wiki | "The wiki has no pages yet": save the first page once (section 12), then re-run |
| **Event intake** (`event-intake.yml`) | `status: accepted` added to an `event` issue | write contents, pull requests, issues; start workflows | Checks the suggestion with `scripts/event_intake.py` (dates as YYYY-MM-DD, end not before start, not over, https link, lengths, no personal data, not already added). If it passes: adds it to `src/community-events.json`, rebuilds, opens a pull request labelled `event` that closes the issue, and starts **Checks** on it. If not: comments with the reasons | "GitHub Actions is not permitted to create pull requests": tick the setting in section 2. To retry after the author fixes the issue, remove and re-add `status: accepted`. Runs one at a time; if two event pull requests are open, merge one, then close the other and re-add its label so it is rebuilt on the new `main`. Before merging, tick the pull request's three by-eye checks: no private individual named, the link is the organiser's page, the details match the issue you reviewed |
| **Nomination deadline reminders** (`deadline-reminders.yml`) | Mondays; by hand | write issues | Opens an issue labelled `deadline` four weeks and one week before each deadline in `data/bhm2026-deadlines.json`; never duplicates | Check the deadlines file exists (run `npm run build:data`) |
| **Add to project board** (`project.yml`) | Issue opened or labelled | — (uses `PROJECT_TOKEN`) | Adds ideas, wishes, bugs, corrections and accessibility reports to the board. Skipped unless `PROJECT_URL` is set | Check the token has Projects read and write and has not expired |
| **CodeQL** (`codeql.yml`) | Pull requests and pushes to `main` touching scripts; weekly | read contents, write security events | Scans the JavaScript and the workflows for security problems; results in Security → Code scanning | Triage alerts there; dismiss false positives with a reason |
| **Dependabot** (`.github/dependabot.yml`) | Monthly | — | Opens one grouped pull request for the actions the workflows use, and one for the test tools | Merge when checks pass. Merge one Dependabot pull request at a time and let the next rebase: two that edit the same workflow can otherwise merge into a broken file |

To run a workflow by hand: **Actions** → choose it → **Run workflow**.

## 4. Labels and statuses
Labels are defined in `.github/labels.json`. Edit that file and merge; **Sync labels** applies it.

| Label | Meaning |
|---|---|
| `bug`, `correction`, `accessibility`, `content` | What kind of issue it is (set by the issue form) |
| `idea`, `wishlist` | Ideas and feature wishes: these appear on the hub |
| `enhancement` | An improvement (set by the wish form) |
| `dependencies` | Dependabot pull requests |
| `event`, `source` | Calendar suggestions and source suggestions |
| `triage` | New, not yet looked at. Remove it once triaged |
| `needs-redaction` | May contain personal data; kept off the hub. Remove only after the data is gone (section 7) |
| `status: accepted`, `status: planned`, `status: in-progress`, `status: done`, `status: declined` | Shown on the hub beside ideas and wishes. Use one at a time |
| `good first issue`, `help wanted`, `volunteer` | For people who want to help |
| `link-check`, `routine`, `uptime`, `deadline` | Opened by the scheduled workflows |
| `release` | Release planning |

## 4a. Contributors, champions and recognition
- **Being thanked:** contributors add themselves to `src/contributors.json` by pull request (see CONTRIBUTING, "Being thanked"). Check each entry is a GitHub name or "Anonymous", with roles only; the validator and self-check C166 enforce the format. Remove anyone who asks, at the next release.
- **You said, we did:** when a suggestion, correction or report becomes a change, close its issue with the `status: done` label. The website lists it on Help run the hub within six hours.
- **Release notes:** thank contributors by GitHub name, if they are listed in `src/contributors.json`, or as "a contributor".
- **Champions and field review panels:** volunteers choose these on the Volunteer form. Reply on the issue, add them to the right Discussions thread or a private channel they choose, and point champions to Help run the hub → Champion pack.
- **Contribution records:** contributors keep their own record in the hub; maintainers do not hold it. If asked, confirm a contribution by linking to its public issue or pull request.

## 5. The monthly routine
On the 1st, the **Monthly triage and freshness check** issue appears with a checklist. In about an hour:
1. Filter issues by `label:triage`. For each one: accept, plan, ask a question or decline with a reason; set a `status:` label on ideas and wishes; remove `triage`.
2. Filter by `label:needs-redaction` and clear any that have been fixed.
3. Work through the latest `link-check` issue: replace or remove dead sources (two independent sources, at least one authoritative).
4. Re-read any source older than 12 months that a page relies on for a figure.
5. Accept the coming month's `event` issues (the **Event intake** workflow opens a pull request for each) and merge those pull requests; work through the **Sources due for re-reading** list in the checklist.
6. Merge Dependabot pull requests whose checks pass, one at a time.
7. Glance at Security → Code scanning (CodeQL and Scorecard) and any open `uptime` issue.
8. Look through new Discussions, if categories other than Announcements are open.
9. Refresh the off-GitHub mirror clone (`git remote update` in it).
10. Agree what goes into the next release; close the checklist issue.

Ideas are ranked on the hub by thumbs-up reactions. Treat support as one input among others: fit with the hub's purpose, effort, evidence and who it helps.

## 6. Handling issues
| Issue type | What to check | Typical outcome |
|---|---|---|
| Correction | Read the cited source in full; find a second independent source | Fix in `src/`, add or adjust a check, release; thank the reporter and close with the release number |
| Bug | Reproduce in the website and the single file, at phone and desktop width | Fix, with a check that fails on the old version |
| Accessibility | Reproduce with keyboard and a screen reader if possible | Treat as high priority |
| Idea or wish | Fit, effort, evidence, who it helps | `status:` label; comment with the reason when declining |
| Event | Organiser's public page; date and place; the dates are written YYYY-MM-DD | Add `status: accepted`: the **Event intake** workflow opens a pull request; review and merge it (the issue closes). Decline with a reason otherwise |
| Volunteer | The roles they named; nothing personal in the issue | Thank them, agree next steps on the issue (or move to a private channel they choose), label `status: accepted`, update GOVERNANCE or CODEOWNERS if they take a role |
| Deadline reminder | The deadline on the organiser's page | Share it; close after the deadline |
| Source | Read in full; authoritative? independent? | Add to the relevant point with its quote |

Closing: link the pull request (`Closes #12`) so the issue closes on merge. Duplicates: comment "Duplicate of #N" and close.

## 7. Personal data and moderation
Issues are public. The triage workflow flags likely personal data, but people can still post it, and the edit history of an issue keeps old text.

When an issue or comment contains personal data:
1. **Edit it out:** on the issue or comment, use **…** → **Edit**, remove the data and save.
2. **Delete the old revision:** select **edited** above the text → choose the earlier revision → **Delete revision from history**. Do this for every revision that held the data.
3. If a comment is entirely personal, use **…** → **Delete** (or **Hide** → reason).
4. Remove `needs-redaction`. The issue reappears on the hub at the next refresh (within six hours, or run **Deploy hub to GitHub Pages** by hand).
5. If the data was in a commit, do not try to rewrite history on a protected branch yourself: remove it in a new commit and ask GitHub Support to purge cached views, and consider whether the people affected need to be told.

Abuse and harassment: hide the comment as abusive, lock the conversation (**Lock conversation** in the right column), and block the user from your profile's **Settings → Moderation → Blocked users** if needed (for a repository owned by a person, blocking is an account setting). Interaction limits can restrict activity to existing contributors for up to six months. The [code of conduct](../CODE_OF_CONDUCT.md) applies.

## 8. Reviewing and merging pull requests
- All three required checks must pass; the branch must be up to date with `main`.
- Read the diff of `src/`, not the built files (they are marked as generated and collapsed).
- For content: every new figure has a source that was read, with a quote; disputed points show both sides; the language check passes.
- For features: a self-check that fails when the feature is broken, with a `breakIt` that proves it.
- Prefer **Squash and merge** with a clear title. The website redeploys automatically after merging.

## 9. Making a release
Policy (version numbers, release types, hotfixes, rollback, verifying downloads): [release-management.md](release-management.md).

1. In `src/patch_v15.py`, change the version (`version:"2.x.y",docId:"BHM26-PSH-2.x.y"`) and add a line at the front of `CHANGELOG`.
2. Add a `## 2.x.y (date): title` section at the top of `docs/release-notes.md` and a row in `CHANGELOG.md`; update `version` in `package.json`, and `version` and `date-released` in `CITATION.cff`.
3. `npm run build:all`, `npm run check:privacy`, `npm run check:data`, `npm run check:licences`, `npm run test:quick`, `npm run test:checks`. Before larger releases also run `npm test` and `npm run test:negative` (about an hour each).
4. If the Teams tab changed, bump its version: `node teams/mkmanifest.mjs https://cyberdudeuk.github.io/black-mixed-heritage/ 1.x.0` then `python3 teams/package.py`.
5. Open a pull request, let the checks pass, merge.
6. Nothing more: merging a changed version publishes release `v2.x.y` automatically (**Release** workflow), with checksums and a signed attestation. If it was skipped, push the tag by hand: `git tag v2.x.y <merge commit> && git push origin v2.x.y`. Creating a release by hand in **Releases** also works; the workflow then sees it and does nothing.
7. For minor and major releases, post a short note in Discussions → **Announcements**.

## 10. The website, Teams and the Claude edition
- **Website:** `https://cyberdudeuk.github.io/black-mixed-heritage/`. Pages sites are public. The calendar can be subscribed to at `…/data/bhm2026-events.ics`.
- **Teams:** upload `teams/bhm-hub-teams-app-<version>.zip` in Teams (**Apps → Manage your apps → Upload an app**), or ask your Teams administrator to publish it for your organisation. See [teams-and-github-pages.md](teams-and-github-pages.md).
- **Claude edition:** the same hub published inside Claude, where club votes, the shared ideas box and expressions of interest can be saved. It is built with the Claude address as its canonical URL and is published separately from this repository.

## 11. Projects board
Projects are enabled. A suggested board, **Hub roadmap**, with a **Status** field (Triage, Accepted, Planned, In progress, Done, Declined) mirroring the `status:` labels:
1. **Projects → New project → Board**, name it, and link it to this repository.
2. In the project's **Workflows**, turn on **Auto-add to project** with the filter `is:issue label:idea,wishlist,bug,correction,accessibility`, and **Item closed → Status: Done**.
3. Optionally add views: *By page* (group by the page named in the issue), *Accessibility* (filter `label:accessibility`).

The built-in project workflows need no tokens and are the simplest option. If you prefer the repository to add items (for example to use the label filter across several boards), `project.yml` does it once you store two settings in **Settings → Secrets and variables → Actions**: variable `PROJECT_URL` (the board's address) and secret `PROJECT_TOKEN` (a fine-grained personal access token, resource owner = you, permission **Projects: read and write**, expiry 1 year; put a reminder in the calendar to renew it). Until then the workflow is skipped.

Syncing the board's Status back to labels is not set up; set the `status:` label during triage, because that is what the hub shows.

## 12. Wiki and Discussions
### Wiki
The wiki is a short front door; the documentation itself stays in `docs/` (see [ADR 0008](adr/0008-wiki-from-docs.md)). Its pages are in `docs/wiki/` and the **Sync wiki** workflow copies them to the wiki whenever they change on `main`.

First time only (GitHub creates the wiki's store only when a first page is saved):
1. Open the **Wiki** tab → **Create the first page**. Leave the title *Home*, type anything, and **Save page**.
2. **Actions → Sync wiki → Run workflow.** The workflow replaces the page with `docs/wiki/Home.md` and adds the rest, with a sidebar and footer.
3. In **Settings → General → Features → Wiki**, tick **Restrict editing to collaborators only**.

After that, change the wiki only by editing `docs/wiki/` in a pull request; direct edits in the wiki are overwritten at the next sync. Page names come from file names (`Taking-part.md` becomes *Taking part*); `[[Page name]]` links between pages.

### Discussions
Discussions are on. Options, from least to most upkeep:
1. **Announcements only.** Maintainers post releases and the monthly highlight; others can react and comment. Almost no upkeep.
2. **A few categories, best-effort replies.** Announcements, Q&A (answered by the community), Show and tell, Polls (book and film club), General. Review during the monthly triage only.
3. **Routed into triage.** As 2, with new discussions listed in the monthly checklist issue. Only once there are volunteers.

Recommended: start with 1 and move to 2 when the community reviewer and maintainer roles have volunteers.

Set up (in **Discussions → the pencil beside Categories**):
1. Keep **Announcements** (announcement format: only maintainers can post). Delete or keep **Ideas**: ideas belong in the issue forms so that they appear on the hub, so it is clearer to delete it.
2. For option 2, keep or create **Q&A** (question and answer format), **Show and tell**, **Polls** (poll format) and **General**. The forms in `.github/DISCUSSION_TEMPLATE/` (`q-a.yml`, `show-and-tell.yml`, `general.yml`) apply automatically when the category's slug matches the file name; each reminds people that discussions are public and that corrections and bugs go through the issue forms.
3. Post and pin a welcome in Announcements: what Discussions are for, that replies are best effort, and the link to the issue forms.
4. Moderation is as for issues (section 7): edit or delete personal data, delete earlier revisions, hide or lock threads.
5. To return to fewer categories later, delete a category and move its discussions; turning Discussions off keeps the content read-only.

## 13. When something goes wrong
| Problem | What to do |
|---|---|
| The website shows an old version | Check **Actions → Deploy hub to GitHub Pages**; run it by hand. Browsers may cache for a few minutes |
| The website is broken after a merge | Revert the pull request (**Revert** button on the merged pull request), merge the revert; the site redeploys |
| Checks fail with "out of date" | `npm run build:all` and commit `dist/`, `site/` and `data/` |
| The privacy scan fails | It names the file and what it found (never the value). Remove it at source in `src/` or `src/vendor/`, rebuild |
| A self-check fails | The log shows its ID and detail; the hub's **Self-checks, stories and journeys** page explains each check. Fix the cause, never the check |
| Personal data is reported | Section 7, the same day |
| A security report arrives | Acknowledge within 7 days in the private advisory; fix; publish the advisory with credit if wanted |
| Ideas are missing from the hub | Check the issue has the `idea` or `wishlist` label and not `needs-redaction`, and that its title and text hold no email address, phone number or National Insurance number (those are never published); run the Pages workflow; `ideas.json` is at `…/ideas.json` |
| The link check reports hundreds of failures | Usually a network problem on the runner; re-run it before acting |
| An `uptime` issue opens | Open the website; check githubstatus.com; re-run **Deploy hub to GitHub Pages**. The issue closes itself when the next check passes |
| A release did not appear after merging | **Actions → Release**: if it says the release notes have no section, add it and re-run; or push the tag by hand (section 9) |
| Scorecard reports a new finding | It names the practice (for example an unpinned action or a token with too much access); fix it in a pull request |

## 14. Quarterly and annual tasks
**Quarterly:** accessibility check with assistive technology (keyboard, a screen reader, 200% zoom); community review of new content; data refresh of dashboards and benchmarks when new official statistics are published; review of open `help wanted` issues.

**Annually:** rehearse moving host from the latest release (see [operations.md](operations.md#moving-host-disaster-recovery)) and refresh the off-GitHub mirror clone; in January, plan the year and confirm volunteer roles; in September, prepare the Black History Month season (theme, calendar, posters); after October, an annual review and release; review this guide, the settings checklist and the governance document; renew `Expires` in `site/.well-known/security.txt` (due 25 October 2027).
