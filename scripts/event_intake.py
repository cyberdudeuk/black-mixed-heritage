"""Turns an accepted "Event for the calendar" issue into an entry in src/community-events.json.
Run by .github/workflows/event-intake.yml. Reads the issue from the GitHub event file, never from the command line,
so nothing in the issue is ever interpreted by a shell. Writes intake-result.json for the workflow to act on.
Usage: python3 scripts/event_intake.py <event.json> <community-events.json> [today YYYY-MM-DD]
The same rules are applied again by the hub itself (ceSafe in src/v46_repo.js) and by tests/validate_data.py.
Limits: names of people cannot be checked by a machine; the pull request asks the reviewer to check them."""
import datetime, json, re, sys, unicodedata
from urllib.parse import urlparse

PII = [re.compile(r'[\w.+-]+@[\w-]+\.[\w.-]+'),                                       # email address
       re.compile(r'\b[\w.+-]+\s*[(\[]\s*at\s*[)\]]\s*[\w-]+\s*[(\[]\s*dot\s*[)\]]', re.I),  # jo (at) example (dot) com
       re.compile(r'(?:\+44[\s.-]?|\b0)(?:\d[\s.-]?){9,10}\b'),                         # UK phone number, any separators
       re.compile(r'\b[A-CEGHJ-PR-TW-Z]{2}\s?\d{2}\s?\d{2}\s?\d{2}\s?[A-D]\b', re.I),  # National Insurance number
       re.compile(r'\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[ABD-HJLNP-UW-Z]{2}\b', re.I),          # UK postcode
       re.compile(r'\b\d{1,4}[a-z]?,?\s+(?:[A-Z][a-z]+\s+){1,3}(?:Street|St|Road|Rd|Avenue|Ave|Lane|Ln|Close|Drive|Dr|Way|Place|Pl|Crescent|Court|Ct|Gardens|Gdns|Terrace|Grove|Hill|Square|Sq|Mews|Row|Walk|Park|Rise|View|Green)\b')]  # house number and street
ISO = re.compile(r'^\d{4}-\d{2}-\d{2}$')
LABELS = ['Event or day', 'Start date', 'End date', 'Where', 'Public link', 'Why it belongs in the calendar', 'Privacy']
HOST = re.compile(r'^[a-z0-9-]+(\.[a-z0-9-]+)+$')

def u16(s):
    """Length as JavaScript counts it (UTF-16 code units), so the hub and this script agree."""
    return len(s.encode('utf-16-le')) // 2

def invisible(s):
    """Bidirectional overrides, zero-width and other format characters, which can disguise text."""
    return any(unicodedata.category(c) == 'Cf' for c in s)

def fields(body):
    """Issue forms render each answer under a '### Label' heading; '_No response_' means it was left empty.
    Only the form's own headings count, the first time each appears, so an answer cannot override a later field
    by containing a heading of its own. Returns the answers and the labels that appeared more than once."""
    out, cur, seen, repeated = {}, None, set(), set()
    for line in (body or '').replace('\r\n', '\n').split('\n'):
        m = re.match(r'^###\s+(.+?)\s*$', line)
        if m and m.group(1) in LABELS:
            if m.group(1) in seen:
                repeated.add(m.group(1)); cur = None; continue
            cur = m.group(1); seen.add(cur); out[cur] = []
        elif cur is not None:
            out[cur].append(line)
    vals = {}
    for k, v in out.items():
        text = '\n'.join(v).strip()
        vals[k] = '' if text == '_No response_' else text
    return vals, repeated

def check(issue, today):
    errs = []
    labels = {l['name'] for l in issue.get('labels', [])}
    if 'event' not in labels: errs.append('This issue is not labelled "event".')
    if 'needs-redaction' in labels: errs.append('This issue is labelled "needs-redaction": remove the personal data first.')
    f, repeated = fields(issue.get('body'))
    if repeated: errs.append('A form heading appears more than once (' + ', '.join(sorted(repeated)) + '); please remove the extra heading from your answers.')
    if not re.search(r'^- \[[xX]\] ', f.get('Privacy', ''), re.M): errs.append('The privacy box is not ticked.')
    t = re.sub(r'\s+', ' ', f.get('Event or day', '')).strip()
    s = f.get('Start date', '').strip(); e = f.get('End date', '').strip() or s
    w = re.sub(r'\s+', ' ', f.get('Where', '')).strip(); u = f.get('Public link', '').strip()
    if not t: errs.append('"Event or day" is empty.')
    if u16(t) > 120: errs.append('"Event or day" is longer than 120 characters.')
    if u16(w) > 80: errs.append('"Where" is longer than 80 characters.')
    if re.search(r'[<>`]', t + w): errs.append('The name or place contains <, > or a backtick.')
    if invisible(t + w + u): errs.append('The details contain invisible formatting characters.')
    dates = {}
    for name, v in (('Start date', s), ('End date', e)):
        if not ISO.match(v): errs.append(f'"{name}" must be written as YYYY-MM-DD, for example 2027-02-06.'); continue
        try: dates[name] = datetime.date.fromisoformat(v)
        except ValueError: errs.append(f'"{name}" is not a real date.')
    if len(dates) == 2:
        if dates['End date'] < dates['Start date']: errs.append('The end date is before the start date.')
        if dates['End date'] < today: errs.append('The event has already ended.')
        if dates['Start date'] > today + datetime.timedelta(days=730): errs.append('The event is more than two years away.')
        if (dates['End date'] - dates['Start date']).days > 92: errs.append('The event lasts more than three months.')
    p = urlparse(u)
    if (p.scheme != 'https' or not p.hostname or not HOST.match(p.hostname) or p.username or p.password
            or len(u) > 300 or re.search(r'[\s"\'<>`\\]', u)):
        errs.append('"Public link" must be a plain public https:// address.')
    if any(rx.search(' '.join([t, w, u])) for rx in PII):
        errs.append('The details look as if they contain an email address, phone number, National Insurance number, postcode or street address.')
    entry = {'issue': issue['number'], 's': s, 'e': e, 't': t, 'where': w, 'url': u, 'accepted': today.isoformat()}
    return errs, entry

def norm(s):
    return re.sub(r'[^a-z0-9]', '', s.lower())

def main():
    ev = json.load(open(sys.argv[1], encoding='utf8')); path = sys.argv[2]
    today = datetime.date.fromisoformat(sys.argv[3]) if len(sys.argv) > 3 else datetime.date.today()
    issue = ev['issue']
    events = json.load(open(path, encoding='utf8'))
    errs, entry = check(issue, today)
    if any(x.get('issue') == issue['number'] for x in events): errs.append('This event is already in the calendar.')
    elif any(x.get('s') == entry['s'] and norm(x.get('t', '')) == norm(entry['t']) for x in events):
        errs.append('An event with the same name and start date is already in the calendar.')
    result = {'ok': not errs, 'errors': errs, 'issue': issue['number'], 'title': entry['t'][:120], 'entry': entry if not errs else None}
    if not errs:
        events.append(entry); events.sort(key=lambda x: (x['s'], x['issue']))
        with open(path, 'w', encoding='utf8') as fh: json.dump(events, fh, ensure_ascii=False, indent=1); fh.write('\n')
    json.dump(result, open('intake-result.json', 'w', encoding='utf8'), ensure_ascii=False)
    print(('accepted: issue ' if not errs else 'not added: ') + ('; '.join(errs) or str(issue['number'])))

if __name__ == '__main__':
    main()
