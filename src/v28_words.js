
/* ================= v2.6.0 WORDS MATTER: race and ethnicity, Black and African, terms to avoid, and a language check on the hub's own text ================= */
VIEW_ICONS.language="quote";
let LW_F={k:"all",q:""};
/* Terms the hub must not use in its own voice. Quotations, titles, names of organisations, laws, official days and documents, links and source tags
   are kept verbatim and are not checked: changing a quotation would misquote it. A term inside quotation marks is a mention, not a use. */
const LANG_BANNED=[
 {k:"BAME",re:/\bBAME\b/,use:"the specific ethnic group, or ethnic minorities"},
 {k:"BME",re:/\bBME\b/,use:"the specific ethnic group, or ethnic minorities"},
 {k:"slaves",re:/\bslaves\b/i,use:"enslaved people"},
 {k:"slave-owner",re:/\bslave[- ]?owners?\b/i,use:"enslaver"},
 {k:"slave trader",re:/\bslave[- ]traders?\b/i,use:"enslaver, or trader in enslaved people"},
 {k:"half-caste",re:/\bhalf-caste\b/i,use:"Mixed ethnic background"},
 {k:"coloured people",re:/\bcoloured (people|person|man|woman|men|women)\b/i,use:"the specific ethnic group"},
 {k:"tribe",re:/\btrib(e|es|al)\b/i,use:"ethnic group, people or nation, or the group's own name"},
 {k:"Third World",re:/\bthird world\b/i,use:"the country or region, or an income group"},
 {k:"exotic",re:/\bexotic\b/i,use:"name the culture, food or style"},
 {k:"hard to reach",re:/\bhard[- ]to[- ]reach\b/i,use:"seldom heard, or say who has not been reached and why"},
 {k:"illegal immigrants",re:/\billegal (immigrants?|migrants?)\b/i,use:"the Windrush generation; people wrongly treated as unlawfully present"},
 {k:"non-white",re:/\bnon-white\b/i,use:"the specific groups, or all other ethnic groups combined"},
 {k:"Blacks (noun)",re:/\b(the )?Blacks\b/,use:"Black people"},
 {k:"lower-case black",re:/(?<![\w-])black (people|Britons|staff|communities|women|men|colleagues|leaders|families|children|pupils|students|workers)\b/,use:"Black, with a capital B"},
 {k:"race pay gap",re:/\brace pay gap\b/i,use:"ethnicity pay gap"}];
/* Proper names and official titles that contain a listed term and are kept as they are */
const LANG_NAMES=[/Journal of Blacks in Higher Education/g,/BAME Councillors Weekender/g,/BME Legal/g,/BME Forum/g,/Ambulance BME/g,/leadership-bame/g,/Transatlantic Slave Trade/g,/Slave Trade and (its )?Abolition/g,/Slave Trade Remembrance/g,/Slave Trade Act/g,/Legacies of British Slave[- ]ownership/gi];
const _QUOTED=/“[^”]{0,300}”|‘(?:[^’]|’(?=[a-z])){0,300}’|"[^"]{0,200}"|(?<![A-Za-z])'(?:[^']|'(?=[a-z])){1,120}'(?![A-Za-z])/g;
const LANG_SKIP="#checkRows,.checkrow,a,.tags,q,blockquote,cite,code,pre,script,style,svg,select,option,.mono,.lw-mention,[data-quote],script[type='application/ld+json'],#v-language .lwterm h3,#thesBody,.ltm,.ltlink,#lw-time";
function langLint(root){root=root||document;const hits=[];
  (root===document?[...document.querySelectorAll(".view")]:[root]).forEach(v=>{const w=document.createTreeWalker(v,NodeFilter.SHOW_TEXT);let n;
    while(n=w.nextNode()){let t=n.nodeValue;if(!t||t.length<4)continue;const p=n.parentElement;if(!p||p.closest(LANG_SKIP))continue;
      t=t.replace(_QUOTED," ");LANG_NAMES.forEach(r=>{t=t.replace(r," ")});
      for(const b of LANG_BANNED){const m=t.match(b.re);if(m){hits.push({k:b.k,view:v.id.replace(/^v-/,""),ctx:t.slice(Math.max(0,m.index-50),m.index+60).replace(/\s+/g," ").trim(),use:b.use})}}}});
  return hits}
function renderWords(){if(!$("#lwTerms"))return;
  const card=s=>`<article class="card"><h3>${esc(s.h)}</h3><p>${esc(s.text)}</p>${s.own?`<p class="eqmost">${icon("info")} <b>Our reading:</b> this is the hub's own rule, drawn from the sources; it is not quoted from them.</p>`:""}<div class="tags">${[...new Set(s.src)].map(evTag).join("")}</div></article>`;
  if(!$("#lwRace .card"))$("#lwRace").innerHTML=LANG_RE.map(card).join("");
  if(!$("#lwBlack .card"))$("#lwBlack").innerHTML=LANG_AB.map(card).join("");
  if(!$("#lwPrin .card"))$("#lwPrin").innerHTML=LANG_PRIN.map(card).join("");
  if(!$("#lwChips").children.length){const n=k=>LANG_TERMS.filter(t=>k==="all"||(k==="debated"?t.debated:t.avoid)).length;
    $("#lwChips").innerHTML=[["all","All terms"],["avoid","Not used in the hub’s own words"],["debated","Debated: use with care"]].map(([k,l])=>`<button type="button" class="chip" data-k="${k}" aria-pressed="${LW_F.k===k}">${esc(l)} <span>${n(k)}</span></button>`).join("");
    $$("#lwChips .chip").forEach(b=>b.addEventListener("click",()=>{LW_F.k=b.dataset.k;$$("#lwChips .chip").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));draw()}));
    $("#lwQ").addEventListener("input",e=>{LW_F.q=e.target.value.trim().toLowerCase();draw()})}
  const draw=()=>{const list=LANG_TERMS.filter(t=>(LW_F.k==="all"||(LW_F.k==="debated"?t.debated:t.avoid))&&(!LW_F.q||(t.term+" "+t.why+" "+t.use_instead).toLowerCase().includes(LW_F.q)));
    $("#lwTerms").innerHTML=list.map(t=>`<article class="card lwterm" id="${t.id}"><h3>${esc(t.term)}</h3>${t.debated?`<p class="eqmost">${icon("debate")} <b>Debated:</b> views differ; both are set out below.</p>`:""}${t.avoid?`<p class="lwavoid">${icon("flag")} ${t.debated?"":"<b>Avoid.</b> "}This hub does not use it in its own words.</p>`:""}<p><b>Why it matters:</b> ${esc(t.why)}</p><p><b>Use instead:</b> ${esc(t.use_instead)}</p>${t.note?`<p class="muted">${esc(t.note)}</p>`:""}<div class="tags">${[...new Set(t.src)].map(evTag).join("")}</div></article>`).join("")||`<p class="muted">No terms match.</p>`;
    $("#lwN").textContent=`${list.length} of ${LANG_TERMS.length} terms shown`;enhanceAll()};
  draw();renderLangAudit()}
function renderLangAudit(){const host=$("#lwAudit");if(!host)return;const hits=window.__langHits||[];
  host.innerHTML=`<p>${hits.length?`<b>${hits.length}</b> uses of listed terms were found in the hub's own words:`:`The hub's own words were checked against ${LANG_BANNED.length} listed terms on every page. <b>None was found.</b>`}</p>${hits.length?`<ul>${hits.slice(0,30).map(h=>`<li><a href="#${h.view}">${esc(h.view)}</a>: “${esc(h.ctx)}” — use ${esc(h.use)}</li>`).join("")}</ul>`:""}
  <p class="muted">Kept as they are, because changing them would misquote a source or rename an organisation: quotations, titles of books, films, reports and laws, names of organisations and programmes (for example the BAME Councillors Weekender), official days such as the International Day for the Remembrance of the Slave Trade and its Abolition, and historical documents such as the Moçâmedes slave register. Where a source groups people under a term we avoid, we say so (“the source’s ‘BME’ grouping”).</p>`}
/* Glossary, thesaurus and myths join up with the new page */
(function(){const add=(id,t,c,d)=>{if(!GLOSSARY.some(g=>g.id===id))GLOSSARY.push({id,t,c,d})};
  add("race","Race","Concept","A way of grouping people, mostly by appearance and supposed ancestry, that societies created. Scientists regard it as a social category, not a biological one. In UK law it is a protected characteristic that includes colour, nationality and ethnic or national origins.");
  add("ethnicity","Ethnicity","Concept","Belonging to a group with shared ancestry, culture, language, history or nationality. It is self-defined: in UK statistics a person's ethnic group is the one they say they belong to.");
  add("enslaved","Enslaved person","Language","Preferred to 'slave', because it describes what was done to a person rather than defining them by it. 'Enslaver' is preferred to 'slave owner' or 'master'.");
  add("amazigh","Amazigh (Imazighen)","Culture","The name the Indigenous peoples of North Africa use for themselves; often called 'Berber', a name many regard as an outsider's label.");
  const bp=THESAURUS.find(t=>t.p==="Black people");if(bp){bp.alt="Black Britons; Black African, Black Caribbean and Other Black ethnic groups";bp.avoid="\"the Blacks\"; using 'African' to mean all Black people";bp.rel="Black African; Black Caribbean; Mixed White and Black; see Words matter"}
  [{p:"Ethnicity",alt:"Ethnic group",avoid:"'race' when describing groups or data",br:"Ethnic groups",rel:"Race (in law and in discussing racism)"},
   {p:"Enslaved people",alt:"Enslaved Africans; people who were enslaved",avoid:"'slaves'",br:"History of slavery",rel:"Enslaver; trade in enslaved Africans"},
   {p:"Ethnic group, people or nation",alt:"The group's own name (for example the Yoruba people)",avoid:"'tribe'",br:"Peoples",rel:"Ethnic group"}].forEach(x=>{if(!THESAURUS.some(t=>t.p===x.p))THESAURUS.push(x)})})();
CHECKS.push(
 {id:"C123",n:"The hub's own words use none of the terms it advises against (D-078)",run:c=>({ok:c.lang.ran&&c.lang.hits.length===0&&c.lang.nodes>2000,d:!c.lang.ran?"Language check did not run":c.lang.hits.length?`${c.lang.hits.length} uses: `+c.lang.hits.slice(0,4).map(h=>h.view+": "+h.k+" (“"+h.ctx.slice(0,50)+"”)").join("; "):`${c.lang.nodes} passages on ${c.lang.views} pages checked against ${LANG_BANNED.length} terms; none used outside quotations and names`}),
  breakIt:c=>{c.lang={...c.lang,hits:[{view:"history",k:"slaves",ctx:"injected"}]};return c}},
 {id:"C124",n:"Language guidance is sourced, and debated terms are marked as debated (D-079)",run:c=>({ok:c.lw.terms>=20&&c.lw.sections>=8&&!c.lw.bad.length&&c.lw.debated>=4&&c.lw.shown===c.lw.terms,d:c.lw.bad.length?"Problems: "+c.lw.bad.join(", "):`${c.lw.terms} terms (${c.lw.debated} debated), ${c.lw.sections} explanations and ${c.lw.prin} principles, all with read sources; ${c.lw.shown} shown`}),
  breakIt:c=>{c.lw={...c.lw,bad:["tribe: no source"]};return c}},
 {id:"C125",n:"The lint itself catches a planted misuse in the hub's voice and ignores the same word in a quotation (D-080)",run:c=>({ok:c.lwself.caught&&!c.lwself.quoteFlagged,d:`planted use caught: ${c.lwself.caught}; quoted use flagged: ${c.lwself.quoteFlagged}`}),
  breakIt:c=>{c.lwself={caught:false,quoteFlagged:false};return c}});
Object.assign(BUILD_TESTS,{"D-078":"The hub advised against ‘BAME’, ‘slaves’ and similar terms but used some of them in its own words (for example ‘slave-owners’, ‘Disabled BME workers’, ‘the slave trade’ in its own summaries); every page is now checked, and only quotations, titles and names are exempt (C123)",
 "D-079":"Guidance on race, ethnicity, Black and African, and terms to avoid must rest on read sources, and contested terms (people of colour, global majority, mixed race, capitalising White, ethnic minorities or minority ethnic) must be marked as debated (C124)",
 "D-080":"A language check that never finds anything proves nothing; C125 plants a misuse and a quotation in a hidden test node and requires the first to be caught and the second ignored"});
REQS.push({id:"R68",t:"F",r:"Explain race versus ethnicity and which to use; why 'African' and 'Black' are not interchangeable; other terms and framings the hub must cover and avoid",o:"Request 38",sat:["lw-race","lw-black","lw-terms","lw-principles","lw-audit"],ver:["C123","C124","C125"]});
DATASETS.push({k:"language",n:"Words matter: terms and preferred alternatives",ic:"quote",arr:()=>LANG_TERMS,id:x=>x.id,lab:x=>x.term,srcs:x=>x.src||[],view:"language",href:x=>"#"+x.id,out:["pages","jsonld"],chk:["C124"]});
function _lintSelf(){const v=document.createElement("div");v.className="view";v.id="v-lwtest";v.hidden=true;v.innerHTML="<p>Records list the slaves held there.</p><p>A witness said “the slaves were moved at night”.</p>";document.body.appendChild(v);
  try{const h=langLint(v);return{caught:h.some(x=>x.k==="slaves"&&/Records list/.test(x.ctx)),quoteFlagged:h.some(x=>/witness|moved at night/.test(x.ctx))}}finally{v.remove()}}
const _ctx49=ctxV15;ctxV15=function(){const c=_ctx49();
  let hits=[],ran=false,nodes=0;try{hits=langLint();ran=true;nodes=[...document.querySelectorAll(".view")].reduce((a,v)=>a+v.querySelectorAll("p,li,td,h2,h3,h4,dd,span").length,0)}catch(e){console.warn("Language check failed",e)}
  window.__langHits=hits;try{renderLangAudit()}catch(e){}
  c.lang={ran,hits,nodes,views:document.querySelectorAll(".view").length};
  const all=[...LANG_RE,...LANG_AB];const okSrc=a=>a.length&&a.every(s=>SOURCES[s]&&SOURCES[s].rd);
  c.lw={terms:LANG_TERMS.length,sections:all.length,prin:LANG_PRIN.length,debated:LANG_TERMS.filter(t=>t.debated).length,shown:LW_F.k==="all"&&!LW_F.q?$$("#lwTerms .lwterm").length:LANG_TERMS.length,
    bad:[...all.filter(s=>!okSrc(s.src)).map(s=>s.h),...LANG_TERMS.filter(t=>!okSrc(t.src)||!t.use_instead).map(t=>t.term),...LANG_PRIN.filter(p=>!okSrc(p.src)).map(p=>p.h),...LANG_MUST_DEBATE.filter(n=>!LANG_TERMS.some(t=>t.term.includes(n)&&t.debated)).map(n=>n+": not marked as debated")]};
  c.lwself=_lintSelf();return c};
/* The source check found these are contested; they must never be presented as settled (D-079) */
const LANG_MUST_DEBATE=["people of colour","global majority","mixed race","Capitalising","minority ethnic","BAME","slave trade","hard to reach"];
function v32Boot(){renderWords()}
