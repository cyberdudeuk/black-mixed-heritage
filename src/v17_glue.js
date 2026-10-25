
/* ================= v1.8 glue ================= */
/* newer official figures (verified 21 October 2026): stop and search, year ending March 2026 */
(st=>{if(!st)return;const s26=SRCU("Home Office: Police powers and procedures, stop and search, year ending 31 March 2026","https://www.gov.uk/government/statistics/stop-and-search-arrests-and-mental-health-detentions-march-2026/police-powers-and-procedures-stop-and-search-arrests-and-mental-health-detentions-england-and-wales-year-ending-31-march-2026","Home Office · 1 October 2026");
  st.ev="In the year to March 2026, people identifying as Black or Black British in England and Wales were stopped and searched at 4.1 times the rate of White people; for males aged 18 to 34 the rates were 148.2 and 25.2 per 1,000. The year before, the rates were 22.4 and 5.9 per 1,000 (3.8 times). These figures measure police activity, not offending.";
  st.lim="Rates use self-defined ethnicity. The figures do not show who commits crime.";st.src=[s26,"S215","S153"]})(STEREOS.find(s=>s.id==="st-crime"));
DATASETS.push(
 {k:"lives",n:"Life-stage and group facts",ic:"family",arr:()=>LIVES,id:f=>f.id,lab:f=>f.t,srcs:f=>f.src||[],view:"lives",href:f=>"#"+f.id,out:["pages","jsonld"],chk:["C65"]},
 {k:"inter",n:"Intersectionality",ic:"branch",arr:()=>INTER,id:x=>x.id,lab:x=>x.t,srcs:x=>x.src||[],view:"lives",href:x=>"#"+x.id,out:["pages","jsonld"],chk:["C66"]},
 {k:"awards",n:"Awards and recognition routes",ic:"award",arr:()=>AWARDS,id:a=>a.id,lab:a=>a.n,srcs:a=>a.src||[],view:"involve",href:a=>"#"+a.id,out:["pages","jsonld"],chk:["C70"]},
 {k:"edu",n:"Learning resources",ic:"school",arr:()=>EDU_RES,id:r=>r.id,lab:r=>r.title,srcs:r=>r.src||[],view:"learn",href:r=>"#"+r.id,out:["pages","jsonld"],chk:["C72"]},
 {k:"comm",n:"Community and practice resources",ic:"handheart",arr:()=>COMM_RES,id:r=>r.id,lab:r=>r.title,srcs:r=>r.src||[],view:"learn",href:r=>"#"+r.id,out:["pages","jsonld"],chk:["C73"]},
 {k:"quiz",n:"Quiz questions",ic:"game",arr:()=>quizBank(3),id:q=>q.id,lab:q=>q.q.slice(0,60),srcs:q=>[q.src],view:"learn",href:()=>"#lg-games",out:["pages"],chk:["C71"]},
 {k:"routines",n:"Self-* routines",ic:"pulse",arr:()=>ROUTINES,id:r=>r.id,lab:r=>r.n,srcs:()=>[],view:"routines",href:r=>"#ro-"+r.id,out:["pages"],chk:["C69"]},
 {k:"stories",n:"User stories",ic:"doc",arr:()=>USER_STORIES,id:s=>s.id,lab:s=>s.want,srcs:()=>[],view:"routines",href:s=>"#us-"+s.id,out:["pages"],chk:["C69"]});
const _addSearch16=addV15Search;addV15Search=function(add){_addSearch16(add);
  LIVES.forEach(f=>add(f.t,(LIFE_GROUPS.find(g=>g.k===f.g)||{l:"Group"}).l,f.fig+" "+f.l,"#"+f.id));INTER.forEach(x=>add(x.t,"Intersectionality",x.x,"#"+x.id));
  AWARDS.forEach(a=>add(a.n,"Award",a.what,"#"+a.id));if(typeof EDU_RES!=="undefined")EDU_RES.forEach(r=>add(r.title,"Learning",r.what,"#"+r.id));if(typeof COMM_RES!=="undefined")COMM_RES.forEach(r=>add(r.title,"Community",r.what,"#"+r.id));
  ROUTINES.forEach(r=>add(r.n,"Self-* routine",r.what,"#ro-"+r.id));add("Dashboards","Analytics","Content, evidence, groups and quality","#dash");add("Quiz and games","Games","Family quiz, timeline challenge, match-up, bingo, conversation cards","#lg-games")};
const _ld16=ldExtra;ldExtra=function(base){return[..._ld16(base),
  ...LIVES.map(f=>({"@type":"Observation","@id":base+f.id,"name":f.t,"value":f.fig,"description":f.l,"observationDate":f.per,"spatialCoverage":f.geo,"citation":(f.src||[]).filter(s=>SOURCES[s]).map(s=>SOURCES[s].u)})),
  ...INTER.map(x=>({"@type":"CreativeWork","@id":base+x.id,"name":x.t,"about":(INTER_DIMS[x.d]||[x.d])[0],"description":x.x,"citation":(x.src||[]).filter(s=>SOURCES[s]).map(s=>SOURCES[s].u)})),
  ...AWARDS.map(a=>({"@type":"Event","@id":base+a.id,"name":a.n,"organizer":{"@type":"Organization","name":a.org},"description":a.what,"url":a.u})),
  ...(typeof EDU_RES!=="undefined"?EDU_RES:[]).map(r=>({"@type":"LearningResource","@id":base+r.id,"name":r.title,"provider":{"@type":"Organization","name":r.prov},"educationalLevel":r.stage,"learningResourceType":r.type,"url":r.u,"isAccessibleForFree":r.free===true})),
  ...(typeof COMM_RES!=="undefined"?COMM_RES:[]).map(r=>({"@type":"CreativeWork","@id":base+r.id,"name":r.title,"provider":{"@type":"Organization","name":r.prov},"audience":r.aud,"url":r.u}))]};
REQS.push(
 {id:"R41",t:"F",r:"Facts for children, young people, adults, older people, women, men and parents, with strengths and gaps",o:"Request 19",sat:["ls-groups","ls-data"],ver:["C65"]},
 {id:"R42",t:"F",r:"Intersectionality explained with the law, critiques and responses",o:"Request 19",sat:["ls-inter"],ver:["C66"]},
 {id:"R43",t:"F",r:"Every card grid can be shown as a list; every table can be sorted, filtered, grouped and downloaded",o:"Request 19",sat:["ls-data","ro-stories"],ver:["C67","D-025"]},
 {id:"R44",t:"F",r:"Analytics dashboards with a table view for every chart",o:"Request 19",sat:["da-kpi","da-content","da-evidence","da-quality"],ver:["C68"]},
 {id:"R45",t:"NF",r:"Self-* routines linked to personas, user stories, journeys and blueprint stages",o:"Request 19",sat:["ro-run","ro-matrix","ro-journeys","ro-stories"],ver:["C69"]},
 {id:"R46",t:"F",r:"Recognition routes and awards relevant to Black History Month, with nomination steps",o:"Request 19",sat:["iv-recognise"],ver:["C70"]},
 {id:"R47",t:"F",r:"Curriculum aids for every stage, family games and quizzes, and resources for community leaders, social workers, youth workers and educators",o:"Request 20",sat:["lg-schools","lg-curric","lg-games","lg-community"],ver:["C71","C72","C73"]},
 {id:"R48",t:"NF",r:"Varied iconography, motifs and motion that switch off when reduced motion is asked for",o:"Request 21",sat:["ls-groups","da-kpi"],ver:["C74"]});
VIEW_ICONS.equity="scale";
Object.assign(BUILD_TESTS,{"D-025":"Tables sort, filter and group; cards switch to a list; the choice is remembered","D-026":"Dashboards draw every chart with a table view","D-027":"Quiz plays a full round; timeline and match-up respond to keyboard"});
LLD.push(["Tools and dashboards","enhanceGrids","enhanceTables","renderDash","hbar","stackbar","heatmap"],["Groups and learning","renderLives","renderInter","renderEdu","renderComm","quizBank","startQuiz"],["Self-* routines","runRoutine","renderRoutines","renderJourney","revealSetup"]);
const _ctx17=ctxV15;ctxV15=function(){try{enhanceGrids();enhanceTables()}catch(e){} /* self-repair before verifying, as D-017 */
  const tbl=$$(".view table").filter(t=>!t.closest(".tskip,[role=grid]")&&!t.matches(".cal")&&t.tBodies[0]&&t.tHead&&[...t.tBodies[0].rows].filter(r=>!r.classList.contains("grp")).length>=4&&![...t.tBodies[0].rows].some(r=>[...r.cells].some(c=>c.rowSpan>1||c.colSpan>1)));
  const grids=$$(".view .grid").filter(g=>!g.closest(".vtskip")&&g.id!=="factTiles"&&[...g.children].filter(c=>c.matches(".card,article")).length>=4);
  return{..._ctx17(),lives:LIVES.map(f=>({...f,src:[...f.src]})),inter:INTER.map(x=>({...x,src:[...x.src]})),
   tables:{n:tbl.length,smart:tbl.filter(t=>t.dataset.smart&&t.querySelector("button.thsort")).length},grids:{n:grids.length,vt:grids.filter(g=>g.dataset.vt).length},
   dash:{figs:$$("#v-dash figure.dvfig").length,withTable:$$("#v-dash figure.dvfig").filter(f=>f.querySelector("details.dvtable table, table")).length,kpi:$$("#dashKpi .kpi").length},
   routines:ROUTINES.map(r=>({id:r.id,p:[...r.personas],s:[...r.stories],st:[...r.stages],fn:typeof r.run==="function"})),stories:USER_STORIES.map(s=>({...s,ac:[...s.ac],ok:_hashOk(s.route)})),
   journeys:Object.entries(JOURNEYS).map(([p,j])=>({p,stages:j.map(x=>x[0]),hrefs:j.map(x=>_hashOk(x[2]))})),
   awards:AWARDS.map(a=>({...a,src:[...a.src]})),quiz:[1,2,3].map(l=>quizBank(l).map(q=>({id:q.id,a:q.a,opts:[...q.opts],src:q.src}))),
   edu:(typeof EDU_RES!=="undefined"?EDU_RES:[]).map(r=>({...r,stage:[...r.stage],src:[...r.src]})),curric:(typeof CURRIC!=="undefined"?CURRIC:[]).map(c=>c.nation),
   comm:(typeof COMM_RES!=="undefined"?COMM_RES:[]).map(r=>({...r,aud:[...r.aud],src:[...r.src]})),commFacts:(typeof COMM_FACTS!=="undefined"?COMM_FACTS:[]).map(f=>({...f,src:[...f.src]})),
   motion17:{allowed:motionAllowed(),nomo:document.documentElement.classList.contains("nomo"),rule:[...document.styleSheets].some(s=>{try{return [...s.cssRules].some(r=>r.cssText.includes("html.nomo"))}catch(e){return false}})}}};
const _okSrc=a=>a.length&&a.every(s=>SOURCES[s]);
CHECKS.push(
 {id:"C65",n:"Every group has at least four sourced facts, including a strength",run:c=>{const bad=c.lives.filter(f=>!f.fig||!f.per||!f.geo||!f.cav||!_okSrc(f.src)||!VALENCE.some(v=>v.k===f.v));const thin=LIFE_GROUPS.filter(g=>c.lives.filter(f=>f.g===g.k).length<4||!c.lives.some(f=>f.g===g.k&&f.v==="strength")).map(g=>g.k);
   return{ok:!bad.length&&!thin.length,d:bad.length?"Incomplete: "+bad.map(b=>b.id).join(", "):thin.length?"Too few facts or no strength: "+thin.join(", "):`${c.lives.length} facts across ${LIFE_GROUPS.length} groups, each with a strength`}},
  breakIt:c=>{c.lives=c.lives.filter(f=>!(f.g==="older"&&f.v==="strength"));return c}},
 {id:"C66",n:"Intersectionality gives the idea, the law, critiques and responses, all sourced",run:c=>{const d=new Set(c.inter.map(x=>x.d));const need=["definition","law","critique","response"].filter(k=>!d.has(k));const bad=c.inter.filter(x=>!_okSrc(x.src));
   return{ok:!need.length&&!bad.length&&d.size>=8,d:need.length?"Missing: "+need.join(", "):bad.length?"Unsourced: "+bad.map(b=>b.id).join(", "):`${c.inter.length} entries across ${d.size} dimensions, with critiques and responses`}},
  breakIt:c=>{c.inter=c.inter.filter(x=>x.d!=="response");return c}},
 {id:"C67",n:"Every table sorts, filters and groups; every card grid can be a list (D-025)",run:c=>({ok:c.tables.n>0&&c.tables.smart===c.tables.n&&c.grids.vt===c.grids.n,d:`${c.tables.smart} of ${c.tables.n} tables enhanced; ${c.grids.vt} of ${c.grids.n} card grids can switch to a list`}),
  breakIt:c=>{c.tables={...c.tables,n:c.tables.n+1};return c}},
 {id:"C68",n:"Dashboards draw their charts, each with a table view (D-026)",run:c=>({ok:c.dash.figs>=8&&c.dash.withTable===c.dash.figs&&c.dash.kpi>=6,d:`${c.dash.figs} charts, ${c.dash.withTable} with a table view; ${c.dash.kpi} headline figures`}),
  breakIt:c=>{c.dash={...c.dash,withTable:c.dash.withTable-1};return c}},
 {id:"C69",n:"Every routine, story and journey is linked and resolves",run:c=>{const pid=new Set(PERSONAS.map(p=>p.id)),sid=new Set(c.stories.map(s=>s.id)),st=new Set(BLUEPRINT.stages);
   const r=c.routines.filter(x=>!x.fn||!x.p.length||x.p.some(p=>!pid.has(p))||!x.s.length||x.s.some(s=>!sid.has(s))||!x.st.length||x.st.some(s=>!st.has(s)));
   const s=c.stories.filter(x=>!pid.has(x.p)||x.ac.length<2||!x.ok||!st.has(x.stage)||!c.routines.some(r=>r.s.includes(x.id)));
   const j=c.journeys.filter(x=>x.stages.join()!==BLUEPRINT.stages.join()||x.hrefs.some(h=>!h));
   return{ok:!r.length&&!s.length&&!j.length&&c.journeys.length>=PERSONAS.length,d:(r.length||s.length||j.length)?`Broken: ${[...r.map(x=>x.id),...s.map(x=>x.id),...j.map(x=>"journey "+x.p)].join(", ")}`:`${c.routines.length} routines, ${c.stories.length} stories and ${c.journeys.length} journeys, all linked`}},
  breakIt:c=>{c.stories[0]={...c.stories[0],ok:false};return c}},
 {id:"C70",n:"Every award has its organiser's page, timing and a checked source",run:c=>{const bad=c.awards.filter(a=>!/^https:\/\//.test(a.u)||!a.when||!_okSrc(a.src)||(a.open&&!(a.dl>=_todayISO())));return{ok:!bad.length&&c.awards.length>=5&&c.awards.some(a=>a.open),d:bad.length?"Incomplete: "+bad.map(b=>b.id).join(", "):`${c.awards.length} awards and routes, ${c.awards.filter(a=>a.open).length} open now`}},
  breakIt:c=>{c.awards[0]={...c.awards[0],u:"http://x"};return c}},
 {id:"C71",n:"Every quiz answer is one of its options and has a source (D-027)",run:c=>{const bad=c.quiz[2].filter(q=>!q.opts.includes(q.a)||new Set(q.opts).size!==q.opts.length||!SOURCES[q.src]);return{ok:!bad.length&&c.quiz.every(l=>l.length>=10),d:bad.length?"Faulty: "+bad.slice(0,5).map(b=>b.id).join(", "):`${c.quiz.map(l=>l.length).join(" / ")} questions at family / standard / expert level`}},
  breakIt:c=>{c.quiz[2][0]={...c.quiz[2][0],a:"Nobody"};return c}},
 {id:"C72",n:"Every stage of learning has resources and every nation's curriculum is covered",run:c=>{const thin=ED_STAGES.filter(s=>c.edu.filter(r=>r.stage.includes(s.k)).length<3).map(s=>s.k);const nat=["England","Wales","Scotland","Northern Ireland"].filter(n=>!c.curric.includes(n));const bad=c.edu.filter(r=>!/^https:\/\//.test(r.u)||!_okSrc(r.src));
   return{ok:!thin.length&&!nat.length&&!bad.length,d:thin.length?"Too few for: "+thin.join(", "):nat.length?"Curriculum missing: "+nat.join(", "):bad.length?"Unsourced: "+bad.map(b=>b.id).join(", "):`${c.edu.length} resources across ${ED_STAGES.length} stages; 4 nations' curricula`}},
  breakIt:c=>{c.curric=c.curric.filter(n=>n!=="Wales");return c}},
 {id:"C73",n:"Every community and practice audience has resources, including outside England",run:c=>{const thin=CM_AUD.filter(a=>c.comm.filter(r=>r.aud.includes(a.k)).length<3).map(a=>a.k);const out=c.comm.filter(r=>r.nation!=="England"&&r.nation!=="UK").length;const bad=[...c.comm,...c.commFacts].filter(r=>!_okSrc(r.src));
   return{ok:!thin.length&&out>=3&&!bad.length,d:thin.length?"Too few for: "+thin.join(", "):bad.length?"Unsourced: "+bad.length:`${c.comm.length} resources for ${CM_AUD.length} audiences; ${out} from Wales, Scotland or Northern Ireland`}},
  breakIt:c=>{c.comm=c.comm.filter(r=>!r.aud.includes("youth"));return c}},
 {id:"C74",n:"Motion switches off when reduced motion is asked for",run:c=>({ok:c.motion17.rule&&c.motion17.nomo===!c.motion17.allowed,d:`Motion ${c.motion17.allowed?"on":"off"} on this device; reduced-motion rules ${c.motion17.rule?"present":"missing"}`}),
  breakIt:c=>{c.motion17={...c.motion17,nomo:c.motion17.allowed};return c}});
AI_TOOLS.push({name:"list_group_facts",description:"List sourced facts about Black people by life stage or group (children, young, adults, older, women, men, parents) with figure, what it measures, period, place, type (strength, gap, context) and caveat.",inputSchema:{type:"object",properties:{group:{type:"string"}}},
  execute:({group})=>LIVES.filter(f=>!group||f.g===group).map(f=>({group:f.g,title:f.t,figure:f.fig,measures:f.l,period:f.per,where:f.geo,type:f.v,caveat:f.cav,sources:f.src,href:"#"+f.id}))},
 {name:"list_learning_resources",description:"List checked learning resources (by stage: early, primary, secondary, post16, adult) and community or practice resources (audience: leaders, members, adultsw, childsw, youth, educators).",inputSchema:{type:"object",properties:{stage:{type:"string"},audience:{type:"string"}}},
  execute:({stage,audience})=>[...(typeof EDU_RES!=="undefined"?EDU_RES:[]).filter(r=>!audience&&(!stage||r.stage.includes(stage))),...(typeof COMM_RES!=="undefined"?COMM_RES:[]).filter(r=>!stage&&(!audience||r.aud.includes(audience)))].map(r=>({title:r.title,provider:r.prov,url:r.u,about:r.what,href:"#"+r.id}))},
 {name:"run_self_routines",description:"Run the hub's self-* routines (verify, repair, assess, staleness, accessibility, privacy, performance, balance, links, data heal, report, explain) and return each result.",inputSchema:{type:"object",properties:{}},
  execute:()=>ROUTINES.map(r=>({id:r.id,name:r.n,...runRoutine(r)}))});
AI_SKILLS.forEach(s=>{if(s.id==="ask"||s.id==="plan")s.tools.push("list_group_facts","list_learning_resources");if(s.id==="ask")s.tools.push("run_self_routines")});
function v17Boot(){
  ["#lsGroup","#lsVal"].forEach((id,i)=>{$(id).insertAdjacentHTML("beforeend",(i?VALENCE:LIFE_GROUPS).map(x=>`<option value="${x.k}">${esc(x.l)}</option>`).join(""))});
  ["#lsGroup","#lsVal","#lsGeo"].forEach(x=>$(x).addEventListener("change",renderLives));$("#lsQ").addEventListener("input",renderLives);renderLives();renderInter();
  const iv=$("#v-involve");if(iv&&!$("#iv-recognise")){const ref=$("#involve-sources")||null;const html=`<section class="block" id="iv-recognise" data-icon="award" data-label="Recognise and nominate"><div class="sechead"><span class="eyebrow">Beyond October</span><h2>Recognise and nominate</h2><p>Awards and recognition routes relevant to race equality and community work, checked against each organiser's page on 21 October 2026. Never choose an ethnicity-based category for someone: the nominee confirms it themselves.</p></div><div class="grid g3" id="rcAwards"></div><div class="card" style="margin-top:16px"><h3>${icon("clipboard")} How to nominate</h3><ol class="flow" id="rcSteps"></ol></div></section>`;ref?ref.insertAdjacentHTML("beforebegin",html):iv.insertAdjacentHTML("beforeend",html)}
  renderRecognise();
  ["#edNation","#edType"].forEach(x=>$(x).addEventListener("change",renderEdu));$("#edQ").addEventListener("input",renderEdu);renderEdu();
  $("#cmNation").addEventListener("change",renderComm);$("#cmQ").addEventListener("input",renderComm);renderComm();renderGames();
  $("#roAll").addEventListener("click",()=>{ROUTINES.forEach(runRoutine);renderRoutines();toast("All routines run")});
  $("#roReport").addEventListener("click",async()=>{runRoutine(ROUTINES.find(r=>r.id==="RT11"));const text=window.__selfreport||"";let d=null;try{d=await claude.use("downloads")}catch(e){}if(d){try{await d.save({filename:"bhm2026-self-report.md",data:text});toast("Saved")}catch(e){toast("Download cancelled")}}else{copyText(text);toast("Downloads are not available here: report copied")}});
  renderRoutines();addMotifs();renderBibliographies();try{renderTraceNav()}catch(e){}
  const go=()=>{try{renderDash()}catch(e){console.warn(e)}enhanceAll();revealSetup()};go();
  addEventListener("hashchange",()=>{if(location.hash==="#dash")setTimeout(()=>{try{renderDash()}catch(e){}},50);setTimeout(enhanceAll,60);syncMotionClass()});
  document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest("button,[role=tab],summary,a[href^='#']"))setTimeout(()=>{syncMotionClass();enhanceAll()},0)}); /* only clicks that can change content trigger a rescan */
  new MutationObserver(enhanceAll).observe($("main")||document.body,{childList:true,subtree:true})}
/* ---- inequalities, talent routes and networks ---- */
VIEW_ICONS.talent="ladder";
DATASETS.push(
 {k:"equity",n:"Inequalities",ic:"scale",arr:()=>EQUITY.flatMap(d=>d.ineq),id:x=>x.id,lab:x=>x.fig+" "+x.l,srcs:x=>x.src||[],view:"equity",href:x=>"#"+x.id,out:["pages","jsonld"],chk:["C75"]},
 {k:"equityact",n:"Actions on inequality",ic:"tool",arr:()=>EQUITY.flatMap(d=>d.actions),id:x=>x.id,lab:x=>x.n,srcs:x=>x.src||[],view:"equity",href:x=>"#"+x.id,out:["pages","jsonld"],chk:["C75"]},
 {k:"talent",n:"Recruitment and career routes",ic:"ladder",arr:()=>TALENT,id:x=>x.id,lab:x=>x.n,srcs:x=>x.src||[],view:"talent",href:x=>"#"+x.id,out:["pages","jsonld"],chk:["C76"]},
 {k:"networks2",n:"Networks to connect with",ic:"people",arr:()=>NETWORKS2,id:x=>x.id,lab:x=>x.n,srcs:x=>x.src||[],view:"talent",href:x=>"#"+x.id,out:["pages","jsonld"],chk:["C77"]});
const _addSearch17=addV15Search;addV15Search=function(add){_addSearch17(add);EQUITY.forEach(d=>{d.ineq.forEach(x=>add(x.fig+" "+d.l,"Inequality",x.l,"#"+x.id));d.actions.forEach(a=>add(a.n,"Action: "+d.l,a.what,"#"+a.id))});TALENT.forEach(t=>add(t.n,"Career route",t.what,"#"+t.id));NETWORKS2.forEach(n=>add(n.n,"Network",n.what,"#"+n.id))};
const _ld17=ldExtra;ldExtra=function(base){return[..._ld17(base),...EQUITY.flatMap(d=>d.ineq.map(x=>({"@type":"Observation","@id":base+x.id,"name":d.l,"value":x.fig,"description":x.l,"observationDate":x.per,"spatialCoverage":x.geo,"citation":(x.src||[]).filter(s=>SOURCES[s]).map(s=>SOURCES[s].u)}))),
  ...EQUITY.flatMap(d=>d.actions.map(a=>({"@type":"Action","@id":base+a.id,"name":a.n,"description":a.what,"actionStatus":a.status,"agent":{"@type":"Organization","name":(ACTORS.find(x=>x.k===a.actor)||{l:a.actor}).l}}))),
  ...TALENT.map(t=>({"@type":"EducationalOccupationalProgram","@id":base+t.id,"name":t.n,"provider":{"@type":"Organization","name":t.org},"description":t.what,"url":t.u})),...NETWORKS2.map(n=>({"@type":"Organization","@id":base+n.id,"name":n.n,"description":n.what,"url":n.u}))]};
REQS.push({id:"R49",t:"F",r:"Inequalities across domains, who is most affected, ways to prevent, detect, fix and remedy them, and what each sector is doing",o:"Requests 22 and 23",sat:["eq-overview","eq-who","eq-domains","eq-actions"],ver:["C75"]},
 {id:"R50",t:"F",r:"Recruitment, employment and career routes, and professional, academic, research and social networks",o:"Request 24",sat:["tn-routes","tn-networks"],ver:["C76","C77"]});
const _ctx18=ctxV15;ctxV15=function(){return{..._ctx18(),equity:EQUITY.map(d=>({k:d.k,ineq:d.ineq.map(x=>({...x,src:[...x.src],aff:[...(x.aff||[])]})),actions:d.actions.map(a=>({...a,src:[...a.src]})),levers:d.levers.map(l=>({...l,src:[...l.src]})),debate:d.debate.length,who:!!d.who})),
  talent:TALENT.map(t=>({...t,src:[...t.src]})),networks2:NETWORKS2.map(n=>({...n,src:[...n.src],offers:[...n.offers]}))}};
CHECKS.push(
 {id:"C75",n:"Every inequality domain gives sourced evidence, who is affected, ways to act and who is acting",run:c=>{const bad=c.equity.filter(d=>d.ineq.length<2||d.ineq.some(x=>!x.fig||!_okSrc(x.src)||x.aff.some(t=>!AFFECTED[t]))||d.actions.length<3||d.actions.some(a=>!ACTORS.some(x=>x.k===a.actor)||!_okSrc(a.src)||!a.ev)||d.levers.length<3||d.levers.some(l=>!LEVERS[l.type]||!_okSrc(l.src))||!d.debate);
   const actors=new Set(c.equity.flatMap(d=>d.actions.map(a=>a.actor)));return{ok:!bad.length&&c.equity.length>=10&&actors.size>=4,d:bad.length?"Incomplete: "+bad.map(b=>b.k).join(", "):`${c.equity.length} domains; ${c.equity.reduce((n,d)=>n+d.ineq.length,0)} inequalities; ${c.equity.reduce((n,d)=>n+d.actions.length,0)} actions by ${actors.size} kinds of organisation`}},
  breakIt:c=>{c.equity[0]={...c.equity[0],levers:[]};return c}},
 {id:"C76",n:"Every career route has its organiser, status, official page and a checked source",run:c=>{const bad=c.talent.filter(t=>!t.org||!t.status||!/^https:\/\//.test(t.u)||!_okSrc(t.src)||!TN_CATS[t.cat]);const cats=new Set(c.talent.map(t=>t.cat)).size;return{ok:!bad.length&&c.talent.length>=20&&cats>=6,d:bad.length?"Incomplete: "+bad.map(b=>b.id).join(", "):`${c.talent.length} routes across ${cats} kinds`}},
  breakIt:c=>{c.talent[0]={...c.talent[0],u:"http://x"};return c}},
 {id:"C77",n:"Every network has what it offers, an official page and a checked source",run:c=>{const bad=c.networks2.filter(n=>!n.offers.length||!/^https:\/\//.test(n.u)||!_okSrc(n.src)||!NW_CATS[n.cat]);const cats=new Set(c.networks2.map(n=>n.cat)).size;return{ok:!bad.length&&c.networks2.length>=20&&cats>=6,d:bad.length?"Incomplete: "+bad.map(b=>b.id).join(", "):`${c.networks2.length} networks across ${cats} kinds`}},
  breakIt:c=>{c.networks2[0]={...c.networks2[0],offers:[]};return c}});
AI_TOOLS.push({name:"list_inequalities",description:"List sourced inequalities by domain (health, care, education, housing, work, wealth, power, media, tech, policing, justice, immigration, strategy), who is most affected, and actions by government, public bodies, business, voluntary groups and industry.",inputSchema:{type:"object",properties:{domain:{type:"string"}}},
  execute:({domain})=>EQUITY.filter(d=>!domain||d.k===domain).map(d=>({domain:d.l,mostAffected:d.who&&d.who.t,inequalities:d.ineq.map(x=>({figure:x.fig,measures:x.l,period:x.per,where:x.geo,affected:x.aff,sources:x.src})),actions:d.actions.map(a=>({who:a.actor,name:a.n,status:a.status,working:a.ev})),levers:d.levers.map(l=>({type:l.type,text:l.t}))}))},
 {name:"list_talent_routes",description:"List checked recruitment and career routes and networks to connect with.",inputSchema:{type:"object",properties:{kind:{type:"string"}}},execute:({kind})=>[...TALENT.filter(t=>!kind||t.cat===kind).map(t=>({type:"route",name:t.n,org:t.org,status:t.status,url:t.u})),...NETWORKS2.filter(n=>!kind||n.cat===kind).map(n=>({type:"network",name:n.n,offers:n.offers,url:n.u}))]});
AI_SKILLS.forEach(s=>{if(s.id==="ask"||s.id==="plan")s.tools.push("list_inequalities","list_talent_routes")});
function v18Boot(){$("#eqActor").insertAdjacentHTML("beforeend",ACTORS.map(a=>`<option value="${a.k}">${esc(a.l)}</option>`).join(""));
  const tags=Object.keys(AFFECTED).filter(t=>EQUITY.some(d=>d.ineq.some(x=>(x.aff||[]).includes(t))));$("#eqGroup").insertAdjacentHTML("beforeend",tags.map(t=>`<option value="${t}">${esc(AFFECTED[t])}</option>`).join(""));
  ["#eqActor","#eqStatus","#eqGroup"].forEach(x=>$(x).addEventListener("change",renderEquity));renderEquity();
  ["#tnSector","#tnStage"].forEach(x=>$(x).addEventListener("change",renderTalent));$("#tnQ").addEventListener("input",renderTalent);renderTalent();
  $("#n2Offer").addEventListener("change",renderNetworks2);$("#n2Q").addEventListener("input",renderNetworks2);renderNetworks2();
  const am=$("#v-equity .block .sechead h2");if(am&&!am.nextElementSibling?.classList?.contains("motif"))am.insertAdjacentHTML("afterend",motifStrip(6));const tm=$("#v-talent .block .sechead h2");if(tm&&!tm.nextElementSibling?.classList?.contains("motif"))tm.insertAdjacentHTML("afterend",motifStrip(7));
  renderBibliographies();try{renderTraceNav();renderDash()}catch(e){}}
/* ---- leadership, funding, doctorates and research ---- */
DATASETS.push({k:"leadfund",n:"Leadership, funding and fellowships",ic:"award",arr:()=>LEADFUND,id:x=>x.id,lab:x=>x.n,srcs:x=>x.src||[],view:"talent",href:x=>"#"+x.id,out:["pages","jsonld"],chk:["C78"]},
 {k:"phd",n:"Doctoral routes",ic:"school",arr:()=>PHD,id:x=>x.id,lab:x=>x.n,srcs:x=>x.src||[],view:"talent",href:x=>"#"+x.id,out:["pages","jsonld"],chk:["C79"]});
const _addSearch18=addV15Search;addV15Search=function(add){_addSearch18(add);LEADFUND.forEach(x=>add(x.n,LEAD_K.includes(x.kind)?"Leadership":"Funding",x.what,"#"+x.id));PHD.forEach(x=>add(x.n,"Doctorate",x.what,"#"+x.id));RESEARCH_FIELDS.forEach(f=>add(f.l,"Research field","Centres, funders, data and evidence gaps","#tn-research"))};
const _ld18=ldExtra;ldExtra=function(base){return[..._ld18(base),...LEADFUND.map(x=>({"@type":LEAD_K.includes(x.kind)?"EducationalOccupationalProgram":"MonetaryGrant","@id":base+x.id,"name":x.n,"funder":{"@type":"Organization","name":x.org},"description":x.what,"url":x.u})),...PHD.map(x=>({"@type":"EducationalOccupationalProgram","@id":base+x.id,"name":x.n,"provider":{"@type":"Organization","name":x.org},"educationalLevel":"Doctoral","url":x.u}))]};
REQS.push({id:"R51",t:"F",r:"Schemes that raise representation in leadership and senior grades; grants, bursaries, scholarships, fellowships and secondments; doctoral routes and a research explorer",o:"Request 25",sat:["tn-lead","tn-research"],ver:["C78","C79"]});
const _ctx19=ctxV15;ctxV15=function(){return{..._ctx19(),leadfund:LEADFUND.map(x=>({...x,src:[...x.src]})),phd:PHD.map(x=>({...x,src:[...x.src]})),fields:RESEARCH_FIELDS.map(f=>({k:f.k,c:f.centres.length,f:f.funders.length,d:f.data.length,g:f.gaps.length,gs:f.gaps.every(g=>_okSrc(g.src))}))}};
CHECKS.push(
 {id:"C78",n:"Leadership schemes and funding routes each have an organiser, status, official page and checked source",run:c=>{const bad=c.leadfund.filter(x=>!x.org||!x.status||!/^https:\/\//.test(x.u)||!_okSrc(x.src)||!LF_KINDS[x.kind]);const L=c.leadfund.filter(x=>LEAD_K.includes(x.kind)).length,F=c.leadfund.length-L;
   return{ok:!bad.length&&L>=10&&F>=10,d:bad.length?"Incomplete: "+bad.map(b=>b.id).join(", "):`${L} leadership and representation schemes; ${F} grants, scholarships, fellowships and secondments`}},
  breakIt:c=>{c.leadfund=c.leadfund.filter(x=>!LEAD_K.includes(x.kind));return c}},
 {id:"C79",n:"Doctoral routes are sourced and every research field has centres, data and a sourced evidence gap",run:c=>{const bad=c.phd.filter(x=>!/^https:\/\//.test(x.u)||!_okSrc(x.src));const thin=c.fields.filter(f=>!f.c||!f.d||!f.g||!f.gs).map(f=>f.k);
   return{ok:!bad.length&&!thin.length&&c.phd.length>=8&&c.fields.length>=10,d:bad.length?"Unsourced: "+bad.map(b=>b.id).join(", "):thin.length?"Thin fields: "+thin.join(", "):`${c.phd.length} doctoral routes; ${c.fields.length} research fields`}},
  breakIt:c=>{c.fields[0]={...c.fields[0],g:0};return c}});
function v19Boot(){$$("#lfTabs [role=tab]").forEach(b=>{b.addEventListener("click",()=>{LF_MODE=b.dataset.m;$("#lfPanel").setAttribute("aria-labelledby",b.id);renderLeadFund()});
   b.addEventListener("keydown",e=>{const t=$$("#lfTabs [role=tab]");let i=-1;if(e.key==="ArrowRight"||e.key==="ArrowLeft")i=(t.indexOf(b)+(e.key==="ArrowRight"?1:-1)+t.length)%t.length;else if(e.key==="Home")i=0;else if(e.key==="End")i=t.length-1;if(i>=0){e.preventDefault();t[i].click();t[i].focus()}})});
  $("#lfLevel").addEventListener("change",renderLeadFund);$("#lfQ").addEventListener("input",renderLeadFund);renderLeadFund();renderResearch();renderBibliographies();try{renderTraceNav();renderDash()}catch(e){}}
BUILD_TESTS["D-028"]="A renderer threw on empty data and stopped every later start-up step, including the self-checks; start-up steps are now isolated and failures reported";
