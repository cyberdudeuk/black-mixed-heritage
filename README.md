# BHM 2026 Hub: Honouring Our Communities

[![Checks](https://github.com/cyberdudeuk/black-mixed-heritage/actions/workflows/checks.yml/badge.svg)](https://github.com/cyberdudeuk/black-mixed-heritage/actions/workflows/checks.yml)
[![Deploy](https://github.com/cyberdudeuk/black-mixed-heritage/actions/workflows/pages.yml/badge.svg)](https://github.com/cyberdudeuk/black-mixed-heritage/actions/workflows/pages.yml)
[![CodeQL](https://github.com/cyberdudeuk/black-mixed-heritage/actions/workflows/codeql.yml/badge.svg)](https://github.com/cyberdudeuk/black-mixed-heritage/actions/workflows/codeql.yml)
[![Code: MIT](https://img.shields.io/badge/code-MIT-blue)](LICENSE)
[![Content: CC BY 4.0](https://img.shields.io/badge/content-CC%20BY%204.0-green)](LICENSE-CONTENT.md)
[![WCAG 2.2 AA](https://img.shields.io/badge/WCAG-2.2%20AA-purple)](ACCESSIBILITY.md)

**[Open the hub](https://cyberdudeuk.github.io/black-mixed-heritage/)** · [User manual](docs/user-manual.md) · [Admin guide](docs/admin-guide.md) · [Report a problem](https://github.com/cyberdudeuk/black-mixed-heritage/issues/new/choose) · [Release notes](docs/release-notes.md)

A hub celebrating Black and Black-Mixed history, heritage and cultures, Africa and the African diaspora, built for Black History Month 2026 in the UK and designed to run all year. It is written for colleagues across the UK public sector and for the communities they serve.

It covers history and journeys, Africa and the diaspora around the world, language and terms, myths and facts, identities and life stages, recognition and representation, inequalities and action, learning and a curriculum, events and a calendar, games, a book and film club, careers and leadership routes, dashboards, a knowledge graph and benchmarks. Every figure links to a source that was opened and read; anything unconfirmed is labelled.

Made in a personal capacity. Unofficial: not published or endorsed by Black History Month UK or HM Government.

## Use it
- **Website (GitHub Pages):** https://cyberdudeuk.github.io/black-mixed-heritage/ (see [docs/teams-and-github-pages.md](docs/teams-and-github-pages.md)).
- **Single file:** `dist/bhm-2026-hub.html` is the whole hub in one self-contained page; it works offline with system fonts (the web fonts, QR codes and barcodes need a connection).
- **Open data:** `data/` holds JSON-LD (Schema.org and SKOS), a glossary CSV, and the events calendar as JSON and ICS.
- **Microsoft Teams:** `teams/bhm-hub-teams-app-1.1.0.zip` shows the hub as a Teams tab.

## Help
- **Report a bug, an accessibility barrier or a wrong fact:** open an issue using the forms. Issues are public, so do not include personal or sensitive information.
- **Suggest an idea or a feature:** use the idea or wishlist forms, or the ideas box on the hub's "Help run the hub" page.
- **Volunteer:** see [docs/sustainability-proposal.md](docs/sustainability-proposal.md) and [GOVERNANCE.md](GOVERNANCE.md).
- **Get help:** see [SUPPORT.md](SUPPORT.md). Report security problems privately: [SECURITY.md](SECURITY.md).
- Read `CONTRIBUTING.md` before opening a pull request.

## How it is checked
- 161 self-checks run in every visitor's browser (sources, accessibility, language, privacy, coverage, links); each has a deliberate-break test that proves it can fail.
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
| Quality | `checks.yml`: privacy scan of the tree and of every embedded file; checks the committed pages match a fresh build; all in-page self-checks on both editions; axe-core on every page at 1280px light and 390px dark | Every pull request and push to `main` |
| Security | `codeql.yml` scans the JavaScript and the workflows | Pull requests and pushes that change scripts or workflows, and weekly |
| Sources | `link-check.yml` checks every external link and opens a report issue | Monthly |
| Routine | `monthly-triage.yml` opens the monthly triage and freshness checklist | First of each month |
| Releases | `release.yml` publishes a release with the single-file hub, open data and Teams app | When a `v*` tag is pushed |
| Events | The "Event for the calendar" issue form | Any time |
| Dependencies | Dependabot opens grouped monthly updates for the workflow actions and the test tools | Monthly |

The calendar (ICS) and open data are also served from the website, under `data/`.

## Documentation
See [docs/](docs/README.md): user manual, admin guide, architecture, content style guide, data dictionary and release notes.

## Licence
- Code: MIT (`LICENSE`).
- Text and data created for the hub: Creative Commons Attribution 4.0 (`LICENSE-CONTENT.md`).
- Third-party content keeps its own licence: public sector information under the Open Government Licence v3.0; fonts under the SIL Open Font License 1.1; see the hub's "Credits, licences and notices".
