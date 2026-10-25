/* ================= v1.2 RENDERERS ================= */
const NAV_GROUPS=[{g:"Learn",items:["theme","africa","diaspora","history","innovation","food","remember","debates"]},{g:"Act",items:["calendar","toolkit","leaders","networks"]},{g:"Make and share",items:["posters","brand","connect"]},{g:"Reference",items:["resources","knowledge","about","assurance"]}];
const vName=id=>(VIEWS.find(v=>v[0]===id)||[id,id])[1];

/* ---------- grouped navigation (replaces the flat bar) ---------- */
function buildNav(){const g=$("#gnav");
  g.innerHTML=`<a href="#overview" data-view="overview">Overview</a>`+NAV_GROUPS.map((x,i)=>`<div class="ngroup" data-g="${i}"><button type="button" class="gbtn" aria-expanded="false" aria-controls="gm${i}">${x.g} <span aria-hidden="true">▾</span></button><div class="gmenu" id="gm${i}" hidden>${x.items.map(id=>`<a href="#${id}" data-view="${id}">${vName(id)}</a>`).join("")}</div></div>`).join("");
  $$("#gnav .gbtn").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();const m=document.getElementById(b.getAttribute("aria-controls"));const open=m.hidden;closeMenus();m.hidden=!open;b.setAttribute("aria-expanded",String(open));if(open)m.querySelector("a").focus()}));
  $("#moreMenu").innerHTML=`<a href="#overview" data-view="overview">Overview</a>`+NAV_GROUPS.map(x=>`<p class="mono muted" style="margin:8px 10px 2px">${x.g}</p>`+x.items.map(id=>`<a href="#${id}" data-view="${id}">${vName(id)}</a>`).join("")).join("");
  fitNav();}
function closeMenus(){$$("#gnav .gmenu").forEach(m=>m.hidden=true);$$("#gnav .gbtn").forEach(b=>b.setAttribute("aria-expanded","false"))}
document.addEventListener("click",e=>{if(!e.target.closest(".ngroup"))closeMenus()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){const open=$("#gnav .gmenu:not([hidden])");if(open){const b=open.previousElementSibling;closeMenus();b.focus()}}});
function fitNav(){const g=$("#gnav"),wrap=$("#moreWrap");g.style.display="";wrap.hidden=true;$("#moreBtn").textContent="Menu ▾";
  if(g.scrollWidth>g.clientWidth+1){g.style.display="none";wrap.hidden=false}markNav()}
function markNav(){$$("[data-view]").forEach(a=>a.getAttribute("data-view")===current?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current"));
  $$("#gnav .ngroup").forEach(n=>n.classList.toggle("has-current",!!n.querySelector('[aria-current="page"]')))}

/* ---------- search ---------- */
let SEARCH=null;
function searchIndex(){if(SEARCH)return SEARCH;const S=[];const add=(t,ty,d,href)=>S.push({t,ty,d:d||"",href,k:(t+" "+(d||"")).toLowerCase()});
  VIEWS.forEach(([id,l])=>add(l,"Section",$("#v-"+id)?.dataset.title,"#"+id));
  EVENTS.forEach(e=>add(e.t,"Timeline",(e.yl||e.y)+" · "+e.d,"#"+e.id));
  MOTIFS.forEach(m=>add(m.n,"Motif",m.meaning,"#af-map"));WORDS.forEach(w=>add(w.w,"Word",w.l+": "+w.g,"#af-words"));
  DIASPORA.forEach(d=>add(d.n,"Diaspora",d.d,"#di-map"));GLOSSARY.forEach(g=>add(g.t,"Glossary",g.d,"#knowledge"));
  RESOURCES.forEach(r=>add(r.t,"Resource",r.d,"#resources"));NETWORKS.forEach(n=>add(n.n,"Network",n.d,"#networks"));
  DISHES.forEach(d=>add(d.n,"Food",d.where+": "+d.d,"#fd-intro"));RECIPES.forEach(r=>add(r.n+" recipe","Recipe",r.r,"#rc-"+r.id));
  IDEAS.forEach(i=>add(i.t,"Activity",i.d,"#toolkit"));calEvents().forEach(c=>add(c.t,"Calendar",fmtD(c.s)+(c.where?" · "+c.where:""),"#calendar"));
  Object.values(DEBATES).forEach(d=>add(d.title,"Debate",d.intro,"#debates"));
  [...INNOV.ancient,...INNOV.inventors,...INNOV.now].forEach(x=>add(x.n,"Innovation",x.w+" · "+x.d,"#innovation"));
  POSTERS.forEach(p=>add(p.name+" poster","Poster",p.use,"#posters"));
  return SEARCH=S}
function openSearch(){const dlg=$("#searchDlg");dlg.hidden=false;$("#searchQ").value="";doSearch();$("#searchQ").focus()}
function closeSearch(){$("#searchDlg").hidden=true;$("#searchBtn").focus()}
function doSearch(){const q=$("#searchQ").value.trim().toLowerCase();const idx=searchIndex();
  const words=q.split(/\s+/).filter(Boolean);const res=q?idx.filter(x=>words.every(w=>x.k.includes(w))).slice(0,40):[];
  $("#searchRes").innerHTML=!q?`<p class="muted">Try "jollof", "Windrush", "Wales", "patent" or "reparations".</p>`:res.length?res.map(r=>`<a class="sres" href="${r.href}"><span class="tag">${r.ty}</span><b>${esc(r.t)}</b><span class="muted">${esc(r.d.slice(0,140))}</span></a>`).join(""):`<p>No results for "${esc(q)}". Check the spelling or try a shorter word.</p>`;
  $("#searchCount").textContent=q?`${res.length} ${res.length===1?"result":"results"}`:"";
  $$("#searchRes a").forEach(a=>a.addEventListener("click",()=>{$("#searchDlg").hidden=true}))}

/* ---------- past themes and the historical arc ---------- */
function renderThemes(){$("#themesBody").innerHTML=THEMES.map(t=>`<tr${t.y===META.year?' class="cur"':""}><td class="mono">${t.y}</td><td><b>${esc(t.t)}</b>${t.y===META.year?' <span class="tag src">This year</span>':""}</td><td>${evTag(t.src)}</td></tr>`).join("")}
const ERAS=[["Deep past",-1e6,1499],["1500 to 1899",1500,1899],["1900 to 1944",1900,1944],["1945 to 1999",1945,1999],["2000 to today",2000,3000]];
function renderArc(){const W=900,H=200,bw=W/ERAS.length;let s="";const catCol={service:"var(--r-east)",law:"var(--earth)",rights:"var(--red)",culture:"var(--gold)",ideas:"var(--r-pan)",belong:"var(--green)",science:"var(--r-north)"};
  ERAS.forEach(([n,a,b],i)=>{const evs=EVENTS.filter(e=>e.y>=a&&e.y<=b).sort((x,y)=>x.y-y.y);
    s+=`<rect x="${i*bw+2}" y="20" width="${bw-4}" height="140" rx="4" fill="var(--sunk)"/><text x="${i*bw+bw/2}" y="182" text-anchor="middle" class="arclbl">${n} (${evs.length})</text>`;
    evs.forEach((e,j)=>{const x=i*bw+14+(evs.length>1?j*(bw-28)/(evs.length-1):(bw-28)/2);const y=150-(j%5)*24;
      s+=`<a href="#${e.id}" aria-label="${esc((e.yl||e.y)+": "+e.t)}"><circle cx="${x.toFixed(1)}" cy="${y}" r="7" fill="${catCol[e.c]||"var(--muted)"}" stroke="var(--surface)" stroke-width="2"><title>${esc((e.yl||e.y)+": "+e.t)}</title></circle></a>`})});
  s+=`<path d="M10 14 Q ${W/2} -8 ${W-10} 14" fill="none" stroke="var(--gold)" stroke-width="2"/>`;
  $("#arcSvg").innerHTML=`<title id="arcT">The historical arc: ${EVENTS.length} events in five eras. Each dot links to its timeline entry.</title>`+s;
  $("#arcLegend").innerHTML=Object.entries(CATS).map(([k,v])=>`<span><i style="background:${catCol[k]}"></i>${v}</span>`).join("")}

/* ---------- remember ---------- */
let promptI=0;
function renderRemember(){$("#memorials").innerHTML=MEMORIALS.map(m=>`<div class="card memorial"><span class="mono muted">${esc(m.d)}</span><h3>${esc(m.t)}</h3><p>${esc(m.p)}</p></div>`).join("");
  const lit=store.get("candle",false);setCandle(lit);$("#prompt").textContent=PROMPTS[0];
  $("#lightCandle").addEventListener("click",()=>{const v=$("#lightCandle").getAttribute("aria-pressed")!=="true";setCandle(v);store.set("candle",v)});
  $("#nextPrompt").addEventListener("click",()=>{promptI=(promptI+1)%PROMPTS.length;$("#prompt").textContent=PROMPTS[promptI]});
  let timer=null;$("#minuteBtn").addEventListener("click",()=>{if(timer){clearInterval(timer);timer=null;$("#minuteBtn").textContent="Start one minute";$("#minuteLeft").textContent="1:00";return}let s=60;$("#minuteBtn").textContent="Stop";timer=setInterval(()=>{s--;$("#minuteLeft").textContent=`0:${String(s).padStart(2,"0")}`;if(s<=0){clearInterval(timer);timer=null;$("#minuteBtn").textContent="Start one minute";$("#minuteLeft").textContent="Thank you."}},1000)})}
function setCandle(v){$("#candle").classList.toggle("lit",v);$("#lightCandle").setAttribute("aria-pressed",String(v));$("#lightCandle").textContent=v?"Your candle is lit":"Light a candle";$("#candleNote").textContent=v?"Your candle is lit. It stays lit in this browser.":"Your candle stays lit in this browser only."}

/* ---------- food ---------- */
function renderFood(){const regs=[...new Set(DISHES.map(d=>d.r))];
  if(!$("#fdRegion").options.length)$("#fdRegion").innerHTML=`<option value="all">All regions</option>`+regs.map(r=>`<option value="${r}">${REGIONS[r].n}</option>`).join("");
  const r=$("#fdRegion").value,dt=$("#fdDiet").value;
  const ok=d=>(r==="all"||d.r===r)&&(dt==="all"||(dt==="vegetarian"?["vegan","vegetarian"].includes(d.diet):d.diet===dt));
  const list=DISHES.filter(ok);const lbl={vegan:"Vegan",vegetarian:"Vegetarian",fish:"Contains fish",meat:"Contains meat"};
  $("#dishes").innerHTML=list.map(d=>`<article class="card dish" style="border-top:5px solid var(--r-${d.r})"><span class="mono muted">${esc(d.where)}</span><h3>${esc(d.n)}</h3><p>${esc(d.d)}</p><div class="tags"><span class="tag">${REGIONS[d.r].n}</span><span class="tag">${lbl[d.diet]}</span>${d.rec?`<a class="tag src" href="#rc-${d.rec}">Recipe below</a>`:""}</div></article>`).join("")||"<p>No dishes match. Try another diet or region.</p>";
  $("#fdCount").textContent=`${list.length} of ${DISHES.length} dishes`;}
function renderIngredients(){$("#ingredients").innerHTML=INGREDIENTS.map(i=>`<div class="card"><span class="mono" style="color:var(--gold-ink)">${esc(i.from)}</span><h3>${esc(i.n)}</h3><p>${esc(i.d)}</p></div>`).join("");
  $("#recipes").innerHTML=RECIPES.map(r=>`<article class="card recipe" id="rc-${r.id}"><div class="rhead"><div><span class="eyebrow">${esc(r.r)} · ${esc(r.time)} · serves 4</span><h3 style="font-size:1.4rem">${esc(r.n)}</h3></div><button class="btn" type="button" data-copyrec="${r.id}">Copy recipe</button></div>
   <div class="tags">${r.diet.map(x=>`<span class="tag">${esc(x)}</span>`).join("")}<span class="tag ref">Allergens: ${esc(r.allergens)}</span></div>
   <div class="rcols"><div><h4 class="mono muted">Ingredients</h4><ul>${r.ing.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div><div><h4 class="mono muted">Method</h4><ol>${r.steps.map(x=>`<li>${esc(x)}</li>`).join("")}</ol><p class="muted"><b>Tip:</b> ${esc(r.tip)}</p></div></div></article>`).join("");
  $$("[data-copyrec]").forEach(b=>b.addEventListener("click",()=>{const r=RECIPES.find(x=>x.id===b.dataset.copyrec);copyText(`${r.n} (${r.r}), serves 4, ${r.time}\n\nIngredients\n${r.ing.map(x=>"- "+x).join("\n")}\n\nMethod\n${r.steps.map((x,i)=>`${i+1}. ${x}`).join("\n")}\n\nAllergens: ${r.allergens}\nFrom the Black History Month 2026 Hub`)}))}

/* ---------- calendar ---------- */
const CAL_KINDS={bhm:"Black History Month",event:"Public events",observance:"Observances",memorial:"Remembrance",plan:"Comms plan",mine:"My events"};
const EXT_EVENTS=[
 {id:"x-leic",s:"2026-10-01",e:"2026-10-01",t:"Black Classics in Concert",where:"Leicester Cathedral",k:"event",src:"S5"},
 {id:"x-exe1",s:"2026-10-02",e:"2026-10-03",t:"Black History Month event, University of Exeter",where:"Princess Pavilion, Falmouth",k:"event",src:"S39"},
 {id:"x-exe2",s:"2026-10-08",e:"2026-10-08",t:"Nubiyan Twist live",where:"Princess Pavilion, Falmouth",k:"event",src:"S39"},
 {id:"x-exe3",s:"2026-10-13",e:"2026-10-13",t:"University of Exeter online session",where:"Online (Microsoft Teams)",k:"event",src:"S39"},
 {id:"x-pac",s:"2026-10-15",e:"2026-10-21",t:"81st anniversary of the Fifth Pan-African Congress",where:"Manchester, 1945",k:"observance",src:"S20"},
 {id:"x-rcn",s:"2026-10-23",e:"2026-10-23",t:"RCN Eastern: Honouring Our Communities",where:"Kneesworth House Hospital and online",k:"event",src:"S18"},
 {id:"x-bpd",s:"2026-10-23",e:"2026-10-23",t:"Black Pound Day evening",where:"Coates Auditorium, University of Nottingham",k:"event",src:"S38"},
 {id:"x-reel",s:"2026-10-01",e:"2026-10-28",t:"Reel Histories film programme",where:"Leicester",k:"event",src:"S5"},
 {id:"x-rgu",s:"2026-10-28",e:"2026-10-28",t:"Community Conversations",where:"Robert Gordon University, Aberdeen",k:"event",src:"S40"},
 {id:"x-lboro",s:"2026-10-01",e:"2026-10-31",t:"Honouring Our Community exhibition",where:"Pilkington Library, Loughborough",k:"event",src:"S41"},
 {id:"p-commit",s:"2026-10-31",e:"2026-10-31",t:"Publish your three commitments",where:"",k:"plan",src:null},
 {id:"m-newcross",s:"2027-01-18",e:"2027-01-18",t:"Remembering the New Cross fire (1981)",where:"",k:"memorial",src:null},
 {id:"p-review",s:"2027-04-22",e:"2027-04-22",t:"Review commitments on Stephen Lawrence Day",where:"",k:"plan",src:null}
];
const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const fmtD=s=>parseD(s).toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short",year:"numeric"});
function calEvents(){const out=[{id:"bhm",s:META.monthStart,e:META.monthEnd,t:"Black History Month 2026: "+THEME,where:"UK-wide",k:"bhm",src:"S1",d:"The whole month of October."}];
  WEEKS.slice(0,4).forEach((w,i)=>out.push({id:"wk"+i,s:w.s,e:w.e,t:`${w.n}: ${w.h}`,where:"",k:"plan",src:null,d:w.i.join("; ")}));
  DATES.forEach((x,i)=>{if(x.t.startsWith("Black History Month begins"))return;const y=x.m>=10?2026:2027;const s=`${y}-${String(x.m).padStart(2,"0")}-${String(x.d).padStart(2,"0")}`;out.push({id:"obs"+i,s,e:s,t:x.t,where:"",k:/Remembrance|Lawrence/.test(x.t)?"memorial":"observance",src:x.src,d:x.w})});
  EXT_EVENTS.forEach(e=>out.push({...e,d:e.d||""}));
  store.get("mine",[]).forEach(m=>out.push({...m,k:"mine"}));
  return out.sort((a,b)=>a.s.localeCompare(b.s)||a.t.localeCompare(b.t))}
let calMonth=null,calShow=new Set(Object.keys(CAL_KINDS));
function renderCalendar(){const t=today();if(!calMonth){calMonth=(t>=parseD("2026-10-01")&&t<=parseD("2027-09-30"))?new Date(t.getFullYear(),t.getMonth(),1):new Date(2026,9,1)}
  if(!$("#calKinds").children.length){$("#calKinds").innerHTML=Object.entries(CAL_KINDS).map(([k,v])=>`<button type="button" class="chip k-${k}" data-k="${k}" aria-pressed="true"><span class="sw kc-${k}"></span>${v}</button>`).join("");
    $$("#calKinds .chip").forEach(b=>b.addEventListener("click",()=>{const k=b.dataset.k;calShow.has(k)?calShow.delete(k):calShow.add(k);b.setAttribute("aria-pressed",calShow.has(k));renderCalendar()}))}
  const evs=calEvents().filter(e=>calShow.has(e.k));const y=calMonth.getFullYear(),m=calMonth.getMonth();
  $("#calTitle").textContent=calMonth.toLocaleDateString("en-GB",{month:"long",year:"numeric"});
  const first=new Date(y,m,1),start=new Date(y,m,1-((first.getDay()+6)%7));let rows="";
  for(let w=0;w<6;w++){let cells="";for(let d=0;d<7;d++){const day=new Date(start.getFullYear(),start.getMonth(),start.getDate()+w*7+d);const ds=iso(day);const inM=day.getMonth()===m;const todays=ds===iso(t);
      const here=evs.filter(e=>e.s<=ds&&e.e>=ds);const shown=here.slice(0,3);
      cells+=`<td class="${inM?"":"out"}${todays?" today":""}"><span class="dn">${day.getDate()}${todays?' <span class="sr">today</span>':""}</span>${shown.map(e=>`<button type="button" class="ev kc-${e.k}" data-ev="${e.id}" title="${esc(e.t)}">${esc(e.t)}</button>`).join("")}${here.length>3?`<button type="button" class="ev more" data-day="${ds}">+${here.length-3} more</button>`:""}</td>`}
    rows+=`<tr>${cells}</tr>`;if(new Date(start.getFullYear(),start.getMonth(),start.getDate()+(w+1)*7).getMonth()!==m&&w>=3)break}
  $("#calGrid").innerHTML=`<table class="cal"><caption class="sr">${$("#calTitle").textContent}. Select an event for details.</caption><thead><tr>${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>`<th scope="col">${d}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table>`;
  $$("#calGrid [data-ev]").forEach(b=>b.addEventListener("click",()=>calDetail(b.dataset.ev)));
  $$("#calGrid [data-day]").forEach(b=>b.addEventListener("click",()=>{const ds=b.dataset.day;const here=evs.filter(e=>e.s<=ds&&e.e>=ds);$("#calDetail").innerHTML=`<h3>${fmtD(ds)}</h3><ul>${here.map(e=>`<li><button type="button" class="linkbtn" data-ev2="${e.id}">${esc(e.t)}</button></li>`).join("")}</ul>`;$$("[data-ev2]").forEach(x=>x.addEventListener("click",()=>calDetail(x.dataset.ev2)))}));
  $("#agendaBody").innerHTML=evs.map(e=>`<tr><td style="white-space:nowrap">${fmtD(e.s)}${e.e!==e.s?" to "+fmtD(e.e):""}</td><td><b>${esc(e.t)}</b>${e.src?" "+evTag(e.src):""}</td><td><span class="sw kc-${e.k}"></span>${CAL_KINDS[e.k]}</td><td>${esc(e.where||"")}</td><td style="white-space:nowrap"><a href="${gcal(e)}" target="_blank" rel="noopener">Google</a> · <a href="${ocal(e,"office")}" target="_blank" rel="noopener">Outlook</a></td></tr>`).join("");
  buildDrawerCounts()}
function calDetail(id){const e=calEvents().find(x=>x.id===id);if(!e)return;
  $("#calDetail").innerHTML=`<span class="mono muted"><span class="sw kc-${e.k}"></span>${CAL_KINDS[e.k]}</span><h3>${esc(e.t)}</h3><p>${fmtD(e.s)}${e.e!==e.s?" to "+fmtD(e.e):""}${e.where?" · "+esc(e.where):""}</p>${e.d?`<p>${esc(e.d)}</p>`:""}<div class="tags">${e.src?evTag(e.src):""}</div>
   <div class="btnrow" style="margin-top:var(--s3)"><a class="btn" href="${gcal(e)}" target="_blank" rel="noopener">Add to Google</a><a class="btn" href="${ocal(e,"office")}" target="_blank" rel="noopener">Add to Outlook (work)</a><a class="btn" href="${ocal(e,"live")}" target="_blank" rel="noopener">Add to Outlook.com</a><button class="btn" type="button" id="icsOne">Copy .ics</button>${e.k==="mine"?`<button class="btn" type="button" id="delMine">Delete my event</button>`:""}</div>`;
  $("#icsOne").addEventListener("click",()=>copyText(ics([e])));
  if(e.k==="mine")$("#delMine").addEventListener("click",()=>{store.set("mine",store.get("mine",[]).filter(m=>m.id!==e.id));$("#calDetail").innerHTML='<p class="muted">Event deleted.</p>';SEARCH=null;renderCalendar();toast("Event deleted")});
  $("#calDetail").scrollIntoView({block:"nearest"})}
const addDay=(s,n)=>{const d=parseD(s);d.setDate(d.getDate()+n);return iso(d)};
const compact=s=>s.replace(/-/g,"");
function gcal(e){return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(e.t)}&dates=${compact(e.s)}/${compact(addDay(e.e,1))}&details=${encodeURIComponent((e.d||"")+" From the Black History Month 2026 Hub.")}&location=${encodeURIComponent(e.where||"")}`}
function ocal(e,host){return `https://outlook.${host==="office"?"office":"live"}.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&subject=${encodeURIComponent(e.t)}&startdt=${e.s}&enddt=${addDay(e.e,1)}&allday=true&body=${encodeURIComponent(e.d||"")}&location=${encodeURIComponent(e.where||"")}`}
const icsEsc=s=>String(s||"").replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\n/g,"\\n");
function ics(list){const st=new Date().toISOString().replace(/[-:]/g,"").slice(0,15)+"Z";return ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//BHM 2026 Hub//EN","CALSCALE:GREGORIAN","X-WR-CALNAME:Black History Month 2026 Hub",...list.flatMap(e=>["BEGIN:VEVENT",`UID:${e.id}@bhm2026-hub`,`DTSTAMP:${st}`,`DTSTART;VALUE=DATE:${compact(e.s)}`,`DTEND;VALUE=DATE:${compact(addDay(e.e,1))}`,`SUMMARY:${icsEsc(e.t)}`,e.where?`LOCATION:${icsEsc(e.where)}`:null,`DESCRIPTION:${icsEsc((e.d||"")+(e.src&&SOURCES[e.src]&&SOURCES[e.src].u?" Source: "+SOURCES[e.src].u:""))}`,`CATEGORIES:${icsEsc(CAL_KINDS[e.k])}`,"END:VEVENT"].filter(Boolean)),"END:VCALENDAR"].join("\r\n")}
const csvCell=v=>`"${String(v??"").replace(/"/g,'""')}"`;
function csv(list){return ["start,end,title,type,where,source",...list.map(e=>[e.s,e.e,e.t,CAL_KINDS[e.k],e.where,e.src&&SOURCES[e.src]?SOURCES[e.src].u||SOURCES[e.src].t:""].map(csvCell).join(","))].join("\r\n")}
function initCalendar(){$("#calPrev").addEventListener("click",()=>{calMonth=new Date(calMonth.getFullYear(),calMonth.getMonth()-1,1);renderCalendar()});
  $("#calNext").addEventListener("click",()=>{calMonth=new Date(calMonth.getFullYear(),calMonth.getMonth()+1,1);renderCalendar()});
  $("#calToday").addEventListener("click",()=>{const t=today();calMonth=new Date(t.getFullYear(),t.getMonth(),1);renderCalendar()});
  $("#copyIcs").addEventListener("click",()=>copyText(ics(calEvents().filter(e=>calShow.has(e.k)))));
  $("#copyCsv").addEventListener("click",()=>copyText(csv(calEvents().filter(e=>calShow.has(e.k)))));
  $("#calForm").addEventListener("submit",e=>{e.preventDefault();const t=$("#ceTitle").value.trim(),d=$("#ceDate").value;const msg=[];if(!t)msg.push("Enter an event name.");if(!/^\d{4}-\d{2}-\d{2}$/.test(d))msg.push("Enter a date.");
    if(msg.length){$("#ceMsg").textContent=msg.join(" ");(t?$("#ceDate"):$("#ceTitle")).focus();return}
    const mine=store.get("mine",[]);mine.push({id:"mine-"+Date.now(),s:d,e:d,t,where:$("#ceWhere").value.trim(),d:$("#ceNote").value.trim(),src:null});store.set("mine",mine);
    $("#ceMsg").textContent=`Added "${t}" on ${fmtD(d)}.`;e.target.reset();calMonth=new Date(parseD(d).getFullYear(),parseD(d).getMonth(),1);SEARCH=null;renderCalendar();toast("Event added")})}

/* ---------- networks ---------- */
function renderNetworks(){if(!$("#nwSector").options.length)$("#nwSector").innerHTML=`<option value="all">All sectors</option>`+[...new Set(NETWORKS.map(n=>n.sec))].sort().map(s=>`<option>${s}</option>`).join("");
  const sc=$("#nwSector").value,na=$("#nwNation").value,q=$("#nwQ").value.trim().toLowerCase();
  const list=NETWORKS.filter(n=>(sc==="all"||n.sec===sc)&&(na==="all"||n.na===na||n.na==="UK-wide")&&(!q||(n.n+" "+n.d+" "+n.sec+" "+n.na).toLowerCase().includes(q))).sort((a,b)=>a.sec.localeCompare(b.sec)||a.n.localeCompare(b.n));
  $("#networks").innerHTML=list.map(n=>`<article class="card ncard"><span class="mono muted">${esc(n.sec)} · ${esc(n.na)}</span><h3><a href="${n.u}" target="_blank" rel="noopener">${esc(n.n)}</a></h3><p>${esc(n.d)}</p><div class="tags"><span class="tag">${esc(n.ty)}</span>${n.src?evTag(n.src):'<span class="tag ref">Address not checked this edition</span>'}</div></article>`).join("")||"<p>No groups match. Try All sectors or a shorter search.</p>";
  $("#nwCount").textContent=`${list.length} of ${NETWORKS.length}`;buildDrawerCounts()}

/* ---------- connect ---------- */
function hubURL(){return META.url&&META.url.startsWith("http")?META.url:""}
function shareText(){return `Black History Month 2026: ${THEME}. A hub for public sector colleagues with history, posters, a calendar, recipes and a toolkit.`}
function renderConnect(){const u=hubURL(),t=shareText(),E=encodeURIComponent;
  const cards=[["Microsoft Teams",`https://teams.microsoft.com/share?href=${E(u)}&msgText=${E(t)}`],["LinkedIn",`https://www.linkedin.com/sharing/share-offsite/?url=${E(u)}`],["WhatsApp",`https://wa.me/?text=${E(t+" "+u)}`],["Bluesky",`https://bsky.app/intent/compose?text=${E(t+" "+u)}`],["X",`https://x.com/intent/post?text=${E(t)}&url=${E(u)}`]];
  $("#shareCards").innerHTML=cards.map(([n,h])=>`<div class="card"><h3>${n}</h3>${u?`<p><a href="${h}" target="_blank" rel="noopener">Share on ${n} →</a></p>`:`<p class="muted">Available once the hub has a public link.</p>`}</div>`).join("")+`<div class="card"><h3>Slack, Google Chat, Viva Engage and email</h3><p>Copy the ready-made message below and paste it in.</p></div>`;
  $("#shareMsg").textContent=`*Black History Month 2026: ${THEME}*\n\n${t}\n\nWhat's inside:\n• History, maps and the African diaspora\n• Posters you can edit, and a brand kit\n• A calendar you can add to Outlook or Google\n• Recipes, remembrance and a toolkit for organisers\n\n${u||"[link to the hub]"}`;
  const ps=["All",...new Set(APPS.map(a=>a.p))];$("#appChips").innerHTML=ps.map((p,i)=>`<button type="button" class="chip" data-p="${p}" aria-pressed="${i===0}">${p}</button>`).join("");
  const draw=p=>{$("#apps").innerHTML=APPS.filter(a=>p==="All"||a.p===p).map(a=>`<div class="card"><span class="mono muted">${esc(a.p)}</span><h3>${esc(a.n)}</h3><ol style="margin:0;padding-left:20px;display:grid;gap:4px">${a.steps.map(s=>`<li>${esc(s)}</li>`).join("")}</ol></div>`).join("")};draw("All");
  $$("#appChips .chip").forEach(b=>b.addEventListener("click",()=>{$$("#appChips .chip").forEach(c=>c.setAttribute("aria-pressed",c===b));draw(b.dataset.p)}));
  $("#feeds").innerHTML=FEEDS.map(f=>`<tr><td><a href="${f[0]}" target="_blank" rel="noopener"><code>${f[0].split("/")[1]}</code></a></td><td>${f[1]}</td><td>${f[2]}</td><td>${f[3]}</td></tr>`).join("")}
$("#copyShare")?.addEventListener("click",()=>copyText($("#shareMsg").textContent,$("#shareMsg")));

/* ---------- innovation ---------- */
function renderInnovation(){const card=x=>`<div class="card"><span class="mono muted">${esc(x.w)}</span><h3>${esc(x.n)}</h3><p>${esc(x.d)}</p><div class="tags">${x.src?evTag(x.src):'<span class="tag ref">Reference · check before reuse</span>'}</div></div>`;
  $("#inAncient").innerHTML=INNOV.ancient.map(card).join("");$("#inInventors").innerHTML=INNOV.inventors.map(card).join("");$("#inNow").innerHTML=INNOV.now.map(card).join("");
  const vcol={"Well documented":"pass","Shared credit":"warn","Debated":"warn","Widely accepted by music historians":"pass"};
  $("#inCredit").innerHTML=INNOV.credit.map(c=>`<div class="card"><div style="display:flex;justify-content:space-between;gap:8px;align-items:start"><h3>${esc(c.n)}</h3><span class="state ${vcol[c.verdict]||"warn"}">${esc(c.verdict)}</span></div><dl class="mdl"><dt>Usually credited</dt><dd>${esc(c.claim)}</dd><dt>The evidence</dt><dd>${esc(c.evid)}</dd></dl><div class="tags">${c.src?evTag(c.src):'<span class="tag ref">Reference · check before reuse</span>'}</div></div>`).join("");
  $("#inMyths").innerHTML=INNOV.myths.map(m=>`<div class="card"><p class="mono" style="color:var(--red)">Myth</p><h3>${esc(m.m)}</h3><p class="mono" style="color:var(--green)">What the record shows</p><p>${esc(m.f)}</p></div>`).join("")}

/* ---------- about extras ---------- */
function renderAboutExtras(){$("#userNeeds").innerHTML=USER_NEEDS.map(u=>`<tr><td><b>${esc(u.who)}</b></td><td>I need ${esc(u.need)}, so that ${esc(u.so)}.</td><td>${esc(u.met)}</td></tr>`).join("");
  $("#svcStd").innerHTML=SERVICE_STD.map(([a,b],i)=>`<tr><td class="mono">${i+1}</td><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join("");
  $("#research").innerHTML=RESEARCH_PLAN.map(r=>`<li>${esc(r)}</li>`).join("");
  $("#deiaBody").innerHTML=DEIA.map(([a,b,c])=>`<tr><td><b>${esc(a)}</b></td><td>${esc(b)}</td><td><span class="state ${/^Met/.test(c)?"pass":"warn"}">${esc(c)}</span></td></tr>`).join("");
  $("#related").innerHTML=RELATED.map(r=>`<div class="card"><h3>${esc(r.h)}</h3><p>${esc(r.p)}</p></div>`).join("")}

/* ---------- brand and media hub ---------- */
const BRAND_COLOURS=[["Kente gold","#E2AE45","Highlights, key words, the woven band","#14110E"],["Earth","#2A1D14","Mastheads, footers and print backgrounds","#F4ECDD"],["Night","#14110E","Screen backgrounds","#F4ECDD"],["Cloth","#F4ECDD","Text on dark, light print backgrounds","#14110E"],["Ochre red","#D2483B","Accents and the Atlantic routes","#14110E"],["Leaf green","#2E8B57","Accents, success states","#14110E"],["Gold ink","#7E5600","Gold text on light backgrounds","#FFFFFF"],["Green ink","#1B6643","Links on light backgrounds","#FFFFFF"]];
function hubMark(size,P){P=P||PAL.dark;const s=size;return `<g transform="scale(${s/120})"><circle cx="44" cy="52" r="26" fill="none" stroke="${P.gold}" stroke-width="9"/><circle cx="76" cy="52" r="26" fill="none" stroke="${P.red}" stroke-width="9"/><circle cx="60" cy="80" r="26" fill="none" stroke="${P.green}" stroke-width="9"/></g>`}
const COLLATERAL=[
 {id:"sig",n:"Email signature banner",w:600,h:120,use:"Below your email signature during October. Keep it under 100KB as a PNG.",
  draw:(P,o)=>`<rect width="600" height="120" fill="${P.bg}"/>${weaveBand(0,0,14,120,P)}<g transform="translate(30 14)">${hubMark(90,P)}</g><text x="140" y="50" font-family="${FM}" font-size="12" letter-spacing="2" fill="${P.gold}">BLACK HISTORY MONTH · OCTOBER 2026</text><text x="140" y="84" font-family="${FD}" font-weight="800" font-size="30" fill="${P.fg}">Honouring Our Communities</text><text x="140" y="106" font-family="${FB}" font-size="12" fill="${P.mute}">${esc(o.org||"")}</text>`},
 {id:"vbg",n:"Virtual meeting background",w:1920,h:1080,use:"Teams, Zoom or Meet. Text sits top left so your face stays clear.",
  draw:(P,o)=>`<rect width="1920" height="1080" fill="${P.bg}"/>${weaveBand(0,1020,1920,60,P)}<g transform="translate(1380 300) " opacity=".22">${hubMark(480,P)}</g><text x="90" y="130" font-family="${FM}" font-size="30" letter-spacing="5" fill="${P.gold}">BLACK HISTORY MONTH 2026</text><text x="90" y="210" font-family="${FD}" font-weight="800" font-size="74" fill="${P.fg}">Honouring Our Communities</text>`},
 {id:"square",n:"Social or intranet square",w:1080,h:1080,use:"Intranet news, Viva Engage, LinkedIn and Instagram.",
  draw:(P,o)=>`<rect width="1080" height="1080" fill="${P.bg}"/>${weaveBand(0,0,1080,70,P)}<g transform="translate(700 650)">${hubMark(300,P)}</g><text font-family="${FD}" font-weight="800" font-size="120" letter-spacing="-3" fill="${P.fg}"><tspan x="70" y="330">Honouring</tspan><tspan x="70" y="460" fill="${P.gold}">Our</tspan><tspan x="70" y="590">Communities</tspan></text><text x="70" y="1000" font-family="${FM}" font-size="30" letter-spacing="3" fill="${P.mute}">BLACK HISTORY MONTH · OCTOBER 2026</text>`},
 {id:"story",n:"Story or phone screen",w:1080,h:1920,use:"Stories, lock screens and digital signage in portrait.",
  draw:(P,o)=>`<rect width="1080" height="1920" fill="${P.bg}"/>${weaveBand(0,0,1080,80,P)}${weaveBand(0,1840,1080,80,P)}<g transform="translate(330 330)">${hubMark(420,P)}</g><text text-anchor="middle" font-family="${FD}" font-weight="800" font-size="110" fill="${P.fg}"><tspan x="540" y="1020">Honouring</tspan><tspan x="540" y="1140" fill="${P.gold}">Our</tspan><tspan x="540" y="1260">Communities</tspan></text><text x="540" y="1420" text-anchor="middle" font-family="${FB}" font-size="44" fill="${P.mute}">Black History Month · October 2026</text>`},
 {id:"banner",n:"Intranet banner",w:1200,h:300,use:"Intranet home page and SharePoint hero.",
  draw:(P,o)=>`<rect width="1200" height="300" fill="${P.bg}"/>${weaveBand(0,270,1200,30,P)}<g transform="translate(980 40)">${hubMark(200,P)}</g><text x="60" y="110" font-family="${FM}" font-size="20" letter-spacing="4" fill="${P.gold}">BLACK HISTORY MONTH · OCTOBER 2026</text><text x="60" y="190" font-family="${FD}" font-weight="800" font-size="72" fill="${P.fg}">Honouring Our Communities</text>`},
 {id:"badge",n:"Badge or sticker",w:600,h:600,use:"Name badges, stickers and lanyard cards. Print at 50mm or larger.",
  draw:(P,o)=>`<rect width="600" height="600" fill="none"/><circle cx="300" cy="300" r="290" fill="${P.bg}"/><circle cx="300" cy="300" r="266" fill="none" stroke="${P.gold}" stroke-width="10" stroke-dasharray="40 10 10 10"/><g transform="translate(180 120)">${hubMark(240,P)}</g><text x="300" y="420" text-anchor="middle" font-family="${FD}" font-weight="800" font-size="42" fill="${P.fg}">Honouring Our</text><text x="300" y="468" text-anchor="middle" font-family="${FD}" font-weight="800" font-size="42" fill="${P.gold}">Communities</text><text x="300" y="512" text-anchor="middle" font-family="${FM}" font-size="18" letter-spacing="3" fill="${P.mute}">BHM 2026</text>`},
 {id:"slide",n:"Screen slide: did you know?",w:1920,h:1080,use:"Reception screens and the opening slide of a meeting.",
  draw:(P,o)=>{const f=INNOV.inventors[0];return `<rect width="1920" height="1080" fill="${P.bg}"/>${weaveBand(0,0,40,1080,P)}<text x="140" y="200" font-family="${FM}" font-size="34" letter-spacing="6" fill="${P.gold}">DID YOU KNOW?</text><text font-family="${FD}" font-weight="800" font-size="84" fill="${P.fg}" y="340">${tspans(wrap("In 1721 an enslaved West African man, Onesimus, taught Boston how to inoculate against smallpox.",34),140,100)}</text><text x="140" y="900" font-family="${FB}" font-size="36" fill="${P.mute}">Black History Month 2026 · Honouring Our Communities</text>`}}
];
function collSVG(c,pal){const P=PAL[pal]||PAL.dark;return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${c.w} ${c.h}" role="img" aria-labelledby="ct-${c.id}" data-coll="${c.id}"><title id="ct-${c.id}">${esc(c.n)}: ${THEME}, Black History Month 2026</title>${c.draw(P,posterOpts())}</svg>`}
function renderBrand(){$("#brandMark").innerHTML=`<svg viewBox="0 0 120 120" role="img" aria-label="Hub mark: three linked rings"><rect width="120" height="120" fill="#14110E" rx="8"/>${hubMark(120,PAL.dark)}</svg><svg viewBox="0 0 120 120" role="img" aria-label="Hub mark on light background"><rect width="120" height="120" fill="#F7F3EA" rx="8"/>${hubMark(120,PAL.light)}</svg>`;
  $("#swatches").innerHTML=BRAND_COLOURS.map(([n,h,u,txt])=>`<div class="card swatch"><div class="chipc" style="background:${h};color:${txt}"><b>${n}</b><span class="mono">${h}</span></div><p>${esc(u)}</p><p class="mono muted">Text ${txt} on it: ${contrast(h,txt).toFixed(1)}:1</p></div>`).join("");
  const pal=$("#pPal").value;$("#collateral").innerHTML=COLLATERAL.map(c=>`<figure class="coll" style="margin:0"><div class="cframe">${collSVG(c,pal)}</div><figcaption><b style="font-family:var(--f-display)">${esc(c.n)}</b> <span class="mono muted">${c.w}×${c.h}</span><span class="muted" style="display:block;font-size:.92rem">${esc(c.use)}</span><div class="btnrow"><button class="btn" type="button" data-ccopy="${c.id}">Copy SVG</button><button class="btn" type="button" data-copen="${c.id}">View large</button></div></figcaption></figure>`).join("");
  $$("[data-ccopy]").forEach(b=>b.addEventListener("click",()=>copyText($(`svg[data-coll="${b.dataset.ccopy}"]`).outerHTML)));
  $$("[data-copen]").forEach(b=>b.addEventListener("click",()=>{const c=COLLATERAL.find(x=>x.id===b.dataset.copen);showLight(collSVG(c,$("#pPal").value).replace(/ct-/g,"ctl-"),c.n,b)}))}
function showLight(svg,label,from){const lb=document.createElement("div");lb.className="lightbox";lb.setAttribute("role","dialog");lb.setAttribute("aria-modal","true");lb.setAttribute("aria-label",label);lb.innerHTML=`<button class="btn close" type="button">Close</button>${svg}`;document.body.appendChild(lb);const close=()=>{lb.remove();from&&from.focus()};lb.querySelector(".close").addEventListener("click",close);lb.addEventListener("click",e=>{if(e.target===lb)close()});lb.addEventListener("keydown",e=>{if(e.key==="Escape")close()});lb.querySelector(".close").focus()}
let loopI=0,loopT=null;
function loopSlides(){return [...POSTERS.map(p=>posterSVG(p,posterOpts()).replace(/pt-/g,"lp-")),...COLLATERAL.filter(c=>c.w>c.h).map(c=>collSVG(c,$("#pPal").value).replace(/ct-/g,"lc-"))]}
function loopShow(){const s=loopSlides();loopI=(loopI+s.length)%s.length;$("#loopStage").innerHTML=s[loopI];$("#loopPos").textContent=`${loopI+1} of ${s.length}`}
function initLoop(){$("#loopPrev").addEventListener("click",()=>{loopI--;loopShow()});$("#loopNext").addEventListener("click",()=>{loopI++;loopShow()});
  $("#loopPlay").addEventListener("click",()=>{if(loopT){clearInterval(loopT);loopT=null;$("#loopPlay").textContent="Play";$("#loopPlay").setAttribute("aria-pressed","false")}else{loopT=setInterval(()=>{if(!motionOn()){return}loopI++;loopShow()},8000);$("#loopPlay").textContent="Pause";$("#loopPlay").setAttribute("aria-pressed","true")}});
  $("#loopFull").addEventListener("click",()=>{const el=$("#loopStage");(el.requestFullscreen?el.requestFullscreen():Promise.reject()).catch(()=>toast("Full screen is not available here"))});loopShow()}
