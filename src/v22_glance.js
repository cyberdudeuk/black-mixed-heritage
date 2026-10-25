
/* ================= v2.1.1 AT A GLANCE: short summaries at the top of long reference pages, computed from the page's own data ================= */
function _cnt(arr,f){const m={};arr.forEach(x=>{[].concat(f(x)||[]).forEach(k=>{m[k]=(m[k]||0)+1})});return Object.entries(m).sort((a,b)=>b[1]-a[1])}
function glanceData(){const out={};
  try{const ineq=EQUITY.flatMap(d=>d.ineq),acts=EQUITY.flatMap(d=>d.actions);const noEval=acts.filter(a=>!a.ev||/\bno (published |formal |outcome )?(evaluation|ethnicity results)|no evaluation|too recent for published evaluation/i.test(a.ev)).length;const top=_cnt(ineq,x=>x.aff||[]).slice(0,3);
    out.equity=[`${EQUITY.length} areas of life, ${ineq.length} recorded inequalities and ${acts.length} recorded actions, each with a source.`,
      `Groups named most often as affected: ${top.map(([k,n])=>`${AFFECTED[k]||k} (${n})`).join(", ")}.`,
      `For at least ${noEval} of ${acts.length} actions, no published evaluation of whether they work was found; each action says what is known.`,
      `Start with a domain below, or the table of every action.`]}catch(e){}
  try{const lv=_cnt(BENCH,x=>x.level);const refs=BENCH.filter(x=>x.ref).length;const doms=_cnt(BENCH,x=>x.dom).slice(0,3);
    out.bench=[`${BENCH.length} comparisons: ${lv.map(([k,n])=>`${n} ${k==="uk-nations"?"across the UK nations":k}`).join(", ")}.`,
      `Most compared: ${doms.map(([k,n])=>`${(typeof BM_DOMS!=="undefined"&&BM_DOMS[k]?(BM_DOMS[k][0]||BM_DOMS[k]):k)} (${n})`).join(", ")}.`,
      `${refs} entries describe one place only, for reference; every entry states what can and cannot be compared.`,
      `Figures come from different years and definitions: compare patterns, not exact numbers.`]}catch(e){}
  try{const g=_cnt(LIVES,x=>x.g);const v=_cnt(LIVES,x=>x.v);const lab=k=>(VALENCE.find(x=>x.k===k)||{l:k}).l.toLowerCase();
    out.lives=[`${LIVES.length} sourced facts across ${g.length} life stages and groups.`,
      `${v.map(([k,n])=>`${n} ${lab(k)}`).join(", ")}: strengths are shown alongside gaps.`,
      `Group statistics describe patterns, not individuals, and do not show causes unless the source says so.`]}catch(e){}
  try{const all=[...TALENT,...LEADFUND];const st=_cnt(all,x=>x.status);const lead=LEADFUND.filter(x=>LEAD_K.includes(x.kind)).length;
    out.talent=[`${TALENT.length} recruitment and career routes, ${LEADFUND.length} leadership, funding and fellowship schemes, and ${(typeof PHD!=="undefined"?PHD.length:0)} doctoral routes.`,
      `By status: ${st.map(([k,n])=>`${n} ${k}`).join(", ")}.`,
      `${lead} schemes, sponsorships and targets focus on leadership and senior roles.`,
      `Always confirm dates and eligibility on the organiser's page before applying.`]}catch(e){}
  return out}
function renderGlance(){const g=glanceData();const host={equity:"eq-overview",bench:"bm-overview",lives:"ls-groups",talent:"tn-routes"};
  Object.entries(host).forEach(([v,sid])=>{const s=document.getElementById(sid);if(!s||!g[v]||s.querySelector(".glance"))return;const head=s.querySelector(".sechead");
    const html=`<aside class="card glance" aria-label="At a glance"><p class="eyebrow">${icon("gauge")} At a glance</p><ul>${g[v].map(t=>`<li>${esc(t)}</li>`).join("")}</ul></aside>`;
    head?head.insertAdjacentHTML("afterend",html):s.insertAdjacentHTML("afterbegin",html)});window.__glance=Object.keys(g).length}
/* very short source summaries get the same treatment as placeholders: say what they support */
function fixShortSummaries(){const cites={};DATASETS.forEach(d=>{let arr=[];try{arr=d.arr()}catch(e){}arr.forEach(x=>{let ss=[];try{ss=d.srcs?d.srcs(x):[]}catch(e){}(ss||[]).forEach(s=>{(cites[s]=cites[s]||[]).push(String(d.lab(x)||""))})})});
  let n=0;Object.entries(SOURCES).forEach(([k,s])=>{if((s.s||"").length>=15)return;const c=cites[k];if(c&&c.length){s.s=(s.s?s.s+": ":"")+"supports "+c.slice(0,2).join("; ")+(c.length>2?` and ${c.length-2} more`:"");n++}else if(s.q){s.s=(s.s?s.s+": ":"")+`“${s.q.slice(0,140)}”`;n++}});return n}
const _fixedShort=fixShortSummaries();
CHECKS.push(
 {id:"C112",n:"Long reference pages open with a summary computed from their own data (D-059)",run:c=>({ok:c.glance.shown===4&&c.glance.empty===0,d:`${c.glance.shown} of 4 pages have an "At a glance" summary; ${c.glance.empty} empty`}),
  breakIt:c=>{c.glance={...c.glance,shown:3};return c}},
 {id:"C113",n:"Source summaries say what they support, not just a word or two (D-060)",run:c=>({ok:c.shortSrc.length<=c.shortAllowed,d:`${c.shortSrc.length} summaries under 15 characters (allowed: ${c.shortAllowed}, sources no item cites)${c.shortSrc.length?": "+c.shortSrc.slice(0,8).join(", "):""}; ${_fixedShort} expanded`}),
  breakIt:c=>{c.shortSrc=new Array(c.shortAllowed+5).fill("Sx");return c}});
Object.assign(BUILD_TESTS,{"D-059":"Long reference pages (inequalities, benchmarks, life stages, talent) started with thousands of words before any summary; each now opens with an 'At a glance' list computed from its own data (C112)","D-060":"114 source summaries were under 15 characters, such as a single word; those cited by an item now say what they support (C113)"});
REQS.push({id:"R63",t:"NF",r:"Summaries first on long reference pages; meaningful source summaries",o:"Request 32 (release 2.1.1)",sat:["eq-overview","bm-overview","ls-groups","tn-routes"],ver:["C112","C113"]});
const _ctx43=ctxV15;ctxV15=function(){const c=_ctx43();const gl=$$(".glance");c.glance={shown:gl.length,empty:gl.filter(x=>x.querySelectorAll("li").length<3).length};
  const cited=new Set();DATASETS.forEach(d=>{let arr=[];try{arr=d.arr()}catch(e){}arr.forEach(x=>{try{(d.srcs?d.srcs(x):[]).forEach(s=>cited.add(s))}catch(e){}})});
  c.shortSrc=Object.entries(SOURCES).filter(([k,s])=>(s.s||"").length<15).map(([k])=>k);c.shortAllowed=c.shortSrc.filter(k=>!cited.has(k)&&!SOURCES[k].q).length;return c};
function v28Boot(){renderGlance()}
