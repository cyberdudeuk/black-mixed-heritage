# Data dictionary

The files in `data/` are generated from the hub's own data model by `src/export.mjs` (`npm run build:data`). They are published on the website under `data/` as well as in the repository. Text and data created for the hub are licensed under CC BY 4.0; third-party content keeps its own licence.

| File | Format | Contents |
|---|---|---|
| `bhm2026-events.ics` | iCalendar | The calendar: Black History Month events and year-round dates. Subscribe to `https://cyberdudeuk.github.io/black-mixed-heritage/data/bhm2026-events.ics` in Outlook, Google Calendar or Apple Calendar. |
| `bhm2026-events.json` | JSON | The same events, with sources |
| `bhm2026-glossary.csv` | CSV | Glossary terms |
| `bhm2026-hub.jsonld` | JSON-LD | The hub as linked data: Schema.org types and SKOS concepts |

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
