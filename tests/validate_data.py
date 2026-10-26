"""Validates the open data files and the site's static files, and enforces a page-size budget.
Usage: python3 tests/validate_data.py"""
import csv, json, re, sys, os
problems = []
def need(cond, msg):
    if not cond: problems.append(msg)
# events JSON
ev = json.load(open('data/bhm2026-events.json'))
need(isinstance(ev.get('events'), list) and ev['events'], 'events.json: no events')
for e in ev.get('events', []):
    need(re.fullmatch(r'\d{4}-\d{2}-\d{2}', e.get('start') or ''), f"events.json {e.get('id')}: bad start date")
    need(re.fullmatch(r'\d{4}-\d{2}-\d{2}', e.get('end') or ''), f"events.json {e.get('id')}: bad end date")
    need((e.get('end') or '') >= (e.get('start') or ''), f"events.json {e.get('id')}: ends before it starts")
    if e.get('type') != 'Comms plan':  # the hub's own suggested programme has no outside source; every other dated event must cite one
        need(str((e.get('source') or {}).get('url', '')).startswith('https://'), f"events.json {e.get('id')}: no https source")
ids = [e.get('id') for e in ev.get('events', [])]
need(len(ids) == len(set(ids)), 'events.json: duplicate ids')
# ICS
ics = open('data/bhm2026-events.ics', encoding='utf8').read()
need(ics.startswith('BEGIN:VCALENDAR') and ics.rstrip().endswith('END:VCALENDAR'), 'ics: not a calendar')
need(ics.count('BEGIN:VEVENT') == ics.count('END:VEVENT') == len(ids), f"ics: {ics.count('BEGIN:VEVENT')} events, JSON has {len(ids)}")
# glossary CSV
rows = list(csv.DictReader(open('data/bhm2026-glossary.csv', encoding='utf8')))
need(rows and set(rows[0]) >= {'term', 'category', 'definition'}, 'glossary: missing columns')
need(all(r['term'].strip() and r['definition'].strip() for r in rows), 'glossary: empty term or definition')
# JSON-LD
ld = json.load(open('data/bhm2026-hub.jsonld'))
need('@context' in ld and isinstance(ld.get('@graph'), list) and len(ld['@graph']) > 1000, 'jsonld: missing @context or @graph')
need(all(n.get('@type') for n in ld.get('@graph', [])), 'jsonld: a node has no @type')
ids_ld = [n.get('@id') for n in ld.get('@graph', []) if n.get('@id')]
# the same @id may appear more than once: JSON-LD merges such nodes (for example a dated event that is also on the timeline)
print(f'jsonld: {len(ids_ld) - len(set(ids_ld))} repeated @id values (merged by JSON-LD processors)')
# reminders: every nomination deadline in the calendar asks for reminders; nothing else does
blocks = ics.split('BEGIN:VEVENT')[1:]
dl_blocks = [b for b in blocks if 'CATEGORIES:Nomination deadlines' in b]
need(all(b.count('BEGIN:VALARM') == 2 and b.count('END:VALARM') == 2 for b in dl_blocks), 'ics: a nomination deadline lacks its two reminders')
need(all('VALARM' not in b for b in blocks if b not in dl_blocks), 'ics: reminders on an event that is not a deadline')
# community events accepted through the repository (src/community-events.json): same rules as scripts/event_intake.py and the hub
ce = json.load(open('src/community-events.json', encoding='utf8'))
need(isinstance(ce, list), 'community-events.json: not a list')
for x in ce if isinstance(ce, list) else []:
    n = x.get('issue')
    need(isinstance(n, int) and n > 0, f'community event {n}: bad issue number')
    need(all(re.fullmatch(r'\d{4}-\d{2}-\d{2}', str(x.get(k) or '')) for k in ('s', 'e', 'accepted')) and x.get('e', '') >= x.get('s', ''), f'community event {n}: bad dates')
    need(str(x.get('url', '')).startswith('https://') and not re.search(r'[<>]', str(x.get('t', '')) + str(x.get('where', ''))), f'community event {n}: unsafe link or text')
    need(0 < len(str(x.get('t', ''))) <= 120 and len(str(x.get('where', ''))) <= 80, f'community event {n}: name or place too long')
    need(not re.search(r'[\w.+-]+@[\w-]+\.[\w.-]+', json.dumps(x)), f'community event {n}: contains an email address')
    need(f'c-{n}' in ids, f'community event {n}: not in the published calendar')
need(len({x.get('issue') for x in ce}) == len(ce), 'community-events.json: an issue appears twice')
# sources with read and re-read dates
srcs = json.load(open('data/bhm2026-sources.json', encoding='utf8')).get('sources', [])
need(len(srcs) > 1000, f'sources.json: only {len(srcs)} sources')
need(all(re.fullmatch(r'S\d+', s.get('id', '')) and str(s.get('url', '')).startswith('http') for s in srcs), 'sources.json: a source has a bad id or link')
need(all(s.get('due') is None or (s.get('read') and s['due'] > s['read']) for s in srcs), 'sources.json: a due date is not after its read date')
# nomination deadlines
dls = json.load(open('data/bhm2026-deadlines.json', encoding='utf8')).get('deadlines', [])
need(all(re.fullmatch(r'\d{4}-\d{2}-\d{2}', d.get('deadline', '')) and d.get('name') for d in dls), 'deadlines.json: bad deadline or name')
need(len(dls) == len(dl_blocks), f'deadlines.json has {len(dls)} deadlines, the calendar {len(dl_blocks)}')
# release feed (Atom)
import xml.etree.ElementTree as ET
A = '{http://www.w3.org/2005/Atom}'
feed = ET.parse('data/bhm2026-releases.atom').getroot()
entries = feed.findall(A + 'entry')
need(feed.tag == A + 'feed' and entries, 'releases.atom: not an Atom feed with entries')
need(all(e.find(A + 'id') is not None and e.find(A + 'updated') is not None and e.find(A + 'title') is not None for e in entries), 'releases.atom: an entry lacks id, updated or title')
eids = [e.find(A + 'id').text for e in entries]
need(len(eids) == len(set(eids)), 'releases.atom: duplicate entry ids')
pkg_version = json.load(open('package.json'))['version']
need(entries and entries[0].find(A + 'title').text.endswith(pkg_version), f'releases.atom: newest entry is not version {pkg_version}')
need('application/atom+xml' in open('site/index.html', encoding='utf8').read(2000), 'site/index.html: no link to the release feed')
# every issue form the hub links to exists in the repository, and has the field the hub fills in
import glob
forms = {os.path.basename(f) for f in glob.glob('.github/ISSUE_TEMPLATE/*.yml')}
glue = open('src/v19_glue.js', encoding='utf8').read(); sus = open('src/v19_sustain.js', encoding='utf8').read()
linked = set(re.findall(r'"([a-z]+\.yml)"', re.search(r'REPO_TEMPLATES=\[([^\]]*)\]', glue).group(1)))
for name, field in re.findall(r'\[\"([a-z]+\.yml)\",\"([a-z]+)\"', re.search(r'ISSUE_FORMS=\{(.*?)\};', sus).group(1)):
    linked.add(name)
    need(name in forms and re.search(rf'id:\s*{field}\b', open('.github/ISSUE_TEMPLATE/' + name, encoding='utf8').read()), f'issue form {name}: missing, or has no field "{field}" for the hub to fill in')
need(linked <= forms, f'the hub links to issue forms that do not exist: {sorted(linked - forms)}')
# site static files
for f in ['site/index.html', 'site/404.html', 'site/robots.txt', 'site/sitemap.xml', 'site/.well-known/security.txt']:
    need(os.path.isfile(f), f'missing {f}')
sec = open('site/.well-known/security.txt').read()
m = re.search(r'Expires: (\d{4}-\d{2}-\d{2})', sec)
from datetime import date, timedelta
need(m and date.fromisoformat(m.group(1)) > date.today() + timedelta(days=30), 'security.txt: Expires is missing or within 30 days; renew it')
# page-size budget (the hub is one file; keep it fast on phones)
for f, limit in [('dist/bhm-2026-hub.html', 6_000_000), ('site/index.html', 6_300_000)]:
    size = os.path.getsize(f)
    need(size <= limit, f'{f}: {size:,} bytes is over the {limit:,} byte budget')
    print(f'{f}: {size:,} bytes (budget {limit:,})')
print(f'events {len(ids)} ({len(dl_blocks)} deadlines with reminders, {len(ce)} community), glossary {len(rows)}, sources {len(srcs)}, feed entries {len(entries)}, linked-data nodes {len(ld.get("@graph", []))}')
if problems:
    print('\n'.join('PROBLEM ' + p for p in problems)); sys.exit(1)
print('data and site checks: clean')
