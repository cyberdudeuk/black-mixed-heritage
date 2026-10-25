
/* ================= v2.8.0 GAPS CLOSED: Jamaica's flag, the Rift Valley, Africa's population share, ironworking, six more language terms ================= */
LANG_BANNED.push({k:"Dark Continent",re:/\bdark continent\b/i,use:"Africa, or the region or country"});
function applyGaps3(){const done=[];
  const jm=FLAGS.find(f=>f.n==="Jamaica");if(jm){if(!/no red/.test(jm.m)){jm.m=jm.m+" Why the flag has no red is not confirmed by the sources cited.";jm.src=[...new Set([...jm.src,...GAPS3.jamaica_flag.src])]}done.push("flag-jamaica")}else{FLAGS.push({n:"Jamaica",c:"black, green, gold",m:GAPS3.jamaica_flag.t,src:GAPS3.jamaica_flag.src});done.push("flag-jamaica")}
  const sc=PP.scale;if(sc){[["rift_valley",""],["population_share","18.5% (2024, modelled)"]].forEach(([k,fig])=>{const g=GAPS3[k];if(!sc.points.some(p=>p.h===g.h)){sc.points.push({h:g.h,text:g.t,figure:fig,year:"",disputed:g.disputed,note:g.note,src:g.src});done.push(k)}})}
  const sci=AK_DOMAINS.find(d=>d.k==="science");const g=GAPS3.ironworking;if(sci&&!sci.ex.some(e=>e.title===g.h)){sci.ex.push({title:g.h,region:"West and Central Africa",period:"Before 1000 BCE (debated)",t:g.t,disputed:true,dn:g.note,src:g.src});done.push("ironworking")}
  LANG_TERMS3.forEach(t=>{if(!LANG_TERMS.some(x=>x.term===t.term)){LANG_TERMS.push(t);done.push(t.id)}});
  window.__gaps3=done;return done}
applyGaps3();
CHECKS.push({id:"C135",n:"Gaps closed in 2.8.0 are placed where they belong (D-090)",run:c=>({ok:c.g3.n>=10&&!c.g3.unsourced,d:`${c.g3.n} additions placed (${c.g3.list}); ${c.g3.unsourced} without a source`}),breakIt:c=>{c.g3={...c.g3,n:2};return c}});
BUILD_TESTS["D-090"]="Items earlier marked 'not found' were researched again: Jamaica's flag meanings (National Library of Jamaica; why it has no red is still not confirmed), the Rift Valley (Smithsonian), Africa's share of world population (UN data, modelled), the ironworking debate, and six language terms. 42 points resting on Wikipedia alone now have a stronger source, and the new sources corrected several details: the Strait of Gibraltar is 13 km, the Mozambique Channel about 1,600 km, São Tomé was settled in 1493 (C135)";
const _ctx54=ctxV15;ctxV15=function(){const c=_ctx54();const d=window.__gaps3||[];c.g3={n:d.length,list:d.join(", "),unsourced:Object.values(GAPS3).filter(g=>!g.src.length).length+LANG_TERMS3.filter(t=>!t.src.length).length};return c};
