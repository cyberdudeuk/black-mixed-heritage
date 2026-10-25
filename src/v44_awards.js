/* ================= v2.15.0 RECOGNITION AND REPRESENTATION: PRIZES, HONOURS, MEDALS, FELLOWSHIPS AND SCHOLARSHIPS (D-121) =================
   Shown inside the culture page. The summary table holds only published counts; every row links to the sourced point it rests on,
   and every row says who counted. C160 proves both, and that no row classifies people itself. */
function awAudit(){const t=document.getElementById("awTable");if(!t)return{n:0,bad:["summary table missing"]};const bad=[];const rows=[...t.querySelectorAll("tbody tr")];
  rows.forEach((tr,i)=>{const a=tr.querySelector("th a[href^='#']");const id=a&&a.getAttribute("href").slice(1);const lbl=(tr.querySelector("th")||{}).textContent||"row "+(i+1);
    if(!id||!lpFindAny(id))bad.push(lbl+": links no sourced point");
    const by=(tr.cells[8]||{}).textContent||"";if(!by.trim()||by.trim()==="–")bad.push(lbl+": does not say who counted");
    if(/\b(our|hub)\s+(count|classification)\b/i.test(tr.textContent))bad.push(lbl+": a count the hub made itself")});
  if(rows.length<50)bad.push("only "+rows.length+" rows");return{n:rows.length,bad}}
CHECKS.push({id:"C160",n:"Every row of the recognition summary table rests on a sourced point and says who counted (D-121)",run:c=>({ok:!c.aw.bad.length,d:c.aw.bad.length?"Problems: "+c.aw.bad.slice(0,4).join("; "):`${c.aw.n} rows of prizes, honours, medals, fellowships and scholarships; each links its sourced point and names who counted`}),
  breakIt:c=>{c.aw={...c.aw,bad:["Nobel Prizes: links no sourced point"]};return c}});
BUILD_TESTS["D-121"]="Award statistics are easy to overstate: counts of Black winners differ between analysts, most bodies publish none, and some figures cover wider groupings. The summary table holds only published counts, each linked to a sourced point with its caveats, and C160 fails if a row loses its source or its counter";
REQS.push({id:"R87",t:"F",r:"Count Black and Black-Mixed winners and nominees of prizes, honours, medals, fellowships, bursaries and scholarships, against other groups, in numbers and percentages",o:"Request 65",sat:["aw-table","aw-ukhonours","aw-funding"],ver:["C160","C146"]});
const _ctx71=ctxV15;ctxV15=function(){const c=_ctx71();c.aw=awAudit();return c};
function v44Boot(){}
/* 2.16.0: Collecting ethnicity data, inside the language page */
REQS.push({id:"R88",t:"F",r:"How and when ethnicity and heritage data should be captured, what prevents disclosure before or after, and attitudes and declaration rates across sectors",o:"Request 66",sat:["ed-how","ed-when","ed-barriers","ed-attitudes"],ver:["C146","C157"]});
