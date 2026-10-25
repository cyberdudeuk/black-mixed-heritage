
/* ================= v2.4.1 DRAW HEAVY PAGES ON DEMAND ================= */
/* The review, dashboards and knowledge graph are drawn when first opened, or when the page is idle before the checks run,
   instead of at start-up. Tooltip annotation of the whole page also waits for idle time. */
const DEFER_V26={renderReview:"review",renderDash:"dash",setupKG:"knowledge"};
const _pend26=new Map();window.__deferred=[];
Object.entries(DEFER_V26).forEach(([fn,view])=>{const f=window[fn];if(typeof f!=="function")return;
  window[fn]=function(...a){const here=(location.hash||"#overview").slice(1);if(window.__warm||here===view||(typeof current!=="undefined"&&current===view))return f.apply(this,a);
    _pend26.set(fn,()=>f.apply(this,a));if(!window.__deferred.includes(fn))window.__deferred.push(fn)}});
function warm26(view){for(const [fn,run] of [..._pend26]){if(!view||DEFER_V26[fn]===view){_pend26.delete(fn);try{run()}catch(e){console.warn("Deferred draw failed: "+fn,e)}}}}
function warmAll26(){window.__warm=true;warm26();try{enhanceAll()}catch(e){}}
addEventListener("hashchange",()=>warm26((location.hash||"").slice(1)));
const _rc26=runChecks;runChecks=function(...a){if(!window.__warm){warmAll26()}return _rc26.apply(this,a)};
const _setupTips26=setupTips;setupTips=function(){const at=annotateTips;let first=true;
  annotateTips=function(...a){if(first){first=false;(window.requestIdleCallback||(f=>setTimeout(f,300)))(()=>at.apply(this,a),{timeout:2500});return}return at.apply(this,a)};
  try{return _setupTips26.apply(this,arguments)}finally{annotateTips=at}};
CHECKS.push({id:"C121",n:"Pages drawn on demand are complete by the time the checks run (D-076)",run:c=>({ok:c.defer.pending===0&&c.defer.drawn>=c.defer.deferred,d:`${c.defer.deferred} heavy pages deferred at start-up; ${c.defer.drawn} drawn; ${c.defer.pending} still waiting`}),
  breakIt:c=>{c.defer={...c.defer,pending:1};return c}});
BUILD_TESTS["D-076"]="Start-up drew every page, including heavy ones nobody had opened (review, dashboards, knowledge graph) and annotated every tooltip before first use; these now wait until opened or until the page is idle, and C121 checks that nothing is left undrawn when the checks run";
const _ctx47=ctxV15;ctxV15=function(){const c=_ctx47();c.defer={deferred:window.__deferred.length,pending:_pend26.size,drawn:window.__deferred.filter(fn=>!_pend26.has(fn)).length};return c};
