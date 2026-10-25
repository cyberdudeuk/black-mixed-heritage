# Repository admin guide

For the owner and maintainers of `cyberdudeuk/black-mixed-heritage`. It covers settings, the workflows, the monthly routine, releases, moderation and what to do when something goes wrong. Contributors should read [CONTRIBUTING.md](../CONTRIBUTING.md) instead; readers of the hub should read the [user manual](user-manual.md).

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
12. [Discussions: options](#12-discussions-options)
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
| `tests/` | `ci-selfcheck.mjs` (fast), `ci-axe.mjs` (accessibility), `privacy_scan.py`, `test.mjs` (full suite), `posters.mjs` | Yes |
| `docs/` | This guide, the user manual, architecture, content style guide, data dictionary, release notes, sustainability proposal, Teams and Pages guide | Yes |
| `.github/` | Workflows, issue forms, labels, code owners, Dependabot | Yes |

See [architecture.md](architecture.md) for which source file holds what.

## 2. Settings checklist
Settings cannot be changed by the workflows; do these by hand in **Settings**.

| Setting | Where | Recommended |
|---|---|---|
| Pages | Settings → Pages | Source: **GitHub Actions** (done) |
| Branch protection for `main` | Settings → Branches (or Rules → Rulesets) | Require a pull request; require status checks **privacy**, **selfchecks** and **accessibility** to pass; require branches to be up to date; block force pushes and deletion (done; add **accessibility** once it has run once) |
| Code owner review | Same rule | Optional: "Require review from Code Owners" once there is more than one maintainer (an owner cannot approve their own pull request) |
| Private vulnerability reporting | Settings → Security → Advanced Security (or Code security) | **Enable**; SECURITY.md points people to it |
| Dependabot alerts and security updates | Same page | Enable |
| Secret scanning and push protection | Same page | Enable (free for public repositories) |
| Code scanning | Same page | The `codeql.yml` workflow runs it; or choose "Default setup" instead and delete the workflow |
| Actions permissions | Settings → Actions → General | Allow GitHub Actions and verified creators; **Workflow permissions: read repository contents** (each workflow asks for only what it needs) |
| About box | The cog next to "About" on the repository front page | Description: *BHM 2026 Hub: Black and Black-Mixed history, heritage and cultures, Africa and the African diaspora.* Website: `https://cyberdudeuk.github.io/black-mixed-heritage/` (tick "Use your GitHub Pages website"). Topics: `black-history`, `black-history-month`, `african-diaspora`, `heritage`, `accessibility`, `open-data`, `public-sector`, `github-pages`, `uk` |
| Social preview | Settings → General → Social preview | Upload a 1280×640 image (for example a poster from the hub) |
| Features | Settings → General | Issues on; Projects on (done); Wiki off (docs live in `docs/`); Discussions: see section 12 |
| Interaction limits | Settings → Moderation options | Use temporarily if a thread attracts abuse |
| Collaborators | Settings → Collaborators | Add maintainers with **Maintain** or **Write**; add their usernames to `.github/CODEOWNERS` |

## 3. Workflows
All workflows are in `.github/workflows/`. Each has a comment at the top saying what it does.

| Workflow | Runs when | Permissions | What it does | If it fails |
|---|---|---|---|---|
| **Deploy hub to GitHub Pages** (`pages.yml`) | Push to `main` touching `site/` or `data/`; idea or wish issue changes; every 6 hours; by hand | read contents, write Pages, read issues | Copies `site/` and `data/`, writes `ideas.json` from open idea and wishlist issues (titles, labels and counts only; skips `needs-redaction`), deploys | "Get Pages site failed": Pages is not set to GitHub Actions. Otherwise re-run once; see section 13 |
| **Checks** (`checks.yml`) | Every pull request; push to `main`; by hand | read contents | **privacy**: no personal emails or private links in the tree, and `tests/privacy_scan.py` on both editions. **selfchecks**: rebuilds `dist/` and `site/` and fails if they differ from the committed files, then runs all in-page self-checks. **accessibility**: axe-core on every page at 1280px light and 390px dark | Read the log: it names the file, the check or the page. "out of date" means run `npm run build:all` and commit |
| **Issue triage** (`issue-triage.yml`) | Issue opened or edited | write issues | Adds `triage`, thanks the author, and adds `needs-redaction` with a comment if it finds an email address, UK phone number or National Insurance number | Rare; re-run from the Actions tab |
| **Sync labels** (`labels.yml`) | `.github/labels.json` changes on `main`; by hand | write issues | Creates or updates labels; never deletes | Check the JSON is valid |
| **Monthly link check** (`link-check.yml`) | 2nd of each month; by hand | read contents, write issues | Checks every external link in the hub and opens or updates an issue labelled `link-check` | 403 and 429 answers count as working, because many sites block robots; anything else is worth a look |
| **Monthly triage and freshness check** (`monthly-triage.yml`) | 1st of each month; by hand | write issues | Opens the month's checklist issue labelled `routine` | — |
| **Release** (`release.yml`) | A tag `v*` is pushed | write contents | Creates the GitHub release with notes from `docs/release-notes.md` and attaches the hub, data and Teams app | Make sure the version heading exists in the release notes |
| **CodeQL** (`codeql.yml`) | Pull requests and pushes to `main` touching scripts; weekly | read contents, write security events | Scans the JavaScript and the workflows for security problems; results in Security → Code scanning | Triage alerts there; dismiss false positives with a reason |
| **Dependabot** (`.github/dependabot.yml`) | Monthly | — | Opens one grouped pull request for the actions the workflows use, and one for the test tools | Merge when checks pass. Merge one Dependabot pull request at a time and let the next rebase: two that edit the same workflow can otherwise merge into a broken file |

To run a workflow by hand: **Actions** → choose it → **Run workflow**.

## 4. Labels and statuses
Labels are defined in `.github/labels.json`. Edit that file and merge; **Sync labels** applies it.

| Label | Meaning |
|---|---|
| `bug`, `correction`, `accessibility`, `content` | What kind of issue it is (set by the issue form) |
| `idea`, `wishlist`, `enhancement` | Ideas and feature wishes: these appear on the hub |
| `event`, `source` | Calendar suggestions and source suggestions |
| `triage` | New, not yet looked at. Remove it once triaged |
| `needs-redaction` | May contain personal data; kept off the hub. Remove only after the data is gone (section 7) |
| `status: accepted`, `status: planned`, `status: in-progress`, `status: done`, `status: declined` | Shown on the hub beside ideas and wishes. Use one at a time |
| `good first issue`, `help wanted`, `volunteer` | For people who want to help |
| `link-check`, `routine` | Opened by the scheduled workflows |

## 5. The monthly routine
On the 1st, the **Monthly triage and freshness check** issue appears with a checklist. In about an hour:
1. Filter issues by `label:triage`. For each one: accept, plan, ask a question or decline with a reason; set a `status:` label on ideas and wishes; remove `triage`.
2. Filter by `label:needs-redaction` and clear any that have been fixed.
3. Work through the latest `link-check` issue: replace or remove dead sources (two independent sources, at least one authoritative).
4. Re-read any source older than 12 months that a page relies on for a figure.
5. Add the coming month's events (from `event` issues) to the calendar data in `src/`.
6. Merge Dependabot pull requests whose checks pass, one at a time.
7. Agree what goes into the next release; close the checklist issue.

Ideas are ranked on the hub by thumbs-up reactions. Treat support as one input among others: fit with the hub's purpose, effort, evidence and who it helps.

## 6. Handling issues
| Issue type | What to check | Typical outcome |
|---|---|---|
| Correction | Read the cited source in full; find a second independent source | Fix in `src/`, add or adjust a check, release; thank the reporter and close with the release number |
| Bug | Reproduce in the website and the single file, at phone and desktop width | Fix, with a check that fails on the old version |
| Accessibility | Reproduce with keyboard and a screen reader if possible | Treat as high priority |
| Idea or wish | Fit, effort, evidence, who it helps | `status:` label; comment with the reason when declining |
| Event | Organiser's public page; date and place | Add to the calendar data; close when released |
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

Abuse and harassment: hide the comment as abusive, lock the conversation (**Lock conversation** in the right column), and block the user from **Settings → Moderation options → Blocked users** if needed. Interaction limits can restrict activity to existing contributors for up to six months. The [code of conduct](../CODE_OF_CONDUCT.md) applies.

## 8. Reviewing and merging pull requests
- All three required checks must pass; the branch must be up to date with `main`.
- Read the diff of `src/`, not the built files (they are marked as generated and collapsed).
- For content: every new figure has a source that was read, with a quote; disputed points show both sides; the language check passes.
- For features: a self-check that fails when the feature is broken, with a `breakIt` that proves it.
- Prefer **Squash and merge** with a clear title. The website redeploys automatically after merging.

## 9. Making a release
1. In `src/patch_v15.py`, change the version (`version:"2.x.y",docId:"BHM26-PSH-2.x.y"`) and add a line at the front of `CHANGELOG`.
2. Add a `## 2.x.y (date): title` section at the top of `docs/release-notes.md` and a row in `CHANGELOG.md`; update `version` in `package.json` and `CITATION.cff`.
3. `npm run build:all`, `npm run check:privacy`, `npm run test:quick`. Before larger releases also run `npm test` and `npm run test:negative` (about an hour each).
4. If the Teams tab changed, bump its version: `node teams/mkmanifest.mjs https://cyberdudeuk.github.io/black-mixed-heritage/ 1.x.0` then `python3 teams/package.py`.
5. Open a pull request, let the checks pass, merge.
6. Tag the merge commit: `git tag v2.x.y && git push origin v2.x.y` (or **Releases → Draft a new release → Choose a tag → Create new tag**). The **Release** workflow publishes the release with the files attached.

## 10. The website, Teams and the Claude edition
- **Website:** `https://cyberdudeuk.github.io/black-mixed-heritage/`. Pages sites are public. The calendar can be subscribed to at `…/data/bhm2026-events.ics`.
- **Teams:** upload `teams/bhm-hub-teams-app-<version>.zip` in Teams (**Apps → Manage your apps → Upload an app**), or ask your Teams administrator to publish it for your organisation. See [teams-and-github-pages.md](teams-and-github-pages.md).
- **Claude edition:** the same hub published inside Claude, where club votes, the shared ideas box and expressions of interest can be saved. It is built with the Claude address as its canonical URL and is published separately from this repository.

## 11. Projects board
Projects are enabled. A suggested board, **Hub roadmap**, with a **Status** field (Triage, Accepted, Planned, In progress, Done, Declined) mirroring the `status:` labels:
1. **Projects → New project → Board**, name it, and link it to this repository.
2. In the project's **Workflows**, turn on **Auto-add to project** with the filter `is:issue label:idea,wishlist,bug,correction,accessibility`, and **Item closed → Status: Done**.
3. Optionally add views: *By page* (group by the page named in the issue), *Accessibility* (filter `label:accessibility`).

The built-in project workflows need no tokens. Syncing the board's Status back to labels would need a personal access token stored as a secret, so it is not set up; set the `status:` label during triage, because that is what the hub shows.

## 12. Discussions: options
Discussions are off. Options, from least to most upkeep:
1. **Keep off.** Ideas and questions go through issues and the ideas box.
2. **Announcements only.** Maintainers post the monthly highlight and releases; others can react and comment. Almost no upkeep.
3. **A few categories, best-effort replies.** Announcements, Show and tell, Questions (answered by the community), Polls (book and film club). Pin a note that replies are best effort and corrections go through issue forms. Review only during the monthly triage.
4. **Routed into triage.** As 3, with a workflow that lists new discussions in the monthly checklist issue. Only once there are volunteers.

Recommended: start with 2 and move to 3 when the community reviewer and maintainer roles have volunteers. Turning Discussions off later keeps the content read-only.

## 13. When something goes wrong
| Problem | What to do |
|---|---|
| The website shows an old version | Check **Actions → Deploy hub to GitHub Pages**; run it by hand. Browsers may cache for a few minutes |
| The website is broken after a merge | Revert the pull request (**Revert** button on the merged pull request), merge the revert; the site redeploys |
| Checks fail with "out of date" | `npm run build:all` and commit `dist/`, `site/` and `data/` |
| The privacy scan fails | It names the file and what it found (never the value). Remove it at source in `src/` or `src/vendor/`, rebuild |
| A self-check fails | The log shows its ID and detail; the hub's **Self-checks** page explains each check. Fix the cause, never the check |
| Personal data is reported | Section 7, the same day |
| A security report arrives | Acknowledge within 7 days in the private advisory; fix; publish the advisory with credit if wanted |
| Ideas are missing from the hub | Check the issue has the `idea` or `wishlist` label and not `needs-redaction`; run the Pages workflow; `ideas.json` is at `…/ideas.json` |
| The link check reports hundreds of failures | Usually a network problem on the runner; re-run it before acting |

## 14. Quarterly and annual tasks
**Quarterly:** accessibility check with assistive technology (keyboard, a screen reader, 200% zoom); community review of new content; data refresh of dashboards and benchmarks when new official statistics are published; review of open `help wanted` issues.

**Annually:** in January, plan the year and confirm volunteer roles; in September, prepare the Black History Month season (theme, calendar, posters); after October, an annual review and release; review this guide, the settings checklist and the governance document.
