/* ================= v1.5: BELONGING, COURSES ================= */
const srcTags=a=>(a||[]).map(evTag).join("");
function renderBelonging(){const card=x=>`<div class="card"><div class="mhead"><span class="ricon">${icon(x.ic)}</span><h3>${esc(x.h)}</h3></div><p>${esc(x.p)}</p>${x.note?`<p class="muted" style="font-size:.88rem">${esc(x.note)}</p>`:""}<div class="tags">${srcTags(x.src)||'<span class="tag">Hub guidance</span>'}</div></div>`;
  $("#mixedCards").innerHTML=MIXED.map(card).join("");$("#appropCards").innerHTML=APPROP.map(card).join("");$("#fairCards").innerHTML=FAIR.map(card).join("");
  $("#fourQ").innerHTML=FOURQ.map(q=>`<li>${esc(q)}</li>`).join("");
  $("#appropViews").innerHTML=APPROP_VIEWS.map(v=>`<div class="card"><h3>${esc(v.h)}</h3><ul>${v.items.map(i=>`<li>${esc(i)}</li>`).join("")}</ul><div class="tags">${srcTags(v.src)||'<span class="tag">Hub summary</span>'}</div></div>`).join("");
  // representation audit
  const bars=(title,rows)=>{const mx=Math.max(1,...rows.map(r=>r[1]));return `<div class="card"><h3>${esc(title)}</h3><div class="hbars">${rows.map(([l,v])=>`<div class="hb"><span>${esc(l)}</span><span class="hbt"><i style="width:${(100*v/mx).toFixed(0)}%"></i></span><b class="mono">${v}</b></div>`).join("")}</div></div>`};
  const af=afCounts().map(x=>[x.label,Object.values(x.counts).reduce((a,b)=>a+b,0)]);
  const conts=["Africa","Americas","Asia","Europe","Oceania"].map(c=>[c,DIASPORA.filter(d=>M49_CONT[M49[d.id]]===c).length]);
  const nat=["England","Scotland","Wales","Northern Ireland"].map(n=>[n,PLACES.filter(p=>UK_NATION[p.id]===n).length+NETWORKS.filter(x=>x.na===n).length]);
  const tiers=[["Read sources",Object.values(SOURCES).filter(s=>!s.loc).length],["Located sources",Object.values(SOURCES).filter(s=>s.loc).length],["With a corroborating source",Object.values(SOURCES).filter(s=>s.also).length]];
  $("#repAudit").innerHTML=bars("Heritage items by African Union region",af)+bars("Diaspora places by continent",conts)+bars("UK places and networks by nation",nat)+bars("Evidence behind the hub",tiers);
  window.__audit={af,conts,nat,tiers}}
let courseTopic="all";
function renderCourses(){const h=$("#courses");if(!h)return;
  $("#courseChips").innerHTML=[["all","All"],...Object.entries(COURSE_TOPICS)].map(([k,v])=>`<button type="button" class="chip" data-t="${k}" aria-pressed="${k===courseTopic}">${esc(v)} <span class="mono">${k==="all"?COURSES.length:COURSES.filter(c=>c.t===k).length}</span></button>`).join("");
  $$("#courseChips .chip").forEach(b=>b.addEventListener("click",()=>{courseTopic=b.dataset.t;renderCourses()}));
  h.innerHTML=COURSES.map(c=>`<article class="card" ${courseTopic==="all"||c.t===courseTopic?"":"hidden"}><div class="mhead">${icon({policy:"scale",content:"edit",comms:"megaphone",care:"heart",edu:"book",lead:"flag"}[c.t])}<h3>${esc(c.n)}</h3></div><p class="mono muted">${esc(c.by)}</p><p>${esc(c.f)}. For ${esc(c.who.charAt(0).toLowerCase()+c.who.slice(1))}.</p><div class="tags"><span class="tag">${esc(COURSE_TOPICS[c.t])}</span><span class="tag ${c.flag?"ref":"src"}">${c.flag?"Check availability":"Available"} · ${esc(c.d)}</span><a class="tag" href="${esc(c.u)}" target="_blank" rel="noopener">${icon("link")} Open</a></div></article>`).join("");
  $("#academic").innerHTML=ACADEMIC.map(a=>`<div class="card"><div class="mhead">${icon("book")}<h3>${esc(a.n)}</h3></div><p class="mono muted">${esc(a.by)}</p><p>${esc(a.w)}</p><div class="tags"><a class="tag" href="${esc(a.u)}" target="_blank" rel="noopener">${icon("link")} Visit</a></div></div>`).join("");
  buildDrawerCounts();scheduleFill()}
