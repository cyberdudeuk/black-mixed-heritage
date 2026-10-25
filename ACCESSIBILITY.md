# Accessibility

The hub aims to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.

## What is in place
- Keyboard access throughout; a skip link; visible focus; `/` opens search and Escape closes search, menus and tooltips.
- **Theme** (light or dark) and **Access** buttons at the top right. Access offers text size (100%, 112%, 125%, 150%), a highly legible font, more space between lines and letters, underlined links, high contrast and a choice to play animations (off when your device asks for reduced motion). Settings are saved in your browser only.
- Charts offer "Show the data as a table"; images have text alternatives.
- Plain English summaries ("In short") at the top of long pages.
- Automated checks: 162 in-page self-checks run in every visitor's browser; axe-core scans every page at desktop and phone widths in CI (`tests/ci-axe.mjs`) and in the full suite (`tests/test.mjs`).

## Known limitations
The full accessibility statement, with known issues and how they are being fixed, is on the hub: **About → About this hub → Accessibility statement**.

## Report a barrier
Open an [accessibility report](../../issues/new?template=accessibility.yml). Say what you were trying to do, what happened and, if you are happy to, the assistive technology you use. Do not include personal information.
