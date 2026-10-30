/* ================= v2.27.0 APPLICATION TRACKER (R103, D-148) =================
   A do-it-yourself tracker for job applications, kept only in this browser. Its fields are the ones the independent
   reviewer checked against official guidance (JN_TRACK_FIELDS, from jn-tracker.json); each field's "why" is shown as help.
   Exports to a spreadsheet (CSV) and to a calendar (ICS) so people can use whatever tools they already have. */
const TRK_KEY="bhm-jn-track";
const TRK_COLS=[
 ["ref","Vacancy reference number","text"],["title","Job title and recruiting organisation","text",1],["grade","Grade (as worded in the advert)","text"],
 ["where","Where you applied (Civil Service Jobs, employer's site or email)","select",0,["Civil Service Jobs","Employer's own website","Email","Other"]],
 ["link","Link to the advert and saved copy of the advert","url"],["closing","Closing date and time","datetime-local",0,null,"Closing"],
 ["applied","Date applied","date"],["elements","Success Profiles elements and behaviours assessed","text"],["version","Version of CV, statement or examples submitted","text"],
 ["tests","Online test window and result","text"],["sift","Sift date and score","text"],
 ["interview","Interview or assessment date, format and panel contact","datetime-local",0,null,"Interview or assessment"],
 ["outcome","Outcome and date notified","text"],["feedback","Feedback requested, received and key points","textarea"],
 ["reserve","Reserve list placement date and expiry","date",0,null,"Reserve list ends"],["offer","Provisional offer, pre-employment checks and formal offer dates","text"],
 ["notice","Your notice period and agreed start date","text"],["next","Next action and reminder date","date",0,null,"Reminder"]];
const TRK_STAGES=["Thinking about it","Applied","Tests","Sift","Interview or assessment","Reserve list","Offer and checks","Started","Not this time","Withdrawn"];
function trkLoad(){try{const v=JSON.parse(localStorage.getItem(TRK_KEY)||"[]");return Array.isArray(v)?v.filter(x=>x&&typeof x==="object").slice(0,200):[]}catch(e){return[]}}
function trkSave(a){try{localStorage.setItem(TRK_KEY,JSON.stringify(a));return true}catch(e){return false}}
function trkWhy(label){const f=(typeof JN_TRACK_FIELDS!=="undefined"?JN_TRACK_FIELDS:[]).find(x=>x.field===label);return f?f.why:""}
function trkDates(list){const out=[];list.forEach(r=>TRK_COLS.forEach(([k,l,t,,,ev])=>{if(ev&&r[k])out.push({when:r[k],what:ev,r})}));return out.sort((a,b)=>a.when<b.when?-1:1)}
function trkCsv(list){const q=v=>{let s=String(v==null?"":v);if(/^[=+\-@]/.test(s))s="'"+s;return /[",\n]/.test(s)?`"${s.replace(/"/g,'""')}"`:s};
  return ["Stage",...TRK_COLS.map(c=>c[1])].map(q).join(",")+"\r\n"+list.map(r=>[r.stage||"",...TRK_COLS.map(c=>r[c[0]]||"")].map(q).join(",")).join("\r\n")+"\r\n"}
function trkIcs(list){const pad=n=>String(n).padStart(2,"0");const fmt=s=>{const d=new Date(s);return isNaN(d)?null:`${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`};
  const esc2=s=>String(s).replace(/[\\;,]/g,m=>"\\"+m).replace(/\n/g,"\\n");const now=fmt(new Date().toISOString());
  const ev=trkDates(list).map((x,i)=>{const st=x.when.length===10?x.when+"T09:00":x.when;const a=fmt(st);if(!a)return"";return ["BEGIN:VEVENT",`UID:bhm-track-${i}-${a}@bhm2026hub`,`DTSTAMP:${now}`,`DTSTART:${a}`,`SUMMARY:${esc2(x.what+": "+(x.r.title||x.r.ref||"application"))}`,"BEGIN:VALARM","TRIGGER:-P1D","ACTION:DISPLAY",`DESCRIPTION:${esc2(x.what)}`,"END:VALARM","END:VEVENT"].join("\r\n")}).filter(Boolean);
  return ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//BHM 2026 Hub//Application tracker//EN",...ev,"END:VCALENDAR"].join("\r\n")+"\r\n"}
function trkParseCsv(text){const rows=[];let row=[],f="",q=false;for(let i=0;i<text.length;i++){const c=text[i];if(q){if(c==='"'&&text[i+1]==='"'){f+='"';i++}else if(c==='"')q=false;else f+=c}else if(c==='"')q=true;else if(c===","){row.push(f);f=""}else if(c==="\n"){row.push(f.replace(/\r$/,""));rows.push(row);row=[];f=""}else f+=c}
  if(f||row.length){row.push(f);rows.push(row)}const head=rows.shift()||[];return rows.filter(r=>r.some(x=>x)).map(r=>{const o={stage:r[0]||""};TRK_COLS.forEach((c,i)=>{const j=head.indexOf(c[1]);if(j>=0)o[c[0]]=(r[j]||"").replace(/^'(?=[=+\-@])/,"")});return o})}
function trkDownload(name,type,data){try{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([data],{type}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}catch(e){}}
function trkRender(){const box=$("#trkApp");if(!box)return;let list=trkLoad();let edit=-1;
  const field=([k,l,t,req,opts])=>{const why=trkWhy(l);const id="trk-"+k;const help=why?`<span class="muted trkwhy" id="${id}-h">${esc(why)}</span>`:"";const desc=why?` aria-describedby="${id}-h"`:"";
    const inp=t==="select"?`<select id="${id}" name="${k}"${desc}><option value=""></option>${opts.map(o=>`<option>${esc(o)}</option>`).join("")}</select>`:t==="textarea"?`<textarea id="${id}" name="${k}" rows="3"${desc}></textarea>`:`<input id="${id}" name="${k}" type="${t}"${req?" required":""}${desc}>`;
    return `<div class="trkf"><label for="${id}">${esc(l)}${req?" (required)":""}</label>${inp}${help}</div>`};
  box.innerHTML=`<form id="trkForm" class="trkform" novalidate><fieldset><legend>Add or update an application</legend><div class="trkf"><label for="trk-stage">Stage <span class="muted">(the hub's own list)</span></label><select id="trk-stage" name="stage">${TRK_STAGES.map(s=>`<option>${esc(s)}</option>`).join("")}</select></div>${TRK_COLS.map(field).join("")}</fieldset>
   <div class="row"><button class="btn primary" type="submit" id="trkSave">Save application</button> <button class="btn" type="button" id="trkCancel" hidden>Cancel editing</button></div><p class="mono muted" id="trkMsg" aria-live="polite"></p></form>
   <h3>Coming up in the next 14 days</h3><ul id="trkSoon"></ul><h3>Your applications</h3><div class="tablewrap"><table class="trktable"><caption class="vh">Your applications</caption><thead><tr><th scope="col">Application</th><th scope="col">Stage</th><th scope="col">Closing</th><th scope="col">Next date</th><th scope="col">Actions</th></tr></thead><tbody id="trkRows"></tbody></table></div>
   <div class="row trkbar"><button class="btn" type="button" id="trkCsv">Download for a spreadsheet (CSV)</button> <button class="btn" type="button" id="trkIcs">Add dates to your calendar (ICS)</button> <label class="btn" for="trkImport">Import a CSV</label><input type="file" id="trkImport" accept=".csv,text/csv" class="vh"> <button class="btn" type="button" id="trkClear">Delete all</button></div>`;
  const form=$("#trkForm"),msg=$("#trkMsg");const day=s=>s?String(s).slice(0,10):"";
  const draw=()=>{const today=new Date().toISOString().slice(0,10),lim=new Date(Date.now()+14*864e5).toISOString().slice(0,10);
    const soon=trkDates(list).filter(x=>day(x.when)>=today&&day(x.when)<=lim);$("#trkSoon").innerHTML=soon.length?soon.map(x=>`<li><b>${esc(day(x.when))}</b> ${esc(x.what)}: ${esc(x.r.title||x.r.ref||"application")}</li>`).join(""):`<li class="muted">Nothing dated in the next 14 days.</li>`;
    $("#trkRows").innerHTML=list.length?list.map((r,i)=>{const nx=trkDates([r]).find(x=>day(x.when)>=today);return `<tr><th scope="row">${esc(r.title||"(no title)")}${r.ref?` <span class="muted">${esc(r.ref)}</span>`:""}</th><td>${esc(r.stage||"")}</td><td>${esc(r.closing?String(r.closing).replace("T"," "):"")}</td><td>${nx?esc(day(nx.when)+" "+nx.what):""}</td><td><button class="btn" type="button" data-e="${i}">Edit<span class="vh"> ${esc(r.title||"")}</span></button> <button class="btn" type="button" data-d="${i}">Delete<span class="vh"> ${esc(r.title||"")}</span></button></td></tr>`}).join(""):`<tr><td colspan="5" class="muted">No applications yet. Nothing is sent anywhere: this list stays in this browser.</td></tr>`};
  const fill=r=>{form.reset();$("#trk-stage").value=r.stage||TRK_STAGES[1];TRK_COLS.forEach(([k])=>{const el=$("#trk-"+k);if(el)el.value=r[k]||""})};
  form.addEventListener("submit",e=>{e.preventDefault();const r={stage:$("#trk-stage").value};TRK_COLS.forEach(([k])=>{const v=($("#trk-"+k).value||"").trim();if(v)r[k]=v.slice(0,2000)});
    if(!r.title){msg.textContent="Add the job title and recruiting organisation first.";$("#trk-title").focus();return}
    if(edit>=0)list[edit]=r;else list.unshift(r);const ok=trkSave(list);edit=-1;$("#trkCancel").hidden=true;form.reset();draw();msg.textContent=ok?"Saved in this browser.":"Saved for this visit only: this browser is not keeping data, so download a copy."});
  $("#trkCancel").addEventListener("click",()=>{edit=-1;form.reset();$("#trkCancel").hidden=true;msg.textContent=""});
  $("#trkRows").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;if(b.dataset.e!=null){edit=+b.dataset.e;fill(list[edit]);$("#trkCancel").hidden=false;$("#trk-title").focus();msg.textContent="Editing: save to update."}
    if(b.dataset.d!=null&&confirm("Delete this application from your tracker?")){list.splice(+b.dataset.d,1);trkSave(list);draw();msg.textContent="Deleted."}});
  $("#trkCsv").addEventListener("click",()=>trkDownload("my-applications.csv","text/csv;charset=utf-8","﻿"+trkCsv(list)));
  $("#trkIcs").addEventListener("click",()=>trkDownload("my-application-dates.ics","text/calendar;charset=utf-8",trkIcs(list)));
  $("#trkImport").addEventListener("change",e=>{const f=e.target.files&&e.target.files[0];if(!f)return;f.text().then(t=>{const add=trkParseCsv(t.replace(/^﻿/,""));list=add.concat(list).slice(0,200);trkSave(list);draw();msg.textContent=`Imported ${add.length} application(s).`}).catch(()=>{msg.textContent="That file could not be read."});e.target.value=""});
  $("#trkClear").addEventListener("click",()=>{if(list.length&&confirm("Delete every application in this tracker? Download a copy first if you want to keep it.")){list=[];trkSave(list);draw();msg.textContent="All deleted."}});
  draw()}
function trkAudit(){const bad=[];const F=typeof JN_TRACK_FIELDS!=="undefined"?JN_TRACK_FIELDS:[];
  TRK_COLS.forEach(([k,l])=>{if(!F.some(f=>f.field===l))bad.push(`tracker field "${l}" was not checked by the reviewer`)});
  F.forEach(f=>{if(!/^https:\/\//.test(f.src||""))bad.push(`field "${f.field}" lacks an https source`)});
  const sample=[{stage:"Applied",title:'Policy, "Advisor"',ref:"=1+1",closing:"2026-11-05T23:55",interview:"2026-11-20T10:00",next:"2026-11-01"}];
  const back=trkParseCsv(trkCsv(sample));if(!back[0]||back[0].title!==sample[0].title||back[0].closing!==sample[0].closing)bad.push("CSV export and import do not round-trip");
  if(!trkCsv(sample).includes(",'=1+1,")||back[0].ref!=="=1+1")bad.push("a value starting with = is not neutralised in CSV");
  const ics=trkIcs(sample);if((ics.match(/BEGIN:VEVENT/g)||[]).length!==3||!/BEGIN:VCALENDAR[\s\S]*END:VCALENDAR/.test(ics))bad.push("calendar export does not hold the three dates");
  if(!$("#trkApp"))bad.push("tracker section missing");return bad}
CHECKS.push({id:"C173",n:"The application tracker uses only reviewer-checked fields with sources, round-trips its spreadsheet file, neutralises formula-like values, and exports every date to a calendar (D-148)",
  run:c=>({ok:!c.trk.length,d:c.trk.length?c.trk.slice(0,4).join("; "):`${TRK_COLS.length} fields, each checked against official guidance; CSV and calendar exports tested`}),
  breakIt:c=>{c.trk=["CSV export and import do not round-trip"];return c}});
BUILD_TESTS["D-148"]="People asked how to keep track of applications, interviews, feedback and deadlines; the hub gave advice but no way to do it. The tracker keeps each application in this browser, shows what is coming up, and exports to a spreadsheet and a calendar. C173 fails if a field was not checked against a source, the spreadsheet file does not round-trip, a formula-like value is not neutralised, or a date is lost from the calendar";
const _ctx99=ctxV15;ctxV15=function(){const c=_ctx99();c.trk=trkAudit();return c};
REQS.push({id:"R103",t:"F",r:"Keep track of applications, interviews, feedback and deadlines: what to record, ways to do it, key timelines, and a do-it-yourself tracker with spreadsheet and calendar export",o:"Request 76",sat:["jn-trwhat","jn-trtools","jn-trdates","jn-trfeedback","jn-tracker"],ver:["C173"]});
function v54Boot(){trkRender()}
