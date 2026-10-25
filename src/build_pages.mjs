// Builds the GitHub Pages / Microsoft Teams edition of the hub.
// Usage: node build_pages.mjs https://OWNER.github.io/REPO/ [outdir]
// Same content as the claude.ai artifact; differences: a full HTML document (lang, charset), the Teams JavaScript
// client library embedded (v2.56.0, MIT, so no extra CDN is needed), and a Teams start-up that only runs inside Teams.
import {readFileSync,writeFileSync,mkdirSync} from 'fs';import {execFileSync} from 'child_process';
const url=process.argv[2];const out=(process.argv[3]||'site').replace(/\/$/,'');
if(!/^https:\/\/[^/]+\.github\.io\/[^/]+\/$/.test(url||'')){console.error('Usage: node build_pages.mjs https://OWNER.github.io/REPO/ [outdir]');process.exit(1)}
mkdirSync(out,{recursive:true});
execFileSync('node',['build.mjs',url,out+'/_body.html'],{stdio:'inherit'});
const body=readFileSync(out+'/_body.html','utf8');
const teams=readFileSync('teamsjs-2.56.0.min.js','utf8');
const init=`(function(){window.__HOST="pages";if(window.parent===window||typeof microsoftTeams==="undefined")return;
var T=microsoftTeams;function theme(t){var r=document.documentElement;r.classList.remove("a11y-contrast");if(t==="dark")r.setAttribute("data-theme","dark");else if(t==="contrast"){r.setAttribute("data-theme","dark");r.classList.add("a11y-contrast")}else if(t==="default")r.setAttribute("data-theme","light")}
T.app.initialize().then(function(){window.__TEAMS=true;try{T.app.notifySuccess()}catch(e){}try{T.app.registerOnThemeChangeHandler(theme)}catch(e){}return T.app.getContext()}).then(function(c){if(c&&c.app)theme(c.app.theme)}).catch(function(){window.__TEAMS=false})})();`;
const html=`<!doctype html>\n<html lang="en-GB">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n${body}\n<script>/*! @microsoft/teams-js 2.56.0 | MIT licence | (c) Microsoft Corporation */\n${teams}\n</script>\n<script>${init}</script>\n</html>\n`;
writeFileSync(out+'/index.html',html);writeFileSync(out+'/.nojekyll','');
import('fs').then(f=>f.unlinkSync(out+'/_body.html'));
console.log('pages build',html.length,'bytes ->',out+'/index.html');
