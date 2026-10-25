/* ================= v2.14.0 BLACK COMMUNITIES AROUND THE WORLD, HONOURING OUR COMMUNITIES, AND A GLOBAL COVERAGE AUDIT (D-119, D-120) =================
   Every menu already holds nine pages, so new lens content that belongs with an existing page is shown inside it:
   "Black communities around the world" inside The African diaspora, and "Honouring our communities" inside the theme page.
   This runs before start-up, so the drawer, search and checks see the sections as part of their host page. */
(function(){document.querySelectorAll(".lpinj[data-inject]").forEach(el=>{const host=document.getElementById("v-"+el.dataset.inject);if(!host)return;
  const src=document.getElementById(el.dataset.inject+"-sources");const at=src&&src.parentNode===host?src:null;
  const wrap=document.createElement("div");wrap.className="lpinj-wrap";host.insertBefore(wrap,at);wrap.appendChild(el)})})();
/* Global coverage: how often each world region is named across the content pages. The audience is mainly in the UK, so the UK
   leads by design; the check only asks that no region with large Black or Black-Mixed populations falls below a floor. */
const GC_REG={"UK and Ireland":["United Kingdom","Britain","British","England","Scotland","Wales","Northern Ireland","London","Bristol","Liverpool","Cardiff","Birmingham","Manchester","Ireland"],
 "Caribbean":["Caribbean","Jamaica","Barbados","Trinidad","Grenada","Saint Lucia","St Lucia","Dominica","Antigua","St Kitts","Montserrat","Bahamas","Haiti","Cuba","Dominican Republic","Puerto Rico","Guyana","Belize","Bermuda","St Vincent","Martinique","Guadeloupe","Suriname"],
 "West Africa":["Nigeria","Ghana","Sierra Leone","Senegal","Gambia","Liberia","Mali","Ivory Coast","Côte d’Ivoire","Benin","Togo","Burkina Faso","Guinea","Cape Verde","Mauritania"],
 "East Africa and the Horn":["Kenya","Uganda","Tanzania","Ethiopia","Eritrea","Somalia","Rwanda","Burundi","Sudan","Djibouti","Swahili"],
 "Central Africa":["Congo","Congolese","Kongo","Ndongo","Loango","Kuba","Luba","Lunda","Bamum","Cameroon","Gabon","Chad","Kanem","Central African Republic","Angola","Angolan","Equatorial Guinea","São Tomé"],
 "Southern Africa":["South Africa","Zimbabwe","Zambia","Malawi","Mozambique","Namibia","Botswana","Lesotho","Eswatini","Madagascar","Mauritius"],
 "North Africa":["Egypt","Morocco","Algeria","Tunisia","Libya","Amazigh"],
 "USA and Canada":["United States","USA","African American","Canada","Canadian","Nova Scotia"],
 "Latin America":["Brazil","Brazilian","Colombia","Colombian","Mexico","Afro-Mexican","Venezuela","Peru","Ecuador","Argentina","Uruguay","Panama","Costa Rica","Honduras","Garifuna","Afro-Latin","Palenque","quilombo"],
 "Continental Europe":["France","French","Germany","Afro-German","Netherlands","Dutch","Portugal","Lisbon","Spain","Italy","Belgium","Sweden","Afropean","Keti Koti"],
 "Asia and the Middle East":["Siddi","Sheedi","Habshi","Afro-Iranian","Afro-Iraqi","Afro-Turk","Afro-Arab","Afro-Palestinian","Afro-Sri Lankan","India","Iran","Iraq","Turkey","Yemen","Oman","Arabia"],
 "Oceania":["Australia","Aboriginal","Papua","Melanesia","Fiji","New Zealand","Pacific"]};
const GC_FLOOR={"Latin America":3,"Continental Europe":3,"Asia and the Middle East":2.5,"Central Africa":2,"Caribbean":8};
function gcAudit(){const skip=/^v-(review|assurance|design|knowledge|routines|dash|guide|about|sustain)$/;const views=[...document.querySelectorAll(".view")].filter(v=>!skip.test(v.id));
  const txt=views.map(v=>v.textContent).join(" \n ");const rows=Object.entries(GC_REG).map(([reg,ns])=>{let n=0;const per={};
    ns.forEach(nm=>{const c=(txt.match(new RegExp("\\b"+nm.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","g"))||[]).length;if(c){n+=c;per[nm]=c}});
    return{reg,n,top:Object.entries(per).sort((a,b)=>b[1]-a[1]).slice(0,5)}});
  const tot=rows.reduce((a,r)=>a+r.n,0)||1;rows.forEach(r=>{r.pct=100*r.n/tot});
  const bad=rows.filter(r=>GC_FLOOR[r.reg]&&r.pct<GC_FLOOR[r.reg]).map(r=>`${r.reg} ${r.pct.toFixed(1)}% (floor ${GC_FLOOR[r.reg]}%)`);return{rows,tot,bad}}
function gcRender(){const v=$("#v-review");if(!v||$("#rv-global"))return;const a=window.__gc||(window.__gc=gcAudit());
  v.insertAdjacentHTML("beforeend",`<section class="block" id="rv-global" data-icon="globe" data-label="Global coverage"><div class="sechead"><span class="eyebrow">Fair coverage around the world</span><h2>Global coverage of Black and Black-Mixed communities</h2><p>How often each region is named across the content pages. The hub's readers are mainly in the UK, so the UK leads by design. The check sets a floor for regions with large Black or Black-Mixed populations that were under-covered before version 2.14.0: Latin America, continental Europe, Asia and the Middle East, Central Africa and the Caribbean island by island. Mentions are a rough measure: they count names, not depth.</p></div>
  <div class="tablewrap"><table class="dt" id="gcTable"><caption class="vh">Mentions of each world region across the content pages</caption><thead><tr><th scope="col">Region</th><th scope="col">Mentions</th><th scope="col">Share</th><th scope="col">Floor</th><th scope="col">Most named</th></tr></thead><tbody>${a.rows.map(r=>`<tr><th scope="row">${esc(r.reg)}</th><td>${r.n}</td><td>${r.pct.toFixed(1)}%</td><td>${GC_FLOOR[r.reg]?GC_FLOOR[r.reg]+"%":"–"}</td><td>${esc(r.top.map(x=>x[0]+" ("+x[1]+")").join(", "))}</td></tr>`).join("")}</tbody></table></div></section>`)}
CHECKS.push({id:"C159",n:"Black and Black-Mixed communities around the world are covered fairly: no under-covered region falls below its floor (D-119)",run:c=>({ok:!c.gc.bad.length,d:c.gc.bad.length?"Below floor: "+c.gc.bad.join("; "):`${c.gc.tot} mentions of ${c.gc.rows.length} regions; every region with a floor meets it (Latin America ${c.gc.rows.find(r=>r.reg==="Latin America").pct.toFixed(1)}%, continental Europe ${c.gc.rows.find(r=>r.reg==="Continental Europe").pct.toFixed(1)}%, Asia and the Middle East ${c.gc.rows.find(r=>r.reg==="Asia and the Middle East").pct.toFixed(1)}%)`}),
  breakIt:c=>{c.gc={...c.gc,bad:["Latin America 1.6% (floor 3%)"]};return c}});
BUILD_TESTS["D-119"]="A coverage audit found the hub named Latin America in 1.6% of regional mentions, continental Europe in 2.4% and African-descended communities in Asia and the Middle East hardly at all, although Latin America holds the largest African-descended populations outside Africa. A sourced section on Black communities around the world was added inside the diaspora page, and C159 sets floors so coverage cannot fall back";
BUILD_TESTS["D-120"]="Every menu holds nine pages, so new content that belongs with an existing page is shown inside it; it is placed before start-up so the drawer, search and checks treat it as part of the host page, and it adds no second level-1 heading";
REQS.push({id:"R85",t:"F",r:"Cover all Black and Black-Mixed communities around the world fairly, while the audience is mainly UK-based",o:"Request 64",sat:["rv-global","gl-latam-overview"],ver:["C159"]},
 {id:"R86",t:"F",r:"Honouring our communities: ways to honour them — how, what, where, when, by and for whom",o:"Request 64",sat:["ho-places","ho-proposals"],ver:["C138","C142"]});
const _ctx70=ctxV15;ctxV15=function(){const c=_ctx70();c.gc=window.__gc||(window.__gc=gcAudit());return c};
function v43Boot(){(window.requestIdleCallback||setTimeout)(()=>{try{gcRender();enhanceAll()}catch(e){console.error("global coverage",e)}},{timeout:6000});
  if(!$("#rv-global")){const v=$("#v-review");if(v)v.insertAdjacentHTML("beforeend",`<section class="block" id="rv-global" data-icon="globe" data-label="Global coverage"><div class="sechead"><h2>Global coverage of Black and Black-Mixed communities</h2></div><p class="muted">Drawn when the page is idle.</p></section>`)}
  const g=$("#rv-global");if(g&&!g.querySelector("table")){const r=g;(window.requestIdleCallback||setTimeout)(()=>{if(!r.querySelector("table")){r.remove();gcRender()}},{timeout:6500})}}
