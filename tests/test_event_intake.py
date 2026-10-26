"""Tests for scripts/event_intake.py: valid suggestions are added; unsafe or malformed ones are refused with a reason."""
import datetime, json, os, subprocess, sys, tempfile
HERE = os.path.dirname(os.path.abspath(__file__)); SCRIPT = os.path.join(HERE, '..', 'scripts', 'event_intake.py')
TODAY = '2026-10-26'
def body(what='Community heritage walk', start='2027-02-06', end='_No response_', where='Bristol', link='https://example.org/walk'):
    return f'### Event or day\n\n{what}\n\n### Start date\n\n{start}\n\n### End date\n\n{end}\n\n### Where\n\n{where}\n\n### Public link\n\n{link}\n\n### Why it belongs in the calendar\n\n_No response_\n'
def run(b, labels=('event', 'status: accepted'), existing=()):
    d = tempfile.mkdtemp(); ev = os.path.join(d, 'ev.json'); ce = os.path.join(d, 'ce.json')
    json.dump({'issue': {'number': 41, 'body': b, 'labels': [{'name': l} for l in labels]}}, open(ev, 'w'))
    json.dump(list(existing), open(ce, 'w'))
    subprocess.run([sys.executable, '-I', SCRIPT, ev, ce, TODAY], cwd=d, check=True, capture_output=True)
    return json.load(open(os.path.join(d, 'intake-result.json'))), json.load(open(ce))
cases = [
    ('valid one-day event', body(), True),
    ('valid multi-day event', body(end='2027-02-08'), True),
    ('date in the wrong format', body(start='6 February 2027'), False),
    ('end before start', body(start='2027-02-06', end='2027-02-01'), False),
    ('already ended', body(start='2026-01-01', end='2026-01-02'), False),
    ('not https', body(link='http://example.org/walk'), False),
    ('script in the name', body(what='<script>alert(1)</script>'), False),
    ('email address', body(where='ask someone@example.org'), False),
    ('phone number', body(where='call 020 7946 0000'), False),
    ('link with credentials', body(link='https://user:pw@example.org/'), False),
    ('too far ahead', body(start='2030-01-01'), False),
]
fails = 0
for name, b, want in cases:
    r, ce = run(b)
    if r['ok'] != want or (want and len(ce) != 1) or (not want and ce): print('FAIL', name, r); fails += 1
    else: print('ok  ', name, '' if want else '(' + r['errors'][0] + ')')
r, ce = run(body(), labels=('event', 'needs-redaction'))
if r['ok']: print('FAIL needs-redaction issue accepted'); fails += 1
else: print('ok   needs-redaction issue refused')
r, ce = run(body(), existing=[{'issue': 41}])
if r['ok']: print('FAIL duplicate accepted'); fails += 1
else: print('ok   duplicate refused')
r, ce = run(body())
e = ce[0]
if not (e['s'] == e['e'] == '2027-02-06' and e['accepted'] == TODAY and e['url'] == 'https://example.org/walk'): print('FAIL entry fields', e); fails += 1
else: print('ok   entry fields')
sys.exit(1 if fails else 0)
