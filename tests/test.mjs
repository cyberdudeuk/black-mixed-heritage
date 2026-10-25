// Build-time verification: runs the page headless with local copies of the CDN libraries and fonts.
// Usage: node test.mjs [--negative]   (--negative injects known defects to prove the checks fail)
import {readFileSync,writeFileSync,mkdirSync} from 'fs';
import {createRequire} from 'module';
const SP='/tmp/claude-0/-home-claude/85fc9058-1d74-50e0-91e4-0414f5b30b7d/scratchpad';
const require=createRequire(SP+'/x.js');
const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const NEG=process.argv.includes('--negative');
const F=SP+'/node_modules/@fontsource/';
const ff=(fam,file,w,st='normal')=>`@font-face{font-family:'${fam}';font-style:${st};font-weight:${w};src:url(data:font/woff2;base64,${readFileSync(F+file).toString('base64')}) format('woff2')}`;
const FONTCSS=[
 ff('Bricolage Grotesque','bricolage-grotesque/files/bricolage-grotesque-latin-400-normal.woff2',400),
 ff('Bricolage Grotesque','bricolage-grotesque/files/bricolage-grotesque-latin-600-normal.woff2',600),
 ff('Bricolage Grotesque','bricolage-grotesque/files/bricolage-grotesque-latin-700-normal.woff2',700),
 ff('Bricolage Grotesque','bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff2',800),
 ff('Source Serif 4','source-serif-4/files/source-serif-4-latin-400-normal.woff2',400),
 ff('Source Serif 4','source-serif-4/files/source-serif-4-latin-600-normal.woff2',600),
 ff('Source Serif 4','source-serif-4/files/source-serif-4-latin-400-italic.woff2',400,'italic'),
 ff('IBM Plex Mono','ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2',400),
 ff('IBM Plex Mono','ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2',500),
 ff('Noto Sans Ethiopic','noto-sans-ethiopic/files/noto-sans-ethiopic-ethiopic-400-normal.woff2',400),
 ff('Noto Sans Tifinagh','noto-sans-tifinagh/files/noto-sans-tifinagh-tifinagh-400-normal.woff2',400),
 ff('Atkinson Hyperlegible','atkinson-hyperlegible/files/atkinson-hyperlegible-latin-400-normal.woff2',400),
 ff('Atkinson Hyperlegible','atkinson-hyperlegible/files/atkinson-hyperlegible-latin-700-normal.woff2',700)].join('\n');
export {FONTCSS};
let html=readFileSync('bhm-2026-hub.html','utf8');
if(NEG){ // injected defects: each must be caught
  html=html.replace('"Honouring Our Communities",year','"Honouring Our Community",year') // C01 theme mismatch
           .replace('src:"S13",place:"westminster"','src:"S99",place:"westminster"') // C02
           .replace('<tspan x="24" y="304">Communities</tspan>','<tspan x="24" y="304">Communities Communities</tspan>')
           .replace('<text x="28" y="520" font-family="${FB}" font-size="13" fill="${P.mute}">Our commitments','<text x="28" y="96" font-size="30">Overlap</text><text x="28" y="520" font-family="${FB}" font-size="13" fill="${P.mute}">Our commitments');
  html=html.replace('To give feedback or report an error, leave a comment on this page.','Write to test.person@example.gov.uk'); // C13 email
  html=html.replace('const cont=[["Africa",18,8],','const cont=[["Africa",18,8],["Africa again",18,8],'); // D-006 label collision
  html=html.replace('{k:"chart",l:"Chart",ic:"bars",render:worldChart},{k:"table",l:"Table",ic:"table",render:worldTable}','{k:"chart",l:"Chart",ic:"bars",render:worldChart}'); // D-010 map without table view
  html=html.replace('const t=$("#drawerToggle");if(t&&t.closest(".mast")){','const t=$("#drawerToggle");if(false){'); // D-011 toggle left in masthead
  html=html.replace('BRAND_COLOURS.forEach(c=>{if(c[0]==="Ochre red"','BRAND_COLOURS.forEach(c=>{if(c[0]==="Nothing"'); // D-019 contrast regression
  html=html.replace('.afwrap,.mapwrap{grid-template-columns:1fr!important}','.afwrap{grid-template-columns:320px 1fr!important}'); // D-020 narrow map
  html=html.replace('function clubQuestions(item){const qs=[...CLUB_BASE_Q.slice(0,2)];','function clubQuestions(item){return [];const qs=[...CLUB_BASE_Q.slice(0,2)];'); // D-022 guides missing
  html=html.replace('if(t.dataset.smart||t.closest(".tskip,[role=grid]")||t.matches(".cal"))return;','return;'); // D-025 tables not enhanced
  html=html.replace('const d=new Date(y,m,Math.min(day,last));const k=iso(d);','const d=new Date(y,m,day);const k=d.toISOString().slice(0,10);'); // D-032 club dates in UTC and overflowing months
  html=html.replace('function _colNumeric(rows,i){','function _colNumeric(rows,i){return true;'); // D-033 mixed columns sorted as numbers
  html=html.replace('q:`${_noTitle(i.d,i.t)} (${i.y})`','q:`${i.t}: ${i.d} (${i.y})`'); // D-034 clue gives away the title
  html=html.replace('const ideaKey=i=>`${i.by}:${i.id}`;','const ideaKey=i=>i.id;'); // D-035 votes not keyed by person
  html=html.replace('function fixBenchRefs(){let n=0;','function fixBenchRefs(){return 0;let n=0;'); // D-036 raw IDs shown
  html=html.replace('["renderClub","renderCulture","renderLives","renderInter","renderEquity",','["renderClub","renderCulture","renderLives","renderInter",'); // D-037 focus lost on re-render
  html=html.replace('<li>Ideas box: titles and details','<li>Ideas: titles and details'); // D-038 privacy notice gap
  html=html.replace('function v23Boot(){fixCounts();','function v23Boot(){'); // D-039 stated poster count wrong
  html=html.replace('function v28Boot(){renderGlance()}','function v28Boot(){}'); // D-059 no summaries on long pages
  html=html.replace('function warmAll26(){window.__warm=true;warm26();','function warmAll26(){window.__warm=true;'); // D-076 deferred pages never drawn
  html=html.replace('window.__gaps27=done;return done}','window.__gaps27=done.slice(0,2);return done}'); // D-077 verified additions not placed
  html=html.replace('Britain abolished its trade in enslaved Africans in 1807','Britain abolished the trade in slaves in 1807, freeing the slaves'); // D-078 a listed term back in the hub's own words
  html=html.replace('const LANG_MUST_DEBATE=["people of colour",','const LANG_MUST_DEBATE=["people of colour","non-white",'); // D-079 a contested term presented as settled
  html=html.replace('<p>Records list the slaves held there.</p>','<p>“Records list the slaves held there.”</p>'); // D-080 the lint's own planted test can no longer catch anything
  html=html.replace('{s:"borders",h:"Partitioned peoples",n:"231 of 834"','{s:"borders",h:"Partitioned peoples",n:"3,000 tribes"'); // D-084 a headline number not in its source
  html=html.replace('const PP_TIME=[','const PP_TIME=[{y:"1964",t:"Out of place",src:[]},'); // D-082 and D-081 an undated-order, unsourced event
  html=html.replace('c.ppbal={counter:b.filter(p=>/did not draw|not all borders/i','c.ppbal={counter:b.filter(p=>/zzz/i'); // D-083 counter-view lost
  html=html.replace('const PP_ISL_XY={"Madagascar":[46.9,-19],','const PP_ISL_XY={'); // D-086 an island missing from the map
  html=html.replace('const GN_TIME=[','const GN_TIME=[{y:"2030",t:"Out of order",src:[]},'); // D-087 unsourced, out-of-order genome event
  html=html.replace('Carrying one copy (sickle cell trait)','As a race-linked disease, carrying one copy (sickle cell trait)'); // D-088 a finding framed as racial
  html=html.replace('{k:"C",h:"Later estimates",n:"2%"','{k:"C",h:"Later estimates",n:"20%"'); // D-089 headline number not in its source
  html=html.replace('applyGaps3();','window.__gaps3=[];'); // D-090 gaps not placed
  html=html.replace('function v36Boot(){addRoots();','function v36Boot(){return;addRoots();').replace('try{addRoots()}catch(e){}const rg=','const rg='); // D-091 roots links missing
  html=html.replace('const _ldExtraBase=ldExtra;ldExtra=function(base){','const _ldExtraBase=ldExtra;const _ldOff=function(base){'); // D-092 declared datasets not exported
  html=html.replace('const PP={','const PP={leak:{k:"leak",h:"x",intro:"This page was not opened today.",points:[]},'); // D-085 a working note reaches the page
  html=html.replace('disputed:true,dn:"','disputed:true,dn:"",dnx:"'); // D-066 a debated claim without its note
  html=html.replace('["calendar","#v-calendar .related",','["calendar","#no-such-element",'); // D-061 a tour step points at nothing
  html=html.split('b.focus({preventScroll:true});b.click();').join('b.focus();b.click();').split('window.scrollTo({left:sx,top:sy,behavior:"instant"});').join(''); // D-055 a probe scrolls the page and leaves it there
  html=html.replace('function renderIdeaBox(){const box=$("#idList")','function renderIdeas(){const box=$("#idList")'); // D-040 duplicate function name replaces the toolkit's
  html=html.replace('function v26Boot(){','function v26Boot(){throw new Error("injected");'); // D-041 a start-up step fails
  html=html.replace('{g:"Lead",items:["leaders",','{g:"Lead",items:["theme","history","africa","diaspora","leaders",'); // D-042 overfull, duplicated menus
  html=html.replace('function addRelated(){','function addRelated(){return;'); // D-044 no related pages
  html=html.split('$$(".view h3").forEach(h=>{const a=h.closest("[id]");if(a)add(').join('$$(".nothing").forEach(h=>{const a=h.closest("[id]");if(a)add('); // D-045 headings not searchable (split/join: "$$" is special in replace)
  html=html.replace('const _fixedSummaries=fixSourceSummaries();','const _fixedSummaries=0;'); // D-046 placeholder source summaries
  html=html.replace('c.ctxMs=Math.round(performance.now()-_t0);','c.ctxMs=Math.round(performance.now()-_t0)+20000;'); // D-048 slow evidence gathering (simulated delay on the measured value, not a real busy-wait, to keep the run short)
  html=html.replace('window.__rcPatched=true;addEventListener("hashchange",()=>{clearTimeout(window.__rcT);','addEventListener("hashchange",()=>{runChecks(true);clearTimeout(window.__rcT);'); // D-047 checks re-run on every page change
  html=html.replace('return `<details class="dvtable">','return `<div class="dvtable">'); // D-026 charts without table view
  html=html.replace('const ok=b.dataset.o===q.a;','const ok=false;'); // D-027 quiz never scores
  html=html.replace(',ed:true,src:[]',',src:[]'); // D-093 a hub note loses its label and becomes an unsourced point
  html=html.replace('text:"Being in Education','text:"About 50% of young people are Being in Education'); // D-094 a hub note smuggles in a figure
  html=html.replace('n:"2.4 million"','n:"2.5 million"'); // D-094 headline number not in its sourced point
  html=html.replace('["care","Care experience",/\\b(care leavers?','["care","Care experience",/(care|care leavers?'); // D-095 a loose keyword rule
  html=html.replace('refs:["bk-','refs:["bk-missing-point","bk-'); // D-096 suggestion linked to a point that does not exist
  html=html.replace('level:"Cabinet ministers",order:8,black:""','level:"Cabinet ministers",order:8,black:"3%"'); // D-099 an unconfirmed level shown with a number
  html=html.replace('replace(/\\bequity (finance|investment|release|stake|funding|crowdfunding)\\b/gi,"capital")','replace(/x^/g,"")'); // D-100 finance word read as equity
  html=html.replace('{t:"In 2021, 2.4 million people','{t:"In 2021, 2.6 million people'); // D-101 a summary number drifts from its evidence
  html=html.replace('_qa(root,".lpcard").forEach','$$$$(".lpcard").forEach'); // D-103 a filter scoped to the whole document
  html=html.replace('.more-menu{max-height:calc(100dvh - 90px);overflow-y:auto;','.more-menu{'); // D-102 the menu cannot scroll
  html=html.replace('.sr,.vh{left:0;top:0}',''); // D-106 hidden text not anchored
  html=html.replace('function citedIn(root){const ids=new Set();root.querySelectorAll(".tag, a[data-src]").forEach(t=>{const m=(t.dataset.src||t.textContent).match(/\\bS\\d{1,5}\\b/g)','function citedIn(root){const ids=new Set();root.querySelectorAll(".tag, a[data-src]").forEach(t=>{const m=(t.dataset.src||t.textContent).match(/\\bS\\d{1,3}\\b/g)'); // D-108 source pattern stops at S999
  html=html.replace('const WORLD_EV=[','const WORLD_EV=[{id:"neg-x",region:"europe",place:"",ys:1,ye:1,y:"AD 1",domain:"maths",also:[],t:"Unsourced test event",text:"In 2021, 2.4 million people in England and Wales (4.0%) identified as Black: 1.49 million Black African (2.5%), 623,000 Black Caribbean (1.0%) and 298,000 Other Black (0.5%).",disputed:false,note:"",src:[]},'); // D-104 unsourced event; D-105 repeats a passage from another page
  html=html.replace('Black judges remained at 1% of all','Black judges remained at 7% of all'); // D-110 a summary number on an older page drifts from its evidence
  html=html.replace('const PK={','const PK={negv:{"vant":[{"who":"x","ic":"heart","items":[{"t":"x","refs":["no-such-element"]}]}]},'); // D-111 a vantage point linked to nothing, and too few of them
  html=html.replace('const XL=[','const XL=[{"a":"ls-groups","b":"no-such-section","why":"x"},'); // D-112 a cross-page link to a section that does not exist
  html=html.replace('Object.entries(PK).forEach(([id,P])=>{const v=pkEl("v-"+id);if(!v||v.dataset.pk)return;','Object.entries(PK).forEach(([id,P])=>{const v=pkEl("v-"+id);if(!v||v.dataset.pk||id==="food")return;'); // D-113 a content page left without its summary and vantage points
  html=html.replace('const WORLD_EV=[','const WORLD_EV=[{id:"neg-y",region:"europe",place:"",ys:2,ye:2,y:"AD 2",domain:"trade",also:[],t:"Half-repeated test event",text:"UNESCO calls Aksum the most powerful state between the Eastern and Western worlds of its long era, it seems to some.",disputed:false,note:"",src:[]},'); // D-114 new content repeats half of an existing passage
  html=html.replace('prov:"Imperial Evidence Ledger"',"prov:\"From the user's pay work — chat 'an example title'\""); // D-115 a private note reaches the page
  html=html.replace('covers:["half-caste"]','covers:[]'); // D-116 a historical term kept in a quotation loses its explanation
  html=html.replace('const GC_FLOOR={"Latin America":3,','const GC_FLOOR={"Latin America":60,'); // D-119 a region falls below its coverage floor
  html=html.replace('<tr><th scope="row"><a href="#aw-ukhonours-new-year-honours-2025-black-recipients-3"','<tr><th scope="row"><a href="#aw-honours-no-such-point"'); // D-121 a summary row loses its sourced point
  html=html.replace("<p>Award details were checked against each organiser's public page.</p>","<p>Award details were checked against each organiser's public page (portal advice).</p>"); // D-122 a private project is credited again
  html=html.replace('h:"Self-identification",text:"','h:"Self-identification",text:"Write to team@example.gov.uk. '); // D-097 contact details on a public page
  html=html.replace('if(c){c.querySelector("h3").textContent=i.t;','if(c){c.querySelector("h3").innerHTML=i.t;'); // D-031 user text rendered as markup
  html=html.replace('function showTip2(el){clearTimeout(tip2Hide);','function showTip2(el){return;clearTimeout(tip2Hide);'); // D-029 tooltips never show
  html=html.replace('function renderResearch(){','function renderResearch(){throw new Error("injected");'); // D-028 a start-up step fails: checks must still run, the failure must be reported
  html=html.replace('if(n&&n%cols)bad.push(','if(n&&n%cols||g.id==="factTiles")bad.push('); // D-012 grid gap
  html=html.replace('if(!/^#[\\w-]+$/.test(h))throw new Error("Use a # link");','');  // D-014 unsafe navigate allowed
}
const page0=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}body{margin:0;font:14px system-ui}img{max-width:100%}[hidden]{display:none!important}</style></head><body>${html}</body></html>`;
mkdirSync('out',{recursive:true});writeFileSync('out/test-page.html',page0);
const browser=await chromium.launch();
const AXE=readFileSync(SP+'/node_modules/axe-core/axe.min.js','utf8');
const results=[];const fail=(n,d)=>results.push({ok:false,n,d}),pass=(n,d)=>results.push({ok:true,n,d});
async function mk(width,scheme,reduced){
  const ctx=await browser.newContext({viewport:{width,height:900},colorScheme:scheme,reducedMotion:reduced?'reduce':'no-preference'});
  await ctx.route('**/*',async r=>{const u=r.request().url();
    if(u.includes('qrcodejs'))return r.fulfill({contentType:'application/javascript',body:readFileSync(SP+'/cdn/qrcode.min.js'),headers:{'Access-Control-Allow-Origin':'*'}});
    if(u.includes('jsbarcode'))return r.fulfill({contentType:'application/javascript',body:readFileSync(SP+'/cdn/JsBarcode.all.min.js'),headers:{'Access-Control-Allow-Origin':'*'}});
    if(u.includes('fonts.googleapis'))return r.fulfill({contentType:'text/css',body:FONTCSS});
    if(u.startsWith('file:'))return r.continue();
    return r.abort();});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push(m.text())});
  await p.goto('file://'+process.cwd()+'/out/test-page.html');await p.waitForFunction(()=>window.__selfcheck);await p.waitForTimeout(400);
  return {p,ctx,errs};
}
let VIEWS=null;
/* TEST_CFG=1280light,390dark runs a subset, so long suites fit within a time limit; results files are suffixed */
const CFG=(process.env.TEST_CFG||'').split(',').filter(Boolean);
for(const [w,scheme] of [[1280,'light'],[1280,'dark'],[390,'light'],[390,'dark']].filter(([w,s])=>!CFG.length||CFG.includes(w+s))){
  const {p,ctx,errs}=await mk(w,scheme,w===390);
  if(!VIEWS)VIEWS=await p.evaluate(()=>VIEWS.map(v=>v[0]));
  const sc=await p.evaluate(()=>window.__selfcheck);
  const tag=`${w}px ${scheme}`;
  sc.pass===sc.total?pass(`In-page self-checks ${tag}`,`${sc.pass}/${sc.total}`):fail(`In-page self-checks ${tag}`,JSON.stringify(sc.rows.filter(r=>!r.ok)));
  sc.proven===sc.total?pass(`Negative tests prove checks ${tag}`,`${sc.proven}/${sc.total}`):fail(`Negative tests ${tag}`,JSON.stringify(sc.rows.filter(r=>!r.proven)));
  for(const v of VIEWS){await p.evaluate(v=>{location.hash=v},v);await p.waitForTimeout(150);
    const o=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,iw:innerWidth,vis:[...document.querySelectorAll('.view')].filter(x=>!x.hidden).map(x=>x.id),nav:document.querySelector('#gnav').scrollWidth-document.querySelector('#gnav').clientWidth,drawer:[...document.querySelectorAll('#drawerBody a')].length}));
    (o.sw<=o.iw)?0:fail(`No horizontal scroll ${tag} #${v}`,`${o.sw}>${o.iw}`);
    (o.vis.length===1&&o.vis[0]==='v-'+v)?0:fail(`Routing ${tag} #${v}`,o.vis.join());
    (o.nav<=1)?0:fail(`Nav fits ${tag} #${v}`,o.nav);
    (o.drawer>0)?0:fail(`Drawer populated ${tag} #${v}`,o.drawer);
  }
  // D-006 and D-007 (driver map labels collided): map and chart labels must not overlap in the rendered page (real text boxes, not estimates)
  for(const [v,sel] of [['diaspora','#worldSvg .wlbl, #worldSvg .clbl, #worldSvg .olbl'],['history','#pins>text'],['futures','#driverMap text'],['africa','#afSvg text']]){await p.evaluate(v=>{location.hash=v},v);await p.waitForTimeout(250);
    const ov=await p.evaluate(sel=>{const els=[...document.querySelectorAll(sel)].filter(e=>getComputedStyle(e).display!=='none');const bx=els.map(e=>({t:e.textContent,b:e.getBoundingClientRect()}));const bad=[];for(let i=0;i<bx.length;i++)for(let j=i+1;j<bx.length;j++){const A=bx[i].b,B=bx[j].b;const ix=Math.min(A.right,B.right)-Math.max(A.left,B.left),iy=Math.min(A.bottom,B.bottom)-Math.max(A.top,B.top);if(ix>1&&iy>1)bad.push(bx[i].t+' / '+bx[j].t)}return {n:els.length,bad}},sel);
    ov.bad.length?fail(`Map labels do not overlap ${tag} #${v}`,ov.bad.slice(0,6).join('; ')):pass(`Map labels do not overlap ${tag} #${v}`,`${ov.n} labels`);}
  // D-008: chart and map text must stay inside its frame (screen coordinates, so group transforms count)
  for(const [v,svg] of [['africa','#afSvg'],['futures','#driverMap'],['futures','#scenSvg'],['futures','#threeH'],['diaspora','#worldSvg'],['diaspora','#popChart'],['history','#mapSvg'],['history','#arcSvg']]){await p.evaluate(v=>{location.hash=v},v);await p.waitForTimeout(150);
    const out=await p.evaluate(sel=>{const s=document.querySelector(sel);const R=s.getBoundingClientRect();const bad=[];s.querySelectorAll('text').forEach(t=>{if(getComputedStyle(t).display==='none')return;const b=t.getBoundingClientRect();if(b.width===0)return;if(b.left<R.left-1||b.right>R.right+1||b.top<R.top-1||b.bottom>R.bottom+1)bad.push(t.textContent.slice(0,20))});return bad},svg);
    out.length?fail(`Text inside frame ${tag} ${svg}`,out.join(' | ')):0;}
  // D-009 (updated 2.13.2): the hub is credited only as made in a personal capacity, with no personal or professional details; first goal must not read "plural, global and British"
  if(w===1280&&scheme==='light'){const c=await p.evaluate(()=>({bio:document.querySelector('#ab-author').textContent,href:!!document.querySelector('#ab-author a[href="https://github.com/co-cddo/ukgov-metadata-exchange-model"]'),goal:PURPOSE.goals[0]}));
    (/made in a personal capacity/i.test(c.bio)&&!c.href&&!/\b(He|She) is\b|Metadata|Interoperability|Head of|born in/i.test(c.bio))?pass('Author note wording','made in a personal capacity; no personal or professional details (2.13.2)'):fail('Author note wording',c.bio.slice(0,120));
    (/multilingual/.test(c.goal)&&!/global and British/.test(c.goal))?pass('First goal wording',c.goal):fail('First goal wording',c.goal);}
  // ---- v1.5 functional tests (D-010 to D-016) ----
  // D-010: maps must zoom and pan by button and keyboard, and every alternative view must render with data
  {await p.evaluate(()=>{location.hash='diaspora'});await p.waitForTimeout(200);
   const m=await p.evaluate(async()=>{const vb0=document.querySelector('#worldSvg').getAttribute('viewBox');document.querySelector('#mb-world [data-z="in"]').click();const vb1=document.querySelector('#worldSvg').getAttribute('viewBox');
     const s=document.querySelector('#worldSvg');s.focus();s.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));const vb2=s.getAttribute('viewBox');document.querySelector('#mb-world [data-z="reset"]').click();
     const out={zoom:vb0!==vb1,key:vb1!==vb2,reset:s.getAttribute('viewBox')===vb0,views:{}};
     for(const [id,k,sel] of [['world','table','#alt-world tbody tr'],['world','globe','#globeSvg .dpin'],['world','regions','#alt-world .ptile'],['world','chart','#alt-world rect'],['africa','tiles','#alt-africa .aftile'],['africa','table','#alt-africa tbody tr'],['africa','chart','#alt-africa rect'],['uk','time','#alt-uk circle'],['uk','nations','#alt-uk .uktile'],['uk','table','#alt-uk tbody tr']]){MAPS[id].setView(k);out.views[id+':'+k]=document.querySelectorAll(sel).length}
     MAPS.africa.setView('heat');out.views['africa:heat']=[...document.querySelectorAll('#afSvg .af')].filter(p=>p.style.fill).length;MAPS.africa.setView('map');
     MAPS.world.setView('globe');const n0=window.__globe.n;document.querySelector('[data-c="120,0"]').click();const n1=window.__globe.n;out.globeTurns=window.__globe.c.lon===120;out.globeChange=n0!==n1;
     ['world','africa','uk'].forEach(i=>MAPS[i].setView(MAPS[i].cfg.views[0].k));out.expect={world:DIASPORA.length,af:WORLD.countries.filter(c=>c.r).length,uk:PLACES.length};return out});
   const vbad=Object.entries(m.views).filter(([k,v])=>!v);const rows=m.views['world:table']===m.expect.world&&m.views['africa:table']===m.expect.af&&m.views['uk:table']===m.expect.uk;
   (m.zoom&&m.key&&m.reset&&!vbad.length&&rows&&m.globeTurns)?pass(`Interactive maps ${tag}`,`zoom, keyboard pan, reset, ${Object.keys(m.views).length} views, tables complete, globe turns`):fail(`Interactive maps ${tag}`,JSON.stringify(m));}
  // D-011: the masthead shows the logo; the drawer toggle sits outside it, is visible and works
  {await p.evaluate(()=>{location.hash='history'});await p.waitForTimeout(200);
   const t=await p.evaluate(()=>{const b=document.querySelector('#drawerToggle');const r=b.getBoundingClientRect();const m=document.querySelector('.mast').getBoundingClientRect();const before=document.querySelector('#shell').classList.contains('closed');b.click();const after=document.querySelector('#shell').classList.contains('closed');b.click();
     return{inMast:!!b.closest('.mast'),vis:r.width>20&&r.height>20&&r.right<=innerWidth&&r.bottom<=innerHeight,overlapsMast:r.top<m.bottom-1,toggles:before!==after,logo:!!document.querySelector('.mast #mastLogo svg'),fav:(document.querySelector('link[rel="icon"]')||{}).href||''}});
   (!t.inMast&&t.vis&&!t.overlapsMast&&t.toggles&&t.logo&&t.fav.startsWith('data:image/svg'))?pass(`Logo, favicon and drawer toggle ${tag}`,'toggle at the drawer edge, works'):fail(`Logo, favicon and drawer toggle ${tag}`,JSON.stringify(t));}
  // D-012: no card grid ends with a gap, on every page
  {const gaps=[];for(const v of VIEWS){await p.evaluate(v=>{location.hash=v},v);await p.waitForTimeout(160);const g=await p.evaluate(()=>{fillGaps();return gridsComplete()});if(g.length)gaps.push(v+':'+g.join(','))}
   gaps.length?fail(`Grids filled ${tag}`,gaps.join(' ')):pass(`Grids filled ${tag}`,`${VIEWS.length} pages, no gaps`);}
  // D-013: AI assistant opens, falls back to search when AI is not available, and closes with Escape
  {await p.evaluate(()=>{location.hash='overview'});const a=await p.evaluate(async()=>{document.querySelector('#aiBtn').click();const open=!document.querySelector('#aiDlg').hidden;await new Promise(r=>setTimeout(r,50));document.querySelector('#aiQ').value='Windrush';document.querySelector('#aiAsk').click();await new Promise(r=>setTimeout(r,100));const res=document.querySelectorAll('#aiOut .sres').length;
     document.querySelector('#aiDlg').dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));return{open,res,closed:document.querySelector('#aiDlg').hidden,skills:document.querySelectorAll('#aiSkills .chip').length,spec:(document.querySelector('#aiSpec')||{}).textContent.length||0}});
   (a.open&&a.res>0&&a.closed&&a.skills>=5&&a.spec>500)?pass(`AI assistant ${tag}`,`${a.skills} skills, fallback found ${a.res} results`):fail(`AI assistant ${tag}`,JSON.stringify(a));}
  // D-014: agentic tools act on the page and can be undone
  if(w===1280){const g=await p.evaluate(async()=>{const T=n=>AI_TOOLS.find(t=>t.name===n);const before=document.querySelector('#pTitle').value;T('fill_poster').execute({title:'Test lunch'});const filled=document.querySelector('#pTitle').value;const undo=document.querySelector('#aiLog [data-undo]');if(undo)undo.click();const restored=document.querySelector('#pTitle').value===before;
     const r=T('search_hub').execute({q:'Windrush'}).length;const nets=T('filter_networks').execute({nation:'Wales'}).length;document.querySelector('#nwNation').value='all';renderNetworks();let threw=false;try{T('navigate').execute({href:'javascript:alert(1)'})}catch(e){threw=true}return{filled:filled==='Test lunch',restored,r,nets,threw}});
   (g.filled&&g.restored&&g.r>0&&g.nets>0&&g.threw)?pass(`AI page tools ${tag}`,`fill and undo, search ${g.r}, Wales networks ${g.nets}, unsafe link refused`):fail(`AI page tools ${tag}`,JSON.stringify(g));}
  // D-015: every page that cites sources has a matching bibliography, and myths/schemes trace into the lineage
  {const b=await p.evaluate(()=>{const r=VIEWS.filter(([id])=>id!=='assurance').map(([id])=>{const v=document.querySelector('#v-'+id);return{id,c:citedIn(v).length,l:document.querySelectorAll('#'+id+'-sources li').length}});return{bad:r.filter(x=>x.c!==x.l),pages:r.filter(x=>x.c).length,refs:r.reduce((a,x)=>a+x.l,0),lin:window.__lineage}});
   (!b.bad.length&&b.lin&&b.lin.bad===0&&b.lin.sumTier===b.lin.items)?pass(`Bibliographies and lineage ${tag}`,`${b.pages} pages, ${b.refs} references; ${b.lin.items} items traced`):fail(`Bibliographies and lineage ${tag}`,JSON.stringify(b));}
  // D-016: new text in diagrams must stay inside its frame
  for(const [v,svg] of [['involve','#collabSvg'],['knowledge','#linSvg']]){await p.evaluate(v=>{location.hash=v},v);await p.waitForTimeout(200);
    const out=await p.evaluate(sel=>{const s=document.querySelector(sel);const R=s.getBoundingClientRect();const bad=[];s.querySelectorAll('text').forEach(t=>{const b=t.getBoundingClientRect();if(!b.width)return;if(b.left<R.left-1||b.right>R.right+1||b.top<R.top-1||b.bottom>R.bottom+1)bad.push(t.textContent.slice(0,20))});return bad},svg);
    out.length?fail(`Text inside frame ${tag} ${svg}`,out.join(' | ')):0;}
  // D-018: hidden dialogs and panels must stay hidden even without the host page's CSS reset
  if(w===1280&&scheme==='light'){const h=await p.evaluate(()=>{const st=[...document.querySelectorAll('style')].map(s=>s.textContent).join('');return{own:/(^|\})\[hidden\]\{display:none!important\}/.test(st.replace(/\s/g,'')),dlg:getComputedStyle(document.querySelector('#aiDlg')).display}});
   (h.own&&h.dlg==='none')?pass('Hidden stays hidden','page carries its own [hidden] rule'):fail('Hidden stays hidden',JSON.stringify(h));}
  // D-020: maps must use the full content width (project preference)
  {const mw=[];for(const [v,s] of [['diaspora','#worldSvg'],['africa','#afSvg'],['history','#mapSvg']]){await p.evaluate(v=>{location.hash=v},v);await p.waitForTimeout(150);mw.push(await p.evaluate(([v,s])=>{const r=document.querySelector(s).getBoundingClientRect(),V=document.querySelector('#v-'+v).getBoundingClientRect();return [v,r.width/V.width]},[v,s]))}
   const bad=mw.filter(([v,r])=>r<0.9);bad.length?fail(`Maps full width ${tag}`,bad.map(([v,r])=>v+' '+(r*100).toFixed(0)+'%').join(', ')):pass(`Maps full width ${tag}`,mw.map(([v,r])=>v+' '+(r*100).toFixed(0)+'%').join(', '));}
  // D-022: club filters, guides and local voting work without shared storage
  {await p.evaluate(()=>{location.hash='club'});await p.waitForTimeout(200);
   const k=await p.evaluate(async()=>{const all=document.querySelectorAll('#clubList .clubcard').length;document.querySelector('#clubChips [data-k="film"]').click();const films=[...document.querySelectorAll('#clubList .clubcard')].filter(c=>!c.hidden).length;document.querySelector('#clubChips [data-k="all"]').click();
     const g=document.querySelector('#clubList .clubcard .guide');g.open=true;const qn=g.querySelectorAll('ol li').length;const vb=document.querySelector('#clubList [data-vote]');const id=vb.dataset.vote;vb.click();await new Promise(r=>setTimeout(r,150));const after=document.querySelector(`#clubList [data-vote="${id}"]`).getAttribute('aria-pressed');
     document.querySelector(`#clubList [data-vote="${id}"]`).click();await new Promise(r=>setTimeout(r,150));document.querySelector('#clubStart').value='2026-11-05';document.querySelector('#clubPlanBtn').click();return{all,films,qn,after,plan:window.__clubPlan||0,shared:(window.__club||{}).shared}});
   (k.all>=18&&k.films>0&&k.films<k.all&&k.qn>=4&&k.after==='true'&&k.plan===4&&k.shared===false)?pass(`Book and film club ${tag}`,`${k.all} picks, film filter ${k.films}, ${k.qn} questions, local vote and 4-meeting plan`):fail(`Book and film club ${tag}`,JSON.stringify(k));}
  // D-025: tables sort, filter and group; cards switch to a list
  {await p.evaluate(()=>{location.hash='lives'});await p.waitForTimeout(400);
   const k=await p.evaluate(async()=>{const t=document.querySelector('#lsTable table');if(!t||!t.dataset.smart)return{smart:false};const bar=t.closest('.tablewrap').previousElementSibling;const col=[...t.tHead.rows[0].cells].findIndex(c=>/Figure/.test(c.textContent));
     t.querySelectorAll('button.thsort')[0].click();const asc=t.tHead.rows[0].cells[0].getAttribute('aria-sort');const g=bar.querySelector('.tg');g.value=g.options[1].value;g.dispatchEvent(new Event('change'));const grp=t.querySelectorAll('tr.grp').length;
     const q=bar.querySelector('.tq');q.value='zzzz-no-match';q.dispatchEvent(new Event('input'));const none=[...t.tBodies[0].rows].filter(r=>!r.classList.contains('grp')&&!r.hidden).length;q.value='';q.dispatchEvent(new Event('input'));g.value='-1';g.dispatchEvent(new Event('change'));
     const lb=document.querySelector('#v-lives .vtbar .vtb[data-m="list"]');lb.click();const list=document.querySelector('#v-lives .grid').classList.contains('as-list');document.querySelector('#v-lives .vtbar .vtb[data-m="cards"]').click();
     return{smart:true,asc,grp,none,list}});
   (k.smart&&k.asc==='ascending'&&k.grp>=2&&k.none===0&&k.list)?pass(`Tables and list view ${tag}`,`sort, ${k.grp} groups, filter and list view work`):fail(`Tables and list view ${tag}`,JSON.stringify(k));}
  // D-026: dashboards draw every chart with a table view
  {await p.evaluate(()=>{location.hash='dash'});await p.waitForTimeout(400);
   const k=await p.evaluate(()=>{const f=[...document.querySelectorAll('#v-dash figure.dvfig')];return{figs:f.length,tables:f.filter(x=>x.querySelector('details.dvtable table, table.heat')).length,bars:document.querySelectorAll('#v-dash figure svg rect').length}});
   (k.figs>=8&&k.tables===k.figs&&k.bars>20)?pass(`Dashboards ${tag}`,`${k.figs} charts with table views, ${k.bars} marks`):fail(`Dashboards ${tag}`,JSON.stringify(k));}
  // D-027: a full quiz round scores correctly; timeline and match-up respond
  {await p.evaluate(()=>{location.hash='learn'});await p.waitForTimeout(300);
   const k=await p.evaluate(()=>{document.querySelector('#qzN').value='5';document.querySelector('#qzStart').click();let n=0;for(let i=0;i<5;i++){const q=GAME.set[GAME.i];const o=[...document.querySelectorAll('#qzBox .qzo')].find(b=>b.dataset.o===q.a);if(!o)break;o.click();n++;document.querySelector('#qzNext').click()}
     const tl=document.querySelectorAll('#tlBox .tlitem').length;document.querySelector('#tlCheck').click();const checked=!!document.querySelector('#tlBox .tlok, #tlBox .tlbad');const mp=document.querySelector('#muBox .mup');mp.click();const pressed=document.querySelector('#muBox .mup[aria-pressed="true"]')!==null;
     return{n,score:GAME.scores[0],done:!!(window.__quiz&&window.__quiz.done),tl,checked,pressed,bingo:document.querySelectorAll('#bgBox .bgcell .bgtick').length}});
   (k.n===5&&k.score===5&&k.done&&k.tl===5&&k.checked&&k.pressed&&k.bingo===16)?pass(`Games ${tag}`,'quiz scores 5 of 5, timeline checks, match-up selects, bingo has 16 squares'):fail(`Games ${tag}`,JSON.stringify(k));}
  // D-028: one failing start-up step must not stop the rest of the page or the self-checks
  {const k=await p.evaluate(()=>({checks:!!(window.__selfcheck&&window.__selfcheck.total),boot:(window.__bootErrors||[]).length}));
   (k.checks&&k.boot===0)?pass(`Start-up isolation ${tag}`,'every start-up step ran; self-checks present'):fail(`Start-up isolation ${tag}`,JSON.stringify(k));}
  // D-029: knowledge graph modes and focus; tooltips by focus and Escape; tab sets sharing one panel
  {await p.evaluate(()=>{location.hash='knowledge'});await p.waitForTimeout(200);
   const k=await p.evaluate(async()=>{document.querySelector('#tab-graph').click();await new Promise(r=>setTimeout(r,300));const q=document.querySelector('#kgQ');q.value='Walter Tull';q.dispatchEvent(new Event('input'));const hit=document.querySelector('#kgHits [data-go]');if(!hit)return{hit:false};hit.click();await new Promise(r=>setTimeout(r,200));
     const focus=window.__kg.focus;const det=document.querySelector('#kgDetails h3')?.textContent;const modes={};for(const m of ['radial','matrix','outline','table','network']){document.querySelector('#kgm-'+m).click();await new Promise(r=>setTimeout(r,150));modes[m]=document.querySelector('#kgCanvas').children.length>0}
     location.hash='equity';await new Promise(r=>setTimeout(r,400));const tag=[...document.querySelectorAll('#v-equity a.tag.src')].find(t=>t.offsetParent!==null);tag.focus();await new Promise(r=>setTimeout(r,50));const shown=!!document.querySelector('#tip2');document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));const gone=!document.querySelector('#tip2');
     location.hash='talent';await new Promise(r=>setTimeout(r,150));document.querySelector('#lfTabFund').click();document.querySelector('#lfTabLead').click();const panel=!document.querySelector('#lfPanel').hidden;
     return{hit:true,focus,det,modes,shown,gone,panel}});
   (k.hit&&/cu-tull/.test(k.focus)&&k.det==='Walter Tull'&&Object.values(k.modes).every(Boolean)&&k.shown&&k.gone&&k.panel)?pass(`Graph, tooltips and tabs ${tag}`,'focus, details, five modes, tooltip shows on focus and closes with Escape, shared panel stays visible'):fail(`Graph, tooltips and tabs ${tag}`,JSON.stringify(k));}
  // D-040/D-047: toolkit ideas render; page changes do not re-run every check; related pages and h1 on each page
  {await p.evaluate(()=>{location.hash='toolkit'});await p.waitForTimeout(300);
   const k=await p.evaluate(async()=>{const ideas=document.querySelectorAll('#ideas > .card').length;let n=0;const f=window.runChecks;window.runChecks=function(...a){n++;return f.apply(this,a)};
     location.hash='calendar';await new Promise(r=>setTimeout(r,300));location.hash='toolkit';await new Promise(r=>setTimeout(r,300));window.runChecks=f;
     const h1=[...document.querySelectorAll('.view')].filter(v=>v.querySelectorAll('h1').length!==1).map(v=>v.id);const rel=document.querySelectorAll('#v-toolkit .related a').length;return{ideas,n,h1,rel,title:document.title}});
   (k.ideas>0&&k.n===0&&!k.h1.length&&k.rel>0&&/Organiser toolkit/.test(k.title))?pass(`Ideas, navigation cost and structure ${tag}`,`${k.ideas} ideas; ${k.n} check runs on page change; one h1 per page; ${k.rel} related links; title "${k.title}"`):fail(`Ideas, navigation cost and structure ${tag}`,JSON.stringify(k));}
  // D-031: ideas render user text as text; interest needs consent and refuses contact details
  {await p.evaluate(()=>{location.hash='sustain'});await p.waitForTimeout(200);
   const k=await p.evaluate(async()=>{const t=document.querySelector('#id-title');t.value='Test <img src=x onerror="window.__xss=1"> idea';document.querySelector('#id-detail').value='<b>bold</b>';document.querySelector('#ideaForm').dispatchEvent(new Event('submit',{cancelable:true}));await new Promise(r=>setTimeout(r,200));
     const card=[...document.querySelectorAll('#idList .ideacard')].pop();const asText=!!card&&card.querySelector('h3').textContent.includes('<img')&&!card.querySelector('img');
     document.querySelector('#eoiForm [name=role]').checked=true;document.querySelector('#eoiForm').dispatchEvent(new Event('submit',{cancelable:true}));await new Promise(r=>setTimeout(r,50));const needConsent=/consent/i.test(document.querySelector('#eoiState').textContent);
     document.querySelector('#eoi-consent').checked=true;document.querySelector('#eoi-note').value='me@example.org';document.querySelector('#eoiForm').dispatchEvent(new Event('submit',{cancelable:true}));await new Promise(r=>setTimeout(r,50));const refused=/contact details/i.test(document.querySelector('#eoiState').textContent);
     const rm=card&&card.querySelector('[data-rm]');if(rm)rm.click();return{asText,xss:!!window.__xss,needConsent,refused,git:document.querySelectorAll('#suGit a').length}});
   (k.asText&&!k.xss&&k.needConsent&&k.refused&&k.git>=7)?pass(`Ideas and interest ${tag}`,'user text shown as text, consent required, contact details refused, GitHub links present'):fail(`Ideas and interest ${tag}`,JSON.stringify(k));}
  // D-019: automated WCAG 2.2 AA audit (axe-core) on every page; must find nothing
  if(scheme==='light'||w===1280){await p.addScriptTag({content:AXE});const viol=[];for(const v of VIEWS){await p.evaluate(v=>{location.hash=v},v);await p.waitForTimeout(160);await p.mouse.move(1,1);await p.evaluate(()=>{if(document.activeElement)document.activeElement.blur();if(typeof hideTip2==='function')hideTip2(true)}); /* no incidental hover or focus tooltip during the audit */
    const r=await p.evaluate(async()=>(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']},resultTypes:['violations']})).violations.map(x=>x.id+':'+x.nodes.slice(0,2).map(n=>n.target.join(' ')).join('|')));r.forEach(x=>viol.push(v+' '+x))}
   viol.length?fail(`Accessibility audit (axe, WCAG 2.2 AA) ${tag}`,viol.slice(0,8).join('; ')):pass(`Accessibility audit (axe, WCAG 2.2 AA) ${tag}`,`${VIEWS.length} pages, no violations`);}
  // posters: text inside canvas
  await p.evaluate(()=>{location.hash='posters'});await p.waitForTimeout(200);
  const ov=await p.evaluate(()=>{const out=[];document.querySelectorAll('#posters svg').forEach(s=>{s.querySelectorAll('text').forEach(t=>{const b=t.getBBox();if(b.width===0)out.push(s.dataset.poster+': zero-size');if(b.x<0||b.x+b.width>420.5||b.y<0||b.y+b.height>594)out.push(`${s.dataset.poster}: "${t.textContent.slice(0,24)}" x=${b.x.toFixed(0)}..${(b.x+b.width).toFixed(0)}`)});
      // D-002: labels collided with year numerals on the service poster. Any two text boxes in one poster must not overlap.
      const bx=[...s.querySelectorAll('text')].map(t=>{const r=t.getBoundingClientRect();return {t:t.textContent.slice(0,16),b:{x:r.x,y:r.y,width:r.width,height:r.height}}}); // screen space, so transforms count
      for(let i=0;i<bx.length;i++)for(let j=i+1;j<bx.length;j++){const A=bx[i].b,B=bx[j].b;const ix=Math.min(A.x+A.width,B.x+B.width)-Math.max(A.x,B.x),iy=Math.min(A.y+A.height,B.y+B.height)-Math.max(A.y,B.y);if(ix>1&&iy>1)out.push(`${s.dataset.poster}: "${bx[i].t}" overlaps "${bx[j].t}"`)}});return out});
  ov.length?fail(`Poster text within bounds ${tag}`,ov.join('; ')):pass(`Poster text within bounds ${tag}`,'all text inside 420×594');
  const qr=await p.evaluate(()=>!!document.querySelector('#qr canvas,#qr img')&&!!document.querySelector('#barcode rect'));
  qr?pass(`QR and barcode render ${tag}`,''):fail(`QR and barcode render ${tag}`,'missing');
  errs.length?fail(`No script errors ${tag}`,errs.join(' | ')):pass(`No script errors ${tag}`,'');
  if(!NEG&&(w===1280||scheme==='dark')){for(const v of (w===1280&&scheme==='light')?['overview','africa','assurance']:['overview']){await p.evaluate(v=>{location.hash=v},v);await p.waitForTimeout(500);await p.screenshot({path:`out/shot-${w}-${scheme}-${v}.png`,fullPage:false})}}
  await ctx.close();
}
// D-102: tablets keep a navigation bar; any menu scrolls within the screen and reaches every page
for(const [w,h] of (process.env.TEST_NONAV?[]:[[1024,768],[820,1180],[768,1024],[600,900],[390,844]])){const {p,ctx}=await mk(w,'light',true);await p.setViewportSize({width:w,height:h});await p.evaluate(()=>fitNav());await p.waitForTimeout(300);
  const r=await p.evaluate(async()=>{const vis=e=>e&&!e.hidden&&getComputedStyle(e).display!=='none'&&e.offsetParent!==null;const g=document.querySelector('#gnav');const bar=vis(g)?[...g.children].filter(vis).length:0;
    const btn=document.querySelector('#moreBtn');let menu=null;if(vis(document.querySelector('#moreWrap'))){btn.click();await new Promise(r=>setTimeout(r,200));const m=document.querySelector('#moreMenu');const rc=m.getBoundingClientRect();
      [...m.querySelectorAll('.mhead')].forEach(b=>{if(b.getAttribute('aria-expanded')!=='true'&&!b.closest('[hidden]'))b.click()});await new Promise(r=>setTimeout(r,100));
      menu={left:Math.round(m.getBoundingClientRect().left),right:Math.round(m.getBoundingClientRect().right),bottom:Math.round(m.getBoundingClientRect().bottom),vh:innerHeight,scrolls:m.scrollHeight>m.clientHeight?/auto|scroll/.test(getComputedStyle(m).overflowY):true,links:[...m.querySelectorAll('a[data-view]')].filter(a=>!a.closest('[hidden]')).length};btn.click()}
    return{bar,menu,sw:document.documentElement.scrollWidth,iw:innerWidth}});
  const ok=(w>=768?r.bar>=7:true)&&(w<600?r.menu&&r.menu.links>=40:true)&&(!r.menu||(r.menu.bottom<=r.menu.vh&&r.menu.scrolls&&r.menu.left>=0&&r.menu.right<=r.iw))&&r.sw<=r.iw;
  ok?pass(`Navigation on a ${w}px screen`,`${r.bar} bar items; ${r.menu?`menu reaches ${r.menu.links} pages and fits the screen`:'no menu needed'}`):fail(`Navigation on a ${w}px screen`,JSON.stringify(r));
  await ctx.close()}
await browser.close();
const bad=results.filter(r=>!r.ok);
console.log(results.map(r=>(r.ok?'PASS ':'FAIL ')+r.n+(r.d?' — '+r.d:'')).join('\n'));
console.log(`\n${results.length-bad.length}/${results.length} build checks pass${NEG?' (negative run: failures expected)':''}`);
writeFileSync((NEG?'out/negative-report':'out/test-report')+(CFG.length?'-'+CFG.join('-'):'')+'.json',JSON.stringify(results,null,1));
process.exit(NEG?(bad.length>=3?0:1):(bad.length?1:0));
