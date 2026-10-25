
/* ================= v2.8.0 DNA, GENOMES AND AFRICAN ANCESTRY ================= */
VIEW_ICONS.genome="spark";
const GN_KPI=[
 {k:"A",h:"Tishkoff et al. 2009: 121 African populations",n:"121",l:"African populations in a landmark 2009 study of genetic structure",ic:"globe"},
 {k:"B",h:"Choudhury et al. 2020: 426 high-depth African genomes",n:"426",l:"African genomes that revealed over 3 million new variants (2020)",ic:"spark"},
 {k:"C",h:"Later estimates",n:"2%",l:"of participants in genetic association studies have African ancestry, says Genomics England",ic:"chart"},
 {k:"C",h:"Consequences: risk scores, uncertain variants, misdiagnosis",n:"4",l:"times more accurate: some genetic risk scores, for European ancestry",ic:"heart"}];
/* 'race' may appear only where the page discusses race as a category, the law or race-based medicine (D-088) */
const GN_RACE_OK=/race[- ]based|race variable|without a race|race-neutral|race science|scientific racism|races? (is|are|as) (a )?social|social construct|racial or ethnic group|self-identified racial|racial categories|distinct races|races exist|racism/i;
function gnRaceMisuse(){const out=[];GN.filter(s=>!/^[FG]$/.test(s.k)).forEach(s=>s.points.forEach(p=>{(p.text+" "+p.note).split(/(?<=[.;])\s+/).forEach(sen=>{if(/\brac(e|es|ial)\b/i.test(sen)&&!GN_RACE_OK.test(sen))out.push(p.h+": “"+sen.slice(0,70)+"”")})}));return out}
function renderGenome(){if(!$("#gnA")||$("#gnA .card"))return;const S=k=>GN.find(s=>s.k===k)||{points:[],intro:""};
  $("#gnKpi").innerHTML=GN_KPI.map(k=>kpi(k.n,k.l,k.ic)).join("");
  [["A","gnA"],["B","gnB"],["C","gnC"],["D","gnD"],["E","gnE"],["F","gnF"],["G","gnG"]].forEach(([k,id])=>{$("#"+id).innerHTML=S(k).points.map(p=>ppCard(p,"gn-"+k.toLowerCase()+"-"+_ppSlug(p.h))).join("");const i=$("#gn"+k+"Intro");if(i)i.textContent=S(k).intro||""});
  $("#gnProj tbody").innerHTML=GN_PROJECTS.map(p=>`<tr id="gn-p-${_ppSlug(p.name)}"><th scope="row">${esc(p.name)}</th><td>${esc(p.years)}</td><td>${esc(p.who)}</td><td>${esc(p.what)}</td><td>${esc(p.size||"–")}</td><td><div class="tags">${p.src.map(evTag).join("")}</div></td></tr>`).join("");
  $("#gnTime").innerHTML=GN_TIME.map(t=>`<li><span class="mono pptly">${esc(t.y)}</span> <span>${esc(t.t)}</span> <span class="tags">${t.src.map(evTag).join("")}</span></li>`).join("");
  enhanceAll()}
CHECKS.push(
 {id:"C132",n:"Every point, project and event on the DNA and genomes page is sourced, in date order, with disputes explained (D-087)",run:c=>({ok:c.gn.points>=30&&c.gn.projects>=10&&!c.gn.bad.length,d:c.gn.bad.length?"Problems: "+c.gn.bad.slice(0,5).join(", "):`${c.gn.points} points in ${c.gn.sections} sections, ${c.gn.projects} projects and ${c.gn.time} dated events, all with read sources; timeline in date order`}),
  breakIt:c=>{c.gn={...c.gn,bad:["BiDil: no source"]};return c}},
 {id:"C133",n:"Genome findings are described by ancestry, not race (D-088)",run:c=>({ok:c.gnrace.length===0&&c.gnmyth,d:c.gnrace.length?"Uses 'race' where ancestry is meant: "+c.gnrace.slice(0,3).join("; "):`No finding is framed as racial; the myth that genetics proves races exist is answered with sources`}),
  breakIt:c=>{c.gnrace=["Sickle cell: “a Black disease”"];return c}},
 {id:"C134",n:"Each headline number on the genome page appears in its sourced point (D-089)",run:c=>({ok:!c.gnkpi.length,d:c.gnkpi.length?"Not found: "+c.gnkpi.join(", "):`${GN_KPI.length} headline numbers traced to sourced points`}),
  breakIt:c=>{c.gnkpi=["99%"];return c}});
Object.assign(BUILD_TESTS,{"D-087":"A page on genome research in African and African-descendant populations was added (projects, under-representation, ancestry-linked health findings, the diaspora, ethics); a second check re-opened 60 sources and corrected six overstated points, such as the Tishkoff ancestry label and the context of the CDC malaria figure (C132)",
 "D-088":"Genetics is easily misread as proof of race; findings must be framed by ancestry, with 'race' used only when discussing the category itself, the law or race-based medicine (C133)",
 "D-089":"Headline numbers must match their sourced points (C134), as on the peoples page"});
REQS.push({id:"R70",t:"F",r:"What research has been done on the DNA and genomes of Black and African-descendant groups",o:"Request 43",sat:["gn-why","gn-projects","gn-gap","gn-health","gn-diaspora","gn-ethics","gn-timeline","gn-limits"],ver:["C132","C133","C134"]});
DATASETS.push({k:"genome",n:"DNA, genomes and African ancestry",ic:"spark",arr:()=>GN.flatMap(s=>s.points.map(p=>({...p,id:"gn-"+s.k.toLowerCase()+"-"+_ppSlug(p.h)}))),id:x=>x.id,lab:x=>x.h,srcs:x=>x.src||[],view:"genome",href:x=>"#"+x.id,out:["pages","jsonld"],chk:["C132"]});
const _ctx53=ctxV15;ctxV15=function(){const c=_ctx53();const okSrc=a=>a&&a.length&&a.every(s=>SOURCES[s]&&SOURCES[s].rd);const all=GN.flatMap(s=>s.points);
  const ys=GN_TIME.map(t=>parseInt(t.y,10));const order=ys.every((y,i)=>!i||y>=ys[i-1]);
  c.gn={sections:GN.length,points:all.length,projects:GN_PROJECTS.length,time:GN_TIME.length,bad:[...all.filter(p=>!okSrc(p.src)).map(p=>p.h),...all.filter(p=>p.disputed&&!p.note).map(p=>p.h+": disputed without a note"),...GN_PROJECTS.filter(p=>!okSrc(p.src)).map(p=>p.name),...GN_TIME.filter(t=>!okSrc(t.src)).map(t=>t.y),...(order?[]:["timeline out of order"])]};
  c.gnrace=gnRaceMisuse();c.gnmyth=GN.some(s=>s.points.some(p=>/races exist/i.test(p.h)&&okSrc(p.src)));
  c.gnkpi=GN_KPI.filter(k=>{const p=(GN.find(s=>s.k===k.k)||{points:[]}).points.find(x=>x.h===k.h);return !p||!okSrc(p.src)||!((p.figure||"")+" "+p.text).includes(k.n)}).map(k=>k.n);return c};
function v35Boot(){renderGenome()}
