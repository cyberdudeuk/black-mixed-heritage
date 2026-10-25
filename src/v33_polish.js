
/* ================= v2.8.0 POLISH: African roots links; A to Z wraps both ways; checks for the view switch and roots links ================= */
const ROOTS=[["africa","Africa"],["diaspora","The diaspora"],["knowafrica","Knowledge and cultures"],["peoples","Peoples, regions and borders"],["genome","DNA and ancestry"],["blackness","Being Black"],["journeys","Knowledge journeys"]];
function addRoots(){ROOTS.forEach(([id])=>{const v=$("#v-"+id);if(!v||v.querySelector(".roots"))return;const first=v.querySelector("section.block");if(!first)return;
  first.insertAdjacentHTML("beforebegin",`<nav class="roots" aria-label="African roots: related pages"><span class="rootslab">${icon("baobab")} African roots</span><ul>${ROOTS.map(([r,l])=>`<li>${r===id?`<span aria-current="page">${esc(l)}</span>`:`<a href="#${r}">${esc(l)}</a>`}</li>`).join("")}</ul></nav>`)});window.__roots=$$(".roots").length}
function azWrap(){const tl=$('[data-tabs="kn"]');const t=$("#tab-az");if(!tl||!t||tl._azw)return;tl._azw=1;const first=tl.querySelector("[role=tab]");
  first.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"){e.stopImmediatePropagation();e.preventDefault();t.focus();activate(tl,t);renderAZ()}},true)}
CHECKS.push({id:"C136",n:"The African roots pages link to each other, and the Cards or List switch is a single choice for screen readers (D-091)",run:c=>({ok:c.roots.n===c.roots.expected&&c.roots.vt.bad===0&&c.roots.vt.n>0,d:`${c.roots.n} of ${c.roots.expected} roots pages linked; ${c.roots.vt.n} view switches, ${c.roots.vt.bad} not exposed as a radio group with exactly one choice selected`}),
  breakIt:c=>{c.roots={...c.roots,n:0};return c}});
BUILD_TESTS["D-091"]="The Cards and List buttons were two toggle buttons, so a screen reader could not tell they were one choice; they are now a radio group with arrow keys. The A to Z tab could not be reached with the left arrow from the first tab. The Africa pages are now linked as 'African roots', as agreed in the naming review (C136)";
const _ctx55=ctxV15;ctxV15=function(){const c=_ctx55();try{addRoots()}catch(e){}const rg=$$(".vtbar .vtrg");c.roots={n:$$(".roots").length,expected:ROOTS.filter(([id])=>$("#v-"+id)).length,vt:{n:rg.length,bad:rg.filter(g=>g.getAttribute("role")!=="radiogroup"||g.querySelectorAll('[role=radio][aria-checked="true"]').length!==1).length}};return c};
function v36Boot(){addRoots();setTimeout(azWrap,0)}

/* ---- Every dataset that declares JSON-LD output is really exported (D-092) ---- */
const _ldExtraBase=ldExtra;ldExtra=function(base){const out=_ldExtraBase(base);const have=new Set(out.map(x=>x["@id"]));
  DATASETS.filter(d=>(d.out||[]).includes("jsonld")).forEach(d=>{let arr=[];try{arr=d.arr()||[]}catch(e){}
    out.push({"@type":"Dataset","@id":base+"dataset-"+d.k,"name":d.n,"url":(META.url||"")+"#"+d.view,"isPartOf":base+"hub"});
    arr.forEach((x,i)=>{const id=base+d.id(x,i);if(have.has(id))return;have.add(id);let srcs=[];try{srcs=(d.srcs(x)||[]).filter(s=>SOURCES[s]).map(s=>SOURCES[s].u)}catch(e){}
      out.push({"@type":"CreativeWork","@id":id,"name":String(d.lab(x,i)).slice(0,300),"isPartOf":base+"dataset-"+d.k,...(srcs.length?{"citation":[...new Set(srcs)]}:{})})})});
  return out};
function ldCoverage(){const g=jsonld()["@graph"];const ids=new Set(g.map(x=>x["@id"]));const base="urn:bhm26:";const miss=[];
  DATASETS.filter(d=>(d.out||[]).includes("jsonld")).forEach(d=>{let arr=[];try{arr=d.arr()||[]}catch(e){}if(!ids.has(base+"dataset-"+d.k))miss.push(d.k+" (no dataset node)");const lost=arr.filter((x,i)=>!ids.has(base+d.id(x,i))).length;if(lost)miss.push(d.k+": "+lost+" items")});
  return{declared:DATASETS.filter(d=>(d.out||[]).includes("jsonld")).length,miss,nodes:g.length}}
CHECKS.push({id:"C137",n:"Every dataset that says it is exported as linked data really is (D-092)",run:c=>({ok:c.ldc.declared>=5&&!c.ldc.miss.length,d:c.ldc.miss.length?"Not exported: "+c.ldc.miss.slice(0,5).join(", "):`${c.ldc.declared} datasets exported in full; ${c.ldc.nodes} linked-data nodes`}),breakIt:c=>{c.ldc={...c.ldc,miss:["genome: 37 items"]};return c}});
BUILD_TESTS["D-092"]="Datasets were labelled as exported to JSON-LD, but only myths, roles, schemes and partners were; the knowledge, language, peoples and genome datasets (and older ones) were missing from the download. Every declared dataset is now exported with its sources as citations, and C137 compares the export with the declarations";
const _ctx56=ctxV15;ctxV15=function(){const c=_ctx56();try{c.ldc=ldCoverage()}catch(e){c.ldc={declared:0,miss:["export failed: "+e.message],nodes:0}}return c};
