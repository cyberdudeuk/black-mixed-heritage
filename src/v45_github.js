/* ================= v2.17.0 IDEAS AND WISHES ON GITHUB (D-123) =================
   The hub is a static page, so it never holds a GitHub token. A workflow in the repository reads the open
   idea and wishlist issues and publishes a small ideas.json beside the GitHub Pages site (titles, labels,
   support counts and links only: no issue text, no usernames). The hub reads that file and shows it.
   Support is given on GitHub with a thumbs-up reaction, so one person counts once. */
const PAGES_URL="https://cyberdudeuk.github.io/black-mixed-heritage/";
const GIT_ISSUE_PREFIX=REPO_URL+"/issues/";
const GIT_STATUS={new:"New",accepted:"Accepted",planned:"Planned","in-progress":"In progress",done:"Done",declined:"Declined"};
/* every item from the feed is checked before it is shown: a number, a short title, a link into this repository only */
function gitIdeaSafe(o){if(!o||typeof o!=="object")return null;const n=+o.n;const u=String(o.url||"");const t=String(o.title||"").replace(/\s+/g," ").trim().slice(0,140);
  if(!Number.isInteger(n)||n<1||!t)return null;if(!(u===GIT_ISSUE_PREFIX+n))return null;
  const kind=o.kind==="wish"?"wish":"idea";const st=GIT_STATUS[o.status]?o.status:"new";
  return{n,url:u,title:t,kind,status:st,votes:Math.max(0,Math.min(1e6,+o.votes||0)),comments:Math.max(0,+o.comments||0),created:/^\d{4}-\d{2}-\d{2}/.test(o.created||"")?String(o.created).slice(0,10):"",page:String(o.page||"").slice(0,80)}}
const GITFEED={items:[],src:"",when:"",state:"loading"};
/* only the GitHub Pages edition, served over https, reads the feed (same origin); elsewhere the hub links to the list on GitHub instead of making a cross-site request */
async function loadGitIdeas(){const tries=[];if(window.__HOST==="pages"&&(location.protocol==="https:"||location.hostname==="localhost"))tries.push("ideas.json");
  for(const u of tries){try{const r=await fetch(u,{cache:"no-store"});if(!r.ok)continue;const d=await r.json();const items=(Array.isArray(d.items)?d.items:[]).map(gitIdeaSafe).filter(Boolean);
      GITFEED.items=items;GITFEED.src=u;GITFEED.when=String(d.generated||"").slice(0,16).replace("T"," ");GITFEED.state="ok";renderGitIdeas();return}catch(e){}}
  GITFEED.state="none";renderGitIdeas()}
function renderGitIdeas(){const box=$("#gitIdeas"),st=$("#gitState");if(!box||!st)return;
  if(GITFEED.state==="loading"){st.textContent="Loading the ideas raised on GitHub.";return}
  if(GITFEED.state==="none"){box.innerHTML="";st.innerHTML=`The list of ideas on GitHub could not be loaded here. <a href="${REPO_URL}/issues?q=is%3Aissue+is%3Aopen+label%3Aidea%2Cwishlist+sort%3Areactions-%2B1-desc" target="_blank" rel="noopener">See them on GitHub<span class="vh"> (opens in a new tab)</span></a>.`;return}
  const f=$("#gitKind").value,s=$("#gitSort").value;let list=GITFEED.items.filter(i=>f==="all"||i.kind===f);
  list=list.sort((a,b)=>s==="votes"?(b.votes-a.votes)||(b.n-a.n):(b.n-a.n));
  st.textContent=`${list.length} of ${GITFEED.items.length} open ideas and wishes${GITFEED.when?", updated "+GITFEED.when+" UTC":""}. To support one, open it on GitHub and add a thumbs-up reaction.`;
  box.innerHTML=list.map((i,ix)=>`<article class="card ideacard" data-gix="${ix}"><div class="mhead"><span class="ricon">${icon(i.kind==="wish"?"star":"bulb")}</span><div style="flex:1"><h4 style="margin:0"></h4><p class="mono muted" style="margin:0">#${i.n} · ${i.kind==="wish"?"Feature wish":"Idea"}${i.page?" · <span class=gpg></span>":""}${i.created?" · "+esc(i.created):""}</p></div></div><p style="margin:4px 0"><span class="state ${i.status==="done"?"ok":i.status==="declined"?"bad":""}">${esc(GIT_STATUS[i.status])}</span> <span class="mono">${i.votes} ${i.votes===1?"supporter":"supporters"} · ${i.comments} ${i.comments===1?"comment":"comments"}</span></p><div class="btnrow"><a class="btn small" href="${esc(i.url)}" target="_blank" rel="noopener">${icon("link")} Open and support<span class="vh"> issue ${i.n} on GitHub (opens in a new tab)</span></a></div></article>`).join("");
  const cards=box.querySelectorAll(".ideacard");list.forEach((i,ix)=>{const c=cards[ix];if(!c)return;c.querySelector("h4").textContent=i.title;const pg=c.querySelector(".gpg");if(pg)pg.textContent=i.page}); /* titles and page names set as text, never HTML */
  window.__gitIdeas=GITFEED.items.length}
function gitAudit(){const bad=[];
  [["ok",{n:7,url:GIT_ISSUE_PREFIX+"7",title:"Add a map of plaques",kind:"idea",votes:3}],["bad",{n:7,url:"https://example.com/issues/7",title:"x"}],["bad",{n:7,url:"javascript:alert(1)",title:"x"}],["bad",{n:8,url:GIT_ISSUE_PREFIX+"7",title:"x"}],["bad",{n:7,url:GIT_ISSUE_PREFIX+"7",title:""}]]
   .forEach(([want,o],i)=>{const r=gitIdeaSafe(o);if(want==="ok"&&!r)bad.push("a valid idea is rejected");if(want==="bad"&&r)bad.push("unsafe item "+(i+1)+" is accepted")});
  Object.entries(ISSUE_FORMS).forEach(([k,f])=>{const u=new URL(issueURL(k,"A title","Some text","","History"));if(u.origin+u.pathname!==REPO_URL+"/issues/new")bad.push(k+": not this repository's issue form");if(u.searchParams.get("template")!==f[0])bad.push(k+": wrong form");if(u.searchParams.get(f[1])!=="Some text")bad.push(k+": text not prefilled")});
  return{bad,n:GITFEED.items.length,state:GITFEED.state}}
CHECKS.push({id:"C161",n:"Ideas and wishes link to this repository's issue forms, prefilled, and the GitHub ideas list shows only safe, checked items (D-123)",run:c=>({ok:!c.gitf.bad.length,d:c.gitf.bad.length?"Problems: "+c.gitf.bad.join("; "):`5 issue forms prefilled field by field; unsafe feed items rejected; ${c.gitf.state==="ok"?c.gitf.n+" ideas loaded from GitHub":"feed not reachable here, link to GitHub shown instead"}`}),
  breakIt:c=>{c.gitf={...c.gitf,bad:["unsafe item 2 is accepted"]};return c}});
BUILD_TESTS["D-123"]="The ideas box kept ideas inside Claude or one browser, so the public site had no shared list; ideas and wishes now go to GitHub issue forms, prefilled, and a repository workflow publishes a checked list back to the hub without any token in the page. C161 proves the links and that unsafe feed items are dropped";
REQS.push({id:"R89",t:"F",r:"Link the feature request, wish list and idea box to the public repository using GitHub workflows",o:"Request 67",sat:["su-github","su-ideas"],ver:["C161"]});
const _ctx72=ctxV15;ctxV15=function(){const c=_ctx72();c.gitf=gitAudit();return c};
function v45Boot(){const k=$("#gitKind"),s=$("#gitSort");if(k)k.addEventListener("change",renderGitIdeas);if(s)s.addEventListener("change",renderGitIdeas);(window.requestIdleCallback||setTimeout)(()=>loadGitIdeas(),{timeout:3000})}
/* 2.19.1: a chart or table that is redrawn after start-up (for example a dashboard drawn on demand) must still be reachable by keyboard
   when it scrolls sideways. Redraws are watched and the scroll regions re-marked; a region marked earlier keeps its tab stop (D-124). */
function v45KeepScrollersFocusable(){let t=0;const run=()=>{clearTimeout(t);t=setTimeout(()=>{try{wrapCharts();markScrollers();$$(".tablewrap.canscroll,.chartscroll.canscroll,#roMatrix.canscroll").forEach(w=>{if(w.getAttribute("tabindex")!=="0"&&!w.querySelector("a,button,input,select,textarea,[tabindex='0']"))w.tabIndex=0})}catch(e){}},120)};
  const main=$("#main")||document.body;new MutationObserver(ms=>{if(ms.some(m=>(m.target.closest&&m.target.closest(".dvfig,.tablewrap,.chartscroll,#roJourney,#cultTimeline"))||[...m.addedNodes].some(n=>n.nodeType===1&&(n.matches(".dvfig,table,.tablewrap,.chartscroll,#arcSvg,#scenSvg")||n.querySelector(".dvfig,table,#arcSvg,#scenSvg")))))run()}).observe(main,{childList:true,subtree:true});addEventListener("hashchange",run)}
CHECKS.push({id:"C162",n:"Every chart or table that scrolls sideways on the page in view can be reached by keyboard (D-124)",run:c=>({ok:!c.scr.bad.length,d:c.scr.bad.length?"Not focusable: "+c.scr.bad.slice(0,3).join("; "):`${c.scr.n} scrolling regions in view, all reachable by keyboard`}),
  breakIt:c=>{c.scr={...c.scr,bad:["#dvSuHours .chartscroll"]};return c}});
BUILD_TESTS["D-124"]="The accessibility scan in CI found the volunteer-hours chart on Help run the hub scrolling sideways at phone width without a tab stop, after the chart was redrawn; redraws are now watched and scroll regions re-marked, and C162 checks the page in view";
function scrAudit(){const v=document.querySelector(".view:not([hidden])")||document;const bad=[];let n=0;v.querySelectorAll(".tablewrap,.chartscroll,#roMatrix").forEach(w=>{if(w.scrollWidth>w.clientWidth+4){n++;const ok=w.getAttribute("tabindex")==="0"||w.querySelector("a,button,input,select,textarea,[tabindex='0']");if(!ok)bad.push((w.parentElement&&w.parentElement.id?"#"+w.parentElement.id+" ":"")+"."+w.className.split(" ")[0])}});return{n,bad}}
const _ctx73=ctxV15;ctxV15=function(){const c=_ctx73();c.scr=scrAudit();return c};
const _v45Boot0=v45Boot;v45Boot=function(){_v45Boot0();v45KeepScrollersFocusable()};
/* 2.20.0: sources for the calendar's observances and the New Cross remembrance, which had none; found by the open-data validator in CI (D-125) */
Object.assign(SOURCES,{
 S235:{t:"United Nations: International Day for the Elimination of Racial Discrimination",u:"https://www.un.org/en/observances/end-racism-day",s:"Observed on 21 March; commemorates the Sharpeville Massacre in 1960"},
 S236:{t:"UN News: Celebrating emancipation, 25 March",u:"https://news.un.org/en/node/578742",s:"\u201c25 March is observed as the International Day of Remembrance of the Victims of Slavery and the Transatlantic Slave Trade.\u201d"},
 S237:{t:"GOV.UK: Annual day of celebrations for the Windrush generation",u:"https://www.gov.uk/government/news/annual-day-of-celebrations-for-the-windrush-generation",s:"\u201cA national Windrush Day backed by new government funding will take place on 22 June every year\u201d"},
 S238:{t:"The National Archives: 1833 Abolition of Slavery Act and compensation claims",u:"https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/georgians/1833-abolition-of-slavery-act-and-compensation-claims/",s:"\u201cWhen the Act came into effect on 1 August 1834\u201d"},
 S239:{t:"UNESCO: International Day for the Remembrance of the Slave Trade and its Abolition",u:"https://www.unesco.org/en/days/slave-trade-remembrance",s:"\u201cOn the night of 22 to 23 August 1791, in Saint Domingue, today the Republic of Haiti\u201d"},
 S240:{t:"George Padmore Institute: New Cross Massacre Campaign 1980\u20131985",u:"https://www.georgepadmoreinstitute.org/collections/new-cross-massacre-campaign-1980-1985",s:"\u201cThe fire occurred in the early morning of 18 January 1981\u201d; 13 young Black people died"}});
BUILD_TESTS["D-125"]="The open-data validator added in 2.20.0 found five observance days and the New Cross remembrance in the calendar with no source; each now cites an authoritative page that was read (UN, UN News, GOV.UK, The National Archives, UNESCO, George Padmore Institute). The validator fails CI if a dated event other than the hub's own programme has no https source";
/* 2.20.0: WCAG 2.5.3 Label in Name. A control's accessible name must contain the words it shows, so that people using
   speech recognition can say what they see. axe-core 4.14 flagged the masthead logo and the shortened labels in the
   knowledge graph, the futures quadrants and the network map. Controls drawn in SVG keep their full name and their
   shortened on-screen text is hidden from assistive technology; other controls put their visible words first (D-126). */
/* SVG controls: (1) a label shortened with an ellipsis shows its full words, clipped to the same box, so what is on screen is
   the start of the name; (2) several text lines become one text element with line breaks, so the words read as one run */
let _lnClip=0;
function lnFixSvg(el,lab){const NS="http://www.w3.org/2000/svg";if(!el.querySelector("text"))return;
  const full=lab.replace(/,\s*\d+\s+items?$/i,"").trim();
  [...el.querySelectorAll("text")].forEach(t=>{const v=(t.textContent||"").trim();const m=v.match(/^(.*?)\u2026(\s*\u00b7\s*\d+)?$/);if(!m)return;const pre=m[1].trim(),tail=m[2]||"";
    if(!full.toLowerCase().startsWith(pre.toLowerCase()))return;const svg=t.ownerSVGElement;if(!svg)return;let bb;try{bb=t.getBBox()}catch(e){return}
    const r=el.querySelector("rect");let defs=svg.querySelector("defs");if(!defs){defs=document.createElementNS(NS,"defs");svg.insertBefore(defs,svg.firstChild)}
    const id="lnclip"+(++_lnClip);const cp=document.createElementNS(NS,"clipPath");cp.id=id;const cr=document.createElementNS(NS,"rect");
    const x=r?+r.getAttribute("x"):bb.x,w=r?+r.getAttribute("width"):bb.width+4;cr.setAttribute("x",x);cr.setAttribute("y",bb.y-4);cr.setAttribute("width",Math.max(0,w-6));cr.setAttribute("height",bb.height+8);
    cp.appendChild(cr);defs.appendChild(cp);t.textContent=full+tail;t.setAttribute("clip-path","url(#"+id+")")});
  const tx=[...el.querySelectorAll("text")];if(tx.length>1&&tx.every(t=>!t.querySelector("tspan"))&&tx.every(t=>t.parentNode===tx[0].parentNode)){const first=tx[0];
    tx.slice(1).forEach(t=>{const ts=document.createElementNS(NS,"tspan");["x","y","dx","dy","class","style","text-anchor","fill"].forEach(a=>{if(t.hasAttribute(a))ts.setAttribute(a,t.getAttribute(a))});
      ts.textContent=" "+(t.textContent||"").trim();first.appendChild(ts);t.remove()})}}
function lnText(el){return (el.textContent||"").replace(/\s+/g," ").trim()}
function v45LabelInName(root){(root||document).querySelectorAll("[aria-label]:is(a,button,[role=button],[role=link],[role=tab])").forEach(el=>{
  const vis=lnText(el),lab=(el.getAttribute("aria-label")||"").trim();if(!vis||!lab)return;
  if(lnHas(lab,lnVisible(el)))return;
  if(el.namespaceURI==="http://www.w3.org/2000/svg"){lnFixSvg(el,lab);return}
  el.setAttribute("aria-label",vis+", "+lab.charAt(0).toLowerCase()+lab.slice(1))})}
function lnAudit(){const bad=[];document.querySelectorAll("[aria-label]:is(a,button,[role=button],[role=link],[role=tab])").forEach(el=>{if(el.closest("[hidden]"))return;
  const vis=lnClean(lnVisible(el));if(vis&&!lnHas(el.getAttribute("aria-label")||"",vis))bad.push((el.id?"#"+el.id:el.tagName.toLowerCase())+" \u201c"+vis.slice(0,30)+"\u201d")});return{bad}}
function lnVisible(el){const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let t="",n;while((n=w.nextNode()))t+=n.nodeValue;return t} /* like axe-core: text runs joined as they are */
function lnHas(label,visible){const v=lnClean(visible);return !v||(" "+lnClean(label)+" ").includes(" "+v+" ")} /* whole words, as axe-core compares */
function lnClean(t){return String(t).toLowerCase().replace(/\u2026/g,"").replace(/[^\p{L}\p{N}\s]/gu,"").replace(/\s+/g," ").trim()}
CHECKS.push({id:"C163",n:"Every labelled control's accessible name contains the words it shows (WCAG 2.5.3 Label in Name; D-126)",run:c=>({ok:!c.lbl.bad.length,d:c.lbl.bad.length?"Name does not contain the visible words: "+c.lbl.bad.slice(0,4).join("; "):"Every labelled control on the page in view says what it shows"}),
  breakIt:c=>{c.lbl={bad:["#mastLogo “BHM 2026 Hub”"]};return c}});
BUILD_TESTS["D-126"]="axe-core 4.14 found the masthead logo and the shortened labels in the knowledge graph, futures quadrants and network map breaking WCAG 2.5.3 Label in Name: their accessible names did not contain the words shown. SVG controls now hide their shortened text from assistive technology and keep the full name; other controls put their visible words first. C163 checks every labelled control on the page in view";
const _ctx74=ctxV15;ctxV15=function(){v45LabelInName();const c=_ctx74();c.lbl=lnAudit();return c};
const _v45Boot1=v45Boot;v45Boot=function(){_v45Boot1();v45LabelInName();let t=0;new MutationObserver(()=>{clearTimeout(t);t=setTimeout(()=>v45LabelInName(),150)}).observe($("#main")||document.body,{childList:true,subtree:true});addEventListener("hashchange",()=>setTimeout(()=>v45LabelInName(),200))};
