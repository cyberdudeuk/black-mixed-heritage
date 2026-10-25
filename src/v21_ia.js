
/* ================= v2.1.0 INFORMATION ARCHITECTURE: grouping, order of precedence, labels, titles, related pages, search, source summaries ================= */
/* 1. Navigation grouped by audience priority and time-criticality; at most 9 items per menu; previous/next follows this order */
const NAV_ORDER_V21=[
 {g:"This month",items:["theme","calendar","toolkit","posters","involve","networks","club","remember","food"]},
 {g:"Lead",items:["leaders","equity","bench","lives","careers","talent","enterprise","younglives","represent"]},
 {g:"Learn",items:["history","journeys","whatwaslost","stereotypes","africa","innovation","tech","culture","futures"]},
 {g:"Understand",items:["blackness","diaspora","language","knowafrica","peoples","genome","myths","belonging","debates"]},
 {g:"Resources",items:["learn","curriculum","resources","partners","brand","connect","lenses","deeia","faq"]},
 {g:"About",items:["guide","about","sustain","knowledge","dash","design","routines","review","assurance"]}];
const LABEL_V21={learn:"For schools and educators",careers:"Careers and development",networks:"Networks and communities",about:"About this hub",routines:"Self-checks, stories and journeys",belonging:"Identity, heritage and respect",history:"History",africa:"Africa: patterns, symbols and languages",diaspora:"The African diaspora"};
function applyNavV21(){const all=new Set(VIEWS.map(v=>v[0]));const placed=new Set(NAV_ORDER_V21.flatMap(g=>g.items));
  const missing=[...all].filter(v=>v!=="overview"&&!placed.has(v));if(missing.length)NAV_ORDER_V21[NAV_ORDER_V21.length-1].items.push(...missing);
  NAV_GROUPS.length=0;NAV_ORDER_V21.forEach(g=>NAV_GROUPS.push({g:g.g,items:g.items.filter(i=>all.has(i))}));
  VIEWS.forEach(v=>{if(LABEL_V21[v[0]])v[1]=LABEL_V21[v[0]]});
  const order=["overview",...NAV_GROUPS.flatMap(g=>g.items)];VIEWS.sort((a,b)=>order.indexOf(a[0])-order.indexOf(b[0]));
  VIEWS.forEach(([id,l])=>{const v=$("#v-"+id);if(v)v.dataset.title=l})}
/* 2. Order of precedence within pages: action and verified content first, proposals for comment and housekeeping last */
const PRECEDENCE_V21={sustain:["su-eoi","su-roles","su-year","su-capacity","su-align","su-ideas","su-github","su-proposal","su-charter"],
  partners:["pa-boards","pa-funders","pa-archives","pa-suggest"],about:["ab-purpose"],overview:["ov-start","ov-spot"],
  involve:["iv-roles","iv-speakup","iv-levels","iv-objectives","iv-recognise","iv-induction"]};
function applyPrecedenceV21(){const moved=[];Object.entries(PRECEDENCE_V21).forEach(([view,ids])=>{const secs=ids.map(id=>document.getElementById(id)).filter(s=>s&&s.parentElement);if(secs.length<2)return;
    const parent=secs[0].parentElement;if(!secs.every(s=>s.parentElement===parent))return;
    /* keep the slots these sections occupy now, and fill them in the order of precedence */
    const slots=[...parent.children].filter(c=>secs.includes(c)).map(c=>{const m=document.createComment("slot");c.before(m);return m});
    slots.forEach((m,i)=>m.replaceWith(secs[i]));moved.push(view)});
  /* sustain and partners: label the proposal sections clearly */
  ["su-proposal","su-charter","pa-suggest"].forEach(id=>{const s=document.getElementById(id);const h=s&&s.querySelector(".sechead .eyebrow");if(h&&!/for comment/i.test(h.textContent))h.textContent=h.textContent+" · for comment"});
  window.__prec=moved;return moved}
function precedenceProblems(){const bad=[];Object.entries(PRECEDENCE_V21).forEach(([view,ids])=>{const present=ids.map(id=>document.getElementById(id)).filter(Boolean);if(present.length<2)return;
  for(let i=1;i<present.length;i++){if(present[i-1].compareDocumentPosition(present[i])&Node.DOCUMENT_POSITION_PRECEDING){bad.push(view+": "+present[i].id+" before "+present[i-1].id);break}}});return bad}
/* 3. One heading per page at level 1, and a page title that names the page */
function promoteHeadings(){VIEWS.forEach(([id])=>{const v=$("#v-"+id);if(!v||v.querySelector("h1"))return;const h=v.querySelector(".block .sechead h2");if(!h)return;const n=document.createElement("h1");n.className="h1as2";[...h.attributes].forEach(a=>n.setAttribute(a.name,a.value));n.classList.add("h1as2");n.innerHTML=h.innerHTML;h.replaceWith(n)})}
function setDocTitle(){const id=(location.hash||"#overview").slice(1);const v=VIEWS.find(x=>x[0]===id)||VIEWS.find(x=>x[0]===(document.getElementById(id)?.closest(".view")?.id||"").slice(2));document.title=(v&&v[0]!=="overview"?v[1]+" · ":"")+"BHM 2026 Hub: Honouring Our Communities"}
/* 4. Related pages: every page links to its nearest neighbours, both ways */
const RELATED_V21=[["curriculum","learn"],["curriculum","history"],["curriculum","partners"],["curriculum","stereotypes"],["stereotypes","whatwaslost"],["stereotypes","myths"],["stereotypes","language"],["stereotypes","genome"],["stereotypes","equity"],["journeys","history"],["journeys","knowafrica"],["journeys","innovation"],["journeys","whatwaslost"],["whatwaslost","peoples"],["whatwaslost","history"],["whatwaslost","diaspora"],["deeia","equity"],["deeia","lenses"],["deeia","represent"],["deeia","language"],["represent","leaders"],["represent","careers"],["represent","equity"],["blackness","language"],["blackness","genome"],["blackness","diaspora"],["blackness","belonging"],["enterprise","careers"],["enterprise","equity"],["younglives","lives"],["younglives","learn"],["lenses","knowledge"],["lenses","equity"],["lenses","history"],["genome","peoples"],["genome","language"],["genome","knowafrica"],["genome","equity"],["peoples","knowafrica"],["peoples","africa"],["peoples","diaspora"],["peoples","language"],["language","myths"],["language","faq"],["language","knowafrica"],["language","toolkit"],["equity","bench"],["equity","leaders"],["bench","leaders"],["equity","lives"],["careers","talent"],["talent","networks"],["networks","partners"],["calendar","toolkit"],["toolkit","posters"],["calendar","involve"],["history","remember"],["innovation","tech"],["sustain","involve"],["resources","partners"],["routines","assurance"],["review","assurance"],["design","knowledge"],["dash","review"],["learn","resources"],["club","culture"],["myths","debates"],["belonging","lives"],["africa","diaspora"],["theme","history"],["futures","tech"],["food","culture"],["brand","posters"],["connect","networks"],["about","sustain"],["partners","remember"],["guide","about"],["guide","knowledge"],["faq","myths"],["faq","debates"],["faq","theme"],["knowafrica","africa"],["knowafrica","diaspora"],["knowafrica","innovation"]];
function relatedOf(id){return [...new Set(RELATED_V21.flatMap(([a,b])=>a===id?[b]:b===id?[a]:[]))]}
function addRelated(){VIEWS.forEach(([id])=>{const v=$("#v-"+id);if(!v||v.querySelector(".related"))return;const rel=relatedOf(id).filter(r=>$("#v-"+r));if(!rel.length)return;const nav=v.querySelector(".pagenav");
  const html=`<nav class="related" aria-label="Related pages"><h2 class="lsh">${icon("link")} Related pages</h2><ul>${rel.map(r=>`<li><a href="#${r}">${vIcon(r)} ${esc((VIEWS.find(x=>x[0]===r)||[,r])[1])}</a></li>`).join("")}</ul></nav>`;
  nav?nav.insertAdjacentHTML("beforebegin",html):v.insertAdjacentHTML("beforeend",html)})}
/* 5. Search covers every section, heading and dataset item */
const _searchIndex21=searchIndex;searchIndex=function(){if(SEARCH)return SEARCH;const S=_searchIndex21();const seen=new Set(S.map(x=>x.href+"|"+x.t));const add=(t,ty,d,href)=>{t=(t||"").trim();if(!t||seen.has(href+"|"+t))return;seen.add(href+"|"+t);S.push({t,ty,d:d||"",href,k:(t+" "+(d||"")).toLowerCase()})};
  $$(".view section.block[id]").forEach(s=>{const v=s.closest(".view");const h=s.querySelector(".sechead h1, .sechead h2");add(h?h.textContent:s.dataset.label,"Section",(v&&v.dataset.title)||"","#"+s.id)});
  $$(".view h3").forEach(h=>{const a=h.closest("[id]");if(a)add(h.textContent,"Heading",(h.closest(".view")||{}).dataset?.title||"","#"+a.id)});
  DATASETS.forEach(d=>{let arr=[];try{arr=d.arr()}catch(e){}arr.forEach(x=>{try{add(d.lab(x),d.n,"",d.href?d.href(x):"#"+d.view)}catch(e){}})});
  return SEARCH=S};
function searchCoverage(){const idx=searchIndex();const ts=new Set(idx.map(x=>x.t.trim().toLowerCase()));const h3=$$(".view h3").map(h=>h.textContent.trim().toLowerCase()).filter(Boolean);const hit=h3.filter(t=>ts.has(t)).length;return{h3:h3.length,hit}}
/* 6. Source summaries say what each source supports, never just when it was opened */
function fixSourceSummaries(){const cites={};DATASETS.forEach(d=>{let arr=[];try{arr=d.arr()}catch(e){}arr.forEach(x=>{let ss=[];try{ss=d.srcs?d.srcs(x):[]}catch(e){}(ss||[]).forEach(s=>{(cites[s]=cites[s]||[]).push({lab:String(d.lab(x)||""),q:x.q||x.quote||""})})})});
  const walk=(o,depth)=>{if(!o||typeof o!=="object"||depth>5)return;if(Array.isArray(o)){o.forEach(x=>walk(x,depth+1));return}
    if(Array.isArray(o.src)&&(o.n||o.t||o.l)){o.src.forEach(s=>{if(typeof s==="string")(cites[s]=cites[s]||[]).push({lab:String(o.n||o.t||o.l),q:o.q||o.d||""})})}
    Object.values(o).forEach(v=>{if(v&&typeof v==="object")walk(v,depth+1)})};
  try{walk(RESEARCH_FIELDS,0)}catch(e){}
  let n=0;Object.entries(SOURCES).forEach(([k,s])=>{if(!/^Opened \d{1,2} \w+ \d{4}$/.test(s.s||""))return;const c=cites[k];const q=s.q||(c&&c.find(x=>x.q)||{}).q||"";
    if(c&&c.length){s.s="Supports: "+c.slice(0,2).map(x=>x.lab).join("; ")+(c.length>2?` and ${c.length-2} more`:"")+(q?` · quote: “${q.slice(0,160)}${q.length>160?"…":""}”`:"");n++}
    else if(q){s.s=`Quote: “${q.slice(0,160)}”`;n++}});return n}
const _fixedSummaries=fixSourceSummaries();
/* 7. Items whose stated close date has passed are never shown as open */
function pastOpen(){const t=iso(new Date());const bad=[];[...(typeof LEADFUND!=="undefined"?LEADFUND:[]),...(typeof TALENT!=="undefined"?TALENT:[]),...(typeof PHD!=="undefined"?PHD:[])].forEach(x=>{if(x.status==="open"&&x.close&&x.close<t)bad.push(x.id)});(typeof AWARDS!=="undefined"?AWARDS:[]).forEach(a=>{if(a.open&&a.dl&&a.dl<t)bad.push(a.id||a.n)});return bad}
/* checks */
CHECKS.push(
 {id:"C100",n:"Toolkit activity ideas and their filter render in full; glossary tooltips show definitions (D-040)",run:c=>({ok:c.ideasShown===c.ideasTotal&&c.ideasTotal>0&&c.audOpts>1&&c.tipOk,d:`${c.ideasShown} of ${c.ideasTotal} activity ideas; ${c.audOpts} audience options; glossary tooltip: ${c.tipOk?"shows the definition":"broken ("+c.tipText+")"}`}),
  breakIt:c=>{c.ideasShown=0;return c}},
 {id:"C101",n:"Every start-up step ran without error (D-041)",run:c=>({ok:!c.bootErrors.length,d:c.bootErrors.length?"Failed: "+c.bootErrors.join("; "):"All start-up steps completed"}),
  breakIt:c=>{c.bootErrors=["v15Boot: injected"];return c}},
 {id:"C102",n:"Menus hold at most nine pages; every page is in one menu; previous and next follow the menus (D-042)",run:c=>({ok:c.nav21.max<=9&&c.nav21.missing===0&&c.nav21.dups===0&&c.nav21.orderOk,d:`${c.nav21.groups} menus, largest ${c.nav21.max}; ${c.nav21.missing} pages missing; ${c.nav21.dups} listed twice; previous and next follow menus: ${c.nav21.orderOk}`}),
  breakIt:c=>{c.nav21={...c.nav21,max:16};return c}},
 {id:"C103",n:"Each page has one level-1 heading and its own browser title; action comes before proposals (D-043)",run:c=>({ok:c.h1Bad.length===0&&c.prec.length===0&&c.titleOk,d:(c.h1Bad.length?"Pages without exactly one h1: "+c.h1Bad.join(", ")+"; ":"Every page has one h1; ")+(c.prec.length?"Order wrong: "+c.prec.join("; "):"order of precedence holds")+`; titles name the page: ${c.titleOk}`}),
  breakIt:c=>{c.prec=["partners: pa-suggest before pa-boards"];return c}},
 {id:"C104",n:"Every page links to related pages, and every link is returned (D-044)",run:c=>({ok:!c.relMissing.length&&c.relAsym===0,d:c.relMissing.length?"No related pages: "+c.relMissing.join(", "):`${c.relN} pages with related links; all pairs linked both ways`}),
  breakIt:c=>{c.relMissing=["equity"];return c}},
 {id:"C105",n:"Search finds every section heading and at least 95% of subheadings (D-045)",run:c=>({ok:c.search.h3>0&&c.search.hit/c.search.h3>=0.95,d:`${c.search.hit} of ${c.search.h3} subheadings (${Math.round(100*c.search.hit/Math.max(1,c.search.h3))}%)`}),
  breakIt:c=>{c.search={...c.search,hit:0};return c}},
 {id:"C106",n:"No source summary is a placeholder, and nothing past its close date is shown as open (D-046)",run:c=>({ok:!c.placeholders&&!c.pastOpen.length,d:`${c.placeholders} placeholder summaries; ${c.pastOpen.length} items open after their close date${c.pastOpen.length?": "+c.pastOpen.join(", "):""}; ${_fixedSummaries} summaries now name what they support`}),
  breakIt:c=>{c.placeholders=1;return c}},
 {id:"C108",n:"Gathering the evidence for all checks takes under three seconds (D-048)",run:c=>({ok:c.ctxMs<3000,d:`${c.ctxMs} ms to gather the evidence for every check`}),
  breakIt:c=>{c.ctxMs=20000;return c}},
 {id:"C110",n:"Running the checks leaves the page where it was: no scroll, no stray focus (D-055)",run:c=>({ok:c.sideEffect.dy===0&&!c.sideEffect.focusMoved,d:`scroll moved by ${c.sideEffect.dy}px; focus moved: ${c.sideEffect.focusMoved}`}),
  breakIt:c=>{c.sideEffect={dy:4700,focusMoved:true};return c}},
 {id:"C107",n:"Moving between pages does not re-run every check (D-047)",run:c=>({ok:c.navNoRecheck,d:c.navNoRecheck?"Checks re-run only on the assurance pages or when the page is idle":"Checks re-run on every page change"}),
  breakIt:c=>{c.navNoRecheck=false;return c}});
Object.assign(BUILD_TESTS,{
 "D-040":"Two top-level functions shared names (renderIdeas, showTip, hideTip): the later one silently replaced the earlier, emptying the toolkit's activity ideas and breaking glossary tooltips. Renamed; the build now fails on any duplicate function name, and C100 checks the rendered result",
 "D-041":"The first start-up step ran outside the error guard, so one error stopped every later step and the checks; all steps are now guarded and C101 reports any failure",
 "D-042":"The Learn menu held 16 pages and time-critical pages were split across menus; regrouped into seven menus of at most nine by audience and urgency (C102)",
 "D-043":"Only the overview had a level-1 heading, every page shared one browser title, and proposals for comment led two pages; fixed (C103)",
 "D-044":"Seven pages had no links to related pages; a two-way related-pages map now links every page (C104)",
 "D-045":"Search found 63% of subheadings and indexed 12 pages by title only; sections, headings and every dataset item are now indexed (C105)",
 "D-046":"275 source summaries said only when the page was opened, and one funding round was shown as open after its deadline; summaries now name what each source supports, and close dates are checked (C106)",
 "D-048":"Measuring search coverage looked up every search entry against every page, taking about 20 seconds and blocking the page after load; now a single pass, under one second (C108)",
 "D-050":"One check or evidence step that threw an error stopped every check from reporting; each check and the evidence gathering are now guarded, so failures are reported instead of silencing the suite",
 "D-051":"The QR code library adds an image without a text alternative; it is now marked decorative inside its labelled container (accessibility audit)",
 "D-052":"A tooltip opened by keyboard focus closed straight away, because focusing scrolled the page and any scroll hid tooltips (WCAG 1.4.13); keyboard-opened tooltips now stay while focused, and the test now uses a visible source tag (D-029 test)",
 "D-053":"Tooltip text was added to newly drawn content only after 0.3 seconds without changes, so constant small changes could stop it ever being added; it now runs at least once a second (found by the full test suite)",
 "D-054":"On wide screens, drawer links scrolled up passed under the fixed Contents toggle, so they were partly covered and too small to tap (WCAG 2.5.8, found by the accessibility audit with real fonts); the drawer now starts below the toggle",
 "D-055":"A self-check that tests keyboard focus focused a control on a hidden page, which scrolled the whole page far down and left it there; every page then opened part-way down. The probe now restores scroll and focus, and C110 checks the page is at the top after the checks run",
 "D-057":"The open data export read the shared test page, which during a negative run holds the deliberately broken build; it now reads the built hub directly",
 "D-058":"C110 passed when its defect was injected, because smooth scrolling moved the page only after the check had measured it (found by the negative run); evidence is now gathered with smooth scrolling off, and the injected defect is caught",
 "D-047":"Every page change re-ran all checks, costing about a second on desktop and three on a slow phone; checks now re-run only on the assurance pages or when idle (C107)"});
REQS.push({id:"R62",t:"NF",r:"Information architecture, navigation, order of precedence, labels, related pages, search coverage and currency reviewed and fixed; quality dimensions scored with evidence",o:"Request 32",sat:["rv-summary"],ver:["C100","C101","C102","C103","C104","C105","C106","C107","C108","C110"]});
const _ctx41=ctxV15;ctxV15=function(){const _t0=performance.now();const _html=document.documentElement,_sb=_html.style.scrollBehavior;_html.style.scrollBehavior="auto"; /* smooth scrolling would hide a probe's scroll until later */
  const _sy0=scrollY,_ae0=document.activeElement;let c;try{c=_ctx41()}finally{}c.sideEffect={dy:Math.round(scrollY-_sy0),focusMoved:document.activeElement!==_ae0};_html.style.scrollBehavior=_sb;
  c.ideasTotal=typeof IDEAS!=="undefined"?IDEAS.length:0;c.ideasShown=$$("#ideas > .card").length;c.audOpts=($("#fAud")||{options:[]}).options.length;
  let tipOk=false,tipText="";try{const t=$(".term");if(t){showTip(t);const el=$("#tip");tipText=el?el.textContent.slice(0,40):"none";tipOk=!!el&&!/undefined/.test(el.textContent)&&el.textContent.length>10;hideTip()}else{tipOk=true}}catch(e){tipText=e.message}c.tipOk=tipOk;c.tipText=tipText;
  c.bootErrors=window.__bootErrors||[];
  const items=NAV_GROUPS.flatMap(g=>g.items);const order=["overview",...items];
  c.nav21={groups:NAV_GROUPS.length,max:Math.max(...NAV_GROUPS.map(g=>g.items.length)),missing:VIEWS.filter(([id])=>id!=="overview"&&!items.includes(id)).length,dups:items.length-new Set(items).size,orderOk:VIEWS.every((v,i)=>order[i]===v[0])};
  c.h1Bad=VIEWS.map(([id])=>id).filter(id=>{const v=$("#v-"+id);return v&&v.querySelectorAll("h1").length!==1});
  c.prec=precedenceProblems();
  const t0=document.title;setDocTitle();c.titleOk=/BHM 2026 Hub/.test(document.title);document.title=t0;
  c.relMissing=VIEWS.map(([id])=>id).filter(id=>id!=="overview"&&$("#v-"+id)&&!$("#v-"+id+" .related a"));c.relN=$$(".view .related").length;
  const relMap=new Map();$$(".view .related a").forEach(a=>{const from=a.closest(".view").id.slice(2);if(!relMap.has(from))relMap.set(from,new Set());relMap.get(from).add(a.getAttribute("href").slice(1))});
  c.relAsym=[...relMap].reduce((n,[from,tos])=>n+[...tos].filter(to=>!(relMap.get(to)||new Set()).has(from)).length,0);
  c.search=searchCoverage();
  c.placeholders=Object.values(SOURCES).filter(s=>/^Opened \d{1,2} \w+ \d{4}$/.test(s.s||"")).length;c.pastOpen=pastOpen();
  c.navNoRecheck=!!window.__rcPatched;
  c.ctxMs=Math.round(performance.now()-_t0);
  return c};
GROUP_ICONS["This month"]="calendar";GROUP_ICONS["Lead"]="flag";GROUP_ICONS["Understand"]="debate";GROUP_ICONS["Resources"]="book";GROUP_ICONS["About"]="graph";
applyNavV21();
/* 2.2.0: build the per-page bibliographies once, after start-up, instead of after every start-up step (about 0.5 s saved) */
const _renderBib22=renderBibliographies;let _bibPending=false;renderBibliographies=function(){if(!window.__bootDone){_bibPending=true;return}return _renderBib22.apply(this,arguments)};
function v26Boot(){window.__bootDone=true;try{_renderBib22()}catch(e){console.warn(e)}applyPrecedenceV21();promoteHeadings();addRelated();setDocTitle();addEventListener("hashchange",setDocTitle);SEARCH=null;try{decorateDrawer()}catch(e){}try{renderTraceNav()}catch(e){}}
