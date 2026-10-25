# 0004. Checks inside the page, each shown to fail
Date: 2026-10-21. Status: Accepted.

## Context
The hub makes factual claims about people and communities, and must stay accessible and private as it grows. Checks that only run on a maintainer's machine are easy to skip; checks that cannot fail prove nothing.

## Decision
Quality checks (sources, links, accessibility, language, privacy, coverage) run inside the page in every visitor's browser and are shown on the Self-checks page. Every check has a deliberate-break test. CI runs the same checks on both editions, and `tests/negative.sh` injects known defects to prove the CI checks fail.

## Consequences
- Anyone can see that the hub passes its own checks, now, in their browser.
- New features must come with a check and a break test, which adds some effort to each change.
