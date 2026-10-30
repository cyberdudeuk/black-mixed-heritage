/* ================= v2.27.0 IF YOU ARE TREATED UNFAIRLY (R104, D-149) =================
   A page on reporting, escalating and putting right unfair treatment or discrimination during recruitment and at work,
   with an escalation ladder (FT_LADDERS, from ft-ladders.json, each step checked by an independent reviewer). */
const NEW27=[["fairtreat","If you are treated unfairly"]].filter(([id])=>typeof LP!=="undefined"&&LP[id]&&document.getElementById("v-"+id));VIEWS.push(...NEW27);
(function(){if(!NEW27.length)return;const g=NAV_ORDER_V21.find(x=>x.g==="Careers");if(g&&!g.items.includes("fairtreat"))g.items.splice(g.items.indexOf("joining")+1,0,"fairtreat");applyNavV21()})();
VIEW_ICONS.fairtreat="scale";LABEL_V21.fairtreat="If you are treated unfairly";
NEW27.forEach(([id])=>{PK_CONTENT.push(id);RP_NEW.push(id)});
RELATED_V21.push(["fairtreat","joining"],["fairtreat","involve"],["fairtreat","careers"],["fairtreat","networks"],["joining","fairtreat"]);
(function(){const c=CLUSTERS.find(x=>x.id==="careers");if(c&&NEW27.length&&!c.pages.some(p=>p[0]==="fairtreat"))c.pages.splice(1,0,["fairtreat","unfair treatment or discrimination: who to tell, escalation, time limits and records"])})();
function ftLadder(list,title,id){const steps=(typeof FT_LADDERS!=="undefined"&&FT_LADDERS[list])||[];
  return `<div class="ftlad" id="${id}"><h3>${esc(title)}</h3><ol class="ftsteps">${steps.map((s,i)=>`<li><span class="ftn" aria-hidden="true">${i+1}</span><div><p class="ftst"><b>${esc(s.step)}</b></p><dl class="ftdl"><dt>Who</dt><dd>${esc(s.who)}</dd><dt>When</dt><dd>${esc(s.when)}</dd><dt>Time limit</dt><dd>${esc(s.time_limit)}</dd></dl><p class="muted">Source: <a href="${esc(s.src_url)}" target="_blank" rel="noopener">${esc(new URL(s.src_url).hostname.replace(/^www\./,""))}<span class="vh"> (opens in a new tab)</span></a></p></div></li>`).join("")}</ol></div>`}
function ftRender(){const el=$("#ftLadders");if(!el)return;el.innerHTML=`<div class="tabs" role="tablist" aria-label="Escalation ladders"><button type="button" role="tab" class="btn" id="ftTabR" aria-selected="true" aria-controls="ftLadR">During recruitment</button> <button type="button" role="tab" class="btn" id="ftTabW" aria-selected="false" aria-controls="ftLadW" tabindex="-1">While you are working</button></div>`
  +`<div role="tabpanel" id="ftLadR" aria-labelledby="ftTabR">${ftLadder("ladder","Steps if it happens during recruitment","ftR")}</div><div role="tabpanel" id="ftLadW" aria-labelledby="ftTabW" hidden>${ftLadder("ladder_work","Steps if it happens while you are working","ftW")}</div>`;
  const tabs=[$("#ftTabR"),$("#ftTabW")],pans=[$("#ftLadR"),$("#ftLadW")];const sel=i=>{tabs.forEach((t,j)=>{t.setAttribute("aria-selected",String(i===j));t.tabIndex=i===j?0:-1;pans[j].hidden=i!==j})};
  tabs.forEach((t,i)=>{t.addEventListener("click",()=>sel(i));t.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){const n=(i+1)%2;sel(n);tabs[n].focus();e.preventDefault()}})})}
function ftAudit(){const bad=[];const L=typeof FT_LADDERS!=="undefined"?FT_LADDERS:{};
  ["ladder","ladder_work"].forEach(k=>{const s=L[k]||[];if(s.length<5)bad.push(`${k} has ${s.length} steps`);s.forEach(x=>{["step","who","when","time_limit"].forEach(f=>{if(!x[f])bad.push(`${k}: "${x.step}" lacks ${f}`)});if(!/^https:\/\//.test(x.src_url||""))bad.push(`${k}: "${x.step}" lacks an https source`)})});
  const tl=JSON.stringify(L)+" "+(typeof LP!=="undefined"&&LP.fairtreat?JSON.stringify(LP.fairtreat.sections):"");
  if(!/6 months minus 1 day/.test(tl)||!/1 October 2026/.test(tl))bad.push("the Great Britain tribunal time limit for problems from 1 October 2026 is missing");
  if(!/Northern Ireland/.test(tl))bad.push("Northern Ireland routes are missing");
  if(!$("#ftLadders .ftsteps li"))bad.push("ladder not drawn");if(!NEW27.length)bad.push("page not registered");return bad}
CHECKS.push({id:"C174",n:"The unfair-treatment page gives both escalation ladders with who, when, time limit and a source for every step, the current Great Britain tribunal time limit, and the Northern Ireland routes (D-149)",
  run:c=>({ok:!c.ft.length,d:c.ft.length?c.ft.slice(0,4).join("; "):`${(FT_LADDERS.ladder||[]).length} recruitment steps and ${(FT_LADDERS.ladder_work||[]).length} workplace steps, each sourced`}),
  breakIt:c=>{c.ft=["ladder: a step lacks time_limit"];return c}});
BUILD_TESTS["D-149"]="People asked where to turn if they met unfair treatment or discrimination during recruitment or at work. The hub's Stand up and speak up section gave time limits but not the order of routes, who hears what, or the Northern Ireland differences. The new page sets them out with an escalation ladder, and C174 fails if a step loses its time limit or source, or the current tribunal time limit or Northern Ireland routes go missing";
REQS.push({id:"R104",t:"F",r:"If unfair treatment or discrimination surfaces during recruitment or employment: routes to notify, report, escalate and get redress, with time limits, across the four nations",o:"Request 76",sat:["ft-rdrecruit","ft-rdwork","ft-rdexternal","ft-rdevidence","ft-ladder"],ver:["C174"]});
const _ctx100=ctxV15;ctxV15=function(){const c=_ctx100();c.ft=ftAudit();return c};
let v55Boot=function(){ftRender()};

/* ================= v2.27.0 TARGETS, COMMITMENTS AND ALLYSHIP IN FOR LEADERS (R105, D-150) =================
   The For leaders page held 543 words. It now carries the targets and commitments for 2026-27 and 2027-28, what to
   press for, what sponsorship and allyship involve, and a prioritised list of actions (TG_MOSCOW, each item checked
   by an independent reviewer, with priorities that follow their stated basis). */
const MOSCOW_ORDER=["Must","Should","Could","Won't (this year)"];
function tgRender(){const el=$("#tgMoscow");if(!el||typeof TG_MOSCOW==="undefined")return;const whos=[...new Set(TG_MOSCOW.items.map(x=>x.who))];
  el.innerHTML=`<p class="muted">${esc(TG_MOSCOW.note)}</p><div class="chiprow" role="group" aria-label="Show actions for" id="tgWho"><button type="button" class="btn" data-w="" aria-pressed="true">Everyone</button>${whos.map(w=>`<button type="button" class="btn" data-w="${esc(w)}" aria-pressed="false">${esc(w)} <span class="muted">(${TG_MOSCOW.items.filter(x=>x.who===w).length})</span></button>`).join("")}</div><div id="tgList"></div>`;
  const draw=w=>{$("#tgList").innerHTML=MOSCOW_ORDER.map(pr=>{const it=TG_MOSCOW.items.filter(x=>x.priority===pr&&(!w||x.who===w));if(!it.length)return"";
    return `<h3 class="tgpr tg-${pr[0].toLowerCase()}">${esc(pr)} <span class="muted">(${it.length})</span></h3><div class="tablewrap"><table class="tgtable"><caption class="vh">${esc(pr)} actions</caption><thead><tr><th scope="col">Action</th><th scope="col">Who</th><th scope="col">When</th><th scope="col">Basis</th></tr></thead><tbody>${it.map(x=>`<tr><td>${esc(x.action)}</td><td>${esc(x.who)}</td><td>${esc(x.when)}</td><td>${esc(x.basis)} <a href="${esc(x.src_url)}" target="_blank" rel="noopener">Source<span class="vh"> for ${esc(x.action.slice(0,40))} (opens in a new tab)</span></a></td></tr>`).join("")}</tbody></table></div>`}).join("")};
  $("#tgWho").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;_qa($("#tgWho"),"button").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));draw(b.dataset.w)});draw("")}
function tgAudit(){const bad=[];if(typeof TG_MOSCOW==="undefined")return["no prioritised actions"];const it=TG_MOSCOW.items;
  if(!/hub's own reading/.test(TG_MOSCOW.note||""))bad.push("the note does not say the prioritisation is the hub's own reading");
  it.forEach(x=>{if(!MOSCOW_ORDER.includes(x.priority))bad.push("unknown priority "+x.priority);if(!/^https:\/\//.test(x.src_url||""))bad.push("no https source: "+x.action.slice(0,40));if(!x.basis||!x.when||!x.who)bad.push("incomplete: "+x.action.slice(0,40));
    if(x.priority==="Must"&&!/duty|law|Act|Regulations|commit|required|statutory|Code/i.test(x.basis))bad.push("a Must without a duty or commitment: "+x.action.slice(0,40))});
  MOSCOW_ORDER.forEach(p=>{if(!it.some(x=>x.priority===p))bad.push("no "+p+" items")});
  if(!$("#tgList table"))bad.push("list not drawn");return bad}
CHECKS.push({id:"C175",n:"Every prioritised action has a who, when, basis and https source, every Must rests on a duty or published commitment, and the list says the ranking is the hub's own reading (D-150)",
  run:c=>({ok:!c.tg.length,d:c.tg.length?c.tg.slice(0,4).join("; "):MOSCOW_ORDER.map(p=>`${TG_MOSCOW.items.filter(x=>x.priority===p).length} ${p}`).join(", ")}),
  breakIt:c=>{c.tg=["a Must without a duty or commitment: test"];return c}});
BUILD_TESTS["D-150"]="The For leaders page gave eight actions and a 2025 statistic, but no targets or commitments for the year ahead and nothing on what sponsorship and allyship require. It now holds 31 sourced points and a prioritised list of 23 actions, and C175 fails if an action loses its source or basis, or a Must does not rest on a duty or published commitment";
REQS.push({id:"R105",t:"F",r:"Targets for organisations, what communities and networks should press for in 2026-27 and 2027-28, and what visible sponsorship, allyship and leading by example require, prioritised as Must, Should, Could and Won't",o:"Request 76",sat:["tg-tgcs","tg-tgdept","tg-tgwider","tg-tgadvocate","tg-tgally","ld-moscow"],ver:["C175"]});
const _ctx101=ctxV15;ctxV15=function(){const c=_ctx101();c.tg=tgAudit();return c};
const _v55b1=v55Boot;v55Boot=function(){_v55b1();tgRender()};

/* ================= v2.27.0 TAKING PART IN PUBLIC LIFE (R106, D-151) =================
   How to take part in government and public institutions at every level, during and after education, in holidays and
   gap years, with a finder by stage and nation (PA_STAGES, each option checked by an independent reviewer). */
const NEW27b=[["participate","Taking part in public life"]].filter(([id])=>typeof LP!=="undefined"&&LP[id]&&document.getElementById("v-"+id));VIEWS.push(...NEW27b);
(function(){if(!NEW27b.length)return;const g=NAV_ORDER_V21.find(x=>x.g==="Lead");if(g&&!g.items.includes("participate"))g.items.splice(Math.max(0,g.items.indexOf("younglives")+1),0,"participate");applyNavV21()})();
VIEW_ICONS.participate="people";LABEL_V21.participate="Taking part in public life";
NEW27b.forEach(([id])=>{PK_CONTENT.push(id);RP_NEW.push(id)});
RELATED_V21.push(["participate","younglives"],["participate","involve"],["participate","joining"],["participate","represent"],["younglives","participate"],["involve","participate"]);
(function(){const c=CLUSTERS.find(x=>x.id==="lead");if(c&&NEW27b.length&&!c.pages.some(p=>p[0]==="participate"))c.pages.splice(c.pages.findIndex(p=>p[0]==="younglives")+1,0,["participate","taking part in public life: youth parliaments, voting, volunteering and placements, at any age"])})();
const PA_STAGE_ORDER=["At school (11-16)","16-18 and college","University","Gap year or after education","Holidays and half-term","Any age (adults)"];
const PA_NATIONS=["England","Scotland","Wales","Northern Ireland"];
function paMatchNation(n,sel){return !sel||/^UK\b/.test(n)||n.includes(sel)}
function paRender(){const el=$("#ypFinder");if(!el||typeof PA_STAGES==="undefined")return;
  el.innerHTML=`<div class="filters row"><label>Stage of life <select id="ypStage"><option value="">Every stage</option>${PA_STAGE_ORDER.filter(s=>PA_STAGES.some(x=>x.stage===s)).map(s=>`<option>${esc(s)}</option>`).join("")}</select></label> <label>Where you live <select id="ypNation"><option value="">Anywhere in the UK</option>${PA_NATIONS.map(n=>`<option>${esc(n)}</option>`).join("")}</select></label></div><p class="mono muted" id="ypN" aria-live="polite"></p><div id="ypOut"></div>`;
  const draw=()=>{const st=$("#ypStage").value,na=$("#ypNation").value;const it=PA_STAGES.filter(x=>(!st||x.stage===st)&&paMatchNation(x.nation,na));$("#ypN").textContent=`${it.length} ways to take part`;
    $("#ypOut").innerHTML=PA_STAGE_ORDER.map(s=>{const g=it.filter(x=>x.stage===s);if(!g.length)return"";return `<h3>${esc(s)}</h3><ul class="palist">${g.map(x=>`<li><b>${esc(x.option)}</b> <span class="chip">${esc(x.min_age==null||x.min_age===""?"No minimum age given":String(x.min_age).match(/^\d+$/)?"From age "+x.min_age:x.min_age)}</span> <span class="chip">${esc(x.nation)}</span> <a href="${esc(x.src_url)}" target="_blank" rel="noopener">Source<span class="vh"> for ${esc(x.option)} (opens in a new tab)</span></a></li>`).join("")}</ul>`}).join("")||`<p class="muted">Nothing listed for that combination; try every stage.</p>`};
  $("#ypStage").addEventListener("change",draw);$("#ypNation").addEventListener("change",draw);draw()}
function paAudit(){const bad=[];if(typeof PA_STAGES==="undefined")return["no stage data"];
  PA_STAGES.forEach(x=>{if(!PA_STAGE_ORDER.includes(x.stage))bad.push("unknown stage "+x.stage);if(!/^https:\/\//.test(x.src_url||""))bad.push("no https source: "+x.option);if(!("min_age" in x))bad.push("no age field: "+x.option);if(!x.nation)bad.push("no nation: "+x.option)});
  PA_STAGE_ORDER.forEach(s=>{if(!PA_STAGES.some(x=>x.stage===s))bad.push("nothing for "+s)});
  PA_NATIONS.forEach(n=>{if(!PA_STAGES.some(x=>x.nation.includes(n)&&!/^UK\b/.test(x.nation)))bad.push("no nation-specific option for "+n)});
  const txt=typeof LP!=="undefined"&&LP.participate?JSON.stringify(LP.participate.sections):"";if(!/National Citizen Service/.test(txt)||!/closed/.test(txt))bad.push("the closure of National Citizen Service is not stated");
  if(!$("#ypOut li"))bad.push("finder not drawn");return bad}
CHECKS.push({id:"C176",n:"Every way to take part has a stage, minimum age, nation and https source; every stage of life and every nation has options; and closed programmes are named as closed (D-151)",
  run:c=>({ok:!c.ypa.length,d:c.ypa.length?c.ypa.slice(0,4).join("; "):`${PA_STAGES.length} ways to take part across ${PA_STAGE_ORDER.length} stages of life and four nations`}),
  breakIt:c=>{c.ypa=["nothing for University"];return c}});
BUILD_TESTS["D-151"]="People asked how to get involved in government and public institutions during and after education, in gap years and holidays. The hub's Taking part in public life page covered Black History Month roles only. The new page sets out youth parliaments, voting and petitions, public service and volunteering, placements and holiday options in each nation, with a finder; C176 fails if an option loses its age, nation or source, a stage or nation has nothing, or a closed programme is shown as open";
REQS.push({id:"R106",t:"F",r:"How to get involved, engage and participate in government and public institutions at all levels, during formal education, after it, in gap years and in half-term and holidays, across the four nations",o:"Request 77",sat:["yp-pavoice","yp-padem","yp-paservice","yp-paeducation","yp-paholiday","yp-parepresent","yp-finder"],ver:["C176"]});
const _ctx102=ctxV15;ctxV15=function(){const c=_ctx102();c.ypa=paAudit();return c};
const _v55b2=v55Boot;v55Boot=function(){_v55b2();paRender()};
BUILD_TESTS["D-152"]="The build guard that stops two checks sharing an evidence key (D-135) never read the main list of files: it split the build script on a marker that also appears in its own line, so it saw only the newest files. A new check reused the key 'pa' and silently replaced the partners evidence, failing C97 and C98. The guard now reads every file the build loads, refuses to run if it sees fewer than 40, and was shown to catch the clash when it was put back";
BUILD_TESTS["D-153"]="In the single-file edition, which opens without a doctype when run on its own, gathering the evidence for every check took about 3.3 seconds on a phone-width test and failed C108. Profiling showed most of the time went on \"#id\" lookups, which scan the whole page in that mode. Plain id lookups now go straight to the element: the same gathering took about 1.5 seconds under the same load, and C108 passes on both editions.";
