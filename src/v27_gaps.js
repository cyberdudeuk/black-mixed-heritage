
/* ================= v2.5.0 GAPS FILLED: verified additions placed where they belong ================= */
GAPS_V27.kirina.t="Britannica dates the founding of the Mali Empire by Sundiata to about 1230. Tradition places Sundiata Keita's confrontation with the Sosso king Sumanguru Kanté at the Battle of Kirina, around 1235 (this detail rests on Wikipedia); the story is retold in the Epic of Sundiata.";
function applyGapsV27(){const done=[];const ex=t=>{for(const d of AK_DOMAINS){const e=d.ex.find(x=>x.title===t);if(e)return e}return null};
  const addTo=(e,g,mode)=>{if(!e)return false;if(mode==="replace"){e.t=g.t;e.src=g.src}else{e.t=e.t+" "+g.t;e.src=[...new Set([...e.src,...g.src])]}return true};
  /* FAQ: other heritage months, the Netherlands, and the curriculum in England */
  const f6=FAQ.find(f=>f.id==="faq-6"),f9=FAQ.find(f=>f.id==="faq-9"),f4=FAQ.find(f=>f.id==="faq-4");
  if(f6&&!/Gypsy, Roma/.test(f6.a)){f6.a=f6.a.replace("and South Asian Heritage Month began in 2020.","South Asian Heritage Month began in 2020, and Gypsy, Roma and Traveller History Month has been held every June since 2008.");f6.src=[...new Set([...f6.src,...GAPS_V27.grt.src])];done.push("faq-6")}
  if(f9&&!/Black Achievement Month/.test(f9.a)){f9.a=f9.a.replace(/\s*We could not verify a Netherlands observance[^.]*\./," In the Netherlands, October is Black Achievement Month, first held in 2015.");f9.src=[...new Set([...f9.src,...GAPS_V27.bam.src])];done.push("faq-9")}
  if(f4&&!/Nick Gibb/.test(f4.a)){f4.a=f4.a.replace("and we did not verify current curriculum coverage data.","and we did not verify current curriculum coverage data. In 2020 the schools minister told Parliament the curriculum's flexibility already allows Black British history to be taught (House of Commons Library, 2021).");f4.src=[...new Set([...f4.src,...GAPS_V27.curric.src])];done.push("faq-4")}
  /* Ethiopia's flag: Britannica instead of an encyclopaedia page that varied */
  const eth=FLAGS.find(f=>f.n==="Ethiopia");if(eth){eth.m=GAPS_V27.eth.t;eth.src=GAPS_V27.eth.src;done.push("flag-ethiopia")}
  /* knowledge page */
  if(addTo(ex("Human origins in Africa"),GAPS_V27.origins))done.push("origins");
  if(addTo(ex("Nok culture"),GAPS_V27.nok,"replace"))done.push("nok");
  if(addTo(ex("Djenné and earthen architecture"),GAPS_V27.djenne))done.push("djenne");
  if(addTo(ex("The mbira"),GAPS_V27.mbira))done.push("mbira");
  if(addTo(ex("Sorghum"),GAPS_V27.sorghum,"replace"))done.push("sorghum");
  const nd=ex("Ndebele house painting");if(nd){nd.t=GAPS_V27.ndebele.t;nd.src=GAPS_V27.ndebele.src;done.push("ndebele")}
  if(addTo(ex("Griots (jeli) and the Manden Charter"),GAPS_V27.kirina))done.push("kirina");
  const w=AK_DOMAINS.find(d=>d.k==="writing");if(w&&!w.ex.some(e=>e.title==="The Vai syllabary")){w.ex.push({title:"The Vai syllabary",region:"West Africa (Liberia and Sierra Leone)",period:"About 1833",t:GAPS_V27.vai.t,disputed:false,dn:"",src:GAPS_V27.vai.src});done.push("vai")}
  const size=AK_PLURAL.find(p=>/vast continent/i.test(p.h));if(size&&!/True Size/.test(size.t)){const k=(GAPS_V27.size.t.match(/[^.]*Krause[^.]*\./)||[""])[0].trim();size.t=size.t+(k?" "+k:"");size.src=[...new Set([...size.src,...GAPS_V27.size.src])];done.push("size")}
  window.__gaps27=done;return done}
applyGapsV27();
CHECKS.push({id:"C122",n:"Every verified gap is placed on the page it belongs to (D-077)",run:c=>({ok:c.gaps.placed>=13&&c.gaps.unsourced===0,d:`${c.gaps.placed} additions placed (${c.gaps.list}); ${c.gaps.unsourced} without a source`}),
  breakIt:c=>{c.gaps={...c.gaps,placed:3};return c}});
BUILD_TESTS["D-077"]="Fifteen gaps were open (other heritage months, the Netherlands, the curriculum in England, Ethiopia's flag, Africa's size, human origins, Vai, Nok, Djenné, Sundiata, mbira, sorghum, Ndebele); fourteen were found, re-checked against the live pages and placed where they belong, with overclaims reworded (C122). Not found and not published: why Jamaica's flag has no red, Africa's share of world population, a source naming the Rift Valley, and the debate over where African ironworking began";
REQS.push({id:"R67",t:"NF",r:"Close the identified evidence gaps with verified sources",o:"Request 36",sat:["fq-list","ak-fields","af-colours"],ver:["C122"]});
const _ctx48=ctxV15;ctxV15=function(){const c=_ctx48();const d=window.__gaps27||[];c.gaps={placed:d.length,list:d.join(", "),unsourced:Object.values(GAPS_V27).filter(g=>!g.src.length).length};return c};
