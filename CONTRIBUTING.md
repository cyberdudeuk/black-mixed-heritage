# Contributing

Thank you for helping. The hub depends on people who care about accuracy, accessibility and the communities it describes.

## Ground rules
1. **Every fact needs a source you have read.** Link it. If you could only find a summary, say so.
2. **Show strengths as well as gaps**, and both sides where evidence is disputed.
3. **No personal data** in issues, pull requests or the hub. Issues are public.
4. **Accessibility is not optional.** Changes must keep WCAG 2.2 AA.
5. **Every defect fixed gets a test** that would have caught it, and the test must be shown to fail on the broken version.

## How to contribute
- Small fixes and corrections: open an issue with the correction form.
- Code changes: fork, branch, change files in `src/`, run the build and the tests, and open a pull request using the template.
- Content changes go into the data files in `src/`, not the built page.

## Running the tests
`node tests/test.mjs` runs the full suite; `node tests/test.mjs --negative` injects known defects and must fail.

## Review
A maintainer reviews every pull request. Releases are logged in the hub's change log.
