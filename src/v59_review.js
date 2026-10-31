/* ================= v2.28.0 BLACK HISTORY MONTH 2026 IN REVIEW, FEEDBACK AND THE YEAR AHEAD (R107 to R110, D-161 to D-163) =================
   A post-mortem of the month and of the hub, built on three kinds of evidence, each labelled for what it is:
   1. what organisations published about BHM 2026 (YR.items: web pages read on 31 October 2026, each re-read word for word
      by an independent reviewer; older items are labelled background);
   2. what people tell the hub (the feedback form below, saved in Claude, sent through GitHub, or copied to send through
      your own channels), and what networks send back as summaries (FB_SUMMARIES, from src/feedback-summaries.json);
   3. what the hub itself can measure (its releases, pages, sources and checks, and the use figures GitHub shows).
   Nothing here is a survey result until people answer: where the evidence is thin, the page says so. */
const NEW28=[["yearreview","Year in review and feedback"]].filter(([id])=>document.getElementById("v-"+id)&&!VIEWS.some(v=>v[0]===id));VIEWS.push(...NEW28);
(function(){if(!NEW28.length)return;const g=NAV_ORDER_V21.find(x=>x.g==="This month");if(g&&!g.items.includes("yearreview"))g.items.splice(Math.max(0,g.items.indexOf("calendar")+1),0,"yearreview");applyNavV21()})();
VIEW_ICONS.yearreview="quote";LABEL_V21.yearreview="Year in review and feedback";
NEW28.forEach(([id])=>{PK_CONTENT.push(id);RP_NEW.push(id)});
RELATED_V21.push(["yearreview","theme"],["theme","yearreview"],["yearreview","sustain"],["sustain","yearreview"],["yearreview","leaders"],["yearreview","calendar"]);
(function(){const c=CLUSTERS.find(x=>x.id==="organise");if(c&&NEW28.length&&!c.pages.some(p=>p[0]==="yearreview"))c.pages.splice(2,0,["yearreview","how the month went, what people told us, and what the hub should do until next October"])})();
/* Sources: each web item is registered once, with the date it was read */
if(typeof ISSUE_FORMS!=="undefined")ISSUE_FORMS.feedback=["feedback.yml","answers","[Feedback] "];
const YR_SRC={};(function(){if(typeof YR==="undefined")return;[...(YR.items||[]),...(YR.methods||[]),...(YR.yearround||[])].forEach(it=>{const id=SRCQ(it.title+" ("+it.publisher+")",it.url,"Supports Year in review and feedback",it.quote);SOURCES[id].rd="31 October 2026";YR_SRC[it.id]=id})})();
const yrTag=id=>YR_SRC[id]?evTag(YR_SRC[id]):"";
const YR_KIND={government:"Government",nhs:"NHS",local:"Local government",police_fire:"Police and fire",education:"Education",culture:"Culture and heritage",union:"Trade union",charity:"Charity and community",business:"Business",news:"News and opinion",survey:"Survey or report"};
const YR_CAT={activity:"What happened",reach:"Reach",feedback_positive:"Feedback: what worked",feedback_critical:"Feedback: criticism",ask_year_round:"Ask: all year",evaluation:"Evaluation and outcomes",theme:"The theme"};
/* The feedback questions: one source for the form here, the GitHub form, the CSV and the survey text for Teams, Viva Engage and Slack */
const FB_Q=[
 {id:"took_part",sec:"Your month",q:"How did you take part in Black History Month 2026?",hint:"Select all that apply.",type:"multi",opts:["I went to one or more events","I organised or helped run an event","I led or sponsored activity as a senior leader","I took part through a staff network","I learned on my own (reading, watching, the hub)","I shared resources with colleagues","I did not take part","Something else"]},
 {id:"value",sec:"Your month",q:"Overall, how valuable was Black History Month 2026 for you?",type:"one",opts:["Very valuable","Quite valuable","Neither valuable nor not valuable","Not very valuable","Not at all valuable","I do not know"]},
 {id:"worked",sec:"Your month",q:"What worked well?",hint:"Do not include names or anything that could identify someone.",type:"text",optional:true},
 {id:"missing",sec:"Your month",q:"What did not work, or was missing?",hint:"Do not include names or anything that could identify someone.",type:"text",optional:true},
 {id:"changed",sec:"What changed",q:"Did anything change because of Black History Month 2026?",hint:"Select all that apply.",type:"multi",opts:["I learned something new","I changed something about how I work","My team agreed a commitment","My organisation published or committed to an action","I connected with a network, mentor or sponsor","Nothing has changed yet","I do not know"]},
 {id:"leaders",sec:"What changed",q:"Did you see senior leaders take part visibly?",type:"one",opts:["Yes, more than once","Yes, once","No","I do not know"]},
 {id:"hub_used",sec:"The hub",q:"Did you use the BHM 2026 Hub?",type:"one",opts:["Yes, several times","Yes, once","No, but I had heard of it","No, I had not heard of it"]},
 {id:"hub_useful",sec:"The hub",q:"If you used the hub, how useful was it?",type:"one",optional:true,opts:["Very useful","Quite useful","Not very useful","Not at all useful","I did not use it"]},
 {id:"hub_parts",sec:"The hub",q:"Which parts of the hub did you use?",hint:"Select all that apply.",type:"multi",optional:true,opts:["Calendar and events","Organiser toolkit and posters","History, heritage and Africa","Joining government and careers","Leaders, targets and allyship","Data and evidence","Young people and education","Something else"]},
 {id:"hub_better",sec:"The hub",q:"How could the hub be better?",type:"text",optional:true},
 {id:"yearround",sec:"The year ahead",q:"What should the hub do between now and next October?",hint:"Select up to 3.",type:"multi",max:3,opts:["Dates and events all year","Careers, sponsorship and development","Progress on targets and data","History and learning content","Help for staff network chairs","Support for young people and education","Tools for leaders and allies","Sharing stories and good practice","Something else"]},
 {id:"often",sec:"The year ahead",q:"How often would you use a year-round hub?",type:"one",opts:["Every week","Every month","A few times a year","Only in October","Not at all"]},
 {id:"org",sec:"About you",q:"Which best describes where you work?",hint:"This helps us see whether the month worked across the public sector.",type:"one",optional:true,opts:["UK government department or agency","Devolved government (Scotland, Wales or Northern Ireland)","NHS or health body","Local government","Police, fire, justice or prisons","Education (school, college or university)","Arm's-length body or regulator","Voluntary, community or faith organisation","Private sector","Something else","Prefer not to say"]},
 {id:"place",sec:"About you",q:"Where are you based?",type:"one",optional:true,opts:["London","England outside London","Scotland","Wales","Northern Ireland","Outside the UK","Prefer not to say"]},
 {id:"perspective",sec:"About you",q:"Which best describes the perspective you are answering from?",hint:"Optional. We ask only to see whether the month worked for the people it is for. We report it only for groups of 10 or more people and never alongside your other answers.",type:"multi",optional:true,opts:["I am Black, African, Caribbean or of Mixed heritage","I am a colleague or ally","I lead or sponsor activity","I design policy, services, content or data","I am a staff network member or chair","Prefer not to say"]},
 {id:"else",sec:"Anything else",q:"Is there anything else you would like to tell us?",type:"text",optional:true},
 {id:"quote",sec:"Anything else",q:"May we quote your words, without your name, in what we publish?",type:"one",opts:["Yes","No"]}];
const FB_PRIVACY="Answering takes about 5 minutes and every question can be skipped. Do not include your name, contact details, or anything that could identify you or anyone else. Answers are used only to review Black History Month 2026 and to decide what the hub does until next October. Summaries are published in groups of 10 or more; individual answers are never published, and are deleted 12 months after the review.";
const FBK={step:-1,ans:{},db:null,uid:null,mine:null,owner:false};
function fbLoad(){try{const s=localStorage.getItem("bhm-fb-draft");if(s)FBK.ans=JSON.parse(s)||{}}catch(e){}}
function fbSave(){try{localStorage.setItem("bhm-fb-draft",JSON.stringify(FBK.ans))}catch(e){}}
function fbText(){return FB_Q.map(q=>{const a=FBK.ans[q.id];const v=Array.isArray(a)?a.join("; "):(a||"");return `${q.q}\n${v||"(no answer)"}`}).join("\n\n")}
function fbCSV(){const q=v=>{let x=String(v==null?"":Array.isArray(v)?v.join("; "):v);if(/^[=+\-@\t\r]/.test(x))x="'"+x;return `"${x.replace(/"/g,'""')}"`};return "﻿"+[["question_id","question","answer"].map(q).join(","),...FB_Q.map(x=>[x.id,x.q,FBK.ans[x.id]||""].map(q).join(","))].join("\r\n")}
function fbPII(){const t=Object.values(FBK.ans).flat().join(" ");return /[\w.+-]+@[\w-]+\.[\w.]+|\b0\d{3,4}[\s-]?\d{3}[\s-]?\d{3,4}\b/.test(t)}
function fbRender(){const el=document.getElementById("fbForm");if(!el)return;const n=FB_Q.length;
  if(FBK.step<0){el.innerHTML=`<p>${esc(FB_PRIVACY)}</p><button type="button" class="btn primary" id="fbStart">Start</button>${FBK.mine?`<p class="muted">${icon("check")} You sent your answers on ${esc(FBK.mine.when||"")}. You can change them or take them back.</p><button type="button" class="btn" id="fbWithdraw">Take my answers back</button>`:""}`;
    el.querySelector("#fbStart").onclick=()=>{FBK.step=0;fbRender();fbFocus()};const w=el.querySelector("#fbWithdraw");if(w)w.onclick=fbWithdraw;return}
  if(FBK.step>=n){el.innerHTML=`<h3 tabindex="-1" id="fbH">Check your answers</h3><dl class="fbcheck">${FB_Q.map((q,i)=>{const a=FBK.ans[q.id];return `<div><dt>${esc(q.q)}</dt><dd>${esc(Array.isArray(a)?a.join("; "):(a||"Not answered"))} <button type="button" class="linkbtn" data-go="${i}">Change<span class="vh"> ${esc(q.q)}</span></button></dd></div>`}).join("")}</dl>
    <div class="fbsend"><button type="button" class="btn primary" id="fbSend">${FBK.db?"Send my answers":"Send through GitHub"}</button> <button type="button" class="btn" id="fbCopy">Copy my answers</button> <button type="button" class="btn" id="fbCSV">Download as a spreadsheet (CSV)</button></div>
    <p class="muted" id="fbOut" aria-live="polite">${FBK.db?"Your answers are saved to this hub, where only its owner can read them.":"GitHub issues are public: send through GitHub only if you are happy for your answers to be seen. Otherwise, copy or download them and send them through your network or organisation."}</p>`;
    el.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{FBK.step=+b.dataset.go;fbRender();fbFocus()});
    el.querySelector("#fbSend").onclick=fbSend;el.querySelector("#fbCopy").onclick=()=>{copyText(fbText());toast("Answers copied")};
    el.querySelector("#fbCSV").onclick=async()=>{const text=fbCSV();let d=null;try{d=await claude.use("downloads")}catch(e){}if(d){try{await d.save({filename:"bhm2026-feedback.csv",data:text});toast("Saved")}catch(e){toast("Download cancelled")}}else{copyText(text);toast("Downloads are not available here: answers copied as CSV")}};fbFocus();return}
  const q=FB_Q[FBK.step];const a=FBK.ans[q.id];const name="fbq-"+q.id;
  const ctl=q.type==="text"?`<textarea id="${name}" rows="5" maxlength="1200" aria-describedby="${name}-hint">${esc(a||"")}</textarea>`
   :`<div class="fbopts">${q.opts.map((o,i)=>`<label class="fbopt"><input type="${q.type==="multi"?"checkbox":"radio"}" name="${name}" value="${esc(o)}" ${(Array.isArray(a)?a.includes(o):a===o)?"checked":""}> ${esc(o)}</label>`).join("")}</div>`;
  el.innerHTML=`<p class="muted">Question ${FBK.step+1} of ${n} · ${esc(q.sec)}</p><div class="fbbar" aria-hidden="true"><span style="width:${Math.round(100*FBK.step/n)}%"></span></div>
   <fieldset class="fbq"><legend><h3 tabindex="-1" id="fbH">${esc(q.q)}${q.optional?" (optional)":""}</h3></legend>${q.hint?`<p class="muted" id="${name}-hint">${esc(q.hint)}</p>`:`<span id="${name}-hint" hidden></span>`}${ctl}<p class="fberr" id="fbErr" aria-live="polite"></p></fieldset>
   <div class="fbnav"><button type="button" class="btn" id="fbBack">Back</button> <button type="button" class="btn primary" id="fbNext">Continue</button> <button type="button" class="linkbtn" id="fbSkip">Skip this question</button></div>`;
  const read=()=>{if(q.type==="text"){const v=el.querySelector("textarea").value.trim();if(v)FBK.ans[q.id]=v.slice(0,1200);else delete FBK.ans[q.id];return true}
    const v=[...el.querySelectorAll(`[name=${name}]:checked`)].map(i=>i.value);if(q.max&&v.length>q.max){el.querySelector("#fbErr").textContent=`Select up to ${q.max}.`;return false}
    if(v.length)FBK.ans[q.id]=q.type==="multi"?v:v[0];else delete FBK.ans[q.id];return true};
  el.querySelector("#fbBack").onclick=()=>{read();fbSave();FBK.step--;fbRender();fbFocus()};
  el.querySelector("#fbNext").onclick=()=>{if(!read())return;if(fbPII()){el.querySelector("#fbErr").textContent="Please remove email addresses and phone numbers.";return}fbSave();FBK.step++;fbRender();fbFocus()};
  el.querySelector("#fbSkip").onclick=()=>{delete FBK.ans[q.id];fbSave();FBK.step++;fbRender();fbFocus()}}
function fbFocus(){const h=document.getElementById("fbH");if(h)h.focus()}
async function fbSend(){const out=document.getElementById("fbOut");if(fbPII()){out.textContent="Please remove email addresses and phone numbers first.";return}
  if(FBK.db){try{const d={answers:FBK.ans,when:new Date().toISOString().slice(0,10),v:1};await FBK.db.doc("feedback/"+FBK.uid).set(d);FBK.mine=d;out.textContent="Thank you. Your answers were sent; you can change them or take them back at any time.";toast("Sent");try{localStorage.removeItem("bhm-fb-draft")}catch(e){}}catch(e){out.textContent=e&&e.code==="invalid_argument"?"Your access to this hub does not include sending answers. Copy or download them instead.":"Could not send just now. Your answers are kept in this browser; try again later, or copy them."}return}
  window.open(issueURL("feedback","Black History Month 2026",fbText(),"",""),"_blank","noopener");out.textContent="GitHub opened in a new tab with your answers filled in. Check them, then submit."}
async function fbWithdraw(){if(!FBK.db||!FBK.mine)return;try{await FBK.db.doc("feedback/"+FBK.uid).delete();FBK.mine=null;FBK.ans={};fbRender();toast("Your answers were taken back")}catch(e){toast("Could not take them back just now")}}
async function fbInit(){fbLoad();fbRender();let db=null,user=null,uid=null;try{db=await claude.use("db");user=await claude.use("user");uid=user?await user.id():null;FBK.owner=user?!!(await user.isOwner()):false}catch(e){}
  FBK.db=db&&uid?db:null;FBK.uid=uid;if(FBK.db){try{const d=await db.doc("feedback/"+uid).get();if(d.exists){FBK.mine=d.data();if(!Object.keys(FBK.ans).length)FBK.ans={...(FBK.mine.answers||{})}}}catch(e){}}
  if(FBK.db&&FBK.owner){try{db.collection("feedback").onSnapshot(s=>{const rows=s.docs.map(d=>d.data()||{});fbOwnerSummary(rows)})}catch(e){}}fbRender()}
/* For the hub's owner inside Claude: counts by answer, never individual answers, and nothing for groups under 10 */
function fbTally(rows,minGroup){const out={n:rows.length,q:{}};FB_Q.filter(q=>q.type!=="text").forEach(q=>{const c={};rows.forEach(r=>{const a=(r.answers||{})[q.id];(Array.isArray(a)?a:a?[a]:[]).forEach(v=>{c[v]=(c[v]||0)+1})});out.q[q.id]=Object.fromEntries(Object.entries(c).map(([k,v])=>[k,v<minGroup?null:v]))});return out}
function fbOwnerSummary(rows){const el=document.getElementById("fbOwner");if(!el)return;const t=fbTally(rows,10);
  el.innerHTML=`<h3>What people have sent (only you can see this)</h3><p>${t.n} ${t.n===1?"person has":"people have"} sent answers here. Counts under 10 are shown as "fewer than 10".</p>${FB_Q.filter(q=>q.type!=="text").map(q=>`<details><summary>${esc(q.q)}</summary><ul>${q.opts.map(o=>{const v=(t.q[q.id]||{})[o];return `<li>${esc(o)}: ${v===undefined?0:v===null?"fewer than 10":v}</li>`}).join("")}</ul></details>`).join("")}`}
/* Summaries that networks and organisations send back (src/feedback-summaries.json), checked on the way in */
function fbSummaryCheck(s){const bad=[];if(!s.id||!s.period||!s.org_type||!s.channel)bad.push((s.id||"?")+": missing id, period, org_type or channel");
  if(!(s.n>=10))bad.push(s.id+": fewer than 10 responses, so it is not published");
  Object.entries(s.counts||{}).forEach(([qid,c])=>{const q=FB_Q.find(x=>x.id===qid);if(!q){bad.push(s.id+": unknown question "+qid);return}Object.entries(c).forEach(([o,v])=>{if(q.opts&&!q.opts.includes(o))bad.push(s.id+": unknown answer '"+o+"' to "+qid);if(typeof v!=="number"||v<0||v>s.n)bad.push(s.id+": count out of range for "+qid);if(v>0&&v<5)bad.push(s.id+": a count under 5 for "+qid+" must be suppressed")});if(q.type==="one"){const sum=Object.values(c).reduce((a,b)=>a+b,0);if(sum>s.n)bad.push(s.id+": answers to "+qid+" add up to more than the responses")}});
  if(/[\w.+-]+@[\w-]+\.[\w.]+/.test(JSON.stringify(s)))bad.push(s.id+": contains an email address");return bad}
function fbSummaries(){const el=document.getElementById("fbSums");if(!el)return;const S=(typeof FB_SUMMARIES!=="undefined"?FB_SUMMARIES:[]).filter(s=>!fbSummaryCheck(s).length);
  if(!S.length){el.innerHTML=`<p>No summaries have been sent back yet. When a network or organisation runs the survey and sends its counts, they appear here, added up across everyone who sent them.</p>`;return}
  const tot=S.reduce((a,s)=>a+s.n,0);const add={};S.forEach(s=>Object.entries(s.counts||{}).forEach(([q,c])=>{add[q]=add[q]||{};Object.entries(c).forEach(([o,v])=>{add[q][o]=(add[q][o]||0)+v})}));
  el.innerHTML=`<p>${S.length} ${S.length===1?"summary":"summaries"} covering ${tot} responses (${[...new Set(S.map(s=>s.org_type))].join(", ")}).</p>${FB_Q.filter(q=>add[q.id]).map(q=>`<h4>${esc(q.q)}</h4><ul>${q.opts.filter(o=>add[q.id][o]).map(o=>`<li>${esc(o)}: ${add[q.id][o]}</li>`).join("")}</ul>`).join("")}`}
/* The review itself */
const YR_REVIEW={
 well:[["The national theme was taken up widely and word for word, by councils, universities, NHS staff networks, unions and employers' bodies.",["bhm26-013","bhm26-024","bhm26-031","bhm26-032","bhm26-035"]],
  ["Local government and universities carried most of the visible activity, often with grants for community groups and free events.",["bhm26-013","bhm26-014","bhm26-016","bhm26-020","bhm26-027"]],
  ["Some places already work all year: Lewisham's 365 programme, Black History Cymru 365 and the University of Westminster's Black History Year.",["bhm26-016","bhm26-038","bhm26-030"]],
  ["The hub shipped {REL} releases in October 2026, each checked by its own self-checks and published as open data, with three companion portals kept in step.",[]]],
 notwell:[["Very little was published by central government for BHM 2026 compared with 2025: no ministerial launch, Civil Service blog post or Commons debate was found by 31 October.",["bhm26-008","bhm26-044","bhm26-046","bhm26-045"]],
  ["Reach and outcomes are rarely measured: no public body published attendance or results, and the only reach figures found are a publisher's own.",["bhm26-005","bhm26-009"]],
  ["Official reports admit a gap between activity and what communities feel, and some evidence of harm is rising.",["bhm26-011","bhm26-042"]],
  ["The hub itself heard almost nothing back: no feedback, comments or ideas were saved in the Claude edition (which had not been shared), and the repository had 3 unique visitors and no issues in the fortnight to 31 October.",[]]],
 learned:[["A month without a way to hear back cannot show what it changed: feedback has to be built in from the start, at every point people finish something, not asked for once at the end.",["M02","M03"]],
  ["People want the month tied to things that last: careers and sponsorship, data on progress, and the curriculum.",["bhm26-028","bhm26-039"]],
  ["The political climate is a stated risk: some councils paused themed promotion, and organisers framed events against hostility.",["bhm26-021","bhm26-022"]]],
 actions:[["Share the hub: give the Claude edition to the networks and leaders it is for, and post the website and survey through existing network channels","Hub owner","November 2026"],
  ["Run the feedback survey through network channels, and send back summaries of 10 or more responses","Network chairs and race champions","By 31 December 2026"],
  ["Publish what we heard and what changes as a result, on this page and in the release notes","Hub owner","January 2027"],
  ["Run the usability testing kit with each audience, including users with access needs","A user researcher or trained volunteers","By March 2027"],
  ["Plan the year: dates, careers, data and learning content each quarter, reviewed against feedback","Hub owner with network chairs","Quarterly from January 2027"]]};
const YR_YEAR=[
 ["Must","Dates and events all year: Windrush Day, Emancipation Day, Slavery Remembrance Day, Black History Month and local 365 programmes, with network events planned within the rules for network activity",["bhm26-016","bhm26-038","Y-NETWORK"]],
 ["Must","A standing way to hear back: the feedback form, network summaries, and a published account of what changed",["M01","M02","M06"]],
 ["Should","Careers, sponsorship and development, which employees most often say they need",["Y-SPONSOR"]],
 ["Should","Progress on targets and data, kept up to date as organisations publish",["Y-DATA"]],
 ["Could","Learning content through the year, tied to the curriculum debate and anniversaries",["bhm26-028","bhm26-043"]],
 ["Won't (for now)","Ask about ethnicity in feedback unless the analysis needs it and enough people answer to report it safely",["M28","M26"]]];
function yrIds(ids){const seen=new Set();return (ids||[]).map(i=>{let k=YR_SRC[i]?i:null;if(!k){const m=(YR.yearround||[]).concat(YR.methods||[]).find(x=>x.alias===i);k=m?m.id:null}if(!k||seen.has(YR_SRC[k]))return "";seen.add(YR_SRC[k]);return yrTag(k)}).join("")}
function yrRender(){const v=document.getElementById("v-yearreview");if(!v||typeof YR==="undefined")return;
  const W=YR.items||[];const y26=W.filter(i=>i.year===2026);
  const s1=document.getElementById("yrShort");if(s1)s1.innerHTML=`<aside class="card lpshort" aria-labelledby="yrShortH"><h2 class="lpshorth" id="yrShortH">${icon("info")} In short</h2><ul>
   <li>The 2026 theme, ${esc(YR.theme.name)}, was taken up widely, mostly by councils, universities, NHS networks and unions. ${yrTag("bhm26-001")}</li>
   <li>Little was published by central government compared with 2025, and almost no one published reach or outcomes. ${yrTag("bhm26-008")}${yrTag("bhm26-009")}</li>
   <li>The hub heard almost nothing back this year, so the first job is to ask: the survey below, and network summaries.</li>
   <li>People want the month tied to things that last all year: careers, data on progress and learning. ${yrTag("bhm26-039")}</li></ul></aside>`;
  const rel0=(typeof CHANGELOG!=="undefined"?CHANGELOG:[]).filter(c=>/\(\d+ Oct 2026\)/.test(c)).length;const L=(arr)=>`<ul>${arr.map(([t,ids])=>`<li>${esc(t.replace("{REL}",rel0))} <span class="tags">${yrIds(ids)}</span></li>`).join("")}</ul>`;
  const r=document.getElementById("yrRetro");if(r)r.innerHTML=`<div class="grid g2"><div class="card"><h3>What went well</h3>${L(YR_REVIEW.well)}</div><div class="card"><h3>What did not go well</h3>${L(YR_REVIEW.notwell)}</div></div>
   <div class="card"><h3>What we learned</h3>${L(YR_REVIEW.learned)}</div>
   <div class="tablewrap"><table class="rowtext"><caption class="vh">Actions from the review</caption><thead><tr><th scope="col">Action</th><th scope="col">Who</th><th scope="col">When</th></tr></thead><tbody>${YR_REVIEW.actions.map(a=>`<tr><th scope="row">${esc(a[0])}</th><td>${esc(a[1])}</td><td>${esc(a[2])}</td></tr>`).join("")}</tbody></table></div>`;
  const h=document.getElementById("yrHub");if(h){const rel=(typeof CHANGELOG!=="undefined"?CHANGELOG:[]).filter(c=>/\(\d+ Oct 2026\)/.test(c)).length;const nsrc=Object.keys(SOURCES).length;const nchk=CHECKS.length;
    h.innerHTML=`<div class="grid g4">${[[VIEWS.length,"pages"],[rel,"releases in October 2026"],[nsrc.toLocaleString("en-GB"),"sources, each dated"],[nchk,"self-checks, each proven to fail"]].map(([n,l])=>`<div class="card"><span class="stat">${n}</span><p>${esc(l)}</p></div>`).join("")}</div>
     <h3>What the hub could measure about its use</h3><ul><li>GitHub repository, 18 to 31 October 2026: 159 page views from 3 unique visitors; 1 star; no issues raised; one discussion, with no replies. Read from GitHub on 31 October 2026.</li><li>The Claude edition: no ideas, votes, comments or expressions of interest were saved by 31 October 2026. It had not yet been shared with anyone, so this measures reach, not satisfaction.</li><li>The public website does not count visitors, by design: it has no cookies or tracking. That means the survey is the only way to hear from its readers.</li></ul>`}
  const t=document.getElementById("yrWebBody");if(t)t.innerHTML=W.map(i=>`<tr><td>${esc(i.date)}</td><th scope="row">${esc(i.publisher)}</th><td>${esc(YR_KIND[i.kind]||i.kind)}</td><td>${esc(YR_CAT[i.category]||i.category)}</td><td>${esc(i.point)}${i.year<2026?' <span class="muted">(background, '+i.year+')</span>':""}</td><td><div class="tags">${yrTag(i.id)}</div></td></tr>`).join("");
  const y=document.getElementById("yrYear");if(y)y.innerHTML=`<div class="tablewrap"><table class="rowtext"><caption class="vh">What the hub should do until next October</caption><thead><tr><th scope="col">Priority</th><th scope="col">What</th><th scope="col">Evidence</th></tr></thead><tbody>${YR_YEAR.map(r=>`<tr><td>${esc(r[0])}</td><th scope="row">${esc(r[1])}</th><td><div class="tags">${yrIds(r[2])}</div></td></tr>`).join("")}</tbody></table></div>`;
  const sv=document.getElementById("fbSurveyText");if(sv)sv.textContent=fbSurveyText();
  const vv=document.getElementById("v-yearreview");if(vv&&!document.getElementById("yearreview-vant")){const sec=document.createElement("section");sec.className="block";sec.id="yearreview-vant";sec.dataset.icon="hands";sec.dataset.label="From where you stand";
    const V=[["people","If you are Black, African, Caribbean or of Mixed heritage","Your view of whether the month worked is the one that matters most: say what helped and what did not, in your own words, and whether you want your words quoted.","#yr-feedback","Tell us how it went"],
     ["hands","If you are a colleague or ally","Ask what people want from the year ahead before planning anything, and keep supporting what lasts beyond October.","#yr-year","What the hub should do all year"],
     ["ladder","If you lead or sponsor","Visible, repeated leadership was one of the questions people are asked about; commit to one action with a date, and report back on it.","#yr-review","Actions from the review"],
     ["route","If you chair a network","Post the survey in your channels, then send back the counts so everyone can see the same evidence.","#yr-survey","The survey, ready to post"],
     ["chart","If you design policy, services or data","Measure reach and outcomes, not only activity: almost no one published either this year.","#yr-web","What organisations did and said"]];
    sec.innerHTML=`<div class="sechead"><span class="eyebrow">Vantage points</span><h2>What this page means from where you stand</h2><p>Suggestions written by the hub for different readers. Each links to the part of this page it rests on.</p></div><div class="grid g2 vtskip">${V.map(c=>`<article class="card lpvant"><h3>${icon(c[0])} ${esc(c[1])}</h3><p>${esc(c[2])} <a href="${c[3]}">${esc(c[4])}</a></p></article>`).join("")}</div>`;
    const before=document.getElementById("yr-web");if(before)vv.insertBefore(sec,before);else vv.appendChild(sec)}
  const cp=document.getElementById("fbCopySurvey");if(cp&&!cp._b){cp._b=1;cp.addEventListener("click",()=>{copyText(fbSurveyText());toast("Survey copied")})}
  if(typeof shortFirst==="function")shortFirst();
  fbSummaries()}
/* The survey as text, for a Teams, Viva Engage or Slack post, or to paste into Microsoft Forms */
function fbSurveyText(){return ["Black History Month 2026: how did it go, and what next?","",FB_PRIVACY,"",...FB_Q.map((q,i)=>`${i+1}. ${q.q}${q.optional?" (optional)":""}${q.hint?"\n   "+q.hint:""}${q.opts?"\n"+q.opts.map(o=>"   - "+o).join("\n"):"\n   (free text)"}`)].join("\n")}
/* C178: the review is evidenced, the feedback routes work, and nothing personal can be published */
function yrAudit(){const bad=[];if(typeof YR==="undefined"){bad.push("no review evidence loaded");return bad}
  (YR.items||[]).forEach(i=>{if(!i.url||!/^https:\/\//.test(i.url)||!i.quote||!i.date||!i.publisher)bad.push(i.id+": incomplete");if(!YR_SRC[i.id])bad.push(i.id+": not registered as a source");if(OLD_DEPT_RE.test(i.publisher+i.title+i.point))bad.push(i.id+": names the former department")});
  const allIds=new Set([...(YR.items||[]),...(YR.methods||[]),...(YR.yearround||[])].flatMap(x=>[x.id,x.alias].filter(Boolean)));
  [...YR_REVIEW.well,...YR_REVIEW.notwell,...YR_REVIEW.learned].forEach(([t,ids])=>ids.forEach(id=>{if(!allIds.has(id))bad.push("review cites missing evidence "+id)}));YR_YEAR.forEach(r=>r[2].forEach(id=>{if(!allIds.has(id))bad.push("year plan cites missing evidence "+id)}));
  if(YR_REVIEW.actions.some(a=>a.length!==3||!a[1]||!a[2]))bad.push("an action has no owner or date");
  if(new Set(FB_Q.map(q=>q.id)).size!==FB_Q.length)bad.push("two questions share an id");
  FB_Q.forEach(q=>{if(q.type!=="text"&&(!q.opts||q.opts.length<2))bad.push(q.id+": too few options");if(q.q.split(/\s+/).length>20)bad.push(q.id+": question over 20 words")});
  const pq=FB_Q.find(q=>q.id==="perspective");if(!pq||!pq.optional||!pq.opts.includes("Prefer not to say"))bad.push("the perspective question must be optional with Prefer not to say");
  const saved=FBK.ans;FBK.ans={worked:"call me on 07700 900123"};if(!fbPII())bad.push("the personal details guard did not catch a phone number");FBK.ans={worked:"a.b@example.org"};if(!fbPII())bad.push("the personal details guard did not catch an email");FBK.ans=saved;
  const csvT=(()=>{const s=FBK.ans;FBK.ans={worked:"=HYPERLINK(1)"};const c=fbCSV();FBK.ans=s;return c})();if(!/'=HYPERLINK/.test(csvT))bad.push("CSV export does not neutralise formulas");
  const tl=fbTally([{answers:{value:"Very valuable"}},{answers:{value:"Very valuable"}}],10);if(tl.q.value["Very valuable"]!==null)bad.push("counts under 10 are not suppressed");
  if(!fbSummaryCheck({id:"t",period:"2026",org_type:"x",channel:"y",n:6,counts:{value:{"Very valuable":3}}}).length)bad.push("the summary check accepted a small group");
  (typeof FB_SUMMARIES!=="undefined"?FB_SUMMARIES:[]).forEach(s=>fbSummaryCheck(s).forEach(x=>bad.push("summary "+x)));
  if(typeof ISSUE_FORMS==="undefined"||!ISSUE_FORMS.feedback)bad.push("no GitHub feedback form");
  const st=fbSurveyText();if(FB_Q.some(q=>!st.includes(q.q)))bad.push("the survey text is missing a question");
  return bad.slice(0,10)}
CHECKS.push({id:"C178",n:"The year in review cites only read, dated sources; every action has an owner and a date; the feedback form asks one plain question at a time with personal details blocked, small groups suppressed and spreadsheet formulas neutralised; and network summaries are checked before they are added up (D-161 to D-163)",
  run:c=>({ok:!c.yr.length,d:c.yr.length?c.yr.slice(0,3).join("; "):`${(YR.items||[]).length} published items read, ${FB_Q.length} questions, ${(typeof FB_SUMMARIES!=="undefined"?FB_SUMMARIES:[]).length} network summaries, ${YR_REVIEW.actions.length} actions with owners`}),
  breakIt:c=>{c.yr=["the personal details guard did not catch a phone number"];return c}});
const _ctx158=ctxV15;ctxV15=function(){const c=_ctx158();c.yr=yrAudit();return c};
REQS.push({id:"R107",t:"F",r:"A post-mortem of Black History Month 2026 built on user, community and network feedback, and on what organisations published",o:"Request 78",sat:["yr-review","yr-web","yr-hub"],ver:["C178","D-161"]},
 {id:"R108",t:"F",r:"A way for people and organisations to give feedback through the hub, in or outside Claude",o:"Request 78",sat:["yr-feedback"],ver:["C178","D-162"]},
 {id:"R109",t:"F",r:"Survey content for Teams, Viva Engage and Slack that feeds one shared evidence base",o:"Request 78",sat:["yr-survey","yr-shared"],ver:["C178","D-163"]},
 {id:"R110",t:"F",r:"What the hub should strive for until the next Black History Month, as a year-round resource",o:"Request 78",sat:["yr-year"],ver:["C178"]});
BUILD_TESTS["D-161"]="The hub had no record of how the month went. A review now sets out what went well, what did not, what was learned and actions with owners and dates, citing only pages read on 31 October 2026 and re-read word for word by an independent reviewer, and saying plainly where the evidence is thin (central government published little; no one published reach or outcomes; the hub heard almost nothing back). C178 fails if the review cites evidence that is not loaded or an action has no owner or date.";
BUILD_TESTS["D-162"]="There was no way to tell the hub how the month went. A one-question-at-a-time form now saves answers in the Claude edition (each person can change or take back their own; the owner sees only counts, with groups under 10 suppressed), opens a GitHub issue elsewhere, or copies and downloads the answers to send through people's own channels. C178 proves that email addresses and phone numbers are blocked, small groups are suppressed and spreadsheet formulas are neutralised.";
BUILD_TESTS["D-163"]="Feedback gathered through Teams, Viva Engage and Slack had nowhere to meet. The survey text on this page is generated from the same questions as the form, and networks send back counts (never individual answers) to src/feedback-summaries.json, where C178 and the data validator reject groups under 10, counts under 5, unknown questions or answers, totals that do not add up and email addresses.";
/* The evidence joins the open data: every item has a key, a fingerprint and its source (C169) */
DATASETS.push({k:"yearreview",n:"Black History Month 2026 in review",ic:"quote",arr:()=>(typeof YR!=="undefined"?YR.items:[]).map(x=>({...x,text:x.point})),id:x=>x.id,lab:x=>x.publisher+": "+x.title,srcs:x=>[YR_SRC[x.id]],view:"yearreview",href:()=>"#yr-web",out:["pages","jsonld"],chk:["C178"]});
let v59Boot=function(){yrRender();fbInit()};
