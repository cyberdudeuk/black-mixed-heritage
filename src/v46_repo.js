/* ================= v2.21.0 FEATURES SUPPORTED BY THE REPOSITORY (D-127 to D-130) =================
   Four features that the public repository feeds and the hub shows. Each reads data that a workflow or the
   build wrote, checks every item before it is shown, and degrades to a link when the data is not there. */

/* ---------- 1. Community events (D-127): an accepted "Event for the calendar" issue becomes a reviewed pull
   request that adds the event to src/community-events.json; the build embeds the file as COMMUNITY_EVENTS. */
const CE_ISO=/^\d{4}-\d{2}-\d{2}$/;
function ceSafe(o){if(!o||typeof o!=="object")return null;const n=+o.issue;const t=String(o.t||"").replace(/\s+/g," ").trim();const w=String(o.where||"").replace(/\s+/g," ").trim();const u=String(o.url||"");
  if(!Number.isInteger(n)||n<1)return null;if(!t||t.length>120||/[<>]/.test(t)||w.length>80||/[<>]/.test(w))return null;
  if(!CE_ISO.test(o.s||"")||!CE_ISO.test(o.e||"")||o.e<o.s||!CE_ISO.test(o.accepted||""))return null;
  let url;try{url=new URL(u)}catch(e){return null}if(url.protocol!=="https:"||url.username||url.password)return null;
  if(/[\w.+-]+@[\w-]+\.[\w.-]+/.test(t+" "+w+" "+u))return null;
  return{issue:n,s:o.s,e:o.e,t,where:w,url:url.href,accepted:o.accepted}}
const CE_LIST=(typeof COMMUNITY_EVENTS!=="undefined"&&Array.isArray(COMMUNITY_EVENTS)?COMMUNITY_EVENTS:[]).map(ceSafe).filter(Boolean);
const CE_REJECTED=(typeof COMMUNITY_EVENTS!=="undefined"&&Array.isArray(COMMUNITY_EVENTS)?COMMUNITY_EVENTS.length:0)-CE_LIST.length;
CE_LIST.forEach(e=>{const sid=SRCU("Organiser's page: "+e.t,e.url,"Suggested on GitHub in issue "+e.issue+" and accepted at triage on "+e.accepted);if(SOURCES[sid])SOURCES[sid].rd=e.accepted;
  EXT_EVENTS.push({id:"c-"+e.issue,s:e.s,e:e.e,t:e.t,where:e.where,k:"event",src:sid,d:`Suggested by the community on GitHub (issue ${e.issue}).`})});

/* ---------- 2. Nomination deadlines in the calendar (D-128): every award or recognition route with a published
   deadline is a calendar entry, and the calendar file asks subscribers' calendars for reminders 14 and 2 days before. */
CAL_KINDS.deadline="Nomination deadlines";calShow.add("deadline");
const DEADLINES=(typeof AWARDS!=="undefined"?AWARDS:[]).filter(a=>a.dl&&CE_ISO.test(a.dl)).map(a=>({id:"dl-"+a.id,s:a.dl,e:a.dl,t:"Nomination deadline: "+a.n,where:a.org||"",k:"deadline",src:(a.src||[])[0]||null,d:"Last day to nominate or enter. "+(a.how||"")}));
DEADLINES.forEach(d=>EXT_EVENTS.push(d));
const _icsBase=ics;ics=function(list){const t=_icsBase(list);const ids=new Set(list.filter(e=>e.k==="deadline").map(e=>e.id+"@bhm2026-hub"));if(!ids.size)return t;
  const out=[];let inDl=false;t.split("\r\n").forEach(l=>{if(l.startsWith("UID:"))inDl=ids.has(l.slice(4));
    if(l==="END:VEVENT"&&inDl){["P14D","P2D"].forEach(p=>out.push("BEGIN:VALARM","ACTION:DISPLAY","DESCRIPTION:Nomination deadline coming up","TRIGGER:-"+p,"END:VALARM"));inDl=false}out.push(l)});return out.join("\r\n")};

/* ---------- 3. Source freshness (D-129): every source has a read date; it is due to be read again 12 months later. */
function srcRead(s){const d=Date.parse(s&&s.rd||SOURCE_CHECK||"");return isNaN(d)?null:d}
function freshness(now){now=now||Date.now();const Y=365*864e5,M3=91*864e5;const rows=Object.entries(SOURCES).filter(([k,s])=>/^S\d+$/.test(k)&&s&&s.u).map(([k,s])=>{const r=srcRead(s);const due=r===null?null:r+Y;
    const band=due===null?"unknown":due<now?"overdue":due-now<M3?"soon":"ok";return{k,t:s.t,u:s.u,r,due,band}});
  const n=b=>rows.filter(x=>x.band===b).length;return{rows,ok:n("ok"),soon:n("soon"),overdue:n("overdue"),unknown:n("unknown")}}
const FR_BAND={overdue:"Overdue",soon:"Due within 3 months",ok:"Read within the last 9 months",unknown:"No read date"};
function renderFreshness(){const host=$("#frBody"),sum=$("#frSummary"),sel=$("#frBand");if(!host||!sum)return;const f=freshness();
  const next=f.rows.filter(r=>r.due).sort((a,b)=>a.due-b.due)[0];const dstr=t=>new Date(t).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
  const FR_IC={overdue:"info",soon:"clock",ok:"shield",unknown:"info"};sum.innerHTML=["overdue","soon","ok","unknown"].map(b=>kpi(f[b].toLocaleString("en-GB"),FR_BAND[b],FR_IC[b])).join("");
  $("#frNote").textContent=`${f.rows.length.toLocaleString("en-GB")} sources. Each is due to be read again 12 months after it was last read.`+(next?` The next re-read falls due on ${dstr(next.due)}.`:"")+` Re-reading is part of the monthly routine; the repository's monthly checklist lists the sources falling due.`;
  const want=sel?sel.value:"due";let list=f.rows.filter(r=>want==="all"?true:want==="due"?(r.band==="overdue"||r.band==="soon"||r.band==="unknown"):r.band===want);
  list=list.sort((a,b)=>(a.due||0)-(b.due||0)).slice(0,60);
  host.innerHTML=list.length?list.map(r=>`<tr><td class="mono">${r.k}</td><td><a href="${esc(r.u)}" target="_blank" rel="noopener">${esc(r.t)}<span class="vh"> (opens in a new tab)</span></a></td><td>${r.r?dstr(r.r):"Not recorded"}</td><td>${r.due?dstr(r.due):"Now"}</td><td>${FR_BAND[r.band]}</td></tr>`).join(""):`<tr><td colspan="5">No sources in this group. ${want==="due"?"Nothing is due for re-reading in the next three months.":""}</td></tr>`;
  $("#frShown").textContent=list.length?`Showing ${list.length} of ${f.rows.filter(r=>want==="all"||(want==="due"?r.band!=="ok":r.band===want)).length}, earliest due first.`:"";
  window.__fresh=f}

/* ---------- 4. Repository checks on the Assurance page (D-130): the Pages workflow publishes checks.json with the
   latest result of each repository workflow on main; the hub shows it, checking every field first. */
const CI_WORKFLOWS=["Checks","CodeQL","Scorecard","Website health","Monthly link check","Release"];
const CI_RESULT={success:["Passed","check"],failure:["Failed","flag"],cancelled:["Cancelled","info"],skipped:["Skipped","info"],neutral:["Neutral","info"],timed_out:["Timed out","flag"],action_required:["Needs action","flag"],startup_failure:["Failed to start","flag"],in_progress:["Running","clock"],queued:["Queued","clock"]};
function ciSafe(o){if(!o||typeof o!=="object")return null;const w=String(o.workflow||"");if(!CI_WORKFLOWS.includes(w))return null;
  const res=CI_RESULT[o.conclusion]?o.conclusion:(o.status==="in_progress"||o.status==="queued")?o.status:null;if(!res)return null;
  const u=String(o.url||"");if(!new RegExp("^"+REPO_URL.replace(/[.*+?^${}()|[\]\\/]/g,"\\$&")+"/actions/runs/\\d+$").test(u))return null;
  const when=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(o.when||"")?String(o.when).slice(0,16).replace("T"," "):"";
  const jobs=(Array.isArray(o.jobs)?o.jobs:[]).slice(0,12).map(j=>({n:String(j&&j.name||"").replace(/[^\w .()-]/g,"").slice(0,60),r:CI_RESULT[j&&j.conclusion]?j.conclusion:"in_progress"})).filter(j=>j.n);
  const sha=/^[0-9a-f]{7,40}$/.test(o.sha||"")?String(o.sha).slice(0,7):"";return{w,res,u,when,jobs,sha}}
const CIFEED={rows:[],when:"",state:"loading"};
async function loadCI(){if(window.__HOST==="pages"&&(location.protocol==="https:"||location.hostname==="localhost")){try{const r=await fetch("checks.json",{cache:"no-store"});if(r.ok){const d=await r.json();
      CIFEED.rows=(Array.isArray(d.runs)?d.runs:[]).map(ciSafe).filter(Boolean);CIFEED.when=String(d.generated||"").slice(0,16).replace("T"," ");CIFEED.state="ok";renderCI();return}}catch(e){}}
  CIFEED.state="none";renderCI()}
function renderCI(){const host=$("#ciBody"),st=$("#ciState");if(!host||!st)return;
  if(CIFEED.state==="loading"){st.textContent="Loading the latest repository checks.";return}
  if(CIFEED.state==="none"||!CIFEED.rows.length){host.innerHTML="";st.innerHTML=`The latest repository checks are shown here on the hub's website. <a href="${REPO_URL}/actions" target="_blank" rel="noopener">See every workflow run on GitHub<span class="vh"> (opens in a new tab)</span></a>.`;return}
  const failing=CIFEED.rows.filter(r=>CI_RESULT[r.res][1]==="flag").length;
  st.textContent=`${CIFEED.rows.length} workflows on the main branch${failing?`, ${failing} needing attention`:", none failing"}${CIFEED.when?`. Updated ${CIFEED.when} UTC`:""}.`;
  host.innerHTML=CIFEED.rows.map(r=>`<tr><td><b>${esc(r.w)}</b></td><td><span class="ciresult ci-${CI_RESULT[r.res][1]}">${icon(CI_RESULT[r.res][1])} ${CI_RESULT[r.res][0]}</span></td><td>${esc(r.when)}${r.sha?` <span class="mono muted">${r.sha}</span>`:""}</td><td>${r.jobs.map(j=>`${esc(j.n)}: ${CI_RESULT[j.r][0].toLowerCase()}`).join("; ")||"—"}</td><td><a href="${r.u}" target="_blank" rel="noopener">View the run<span class="vh"> for ${esc(r.w)} (opens in a new tab)</span></a></td></tr>`).join("");
  window.__ci=CIFEED.rows.length}

/* ---------- audits and checks ---------- */
function repoAudit(){const bad=[];
  [["ok",{issue:21,s:"2027-02-03",e:"2027-02-03",t:"Community film night",where:"Leeds",url:"https://example.org/film",accepted:"2026-10-26"}],
   ["bad",{issue:21,s:"2027-02-03",e:"2027-02-01",t:"x",url:"https://example.org",accepted:"2026-10-26"}],
   ["bad",{issue:22,s:"2027-02-03",e:"2027-02-03",t:"<img src=x onerror=alert(1)>",url:"https://example.org",accepted:"2026-10-26"}],
   ["bad",{issue:23,s:"2027-02-03",e:"2027-02-03",t:"Talk",url:"javascript:alert(1)",accepted:"2026-10-26"}],
   ["bad",{issue:24,s:"2027-02-03",e:"2027-02-03",t:"Talk",url:"http://example.org",accepted:"2026-10-26"}],
   ["bad",{issue:25,s:"2027-02-03",e:"2027-02-03",t:"Talk, contact someone@example.org",url:"https://example.org",accepted:"2026-10-26"}]]
   .forEach(([want,o],i)=>{const r=ceSafe(o);if(want==="ok"&&!r)bad.push("a valid community event is rejected");if(want==="bad"&&r)bad.push("unsafe community event "+(i+1)+" is accepted")});
  let cal=[];try{cal=calEvents()}catch(e){bad.push("calendar could not be built")}
  CE_LIST.forEach(e=>{const c=cal.find(x=>x.id==="c-"+e.issue);if(!c)bad.push("community event "+e.issue+" missing from the calendar");else if(!c.src||!SOURCES[c.src]||SOURCES[c.src].u!==e.url)bad.push("community event "+e.issue+" has no source")});
  if(CE_REJECTED>0)bad.push(CE_REJECTED+" community event(s) in the data failed checks");
  DEADLINES.forEach(d=>{if(!cal.some(x=>x.id===d.id))bad.push(d.id+" missing from the calendar")});
  const t=ics(DEADLINES.slice(0,1));if(DEADLINES.length&&!(t.includes("BEGIN:VALARM")&&t.includes("TRIGGER:-P14D")&&(t.match(/BEGIN:VALARM/g)||[]).length===(t.match(/END:VALARM/g)||[]).length))bad.push("deadline reminders missing from the calendar file");
  const plain=ics(cal.filter(e=>e.k!=="deadline").slice(0,3));if(plain.includes("VALARM"))bad.push("reminders added to events that are not deadlines");
  [["ok",{workflow:"Checks",conclusion:"success",url:REPO_URL+"/actions/runs/123",when:"2026-10-26T09:00:00Z",jobs:[{name:"privacy",conclusion:"success"}]}],
   ["bad",{workflow:"Checks",conclusion:"success",url:"https://example.com/actions/runs/1"}],["bad",{workflow:"Unknown",conclusion:"success",url:REPO_URL+"/actions/runs/1"}],
   ["bad",{workflow:"Checks",conclusion:"<b>",url:REPO_URL+"/actions/runs/1"}],["bad",{workflow:"Checks",conclusion:"success",url:"javascript:alert(1)"}]]
   .forEach(([want,o],i)=>{const r=ciSafe(o);if(want==="ok"&&!r)bad.push("a valid workflow result is rejected");if(want==="bad"&&r)bad.push("unsafe workflow result "+(i+1)+" is accepted")});
  const f=freshness(Date.parse("2026-10-26"));if(f.rows.length<100)bad.push("freshness report covers only "+f.rows.length+" sources");
  const f2=freshness(Date.parse("2028-01-01"));if(f2.overdue<f2.rows.length-f2.unknown)bad.push("freshness report does not flag sources read over 12 months ago");
  return{bad,ce:CE_LIST.length,dl:DEADLINES.length,fresh:f}}
CHECKS.push({id:"C164",n:"Community events, nomination deadlines, source freshness and repository check results are complete and safe (D-127 to D-130)",run:c=>({ok:!c.repo.bad.length,d:c.repo.bad.length?"Problems: "+c.repo.bad.slice(0,4).join("; "):`${c.repo.ce} community event${c.repo.ce===1?"":"s"} and ${c.repo.dl} nomination deadlines in the calendar, with reminders 14 and 2 days before each deadline; ${c.repo.fresh.rows.length.toLocaleString("en-GB")} sources dated for re-reading; unsafe events and workflow results are rejected in 9 tests`}),
  breakIt:c=>{c.repo={...c.repo,bad:["unsafe community event 3 is accepted"]};return c}});
BUILD_TESTS["D-127"]="Calendar suggestions arrived as GitHub issues but reached the calendar only if a maintainer copied them by hand. An accepted event issue now opens a pull request that adds the event, with its organiser's page as the source, and the hub checks every community event before showing it";
BUILD_TESTS["D-128"]="Award and nomination deadlines were listed on the recognition pages but not in the calendar, so people subscribed to the calendar got no warning. Each published deadline is now a calendar entry with reminders 14 and 2 days before";
BUILD_TESTS["D-129"]="The staleness routine counted old sources but nobody could see which ones fell due, or when. The Assurance page now lists every source with its read date and the date it is due to be read again, and the repository's monthly checklist names the sources falling due";
BUILD_TESTS["D-130"]="The checks that run on every change to the repository were visible only on GitHub. The Assurance page now shows the latest result of each repository workflow, from a file the website workflow publishes, with every field checked before it is shown";
REQS.push({id:"R90",t:"F",r:"Portal features connected to, linked to or supported by the repository (MoSCoW 'Should' items): event suggestions into the calendar, nomination deadline reminders, source freshness report, repository check results, a release feed, a public volunteer route and Discussions",o:"Request 69",sat:["cal-month","as-ci","as-fresh","su-github","su-eoi"],ver:["C164"]});
const _ctx90=ctxV15;ctxV15=function(){const c=_ctx90();c.repo=repoAudit();return c};
function v46Boot(){const b=$("#frBand");if(b)b.addEventListener("change",renderFreshness);renderFreshness();(window.requestIdleCallback||setTimeout)(()=>loadCI(),{timeout:3000})}
