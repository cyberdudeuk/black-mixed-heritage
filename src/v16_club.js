
/* ================= v1.7: BOOK AND FILM CLUB ================= */
const THEME_Q={
 belonging:["Where do the characters feel they belong, and who decides that?","What makes a place feel like home in this story?"],
 migration:["What did people leave behind, and what did they bring with them?","How does arriving change both the newcomers and the place?"],
 family:["How do the generations in this story see each other differently?","What is passed down, and what is deliberately not?"],
 history:["What part of history did this show you that you had not met before?","How does the past shape the choices people make in the present?"],
 identity:["How do people name themselves, and how are they named by others?","Which parts of identity are chosen, and which are imposed?"],
 power:["Who holds power here, and how is it challenged?","Where do institutions help, and where do they harm?"],
 resistance:["What forms does resistance take, from everyday to organised?","What does it cost the people who resist?"],
 community:["Who looks after whom in this story?","How does community make change possible?"],
 work:["How does work shape people's lives and chances here?","What would fairness at work look like for these characters?"],
 language:["How is language used to include or exclude?","What is lost or gained in translation?"],
 colonialism:["How do the effects of empire show up in ordinary life?","What does independence mean to different people here?"],
 love:["How do love and loyalty pull people in different directions?","What does care look like when resources are scarce?"],
 justice:["What does justice mean to different people in this story?","What would repair or reparation look like here?"],
 joy:["Where do you find joy and humour, and why does it matter?","What is celebrated, and how?"]};
const CLUB_BASE_Q=["What stayed with you most, and why?","Which person or moment would you most like to talk to or about?","What does this add to our theme, Honouring Our Communities?","What will you do, read or watch next because of this?"];
function clubQuestions(item){const qs=[...CLUB_BASE_Q.slice(0,2)];(item.themes||[]).forEach(t=>(THEME_Q[t]||[]).forEach(q=>qs.push(q)));qs.push(...CLUB_BASE_Q.slice(2));return [...new Set(qs)].slice(0,9)}
const CLUB_RUN=[
 ["Choose together","Shortlist three picks, then let members vote. Mix lengths and formats so everyone can join."],
 ["Make it accessible","Offer audiobook, large print, ebook and library options; for films, choose versions with subtitles and audio description and say which."],
 ["Give content notes","Many picks deal with racism, violence or loss. Say so in the invitation, and let people step out without explaining."],
 ["Set ground rules","Speak from your own experience; no one speaks for a whole community; disagree with ideas, not people; keep personal stories in the room."],
 ["Mind the rules on networks","In the Civil Service, network events need senior sign-off and are held outside working hours unless they are learning and development."],
 ["Close with action","End each meeting with one thing to read, watch, share or do next."]];
let clubType="all",clubVote={uid:null,db:null,unsub:null,tally:{book:{},film:{}},mine:{}};
function clubItems(){return[...BOOKS.map(b=>({...b,kind:"book"})),...FILMS.map(f=>({...f,kind:"film"}))]}
function renderClub(){if(!$("#clubList"))return;
  const kinds={all:"All",book:"Books",film:"Films and TV"};
  $("#clubChips").innerHTML=Object.entries(kinds).map(([k,v])=>`<button type="button" class="chip" data-k="${k}" aria-pressed="${k===clubType}">${icon(k==="film"?"eye":k==="book"?"book":"layers")} ${v} <span class="mono">${k==="all"?BOOKS.length+FILMS.length:k==="book"?BOOKS.length:FILMS.length}</span></button>`).join("");
  $$("#clubChips .chip").forEach(b=>b.addEventListener("click",()=>{clubType=b.dataset.k;renderClub()}));
  if(!$("#clubGenre").options.length){const g=[...new Set(clubItems().map(i=>i.g))].sort();$("#clubGenre").innerHTML=`<option value="all">Any genre or type</option>`+g.map(x=>`<option>${esc(x)}</option>`).join("");
    const r=[...new Set(clubItems().map(i=>i.reg))].sort();$("#clubReg").innerHTML=`<option value="all">Anywhere</option>`+r.map(x=>`<option>${esc(x)}</option>`).join("");
    ["#clubGenre","#clubReg","#clubAud"].forEach(s=>$(s).addEventListener("change",renderClub));let _cqT=0;$("#clubQ").addEventListener("input",()=>{clearTimeout(_cqT);_cqT=setTimeout(renderClub,250)})}
  const g=$("#clubGenre").value,rg=$("#clubReg").value,au=$("#clubAud").value,q=$("#clubQ").value.toLowerCase();let n=0;
  $("#clubList").innerHTML=clubItems().map(i=>{const v=(clubType==="all"||i.kind===clubType)&&(g==="all"||i.g===g)&&(rg==="all"||i.reg===rg)&&(au==="all"||i.aud===au)&&(!q||(i.t+" "+(i.a||i.dir)+" "+i.d).toLowerCase().includes(q));if(v)n++;
    const votes=(clubVote.tally[i.kind]||{})[i.id]||0,mine=clubVote.mine[i.kind]===i.id;
    return `<article class="card clubcard" id="club-${i.id}" data-kind="${i.kind}" ${v?"":"hidden"}><div class="mhead"><span class="ricon">${icon(i.kind==="book"?"book":"eye")}</span><div style="flex:1"><h3>${esc(i.t)}</h3><p class="mono muted">${esc(i.a||i.dir)} · ${i.y}${i.cert?" · "+esc(i.cert):""}</p></div></div>
     <p>${esc(i.d)}</p>${i.note?`<p class="muted" style="font-size:.9rem">${icon("award")} ${esc(i.note)}</p>`:""}
     <div class="tags"><span class="tag">${esc(i.g)}</span><span class="tag">${esc(i.reg)}</span><span class="tag">${i.aud==="ya"?"Young adult":i.aud==="family"?"Family":"Adult"}</span>${(i.src||[]).map(evTag).join("")}</div>
     <details class="guide"><summary>${icon("quote")} Discussion guide</summary><ol>${clubQuestions(i).map(x=>`<li>${esc(x)}</li>`).join("")}</ol><button type="button" class="btn sm" data-aiq="${i.id}">${icon("spark")} Suggest more questions with AI</button><div class="aiq" aria-live="polite"></div></details>
     <div class="btnrow"><button type="button" class="btn ${mine?"solid":""}" data-vote="${i.kind}:${i.id}" aria-pressed="${mine}">${icon("check")} ${mine?"Your vote":"Vote for next month"}</button><span class="mono muted votecount" aria-live="polite">${votes} ${votes===1?"vote":"votes"}</span></div></article>`}).join("");
  $("#clubCount").textContent=`${n} of ${BOOKS.length+FILMS.length} picks`;
  $$("[data-vote]").forEach(b=>b.addEventListener("click",()=>castVote(...b.dataset.vote.split(":"))));
  $$("[data-aiq]").forEach(b=>b.addEventListener("click",()=>aiQuestions(b)));
  renderLeaderboard();buildDrawerCounts();scheduleFill();if(typeof fixA11y==="function")fixA11y()}
function renderLeaderboard(){const h=$("#clubTop");if(!h)return;const row=(kind,arr)=>{const t=clubVote.tally[kind]||{};const top=Object.entries(t).sort((a,b)=>b[1]-a[1]).slice(0,3);return `<div class="card"><h3>${kind==="book"?"Books":"Films and TV"}: leading picks</h3>${top.length?`<ol>${top.map(([id,n])=>{const i=arr.find(x=>x.id===id);return i?`<li><a href="#club-${id}">${esc(i.t)}</a> <span class="mono muted">${n}</span></li>`:""}).join("")}</ol>`:`<p class="muted">No votes yet.</p>`}</div>`};
  h.innerHTML=row("book",BOOKS)+row("film",FILMS)+`<div class="card"><h3>How voting works</h3><p class="muted" style="font-size:.92rem" id="voteMode">${clubVote.db?"Votes are shared with everyone who can open this hub. You have one vote for a book and one for a film, and you can change them.":"Shared voting is not available in this view, so your vote is kept in this browser only."}</p></div>`}
async function clubInitVotes(){let db=null,user=null;try{db=await claude.use("db");user=await claude.use("user")}catch(e){}
  let uid=null;try{uid=user?await user.id():null}catch(e){}
  if(!db||!uid){try{clubVote.mine=store.get("clubvote",{})}catch(e){}renderClub();window.__club={shared:false};return}
  clubVote.db=db;clubVote.uid=uid;try{clubVote.ro=(user.can?await user.can("data.write"):null)===false}catch(e){}
  try{const me=await db.doc("clubvotes/"+uid).get();if(me.exists)clubVote.mine={...me.data()}}catch(e){}
  clubVote.unsub=db.collection("clubvotes").onSnapshot(s=>{const t={book:{},film:{}};s.docs.forEach(d=>{const x=d.data()||{};if(x.book)t.book[x.book]=(t.book[x.book]||0)+1;if(x.film)t.film[x.film]=(t.film[x.film]||0)+1});clubVote.tally=t;renderClub();if(location.hash==="#dash")try{renderDash()}catch(e){}},()=>{clubVote.db=null;renderClub()});
  window.__club={shared:true};renderClub()}
async function castVote(kind,id){if(clubVote.db&&clubVote.ro){toast("You can see the votes but your access to this hub does not include voting");return}const mine={...clubVote.mine};mine[kind]=mine[kind]===id?null:id;
  if(clubVote.db&&clubVote.uid){try{await clubVote.db.doc("clubvotes/"+clubVote.uid).set({book:mine.book||null,film:mine.film||null});clubVote.mine=mine;toast(mine[kind]?"Vote saved":"Vote removed")}catch(e){toast(e&&e.code==="invalid_argument"?"You can view votes but not vote in this hub":"Your vote could not be saved. Try again later.")}}
  else{clubVote.mine=mine;try{store.set("clubvote",mine)}catch(e){}const t=clubVote.tally[kind];Object.keys(t).forEach(k=>delete t[k]);if(mine[kind])t[mine[kind]]=1;toast("Vote kept in this browser")}
  renderClub()}
async function aiQuestions(b){const box=b.parentElement.querySelector(".aiq");const i=clubItems().find(x=>x.id===b.dataset.aiq);if(!aiSample){try{const sm=await claude.use("sample");if(sm)aiSample=sm}catch(e){}}if(!aiSample){box.textContent="AI is not available in this view.";return} /* D-075: if AI was still loading, try again instead of giving up */
  box.textContent="Thinking…";try{const r=await aiSample(`Suggest 5 open, respectful discussion questions for a UK public sector staff ${i.kind==="book"?"book":"film"} club during Black History Month 2026 (theme: ${THEME}). The ${i.kind} is "${i.t}" by ${i.a||i.dir} (${i.y}). Factual summary: ${i.d}. Do not quote from the work or describe plot details beyond this summary; avoid spoilers; include one question linking it to working life or public services. Plain numbered list, UK English.`,{modelTier:"quick"});const cur=document.querySelector(`[data-aiq="${CSS.escape(i.id)}"]`);const bx=cur?cur.parentElement.querySelector(".aiq"):box;bx.innerHTML=`<p class="mono muted">${icon("spark")} AI suggestions · check before use</p>`+aiRender(r.text)}catch(e){const cur=document.querySelector(`[data-aiq="${CSS.escape(i.id)}"]`);(cur?cur.parentElement.querySelector(".aiq"):box).textContent=e&&e.code==="not_granted"?"You chose not to allow AI for this page.":"Could not get suggestions just now."}}
function clubEvents(note){const s=$("#clubStart").value,n=Math.max(1,Math.min(12,+$("#clubN").value||4));if(!s)return [];const d0=parseD(s);const day=d0.getDate();const ev=[];
  for(let i=0;i<n;i++){const y=d0.getFullYear(),m=d0.getMonth()+i;const last=new Date(y,m+1,0).getDate();const d=new Date(y,m,Math.min(day,last));const k=iso(d);
    ev.push({id:"club"+i,s:k,e:k,t:`Book and film club, meeting ${i+1}`,where:$("#clubWhere").value||"",d:"Black History Month 2026 book and film club. Check the hub for the current pick and discussion guide."})}return ev}
function clubSchedule(){const ev=clubEvents();if(!ev.length)return;
  $("#clubPlan").innerHTML=`<ol>${ev.map(e=>`<li>${fmtD(e.s)}${e.where?" · "+esc(e.where):""}</li>`).join("")}</ol>`;$("#clubIcs").hidden=false;window.__clubPlan=ev.length;window.__clubEv=ev.map(e=>e.s)}
/* ================= v1.7: CULTURE, SPORT, MEDIA, BUSINESS, SCIENCE, DIGITAL ================= */
const CULT_DOMAINS={sport:["Sport","flag"],media:["Media and broadcasting","megaphone"],arts:["Culture and the arts","image"],music:["Music","music"],business:["Business and enterprise","briefcase"],science:["Science and medicine","bulb"],digital:["Digital and technology","cpu"]};
let cultDom="all";
function renderCulture(){if(!$("#cultList"))return;
  ICONS.music=ICONS.music||CULT_ICONS.music;
  $("#cultChips").innerHTML=[["all","All","layers"],...Object.entries(CULT_DOMAINS).filter(([k])=>CULTURE.some(c=>c.dom===k)).map(([k,[v,ic]])=>[k,v,ic])].map(([k,v,ic])=>`<button type="button" class="chip" data-d="${k}" aria-pressed="${k===cultDom}">${icon(ic)} ${esc(v)} <span class="mono">${k==="all"?CULTURE.length:CULTURE.filter(c=>c.dom===k).length}</span></button>`).join("");
  $$("#cultChips .chip").forEach(b=>b.addEventListener("click",()=>{cultDom=b.dataset.d;renderCulture()}));
  if(!$("#cultEra").dataset.done){$("#cultEra").dataset.done=1;["#cultEra","#cultSort"].forEach(s=>$(s).addEventListener("change",renderCulture));$("#cultQ").addEventListener("input",renderCulture)}
  const era=$("#cultEra").value,sort=$("#cultSort").value,q=$("#cultQ").value.toLowerCase();
  const inEra=y=>era==="all"||(era==="pre1900"&&y<1900)||(era==="1900"&&y>=1900&&y<1948)||(era==="1948"&&y>=1948&&y<2000)||(era==="2000"&&y>=2000);
  const list=[...CULTURE].sort((a,b)=>sort==="name"?a.n.localeCompare(b.n):sort==="desc"?b.y-a.y:a.y-b.y);let n=0;
  $("#cultList").innerHTML=list.map(c=>{const v=(cultDom==="all"||c.dom===cultDom)&&inEra(c.y)&&(!q||(c.n+" "+c.d).toLowerCase().includes(q));if(v)n++;const [dn,ic]=CULT_DOMAINS[c.dom]||["",""];
    return `<article class="card" id="${c.id}" data-dom="${c.dom}" ${v?"":"hidden"}><div class="mhead"><span class="ricon">${icon(ic)}</span><div style="flex:1"><h3>${esc(c.n)}</h3><p class="mono muted">${esc(c.yl||String(c.y))}${c.na?" · "+esc(c.na):""}</p></div></div><p>${esc(c.d)}</p>${c.contested?`<p class="muted" style="font-size:.88rem"><b>Note:</b> ${esc(c.contested)}</p>`:""}<div class="tags"><span class="tag">${esc(dn)}</span>${(c.src||[]).map(evTag).join("")}</div></article>`}).join("");
  $("#cultCount").textContent=`${n} of ${CULTURE.length}`;
  // timeline by domain (static: drawn once)
  if(!$("#cultTimeline svg")){const doms=Object.keys(CULT_DOMAINS).filter(k=>CULTURE.some(c=>c.dom===k));const ys=CULTURE.map(c=>c.y);const y0=Math.floor(Math.min(...ys)/20)*20,y1=Math.ceil((new Date().getFullYear()+4)/10)*10;const W=760,left=150,top=14,rowH=34,H=top+doms.length*rowH+28,X=y=>left+(y-y0)/(y1-y0)*(W-left-16);
  const col={sport:"var(--green)",media:"var(--r-east)",arts:"var(--red)",music:"var(--r-pan)",business:"var(--gold-ink)",science:"var(--r-central)",digital:"var(--r-north)"};
  let s="";for(let y=y0;y<=y1;y+=20)s+=`<line x1="${X(y)}" x2="${X(y)}" y1="${top-4}" y2="${H-22}" stroke="var(--line)"/><text class="cv" x="${X(y)}" y="${H-6}" text-anchor="middle">${y}</text>`;
  const seen={};doms.forEach((d,i)=>{const yy=top+i*rowH+12;s+=`<text class="cl" x="${left-10}" y="${yy+4}" text-anchor="end">${esc(CULT_DOMAINS[d][0].replace(" and broadcasting","").replace(" and the arts","").replace(" and enterprise","").replace(" and medicine","").replace(" and technology",""))}</text>`;
    CULTURE.filter(c=>c.dom===d).forEach(c=>{const k=d+Math.round(X(c.y)/8);seen[k]=(seen[k]||0)+1;const dy=((seen[k]-1)%3-1)*7;s+=`<a href="#${c.id}" data-tip="${esc("<b>"+esc(c.yl||String(c.y))+"</b> "+esc(c.n))}" aria-label="${esc(c.yl||String(c.y))}: ${esc(c.n)}"><circle cx="${X(c.y).toFixed(1)}" cy="${yy+dy}" r="6" fill="${col[d]}" stroke="var(--surface)" stroke-width="2"/></a>`})});
  $("#cultTimeline").innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Timeline of people and milestones by field"><title>Timeline of people and milestones by field</title>${s}</svg>`;bindTips($("#cultTimeline"));}
  if(!$("#cultInsights .card"))$("#cultInsights").innerHTML=INSIGHTS.map(x=>`<div class="card"><span class="eyebrow">${icon((CULT_DOMAINS[x.dom]||["","chart"])[1])} ${esc((CULT_DOMAINS[x.dom]||[x.dom])[0])}</span><span class="stat">${esc(x.fig)}</span><p>${esc(x.l)}</p><p class="mono muted">${esc(x.y)}</p><div class="tags">${(x.src||[]).map(evTag).join("")}</div></div>`).join("");
  buildDrawerCounts();scheduleFill();if(typeof fixA11y==="function")fixA11y()}
