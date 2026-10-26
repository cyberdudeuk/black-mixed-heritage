# Release management

How versions are numbered, what goes into a release, how it is checked and published, and how to fix or roll back. The step-by-step checklist is also in the [admin guide](admin-guide.md#9-making-a-release).

## Versions
The hub uses [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

| Change | Bump | Examples |
|---|---|---|
| Something people rely on stops working or moves: a page address (`#calendar`), an open-data field or file name, the calendar address, the Teams app's identity | **MAJOR** | Renaming `data/bhm2026-events.ics`; removing a field from the events JSON |
| New pages, sections, features, data or checks that keep everything else working | **MINOR** | A new page; a new self-check; a new workflow |
| Corrections, fixes, accessibility repairs, wording and source updates | **PATCH** | Correcting a figure; fixing a keyboard trap |

The version lives in five places, which must agree: `src/patch_v15.py` (`version` and `docId`), `package.json` and `package-lock.json`, `CITATION.cff`, `CHANGELOG.md` and `docs/release-notes.md`. The hub shows its version in the footer and on the Assurance page.

## Branches
- `main` is always releasable and is what the website shows. It is protected: changes arrive only by pull request with the required checks passing.
- Work happens on short-lived branches named for the change, for example `fix-calendar-time-zone` or `hub-2.21.0`.
- No long-lived release branches. A fix to an old version is made on `main` and released as a new patch.

## Release types
| Type | When | Checks before merging |
|---|---|---|
| Patch | As needed, including urgent corrections | CI (all required checks) |
| Minor | Usually monthly, after the triage | CI, plus `npm test` (full suite) |
| Major | Rarely; announce a month ahead in the release notes and Discussions | CI, `npm test`, `npm run test:negative`, a manual accessibility check, and a note on what changes for people who reuse the data |
| Season release | Each September, before Black History Month | As major or minor, plus a read-through of the calendar and toolkit |

## How a release is published
1. Bump the version in the five places above and write the release notes section `## X.Y.Z (date): title`, saying what changed and **how it was checked**.
2. `npm run build:all`, then the checks: `npm run check:privacy`, `npm run check:data`, `npm run check:licences`, `npm run test:quick`, `npm run test:checks`.
3. Open a pull request. The template's checklist covers sources, privacy, accessibility and self-checks.
4. When the checks pass, merge (**Squash and merge**).
5. The **Release** workflow sees the new version in `package.json` and publishes release `vX.Y.Z` from the merge commit, with the single-file hub, the open data, the Teams app, `SHA256SUMS.txt` and a signed build-provenance attestation. The website redeploys at the same time.
6. Post the release in Discussions (**Announcements**) if it is a minor or major release.

To publish a release by hand instead (for example if the workflow was skipped), push a tag: `git tag vX.Y.Z <merge commit> && git push origin vX.Y.Z`. The workflow does nothing if the release already exists, so it is safe to re-run.

## Verifying a download
```
sha256sum -c SHA256SUMS.txt
gh attestation verify bhm-2026-hub.html --repo cyberdudeuk/black-mixed-heritage
```
The attestation proves the file was built by this repository's release workflow from a named commit.

## Hotfixes and rollback
- **Wrong fact or broken page on the website:** revert the pull request that caused it (the **Revert** button on the merged pull request), let the checks pass, merge. The website redeploys in minutes. Then fix properly and release a patch.
- **Urgent personal data on the website:** revert first, then follow the moderation steps in the admin guide (section 7).
- **A bad release on the releases page:** do not delete it if people may have downloaded it; publish a patch and edit the bad release's notes to point to it. Delete a release only if it holds personal data.

## Support
Only the latest release is supported. Older releases remain available on the releases page and in git history.

## Release notes style
Plain English, past tense, one bullet per change, grouped by what readers notice first. Each release says what was checked, including any check that was shown failing on the previous version. No personal details, no names of private individuals, no internal project names.
