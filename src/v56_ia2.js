/* ================= v2.27.0 INFORMATION ARCHITECTURE, SECOND PASS (D-155) =================
   The first review (v53_ia.js) left three proposals. Each was weighed for readers, for links that already point at
   the pages, and for the checks and tools that depend on them:
   - Recognition and awards (about 20,800 of the 33,600 words on Culture, sport and enterprise) becomes its own page in
     the Lead menu, next to Representation across the state. Addresses such as #aw-ukhonours keep working.
   - Posters joins the Organiser toolkit: both serve someone running an event, and Posters held one tool. #posters still
     opens the poster gallery. Brand and media stays a page of its own, because comms teams and designers use it all year
     for the hub's identity, not only for events.
   - History and Africa's knowledge and its journeys stay apart: one is a global timeline, the other region by region.
   - Culture, sport and enterprise keeps its name: its people and milestones still span business, science and digital. */
const IA27B={moved:[],decided:[]};
/* 1. Recognition and awards: its own page in Lead */
const NEW27c=[["awards","Recognition and awards"]].filter(([id])=>typeof LP!=="undefined"&&LP[id]&&document.getElementById("v-"+id)&&!VIEWS.some(v=>v[0]===id));VIEWS.push(...NEW27c);
(function(){if(!NEW27c.length)return;const g=NAV_ORDER_V21.find(x=>x.g==="Lead");if(g&&!g.items.includes("awards")){const i=g.items.indexOf("represent");g.items.splice(i>=0?i:g.items.length,0,"awards")}applyNavV21()})();
VIEW_ICONS.awards="award";LABEL_V21.awards="Recognition and awards";
NEW27c.forEach(([id])=>{PK_CONTENT.push(id);RP_NEW.push(id)});
RELATED_V21.push(["awards","represent"],["represent","awards"],["awards","culture"],["culture","awards"],["awards","involve"],["involve","awards"]);
(function(){const c=CLUSTERS.find(x=>x.id==="lead");if(c&&NEW27c.length&&!c.pages.some(p=>p[0]==="awards")){const i=c.pages.findIndex(p=>p[0]==="represent");c.pages.splice(i>=0?i+1:c.pages.length,0,["awards","honours, prizes, medals, fellowships and scholarships: who is recognised, and what is published"])}})();
/* 2. Posters joins the Organiser toolkit */
(function(){const vpo=document.getElementById("v-posters"),vtk=document.getElementById("v-toolkit");if(!vpo||!vtk)return;
  [...vpo.querySelectorAll(":scope > section.block")].forEach(s=>{vtk.appendChild(s);IA27B.moved.push([s.id,"posters","toolkit"])});
  vpo.remove();const i=VIEWS.findIndex(v=>v[0]==="posters");if(i>=0)VIEWS.splice(i,1);
  const t=VIEWS.find(v=>v[0]==="toolkit");if(t)t[1]="Organiser toolkit and posters";vtk.dataset.title="Organiser toolkit and posters";LABEL_V21.toolkit="Organiser toolkit and posters";
  NAV_ORDER_V21.forEach(g=>{g.items=g.items.filter(x=>x!=="posters")});
  RELATED_V21.forEach(r=>{for(let k=0;k<2;k++)if(r[k]==="posters")r[k]="toolkit"});for(let k=RELATED_V21.length-1;k>=0;k--)if(RELATED_V21[k][0]===RELATED_V21[k][1])RELATED_V21.splice(k,1);
  try{TOURS.forEach(tr=>tr.steps.forEach(s=>{if(s[0]==="posters"){s[0]="toolkit";s[1]="#po-maker"}}))}catch(e){}
  try{TUTORIALS.forEach(tu=>{if(tu[1]==="posters"){tu[1]="toolkit";tu[2]=tu[2].map(x=>x.replace("Open This month, then Posters.","Open This month, then Organiser toolkit and posters, and go to the posters."))}})}catch(e){}
  try{(typeof DATASETS!=="undefined"?DATASETS:[]).forEach(l=>{if(l.view==="posters")l.view="toolkit"})}catch(e){}
  const c=CLUSTERS.find(x=>x.id==="organise");if(c){c.pages=c.pages.filter(p=>p[0]!=="posters");const tk=c.pages.find(p=>p[0]==="toolkit");if(tk)tk[1]="the organiser's checklist, activity ideas and posters to customise and print"}
  applyNavV21()})();
/* Poster counts are checked and corrected on the posters' own sections, wherever they live */
const PO_SCOPE="#po-maker, #po-gallery";
fixCounts=function(){const w=NUMW[POSTERS.length]||String(POSTERS.length);document.querySelectorAll(PO_SCOPE).forEach(v=>{const tw=document.createTreeWalker(v,NodeFilter.SHOW_TEXT);const ns=[];while(tw.nextNode())ns.push(tw.currentNode);
  ns.forEach(t=>{const r=t.nodeValue.replace(/\b(Seven|Eight|Nine|Ten|Six|Five|seven|eight|nine|ten|six|five) posters\b/g,m=>{const W=/^[A-Z]/.test(m)?w[0].toUpperCase()+w.slice(1):w;return W+" posters"});if(r!==t.nodeValue)t.nodeValue=r})})};
posterCountClaims=function(){const out=[];document.querySelectorAll("#po-maker h2, #po-maker p, #po-gallery h2, #po-gallery p").forEach(e=>{const m=/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve) posters\b/i.exec(e.textContent);if(m&&NUMW.indexOf(m[1].toLowerCase())!==POSTERS.length)out.push(m[0])});return out};
/* 3. Decisions recorded on the review */
(function(){if(typeof IA_FINDINGS==="undefined")return;const set=(start,action,status)=>{const f=IA_FINDINGS.find(x=>x[0].startsWith(start));if(f){f[2]=action;f[3]=status;IA27B.decided.push(start)}};
  set("History and Africa","Weighed and kept apart: a global timeline and a region-by-region account serve different questions, and merging would make the longest pair of pages longer still. The History and Africa signposts say which page answers what.","Decided: kept apart (D-155)");
  set("Organiser toolkit, Posters","Posters joined the Organiser toolkit, renamed Organiser toolkit and posters; #posters still opens the gallery. Brand and media stays its own page because comms teams and designers use it all year, not only for events.","Done (C172, D-155)");
  set("Culture, sport and enterprise","Recognition and awards (about 20,800 words) is now its own page in Lead, next to Representation across the state, so Culture, sport and enterprise is about 7,900 words, sources included. Its name stays: its people and milestones still span business, science and digital.","Done (C172, D-155)")})();
/* C172 also proves the second pass */
const _iaAudit27=iaAudit;iaAudit=function(){const bad=_iaAudit27();
  if(document.getElementById("v-posters"))bad.push("the Posters page still exists beside its merged sections");
  const pg=document.getElementById("posters");if(!pg||!pg.closest("#v-toolkit"))bad.push("#posters no longer leads to the poster gallery");
  IA27B.moved.forEach(([sec,from,to])=>{const s=document.getElementById(sec);if(!s||!s.closest("#v-"+to))bad.push(`${sec} did not move to ${to}`)});
  const aw=document.getElementById("v-awards"),lead=NAV_GROUPS.find(g=>g.g==="Lead");
  if(!aw||!aw.classList.contains("view"))bad.push("Recognition and awards is not a page");else if(!lead||!lead.items.includes("awards"))bad.push("Recognition and awards is not in the Lead menu");
  if(document.querySelector("#v-culture [id^='aw-']"))bad.push("award sections are still inside Culture, sport and enterprise");
  const ukh=document.getElementById("aw-ukhonours");if(!ukh||!ukh.closest("#v-awards"))bad.push("#aw-ukhonours does not open the Recognition and awards page");
  try{TOURS.forEach(t=>t.steps.forEach(([v,sel],i)=>{if(!VIEWS.some(x=>x[0]===v))bad.push(`tour ${t.id} step ${i+1} names a missing page ${v}`)}));TUTORIALS.forEach(t=>{if(!VIEWS.some(x=>x[0]===t[1]))bad.push(`tutorial ${t[0]} names a missing page ${t[1]}`)})}catch(e){bad.push("tours could not be read: "+e.message)}
  if(!document.querySelector("#po-maker h2")||!/posters/i.test(document.querySelector("#po-maker h2").textContent))bad.push("the poster count claim is not where the count check reads");
  if(typeof IA_FINDINGS!=="undefined"&&IA_FINDINGS.some(f=>/^Proposed/.test(f[3])))bad.push("a review proposal is still open");
  return bad};
BUILD_TESTS["D-155"]="The first information architecture review left three proposals open. They were weighed: Recognition and awards became its own page in Lead (Culture, sport and enterprise fell from about 33,600 to about 7,900 words, sources included); Posters joined the Organiser toolkit, keeping #posters; History and Africa's knowledge stayed apart, and Brand and media stayed its own page, each for a stated reason. The poster count check now reads the posters' sections wherever they live, so moving them could not make it pass without looking, and C172 fails if a merged page reappears, an old address breaks, a tour or tutorial names a missing page, or a proposal is left open.";
