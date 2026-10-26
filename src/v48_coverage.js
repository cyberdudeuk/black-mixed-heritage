/* ================= v2.22.0 PRACTICE MENU AND TWO NEW PAGES (D-137) =================
   Every menu held nine pages, the most the navigation allows. A seventh menu, Practice, gathers the pages people use
   when applying the hub at work (design, words, benchmarks, dashboards and the lenses), which frees room in Understand
   for the Mixed heritage page. Pages keep their addresses; only where they are listed changes. */
const NEW22=[["designing","Designing for Black and Mixed-heritage people"],["mixed","Mixed heritage"]].filter(([id])=>typeof LP!=="undefined"&&LP[id]&&document.getElementById("v-"+id));VIEWS.push(...NEW22);const HAS22=id=>NEW22.some(v=>v[0]===id);
(function(){const move=["designing","language","bench","dash","lenses","deeia"].filter(i=>i!=="designing"||HAS22(i));NAV_ORDER_V21.forEach(g=>{g.items=g.items.filter(i=>!move.includes(i))});
  const lead=NAV_ORDER_V21.findIndex(g=>g.g==="Lead");NAV_ORDER_V21.splice(lead+1,0,{g:"Practice",items:move});
  const u=NAV_ORDER_V21.find(g=>g.g==="Understand");if(HAS22("mixed"))u.items.splice(u.items.indexOf("blackness")+1,0,"mixed");applyNavV21()})();
ACCENT_V23.Practice="prac";GROUP_ICONS.Practice="tool";VIEW_ICONS.designing="tool";VIEW_ICONS.mixed="people";
LABEL_V21.designing="Designing for Black and Mixed-heritage people";LABEL_V21.mixed="Mixed heritage";
NEW22.forEach(([id])=>{PK_CONTENT.push(id);RP_NEW.push(id)});
NEW22.map(v=>v[0]).forEach(id=>DATASETS.push({k:id,n:(LP[id]||{}).name||id,ic:VIEW_ICONS[id]||"globe",arr:()=>LP[id]?lpAllPoints(LP[id]).map(x=>({...x.p,id:x.id})):[],id:x=>x.id,lab:x=>x.h,srcs:x=>x.src||[],view:({global:"diaspora",honour:"theme"})[id]||id,href:x=>"#"+x.id,out:["pages","jsonld"],chk:["C138"]}));
RELATED_V21.push(["designing","language"],["designing","lenses"],["designing","deeia"],["designing","bench"],["mixed","blackness"],["mixed","belonging"],["mixed","language"],["mixed","younglives"]);

/* ================= v2.22.0 COVERAGE MAP (D-136) =================
   How much sourced evidence the hub holds for each field of knowledge, design discipline, government function,
   Civil Service profession, part of the public sector, and the private, voluntary and wider economy and society.
   Counted live from the pages themselves, so it never goes stale. Keyword matching is indicative, not exact: a point
   can count in several rows, and a word can appear in a point about something else. */
const COV_BANDS=[[100,"Strong"],[40,"Good"],[15,"Moderate"],[5,"Thin"],[0,"Gap"]];
const COV_GROUPS=[
 ["design","Design and delivery disciplines",[
  ["Policy design",/\bpolicy (design|making|makers?|lab|profession)|policymak|equality impact assessment|public sector equality duty|\bPSED\b/i],
  ["Service design",/service design|service standard|service manual|user research|user needs|assisted digital|digital (inclusion|exclusion)/i],
  ["Content design",/content design|plain english|style guide|writing about ethnicity|readability|inclusive language/i],
  ["Data design and ethnicity data",/ethnicity data|harmonised (standard|question)|data standard|data collection|disaggregat|declaration rate|self-identif/i],
  ["Algorithms, AI and automated decisions",/\bAI\b|artificial intelligence|algorithm|automated decision|facial recognition|machine learning/i],
  ["Evaluation and evidence",/evaluat|randomi[sz]ed|what works|evidence review|systematic review|Magenta Book/i]]],
 ["fields","Fields of knowledge",[
  ["Education",/\bschools?\b|curriculum|teachers?|pupils?|universit|education|attainment/i],
  ["Science and medicine",/scien|physic|chemist|biolog|medic|clinic|doctors?|nurs(e|ing)/i],
  ["Health and care",/\bhealth|\bsocial care|maternal|mental health|\bNHS\b/i],
  ["Law and justice",/\blaw\b|legal|courts?\b|justice|police|policing|barrister|solicitor|judge/i],
  ["Politics and public life",/parliament|\bMPs?\b|councillor|minister|politic|civil serv/i],
  ["Culture and the arts",/\barts?\b|artists?|museum|galler|theatre|literature|poet|music|carnival|festival/i],
  ["Media and broadcasting",/\bmedia\b|broadcast|\bBBC\b|journalis|newspaper|\bfilms?\b|television|radio/i],
  ["Sport",/\bsports?\b|football|athlet|cricket|boxing|olympi|rugby|tennis/i],
  ["Technology and digital",/technolog|software|digital|computing|\btech\b|cyber/i],
  ["Innovation and invention",/invent|innovat|patent/i],
  ["Engineering",/engineer/i],
  ["Architecture and the built environment",/architect(?!ure (of|decision))|built environment|town planning|urban design|construction industry|housing design/i],
  ["Environment and climate",/climate|environmental|biodiversity|net zero/i],
  ["Food and agriculture",/\bfood|recipe|cuisine|agricultur|farming/i],
  ["Economics and finance",/econom|financ|investment|banking|wealth/i],
  ["History and archaeology",/archaeolog|archive|historian|historical record/i],
  ["Languages and linguistics",/languages?\b|linguist|translation|Swahili|Yoruba|Amharic/i],
  ["Philosophy and religion",/philosoph|theolog|faith|religio/i],
  ["Military and uniformed services",/military|\barmy\b|navy|royal air force|\bRAF\b|soldiers?|veterans?|armed forces/i]]],
 ["sector","Parts of the public sector",[
  ["Central government",/\bdepartment for|\bHM Treasury|Cabinet Office|central government|civil serv|Whitehall/i],
  ["Local government",/local (government|authorit)|councils?\b|borough|county council|mayor/i],
  ["Devolved governments",/Scottish Government|Welsh Government|Northern Ireland Executive|devolved|Senedd|Holyrood|Stormont/i],
  ["NHS and social care",/\bNHS\b|social care|integrated care|GPs?\b|hospital/i],
  ["Schools, colleges and universities",/\bschools?\b|colleges?\b|universit|further education|higher education/i],
  ["Policing, justice and fire",/police|policing|prison|probation|courts?\b|fire and rescue/i],
  ["Armed forces",/armed forces|\bMinistry of Defence\b|\bMOD\b|military|veterans?/i],
  ["Arm's-length bodies and regulators",/arm's[- ]length|regulator|Ofsted|Ofcom|Ofqual|Equality and Human Rights Commission|\bEHRC\b|commission\b/i]]],
 ["beyond","Beyond the public sector: economy and society",[
  ["Private sector and employers",/employers?|private sector|compan(y|ies)|FTSE|corporate|business(es)?\b/i],
  ["Voluntary and community sector",/charit|voluntary|community (group|organisation|sector)|third sector|social enterprise/i],
  ["Faith organisations",/church(es)?|mosques?|faith (group|organisation|communit)/i],
  ["Trade unions and professional bodies",/trade unions?|\bTUC\b|professional bod|royal college|institute of/i],
  ["Funders and philanthropy",/funder|philanthrop|grant(s|-making)|foundation\b|lottery/i],
  ["Labour market and pay",/employment|unemploy|pay gap|earnings|wages?|labour market/i],
  ["Wealth, poverty and housing",/wealth|poverty|household income|housing|homeless/i],
  ["Enterprise and access to finance",/entrepreneur|start-?ups?|founders?|venture capital|access to finance|business loans?/i],
  ["Migration and the diaspora",/migra|diaspora|windrush|refugee|asylum|remittance/i],
  ["Population and demographics",/census|population|demograph|age structure|median age/i],
  ["Mixed heritage",/mixed heritage|mixed-heritage|black-mixed|mixed race|mixed white and black|dual heritage|multiple heritage/i],
  ["Children, young people and families",/\bchildren|young people|youth|famil(y|ies)|parents?\b/i],
  ["Older people",/older people|pension|later life|elderly/i],
  ["Women and gender",/\bwom[ae]n\b|girls?\b|gender|maternal/i],
  ["Disability",/disab|special educational|\bSEND\b|neurodiver/i],
  ["LGBT+ people",/\bLGBT|lesbian|\bgay\b|bisexual|transgender|queer/i],
  ["Place and region",/Scotland|Wales|Northern Ireland|London|Birmingham|Manchester|Bristol|regional/i]]]];
/* Official lists, verified against GOV.UK (see the sources in the section): Government Functions and Civil Service professions */
/* GOV.UK "Government functions" (updated 3 November 2025): 13 functions. Read 26 October 2026. */
const GOV_FUNCTIONS_SRC=SRCQ("GOV.UK: Government functions (Cabinet Office, updated 3 November 2025)","https://www.gov.uk/government/publications/government-functions/government-functions","The 13 cross-government functions, read 26 October 2026","A function is a grouping aligned across government to manage functional work such as human resources, commercial, or finance. Functions are embedded in departments and arm’s length bodies.");
const GOV_FUNCTIONS=[["Analysis",/\banalys(is|t|ts)\b|statistic/i],["Commercial and grants",/commercial|procure|supply chain|grants?\b/i],["Communication",/\bcommunications?\b|campaign/i],["Counter fraud",/fraud/i],["Debt",/\bdebts?\b/i],
 ["Digital, data and technology",/digital|\bdata\b|technolog/i],["Finance",/\bfinanc|budget|spending/i],["Internal audit",/\baudit/i],["Legal",/\blegal|\blaw\b|lawyers?/i],["People (human resources)",/human resources|\bHR\b|recruit|workforce|line managers?/i],
 ["Project delivery",/project delivery|programme delivery|major projects/i],["Property",/\bproperty|built estate|buildings\b/i],["Security",/\bsecurity\b(?! council)|vetting|counter-terror/i]];
/* GOV.UK "Government professions" (updated 30 September 2026): 33 entries. Read 26 October 2026. */
const CS_PROFESSIONS_SRC=SRCQ("GOV.UK: Government professions (updated 30 September 2026)","https://www.gov.uk/government/publications/government-professions/government-professions","The Civil Service professions, read 26 October 2026","Professions work across government on behalf of departments, agencies and functions to develop specialist skills and knowledge in people, set standards and define career pathways.");
const CS_PROFESSIONS=[["Operational delivery",/operational delivery|frontline|front-line|jobcentre|border force|prison officers?/i],["Policy",/\bpolicy|policies/i],["Actuary",/actuar/i],["Commercial",/commercial|procure/i],["Communications",/\bcommunications?\b/i],["Counter Fraud",/fraud/i],["Cyber",/cyber/i],["Debt",/\bdebts?\b/i],
 ["Digital and Data",/digital|\bdata\b/i],["Economics",/econom/i],["Finance",/\bfinanc/i],["Geography",/geograph|spatial/i],["Grants",/grants?\b/i],["Human Resources",/human resources|\bHR\b|recruit/i],["Internal Audit",/\baudit/i],["Legal",/\blegal|\blaw\b|lawyers?/i],
 ["Project Delivery",/project delivery|programme delivery/i],["Property",/\bproperty/i],["Operational Research",/operational research/i],["Risk Management",/risk management|\brisks?\b/i],["Security",/\bsecurity\b(?! council)/i],["Social research",/social research|survey|interviews?\b|qualitative/i],["Statistics",/statistic|\bONS\b|census/i],
 ["Corporate Finance",/corporate finance|investment/i],["Intelligence Analysis",/intelligence/i],["Knowledge and Information Management",/archive|records management|information management|librar/i],["Clinical",/clinic|doctors?|nurs(e|ing)|medical/i],["Occupational Psychology",/psycholog/i],
 ["Planning",/town planning|planning (system|policy|permission)|planners?\b/i],["Planning Inspection",/planning inspect/i],["Science and Engineering",/scien|engineer/i],["Tax",/\btax/i],["Veterinary",/veterinar|animal health/i]];
function covBand(n){return COV_BANDS.find(([min])=>n>=min)[1]}
/* every sourced point on every page, once drawn (pages are drawn when the checks first run) */
function covPoints(){return $$(".view").filter(v=>v.id!=="v-assurance"&&v.id!=="v-review"&&v.id!=="v-design").flatMap(v=>_qa(v,"li,article,.card,tr,p").filter(e=>e.querySelector(":scope > .tag.src, :scope a.tag.src")&&!e.closest(".biblio")).map(e=>({v:v.id.slice(2),t:e.textContent})))}
function covRows(pts){const rx=s=>new RegExp("\\b"+s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/\s+and\s+/gi,"|").replace(/,\s*/g,"|"),"i");
  const groups=COV_GROUPS.map(([k,h,items])=>[k,h,items.map(([n,re])=>{const P=pts.filter(p=>re.test(p.t));return{n,points:P.length,pages:new Set(P.map(p=>p.v)).size}})]);
  if(GOV_FUNCTIONS.length)groups.push(["functions","Government functions",GOV_FUNCTIONS.map(([n,re])=>{const r=re instanceof RegExp?re:rx(n);const P=pts.filter(p=>r.test(p.t));return{n,points:P.length,pages:new Set(P.map(p=>p.v)).size}})]);
  if(CS_PROFESSIONS.length)groups.push(["professions","Civil Service professions",CS_PROFESSIONS.map(([n,re])=>{const r=re instanceof RegExp?re:rx(n);const P=pts.filter(p=>r.test(p.t));return{n,points:P.length,pages:new Set(P.map(p=>p.v)).size}})]);
  return groups}
let COV_CACHE=null;
function renderCoverage(){const host=$("#covBody"),sum=$("#covSum");if(!host)return;
  const pts=covPoints();if(pts.length<500){host.innerHTML=`<p class="muted">Counting needs every page drawn. <button type="button" class="btn" id="covGo">Count now</button></p>`;const g=$("#covGo");if(g)g.addEventListener("click",()=>{if(typeof warmAll26==="function")warmAll26();setTimeout(renderCoverage,300)});return}
  const groups=covRows(pts);COV_CACHE={pts:pts.length,groups};const all=groups.flatMap(([,,r])=>r);const by=b=>all.filter(r=>covBand(r.points)===b).length;
  sum.innerHTML=COV_BANDS.map(([,b])=>kpi(String(by(b)),b+" ("+(b==="Gap"?"under 5":b==="Thin"?"5 to 14":b==="Moderate"?"15 to 39":b==="Good"?"40 to 99":"100 or more")+" points)",b==="Gap"||b==="Thin"?"info":"shield")).join("");
  const filt=($("#covFilt")||{}).value||"all";
  host.innerHTML=groups.map(([k,h,rows])=>{const list=rows.filter(r=>filt==="all"||(filt==="thin"&&(covBand(r.points)==="Thin"||covBand(r.points)==="Gap")));if(!list.length)return"";
    return `<h3>${esc(h)}</h3><div class="tablewrap"><table><caption class="vh">${esc(h)}: sourced points and pages</caption><thead><tr><th scope="col">Area</th><th scope="col">Sourced points</th><th scope="col">Pages</th><th scope="col">Coverage</th></tr></thead><tbody>${list.map(r=>`<tr><th scope="row">${esc(r.n)}</th><td>${r.points.toLocaleString("en-GB")}</td><td>${r.pages}</td><td>${covBand(r.points)}</td></tr>`).join("")}</tbody></table></div>`}).join("");
  $("#covNote").textContent=`Counted just now from ${pts.length.toLocaleString("en-GB")} sourced points across the hub's pages. Indicative: matching is by keyword, a point can count in several rows, and some matches are passing mentions.`}
const COV_TESTS=[["Equality impact assessment for a new policy","Policy design",true],["The GOV.UK Service Standard asks teams to","Service design",true],["A Black engineer designed the bridge","Engineering",true],
 ["Mixed White and Black Caribbean pupils","Mixed heritage",true],["The architecture of this hub","Architecture and the built environment",false],["Take care with the figures","Health and care",false],["Football clubs and Black players","Sport",true]];
function covTest(){const all=Object.fromEntries(COV_GROUPS.flatMap(([,,i])=>i));return COV_TESTS.filter(([t,k,w])=>!all[k]||all[k].test(t)!==w).map(([t,k,w])=>`"${t}" ${w?"should":"should not"} count for ${k}`)}
/* D-138: prose that counts the menus (the guide, its tours) must match the menus themselves */
const MENU_NUMW=["zero","one","two","three","four","five","six","seven","eight","nine","ten"];
function menuCountText(){const bad=[];const n=NAV_GROUPS.length;const texts=[...$$("#v-guide p, #v-guide li, #v-guide h2, #v-guide h3, #v-overview p")].map(e=>e.textContent);
  try{texts.push(...JSON.stringify(typeof TOURS!=="undefined"?TOURS:[]).split('","'))}catch(e){}
  texts.forEach(t=>{const m=String(t).match(/\b(one|two|three|four|five|six|seven|eight|nine|ten) menus\b/i);if(m&&MENU_NUMW.indexOf(m[1].toLowerCase())!==n)bad.push(`"${m[0]}" but there are ${MENU_NUMW[n]||n}`)});return [...new Set(bad)]}
function covAudit(){const bad=covTest();bad.push(...menuCountText());const pts=covPoints();
  if(pts.length>=500){const g=covRows(pts);const n=g.reduce((s,[,,r])=>s+r.length,0);if(n<50)bad.push("only "+n+" areas in the map");if(GOV_FUNCTIONS.length!==13)bad.push("government functions should number 13 (GOV.UK, 3 November 2025)");if(CS_PROFESSIONS.length!==33)bad.push("Civil Service professions should number 33 (GOV.UK, 30 September 2026)")}
  if(!$("#rv-coverage"))bad.push("coverage section missing");return{bad,pts:pts.length}}
CHECKS.push({id:"C167",n:"The coverage map counts sourced points for every field, discipline, function, profession and sector, with tested keyword rules, and the guide counts the menus correctly (D-136, D-138)",run:c=>({ok:!c.cov.bad.length,d:c.cov.bad.length?"Problems: "+c.cov.bad.join("; "):`${COV_TESTS.length} keyword tests pass; ${c.cov.pts.toLocaleString("en-GB")} sourced points counted across ${COV_GROUPS.reduce((s,[,,i])=>s+i.length,0)+GOV_FUNCTIONS.length+CS_PROFESSIONS.length} areas`}),
  breakIt:c=>{c.cov={...c.cov,bad:['"The architecture of this hub" should not count for Architecture and the built environment']};return c}});
BUILD_TESTS["D-137"]="Every menu held nine pages, the most the navigation allows, so new pages had nowhere to go. A seventh menu, Practice, gathers the pages people use when applying the hub at work, which made room for Mixed heritage in Understand (C102)";
BUILD_TESTS["D-138"]="Adding a menu left the user guide and its first tour saying there were six. C167 now fails if any text in the guide counts the menus wrongly";
BUILD_TESTS["D-136"]="The hub could not show where its evidence was deep and where it was thin. The coverage map now counts sourced points for each field, design discipline, government function, Civil Service profession, part of the public sector, and the wider economy and society, live from the pages";
REQS.push({id:"R92",t:"F",r:"Identify the fields, professional domains, themes and sectors the hub should cover for the public sector and where it meets the private and voluntary sectors, economy and society",o:"Request 71",sat:["rv-coverage"],ver:["C167"]});
const _ctx93=ctxV15;ctxV15=function(){const c=_ctx93();c.cov=covAudit();return c};
const COV_NEXT=[["Designing for Black and Mixed-heritage people: policy, service, content and data design","Policy, service and content design were the thinnest disciplines"],
 ["Mixed heritage: people of Black and mixed ancestry in the UK","Mixed heritage held about 1% of the hub's sourced points"],
 ["STEM and the built environment: engineering, architecture, planning and construction","Engineering and architecture are thin"],
 ["Sport, and the uniformed and public services","Sport, military and uniformed services are thin"],
 ["Profession routes through the hub: policy, digital and data, analysis, HR, communications, legal, science and engineering","Most of the 33 professions have no route of their own"],
 ["Beyond government: employers and supply chains, the voluntary and faith sectors, funders, trade unions and professional bodies","Where public bodies meet the rest of the economy"],
 ["Society and demographics: older people, disability, LGBT+ people, and place across the four nations","Intersections with fewer sourced points"],
 ["A Welsh-language edition","Public bodies in Wales work under the Welsh language standards"]];
function renderCovNext(){const u=$("#covNext");if(u)u.innerHTML=COV_NEXT.map(([a,why])=>`<li><b>${esc(a)}</b>. <span class="muted">${esc(why)}.</span></li>`).join("");const s=$("#covSrcs");if(s)s.innerHTML="Official lists: "+evTag(GOV_FUNCTIONS_SRC)+" "+evTag(CS_PROFESSIONS_SRC)}
/* redraw whenever the checks run: by then every page has been drawn, so the counts are complete */
const _rc48=runChecks;runChecks=function(...a){const r=_rc48.apply(this,a);try{renderCoverage()}catch(e){console.warn("Coverage map failed",e)}return r};
function v48Boot(){renderCovNext();const f=$("#covFilt");if(f)f.addEventListener("change",renderCoverage);addEventListener("hashchange",()=>{if(location.hash==="#review"||location.hash==="#rv-coverage")setTimeout(renderCoverage,400)});if(/^#(review|rv-coverage)$/.test(location.hash))setTimeout(renderCoverage,1500)}
