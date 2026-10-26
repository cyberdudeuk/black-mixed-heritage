"""Turns an accepted "Event for the calendar" issue into an entry in src/community-events.json.
Run by .github/workflows/event-intake.yml. Reads the issue from the GitHub event file, never from the command line,
so nothing in the issue is ever interpreted by a shell. Writes intake-result.json for the workflow to act on.
Usage: python3 scripts/event_intake.py <event.json> <community-events.json> [today YYYY-MM-DD]
The same rules are applied again by the hub itself (ceSafe in src/v46_repo.js) and by tests/validate_data.py."""
import datetime, json, re, sys
from urllib.parse import urlparse

PII = [re.compile(r'[\w.+-]+@[\w-]+\.[\w.-]+'), re.compile(r'(?:\+44\s?|\b0)(?:\d[\s-]?){9,10}\b'),
       re.compile(r'\b[A-CEGHJ-PR-TW-Z]{2}\s?\d{2}\s?\d{2}\s?\d{2}\s?[A-D]\b', re.I)]
ISO = re.compile(r'^\d{4}-\d{2}-\d{2}$')

def fields(body):
    """Issue forms render each answer under a '### Label' heading; '_No response_' means it was left empty."""
    out, cur = {}, None
    for line in (body or '').replace('\r\n', '\n').split('\n'):
        m = re.match(r'^###\s+(.+?)\s*$', line)
        if m:
            cur = m.group(1); out[cur] = []
        elif cur is not None:
            out[cur].append(line)
    return {k: ('\n'.join(v).strip() if '\n'.join(v).strip() != '_No response_' else '') for k, v in out.items()}

def check(issue, today):
    errs = []
    labels = {l['name'] for l in issue.get('labels', [])}
    if 'event' not in labels: errs.append('This issue is not labelled "event".')
    if 'needs-redaction' in labels: errs.append('This issue is labelled "needs-redaction": remove the personal data first.')
    f = fields(issue.get('body'))
    t = re.sub(r'\s+', ' ', f.get('Event or day', '')).strip()
    s = f.get('Start date', '').strip(); e = f.get('End date', '').strip() or s
    w = re.sub(r'\s+', ' ', f.get('Where', '')).strip(); u = f.get('Public link', '').strip()
    if not t: errs.append('"Event or day" is empty.')
    if len(t) > 120: errs.append('"Event or day" is longer than 120 characters.')
    if re.search(r'[<>]', t + w): errs.append('The name or place contains < or >.')
    if len(w) > 80: errs.append('"Where" is longer than 80 characters.')
    dates = {}
    for name, v in (('Start date', s), ('End date', e)):
        if not ISO.match(v): errs.append(f'"{name}" must be written as YYYY-MM-DD (it is "{v[:20]}").'); continue
        try: dates[name] = datetime.date.fromisoformat(v)
        except ValueError: errs.append(f'"{name}" is not a real date.')
    if len(dates) == 2:
        if dates['End date'] < dates['Start date']: errs.append('The end date is before the start date.')
        if dates['End date'] < today: errs.append('The event has already ended.')
        if dates['Start date'] > today + datetime.timedelta(days=730): errs.append('The event is more than two years away.')
        if (dates['End date'] - dates['Start date']).days > 92: errs.append('The event lasts more than three months.')
    p = urlparse(u)
    if p.scheme != 'https' or not p.hostname or '.' not in p.hostname or p.username or p.password or len(u) > 300:
        errs.append('"Public link" must be a public https:// address.')
    if any(rx.search(' '.join([t, w, u])) for rx in PII):
        errs.append('The details look as if they contain an email address, phone number or National Insurance number.')
    entry = {'issue': issue['number'], 's': s, 'e': e, 't': t, 'where': w, 'url': u, 'accepted': today.isoformat()}
    return errs, entry

def main():
    ev = json.load(open(sys.argv[1], encoding='utf8')); path = sys.argv[2]
    today = datetime.date.fromisoformat(sys.argv[3]) if len(sys.argv) > 3 else datetime.date.today()
    issue = ev['issue']
    events = json.load(open(path, encoding='utf8'))
    errs, entry = check(issue, today)
    if any(x.get('issue') == issue['number'] for x in events): errs.append('This event is already in the calendar.')
    result = {'ok': not errs, 'errors': errs, 'issue': issue['number'], 'title': entry['t'][:120]}
    if not errs:
        events.append(entry); events.sort(key=lambda x: (x['s'], x['issue']))
        with open(path, 'w', encoding='utf8') as fh: json.dump(events, fh, ensure_ascii=False, indent=1); fh.write('\n')
    json.dump(result, open('intake-result.json', 'w', encoding='utf8'), ensure_ascii=False)
    print(('accepted: ' if not errs else 'not added: ') + ('; '.join(errs) or entry['t']))

if __name__ == '__main__':
    main()
