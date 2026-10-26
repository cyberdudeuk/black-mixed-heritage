"""Keeps the "Page" list in the issue forms the same as the hub's own pages, in menu order.
The hub prefills that field with the page the reader was on, so every page must be an option, spelt exactly as in the menus.
Reads data/bhm2026-pages.json (written by the build). Usage: python3 scripts/sync_forms.py [--check]
--check changes nothing and exits 1 if any form is out of date (tests/validate_data.py does the same check)."""
import json, re, sys, glob

def expected():
    pages = json.load(open('data/bhm2026-pages.json', encoding='utf8'))['pages']
    return ['Whole hub'] + [p['title'] for p in pages] + ['Other']

def forms():
    for f in sorted(glob.glob('.github/ISSUE_TEMPLATE/*.yml')):
        t = open(f, encoding='utf8').read()
        m = re.search(r'(\n  - type: dropdown\n    id: page\n    attributes:\n(?:      [^\n]*\n)*?      options:\n)((?:        - [^\n]*\n)+)', t)
        if m: yield f, t, m

def current(m):
    return [json.loads(x.strip()[2:]) for x in m.group(2).splitlines()]

if __name__ == '__main__':
    want, stale = expected(), []
    for f, t, m in forms():
        if current(m) == want: continue
        stale.append(f)
        if '--check' not in sys.argv:
            block = ''.join(f'        - {json.dumps(x, ensure_ascii=False)}\n' for x in want)
            open(f, 'w', encoding='utf8').write(t[:m.start(2)] + block + t[m.end(2):])
    if '--check' in sys.argv and stale:
        print('Out of date: ' + ', '.join(stale)); sys.exit(1)
    print(('updated: ' + ', '.join(stale)) if stale else 'issue forms match the hub\'s pages')
