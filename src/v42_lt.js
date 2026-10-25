/* ================= v2.13.0 LANGUAGE OF THE TIME: explain historical terms instead of banning them blindly (D-116, D-117) =================
   The language check (C123) keeps the hub's own voice free of terms it advises against. But quotations, titles, organisation
   names, census categories and historical documents use the words of their time. Those are kept, and now explained: each term
   has an entry saying what it meant, who used it, why usage changed, what the hub uses now and who still uses it of themselves.
   Works written to spread prejudice are the exception: their offensive language is paraphrased, not reproduced. */
function ltRender(){const v=$("#v-language");if(!v||$("#lw-time")||typeof LT==="undefined")return;
  const sec=document.createElement("section");sec.className="block";sec.id="lw-time";sec.dataset.icon="clock";sec.dataset.label="Language of the time";
  sec.innerHTML=`<div class="sechead"><span class="eyebrow">Explain, don't erase</span><h2>Language of the time</h2><p>When the hub quotes a document, names an organisation or reports a historical category, it keeps the original words, because changing them would misquote the past. Each term below says what it meant then, why usage changed, what the hub uses now and, where it applies, who still uses it of themselves. Works written to spread prejudice are the exception: the hub paraphrases their offensive language instead of repeating it. Where you see ${icon("info")} next to a quoted word anywhere on the hub, it links here.</p></div><div class="grid g2 vtskip" id="ltGrid">${LT.map(t=>`<article class="card lwterm" id="${t.id}"><h3><span class="lw-mention">${esc(t.term)}</span></h3>${t.period?`<p class="muted">${esc(t.period)}</p>`:""}${t.debated?`<p class="eqmost">${icon("debate")} <b>Debated:</b> views differ; both are set out below.</p>`:""}<p><b>Then:</b> ${esc(t.meaning_then)}</p><p><b>Why usage changed:</b> ${esc(t.why_changed)}</p><p><b>The hub uses:</b> ${esc(t.hub_uses_now)}</p>${t.when_kept?`<p><b>When the hub keeps the original word:</b> ${esc(t.when_kept)}</p>`:""}${t.self_id?`<p><b>Used of themselves today:</b> ${esc(t.self_id)}</p>`:""}${t.note?`<p class="muted">${esc(t.note)}</p>`:""}<div class="tags">${t.src.map(evTag).join("")}</div></article>`).join("")}</div>`;
  const before=$("#lw-principles")||$("#lw-audit")||$("#language-sources");if(before)before.parentNode.insertBefore(sec,before);else v.appendChild(sec)}
/* mark the first quoted or named use of each historical term in every card, with a link to its explanation */
const LT_SKIP=".biblio,[role=tooltip],button,[role=button],label,summary,select,input,textarea,[tabindex='0'],[role=link],[role=tab],[role=option],[onclick],script,style,svg,a,code,pre,select,option,#v-language #lw-time,#v-language .lwterm,#checkRows,.checkrow,.tags,.ltm,[data-lt]";
function ltAnnotate(){if(typeof LT==="undefined")return 0;let n=0;const res=LT.filter(t=>t.re).map(t=>({t,rx:new RegExp(t.re,"i")}));
  document.querySelectorAll(".view").forEach(v=>{if(v.id==="v-review"||v.id==="v-assurance"||v.id==="v-design")return;const seen=new Set();
    const w=document.createTreeWalker(v,NodeFilter.SHOW_TEXT);const todo=[];let node;
    while(node=w.nextNode()){const p=node.parentElement;if(!p||p.closest(LT_SKIP))continue;const box=p.closest(".card,section.block,li,tr")||v;
      for(const {t,rx} of res){const m=node.nodeValue.match(rx);if(!m)continue;const key=t.id+"|"+(box.id||"")+"|"+[...v.querySelectorAll(".card,section.block,li,tr")].indexOf(box);if(seen.has(key))continue;
        /* only quoted or named uses: inside quotation marks, a citation, or a proper name (capitalised context) */
        const before=node.nodeValue.slice(0,m.index),after=node.nodeValue.slice(m.index+m[0].length);
        const quoted=/[“‘"'][^”’"']*$/.test(before)||p.closest("q,cite,blockquote,[data-quote]")||/^[^“‘"']*[”’"']/.test(after)&&/[“‘"']/.test(before);
        if(!quoted&&!t.named)continue;seen.add(key);todo.push({node,idx:m.index,len:m[0].length,t});break}}
    todo.forEach(({node,idx,len,t})=>{try{const r=document.createRange();r.setStart(node,idx);r.setEnd(node,idx+len);const s=document.createElement("span");s.className="ltm";s.dataset.lt=t.id;r.surroundContents(s);
      const a=document.createElement("a");a.className="ltlink";a.href="#"+t.id;a.innerHTML=icon("info")+`<span class="vh">About the term ‘${esc(t.term)}’: language of the time</span>`;s.after(a);n++}catch(e){}})});
  return n}
function ltAudit(){const bad=[];if(typeof LT==="undefined")return{bad:["no register"],n:0,marks:0};
  LT.forEach(t=>{const pubs=new Set((t.src||[]).map(s=>{try{return new URL(SOURCES[s]?SOURCES[s].u:s).hostname.replace(/^www\./,"")}catch(e){return s}}));if(pubs.size<2)bad.push(t.term+": fewer than two independent sources");
    ["meaning_then","why_changed","hub_uses_now"].forEach(k=>{if(!t[k])bad.push(t.term+": no "+k.replace(/_/g," "))});if(!$("#"+t.id))bad.push(t.term+": not shown")});
  /* every listed term that the language check lets through (quotations and names) must have an explanation */
  const covered=new Set(LT.flatMap(t=>t.covers||[]));const need=new Set();
  document.querySelectorAll(".view").forEach(v=>{if(/^v-(review|assurance|design|language)$/.test(v.id))return;const txt=v.textContent;LANG_BANNED.forEach(b=>{if(["Third World","exotic","hard to reach","illegal immigrants","lower-case black","race pay gap","Blacks (noun)"].includes(b.k))return;if(b.re.test(txt))need.add(b.k)})});
  need.forEach(k=>{if(!covered.has(k))bad.push("‘"+k+"’ appears in quotations or names but has no explanation")});
  return{bad,n:LT.length,marks:document.querySelectorAll(".ltm").length,need:[...need]}}
CHECKS.push({id:"C158",n:"Historical terms kept in quotations and names are explained, each with two independent sources, instead of being silently banned or silently used (D-116)",run:c=>({ok:!c.lt.bad.length&&c.lt.n>=10,d:c.lt.bad.length?"Problems: "+c.lt.bad.slice(0,4).join("; "):`${c.lt.n} terms explained on the language page; ${c.lt.marks} quoted or named uses across the hub link to their explanation`}),
  breakIt:c=>{c.lt={...c.lt,bad:["‘half-caste’ appears in quotations or names but has no explanation"]};return c}});
BUILD_TESTS["D-116"]="The language check treated listed terms as banned everywhere outside quotation marks, and quotations kept them without comment, so a reader met words such as ‘half-caste’ or ‘West Indian’ in a document title with no explanation. Historical terms are now kept where they belong and explained (C158); works written to spread prejudice are still paraphrased";
REQS.push({id:"R84",t:"F",r:"On banned words use judgement: explain the language used at the time and adjust it, unless the original work was meant to spread prejudice",o:"Request 62",sat:["lw-time"],ver:["C158","C123"]});
const _ctx69=ctxV15;ctxV15=function(){const c=_ctx69();c.lt=ltAudit();return c};
document.head.insertAdjacentHTML("beforeend",`<style id="v42css">.ltlink{display:inline-flex;vertical-align:super;margin-left:1px;text-decoration:none;min-width:24px;min-height:24px;align-items:center;justify-content:center}.ltlink svg{width:.85em;height:.85em}</style>`);
function v42Boot(){try{ltRender()}catch(e){console.error("language of the time",e)}(window.requestIdleCallback||setTimeout)(()=>{try{window.__ltMarks=ltAnnotate()}catch(e){console.error("lt annotate",e)}},{timeout:5000})}
