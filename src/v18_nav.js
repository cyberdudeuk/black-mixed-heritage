/* ================= v1.9 NAVIGATION: breadcrumbs, previous and next, A to Z, graph wiring ================= */
drawGraph=function(){try{renderKG()}catch(e){console.warn(e)}};
const _activate18=activate;activate=function(tl,t){if(tl&&tl.dataset&&tl.dataset.own)return;_activate18(tl,t)};
function groupOf(id){const g=NAV_GROUPS.find(x=>x.items.includes(id));return g?g.g:"Overview"}
function addBreadcrumbs(){const order=VIEWS.map(v=>v[0]);VIEWS.forEach(([id,n],i)=>{const v=$("#v-"+id);if(!v||v.querySelector(".crumbs"))return;
  v.insertAdjacentHTML("afterbegin",`<nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="#overview">Home</a></li>${id==="overview"?"":`<li><span>${esc(groupOf(id))}</span></li>`}<li aria-current="page">${esc(n)}</li></ol></nav>`);
  const prev=order[i-1],next=order[i+1];const nm=k=>(VIEWS.find(x=>x[0]===k)||[,""])[1];
  v.insertAdjacentHTML("beforeend",`<nav class="pagenav" aria-label="Previous and next page">${prev?`<a class="btn" href="#${prev}" rel="prev">${icon("left")} <span><small>Previous</small> ${esc(nm(prev))}</span></a>`:"<span></span>"}${next?`<a class="btn" href="#${next}" rel="next"><span><small>Next</small> ${esc(nm(next))}</span> ${icon("right")}</a>`:""}</nav>`)})}
function buildAZ(){const items=[];VIEWS.forEach(([id,n])=>items.push({l:n,k:"Page",h:"#"+id}));$$(".view .block[id]").forEach(b=>{const h=b.querySelector(".sechead h2");if(h)items.push({l:h.textContent.trim(),k:"Section",h:"#"+b.id})});
  DATASETS.forEach(d=>{let arr=[];try{arr=d.arr()}catch(e){}arr.forEach((x,i)=>{let l="",h="#"+d.view;try{l=d.lab(x);h=d.href(x)||h}catch(e){}if(l)items.push({l:String(l),k:d.n,h})})});GLOSSARY.forEach(g=>items.push({l:g.t,k:"Glossary",h:"#knowledge"}));
  const seen=new Set();const list=items.filter(x=>{const k=x.l.toLowerCase()+x.h;if(seen.has(k))return false;seen.add(k);return true}).map(x=>({...x,s:x.l.replace(/^[^A-Za-z0-9]+/,"").replace(/^(the|a|an) /i,"")})).sort((a,b)=>a.s.localeCompare(b.s,"en",{sensitivity:"base",numeric:true}));
  const L=c=>/[a-z]/i.test(c)?c.toUpperCase():"#";const letters=[...new Set(list.map(x=>L(x.s[0]||"#")))].sort();
  return {list,letters,L}}
function setupAZ(){const tl=$('[data-tabs="kn"]');if(!tl||$("#tab-az"))return;tl.insertAdjacentHTML("beforeend",`<button role="tab" id="tab-az" aria-controls="kp-az" aria-selected="false" tabindex="-1">A to Z</button>`);
  $("#kp-graph").insertAdjacentHTML("afterend",`<div class="tabpanel" role="tabpanel" id="kp-az" aria-labelledby="tab-az" hidden></div>`);
  const t=$("#tab-az");const tabs=[...tl.querySelectorAll("[role=tab]")];t.addEventListener("click",()=>{activate(tl,t);renderAZ()});
  t.addEventListener("keydown",e=>{const i=tabs.indexOf(t);if(e.key==="ArrowLeft"){tabs[i-1].focus();activate(tl,tabs[i-1])}if(e.key==="ArrowRight"){tabs[0].focus();activate(tl,tabs[0])}});
  tabs[tabs.length-2].addEventListener("keydown",e=>{if(e.key==="ArrowRight"){e.stopImmediatePropagation();t.focus();activate(tl,t);renderAZ()}},true)}
let AZ=null;
function renderAZ(){if(!AZ)AZ=buildAZ();const {list,letters,L}=AZ;const box=$("#kp-az");if(!box||box.dataset.done)return;box.dataset.done="1"; /* built once */
  box.innerHTML=`<p>${list.length} pages, sections, items and terms in alphabetical order. Choose a letter or type to narrow the list.</p><nav class="azbar" aria-label="Letters">${letters.map(c=>`<a href="#az-${c==="#"?"num":c}" class="azl">${c}</a>`).join("")}</nav><label for="azQ">Filter<input id="azQ" type="search" placeholder="type to filter"></label><div id="azList">${letters.map(c=>`<section class="azsec" id="az-${c==="#"?"num":c}" aria-labelledby="azh-${c==="#"?"num":c}"><h3 id="azh-${c==="#"?"num":c}">${c}</h3><ul>${list.filter(x=>L(x.s[0]||"#")===c).map(x=>`<li><a href="${x.h}">${esc(x.l)}</a> <span class="mono muted">${esc(x.k)}</span></li>`).join("")}</ul></section>`).join("")}</div>`;
  $$("#kp-az .azl").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();const s=document.getElementById(a.getAttribute("href").slice(1));if(s){s.scrollIntoView({behavior:motionAllowed()?"smooth":"auto"});s.querySelector("a")?.focus({preventScroll:true})}}));
  $("#azQ").addEventListener("input",e=>{const q=e.target.value.toLowerCase();$$("#azList li").forEach(li=>li.hidden=!!q&&!li.textContent.toLowerCase().includes(q));$$("#azList .azsec").forEach(s=>s.hidden=![...s.querySelectorAll("li")].some(li=>!li.hidden))});window.__az=list.length}
