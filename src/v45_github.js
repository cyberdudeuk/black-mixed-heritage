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
