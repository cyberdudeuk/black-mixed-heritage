/* ================= v2.22.0 CONTRIBUTORS, CHAMPIONS AND RECOGNITION (D-132 to D-134) =================
   Everything here is opt-in and holds no personal data: contributors add themselves by pull request; the
   contribution record is made in the reader's own browser and never leaves it unless they save it. */

/* ---------- two more volunteer roles: champions and ambassadors, and field review panels ---------- */
SU_ROLES.push(
 {id:"champions",n:"Champions and ambassadors",ic:"megaphone",lvl:"light",h:[1,2],per:"month",n_:20,who:"One in each department, organisation, profession or staff network; no special knowledge needed.",
  do:["Share the hub where colleagues will see it, using the champion pack","Add the Teams tab and the calendar for your team","Pass on ideas, corrections and events from colleagues","Post a short highlight each quarter"],skills:["comms","community"]},
 {id:"panels",n:"Field review panels",ic:"scale",lvl:"light",h:[2,3],per:"quarter",n_:24,who:"Practitioners in a field the hub covers thinly: policy, service, content or data design; engineering and architecture; sport; health; law; the arts; Mixed-heritage reviewers.",
  do:["Review the points in your field for accuracy and balance","Suggest sources and missing topics","Check that people in your field are described fairly"],skills:["subject","research"]});

/* ---------- contributors who chose to be named (src/contributors.json, added by pull request) ---------- */
const CONTRIB_ROLE_IDS=()=>new Set(SU_ROLES.map(r=>r.id).concat(["code","content","review","translation","design"]));
function contribSafe(o){if(!o||typeof o!=="object")return null;const name=String(o.name||"").trim();
  if(!(name==="Anonymous"||/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(name)))return null;
  const ok=CONTRIB_ROLE_IDS();const roles=(Array.isArray(o.roles)?o.roles:[]).map(String).filter(r=>ok.has(r)).slice(0,6);if(!roles.length)return null;
  const since=/^\d{4}-\d{2}$/.test(o.since||"")?o.since:"";return{name,roles,since}}
const CONTRIBUTORS_OK=(typeof CONTRIBUTORS!=="undefined"&&Array.isArray(CONTRIBUTORS)?CONTRIBUTORS:[]).map(contribSafe).filter(Boolean);
const CONTRIB_REJECTED=(typeof CONTRIBUTORS!=="undefined"&&Array.isArray(CONTRIBUTORS)?CONTRIBUTORS.length:0)-CONTRIBUTORS_OK.length;
const CONTRIB_ROLE_NAME=k=>(SU_ROLES.find(r=>r.id===k)||{n:{code:"Code",content:"Content",review:"Review",translation:"Translation",design:"Design"}[k]||k}).n;
function renderContributors(){const host=$("#thContrib");if(!host)return;
  host.innerHTML=CONTRIBUTORS_OK.length?`<ul class="contriblist">${CONTRIBUTORS_OK.map(c=>`<li>${c.name==="Anonymous"?"<span>A contributor who prefers not to be named</span>":`<a href="https://github.com/${c.name}" target="_blank" rel="noopener">@${esc(c.name)}<span class="vh"> on GitHub (opens in a new tab)</span></a>`} <span class="muted">· ${c.roles.map(r=>esc(CONTRIB_ROLE_NAME(r))).join(", ")}${c.since?" · since "+esc(c.since):""}</span></li>`).join("")}</ul>`
    :`<p>No one has added themselves yet. Contributors are named here only if they choose to be: <a href="${REPO_URL}/blob/main/CONTRIBUTING.md#being-thanked" target="_blank" rel="noopener">add yourself<span class="vh"> (opens in a new tab)</span></a> by pull request, with your GitHub name or as "Anonymous".</p>`}

/* ---------- you said, we did: ideas, wishes, corrections and reports marked done on GitHub (website edition) ---------- */
const DONEFEED={items:[],state:"loading"};
function doneSafe(o){const b=gitIdeaSafe({...o,kind:o&&o.kind==="wish"?"wish":"idea",status:"done"});if(!b)return null;const kinds={idea:"Idea",wish:"Feature wish",correction:"Correction",bug:"Bug",accessibility:"Accessibility barrier"};
  const kind=kinds[o.type]?o.type:"idea";const closed=/^\d{4}-\d{2}-\d{2}/.test(o.closed||"")?String(o.closed).slice(0,10):"";return{n:b.n,url:b.url,title:b.title,kind,kindName:kinds[kind],closed}}
async function loadDone(){if(window.__HOST==="pages"&&(location.protocol==="https:"||location.hostname==="localhost")){try{const r=await fetch("ideas.json",{cache:"no-store"});if(r.ok){const d=await r.json();
      DONEFEED.items=(Array.isArray(d.done)?d.done:[]).map(doneSafe).filter(Boolean).sort((a,b)=>b.closed.localeCompare(a.closed)||b.n-a.n);DONEFEED.state="ok";renderDone();return}}catch(e){}}
  DONEFEED.state="none";renderDone()}
function renderDone(){const host=$("#thDone"),st=$("#thDoneState");if(!host||!st)return;
  if(DONEFEED.state==="loading"){st.textContent="Loading what has changed.";return}
  if(DONEFEED.state==="none"){host.innerHTML="";st.innerHTML=`On the hub's website this lists the ideas, wishes, corrections and reports that became changes. <a href="${REPO_URL}/issues?q=is%3Aissue+label%3A%22status%3A+done%22" target="_blank" rel="noopener">See them on GitHub<span class="vh"> (opens in a new tab)</span></a>.`;return}
  st.textContent=DONEFEED.items.length?`${DONEFEED.items.length} suggestion${DONEFEED.items.length===1?"":"s"} from readers became changes. Thank you.`:"Nothing marked done yet: the first ones will appear here.";
  host.innerHTML=DONEFEED.items.slice(0,30).map((i,ix)=>`<li data-dix="${ix}"><span class="chip">${esc(i.kindName)}</span> <a href="${i.url}" target="_blank" rel="noopener"></a>${i.closed?` <span class="muted">· done ${esc(i.closed)}</span>`:""}</li>`).join("");
  host.querySelectorAll("li").forEach(li=>{const i=DONEFEED.items[+li.dataset.dix];const a=li.querySelector("a");a.textContent=i.title;a.insertAdjacentHTML("beforeend",`<span class="vh"> (issue ${i.n}, opens in a new tab)</span>`)});
  window.__done=DONEFEED.items.length}

/* ---------- a record of your contribution, for objectives, appraisal or CPD: made and kept in your browser ---------- */
/* the nine behaviours, as named on GOV.UK "Success Profiles: Civil Service behaviours" (updated 29 January 2025), read 26 October 2026 */
const SP_BEHAVIOURS=["Seeing the big picture","Changing and improving","Making effective decisions","Leadership","Communicating and influencing","Working together","Developing self and others","Managing a quality service","Delivering at pace"];
const SP_SRC=SRCQ("GOV.UK: Success Profiles, Civil Service behaviours (Cabinet Office, updated 29 January 2025)","https://www.gov.uk/government/publications/success-profiles/success-profiles-civil-service-behaviours","The nine Civil Service behaviours","The Civil Service has defined a set of behaviours that, when demonstrated, are associated with job success. Civil Service Behaviours are specific to the grade level of the job role.");
const CPD_KEY="bhm26-cpd";
function cpdLoad(){try{const v=JSON.parse(localStorage.getItem(CPD_KEY)||"[]");return Array.isArray(v)?v.slice(0,200):[]}catch(e){return[]}}
function cpdSave(list){try{localStorage.setItem(CPD_KEY,JSON.stringify(list))}catch(e){}}
function cpdText(list){const hrs=list.reduce((s,x)=>s+(+x.hours||0),0);
  return ["Record of contribution: BHM 2026 Hub (unofficial; made in a personal capacity)","Website: "+PAGES_URL,"",
    ...list.map(x=>`${x.date} · ${CONTRIB_ROLE_NAME(x.role)} · ${x.hours} hour${+x.hours===1?"":"s"}\n  ${x.what}${x.beh.length?"\n  Behaviours shown: "+x.beh.join(", "):""}${x.link?"\n  Evidence: "+x.link:""}`),"",
    `Total: ${list.length} entr${list.length===1?"y":"ies"}, ${hrs} hour${hrs===1?"":"s"}.`,"Behaviours are from the Civil Service Success Profiles. This record was made by the contributor; any evidence link points to public work on GitHub."].join("\n")}
function renderCPD(){const host=$("#cpdList"),tot=$("#cpdTotal");if(!host)return;const list=cpdLoad();
  host.innerHTML=list.length?list.map((x,i)=>`<li>${esc(x.date)} · <b>${esc(CONTRIB_ROLE_NAME(x.role))}</b> · ${esc(String(x.hours))} h: ${esc(x.what)}${x.beh.length?` <span class="muted">(${x.beh.map(esc).join(", ")})</span>`:""} <button type="button" class="btn small" data-cpddel="${i}">Remove<span class="vh"> entry ${i+1}</span></button></li>`).join(""):"<li class=\"muted\">No entries yet.</li>";
  if(tot)tot.textContent=list.length?`${list.length} entr${list.length===1?"y":"ies"}, ${list.reduce((s,x)=>s+(+x.hours||0),0)} hours. Kept only in this browser.`:"";
  host.querySelectorAll("[data-cpddel]").forEach(b=>b.addEventListener("click",()=>{const l=cpdLoad();l.splice(+b.dataset.cpddel,1);cpdSave(l);renderCPD()}))}
function cpdAdd(e){e.preventDefault();const out=$("#cpdState");const what=($("#cpdWhat").value||"").trim().slice(0,300);const hours=Math.max(0,Math.min(200,Math.round((+$("#cpdHours").value||0)*4)/4));
  const date=$("#cpdDate").value||new Date().toISOString().slice(0,10);const link=($("#cpdLink").value||"").trim();
  if(!what||!hours){out.textContent="Add what you did and the hours.";return}
  if(link&&!/^https:\/\/github\.com\/cyberdudeuk\/black-mixed-heritage\/(issues|pull|discussions)\/\d+$/.test(link)){out.textContent="The evidence link must be an issue, pull request or discussion in the hub's repository.";return}
  if(/[\w.+-]+@[\w-]+\.[\w.]+/.test(what)){out.textContent="Please leave out email addresses.";return}
  const beh=$$("#cpdBeh input:checked").map(c=>c.value).filter(v=>SP_BEHAVIOURS.includes(v));
  const l=cpdLoad();l.push({date,role:$("#cpdRole").value,hours,what,beh,link});cpdSave(l);$("#cpdForm").reset();out.textContent="Added.";renderCPD()}
function cpdDownload(){const t=cpdText(cpdLoad());const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([t],{type:"text/plain"}));a.download="bhm-2026-hub-contribution-record.txt";document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}

/* ---------- champion pack: words to copy, steps to share ---------- */
const CHAMP_COPY=[
 ["Intranet news item",`Black History Month and all year: the BHM 2026 Hub

The BHM 2026 Hub brings together Black and Black-Mixed history, heritage and cultures, Africa and the African diaspora, for colleagues across the public sector and the communities we serve. Every figure links to a source that was read.

Use it to plan an event, find evidence for a briefing, make a poster, run a book or film club, or learn something new. It works on any device, offline as a single file, and as a Microsoft Teams tab.

Open the hub: ${PAGES_URL}
It is unofficial and made in a personal capacity.`],
 ["Email or Teams message",`Planning something for Black History Month, or just curious? The BHM 2026 Hub has history, a calendar you can subscribe to, posters, a toolkit and sourced evidence on one page: ${PAGES_URL}`],
 ["Viva Engage or social post",`Black and Black-Mixed history, heritage and cultures, with every figure sourced: the BHM 2026 Hub. Calendar, toolkit, posters, book and film club. ${PAGES_URL}`]];
function renderChampions(){const host=$("#chCopy");if(!host)return;
  host.innerHTML=CHAMP_COPY.map(([h,t],i)=>`<div class="card"><h4>${esc(h)}</h4><pre class="champtext" id="chText${i}" tabindex="0">${esc(t)}</pre><button type="button" class="btn" data-chcopy="${i}">${icon("doc")} Copy<span class="vh"> the ${esc(h.toLowerCase())}</span></button></div>`).join("");
  host.querySelectorAll("[data-chcopy]").forEach(b=>b.addEventListener("click",()=>copyText(CHAMP_COPY[+b.dataset.chcopy][1])))}

/* ---------- audits and checks ---------- */
function communityAudit(){const bad=[];
  [["ok",{name:"octocat",roles:["checker"],since:"2026-10"}],["ok",{name:"Anonymous",roles:["community"]}],["bad",{name:"<img src=x onerror=1>",roles:["checker"]}],
   ["bad",{name:"someone@example.org",roles:["checker"]}],["bad",{name:"octocat",roles:["not-a-role"]}],["bad",{name:"-bad-",roles:["checker"]}]]
   .forEach(([want,o],i)=>{const r=contribSafe(o);if(want==="ok"&&!r)bad.push("a valid contributor is rejected");if(want==="bad"&&r)bad.push("unsafe contributor "+(i+1)+" is accepted")});
  if(CONTRIB_REJECTED>0)bad.push(CONTRIB_REJECTED+" contributor entr(ies) in the data failed checks");
  [["ok",{n:5,url:GIT_ISSUE_PREFIX+"5",title:"Fix a date",type:"correction",closed:"2026-10-20T10:00:00Z"}],["bad",{n:5,url:"javascript:alert(1)",title:"x"}],["bad",{n:6,url:GIT_ISSUE_PREFIX+"5",title:"x"}]]
   .forEach(([want,o],i)=>{const r=doneSafe(o);if(want==="ok"&&!r)bad.push("a valid done item is rejected");if(want==="bad"&&r)bad.push("unsafe done item "+(i+1)+" is accepted")});
  ["champions","panels"].forEach(id=>{if(!SU_ROLES.some(r=>r.id===id))bad.push("role "+id+" missing")});
  if(SP_BEHAVIOURS.length!==9)bad.push("Success Profiles behaviours should number nine");
  const t=cpdText([{date:"2026-10-26",role:"checker",hours:2,what:"Re-read five sources",beh:["Working together"],link:""}]);if(!/Total: 1 entry, 2 hours/.test(t)||/@/.test(t.replace(PAGES_URL,"")))bad.push("contribution record text is wrong");
  if(CHAMP_COPY.some(([,t])=>!t.includes(PAGES_URL)||/@|claude\.ai/.test(t)))bad.push("champion pack text lacks the website or holds a contact or private link");
  if(!$("#su-champack")||!$("#su-thanks")||!$("#su-cpd"))bad.push("a community section is missing");
  return{bad,contrib:CONTRIBUTORS_OK.length}}
CHECKS.push({id:"C166",n:"Contributors are named only by choice and safely, the contribution record stays in the browser, and the champion pack is complete (D-132 to D-134)",run:c=>({ok:!c.cmty.bad.length,d:c.cmty.bad.length?"Problems: "+c.cmty.bad.slice(0,4).join("; "):`${c.cmty.contrib} named contributor${c.cmty.contrib===1?"":"s"}; 15 roles including champions and field review panels; 9 safety tests on contributors and done items; champion pack with three ready-to-use texts`}),
  breakIt:c=>{c.cmty={...c.cmty,bad:["unsafe contributor 3 is accepted"]};return c}});
BUILD_TESTS["D-132"]="Volunteers had roles and a form, but nothing thanked them or showed what their suggestions changed. Contributors can now be named by choice, and the website lists the suggestions that became changes";
BUILD_TESTS["D-133"]="Volunteering had no value a contributor could show at work. The hub now makes a record of contributions, mapped to the Civil Service Success Profiles behaviours, kept only in the contributor's browser";
BUILD_TESTS["D-134"]="Reach across the public sector depended on individuals passing the link on. A champion pack gives ready-to-use words and steps for each department, profession or network, with champion and field review panel roles";
REQS.push({id:"R91",t:"F",r:"Seek and reward reviewers, volunteers, champions and ambassadors: recognition, development value, ways in, and a champion pack",o:"Request 70",sat:["su-champack","su-thanks","su-cpd","su-champions","su-panels"],ver:["C166"]});
const _ctx92=ctxV15;ctxV15=function(){const c=_ctx92();c.cmty=communityAudit();return c};
function v47Boot(){renderContributors();renderChampions();const sp=$("#cpdSrc");if(sp)sp.innerHTML=evTag(SP_SRC);
  const r=$("#cpdRole");if(r)r.innerHTML=SU_ROLES.map(x=>`<option value="${x.id}">${esc(x.n)}</option>`).join("");
  const bh=$("#cpdBeh");if(bh)bh.innerHTML=SP_BEHAVIOURS.map(b=>`<label class="ck"><input type="checkbox" value="${esc(b)}"> ${esc(b)}</label>`).join("");
  const f=$("#cpdForm");if(f)f.addEventListener("submit",cpdAdd);const d=$("#cpdDownload");if(d)d.addEventListener("click",cpdDownload);
  const cp=$("#cpdCopy");if(cp)cp.addEventListener("click",()=>copyText(cpdText(cpdLoad())));
  const cl=$("#cpdClear");if(cl)cl.addEventListener("click",()=>{cpdSave([]);renderCPD()});renderCPD();
  (window.requestIdleCallback||setTimeout)(()=>loadDone(),{timeout:3000})}
