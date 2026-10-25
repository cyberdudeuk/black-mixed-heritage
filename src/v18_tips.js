
/* ================= v1.9 TOOLTIPS EVERYWHERE (WCAG 1.4.13: hoverable, dismissible with Escape, persistent) ================= */
const TIP_TEXT={
 "vb-strength":"Strength: a positive finding, asset or improvement.","vb-gap":"Gap or disparity: a difference that disadvantages the group.","vb-context":"Context: background that helps read the other figures.","vb-debate":"Debate: the evidence or its meaning is disputed; both sides are shown.",
 "lv-prevent":"Prevent: stop the inequality arising.","lv-detect":"Detect: find and measure it.","lv-fix":"Fix: change what causes it.","lv-remediate":"Remediate: put right harm already done.","lv-avoid":"Avoid: steer clear of practices that create it.","lv-eradicate":"Eradicate: remove it for good."};
const _desc=el=>{const p=el&&el.querySelector(".sechead p:not(.eyebrow)");return p?p.textContent.trim().replace(/\s+/g," "):""};
const _trim=(s,n)=>s.length>n?s.slice(0,n-1).replace(/\s+\S*$/,"")+"…":s;
function annotateTips(root){root=root||document;
  /* navigation: page purpose */
  root.querySelectorAll('a[href^="#"]').forEach(a=>{if(a.dataset.tip!==undefined)return;const h=a.getAttribute("href").slice(1);const v=document.getElementById("v-"+h);if(v&&a.closest("header,nav,.mast,.menu,.sitemap,footer,.smli")){const d=_desc(v.querySelector(".block"));if(d)a.dataset.tip=_trim(d,160)}});
  /* in-page contents: section purpose */
  root.querySelectorAll(".drawer a[href^='#'], #drawer a[href^='#']").forEach(a=>{if(a.dataset.tip!==undefined)return;const s=document.getElementById(a.getAttribute("href").slice(1));if(s){const d=_desc(s);a.dataset.tip=d?_trim(d,160):"Go to this section"}});
  /* evidence tags: what the source is and how it was checked */
  root.querySelectorAll("a.tag.src, a.tag.loc").forEach(a=>{if(a.dataset.tip!==undefined)return;const m=a.textContent.match(/\bS\d{1,5}\b/);const s=m&&SOURCES[m[0]];if(!s)return;a.dataset.tip=`${m[0]}: ${s.t}${s.s?" — "+s.s:""}. ${s.loc?"Located, not read in full"+(s.why?": "+s.why:""):"Read in full"+(s.rd?" on "+s.rd:"")}. Opens in a new tab.`;a.removeAttribute("title")});
  /* badges, levers, chips, sort buttons, view toggles, KPIs */
  root.querySelectorAll(".vbadge,.lvt").forEach(b=>{if(b.dataset.tip!==undefined)return;const k=[...b.classList].find(c=>TIP_TEXT[c]);if(k)b.dataset.tip=TIP_TEXT[k]});
  root.querySelectorAll(".chip").forEach(c=>{if(c.dataset.tip===undefined)c.dataset.tip="Show only: "+c.textContent.replace(/\s+\d+\s*$/,"").trim()});
  root.querySelectorAll("button.thsort").forEach(b=>{if(b.dataset.tip===undefined)b.dataset.tip="Sort by this column. Choose again to reverse the order."});
  root.querySelectorAll(".vtb").forEach(b=>{if(b.dataset.tip===undefined)b.dataset.tip=b.dataset.m==="list"?"Show these items as a compact list":"Show these items as cards"});
  root.querySelectorAll(".tcsv").forEach(b=>{if(b.dataset.tip===undefined)b.dataset.tip="Download the rows you can see as a spreadsheet file (CSV)"});
  root.querySelectorAll(".kpi").forEach(k=>{if(k.dataset.tip!==undefined)return;k.dataset.tip="Counted live from this page when it loaded"});
  root.querySelectorAll(".state").forEach(s=>{if(s.dataset.tip===undefined)s.dataset.tip=s.classList.contains("ok")?"Passing, open or current, as stated":s.classList.contains("bad")?"Ended, failing or needs action":"Status as stated by the source"});
  /* icon-only controls: show their name */
  root.querySelectorAll("button,a").forEach(b=>{if(b.dataset.tip!==undefined)return;const t=(b.textContent||"").trim();const al=b.getAttribute("aria-label")||b.getAttribute("title");if(al&&t.length<3){b.dataset.tip=al;if(!b.getAttribute("aria-label"))b.setAttribute("aria-label",al);b.removeAttribute("title")}});
  /* remaining title attributes on HTML elements become accessible tooltips */
  root.querySelectorAll("[title]:not(svg *):not(svg):not(iframe):not(abbr)").forEach(e=>{if(e.dataset.tip!==undefined)return;const t=e.getAttribute("title");if(!t)return;const txt=(e.textContent||"").trim();if(!txt&&!e.getAttribute("aria-label"))e.setAttribute("aria-label",t);else if(txt.length<4&&!e.matches("a,button,input,select,textarea,[tabindex]")&&!e.querySelector(".vh"))e.insertAdjacentHTML("beforeend",`<span class="vh"> (${esc(t)})</span>`);e.dataset.tip=t;e.removeAttribute("title")})}
/* glossary terms in page introductions become explained terms */
function autoTerms(){const terms=GLOSSARY.filter(g=>g.t&&g.t.length>3).map(g=>({g,re:new RegExp("\\b("+g.t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+")\\b","i")}));let n=0;
  $$(".view").forEach(v=>{const used=new Set($$(".term",v).map(e=>e.dataset.term));v.querySelectorAll(".sechead p:not(.eyebrow), p.lede, .card > p").forEach(p=>{const w=document.createTreeWalker(p,NodeFilter.SHOW_TEXT,{acceptNode:t=>t.parentElement.closest("a,button,.term,code")?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});const nodes=[];while(w.nextNode())nodes.push(w.currentNode);
    nodes.forEach(t=>{for(const {g,re} of terms){if(used.has(g.id))continue;const m=t.nodeValue.match(re);if(!m)continue;const r=document.createRange();r.setStart(t,m.index);r.setEnd(t,m.index+m[0].length);const s=document.createElement("span");s.className="term";s.dataset.term=g.id;s.tabIndex=0;r.surroundContents(s);used.add(g.id);n++;
      s.addEventListener("mouseenter",()=>showTip(s));s.addEventListener("mouseleave",hideTip);s.addEventListener("focus",()=>showTip(s));s.addEventListener("blur",hideTip);break}})})});return n}
let tip2=null,tip2For=null,tip2Hide=0;
function showTip2(el){clearTimeout(tip2Hide);if(tip2For===el)return;hideTip2(true);const t=el.dataset.tip;if(!t)return;tip2=document.createElement("div");tip2.className="tip tip2";tip2.id="tip2";tip2.setAttribute("role","tooltip");tip2.textContent=t;document.body.appendChild(tip2);
  tip2.addEventListener("mouseenter",()=>clearTimeout(tip2Hide));tip2.addEventListener("mouseleave",()=>hideTip2());
  const r=el.getBoundingClientRect();const w=Math.min(320,innerWidth-32);tip2.style.maxWidth=w+"px";const tw=Math.min(w,tip2.offsetWidth);let x=Math.min(Math.max(16,r.left+scrollX),scrollX+innerWidth-tw-16);let y=r.bottom+scrollY+8;if(r.bottom+tip2.offsetHeight+16>innerHeight)y=r.top+scrollY-tip2.offsetHeight-8;tip2.style.left=x+"px";tip2.style.top=y+"px";
  const prevD=el.getAttribute("aria-describedby");el.dataset.prevDesc=prevD||"";el.setAttribute("aria-describedby",prevD?prevD+" tip2":"tip2");tip2For=el} /* D-072: keep any existing description */
function hideTip2(now){const go=()=>{if(tip2){tip2.remove();tip2=null}if(tip2For){const pd=tip2For.dataset.prevDesc;if(pd)tip2For.setAttribute("aria-describedby",pd);else tip2For.removeAttribute("aria-describedby");delete tip2For.dataset.prevDesc;tip2For=null}};clearTimeout(tip2Hide);if(now===true)go();else tip2Hide=setTimeout(go,180)}
function setupTips(){autoTerms();annotateTips();
  document.addEventListener("mouseover",e=>{const el=e.target.closest&&e.target.closest("[data-tip]");if(el)showTip2(el)});
  document.addEventListener("mouseout",e=>{const el=e.target.closest&&e.target.closest("[data-tip]");if(el&&!(e.relatedTarget&&(el.contains(e.relatedTarget)||(tip2&&tip2.contains(e.relatedTarget)))))hideTip2()});
  document.addEventListener("focusin",e=>{const el=e.target.closest&&e.target.closest("[data-tip]");if(el)showTip2(el);else hideTip2(true)});
  document.addEventListener("focusout",e=>{if(e.target.closest&&e.target.closest("[data-tip]"))hideTip2(true)});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&(tip2||tipEl)){hideTip2(true);if(typeof hideTip==="function")hideTip()}});
  addEventListener("scroll",()=>{if(tip2For&&document.activeElement===tip2For)return;hideTip2(true)},{passive:true}); /* WCAG 1.4.13: a tooltip opened by keyboard focus stays while focused */
  let t=0,first=0;new MutationObserver(()=>{const now=Date.now();if(!first)first=now;clearTimeout(t);const run=()=>{first=0;annotateTips()};if(now-first>1000)run();else t=setTimeout(run,300)}).observe($("main")||document.body,{childList:true,subtree:true})} /* D-053: debounce could be starved by continuous changes; now runs at least once a second */
function tipCoverage(){annotateTips();const nav=$$('header a[href^="#"], .mast a[href^="#"], nav a[href^="#"]').filter(a=>document.getElementById("v-"+a.getAttribute("href").slice(1)));
  const drawer=$$(".drawer a[href^='#'], #drawer a[href^='#']");const src=$$("a.tag.src, a.tag.loc");const iconBtns=$$("button,a").filter(b=>(b.textContent||"").trim().length<3&&(b.getAttribute("aria-label")||b.dataset.tip)&&b.offsetParent!==null||((b.textContent||"").trim().length<3&&b.dataset.tip));
  const badges=$$(".vbadge,.lvt");const all=[...nav,...drawer,...src,...iconBtns,...badges];const tipped=all.filter(e=>e.dataset.tip);return{n:all.length,tipped:tipped.length,nav:nav.length,src:src.length,terms:$$(".term").length,missing:all.filter(e=>!e.dataset.tip).slice(0,5).map(e=>e.outerHTML.slice(0,60))}}
