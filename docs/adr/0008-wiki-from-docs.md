# 0008. Wiki generated from docs; Discussions start small
Date: 2026-10-25. Status: Accepted.

## Context
The owner enabled the wiki and Discussions, but has little time for upkeep. Wikis edited in place drift from the documentation and are not reviewed; open discussion forums need moderators.

## Decision
The wiki is a short front door generated from `docs/wiki/` by `wiki.yml`; the canonical documentation stays in `docs/` and is reviewed through pull requests. Discussions start with **Announcements** (maintainers post) and, when volunteers are in place, add **Q&A**, **Show and tell** and **Polls** with forms that steer corrections and bugs to the issue forms.

## Consequences
- One place to edit; the wiki never contradicts the docs. Edits made directly in the wiki are overwritten.
- Discussion upkeep is limited to the monthly triage.
