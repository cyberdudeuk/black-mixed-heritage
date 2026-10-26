// Writes the open data feeds from the page's own data model (one source of truth).
import {writeFileSync,mkdirSync} from 'fs';import {createRequire} from 'module';
const require=createRequire(import.meta.url);const {chromium}=require('playwright');
const b=await chromium.launch();const p=await b.newPage();
await p.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.abort());
await p.goto('file://'+process.cwd()+'/'+(process.env.HUB_FILE||'bhm-2026-hub.html'));await p.waitForFunction(()=>window.__selfcheck);
const d=await p.evaluate(()=>({ics:ics(calEvents()),json:JSON.stringify({title:document.title.split(" · ").pop()+" events",version:META.version,generated:META.reviewed,events:calEvents().map(e=>({id:e.id,start:e.s,end:e.e,title:e.t,type:CAL_KINDS[e.k],where:e.where||null,description:e.d||null,source:e.src&&SOURCES[e.src]?{id:e.src,title:SOURCES[e.src].t,url:SOURCES[e.src].u}:null}))},null,2),
 sources:JSON.stringify({title:"BHM 2026 Hub sources",version:META.version,generated:META.reviewed,note:"Each source is due to be read again 12 months after it was last read.",sources:freshness(Date.parse(META.reviewed)).rows.map(r=>({id:r.k,title:r.t,url:r.u,read:r.r?iso(new Date(r.r)):null,due:r.due?iso(new Date(r.due)):null}))},null,2),
 deadlines:JSON.stringify({title:"BHM 2026 Hub nomination deadlines",version:META.version,generated:META.reviewed,deadlines:AWARDS.filter(a=>a.dl).map(a=>({id:a.id,name:a.n,organiser:a.org||null,deadline:a.dl,url:a.u||null,how:a.how||null,source:(a.src||[]).map(k=>SOURCES[k]&&SOURCES[k].u).filter(Boolean)}))},null,2),
 atom:(()=>{const x=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");const M={Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12"};
   const items=CHANGELOG.map(c=>{const m=String(c).match(/^(\d+\.\d+\.\d+)\s*\((\d{1,2}) ([A-Z][a-z]{2}) (\d{4})\):\s*([\s\S]*)$/);return m&&M[m[3]]?{v:m[1],d:`${m[4]}-${M[m[3]]}-${m[2].padStart(2,"0")}T00:00:00Z`,t:m[5]}:null}).filter(Boolean).slice(0,30);
   const site="https://cyberdudeuk.github.io/black-mixed-heritage/",repo="https://github.com/cyberdudeuk/black-mixed-heritage";
   return ['<?xml version="1.0" encoding="utf-8"?>','<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en-GB">','<title>BHM 2026 Hub: what is new</title>','<subtitle>Releases of the BHM 2026 Hub, with what changed and how it was checked</subtitle>',
     `<id>tag:cyberdudeuk.github.io,2026:bhm-2026-hub</id>`,`<link rel="alternate" type="text/html" href="${site}"/>`,`<link rel="self" type="application/atom+xml" href="${site}data/bhm2026-releases.atom"/>`,`<updated>${items[0]?items[0].d:"2026-10-21T00:00:00Z"}</updated>`,'<author><name>BHM 2026 Hub</name></author>',`<rights>Text: Creative Commons Attribution 4.0</rights>`,
     ...items.map(i=>[`<entry>`,`<title>BHM 2026 Hub ${x(i.v)}</title>`,`<id>tag:cyberdudeuk.github.io,2026:bhm-2026-hub:release-${x(i.v)}</id>`,`<link rel="alternate" type="text/html" href="${repo}/blob/main/docs/release-notes.md"/>`,`<updated>${i.d}</updated>`,`<summary type="text">${x(i.t)}</summary>`,`</entry>`].join("")),'</feed>'].join("\n")})(),
 pages:JSON.stringify({title:'BHM 2026 Hub pages',version:META.version,generated:META.reviewed,pages:[{id:'overview',title:'Overview',menu:null,url:'https://cyberdudeuk.github.io/black-mixed-heritage/#overview'},...NAV_GROUPS.flatMap(g=>g.items.map(id=>({id,title:((document.querySelector('#gnav a[href="#'+id+'"]')||{}).textContent||(VIEWS.find(v=>v[0]===id)||[id,id])[1]).replace(/\s+/g,' ').trim(),menu:g.g,url:'https://cyberdudeuk.github.io/black-mixed-heritage/#'+id})))]},null,2),
 jsonld:JSON.stringify(jsonld(),null,2),csv:["term,category,definition",...GLOSSARY.map(g=>[g.t,g.c,g.d].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(","))].join("\r\n"),n:calEvents().length}));
await b.close();mkdirSync('data',{recursive:true});
writeFileSync('data/bhm2026-events.ics',d.ics);writeFileSync('data/bhm2026-events.json',d.json);writeFileSync('data/bhm2026-hub.jsonld',d.jsonld);writeFileSync('data/bhm2026-glossary.csv',d.csv);writeFileSync('data/bhm2026-sources.json',d.sources);writeFileSync('data/bhm2026-deadlines.json',d.deadlines);writeFileSync('data/bhm2026-releases.atom',d.atom);writeFileSync('data/bhm2026-pages.json',d.pages);
// 2.21.1: a Frictionless Data Package describing every file, so the open data documents itself
const R=(name,path,format,mediatype,title,description,extra)=>({name,path,format,mediatype,encoding:'utf-8',title,description,licenses:[{name:'CC-BY-4.0',path:'https://creativecommons.org/licenses/by/4.0/',title:'Creative Commons Attribution 4.0'}],...(extra||{})});
const pkg={profile:'data-package',name:'bhm-2026-hub',id:'https://cyberdudeuk.github.io/black-mixed-heritage/data/datapackage.json',title:'BHM 2026 Hub open data',
 description:'Open data from the BHM 2026 Hub: Black and Black-Mixed history, heritage and cultures, Africa and the African diaspora, for the UK public sector and the communities it serves. Generated from the hub itself on every build. Every event and figure links to the source it was checked against.',
 version:JSON.parse(d.json).version,created:JSON.parse(d.json).generated,homepage:'https://cyberdudeuk.github.io/black-mixed-heritage/',
 keywords:['Black history','Black History Month','African diaspora','Africa','heritage','Black-Mixed','public sector','United Kingdom','calendar','glossary','linked data'],
 licenses:[{name:'CC-BY-4.0',path:'https://creativecommons.org/licenses/by/4.0/',title:'Creative Commons Attribution 4.0'}],
 contributors:[{title:'BHM 2026 Hub',role:'author'}],
 sources:[{title:'Sources listed in bhm2026-sources.json',path:'https://cyberdudeuk.github.io/black-mixed-heritage/data/bhm2026-sources.json'}],
 resources:[
  R('events-ics','bhm2026-events.ics','ics','text/calendar','Events calendar','Black History Month events, observances, remembrance days and nomination deadlines; deadlines carry reminders 14 and 2 days before. Subscribe in any calendar app.'),
  R('events','bhm2026-events.json','json','application/json','Events','The calendar as JSON: id, start, end, title, type, where, description and the source each event was checked against.'),
  R('glossary','bhm2026-glossary.csv','csv','text/csv','Glossary','Terms and plain-English definitions.',{schema:{fields:[{name:'term',type:'string',description:'The term'},{name:'category',type:'string',description:'Group, for example Observance'},{name:'definition',type:'string',description:'Plain-English definition'}],primaryKey:['term']}}),
  R('hub','bhm2026-hub.jsonld','jsonld','application/ld+json','The hub as linked data','Pages, sourced points, statistics, people, organisations, places, events and glossary concepts, as Schema.org and SKOS.'),
  R('sources','bhm2026-sources.json','json','application/json','Sources','Every source: id, title, link, the date it was last read and the date it is due to be read again.'),
  R('deadlines','bhm2026-deadlines.json','json','application/json','Nomination deadlines','Published award and nomination deadlines, with how to take part and the sources checked.'),
  R('releases','bhm2026-releases.atom','atom','application/atom+xml','What is new','The latest releases of the hub, with what changed and how it was checked.'),
  R('pages','bhm2026-pages.json','json','application/json','Pages','Every page of the hub: id, title, the menu it sits in, and its address.')]};
writeFileSync('data/datapackage.json',JSON.stringify(pkg,null,2));
// verify: parse back
const j=JSON.parse(d.json);JSON.parse(d.jsonld);const sj=JSON.parse(d.sources),dj=JSON.parse(d.deadlines);if(!sj.sources.length||!d.atom.includes('<entry>')){console.error('EXPORT FAIL: sources or feed empty');process.exit(1)}const nv=(d.ics.match(/BEGIN:VEVENT/g)||[]).length;
if(j.events.length!==d.n||nv!==d.n){console.error('EXPORT FAIL',j.events.length,nv,d.n);process.exit(1)}
console.log('exported',d.n,'events;',sj.sources.length,'sources;',dj.deadlines.length,'deadlines;',(d.atom.match(/<entry>/g)||[]).length,'feed entries; jsonld',d.jsonld.length,'bytes; glossary rows',d.csv.split('\n').length-1);
