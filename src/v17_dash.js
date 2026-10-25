
/* ================= v1.8 DASHBOARDS: content, time, evidence, people, quality ================= */
/* Palette: 4 categorical slots validated (dataviz validate_palette.js) in light against #FFFFFF/#FFFDF8 and dark against #1E1914: all checks pass. Single series use slot 1. */
function dvTable(cap,head,rows){return `<details class="dvtable"><summary>${icon("table")} Show the data as a table</summary><div class="tablewrap"><table><caption>${esc(cap)}</caption><thead><tr>${head.map(h=>`<th scope="col">${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>i?`<td>${esc(String(c))}</td>`:`<th scope="row">${esc(String(c))}</th>`).join("")}</tr>`).join("")}</tbody></table></div></details>`}
function hbar(id,title,data,unit,scaleMax){const W=680,lw=250,rh=26,top=6,H=top+data.length*rh+6,max=scaleMax||Math.max(1,...data.map(d=>d.v)),X=v=>v/max*(W-lw-60);
  const bars=data.map((d,i)=>{const y=top+i*rh;const w=Math.max(2,X(d.v));return `<g class="dvmark" role="listitem" aria-label="${esc(d.k)}: ${d.v} ${unit}"><title>${esc(d.k)}: ${d.v} ${unit}${d.t?" · "+esc(d.t):""}</title><text x="${lw-8}" y="${y+17}" text-anchor="end" class="dvlab">${esc(d.k.length>32?d.k.slice(0,31)+"…":d.k)}</text><rect x="${lw}" y="${y+5}" width="${w}" height="${rh-10}" rx="4" fill="var(--dv1)"/><text x="${lw+w+6}" y="${y+17}" class="dvval">${d.v}</text></g>`}).join("");
  return `<figure class="dvfig" id="${id}"><figcaption>${esc(title)}</figcaption><svg viewBox="0 0 ${W} ${H}" role="list" aria-label="${esc(title)}"><line x1="${lw}" y1="${top}" x2="${lw}" y2="${H-4}" class="dvaxis"/>${bars}</svg>${dvTable(title,["Item",unit],data.map(d=>[d.k,d.v]))}</figure>`}
function stackbar(id,title,cats,series,rows){/* rows:[{k, vals:{seriesKey:n}}]; series:[{k,l}] up to 4, fixed order */
  const W=640,lw=150,rh=30,top=34,H=top+rows.length*rh+8,max=Math.max(1,...rows.map(r=>series.reduce((a,s)=>a+(r.vals[s.k]||0),0))),X=v=>v/max*(W-lw-50);
  const legend=series.map((s,i)=>`<g transform="translate(${lw+i*120},6)"><rect width="12" height="12" rx="3" fill="var(--dv${i+1})"/><text x="18" y="11" class="dvlab">${esc(s.l)}</text></g>`).join("");
  const bars=rows.map((r,j)=>{const y=top+j*rh;let x=lw;const segs=series.map((s,i)=>{const v=r.vals[s.k]||0;if(!v)return"";const w=X(v);const g=`<rect x="${x}" y="${y+5}" width="${Math.max(1,w-2)}" height="${rh-12}" rx="3" fill="var(--dv${i+1})"><title>${esc(r.k)}, ${esc(s.l)}: ${v}</title></rect>`;x+=w;return g}).join("");
    const tot=series.reduce((a,s)=>a+(r.vals[s.k]||0),0);return `<g role="listitem" aria-label="${esc(r.k)}: ${series.map(s=>s.l+" "+(r.vals[s.k]||0)).join(", ")}"><text x="${lw-8}" y="${y+19}" text-anchor="end" class="dvlab">${esc(r.k)}</text>${segs}<text x="${x+6}" y="${y+19}" class="dvval">${tot}</text></g>`}).join("");
  return `<figure class="dvfig" id="${id}"><figcaption>${esc(title)}</figcaption><svg viewBox="0 0 ${W} ${H}" role="list" aria-label="${esc(title)}">${legend}${bars}</svg>${dvTable(title,[cats,...series.map(s=>s.l),"Total"],rows.map(r=>[r.k,...series.map(s=>r.vals[s.k]||0),series.reduce((a,s)=>a+(r.vals[s.k]||0),0)]))}</figure>`}
function heatmap(id,title,rowsK,colsK,val){/* sequential single hue: mix of --dv1 with surface */
  const max=Math.max(1,...rowsK.flatMap(r=>colsK.map(c=>val(r,c))));
  return `<figure class="dvfig" id="${id}"><figcaption>${esc(title)}</figcaption><div class="tablewrap"><table class="heat tskip"><caption class="vh">${esc(title)}</caption><thead><tr><th scope="col">Field</th>${colsK.map(c=>`<th scope="col">${esc(c)}</th>`).join("")}</tr></thead><tbody>${rowsK.map(r=>`<tr><th scope="row">${esc(r)}</th>${colsK.map(c=>{const v=val(r,c);const p=Math.round(v/max*55);return `<td style="background:color-mix(in srgb,var(--dv1) ${p}%,var(--surface));color:var(--ink)" title="${esc(r)}, ${esc(c)}: ${v}">${v||""}</td>`}).join("")}</tr>`).join("")}</tbody></table></div><p class="muted dvnote">Darker cells hold more entries. Empty cells have none.</p></figure>`}
function kpi(n,l,ic,sub){return `<div class="card kpi"><span class="ricon">${icon(ic)}</span><b class="kpin">${esc(String(n))}</b><span class="kpil">${esc(l)}</span>${sub?`<span class="muted kpis">${esc(sub)}</span>`:""}</div>`}
function _host(u){try{return new URL(u).hostname.replace(/^www\./,"")}catch(e){return"(no link)"}}
function renderDash(){
  const src=Object.values(SOURCES);const read=src.filter(s=>!s.loc).length;const sc=window.__selfcheck||{pass:0,total:CHECKS.length};
  const items=DATASETS.reduce((a,d)=>{try{return a+d.arr().length}catch(e){return a}},0);
  const met=REQS.filter(r=>r.ver.length&&r.ver.every(v=>["pass","build"].includes(reqStatus(v)))).length;
  $("#dashKpi").innerHTML=[kpi(VIEWS.length,"pages","layers"),kpi(items,"items across "+DATASETS.length+" datasets","grid"),kpi(src.length,"sources","book",(src.length?Math.round(read/src.length*100):0)+"% read in full"),kpi(`${sc.pass}/${sc.total}`,"self-checks passing","check","each proven by a negative test"),kpi(REQS.length,"requirements traced","route",met?met+" met and verified":""),kpi((typeof ROUTINES!=="undefined"?ROUTINES.length:0),"self-* routines","shield","run on demand below")].join("");
  const ds=DATASETS.map(d=>{let n=0;try{n=d.arr().length}catch(e){}return{k:d.n,v:n}}).sort((a,b)=>b.v-a.v);
  $("#dashContent").innerHTML=hbar("dvDatasets","Items in each dataset",ds,"items");
  const views=VIEWS.map(([id,n])=>{const v=$("#v-"+id);return{k:n,v:v?v.querySelectorAll(".card,tr").length:0}}).sort((a,b)=>b.v-a.v).slice(0,15);
  $("#dashPages").innerHTML=hbar("dvPages","Cards and table rows on each page (top 15)",views,"cards and rows");
  /* time */
  const band=y=>y<1500?"Before 1500":y<1800?"1500 to 1799":y<1900?"1800s":y<1948?"1900 to 1947":y<2000?"1948 to 1999":"2000 to today";const bands=["Before 1500","1500 to 1799","1800s","1900 to 1947","1948 to 1999","2000 to today"];
  $("#dashTime").innerHTML=hbar("dvTime","Timeline events by period",bands.map(b=>({k:b,v:EVENTS.filter(e=>band(e.y)===b).length})),"events");
  const doms=Object.keys(CULT_DOMAINS);const ebands=["Before 1900","1900 to 1947","1948 to 1999","2000 to today"];const eb=y=>y<1900?ebands[0]:y<1948?ebands[1]:y<2000?ebands[2]:ebands[3];
  $("#dashHeat").innerHTML=heatmap("dvHeat","Culture, sport and enterprise entries by field and period",doms.map(d=>CULT_DOMAINS[d][0]),ebands,(r,c)=>CULTURE.filter(x=>CULT_DOMAINS[x.dom][0]===r&&eb(x.y)===c).length);
  /* evidence */
  const hosts={};src.forEach(s=>{const h=_host(s.u);hosts[h]=(hosts[h]||0)+1});const top=Object.entries(hosts).sort((a,b)=>b[1]-a[1]).slice(0,12).map(([k,v])=>({k,v}));
  $("#dashEvidence").innerHTML=`<div class="grid g3 vtskip">${kpi(read,"sources read in full","check",src.length-read?`${src.length-read} not read, each with a reason`:"none left unread")}${kpi(src.filter(s=>s.also).length,"with a corroborating source","link")}${kpi(Object.keys(hosts).length,"publishers and websites","globe")}</div>`+hbar("dvHosts","Sources by website (top 12)",top,"sources");
  /* people */
  if(typeof LIVES!=="undefined"){const groups=LIFE_GROUPS.map(g=>({k:g.l,vals:Object.fromEntries(VALENCE.map(v=>[v.k,LIVES.filter(f=>f.g===g.k&&f.v===v.k).length]))}));
    $("#dashPeople").innerHTML=stackbar("dvPeople","Life-stage and group facts by type of finding","Group",VALENCE,groups)}
  /* games */
  const qk={};quizBank(3).forEach(q=>{qk[q.kind]=(qk[q.kind]||0)+1});$("#dashGames").innerHTML=hbar("dvQuiz","Quiz questions by kind (all levels)",Object.entries(qk).map(([k,v])=>({k,v})).sort((a,b)=>b.v-a.v),"questions");
  if(typeof EQUITY!=="undefined"&&EQUITY.length){const ac=ACTORS.map(a=>({k:a.l,v:EQUITY.reduce((n,d)=>n+d.actions.filter(x=>x.actor===a.k).length,0)}));$("#dashEquity").innerHTML=hbar("dvActors","Recorded actions on inequality by type of organisation",ac,"actions")+hbar("dvDomains","Recorded inequalities by domain",EQUITY.map(d=>({k:d.l,v:d.ineq.length})).sort((a,b)=>b.v-a.v),"inequalities")}
  /* quality */
  const rows=(sc.rows||[]);const failing=rows.filter(r=>!r.ok);
  $("#dashQuality").innerHTML=`<div class="grid g3 vtskip">${kpi(rows.filter(r=>r.ok).length,"checks passing","check")}${kpi(failing.length,"checks failing","flag",failing.map(f=>f.id).join(", ")||"none")}${kpi(Object.keys(BUILD_TESTS).length,"recorded defects","shield",`${Object.keys(BUILD_TESTS).filter(k=>CHECKS.some(c=>c.n.includes("("+k+")"))||REQS.some(r=>(r.ver||[]).includes(k))).length} traced to an in-page check or requirement; the rest are covered by the build tests`)}</div>`+hbar("dvReq","Requirements by type",[{k:"Functional",v:REQS.filter(r=>r.t==="F").length},{k:"Non-functional",v:REQS.filter(r=>r.t==="NF").length}],"requirements");
  const vt=(typeof clubVote!=="undefined"&&clubVote.tally)?clubVote.tally:{book:{},film:{}};const vrows=[...Object.entries(vt.book||{}),...Object.entries(vt.film||{})].map(([id,v])=>{const i=clubItems().find(x=>x.id===id);return{k:i?i.t:id,v}}).sort((a,b)=>b.v-a.v).slice(0,10);
  $("#dashClub").innerHTML=vrows.length?hbar("dvClub","Book and film club votes",vrows,"votes"):`<p class="muted">No votes yet. Votes appear here as members vote on the <a href="#club">club page</a>.</p>`;
  window.__dash={charts:$$("#v-dash figure.dvfig").length,tables:$$("#v-dash details.dvtable table").length}}
