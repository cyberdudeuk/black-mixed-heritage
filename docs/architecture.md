# Architecture

## In one paragraph
The hub is one self-contained HTML page. All content, data, styles and scripts are inside it, so it works from a website, as a single downloaded file, offline, inside Microsoft Teams and inside Claude. Pages are views inside that one document, switched by the address after `#` (for example `#calendar`). There is no server, database or login. The page checks itself: 165 self-checks run in every visitor's browser and are shown on **About → Self-checks, stories and journeys**.

## How the page is built
```
src/src.v14.html  ──►  src/patch_v15.py  ──►  src/src.html  ──►  src/build.mjs  ──►  dist/bhm-2026-hub.html
 (base page)            (adds every v*.js,      (assembled,        (inlines map data,      (the hub)
                         v*_views.html and      not committed)      templates; sets the
                         v15.css, version,                          canonical URL)
                         change log)
                                                                       └─► src/build_pages.mjs ──► site/index.html
                                                                           (full HTML document,       (GitHub Pages
                                                                            Teams library)             and Teams)
dist/bhm-2026-hub.html ──► src/export.mjs ──► data/ (JSON-LD, glossary CSV, events JSON and ICS)
```
- `patch_v15.py` lists the script files in order; order matters, because later files extend earlier ones (for example, adding self-checks to `CHECKS` or wrapping `ctxV15`). New features go in a new `vNN_name.js` added to the end of that list, with a `vNNBoot` function added to the boot list.
- `src/vendor/` holds the build inputs: UK and world map outlines (Natural Earth), comparison data, the globe outline, the three Office templates and the Microsoft Teams JavaScript library.
- The build is deterministic: the same `src/` always produces the same pages, and CI checks this.

## Inside the page
| Part | What it does |
|---|---|
| `VIEWS`, `NAV_GROUPS` | The 63 pages and the eight menus (at most nine pages each); `data/bhm2026-pages.json` lists them, and `scripts/sync_forms.py` keeps the issue forms' page lists the same |
| `SOURCES`, `SRCQ(...)` | Every source, with the quote that supports each point and the date it was read |
| `LP` (lens pages) | Sourced points grouped into sections, with "In short" summaries and "From where you stand" vantage points |
| `CHECKS` | Self-checks. Each has `run` (returns ok and a detail) and `breakIt` (proves the check can fail) |
| `BUILD_TESTS` | Defects found during development (`D-001` onwards) and what now prevents each one |
| `REQS` | Requirements (`R01` onwards), the sections that satisfy each and the checks that verify it |
| `store` | Small preferences kept in the visitor's browser (local storage) |

## Editions
| Edition | File | Differences |
|---|---|---|
| Single file | `dist/bhm-2026-hub.html` | Canonical address is the website |
| Website and Teams | `site/index.html` | Full HTML document; Teams library embedded; reads `ideas.json` published beside it |
| Claude | (published separately) | Can save club votes, ideas and expressions of interest in a shared store; the AI assistant works |

## Decisions
| Decision | Why |
|---|---|
| One self-contained file | Works offline, in Teams and as an attachment; nothing to host but static files |
| Self-checks in the page | Every visitor's browser re-proves the claims, links, accessibility and privacy rules, not only CI |
| No tokens or keys in the page | The ideas list is published by a workflow as a static file; the page only reads it |
| Menus capped at nine pages | New content joins an existing page as a section when a menu is full |
| Published counts only | The hub never classifies any person's ethnicity |

## Where things live
Generated data files (`v34_lens_data.js`, `v36_world_data.js`, `v41_pagekit_data.js`, `v42_lt_data.js`) were produced by an offline research step that is not part of this repository. Edit them directly, keeping each point's sources and quotes; the self-checks verify their structure.

| File | Contents |
|---|---|
| `v11_data.js` | DATA |
| `v11_render.js` | RENDERERS |
| `v12_data.js` | DATA |
| `v12_render.js` | RENDERERS |
| `v15_belong.js` | BELONGING, COURSES |
| `v15_checks.js` | BIBLIOGRAPHIES |
| `v15_data.js` | DATA |
| `v15_data2.js` | COURSES, ACADEMIC SOURCES, BELONGING |
| `v15_data3.js` | STEREOTYPES; BULLYING, HARASSMENT AND SPEAKING UP |
| `v15_design.js` | DESIGN AND ARCHITECTURE PACK |
| `v15_final.js` | CLOSING OPEN VERIFICATION ITEMS (checked 21 October 2026) |
| `v15_maps.js` | ICONS, VIEW ICONS |
| `v15_more.js` | MASTHEAD LOGO, FAVICON, DRAWER |
| `v15_render.js` | MYTHS |
| `v15_srcfix.js` | SOURCE VERIFICATION (checked 21 October 2026) |
| `v15_tech.js` | FRONTIER TECHNOLOGY IN AFRICA |
| `v15_tests.js` | Supporting code |
| `v16_club.js` | BOOK AND FILM CLUB |
| `v16_data.js` | DATA: BOOK AND FILM CLUB; CULTURE, SPORT AND ENTERPRISE (checked 21 October 2026) |
| `v16_fix.js` | CORRECTIONS: every located source read in full; every v1.7 claim checked against its source (21 October 2026) |
| `v16_glue.js` | glue: icons, lineage, search, requirements, checks |
| `v17_dash.js` | DASHBOARDS: content, time, evidence, people, quality |
| `v17_data.js` | DATA: life stages, groups, intersectionality, recognition (generated from verified research, 21 October 2026) |
| `v17_data2.js` | DATA: learning and community resources (each page opened 21 October 2026) |
| `v17_data3.js` | DATA: inequalities and action (generated from verified research, 21 October 2026) |
| `v17_data4.js` | Supporting code |
| `v17_data4b.js` | DATA: talent routes and networks (each page opened 21 October 2026) |
| `v17_data5.js` | Supporting code |
| `v17_data5b.js` | DATA: leadership, funding, doctorates and research (each page opened 21 October 2026) |
| `v17_games.js` | Supporting code |
| `v17_glue.js` | glue |
| `v17_ineq.js` | INEQUALITIES AND ACTION |
| `v17_learn.js` | LEARNING AND COMMUNITY RESOURCES |
| `v17_people.js` | LIFE STAGES, GROUPS AND INTERSECTIONALITY |
| `v17_self.js` | SELF-* ROUTINES, USER STORIES AND JOURNEYS |
| `v17_talent.js` | TALENT ROUTES AND NETWORKS |
| `v17_tools.js` | D-069: external links are escaped and must be http(s) |
| `v17_visual.js` | VISUAL: more icons, motifs and gentle motion (always off when reduced motion is asked for) |
| `v18_bench.js` | BENCHMARKS: UK nations, international and supranational |
| `v18_data.js` | DATA: possible nominations for this hub (each page opened 21 October 2026) |
| `v18_data2.js` | DATA: benchmarks (each page opened 21 October 2026) |
| `v18_glue.js` | glue: graph, tooltips, navigation |
| `v18_glue2.js` | glue: notices, review, nominations, benchmarks |
| `v18_graph.js` | KNOWLEDGE GRAPH: portal-wide, interactive, five modes |
| `v18_nav.js` | NAVIGATION: breadcrumbs, previous and next, A to Z, graph wiring |
| `v18_notices.js` | ACKNOWLEDGEMENTS, CREDITS, LICENCES, COPYRIGHT, DISCLAIMERS, DISCLOSURES, NOTICES |
| `v18_review.js` | REVIEW, ASSESSMENT AND EVALUATION (self-assessment by the builder; not independent) |
| `v18_tips.js` | TOOLTIPS EVERYWHERE (WCAG 1.4.13: hoverable, dismissible with Escape, persistent) |
| `v19_charter.js` | MISSION, CHARTER, RULES OF ENGAGEMENT AND TERMS OF REFERENCE (proposed, for comment) |
| `v19_glue.js` | glue: sustain the hub |
| `v19_sustain.js` | SUSTAIN THE HUB: proposal, roles, year-round programme, expressions of interest, ideas and issues |
| `v20_data.js` | partners, boards, funders and archives: every organisation page opened 21 October 2026; organisation contact pages only |
| `v20_fix.js` | FIXES from the forensic code review and the visual inspection |
| `v20_partners.js` | GOVERNANCE, PARTNERS, FUNDERS AND ARCHIVES |
| `v21_ia.js` | INFORMATION ARCHITECTURE: grouping, order of precedence, labels, titles, related pages, search, source summaries |
| `v21_quality.js` | QUALITY DIMENSIONS: measured before and after, with what remains |
| `v22_glance.js` | AT A GLANCE: short summaries at the top of long reference pages, computed from the page's own data |
| `v23_guide.js` | USER GUIDE, GUIDED TOURS, TUTORIALS AND COLOUR ACCENTS |
| `v24_data.js` | FAQ and Pan-African colours: researched 22 October 2026; every point links to a page that was opened |
| `v24_faq.js` | FREQUENTLY ASKED QUESTIONS AND THE PAN-AFRICAN COLOURS |
| `v25_data.js` | knowledge that shaped Africa, and many cultures not one: researched 22 October 2026 |
| `v25_knowledge.js` | HOW KNOWLEDGE SHAPED AFRICA, AND MANY CULTURES NOT ONE |
| `v26_defer.js` | DRAW HEAVY PAGES ON DEMAND |
| `v27_gaps.js` | GAPS FILLED: verified additions placed where they belong |
| `v27_gaps_data.js` | verified additions: gaps filled and re-checked against the live pages on 22 October 2026 |
| `v28_words.js` | WORDS MATTER: race and ethnicity, Black and African, terms to avoid, and a language check on the hub's own text |
| `v28_words_data.js` | Words matter: researched and checked 22 October 2026 |
| `v29_peoples.js` | AFRICA'S PEOPLES, REGIONS, SEAS, BORDERS AND DISPLACEMENT |
| `v29_peoples_data.js` | Africa: peoples, regions, seas, borders and displacement. Researched and re-checked 22 October 2026 |
| `v30_ppmap.js` | MAP FOR THE PEOPLES PAGE: AU regions, islands, seas, divided peoples |
| `v31_gaps3.js` | GAPS CLOSED: Jamaica's flag, the Rift Valley, Africa's population share, ironworking, six more language terms |
| `v31_gaps3_data.js` | gaps closed: researched and checked 22 October 2026 |
| `v32_genome.js` | DNA, GENOMES AND AFRICAN ANCESTRY |
| `v32_genome_data.js` | DNA, genomes and African ancestry: researched and checked 22 October 2026 |
| `v33_polish.js` | POLISH: African roots links; A to Z wraps both ways; checks for the view switch and roots links |
| `v34_lens.js` | LENS PAGES: being Black, enterprise, young lives, and the view from other work |
| `v34_lens_data.js` | lens pages: researched and checked 24 October 2026 |
| `v35_nav.js` | GLOBAL NAVIGATION ON TABLETS AND PHONES (D-102) |
| `v36_world.js` | WORLD CIVILISATIONS IN PARALLEL (on the History page) |
| `v36_world_data.js` | World civilisations in parallel: researched and checked 24 October 2026 |
| `v37_repeat.js` | REPETITION AUDIT: find content said twice, and stop new content repeating old (D-105) |
| `v41_pagekit.js` | PAGE KIT: features of the newer pages carried to the older ones, and similar content co-located (D-110 to D-113) |
| `v41_pagekit_data.js` | page kit data: summaries and vantage points written from each page's own content (checked by C153, C154); cross-page links |
| `v42_lt.js` | LANGUAGE OF THE TIME: explain historical terms instead of banning them blindly (D-116, D-117) |
| `v42_lt_data.js` | Language of the time: researched and checked 25 October 2026; every entry has two or more independent sources |
| `v43_global.js` | BLACK COMMUNITIES AROUND THE WORLD, HONOURING OUR COMMUNITIES, AND A GLOBAL COVERAGE AUDIT (D-119, D-120) |
| `v44_awards.js` | RECOGNITION AND REPRESENTATION: PRIZES, HONOURS, MEDALS, FELLOWSHIPS AND SCHOLARSHIPS (D-121) |
| `v45_github.js` | IDEAS AND WISHES ON GITHUB (D-123) |


## Build guards
- `src/ctxkeys.py` (run by `patch_v15.py`): each self-check adds its evidence to one shared object under its own key; the build fails if two checks use the same key, which once made a check silently read another check's evidence (D-135).
- `scripts/sync_forms.py`: the issue forms' page lists are generated from `data/bhm2026-pages.json`; `tests/validate_data.py` fails if they differ.
