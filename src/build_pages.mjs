// Builds the GitHub Pages / Microsoft Teams edition of the hub.
// Usage: node build_pages.mjs https://OWNER.github.io/REPO/ [outdir]
// Same content as the claude.ai artifact; differences: a full HTML document (lang, charset), the Teams JavaScript
// client library embedded (v2.56.0, MIT, so no extra CDN is needed), and a Teams start-up that only runs inside Teams.
import {readFileSync,writeFileSync,mkdirSync} from 'fs';import {execFileSync} from 'child_process';
const url=process.argv[2];const out=(process.argv[3]||'site').replace(/\/$/,'');
if(!/^https:\/\/[^/]+\.github\.io\/[^/]+\/$/.test(url||'')){console.error('Usage: node build_pages.mjs https://OWNER.github.io/REPO/ [outdir]');process.exit(1)}

// 2.21.1: how the hub describes itself to search engines and when shared: canonical address, social card, linked data
function seo(base){const repo="https://github.com/cyberdudeuk/black-mixed-heritage";const d="Black and Black-Mixed history, heritage and cultures, Africa and the African diaspora: an evidence-based hub for Black History Month 2026 and all year, for the UK public sector and the communities it serves. Every figure is sourced.";
  const esc=s=>String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
  const ds=(n,f,fmt,mt,desc)=>({"@type":"Dataset","name":n,"description":desc,"license":"https://creativecommons.org/licenses/by/4.0/","isAccessibleForFree":true,"inLanguage":"en-GB","distribution":{"@type":"DataDownload","encodingFormat":mt,"contentUrl":base+"data/"+f}});
  const ld={"@context":"https://schema.org","@graph":[
    {"@type":"WebSite","@id":base+"#website","url":base,"name":"Black History and Heritage Hub","alternateName":["BHM 2026 Hub: Honouring Our Communities","Black History Month 2026 Hub"],"description":d,"inLanguage":"en-GB","license":"https://creativecommons.org/licenses/by/4.0/","isAccessibleForFree":true,"accessibilityFeature":["highContrastDisplay","largePrint","readingOrder","structuralNavigation","tableOfContents","alternativeText","displayTransformability"],"accessMode":["textual","visual"],"keywords":"Black history, Black History Month, African diaspora, Africa, heritage, Black-Mixed, public sector, United Kingdom, open data","publisher":{"@type":"Organization","name":"Black History and Heritage Hub (made in a personal capacity; unofficial)"},"sameAs":[repo]},
    {"@type":"DataCatalog","@id":base+"#data","name":"Black History and Heritage Hub open data","url":base+"data/datapackage.json","license":"https://creativecommons.org/licenses/by/4.0/","dataset":[
      ds("Events calendar","bhm2026-events.ics","iCalendar","text/calendar","Black History Month events, observances, remembrance days and nomination deadlines, with reminders before deadlines"),
      ds("Events","bhm2026-events.json","JSON","application/json","The calendar as JSON, each event with its source"),
      ds("Glossary","bhm2026-glossary.csv","CSV","text/csv","Terms and plain-English definitions"),
      ds("The hub as linked data","bhm2026-hub.jsonld","JSON-LD","application/ld+json","Pages, sourced points, statistics, people, organisations, places and glossary concepts (Schema.org and SKOS)"),
      ds("Sources","bhm2026-sources.json","JSON","application/json","Every source, with the date it was last read and the date it is due to be read again"),
      ds("Nomination deadlines","bhm2026-deadlines.json","JSON","application/json","Published award and nomination deadlines"),
      ds("What is new","bhm2026-releases.atom","Atom","application/atom+xml","Releases of the hub"),
      ds("Pages","bhm2026-pages.json","JSON","application/json","Every page of the hub, its menu and its address")]}]};
  return [`<link rel="canonical" href="${base}">`,`<meta name="author" content="Black History and Heritage Hub">`,
    `<meta property="og:type" content="website">`,`<meta property="og:site_name" content="Black History and Heritage Hub">`,`<meta property="og:locale" content="en_GB">`,`<meta property="og:url" content="${base}">`,
    `<meta property="og:title" content="Black History and Heritage Hub">`,`<meta property="og:description" content="${esc(d)}">`,
    `<meta property="og:image" content="${base}og.png">`,`<meta property="og:image:width" content="1200">`,`<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="Black History and Heritage Hub. Black and Black-Mixed history, heritage and cultures, Africa and the African diaspora.">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g,"\\u003c")}</script>`].join("\n")}
mkdirSync(out,{recursive:true});
execFileSync('node',['build.mjs',url,out+'/_body.html'],{stdio:'inherit'});
const body=readFileSync(out+'/_body.html','utf8');
const teams=readFileSync(new URL('./vendor/teamsjs-2.56.0.min.js',import.meta.url),'utf8');
const init=`(function(){window.__HOST="pages";if(window.parent===window||typeof microsoftTeams==="undefined")return;
var T=microsoftTeams;function theme(t){var r=document.documentElement;r.classList.remove("a11y-contrast");if(t==="dark")r.setAttribute("data-theme","dark");else if(t==="contrast"){r.setAttribute("data-theme","dark");r.classList.add("a11y-contrast")}else if(t==="default")r.setAttribute("data-theme","light")}
T.app.initialize().then(function(){window.__TEAMS=true;try{T.app.notifySuccess()}catch(e){}try{T.app.registerOnThemeChangeHandler(theme)}catch(e){}return T.app.getContext()}).then(function(c){if(c&&c.app)theme(c.app.theme)}).catch(function(){window.__TEAMS=false})})();`;
const html=`<!doctype html>\n<html lang="en-GB">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n<link rel="alternate" type="application/atom+xml" title="Black History and Heritage Hub: what is new" href="data/bhm2026-releases.atom">\n${seo(url)}\n${body}\n<script>/*! @microsoft/teams-js 2.56.0 | MIT licence | (c) Microsoft Corporation */\n${teams}\n</script>\n<script>${init}</script>\n</html>\n`;
writeFileSync(out+'/index.html',html);writeFileSync(out+'/.nojekyll','');
import('fs').then(f=>f.unlinkSync(out+'/_body.html'));
console.log('pages build',html.length,'bytes ->',out+'/index.html');
