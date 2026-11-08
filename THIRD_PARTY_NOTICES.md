# Third-party notices and licence assessment

## Summary
| Part | Licence | Notes |
|---|---|---|
| Code written for the hub (`src/`, `tests/`, workflows) | MIT (`LICENSE`) | Permissive; suits reuse by public bodies and others |
| Text and data created for the hub | CC BY 4.0 (`LICENSE-CONTENT.md`) | Attribution: "Black History and Heritage Hub" (earlier releases: "BHM 2026 Hub"). Compatible with the Open Government Licence v3.0 |
| Public sector information quoted or summarised | Open Government Licence v3.0 | Attributed to the publisher on each point |
| Short quotations from other publications | Fair dealing for criticism, review and quotation (Copyright, Designs and Patents Act 1988, s.30) | Quotes are short, attributed and linked; whole works are never reproduced |
| Wikipedia | Not used as a source | Where a summary mentions Wikipedia, the words are the hub's own |
| Images of people | None reproduced | Avoids third-party image rights and personality rights |

**Assessment.** MIT for code and CC BY 4.0 for content are the right pair for an open, reusable public-interest resource: both are permissive, widely understood and compatible with the Open Government Licence, so public bodies can adopt and adapt the hub. The obligations that arise from third-party material are only attribution notices, listed below; none of the third-party components imposes copyleft on the hub. axe-core (MPL-2.0) and Playwright (Apache-2.0) are test tools only and are not distributed in the website or the single file.

If the hub is adopted as departmental work, Crown copyright and the Open Government Licence may apply to new contributions made in that capacity.

## Components distributed in this repository or in the built pages
| File or component | Where | Licence | Copyright | Upstream |
|---|---|---|---|---|
| `src/vendor/teamsjs-2.56.0.min.js` (Microsoft Teams JavaScript client library 2.56.0) | Embedded in `site/index.html` | MIT | © Microsoft Corporation | https://github.com/OfficeDev/microsoft-teams-library-js |
| `tests/vendor/qrcode.min.js` (QRCode.js 1.0.0) | Tests only; the hub loads the same file from cdnjs | MIT | © 2012 davidshimjs | https://github.com/davidshimjs/qrcodejs |
| `tests/vendor/JsBarcode.all.min.js` (JsBarcode 3.11.6) | Tests only; the hub loads the same file from cdnjs | MIT | © Johan Lindell | https://github.com/lindell/JsBarcode |
| `src/vendor/world.json`, `src/vendor/uk.json`, `src/vendor/compare.json`, `src/vendor/globe.txt` (map outlines) | Embedded in the pages | Public domain | Made with Natural Earth | https://www.naturalearthdata.com/about/terms-of-use/ |
| `src/vendor/templates/*` (slide, report and induction pack templates) | Embedded in the pages | CC BY 4.0 | BHM 2026 Hub contributors | This repository |

## Components loaded by the page at run time (not distributed)
| Component | Licence | Source |
|---|---|---|
| Bricolage Grotesque, Source Serif 4, IBM Plex Mono, Atkinson Hyperlegible, Noto Sans Ethiopic, Noto Sans Tifinagh | SIL Open Font License 1.1 | Google Fonts |
| QRCode.js 1.0.0, JsBarcode 3.11.6 | MIT | cdnjs |

## Development and test tools (not distributed)
| Package | Licence |
|---|---|
| playwright | Apache-2.0 |
| axe-core | MPL-2.0 |
| pdf-lib | MIT |
| @fontsource/* (fonts for tests) | SIL Open Font License 1.1 |

## MIT licence text (applies to the MIT components above, with their own copyright lines)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
