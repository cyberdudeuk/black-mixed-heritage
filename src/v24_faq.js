
/* ================= v2.3.0 FREQUENTLY ASKED QUESTIONS AND THE PAN-AFRICAN COLOURS ================= */
VIEW_ICONS.faq="info";
const SWATCH={red:"#C8102E",gold:"#F2B705",yellow:"#F2B705",green:"#00843D",black:"#111111",white:"#FFFFFF",blue:"#1F5F99"};
function swatches(list){return `<span class="swatches">${String(list).split(/[,;]| and /).map(s=>s.trim().toLowerCase()).filter(Boolean).map(s=>{const k=Object.keys(SWATCH).find(x=>s.startsWith(x));return k?`<span class="sw2"><i style="background:${SWATCH[k]}" aria-hidden="true"></i>${esc(s)}</span>`:`<span class="sw2 nosw">${esc(s)}</span>`}).join("")}</span>`}
function renderFAQ(){const host=$("#faqList");if(!host||host.children.length)return;
  host.innerHTML=FAQ.map(f=>`<details class="card faq" id="${f.id}"><summary><h3>${esc(f.q)}</h3></summary><p>${esc(f.a)}</p><div class="tags">${f.src.map(evTag).join("")}</div></details>`).join("");
  $("#faqOpenAll")?.addEventListener("click",()=>{const open=$$("#faqList details:not([open])").length>0;$$("#faqList details").forEach(d=>d.open=open);$("#faqOpenAll").textContent=open?"Close all answers":"Open all answers"});
  window.__faq=FAQ.length}
function renderColours(){const v=$("#v-africa");if(!v||$("#af-colours"))return;const ref=v.querySelector("section.block:last-of-type");
  const html=`<section class="block" id="af-colours" data-icon="palette" data-label="Red, gold, green and black">
   <div class="sechead"><span class="eyebrow">Colours with a history</span><h2>Why red, gold, green and black?</h2><p>${esc(COLOURS_SUMMARY)}</p></div>
   <div class="colband" role="img" aria-label="Pan-African colours: red, gold and green; and the UNIA colours: red, black and green"><span style="background:${SWATCH.red}"></span><span style="background:${SWATCH.gold}"></span><span style="background:${SWATCH.green}"></span><span style="background:${SWATCH.black}"></span></div>
   <div class="grid g2 vtskip">${COLOURS.map(c=>`<article class="card" id="${c.id}"><h3>${esc(c.h)}</h3><p>${esc(c.t)}</p><div class="tags">${c.src.map(evTag).join("")}</div></article>`).join("")}</div>
   <div class="tablewrap"><table><caption>What each country says its own colours mean</caption><thead><tr><th scope="col">Country</th><th scope="col">Colours</th><th scope="col">Stated meanings</th><th scope="col">Source</th></tr></thead><tbody>${FLAGS.map(f=>`<tr><th scope="row">${esc(f.n)}</th><td>${swatches(f.c)}</td><td>${esc(f.m)}</td><td>${f.src.map(evTag).join("")}</td></tr>`).join("")}</tbody></table></div>
   <p class="muted">Meanings vary by country and over time, and some countries attach no official meaning at all. Colours are shown with their names, never by colour alone.</p></section>`;
  const bib=$("#v-africa .bibsec, #v-africa section[id$='-sources']");(bib||ref)?(bib||ref).insertAdjacentHTML(bib?"beforebegin":"afterend",html):v.insertAdjacentHTML("beforeend",html)}
CHECKS.push(
 {id:"C117",n:"Every FAQ answer is balanced, sourced and readable (D-064)",run:c=>({ok:c.faq.n>=8&&!c.faq.bad.length&&c.faq.shown===c.faq.n,d:c.faq.bad.length?"Problems: "+c.faq.bad.join(", "):`${c.faq.n} questions, each with at least one read source and an answer of 40 to 160 words; ${c.faq.shown} shown`}),
  breakIt:c=>{c.faq={...c.faq,bad:["faq-6 no source"]};return c}},
 {id:"C118",n:"The colours section sources every claim and never relies on colour alone (D-065)",run:c=>({ok:c.col.sections>=4&&c.col.flags>=5&&!c.col.unsourced&&c.col.unlabelled===0,d:`${c.col.sections} sections, ${c.col.flags} countries; ${c.col.unsourced} unsourced; ${c.col.unlabelled} swatches without a name`}),
  breakIt:c=>{c.col={...c.col,unlabelled:1};return c}});
Object.assign(BUILD_TESTS,{"D-064":"A frequently asked questions page was added, including contested questions such as 'why no White History Month?'; each answer must give the main views fairly and cite read sources (C117)","D-065":"A section on the Pan-African colours was added; every claim is sourced, meanings are given as each country states them, and colours always carry their names (C118)"});
REQS.push({id:"R65",t:"F",r:"FAQ answering why Black History Month, why not all year, why it is needed, why it is for everyone and the 'no White History Month' objection; the meaning and history of red, gold, green and black",o:"Request 34",sat:["fq-list","af-colours"],ver:["C117","C118"]});
const _ctx45=ctxV15;ctxV15=function(){const c=_ctx45();const words=s=>String(s).trim().split(/\s+/).length;
  c.faq={n:FAQ.length,shown:$$("#faqList details.faq").length,bad:FAQ.filter(f=>!f.src.length||!f.src.every(s=>SOURCES[s]&&SOURCES[s].rd)||words(f.a)<40||words(f.a)>160).map(f=>f.id)};
  c.col={sections:COLOURS.length,flags:FLAGS.length,unsourced:[...COLOURS,...FLAGS].filter(x=>!x.src.length).length,unlabelled:$$("#af-colours .sw2").filter(s=>!s.textContent.trim()).length};return c};
function v30Boot(){renderFAQ();renderColours()}
