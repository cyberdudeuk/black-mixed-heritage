import {readFileSync,writeFileSync} from 'fs';
const SP=new URL('./vendor',import.meta.url).pathname; // build inputs kept in the repository
const uk=JSON.parse(readFileSync(SP+'/uk.json'));
const world=readFileSync(SP+'/world.json','utf8');
const compare=readFileSync(SP+'/compare.json','utf8');
const globe=readFileSync(SP+'/globe.txt','utf8');
const tpl=JSON.stringify(Object.fromEntries(['bhm2026-slide-template.pptx','bhm2026-report-template.docx','bhm2026-induction-pack.docx'].map(f=>[f,readFileSync(SP+'/templates/'+f).toString('base64')])));
const url=process.argv[2]||'';
let s=readFileSync('src.html','utf8');
const n0=(s.match(/%%(UK|IE|URL|WORLD|COMPARE|GLOBE|TPL)%%/g)||[]).length;
s=s.replace('%%UK%%',uk['United Kingdom']).replace('%%IE%%',uk['Ireland']).replace('%%URL%%',url).replace('%%WORLD%%',()=>world).replace('%%COMPARE%%',()=>compare).replace('%%GLOBE%%',()=>globe).replace('%%TPL%%',()=>tpl);
const left=(s.match(/%%[A-Z]+%%/g)||[]).length;
if(n0!==7||left!==0){console.error('BUILD FAIL placeholders',n0,left);process.exit(1)}
// D-001: an empty template expression broke the whole script. Build now syntax-checks the inline script.
const js=s.slice(s.lastIndexOf('<script>')+8,s.lastIndexOf('</script>'));
try{new Function(js)}catch(e){console.error('BUILD FAIL script syntax:',e.message);process.exit(1)}
/* D-040: a second top-level function with the same name silently replaces the first (renderIdeas, showTip, hideTip did) */
{const names=[...js.matchAll(/(?:^|[;\n}{)])\s*(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(x=>x[1]);const seen={};names.forEach(n=>seen[n]=(seen[n]||0)+1);const dup=Object.entries(seen).filter(([k,v])=>v>1);
 if(dup.length){console.error('BUILD FAIL duplicate function declarations (one replaces the other):',dup.map(d=>d[0]).join(', '));process.exit(1)}}
writeFileSync(process.argv[3]||'bhm-2026-hub.html',s);
console.log('built',s.length,'bytes');
