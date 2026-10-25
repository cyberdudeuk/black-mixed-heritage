
/* ================= v1.6: DESIGN AND ARCHITECTURE PACK ================= */
/* Build-time tests (defect register): each exists in test.mjs and records the defect it prevents */
const BUILD_TESTS={"D-001":"Inline script must parse (empty template expression broke the page)","D-002":"Poster text must not overlap","D-004":"Navigation must fit at 390px","D-005":"Poster headings must stay inside the canvas","D-006":"Map labels must not overlap","D-007":"Chart labels must not overlap","D-008":"Diagram text must stay inside its frame","D-009":"Author and first goal wording","D-010":"Maps zoom, pan and render every view","D-011":"Logo, favicon and drawer toggle outside the masthead","D-012":"No card grid ends with a gap","D-013":"AI assistant opens and falls back without AI","D-014":"AI page tools act, undo and refuse unsafe links","D-015":"Bibliographies match citations; lineage complete","D-016":"New diagram text inside frame","D-017":"Grid check runs after the fill","D-018":"Hidden elements stay hidden without the host reset","D-019":"Automated WCAG 2.2 AA audit on every page","D-020":"Maps use the full content width","D-021":"Traceability does not depend on check timing"};
const REQS=[
 {id:"R01",t:"F",r:"A Black History Month portal for cross-government and wider public sector audiences, with posters",o:"Original brief",sat:["ov-start","po-maker","po-gallery"],ver:["C01","C05","D-002","D-005"]},
 {id:"R02",t:"F",r:"Visual elements and effects relevant to the 2026 theme",o:"Original brief",sat:["th-what","th-symbols"],ver:["C01","C18"]},
 {id:"R03",t:"F",r:"Iconography from the whole of Africa",o:"Request 2",sat:["af-map","af-scripts"],ver:["C15","C17"]},
 {id:"R04",t:"F",r:"Diaspora and long-standing settlement of Black or 'deemed Black' peoples worldwide",o:"Request 2",sat:["di-map","di-terms"],ver:["C14","C38"]},
 {id:"R05",t:"F",r:"A statement that the hub is made in a personal capacity, and the DEIA rationale",o:"Requests 2 and 12",sat:["ab-author","ab-rationale","ab-vulnerable"],ver:["D-009"]},
 {id:"R06",t:"NF",r:"No team email published",o:"Request 2",sat:["ab-author"],ver:["C13"]},
 {id:"R07",t:"F",r:"Reparations, curriculum review and the risk of erasure, impartially",o:"Request 3",sat:["db-main"],ver:["C20"]},
 {id:"R08",t:"F",r:"Aims, goals, objectives and outcomes",o:"Request 3",sat:["ab-purpose"],ver:["C21"]},
 {id:"R09",t:"F",r:"Past themes and a historical arc",o:"Request 4",sat:["th-past","hi-arc","hi-timeline"],ver:["C26","C02"]},
 {id:"R10",t:"F",r:"Networks across government, devolved administrations and sectors",o:"Request 4",sat:["nw-list"],ver:["C24"]},
 {id:"R11",t:"F",r:"A real calendar view with exports and links to major productivity platforms",o:"Request 4",sat:["cal-month","cal-agenda","cn-apps"],ver:["C22"]},
 {id:"R12",t:"F",r:"Culinary heritage with recipes",o:"Request 4",sat:["fd-intro","fd-recipes"],ver:["C23"]},
 {id:"R13",t:"NF",r:"User-centred and fully DEIA-compliant; WCAG 2.2 AA",o:"Request 4",sat:["ab-ucd","ab-deia","ab-a11y"],ver:["C06","C19","D-019"]},
 {id:"R14",t:"F",r:"Innovation, invention and contested credit",o:"Request 5",sat:["in-now","in-inventors","in-credit"],ver:["C02"]},
 {id:"R15",t:"F",r:"Brand and multimedia hub with collateral",o:"Request 6",sat:["br-identity","br-collateral","br-loop"],ver:["C47","C55"]},
 {id:"R16",t:"F",r:"Hero carousel with spotlight; translated ticker; proverbs, customs",o:"Request 7",sat:["ov-spot","af-proverbs","af-customs"],ver:["C28","C29","C30","C27"]},
 {id:"R17",t:"F",r:"Map labels; real-earth (Equal Earth) projection linked to the UN resolution",o:"Request 8",sat:["di-map","di-geo"],ver:["C31","C32","D-006"]},
 {id:"R18",t:"F",r:"Geospatial, demographic and socio-economic data",o:"Request 8",sat:["di-data"],ver:["C33"]},
 {id:"R19",t:"F",r:"Futures thinking 2030 to 2100 with the GO-Science toolkit",o:"Request 8",sat:["fu-intro","fu-scenarios","fu-horizons"],ver:["C34"]},
 {id:"R20",t:"F",r:"Fully interactive maps with alternative visualisations, accessibly",o:"Request 10",sat:["di-map","af-map","hi-map"],ver:["C38","C39","D-010","D-020"]},
 {id:"R21",t:"NF",r:"More iconography, reflected in the site map",o:"Request 10",sat:["ov-map"],ver:["C40"]},
 {id:"R22",t:"F",r:"Full visual lineage and traceability",o:"Request 10",sat:["kn-lineage","kn-trace","dz-trace"],ver:["C41","C57"]},
 {id:"R23",t:"NF",r:"No empty space: fill with motifs or reflow",o:"Request 10",sat:["my-how"],ver:["C43","D-012","D-017"]},
 {id:"R24",t:"F",r:"Myths, preconceived ideas and prejudices, set straight",o:"Request 10",sat:["my-list","my-stereo"],ver:["C35","C51"]},
 {id:"R25",t:"F",r:"Branded slide deck and other templates",o:"Request 10",sat:["br-templates","br-print"],ver:["C54"]},
 {id:"R26",t:"F",r:"Roles, induction packs and collaboration within networks",o:"Request 10",sat:["iv-roles","iv-induction","iv-collab"],ver:["C37"]},
 {id:"R27",t:"F",r:"Volunteering and leadership in objectives; careers, development and recruitment schemes",o:"Request 10",sat:["iv-levels","iv-objectives","ca-schemes","ca-path"],ver:["C36","C44"]},
 {id:"R28",t:"NF",r:"Drawer toggle out of the masthead; logo and favicon",o:"Request 11",sat:["ov-spot"],ver:["C49","D-011"]},
 {id:"R29",t:"F",r:"Generative, declarative and agentic AI",o:"Request 11",sat:["ab-ai"],ver:["C45","D-013","D-014"]},
 {id:"R30",t:"F",r:"Teams backgrounds, persona avatars and an inclusive icon bank",o:"Request 11",sat:["br-teams","br-personas","br-icons"],ver:["C46","C47"]},
 {id:"R31",t:"NF",r:"Verify and triangulate every source; bibliographies; courses and academia",o:"Request 12",sat:["ca-courses","ca-academic","as-sources"],ver:["C02","C48","C50","D-015"]},
 {id:"R32",t:"F",r:"Mixed heritage; appreciation and appropriation; impartiality and fair representation",o:"Request 13",sat:["bl-mixed","bl-approp","bl-views","bl-fair"],ver:["C20"]},
 {id:"R33",t:"F",r:"Frontier technology in Africa with strategies, risks and recommendations",o:"Request 14",sat:["ft-landscape","ft-policy","ft-issues","ft-actions"],ver:["C53"]},
 {id:"R34",t:"F",r:"Stereotypes; bullying, harassment and discrimination; speaking up",o:"Request 15",sat:["my-stereo","iv-speakup"],ver:["C51","C52"]},
 {id:"R35",t:"NF",r:"The usual design and architecture artefacts with traceability",o:"Standing preference",sat:["dz-toc","dz-research","dz-blueprint","dz-prd","dz-arch","dz-trace"],ver:["C57","C58"]},
 {id:"R36",t:"NF",r:"Global navigation never exceeds the screen; drawer for in-page links only",o:"Standing preference",sat:["ov-map"],ver:["C11","C12","C25","D-004"]},
 {id:"R37",t:"NF",r:"Self-verification, self-repair, self-reporting and staleness checks",o:"Standing preference",sat:["as-checks","as-method"],ver:["C10","C42"]},
 {id:"R38",t:"NF",r:"Maps use the full width of the screen",o:"Project preference",sat:["di-map","af-map","hi-map"],ver:["D-020","C59"]}];
const TOC={inputs:["Verified sources and open data","Community knowledge (to be reviewed)","Design, accessibility and data standards","Public sector networks and partners"],
 activities:["Learn: history, places, motifs, futures, technology","Correct myths and stereotypes","Plan events and recognise contributors","Join, lead and speak up","Find schemes, courses and support"],
 assumptions:["Staff have time, under their organisation's network rules","Leaders follow through on commitments","Community partners are willing to review and are paid","Sources stay available; the hub is re-checked each edition"],
 risks:["Celebration without action","Errors spread at scale","Tokenism or appropriation","Political or impartiality breaches","Over-reliance on AI drafting"]};
const RESEARCH={q:["Which route do different people take first, and do they find what they came for?","Can people using screen readers, magnifiers, keyboard only or a phone complete the top tasks?","Do the myth and stereotype cards change what people would say or do?","Which templates and collateral do organisers actually use, and what is missing?","Do people of mixed heritage and from different communities feel represented?"],
 methods:[["Tree test","Test the grouped navigation and routes before any redesign"],["Task-based usability","Top tasks with disabled users and assistive technology"],["Content review","Community partners check motifs, words, proverbs and recipes"],["Survey and analytics","Light, consented measures of use and commitments made"],["Diary or follow-up","Check in with organisers after October on what lasted"]],
 ethics:["Informed consent, recorded; people can withdraw","Pay or credit participants and community reviewers","Collect only the data needed; no special category data without a lawful basis","Store notes securely and delete on schedule"]};
const BLUEPRINT={stages:["Discover","Learn","Plan","Act","Share","Sustain"],
 lanes:[
  ["User actions",["Hears about the month; opens the hub","Reads history, myths, identity, technology","Chooses an activity; checks the calendar","Runs the event; volunteers; speaks up","Uses posters, Teams backgrounds, templates","Sets an objective; reports progress"]],
  ["Frontstage (hub)",["#overview","#history","#toolkit","#involve","#brand","#careers"]],
  ["Backstage (data and features)",["Search index, routes, AI assistant","Evidence tiers, bibliographies, maps","Calendar exports, poster maker","Speak-up guidance, induction packs","Collateral renderer, downloads","Schemes with checked status, lineage"]],
  ["Support (outside the hub)",["Comms team, intranet","Community reviewers","Network leads, senior sponsor sign-off","HR, unions, Acas, helplines","Brand and accessibility review","Line managers; performance process"]],
  ["Evidence and checks",["C11, C25, D-004","C02, C35, C48","C22","C44, C52","C47, C54, C55","C36, C10"]]]};
const WORKFLOWS=[
 {n:"Organise an event",ic:"calendar",steps:[["Pick an activity","#toolkit"],["Check dates","#calendar"],["Get sign-off under network rules","#iv-levels"],["Make the poster and invitation","#posters"],["Run it accessibly","#toolkit"],["Report with the template","#br-templates"],["Publish commitments","#leaders"]]},
 {n:"Correct a myth",ic:"bulb",steps:[["Find the card","#my-list"],["Lead with the fact","#my-how"],["Cite one source","#my-sources"],["Say what the evidence does not show","#my-list"]]},
 {n:"Respond to harassment",ic:"megaphone",steps:[["Keep a record","#iv-speakup"],["Get support","#iv-speakup"],["Raise informally if safe","#iv-speakup"],["Formal grievance","#iv-speakup"],["Acas early conciliation within the time limit","#iv-speakup"]]},
 {n:"Join and lead",ic:"hands",steps:[["Choose a role","#iv-roles"],["Follow the induction pack","#iv-induction"],["Join a network","#networks"],["Write the objective","#iv-objectives"],["Find development","#careers"]]}];
const ADRS=[
 ["One self-contained HTML file","Works offline, on locked-down devices and as a single published page; no build server to maintain.","Larger page (about 1.3 MB); content updates need a rebuild."],
 ["Data embedded as arrays, rendered by functions","Content, checks, exports and AI tools all read the same data, so they cannot drift apart.","Editing needs care; the knowledge layer documents every field."],
 ["Equal Earth for world and Africa maps","Shows true relative size; matches the 2026 UN resolution.","Distorts shapes near the edges; Mercator kept for comparison."],
 ["Evidence tiers on every fact","Readers see what was read, located or not checked.","Slower to add content; that is the point."],
 ["Runtime capabilities with fallbacks","AI and downloads use the viewer's own account and consent; search and the media kit work without them.","Features differ by viewing context; stated on the page."],
 ["Self-checks with negative proofs","Every check is proven to fail on a broken copy, so a pass means something.","More code to maintain; the check suite never shrinks."]];
const LLD=[
 ["Navigation","buildNav","fitNav","buildDrawer","route","show"],
 ["Maps","mapKit","initMaps","globeView","renderAfrica","renderDiaspora","renderMap"],
 ["Content","renderMyths","renderInvolve","renderCareers","renderBelonging","renderTech","renderStereo","renderSpeak"],
 ["Knowledge and lineage","renderKnowledge","jsonld","lineage","renderLineage","trace","renderBibliographies"],
 ["Brand and media","posterSVG","collSVG","renderBrand","renderTemplates","avatarSVG","renderIconBank"],
 ["AI","initAI","aiRun","aiOffline"],
 ["Assurance","gatherCtx","runChecks","fillGaps","fixA11y","renderAssurance"]];
/* D-021: traceability ran before the first self-check run and reported every check as missing; existence now comes from the check register, results only when available */
function reqStatus(id){if(/^C\d+/.test(id)){if(!CHECKS.some(c=>c.id===id))return"missing";const s=window.__selfcheck;const r=s&&s.rows.find(x=>x.id===id);return r?(r.ok?"pass":"fail"):"registered"}return BUILD_TESTS[id]?"build":"missing"}
function renderDesign(){if(!$("#dzToc"))return;
  // theory of change
  const outs=[[VIEWS.length,"sections"],[POSTERS.length,"posters"],[COLLATERAL.length,"collateral designs"],[MYTHS.length+STEREOS.length,"myths and stereotypes answered"],[SCHEMES.length+COURSES.length,"schemes and courses"],[Object.keys(SOURCES).length,"sources"],[CHECKS.length,"self-checks"]];
  const col=(h,items,c)=>`<div class="toccol" style="--c:${c}"><h3>${h}</h3><ul>${items.map(i=>`<li>${i}</li>`).join("")}</ul></div>`;
  $("#dzToc").innerHTML=`<div class="tocflow">${col("Inputs",TOC.inputs.map(esc),"var(--r-east)")}${col("Activities",TOC.activities.map(esc),"var(--gold-ink)")}${col("Outputs",outs.map(([n,l])=>`<b>${n}</b> ${esc(l)}`),"var(--green)")}${col("Outcomes",PURPOSE.outcomes.slice(0,2).flatMap(o=>o.items).map(esc),"var(--red)")}${col("Impact",PURPOSE.outcomes.slice(2).flatMap(o=>o.items).map(esc),"var(--r-pan)")}</div>
   <div class="grid g2" style="margin-top:var(--s4)"><div class="card"><h3>Assumptions</h3><ul>${TOC.assumptions.map(a=>`<li>${esc(a)}</li>`).join("")}</ul></div><div class="card"><h3>Risks</h3><ul>${TOC.risks.map(a=>`<li>${esc(a)}</li>`).join("")}</ul></div></div><p class="muted" style="font-size:.88rem;margin-top:8px">Outputs are counted live from the hub. Outcomes and impact are intended, not yet measured.</p>`;
  // research bundle
  $("#dzResearch").innerHTML=`<div class="grid g2"><div class="card"><h3>Research questions</h3><ol>${RESEARCH.q.map(q=>`<li>${esc(q)}</li>`).join("")}</ol></div><div class="card"><h3>Ethics and data protection</h3><ul>${RESEARCH.ethics.map(q=>`<li>${esc(q)}</li>`).join("")}</ul></div></div>
   <div class="tablewrap" style="margin-top:var(--s4)"><table><caption>Methods</caption><thead><tr><th scope="col">Method</th><th scope="col">Purpose</th></tr></thead><tbody>${RESEARCH.methods.map(([m,p])=>`<tr><td><b>${esc(m)}</b></td><td>${esc(p)}</td></tr>`).join("")}</tbody></table></div>
   <h3 style="margin:var(--s4) 0 var(--s2)">Who to recruit: the proto-personas</h3><div class="pchips">${PERSONAS.map(p=>`<a class="pchip" href="#persona-${p.id}">${avatarSVG(p.av,40,p.n)}<span><b>${esc(p.n)}</b><br><span class="muted">${esc(p.role)}</span></span></a>`).join("")}</div><p class="note" style="margin-top:var(--s3)">This is a plan. No research has been carried out yet, so nothing here is a finding.</p>`;
  // blueprint
  $("#dzBlueprint").innerHTML=`<div class="tablewrap"><table class="bp"><caption>Service blueprint: what users do, what the hub does, and what supports it</caption><thead><tr><th scope="col">Lane</th>${BLUEPRINT.stages.map(s=>`<th scope="col">${s}</th>`).join("")}</tr></thead><tbody>${BLUEPRINT.lanes.map(([l,c])=>`<tr><th scope="row">${esc(l)}</th>${c.map(x=>`<td>${x.startsWith("#")?`<a href="${x}">${vIcon(x.slice(1))} ${esc(vName(x.slice(1)))}</a>`:esc(x)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  // workflows
  $("#dzFlows").innerHTML=WORKFLOWS.map(w=>`<div class="card"><div class="mhead"><span class="ricon">${icon(w.ic)}</span><h3>${esc(w.n)}</h3></div><ol class="flow">${w.steps.map(([s,h])=>`<li><a href="${h}">${esc(s)}</a></li>`).join("")}</ol></div>`).join("");
  // PRD / FTIR
  const st=x=>{const s=reqStatus(x);return `<span class="tag ${s==="pass"?"src":s==="build"?"":"ref"}" title="${s==="build"?esc(BUILD_TESTS[x]):""}">${x}${s==="pass"?" ✓":s==="fail"?" ✗":""}</span>`};
  $("#dzPrd").innerHTML=`<p class="muted" style="margin-bottom:var(--s3)">${REQS.length} requirements: ${REQS.filter(r=>r.t==="F").length} functional and ${REQS.filter(r=>r.t==="NF").length} non-functional. Each is traced to where it came from, where it is met and how it is verified. C numbers are live self-checks; D numbers are build tests from the defect register.</p>
   <div class="filters" role="group" aria-label="Filter requirements"><label for="rqT">Type<select id="rqT"><option value="all">All</option><option value="F">Functional</option><option value="NF">Non-functional</option></select></label><label for="rqQ">Search<input id="rqQ" type="search" placeholder="maps, AI, myths…"></label><span class="resultcount" id="rqCount" aria-live="polite"></span></div>
   <div class="tablewrap"><table><caption>Product requirements and functional, technical and integration requirements</caption><thead><tr><th scope="col">ID</th><th scope="col">Type</th><th scope="col">Requirement</th><th scope="col">Origin</th><th scope="col">Met by</th><th scope="col">Verified by</th></tr></thead><tbody id="rqBody">${REQS.map(r=>`<tr data-t="${r.t}"><td class="mono">${r.id}</td><td>${r.t==="F"?"Functional":"Non-functional"}</td><td>${esc(r.r)}</td><td class="muted">${esc(r.o)}</td><td>${r.sat.map(s=>`<a href="#${s}">${esc((document.getElementById(s)||{dataset:{}}).dataset.label||s)}</a>`).join(", ")}</td><td>${r.ver.map(st).join(" ")}</td></tr>`).join("")}</tbody></table></div>`;
  const fl=()=>{const t=$("#rqT").value,q=$("#rqQ").value.toLowerCase();let n=0;$$("#rqBody tr").forEach(tr=>{const v=(t==="all"||tr.dataset.t===t)&&(!q||tr.textContent.toLowerCase().includes(q));tr.hidden=!v;if(v)n++});$("#rqCount").textContent=`${n} of ${REQS.length}`};$("#rqT").addEventListener("change",fl);$("#rqQ").addEventListener("input",fl);fl();
  // architecture
  const box=(x,y,w,h,t,c,sub)=>`<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="var(--surface)" stroke="${c}" stroke-width="2"/><text x="${x+w/2}" y="${y+22}" text-anchor="middle" class="cnode">${t}</text>${sub?`<text x="${x+w/2}" y="${y+40}" text-anchor="middle" class="archsub">${sub}</text>`:""}</g>`;
  const ar=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="var(--muted)" stroke-width="1.5" marker-end="url(#ah)"/>`;
  $("#dzHld").innerHTML=`<svg viewBox="0 0 860 380" role="img" aria-labelledby="hldT"><title id="hldT">High-level design: a build pipeline produces one HTML page with data, rendering, navigation, maps, knowledge, assurance and AI layers, plus print and Office outputs</title><defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>
   ${box(14,20,212,56,"Source and data","var(--r-east)","src.html, data files")}${box(14,110,212,56,"Patch and build","var(--r-east)","patch, build, syntax check")}${box(14,200,212,56,"Build tests","var(--red)","Playwright, axe, negatives")}${box(14,290,212,56,"Outputs","var(--green)","posters, PDF, Office, data")}
   ${ar(120,76,120,110)}${ar(120,166,120,200)}${ar(120,256,120,290)}${ar(226,138,258,138)}
   <rect x="260" y="20" width="580" height="340" rx="10" fill="none" stroke="var(--gold-ink)" stroke-dasharray="6 4"/><text x="550" y="44" text-anchor="middle" class="cnode">Published page (one HTML file)</text>
   ${box(280,60,170,56,"Data layer","var(--gold-ink)","arrays and sources")}${box(470,60,170,56,"Render layer","var(--gold-ink)","views and sections")}${box(660,60,160,56,"Navigation","var(--gold-ink)","nav, drawer, search")}
   ${box(280,150,170,56,"Maps engine","var(--green)","map, globe, tiles")}${box(470,150,170,56,"Knowledge layer","var(--green)","glossary, JSON-LD")}${box(660,150,160,56,"Lineage","var(--green)","trace and audit")}
   ${box(280,240,170,56,"Assurance","var(--red)","self-checks, a11y")}${box(470,240,170,56,"AI assistant","var(--r-pan)","sample capability")}${box(660,240,160,56,"Downloads","var(--r-pan)","downloads capability")}
   ${ar(450,88,470,88)}${ar(640,88,660,88)}${ar(365,116,365,150)}${ar(555,116,555,150)}${ar(740,116,740,150)}${ar(365,206,365,240)}${ar(555,206,555,240)}</svg>`;
  $("#dzAdr").innerHTML=ADRS.map(([d,w,c],i)=>`<tr><td class="mono">ADR-${String(i+1).padStart(2,"0")}</td><td><b>${esc(d)}</b></td><td>${esc(w)}</td><td>${esc(c)}</td></tr>`).join("");
  const exist=f=>typeof window[f]==="function"||(()=>{try{return typeof eval(f)==="function"}catch(e){return false}})();
  $("#dzLld").innerHTML=LLD.map(([m,...fns])=>`<tr><td><b>${esc(m)}</b></td><td>${fns.map(f=>`<code class="${exist(f)?"":"missing"}">${f}()</code>`).join(" ")}</td></tr>`).join("");
  window.__lld={total:LLD.reduce((a,x)=>a+x.length-1,0),missing:LLD.flatMap(([m,...f])=>f).filter(f=>!exist(f))};
  renderTraceNav()}
function renderTraceNav(){const h=$("#dzTrace");if(!h)return;
  h.innerHTML=`<label for="tnPick">Requirement<select id="tnPick">${REQS.map(r=>`<option value="${r.id}">${r.id}: ${esc(r.r.slice(0,90))}</option>`).join("")}</select></label><div id="tnOut"></div>`;
  const show=id=>{const r=REQS.find(x=>x.id===id);$("#tnOut").innerHTML=`<ol class="trchain"><li class="trstep"><span class="ricon">${icon("quote")}</span><div><span class="eyebrow">Origin</span><div>${esc(r.o)}: ${esc(r.r)}</div></div></li><li class="trstep"><span class="ricon">${icon("layers")}</span><div><span class="eyebrow">Met by</span><div>${r.sat.map(s=>{const el=document.getElementById(s);const v=el&&el.closest(".view");return `<a href="#${s}">${v?vIcon(v.id.slice(2))+" "+esc(vName(v.id.slice(2)))+" › ":""}${esc(el?el.dataset.label:s)}</a>`}).join("<br>")}</div></div></li><li class="trstep"><span class="ricon">${icon("check")}</span><div><span class="eyebrow">Verified by</span><div>${r.ver.map(v=>{const s=reqStatus(v);return `<span class="tag ${s==="pass"?"src":"ref"}">${v}</span> ${esc(/^C/.test(v)?((CHECKS.find(c=>c.id===v)||{}).n||""):BUILD_TESTS[v]||"")} <span class="mono muted">${s}</span>`}).join("<br>")}</div></div></li></ol>`};
  $("#tnPick").addEventListener("change",()=>show($("#tnPick").value));show(REQS[0].id);
  const all=REQS.flatMap(r=>r.ver);window.__trace={reqs:REQS.length,missingSat:REQS.flatMap(r=>r.sat.filter(s=>!document.getElementById(s)).map(s=>r.id+"→"+s)),missingVer:REQS.flatMap(r=>r.ver.filter(v=>reqStatus(v)==="missing").map(v=>r.id+"→"+v)),unverified:REQS.filter(r=>!r.ver.length).map(r=>r.id),ver:all.length}}
/* full-width maps and full screen (project preference) */
function addFullscreen(){Object.values(MAPS).forEach(m=>{if(m.bar.querySelector("[data-fs]"))return;const frame=m.svg.closest(".mapframe")||m.svg.parentElement;if(!frame.requestFullscreen)return;
  const b=document.createElement("button");b.type="button";b.dataset.fs="1";b.title="Full screen";b.setAttribute("aria-label","Show the map full screen");b.innerHTML=icon("layers")+"<span>Full screen</span>";b.addEventListener("click",()=>{if(document.fullscreenElement)document.exitFullscreen();else frame.requestFullscreen().catch(()=>toast("Full screen is not available here"))});m.bar.querySelector(".zoom").appendChild(b)})}
