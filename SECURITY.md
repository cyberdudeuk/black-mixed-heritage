# Security

## Supported versions
Only the latest release, as published on the website and in `dist/`, is supported.

## Scope
The hub is a static site with no server, database or login of its own. Relevant problems include:
- a way to run script in the page, for example through the ideas list, search or any form;
- a way for the published ideas list or another workflow output to carry personal data;
- a workflow that could be abused to write to the repository or publish content;
- personal data found anywhere in the site or the repository.

## Report a problem privately
Do not open a public issue. Use **Security → Report a vulnerability** on this repository (GitHub private vulnerability reporting). Include what you found, how to reproduce it and the page or file affected.

## What happens next
The project is run in a personal capacity, so responses are best effort. We aim to acknowledge reports within 7 days, fix confirmed problems as a priority, and credit reporters who wish to be credited once a fix is released.
