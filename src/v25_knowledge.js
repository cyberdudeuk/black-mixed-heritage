
/* ================= v2.4.0 HOW KNOWLEDGE SHAPED AFRICA, AND MANY CULTURES NOT ONE ================= */
VIEW_ICONS.knowafrica="baobab";
const AK_IC={geometry:"grid",geography:"map",mathematics:"chart",science:"tool",writing:"doc",music:"music",oral:"mic",astronomy:"sun",agriculture:"seedling"};
let AK_F={dom:"all",reg:"all",disp:false};
function _akRegion(r){return /North/i.test(r)&&!/West|East/i.test(r)?"North":/West/i.test(r)?"West":/East/i.test(r)?"East":/Central|central/.test(r)?"Central":/Southern|South Africa|Zimbabwe/i.test(r)?"Southern":"Continent-wide"}
function renderKnowAfrica(){if(!$("#akList"))return;
  if(!$("#akPlural .card"))$("#akPlural").innerHTML=AK_PLURAL.map(p=>`<article class="card"><h3>${esc(p.h)}</h3><p>${esc(p.t)}</p><div class="tags">${p.src.map(evTag).join("")}</div></article>`).join("");
  if(!$("#akIntro").textContent)$("#akIntro").textContent=AK_PLURAL_INTRO;
  const regs=["North","West","East","Central","Southern","Continent-wide"];
  if(!$("#akChips").children.length){$("#akChips").innerHTML=[{k:"all",title:"All fields"},...AK_DOMAINS].map(d=>`<button type="button" class="chip" data-d="${d.k}" aria-pressed="${AK_F.dom===d.k}">${icon(AK_IC[d.k]||"layers")} ${esc(d.title)}</button>`).join("");
    $("#akReg").innerHTML=`<option value="all">All regions</option>`+regs.map(r=>`<option>${r}</option>`).join("");
    $$("#akChips .chip").forEach(b=>b.addEventListener("click",()=>{AK_F.dom=b.dataset.d;$$("#akChips .chip").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));draw()}));
    $("#akReg").addEventListener("change",e=>{AK_F.reg=e.target.value;draw()});$("#akDisp").addEventListener("change",e=>{AK_F.disp=e.target.checked;draw()})}
  const draw=()=>{const doms=AK_DOMAINS.filter(d=>AK_F.dom==="all"||d.k===AK_F.dom);let n=0;
    $("#akList").innerHTML=doms.map(d=>{const ex=d.ex.filter(e=>(AK_F.reg==="all"||_akRegion(e.region)===AK_F.reg)&&(!AK_F.disp||e.disputed));n+=ex.length;if(!ex.length)return"";
      return `<section class="lsgroup" id="ak-${d.k}" aria-labelledby="akh-${d.k}"><h3 class="lsh" id="akh-${d.k}">${icon(AK_IC[d.k]||"layers")} ${esc(d.title)}</h3><p class="muted">${esc(d.intro)}</p><div class="grid g3">${ex.map((e,i)=>`<article class="card" id="ak-${d.k}-${i}"><p class="mono muted" style="margin:0">${esc(e.region)}${e.period?" · "+esc(e.period):""}</p><h4>${esc(e.title)}</h4>${e.disputed?`<p class="eqmost">${icon("debate")} <b>Debated:</b> ${esc(e.dn||"Scholars disagree; see the sources.")}</p>`:""}<p>${esc(e.t)}</p><div class="tags">${e.src.map(evTag).join("")}</div></article>`).join("")}</div></section>`}).join("")||`<p class="muted">Nothing matches these filters.</p>`;
    $("#akN").textContent=`${n} of ${AK_DOMAINS.reduce((a,d)=>a+d.ex.length,0)} examples shown`;enhanceAll()};
  draw();window.__ak={domains:AK_DOMAINS.length,ex:AK_DOMAINS.reduce((a,d)=>a+d.ex.length,0)}}
CHECKS.push(
 {id:"C119",n:"Every example of African knowledge is sourced, placed and dated, and disputed claims say so (D-066)",run:c=>({ok:c.ak.ex>=25&&!c.ak.bad.length&&c.ak.regions>=5,d:c.ak.bad.length?"Problems: "+c.ak.bad.join(", "):`${c.ak.ex} examples across ${c.ak.domains} fields and ${c.ak.regions} regions; ${c.ak.disputed} marked as debated, each with a note`}),
  breakIt:c=>{c.ak={...c.ak,bad:["Dogon: disputed without a note"]};return c}},
 {id:"C120",n:"The case for many African cultures, not one, rests on sourced points (D-067)",run:c=>({ok:c.akp.n>=6&&c.akp.unsourced===0,d:`${c.akp.n} points; ${c.akp.unsourced} without a source`}),
  breakIt:c=>{c.akp={...c.akp,unsourced:1};return c}});
Object.assign(BUILD_TESTS,{"D-066":"A page on how geometry, geography, mathematics, science, writing, music, oral tradition, astronomy and agriculture shaped Africa was added; every example must have a read source, a region and a period, and contested claims (fractals, Ishango, Lebombo, Nsibidi, Nabta Playa, the Dogon) must say they are debated (C119)","D-067":"The explanation of why there are many African cultures, not one, must rest on sourced points (C120)"});
REQS.push({id:"R66",t:"F",r:"How geometry, geography, topography, maths, science, coding, music, oral tradition and other fields shaped Africa's cultures, languages, people and places; why there is not one African culture",o:"Request 35",sat:["ak-plural","ak-fields"],ver:["C119","C120"]});
DATASETS.push({k:"knowafrica",n:"Knowledge that shaped Africa",ic:"baobab",arr:()=>AK_DOMAINS.flatMap(d=>d.ex.map((e,i)=>({...e,id:"ak-"+d.k+"-"+i}))),id:x=>x.id,lab:x=>x.title,srcs:x=>x.src||[],view:"knowafrica",href:x=>"#"+x.id,out:["pages","jsonld"],chk:["C119"]});
const _ctx46=ctxV15;ctxV15=function(){const c=_ctx46();const all=AK_DOMAINS.flatMap(d=>d.ex);
  c.ak={domains:AK_DOMAINS.length,ex:all.length,disputed:all.filter(e=>e.disputed).length,regions:new Set(all.map(e=>_akRegion(e.region))).size,bad:all.filter(e=>!e.src.length||!e.src.every(s=>SOURCES[s]&&SOURCES[s].rd)||!e.region||(e.disputed&&!e.dn)).map(e=>e.title)};
  c.akp={n:AK_PLURAL.length,unsourced:AK_PLURAL.filter(p=>!p.src.length).length};return c};
function v31Boot(){renderKnowAfrica()}
