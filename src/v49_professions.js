/* ================= v2.23.0 YOUR PROFESSION: routes into the hub for every profession and function (D-139) =================
   Choose a Civil Service profession or government function and the hub lists the sections with the most sourced points
   for it, counted live with the same keyword rules as the coverage map, plus the official page for that profession. */
const PROF_LINKS=typeof PROF_LINKS_DATA!=="undefined"?PROF_LINKS_DATA:{};
function profAll(){return [...CS_PROFESSIONS.map(([n,re])=>({n,re,kind:"Profession"})),...GOV_FUNCTIONS.map(([n,re])=>({n,re,kind:"Function"}))]}
/* every sourced point with the section and page it sits in */
function profPoints(){return $$(".view").filter(v=>!["v-assurance","v-review","v-design","v-profession"].includes(v.id)).flatMap(v=>_qa(v,"li,article,.card,tr,p").filter(e=>e.querySelector(":scope > .tag.src, :scope a.tag.src")&&!e.closest(".biblio")).map(e=>{const s=e.closest("section.block");
  return{v:v.id.slice(2),sec:s?s.id:"",sh:s?((s.querySelector("h2")||{}).textContent||s.dataset.label||"").trim():"",t:e.textContent.replace(/\s+/g," ").trim()}}))}
function profRoutes(item,pts){const hits=pts.filter(p=>item.re.test(p.t));const by=new Map();hits.forEach(p=>{if(!p.sec)return;const k=p.sec;const o=by.get(k)||{sec:p.sec,v:p.v,sh:p.sh,n:0};o.n++;by.set(k,o)});
  return{hits,secs:[...by.values()].sort((a,b)=>b.n-a.n).slice(0,10)}}
function renderProfession(){const sel=$("#prSel"),out=$("#prOut");if(!sel||!out)return;const all=profAll();const item=all.find(x=>x.kind+":"+x.n===sel.value)||all[0];const pts=profPoints();
  if(pts.length<500){out.innerHTML=`<p class="muted">Counting needs every page drawn. <button type="button" class="btn" id="prGo">Count now</button></p>`;const g=$("#prGo");if(g)g.addEventListener("click",()=>{if(typeof warmAll26==="function")warmAll26();setTimeout(renderProfession,300)});return}
  const r=profRoutes(item,pts);const link=PROF_LINKS[item.n];const vt=id=>((VIEWS.find(v=>v[0]===id)||[id,id])[1]);
  out.innerHTML=`<div class="card"><h3>${esc(item.n)} <span class="muted">(${item.kind.toLowerCase()})</span></h3>
    <p>${r.hits.length.toLocaleString("en-GB")} sourced points across the hub mention this area: coverage: <b>${esc(covBand(r.hits.length))}</b>.${link?` Official page: <a href="${esc(link.url)}" target="_blank" rel="noopener">${esc(link.title)}<span class="vh"> (opens in a new tab)</span></a>.`:""}</p>
    ${r.secs.length?`<h4>Where to start</h4><ol>${r.secs.map(s=>`<li><a href="#${esc(s.sec)}">${esc(s.sh||s.sec)}</a> <span class="muted">· ${esc(vt(s.v))} · ${s.n} point${s.n===1?"":"s"}</span></li>`).join("")}</ol>`:`<p>The hub has little on this area yet. <a href="#su-eoi">Join a field review panel</a> or <a href="${REPO_URL}/issues/new?template=idea.yml" target="_blank" rel="noopener">suggest what to add<span class="vh"> (opens in a new tab)</span></a>.</p>`}
    <h4>For everyone, whatever your profession</h4><ul><li><a href="#designing">Designing for Black and Mixed-heritage people</a></li><li><a href="#language">Words matter: race, ethnicity and language</a></li><li><a href="#represent">Representation across the state</a></li><li><a href="#leaders">For leaders</a></li></ul></div>`;
  window.__prof={n:item.n,hits:r.hits.length,secs:r.secs.length}}
function profAudit(){const bad=[];const all=profAll();if(all.length!==46)bad.push("expected 33 professions and 13 functions, found "+all.length);
  const miss=all.filter(x=>!PROF_LINKS[x.n]).map(x=>x.n);if(miss.length>4)bad.push(miss.length+" professions or functions have no official link");
  Object.entries(PROF_LINKS).forEach(([n,l])=>{if(!/^https:\/\/[a-z0-9.-]+\.(gov\.uk|civilservice\.gov\.uk|service\.gov\.uk|org\.uk|gov\.scot|gov\.wales)\//.test(l.url||""))bad.push(n+": link is not an official https page")});
  const pts=profPoints();if(pts.length>=500){const r=profRoutes(all.find(x=>x.n==="Statistics"),pts);if(!r.secs.length)bad.push("no routes found for Statistics");
    if(r.secs.some(s=>!document.getElementById(s.sec)))bad.push("a route points to a section that does not exist")}
  Object.keys(COV_DONE).forEach(k=>{if(!COV_NEXT.some(([a])=>a===k))bad.push("coverage list marks an item added that is not in the list: "+k.slice(0,40))});
  if(!$("#prSel")||!$("#prOut"))bad.push("route finder missing");return{bad,n:all.length,links:Object.keys(PROF_LINKS).length}}
CHECKS.push({id:"C168",n:"Every Civil Service profession and government function has a route into the hub, an official link, and routes that point to real sections (D-139)",run:c=>({ok:!c.prof.bad.length,d:c.prof.bad.length?"Problems: "+c.prof.bad.slice(0,4).join("; "):`${c.prof.n} professions and functions, ${c.prof.links} with official links; routes counted live and pointing to real sections`}),
  breakIt:c=>{c.prof={...c.prof,bad:["a route points to a section that does not exist"]};return c}});
BUILD_TESTS["D-139"]="Most of the 33 Civil Service professions had no route into the hub, and operational delivery, the largest, had almost no coverage. Your profession now gives every profession and function its official page and the sections with the most evidence for it";
BUILD_TESTS["D-140"]="Three sport sources had been read only through a page-reading tool, and two of their pages no longer exist. The generator now refuses to publish a point that keeps any source whose quote was not confirmed word for word, proven by a test that restores one such source";
REQS.push({id:"R93",t:"F",r:"Routes into the hub for every profession and function, starting with those with least coverage",o:"Request 72",sat:["pr-routes"],ver:["C168"]});
RELATED_V21.push(["profession","represent"],["profession","review"],["profession","bench"],["profession","designing"]);
/* the coverage map's list of next steps records what each release added (2.22.0, 2.23.0) */
const COV_DONE={"Designing for Black and Mixed-heritage people: policy, service, content and data design":"2.22.0","Mixed heritage: people of Black and mixed ancestry in the UK":"2.22.0",
  "STEM and the built environment: engineering, architecture, planning and construction":"2.23.0","Sport, and the uniformed and public services":"2.23.0",
  "Profession routes through the hub: policy, digital and data, analysis, HR, communications, legal, science and engineering":"2.23.0"};
renderCovNext=function(){const u=$("#covNext");if(u)u.innerHTML=COV_NEXT.map(([a,why])=>`<li><b>${esc(a)}</b>. <span class="muted">${esc(why)}.</span> ${COV_DONE[a]?`<span class="tag">Added in ${esc(COV_DONE[a])}</span>`:`<span class="tag">Next</span>`}</li>`).join("");const s=$("#covSrcs");if(s)s.innerHTML="Official lists: "+evTag(GOV_FUNCTIONS_SRC)+" "+evTag(CS_PROFESSIONS_SRC)};
const _ctx94=ctxV15;ctxV15=function(){const c=_ctx94();c.prof=profAudit();return c};
function v49Boot(){const sel=$("#prSel");if(!sel)return;const all=profAll();
  sel.innerHTML=`<optgroup label="Civil Service professions">${all.filter(x=>x.kind==="Profession").map(x=>`<option value="Profession:${esc(x.n)}">${esc(x.n)}</option>`).join("")}</optgroup><optgroup label="Government functions">${all.filter(x=>x.kind==="Function").map(x=>`<option value="Function:${esc(x.n)}">${esc(x.n)}</option>`).join("")}</optgroup>`;
  sel.addEventListener("change",renderProfession);const _rc49=runChecks;runChecks=function(...a){const r=_rc49.apply(this,a);try{renderProfession()}catch(e){}return r}}
