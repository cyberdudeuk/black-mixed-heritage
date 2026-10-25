
/* ================= v1.9 ACKNOWLEDGEMENTS, CREDITS, LICENCES, COPYRIGHT, DISCLAIMERS, DISCLOSURES, NOTICES ================= */
const CREDITS=[
 ["Bricolage Grotesque","Typeface","SIL Open Font License 1.1","https://fonts.google.com/specimen/Bricolage+Grotesque"],
 ["Source Serif 4","Typeface","SIL Open Font License 1.1","https://fonts.google.com/specimen/Source+Serif+4"],
 ["IBM Plex Mono","Typeface","SIL Open Font License 1.1","https://fonts.google.com/specimen/IBM+Plex+Mono"],
 ["Noto Sans Ethiopic and Noto Sans Tifinagh","Typefaces for Ge'ez and Tifinagh scripts","SIL Open Font License 1.1","https://fonts.google.com/noto"],
 ["Atkinson Hyperlegible (Braille Institute of America)","Typeface for the legible-text setting","SIL Open Font License 1.1","https://fonts.google.com/specimen/Atkinson+Hyperlegible"],
 ["QRCode.js 1.0.0","Draws the QR code in the footer","MIT licence","https://cdnjs.com/libraries/qrcodejs"],
 ["JsBarcode 3.11.6","Draws the barcode in the footer","MIT licence","https://cdnjs.com/libraries/jsbarcode"],
 ["PptxGenJS 4.0.1 and docx 9.8.1","Used at build time to make the PowerPoint and Word templates","MIT licence","https://github.com/gitbrent/PptxGenJS"],
 ["axe-core 4.10.2 (Deque)","Used at build time to test accessibility","Mozilla Public License 2.0","https://github.com/dequelabs/axe-core"],
 ["Natural Earth","Country and coastline outlines for the maps","Public domain","https://www.naturalearthdata.com/about/terms-of-use/"]];
const ATTRIB=[
 ["Office for National Statistics, Ethnicity facts and figures, GOV.UK departments, NHS England, NHS Digital, devolved governments and other public bodies","Contains public sector information licensed under the Open Government Licence v3.0.","https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"],
 ["Wikipedia","Summaries here are our own words, with links to the articles. Wikipedia text is available under the Creative Commons Attribution-ShareAlike licence.","https://en.wikipedia.org/wiki/Wikipedia:Text_of_the_Creative_Commons_Attribution-ShareAlike_4.0_International_License"],
 ["Research, charities, universities, museums, archives and other organisations","Figures and descriptions are summarised from each organisation's own page, which is linked as the source. Their content remains theirs.",""]];
function renderNotices(){const host=$("#v-about");if(!host||$("#ab-notices"))return;const ref=$("#about-sources");
  const nSrc=Object.keys(SOURCES).length,hosts=new Set(Object.values(SOURCES).map(s=>{try{return new URL(s.u).hostname.replace(/^www\./,"")}catch(e){return""}}).filter(Boolean)).size;
  const html=`<section class="block" id="ab-notices" data-icon="doc" data-label="Credits, licences and notices"><div class="sechead"><span class="eyebrow">Acknowledgements, credits, copyright, licences, disclaimers and notices</span><h2>Credits, licences and notices</h2></div>
  <div class="grid g2 vtskip">
   <div class="card"><h3>${icon("heart")} Acknowledgements</h3><p>This hub stands on the work of others: the Black communities, historians, archivists, artists, writers, scientists, campaigners, networks and public servants whose lives and work it describes; Black History Month UK, which sets the annual theme; and the ${hosts} organisations and publishers whose ${nSrc} sources are cited and linked throughout. Thank you to everyone who will review it, correct it and tell us what is missing.</p>
    <p>Award details were checked against each organiser's public page.</p></div>
   <div class="card"><h3>${icon("award")} Copyright and licence</h3><p>© 2026, made in a personal capacity. Text and data created for this hub may be reused under the <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">Creative Commons Attribution 4.0 licence</a>; code under the <a href="https://opensource.org/license/mit" target="_blank" rel="noopener">MIT licence</a>. Please credit "BHM 2026 Hub".</p>
    <p class="eqmost">${icon("flag")} The licence above is a default chosen when the hub was built. If the hub is adopted as departmental work, Crown copyright and the Open Government Licence may apply instead: check with your department's information rights or intellectual property lead.</p>
    <p>Third-party content is not covered by this licence and remains under its owners' terms, listed below.</p></div>
   <div class="card"><h3>${icon("scale")} Third-party content and attribution</h3><ul>${ATTRIB.map(a=>`<li><b>${esc(a[0])}</b>: ${esc(a[1])} ${a[2]?`<a href="${a[2]}" target="_blank" rel="noopener">Licence</a>`:""}</li>`).join("")}</ul>
    <p>Organisations, schemes, awards and publications are named for identification only. Naming them does not imply that they endorse this hub, or that the hub endorses them. No logos or trademarks are reproduced.</p></div>
   <div class="card"><h3>${icon("palette")} Credits</h3><div class="tablewrap"><table class="tskip"><caption>Typefaces, libraries and data used</caption><thead><tr><th scope="col">What</th><th scope="col">Used for</th><th scope="col">Licence</th></tr></thead><tbody>${CREDITS.map(c=>`<tr><td><a href="${c[3]}" target="_blank" rel="noopener">${esc(c[0])}</a></td><td>${esc(c[1])}</td><td>${esc(c[2])}</td></tr>`).join("")}</tbody></table></div>
    <p>Motifs, patterns, icons, persona avatars and posters were drawn for this hub. Motifs are inspired by named traditions and shown with their meanings; they are not copies of any specific design.</p></div>
   <div class="card"><h3>${icon("info")} Disclaimers</h3><ul>
    <li>This is an unofficial resource. It is not published or endorsed by Black History Month UK, HM Government or any department, and it does not state government policy.</li>
    <li>Facts, figures, scheme and award details were checked against their sources on the dates shown, mostly 21 October 2026. Deadlines, eligibility and statistics change: always confirm on the official page before acting.</li>
    <li>Nothing here is legal, HR, employment, financial, medical, immigration or careers advice. For a specific situation, speak to your HR team, union, Acas, a solicitor or another qualified adviser.</li>
    <li>Group statistics describe patterns, not individuals. They do not show the cause of a difference unless the source says so.</li>
    <li>External sites are not controlled by this hub, and links may change or break.</li>
    <li>Some pages discuss enslavement, racism, violence, mental health and discrimination. Content notes are given where they apply.</li></ul></div>
   <div class="card"><h3>${icon("spark")} Disclosures</h3><ul>
    <li>Built with AI assistance (Claude, by Anthropic), directed, reviewed and published in a personal capacity. Research was carried out by AI agents that opened and read each source; every source is linked so that anyone can check it.</li>
    <li>Quotes used to check sources were extracted by a page-reading tool and may differ slightly from the exact wording on the page.</li>
    <li>The AI assistant on this hub uses Claude when the page runs inside Claude. Its answers are generated, can be wrong, and are labelled as AI output.</li>
    <li>Personas, user stories and journeys are assumptions until tested with real users.</li>
    <li>No sponsorship, payment or affiliate links. The author has no commercial interest in any organisation listed.</li></ul></div>
   <div class="card"><h3>${icon("shield")} Privacy and cookies</h3><ul>
    <li>No cookies, analytics or tracking.</li>
    <li>Your browser stores your preferences (theme, text settings, card or list view, drawer state, checklist ticks) and, when the hub runs outside Claude, any ideas you add. Clear them at any time by clearing this site's data.</li>
    <li>Book and film club votes: when the hub runs inside Claude, your vote is saved in the page's shared store under an opaque ID, not your name, so that totals can be shown. You can change or remove your vote at any time.</li>
    <li>Expressions of interest to help run the hub: saved under an opaque ID and readable only by the hub owner, with your consent. Do not include names or contact details; you can withdraw at any time.</li>
    <li>Ideas box: titles and details you add are visible to everyone who can open the hub, under an opaque ID, not your name. Only you or the owner can change or remove them. Support votes are counted, not shown by person.</li>
    <li>The QR code and barcode libraries load from a public content delivery network (cdnjs).</li>
    <li>Do not enter personal or sensitive information in search, the AI assistant or comments.</li></ul></div>
   <div class="card"><h3>${icon("edit")} Corrections and feedback</h3><p>Found an error, an out-of-date figure or something missing? Leave a comment on this page. Corrections are made, checked and recorded in the change log, and the self-checks are updated so that the same error cannot come back.</p>
    <p>Version ${esc(META.version)}, ${esc(META.docId)}. Last full review 21 October 2026.</p></div>
  </div></section>`;
  ref?ref.insertAdjacentHTML("beforebegin",html):host.insertAdjacentHTML("beforeend",html);
  /* keep the footer's transparency note current */
  $$("footer p").forEach(p=>{if(/No tracking or cookies/.test(p.textContent)&&!/votes/.test(p.textContent))p.insertAdjacentHTML("beforeend",` Book and film club votes are saved in the page's shared store under an opaque ID, not your name. <a href="#ab-notices">Credits, licences and notices</a>.`)})}
