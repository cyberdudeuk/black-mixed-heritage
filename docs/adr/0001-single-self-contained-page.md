# 0001. One self-contained page, no back end
Date: 2026-10-21. Status: Accepted.

## Context
The hub must work for colleagues across the public sector, many of whom cannot install software or reach some websites, as well as for the public. It has to work on a website, offline, inside Microsoft Teams and inside Claude, and be run by volunteers at no cost.

## Decision
Build the hub as one HTML file holding all content, data, styles and scripts. Pages are views switched by the address after `#`. There is no server, database or login. The website and the single file are built from the same source.

## Consequences
- Works offline and as an email attachment; nothing to host or patch on a server; no personal data to protect.
- Every visitor downloads the whole hub (about 1.6 MB compressed), so a page-weight budget is enforced in CI.
- Shared features (saved votes, a shared ideas box) need a host that offers storage; they work only inside Claude, and elsewhere the hub says so and offers an alternative (ADR 0003).
