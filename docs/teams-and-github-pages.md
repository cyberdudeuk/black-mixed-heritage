# Running the hub on GitHub Pages and as a Microsoft Teams app

The hub is one self-contained HTML file. The claude.ai link cannot be shown inside Teams: it only allows itself to be framed by claude.ai (`frame-ancestors 'self'`) and needs a claude.ai sign-in. This folder publishes the same hub on GitHub Pages, which Teams can show in a tab, and packages a Teams app that points at it.

## What is different from the claude.ai version

| Feature | claude.ai | GitHub Pages and Teams |
|---|---|---|
| All pages, maps, sources, self-checks, downloads, posters | Yes | Yes |
| Club votes, ideas box, expressions of interest shared with others | Shared (artifact database) | Saved in each person's own browser only |
| Built-in AI assistant | Yes (viewer's own Claude account) | Not available |
| Teams theme (light, dark, high contrast) followed | n/a | Yes |
| Who can see it | Only people the owner shares it with | **Anyone with the link: GitHub Pages sites are public** |

The hub holds no personal or sensitive data, no team email and no phone numbers, so publishing it publicly is consistent with how it was built. Check with your information assurance team before you publish.

## 1. Create the repository and publish the site

1. Create a repository on GitHub (for example `OWNER/black-mixed-heritage`). The GDS Way asks for code to be open by default.
2. Push this bundle to the `main` branch.
3. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. The workflow `.github/workflows/pages.yml` checks the build and deploys `site/` on every push to `main`. The site appears at `https://OWNER.github.io/REPO/`.
5. To rebuild the site for a different address: `node build_pages.mjs https://OWNER.github.io/REPO/ site`. The address is written into the page and its QR code.

GitHub Pages does not send headers that block framing, so Teams can show the page in a tab.

## 2. Quickest option: a Website tab (no app needed)

In a Teams channel, select **+** (Add a tab) → **Website**, name it, paste `https://OWNER.github.io/REPO/` and save. Teams shows the site in the tab; if a policy blocks it, Teams offers **Open in browser**.

## 3. Better option: the Teams app (pinned for everyone, follows the Teams theme)

1. Regenerate the manifest for your address: `node teams/mkmanifest.mjs https://OWNER.github.io/REPO/ 1.0.0`. The app id in `teams/app-id.txt` is kept so later versions replace the same app.
2. Package it: `python3 teams/package.py` (produces `teams/bhm-hub-teams-app-1.0.0.zip` with `manifest.json`, `color.png` and `outline.png` at the root).
3. Either:
   - **Your Teams admins** upload it in the Teams admin centre (Manage apps → Upload new app), approve it, and can pin it for staff through an app setup policy; or
   - **if your organisation allows custom apps**, upload it yourself: Apps → Manage your apps → Upload an app → Upload a custom app.
4. Add it to a channel, chat or meeting, or use it as a personal app in the left rail. The manifest uses schema 1.19 and one static tab available in personal, team and group chat scopes.

The page loads the Microsoft Teams JavaScript library (version 2.56.0, embedded in the file) and calls `app.initialize()` only when it is running inside Teams, as Microsoft requires. Outside Teams nothing changes.

## 4. On 1 November (lasting name)

The hub switches to the lasting name *Black History and Heritage Hub*, with BHM 2026 as its launch edition. Rebuild the site, then run `node teams/mkmanifest.mjs https://OWNER.github.io/REPO/ 1.2.0 rename` (done for this repository in 3.0.0: app package 1.2.0, same app id) and `python3 teams/package.py`, and upload the new package to replace the app.

## How this was checked

- The Pages build loads with no script errors and passes all its self-checks, both on its own and inside a frame that is not Teams (where the Teams start-up does nothing).
- `teams/manifest.json` validates against Microsoft's v1.19 schema; a deliberately broken manifest is rejected by the same check.
- Not yet checked: loading inside a real Teams client. That needs the site to be live and the app uploaded to a tenant.

Sources: Microsoft Learn, [Tab requirements](https://learn.microsoft.com/microsoftteams/platform/tabs/how-to/tab-requirements); [A website doesn't load in the new Teams desktop client](https://learn.microsoft.com/troubleshoot/microsoftteams/tabs/websites-not-loaded-new-teams); [Extend static tabs to group chat, channels and meetings](https://learn.microsoft.com/microsoftteams/platform/tabs/how-to/create-personal-tab); [SharePoint file handling (strict model)](https://learn.microsoft.com/sharepoint/dev/solution-guidance/security-permissivesetting).
