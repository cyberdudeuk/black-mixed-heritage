
/* ================= v1.7 glue: icons, lineage, search, requirements, checks ================= */
ICONS.film="M3 4h18v16H3zM7 4v16M17 4v16M3 8h4M3 12h4M3 16h4M17 8h4M17 12h4M17 16h4";
ICONS.music=ICONS.music||"M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z";
Object.assign(VIEW_ICONS,{club:"film",culture:"star"});
DATASETS.push(
 {k:"books",n:"Club books",ic:"book",arr:()=>BOOKS,id:b=>b.id,lab:b=>b.t+" ("+b.y+")",srcs:b=>b.src||[],view:"club",href:b=>"#club-"+b.id,out:["pages","jsonld"],chk:["C60"]},
 {k:"films",n:"Club films and TV",ic:"film",arr:()=>FILMS,id:f=>f.id,lab:f=>f.t+" ("+f.y+")",srcs:f=>f.src||[],view:"club",href:f=>"#club-"+f.id,out:["pages","jsonld"],chk:["C60"]},
 {k:"culture",n:"Culture, sport and enterprise",ic:"star",arr:()=>CULTURE,id:c=>c.id,lab:c=>c.n,srcs:c=>c.src||[],view:"culture",href:c=>"#"+c.id,out:["pages","jsonld"],chk:["C61"]},
 {k:"insights",n:"Representation data",ic:"chart",arr:()=>INSIGHTS,id:(x,i)=>"ins-"+i,lab:x=>x.fig+" "+x.l,srcs:x=>x.src||[],view:"culture",href:()=>"#cu-insights",out:["pages"],chk:["C62"]});
const _addSearch15=addV15Search;addV15Search=function(add){_addSearch15(add);BOOKS.forEach(b=>add(b.t,"Book",b.a+", "+b.y+": "+b.d,"#club-"+b.id));FILMS.forEach(f=>add(f.t,"Film",f.dir+", "+f.y+": "+f.d,"#club-"+f.id));CULTURE.forEach(c=>add(c.n,(CULT_DOMAINS[c.dom]||["Culture"])[0],(c.yl||c.y)+": "+c.d,"#"+c.id));add("Book and film club","Club","Picks, discussion guides, voting and meeting planner","#club")};
const _ld15=ldExtra;ldExtra=function(base){return[..._ld15(base),...BOOKS.map(b=>({"@type":"Book","@id":base+"book-"+b.id,"name":b.t,"author":{"@type":"Person","name":b.a},"datePublished":String(b.y),"genre":b.g,"description":b.d})),...FILMS.map(f=>({"@type":f.ty==="Series"?"TVSeries":"Movie","@id":base+"film-"+f.id,"name":f.t,"director":{"@type":"Person","name":f.dir},"dateCreated":String(f.y),"description":f.d})),...CULTURE.map(c=>({"@type":"CreativeWork","@id":base+c.id,"name":c.n,"temporalCoverage":String(c.y),"about":(CULT_DOMAINS[c.dom]||[""])[0],"description":c.d,"citation":(c.src||[]).filter(s=>SOURCES[s]).map(s=>SOURCES[s].u)}))]};
REQS.push({id:"R39",t:"F",r:"A book and film club with picks, discussion guides, voting and meeting planning",o:"Request 18",sat:["cl-picks","cl-vote","cl-run"],ver:["C60","D-022"]},
 {id:"R40",t:"F",r:"Sport, media, culture and the arts, business, science, innovation and technology content with data and insights",o:"Request 18",sat:["cu-people","cu-timeline","cu-insights"],ver:["C61","C62"]});
BUILD_TESTS["D-022"]="Club filters, discussion guides and local voting work without shared storage";
LLD.push(["Club and culture","renderClub","clubQuestions","clubInitVotes","castVote","renderCulture"]);
const _ctx15=ctxV15;ctxV15=function(){return{..._ctx15(),srcs:Object.entries(SOURCES).map(([k,v])=>({k,loc:!!v.loc,why:v.why||"",u:v.u,rd:v.rd||""})),club:clubItems().map(i=>({id:i.id,kind:i.kind,t:i.t,by:i.a||i.dir,y:i.y,g:i.g,reg:i.reg,aud:i.aud,src:[...(i.src||[])],q:clubQuestions(i).length})),cult:CULTURE.map(c=>({...c,src:[...(c.src||[])]})),ins:INSIGHTS.map(x=>({...x,src:[...(x.src||[])]}))}};
CHECKS.push(
 {id:"C60",n:"Every club pick has its creator, year, genre, audience, a source and a discussion guide",run:c=>{const bad=c.club.filter(i=>!i.t||!i.by||!(i.y>1800&&i.y<=new Date().getFullYear())||!i.g||!i.reg||!["adult","ya","family"].includes(i.aud)||!i.src.length||i.src.some(s=>!SOURCES[s])||i.q<4);return{ok:!bad.length&&c.club.filter(i=>i.kind==="book").length>=10&&c.club.filter(i=>i.kind==="film").length>=8,d:bad.length?"Incomplete: "+bad.map(b=>b.id).join(", "):`${c.club.filter(i=>i.kind==="book").length} books and ${c.club.filter(i=>i.kind==="film").length} films, each sourced with a guide`}},
  breakIt:c=>{c.club[0]={...c.club[0],src:[]};return c}},
 {id:"C61",n:"Every culture, sport and enterprise entry is sourced, dated and in a known field",run:c=>{const bad=c.cult.filter(x=>!x.n||!x.d||!CULT_DOMAINS[x.dom]||!(x.y>1500&&x.y<=new Date().getFullYear())||!x.src.length||x.src.some(s=>!SOURCES[s]));const doms=new Set(c.cult.map(x=>x.dom)).size;return{ok:!bad.length&&doms>=6&&c.cult.length>=30,d:bad.length?"Incomplete: "+bad.map(b=>b.id).join(", "):`${c.cult.length} entries across ${doms} fields`}},
  breakIt:c=>{c.cult[0]={...c.cult[0],dom:"astrology"};return c}},
 {id:"C62",n:"Every data insight gives a figure, a year and a source",run:c=>{const bad=c.ins.filter(x=>!x.fig||!x.y||!x.src.length||x.src.some(s=>!SOURCES[s]));return{ok:!bad.length&&c.ins.length>=3,d:bad.length?"Incomplete: "+bad.map(b=>b.l).join(", "):`${c.ins.length} sourced insights`}},
  breakIt:c=>{c.ins.push({fig:"50%",l:"x",y:"",src:[]});return c}},
 {id:"C63",n:"Every source was read in full, or says why it could not be (D-023)",run:c=>{const bad=c.srcs.filter(s=>s.loc&&!s.why);const loc=c.srcs.filter(s=>s.loc).length;return{ok:!bad.length,d:bad.length?"Located but not read, no reason given: "+bad.map(s=>s.k).join(", "):`${c.srcs.length-loc} of ${c.srcs.length} sources read in full`+(loc?`; ${loc} could not be read, each with a reason`:"")}},
  breakIt:c=>{c.srcs.push({k:"Sx",loc:true,why:""});return c}});
BUILD_TESTS["D-023"]="Sources marked located were never read in full, and the release notes misstated the new source range; C63 now blocks unread sources without a reason";
function v16Boot(){$("#clubRun").innerHTML=CLUB_RUN.map(([h,p],i)=>`<div class="card"><div class="mhead"><span class="ricon">${icon(["check","eye","shield","people","flag","trend"][i])}</span><h3>${esc(h)}</h3></div><p>${esc(p)}</p>${i===4?evTag("S111"):""}</div>`).join("");
  $("#clubPlanBtn").addEventListener("click",clubSchedule);
  $("#clubIcs").addEventListener("click",async()=>{const ev=clubEvents();if(!ev.length)return;
    const text=ics(ev);let d=null;try{d=await claude.use("downloads")}catch(e){}if(d){try{await d.save({filename:"bhm2026-book-film-club.ics",data:text});toast("Saved")}catch(e){toast("Download cancelled")}}else{copyText(text);toast("Downloads are not available here: calendar text copied")}});
  renderClub();renderCulture();clubInitVotes();renderBibliographies()}
AI_TOOLS.push({name:"list_club_picks",description:"List book and film club picks with creator, year, genre, setting, audience and a short factual description. Optional filters: kind (book or film), audience (adult, ya, family).",inputSchema:{type:"object",properties:{kind:{type:"string"},audience:{type:"string"}}},
  execute:({kind,audience})=>clubItems().filter(i=>(!kind||i.kind===kind)&&(!audience||i.aud===audience)).map(i=>({id:i.id,kind:i.kind,title:i.t,by:i.a||i.dir,year:i.y,genre:i.g,setting:i.reg,audience:i.aud,about:i.d,href:"#club-"+i.id}))},
 {name:"list_culture",description:"List people and milestones in sport, media, arts, music, business, science and digital, with year and source IDs. Optional filter: field (sport, media, arts, music, business, science, digital).",inputSchema:{type:"object",properties:{field:{type:"string"}}},
  execute:({field})=>CULTURE.filter(c=>!field||c.dom===field).map(c=>({name:c.n,year:c.yl||c.y,field:c.dom,about:c.d,sources:c.src,href:"#"+c.id}))});
AI_SKILLS.forEach(s=>{if(s.id==="ask"||s.id==="plan")s.tools.push("list_club_picks","list_culture")});
REQS.find(r=>r.id==="R37").ver.push("C63");
/* D-024: claims corrected after reading the sources in full must never reappear (page text, search index, AI tools and exports) */
const RETIRED=["850 captives held by 111 owners","register made under Portuguese law","years after the slave trade was banned","walking tours now mark","contributions were often ignored","invites Black people to share","many public bodies have signed","as producer","Winner of Winners","official book chart","wrongly placed","treated wounded soldiers","led the Mary Seacole","every Black History Month since","over conversation. Being invited","Some historians argue the evidence is overstated"];
const _ctx16=ctxV15;ctxV15=function(){const text=document.body.innerText+" "+JSON.stringify(jsonld())+" "+JSON.stringify(EVENTS)+JSON.stringify(CULTURE)+JSON.stringify(BOOKS)+JSON.stringify(FILMS)+JSON.stringify(SOURCES)+JSON.stringify(NETWORKS)+JSON.stringify(INNOV)+JSON.stringify(CUSTOMS)+JSON.stringify(SCHEMES)+JSON.stringify(INSIGHTS);return{..._ctx16(),retired:RETIRED.filter(p=>text.toLowerCase().includes(p.toLowerCase()))}};
CHECKS.push({id:"C64",n:"Wording corrected after reading the sources does not come back (D-024)",run:c=>({ok:!c.retired.length,d:c.retired.length?"Retired wording found: "+c.retired.join("; "):`${RETIRED.length} retired phrases absent from the page, data and exports`}),
  breakIt:c=>{c.retired=["register made under Portuguese law"];return c}});
BUILD_TESTS["D-024"]=`36 on-page wordings did not match their sources when read in full and were corrected; the ${RETIRED.length} most distinctive retired phrases are locked out by C64`;
REQS.find(r=>r.id==="R37").ver.push("C64");
