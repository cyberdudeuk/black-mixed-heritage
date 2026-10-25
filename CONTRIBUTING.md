# Contributing

Thank you for helping. The hub depends on people who care about accuracy, accessibility and the communities it describes. Please read the [code of conduct](CODE_OF_CONDUCT.md) first.

## Ground rules
1. **Every fact needs a source you have read.** Link it. If you could only read a summary or abstract, say so. Two independent sources, at least one authoritative, where possible. Wikipedia is not counted as a source.
2. **Show strengths as well as gaps**, and both sides where evidence is disputed.
3. **No personal data** in issues, pull requests or the hub. Issues are public. Never classify a person's ethnicity yourself: use published counts only. Name living people only in a public role.
4. **Accessibility is not optional.** Changes must keep WCAG 2.2 AA, at phone and desktop widths, in light and dark themes.
5. **Every defect fixed gets a check** that would have caught it, and the check must be shown to fail on the broken version.

See the [content style guide](docs/content-style-guide.md) for sourcing, wording and terms.

## Ways to contribute
| Contribution | How |
|---|---|
| Correct a fact, report a bug or a barrier | Use the [issue forms](../../issues/new/choose). |
| Suggest an idea, feature, event or source | Use the forms, or the ideas box on the hub's **Help run the hub** page. |
| Change content or code | Fork, branch, edit `src/`, build, test and open a pull request (below). |
| Review | Comment on open pull requests, especially if you belong to the communities a change describes. |

## Making a change
```
npm install && npx playwright install chromium
# edit files in src/ (see docs/architecture.md for which file holds what)
npm run build:all          # rebuilds dist/, site/ and data/
npm run test:quick         # all in-page self-checks on both editions
npm run check:privacy      # nothing personal in the pages
```
Commit the rebuilt `dist/`, `site/` and `data/` with your change: CI rebuilds them and fails if they differ. Never edit `dist/` or `site/index.html` by hand.

The full suite (`npm test`, about an hour) runs every page at several widths and themes with axe-core; `npm run test:negative` injects known defects and must fail. Maintainers run both before a release.

## Pull requests
- Use the template and tick each check honestly.
- Keep each pull request to one change.
- `main` is protected: the Checks workflow must pass and a maintainer reviews every pull request.
- If users will notice the change, add a line to `docs/release-notes.md`.

## Licence
By contributing you agree that code is licensed under MIT and text and data under CC BY 4.0, as set out in `LICENSE` and `LICENSE-CONTENT.md`.
