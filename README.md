# BHM 2026 Hub: Honouring Our Communities

[![Checks](https://github.com/cyberdudeuk/black-mixed-heritage/actions/workflows/checks.yml/badge.svg)](https://github.com/cyberdudeuk/black-mixed-heritage/actions/workflows/checks.yml)
[![Deploy](https://github.com/cyberdudeuk/black-mixed-heritage/actions/workflows/pages.yml/badge.svg)](https://github.com/cyberdudeuk/black-mixed-heritage/actions/workflows/pages.yml)
[![CodeQL](https://github.com/cyberdudeuk/black-mixed-heritage/actions/workflows/codeql.yml/badge.svg)](https://github.com/cyberdudeuk/black-mixed-heritage/actions/workflows/codeql.yml)
[![Website health](https://github.com/cyberdudeuk/black-mixed-heritage/actions/workflows/uptime.yml/badge.svg)](https://github.com/cyberdudeuk/black-mixed-heritage/actions/workflows/uptime.yml)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/cyberdudeuk/black-mixed-heritage/badge)](https://scorecard.dev/viewer/?uri=github.com/cyberdudeuk/black-mixed-heritage)
[![Release](https://img.shields.io/github/v/release/cyberdudeuk/black-mixed-heritage)](https://github.com/cyberdudeuk/black-mixed-heritage/releases/latest)
[![Code: MIT](https://img.shields.io/badge/code-MIT-blue)](LICENSE)
[![Content: CC BY 4.0](https://img.shields.io/badge/content-CC%20BY%204.0-green)](LICENSE-CONTENT.md)
[![WCAG 2.2 AA](https://img.shields.io/badge/WCAG-2.2%20AA-purple)](ACCESSIBILITY.md)

**[Open the hub](https://cyberdudeuk.github.io/black-mixed-heritage/)** · [User manual](docs/user-manual.md) · [Admin guide](docs/admin-guide.md) · [Report a problem](https://github.com/cyberdudeuk/black-mixed-heritage/issues/new/choose) · [Release notes](docs/release-notes.md) · [Wiki](https://github.com/cyberdudeuk/black-mixed-heritage/wiki) · [Discussions](https://github.com/cyberdudeuk/black-mixed-heritage/discussions)

A hub celebrating Black and Black-Mixed history, heritage and cultures, Africa and the African diaspora, built for Black History Month 2026 in the UK and designed to run all year. It is written for colleagues across the UK public sector and for the communities they serve.

It covers history and journeys, Africa and the diaspora around the world, language and terms, myths and facts, identities and life stages, recognition and representation, inequalities and action, learning and a curriculum, events and a calendar, games, a book and film club, careers and leadership routes, dashboards, a knowledge graph and benchmarks. Every figure links to a source that was opened and read; anything unconfirmed is labelled.

Made in a personal capacity. Unofficial: not published or endorsed by Black History Month UK or HM Government.

## What's inside
<!-- The figures below are checked against the build by tests/validate_data.py; update them with each release. -->
| | |
|---|---|
| **Content** | **58** pages in seven menus (This month, Lead, Practice, Learn, Understand, Resources, About): routes into the hub for every Civil Service profession and government function; designing policy, services, content and data for Black and Mixed-heritage people; Mixed heritage in the UK and around the world; history and journeys; Africa's peoples, knowledge, languages and borders; the diaspora worldwide; Black-Mixed identities; words and terms, with the language of the time explained; myths and facts; life stages and intersections; recognition, awards and representation; inequalities and what works; careers, talent and enterprise; innovation and frontier tech; science, engineering and the built environment; culture, sport and food; uniformed and frontline public services; futures to 2100; DNA and ancestry; current debates |
| **Evidence** | **2,700+** sources, each with the date it was read and when it is due to be read again; two independent sources where possible, at least one authoritative; Wikipedia never counted; disputed figures show both sides; nobody's ethnicity is ever classified by the hub |
| **Things to do** | A calendar of **25+** events (observances, remembrance, public events, nomination deadlines with reminders) to subscribe to; an organiser toolkit; posters; templates; a book and film club; nomination routes; quizzes and games; guided tours; search; dashboards; a knowledge graph |
| **Reference** | A glossary of **54** terms; a curriculum and reference works; partners and archives; benchmarks against other countries |
| **Open data** | Calendar (ICS, JSON), glossary (CSV), the whole hub as linked data (JSON-LD), sources, nomination deadlines and a release feed, described by a [data package](data/datapackage.json); see the [data dictionary](docs/data-dictionary.md) |
| **Quality** | **168** self-checks run in every visitor's browser, each proven able to fail; WCAG 2.2 AA, with axe-core on every page at desktop and phone widths in CI; no personal data, cookies or tracking |
| **Editions** | Website (GitHub Pages), one self-contained file that works offline, a Microsoft Teams tab, and inside Claude (where club votes and the shared ideas box are saved) |
| **Version** | **2.23.0**: see the [release notes](docs/release-notes.md) and the [releases](https://github.com/cyberdudeuk/black-mixed-heritage/releases) |

## Use it
- **Website (GitHub Pages):** https://cyberdudeuk.github.io/black-mixed-heritage/ (see [docs/teams-and-github-pages.md](docs/teams-and-github-pages.md)).
- **Single file:** `dist/bhm-2026-hub.html` (also attached to each [release](https://github.com/cyberdudeuk/black-mixed-heritage/releases/latest), with checksums and a signed build attestation) is the whole hub in one self-contained page; it works offline with system fonts (the web fonts, QR codes and barcodes need a connection).
- **Open data:** `data/` holds JSON-LD (Schema.org and SKOS), a glossary CSV, the events calendar as JSON and ICS (with deadline reminders), every source with its read and re-read dates, nomination deadlines, and a release feed (Atom).
- **Microsoft Teams:** `teams/bhm-hub-teams-app-1.1.0.zip` shows the hub as a Teams tab.

## Help
- **Report a bug, an accessibility barrier or a wrong fact:** open an issue using the forms. Issues are public, so do not include personal or sensitive information.
- **Suggest an idea or a feature:** use the idea or wishlist forms, or the ideas box on the hub's "Help run the hub" page.
- **Volunteer:** see [docs/sustainability-proposal.md](docs/sustainability-proposal.md) and [GOVERNANCE.md](GOVERNANCE.md).
- **Get help:** see [SUPPORT.md](SUPPORT.md). Report security problems privately: [SECURITY.md](SECURITY.md).
- Read `CONTRIBUTING.md` before opening a pull request.

## How it is checked
- 168 self-checks run in every visitor's browser (sources, accessibility, language, privacy, coverage, links, injected script); each has a deliberate-break test that proves it can fail.
- Open data, website files, size budgets and third-party licences are validated on every pull request, and `tests/negative.sh` injects known defects to prove each CI check fails when it should.
- Playwright and axe-core tests run at desktop and phone widths in light and dark modes (`tests/test.mjs`), including a negative run that injects known defects.
- Sources must be read in full and triangulated: two independent sources, at least one authoritative. Wikipedia is never counted as a source.
- The hub never classifies any person's ethnicity itself; it uses published counts only.

## Build and test
You need Node.js 20 or later and Python 3.
```
npm install                      # Playwright, axe-core, fonts for the tests
npx playwright install chromium
npm run build:all                # dist/, site/ and data/ from src/
npm run test:quick               # all in-page self-checks, both editions, desktop and phone
npm run check:privacy            # nothing personal in the pages or their embedded files
npm run check:data               # open data and website files valid, sourced, within size budgets
npm run check:licences           # every vendored file and dependency has a recorded licence
npm run test:checks              # checks of the checks: injected defects must be caught
npm run test:a11y                # axe-core on every page (about 30 minutes)
npm test                         # the full suite (accessibility, layout, links); npm run test:negative injects known defects
```
Builds are deterministic: CI rebuilds `dist/` and `site/` and fails if the committed files differ.

## How the repository supports the hub
| What | How | When |
|---|---|---|
| Ideas and feature wishes | Issue forms (prefilled from the hub's ideas box); `pages.yml` publishes `ideas.json`, which the hub shows with each idea's support (thumbs-up reactions) and status | On every idea or wish change, and every six hours |
| Triage and privacy | `issue-triage.yml` labels new issues `triage`, thanks the author, and labels any issue with an email address, phone number or National Insurance number `needs-redaction`, which keeps it off the hub | When an issue is opened or edited |
| Status shown on the hub | Labels `status: accepted`, `planned`, `in-progress`, `done`, `declined` | Set at the monthly triage |
| Labels | `labels.yml` creates and updates labels from `.github/labels.json` | When that file changes |
| Quality | `checks.yml`: privacy scan of the tree and of every embedded file; open data and licence checks; checks the committed pages match a fresh build; all in-page self-checks on both editions; checks of the checks; axe-core on every page at 1280px light and 390px dark | Every pull request and push to `main` |
| Security | `codeql.yml` scans the JavaScript and the workflows; `scorecard.yml` rates supply-chain practices (all actions pinned by commit, least-privilege tokens) | Pull requests and pushes that change scripts or workflows, and weekly |
| Availability | `uptime.yml` checks the website, calendar, linked data, ideas list and security contact, and opens an `uptime` issue if any fails | Every six hours |
| Sources | `link-check.yml` checks every external link and opens a report issue | Monthly |
| Routine | `monthly-triage.yml` opens the monthly triage and freshness checklist | First of each month |
| Releases | `release.yml` publishes a release with the single-file hub, open data, Teams app, SHA-256 checksums and a signed build-provenance attestation | When a merge changes the version, or a `v*` tag is pushed |
| Wiki | `wiki.yml` publishes `docs/wiki/` to the wiki | When `docs/wiki/` changes on `main` |
| Project board | `project.yml` adds ideas, wishes and reports to the roadmap board (optional; needs a token) | When an issue is opened or labelled |
| Discussions | Forms in `.github/DISCUSSION_TEMPLATE/` for Q&A, Show and tell and General | When a discussion is started |
| Events | The "Event for the calendar" issue form; when a maintainer adds `status: accepted`, `event-intake.yml` checks it and opens a pull request adding it to the calendar | Any time |
| Deadlines | Nomination deadlines are calendar entries with reminders; `deadline-reminders.yml` opens a `deadline` issue four weeks and one week before each | Weekly |
| Assurance | `pages.yml` publishes `checks.json` (latest result of each workflow) for the hub's Assurance page; the monthly checklist lists sources due for re-reading | When a workflow finishes on `main`; monthly |
| Volunteers | The "Volunteer" issue form (with a choice of field review panel), prefilled from the hub's expression-of-interest form; contributors may name themselves in `src/contributors.json` | Any time |
| You said, we did | `pages.yml` adds closed issues labelled `status: done` to `ideas.json`; Help run the hub lists them | On every change |
| Coverage | The hub's coverage map counts sourced points for 96 areas, live; the monthly checklist reports reach (release downloads, new ideas, events, volunteers) | Always; monthly |
| Dependencies | Dependabot opens grouped monthly updates for the workflow actions and the test tools | Monthly |

The calendar (ICS) and open data are also served from the website, under `data/`.

## Documentation
See [docs/](docs/README.md): user manual, admin guide, operations (resilience, security, capacity, recovery), release management, architecture and decision records, content style guide, data dictionary and release notes.

## Licence
- Code: MIT (`LICENSE`).
- Text and data created for the hub: Creative Commons Attribution 4.0 (`LICENSE-CONTENT.md`).
- Third-party content keeps its own licence: public sector information under the Open Government Licence v3.0; fonts under the SIL Open Font License 1.1; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) (with the licence assessment) and the hub's "Credits, licences and notices".
