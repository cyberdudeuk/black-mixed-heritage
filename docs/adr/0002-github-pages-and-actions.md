# 0002. GitHub Pages, deployed by GitHub Actions
Date: 2026-10-25. Status: Accepted.

## Context
The hub needs a free, public, reliable home with version control, review and automation, close to where contributors already are.

## Decision
Keep the source in a public GitHub repository and publish `site/` and `data/` to GitHub Pages with a GitHub Actions workflow (`pages.yml`), not the branch-based publisher.

## Consequences
- Free hosting, HTTPS, and deployment on every merge; the workflow can also publish generated files such as `ideas.json`.
- Limits apply (1 GB per site, a soft bandwidth limit of 100 GB a month, 10-minute deployments); see [operations.md](../operations.md#5-scalable-capacity-and-limits).
- Because the site is plain files, it can move to any static host within a day ([operations.md](../operations.md#moving-host-disaster-recovery)).
