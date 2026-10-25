
/* ================= v2.7.0 AFRICA'S PEOPLES, REGIONS, SEAS, BORDERS AND DISPLACEMENT ================= */
VIEW_ICONS.peoples="globe";
let PP_REG=(PP_REGIONS[0]||{}).id||"";
/* Headline numbers: each must appear, word for word, in the sourced point it comes from (C129) */
const PP_KPI=[
 {s:"scale",h:"How many countries?",n:"55",l:"African Union member states",ic:"flag"},
 {s:"scale",h:"How many languages?",n:"2,110",l:"languages in a 2009 count, about 31% of the world's; Britannica gives 900 to 1,500",ic:"mic"},
 {s:"borders",h:"Partitioned peoples",n:"231 of 834",l:"mapped ethnic homelands split by colonial borders",ic:"map"},
 {s:"displacement",h:"Sub-Saharan Africa today: internal displacement",n:"31.7 million",l:"people internally displaced in sub-Saharan Africa at the end of 2025",ic:"route"}];
function _ppWiki(src){return src.length&&src.every(s=>SOURCES[s]&&/wikipedia\.org/.test(SOURCES[s].u||""))}
function ppCard(p,id){return `<article class="card ppcard"${id?` id="${id}"`:""}><h3>${esc(p.h)}</h3>${p.figure?`<p class="ppfig">${esc(p.figure)}${p.year?` <span class="muted">(${esc(String(p.year))})</span>`:""}</p>`:""}${p.disputed?`<p class="eqmost">${icon("debate")} <b>Disputed or uncertain:</b> ${esc(p.note||"estimates differ; see the sources.")}</p>`:""}<p>${esc(p.text)}</p>${!p.disputed&&p.note?`<p class="muted">${esc(p.note)}</p>`:""}${_ppWiki(p.src)?`<p class="muted ppwiki">${icon("info")} Source is Wikipedia only: treat as provisional until a stronger source is added.</p>`:""}<div class="tags">${[...new Set(p.src)].map(evTag).join("")}</div></article>`}
function _ppSlug(s){return String(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,40)}
function renderPeoples(){if(!$("#ppScale"))return;
  if(!$("#ppScale .card")){
    $("#ppKpi").innerHTML=PP_KPI.map(k=>kpi(k.n,k.l,k.ic)).join("");
    const sec=k=>PP[k]||{points:[]};
    $("#ppScale").innerHTML=sec("scale").points.map(p=>ppCard(p,"pp-scale-"+_ppSlug(p.h))).join("");
    $("#ppRegIntro").textContent=sec("regions").intro||"";$("#ppFrame").innerHTML=sec("regions").points.map(p=>ppCard(p)).join("");
    $("#ppSeaIntro").textContent=sec("seas").intro||"";$("#ppSeas").innerHTML=sec("seas").points.map(p=>ppCard(p,"pp-sea-"+_ppSlug(p.h))).join("");
    $("#ppBordIntro").textContent=sec("borders").intro||"";$("#ppBorders").innerHTML=sec("borders").points.map(p=>ppCard(p,"pp-b-"+_ppSlug(p.h))).join("");
    $("#ppDispIntro").textContent=sec("displacement").intro||"";$("#ppDisp").innerHTML=sec("displacement").points.map(p=>ppCard(p,"pp-d-"+_ppSlug(p.h))).join("");
    $("#ppLimIntro").textContent=sec("adversarial").intro||"";$("#ppLimits").innerHTML=sec("adversarial").points.map(p=>ppCard(p)).join("");
    $("#ppIslands tbody").innerHTML=PP_ISLANDS.map(i=>`<tr id="pp-isl-${_ppSlug(i.n)}"><th scope="row">${esc(i.n)}</th><td>${i.type==="state"?"Independent state":"Territory or part of a state"}</td><td>${esc(i.note)}</td><td><div class="tags">${[...new Set(i.src)].map(evTag).join("")}</div></td></tr>`).join("");
    $("#ppPart tbody").innerHTML=PP_PART.map(g=>`<tr id="pp-part-${_ppSlug(g.group)}"><th scope="row">${esc(g.group)}</th><td>${esc(g.countries.join(", "))}</td><td>${esc(g.note)}</td><td><div class="tags">${[...new Set(g.src)].map(evTag).join("")}</div></td></tr>`).join("");
    $("#ppTime").innerHTML=PP_TIME.map(t=>`<li><span class="mono pptly">${esc(t.y)}</span> <span>${esc(t.t)}</span> <span class="tags">${[...new Set(t.src)].map(evTag).join("")}</span></li>`).join("");
    $("#ppRegChips").innerHTML=PP_REGIONS.map(r=>`<button type="button" class="chip" data-r="${r.id}" aria-pressed="${r.id===PP_REG}">${esc(r.name)} <span class="mono">${r.points.length}</span></button>`).join("");
    $$("#ppRegChips .chip").forEach(b=>b.addEventListener("click",()=>{PP_REG=b.dataset.r;$$("#ppRegChips .chip").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));drawReg()}))}
  const drawReg=()=>{const r=PP_REGIONS.find(x=>x.id===PP_REG)||PP_REGIONS[0];if(!r)return;
    $("#ppRegion").innerHTML=`<h3 class="lsh" id="pp-reg-${r.id}">${icon("map")} ${esc(r.name)}${r.au_region?` <span class="muted mono">AU: ${esc(r.au_region)}</span>`:""}</h3><div class="grid g3">${r.points.map(p=>ppCard(p)).join("")}</div>`;enhanceAll()};
  drawReg();enhanceAll()}
/* chronological order: BCE negative; 'c.', ranges and centuries use the start */
function ppYear(y){y=String(y);const bce=/BCE|BC\b/.test(y);const c=y.match(/(\d+)(st|nd|rd|th)\s*(?:-|–)?\s*(?:\d+(?:st|nd|rd|th))?\s*c/);if(c){const v=(+c[1]-1)*100;return bce?-v:v}const m=y.match(/\d{1,4}/);if(!m)return NaN;return bce?-(+m[0]):+m[0]}
CHECKS.push(
 {id:"C126",n:"Every point on the peoples, regions and borders page is sourced, and disputed points say why (D-081)",run:c=>({ok:c.pp.points>=60&&!c.pp.bad.length&&c.pp.regions>=9,d:c.pp.bad.length?"Problems: "+c.pp.bad.slice(0,6).join(", "):`${c.pp.points} sourced points (${c.pp.disputed} disputed, each with a note) across ${c.pp.regions} regions; ${c.pp.islands} islands, ${c.pp.part} divided peoples, ${c.pp.time} dated events; ${c.pp.wiki} rest on Wikipedia alone and say so`}),
  breakIt:c=>{c.pp={...c.pp,bad:["Rwanda, 1994: disputed without a note"]};return c}},
 {id:"C127",n:"The timeline runs in date order (D-082)",run:c=>({ok:c.pptl.n>=20&&!c.pptl.out.length,d:c.pptl.out.length?"Out of order: "+c.pptl.out.join("; "):`${c.pptl.n} events in date order, from ${c.pptl.first} to ${c.pptl.last}`}),
  breakIt:c=>{c.pptl={...c.pptl,out:["1964 before 1914"]};return c}},
 {id:"C128",n:"The borders story is told from more than one side (D-083)",run:c=>({ok:c.ppbal.counter>=2&&c.ppbal.myths>=3,d:`${c.ppbal.counter} points give the counter-view (Berlin did not draw the map; not all borders were arbitrary); ${c.ppbal.myths} common claims tested against the evidence`}),
  breakIt:c=>{c.ppbal={counter:0,myths:0};return c}},
 {id:"C129",n:"Each headline number appears in the sourced point it comes from (D-084)",run:c=>({ok:c.ppkpi.bad.length===0&&c.ppkpi.n===PP_KPI.length,d:c.ppkpi.bad.length?"Not found in its source point: "+c.ppkpi.bad.join(", "):`${c.ppkpi.n} headline numbers each traced to a sourced point`}),
  breakIt:c=>{c.ppkpi={...c.ppkpi,bad:["3,000 tribes"]};return c}});
Object.assign(BUILD_TESTS,{"D-081":"A page on Africa's peoples, languages, regions, seas, islands, colonial borders and displacement was added; every point, island, divided people and dated event must rest on a read source, disputed figures must say why, and points resting on Wikipedia alone are labelled as provisional (C126)",
 "D-082":"Timelines elsewhere in the hub had to be kept in date order by hand; this one is checked (C127)",
 "D-083":"The request framed borders as drawn purely for European interests; the evidence also shows Berlin did not itself draw the map and some borders followed earlier polities or later treaties. Both sides must stay on the page, with common myths tested (C128)",
 "D-084":"Headline numbers are where errors spread fastest; each must match its sourced point word for word (C129)"});
REQS.push({id:"R69",t:"F",r:"Explain Africa's cultural, linguistic and ethnic diversity; mainland and island states; how the regions, the Mediterranean basin and the surrounding seas differ; how colonial borders were made and whom they divided; displacement from the Scramble to today's conflicts and disasters",o:"Requests 39 to 42",sat:["pp-scale","pp-regions","pp-seas","pp-borders","pp-displacement","pp-timeline","pp-limits"],ver:["C126","C127","C128","C129","C130"]});
DATASETS.push({k:"peoples",n:"Africa: peoples, regions, borders and displacement",ic:"globe",arr:()=>Object.values(PP).flatMap(s=>s.points.map(p=>({...p,id:"pp-"+s.k+"-"+_ppSlug(p.h)}))),id:x=>x.id,lab:x=>x.h,srcs:x=>x.src||[],view:"peoples",href:x=>"#pp-"+x.id.split("-")[1],out:["pages","jsonld"],chk:["C126"]});
const _ctx50=ctxV15;ctxV15=function(){const c=_ctx50();
  const all=[...Object.values(PP).flatMap(s=>s.points),...PP_REGIONS.flatMap(r=>r.points)];
  const okSrc=a=>a&&a.length&&a.every(s=>SOURCES[s]&&SOURCES[s].rd);
  c.pp={points:all.length,disputed:all.filter(p=>p.disputed).length,regions:PP_REGIONS.length,islands:PP_ISLANDS.length,part:PP_PART.length,time:PP_TIME.length,wiki:all.filter(p=>_ppWiki(p.src)).length,
    bad:[...all.filter(p=>!okSrc(p.src)).map(p=>p.h+": no read source"),...all.filter(p=>p.disputed&&!p.note).map(p=>p.h+": disputed without a note"),...PP_ISLANDS.filter(i=>!okSrc(i.src)).map(i=>i.n),...PP_PART.filter(g=>!okSrc(g.src)).map(g=>g.group),...PP_TIME.filter(t=>!okSrc(t.src)).map(t=>t.y)]};
  const ys=PP_TIME.map(t=>ppYear(t.y));const out=[];for(let i=1;i<ys.length;i++)if(!(ys[i]>=ys[i-1]))out.push(PP_TIME[i].y+" after "+PP_TIME[i-1].y);
  c.pptl={n:PP_TIME.length,out,first:(PP_TIME[0]||{}).y,last:(PP_TIME[PP_TIME.length-1]||{}).y};
  const b=(PP.borders||{points:[]}).points,a=(PP.adversarial||{points:[]}).points;
  c.ppbal={counter:b.filter(p=>/did not draw|not all borders/i.test(p.h)).length,myths:a.filter(p=>/^(Myth|Claim)/.test(p.h)).length};
  c.ppkpi={n:PP_KPI.length,bad:PP_KPI.filter(k=>{const p=((PP[k.s]||{}).points||[]).find(x=>x.h===k.h);return !p||!okSrc(p.src)||!((p.figure||"")+" "+p.text).includes(k.n)}).map(k=>k.n)};return c};
/* Research notes must never reach the page (D-085): the same leak happened on the knowledge page in 2.4.0 */
const RESEARCH_LEAK=/(opened|verified|checked|sourced|loaded|fetched|confirmed|quoted) today|page opened|refused access|could not be (opened|fetched)|did not load|fetch tool|spot-check|before publishing|treat (as|these as) unverified|not quoted from|(is|are) now (quoted|sourced)|now quoted (directly )?from|was not checked/i;
function researchLeaks(){const out=[];const scan=(where,o)=>{if(typeof o==="string"){if(RESEARCH_LEAK.test(o))out.push(where+": “"+o.slice(0,60)+"”")}else if(Array.isArray(o))o.forEach((x,i)=>scan(where,x));else if(o&&typeof o==="object")Object.entries(o).forEach(([k,x])=>{if(k!=="src")scan(where,x)})};
  scan("peoples",PP);scan("peoples",PP_REGIONS);scan("peoples",PP_ISLANDS);scan("peoples",PP_PART);scan("peoples",PP_TIME);
  if(typeof AK_DOMAINS!=="undefined")scan("knowafrica",AK_DOMAINS);if(typeof AK_PLURAL!=="undefined")scan("knowafrica",AK_PLURAL);
  if(typeof LANG_TERMS!=="undefined"){scan("language",LANG_TERMS);scan("language",LANG_RE);scan("language",LANG_AB)}if(typeof FAQ!=="undefined")scan("faq",FAQ);return out}
CHECKS.push({id:"C130",n:"No researchers' working notes appear on the page (D-085)",run:c=>({ok:c.leaks.n===0&&c.leaks.scanned>=4,d:c.leaks.n?c.leaks.n+" notes: "+c.leaks.list.slice(0,3).join("; "):`${c.leaks.scanned} researched datasets scanned; no working notes found`}),breakIt:c=>{c.leaks={...c.leaks,n:1,list:["peoples: “not opened today”"]};return c}});
BUILD_TESTS["D-085"]="Research notes written for the editor (for example ‘not opened today’, ‘the fetch tool’s summary’) reached the draft of the peoples page, as they had reached the knowledge page in 2.4.0. They were rewritten for readers or the unconfirmed facts removed, and C130 now scans every researched dataset";
const _ctx51=ctxV15;ctxV15=function(){const c=_ctx51();const l=researchLeaks();c.leaks={n:l.length,list:l,scanned:[typeof PP,typeof AK_DOMAINS,typeof LANG_TERMS,typeof FAQ].filter(t=>t!=="undefined").length};return c};
function v33Boot(){renderPeoples()}
