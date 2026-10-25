import {createRequire} from 'module';const require=createRequire(import.meta.url);const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const b=await chromium.launch();const p=await b.newPage();await p.goto('file:///home/claude/bhm27/bhm-2026-hub.html');await p.waitForTimeout(4000);
const colour=await p.evaluate(()=>hubMarkSVG(150,PAL.dark));
const outline=await p.evaluate(()=>{const P={...PAL.dark};for(const k in P)if(typeof P[k]==="string"&&/^#/.test(P[k]))P[k]="#FFFFFF";return hubMarkSVG(28,P)});
async function shot(html,w,h,path,bg){const q=await b.newPage({viewport:{width:w,height:h}});await q.setContent(`<html><body style="margin:0;width:${w}px;height:${h}px;display:grid;place-items:center;background:${bg}">${html}</body></html>`);await q.screenshot({path,omitBackground:bg==="transparent"});await q.close()}
await shot(colour,192,192,'/home/claude/bhm27/teams/color.png','#2A1F17');
await shot(outline,32,32,'/home/claude/bhm27/teams/outline.png','transparent');
await b.close();console.log('icons done');
