"""Build guard (D-135): every check's evidence is added to one shared object by wrappers around ctxV15. Two wrappers
using the same key silently overwrite each other, which broke checks C88 (git), C41 (lin) and C73 (comm). This lists
the keys each file assigns and fails the build if one key is assigned in two different wrappers."""
import re, sys, glob
def wrappers(src):
    for m in re.finditer(r'ctxV15\s*=\s*function\(\)\{', src):
        i, depth = m.end(), 1
        while depth and i < len(src):
            depth += {'{': 1, '}': -1}.get(src[i], 0); i += 1
        yield src[m.end():i - 1]
def keys(body):
    ks = set(re.findall(r'\bc\.([A-Za-z_]\w*)\s*=(?!=)', body))
    r = re.search(r'return\s*\{\s*\.\.\._ctx\w*\(\)\s*,', body)
    if r:  # object literal: top-level keys only
        i, depth, cur = r.end(), 1, ''
        while depth and i < len(body):
            ch = body[i]
            if ch in '{[(': depth += 1
            elif ch in '}])': depth -= 1
            if depth == 1 and ch == ',': cur = ''
            elif depth == 1: cur += ch
            m = re.match(r'\s*([A-Za-z_]\w*)\s*:$', cur)
            if depth == 1 and m: ks.add(m.group(1)); cur = '#'
            i += 1
    return ks
def check(files):
    owner, clash = {}, []
    for f in files:
        for n, body in enumerate(wrappers(open(f, encoding='utf8').read())):
            for k in keys(body):
                where = f'{f} wrapper {n + 1}'
                if k in owner and owner[k] != where: clash.append(f'"{k}" in {owner[k]} and {where}')
                owner.setdefault(k, where)
    return owner, clash
if __name__ == '__main__':
    owner, clash = check(sys.argv[1:] or sorted(glob.glob('v*.js')))
    print(f'{len(owner)} evidence keys')
    if clash: print('KEY CLASH: ' + '; '.join(clash)); sys.exit(1)
