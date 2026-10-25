
/* ================= v2.3.0 USER GUIDE, GUIDED TOURS, TUTORIALS AND COLOUR ACCENTS ================= */
VIEW_ICONS.guide="compass2";
/* ---- colour accents: each menu has its own accent, used for eyebrows, section rules, card edges and the active menu ---- */
const ACCENT_V23={"This month":"month","Lead":"lead","Learn":"learn","Understand":"under","Resources":"res","About":"about"};
function applyAccents(){NAV_GROUPS.forEach(g=>g.items.forEach(id=>{const v=$("#v-"+id);if(v)v.dataset.accent=ACCENT_V23[g.g]||"about"}));const o=$("#v-overview");if(o)o.dataset.accent="month";
  $$("#gnav .ngroup").forEach((n,i)=>{const g=NAV_GROUPS[i];if(g)n.dataset.accent=ACCENT_V23[g.g]||"about"})}
/* ---- guided tours ---- */
const TOURS=[
 {id:"first",n:"First visit: find your way",ic:"compass2",steps:[
  ["overview","#hero","Start here","The front page changes through the month: highlights, today's spotlight, a proverb and what is coming up."],
  ["overview","#gnav","Six menus","Everything is in six menus: This month, Lead, Learn, Understand, Resources and About. Each has its own colour."],
  ["overview","#searchBtn","Search","Search everything on the hub. Press the forward slash key (/) from anywhere to open it."],
  ["calendar","#drawerToggle","Contents of this page","The Contents switch opens the list of sections on the page you are on, with counts and what is new."],
  ["calendar","#v-calendar .related","Related pages","At the end of every page, related pages take you to what usually comes next."],
  ["guide","#gd-tours","Come back any time","Tours and step-by-step guides live on this page, in the About menu."]]},
 {id:"event",n:"Plan an event",ic:"calendar",steps:[
  ["calendar","#v-calendar .block","Pick a date","The calendar lists Black History Month events and year-round dates. Add any event to Outlook or Google Calendar."],
  ["toolkit","#v-toolkit .block","Choose an activity","The organiser toolkit has a checklist and activity ideas filtered by setting, effort and format."],
  ["posters","#v-posters .block","Make the poster","Edit the fields once and every poster updates. Download or copy the design."],
  ["involve","#v-involve .block","Bring people in","Roles, ways to speak up and how to recognise colleagues' contributions."]]},
 {id:"lead",n:"For leaders",ic:"flag",steps:[
  ["leaders","#v-leaders .block","What leaders can do","Commitments, messages and actions for senior leaders, with sources."],
  ["equity","#v-equity .glance","The evidence first","Each long page opens with a short summary computed from its own data."],
  ["bench","#v-bench .block","How the UK compares","National and international comparisons, each with what can and cannot be compared."],
  ["talent","#v-talent .block","Routes into leadership","Recruitment, development and leadership schemes, with their status checked on the date shown."]]},
 {id:"teach",n:"For schools and educators",ic:"school",steps:[
  ["learn","#v-learn .block","Learning by age","Curriculum links, resources, quizzes and family games for every stage."],
  ["resources","#v-resources .block","Resource library","Books, films, archives and organisations to learn from."],
  ["partners","#pa-archives","Archives","Original records and oral histories across the four nations."]]},
 {id:"trust",n:"Can I trust this?",ic:"shield",steps:[
  ["assurance","#v-assurance .block","Every fact has a source","Each source is listed with the date it was read and what it supports."],
  ["review","#rv-quality","Honest about limits","Quality scores before and after, with what still needs work."],
  ["knowledge","#v-knowledge .block","How it fits together","Glossary, knowledge graph and A to Z show how everything on the hub connects."]]}];
let TOUR=null;
function tourStep(){const t=TOUR;if(!t)return;const [view,sel,h,p]=t.tour.steps[t.i];if(location.hash!=="#"+view){location.hash=view}
  setTimeout(()=>{const el=document.querySelector(sel)||$("#v-"+view+" .block")||$("#v-"+view);$$(".tourhl").forEach(e=>e.classList.remove("tourhl"));if(el){el.classList.add("tourhl");el.scrollIntoView({block:"center",behavior:motionAllowed()?"smooth":"auto"})}
    let box=$("#tourBox");if(!box){document.body.insertAdjacentHTML("beforeend",`<div id="tourBox" class="tourbox" role="dialog" aria-modal="false" aria-labelledby="tourH"><p class="eyebrow" id="tourN"></p><h2 id="tourH" tabindex="-1"></h2><p id="tourP"></p><div class="btnrow"><button type="button" class="btn small" id="tourBack">${icon("left")} Back</button><button type="button" class="btn small" id="tourNext">Next ${icon("right")}</button><button type="button" class="btn small" id="tourEnd">End tour</button></div></div>`);box=$("#tourBox");
      $("#tourBack").addEventListener("click",()=>{if(TOUR&&TOUR.i>0){TOUR.i--;tourStep()}});$("#tourNext").addEventListener("click",()=>{if(!TOUR)return;if(TOUR.i<TOUR.tour.steps.length-1){TOUR.i++;tourStep()}else endTour()});$("#tourEnd").addEventListener("click",endTour);
      box.addEventListener("keydown",e=>{if(e.key==="Escape")endTour()})}
    box.hidden=false;$("#tourN").textContent=`${t.tour.n} · step ${t.i+1} of ${t.tour.steps.length}`;$("#tourH").textContent=h;$("#tourP").textContent=p;$("#tourBack").disabled=t.i===0;$("#tourNext").lastChild&&($("#tourNext").firstChild.textContent=t.i===t.tour.steps.length-1?"Finish ":"Next ");$("#tourH").focus({preventScroll:true})},350)}
function startTour(id){const tour=TOURS.find(x=>x.id===id);if(!tour)return;TOUR={tour,i:0,from:document.activeElement};tourStep()}
function endTour(){$$(".tourhl").forEach(e=>e.classList.remove("tourhl"));const b=$("#tourBox");if(b)b.hidden=true;const from=TOUR&&TOUR.from;TOUR=null;if(from&&document.contains(from))from.focus({preventScroll:true})}
/* ---- tutorials: short, step-by-step how-tos ---- */
const TUTORIALS=[
 ["Add an event to your calendar","calendar",["Open This month, then Calendar.","Choose an event in the month view or the agenda.","Choose Google Calendar or Outlook, or download the .ics file for Apple Calendar and other apps."]],
 ["Make and share a poster","posters",["Open This month, then Posters.","Type your event's title, date and place once: every poster updates.","Choose a colour palette, then download or copy the design.","Check the poster text is readable and add alternative text when you share it."]],
 ["Run a book or film club meeting","club",["Open This month, then Book and film club.","Filter by type, genre or audience and read the content notes.","Open the discussion guide and, if you wish, ask for AI-suggested questions (check them before use).","Plan the meetings and download the calendar file."]],
 ["Find evidence for a briefing","equity",["Open Lead, then Inequalities and action.","Read 'At a glance', then open the domain you need.","Each figure shows its period, place, caveats and source; open the source before quoting it.","Use Benchmarks to see how the UK compares, and what cannot be compared."]],
 ["Suggest an idea or report a mistake","sustain",["Open About, then Help run the hub.","Use the ideas box: choose a type, give a short title and details. Do not include personal information.","For a bug, correction or accessibility barrier you can also raise it on GitHub, where maintainers track the fix."]],
 ["Use the hub with a keyboard or screen reader","guide",["Press Tab to move through links and buttons; the first link skips to the content.","Press / to search; Escape closes search, menus and tooltips.","Every chart has a 'Show the data as a table' option.","Change theme, text size and motion from the buttons at the top right."]]];
const GUIDE_FIND=[
 ["Menus","The six menus group pages by what you want to do: This month (events and organising), Lead (evidence and leadership), Learn (history and culture), Understand (myths, identity, debates, questions), Resources (education, partners, library, brand) and About (how the hub works and is checked).","layers"],
 ["Contents switch","Opens the list of sections on the page you are on, with item counts and flags for what is new or changed since your last visit.","layers"],
 ["Search","Finds sections, headings and every listed item. Press / from anywhere.","search"],
 ["A to Z and knowledge graph","On the Knowledge layer page: every term and item, and an interactive map of how they connect.","graph"],
 ["Related pages, previous and next","At the end of every page, follow related pages or step through the menus in order.","link"],
 ["Sources","Every fact links to its source; the Sources section at the end of each page lists what was read and when.","book"]];
function renderGuide(){const v=$("#v-guide");if(!v||$("#gd-start .card"))return;
  $("#gdMenus").innerHTML=NAV_GROUPS.map(g=>`<div class="card" data-accent="${ACCENT_V23[g.g]||"about"}"><h3>${icon(GROUP_ICONS[g.g]||"layers")} ${esc(g.g)}</h3><ul>${g.items.map(id=>`<li><a href="#${id}">${esc((VIEWS.find(x=>x[0]===id)||[,id])[1])}</a></li>`).join("")}</ul></div>`).join("");
  $("#gdFind").innerHTML=GUIDE_FIND.map(([h,p,ic])=>`<div class="card"><h3>${icon(ic)} ${esc(h)}</h3><p>${esc(p)}</p></div>`).join("");
  $("#gdTours").innerHTML=TOURS.map(t=>`<div class="card"><h3>${icon(t.ic)} ${esc(t.n)}</h3><p class="muted">${t.steps.length} steps</p><button type="button" class="btn" data-tour="${t.id}">${icon("right")} Start the tour</button></div>`).join("");
  $$("#gdTours [data-tour]").forEach(b=>b.addEventListener("click",()=>startTour(b.dataset.tour)));
  $("#gdTuts").innerHTML=TUTORIALS.map(([h,view,steps])=>`<details class="card tut"><summary><b>${esc(h)}</b></summary><ol>${steps.map(s=>`<li>${esc(s)}</li>`).join("")}</ol><p><a href="#${view}">Go to ${esc((VIEWS.find(x=>x[0]===view)||[,view])[1])}</a></p></details>`).join("");
  window.__guide={tours:TOURS.length,tuts:TUTORIALS.length}}
/* checks */
CHECKS.push(
 {id:"C114",n:"Every guided tour step points at a page and an element that exist (D-061)",run:c=>({ok:c.tours.steps>0&&!c.tours.bad.length,d:c.tours.bad.length?"Broken steps: "+c.tours.bad.join(", "):`${c.tours.n} tours, ${c.tours.steps} steps, all resolve`}),
  breakIt:c=>{c.tours={...c.tours,bad:["first#3"]};return c}},
 {id:"C115",n:"The user guide covers every menu and every tutorial links to a real page (D-062)",run:c=>({ok:c.guide.menus===NAV_GROUPS.length&&!c.guide.badLinks.length&&c.guide.tuts>=5,d:`${c.guide.menus} of ${NAV_GROUPS.length} menus described; ${c.guide.tuts} tutorials; ${c.guide.badLinks.length} broken links`}),
  breakIt:c=>{c.guide={...c.guide,menus:0};return c}},
 {id:"C116",n:"Every page has a menu colour accent, and accents meet contrast (D-063)",run:c=>({ok:c.accent.missing.length===0&&c.accent.lowContrast.length===0,d:(c.accent.missing.length?"Missing: "+c.accent.missing.join(", ")+"; ":"Every page has an accent; ")+(c.accent.lowContrast.length?"Low contrast: "+c.accent.lowContrast.join(", "):"all accent text at least 4.5:1")}),
  breakIt:c=>{c.accent={...c.accent,missing:["v-theme"]};return c}});
Object.assign(BUILD_TESTS,{"D-061":"Guided tours were added; each step must point at a page and an element that exist, so a renamed section cannot silently break a tour (C114)","D-062":"A user guide was added; it must describe every menu and its tutorials must link to real pages (C115)","D-063":"Colour accents were added per menu; every page must carry one and accent text must meet WCAG AA contrast (C116)"});
REQS.push({id:"R64",t:"F",r:"Portal user guide, guided tours and tutorials; more colour and accents",o:"Request 33",sat:["gd-start","gd-tours","gd-tuts"],ver:["C114","C115","C116"]});
function _lum(rgb){const m=rgb.match(/\d+(\.\d+)?/g);if(!m)return 1;const [r,g,b]=m.slice(0,3).map(x=>{const c=+x/255;return c<=0.03928?c/12.92:((c+0.055)/1.055)**2.4});return 0.2126*r+0.7152*g+0.0722*b}
function _contrast(a,b){const x=_lum(a),y=_lum(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05)}
const _ctx44=ctxV15;ctxV15=function(){const c=_ctx44();
  const bad=[];let steps=0;TOURS.forEach(t=>t.steps.forEach(([view,sel],i)=>{steps++;if(!$("#v-"+view)||!document.querySelector(sel))bad.push(t.id+"#"+(i+1))}));c.tours={n:TOURS.length,steps,bad};
  c.guide={menus:$$("#gdMenus .card").length,tuts:$$("#gdTuts .tut").length,badLinks:$$("#v-guide a[href^='#']").map(a=>a.getAttribute("href").slice(1)).filter(h=>!$("#v-"+h)&&!document.getElementById(h))};
  const missing=VIEWS.map(([id])=>id).filter(id=>{const v=$("#v-"+id);return v&&!v.dataset.accent});const low=[];const bg=getComputedStyle(document.body).backgroundColor;
  /* 2.10.0: all probes are added, read and removed together, so the page restyles once rather than once per accent (D-107) */const _pr=Object.values(ACCENT_V23).map(k=>{const t=document.createElement("span");t.className="acprobe";t.dataset.accent=k;t.style.cssText="position:absolute;opacity:0;pointer-events:none";document.body.appendChild(t);return [k,t]});_pr.map(([k,t])=>[k,getComputedStyle(t).color]).forEach(([k,col])=>{if(_contrast(col,bg)<4.5)low.push(k+" "+_contrast(col,bg).toFixed(2))});_pr.forEach(([,t])=>t.remove());
  c.accent={missing,lowContrast:low};return c};
function v29Boot(){applyAccents();renderGuide()}
