#!/usr/bin/env bash
# Checks of the checks: each check must FAIL on a copy with a known defect injected. A check that cannot fail proves nothing.
# Usage: bash tests/negative.sh   (needs npm install; uses a temporary folder and leaves the repository unchanged)
set -u
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
fails=0
expect_fail() { local name="$1"; shift; if "$@" >"$T/out.txt" 2>&1; then echo "NOT CAUGHT: $name"; fails=$((fails+1)); else echo "caught: $name"; fi; }

# 1. in-page self-checks: a summary-table row loses its sourced point (C160)
sed 's/<tr><th scope="row"><a href="#aw-ukhonours-new-year-honours-2025-black-recipients-3"/<tr><th scope="row"><a href="#aw-no-such-point"/' dist/bhm-2026-hub.html > "$T/broken.html"
grep -q 'aw-no-such-point' "$T/broken.html" || { echo "injection 1 did not apply"; exit 2; }
expect_fail "self-check C160 on a broken summary row" node tests/ci-selfcheck.mjs "$T/broken.html"

# 2. privacy scan: a personal email address in the page
# the address is split in the source so that the repository-wide privacy grep in CI does not flag this test
{ cat dist/bhm-2026-hub.html; echo '<p>contact someone@''gmail.com</p>'; } > "$T/private.html"
# the address is split in the source so that the repository-wide privacy grep in CI does not flag this test
{ cat dist/bhm-2026-hub.html; echo '<p>contact someone@''gmail.com</p>'; } > "$T/private.html"
expect_fail "privacy scan on a personal email address" python3 tests/privacy_scan.py "$T/private.html"

# 3. licence check: a vendored file nobody has listed
mkdir -p "$T/repo"; cp -r THIRD_PARTY_NOTICES.md package.json src tests "$T/repo/"; touch "$T/repo/tests/vendor/unlisted.js"
expect_fail "licence check on an unlisted vendored file" bash -c "cd '$T/repo' && python3 tests/licence_check.py"

# 4. data validation: a dated event without a source
mkdir -p "$T/data-repo"; cp -r data site dist tests src package.json .github "$T/data-repo/"
python3 - "$T/data-repo/data/bhm2026-events.json" <<'PY'
import json, sys
p = sys.argv[1]; d = json.load(open(p))
e = next(e for e in d['events'] if e.get('type') != 'Comms plan'); e['source'] = None
json.dump(d, open(p, 'w'))
PY
expect_fail "data validation on an event with no source" bash -c "cd '$T/data-repo' && python3 tests/validate_data.py"

# 5. data validation: an unsafe community event (plain http link, markup in the name)
mkdir -p "$T/ce-repo"; cp -r data site dist tests src package.json .github "$T/ce-repo/"
echo '[{"issue":9,"s":"2027-02-06","e":"2027-02-06","t":"<b>Walk</b>","where":"","url":"http://example.org","accepted":"2026-10-26"}]' > "$T/ce-repo/src/community-events.json"
expect_fail "data validation on an unsafe community event" bash -c "cd '$T/ce-repo' && python3 tests/validate_data.py"

# 6. data validation: a nomination deadline whose reminders were lost
mkdir -p "$T/dl-repo"; cp -r data site dist tests src package.json .github "$T/dl-repo/"
python3 - "$T/dl-repo/data/bhm2026-events.ics" <<'EOF'
import re, sys
p = sys.argv[1]; t = open(p, encoding='utf8', newline='').read()
open(p, 'w', encoding='utf8', newline='').write(re.sub(r'BEGIN:VALARM.*?END:VALARM\r?\n', '', t, count=1, flags=re.S))
EOF
expect_fail "data validation on a deadline without reminders" bash -c "cd '$T/dl-repo' && python3 tests/validate_data.py"

# 7. event intake: the intake tests must fail if the script stops refusing unsafe links
mkdir -p "$T/in-repo/scripts" "$T/in-repo/tests"; cp tests/test_event_intake.py "$T/in-repo/tests/"
sed "s/p.scheme != 'https'/p.scheme not in ('https', 'http')/" scripts/event_intake.py > "$T/in-repo/scripts/event_intake.py"
grep -q "('https', 'http')" "$T/in-repo/scripts/event_intake.py" || { echo "injection 7 did not apply"; exit 2; }
expect_fail "event intake tests on a script that accepts http links" python3 "$T/in-repo/tests/test_event_intake.py"

# 8. data validation: the hub links to an issue form that is missing from the repository
mkdir -p "$T/form-repo"; cp -r data site dist tests src package.json .github "$T/form-repo/"; rm "$T/form-repo/.github/ISSUE_TEMPLATE/volunteer.yml"
expect_fail "data validation on a linked issue form that is missing" bash -c "cd '$T/form-repo' && python3 tests/validate_data.py"

# 9. workflow lint: a workflow with an unquoted condition containing ": " (only where actionlint is installed)
if command -v actionlint >/dev/null 2>&1; then
  mkdir -p "$T/wf"; sed "s|    if: \"github.event.label.name == 'status: accepted' \&\& contains(github.event.issue.labels.\*.name, 'event')\"|    if: github.event.label.name == 'status: accepted'|" .github/workflows/event-intake.yml > "$T/wf/event-intake.yml"
  grep -q "^    if: github.event.label.name == 'status: accepted'$" "$T/wf/event-intake.yml" || { echo "injection 9 did not apply"; exit 2; }
  expect_fail "actionlint on a broken workflow" actionlint "$T/wf/event-intake.yml"
fi

if [ "$fails" -gt 0 ]; then echo "$fails check(s) did not catch their defect"; exit 1; fi
echo "all injected defects were caught"
