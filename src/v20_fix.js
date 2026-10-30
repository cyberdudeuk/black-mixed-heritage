
/* ================= v2.0.1 FIXES from the forensic code review and the visual inspection ================= */
/* --- keep keyboard focus, open guides and AI suggestions when a section re-renders --- */
function _focusSig(el){if(!el||el===document.body)return null;const ds={...el.dataset};["tip","label","ord","prevDesc","cu","sc","vt","hide"].forEach(k=>delete ds[k]);
  return {tag:el.tagName,id:el.id||"",ds:JSON.stringify(ds),al:el.getAttribute("aria-label")||"",tx:(el.textContent||"").trim().replace(/\s*\d+\s*$/,"").slice(0,40)}}
function _findSig(sig,root){if(!sig)return null;if(sig.id){const e=document.getElementById(sig.id);if(e)return e}
  const c=[...(root||document).querySelectorAll(sig.tag.toLowerCase())];
  return c.find(e=>{const s=_focusSig(e);return s.ds===sig.ds&&s.al===sig.al&&s.tx===sig.tx})||c.find(e=>{const s=_focusSig(e);return sig.ds!=="{}"&&s.ds===sig.ds})||null}
function keepUI(name,opts){const f=window[name];if(typeof f!=="function"||f.__kept)return;
  const g=function(...a){const act=document.activeElement;const sig=_focusSig(act);const view=act&&act.closest?act.closest(".view"):null;
    const open=$$("details[open]").map(d=>{const host=d.closest("[id]");return (host?host.id:"")+"|"+((d.querySelector("summary")||{}).textContent||"").trim()});
    const ai={};$$("[data-aiq]").forEach(b=>{const bx=b.parentElement&&b.parentElement.querySelector(".aiq");if(bx&&bx.innerHTML.trim())ai[b.dataset.aiq]=bx.innerHTML});
    const r=f.apply(this,a);
    $$("details:not([open])").forEach(d=>{const host=d.closest("[id]");if(open.includes((host?host.id:"")+"|"+((d.querySelector("summary")||{}).textContent||"").trim()))d.open=true});
    Object.entries(ai).forEach(([k,h])=>{const b=document.querySelector(`[data-aiq="${CSS.escape(k)}"]`);const bx=b&&b.parentElement.querySelector(".aiq");if(bx&&!bx.innerHTML.trim())bx.innerHTML=h});
    if(sig&&!document.contains(act)){const n=_findSig(sig,view||document);if(n&&!n.disabled)n.focus();else if(opts&&opts.fallback){const fb=document.querySelector(opts.fallback);if(fb){if(!fb.matches("a,button,input,select,textarea,[tabindex]"))fb.tabIndex=-1;fb.focus()}}}
    return r};g.__kept=true;window[name]=g}
["renderClub","renderCulture","renderLives","renderInter","renderEquity","renderEdu","renderComm","renderTalent","renderNetworks2","renderLeadFund","renderResearch","renderBench","renderRoutines","renderIdeaBox","renderIdeas","drawMatch","renderDash"].forEach(n=>keepUI(n));
keepUI("showQ",{fallback:"#qzBox h3, #qzBox legend, #qzBox button"});
/* --- one vote at a time --- */
(()=>{const f=window.castVote;if(typeof f!=="function")return;let busy=false;window.castVote=async function(...a){if(busy)return;busy=true;try{return await f.apply(this,a)}finally{busy=false}}})();
/* --- benchmark cross-references: readable labels, not raw IDs --- */
function fixBenchRefs(){let n=0;(typeof BENCH!=="undefined"?BENCH:[]).forEach(b=>(b.places||[]).forEach(p=>{const m=/^See ([a-z0-9-]+)$/.exec(p.note||"");if(!m)return;const t=BENCH.find(x=>x.id==="bm-"+m[1]);if(t){p.note="See also: "+t.t;p.ref="bm-"+m[1];n++}}));return n}
/* --- wide tables and charts: say when there is more to the side --- */
function markScrollers(root){(root||document).querySelectorAll(".tablewrap,.chartscroll,#roMatrix").forEach(w=>{const more=w.scrollWidth>w.clientWidth+4;w.classList.toggle("canscroll",more);
  if(more&&!w.dataset.sc){w.dataset.sc="1";if(!w.hasAttribute("tabindex"))w.tabIndex=0;if(!w.getAttribute("aria-label")){const c=w.querySelector("caption,figcaption");w.setAttribute("role","region");w.setAttribute("aria-label",(c?c.textContent.trim().slice(0,80):"Wide content")+" (scrolls sideways)")}
    const hint=document.createElement("p");hint.className="schint mono";hint.setAttribute("aria-hidden","true");hint.textContent="← Scroll sideways to see more →";w.after(hint);
    w.addEventListener("scroll",()=>w.classList.toggle("atend",w.scrollLeft+w.clientWidth>=w.scrollWidth-4),{passive:true})}
  const h=w.nextElementSibling;if(h&&h.classList.contains("schint"))h.hidden=!more})}
/* wide SVG charts scroll on phones instead of shrinking their text */
function wrapCharts(){$$(".dvfig > svg, #roJourney > svg, #arcSvg, #scenSvg, #cultTimeline > svg").forEach(s=>{if(s.parentElement.classList.contains("chartscroll"))return;const w=document.createElement("div");w.className="chartscroll";s.before(w);w.appendChild(s)})}
/* long chip rows scroll sideways on phones */
function markChipRows(){$$(".view").forEach(v=>v.querySelectorAll(".chip").forEach(c=>{const p=c.parentElement;if(p&&!p.classList.contains("chiprow")&&p.querySelectorAll(":scope > .chip").length>=6)p.classList.add("chiprow")}))}
/* --- the Contents button gets out of the way while you read on a phone --- */
function setupDtabHide(){const b=$("#drawerToggle");if(!b||b.dataset.hide)return;b.dataset.hide="1";let last=scrollY,t=0;
  addEventListener("scroll",()=>{if(t)return;t=requestAnimationFrame(()=>{t=0;const y=scrollY,down=y>last+6,up=y<last-6;const nearEnd=innerHeight+y>=document.documentElement.scrollHeight-40;
    if(down&&y>120&&!nearEnd&&!b.matches(":focus"))b.classList.add("tucked");else if(up||nearEnd||y<120)b.classList.remove("tucked");last=y})},{passive:true});
  b.addEventListener("focus",()=>b.classList.remove("tucked"));
  /* D-054: on wide screens keep the toggle just above the drawer, so when the drawer is pushed up at the end of a page the toggle moves with it and never covers drawer links */
  const d=$("#drawer");const pin=()=>{if(innerWidth<=860||!d){b.style.top="";if(d)d.style.paddingTop="";return}const mb=(typeof iaMastBottom==="function"?iaMastBottom():66)+8;if($("#shell")?.classList.contains("closed")){b.style.top=mb+"px";return}const extra=Math.max(0,mb-82);d.style.paddingTop=extra?`calc(var(--s4) + ${40+extra}px)`:"";const top=d.getBoundingClientRect().top;b.style.top=Math.max(mb,Math.min(74,Math.round(top-44)))+"px"};
  addEventListener("scroll",()=>requestAnimationFrame(pin),{passive:true});addEventListener("resize",pin);addEventListener("hashchange",()=>setTimeout(pin,50));pin();window.__dtabPin=pin}
/* --- checks for these fixes, each with a negative proof --- */
CHECKS.push(
 {id:"C90",n:"Club meetings fall on the chosen day, in local time, and never skip a month (D-032)",run:c=>{const bad=c.clubDates.filter(([inp,out])=>out.join(",")!==inp.want.join(","));return{ok:!bad.length&&c.clubDates.length>=3,d:bad.length?"Wrong dates: "+bad.map(([i,o])=>i.start+" gave "+o.join(", ")).join("; "):`${c.clubDates.length} schedules tested, including 31 January and a summer-time start`}},
  breakIt:c=>{c.clubDates=[[{start:"2026-10-22",want:["2026-10-22"]},["2026-10-21"]],...c.clubDates.slice(1)];return c}},
 {id:"C91",n:"Table sorting treats a column as numbers only when every cell is a number (D-033)",run:c=>{const ok=c.sortProbe.mixed==="text"&&c.sortProbe.num==="num"&&c.sortProbe.s75===null;return{ok,d:`mixed column sorted as ${c.sortProbe.mixed}; numeric column as ${c.sortProbe.num}; "Section 75 duty" read as ${c.sortProbe.s75===null?"text":"the number "+c.sortProbe.s75}`}},
  breakIt:c=>{c.sortProbe={...c.sortProbe,s75:75};return c}},
 {id:"C92",n:"No quiz clue gives away its answer (D-034)",run:c=>{const bad=c.quizLeaks;return{ok:!bad.length,d:bad.length?"Clue contains the answer: "+bad.slice(0,5).join(", "):"Every book and film clue checked against its title"}},
  breakIt:c=>{c.quizLeaks=["q-fm-belle"];return c}},
 {id:"C93",n:"Shared ideas are normalised and each person's support counts once (D-035)",run:c=>{const p=c.ideaProbe;return{ok:p.badDropped&&p.dedup===1&&p.keyed,d:`malformed item dropped: ${p.badDropped}; repeated support counted ${p.dedup} time(s); votes keyed by person and idea: ${p.keyed}`}},
  breakIt:c=>{c.ideaProbe={...c.ideaProbe,dedup:3};return c}},
 {id:"C94",n:"Benchmark notes read as words, not internal IDs (D-036)",run:c=>({ok:c.benchN>0&&!c.benchRaw.length&&c.benchFixed>0,d:c.benchRaw.length?"Raw references: "+c.benchRaw.join(", "):`${c.benchFixed} cross-references across ${c.benchN} benchmark rows resolved to titles`}),
  breakIt:c=>{c.benchRaw=["See cur-england"];return c}},
 {id:"C95",n:"Inequality counts follow the filters, and a re-render keeps keyboard focus (D-037)",run:c=>({ok:c.eqCountOk&&c.focusKept,d:`count matches cards: ${c.eqCountOk}; focus kept after re-render: ${c.focusKept}`}),
  breakIt:c=>{c.focusKept=false;return c}},
 {id:"C99",n:"Stated counts of posters match the posters on the page (D-039)",run:c=>({ok:!c.posterClaims.length,d:c.posterClaims.length?"Wrong count stated: "+c.posterClaims.join(", "):`All stated poster counts match the ${POSTERS.length} posters`}),
  breakIt:c=>{c.posterClaims=["Seven posters"];return c}},
 {id:"C96",n:"Privacy notice covers every place the hub stores what people enter (D-038)",run:c=>({ok:c.privacy.every(x=>x[1]),d:c.privacy.map(([k,v])=>`${k}: ${v?"covered":"missing"}`).join("; ")}),
  breakIt:c=>{c.privacy=[["Expressions of interest",false]];return c}});
BUILD_TESTS["D-032"]="Club meeting dates were a day early in British Summer Time (UTC conversion) and monthly repeats from the 29th to 31st skipped a month; display and calendar download now share one local-date function, checked by C90";
BUILD_TESTS["D-033"]="Table sorting read text such as 'Section 75 duty' as the number 75 and mixed number and text comparisons in one column; a column is now numeric only if every cell is a number (C91)";
BUILD_TESTS["D-034"]="Some 'Which book?' and 'Which film?' clues contained the title; titles are now removed from clues (C92)";
BUILD_TESTS["D-035"]="Shared ideas were trusted as stored, votes could be counted more than once and two ideas with the same ID shared votes; items are normalised and votes keyed by person and idea (C93)";
BUILD_TESTS["D-036"]="Benchmark notes showed internal IDs such as 'See cur-england'; they now show the linked comparison's title. The first fix looked for the data in the wrong place and its check passed on nothing; the check now also counts the rows examined and references resolved (C94)";
BUILD_TESTS["D-037"]="Filter chips, votes, games and quiz buttons lost keyboard focus when their section re-rendered, the club closed open guides, and inequality counts ignored filters; fixed (C95)";
BUILD_TESTS["D-038"]="The privacy notice described club votes only; it now covers expressions of interest and the ideas box, which also have database rules so only the owner reads expressions of interest (C96)";
BUILD_TESTS["D-039"]="The posters page said seven posters while ten were shown; poster counts are now written from the data and checked by C99";
REQS.push({id:"R60",t:"NF",r:"Fixes from the forensic code review and the phone and desktop visual inspection",o:"Request 30",sat:["ab-notices"],ver:["C90","C91","C92","C93","C94","C95","C96","C99"]});
const _ctx31=ctxV15;ctxV15=function(){const c=_ctx31();
  /* club dates */
  const cases=[{start:"2026-10-22",n:3,want:["2026-10-22","2026-11-22","2026-12-22"]},{start:"2027-01-31",n:3,want:["2027-01-31","2027-02-28","2027-03-31"]},{start:"2026-06-15",n:2,want:["2026-06-15","2026-07-15"]}];
  const keep=[$("#clubStart")?.value,$("#clubN")?.value];c.clubDates=[];
  if($("#clubStart")&&$("#clubN")){cases.forEach(k=>{$("#clubStart").value=k.start;$("#clubN").value=k.n;c.clubDates.push([k,clubEvents().map(e=>e.s)])});$("#clubStart").value=keep[0]||"";$("#clubN").value=keep[1]||""}
  /* sort probe */
  const mk=a=>{const t=document.createElement("table");t.innerHTML="<tbody>"+a.map(v=>`<tr><td>${v}</td></tr>`).join("")+"</tbody>";return [...t.rows]};
  c.sortProbe={mixed:_colNumeric(mk(["S5","12","Alpha"]),0)?"num":"text",num:_colNumeric(mk(["1.5","£2,000","30%"]),0)?"num":"text",s75:_cellVal(mk(["Section 75 duty"])[0].cells[0]).n};
  /* quiz leaks */
  c.quizLeaks=[];try{const items=clubItems();quizBank(2).concat(quizBank(1)).filter(q=>/Which (book|film)/.test(q.kind)).forEach(q=>{const it=items.find(i=>"q-"+i.id===q.id);if(!it)return;const words=String(it.t).replace(/[:'’"!?.,]/g," ").split(/\s+/).filter(w=>w.length>3&&!/^(the|and|from|with|this|that|their|they)$/i.test(w));if(words.some(w=>new RegExp("\\b"+w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","i").test(q.q)))c.quizLeaks.push(q.id)})}catch(e){c.quizLeaks=["quiz bank error: "+e.message]}
  /* ideas */
  const bad=normIdea({id:5,t:{}}),good=normIdea({id:"a",t:"Title",when:"2026-10-21",k:"bogus"});const v={};[...new Set(["x:a","x:a","x:a"])].forEach(id=>v[id]=(v[id]||0)+1);
  c.ideaProbe={badDropped:bad===null&&!!good&&good.k==="idea",dedup:v["x:a"],keyed:ideaKey({by:"u1",id:"a"})!==ideaKey({by:"u2",id:"a"})};
  /* bench */
  c.benchN=(typeof BENCH!=="undefined"?BENCH:[]).reduce((n,b)=>n+(b.places||[]).length,0);c.benchFixed=(typeof BENCH!=="undefined"?BENCH:[]).reduce((n,b)=>n+(b.places||[]).filter(p=>p.ref).length,0);c.benchRaw=[];(typeof BENCH!=="undefined"?BENCH:[]).forEach(b=>(b.places||[]).forEach(p=>{if(/^See [a-z0-9-]+$/.test(p.note||""))c.benchRaw.push(p.note)}));
  /* equity count and focus */
  c.eqCountOk=!!window.__eqShown&&(window.__eqShown.nI===window.__eqShown.cardsI||!$("#eqList"));
  let kept=false;const sx=scrollX,sy=scrollY,prevFocus=document.activeElement;try{const b=$("#eqChips .chip");if(b){const view=$("#v-equity");const wasHidden=view.hidden;view.hidden=false;b.focus({preventScroll:true});b.click();const a=document.activeElement;kept=!!(a&&a.classList.contains("chip")&&a.closest("#eqChips"));view.hidden=wasHidden}}catch(e){}
  /* D-055: the probe must leave no trace: restore scroll and focus */
  try{if(prevFocus&&prevFocus.focus&&prevFocus!==document.body)prevFocus.focus({preventScroll:true});else if(document.activeElement&&document.activeElement.blur)document.activeElement.blur()}catch(e){}window.scrollTo({left:sx,top:sy,behavior:"instant"});
  c.focusKept=kept;
  c.posterClaims=posterCountClaims();
  /* privacy */
  const txt=($("#ab-notices")||{}).textContent||"";c.privacy=[["Club votes",/club votes/i.test(txt)],["Expressions of interest",/Expressions of interest/i.test(txt)],["Ideas box",/Ideas box/i.test(txt)]];
  return c};
const NUMW=["no","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen"];
function fixCounts(){const w=NUMW[POSTERS.length]||String(POSTERS.length);const v=$("#v-posters");if(!v)return;const tw=document.createTreeWalker(v,NodeFilter.SHOW_TEXT);const ns=[];while(tw.nextNode())ns.push(tw.currentNode);
  ns.forEach(t=>{const r=t.nodeValue.replace(/\b(Seven|Eight|Nine|Ten|Six|Five|seven|eight|nine|ten|six|five) posters\b/g,m=>{const W=/^[A-Z]/.test(m)?w[0].toUpperCase()+w.slice(1):w;return W+" posters"});if(r!==t.nodeValue)t.nodeValue=r})}
function posterCountClaims(){const out=[];$$("#v-posters h2, #v-posters p").forEach(e=>{const m=/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve) posters\b/i.exec(e.textContent);if(m&&NUMW.indexOf(m[1].toLowerCase())!==POSTERS.length)out.push(m[0])});return out}
function altQR(){$$("#qr img, #qr canvas, #barcode img").forEach(i=>{if(i.tagName==="IMG"&&!i.hasAttribute("alt"))i.alt="";i.setAttribute("aria-hidden","true")})}
function v23Boot(){fixCounts();altQR();setTimeout(altQR,1500);const bb=$(".brand b");if(bb&&!bb.querySelector(".bhub"))bb.innerHTML=esc(bb.textContent).replace(/ Hub$/,'<span class="bhub"> Hub</span>');fixBenchRefs();try{renderBench()}catch(e){}wrapCharts();markChipRows();(window.requestIdleCallback||(f=>setTimeout(f,300)))(()=>markScrollers(),{timeout:2000});setupDtabHide();
  let t=0;const again=()=>{clearTimeout(t);t=setTimeout(()=>{wrapCharts();markChipRows();markScrollers()},300)};addEventListener("resize",again);addEventListener("hashchange",again);document.addEventListener("click",again,true)}
