# Operations: robust, resilient, secure, scalable and sustainable

How the hub and this repository meet their non-functional requirements, how each is checked, and what to do when one is at risk. It complements [architecture.md](architecture.md) (how the hub is built) and the [admin guide](admin-guide.md) (day-to-day running). Decisions behind these choices are recorded in [adr/](adr/README.md).

## Contents
1. [Service summary](#1-service-summary)
2. [Robust: correctness by construction](#2-robust-correctness-by-construction)
3. [Resilient: failure modes, backup and recovery](#3-resilient-failure-modes-backup-and-recovery)
4. [Secure: controls and threat model](#4-secure-controls-and-threat-model)
5. [Scalable: capacity and limits](#5-scalable-capacity-and-limits)
6. [Sustainable: people, cost and environment](#6-sustainable-people-cost-and-environment)
7. [Monitoring and alerts](#7-monitoring-and-alerts)
8. [Engineering and DevOps standards](#8-engineering-and-devops-standards)

## 1. Service summary
| Item | Value |
|---|---|
| Service | BHM 2026 Hub: a static, self-contained web page with open data |
| Hosting | GitHub Pages (website and open data), GitHub Releases (downloads), the single file in `dist/` (offline), a Microsoft Teams tab (loads the website) |
| Back end | None. No server code, database, login, cookies, analytics or personal data |
| Run-time dependencies | Optional only: web fonts, QR code and barcode libraries from public CDNs. Without them the hub falls back to system fonts and hides QR codes and barcodes |
| Owner | The repository owner (see [GOVERNANCE.md](../GOVERNANCE.md)) |
| Support | Best effort; see [SUPPORT.md](../SUPPORT.md) |
| Target availability | Best effort, inheriting GitHub Pages' availability. No service level agreement |
| Recovery objectives | Recovery point: the last commit on `main` (nothing is lost that was merged). Recovery time: under 1 hour to redeploy or roll back; under 1 day to move host (section 3) |

## 2. Robust: correctness by construction
| Control | How | Checked by |
|---|---|---|
| One source of truth | Everything is built from `src/`; built files are never edited by hand | CI rebuilds `dist/` and `site/` and fails if they differ from what is committed (`checks.yml`, selfchecks job) |
| Deterministic build | Pinned inputs in `src/vendor/`, pinned tools in `package-lock.json`, no timestamps or randomness in the output | The same CI step; two clean builds produce identical bytes |
| Self-checks in the page | 165 checks run in every visitor's browser: sources, links, accessibility, language, privacy, coverage, data integrity | `npm run test:quick` at desktop and phone widths on both editions, on every pull request |
| Checks that can fail | Every in-page check has a deliberate-break test; the CI checks have injected-defect tests | `tests/negative.sh` (every pull request) and `npm run test:negative` (before larger releases) |
| Valid open data | Events are sourced (https), ICS and JSON agree, the glossary is complete, the linked data parses, `security.txt` has not expired, pages stay within size budgets | `tests/validate_data.py` (every pull request) |
| Accessibility | WCAG 2.2 AA | axe-core on all 59 pages at 1280px light and 390px dark (every pull request); manual checks quarterly ([ACCESSIBILITY.md](../ACCESSIBILITY.md)) |
| Safe defaults | Unknown or missing data degrades to text; features that need Claude say so and offer an alternative elsewhere | Self-checks on each edition |
| Change control | `main`: pull requests only, squash merges, required checks on an up-to-date branch, no force pushes, deletion or bypass; release tags cannot be moved or deleted; changes to the controls need the owner | Rulesets recorded in `.github/rulesets/`; the **Controls guard** on every pull request; the **Controls audit** daily (opens a `controls-drift` issue); OpenSSF Scorecard |

## 3. Resilient: failure modes, backup and recovery
### Failure modes
| Failure | Effect | Mitigation | Recovery |
|---|---|---|---|
| GitHub Pages down | Website and Teams tab unavailable | The single file works offline; releases carry it; colleagues can share it as an attachment | Wait; or move host (below) |
| A bad change merged | Site broken or wrong | Required checks; preview by building locally | **Revert** the pull request and merge; the site redeploys in minutes. Or re-run **Deploy** on an earlier commit |
| CDN for fonts or QR codes down | System fonts; QR codes and barcodes hidden | Fallbacks built in | None needed |
| `ideas.json` stale or missing | Ideas list on the hub shows "could not load" and links to GitHub | The hub treats the list as optional | Re-run **Deploy hub to GitHub Pages** |
| Dependency or action compromised | Could alter a build or a workflow | Actions pinned by commit SHA; Dependabot updates in reviewed pull requests; least-privilege tokens; nothing at run time depends on npm | Revert the update; rotate nothing (no long-lived secrets are used) |
| Owner unavailable | No merges or releases | Maintainer roles in [GOVERNANCE.md](../GOVERNANCE.md); documented routine; the hub keeps working without changes | Add a maintainer with **Maintain** access |
| Repository lost or account suspended | Website gone | Every clone is a full backup; releases hold the built files | Restore from any clone (below) |

### Backup
- **Code, content, history:** every clone of the repository is a complete backup. Keep at least one up-to-date clone off GitHub (for example, `git clone --mirror` to an organisation drive, refreshed monthly as part of the routine).
- **Built files:** each GitHub release carries the single-file hub, the open data, the Teams app and a `SHA256SUMS.txt` file.
- **Issues and discussions:** not in git. Export them from time to time with `gh issue list --state all --limit 1000 --json number,title,state,labels,createdAt,closedAt > issues.json` (titles and labels only; the bodies are public on GitHub and may hold personal data that has since been removed, so do not archive bodies).
- **The wiki** is generated from `docs/wiki/`, so it needs no separate backup.

### Moving host (disaster recovery)
The site is plain files, so any static host works:
1. Build: `npm ci && npm run build:all` (or download the latest release).
2. Publish the contents of `site/` plus `data/` (as `data/`) to the new host, for example Netlify, Cloudflare Pages, Azure Static Web Apps or an organisation's web server.
3. Update the canonical address: change `https://cyberdudeuk.github.io/black-mixed-heritage/` in `package.json` (build scripts), `site/robots.txt`, `site/sitemap.xml`, `site/.well-known/security.txt`, `teams/` (then rebuild the Teams package) and `.github/workflows/uptime.yml`; rebuild and commit.
4. The ideas list needs a GitHub repository; without one, the hub shows only the local ideas box.

Rehearse this once a year (section 14 of the admin guide).

## 4. Secure: controls and threat model
### Assets
The integrity of the content (people trust its facts), the reputation of the communities it describes, the privacy of anyone who raises an issue, and the repository's write access.

### Threats and controls
| Threat | Control |
|---|---|
| Script injection through the ideas list (titles are user-supplied) | The list holds titles, labels, counts and links only; titles are inserted as text, never HTML; links must be issue links on this repository; self-check C161 fails on unsafe items |
| Unsafe text reaching the calendar through an event suggestion | `scripts/event_intake.py` reads the issue from the event file (never through a shell), checks dates, length, https link and personal data, and only writes data; the change arrives as a pull request with the full checks; the hub checks every community event again (C164) and the data validator a third time; any `<` or `>` is encoded when the data is embedded |
| Personal data published through issues | `issue-triage.yml` labels likely personal data `needs-redaction`; `pages.yml` skips such issues and any title or text with an email address, phone number or National Insurance number; moderation steps in the admin guide |
| Personal data in the pages or embedded files | `privacy_scan.py` decodes every embedded Office file and image; in-page privacy check; repository-wide grep in CI |
| Malicious pull request | Pull requests from forks run with a read-only token and no secrets; workflows never check out and run pull-request code with write permissions (`pull_request`, not `pull_request_target`) |
| Compromised action or tool | Pinned by full commit SHA; Dependabot proposes updates; CodeQL scans workflows; OpenSSF Scorecard reports regressions |
| Token misuse | Default token is read-only; each job asks for only what it needs; `persist-credentials: false` on every checkout; the only optional secret (`PROJECT_TOKEN`) is scoped to Projects |
| Tampered downloads | Releases carry SHA-256 checksums and a signed build-provenance attestation (`gh attestation verify`) |
| Defacement through the account | Two-factor authentication on every account with write access; rulesets with no bypass; the Controls audit reports any weakening |
| Third-party scripts | Only two optional libraries from cdnjs, pinned by version; nothing else is loaded |

### Reporting
Private vulnerability reporting (see [SECURITY.md](../SECURITY.md)); `/.well-known/security.txt` on the website.

## 5. Scalable: capacity and limits
| Dimension | Limit | Current | Headroom |
|---|---|---|---|
| Visitors | GitHub Pages soft bandwidth limit of 100 GB a month | Website page about 4.9 MB, about 1.6 MB compressed | Roughly 60,000 first visits a month if served compressed; repeat visits use the browser cache. Above that, put a CDN in front or move host (section 3) |
| Site size | 1 GB per published site | About 6 MB | Very large |
| Deployment | 10 minutes per deployment | Under 1 minute | Very large |
| Page weight | Budget 6.3 MB (website) and 6.0 MB (single file), enforced by `validate_data.py` | 4.9 MB and 4.7 MB | About 25% |
| CI time | Accessibility job timeout 60 minutes | About 30 minutes | Split the job by page group if it grows past 45 minutes |
| Ideas list | All open issues are read, 100 at a time, on each refresh | Few | Large; close or decline stale ideas at the monthly triage to keep the list useful |
| Content | One document, pages loaded on demand | 59 pages | Pages draw only when opened; heavy charts draw on demand |

Rate limiting: GitHub may answer `429` under very heavy load. The hub is one request plus optional fonts, so it is unlikely to trigger this.

## 6. Sustainable: people, cost and environment
- **Cost:** nothing. GitHub Pages, Actions, CodeQL, Dependabot and Scorecard are free for public repositories.
- **People:** the monthly routine takes about an hour; volunteer roles, governance and a sustainability proposal are documented ([sustainability-proposal.md](sustainability-proposal.md)). Everything needed to run the hub is written down, so no knowledge sits only with one person.
- **Maintainability:** plain HTML, CSS, JavaScript and Python; no framework to upgrade; tests explain what they check; architecture decisions are recorded.
- **Environment:** one static file, cached by browsers; no tracking scripts; charts draw only when opened; animations respect reduced-motion settings. Keep within the page-weight budget.
- **Licensing:** MIT and CC BY 4.0, compatible with the Open Government Licence, so a public body can adopt the hub ([THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md)).

## 7. Monitoring and alerts
| What | Workflow | Alert |
|---|---|---|
| Website, calendar, linked data, ideas list and `security.txt` answer correctly | `uptime.yml`, every 6 hours | Opens an issue labelled `uptime`; closes it when everything is back |
| External links still work | `link-check.yml`, monthly | Updates the `link-check` issue |
| Sources falling due for re-reading | `monthly-triage.yml`, monthly, from `data/bhm2026-sources.json` | Listed in the monthly checklist issue; all sources on the Assurance page |
| Nomination deadlines | `deadline-reminders.yml`, weekly | Opens a `deadline` issue four weeks and one week before |
| Latest result of every workflow | `pages.yml` writes `checks.json` | Shown on the hub's Assurance page, for anyone to see |
| Supply-chain practices | `scorecard.yml`, weekly | Security → Code scanning |
| Code and workflow security | `codeql.yml`, weekly and on change | Security → Code scanning |
| Dependencies | Dependabot, monthly | Pull requests labelled `dependencies` |
| Failed workflows | All | GitHub emails the person who triggered the run; watch the repository (**Watch → Custom → Issues, Releases, Security alerts**) to see alerts |

## 8. Engineering and DevOps standards
| Standard | How the repository meets it |
|---|---|
| Version control and review | All changes through pull requests; required checks; squash merges |
| Continuous integration | `checks.yml`: privacy, data, licences, workflow lint (actionlint and shellcheck), event-intake tests, reproducible build, self-checks, checks of the checks, accessibility |
| Continuous delivery | Merging to `main` deploys the website; a version change in `package.json` publishes a release |
| Semantic versioning and release notes | [release-management.md](release-management.md) |
| Infrastructure as code | Workflows, labels, issue and discussion forms, wiki and Dependabot settings are files in the repository |
| Security by design | Section 4; [SECURITY.md](../SECURITY.md) |
| Accessibility | WCAG 2.2 AA; [ACCESSIBILITY.md](../ACCESSIBILITY.md) |
| Privacy by design | No personal data; [PRIVACY.md](../PRIVACY.md) |
| Open standards | HTML, CSS, JavaScript; iCalendar, JSON, CSV, JSON-LD (Schema.org, SKOS) |
| Documentation | [docs/](README.md), decisions in [adr/](adr/README.md), the wiki generated from `docs/wiki/` |
| GOV.UK Service Standard and Technology Code of Practice | Informs the approach (user needs, accessibility, open source, open standards, security, reliability); this is an unofficial project and has not been assessed against them |
