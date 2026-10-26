# 0005. MIT for code, CC BY 4.0 for content
Date: 2026-10-25. Status: Accepted.

## Context
Public bodies, schools and community groups should be able to reuse and adapt the hub. Much of what it quotes is public sector information under the Open Government Licence.

## Decision
Code under MIT; text and data created for the hub under Creative Commons Attribution 4.0; third-party material keeps its own licence and is attributed. Wikipedia is not used as a source. No images of people are reproduced.

## Consequences
- Both licences are permissive and compatible with the Open Government Licence v3.0.
- Every vendored file and dependency must be listed in [THIRD_PARTY_NOTICES.md](../../THIRD_PARTY_NOTICES.md); `tests/licence_check.py` enforces this in CI.
