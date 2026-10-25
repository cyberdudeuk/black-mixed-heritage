## What this changes

## Why
<!-- Link the issue it closes, for example "Closes #12". -->

## Checks
- [ ] Every new or changed fact links to a source I have read (two independent sources where possible; Wikipedia not counted)
- [ ] No personal data added (`npm run check:privacy` passes)
- [ ] `npm run build:all` run and `dist/`, `site/` and `data/` committed
- [ ] `npm run test:quick` passes (all in-page self-checks, both editions)
- [ ] If this fixes a defect, a new check fails on the old version and passes now
- [ ] Accessibility kept: keyboard, screen reader labels, contrast, phone width
- [ ] Release notes updated in `docs/release-notes.md` if users will notice the change
