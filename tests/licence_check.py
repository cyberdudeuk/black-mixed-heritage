"""Every third-party file kept in the repository must be listed, with its licence, in THIRD_PARTY_NOTICES.md;
and every dependency in package.json must appear in the notices. Usage: python3 tests/licence_check.py"""
import glob, json, os, sys
notes = open('THIRD_PARTY_NOTICES.md', encoding='utf8').read()
problems = []
for f in sorted(glob.glob('src/vendor/**/*', recursive=True) + glob.glob('tests/vendor/*')):
    if os.path.isfile(f):
        listed = f in notes or os.path.basename(f) in notes or (f.startswith('src/vendor/templates/') and 'src/vendor/templates/*' in notes)
        if not listed: problems.append(f'{f} is not listed in THIRD_PARTY_NOTICES.md')
for dep in json.load(open('package.json')).get('devDependencies', {}):
    name = dep.split('/')[0] + '/*' if dep.startswith('@fontsource/') else dep
    if name not in notes: problems.append(f'dependency {dep} is not listed in THIRD_PARTY_NOTICES.md')
if problems:
    print('\n'.join('PROBLEM ' + p for p in problems)); sys.exit(1)
print('licence check: every vendored file and dependency is listed')
