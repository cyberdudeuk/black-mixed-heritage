/* ================= v2.9.1 GLOBAL NAVIGATION ON TABLETS AND PHONES (D-102) =================
   Before: if the menu bar did not fit in one row, every group collapsed into one "Menu" list, about 3,400px tall,
   inside a sticky header, so on a tablet most of it could not be reached by scrolling.
   Now: on tablets the bar moves to its own full-width row and keeps as many groups as fit, folding only the rest
   into "More"; on phones one "Menu" opens. The menu is grouped into sections that open and close, and it scrolls
   within the screen. */
const NAV_PHONE=600;
document.head.insertAdjacentHTML("beforeend",`<style id="v35css">
.nfold{display:none!important}
.sr,.vh{left:0;top:0}
label:has(>select.tg),label:has(>select.ts){max-width:100%;flex-wrap:wrap}select.tg,select.ts{max-width:100%;min-width:0}
.more-menu [hidden]{display:none!important}
.nbreak{display:none}
@media (max-width:1199px){.mtag{display:none}}
@media (min-width:${NAV_PHONE}px) and (max-width:1199px){.mast-in{flex-wrap:wrap;row-gap:4px}.mast-in>.mastlogo{order:0}.mast-in>.tools{order:1;margin-left:auto}.nbreak{display:block;order:2;flex-basis:100%;height:0}.mast-in>.gnav{order:3;flex:1 1 0}.mast-in>#moreWrap{order:4}}
.more-menu{max-height:calc(100dvh - 90px);overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;width:min(380px,calc(100vw - 16px));display:block}
.gmenu{max-height:calc(100dvh - 90px);overflow-y:auto;overscroll-behavior:contain}
.more-menu .msec{border-top:1px solid var(--line)}
.more-menu .mhead{display:flex;width:100%;align-items:center;justify-content:space-between;gap:8px;background:none;border:0;color:inherit;font:600 .95rem var(--f-display);padding:10px;cursor:pointer;text-align:left;min-height:44px}
.more-menu .mhead[aria-expanded="true"] .mchev{transform:rotate(180deg)}
.more-menu .mchev{transition:transform .15s}
.more-menu .mlist{display:grid;padding:0 0 6px 8px}
.more-menu .mlist a,.more-menu>a{min-height:40px;display:flex;align-items:center}
.more-menu .mcount{font-weight:400;opacity:.7;font-size:.85em}
@media (prefers-reduced-motion:reduce){.more-menu .mchev{transition:none}}
</style>`);
function navMarkup(){const mi=$(".mast-in"),g=$("#gnav");if(!mi||!g)return;
  if(!_q(mi,".nbreak")){const br=document.createElement("div");br.className="nbreak";br.setAttribute("aria-hidden","true");mi.insertBefore(br,g)}
  const lg=$("#mastLogo");if(lg)_qa(lg,"span").forEach(s=>{if(/^Public sector/i.test(s.textContent.trim())&&!s.children.length)s.classList.add("mtag")})}
function buildMoreMenu(){const m=$("#moreMenu"),g=$("#gnav");if(!m||!g)return;const key=_qa(g,":scope > .ngroup").length+":"+_qa(g,"a[data-view]").length;if(!+key.split(":")[0]||(m.dataset.acc===key&&_q(m,".msec")))return;m.dataset.acc=key;
  const ov=g.querySelector(':scope > a[data-view="overview"]');
  let h=ov?ov.outerHTML.replace("<a ",'<a data-sec="ov" '):"";
  m.innerHTML=h;
  _qa(g,":scope > .ngroup").forEach(ng=>{const i=ng.dataset.g,btn=_q(ng,".gbtn"),list=_q(ng,".gmenu");const sec=document.createElement("div");sec.className="msec";sec.dataset.g=i;
    const name=(btn?btn.textContent:"").replace("▾","").trim();const n=list?_qa(list,"a[data-view]").length:0;
    sec.innerHTML=`<button type="button" class="mhead" aria-expanded="false" aria-controls="msl${i}"><span>${btn?btn.querySelector("svg")?.outerHTML||"":""} ${esc(name)} <span class="mcount">(${n})</span></span><span class="mchev" aria-hidden="true">▾</span></button><div class="mlist" id="msl${i}" hidden></div>`;
    if(list)_qa(list,"a").forEach(a=>_q(sec,".mlist").appendChild(a.cloneNode(true)));m.appendChild(sec)});
  if(m.dataset.accl)return;m.dataset.accl="1";
  m.addEventListener("click",e=>{const b=e.target.closest(".mhead");if(!b)return;e.stopPropagation();const open=b.getAttribute("aria-expanded")!=="true";b.setAttribute("aria-expanded",String(open));$("#"+b.getAttribute("aria-controls")).hidden=!open})}
function navSections(mode,folded){const m=$("#moreMenu");if(!m)return;
  const ov=$('[data-sec="ov"]',m);if(ov)ov.hidden=!(mode==="menu"||folded.includes("ov"));
  const secs=_qa(m,".msec");const shown=secs.filter(s=>mode==="menu"||folded.includes(s.dataset.g));
  secs.forEach(s=>{s.hidden=!shown.includes(s)});
  const cur=shown.find(s=>s.querySelector(`a[data-view="${current}"]`));
  shown.forEach(s=>{const open=shown.length<=2||s===cur;const b=_q(s,".mhead");b.setAttribute("aria-expanded",String(open));_q(s,".mlist").hidden=!open})}
fitNav=function(){const g=$("#gnav"),wrap=$("#moreWrap"),btn=$("#moreBtn");if(!g||!wrap||!btn)return;navMarkup();buildMoreMenu();
  const kids=[...g.children];kids.forEach(k=>k.classList.remove("nfold"));g.style.display="";wrap.hidden=true;btn.textContent="Menu ▾";
  const over=()=>g.scrollWidth>g.clientWidth+1;let mode="bar",folded=[];
  if(innerWidth<NAV_PHONE){mode="menu"}
  else if(over()){wrap.hidden=false;btn.textContent="More ▾";for(let i=kids.length-1;i>=1&&over();i--){kids[i].classList.add("nfold");folded.push(kids[i].dataset.g!=null?kids[i].dataset.g:"ov")}if(over())mode="menu"}
  if(mode==="menu"){kids.forEach(k=>k.classList.remove("nfold"));g.style.display="none";wrap.hidden=false;btn.textContent="Menu ▾"}
  navSections(mode,folded);window.__navMode={mode,folded:folded.length,visible:mode==="menu"?0:kids.filter(k=>!k.classList.contains("nfold")).length};markNav()};
/* keep the open menu inside the screen, whatever the header height */
function navClamp(){const m=$("#moreMenu");if(!m||m.hidden)return;m.style.position=m.style.left=m.style.right=m.style.top=m.style.width="";let rc=m.getBoundingClientRect();
  if(rc.left<8||rc.right>innerWidth-8){const b=$("#moreBtn").getBoundingClientRect();Object.assign(m.style,{position:"fixed",left:"8px",right:"8px",width:"auto",top:Math.round(b.bottom+6)+"px"});rc=m.getBoundingClientRect()}
  const t=rc.top;m.style.maxHeight=Math.max(200,innerHeight-t-12)+"px";
  $$(".gmenu:not([hidden])").forEach(x=>{x.style.maxHeight=Math.max(200,innerHeight-x.getBoundingClientRect().top-12)+"px"})}
/* visually hidden text kept its in-flow position, so the calendar's hidden 'today' label sat past the screen edge on days late in the week (D-106) */
function srAudit(){const bad=[];$$(".sr,.vh").forEach(e=>{const cs=getComputedStyle(e);let L=cs.left;try{if(e.computedStyleMap)L=String(e.computedStyleMap().get("left"))}catch(x){}if(cs.position==="absolute"&&L==="auto")bad.push((e.id||e.className)+": "+e.textContent.trim().slice(0,30))});return bad}
CHECKS.push({id:"C151",n:"Visually hidden text is anchored so it can never push the page wider than the screen, whatever the date (D-106)",run:c=>({ok:!c.sra.length,d:c.sra.length?"Unanchored: "+c.sra.slice(0,3).join("; "):`${$$(".sr,.vh").length} visually hidden elements, all anchored`}),
  breakIt:c=>{c.sra=["sr: today"];return c}});
BUILD_TESTS["D-106"]="On a Saturday, the calendar's visually hidden 'today' label kept its in-flow position outside the calendar's scroll area and widened the page on phones; it passed on the earlier test date (a Thursday). Hidden text is now anchored (C151), and table group-by controls wrap on phones";
const _ctx65=ctxV15;ctxV15=function(){const c=_ctx65();c.sra=srAudit();return c};
function navAudit(){const m=$("#moreMenu");if(!m)return{bad:["no menu"]};const bad=[];const cs=getComputedStyle(m);
  if(!/auto|scroll/.test(cs.overflowY))bad.push("the menu cannot scroll");if(cs.maxHeight==="none")bad.push("the menu has no height limit");
  const inBar=new Set($$("#gnav a[data-view]").map(a=>a.dataset.view)),inMenu=$$("#moreMenu a[data-view]").map(a=>a.dataset.view);
  [...inBar].forEach(v=>{const c=inMenu.filter(x=>x===v).length;if(c!==1)bad.push(v+" appears "+c+" times in the menu")});
  if(!$$("#moreMenu .mhead[aria-controls]").length)bad.push("menu sections cannot be opened and closed");
  if(!$(".nbreak"))bad.push("no tablet row break");return{bad,views:inBar.size,secs:$$("#moreMenu .msec").length}}
CHECKS.push({id:"C147",n:"On tablets and phones the menu bar keeps what fits and the menu scrolls within the screen, with every page reachable once (D-102)",run:c=>({ok:!c.navm.bad.length,d:c.navm.bad.length?"Problems: "+c.navm.bad.slice(0,4).join("; "):`${c.navm.views} pages reachable once each from ${c.navm.secs} menu sections that open and close; the menu scrolls within the screen; tablets get a full-width bar row`}),
  breakIt:c=>{c.navm={...c.navm,bad:["the menu cannot scroll"]};return c}});
BUILD_TESTS["D-102"]="On a tablet the whole menu bar collapsed into one 'Menu' list about 3,400px tall inside the sticky header, so most of it could not be scrolled to; tablets now keep a full-width bar row with only overflow folded into 'More', and the menu is sectioned and scrolls within the screen (C147, plus tablet and phone tests in the build suite)";
REQS.push({id:"R77",t:"NF",r:"On a tablet the global navigation must work as a navigation bar and the menu must scroll",o:"Request 54",sat:["gnav","moreMenu"],ver:["C147"]});
const _ctx61=ctxV15;ctxV15=function(){const c=_ctx61();c.navm=navAudit();return c};
function v38Boot(){fitNav();const b=$("#moreBtn");if(b)b.addEventListener("click",()=>requestAnimationFrame(navClamp));
  document.addEventListener("click",e=>{if(e.target.closest(".gbtn"))requestAnimationFrame(navClamp)});addEventListener("resize",()=>{clearTimeout(v38Boot._t);v38Boot._t=setTimeout(()=>{fitNav();navClamp()},150)})}
