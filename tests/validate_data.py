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
print(f'events {len(ids)}, glossary {len(rows)}, linked-data nodes {len(ld.get("@graph", []))}')
if problems:
    print('\n'.join('PROBLEM ' + p for p in problems)); sys.exit(1)
print('data and site checks: clean')
