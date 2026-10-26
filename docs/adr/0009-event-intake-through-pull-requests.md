# 0009. Community events reach the calendar through pull requests
Date: 2026-10-26. Status: Accepted.

## Context
People suggest events for the calendar through a GitHub issue form. Copying accepted suggestions into the source by hand was slow and error-prone, but writing issue text straight into the published site would bypass review and the checks.

## Decision
When a maintainer labels an `event` issue `status: accepted`, the **Event intake** workflow checks the suggestion with `scripts/event_intake.py`, adds it to `src/community-events.json`, rebuilds the hub and opens a pull request. The issue is read from the event file by Python and never passed through a shell. The pull request gets the same required checks as any change, and a maintainer merges it. The hub embeds the file with `<` and `>` encoded, checks each event again before showing it (C164), and uses the organiser's page as the event's source.

## Consequences
- Accepting an event takes one label and one merge; the event, its source and its review are all recorded.
- Pull requests opened with the workflow's token do not start other workflows on their own, so the workflow starts **Checks** on the branch itself.
- The repository setting "Allow GitHub Actions to create and approve pull requests" must be on. No workflow approves or merges.
- `src/community-events.json` is owned by the repository; the maintainer's local copy of the source takes it from there.
