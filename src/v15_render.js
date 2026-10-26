
/* ================= v1.5: MYTHS ================= */
let myCat="all";
function renderMyths(){
  $("#myChips").innerHTML=[["all","All"],...Object.entries(MYTH_CATS)].map(([k,v])=>`<button type="button" class="chip" data-c="${k}" aria-pressed="${k===myCat}">${v} <span class="mono">${k==="all"?MYTHS.length:MYTHS.filter(m=>m.c===k).length}</span></button>`).join("");
  $$("#myChips .chip").forEach(b=>b.addEventListener("click",()=>{myCat=b.dataset.c;renderMyths()}));
  const q=($("#myQ").value||"").toLowerCase(),quiz=$("#myMode").value==="quiz";let n=0;
  $("#myths").innerHTML=MYTHS.map(m=>{const vis=(myCat==="all"||m.c===myCat)&&(!q||(m.myth+m.fact).toLowerCase().includes(q));if(vis)n++;
    const factB=`<div class="mfact"><span class="eyebrow" style="color:var(--green)">${icon("check")} Fact</span><p>${esc(m.fact)}</p></div>`,mythB=`<div class="mmyth"><span class="eyebrow" style="color:var(--red)">${icon("bulb")} Myth</span><p><s>${esc(m.myth)}</s></p></div>`;
    return `<article class="card mcard2" id="${m.id}" data-c="${m.c}" ${vis?"":"hidden"}><div class="mhead">${icon(m.ic)}<span class="tag">${esc(MYTH_CATS[m.c])}</span></div>
      ${quiz?`<details><summary><b>${esc(m.myth)}</b> <span class="muted">Myth or fact? Open to check.</span></summary>${factB}</details>`:factB+mythB}
      <p class="muted" style="font-size:.88rem"><b>Limits:</b> ${esc(m.limits)}</p><div class="tags">${m.src.map(evTag).join("")}<a class="tag" href="${m.go}">${vIcon(m.go.slice(1))} Related: ${esc(vName(m.go.slice(1)))}</a><button type="button" class="tag" data-trace="myths:${m.id}" style="cursor:pointer">${icon("branch")} Trace</button></div></article>`}).join("");
  $("#myCount").textContent=`${n} of ${MYTHS.length} myths`;bindTrace($("#myths"));
  if(!$("#mythHow").children.length){$("#mythHow").innerHTML=MYTH_HOW.map(x=>`<li>${esc(x)}</li>`).join("");$("#mythRelief").innerHTML=reliefSVG(3)}
  buildDrawerCounts();scheduleFill()}

/* ================= v1.5: GET INVOLVED ================= */
let roleSel="all";
function renderInvolve(){
  $("#roleChips").innerHTML=[["all","All roles","people"],...ROLES.map(r=>[r.id,r.n,r.ic])].map(([k,v,ic])=>`<button type="button" class="chip" data-r="${k}" aria-pressed="${k===roleSel}">${icon(ic)} ${esc(v)}</button>`).join("");
  $$("#roleChips .chip").forEach(b=>b.addEventListener("click",()=>{roleSel=b.dataset.r;renderInvolve()}));
  $("#roles").innerHTML=ROLES.map(r=>`<article class="card rolecard" id="role-${r.id}" ${roleSel==="all"||roleSel===r.id?"":"hidden"}><div class="mhead"><span class="ricon">${icon(r.ic)}</span><h3>${esc(r.n)}</h3></div><p>${esc(r.who)}</p>
    <h4 class="mono muted">What it involves</h4><ul>${r.do.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><p class="muted" style="font-size:.9rem"><b>Not:</b> ${esc(r.not)}</p>
    <div class="tags">${r.with.map(w=>`<a class="tag" href="#networks">${icon("people")} ${esc(w)}</a>`).join("")}<a class="tag src" href="#pack-${r.id}" data-pack="${r.id}">${icon("doc")} Induction pack</a></div></article>`).join("");
  $$("[data-pack]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();selectPack(a.dataset.pack);$("#iv-induction").scrollIntoView()}));
  if(!$("#packTabs").children.length){
    $("#packTabs").innerHTML=ROLES.map((r,i)=>`<button role="tab" id="tab-pk-${r.id}" aria-controls="pack-${r.id}" aria-selected="${i===0}" ${i?'tabindex="-1"':""}>${icon(r.ic)} ${esc(r.n.split(" or ")[0])}</button>`).join("");
    const st=store.get("packs",{});
    $("#packPanels").innerHTML=ROLES.map((r,i)=>`<div class="tabpanel" role="tabpanel" id="pack-${r.id}" aria-labelledby="tab-pk-${r.id}" ${i?"hidden":""}><div class="packgrid"><div><h3>${esc(r.n)}: induction</h3><ol class="steps">${r.pack.map((p,j)=>`<li><label class="check" for="pk-${r.id}-${j}"><input type="checkbox" id="pk-${r.id}-${j}" ${st[r.id+j]?"checked":""}><span>${esc(p)}</span></label></li>`).join("")}</ol>
      <p class="mono muted" id="pkc-${r.id}"></p></div><div class="card"><h4>Works with</h4><ul>${r.with.map(w=>`<li>${esc(w)}</li>`).join("")}</ul><h4 style="margin-top:8px">Read first</h4><ul><li><a href="#myths">Myths and facts</a></li><li><a href="#toolkit">Organiser toolkit</a></li><li><a href="#networks">Networks</a></li></ul></div></div></div>`).join("");
    const upd=()=>{const s={};$$("#packPanels input").forEach(x=>{const [, , id,j]=x.id.split("-");if(x.checked)s[id+j]=1});store.set("packs",s);ROLES.forEach(r=>{const done=r.pack.filter((_,j)=>s[r.id+j]).length;$("#pkc-"+r.id).textContent=`${done} of ${r.pack.length} steps done`})};
    $$("#packPanels input").forEach(x=>x.addEventListener("change",upd));upd();
    const tl=$("#packTabs");tl.setAttribute("role","tablist");
    $$("#packTabs [role=tab]").forEach((t,i,all)=>{t.addEventListener("click",()=>activate(tl,t));t.addEventListener("keydown",e=>{let j=null;if(e.key==="ArrowRight")j=(i+1)%all.length;if(e.key==="ArrowLeft")j=(i-1+all.length)%all.length;if(j!==null){all[j].focus();activate(tl,all[j])}})});
    renderCollab();
    $("#levels").innerHTML=LEVELS.map((l,i)=>`<div class="level" style="--i:${i}"><div class="lvhead">${icon(l.ic)}<b>${esc(l.l)}</b></div><ul>${l.e.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")+`<div class="note" style="grid-column:1/-1">${icon("info")} <b>Network rules:</b> ${esc(NETWORK_RULES.t)} ${evTag(NETWORK_RULES.src)}</div>`;
    $("#objBody").innerHTML=OBJ_EX.map(o=>`<tr><td><b>${esc(o.lv)}</b></td><td>${esc(o.o)}</td><td>${esc(o.ev)}</td></tr>`).join("");
    $("#objRole").innerHTML=OBJ_EX.map(o=>`<option>${esc(o.lv)}</option>`).join("");
    const ob=()=>{$("#objOut").textContent=`Objective (${$("#objRole").value}): By ${$("#objBy").value}, I will ${$("#objAct").value}, as part of my contribution to inclusion and Black History Month 2026: ${THEME}. I will agree the time with my line manager, follow my organisation's rules on staff networks, and record the outcome as evidence.`};
    ["#objRole","#objAct","#objBy"].forEach(s=>$(s).addEventListener("input",ob));ob();$("#objCopy").addEventListener("click",()=>copyText($("#objOut").textContent,$("#objOut")));
  }
  buildDrawerCounts();scheduleFill()}
function selectPack(id){const t=$("#tab-pk-"+id);if(t)activate($("#packTabs"),t)}
function renderCollab(){const svg=$("#collabSvg");const C=[260,215],R=160;const n=COLLAB.length;
  const pts=COLLAB.map((c,i)=>{const a=-Math.PI/2+i*2*Math.PI/n;return[C[0]+R*Math.cos(a),C[1]+R*Math.sin(a)]});
  let s=`<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>`;
  pts.forEach((p,i)=>{const q=pts[(i+1)%n];const mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2;const ox=(mx-C[0])*.18,oy=(my-C[1])*.18;s+=`<path d="M${p[0].toFixed(1)} ${p[1].toFixed(1)}Q${(mx+ox).toFixed(1)} ${(my+oy).toFixed(1)} ${q[0].toFixed(1)} ${q[1].toFixed(1)}" fill="none" stroke="var(--line)" stroke-width="2" marker-end="url(#arr)" class="cedge" data-i="${i}"/>`});
  pts.forEach(p=>{s+=`<line x1="${C[0]}" y1="${C[1]}" x2="${p[0].toFixed(1)}" y2="${p[1].toFixed(1)}" stroke="var(--line)" stroke-dasharray="3 4"/>`});
  s+=`<circle cx="${C[0]}" cy="${C[1]}" r="62" fill="var(--gold)" fill-opacity=".18" stroke="var(--gold-ink)" stroke-width="2"/><text x="${C[0]}" y="${C[1]-4}" text-anchor="middle" class="cnode">Staff</text><text x="${C[0]}" y="${C[1]+14}" text-anchor="middle" class="cnode">networks</text>`;
  pts.forEach((p,i)=>{const [a,b,c]=COLLAB[i];const words=a.split(" ");const l1=words.slice(0,2).join(" "),l2=words.slice(2).join(" ");
    s+=`<g class="cnodeg" tabindex="0" role="button" data-i="${i}" aria-label="${esc(a)}: ${esc(b)}. Works most with ${esc(c)}" data-tip="<b>${esc(a)}</b><br>${esc(b)}<br>Works with: ${esc(c)}"><circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="44" fill="var(--surface)" stroke="var(--red)" stroke-width="2"/><text x="${p[0].toFixed(1)}" y="${(p[1]+(l2?-2:4)).toFixed(1)}" text-anchor="middle" class="cnode">${esc(l1)}</text>${l2?`<text x="${p[0].toFixed(1)}" y="${(p[1]+14).toFixed(1)}" text-anchor="middle" class="cnode">${esc(l2)}</text>`:""}</g>`});
  svg.insertAdjacentHTML("beforeend",s);bindTips(svg);
  $("#collabBody").innerHTML=COLLAB.map(([a,b,c],i)=>`<tr data-i="${i}"><td><b>${esc(a)}</b></td><td>${esc(b)}</td><td>${esc(c)}</td></tr>`).join("");
  $$("#collabSvg .cnodeg").forEach(g=>{const on=()=>{$$("#collabSvg .cnodeg").forEach(x=>x.classList.toggle("on",x===g));$$("#collabBody tr").forEach(r=>r.classList.toggle("on",r.dataset.i===g.dataset.i))};g.addEventListener("click",on);g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();on()}})})}

/* ================= v1.5: CAREERS ================= */
function renderCareers(){
  if(!$("#scSector").options.length){$("#scSector").innerHTML=`<option value="all">All sectors</option>`+SC_SECTORS.map(s=>`<option>${s}</option>`).join("");$("#scStage").innerHTML=`<option value="all">All stages</option>`+SC_STAGES.map(s=>`<option>${s}</option>`).join("");
    ["#scSector","#scStage","#scStatus"].forEach(s=>$(s).addEventListener("change",renderCareers));
    $("#pathway").innerHTML=PATHWAY.map((p,i)=>{const k=SCHEMES.filter(s=>s.stage===p.s).length;return `<button type="button" class="pstep" data-stage="${esc(p.s)}" style="--i:${i}"><span class="ricon">${icon(p.ic)}</span><b>${esc(p.s)}</b><span>${esc(p.d)}</span><span class="mono muted">Helps: ${esc(p.help)}</span><span class="tag">${k} ${k===1?"scheme":"schemes"}</span></button>`}).join("");
    $$("#pathway [data-stage]").forEach(b=>b.addEventListener("click",()=>{$("#scStage").value=b.dataset.stage;renderCareers();$("#ca-schemes").scrollIntoView()}));
    $("#learnCards").innerHTML=LEARN.map(l=>`<div class="card"><div class="mhead">${icon(l.ic)}<h3>${esc(l.h)}</h3></div><p>${esc(l.p)}</p><div class="tags">${l.src?evTag(l.src):'<span class="tag">Practice guidance</span>'}</div></div>`).join("")}
  const se=$("#scSector").value,sg=$("#scStage").value,ss=$("#scStatus").value;let n=0;
  $("#schemes").innerHTML=SCHEMES.map(s=>{const v=(se==="all"||s.sec===se)&&(sg==="all"||s.stage===sg)&&(ss==="all"||s.st===ss);if(v)n++;
    return `<article class="card scard2" id="${s.id}" ${v?"":"hidden"}><div class="mhead">${icon(s.focus==="framework"?"shield":s.focus==="targeted"?"star":"briefcase")}<h3>${esc(s.n)}</h3></div>
    <div class="tags"><span class="tag">${esc(s.sec)}</span><span class="tag">${esc(s.stage)}</span><span class="tag st-${s.st}">${SC_STATUS[s.st]} · checked ${META.reviewed}</span><span class="tag">${esc(SC_FOCUS[s.focus])}</span></div>
    <dl><dt>Who it is for</dt><dd>${esc(s.who)}</dd><dt>What it offers</dt><dd>${esc(s.what)}</dd>${s.note?`<dt>Note</dt><dd>${esc(s.note)}</dd>`:""}</dl>
    <div class="tags"><a class="tag" href="${esc(s.u)}" target="_blank" rel="noopener">${icon("link")} Official page</a>${s.src.map(evTag).join("")}<button type="button" class="tag" data-trace="schemes:${s.id}" style="cursor:pointer">${icon("branch")} Trace</button></div></article>`}).join("");
  $("#scCount").textContent=`${n} of ${SCHEMES.length} schemes`;bindTrace($("#schemes"));buildDrawerCounts();scheduleFill()}

/* ================= v1.5: LINEAGE AND TRACEABILITY ================= */
const DATASETS=[
 {k:"events",n:"Timeline events",ic:"clock",arr:()=>EVENTS,id:e=>e.id,lab:e=>(e.yl||e.y)+": "+e.t,srcs:e=>[e.src,...(e.src2||[])],view:"history",href:e=>"#"+e.id,out:["pages","jsonld","search"],chk:["C02","C04"]},
 {k:"places",n:"UK history places",ic:"pin",arr:()=>PLACES,id:p=>p.id,lab:p=>p.n,srcs:p=>p.ev.map(id=>(EVENTS.find(e=>e.id===id)||{}).src),view:"history",href:()=>"#hi-map",out:["pages","jsonld"],chk:["C09","C31","C38"],geo:1},
 {k:"diaspora",n:"Diaspora places",ic:"globe",arr:()=>DIASPORA,id:d=>d.id,lab:d=>d.n,srcs:d=>[d.src],view:"diaspora",href:()=>"#di-map",out:["pages","jsonld"],chk:["C14","C31","C38","C39"],geo:1},
 {k:"myths",n:"Myths and facts",ic:"bulb",arr:()=>MYTHS,id:m=>m.id,lab:m=>m.myth,srcs:m=>m.src,view:"myths",href:m=>"#"+m.id,out:["pages","jsonld"],chk:["C35"]},
 {k:"schemes",n:"Career schemes",ic:"briefcase",arr:()=>SCHEMES,id:s=>s.id,lab:s=>s.n,srcs:s=>s.src,view:"careers",href:s=>"#"+s.id,out:["pages","jsonld"],chk:["C36"]},
 {k:"roles",n:"Roles and induction packs",ic:"people",arr:()=>ROLES,id:r=>r.id,lab:r=>r.n,srcs:()=>[],view:"involve",href:r=>"#role-"+r.id,out:["pages","jsonld","office"],chk:["C37"]},
 {k:"stereos",n:"Stereotypes and evidence",ic:"people",arr:()=>STEREOS,id:s=>s.id,lab:s=>s.s,srcs:s=>s.src,view:"myths",href:s=>"#"+s.id,out:["pages"],chk:["C51"]},
 {k:"tech",n:"Frontier tech strategies",ic:"cpu",arr:()=>TECH_POLICY,id:(p,i)=>"tp-"+i,lab:p=>p.y+": "+p.n,srcs:p=>[p.src],view:"tech",href:(p,i)=>"#ft-policy",out:["pages"],chk:["C53"]},
 {k:"courses",n:"Courses and training",ic:"award",arr:()=>COURSES,id:(c,i)=>"course-"+i,lab:c=>c.n,srcs:()=>[],view:"careers",href:()=>"#ca-courses",out:["pages"],chk:["C50"]},
 {k:"themes",n:"Past national themes",ic:"spark",arr:()=>THEMES,id:t=>"theme-"+t.y,lab:t=>t.y+": "+t.t,srcs:t=>[t.src],view:"theme",href:()=>"#th-past",out:["pages","posters"],chk:["C26","C01"]},
 {k:"spotlights",n:"Spotlights",ic:"star",arr:()=>SPOTLIGHTS,id:(s,i)=>"spot-"+i,lab:s=>s.n,srcs:s=>[s.src],view:"overview",href:s=>s.href,out:["pages"],chk:["C30"]},
 {k:"calendar",n:"Calendar events",ic:"calendar",arr:()=>calEvents(),id:e=>e.id,lab:e=>e.t,srcs:e=>[e.src],view:"calendar",href:()=>"#calendar",out:["pages","ics"],chk:["C22"]},
 {k:"motifs",n:"Motifs",ic:"symbol",arr:()=>MOTIFS,id:m=>m.id,lab:m=>m.n,srcs:()=>[],view:"africa",href:()=>"#af-map",out:["pages","jsonld","posters"],chk:["C15","C17"]},
 {k:"proverbs",n:"Proverbs",ic:"quote",arr:()=>PROVERBS,id:p=>p.id,lab:p=>p.o,srcs:p=>[p.src],view:"africa",href:()=>"#af-proverbs",out:["pages","jsonld"],chk:["C27"]},
 {k:"words",n:"Words for community",ic:"quote",arr:()=>WORDS,id:w=>w.id,lab:w=>w.w,srcs:()=>[],view:"africa",href:()=>"#af-words",out:["pages","jsonld"],chk:["C16","C29"]},
 {k:"customs",n:"Customs",ic:"calendar",arr:()=>CUSTOMS,id:(c,i)=>"custom-"+i,lab:c=>c.n,srcs:()=>[],view:"africa",href:()=>"#af-customs",out:["pages","jsonld"],chk:[]},
 {k:"recipes",n:"Recipes",ic:"bowl",arr:()=>RECIPES,id:r=>r.id,lab:r=>r.n,srcs:()=>[],view:"food",href:()=>"#fd-recipes",out:["pages"],chk:["C23"]},
 {k:"networks",n:"Networks",ic:"people",arr:()=>NETWORKS,id:(n,i)=>"nw-"+i,lab:n=>n.n,srcs:()=>[],view:"networks",href:()=>"#nw-list",out:["pages"],chk:["C24"]},
 {k:"glossary",n:"Glossary terms",ic:"book",arr:()=>GLOSSARY,id:g=>"term-"+g.id,lab:g=>g.t,srcs:()=>[],view:"knowledge",href:()=>"#kn-main",out:["pages","jsonld","csv"],chk:["C07"]},
 {k:"posters",n:"Posters and collateral",ic:"image",arr:()=>[...POSTERS,...COLLATERAL],id:p=>"poster-"+p.id,lab:p=>p.name||p.n,srcs:()=>[],view:"posters",href:()=>"#posters",out:["posters","office"],chk:["C01","C05"]}
];
const LIN_TIERS=[["src","Read sources"],["loc","Located sources"],["ref","No source: reference or original"]];
const LIN_OUT=[["pages","Hub pages and search"],["jsonld","JSON-LD open data"],["ics","Calendar (.ics, CSV)"],["csv","Glossary CSV"],["posters","Posters, collateral, PNG, PDF"],["office","Slide and Word templates"],["search","Site search index"]];
function lineage(){const nodes=[],edges=[];const add=(id,l,col,extra={})=>{nodes.push({id,l,col,...extra})};
  LIN_TIERS.forEach(([k,l])=>add("t:"+k,l,0));
  DATASETS.forEach(d=>add("d:"+d.k,d.n,1,{ic:d.ic,count:d.arr().length}));
  [...new Set(DATASETS.map(d=>d.view))].forEach(v=>add("v:"+v,vName(v),2,{ic:VIEW_ICONS[v]}));
  LIN_OUT.forEach(([k,l])=>add("o:"+k,l,3));
  DATASETS.forEach(d=>{const w={src:0,loc:0,ref:0};d.arr().forEach(it=>{const ss=d.srcs(it).filter(Boolean);if(!ss.length)w.ref++;else{const t=ss.some(s=>tier(s)==="src")?"src":"loc";w[t]++}});
    Object.entries(w).forEach(([t,n])=>{if(n)edges.push({a:"t:"+t,b:"d:"+d.k,w:n})});edges.push({a:"d:"+d.k,b:"v:"+d.view,w:d.arr().length});d.out.forEach(o=>edges.push({a:"d:"+d.k,b:"o:"+o,w:1}))});
  return{nodes,edges}}
function renderLineage(){const host=$("#linSvg");if(!host||host.dataset.done)return;host.dataset.done=1;const {nodes,edges}=lineage();window.__lineage={nodes:nodes.length,edges:edges.length,sumTier:edges.filter(e=>e.a.startsWith("t:")).reduce((a,e)=>a+e.w,0),items:DATASETS.reduce((a,d)=>a+d.arr().length,0),bad:edges.filter(e=>!nodes.find(n=>n.id===e.a)||!nodes.find(n=>n.id===e.b)).length};
  const W=960,colX=[10,250,520,740],colW=[180,200,170,210],rowH=26;const cols=[0,1,2,3].map(c=>nodes.filter(n=>n.col===c));const H=Math.max(...cols.map(c=>c.length))*rowH+20;
  cols.forEach(c=>{const gap=(H-20)/c.length;c.forEach((n,i)=>{n.x=colX[n.col];n.y=10+i*gap+(gap-20)/2;n.w=colW[n.col]})});
  const byId=Object.fromEntries(nodes.map(n=>[n.id,n]));const mx=Math.max(...edges.map(e=>e.w));
  let s=`<g class="ledges">`+edges.map((e,i)=>{const a=byId[e.a],b=byId[e.b];const x1=a.x+a.w,y1=a.y+10,x2=b.x,y2=b.y+10,cx=(x1+x2)/2;return `<path class="ledge" data-a="${e.a}" data-b="${e.b}" d="M${x1} ${y1.toFixed(1)}C${cx} ${y1.toFixed(1)} ${cx} ${y2.toFixed(1)} ${x2} ${y2.toFixed(1)}" stroke-width="${(1.2+8*Math.sqrt(e.w/mx)).toFixed(1)}"><title>${esc(a.l)} → ${esc(b.l)}: ${e.w}</title></path>`}).join("")+`</g>`;
  s+=nodes.map(n=>`<g class="lnode c${n.col}" data-id="${n.id}" tabindex="0" role="button" aria-pressed="false" aria-label="${esc(n.l)}${n.count!==undefined?`, ${n.count} items`:""}"><rect x="${n.x}" y="${n.y.toFixed(1)}" width="${n.w}" height="20" rx="4"/><text x="${n.x+8}" y="${(n.y+14).toFixed(1)}">${esc(n.l.length>28?n.l.slice(0,27)+"…":n.l)}${n.count!==undefined?` · ${n.count}`:""}</text></g>`).join("");
  host.setAttribute("viewBox",`0 0 ${W} ${H}`);host.insertAdjacentHTML("beforeend",s);
  $("#linHeads").innerHTML=["Evidence","Datasets","Pages","Outputs"].map((h,i)=>`<span style="left:${(colX[i]/W*100).toFixed(1)}%">${h}</span>`).join("");
  const sel=id=>{const up=new Set([id]),down=new Set([id]);let ch=true;while(ch){ch=false;edges.forEach(e=>{if(down.has(e.a)&&!down.has(e.b)){down.add(e.b);ch=true}if(up.has(e.b)&&!up.has(e.a)){up.add(e.a);ch=true}})}const all=new Set([...up,...down]);
    $$("#linSvg .lnode").forEach(g=>{g.classList.toggle("dim",!all.has(g.dataset.id));g.setAttribute("aria-pressed",g.dataset.id===id)});$$("#linSvg .ledge").forEach(p=>p.classList.toggle("on",all.has(p.dataset.a)&&all.has(p.dataset.b)&&(up.has(p.dataset.b)||down.has(p.dataset.a))));
    const n=byId[id];$("#linSel").innerHTML=`<b>${esc(n.l)}</b> · fed by ${[...up].filter(x=>x!==id).map(x=>esc(byId[x].l)).join(", ")||"nothing upstream"} · feeds ${[...down].filter(x=>x!==id).map(x=>esc(byId[x].l)).join(", ")||"nothing downstream"}`};
  $$("#linSvg .lnode").forEach(g=>{g.addEventListener("click",()=>sel(g.dataset.id));g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();sel(g.dataset.id)}})});
  $("#linReset").addEventListener("click",()=>{$$("#linSvg .lnode").forEach(g=>{g.classList.remove("dim");g.setAttribute("aria-pressed","false")});$$("#linSvg .ledge").forEach(p=>p.classList.remove("on"));$("#linSel").textContent="Select any box to follow its lineage."});
  $("#linBody").innerHTML=edges.map(e=>`<tr><td>${esc(byId[e.a].l)}</td><td>${esc(byId[e.b].l)}</td><td class="mono">${e.w}</td></tr>`).join("");
  // trace picker
  const opts=DATASETS.flatMap(d=>d.arr().map((it,i)=>`<option value="${d.k}:${d.id(it,i)}">${esc(d.n)}: ${esc(String(d.lab(it)).slice(0,80))}</option>`)).join("");$("#trPick").innerHTML=opts;$("#trPick").addEventListener("change",()=>trace($("#trPick").value));trace($("#trPick").value)}
function traceData(key){const [k,...rest]=key.split(":");const idv=rest.join(":");const d=DATASETS.find(x=>x.k===k);if(!d)return null;const arr=d.arr();const i=arr.findIndex((it,j)=>d.id(it,j)===idv);if(i<0)return null;const it=arr[i];
  return{d,it,srcs:d.srcs(it).filter(Boolean),href:d.href(it),label:d.lab(it)}}
function trace(key){const t=traceData(key);const out=$("#trOut");if(!t){out.innerHTML=`<p>Not found.</p>`;return}
  const step=(ic,h,b)=>`<li class="trstep"><span class="ricon">${icon(ic)}</span><div><span class="eyebrow">${h}</span><div>${b}</div></div></li>`;
  out.innerHTML=`<ol class="trchain">${step("shield","Evidence",t.srcs.length?t.srcs.map(s=>`${evTag(s)} <span class="muted">${esc(SOURCES[s]?SOURCES[s].t:"")}</span>`).join("<br>"):'<span class="tag ref">No external source: reference history or original content made for this hub</span>')}
   ${step(t.d.ic,"Dataset",`<b>${esc(t.d.n)}</b> · <span class="mono">${esc(key)}</span><br>${esc(String(t.label))}`)}
   ${step(VIEW_ICONS[t.d.view]||"info","Shown on",`<a href="${t.href}">${esc(vName(t.d.view))}</a>`)}
   ${step("layers","Outputs",t.d.out.map(o=>esc((LIN_OUT.find(x=>x[0]===o)||[o,o])[1])).join(" · "))}
   ${step("check","Guarded by checks",t.d.chk.length?t.d.chk.map(c=>`<a class="tag" href="#as-checks">${c}</a>`).join(" "):"No specific check yet")}</ol>`}
function bindTrace(root){root.querySelectorAll("[data-trace]").forEach(b=>{if(b._tr)return;b._tr=1;b.addEventListener("click",()=>{location.hash="#kn-lineage";setTimeout(()=>{renderLineage();$("#trPick").value=b.dataset.trace;trace(b.dataset.trace);$("#kn-trace").scrollIntoView()},60)})})}

/* ================= v1.5: FILL GAPS WITH MOTIFS ================= */
function reliefSVG(seed){const syms=MOTIFS.filter(m=>m.kind!=="pattern"&&SYM[m.id]);const m=syms[seed%syms.length]||MOTIFS[0];return `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">${SYM[m.id]||""}</svg><span class="mono">${esc(m.n)}</span>`}
function fillGaps(){$$(".filler").forEach(f=>f.remove());let seed=0,made=0;
  $$(".view:not([hidden]) .grid.g2, .view:not([hidden]) .grid.g3").forEach(g=>{if(g.offsetParent===null)return;const cols=getComputedStyle(g).gridTemplateColumns.split(" ").filter(Boolean).length;if(cols<2)return;
    const kids=[...g.children].filter(c=>!c.hidden&&c.offsetParent!==null&&getComputedStyle(c).gridColumnEnd!=="-1");const n=kids.length;if(!n)return;const rem=n%cols;if(!rem)return;
    for(let i=0;i<cols-rem;i++){const f=document.createElement("div");f.className="filler";f.setAttribute("aria-hidden","true");f.innerHTML=reliefSVG(seed++);g.appendChild(f);made++}});
  window.__fill={made,ok:gridsComplete()};return made}
function gridsComplete(){const bad=[];$$(".view:not([hidden]) .grid.g2, .view:not([hidden]) .grid.g3").forEach(g=>{if(g.offsetParent===null)return;const cols=getComputedStyle(g).gridTemplateColumns.split(" ").filter(Boolean).length;if(cols<2)return;const n=[...g.children].filter(c=>!c.hidden&&c.offsetParent!==null).length;if(n&&n%cols)bad.push(g.id||g.parentElement.id||"grid")});return bad}
let _fillT=null;function scheduleFill(){clearTimeout(_fillT);_fillT=setTimeout(fillGaps,60)}

/* ================= v1.5: TEMPLATES AND EXTRA COLLATERAL ================= */
const TEMPLATES=[
 {f:"templates/bhm2026-slide-template.pptx",n:"Branded slide deck template",ic:"slides",t:"PowerPoint (.pptx), 16:9",d:"Title, section, content, two-column, statistic, quote or proverb, image and closing layouts, with speaker notes on accessibility. Opens in PowerPoint, Google Slides and Keynote.",who:"Speakers, network leads, campaigners, sponsors"},
 {f:"templates/bhm2026-report-template.docx",n:"Briefing note and event report template",ic:"doc",t:"Word (.docx), A4",d:"Purpose, summary, what happened, who took part, what people committed to, data protection and next steps. Headings are real Word headings for screen readers.",who:"Organisers, advocates, network leads"},
 {f:"templates/bhm2026-induction-pack.docx",n:"Induction pack for every role",ic:"people",t:"Word (.docx), A4",d:"Allies, advocates, campaigners, sponsors, mentors, ambassadors, organisers and network members: what each role is, first steps, who to work with, and example objectives.",who:"Anyone starting a role"}];
COLLATERAL.push(
 {id:"cert",n:"Certificate of recognition",w:1754,h:1240,use:"Thank volunteers, speakers and organisers. Print A4 landscape and sign.",
  draw:(P,o)=>`<rect width="1754" height="1240" fill="${P.bg}"/><rect x="40" y="40" width="1674" height="1160" fill="none" stroke="${P.gold}" stroke-width="6" stroke-dasharray="60 14 14 14"/><g transform="translate(1390 110)">${hubMark(240,P)}</g><text x="140" y="230" font-family="${FM}" font-size="34" letter-spacing="6" fill="${P.gold}">CERTIFICATE OF RECOGNITION</text><text x="140" y="340" font-family="${FB}" font-size="42" fill="${P.mute}">Presented to</text><text x="140" y="480" font-family="${FD}" font-weight="800" font-size="72" fill="${P.fg}">______________________</text><text font-family="${FB}" font-size="44" fill="${P.fg}" y="610">${tspans(wrap("for your contribution to Black History Month 2026: Honouring Our Communities.",56),140,60)}</text><text x="140" y="1010" font-family="${FB}" font-size="34" fill="${P.mute}">Signed ____________________</text><text x="1000" y="1010" font-family="${FB}" font-size="34" fill="${P.mute}">Date ______________</text><text x="140" y="1110" font-family="${FM}" font-size="26" letter-spacing="3" fill="${P.gold}">${esc((o.org||"").toUpperCase().slice(0,60))}</text>`},
 {id:"pledge",n:"Pledge card",w:1080,h:1350,use:"Hand out at events or post on a pledge wall. People write one action they will take.",
  draw:(P,o)=>`<rect width="1080" height="1350" fill="${P.bg}"/>${weaveBand(0,0,1080,60,P)}<text x="80" y="190" font-family="${FM}" font-size="30" letter-spacing="5" fill="${P.gold}">MY PLEDGE</text><text font-family="${FD}" font-weight="800" font-size="70" fill="${P.fg}" y="300">${tspans(wrap("This month and beyond, I will:",20),80,84)}</text>${[0,1,2].map(i=>`<rect x="80" y="${520+i*150}" width="40" height="40" fill="none" stroke="${P.gold}" stroke-width="4"/><line x1="150" x2="1000" y1="${560+i*150}" y2="${560+i*150}" stroke="${P.mute}" stroke-width="2"/>`).join("")}<text x="80" y="1080" font-family="${FB}" font-size="34" fill="${P.mute}">Name (optional) ________________</text><text x="80" y="1250" font-family="${FM}" font-size="26" letter-spacing="3" fill="${P.gold}">HONOURING OUR COMMUNITIES · BHM 2026</text>`},
 {id:"invite",n:"Invitation",w:1240,h:1748,use:"Email or print (A5) to invite colleagues. Uses the event details from the poster settings.",
  draw:(P,o)=>`<rect width="1240" height="1748" fill="${P.bg}"/>${weaveBand(0,1668,1240,80,P)}<g transform="translate(860 90)">${hubMark(280,P)}</g><text x="90" y="200" font-family="${FM}" font-size="34" letter-spacing="6" fill="${P.gold}">YOU ARE INVITED</text><text font-family="${FD}" font-weight="800" font-size="96" fill="${P.fg}" y="560">${tspans(wrap(o.title||"Event title",18),90,110)}</text><text x="90" y="1060" font-family="${FB}" font-size="44" fill="${P.fg}">${esc(o.date||"Date")}</text><text x="90" y="1130" font-family="${FB}" font-size="44" fill="${P.fg}">${esc(o.time||"Time")}</text><text x="90" y="1200" font-family="${FB}" font-size="44" fill="${P.fg}">${esc((o.venue||"Venue").slice(0,40))}</text><text x="90" y="1440" font-family="${FD}" font-weight="800" font-size="56" fill="${P.gold}">Honouring Our Communities</text><text x="90" y="1510" font-family="${FM}" font-size="28" letter-spacing="3" fill="${P.mute}">BLACK HISTORY MONTH · OCTOBER 2026</text>`},
 {id:"programme",n:"Event programme",w:1240,h:1748,use:"Running order for an event. Print A5 or share on screen.",
  draw:(P,o)=>`<rect width="1240" height="1748" fill="${P.bg}"/>${weaveBand(0,0,1240,60,P)}<text x="90" y="200" font-family="${FM}" font-size="34" letter-spacing="6" fill="${P.gold}">PROGRAMME</text><text font-family="${FD}" font-weight="800" font-size="72" fill="${P.fg}" y="320">${tspans(wrap(o.title||"Event title",24),90,84)}</text>${[0,1,2,3,4,5].map(i=>`<text x="90" y="${640+i*140}" font-family="${FM}" font-size="40" fill="${P.gold}">__:__</text><line x1="290" x2="1150" y1="${640+i*140}" y2="${640+i*140}" stroke="${P.mute}" stroke-width="2"/>`).join("")}<text x="90" y="1600" font-family="${FB}" font-size="32" fill="${P.mute}">Access: step-free, captions, quiet room. Ask us.</text>`},
 {id:"talker",n:"Table talker: start a conversation",w:1240,h:874,use:"Fold and stand on canteen or meeting tables. Carries a proverb with its translation.",
  draw:(P,o)=>{const p=PROVERBS[0];return `<rect width="1240" height="874" fill="${P.bg}"/>${weaveBand(0,814,1240,60,P)}<text x="80" y="140" font-family="${FM}" font-size="30" letter-spacing="5" fill="${P.gold}">TALK ABOUT IT</text><text font-family="${FD}" font-weight="800" font-size="62" fill="${P.fg}" y="260">${tspans(wrap(p.o,30),80,74)}</text><text font-family="${FB}" font-size="38" fill="${P.mute}" y="520">${tspans(wrap("“"+p.tr+"” ("+p.from+")",52),80,48)}</text><text x="80" y="740" font-family="${FB}" font-size="34" fill="${P.fg}">What does community mean to you?</text>`}},
 {id:"ambassador",n:"Ambassador lanyard card",w:1080,h:1350,use:"Lets colleagues know who to ask. Print at A6 for lanyards.",
  draw:(P,o)=>`<rect width="1080" height="1350" fill="${P.bg}"/><g transform="translate(390 120)">${hubMark(300,P)}</g><text x="540" y="620" text-anchor="middle" font-family="${FM}" font-size="36" letter-spacing="6" fill="${P.gold}">ASK ME</text><text x="540" y="760" text-anchor="middle" font-family="${FD}" font-weight="800" font-size="84" fill="${P.fg}">BHM 2026</text><text x="540" y="870" text-anchor="middle" font-family="${FD}" font-weight="800" font-size="84" fill="${P.fg}">ambassador</text><text x="540" y="1040" text-anchor="middle" font-family="${FB}" font-size="38" fill="${P.mute}">Events, resources and networks</text><text x="540" y="1250" text-anchor="middle" font-family="${FM}" font-size="26" letter-spacing="3" fill="${P.gold}">HONOURING OUR COMMUNITIES</text>`},
 {id:"st-title",n:"Slide template: title",w:1920,h:1080,use:"Opening slide. The PowerPoint template has editable versions of every slide layout.",
  draw:(P,o)=>`<rect width="1920" height="1080" fill="${P.bg}"/><g transform="translate(1420 300)">${hubMark(380,P)}</g><text x="140" y="300" font-family="${FM}" font-size="32" letter-spacing="6" fill="${P.gold}">BLACK HISTORY MONTH 2026</text><text font-family="${FD}" font-weight="800" font-size="104" fill="${P.fg}" y="460">${tspans(wrap(o.title||"Presentation title",20),140,118)}</text><text x="140" y="900" font-family="${FB}" font-size="40" fill="${P.mute}">${esc((o.org||"Your organisation").slice(0,50))} · Honouring Our Communities</text>`},
 {id:"st-section",n:"Slide template: section divider",w:1920,h:1080,use:"Between parts of a talk.",
  draw:(P,o)=>`<rect width="1920" height="1080" fill="${P.bg}"/>${weaveBand(0,0,60,1080,P)}<text x="200" y="420" font-family="${FM}" font-size="40" letter-spacing="6" fill="${P.gold}">PART 1</text><text x="200" y="580" font-family="${FD}" font-weight="800" font-size="120" fill="${P.fg}">Section title</text><text x="200" y="700" font-family="${FB}" font-size="44" fill="${P.mute}">One line on what this part covers</text>`},
 {id:"st-content",n:"Slide template: content",w:1920,h:1080,use:"One message per slide, three points at most.",
  draw:(P,o)=>`<rect width="1920" height="1080" fill="${P.light||"#F7F3EA"}"/><rect width="1920" height="1080" fill="${P.bg}" opacity="${P===PAL.dark?1:0}"/><text x="140" y="220" font-family="${FD}" font-weight="800" font-size="80" fill="${P.fg}">The one message of this slide</text>${[0,1,2].map(i=>`<circle cx="160" cy="${400+i*150}" r="18" fill="${[P.gold,P.red,P.green][i]}"/><text x="220" y="${414+i*150}" font-family="${FB}" font-size="48" fill="${P.fg}">Supporting point ${i+1}, in plain words</text>`).join("")}<g transform="translate(1700 900)">${hubMark(120,P)}</g><text x="140" y="1010" font-family="${FM}" font-size="24" letter-spacing="3" fill="${P.mute}">SOURCE: NAME THE SOURCE HERE</text>`},
 {id:"st-quote",n:"Slide template: proverb or quote",w:1920,h:1080,use:"A proverb with its language and translation, or a quote with consent.",
  draw:(P,o)=>{const p=PROVERBS[1]||PROVERBS[0];return `<rect width="1920" height="1080" fill="${P.bg}"/><text x="140" y="300" font-family="${FD}" font-weight="800" font-size="200" fill="${P.gold}">“</text><text font-family="${FD}" font-weight="800" font-size="76" fill="${P.fg}" y="420">${tspans(wrap(p.o,36),140,90)}</text><text font-family="${FB}" font-size="44" fill="${P.mute}" y="720">${tspans(wrap(p.tr,60),140,56)}</text><text x="140" y="940" font-family="${FM}" font-size="28" letter-spacing="3" fill="${P.gold}">${esc(p.from.toUpperCase().slice(0,70))}</text>`}}
);
const TEMPLATE_FILES=%%TPL%%;
let dl=null;
function renderTemplates(){const h=$("#templates");if(!h)return;h.innerHTML=TEMPLATES.map((t,i)=>{const name=t.f.split("/").pop();const kb=TEMPLATE_FILES[name]?Math.round(TEMPLATE_FILES[name].length*3/4/1024):0;return `<div class="card"><div class="mhead"><span class="ricon">${icon(t.ic)}</span><h3>${esc(t.n)}</h3></div><p class="mono muted">${esc(t.t)} · ${kb} KB</p><p>${esc(t.d)}</p><p class="muted" style="font-size:.9rem"><b>For:</b> ${esc(t.who)}</p><div class="btnrow"><button class="btn solid" type="button" data-tpl="${esc(name)}">${icon("doc")} Download</button></div><p class="muted tplnote" style="font-size:.85rem" aria-live="polite"></p></div>`}).join("");
  $$("[data-tpl]").forEach(b=>b.addEventListener("click",async()=>{const name=b.dataset.tpl,note=b.closest(".card").querySelector(".tplnote");if(!dl){try{dl=await claude.use("downloads")}catch(e){dl=null}}
    if(!dl){note.textContent="Downloads are not available in this view. The file is included in the media kit supplied with the hub.";return}
    try{const bin=atob(TEMPLATE_FILES[name]);const u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);await dl.save({filename:name,data:u});note.textContent="Saved."}catch(e){note.textContent=e&&e.code==="declined"?"Download cancelled.":"The download did not complete. Try again, or use the media kit."}}));
  window.__tpl={n:Object.keys(TEMPLATE_FILES).length,want:TEMPLATES.length,bytes:Object.values(TEMPLATE_FILES).reduce((a,v)=>a+v.length,0)}}

/* ================= v1.5: JSON-LD EXTRAS ================= */
function ldExtra(base){return[
 ...MYTHS.map(m=>({"@type":"ClaimReview","@id":base+m.id,"claimReviewed":m.myth,"reviewBody":m.fact,"reviewRating":{"@type":"Rating","alternateName":"False"},"citation":m.src.filter(s=>SOURCES[s]).map(s=>SOURCES[s].u)})),
 ...ROLES.map(r=>({"@type":["DefinedTerm","skos:Concept"],"@id":base+"role-"+r.id,"name":r.n,"description":r.who,"inDefinedTermSet":base+"roles"})),
 ...SCHEMES.map(s=>({"@type":"EducationalOccupationalProgram","@id":base+s.id,"name":s.n,"description":s.what,"url":s.u,"programPrerequisites":s.who,"keywords":[s.sec,s.stage,SC_STATUS[s.st]],"citation":s.src.filter(x=>SOURCES[x]).map(x=>SOURCES[x].u)}))]}

/* ================= v1.5: ICONS IN NAVIGATION, SITEMAP, HEADINGS ================= */
function iconise(){
  $$("#gnav .gbtn").forEach((b,i)=>{if(!b.querySelector(".ico"))b.insertAdjacentHTML("afterbegin",icon(GROUP_ICONS[NAV_GROUPS[i].g]))});
  $$("#gnav .gmenu a[data-view], #moreMenu a[data-view], #gnav > a[data-view]").forEach(a=>{if(!a.querySelector(".ico"))a.insertAdjacentHTML("afterbegin",vIcon(a.dataset.view))});
  $$(".view").forEach(v=>{const id=v.id.slice(2);const e=v.querySelector(".sechead .eyebrow");if(e&&!e.querySelector(".ico"))e.insertAdjacentHTML("afterbegin",vIcon(id))});
  $$("section.block").forEach(s=>{const h=s.querySelector(".sechead h2");if(h&&!h.querySelector(".ico")&&s.dataset.icon)h.insertAdjacentHTML("afterbegin",`<span class="h2ico">${icon(s.dataset.icon)}</span>`)});}
