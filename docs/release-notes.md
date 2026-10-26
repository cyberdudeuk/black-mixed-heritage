# BHM 2026 Hub: release notes and verification log

Repository: https://github.com/cyberdudeuk/black-mixed-heritage. Current version: 2.21.0 (26 October 2026).



## 2.21.0 (26 October 2026): features the repository supports
- **Calendar, community events:** a maintainer accepts an "Event for the calendar" issue by adding `status: accepted`. The **Event intake** workflow checks the details (dates written YYYY-MM-DD, not already over, an https link to the organiser's page, sensible lengths, no personal data, not added before), adds the event to `src/community-events.json`, rebuilds the hub and opens a pull request that closes the issue. If a check fails it comments with the reasons. The hub checks every community event again before showing it and uses the organiser's page as its source.
- **Calendar, nomination deadlines:** the published award and nomination deadlines are now calendar entries (filter **Nomination deadlines**), and the calendar file asks subscribed calendars for reminders 14 and 2 days before each. A weekly workflow opens a `deadline` issue four weeks and one week before.
- **Assurance, repository checks:** on the website, the latest result of each repository workflow on `main` (Checks with its jobs, CodeQL, Scorecard, Website health, the link check and Release), from a `checks.json` the website workflow publishes when any of them finishes. Unknown workflows, results and links are dropped.
- **Assurance, source freshness:** every source with the date it was last read and the date it is due to be read again, filterable, with counts by status. The monthly checklist issue now lists the sources falling due.
- **Open data:** `bhm2026-sources.json` (read and re-read dates), `bhm2026-deadlines.json`, and a release feed, `bhm2026-releases.atom`, linked from the website's head and the Help run the hub page.
- **Volunteering in public:** outside Claude, the expression-of-interest form offers GitHub's new Volunteer form, filled in with the roles, months, skills and commitment chosen; notes and networks are never copied, because issues are public.
- **Discussions:** Help run the hub links to Discussions for announcements and club polls; the book and film club explains how to hold a vote there outside Claude.
- **Checks:** C164 (community events, deadlines, freshness and the checks report, with 13 unsafe-input tests), C165 (no inline handlers or script links); C88 now covers all seven issue forms the hub links to; `tests/test_event_intake.py` (14 cases) runs in CI; the data validator checks the new files, the deadline reminders, the feed's version, and that every linked issue form exists with the field the hub fills in. Every workflow is now linted in CI (actionlint, with shellcheck on every script; it found an unquoted condition and an unsafe `export` before they shipped). Five new injected defects in `tests/negative.sh` (now 9).
- **Security, from an independent review before release:** the review found that a crafted event link with quotes in its host name (which URL parsers accept) would have been written unescaped into the calendar's source links, adding a script handler; it was stopped only by human review of the pull request. Fixed in depth: every source link in the hub is now escaped where it is written (13 places); community links must have a plain host name in the intake script, the hub and the data validator; a new self-check (C165) fails if any element on the page carries an inline event handler or a link that runs script (the hub uses none). The review's other findings are fixed too: the intake script reads only the form's own headings, the first time each appears (an answer could otherwise override the link or place); it requires the privacy box to be ticked; it refuses postcodes, street addresses, spelt-out email addresses, phone numbers with dots and invisible formatting characters; it counts length as the hub does; it never echoes what was typed; it refuses an event with the same name and date; the workflow stops if a pull request for the event is already open, gives the write token only to the steps that need it, installs packages without running their scripts, comments on the issue if any step fails, and asks the reviewer to check by eye what a machine cannot (names of private individuals). 14 new intake tests (28 in all).
- **Docs:** data dictionary for the new files, admin guide (Event intake, deadline reminders, the Actions setting to allow pull requests), user manual, README, operations, decision record 0009, wiki pages.
- Verified: 165/165 in-page checks on both editions at 1280px light and 390px dark; a community event appears in the calendar with its source, and an unsafe one (`</script>` in the name) is refused, not shown, and fails C164; a sample `checks.json` with an unknown workflow and a `javascript:` link showed only the two valid rows; axe-core 4.14 clean on Assurance, Calendar and Help run the hub at both widths; all nine injected defects caught, each for its own reason; actionlint and shellcheck clean on every workflow.

## 2.20.0 (25 October 2026): a resilient, secure and self-releasing repository
- **Accessibility:** the masthead logo, the futures quadrants, the network map and the knowledge-graph nodes now have accessible names that contain their visible text, including labels shortened to fit (WCAG 2.5.3 Label in Name). Found by axe-core 4.14 when Dependabot updated the CI scanner; a new self-check (C163) confirms it on whichever page is open. Shown failing on 2.19.1 and passing on 2.20.0 at 1280px and 390px.
- **Sources:** five observance days in the calendar (International Day for the Elimination of Racial Discrimination; the International Day of Remembrance of the Victims of Slavery and the Transatlantic Slave Trade; Windrush Day; Emancipation Day; the International Day for the Remembrance of the Slave Trade and its Abolition) and the New Cross fire remembrance now cite authoritative sources (UN, UN News, GOV.UK, The National Archives, UNESCO, George Padmore Institute). Found by the new open-data validator.
- **Releases:** merging a new version publishes the GitHub release automatically, with the single-file hub, open data, Teams app, SHA-256 checksums and a signed build-provenance attestation. Release policy, hotfixes and rollback are in `docs/release-management.md`.
- **Checks in CI:** open data and website files (sources, ICS and JSON agree, linked data, `security.txt` expiry, page-weight budgets); third-party licences; and checks of the checks (`tests/negative.sh` injects four known defects and fails if any check misses one).
- **Security:** every action pinned to a commit, read-only default tokens with per-job permissions, no persisted checkout credentials, and an OpenSSF Scorecard workflow. A licence assessment and third-party notices (`THIRD_PARTY_NOTICES.md`).
- **Monitoring:** a website health check every six hours opens an `uptime` issue if the website, calendar, linked data, ideas list or security contact fails, and closes it when they recover.
- **Wiki and Discussions:** the wiki is generated from `docs/wiki/` on merge; discussion forms for Q&A, Show and tell and General steer corrections and bugs to the issue forms. An optional workflow adds issues to the project board.
- **Documentation:** `docs/operations.md` (robustness, resilience, backup and moving host, threat model, capacity, sustainability, monitoring, engineering standards), `docs/release-management.md`, eight architecture decision records, and updated admin guide and README.
- Verified: 163/163 in-page checks on both editions at 1280px light and 390px dark; privacy scan, data validation and licence check clean; all four injected defects caught; axe-core 4.14 on all pages at both widths (see the pull request); the health check run against the live website returned 200 and the expected content for all five addresses.

## 2.19.1 (25 October 2026): keyboard access to redrawn charts
- The new accessibility scan in CI found the volunteer-hours chart on Help run the hub scrolling sideways at phone width without a keyboard tab stop for a moment after it was drawn. Charts and tables redrawn after start-up are now re-marked straight away, and a new self-check (C162) confirms every sideways-scrolling region on the page in view can be reached by keyboard. Shown failing on 2.19.0 with a simulated redraw and passing on 2.19.1.
- The CI accessibility scan waits for on-demand charts to finish drawing before scanning each page.

## 2.19.0 (25 October 2026): user manual, admin guide and a complete repository
- **Documentation:** a user manual and a repository admin guide (settings, workflows, labels, monthly routine, issues, personal data and moderation, reviews, releases, Projects, Discussions options, troubleshooting), plus architecture, content style guide and data dictionary, indexed in `docs/README.md`. The hub's Help run the hub page links to the manual and the guide.
- **Community files:** SUPPORT, GOVERNANCE, ACCESSIBILITY, PRIVACY, CHANGELOG and CITATION.cff; CONTRIBUTING and SECURITY rewritten; a source suggestion form; a fuller pull request checklist; `.editorconfig` and `.gitattributes` (built files marked as generated).
- **CI:** an axe-core scan of all 55 pages at 1280px light and 390px dark on every pull request; CodeQL scanning of the JavaScript and the workflows.
- **Website:** a 404 page, `robots.txt`, `sitemap.xml` and `.well-known/security.txt`.

## 2.18.0 (25 October 2026): privacy fix for the templates; the repository builds anywhere
- **Privacy:** the three downloadable Office templates (slides, report, induction pack) carried a personal name in their document properties. They now carry only the hub's name. A new scan (`tests/privacy_scan.py`) opens every file embedded in the pages and fails if an author field is not the hub's name, if an image carries author metadata, or if a personal email address or private link appears; it runs in CI and was shown to fail on the previous build.
- **Reproducible build:** the map outlines, comparison data, templates and the Teams library now live in `src/vendor/`, scripts use paths relative to the repository, and `package.json` pins the test tools. A clean copy builds byte-for-byte the same pages; CI rebuilds `dist/` and `site/` and fails if they differ from what is committed.

## 2.17.1 (25 October 2026): In memoriam
- A few words about the maker's mother and about the women of the family, drawn from the family's own archive and anonymised: no names, places, dates beyond the two already shown, occupations, migration details or health.

## 2.17.0 (25 October 2026): ideas through GitHub; In memoriam
- **Ideas, wishes and issues through the public repository:** the hub opens GitHub issue forms prefilled field by field, including the page the reader was on. On the public website, the ideas box shows the open ideas and feature wishes raised on GitHub, with their support (thumbs-up reactions), comments and status, from a list that a repository workflow publishes every six hours and on every change. The list holds titles, labels, counts and links only; the page holds no token; items that fail checks are dropped and titles are shown as text, never HTML (C161, D-123).
- **Repository workflows:** issue triage with a privacy check (needs-redaction keeps an issue off the hub); label sync with status labels; in-page self-checks and a privacy scan on every pull request; a monthly link check; a monthly triage checklist; release packaging; Dependabot. A new issue form suggests events for the calendar; page lists in the forms now match the hub's 55 pages.
- **About this hub:** more on how the hub came to be, without personal details, and an In memoriam dedication to the maker's mother (17 April 1930 to 25 October 2018) and to all the women of the family, in keeping with the matrilineal tradition of the family's south-west African clan.
- Verified: 161/161 in-page checks on both editions at 1280px light and 390px dark; a broken page makes the CI check fail; accessibility scans of the About page and the GitHub ideas section clean at both widths; a mock feed with an unsafe link and an HTML title showed only the safe items, as text.

## 2.16.1 (25 October 2026): public repository
- The hub's issue, correction, idea and accessibility forms now open in github.com/cyberdudeuk/black-mixed-heritage; the GitHub Pages and Teams editions are built for https://cyberdudeuk.github.io/black-mixed-heritage/.
- Personal names removed from the licence, content licence, Teams app manifest and poster metadata.

## 2.16.0 (25 October 2026): Collecting ethnicity data
- **New, inside the language page: Collecting ethnicity data** (32 points in four sections):
  - How: the GSS harmonised question based on the 2021 Census; self-description; "prefer not to say" always; write-in options; special category data with the Data Protection Act 2018 Schedule 1 paragraph 8 condition; never inferring ethnicity (ICO); small-number suppression and published declaration rates.
  - When: at application with answers hidden from the sift (Civil Service; name-blind since 2015); the Nuffield field experiment (60% more applications); mixed results for anonymised shortlisting (Canada, Australia); grants at application, hidden from panels (UKRI, Royal Society, Wellcome); honours and screen awards after selection; data supplied later has bigger gaps (UKRI about 7% against 35%); public services at registration.
  - Barriers: unclear purpose and low trust, fear of worse treatment, categories that do not fit Mixed and African or Caribbean people, feeling compelled; employers' legal uncertainty (50% cited GDPR), low response (about 47% could not publish), cost and systems; most gaps are people not asked (Civil Service: 76,190 unknown against 20,760 declined).
  - Declaration rates: Civil Service about 82% (hub's calculation from rounded counts), NHS 4.3% undisclosed, solicitors 4% prefer not to say, UKRI, honours (0.6% or about 10%, disputed), the arts (21% not known), GP records, stop and search (19.3% missing), employers, stated willingness against recorded disclosure, and the status of ethnicity pay gap reporting.
- Verified: 160/160 in-page checks; accessibility scan of the language page clean at 1280px and 390px.

## 2.15.0 (25 October 2026): Recognition and representation; Central Africa; private-project references removed
- **New, inside the culture page: Recognition and representation** (152 points in eight sections, plus a 68-row summary table). It covers UK honours lists, military medals and national honours, Nobel and science prizes and learned academies, research grants and fellowships, scholarships, film, television and stage, books, music, art and journalism, and professions. Every row is a published count, linked to its sourced point; the hub classifies no one. Baselines: Black 4.0% of England and Wales (2021), 12.4% of the US (2020, Black alone). C160 proves each row links its point and names who counted (D-121).
  - Headlines: Black recipients 3.0% to 6.1% of UK honours lists (2019 to 2025); Nobel about 14 to 17 Black laureates (disputed), 0 of 617 in physics, chemistry and medicine; Oscars acting nominations 69 of 1,021 (1970 to 2020); Pulitzer 30 of 943 named winners (1917 to 2016); Royal Society Fellows 2 of 721 respondents (2024); UKRI award rate 13% Black against 34% White (2023 to 24); US Medal of Honor 93 of 3,515.
  - Gaps stated openly: no published ethnicity counts for the Booker, Mercury, Turner, Olivier, Victoria Cross or most scholarships, and no data on honours nominations.
- **Central Africa and more Caribbean islands** (24 points) added to Black communities around the world: Kongo, Ndongo and Matamba, Loango, Kuba cloth, the Luba and Lunda states, the Bamum script, Fang reliquaries, Kanem-Bornu, Boganda, Congolese rumba, the Congo Free State and Casement, Census 2021 counts of people born in DRC, Angola and Cameroon; Mary Prince, Fédon's rebellion, the Grenada Revolution with its counter-argument, the Bahamas and Junkanoo, Dominica, Trinidad's Emancipation Day, canboulay and Berbice 1763. Central Africa coverage floor restored to 2%.
- **Privacy (D-122):** a review found the hub still credited the maker's private projects: the nomination steps were "adapted from" one, nine award notes said "(portal)", the About notice named one, a "related work" card described the maker's wider work, and 14 lens-page points rested on private portals or private artifact links. All were removed or re-sourced to public pages; 14 points that rested only on private work were dropped. C157 now also fails on private artifact links and portal credits, proved by a deliberate break.
- **Wording:** the culture terms check found "non-white", "BAME" and "Blacks" in source groupings and a journal title; these are now quoted as the source's own words, and the journal title is listed as a proper name.

## 2.14.0 (25 October 2026): Black and Black-Mixed communities around the world; honouring our communities; global coverage audit
- **Coverage audit (before):** of all mentions of world regions across the content pages, the UK had 44% (expected for a UK audience), the Caribbean 12% (mostly the generic word; individual islands thin), West Africa 9.5%, USA and Canada 6%, East and North Africa 5% each, Southern Africa 4%, continental Europe 2.4%, Central Africa 2.2%, Latin America 1.6% and African-descended communities in Asia and the Middle East almost nothing — although Latin America has about 133 to 134 million people of African descent, the largest such population outside Africa.
- **New, inside The African diaspora page: Black and Black-Mixed communities around the world** (115 points):
  - Latin America (27): regional size and poverty gap; the UN's second Decade for People of African Descent and the Permanent Forum; Brazil (55.5% Black or brown in 2022; 1.3 million quilombolas counted for the first time; land titles; Zumbi Day a national holiday; capoeira and samba de roda; teaching law; pay gap); Colombia (disputed census count; Law 70; Palenque; Raizal; marimba); Ecuador; Peru; Venezuela; Garifuna heritage and Honduran land rulings; Panama; Costa Rica; Mexico; Argentina; Uruguay's candombe.
  - Continental Europe and Canada (26): France's lack of ethnic statistics, the Taubira law, 10 May and Négritude; the Dutch apology and Keti Koti; Surinamese Dutch; Belgium and Congo; Matonge; the AfricaMuseum (disputed); Afro-Germans; Lisbon's African history; Portugal; Italy; Spain; Afro-Swedes; Black Irish; the EU "Being Black" survey (2023); Black Canadians, the Black Loyalists, Africville, Viola Desmond and Emancipation Day.
  - South Asia, the Middle East and the Caribbean (25): the Siddi and their music; Malik Ambar; the Habshi sultans; Pakistan's Sheedi; Afro-Sri Lankans (the term explained); Chagossians; the Zanj rebellion; Black Iraqis; Afro-Iranians; Afro-Turks; Saudi abolition (1962); Gulf liwa; the Muhamasheen (African descent disputed); the Haitian revolution and indemnity; Barbados as a republic; Suriname's Maroons; Guyana; St Kitts and Antigua World Heritage; Bermuda; calypso and steelpan; Saint Lucia's two Nobel laureates; the Garifuna's St Vincent origins; Cuban rumba.
  - Mixed heritage around the world (37): census categories country by country (Cabo Verde, Venezuela, Puerto Rico, Brazil, the Dominican Republic, Cuba, Belize, Trinidad and Tobago with Dougla, Guyana, the USA, South Africa's Coloured community, Colombia, Jamaica, Canada, Portugal, the UK, the Bahamas; and where no census asks); what genetic studies say; the word "miscegenation" (an 1863 hoax), anti-mixing laws and why the hub does not use the word; how to read the numbers.
- **New, inside the theme page: Honouring our communities** (37 points): plaques, monuments and renamings; days of remembrance; museums, archives, grants and scholarships; honours, awards and workplace programmes; and the hub's proposals by who acts (individuals, workplaces and staff networks, schools, councils and public bodies, faith and community groups, media and cultural institutions, government).
- **Global coverage audit** on the review page, with floors for under-covered regions (C159). Known gap: Central Africa remains the thinnest African region and is next for research.
- **Not included (insufficient sources this round):** Grenada, the Bahamas and Dominica beyond census figures; Mary Prince; Trinidad's Emancipation Day and canboulay; the 1763 Berbice uprising; Afro-Palestinians; Norway; library and school programmes for the theme section. A search limit was reached during research.
- Every menu already holds nine pages, so these sections are shown inside the pages they belong with; they are placed before start-up so the drawer, search and checks treat them as part of the host page.

## 2.13.2 (25 October 2026): made in a personal capacity
- Verified: 158/158 in-page checks; accessibility scan of the changed pages (About, lenses, enterprise, young lives, history, language) clean at 1280px and 390px.

## 2.13.1 (25 October 2026): privacy follow-up
- The privacy check (C157) had the exact strings it guards against (the author's former job title and a private conversation title) written into its own pattern, so anyone reading the page source could see them. It now uses general patterns ("the user's", "chat '…'", research-process phrases); the planted-defect test uses an invented title.
- A note linking the Lusophone Africa entries to the author's own research was replaced: those entries rest on published scholarship (for example Curto 2023 on the Moçâmedes register), in line with the rule that personal family-history work is not used in the hub.

## 2.13.0 (25 October 2026): Curriculum and reference works; language of the time; every single-source claim now has a second source
- **New page, Curriculum and reference works** (Resources, #curriculum): 28 points in four sections.
  - The four nations: England's review and the government's timetable (curriculum 2027, first teaching 2028, GCSEs 2029), the Historical Association's welcome and The Black Curriculum's criticism, the earlier "flexibility" position; Wales (mandatory since 2022); Scotland (open curriculum, new lessons October 2025); Northern Ireland (no named requirement).
  - Evidence: Royal Historical Society 2018; Runnymede 2019 (about 4% of GCSE history pupils took a migration unit in 2018); Historical Association survey; the three exam boards' migration units.
  - The hub's proposals, labelled as arguments: themes past, present and future; skills; an open reference seeded from verified content; partners and funders.
- **Language of the time** (language page, #lw-time): 20 terms explained instead of blanket-banned: half-caste; coloured (UK and US); colour bar; Coloured (South Africa, a self-identity); Negro; West Indian; "immigrant" pupils; ESN; BAME and BME; tribe (debated); slave and enslaved (debated); colonial classifications; Dark Continent; "race" in census categories; New Commonwealth; Afro-Caribbean; mixed race (debated); people of colour (debated); Blak; non-white. Each has at least two independent sources. 98 quoted or named uses across the hub now carry a link to their explanation. The hub's own voice is still checked (C123); works written to spread prejudice are still paraphrased. New check C158.
- **Evidence:**
  - all 29 single-source claims now have an independent second source (13 of them only for part of the claim, which the card says);
  - five sources that could not be read in full were replaced; Trevor-Roper's remark is now dated (The Listener, 28 November 1963);
  - weaker sources upgraded (Songhai, Yoruba counting, Ishango, Rodney, Great Zimbabwe, House of Wisdom);
  - strip-search figure: "almost eight times" is from the Children's Commissioner's April 2026 report (July 2023 to June 2024, compared with White children); earlier reports compared with population figures (up to six times, 2018 to mid-2022; over four times, July 2022 to June 2023);
  - wording: iron-working dates "remain disputed"; Songhai "in West African history"; "some scholars" on Sankore; Mali "declined after the 14th century"; city-size notes credit McEvedy via Fordham, not a Wikipedia table; the "more advanced" comparison now rests on Córdoba;
  - new world-timeline event: the Black Death in the Middle East, 1347–1349 (285 events);
  - plain-http sources removed.
- **Older pages, two-source audit of all 118 "In short" sentences:** 40 triangulated, 58 rest on one publisher (often because only one government body holds the data), 18 have no factual claim, 2 were wrong. Corrected in both the passage and the summary:
  - the Civil Service Fast Stream has 18 specialist schemes, not 17;
  - African migration: UNDP's "over 80% within the continent" is now shown alongside the IOM and African Union figures (51% of emigration from African countries; 83% of immigration into them).
  - Also corrected: London Transport recruited directly from Barbados from 1956 (the NHS ran similar schemes, not direct recruitment there); ethnicity pay gap reporting has draft clauses but no start date (not "by 2029"); Race at Work Charter "over 1,000" signatories; the Canadian name-blind pilot figures in the right order (46.0% name-blind, 47.3% traditional); Black Cultural Archives described as the Museums Association does (the only national heritage centre for Black British history), not "first"; okra's route to the Americas marked as not confirmed; the March 2026 UN resolution labelled as being on the transatlantic slave trade; a language-count summary no longer attributes a figure to a Britannica page that no longer gives it.
- **Checks:** 158 in-page checks.

## 2.12.0 (25 October 2026): Who built the stereotypes, and what they cost
- **New page** (Learn, #stereotypes): 60 points in 12 sections, from the 18th century to today:
  - **Enlightenment:** Linnaeus, Blumenbach and the word "Caucasian", Hume's footnote and James Beattie's 1770 reply, Kant (disputed: Bernasconi, Kleingeld and Marwah), and Edinburgh renaming the David Hume Tower.
  - **Slavery's writers, and the first Black answers:** Edward Long's History of Jamaica; Banneker, Equiano and Cugoano.
  - **Victorian Britain:** Carlyle and Mill, Morant Bay and the Eyre controversy, Knox, and James Hunt's Anthropological Society.
  - **Race science:** Morton (disputed: Gould, Lewis et al. 2011, Weisberg, Kaplan and Pigliucci), Nott and Gliddon, Gobineau, Galton; answered by Douglass (1854) and Firmin (1885).
  - **Eugenics and empire:** Pearson, the Galton Laboratory and the Annals of Eugenics, the 1930 Liverpool report on mixed-heritage children, Lugard's indirect rule (disputed), the 1924 British Empire Exhibition.
  - **After 1960:** Jensen, Shockley, the Pioneer Fund and Mankind Quarterly; the 2020 retraction of a Rushton paper and the 2024 Royal Society retraction of a paper built on Lynn's national IQ data.
  - **Britain:** Caribbean children over-placed in "educationally subnormal" schools; the 1971 pamphlet and the supplementary school movement; the Rampton (1981) and Swann (1985) reports (disputed by the government of the day); Policing the Crisis and the "mugging" panic.
  - **Legacy in public services:** 1950s Home Office reports, the 1962 to 1971 immigration laws and the Windrush review; false beliefs about pain; maternity care; race correction in lung tests; Child Q and police strip-searches of children.
  - **Public perception:** British Social Attitudes self-reported prejudice; the EVENS survey.
  - **Answering back:** Du Bois (London 1900; Black Reconstruction), Diop (disputed), the APA's 1996 review, Gould.
  - **Reckoning:** UCL's inquiry, renaming and apology; the Adelphi Genetics Forum; Glasgow and Cambridge; UNESCO 1950 and 1951; the American Society of Human Genetics' 2023 apology; Pitt Rivers and Wellcome.
- **Rules applied:** only people who have died are named, and only in a public or scholarly role; offensive language is paraphrased; every point has at least two independent sources, at least one authoritative; quotes are word-for-word extracts from the full page (the fetch tool would not return whole pages verbatim, and every source records how it was read). 24 claims were rejected for lack of two independent sources, including retractions of Lynn's papers by Elsevier and Springer, and a Swann claim that could not be found in the report.
- **No repetition:** five facts found by more than one researcher (UCL, the Lynn retraction, UNESCO 1950, Pitt Rivers, the "mugging" panic) appear once; Hegel, Trevor-Roper, the Hamitic hypothesis, Great Zimbabwe and eGFR stay on their pages and are linked both ways.
- **Re-check of 2.11.0's new sources** (71 claims, 132 claim–source pairs, read through the whole served page text):
  - 126 quotes confirmed word for word; 5 pages could not be read in full; 1 quote not found on its page (removed).
  - 36 claims triangulated by two or more independent publishers; 29 rest on one independent source and now say so on the card; 39 more sources added.
  - 5 claims corrected: the Ebers Papyrus (remedies of many kinds, not only herbal); iron in Europe (south-east about 1200 BC, Greece about 1050 BC, Britain about 800 BC); Meroitic (cursive form 3rd century BC, hieroglyphic 2nd century BC); Drescher's argument concerns the abolition of the slave trade in 1807; Arabic writers described the trans-Saharan routes later, not from the 8th century.
  - Also: UNESCO "began work on" the General History of Africa in 1964; the Nabta Playa cattle question is marked as still debated; the hoodia agreement dates corrected (acknowledgement 2002, agreement 2003).
  - Some apparent pairs of sources were one publisher (a reprinted column, a museum's text republished elsewhere, two chapters of one book) and no longer count as triangulation.
- **Also:** the lens pages now show their page title visibly; Food and heritage moved to This month.

## 2.11.0 (25 October 2026): the newer pages' features carried to every content page; similar content co-located and repeats merged
- **Assessment** (feature inventory of every page, plus section-level and passage-level similarity across 263 sections and 1,449 passages):
  - Only the 8 pages added from 2.8.0 had "In short" and "From where you stand". Twenty older content pages had neither, though several hold more evidence than the new ones.
  - Most-overlapping pages: Journeys and African knowledge, Other lenses and DEEIA, Inequalities and Other lenses, Journeys and What was lost, Life stages and Young lives.
  - Near-duplicate passages: Aksum (three times), civil service representation (twice), Black Equity Organisation and the Ubele Initiative (networks and partners), Black Cultural Archives (schools and archives).
- **Applied to the 20 older content pages** (Lead: inequalities, benchmarks, life stages, careers, talent; Learn: history, Africa, diaspora, innovation, tech, culture, food, futures; Understand: language, African knowledge, peoples, DNA, myths, belonging, debates):
  - **In short:** 118 plain-English sentences, each 25 words or fewer and linked to the passage it summarises. Every number must appear in that passage, and at least half the sentence's key words must come from it (C153).
  - **From where you stand:** 198 suggestions for different readers (Black, African, Caribbean or Mixed readers; colleagues and allies; managers; policy makers; data professionals; young people; teachers and community groups), each linked to the passages it rests on (C154).
  - Applied where they help, not everywhere: key figures, timelines and filters stay on pages with enough data; the review page shows which page has which feature (C156).
- **Co-located:**
  - 30 pairs of sections on different pages that cover the same ground now link to each other both ways ("Also covered on other pages", C155).
  - Menus: What was taken, lost and might have been moved to Learn, after Journeys; The African diaspora moved to Understand, beside What it means to be Black. Both menus still hold nine pages.
- **Merged:** each repeated passage now lives in one place, with pointers from the others. The repetition check now fails new content that repeats half of an existing passage (it previously allowed up to 79%, D-114).
- **Not merged, on purpose:** the overview spotlights are short teasers that link to the full diaspora entries; inequalities, life stages and young lives serve different readers, so they now link to each other instead.
- **Evidence strengthened:** 58 points on Journeys (23) and What was taken (35) that rested on Wikipedia alone now cite museums, universities, UNESCO, Britannica or journals; Wikipedia stays only as a secondary link. 46 texts were corrected to what the stronger sources support, for example:
  - earliest Egyptian writing about 3320 BC (labels from a royal tomb at Abydos), not 3250 BC; Meroitic deciphered in 1911, not 1909;
  - Egypt's civil calendar: 12 months of 30 days plus five days (the unconfirmed "by 2500 BC" removed);
  - Trevor-Roper's phrase is "unrewarding gyrations"; about 300,000 Timbuktu manuscripts moved to safety (UNESCO); Kilwa's medieval wealth came mainly from gold and ivory;
  - unconfirmed figures removed (Engerman's "less than 5%", a 40% museum share, single city-size estimates now shown as ranges that vary between historians).
  - One quotation attributed to Caton-Thompson could not be found in any source that could be opened, so the point was removed.
- **World timeline: 12 new events (284 in all).** Central and Southern Africa had no maths, astronomy or medicine events; they now have the Ishango bone and Border Cave notched bones (both marked disputed), Chokwe sona drawings, the Kongo dikenga, Luba lukasa boards, the Pleiades as the "digging stars", Canopus in Sotho and Tswana calendars, and Khoi and San knowledge of buchu and hoodia. Asian medicine gains Ge Hong's fever remedy (the root of artemisinin), Chinese variolation (disputed) and al-Razi on smallpox and measles. Rejected for lack of scholarly support: astronomical alignments at Great Zimbabwe and Mapungubwe, and Kuba textile symmetry.
- **Verification:** 157 of 157 in-page checks pass; each new check fails when its defect is planted; automated WCAG 2.2 AA scan (axe) found no violations at 1280px or 390px.
- **Checks:** 157 in-page checks (C153 to C157 new), each proven by a planted defect (D-110 to D-115).

## 2.10.0 (24 October 2026): world civilisations in parallel; Africa's knowledge and its journeys; what was taken, lost and might have been (published with 2.9.0 and 2.9.1 as Version 19)
- **World civilisations in parallel** (History page, #hx-world):
  - **Content:** 272 events in 15 regions and 12 fields of knowledge, from about 3500 BC to 1900. Africa has 78 events, against 31 each for Europe and West Asia.
  - **Interactive features:**
    - Filter by field, continent, period and search.
    - Press play to move through time, with a "meanwhile, around the world" panel showing what was happening elsewhere.
    - Open any event for its details, sources and what happened at the same time elsewhere.
    - A coverage grid of regions against fields, and a table view.
  - **Visual design:**
    - A moving collage of domain icons, which stops when reduced motion is set.
    - Continent colours are rings, so markers keep their contrast.
    - On phones, the timeline scrolls sideways inside its frame.
  - **Checking:** two verifiers re-read all 458 quotes. Corrections:
    - One quote was reworded to match its page (Zheng He).
    - The Fasil Ghebbi date was corrected to 1636.
    - Budj Bim's UNESCO source could not be read, so it is now sourced to the Council of Australasian Museum Directors.
    - Weak sources were replaced where better ones were found.
- **Africa's knowledge and its journeys** (Learn, #journeys): 137 sourced points.
  - Early evidence: Blombos, Lebombo, Ishango and early farming.
  - The Nile Valley (writing, the Rhind and Moscow papyri, the Edwin Smith papyrus), iron, Aksum, the West African empires and Timbuktu, the Swahili coast, Mapungubwe and Great Zimbabwe, scripts, mathematics and medicine.
  - Eight journeys of knowledge: the ancient Mediterranean, al-Andalus, numbers and algebra (Fibonacci in Béjaïa), places of learning, Sicily, medicine, Africa as Europe saw it, and the Indian Ocean.
  - A routes table.
  - Two sections test the claims: the Dogon and Sirius B, "Africans invented algebra", "the pyramids were built by slaves" and "Europeans brought civilisation".
- **What was taken, lost and might have been** (Understand, #whatwaslost): 143 points, each labelled as evidence, argument or counter-argument.
  - The scale of the slave trades: 12.5 million embarked, about 18 million across four trades.
  - Looting and destruction: Benin, Maqdala, Kumasi, Great Zimbabwe, and the Timbuktu losses not caused by Europeans.
  - Colonial-era narratives.
  - Disease before contact and in the so-called "Age of Discovery".
  - The Americas, Africa, the Middle Passage and Oceania, and why germs alone do not explain the deaths.
  - The medieval world side by side.
  - The economics and history debate, from Rodney and Nunn to Thornton, Austin and Pomeranz, with the limits of what can be known.
- **Corrections from verification:**
  - **Great Dying:** the "56 million" deaths figure is replaced by UCL's 55 million; the paper gives 90% of 60.5 million.
  - **Egyptian writing:** now about 3300 BC (University of Chicago), replacing a Wikipedia figure marked "citation needed".
  - **Herero and Nama:** the heading now says who uses the term "genocide".
  - **Balance:** the Pomeranz and critique points are worded as positions, not facts.
  - **Mansa Musa and the value of gold:** now sourced to al-Umari.
- **Repetition audit** (Review page): compares 1,300 or more passages and blocks new content that repeats existing content (C150). It lists older repeats for merging; currently one, the same organisation in two directories.
- **Fixes:**
  - Page source lists and source tooltips stopped at S999, so pages built since 2.8.0 listed only a few of their sources (C152). The planted-fault run then showed C152 passed when a page had no source list at all; it now fails in that case too.
  - On Saturdays the calendar's hidden "today" label widened the page on phones (C151).
  - Table group-by controls wrap on phones.
  - Timeline markers stay at least 24px apart and matrix numbers keep their contrast (axe, WCAG 2.2 AA).
  - Accent contrast probes now restyle the page once, not ten times, keeping evidence gathering under three seconds (C108).
- **Navigation:** Theme moved to This month and Questions people ask to Resources; every menu still has nine items or fewer.
- **New checks:** C149 to C152, each proven by a planted defect.

## 2.9.1 (24 October 2026): navigation on tablets and phones (published with 2.9.0 as Version 19)
- **The defect:** if the menu bar did not fit on one row, every group collapsed into a single "Menu" list about 3,400px tall. The list sat inside the sticky header, so on a tablet most of it could not be scrolled to.
- **Tablets (600 to 1199px):** the bar moves to its own full-width row below the logo and tools, and keeps every group that fits. At 768px and wider all seven groups show; only what does not fit folds into "More". The tagline is hidden below 1200px to make room.
- **Phones:** "Menu" opens as sections you can expand, with the section holding the current page open. It scrolls within the screen, stays clear of the bottom edge, and every page is listed once. Drop-down groups also stay within the screen.
- **Found while fixing:**
  - The hub's `$` and `$$` helpers ignore a second argument. A filter on one new page was therefore hiding cards on every other page, and the first menu build used the wrong elements. Scoped look-ups now use their own helpers (C148).
  - A new check's evidence key clashed with an existing one (`nav`, used by C82). It was renamed and caught by the existing check.
- **New checks:** C147 (the menu scrolls, every page is reachable once, sections open and close, and there is a tablet row break) and C148 (no cross-page filter leaks). Build tests now check navigation at 1024, 820, 768, 600 and 390px.

## 2.9.0 (24 October 2026): six new pages, from eleven research strands (Version 19)
- **What it means to be Black** (Understand, #blackness):
  - Identity as self-defined, with political blackness, Négritude, Pan-Africanism and Black Consciousness.
  - How the meaning differs in the UK, the USA, Brazil, the Caribbean and Canada, France, South Africa, Latin America, Asia and within Africa.
  - The African context in the UK (Census 2021): 2.4 million Black people (4.0%) and 1.59 million born in Africa, with countries of birth, languages, religion and where people live.
  - Reported findings from the Black British Voices Project and the EVENS survey, and a 19-event timeline.
- **Black enterprise** (Lead, #enterprise): strengths first (£25 billion from ethnic minority-led firms), then the gaps after launch (median turnover £25,000 against £35,000; 52% against 22% refused finance).
  - Public support, faith-compliant and community finance (pardner), and trade with Africa (the Developing Countries Trading Scheme and the AfCFTA).
  - History, from Dr Harold Moody's practice (1913) to New Beacon Books (1966).
- **Young lives: NEET, BEET and CHEET** (Lead, #younglives): the author's definitions, school departure events, adultification, care and youth justice, NEET by ethnicity, strengths, young people's voices as published, and what helps.
  - It reconciles 15.2% NEET at 16 to 24 (Milburn, 2024) with 1.7% at 16 and 17 (DfE data file).
- **Representation across the state** (Lead, #represent):
  - Ladders from entry to the top for the civil service (Black 7.7% of AA/AO, 1.6% of the SCS), the Fast Stream, the legal professions and judiciary (1 of 147 senior judges), police, armed forces, NHS and teachers, against the 4.0% population benchmark.
  - Parliament and the devolved legislatures.
  - Private offices, read through the author's private office operating model: no ethnicity data on private office staff is published anywhere, and this is recorded as a finding.
  - A list of 13 data gaps.
- **Through other lenses** (Resources, #lenses):
  - Responsible AI (Gender Shades, NIST, Bridges, pulse oximeters, ATRS).
  - Data and being counted (ethnicity standards, NHS recording, trust).
  - History, reparation, recognition and pay (1833 compensation, CARICOM, honours, the civil service pay gap of 4.5% UK-wide and 27.8% in London).
  - Public services (the care-to-adult seam, and Windrush as a records failure).
  - A life-course strand, a grid of where each lens meets the hub's themes, and reusable features.
- **The DEEIA lens** (Resources, #deeia): what diversity, equity, equality, inclusion and accessibility each mean, UK law and the devolved duties, policy from 2022 to 2026, published measures, accessibility and ethnicity, and intersectionality.
  - The debate for and against DEI programmes, with the strongest case on each side.
  - A coverage table that reads every new page through the five dimensions. It shows accessibility is the thinnest, an open gap.
- **On every new page:**
  - A short plain-English summary.
  - Filters by intersection: gender, faith, age, migration, care, health, money, place and justice.
  - DEEIA tags on each card.
  - A vantage point and who is affected on lens cards.
  - "From where you stand" suggestions for five kinds of reader, each linked to its evidence.
  - 20 new glossary terms.
- **Checking:**
  - Two independent verifiers re-read 240 sources and found six wrong claims, all corrected. Five notes said no civil service ethnicity pay gap is published; it is. A Windrush figure was overstated, and unsupported police facial recognition thresholds were removed.
  - Weak sources were replaced with primary ones (the Bridges judgment, the Windrush review, PAC HC 356).
  - Research notes and terms the hub avoids (BAME, BME, slaves, Coloured) were rewritten or quoted.
- **New checks C138 to C146**, each proven by a planted defect:
  - sourcing and hub notes;
  - no figures in hub notes;
  - tested intersection rules (the Black Country, "health care");
  - headline numbers;
  - suggestions linked to evidence;
  - no contact details or private links;
  - representation figures and gaps;
  - DEEIA rules (equity finance, the right to work);
  - summary numbers traced to evidence.
- **Fix:** table sort controls no longer overflow a phone screen.

## 2.8.1 (22 October 2026): linked data complete (Version 18)
- The JSON-LD download labelled 32 datasets as exported but contained only a few; it now includes all 32 with sources as citations, about 1,250 nodes, up from about 362 KB to about 494 KB (C137). Full suite 100/100; the negative run caught every planted defect, including C137.

## 2.8.0 (22 October 2026): DNA and genomes; Africa map; gaps closed; Teams and GitHub Pages edition (Version 17)
- **DNA, genomes and African ancestry** (Understand menu, #genome):
  - Why Africa holds the most genetic diversity.
  - 14 projects, from HapMap and 1000 Genomes to H3Africa, the Uganda Genome Resource and the UK cohorts.
  - Under-representation: 96% of participants were of European descent in 2009, about 81% in 2016; Genomics England says about 2% have African ancestry.
  - Health findings framed by ancestry, not race: sickle cell, APOL1, Duffy-null, and the move away from race-based kidney formulas.
  - What DNA shows about the trade in enslaved Africans, and the limits of ancestry tests.
  - Ethics: Henrietta Lacks, helicopter research and the NHS Race and Health Observatory 2024 review.
  - Checking: a second pass re-opened 60 sources, found all 86 quotes and corrected six overstated points, including the Tishkoff ancestry label and the context of the CDC malaria figure.
- **Map on the Africa peoples page:** the five African Union regions, 15 islands and the seas, with a way to highlight a people divided by borders (C131).
- **Gaps closed:**
  - Jamaica's flag meanings (National Library of Jamaica); why it has no red is still not confirmed.
  - The Rift Valley (Smithsonian).
  - Africa's share of world population: about 18.5% in 2024, a UN projection labelled as modelled.
  - The ironworking debate.
  - Six language terms: Dark Continent, discovered, urban, reverse racism, deficit framing, and firsts and tokenism.
  - 42 points that rested on Wikipedia alone now have stronger sources, which corrected details such as the Strait of Gibraltar (13 km) and São Tomé's settlement (1493), and removed unconfirmed figures.
- **African roots** links join the Africa, diaspora, knowledge, peoples and DNA pages.
- **Accessibility:** the Cards or List switch is a radio group with arrow keys, and the A to Z tab wraps both ways (C136).
- **Faster:** scroll hints wait for idle time, and the book club search waits for typing to pause.
- **Root-cause fix:** a new source that matched an existing one did not fill an empty summary; it does now.
- **Teams and GitHub Pages edition** (in the repository bundle):
  - `site/index.html` embeds the Teams JavaScript library 2.56.0, which starts only inside Teams.
  - A Teams app package validated against the manifest 1.19 schema.
  - A Pages deployment workflow, and a guide.
  - GitHub Pages sites are public.
- Full suite: 100/100; the negative run caught every planted defect, including C131 to C136.

## 2.7.0 (22 October 2026): words matter; Africa's peoples, regions, seas, borders and displacement (Version 16)
2.6.0 (Words matter) was built and passed its self-checks, but a new check then found editors' working notes on its page, so it was folded into this release rather than published on its own.
- **Words matter** (Understand menu, #language):
  - Race and ethnicity: what each means, and how UK law (Equality Act 2010, s.9), official statistics (ONS; GOV.UK "Writing about ethnicity") and science (American Association of Biological Anthropologists) use them. The rule the hub follows is labelled as its own reading.
  - Why "Black" and "African" are not interchangeable, using the 2021 Census groups for England and Wales (Scotland and Northern Ireland use different lists).
  - 26 terms, 11 of them marked as debated with both views (for example BAME, people of colour, global majority, mixed race, capitalising White, "ethnic minorities" or "minority ethnic", slave trade, hard to reach).
  - Five writing principles.
  - Checking: a second pass found all 109 quotes on their pages and reworded 14 overclaims.
- **The hub's own words corrected:** about 30 uses in the hub's own voice, for example "enslavers (‘slave-owners’ in the records of the time)", "ethnic minority workers (‘BME’ in the source)", "the trade in enslaved Africans", and official day titles in capitals. Quotations, titles and organisation names are unchanged. A language check scans every page whenever the self-checks run (C123 to C125).
- **Africa: peoples, regions, borders and displacement** (Understand menu, #peoples):
  - Scale: languages, families, genetic diversity, countries and islands.
  - The regions: North, Sahel, West, Central, East, Southern, the Atlantic and Indian Ocean islands and the Mediterranean basin, plus the AU and UN M49 frames and the "sub-Saharan" debate.
  - The seas and straits around the continent, and a table of 15 island states and territories.
  - How colonial borders were made: Berlin did not itself draw the map; about 80% of borders are straight lines in one estimate; 231 of 834 mapped homelands were split; the OAU 1964 decision to keep the borders.
  - Displacement from the trades in enslaved Africans to 2025, with a 32-event timeline and myths tested against the evidence.
  - Checking: 105 points from 102 sources; a second pass re-opened every page, confirmed 204 quotes, applied 50 rewrites and 32 stronger sources, and dropped one unconfirmed example (Tuareg).
  - Points that rest on Wikipedia alone say so. Things not confirmed are labelled as not confirmed by the sources cited.
- **Fixed in the live 2.5.1:** editors' working notes ("could not be opened today", "did not load") had reached three entries on the knowledge page and one other entry. A new check, C130, scans every researched dataset for them.
- Checks C123 to C130. Full suite: 100/100 in light, dark, desktop and phone; the negative run caught every planted defect, including all eight new checks (29/104 passing, as designed).

## 2.5.1 (22 October 2026): Africa, gaps closed, faster, fixes (Version 15)
2.4.0, 2.4.1 and 2.5.0 were combined into this release to save repeated test runs; 2.5.0 failed the full suite (a faint count on a selected chip; the ideas form scrolling sideways on phones after a long page name was added) and was not published.
- **Africa: many cultures, many kinds of knowledge** (Understand menu): eight sourced points on why there is no single African culture, and 39 sourced examples of how geometry, geography, mathematics, science and engineering, writing and codes, music, oral tradition, astronomy and farming shaped Africa, filterable by field and region. Seven debated claims are labelled with both views (African fractals, Ishango and Lebombo bones, mancala's origin, Nsibidi, Nabta Playa, Dogon and Sirius). A second check against the live pages reworded 15 overclaims and replaced four Wikipedia-only sources with the British Museum, Dartmouth's Hood Museum, the University of Colorado and Nature.
- **Gaps closed with re-checked sources:** Gypsy, Roma and Traveller History Month (every June since 2008) and the Netherlands' Black Achievement Month (October, since 2015) in the FAQ; the 2020 ministerial answer on Black British history in the curriculum (House of Commons Library, 2021); Ethiopia's flag meanings (Britannica); the True Size of Africa map; human origins (Smithsonian); Nok as an early ironworking centre (the Met); Djenné's replastering (AFP, 2025); the mbira on UNESCO's list (2020); sorghum in eastern Sudan in the fourth millennium BC; the Vai syllabary (about 1833); Ndebele painting; Sundiata. **Not found, so not published:** why Jamaica's flag has no red; Africa's share of world population; a source naming the Rift Valley; where African ironworking began.
- **Faster:** review, dashboards and knowledge graph are drawn when first opened; tooltips added when idle; static panels drawn once. Measured: desktop load 2.3 s (2.7 s two releases ago), phone slowed four times 8.1 s (was 12.1 s).
- **Code-review fixes:** half the myth-or-fact statements are now true; the owner can set each idea's status; ideas saved one at a time; external links checked and escaped; source references in tables are links; bingo printing waits for the print dialogue; dashboard bars are not tab stops; tab sets support Home and End; tooltips keep existing descriptions; the self-report re-runs every routine; AI retries if still loading; larger header buttons and checkboxes; consistent menu highlight.
- Checks C119 to C122. Full suite: 100/100 in light, dark, desktop and phone; the negative run caught every injected defect (29/104 passing, as designed), including C119, C121 and C122.

## 2.3.0 (22 October 2026): guide, FAQ, colours, faster start (Version 14)
- **User guide** (About menu): every menu described, five guided tours (first visit, plan an event, leaders, educators, can I trust this?) and six step-by-step guides.
- **Colour accents** per menu (This month gold, Lead red, Learn green, Understand purple, Resources blue, About brown), all text at least 4.5:1 contrast in light and dark mode; high-contrast mode overrides.
- **Questions people ask** (Understand menu): ten balanced, sourced answers, including why October, why not all year, why it is still needed, who it is for and the objection that there is no White History Month. Corrected after a second check against the live pages: the Civil Service blog (2 October 2025, Civil Service Race Champion) confirms the Civil Service marks the month; an unverifiable 2016 Prime Minister claim was dropped; Morgan Freeman's December 2005 remarks confirmed.
- **Why red, gold, green and black?** (Africa page): Ethiopia after Adwa (1896), Ghana 1957 (Theodosia Okoh), the UNIA's red, black and green (1920), Rastafari, Jamaica's black, green and gold, and what seven countries say their colours mean; South Africa's official page says no symbolism should be attached. Two unsupported claims removed.
- **Faster start:** bibliographies built once, checks deferred until idle. Measured: desktop load 2.5 s (was 2.7 s), longest block 1.8 s (was 2.3 s); slow phone load 10.3 s (was 12.1 s); changing page 0.05 to 0.11 s on desktop.
- Checks C112 to C118; full suite 100 of 100; negative run caught every injected defect.

## 2.1.1 (22 October 2026): summaries first (Version 13)
- "At a glance" summaries computed from the page's own data open the inequalities, benchmarks, life stages and talent pages. A first draft overclaimed how many actions had evidence; reworded to "for at least 38 of 64 actions, no published evaluation was found".
- 83 very short source summaries now say what they support.

## 2.1.0 (22 October 2026): information architecture and quality review
- **Menus:** six menus of at most nine pages, ordered by audience and urgency: This month, Lead, Learn, Understand, Resources, About. Previous and next follow the menus.
- **Structure:** one level-1 heading and a named browser title on every page; two-way "Related pages" on every page; clearer labels.
- **Order of precedence:** action and verified content first; proposals for comment labelled and placed after (Help run the hub, Partners, About, Get involved).
- **Search:** every section, subheading and listed item is indexed (subheading coverage was 63%).
- **Fixed, found by an independent review:**
  - Toolkit activity ideas showed 0 of 14, and glossary hover-text said "undefined": two functions had been silently replaced by others with the same name. The build now refuses duplicate function names.
  - The first start-up step was unguarded; all steps are now guarded and failures reported.
  - Every page change re-ran all checks; changing page now takes 0.05 to 0.12 s on desktop, down from 0.8 to 1.2 s.
  - A search-coverage measure blocked the page for about 20 s after load; it now takes under 1 s.
  - 275 source summaries said only "Opened 21 October 2026"; each now names what it supports, with a quote where one exists.
  - A funding round was shown as open after its deadline; close dates are now checked.
- **Fixed, found by the full test suite:**
  - A self-check scrolled the page far down and left it there, so pages opened part-way down. Checks now leave no trace (C110).
  - Keyboard-opened tooltips closed at once (WCAG 1.4.13); tooltip text could be starved on new content.
  - Drawer links could pass under the Contents toggle (WCAG 2.5.8).
  - The QR code image had no text alternative.
  - Benchmark notes showed raw IDs: the first fix looked in the wrong place and its check passed on nothing; the check now counts what it examined.
  - Partners and archives are now in the JSON-LD feed; the open-data export now reads the built hub, not the shared test page.
- **Quality dimensions** are scored before and after on the Review page (average 2.8 to 3.8, self-assessed).

## 2.0.1 (21 October 2026)
- **Partners and archives page:** seven proposals for linking with existing governance; 25 boards, regulators, forums and associations and 20 funders, each with its own contact page (no names, emails or phone numbers); 50 archives across the four nations. One former archive domain now serves a gambling site and is blocked by a check.
- **Charter, mission, rules of engagement and terms of reference** on the Help run the hub page.
- **Fixes from a line-by-line code review and visual inspection:** club dates a day early in British Summer Time and months skipped; table sorting read "Section 75" as 75; focus lost after re-rendering; quiz clues gave away answers; shared ideas and votes hardened; graph keyboard navigation and story links; privacy notice; wide tables and charts on phones; Contents button.
- **Database rules:** expressions of interest are readable only by the owner; people can change only their own ideas and votes.

## 2.0.0 and earlier
- 2.0.0: Help run the hub (13 roles, 12-month programme, ideas box, GitHub issue forms).
- 1.9.0: knowledge graph, tooltips, A to Z, credits and notices, best-practice review, award nominations, benchmarks.
- 1.8.0: life stages and intersectionality, dashboards, routines and journeys, learning and games, inequalities, talent and research.
- 1.7.x: book and film club, culture, insights; every source read in full.

## Scheduled checks (report only, never republish)
- Weekly (Mondays 08:39): deadlines in the next three weeks, 25 source links, ideas and votes, GitHub issues.
- Monthly (1st, 08:23): stale sources and items, ideas triage, volunteer interest counts.
- Quarterly (2 January, April, July, October, 09:17): newer official statistics, law and strategy changes.
- Annual (1 September, 08:31): October season preparation.

## Quality gates (2.1.0)
- 122 in-page self-checks (2.5.1), each proven by a negative test.
- 100 build checks at 1280 and 390 px, light and dark, including axe-core WCAG 2.2 AA with no violations and no sideways scrolling on any page.
- The negative run injects known defects; every one must be caught. It found that check C110 passed on its own injected defect (smooth scrolling hid the scroll); fixed and re-proven before publishing.
- Database rules verified on the live artifact: a test expression of interest was visible to the owner and invisible at view and interact levels; writing another person's ideas document at interact level was refused. The test document was deleted.
- Build refuses duplicate function names (proven by an injected duplicate).

## Still needs people, not code
- User research and tree-testing (the personas are assumptions).
- First load is about 2.7 s on desktop and 12 s on a slow phone, because every page is drawn at start; drawing pages on demand is the next engineering step.
- Community review, an independent accessibility audit with disabled users, and live tests of AI and shared storage inside Claude.
