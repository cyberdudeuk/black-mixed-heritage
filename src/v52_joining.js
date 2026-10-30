/* ================= v2.26.0 JOINING GOVERNMENT, DEPARTMENT NAMES (D-144) ================= */
/* C170: GDS is part of the Department for Digital, Culture, Media and Sport since the July 2026 machinery of government change.
   The closed department's name and abbreviation must not appear anywhere in the hub's text, sources or open data.
   The pattern is built from parts so this file does not match itself. */
const OLD_DEPT_RE=new RegExp("\\b"+["D","S","I","T"].join("")+"\\b|"+["Science","Innovation and Technology"].join(", "));
function oldDeptAudit(){const hits=[];
  try{Object.entries(SOURCES).forEach(([k,s])=>{const t=[s.t,s.p,s.u,s.n].filter(Boolean).join(" ");if(OLD_DEPT_RE.test(t))hits.push("source "+k)})}catch(e){}
  try{openPoints().forEach(p=>{const t=[p.heading,p.text,p.figure,p.note,p.sources.map(s=>s.title+" "+s.url).join(" ")].join(" ");if(OLD_DEPT_RE.test(t))hits.push("point "+p.key)})}catch(e){}
  try{for(const el of document.querySelectorAll(".view, header, footer, nav")){const m=el.textContent.match(OLD_DEPT_RE);if(m){hits.push("page text: …"+m[0]+"…");break}}}catch(e){}
  return hits}
CHECKS.push({id:"C170",n:"No text, source or open-data point names the department GDS left in July 2026; GDS is shown as part of the Department for Digital, Culture, Media and Sport (D-144)",
  run:c=>({ok:!c.olddept.length,d:c.olddept.length?c.olddept.length+" mention(s): "+c.olddept.slice(0,5).join("; "):"None found in sources, open data or page text"}),
  breakIt:c=>{c.olddept=["source S-test"];return c}});
BUILD_TESTS["D-144"]="After GDS moved into the Department for Digital, Culture, Media and Sport in July 2026, the hub still named its former department in a source title, a data point and an inquiry quotation. These now name the UK government or GDS, and C170 fails if the former department's name or abbreviation appears in any source, point or page text";
const _ctx96=ctxV15;ctxV15=function(){const c=_ctx96();c.olddept=oldDeptAudit();return c};

/* Register the Joining government page in the views, the Resources menu and related links */
const NEW26=[["joining","Joining government"]].filter(([id])=>typeof LP!=="undefined"&&LP[id]&&document.getElementById("v-"+id));VIEWS.push(...NEW26);
(function(){if(!NEW26.length)return;const g=NAV_ORDER_V21.find(x=>x.g==="Resources");if(g&&!g.items.includes("joining"))g.items.unshift("joining");applyNavV21()})();
VIEW_ICONS.joining="compass";LABEL_V21.joining="Joining government";
NEW26.forEach(([id])=>{PK_CONTENT.push(id);RP_NEW.push(id)});
RELATED_V21.push(["joining","careers"],["joining","talent"],["joining","networks"],["joining","younglives"],["careers","joining"]);
/* ---------- Joining government (R95 to R102): circumstances finder, preparation checklist, what people ask ---------- */
function jnFind(sec,re){const P=(typeof LP!=="undefined")&&LP.joining;if(!P)return[];const s=P.sections.find(x=>x.k===sec);if(!s)return[];const rx=re?new RegExp(re,"i"):null;
  return s.points.filter(p=>!rx||rx.test(p.h)).map(p=>({id:lpPid(P,s,p),h:p.h,sec:s.k,sh:s.h}))}
function jnResolve(t){return t.flatMap(([sec,re])=>jnFind(sec,re))}
const JN_FINDER=[
 {k:"start",l:"I am not sure where to start",ic:"compass",t:[["jnroutes",null]]},
 {k:"young",l:"I am at school or college, or have no degree",ic:"book",t:[["jnroutes","apprentice"],["cother","early careers|without a degree"]]},
 {k:"grad",l:"I am a student or recent graduate",ic:"book",t:[["jnroutes","Fast Stream|Internship"]]},
 {k:"visa",l:"I am not a British citizen, or I am in the UK on a visa",ic:"briefcase",t:[["cvisa",null],["jnvet","Nationality|right to work|residence"]]},
 {k:"refugee",l:"I came to the UK as a refugee",ic:"home",t:[["cother","Refugee"],["cvisa","nationality rules"]]},
 {k:"family",l:"I have children or caring responsibilities",ic:"hands",t:[["cfamily",null],["jnday","Hybrid"]]},
 {k:"return",l:"I am returning after a career break, or changing career",ic:"ladder",t:[["creturn",null],["jnroutes","secondment|outside government"]]},
 {k:"vet",l:"I have served in the armed forces, or my partner has",ic:"flag",t:[["cvets",null]]},
 {k:"record",l:"I have a criminal record or have been in custody",ic:"key",t:[["csecond",null],["jnroutes","Supported routes"]]},
 {k:"care",l:"I have been in care",ic:"heart",t:[["cother","Care Leavers"],["jnroutes","Supported routes"]]},
 {k:"dis",l:"I am disabled, neurodivergent or have a health condition",ic:"hands",t:[["cother","Disability|Adjustments"]]},
 {k:"faith",l:"My faith affects when or how I work",ic:"star",t:[["cother","Faith"]]},
 {k:"quals",l:"My qualifications are from outside the UK",ic:"book",t:[["cother","overseas|ENIC"]]},
 {k:"place",l:"I live outside London",ic:"map",t:[["cother","outside London|Places for Growth"],["jnday","Hybrid"]]},
 {k:"digital",l:"I want a digital, data or technology role",ic:"cpu",t:[["jnroutes","Digital"],["jninterview","Technical"]]}];
const JN_PREP=[
 {k:"advert",t:"Read the advert and note every essential criterion and the Success Profiles elements it lists",r:[["jnapply","Success Profiles"]]},
 {k:"open",t:"Check the advert is open to external candidates and that you meet the nationality rules",r:[["jnroutes","Civil Service Jobs"],["jnvet","Nationality"]]},
 {k:"star",t:"Write one real example for each behaviour, using situation, task, action and result",r:[["jnapply","STAR"]]},
 {k:"cv",t:"Match your CV or personal statement to the essential criteria",r:[["jnapply","CV"]]},
 {k:"tests",t:"Practise the free official online tests before you take them",r:[["jnapply","tests"]]},
 {k:"ai",t:"Use AI only to prepare, never to write your answers",r:[["jnapply","^Use AI"]]},
 {k:"adjust",t:"Ask for any adjustments you need for the tests or the interview",r:[["cother","Adjustments"]]},
 {k:"format",t:"Find out the interview format: behaviour, strength, technical, presentation or video",r:[["jninterview","Technical|Video|Strength"]]},
 {k:"strength",t:"For strength questions, answer genuinely rather than from a script",r:[["jninterview","Strength"]]},
 {k:"ask",t:"Prepare your own questions for the panel",r:[["jninterview","own questions"]]},
 {k:"feedback",t:"Ask for feedback, whatever the outcome",r:[["jninterview","feedback"]]},
 {k:"reserve",t:"If you are not appointed, ask whether you are on a reserve list",r:[["jninterview","Reserve"]]},
 {k:"checks",t:"Gather documents for right to work and pre-employment checks",r:[["jnvet","BPSS|right to work"]]},
 {k:"resign",t:"Do not resign from your current job until you have a formal offer",r:[["jnvet","resign"]]}];
const JN_PREP_KEY="bhm-jn-prep";
function jnPrepLoad(){try{const v=JSON.parse(localStorage.getItem(JN_PREP_KEY)||"[]");return Array.isArray(v)?v.filter(x=>typeof x==="string").slice(0,50):[]}catch(e){return[]}}
function jnPrepSave(a){try{localStorage.setItem(JN_PREP_KEY,JSON.stringify(a))}catch(e){}}
function jnLinks(r){const f=jnResolve(r);return f.length?f.map(x=>`<a href="#${x.id}">${esc(x.h)}</a>`).join("; "):`<span class="lpbad">no matching point</span>`}
function jnRenderFinder(){const box=$("#jnFinderOpts"),out=$("#jnFinderOut");if(!box||!out)return;
  box.innerHTML=JN_FINDER.map(o=>`<label class="chk jnchk"><input type="checkbox" value="${o.k}"> ${icon(o.ic)} ${esc(o.l)}</label>`).join("");
  const draw=()=>{const on=_qa(box,"input:checked").map(i=>i.value);if(!on.length){out.innerHTML=`<p class="muted">Tick anything that applies. Nothing you tick is stored or sent anywhere.</p>`;return}
    const seen=new Set();const groups=[];on.forEach(k=>{const o=JN_FINDER.find(x=>x.k===k);const pts=jnResolve(o.t).filter(p=>!seen.has(p.id)&&seen.add(p.id));groups.push({o,pts})});
    out.innerHTML=`<p><b>${seen.size}</b> sourced points apply to what you ticked.</p><div class="jngrid">`+groups.map(g=>`<article class="card"><h3>${icon(g.o.ic)} ${esc(g.o.l)}</h3>${g.pts.length?`<ul>${g.pts.map(p=>`<li><a href="#${p.id}">${esc(p.h)}</a> <span class="muted">(${esc(p.sh)})</span></li>`).join("")}</ul>`:`<p class="muted">Covered by the points listed above.</p>`}</article>`).join("")+"</div>"};
  box.addEventListener("change",draw);draw()}
function jnRenderPrep(){const ul=$("#jnPrepList");if(!ul)return;const done=new Set(jnPrepLoad());
  ul.innerHTML=JN_PREP.map(p=>`<li><label class="chk"><input type="checkbox" data-k="${p.k}" ${done.has(p.k)?"checked":""}> <span>${esc(p.t)}</span></label> <span class="muted">See: ${jnLinks(p.r)}</span></li>`).join("");
  const upd=()=>{const d=_qa(ul,"input:checked").map(i=>i.dataset.k);jnPrepSave(d);const o=$("#jnPrepN");if(o)o.textContent=`${d.length} of ${JN_PREP.length} done. Your ticks stay in this browser only.`};
  ul.addEventListener("change",upd);upd();const r=$("#jnPrepReset");if(r)r.addEventListener("click",()=>{_qa(ul,"input").forEach(i=>i.checked=false);upd()})}
function jnRenderAsks(){const el=$("#jnAsksList");if(!el||typeof JN_ASKS==="undefined")return;
  el.innerHTML=JN_ASKS.map(a=>`<article class="card"><h3>${esc(a.theme)}</h3><ul>${a.questions.map(q=>`<li>${esc(q)}</li>`).join("")}</ul><p><b>Where to look:</b> ${jnLinks(a.see)}</p><details class="muted"><summary>Evidence that people ask this (${a.evidence.length} sources)</summary><p>${a.evidence.map(e=>`<a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.title)}<span class="vh"> (opens in a new tab)</span></a>`).join("; ")}</p></details></article>`).join("")}
function jnAudit(){const bad=[];if(typeof LP==="undefined"||!LP.joining)return["the Joining government page has no data"];
  JN_FINDER.forEach(o=>{if(!jnResolve(o.t).length)bad.push("finder option '"+o.l+"' matches no point")});
  JN_PREP.forEach(p=>{if(!jnResolve(p.r).length)bad.push("checklist item '"+p.k+"' matches no point")});
  (typeof JN_ASKS!=="undefined"?JN_ASKS:[]).forEach(a=>{if(!jnResolve(a.see).length)bad.push("question theme '"+a.theme+"' has nowhere to look");if(!a.evidence.length||a.evidence.some(e=>!/^https:\/\//.test(e.url)))bad.push("question theme '"+a.theme+"' lacks https evidence")});
  if(typeof JN_ASKS==="undefined"||JN_ASKS.length<8)bad.push("fewer than 8 question themes");
  ["jnroutes","jnapply","jninterview","jnday","jnvet","cvisa","cfamily","creturn","cvets","csecond","cother"].forEach(k=>{if(!jnFind(k,null).length)bad.push("section "+k+" is empty")});
  return bad}
CHECKS.push({id:"C171",n:"Every Black Tech Fest question (routes, applying and interviews, a typical day, visas, work-life balance and second chances), every finder option, checklist item and question theme leads to sourced points (D-145)",
  run:c=>({ok:!c.join.length,d:c.join.length?c.join.slice(0,4).join("; "):`${JN_FINDER.length} circumstances, ${JN_PREP.length} checklist items and ${typeof JN_ASKS!=="undefined"?JN_ASKS.length:0} question themes, each linked to sourced points`}),
  breakIt:c=>{c.join=["finder option 'test' matches no point"];return c}});
BUILD_TESTS["D-145"]="Visitors to the GDS stand at Black Tech Fest on 29 October 2026 asked how to get into a government role, how to apply and prepare for interview, what a typical day is like, whether visa holders can apply and who sponsors, and how work fits around children, career breaks, service in the forces or time in custody. The hub had careers schemes but no page answering these. The Joining government page now does, and C171 fails if any question, circumstance or checklist item stops leading to a sourced point";
const _ctx97=ctxV15;ctxV15=function(){const c=_ctx97();c.join=jnAudit();return c};
REQS.push(
 {id:"R95",t:"F",r:"How to get into a government role: every main route in, with entry requirements, pay and closing dates",o:"Request 75 (Black Tech Fest stand, question a)",sat:["jn-jnroutes","jn-finder"],ver:["C171"]},
 {id:"R96",t:"F",r:"How to apply and prepare for interview: Success Profiles, the sift, tests, interview formats, feedback, and a preparation checklist",o:"Request 75 (question b)",sat:["jn-jnapply","jn-jninterview","jn-prep"],ver:["C171"]},
 {id:"R97",t:"F",r:"What a typical day is like for a civil servant: work, hybrid working, pay, pension, leave, learning and networks",o:"Request 75 (question c)",sat:["jn-jnday"],ver:["C171"]},
 {id:"R98",t:"F",r:"Visa holders: nationality rules, reserved posts, sponsorship and which bodies hold a sponsor licence, with regulated advice",o:"Request 75 (question d)",sat:["jn-cvisa","jn-jnvet"],ver:["C171"]},
 {id:"R99",t:"F",r:"Work and life: parents and carers, career returners, veterans and military partners, and second chances after custody",o:"Request 75 (question e)",sat:["jn-cfamily","jn-creturn","jn-cvets","jn-csecond"],ver:["C171"]},
 {id:"R100",t:"F",r:"Other circumstances and adjustments: care leavers, refugees, disability and adjustments, faith, overseas qualifications, living outside London, no degree",o:"Request 75 (other scenarios)",sat:["jn-cother","jn-finder"],ver:["C171"]},
 {id:"R101",t:"F",r:"What people ask at careers events, evidenced from published sources, and the barriers the numbers show",o:"Request 75 (event feedback)",sat:["jn-asks","jn-jnbarriers"],ver:["C171"]},
 {id:"R102",t:"NF",r:"Security vetting, right to work and pre-employment checks explained, with the limits of published guidance",o:"Request 75",sat:["jn-jnvet"],ver:["C171"]});
function v52Boot(){jnRenderFinder();jnRenderPrep();jnRenderAsks()}
