# 0003. Ideas and wishes through GitHub issues, published as a read-only list
Date: 2026-10-25. Status: Accepted.

## Context
Readers need a way to suggest ideas and see what others have suggested, but the hub has no back end and must not hold personal data or a token in the page.

## Decision
The hub's ideas box opens prefilled GitHub issue forms. A workflow publishes open `idea` and `wishlist` issues as `ideas.json` (titles, labels, reaction and comment counts, links only) every six hours and on every change, skipping any issue labelled `needs-redaction` or holding an email address, phone number or National Insurance number. The hub shows the list as text.

## Consequences
- Support is shown by thumbs-up reactions on GitHub, which needs a free account.
- The list can be up to six hours old.
- Moderation happens on GitHub (admin guide, section 7). Self-check C161 fails if the list ever contains unsafe items.
