// Renders the six posters from the portal's own poster code to A3 PDFs and PNGs.
import {readFileSync,writeFileSync,mkdirSync} from 'fs';
import {createRequire} from 'module';
const SP='/tmp/claude-0/-home-claude/85fc9058-1d74-50e0-91e4-0414f5b30b7d/scratchpad';
const require=createRequire(SP+'/x.js');
const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const {PDFDocument}=require('/opt/npm-tools/node_modules/pdf-lib');
const F=SP+'/node_modules/@fontsource/';
const ff=(fam,file,w,st='normal')=>`@font-face{font-family:'${fam}';font-style:${st};font-weight:${w};src:url(data:font/woff2;base64,${readFileSync(F+file).toString('base64')}) format('woff2')}`;
const FONTCSS=[ff('Bricolage Grotesque','bricolage-grotesque/files/bricolage-grotesque-latin-600-normal.woff2',600),ff('Bricolage Grotesque','bricolage-grotesque/files/bricolage-grotesque-latin-700-normal.woff2',700),ff('Bricolage Grotesque','bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff2',800),ff('Source Serif 4','source-serif-4/files/source-serif-4-latin-400-normal.woff2',400),ff('IBM Plex Mono','ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2',400),ff('IBM Plex Mono','ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2',500)].join('\n');
mkdirSync('dist/posters',{recursive:true});
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:1200,height:900}});
await ctx.route('**/*',r=>r.request().url().startsWith('file:')?r.continue():r.fulfill({contentType:'text/css',body:''}));
const p=await ctx.newPage();
await p.goto('file://'+process.cwd()+'/out/test-page.html');await p.waitForFunction(()=>window.__selfcheck);
const PRINT={org:'',title:'Your event title',date:'Date: ______________',time:'Time: __________',venue:'Venue: ________________',by:'__________',contact:'contact: ________________'};
const report=[];
for(const pal of ['dark','light']){
  const svgs=await p.evaluate(([o,pal])=>POSTERS.map(x=>({id:x.id,name:x.name,svg:posterSVG(x,{...o,pal})})),[PRINT,pal]);
  const pdf=await PDFDocument.create();
  for(const s of svgs){
    const doc=`<!doctype html><html><head><meta charset="utf-8"><style>${FONTCSS}@page{size:297mm 420mm;margin:0}html,body{margin:0;padding:0}svg{display:block;width:297mm;height:420mm}</style></head><body>${s.svg.replace('<svg ','<svg preserveAspectRatio="xMidYMid slice" ')}</body></html>`;
    const pg=await ctx.newPage();await pg.setContent(doc);await pg.evaluate(()=>document.fonts.ready);
    // verify: every text inside poster bounds, fonts actually loaded
    const chk=await pg.evaluate(()=>{const bad=[];document.querySelectorAll('text').forEach(t=>{const bb=t.getBBox();if(bb.x<0||bb.x+bb.width>420.5||bb.y+bb.height>594)bad.push(t.textContent.slice(0,20))});return {bad,fonts:[...document.fonts].filter(f=>f.status==='loaded').length}});
    report.push({pal,id:s.id,outOfBounds:chk.bad,fontsLoaded:chk.fonts});
    const bytes=await pg.pdf({width:'297mm',height:'420mm',printBackground:true,pageRanges:'1'});
    const one=await PDFDocument.load(bytes);const [pgc]=await pdf.copyPages(one,[0]);pdf.addPage(pgc);
    if(pal==='dark'){await pg.setViewportSize({width:1240,height:1754});await pg.setContent(doc.replace('width:297mm;height:420mm','width:1240px;height:1754px'));await pg.evaluate(()=>document.fonts.ready);await pg.screenshot({path:`dist/posters/bhm2026-poster-${s.id}.png`,clip:{x:0,y:0,width:1240,height:1754}});}
    writeFileSync(`dist/posters/bhm2026-poster-${s.id}-${pal==='dark'?'night':'day'}.svg`,`<?xml version="1.0" encoding="UTF-8"?>\n`+s.svg.replace('<svg ','<svg width="297mm" height="420mm" '));
    await pg.close();
  }
  pdf.setTitle(`Black History Month 2026 posters (${pal==='dark'?'night':'day'} palette), A3`);pdf.setAuthor('BHM 2026 Hub');pdf.setSubject('Honouring Our Communities');
  writeFileSync(`dist/bhm2026-posters-A3-${pal==='dark'?'night':'day'}.pdf`,await pdf.save());
}
// collateral: PNG at native size, plus SVG
mkdirSync('dist/collateral',{recursive:true});
const colls=await p.evaluate(()=>COLLATERAL.map(c=>({id:c.id,n:c.n,w:c.w,h:c.h,tr:!!c.transparent,svg:collSVG(c,"dark")})));
for(const c of colls){const pg=await ctx.newPage();await pg.setViewportSize({width:c.w,height:c.h});
  await pg.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${FONTCSS}html,body{margin:0;background:transparent}svg{display:block;width:${c.w}px;height:${c.h}px}</style></head><body>${c.svg}</body></html>`);await pg.evaluate(()=>document.fonts.ready);
  const chk=await pg.evaluate(([W,H])=>{const bad=[];document.querySelectorAll('text').forEach(t=>{const bb=t.getBBox();if(bb.x<0||bb.x+bb.width>W+.5||bb.y+bb.height>H)bad.push(t.textContent.slice(0,20))});return bad},[c.w,c.h]);
  report.push({pal:'collateral',id:c.id,outOfBounds:chk,fontsLoaded:3});
  await pg.screenshot({path:`dist/collateral/bhm2026-${c.id}-${c.w}x${c.h}.png`,omitBackground:c.id==="badge"||c.tr});writeFileSync(`dist/collateral/bhm2026-${c.id}.svg`,c.svg);await pg.close()}
await b.close();
const bad=report.filter(r=>r.outOfBounds.length||r.fontsLoaded<3);
console.log(report.map(r=>`${r.pal} ${r.id}: oob=${r.outOfBounds.length} fonts=${r.fontsLoaded}`).join('\n'));
console.log(bad.length?'POSTER CHECK FAIL':'poster checks pass');process.exit(bad.length?1:0);
