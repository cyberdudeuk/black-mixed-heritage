# Data dictionary

The files in `data/` are generated from the hub's own data model by `src/export.mjs` (`npm run build:data`). They are published on the website under `data/` as well as in the repository. Text and data created for the hub are licensed under CC BY 4.0; third-party content keeps its own licence.

| File | Format | Contents |
|---|---|---|
| `bhm2026-events.ics` | iCalendar | The calendar: Black History Month events and year-round dates. Subscribe to `https://cyberdudeuk.github.io/black-mixed-heritage/data/bhm2026-events.ics` in Outlook, Google Calendar or Apple Calendar. |
| `bhm2026-events.json` | JSON | The same events, with sources |
| `bhm2026-glossary.csv` | CSV | Glossary terms |
| `bhm2026-hub.jsonld` | JSON-LD | The hub as linked data: Schema.org types and SKOS concepts |
| `bhm2026-sources.json` | JSON | Every source, with the date it was last read and the date it is due to be read again |
| `bhm2026-deadlines.json` | JSON | Published award and nomination deadlines |
| `bhm2026-releases.atom` | Atom | What is new: the 30 latest releases. Add `https://cyberdudeuk.github.io/black-mixed-heritage/data/bhm2026-releases.atom` to a feed reader |

## `bhm2026-events.json`
| Field | Type | Meaning |
|---|---|---|
| `title`, `version`, `generated` | string | Feed title, hub version and the date the data was last reviewed |
| `events[].id` | string | Stable identifier |
| `events[].start`, `events[].end` | date (YYYY-MM-DD) | First and last day (inclusive) |
| `events[].title` | string | Event name |
| `events[].type` | string | Category, for example "Public events" |
| `events[].where` | string or null | Place, "Online" or "Nationwide" |
| `events[].description` | string or null | Short description |
| `events[].source` | object | `id`, `title` and `url` of the source the event was checked against |

In the calendar, events of type "Nomination deadlines" carry two reminders (`VALARM`, 14 days and 2 days before), which subscribed calendars show as alerts. Events with an `id` starting `c-` were suggested by the community on GitHub; their source is the organiser's page.

## `bhm2026-sources.json`
| Field | Type | Meaning |
|---|---|---|
| `sources[].id` | string | Source ID used throughout the hub, for example `S235` |
| `sources[].title`, `sources[].url` | string | What the source is, and where |
| `sources[].read` | date or null | When it was last read in full |
| `sources[].due` | date or null | When it is due to be read again (12 months after `read`) |

## `bhm2026-deadlines.json`
| Field | Type | Meaning |
|---|---|---|
| `deadlines[].id` | string | The route's ID on the hub, for example `aw-iese` |
| `deadlines[].name`, `deadlines[].organiser` | string | Award or route, and who runs it |
| `deadlines[].deadline` | date | Last day to nominate or enter, as published by the organiser |
| `deadlines[].url`, `deadlines[].how` | string | Organiser's page and how to take part |
| `deadlines[].source` | array of URLs | Sources the deadline was checked against |

## `bhm2026-releases.atom`
An Atom 1.0 feed. Each entry is one release: `title` (version), `updated` (release date), `summary` (what changed) and a link to the release notes.

## `src/community-events.json` (in the repository)
Community events accepted at triage. Written by `scripts/event_intake.py` through a pull request, never by hand.
| Field | Type | Meaning |
|---|---|---|
| `issue` | integer | The GitHub issue that suggested it |
| `s`, `e` | date | First and last day |
| `t`, `where` | string | Name (up to 120 characters) and place (up to 80) |
| `url` | https URL | The organiser's public page, used as the source |
| `accepted` | date | When it was accepted; also its read date as a source |

## `bhm2026-glossary.csv`
| Column | Meaning |
|---|---|
| `term` | The term |
| `category` | Group, for example "Observance" |
| `definition` | Plain-English definition |

## `bhm2026-hub.jsonld`
A single `@graph` of about 2,400 nodes. The most common types are `CreativeWork` (sourced points and pages), `EducationalOccupationalProgram` (talent routes), `Organization`, `Observation` (statistics with period and place), `DefinedTerm` with `skos:Concept` (glossary), `Action`, `Event`, `ArchiveOrganization`, `Dataset`, `Place`, `LearningResource` and `Book`. Myths and facts are `ClaimReview` nodes.

## `ideas.json` (website only)
Published by `.github/workflows/pages.yml` beside the website; not in the repository.
| Field | Meaning |
|---|---|
| `generated` | When the list was made (UTC) |
| `repo` | `owner/repository` |
| `items[].n`, `items[].url` | Issue number and link |
| `items[].title` | Issue title without the `[Idea]` or `[Wish]` prefix |
| `items[].kind` | `idea` or `wish` |
| `items[].status` | `new`, `accepted`, `planned`, `in-progress`, `done` or `declined`, from the `status: …` label |
| `items[].votes` | Thumbs-up reactions on the issue |
| `items[].comments` | Number of comments |
| `items[].created` | Date opened |
| `items[].page` | The page chosen in the form |

Issues labelled `needs-redaction`, and any whose title or text looks like it holds an email address, phone number or National Insurance number, are never included. No issue text or usernames are published.

## `checks.json` (website only)
Published by `.github/workflows/pages.yml` beside the website, whenever a repository workflow finishes on `main`. The Assurance page shows it.
| Field | Meaning |
|---|---|
| `generated` | When the file was made (UTC) |
| `runs[].workflow` | One of Checks, CodeQL, Scorecard, Website health, Monthly link check, Release |
| `runs[].status`, `runs[].conclusion` | GitHub's run status and result (`success`, `failure`, …) |
| `runs[].when`, `runs[].sha` | When the run last changed, and the commit it ran on |
| `runs[].url` | Link to the run on GitHub |
| `runs[].jobs[]` | For Checks only: each job's `name` and `conclusion` |

The hub shows only workflows from that list, results from GitHub's fixed set, and links into this repository's Actions runs; anything else is dropped.
