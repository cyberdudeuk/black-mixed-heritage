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
mkdir -p "$T/data-repo"; cp -r data site dist tests "$T/data-repo/"
python3 - "$T/data-repo/data/bhm2026-events.json" <<'PY'
import json, sys
p = sys.argv[1]; d = json.load(open(p))
e = next(e for e in d['events'] if e.get('type') != 'Comms plan'); e['source'] = None
json.dump(d, open(p, 'w'))
PY
expect_fail "data validation on an event with no source" bash -c "cd '$T/data-repo' && python3 tests/validate_data.py"

if [ "$fails" -gt 0 ]; then echo "$fails check(s) did not catch their defect"; exit 1; fi
echo "all injected defects were caught"
