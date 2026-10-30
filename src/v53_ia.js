/* ================= v2.27.0 INFORMATION ARCHITECTURE: CAREERS MENU, MERGES AND TOPIC SIGNPOSTS (D-146) =================
   Review of all 60 pages (29 October 2026): the closest overlaps by shared vocabulary were Joining government with
   Talent (0.23) and Careers with Talent (0.19), yet the three sat in two different menus. Resources held one section
   (a 279-word library) and Connect and share repeated the open data list on the Knowledge layer. So:
   - a Careers menu gathers the pages for getting in and getting on (joining, careers, talent, profession, enterprise);
   - the resource library joins Partners and archives, and the open data feeds join the Knowledge layer;
   - pages on the same topic carry a signpost saying what each one covers, so readers pick the right page.
   Addresses keep working: #resources opens the library in its new place. */
const IA27={moved:[]};
(function(){
  /* 1. merge the resource library into Partners and archives */
  const vr=document.getElementById("v-resources"),vp=document.getElementById("v-partners"),rs=document.getElementById("rs-list");
  if(vr&&vp&&rs){const first=vp.querySelector("section.block");if(first)first.after(rs);else vp.appendChild(rs);
    vr.remove();const i=VIEWS.findIndex(v=>v[0]==="resources");if(i>=0)VIEWS.splice(i,1);IA27.moved.push(["rs-list","resources","partners"]);
    vp.dataset.title="Resources, partners and archives";LABEL_V21.partners="Resources, partners and archives";
    try{TOURS.forEach(t=>t.steps.forEach(s=>{if(s[0]==="resources"){s[0]="partners";s[1]="#rs-list"}}))}catch(e){}
    RELATED_V21.forEach(r=>{for(let k=0;k<2;k++)if(r[k]==="resources")r[k]="partners"})}
  /* 2. the open data feeds join the Knowledge layer, next to Open data and API */
  const cd=document.getElementById("cn-data"),ko=document.getElementById("kn-open");
  if(cd&&ko){ko.after(cd);cd.dataset.label="Open data feeds";IA27.moved.push(["cn-data","connect","knowledge"]);
    const vc=document.getElementById("v-connect");if(vc){const s=document.createElement("section");s.className="block";s.id="cn-moved";s.dataset.icon="link";s.dataset.label="Open data";
      s.innerHTML=`<div class="sechead"><h2>Open data</h2><p>The open data feeds are now listed with the hub's other open data on the <a href="#cn-data">Knowledge layer</a>.</p></div>`;vc.appendChild(s)}}
  /* 3. a Careers menu: getting in and getting on */
  const CAREERS=["joining","careers","talent","profession","enterprise"].filter(id=>VIEWS.some(v=>v[0]===id));
  NAV_ORDER_V21.forEach(g=>{g.items=g.items.filter(i=>!CAREERS.includes(i)&&i!=="resources")});
  const lead=NAV_ORDER_V21.findIndex(g=>g.g==="Lead");if(!NAV_ORDER_V21.some(g=>g.g==="Careers"))NAV_ORDER_V21.splice(lead+1,0,{g:"Careers",items:CAREERS});
  ACCENT_V23.Careers="car";GROUP_ICONS.Careers="ladder";applyNavV21()})();
/* 4. topic signposts: each page in a cluster says what it covers and links its siblings */
const CLUSTERS=[
 {id:"careers",n:"Careers in the public sector",pages:[["joining","getting in: routes, applying, interviews, your circumstances, and what to do if you are treated unfairly"],["careers","once you are in: learning, schemes, courses and positive action"],["talent","leadership programmes, funding, fellowships and doctorates"],["profession","evidence for your own profession or function"],["enterprise","starting and growing a business instead"]]},
 {id:"lead",n:"Evidence and leadership",pages:[["leaders","what leaders, sponsors and allies do, with targets and commitments"],["equity","inequalities across every domain and what works"],["represent","who holds power across the state"],["lives","life stages, intersections and place"],["younglives","children and young people: NEET, BEET and CHEET"],["beyond","employers, charities, funders and unions"]]},
 {id:"identity",n:"Identity and words",pages:[["blackness","what it means to be Black, here and worldwide"],["mixed","Mixed heritage in the UK and the world"],["belonging","heritage, appropriation and respect"],["language","the words to use, and how to collect ethnicity data"]]},
 {id:"africa",n:"Africa",pages:[["knowafrica","many cultures and kinds of knowledge"],["journeys","how African knowledge travelled, region by region"],["peoples","peoples, regions, borders and displacement"],["africa","patterns, symbols and languages"],["genome","DNA and ancestry"],["tech","frontier technology today"]]},
 {id:"past",n:"History and its legacies",pages:[["history","the historical arc and timeline"],["whatwaslost","what was taken, lost and might have been"],["stereotypes","who built the stereotypes, and who answered them"],["myths","myths and facts"],["remember","a space to remember"]]},
 {id:"practice",n:"Applying it at work",pages:[["designing","designing policy, services, content and data"],["lenses","other lenses: AI, data, history and services"],["deeia","the DEEIA lens"],["bench","benchmarks and comparisons"],["dash","dashboards"]]},
 {id:"organise",n:"Running the month",pages:[["theme","the 2026 theme"],["calendar","events to join, with dates to export"],["toolkit","the organiser's checklist"],["posters","posters to customise and print"],["brand","brand, templates and media"],["involve","roles and ways to get involved"],["club","book and film club"]]}];
function iaSignposts(){CLUSTERS.forEach(c=>c.pages.forEach(([id])=>{const v=document.getElementById("v-"+id);if(!v||v.querySelector(".iasign"))return;const f=v.querySelector("section.block");if(!f)return;
  const nav=document.createElement("nav");nav.className="iasign";nav.setAttribute("aria-label",c.n+": pages on this topic");
  nav.innerHTML=`<p class="iah">${icon("layers")} <b>${esc(c.n)}</b>: pages on this topic</p><ul>${c.pages.filter(([p])=>document.getElementById("v-"+p)).map(([p,s])=>p===id?`<li aria-current="page"><b>${esc(LABEL_V21[p]||(VIEWS.find(v=>v[0]===p)||[,p])[1])}</b>: ${esc(s)} <span class="muted">(this page)</span></li>`:`<li><a href="#${p}">${esc(LABEL_V21[p]||(VIEWS.find(v=>v[0]===p)||[,p])[1])}</a>: ${esc(s)}</li>`).join("")}</ul>`;
  const h=f.querySelector(".sechead");if(h)h.after(nav);else f.prepend(nav)}))}
function iaAudit(){const bad=[];const ids=new Set(VIEWS.map(v=>v[0]));
  NAV_GROUPS.forEach(g=>{if(g.items.length>9)bad.push(`menu ${g.g} has ${g.items.length} pages (most 9)`)});
  const placed=NAV_GROUPS.flatMap(g=>g.items);[...ids].filter(i=>i!=="overview").forEach(i=>{const n=placed.filter(x=>x===i).length;if(n!==1)bad.push(`page ${i} is in ${n} menus`)});
  const seen={};CLUSTERS.forEach(c=>c.pages.forEach(([p,s])=>{if(!ids.has(p))bad.push(`signpost ${c.id} names missing page ${p}`);if(seen[p])bad.push(`page ${p} is in two signposts (${seen[p]}, ${c.id})`);seen[p]=c.id;if(!s||s.length<10)bad.push(`signpost ${c.id}: ${p} has no scope`)}));
  CLUSTERS.forEach(c=>c.pages.forEach(([p])=>{const v=document.getElementById("v-"+p);if(v&&!v.querySelector(".iasign"))bad.push(`page ${p} has no signpost`)}));
  const car=NAV_GROUPS.find(g=>g.g==="Careers");["joining","careers","talent"].forEach(p=>{if(!car||!car.items.includes(p))bad.push(`${p} is not in the Careers menu`)});
  IA27.moved.forEach(([sec,from,to])=>{const s=document.getElementById(sec);if(!s||!s.closest("#v-"+to))bad.push(`${sec} did not move to ${to}`)});
  if(document.getElementById("v-resources"))bad.push("the Resources page still exists beside its merged library");
  const a=document.getElementById("resources");if(!a||!a.closest("#v-partners"))bad.push("#resources no longer leads to the library");
  if(!iaToggleClear())bad.push("the Contents toggle covers the menus");
  return bad}
CHECKS.push({id:"C172",n:"Every page sits in exactly one menu of at most nine, careers pages share a menu, merged sections live in one place with their old addresses working, and every topic signpost names real pages with their scope and the Contents toggle never covers the menus (D-146, D-147)",
  run:c=>({ok:!c.ia27.length,d:c.ia27.length?c.ia27.slice(0,4).join("; "):`${NAV_GROUPS.length} menus, ${CLUSTERS.length} topic signposts across ${CLUSTERS.reduce((s,c)=>s+c.pages.length,0)} pages, ${IA27.moved.length} sections merged`}),
  breakIt:c=>{c.ia27=["page joining is in 2 menus"];return c}});
BUILD_TESTS["D-146"]="An information architecture review found the closest overlapping pages (Joining government, Careers and development, Talent) split across two menus, a Resources page holding a single short section, and the open data feeds listed twice. Careers now has its own menu, the library and feeds were merged into Partners and the Knowledge layer with their addresses kept, topic signposts say what each related page covers, and C172 fails if a page is in no menu or two, a menu exceeds nine, or a signpost or merged address breaks";
BUILD_TESTS["D-147"]="Between about 860px and 1180px wide the menus wrap onto a second row, and the fixed Contents toggle, pinned no lower than 74px from the top, sat over the first menus. The pin now uses the masthead's measured height, on load, scroll and resize, and C172 fails if it overlaps the menus";
const _ctx98=ctxV15;ctxV15=function(){const c=_ctx98();c.ia27=iaAudit();return c};
/* D-147: when the menus wrap onto a second row (about 860px to 1180px wide), the fixed Contents toggle sat over them. The drawer pin (D-054) now caps the toggle just below the masthead, whatever its height, instead of at a fixed 74px */
function iaMastBottom(){const g=document.getElementById("gnav");if(!g)return 66;const m=g.closest("header")||g.parentElement;return Math.round(Math.max(m.getBoundingClientRect().bottom,g.getBoundingClientRect().bottom))}
function iaPlaceToggle(){if(typeof window.__dtabPin==="function")window.__dtabPin()}
function iaToggleClear(){const t=document.querySelector(".dtoggle.dtab"),g=document.getElementById("gnav");if(!t||!g||innerWidth<=860)return true;const a=t.getBoundingClientRect(),b=g.getBoundingClientRect();return a.top>=b.bottom-1||a.bottom<=b.top}
let v53Boot=function(){iaSignposts();iaPlaceToggle();addEventListener("resize",()=>{clearTimeout(iaPlaceToggle._t);iaPlaceToggle._t=setTimeout(iaPlaceToggle,120)});(document.fonts?document.fonts.ready:Promise.resolve()).then(iaPlaceToggle);
  try{const g=document.getElementById("gnav");if(g&&"ResizeObserver" in window)new ResizeObserver(()=>iaPlaceToggle()).observe(g.closest("header")||g)}catch(e){}setTimeout(iaPlaceToggle,1500)};
/* The review itself, shown on Review and assessment: what was found, the evidence, and what was done or proposed */
const IA_FINDINGS=[
 ["Joining government, Careers and development and Talent overlap most, but sat in two menus","Shared vocabulary between page texts: Joining and Talent 0.23, Careers and Talent 0.19 (the two closest pairs after History and Africa's journeys)","A Careers menu holds them together, with Your profession, unfair treatment and enterprise; each says what it covers","Done (C172)"],
 ["The Resources page held one short section","279 words: a library with a type filter","The library joined Partners and archives, renamed Resources, partners and archives; #resources still opens it","Done (C172)"],
 ["Open data was listed twice","Connect and share and the Knowledge layer both listed the feeds","The feeds moved next to Open data and API on the Knowledge layer; Connect and share points there","Done (C172)"],
 ["Related pages did not say how they differ","Six topic groups, from Africa (six pages) to History and its legacies (five)","Each page in a group carries a signpost naming its siblings and what each covers","Done (C172)"],
 ["The Contents toggle covered the menus at some widths","Between about 860px and 1180px the menus wrap, and the toggle was pinned 74px from the top","The toggle now sits below the masthead at any height","Done (C172, D-147)"],
 ["For leaders was thin","543 words and a 2025 figure","Targets, commitments, allyship and a prioritised action list added to it rather than a new page","Done (C175)"],
 ["History and Africa's knowledge and its journeys share much vocabulary (0.29)","They differ in scope: a global timeline against region-by-region knowledge","Kept apart, linked by the Africa and History signposts; review again if both grow","Proposed"],
 ["Organiser toolkit, Posters and Brand and media are three pages for one task","All serve people running an event","Kept apart for now because each has its own tools; consider one Running the month page with tabs","Proposed"],
 ["Culture, sport and enterprise holds 20 sections and about 33,600 words","The longest page; enterprise also has its own page","Consider splitting honours and awards into Recognition, and renaming the page Culture and sport","Proposed"]];
function iaReviewRender(){const v=document.getElementById("v-review");if(!v||document.getElementById("rv-iareview"))return;const s=document.createElement("section");s.className="block";s.id="rv-iareview";s.dataset.icon="layers";s.dataset.label="Information architecture review";
  s.innerHTML=`<div class="sechead"><span class="eyebrow">29 to 30 October 2026</span><h2>Information architecture review</h2><p>A review of all pages, menus and sections for overlap and duplication, measured by shared vocabulary and section structure. What was done in 2.27.0, and what is proposed next.</p></div><div class="tablewrap"><table><caption class="vh">Information architecture findings</caption><thead><tr><th scope="col">Finding</th><th scope="col">Evidence</th><th scope="col">Action</th><th scope="col">Status</th></tr></thead><tbody>${IA_FINDINGS.map(r=>`<tr>${r.map((c,i)=>i===0?`<th scope="row">${esc(c)}</th>`:`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  const anchor=document.getElementById("rv-coverage");if(anchor)anchor.after(s);else v.appendChild(s)}
const _v53b=v53Boot;v53Boot=function(){iaReviewRender();_v53b()};
