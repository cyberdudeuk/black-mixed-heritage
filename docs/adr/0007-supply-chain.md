# 0007. Supply-chain security
Date: 2026-10-25. Status: Accepted.

## Context
Workflows can write to the repository and publish the website; a compromised action or dependency could alter what visitors see.

## Decision
Pin every action to a full commit SHA (with the version in a comment); give the default token read-only access and grant each job only what it needs; never persist checkout credentials; avoid `pull_request_target`; update dependencies through grouped Dependabot pull requests; scan with CodeQL and OpenSSF Scorecard; publish releases with SHA-256 checksums and a signed build-provenance attestation.

## Consequences
- Updates arrive as reviewable pull requests rather than silently.
- Dependabot pull requests that edit the same workflow must be merged one at a time.
