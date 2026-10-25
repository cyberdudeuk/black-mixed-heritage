// Writes the open data feeds from the page's own data model (one source of truth).
import {writeFileSync,mkdirSync} from 'fs';import {createRequire} from 'module';
const require=createRequire('/tmp/x.js');const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const b=await chromium.launch();const p=await b.newPage();
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.goto('file://'+process.cwd()+'/bhm-2026-hub.html');await p.waitForFunction(()=>window.__selfcheck);
const d=await p.evaluate(()=>({ics:ics(calEvents()),json:JSON.stringify({title:document.title.split(" · ").pop()+" events",version:META.version,generated:META.reviewed,events:calEvents().map(e=>({id:e.id,start:e.s,end:e.e,title:e.t,type:CAL_KINDS[e.k],where:e.where||null,description:e.d||null,source:e.src&&SOURCES[e.src]?{id:e.src,title:SOURCES[e.src].t,url:SOURCES[e.src].u}:null}))},null,2),
 jsonld:JSON.stringify(jsonld(),null,2),csv:["term,category,definition",...GLOSSARY.map(g=>[g.t,g.c,g.d].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(","))].join("\r\n"),n:calEvents().length}));
await b.close();mkdirSync('data',{recursive:true});
writeFileSync('data/bhm2026-events.ics',d.ics);writeFileSync('data/bhm2026-events.json',d.json);writeFileSync('data/bhm2026-hub.jsonld',d.jsonld);writeFileSync('data/bhm2026-glossary.csv',d.csv);
// verify: parse back
const j=JSON.parse(d.json);JSON.parse(d.jsonld);const nv=(d.ics.match(/BEGIN:VEVENT/g)||[]).length;
if(j.events.length!==d.n||nv!==d.n){console.error('EXPORT FAIL',j.events.length,nv,d.n);process.exit(1)}
console.log('exported',d.n,'events; jsonld',d.jsonld.length,'bytes; glossary rows',d.csv.split('\n').length-1);
