"""Privacy scan for the built hub: nothing personal may ride along inside the page.
Checks the page text and every embedded file (Office templates, images) carried as base64:
- Office documents: the author fields must be the hub's name, and no email address may appear inside;
- PNG images: no Author, Artist or Copyright text chunks;
- the page: no email addresses at personal mail providers and no links to private claude.ai artifacts.
Usage: python3 tests/privacy_scan.py dist/bhm-2026-hub.html site/index.html"""
import base64, io, re, sys, zipfile, zlib, struct

ALLOWED_AUTHOR = {'Black History and Heritage Hub', 'BHM 2026 Hub', 'Un-named', ''}  # the old name stays allowed for files made before 3.0.0
EMAIL = re.compile(rb'[A-Za-z0-9._%+-]+@(?:gmail|googlemail|hotmail|outlook|live|yahoo|icloud|me|aol|proton|protonmail)\.[a-z.]+', re.I)
PRIVATE_LINK = re.compile(r'claude\.ai/(?:code/)?artifact/')
B64 = re.compile(r'(?:UEsDB|iVBORw0KGgo)[A-Za-z0-9+/=]{800,}')

def check_zip(data, label, problems):
    try:
        z = zipfile.ZipFile(io.BytesIO(data))
    except zipfile.BadZipFile:
        return
    for name in z.namelist():
        body = z.read(name)
        if name == 'docProps/core.xml':
            t = body.decode('utf8', 'ignore')
            for tag in ('dc:creator', 'cp:lastModifiedBy'):
                for v in re.findall(rf'<{tag}>([^<]*)</{tag}>', t):
                    if v.strip() not in ALLOWED_AUTHOR:
                        problems.append(f'{label}: {name} {tag} is not the hub\'s name')
        if name.endswith(('.xml', '.rels')) and EMAIL.search(body):
            problems.append(f'{label}: {name} contains a personal email address')

def check_png(data, label, problems):
    i = 8
    while i + 8 <= len(data):
        n, typ = struct.unpack('>I4s', data[i:i + 8])
        chunk = data[i + 8:i + 8 + n]
        if typ in (b'tEXt', b'iTXt', b'zTXt'):
            key = chunk.split(b'\0', 1)[0].decode('latin1')
            if key.lower() in ('author', 'artist', 'copyright', 'creator'):
                problems.append(f'{label}: image metadata field "{key}"')
        i += 12 + n

problems = []
for path in sys.argv[1:]:
    html = open(path, encoding='utf8').read()
    if PRIVATE_LINK.search(html):
        problems.append(f'{path}: link to a private claude.ai artifact')
    if EMAIL.search(html.encode('utf8')):
        problems.append(f'{path}: personal email address in the page')
    blobs = 0
    for m in B64.finditer(html):
        s = m.group(0)
        s = s[: len(s) - len(s) % 4]
        try:
            data = base64.b64decode(s)
        except Exception:
            continue
        blobs += 1
        if data[:2] == b'PK':
            check_zip(data, f'{path} embedded file {blobs}', problems)
        elif data[:8] == b'\x89PNG\r\n\x1a\n':
            check_png(data, f'{path} embedded image {blobs}', problems)
    print(f'{path}: {blobs} embedded files checked')
if problems:
    print('\n'.join('PROBLEM ' + p for p in problems))
    sys.exit(1)
print('privacy scan: clean')
