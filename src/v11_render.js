/* ================= v1.1 RENDERERS ================= */
const tileURI=t=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${T[t].w}" height="${T[t].h}" viewBox="0 0 ${T[t].w} ${T[t].h}">${T[t].s}</svg>`);
function patternPreview(id){const t=T[id];return `<svg viewBox="0 0 300 64" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs><pattern id="pp-${id}" width="${t.w}" height="${t.h}" patternUnits="userSpaceOnUse">${t.s}</pattern></defs><rect width="300" height="64" fill="url(#pp-${id})"/></svg>`}
function insertBands(){Object.entries(BANDS).forEach(([v,p])=>{const view=$("#v-"+v);if(!view||view.querySelector(".band"))return;const m=MOTIFS.find(x=>x.id===p);
  view.insertAdjacentHTML("afterbegin",`<div class="band" style="background-image:url('${tileURI(p)}')" aria-hidden="true"></div><p class="bandcap">Band: ${esc(m.n)} · ${esc(m.people)} · <a href="#africa">About the motifs</a></p>`)})}

function renderRibbon(){const one=(dup)=>WORDS.map(w=>`<span lang="${w.lang}" data-word title="${esc(w.g)}"${dup?' class="dup" aria-hidden="true"':""}>${esc(w.w)}<i>${esc(w.l)}</i></span>`).join("");$("#ribbon").innerHTML=one(false)+one(true)}
function renderEasy(){$("#easyRead").innerHTML=EASY.map(([i,t])=>`<li>${icon(i).replace('class="ico"','')}<span>${esc(t)}</span></li>`).join("")}

/* Africa */
let afRegion="all";
function renderAfrica(){const svg=$("#afSvg");const [x,y,w,h]=WORLD.africaBox;svg.setAttribute("viewBox",`${x-6} ${y-6} ${w+12} ${h+12}`);
  svg.insertAdjacentHTML("beforeend",WORLD.countries.filter(c=>c.r).map(c=>`<path class="af r-${c.r}" data-r="${c.r}" d="${c.d}"><title>${esc(c.n)}, ${REGIONS[c.r].n}</title></path>`).join(""));
  svg.addEventListener("click",e=>{const p=e.target.closest(".af");if(p)setAfRegion(afRegion===p.dataset.r?"all":p.dataset.r)});
  const keys=["all",...Object.keys(REGIONS)];
  $("#afChips").innerHTML=keys.map(k=>{const n=k==="all"?MOTIFS.length:MOTIFS.filter(m=>m.region===k).length;return `<button type="button" class="chip" data-r="${k}" aria-pressed="${k==="all"}">${k==="all"?"All regions":`<span class="sw" style="background:var(--r-${k})"></span>${REGIONS[k].n}`} <span class="mono">${n}</span></button>`}).join("");
  $$("#afChips .chip").forEach(b=>b.addEventListener("click",()=>setAfRegion(b.dataset.r)));
  $("#motifs").innerHTML=MOTIFS.map(m=>`<article class="card mcard" data-r="${m.region}"><div class="prev ${m.kind==="pattern"?"":"sym"}">${m.kind==="pattern"?patternPreview(m.id):`<svg viewBox="0 0 100 100" role="img" aria-label="${esc(m.n)}">${SYM[m.id]}</svg>`}</div>
    <h3>${esc(m.n)}</h3><div class="tags"><span class="tag"><span class="rdot" style="background:var(--r-${m.region})"></span>${REGIONS[m.region].n}</span><span class="tag">${m.kind}</span><span class="tag ref">Description: confirm with community partners</span></div>
    <dl><dt>Origin</dt><dd>${esc(m.people)}</dd><dt>Meaning</dt><dd>${esc(m.meaning)}</dd><dt>How this hub uses it</dt><dd>${esc(m.use)}</dd><dt>What we avoid</dt><dd>${esc(m.avoid)}</dd></dl>
    <p class="mono muted">Drawn for this hub · inspired by, not copied from</p></article>`).join("");
  $("#scripts").innerHTML=SCRIPTS.map(s=>`<div class="card"><div class="tags"><span class="tag"><span class="rdot" style="background:var(--r-${s.r})"></span>${REGIONS[s.r].n}</span><span class="tag ref">Reference</span></div>${s.g?`<p class="glyph ${s.cls}" lang="${s.lang}" data-word title="${esc(s.n)}">${s.g}</p>`:""}<h3>${esc(s.n)}</h3><p>${esc(s.d)}</p></div>`).join("");
  $("#words").innerHTML=WORDS.map(w=>`<div class="card wcard" style="border-left-color:var(--r-${w.r})"><p class="w" lang="${w.lang}" data-word>${esc(w.w)}</p><p class="mono muted">${esc(w.l)} · lang="${w.lang}"</p><p>${esc(w.g)}</p><div class="tags"><span class="tag ref">Check usage with speakers</span></div></div>`).join("");
  setAfRegion("all");}
function setAfRegion(r){afRegion=r;$$("#afChips .chip").forEach(b=>b.setAttribute("aria-pressed",b.dataset.r===r));
  const svg=$("#afSvg");svg.classList.toggle("filtered",r!=="all"&&REGIONS[r]&&REGIONS[r].au);$$("#afSvg .af").forEach(p=>p.classList.toggle("on",p.dataset.r===r));
  let shown=0;$$("#motifs .mcard").forEach(c=>{const v=r==="all"||c.dataset.r===r;c.hidden=!v;if(v)shown++});
  $("#afNote").textContent=r==="all"?`Showing all ${MOTIFS.length} motifs from ${Object.keys(REGIONS).length} regions. Select a region on the map or a button to filter.`:`${REGIONS[r].n}: ${shown} ${shown===1?"motif":"motifs"}.${REGIONS[r].au?"":" Not a single region on the map."}`;
  buildDrawerCounts();}

/* Diaspora */
let diCats=new Set(Object.keys(DCATS));
function renderDiaspora(){const svg=$("#worldSvg");const byId=Object.fromEntries(DIASPORA.map(d=>[d.id,d]));
  svg.insertAdjacentHTML("beforeend",`<rect width="960" height="420" fill="var(--sea)"/>`+WORLD.countries.map(c=>`<path class="wl${c.r?" af":""}" d="${c.d}"><title>${esc(c.n)}</title></path>`).join("")+
   `<g id="routes">${ROUTES.map(r=>{const [x1,y1]=eeXY(r.f[0],r.f[1]);const t=byId[r.t];const [x2,y2]=eeXY(t.lon,t.lat);const mx=(x1+x2)/2,my=(y1+y2)/2,dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy);const cx=mx+dy*.18,cy=my-dx*.18-len*.05;return `<path class="route ${r.k}" d="M${x1.toFixed(1)} ${y1.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}"><title>${esc(r.n)}</title></path>`}).join("")}</g>`+
   `<g id="dpins">${DIASPORA.map(d=>{const [x,y]=eeXY(d.lon,d.lat);return `<g class="dpin c-${d.cat}" data-id="${d.id}" tabindex="0" role="button" aria-label="${esc(d.n)}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5"/></g>`}).join("")}</g>`);
  $("#diChips").innerHTML=Object.entries(DCATS).map(([k,v])=>`<button type="button" class="chip" data-c="${k}" aria-pressed="true" title="${esc(v.d)}">${esc(v.n)} <span class="mono">${DIASPORA.filter(d=>d.cat===k).length}</span></button>`).join("")+`<button type="button" class="chip" data-c="maroon" aria-pressed="false">Maroon heritage only <span class="mono">${DIASPORA.filter(d=>d.maroon).length}</span></button>`;
  $$("#diChips .chip").forEach(b=>b.addEventListener("click",()=>{const k=b.dataset.c;if(k==="maroon"){b.setAttribute("aria-pressed",b.getAttribute("aria-pressed")!=="true")}else{diCats.has(k)?diCats.delete(k):diCats.add(k);if(!diCats.size)Object.keys(DCATS).forEach(x=>diCats.add(x));$$("#diChips .chip").forEach(c=>{if(c.dataset.c!=="maroon")c.setAttribute("aria-pressed",diCats.has(c.dataset.c))})}filterDiaspora()}));
  $("#diRoutes").addEventListener("change",e=>{$("#routes").style.display=e.target.checked?"":"none"});
  $("#diLegend").innerHTML=`<span><i style="background:var(--red)"></i>Atlantic world</span><span><i style="background:var(--r-east)"></i>Indian Ocean, Arab and Ottoman worlds</span><span><i style="background:var(--gold-ink)"></i>Migration after empire</span><span><i style="background:transparent;border:2px solid var(--r-pan)"></i>Peoples classed as "Black"</span><span><i style="background:var(--land-af)"></i>Africa</span>`;
  const order=Object.keys(DCATS);
  $("#diList").innerHTML=[...DIASPORA].sort((a,b)=>order.indexOf(a.cat)-order.indexOf(b.cat)||a.n.localeCompare(b.n)).map(d=>`<article class="card dcard" data-id="${d.id}" data-c="${d.cat}" ${d.maroon?'data-maroon="1"':""}><h3>${esc(d.n)}</h3><p>${esc(d.d)}</p><div class="tags"><span class="tag">${esc(DCATS[d.cat].n)}</span>${d.maroon?'<span class="tag">Maroon heritage</span>':""}${d.src?evTag(d.src):'<span class="tag ref">Reference · check before reuse</span>'}<button type="button" class="tag" data-show="${d.id}" style="cursor:pointer">Show on map</button></div></article>`).join("");
  $$(".dpin").forEach(g=>{g.addEventListener("click",()=>selectDia(g.dataset.id,true));g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();selectDia(g.dataset.id,true)}})});
  $$("[data-show]").forEach(b=>b.addEventListener("click",()=>{selectDia(b.dataset.show,false);$("#worldSvg").scrollIntoView({block:"center"})}));
  filterDiaspora();}
function filterDiaspora(){const mar=$('#diChips [data-c="maroon"]').getAttribute("aria-pressed")==="true";let n=0;
  DIASPORA.forEach(d=>{const v=diCats.has(d.cat)&&(!mar||d.maroon);if(v)n++;const pin=$(`.dpin[data-id="${d.id}"]`);if(pin)pin.style.display=v?"":"none";const c=$(`.dcard[data-id="${d.id}"]`);if(c)c.hidden=!v});
  $("#diCount").textContent=`${n} of ${DIASPORA.length} places`;buildDrawerCounts();}
function selectDia(id,scroll){$$(".dpin").forEach(g=>g.classList.toggle("on",g.dataset.id===id));$$(".dcard").forEach(c=>c.classList.toggle("on",c.dataset.id===id));if(scroll){const c=$(`.dcard[data-id="${id}"]`);if(c)c.scrollIntoView({block:"nearest"})}}

/* Debates */
function renderDebates(){Object.entries({rep:"#dp-rep",cur:"#dp-cur",mem:"#dp-mem"}).forEach(([k,sel])=>{const d=DEBATES[k];
  $(sel).innerHTML=`<div class="prose" style="margin-bottom:var(--s4)"><p class="lede">${esc(d.intro)}</p></div>
   <h3 style="margin-bottom:var(--s3)">What has happened</h3><ul class="factlist">${d.facts.map(f=>`<li><span class="when">${esc(f.w)}</span><div><p>${esc(f.t)}</p><div class="tags" style="margin-top:4px">${f.src?evTag(f.src):'<span class="tag ref">Reference · check before reuse</span>'}</div></div></li>`).join("")}</ul>
   <h3 style="margin:var(--s5) 0 var(--s3)">The arguments</h3><div class="persp">${d.sides.map(s=>`<div class="card"><h3>${esc(s.h)}</h3><ul>${s.items.map(i=>`<li>${esc(i)}</li>`).join("")}</ul></div>`).join("")}</div>
   <div class="card" style="margin-top:var(--s4);border-left:5px solid var(--green)"><h3>What public bodies can do</h3><ul style="margin:0;padding-left:18px;display:grid;gap:6px">${d.act.map(a=>`<li>${esc(a)}</li>`).join("")}</ul></div>
   <p class="muted" style="margin-top:var(--s3);font-size:.88rem">Arguments are summarised from public statements and commentary, and attributed where a specific person made them. Facts reviewed on ${META.reviewed}; this is a fast-moving subject.</p>`})}

/* About */
function renderAbout(){const P=PURPOSE;
  $("#purpose").innerHTML=`<div class="grid g3"><div class="card"><span class="eyebrow">Mission</span><p>${esc(P.mission)}</p></div><div class="card"><span class="eyebrow">Aim</span><p>${esc(P.aim)}</p></div><div class="card"><span class="eyebrow">Purpose</span><p>${esc(P.purpose)}</p></div></div>
   <div class="grid g2" style="margin-top:var(--s4)"><div class="card"><h3>Goals</h3><ul style="margin:0;padding-left:18px">${P.goals.map(g=>`<li>${esc(g)}</li>`).join("")}</ul></div><div class="card"><h3>Priorities, in order</h3><ol style="margin:0;padding-left:20px">${P.priorities.map(g=>`<li>${esc(g)}</li>`).join("")}</ol></div></div>
   <h3 style="margin:var(--s5) 0 var(--s3)">Objectives</h3><div class="tablewrap"><table><thead><tr><th>Objective</th><th>How we will know</th><th>By</th></tr></thead><tbody>${P.objectives.map(o=>`<tr><td>${esc(o.o)}</td><td>${esc(o.measure)}</td><td style="white-space:nowrap">${esc(o.by)}</td></tr>`).join("")}</tbody></table></div>
   <h3 style="margin:var(--s5) 0 var(--s3)">Expected outcomes</h3><div class="outcomes">${P.outcomes.map(o=>`<div class="card"><h3>${esc(o.h)}</h3><ul style="margin:0;padding-left:18px">${o.items.map(i=>`<li>${esc(i)}</li>`).join("")}</ul><p class="mono muted">Indicators: ${esc(o.ind)}</p></div>`).join("")}</div>
   <h3 style="margin:var(--s5) 0 var(--s3)">How initiatives like this create change</h3><div class="tocflow">${P.toc.map((t,i)=>`<span>${esc(t)}</span>${i<P.toc.length-1?"<b aria-hidden=\"true\">→</b>":""}`).join("")}</div>
   <div class="note" style="margin-top:var(--s4)">This applies to Black History Month and similar heritage months in general. Awareness on its own rarely changes outcomes. Change comes from sustained, resourced action with someone accountable for it. Measure what changes for people, not only how many attended.</div>`;
  $("#rationale").innerHTML=RATIONALE.map(r=>`<div class="card"><h3>${esc(r.h)}</h3><p>${esc(r.p)}</p>${r.src?`<div class="tags">${evTag(r.src)}</div>`:""}</div>`).join("");
  $("#vulnerable").innerHTML=VULN.map(r=>`<div class="card"><h3>${esc(r.h)}</h3><p>${esc(r.p)}</p></div>`).join("");
  $("#a11yStatement").innerHTML=A11Y_STATEMENT.map(r=>`<div class="card"><h3>${esc(r.h)}</h3><p>${esc(r.p)}</p></div>`).join("");}

/* Access panel */
function applyA11y(){const r=document.documentElement;["a11y-t1","a11y-t2","a11y-t3"].forEach(c=>r.classList.remove(c));if(A11Y.size)r.classList.add("a11y-t"+A11Y.size);
  r.classList.toggle("a11y-legible",!!A11Y.legible);r.classList.toggle("a11y-spacing",!!A11Y.spacing);r.classList.toggle("a11y-links",!!A11Y.links);r.classList.toggle("a11y-contrast",!!A11Y.contrast);r.classList.toggle("no-motion",!motionOn());
  try{localStorage.setItem("bhm26:a11y",JSON.stringify(A11Y))}catch(e){}
  const sz=$("#a11ySize"+A11Y.size);if(sz)sz.checked=true;$("#a11yLegible").checked=!!A11Y.legible;$("#a11ySpacing").checked=!!A11Y.spacing;$("#a11yLinks").checked=!!A11Y.links;$("#a11yContrast").checked=!!A11Y.contrast;$("#a11yMotion").checked=motionOn();
  const hp=$("#heroPause");hp.setAttribute("aria-pressed",String(!motionOn()));hp.textContent=motionOn()?"Pause animation":"Play animation";
  if(window.__weave){motionOn()?window.__weave.start():window.__weave.redraw()}}
function initA11y(){const b=$("#a11yBtn"),p=$("#a11yPanel");b.addEventListener("click",()=>{p.hidden=!p.hidden;b.setAttribute("aria-expanded",String(!p.hidden));if(!p.hidden)p.querySelector("input").focus()});
  document.addEventListener("click",e=>{if(!e.target.closest(".a11y")&&!p.hidden){p.hidden=true;b.setAttribute("aria-expanded","false")}});
  p.addEventListener("keydown",e=>{if(e.key==="Escape"){p.hidden=true;b.setAttribute("aria-expanded","false");b.focus()}});
  $$('input[name="a11ySize"]').forEach(x=>x.addEventListener("change",()=>{A11Y.size=+x.value;applyA11y();fitNav()}));
  [["a11yLegible","legible"],["a11ySpacing","spacing"],["a11yLinks","links"],["a11yContrast","contrast"],["a11yMotion","motion"]].forEach(([id,k])=>$("#"+id).addEventListener("change",e=>{A11Y[k]=e.target.checked;applyA11y();fitNav();runChecks(true)}));
  $("#a11yReset").addEventListener("click",()=>{A11Y={...A11Y_DEF};applyA11y();fitNav();toast("Access settings reset")});
  $("#heroPause").addEventListener("click",()=>{A11Y.motion=!motionOn();applyA11y();toast(motionOn()?"Animations on":"Animations paused")});
  reduceMQ.addEventListener?.("change",applyA11y);applyA11y();}
