/* ================= v2.9.0 LENS PAGES: being Black, enterprise, young lives, and the view from other work ================= */
/* $ and $$ in this hub ignore a second argument, so scoped look-ups use these (D-103) */
const _q=(r,s)=>r.querySelector(s),_qa=(r,s)=>[...r.querySelectorAll(s)];
VIEW_ICONS.blackness="globe";VIEW_ICONS.enterprise="chart";VIEW_ICONS.younglives="route";VIEW_ICONS.lenses="layers";VIEW_ICONS.represent="scale";VIEW_ICONS.deeia="hands";VIEW_ICONS.journeys="route";VIEW_ICONS.whatwaslost="candle";VIEW_ICONS.stereotypes="eye";VIEW_ICONS.curriculum="book";
/* Intersections: other parts of a person's identity or situation that combine with being Black. Keyword rules are tested by LP_TAG_TESTS,
   including negative cases, because a keyword rule elsewhere once tagged a scheme by the place name "Black Country" (D-095). */
const LP_TAGS=[
 ["gender","Women and gender",/\b(wom[ae]n|girls?|female|gender|maternal|mothers?|maternity)\b/i],
 ["faith","Faith",/\b(faith|religio\w*|muslim|christian|sharia|islamic|church(es)?|mosques?)\b/i],
 ["age","Children and young people",/\b(child(ren)?|young (people|adults?|black people)|youth|pupils?|teenagers?|1[6-9] (and|to) (1[7-9]|2[0-4]) year|under-?18s?|students?)\b/i],
 ["migration","Migration and the diaspora",/\b(born (in|abroad|outside)|migra\w*|refugees?|asylum|unaccompanied|windrush|diaspora|remittances?|arriv(ed|als?) from)\b/i],
 ["care","Care experience",/\b(care leavers?|looked after|care[- ]experienced|in care|foster(ing| care)?)\b/i],
 ["health","Health and disability",/\b(health|disab\w*|special educational|SEND|mental|medical|maternal mortality|NHS)\b/i],
 ["money","Money, work and class",/\b(wealth|income|pay gap|poverty|household|disadvantage|turnover|finance|loans?|savings|employment|unemploy\w*|jobs?)\b/i],
 ["place","Place and region",/\b(London|Birmingham|Manchester|Nottingham|Lewisham|Bristol|West Midlands|Scotland|Wales|Northern Ireland|regions?|regional)\b/i],
 ["justice","Policing and justice",/\b(police|policing|stop and search|custody|prison|youth justice|strip[- ]search\w*|courts?)\b/i]];
/* "Black Country" is a place, not a community; "take care" is not care experience; "Black-led" is not about children */
function lpTagsOf(t){t=String(t||"").replace(/\bBlack Country\b/g,"the West Midlands").replace(/\b(take|took|taking) care\b/gi,"");return LP_TAGS.filter(([k,,re])=>re.test(t)).map(([k])=>k)}
const LP_TAG_TESTS=[["Black women founders face a double gap","gender",true],["Scheme for firms in the Black Country","place",true],["Scheme for firms in the Black Country","age",false],
 ["We take care to check sources","care",false],["40% of care leavers aged 19 to 21 were NEET","care",true],["Somali founders and Sharia-compliant finance","faith",true],
 ["A Black-led research network","age",false],["Black children in custody","justice",true],["Remittances to Somalia","migration",true],["Pupils suspended per 100","age",true],["Health care for older people","care",false]];
function lpTagTest(){return LP_TAG_TESTS.filter(([t,k,want])=>lpTagsOf(t).includes(k)!==want).map(([t,k,w])=>`“${t}” ${w?"should":"should not"} be tagged ${k}`)}
const LP_TAGNAME=Object.fromEntries(LP_TAGS.map(([k,n])=>[k,n]));
function lpPid(P,s,p){return P.pfx+"-"+s.k+"-"+_ppSlug(p.h)}
function lpCard(P,s,p){const id=lpPid(P,s,p);const tags=lpTagsOf(p.h+" "+p.text+" "+(p.note||""));
  const ed=p.ed?(false?"":`<p class="muted">${icon("info")} Hub note: context written by the hub to help read the sourced points. It adds no figures.</p>`):"";
  const KIND={evidence:"Evidence",argument:"Argument","counter-argument":"Counter-argument"};const kd=p.kind&&KIND[p.kind]?`<p class="lptags"><span class="chip lpkind lpk-${p.kind.replace(/[^a-z]/g,"")}">${KIND[p.kind]}</span>${p.origin?` <span class="chip lpchip">From: ${esc(p.origin)}</span>`:""}${p.evidence?` <span class="chip lpchip">Evidence type: ${esc(p.evidence)}</span>`:""}</p>`:((p.origin||p.evidence)?`<p class="lptags">${p.origin?`<span class="chip lpchip">From: ${esc(p.origin)}</span>`:""}${p.evidence?` <span class="chip lpchip">Evidence type: ${esc(p.evidence)}</span>`:""}</p>`:"");
  const vw=kd+(p.person?`<p class="muted"><b>Who:</b> ${esc(p.person)}</p>`:"")+(p.impact?`<p class="lpview"><b>Documented impact:</b> ${esc(p.impact)}</p>`:"")+(p.view?`<p class="lpview"><b>Vantage point:</b> ${esc(p.view)}</p>`:"")+(p.who?`<p class="muted"><b>Who is affected:</b> ${esc(p.who)}</p>`:"");
  const dx=dxTagsOf(p.h+" "+p.text);const tg=(dx.length?`<p class="lptags muted">DEEIA: ${dx.map(k=>`<span class="chip lpchip">${esc(DX_NAME[k])}</span>`).join(" ")}</p>`:"")+(tags.length?`<p class="lptags muted">Intersections: ${tags.map(t=>`<span class="chip lpchip">${esc(LP_TAGNAME[t])}</span>`).join(" ")}</p>`:"");
  return ppCard(p,id).replace('<article class="card ppcard"',`<article class="card ppcard lpcard" data-tags="${tags.join(" ")}"`).replace(/<\/article>$/,vw+ed+tg+"</article>")}
function lpAllPoints(P){return P.sections.flatMap(s=>s.points.map(p=>({s,p,id:lpPid(P,s,p)})))}
function lpFilter(P,tag){const root=$("#v-"+P.id);let n=0;_qa(root,".lpcard").forEach(a=>{const show=!tag||(" "+a.dataset.tags+" ").includes(" "+tag+" ");a.hidden=!show;if(show)n++});
  _qa(root,".lpfbtn").forEach(b=>b.setAttribute("aria-pressed",String((b.dataset.t||"")===(tag||""))));
  const o=$("#"+P.pfx+"FN");if(o)o.textContent=tag?`Showing ${n} points about ${LP_TAGNAME[tag].toLowerCase()}. Sections with no match look empty.`:`Showing all ${n} points.`}
function lpRender(id){const P=LP[id];const root=$("#v-"+id);if(!P||!root||root.dataset.lpdone)return;root.dataset.lpdone="1";P.id=id;
  const k=$("#"+P.pfx+"Kpi");if(k)k.innerHTML=P.kpis.map(x=>kpi(x.n,x.l,x.ic)).join("");
  P.sections.forEach(s=>{const el=$("#"+P.pfx+"S-"+s.k);if(el)el.innerHTML=s.points.map(p=>lpCard(P,s,p)).join("");const i=$("#"+P.pfx+"I-"+s.k);if(i)i.textContent=s.intro||""});
  const counts={};lpAllPoints(P).forEach(({p})=>lpTagsOf(p.h+" "+p.text+" "+(p.note||"")).forEach(t=>counts[t]=(counts[t]||0)+1));
  const fb=$("#"+P.pfx+"Filt");if(fb){fb.innerHTML=`<button type="button" class="btn lpfbtn" data-t="" aria-pressed="true">All</button>`+LP_TAGS.filter(([t])=>counts[t]).map(([t,n])=>`<button type="button" class="btn lpfbtn" data-t="${t}" aria-pressed="false">${esc(n)} <span class="muted">(${counts[t]})</span></button>`).join("");
    fb.addEventListener("click",e=>{const b=e.target.closest(".lpfbtn");if(b)lpFilter(P,b.dataset.t)})}
  const tl=$("#"+P.pfx+"Time");if(tl&&P.time)tl.innerHTML=P.time.map(t=>`<li><span class="mono pptly">${esc(t.y)}</span> <span>${esc(t.t)}</span> <span class="tags">${t.src.map(evTag).join("")}</span></li>`).join("");
  const sh=$("#"+P.pfx+"Short");if(sh&&P.short&&P.short[0])sh.innerHTML=`<aside class="card lpshort" aria-labelledby="${P.pfx}ShortH"><h2 class="lpshorth" id="${P.pfx}ShortH">${icon("info")} In short</h2><ul>${P.short[0].items.map(it=>`<li>${esc(it.t)} <a class="lpmore" href="#${it.refs[0]}">Read more<span class="vh"> about ${esc(it.t.slice(0,40))}</span></a></li>`).join("")}</ul></aside>`;
  const v=$("#"+P.pfx+"Vant");if(v&&P.vant)v.innerHTML=P.vant.map(c=>`<article class="card lpvant"><h3>${icon(c.ic)} ${esc(c.who)}</h3><ul>${c.items.map(it=>`<li>${esc(it.t)} <span class="muted">See: ${it.refs.map(r=>{const f=lpAllPoints(P).find(x=>x.id===r)||lpFindAny(r);return f?`<a href="#${r}">${esc(f.p.h)}</a>`:`<span class="lpbad">${esc(r)}</span>`}).join(", ")}</span></li>`).join("")}</ul></article>`).join("");
  const pt=$("#"+P.pfx+"Port tbody");if(pt&&P.portal)pt.innerHTML=P.portal.map(r=>`<tr><th scope="row">${esc(r.page)}</th><td>${esc(r.item)}</td><td><span class="chip">${esc(LP_STATUS[r.status]||r.status)}</span></td><td>${esc(r.note)}</td></tr>`).join("");
  if(id==="deeia")try{dxRender()}catch(e){console.error("deeia",e)}
  if(P.ladder)try{rqRender(P)}catch(e){console.error("ladder",e)}
  lpFilter(P,"");enhanceAll()}
function lpFindAny(r){for(const P of Object.values(LP)){const f=lpAllPoints(P).find(x=>x.id===r);if(f)return f}return null}
/* ---------- DEEIA lens (2.9.0): diversity, equity, equality, inclusion, accessibility ---------- */
const DX=[["D","Diversity",/\b(represent\w*|diversity|diverse|share of|population|census|workforce|headcount|demograph\w*)\b/i],
 ["Ey","Equity",/\b(gaps?|disparit\w*|over-?represent\w*|under-?represent\w*|more likely|less likely|times (as|the|higher|more)|turned down|outcomes?|inequalit\w*|equity)\b/i],
 ["Eq","Equality",/\b(equality|equal treatment|equal pay|discriminat\w*|Equality Act|unlawful|protected characteristics?|rights)\b/i],
 ["I","Inclusion",/\b(inclusi\w*|belong\w*|trust|voices?|listen\w*|mentor\w*|networks?|respect\w*|pride|proud|welcom\w*)\b/i],
 ["A","Accessibility",/\b(accessib\w*|disab\w*|languages?|translat\w*|Easy Read|plain (English|language)|SEND|special educational|neurodiver\w*|WCAG)\b/i]];
/* finance and law words that look like DEEIA words but are not (D-100) */
function dxTagsOf(t){t=String(t||"").replace(/\bequity (finance|investment|release|stake|funding|crowdfunding)\b/gi,"capital").replace(/\bright to work\b/gi,"work permission");return DX.filter(([,,re])=>re.test(t)).map(([k])=>k)}
const DX_TESTS=[["The pay gap is 4.5%","Ey",true],["Black people are 4.0% of the population","D",true],["Lenders must not discriminate","Eq",true],["Somali and Tigrinya languages","A",true],["Networks led by Black founders","I",true],
 ["We use a trusted source","I",false],["Raising equity finance from investors","Ey",false],["Employers must check the right to work","Eq",false],["Women's rights groups","Eq",true]];
function dxTest(){return DX_TESTS.filter(([t,k,w])=>dxTagsOf(t).includes(k)!==w).map(([t,k,w])=>`“${t}” ${w?"should":"should not"} be tagged ${k}`)}
const DX_NAME=Object.fromEntries(DX.map(([k,n])=>[k,n]));
function dxCoverage(){const out={};Object.entries(LP).forEach(([id,P])=>{out[id]={n:0};DX.forEach(([k])=>out[id][k]=0);lpAllPoints(P).forEach(({p})=>{out[id].n++;dxTagsOf(p.h+" "+p.text).forEach(k=>out[id][k]++)})});return out}
function dxRender(){const el=$("#dxMatrix tbody");if(!el)return;const cov=dxCoverage();el.innerHTML=Object.entries(cov).map(([id,c])=>`<tr><th scope="row"><a href="#${id}">${esc(LP[id].name)}</a></th>${DX.map(([k])=>`<td>${c[k]} <span class="muted">(${Math.round(100*c[k]/Math.max(1,c.n))}%)</span></td>`).join("")}<td>${c.n}</td></tr>`).join("")}
CHECKS.push({id:"C145",n:"DEEIA tags come from tested rules, and every new page is read through at least three of the five DEEIA dimensions (D-100)",run:c=>({ok:!c.dx.err.length&&!c.dx.thin.length,d:c.dx.err.length||c.dx.thin.length?"Problems: "+[...c.dx.err,...c.dx.thin].slice(0,4).join("; "):`${DX_TESTS.length} rule tests pass (including equity finance and the right to work); ${c.dx.pages} pages each touch three or more dimensions`}),
  breakIt:c=>{c.dx={...c.dx,err:["“Raising equity finance from investors” should not be tagged Ey"]};return c}});
BUILD_TESTS["D-100"]="DEEIA words overlap with finance and law (equity finance, the right to work); tags come from rules tested against those cases, and coverage is shown per page so gaps in a dimension are visible (C145)";
const _ctx59=ctxV15;ctxV15=function(){const c=_ctx59();const cov=dxCoverage();c.dx={err:dxTest(),pages:Object.keys(cov).length,thin:Object.entries(cov).filter(([id,v])=>LP[id].dx!==false&&DX.filter(([k])=>v[k]>0).length<3).map(([id])=>id+": fewer than three dimensions")};return c};
/* ---------- representation ladders (2.9.0) ---------- */
const RQ_BENCH=4.0;
function rqNum(v){const m=String(v||"").replace(/^at least\s*/i,"").match(/^(\d+(?:\.\d+)?)\s*%?/);return m?parseFloat(m[1]):null}
const RQ_ST={confirmed:"Published",computed:"Worked out from official data","not confirmed":"Not confirmed"};
function rqRender(P){const rows=P.ladder;const num=rows.filter(r=>rqNum(r.black)!==null&&r.status!=="not confirmed");
  const max=Math.ceil(Math.max(8,...num.map(r=>rqNum(r.black)))/2)*2;const pct=v=>(100*v/max).toFixed(2)+"%";
  const by={};num.forEach(r=>{(by[r.branch+"|"+r.inst]=by[r.branch+"|"+r.inst]||[]).push(r)});
  const el=$("#rqLadder");if(el){el.innerHTML=`<p class="rqkey muted"><span class="rqbenchkey" aria-hidden="true"></span> Black share of the population, England and Wales: ${RQ_BENCH.toFixed(1)}% (Census 2021). Scale: 0 to ${max}%.</p>`+Object.entries(by).map(([k,rs])=>{const [br,inst]=k.split("|");rs.sort((a,b)=>a.order-b.order);
    return `<div class="rqgrp"><h3 class="lsh">${esc(inst)} <span class="muted">· ${esc(br)}</span></h3>`+rs.map(r=>{const v=rqNum(r.black);return `<div class="rqrow" title="${esc(r.level)}: ${esc(r.black)} Black (${esc(r.year)}; ${esc(RQ_ST[r.status]||r.status)})"><span class="rqlab">${esc(r.level)}</span><span class="rqtrack"><span class="rqbar" style="width:${pct(v)}"></span><span class="rqbench" style="left:${pct(RQ_BENCH)}"></span></span><span class="rqval">${esc(r.black)}</span></div>`}).join("")+`</div>`}).join("")}
  const tb=$("#rqTable tbody");if(tb)tb.innerHTML=rows.map(r=>`<tr><td>${esc(r.branch)}</td><th scope="row">${esc(r.inst)}</th><td>${esc(r.level)}</td><td>${esc(r.black||"–")}</td><td>${esc(r.mixed||"–")}</td><td>${esc(r.em||"–")}</td><td>${esc(r.year||"–")}</td><td>${esc(RQ_ST[r.status]||r.status)}${r.note?`<br><span class="muted">${esc(r.note)}</span>`:""}</td><td><div class="tags">${r.src.map(evTag).join("")}</div></td></tr>`).join("");
  const pt=$("#rqPoom tbody");if(pt)pt.innerHTML=(P.poom||[]).map(r=>`<tr><th scope="row">${esc(r.ring_or_role)}</th><td>${esc(r.interfaces_with)}</td><td>${esc(r.data_it_could_hold)}</td><td>${esc(r.note||"Analysis, not fact.")}</td></tr>`).join("");
  const g=$("#rqGaps");if(g)g.innerHTML=(P.gaps||[]).map(x=>`<li>${esc(x)}</li>`).join("")}
function rqAudit(){const P=LP.represent;if(!P)return{rows:0,bad:["no representation page"],num:0};const ok=a=>a&&a.length&&a.every(s=>SOURCES[s]&&SOURCES[s].rd);const bad=[];let num=0;
  P.ladder.forEach(r=>{const has=[r.black,r.mixed,r.em].some(v=>v&&/\d/.test(v));if(has&&r.status!=="not confirmed"){num++;if(!ok(r.src))bad.push(r.inst+" / "+r.level+": figure without a read source")}
    if(!RQ_ST[r.status])bad.push(r.level+": unknown status");if(r.status==="computed"&&!r.note)bad.push(r.level+": worked-out figure with no method note");
    if(r.status==="not confirmed"&&r.black&&/\d/.test(r.black))bad.push(r.level+": unconfirmed but shows a Black figure")});
  const bars=$$("#rqLadder .rqrow").length;const want=P.ladder.filter(r=>rqNum(r.black)!==null&&r.status!=="not confirmed").length;if(bars&&bars!==want)bad.push(`ladder shows ${bars} bars for ${want} figures`);
  if(!(P.gaps||[]).some(x=>/private office/i.test(x)))bad.push("the private office data gap is not recorded");
  return{rows:P.ladder.length,num,bad,bars}}
CHECKS.push({id:"C144",n:"Every representation figure has a read source, worked-out figures say how, and unpublished data is shown as a gap, not a number (D-099)",run:c=>({ok:c.rq.rows>=40&&!c.rq.bad.length,d:c.rq.bad.length?"Problems: "+c.rq.bad.slice(0,4).join("; "):`${c.rq.num} of ${c.rq.rows} levels carry sourced figures; ${c.rq.bars} bars drawn against the 4.0% benchmark; gaps listed, including private offices`}),
  breakIt:c=>{c.rq={...c.rq,bad:["Cabinet ministers: unconfirmed but shows a Black figure"]};return c}});
BUILD_TESTS["D-099"]="Representation data mixes published, worked-out and missing figures; a missing figure must never be drawn as a number, worked-out shares must say how, and the absence of private office data is itself a finding (C144)";
BUILD_TESTS["D-098"]="Long column names made a table's sort control wider than a phone screen on the lenses page; sort controls now wrap within the screen (phone overflow test in the build suite)";
const _ctx58=ctxV15;ctxV15=function(){const c=_ctx58();c.rq=rqAudit();return c};
const LP_STATUS={confirmed:"Confirmed",changed:"Corrected here","not confirmed":"Not confirmed by the sources cited",gap:"Gap: added here",unchecked:"Not rechecked here"};
/* filtering one page must never hide cards on another (D-103) */
function lpScopeTest(){const ids=Object.keys(LP);if(ids.length<2)return[];const A=LP[ids[0]],t=LP_TAGS.map(x=>x[0]).find(k=>_qa(document.getElementById("v-"+A.id),".lpcard").some(a=>(" "+a.dataset.tags+" ").includes(" "+k+" ")));if(!t)return[];
  lpFilter(A,t);const leak=ids.slice(1).filter(id=>_qa(document.getElementById("v-"+id),".lpcard").some(a=>a.hidden));lpFilter(A,"");return leak.map(id=>id+" cards hidden by a filter on "+A.id)}
CHECKS.push({id:"C148",n:"A filter on one page never hides cards on another page (D-103)",run:c=>({ok:!c.lpscope.length,d:c.lpscope.length?"Leaks: "+c.lpscope.slice(0,3).join("; "):"Filtering one page left every other page's cards untouched"}),
  breakIt:c=>{c.lpscope=["enterprise cards hidden by a filter on blackness"];return c}});
BUILD_TESTS["D-103"]="The hub's $ and $$ helpers ignore a second argument, so a filter meant for one page hid cards on every page, and the tablet menu was built from the wrong elements; scoped look-ups now use their own helpers (C148, C147)";
const _ctx62=ctxV15;ctxV15=function(){const c=_ctx62();c.lpscope=lpScopeTest();return c};
/* ---------- plain-English summaries (2.9.0): every number must come from the points linked (D-101) ---------- */
function lpShortAudit(){const bad=[];let n=0;Object.entries(LP).forEach(([id,P])=>{const it=(P.short&&P.short[0]&&P.short[0].items)||[];if(it.length<3||it.length>6)bad.push(id+": "+it.length+" summary points");
  it.forEach(x=>{n++;const ps=x.refs.map(lpFindAny).filter(Boolean);if(ps.length!==x.refs.length)bad.push(id+": summary links a missing point");const hay=ps.map(f=>f.p.text+" "+(f.p.figure||"")+" "+f.p.h).join(" ");
    (x.t.match(/\d[\d,.]*\d|\d/g)||[]).forEach(num=>{if(!hay.includes(num))bad.push(id+": “"+num+"” is not in the points linked")});
    x.t.split(/(?<=[.!?])\s+/).forEach(sen=>{if(sen.split(/\s+/).length>25)bad.push(id+": a summary sentence is over 25 words")})})});return{n,bad}}
CHECKS.push({id:"C146",n:"Each new page opens with a short plain-English summary whose numbers all come from the sourced points it links to (D-101)",run:c=>({ok:c.lps.n>=24&&!c.lps.bad.length,d:c.lps.bad.length?"Problems: "+c.lps.bad.slice(0,4).join("; "):`${c.lps.n} summary sentences on ${Object.keys(LP).length} pages, each linked to its evidence, every number traced, none over 25 words`}),
  breakIt:c=>{c.lps={...c.lps,bad:["blackness: “2.6” is not in the points linked"]};return c}});
BUILD_TESTS["D-101"]="A plain-English summary can drift from the evidence it summarises; every number in a summary must appear in the points it links to, and sentences stay short for readers who need Easy Read (C146)";
const _ctx60=ctxV15;ctxV15=function(){const c=_ctx60();c.lps=lpShortAudit();return c};
/* ---------- glossary terms for the new pages (2.9.0) ---------- */
(function(){const add=(id,t,c,d)=>{if(!GLOSSARY.some(g=>g.id===id))GLOSSARY.push({id,t,c,d})};
 add("neet","NEET","Young people","Not in education, employment or training. The official measure covers 16 to 24 year olds; councils in England also track 16 and 17 year olds. It describes a status, not a person.");
 add("beet","BEET","Young people","Being in Education, Employment or Training: the default engaged state, not tracked individually once things go well. A term used in public-sector work on young people's journeys.");
 add("cheet","CHEET","Young people","Child Held in Early years, Education or Training: a child held by the state or by someone other than their parents, such as in care, custody or treatment. A term used in public-sector work on young people's journeys.");
 add("departure-event","Departure event","Young people","The point where a child leaves a system, or a system stops seeing them: for example exclusion, deregistration for home education, leaving care at 18 or leaving custody.");
 add("adultification","Adultification","Safeguarding","When children, often Black children, are not given the presumption of innocence and vulnerability that childhood should bring, and are treated as older than they are.");
 add("political-blackness","Political blackness","Identity","The use of 'Black' in 1960s to 1980s Britain as a shared political identity for people of African, Caribbean and South Asian heritage organising against racism. It has since largely fallen out of use.");
 add("negritude","Négritude","Identity","A literary and cultural movement begun in Paris in the 1930s by French-speaking African and Caribbean writers, affirming Black culture against colonial assimilation.");
 add("pan-africanism","Pan-Africanism","Identity","The idea that people of African descent share common interests and should unite. The Fifth Pan-African Congress met in Manchester in 1945.");
 add("hypodescent","Hypodescent ('one-drop rule')","Identity","A custom, later written into some US laws, of classing anyone with any African ancestry as Black.");
 add("pardo","Preto and pardo","Identity","Census categories in Brazil: preto (Black) and pardo (brown, often of mixed heritage). Together they are often called negros.");
 add("pardner","Pardner","Enterprise","A rotating savings scheme: members pay in together and take turns to receive the pot. Caribbean communities in Britain used it when banks shut them out.");
 add("sixth-region","The diaspora as Africa's 'sixth region'","Africa","The African Union's description of the African diaspora, alongside its five regions on the continent.");
 add("deeia","DEEIA","Equality","Diversity, equity, equality, inclusion and accessibility: five related but different ideas. See the DEEIA lens page.");
 add("equity","Equity","Equality","Giving people what they need to have fair chances, because people do not all start from the same place. Different from equality, which is fair and equal treatment.");
 add("positive-action","Positive action","Law","Steps the Equality Act 2010 allows to help under-represented or disadvantaged groups, such as targeted training. Positive discrimination, such as quotas, is generally unlawful.");
 add("wres","WRES","Health","The NHS Workforce Race Equality Standard: indicators that compare the experience of staff from Black and minority ethnic groups with White staff in NHS trusts.");
 add("scs","Senior Civil Service (SCS)","Civil service","The most senior grades of the UK civil service, from deputy director upwards.");
 add("atrs","Algorithmic Transparency Recording Standard","Data and AI","A government standard for publishing records of the algorithmic tools public bodies use. It is mandatory for central government.");
 add("afcfta","African Continental Free Trade Area (AfCFTA)","Africa","A free trade area among African Union member states; trading under it began on 1 January 2021.");
 add("dcts","Developing Countries Trading Scheme","Trade","The UK scheme, since 19 June 2023, giving preferential access for imports from eligible developing countries, many in Africa.")})();
/* ---------- self-checks ---------- */
const LP_FIG=/\d[\d,.]*\s?%|£\s?\d|\$\s?\d|\d[\d,.]*\s?(million|billion)|\d+(\.\d+)? times\b/i;
const LP_PRIV=/[\w.+-]+@[\w-]+\.[\w.]+|\b0\d{3,4}[ -]?\d{3}[ -]?\d{3,4}\b|claude\.ai\/(artifact|code|chat)/i;
function lpAudit(){const bad=[],ed=[],kp=[],vt=[],pr=[],leak=[];let pts=0,edn=0;const ok=a=>a&&a.length&&a.every(s=>SOURCES[s]&&SOURCES[s].rd);
  Object.entries(LP).forEach(([id,P])=>{lpAllPoints(P).forEach(({p,s})=>{pts++;
      if(p.ed){edn++;if(p.src&&p.src.length)ed.push(p.h+": hub note with sources");if(LP_FIG.test(p.text+" "+(p.note||"")))ed.push(p.h+": hub note carries a figure")}
      else if(!ok(p.src))bad.push(id+": "+p.h);
      if(p.disputed&&!p.note)bad.push(p.h+": disputed without a note");
      if(LP_PRIV.test(JSON.stringify(p)))pr.push(p.h);
      if(RESEARCH_LEAK.test(p.text+" "+(p.note||"")))leak.push(p.h)});
    (P.time||[]).forEach(t=>{if(!ok(t.src))bad.push(id+" timeline "+t.y)});
    const ys=(P.time||[]).map(t=>typeof t.ys==="number"?t.ys:parseInt(String(t.y).replace(/^c\.?\s*/,""),10)).filter(n=>!isNaN(n));if(!ys.every((y,i)=>!i||y>=ys[i-1]))bad.push(id+": timeline out of order");
    P.kpis.forEach(k=>{const s=P.sections.find(x=>x.k===k.s);const p=s&&s.points.find(x=>x.h===k.h);if(!p||p.ed||!ok(p.src)||!((p.figure||"")+" "+p.text).includes(k.n))kp.push(id+": "+k.n)});
    (P.vant||[]).forEach(c=>c.items.forEach(it=>{if(!it.refs.length)vt.push(c.who+": no point linked");it.refs.forEach(r=>{if(!lpFindAny(r))vt.push(c.who+": "+r)})}));
    if((P.vant||[]).length<4)vt.push(id+": fewer than four vantage points");
    (P.portal||[]).forEach(r=>{if(!LP_STATUS[r.status]||!r.note)bad.push(id+" portal row: "+r.item);if(LP_PRIV.test(JSON.stringify(r)))pr.push(r.item)})});
  return {pages:Object.keys(LP).length,pts,edn,bad,ed,kp,vt,pr,leak}}
CHECKS.push(
 {id:"C138",n:"Every point on the four new pages is sourced or marked as a hub note, disputes are explained and timelines run in date order (D-093)",run:c=>({ok:c.lp.pages>=3&&c.lp.pts>=100&&!c.lp.bad.length&&!c.lp.leak.length,d:c.lp.bad.length||c.lp.leak.length?"Problems: "+[...c.lp.bad,...c.lp.leak.map(x=>x+": research note")].slice(0,5).join("; "):`${c.lp.pts} points on ${c.lp.pages} pages: ${c.lp.pts-c.lp.edn} with read sources, ${c.lp.edn} hub notes`}),
  breakIt:c=>{c.lp={...c.lp,bad:["blackness: Census 2021: no source"]};return c}},
 {id:"C139",n:"Hub notes carry no figures, so every number on the new pages has a source (D-094)",run:c=>({ok:!c.lp.ed.length,d:c.lp.ed.length?"Problems: "+c.lp.ed.slice(0,4).join("; "):`${c.lp.edn} hub notes, none with a figure or source; every figure sits in a sourced point`}),
  breakIt:c=>{c.lp={...c.lp,ed:["Data gap: hub note carries a figure"]};return c}},
 {id:"C140",n:"Intersection tags come from tested rules that do not mistake place names or phrases for communities (D-095)",run:c=>({ok:!c.lptag.length,d:c.lptag.length?"Rule errors: "+c.lptag.slice(0,3).join("; "):`${LP_TAG_TESTS.length} tests pass, including the Black Country (a place, not a community) and “take care” cases`}),
  breakIt:c=>{c.lptag=["“Scheme for firms in the Black Country” should not be tagged place"];return c}},
 {id:"C141",n:"Each headline number on the new pages appears in its sourced point (D-094)",run:c=>({ok:!c.lp.kp.length,d:c.lp.kp.length?"Not found: "+c.lp.kp.join(", "):`${Object.values(LP).reduce((a,P)=>a+P.kpis.length,0)} headline numbers traced to sourced points`}),
  breakIt:c=>{c.lp={...c.lp,kp:["blackness: 99%"]};return c}},
 {id:"C142",n:"Every “from where you stand” suggestion links to the sourced points behind it (D-096)",run:c=>({ok:!c.lp.vt.length,d:c.lp.vt.length?"Problems: "+c.lp.vt.slice(0,4).join("; "):`${Object.values(LP).reduce((a,P)=>a+(P.vant||[]).reduce((b,v)=>b+v.items.length,0),0)} suggestions, each linked to the points it rests on`}),
  breakIt:c=>{c.lp={...c.lp,vt:["Leaders: lp-missing-point"]};return c}},
 {id:"C143",n:"The new pages hold no email address, phone number or link to a private workspace (D-097)",run:c=>({ok:!c.lp.pr.length,d:c.lp.pr.length?"Found in: "+c.lp.pr.slice(0,4).join(", "):`No contact details or private links in ${c.lp.pts} points and the companion-portal tables`}),
  breakIt:c=>{c.lp={...c.lp,pr:["Start Up Loans: team@example.gov.uk"]};return c}});
Object.assign(BUILD_TESTS,{"D-093":"Four pages were added from seven research strands: what being Black means around the world, Black enterprise, young lives (NEET, BEET and CHEET) and the view through other lenses; each point needs a read source or must be a hub note (C138)",
 "D-094":"Editorial context could smuggle in unsourced numbers; hub notes may hold no figures, and headline numbers must match sourced points (C139, C141)",
 "D-095":"In a related portal, a keyword rule tagged a scheme for Black founders because its page named the Black Country; intersection tags here are tested against that case and others (C140)",
 "D-096":"Suggestions for each audience are the hub's own synthesis; each must link to the sourced points it rests on, so it can be traced and challenged (C142)",
 "D-097":"Related portals carry team inboxes and private workspace links; none may reach this public hub (C143)"});
REQS.push({id:"R80",t:"F",r:"Corroborate the evidence for African civilisations, science and mathematics, and how knowledge reached Europe and beyond before colonisation",o:"Request 55",sat:["jy-early","jy-nile","jy-west","jy-maths","jy-t-andalus","jy-t-numbers","jy-routes","jy-myths"],ver:["C138","C146"]},{id:"R81",t:"F",r:"The counterfactual debate, destruction of evidence, and disease before and after contact, including the so-called Age of Discovery",o:"Request 55",sat:["wl-scale","wl-destruction","wl-d-before","wl-d-americas","wl-limits"],ver:["C138","C142"]},{id:"R76",t:"F",r:"Widen everything to cover the DEEIA lens (diversity, equity, equality, inclusion and accessibility)",o:"Request 52",sat:["dx-terms","dx-dims","dx-law","dx-policy","dx-measure","dx-access","dx-intersect","dx-debate","dx-matrix"],ver:["C138","C145"]},{id:"R75",t:"F",r:"Black, Mixed and African representation across the executive, legislature and judiciary, including private offices, seen through the private office operating model",o:"Request 51",sat:["rq-executive","rq-ladder","rq-privateoffice","rq-poom","rq-legislative","rq-judicial","rq-services","rq-gaps"],ver:["C144"]},{id:"R71",t:"F",r:"Explain what it is to be Black around the globe, and the wider African context of those in the UK",o:"Request 49",sat:["bk-identity","bk-global","bk-ukafrica","bk-lived","bk-vant","bk-limits"],ver:["C138","C141"]},
 {id:"R72",t:"F",r:"Cover starting and running a business, seen from this community's perspective",o:"Request 49",sat:["en-picture","en-barriers","en-support","en-finance","en-diaspora"],ver:["C138","C143"]},
 {id:"R73",t:"F",r:"NEET, BEET and CHEET lived experiences, perspectives and viewpoints",o:"Request 49",sat:["yl-terms","yl-school","yl-care","yl-neet","yl-voices","yl-help"],ver:["C138","C139"]},
 {id:"R74",t:"F",r:"Apply other lenses (responsible AI, data sharing, history, public services) with intersections and vantage points",o:"Request 50",sat:["ln-matrix","ln-vant"],ver:["C140","C142"]});
["blackness","enterprise","younglives","represent","lenses","deeia","journeys","whatwaslost","stereotypes","curriculum","global","honour"].forEach(id=>DATASETS.push({k:id,n:(LP[id]||{}).name||id,ic:VIEW_ICONS[id]||"globe",arr:()=>LP[id]?lpAllPoints(LP[id]).map(x=>({...x.p,id:x.id})):[],id:x=>x.id,lab:x=>x.h,srcs:x=>x.src||[],view:({global:"diaspora",honour:"theme"})[id]||id,href:x=>"#"+x.id,out:["pages","jsonld"],chk:["C138"]}));
const _ctx57=ctxV15;ctxV15=function(){const c=_ctx57();c.lp=lpAudit();c.lptag=lpTagTest();return c};
function v37Boot(){Object.keys(LP).forEach(lpRender)}
/* 2.9.0: long column names made the table sort control wider than a phone screen (D-098) */
document.head.insertAdjacentHTML("beforeend",`<style id="v34css">.tsortl{max-width:100%;flex-wrap:wrap}.tsortl select.ts{max-width:100%;min-width:0;text-overflow:ellipsis}.lpview{border-left:3px solid var(--accent,#7a4bb5);padding-left:.6em}.lpvant ul{margin:.4em 0 0;padding-left:1.1em}.lpvant li{margin:.35em 0}.lpshort{border-left:4px solid var(--accent,#7a4bb5);margin:.8em 0 1em;max-width:62rem}.lpshort ul{margin:.3em 0 0;padding-left:1.1em}.lpshort li{margin:.3em 0;font-size:1.05em}.lpmore{font-size:.85em;white-space:nowrap}.rqgrp{margin:1em 0}.rqrow{display:grid;grid-template-columns:minmax(0,38%) 1fr 5.5em;gap:.6em;align-items:center;padding:.18em 0}.rqlab{font-size:.92em}.rqtrack{position:relative;height:12px;background:var(--line,#e6e1d8);border-radius:0 4px 4px 0}.rqbar{position:absolute;left:0;top:0;bottom:0;background:var(--accent,#7a4bb5);border-radius:0 4px 4px 0;min-width:2px}.rqbench{position:absolute;top:-4px;bottom:-4px;border-left:2px dashed var(--ink,#222)}.rqval{font-variant-numeric:tabular-nums;font-size:.9em}.rqbenchkey{display:inline-block;width:0;height:1em;border-left:2px dashed var(--ink,#222);margin-right:.4em;vertical-align:middle}@media (max-width:600px){.rqrow{grid-template-columns:1fr 4.5em}.rqlab{grid-column:1/-1}}</style>`);
