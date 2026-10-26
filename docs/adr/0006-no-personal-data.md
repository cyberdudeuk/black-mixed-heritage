# 0006. No personal data, analytics or tracking
Date: 2026-10-21. Status: Accepted.

## Context
The hub deals with ethnicity and heritage, which are special category data under UK GDPR when they relate to a person. It is run in a personal capacity, without the means to act as a data controller for visitors' data.

## Decision
The hub collects no personal data, sets no cookies, uses no analytics and never classifies any person's ethnicity; it uses counts published by others. Preferences stay in the visitor's browser. Living people are named only in a public role. The maker is credited only as "made in a personal capacity".

## Consequences
- No usage figures; demand is judged from issues, reactions and feedback.
- Privacy is enforced by checks: the in-page privacy check, `tests/privacy_scan.py` (including embedded files), the CI grep and issue triage.
