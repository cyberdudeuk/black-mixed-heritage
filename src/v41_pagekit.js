/* ================= v2.11.0 PAGE KIT: features of the newer pages carried to the older ones, and similar content co-located (D-110 to D-113) =================
   Before: only the eight pages added in 2.8.0 to 2.10.0 opened with "In short" and offered "From where you stand"; older pages,
   some with more evidence than the new ones, had neither, and passages on related subjects sat on different pages with no link
   between them. Now every content page gets the same two features, written from the page's own sourced content and linked to
   it, and sections that cover the same ground link to each other ("Also covered on"). Nothing here adds a new fact: every
   number in a summary must already appear in the passages it links to. */
const PK_CONTENT=["equity","bench","lives","careers","talent","enterprise","younglives","represent",
  "history","journeys","whatwaslost","stereotypes","curriculum","africa","diaspora","innovation","tech","culture","food","futures",
  "blackness","language","knowafrica","peoples","genome","myths","belonging","debates","lenses","deeia"];
const PK_STOP=new Set("about above after again against among because before being below between black british could does doing during each every first from further have having here into itself more most other over same should since some such than that their them then there these they this those through under until very were what when where which while whose with within without would your people peoples years year also many much often still across around page".split(" "));
function pkEl(id){return document.getElementById(id)}
function pkLabel(el){if(!el)return"";const h=el.querySelector("h2,h3,h4,summary,th")||el;return h.textContent.replace(/\s+/g," ").trim().replace(/▾|▸/g,"").slice(0,80)}
function pkView(el){const v=el&&el.closest(".view");return v?v.id.slice(2):""}
function pkPageName(id){const v=VIEWS.find(x=>x[0]===id);return v?v[1]:id}
function pkRefText(refs){return refs.map(r=>{const e=pkEl(r);return e?e.textContent:""}).join(" ").replace(/\s+/g," ")}
function pkNums(t){return(t.match(/\d[\d,.]*\d%?|\d%?/g)||[]).map(n=>n.replace(/,/g,"").replace(/\.$/,""))}
function pkWords(t){return(t.toLowerCase().match(/[a-z]{5,}/g)||[]).filter(w=>!PK_STOP.has(w))}
function pkRender(){Object.entries(PK).forEach(([id,P])=>{const v=pkEl("v-"+id);if(!v||v.dataset.pk)return;v.dataset.pk="1";
    const first=v.querySelector("section.block");
    if(P.short&&first){const d=document.createElement("div");d.id=id+"-short";d.className="pkshort";
      d.innerHTML=`<aside class="card lpshort" aria-labelledby="${id}ShortH"><h3 id="${id}ShortH">${icon("info")} In short</h3><ul>${P.short.map(it=>`<li>${esc(it.t)} <a class="lpmore" href="#${it.refs[0]}">Read more<span class="vh"> about ${esc(it.t.slice(0,40))}</span></a></li>`).join("")}</ul><p class="muted small">A summary of this page written by the hub. Every number comes from the sourced passage it links to.</p></aside>`;
      const host=first.querySelector(":scope > .sechead");if(host)host.after(d);else first.parentNode.insertBefore(d,first)}
    if(P.vant){const s=document.createElement("section");s.className="block";s.id=id+"-vant";s.dataset.icon="hands";s.dataset.label="From where you stand";
      s.innerHTML=`<div class="sechead"><span class="eyebrow">Vantage points</span><h2>What this page means from where you stand</h2><p>Suggestions written by the hub for different readers. Each one links to the passages on this page it rests on, so it can be checked and challenged.</p></div><div class="grid g2 vtskip">${P.vant.map(c=>`<article class="card lpvant"><h3>${icon(c.ic||"user")} ${esc(c.who)}</h3><ul>${c.items.map(it=>`<li>${esc(it.t)} <span class="muted">See: ${it.refs.map(r=>{const e=pkEl(r);return e?`<a href="#${r}">${esc(pkLabel(e))}</a>`:`<span class="lpbad">${esc(r)}</span>`}).join(", ")}</span></li>`).join("")}</ul></article>`).join("")}</div>`;
      const nav=v.querySelector(".pagenav"),src=pkEl(id+"-sources");const at=nav||src;if(at)at.parentNode.insertBefore(s,at);else v.appendChild(s)}});
  pkXlinks()}
/* "Also covered on": both ends of every pair get a link to the other */
function pkXlinks(){const by=new Map();XL.forEach(x=>{[[x.a,x.b],[x.b,x.a]].forEach(([f,t])=>{if(!by.has(f))by.set(f,[]);by.get(f).push({t,why:x.why})})});
  by.forEach((list,f)=>{const s=pkEl(f);if(!s||_q(s,":scope > .xlink"))return;const a=document.createElement("aside");a.className="xlink";a.setAttribute("aria-label","Also covered on other pages");
    a.innerHTML=`<h3 class="xlh">${icon("layers")} Also covered on other pages</h3><ul>${list.map(x=>{const e=pkEl(x.t);return e?`<li><a href="#${x.t}">${esc(pkPageName(pkView(e)))}: ${esc(pkLabel(e))}</a> <span class="muted">${esc(x.why)}</span></li>`:`<li class="lpbad">${esc(x.t)}</li>`}).join("")}</ul>`;
    const srcs=_q(s,":scope > .srcs, :scope > .pagesrc");if(srcs)s.insertBefore(a,srcs);else s.appendChild(a)})}
function pkAudit(){const sb=[],vb=[],xb=[];let ns=0,nv=0;
  Object.entries(PK).forEach(([id,P])=>{
    if(P.short){if(P.short.length<3||P.short.length>6)sb.push(id+": "+P.short.length+" summary points");
      P.short.forEach(it=>{ns++;const w=it.t.trim().split(/\s+/).length;if(w>25)sb.push(id+": "+w+" words in “"+it.t.slice(0,30)+"”");
        if(!it.refs.length)sb.push(id+": summary point with no link");const miss=it.refs.filter(r=>!pkEl(r));if(miss.length){sb.push(id+": missing "+miss.join(","));return}
        const off=it.refs.filter(r=>pkView(pkEl(r))!==id);if(off.length)sb.push(id+": summary links off the page to "+off.join(","));
        const rt=pkRefText(it.refs),rn=rt.replace(/,(?=\d{3})/g,"");pkNums(it.t).forEach(n=>{if(!rn.includes(n))sb.push(id+": number "+n+" not in the linked passage")});
        const W=pkWords(it.t),rw=rt.toLowerCase();const hit=W.filter(x=>rw.includes(x.slice(0,5))).length;if(W.length>=3&&hit/W.length<0.5)sb.push(id+": “"+it.t.slice(0,40)+"” shares only "+hit+" of "+W.length+" key words with its evidence")})}
    if(P.vant){if(P.vant.length<4)vb.push(id+": fewer than four vantage points");
      P.vant.forEach(c=>c.items.forEach(it=>{nv++;if(!it.refs.length)vb.push(id+" "+c.who+": no link");it.refs.forEach(r=>{if(!pkEl(r))vb.push(id+" "+c.who+": "+r)})}))}});
  let nx=0;XL.forEach(x=>{nx++;const A=pkEl(x.a),B=pkEl(x.b);if(!A||!B){xb.push("missing "+(!A?x.a:x.b));return}
    if(pkView(A)===pkView(B))xb.push(x.a+" and "+x.b+" are on the same page");
    if(!A.querySelector(`:scope > .xlink a[href="#${x.b}"]`))xb.push(x.a+" has no link to "+x.b);
    if(!B.querySelector(`:scope > .xlink a[href="#${x.a}"]`))xb.push(x.b+" has no link back to "+x.a)});
  const cov=PK_CONTENT.map(id=>{const v=pkEl("v-"+id);const has=s=>!!(v&&v.querySelector(s));
    return{id,short:has(".lpshort"),vant:has(".lpvant"),src:!!pkEl(id+"-sources"),related:has(".related,.relv21,[data-related]"),xl:has(".xlink"),kpi:has(".kpis,.lpkpi,.kpi"),time:has(".lptime,.timeline,.pptl,#wLanes,[id$='-timeline']"),filters:has(".chips button,.chip[aria-pressed],.lpchips,.lpfbtn,.wfilt,select.tg")}});
  const cb=cov.filter(c=>!c.short||!c.vant||!c.src).map(c=>c.id+": "+["short","vant","src"].filter(k=>!c[k]).join(", ")+" missing");
  return{sb,vb,xb,cb,cov,ns,nv,nx}}
CHECKS.push(
 {id:"C153",n:"Older pages now open with a plain-English summary; every number in it appears in the passage it links to, and its key words come from that passage (D-110)",run:c=>({ok:!c.pk.sb.length&&c.pk.ns>=40,d:c.pk.sb.length?"Problems: "+c.pk.sb.slice(0,4).join("; "):`${c.pk.ns} summary sentences on ${Object.values(PK).filter(P=>P.short).length} older pages, each linked to the passage it summarises, every number traced and no sentence drifting from its evidence`}),
  breakIt:c=>{c.pk={...c.pk,sb:["equity: number 99 not in the linked passage"]};return c}},
 {id:"C154",n:"Older pages offer at least four “from where you stand” vantage points, each linked to passages that exist (D-111)",run:c=>({ok:!c.pk.vb.length&&c.pk.nv>=60,d:c.pk.vb.length?"Problems: "+c.pk.vb.slice(0,4).join("; "):`${c.pk.nv} suggestions for different readers across ${Object.values(PK).filter(P=>P.vant).length} older pages, each linked to the passages behind it`}),
  breakIt:c=>{c.pk={...c.pk,vb:["history Teachers: hx-gone"]};return c}},
 {id:"C155",n:"Sections that cover the same ground on different pages link to each other both ways (D-112)",run:c=>({ok:!c.pk.xb.length&&c.pk.nx>=12,d:c.pk.xb.length?"Problems: "+c.pk.xb.slice(0,4).join("; "):`${c.pk.nx} pairs of related sections on different pages, each linked in both directions`}),
  breakIt:c=>{c.pk={...c.pk,xb:["lives#ls-groups has no link back to younglives"]};return c}},
 {id:"C156",n:"Every content page has a summary, vantage points and a list of sources (D-113)",run:c=>({ok:!c.pk.cb.length,d:c.pk.cb.length?"Missing: "+c.pk.cb.slice(0,4).join("; "):`${c.pk.cov.length} content pages, each with “In short”, “From where you stand” and its sources; feature coverage is shown on the review page`}),
  breakIt:c=>{c.pk={...c.pk,cb:["food: short missing"]};return c}});
BUILD_TESTS["D-110"]="Only pages added from 2.8.0 opened with a plain-English summary; older pages with as much evidence had none. Summaries now cover every content page, and C153 checks each number against the passage it links to and flags any sentence whose key words are not in its evidence";
BUILD_TESTS["D-111"]="Vantage points (what a page means for a manager, a young person, a teacher and so on) existed only on the newer pages; they now cover the older content pages too, each suggestion linked to passages that exist (C154)";
BUILD_TESTS["D-112"]="Related passages sat on different pages with no link between them (for example life stages and young lives, inequalities and representation, African knowledge and journeys of knowledge); each pair now links both ways (C155)";
BUILD_TESTS["D-113"]="There was no single view of which page had which features; the review page now shows a feature matrix, and C156 fails if a content page lacks a summary, vantage points or sources";
REQS.push({id:"R82",t:"F",r:"Consider vantage points and the other features of later pages for every section and page",o:"Request 58",sat:["rv-features"],ver:["C153","C154","C156"]},
 {id:"R83",t:"F",r:"Identify content of a similar nature and combine, integrate, merge or co-locate it",o:"Request 58",sat:["rv-features"],ver:["C155","C150"]});
const _ctx67=ctxV15;ctxV15=function(){const c=_ctx67();c.pk=pkAudit();return c};
/* feature matrix on the review page */
function pkShell(){const v=$("#v-review");if(!v||$("#rv-features"))return;v.insertAdjacentHTML("beforeend",`<section class="block" id="rv-features" data-icon="grid" data-label="Feature coverage"><div class="sechead"><span class="eyebrow">Same features everywhere they help</span><h2>Feature coverage by page</h2></div><p class="muted">The matrix is drawn when the page is idle.</p></section>`)}
function pkMatrix(){const v=$("#v-review"),old=$("#rv-features");if(!v||(old&&old.dataset.done))return;if(old)old.remove();const a=pkAudit();const Y=b=>b?`<td class="ok">Yes</td>`:`<td class="muted">No</td>`;
  v.insertAdjacentHTML("beforeend",`<section class="block" id="rv-features" data-done="1" data-icon="grid" data-label="Feature coverage"><div class="sechead"><span class="eyebrow">Same features everywhere they help</span><h2>Feature coverage by page</h2><p>Which content pages have which features. Summaries, vantage points and sources are required on every content page; key figures, timelines and filters appear only where a page has enough data for them to help. Sections that cover the same ground on different pages link to each other.</p></div>
  <div class="tablewrap"><table class="dt" id="pkTable"><caption class="vh">Features on each content page</caption><thead><tr><th scope="col">Page</th><th scope="col">In short</th><th scope="col">From where you stand</th><th scope="col">Also covered on</th><th scope="col">Key figures</th><th scope="col">Timeline</th><th scope="col">Filters</th><th scope="col">Sources</th></tr></thead><tbody>${a.cov.map(c=>`<tr><th scope="row"><a href="#${c.id}">${esc(pkPageName(c.id))}</a></th>${Y(c.short)}${Y(c.vant)}${Y(c.xl)}${Y(c.kpi)}${Y(c.time)}${Y(c.filters)}${Y(c.src)}</tr>`).join("")}</tbody></table></div>
  <h3>Content merged or co-located in 2.11.0</h3><ul>${(window.PK_MERGES||[]).map(m=>`<li>${esc(m)}</li>`).join("")}</ul></section>`)}
function v41Boot(){try{pkRender()}catch(e){console.error("page kit",e)}try{pkShell()}catch(e){}(window.requestIdleCallback||setTimeout)(()=>{try{pkMatrix();enhanceAll()}catch(e){console.error("feature matrix",e)}},{timeout:6000})}
document.head.insertAdjacentHTML("beforeend",`<style id="v41css">.pkshort{margin:0 0 1.2rem}.xlink{margin-top:1rem;padding:.75rem 1rem;border-left:4px solid var(--accent,#2a78d6);background:var(--panel,transparent);border-radius:4px}.xlink .xlh{font-size:1rem;margin:0 0 .4rem}.xlink ul{margin:0;padding-left:1.1rem}.xlink li{margin:.25rem 0}#pkTable td.ok{font-weight:600}.lph1{font:800 clamp(1.9rem,4.2vw,2.75rem)/1.1 var(--f-display,inherit);margin:.25rem 0 .9rem;letter-spacing:-.01em}.lph1+h2{font-size:clamp(1.25rem,2.4vw,1.55rem);margin-top:0}</style>`);
/* private or process notes must never reach readers (D-115): provenance on the lens pages named the author's job role and private chat titles */
const PRIV_RX=/\b[Tt]he user's\b|\bchat '[^']{3,60}'|this sweep|another agent|research agent|subagent|\bfrom the user\b|claude\.ai\/(?:code\/)?artifact\/(?!VtxD1e8ZSzBR4NWP2RTB7y)[\w-]+|\(portal[,:) ]|\bportal (?:advice|count|data file|glossary|watch marker)\b|\bby the same author\b/g;
function privScan(){const out=[];const cl=document.body.cloneNode(true);cl.querySelectorAll("script,style,#v-assurance,#v-design,#v-review,#v-routines").forEach(e=>e.remove());const body=cl.textContent;(body.match(PRIV_RX)||[]).forEach(m=>out.push("page text: "+m));
  try{const t=JSON.stringify(LP)+JSON.stringify(PK)+JSON.stringify(XL)+(typeof AWARDS!=="undefined"?JSON.stringify(AWARDS):"")+(typeof SOURCES!=="undefined"?JSON.stringify(SOURCES):"")+(typeof RELATED!=="undefined"?JSON.stringify(RELATED):"");(t.match(PRIV_RX)||[]).forEach(m=>out.push("data: "+m))}catch(e){}return out}
CHECKS.push({id:"C157",n:"No private notes (the author's job, private chat titles) or research-process notes appear anywhere in the hub or its data (D-115)",run:c=>({ok:!c.priv.length,d:c.priv.length?c.priv.length+" found: "+c.priv.slice(0,3).join("; "):"Page text and the lens, summary and link data scanned; no private or process notes"}),
  breakIt:c=>{c.priv=["data: chat 'an example title'"];return c}});
BUILD_TESTS["D-115"]="Provenance notes on seven lens-page cards named the author's job role and the titles of private conversations, a table heading referred to ‘the user’, and one note described how the research had been split up. They now name the public companion project, the generator refuses to write such notes, and C157 scans the page and its data";
const _ctx68=ctxV15;ctxV15=function(){const c=_ctx68();c.priv=privScan();return c};

BUILD_TESTS["D-122"]="A review found the hub still credited the maker's private projects: a nomination workflow \"adapted from\" one, award notes marked \"(portal advice)\", and lens-page points resting on private portals and private artifact links. They were removed or re-sourced to public pages, and C157 now also fails on private artifact links and portal credits";
