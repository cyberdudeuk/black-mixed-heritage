/* ================= v2.25.0 OPEN POINTS, CITE AND CORRECT, WHAT CHANGED (D-142, D-143) =================
   Every item the hub publishes, with its sources, as one open data file (with an OpenAPI description and a DCAT
   catalogue, written at build time); a way to cite, link to or correct any sourced point; and what was added,
   changed or removed since the previous release, compared with the previous release's published points. */
const SITE_URL=typeof PAGES_URL!=="undefined"?PAGES_URL:"https://cyberdudeuk.github.io/black-mixed-heritage/";
/* D-142: sections shown inside other pages were missing from the register of datasets, so they had no lineage and
   no place in the open data. Register every lens page that is not yet there, under the page that shows it. */
(function(){if(typeof LP==="undefined")return;
  Object.keys(LP).forEach(id=>{const n=lpAllPoints(LP[id]).length;const d=DATASETS.find(x=>x.k===id);let ok=false;try{ok=!!d&&d.arr().length===n&&(!n||d.arr()[0].h!==undefined)}catch(e){}
    if(ok){d.lpid=id;return}
    const el=document.getElementById("v-"+id);const host=el&&el.dataset&&el.dataset.inject?el.dataset.inject:id;const k=d?"lp-"+id:id;
    DATASETS.push({k,n:(LP[id]||{}).name||id,ic:VIEW_ICONS[id]||VIEW_ICONS[host]||"globe",arr:()=>LP[id]?lpAllPoints(LP[id]).map(x=>({...x.p,id:x.id})):[],id:x=>x.id,lab:x=>x.h,srcs:x=>x.src||[],view:host,href:x=>"#"+x.id,out:["pages","jsonld"],chk:["C169"],lpid:id})})})();
function fnv(s){let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0}return h.toString(16).padStart(8,"0")}
const PT_TEXT=it=>it.text||it.fact||it.d||it.l||it.what||it.x||it.meaning||it.ev||"";
function ptSources(d,it,i){let ss=[];try{ss=(d.srcs(it,i)||[]).filter(Boolean)}catch(e){}return[...new Set(ss)].map(k=>typeof k==="string"&&SOURCES[k]?{id:k,title:SOURCES[k].t,url:SOURCES[k].u}:(k&&k.u?{id:null,title:k.t||"",url:k.u}:null)).filter(Boolean)}
/* every item in every dataset, with a stable key (dataset:id), its address on the website and its sources */
function openPoints(){const out=[];DATASETS.forEach(d=>{let arr=[];try{arr=d.arr()||[]}catch(e){}arr.forEach((it,i)=>{let id,lab,href;try{id=String(d.id(it,i));lab=String(d.lab(it,i)||"");href=String(d.href(it,i)||"")}catch(e){return}
  const src=ptSources(d,it,i);const text=String(PT_TEXT(it)||"").replace(/\s+/g," ").trim();
  const o={key:d.k+":"+id,id,dataset:d.k,datasetTitle:d.n,page:d.view,url:SITE_URL+(href.startsWith("#")?href:"#"+d.view),heading:lab,text,figure:it.figure||it.fig||"",year:it.year!=null&&it.year!==""?String(it.year):(it.per||it.y!=null?String(it.per||it.y):""),note:it.note||it.cav||"",disputed:!!it.disputed,sources:src};
  o.hash=fnv([o.heading,o.text,o.figure,o.note,src.map(s=>s.url).join(" ")].join("|"));out.push(o)})});return out}
/* what changed since the previous release (POINTS_BASE is embedded at build time from the previous release's points file) */
function ptChanges(pts){pts=pts||openPoints();const B=typeof POINTS_BASE!=="undefined"&&POINTS_BASE&&POINTS_BASE.hashes?POINTS_BASE:null;if(!B)return{base:null,added:[],changed:[],removed:[],status:{}};
  const cur=new Map(pts.map(p=>[p.key,p]));const status={};const added=[],changed=[],removed=[];
  pts.forEach(p=>{const h=B.hashes[p.key];if(h===undefined){added.push(p.key);status[p.key]="new"}else if(h!==p.hash){changed.push(p.key);status[p.key]="changed"}});
  Object.keys(B.hashes).forEach(k=>{if(!cur.has(k))removed.push(k)});return{base:B.version,added,changed,removed,status}}
let _ptStatusById=null;function ptStatusById(){if(_ptStatusById)return _ptStatusById;const pts=openPoints();const c=ptChanges(pts);_ptStatusById={};pts.forEach(p=>{if(c.status[p.key])_ptStatusById[p.id]=c.status[p.key]});return _ptStatusById}
function ptCitation(id,h){const v=META.version;return `BHM 2026 Hub (${new Date(Date.parse(META.reviewed)).getFullYear()}). ‘${h}’. Version ${v}. ${SITE_URL}#${id}`}
function ptCorrectUrl(id,h,text){const q=new URLSearchParams({template:"correction.yml",title:"Correction: "+String(h).slice(0,90),current:(String(text).slice(0,600)+"\n\nPoint: "+SITE_URL+"#"+id+" (version "+META.version+")")});return REPO_URL+"/issues/new?"+q.toString()}
/* cite, link and correct: one disclosure on every sourced point card; no script needed to open it */
const _ppCard51=ppCard;ppCard=function(p,id){let h=_ppCard51(p,id);if(!id)return h;const st=(ptStatusById()||{})[id];
  const badge=st?`<span class="tag ptst ptst-${st}">${st==="new"?"New":"Changed"} since ${esc(POINTS_BASE.version)}</span>`:"";
  const cite=ptCitation(id,p.h);
  const act=`<details class="ptact"><summary>Cite, link or correct<span class="vh"> ‘${esc(String(p.h).slice(0,60))}’</span></summary><p class="muted">Link: <a href="#${esc(id)}">${esc(SITE_URL+"#"+id)}</a></p><p class="muted">Cite as: <code class="ptcite">${esc(cite)}</code> <button type="button" class="btn ptcopy" data-cite="${esc(cite)}">Copy citation</button></p><p><a href="${esc(ptCorrectUrl(id,p.h,p.text))}" target="_blank" rel="noopener">Suggest a correction on GitHub<span class="vh"> (opens in a new tab)</span></a></p></details>`;
  h=h.replace(/(<article class="card ppcard"[^>]*>)<h3>/,"$1"+(badge?badge+" ":"")+"<h3>");return h.replace(/<\/article>$/,act+"</article>")};
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest(".ptcopy");if(!b)return;const t=b.dataset.cite||"";const done=()=>{b.textContent="Copied";setTimeout(()=>{b.textContent="Copy citation"},1800)};
  try{navigator.clipboard.writeText(t).then(done,()=>{})}catch(err){}});
function renderChanges(){const host=$("#asChanges");if(!host)return;const pts=openPoints();const c=ptChanges(pts);const by=new Map(pts.map(p=>[p.key,p]));
  if(!c.base){host.innerHTML=`<p class="muted">No previous release to compare with.</p>`;return}
  const row=k=>{const p=by.get(k);return p?`<li><a href="${esc(p.url.replace(SITE_URL,""))}">${esc(p.heading.slice(0,110))}</a> <span class="muted">· ${esc(vName(p.page))}</span></li>`:""};
  const grp=(t,ks,n)=>`<h3>${t} (${ks.length.toLocaleString("en-GB")})</h3>`+(ks.length?`<ul>${ks.slice(0,n).map(row).join("")}</ul>${ks.length>n?`<p class="muted">And ${ks.length-n} more, listed in the open data file.</p>`:""}`:`<p class="muted">None.</p>`);
  host.innerHTML=`<p>Compared with version ${esc(c.base)}: ${c.added.length.toLocaleString("en-GB")} items added, ${c.changed.length.toLocaleString("en-GB")} changed and ${c.removed.length.toLocaleString("en-GB")} removed, out of ${pts.length.toLocaleString("en-GB")}. Cards added or changed carry a label. The full list is published as <code>bhm2026-changes.json</code>.</p>`+grp("Added",c.added,40)+grp("Changed",c.changed,40)+`<h3>Removed (${c.removed.length})</h3>`+(c.removed.length?`<ul>${c.removed.slice(0,40).map(k=>`<li><code>${esc(k)}</code></li>`).join("")}</ul>`:`<p class="muted">None.</p>`);
  window.__changes={base:c.base,a:c.added.length,c:c.changed.length,r:c.removed.length}}
function openAudit(){const bad=[];const pts=openPoints();const keys=new Set();pts.forEach(p=>{if(keys.has(p.key))bad.push("two items share the key "+p.key);keys.add(p.key);
    p.sources.forEach(s=>{if(!/^https:\/\//.test(s.url||""))bad.push(p.key+": a source without an https link")})});
  let lpN=0;const lpDs=new Set(DATASETS.filter(d=>d.lpid).map(d=>d.k));if(typeof LP!=="undefined")Object.keys(LP).forEach(id=>{const n=lpAllPoints(LP[id]).length;lpN+=n;const ds=DATASETS.filter(d=>d.lpid===id);
    if(ds.length!==1)bad.push("lens page "+id+" is not in the register of datasets");else if(pts.filter(p=>p.dataset===ds[0].k).length!==n)bad.push(`lens page ${id}: ${n} points but ${pts.filter(p=>p.dataset===ds[0].k).length} in the open data`)});
  const sample=pts.find(p=>lpDs.has(p.dataset));if(sample){const u=new URL(ptCorrectUrl(sample.id,sample.heading,sample.text));if(u.origin+u.pathname!==REPO_URL+"/issues/new"||u.searchParams.get("template")!=="correction.yml"||!u.searchParams.get("current").includes("#"+sample.id))bad.push("the correction link does not carry the point");
    if(!ptCitation(sample.id,sample.heading).includes(META.version))bad.push("citation lacks the version")}
  const c=ptChanges(pts);if(typeof POINTS_BASE!=="undefined"&&POINTS_BASE&&POINTS_BASE.version===META.version)bad.push("the comparison is with this same version, so nothing would show as changed");
  return{bad,n:pts.length,src:pts.filter(p=>p.sources.length).length,lp:lpN,base:c.base,a:c.added.length,c:c.changed.length,r:c.removed.length}}
CHECKS.push({id:"C169",n:"Every item is in the open data with a unique key and https sources, every lens page is registered, each point can be cited and corrected, and changes are measured against the previous release (D-142, D-143)",
  run:c=>({ok:!c.open.bad.length,d:c.open.bad.length?"Problems: "+c.open.bad.slice(0,4).join("; "):`${c.open.n.toLocaleString("en-GB")} items (${c.open.src.toLocaleString("en-GB")} with sources, ${c.open.lp.toLocaleString("en-GB")} lens-page points); since ${c.open.base||"no earlier release"}: ${c.open.a} added, ${c.open.c} changed, ${c.open.r} removed`}),
  breakIt:c=>{c.open={...c.open,bad:["lens page stem is not in the register of datasets"]};return c}});
BUILD_TESTS["D-142"]="Sections shown inside other pages (science and engineering, sport, uniformed services, intersections, place, other governments, collecting ethnicity data) were missing from the register of datasets, so the lineage map and any export left them out; and the 152 points of Recognition and representation were hidden behind an older list of awards that used the same key. They are now registered under the page that shows them, and C169 fails if a lens page is not registered";
BUILD_TESTS["D-143"]="The hub's sourced points could be read only on the page: there was no open file of them, no way to cite or correct a single point, and no record of what each release changed. They are now open data with an API description and a DCAT catalogue, each card can be cited or corrected, and changes are measured against the previous release";
REQS.push({id:"R94",t:"F",r:"Repository-linked 'Could' features: every sourced point as open data with an API description and a catalogue for harvesting; cite, link or correct any point; what changed in each release",o:"Request 74",sat:["kn-open","as-changes"],ver:["C169"]});
const _ctx95=ctxV15;ctxV15=function(){const c=_ctx95();c.open=openAudit();return c};
function v51Boot(){renderChanges();const u=$("#knOpenList");if(u){const F=[["bhm2026-points.json","Every item and sourced point, with its sources"],["bhm2026-changes.json","What changed since the previous release"],["openapi.json","OpenAPI 3.1 description of the open data files"],["catalog.jsonld","DCAT catalogue, for data catalogues to harvest"],["datapackage.json","Data package describing every file"],["bhm2026-hub.jsonld","The hub as linked data (Schema.org and SKOS)"],["bhm2026-events.ics","Calendar to subscribe to"]];
  u.innerHTML=F.map(([f,t])=>`<li><a href="${esc(SITE_URL+"data/"+f)}" target="_blank" rel="noopener"><code>${esc(f)}</code><span class="vh"> (opens in a new tab)</span></a>: ${esc(t)}</li>`).join("")}}
/* keep the cite, link or correct disclosure at the foot of lens-page cards, after their tags */
const _lpCard51=lpCard;lpCard=function(P,s,p){const h=_lpCard51(P,s,p);const m=h.match(/<details class="ptact">[\s\S]*?<\/details>/);return m?h.replace(m[0],"").replace(/<\/article>$/,m[0]+"</article>"):h};
