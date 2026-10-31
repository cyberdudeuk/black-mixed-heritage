/* ================= v2.28.0 LEARNING PATHWAYS: THE NATIONAL SCHOOL, MANCHESTER AND EVERY PLACE (R111, D-165) =================
   What learning the new National School of Government and Public Services, the Manchester Digital Campus and the Places for
   Growth locations should offer, for every profession and for the people this hub is for. Two kinds of content, kept apart:
   - what exists (PW: pages read on 31 October 2026 and re-read word for word by an independent reviewer);
   - what the hub proposes (PW_* tables below): analysis, labelled as such, built from this hub's evidence. */
const NEW28b=[["pathways","Learning pathways"]].filter(([id])=>document.getElementById("v-"+id)&&!VIEWS.some(v=>v[0]===id));VIEWS.push(...NEW28b);
(function(){if(!NEW28b.length)return;const g=NAV_ORDER_V21.find(x=>x.g==="Careers");if(g&&!g.items.includes("pathways"))g.items.splice(Math.max(0,g.items.indexOf("careers")+1),0,"pathways");applyNavV21()})();
VIEW_ICONS.pathways="route";LABEL_V21.pathways="Learning pathways";
NEW28b.forEach(([id])=>{PK_CONTENT.push(id);RP_NEW.push(id)});
RELATED_V21.push(["pathways","careers"],["careers","pathways"],["pathways","joining"],["joining","pathways"],["pathways","profession"],["profession","pathways"],["pathways","talent"]);
(function(){const c=CLUSTERS.find(x=>x.id==="careers");if(c&&NEW28b.length&&!c.pages.some(p=>p[0]==="pathways"))c.pages.splice(3,0,["pathways","the learning the National School, the Manchester Digital Campus and every Places for Growth location should offer"])})();
const PW_SRC={};(function(){if(typeof PW==="undefined")return;Object.values(PW).flat().forEach(it=>{const id=SRCQ(it.title+" ("+it.publisher+")",it.url,"Supports Learning pathways",it.quote);SOURCES[id].rd="31 October 2026";PW_SRC[it.id]=id})})();
const pwTag=ids=>{const seen=new Set();return (Array.isArray(ids)?ids:[ids]).map(i=>PW_SRC[i]&&!seen.has(PW_SRC[i])?(seen.add(PW_SRC[i]),evTag(PW_SRC[i])):"").join("")};
const PW_GROUPS=[["nsg","The National School of Government and Public Services"],["mdc","The Manchester Digital Campus"],["pfg","Places for Growth"],["ddat","Digital, data, cyber and AI learning today"],["professions","Professions, functions and their frameworks"],["inclusion","Who is in the professions now"]];
/* The hub's proposal. Layers follow the school's own four areas; levels follow the Digital and Data capability framework */
const PW_LEVELS=["Awareness","Working","Practitioner","Expert"];
const PW_LAYERS=[
 ["Universal skills","Everyone, from day one, wherever they work",[
   ["Digital, data and AI for everyone","Awareness to working: finding and judging evidence, data basics, using AI tools safely and fairly, accessibility basics, cyber hygiene",["ddat-03","ddat-04","ddat-05"]],
   ["Working in government","How government works across the four nations, devolution, the Civil Service Code and impartiality, equality duties",["nsg-02"]],
   ["Inclusion in practice","Designing for Black and Mixed-heritage people, collecting and using ethnicity data well, words that matter, what to do about unfair treatment, allyship and sponsorship (from this hub's pages)",[]]]],
 ["Specialist skills","Each profession and function, at the level its role needs",[
   ["Digital and data","The capability framework's role groups, from awareness to expert, with labs at the Manchester campus and online",["ddat-01","ddat-02"]],
   ["Cyber and security","Cyber security technologist, security architecture, secure by design, threat intelligence; the Cyber Security Academy as a route in with no technical qualifications",["ddat-12","ddat-13","ddat-14"]],
   ["Analysis","Statistics, economics, social and operational research, geography and actuarial work, with ethnicity data standards and small-number suppression",["ddat-15","prof-10"]],
   ["Every other profession","Each profession's own framework, plus the digital, data and AI level the role needs (table below)",["prof-01","prof-03"]]]],
 ["Talent programmes","Entry and accelerated routes, open beyond graduates",[
   ["No-degree routes","Apprenticeships from level 2 to 7, TechTrack (level 4), the Career Launch Apprenticeship, the Digital and Data Fast Stream route for serving civil servants",["ddat-07","ddat-08","ddat-09","pfg-04"]],
   ["Life Chance and internship routes","Going Forward into Employment for prison leavers, veterans, care leavers, carers and others; the Summer Internship Programme and Care Leavers Internship Scheme",["inc-05","inc-06"]],
   ["Sponsorship built in","A named sponsor and mentor for every apprentice, intern and Fast Streamer, tracked by group",[]]]],
 ["Public sector leadership","Senior and aspiring leaders, across the public sector",[
   ["Digital and data leadership","Digital Excellence for senior civil servants, Grade 6 and 7; the Digital and Data essentials for senior civil servants",["ddat-06","ddat-10"]],
   ["Leading inclusive organisations","Targets, sponsorship and visible allyship; fair treatment and redress; representation data (from this hub's Leaders pages)",[]],
   ["Leading across places","Leadership for Places for Growth locations and the wider public sector, with the NHS and local government",["prof-13","prof-14","pfg-03"]]]]];
/* Every profession: the DDaT level to aim for and what to add from this hub (analysis, by profession type) */
const PW_PROF_TYPE={"Operational delivery":"ops","Policy":"policy","Actuary":"an","Economics":"an","Geography":"an","Operational Research":"an","Social research":"an","Statistics":"an","Digital and Data":"ddat","Cyber":"ddat","Security":"ddat","Intelligence Analysis":"an","Knowledge and Information Management":"kim","Human Resources":"hr","Commercial":"corp","Communications":"comms","Counter Fraud":"risk","Debt":"corp","Finance":"corp","Corporate Finance":"corp","Grants":"corp","Internal Audit":"risk","Legal":"legal","Project Delivery":"corp","Property":"corp","Risk Management":"risk","Clinical":"spec","Occupational Psychology":"hr","Planning":"spec","Planning Inspection":"spec","Science and Engineering":"spec","Tax":"corp","Veterinary":"spec"};
const PW_TYPE={
 ops:["Working","Inclusive, accessible services; AI-assisted casework used fairly; complaints and redress routes"],
 policy:["Working","Evidence and data literacy; equality impact and the public sector equality duty; designing policy with Black and Mixed-heritage people"],
 an:["Practitioner","Ethnicity data standards, harmonised questions, small numbers and suppression; disparities analysis that does not classify people"],
 ddat:["Practitioner to expert","The capability framework track; accessibility and inclusive design; bias in data and AI; secure by design"],
 kim:["Practitioner","Metadata, records and archives, including the heritage collections this hub draws on"],
 hr:["Working","Inclusive recruitment, positive action within the law, sponsorship, fair treatment and redress, ethnicity pay gaps"],
 corp:["Working","Data literacy for decisions; social value and fair access in spending, grants and contracts"],
 comms:["Working","Inclusive language and imagery, accessibility, the words that matter"],
 risk:["Working","Bias in risk and fraud models; equality risk in controls and audit"],
 legal:["Working","The Equality Act and public sector equality duty in practice; data protection for special category data"],
 spec:["Working","The profession's own science with health, place and other inequalities in view; data and AI for the specialism"]};
const PW_PLACES=[
 ["Manchester","Government Digital and AI Innovation Campus, target opening 2032","The central home for digital, data, cyber and AI specialist learning and labs; until it opens, the same offer online and in existing Manchester offices",["mdc-01","mdc-02","mdc-04"]],
 ["York","First National School regional hub; residential campus outside York","Leadership and residential intensives for every profession",["nsg-02","pfg-09"]],
 ["Darlington","Darlington Economic Campus, opening early 2028","Economics, data and analysis for policy",["pfg-07"]],
 ["Sheffield","Policy campus","Policy profession with data and AI for policy",["pfg-08"]],
 ["Birmingham and the West Midlands","Transport and infrastructure campus","Project delivery, science and engineering, digital twins and data for infrastructure",["pfg-06"]],
 ["Aberdeen","Energy Campus","Energy and net-zero data and digital skills",["mdc-05"]],
 ["Leeds","No campus specialism found in published sources","A satellite: the universal layer, entry routes and online specialist access, with local partners",["pfg-01"]],
 ["Cardiff","No campus specialism found in published sources","A satellite, in English and Welsh, with the Welsh Government's own learning",["pfg-01"]],
 ["Glasgow","No campus specialism found in published sources","A satellite, working with the Scottish Government's learning",["pfg-01"]],
 ["Newcastle and Tyneside","No campus specialism found in published sources","A satellite: the universal layer, entry routes and online specialist access",["pfg-02"]],
 ["Bristol","No campus specialism found in published sources","A satellite: the universal layer, entry routes and online specialist access",["pfg-02"]],
 ["Edinburgh","No campus specialism found in published sources","A satellite, working with the Scottish Government's learning",["pfg-02"]],
 ["Belfast","No campus specialism found in published sources","A satellite for UK civil servants based there; the Northern Ireland Civil Service is separate and has its own learning",["pfg-02"]]];
const PW_MOSCOW=[
 ["Must","Digital, data, AI and cyber basics for every civil servant, free and online, and taught in person in every location",["ddat-03","ddat-05"]],
 ["Must","Routes in without a degree, advertised and supported in every location: apprenticeships, TechTrack, the Career Launch Apprenticeship, the internal Fast Stream route",["ddat-07","ddat-09","pfg-04"]],
 ["Must","Accessible learning: content that meets WCAG 2.2 AA, captions and British Sign Language, reasonable adjustments asked once and remembered",[]],
 ["Must","Paid time to learn, and courses at times carers, part-time and shift workers can attend",[]],
 ["Must","Reach, completion and progression counted by group, with small numbers suppressed, and published every year",["inc-01","inc-03"]],
 ["Should","Specialist digital, data, cyber and AI tracks at the Manchester campus, open online to every location",["mdc-03","ddat-01"]],
 ["Should","A sponsor and mentor for every apprentice, intern and Fast Streamer",[]],
 ["Should","Outreach in every location: work experience, holiday placements and career launch for young people, with care leavers and young people not in education, employment or training first",["pfg-04","inc-05"]],
 ["Should","Inclusion in practice in every track, using this hub's pages",[]],
 ["Could","Local partners delivering in the hubs: colleges, universities, Black-led tech and professional networks",[]],
 ["Could","Courses open to the NHS and local government at cost, alongside their own academies",["prof-13","prof-14"]],
 ["Could","A skills record that moves with you between jobs",["prof-05"]],
 ["Won't (for now)","Separate learning platforms for each place: use Civil Service Learning and the Government Campus",["ddat-11"]],
 ["Won't","Quotas for any group: in Great Britain, positive action has to stay within the Equality Act",[]]];
const PW_MEASURES=["How many people from each location, grade and profession start, finish and use what they learned, against the one-in-ten digital roles goal","Progression into digital, data and cyber roles and into senior grades, by group, with small numbers suppressed","Whether learning is accessible: adjustments asked for and met, and feedback from disabled learners","Whether routes in reach the people this hub is for: care leavers, prison leavers, veterans, returners, career changers, young people","What learners say: one open question, how could this be better?"];
function pwRender(){const v=document.getElementById("v-pathways");if(!v||typeof PW==="undefined")return;
  const sh=document.getElementById("pwShort");if(sh)sh.innerHTML=`<aside class="card lpshort" aria-labelledby="pwShortH"><h2 class="lpshorth" id="pwShortH">${icon("info")} In short</h2><ul>
   <li>The National School of Government and Public Services opened on 27 October 2026, with four areas: universal skills, specialist skills, talent programmes and leadership. ${pwTag(["nsg-02","nsg-07"])}</li>
   <li>The Manchester Digital Campus is due to open in 2032 at the earliest; no published plan yet says what learning it will host. ${pwTag(["mdc-02","mdc-03"])}</li>
   <li>The government wants one in ten civil servants in digital and technology roles by 2030, up from just over 5%. ${pwTag("mdc-03")}</li>
   <li>The hub proposes a syllabus for every profession, routes in for people without degrees, and a hub in every Places for Growth location. The proposal is analysis, not fact.</li></ul></aside>`;
  const now=document.getElementById("pwNow");if(now)now.innerHTML=PW_GROUPS.map(([k,h])=>`<h3>${esc(h)}</h3><ul class="pwfacts">${(PW[k]||[]).map(i=>`<li>${esc(i.point)} <span class="muted">(${esc(i.date)})</span> ${pwTag(i.id)}</li>`).join("")}</ul>`).join("");
  const ly=document.getElementById("pwLayers");if(ly)ly.innerHTML=PW_LAYERS.map(([n,who,mods])=>`<div class="card"><h3>${esc(n)}</h3><p class="muted">${esc(who)}</p><ul>${mods.map(m=>`<li><b>${esc(m[0])}</b>: ${esc(m[1])} ${pwTag(m[2])}</li>`).join("")}</ul></div>`).join("");
  const pr=document.getElementById("pwProfBody");if(pr){const L=typeof PROF_LINKS!=="undefined"?PROF_LINKS:{};pr.innerHTML=Object.keys(PW_PROF_TYPE).map(n=>{const t=PW_TYPE[PW_PROF_TYPE[n]];const l=L[n];return `<tr><th scope="row">${l?`<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(n)}<span class="vh"> (opens in a new tab)</span></a>`:esc(n)}</th><td>${esc(t[0])}</td><td>${esc(t[1])}</td></tr>`}).join("")}
  const pl=document.getElementById("pwPlacesBody");if(pl)pl.innerHTML=PW_PLACES.map(p=>`<tr><th scope="row">${esc(p[0])}</th><td>${esc(p[1])} ${pwTag(p[3])}</td><td>${esc(p[2])}</td></tr>`).join("");
  const mo=document.getElementById("pwMoscowBody");if(mo)mo.innerHTML=PW_MOSCOW.map(m=>`<tr><td>${esc(m[0])}</td><th scope="row">${esc(m[1])}</th><td><div class="tags">${pwTag(m[2])}</div></td></tr>`).join("");
  const me=document.getElementById("pwMeasures");if(me)me.innerHTML=`<ul>${PW_MEASURES.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`;
  if(!document.getElementById("pathways-vant")){const sec=document.createElement("section");sec.className="block";sec.id="pathways-vant";sec.dataset.icon="hands";sec.dataset.label="From where you stand";
    const V=[["people","If you are Black, African, Caribbean or of Mixed heritage","Ask which route fits you, without a degree if need be, and for a sponsor from the start.","#pw-routes","Routes in"],["ladder","If you lead or sponsor","Back the Must list in your area, and ask for reach and progression by group every year.","#pw-moscow","What must be available"],["route","If you plan learning or run a Places for Growth location","Start with the universal layer and routes in; the specialist tracks can come online from Manchester.","#pw-places","Every place"],["chart","If you design policy, services or data","Measure who starts, finishes and progresses, not only how many courses run.","#pw-measure","How to know it works"]];
    sec.innerHTML=`<div class="sechead"><span class="eyebrow">Vantage points</span><h2>What this page means from where you stand</h2><p>Suggestions written by the hub for different readers. Each links to the part of this page it rests on.</p></div><div class="grid g2 vtskip">${V.map(c=>`<article class="card lpvant"><h3>${icon(c[0])} ${esc(c[1])}</h3><p>${esc(c[2])} <a href="${c[3]}">${esc(c[4])}</a></p></article>`).join("")}</div>`;
    const before=document.getElementById("pw-now");if(before)v.insertBefore(sec,before);else v.appendChild(sec)}
  if(typeof shortFirst==="function")shortFirst()}
/* C179: facts are read and dated; the proposal stays labelled as analysis and cites only loaded evidence */
function pwAudit(){const bad=[];if(typeof PW==="undefined")return["no pathway evidence loaded"];
  Object.values(PW).flat().forEach(i=>{if(!i.url||!/^https:\/\//.test(i.url)||!i.quote||!i.date)bad.push(i.id+": incomplete");if(!PW_SRC[i.id])bad.push(i.id+": not a registered source");if(OLD_DEPT_RE.test(i.point+i.title+i.publisher))bad.push(i.id+": names the former department")});
  const ids=new Set(Object.values(PW).flat().map(i=>i.id));[...PW_LAYERS.flatMap(l=>l[2].map(m=>m[2])),...PW_PLACES.map(p=>p[3]),...PW_MOSCOW.map(m=>m[2])].flat().forEach(id=>{if(!ids.has(id))bad.push("cites missing evidence "+id)});
  if(PW_PLACES.length!==13)bad.push(`${PW_PLACES.length} places, not the 13 Places for Growth locations`);
  const L=typeof PROF_LINKS!=="undefined"?PROF_LINKS:{};const missing=Object.keys(PW_PROF_TYPE).filter(n=>!L[n]);if(missing.length)bad.push("professions with no official link: "+missing.slice(0,3).join(", "));
  if(Object.keys(PW_PROF_TYPE).length<33)bad.push("fewer than 33 professions");Object.values(PW_PROF_TYPE).forEach(t=>{if(!PW_TYPE[t])bad.push("unknown profession type "+t)});
  ["Must","Should","Could"].forEach(k=>{if(!PW_MOSCOW.some(m=>m[0]===k))bad.push("no "+k+" items")});
  const lab=document.querySelector("#v-pathways .pwanalysis");if(!lab)bad.push("the proposal is not labelled as analysis");
  if(/quota/i.test(PW_MOSCOW.filter(m=>m[0].startsWith("Must")||m[0].startsWith("Should")).map(m=>m[1]).join(" ")))bad.push("a quota is proposed");
  return bad.slice(0,8)}
CHECKS.push({id:"C179",n:"Learning pathways: every fact is read and dated, the proposal is labelled as analysis and cites only loaded evidence, all 33 professions link to their official page, all 13 Places for Growth locations are covered, and no quota is proposed (D-165)",
  run:c=>({ok:!c.pw.length,d:c.pw.length?c.pw.slice(0,3).join("; "):`${Object.values(PW).flat().length} facts, ${Object.keys(PW_PROF_TYPE).length} professions, ${PW_PLACES.length} places, ${PW_MOSCOW.length} MoSCoW items`}),
  breakIt:c=>{c.pw=["cites missing evidence nsg-99"];return c}});
const _ctx159=ctxV15;ctxV15=function(){const c=_ctx159();c.pw=pwAudit();return c};
REQS.push({id:"R111",t:"F",r:"The digital, data, cyber and technology syllabus, extended to every profession and domain, that the National School should offer through the Manchester Digital Campus and every Places for Growth location, with routes for this hub's audiences and MoSCoW priorities",o:"Request 79",sat:["pw-now","pw-layers","pw-prof","pw-routes","pw-places","pw-moscow","pw-measure"],ver:["C179","D-165"]});
BUILD_TESTS["D-165"]="People asked what learning the new National School, the Manchester Digital Campus and the Places for Growth locations should offer. The page keeps what exists (pages read on 31 October 2026 and re-read by an independent reviewer, including that no published plan yet says what learning the Manchester campus will host) apart from the hub's proposal, which is labelled as analysis. C179 fails if the proposal cites evidence that is not loaded, a profession lacks its official link, a location is missing, or a quota is proposed.";
DATASETS.push({k:"pathways",n:"Learning pathways: what exists",ic:"route",arr:()=>(typeof PW!=="undefined"?Object.values(PW).flat():[]).map(x=>({...x,text:x.point})),id:x=>x.id,lab:x=>x.publisher+": "+x.title,srcs:x=>[PW_SRC[x.id]],view:"pathways",href:()=>"#pw-now",out:["pages","jsonld"],chk:["C179"]});
let v60Boot=function(){pwRender()};
