function safeHref(u){u=String(u||"");return /^(https?:|mailto:|#)/i.test(u)?esc(u):"#"} /* D-069: external links are escaped and must be http(s) */

/* ================= v1.8 TOOLS: cards or list on every card grid; sort, filter, group, count and export on every table ================= */
const CARDMODE_KEY="cardmode";
function _cardKids(g){return [...g.children].filter(c=>c.matches(".card,article"))}
function _cardTitle(c){const h=c.querySelector("h3,h4,b");return (h?h.textContent:c.textContent).trim().toLowerCase()}
function enhanceGrids(root){(root||document).querySelectorAll(".view .grid").forEach(g=>{
  if(g.dataset.vt||g.closest(".vtskip")||g.id==="factTiles")return;const kids=_cardKids(g);if(kids.length<4)return;
  g.dataset.vt="1";const id=g.id||("grid"+Math.random().toString(36).slice(2,8));g.id=id;
  const bar=document.createElement("div");bar.className="vtbar";bar.setAttribute("role","group");bar.setAttribute("aria-label","How to show these items");
  bar.innerHTML=`<span class="vtlab" aria-hidden="true">${icon("layers")} Show as</span><span class="vtrg" role="radiogroup" aria-label="Show as"><button type="button" role="radio" class="vtb" data-m="cards" aria-checked="true" tabindex="0">${icon("grid")} Cards</button><button type="button" role="radio" class="vtb" data-m="list" aria-checked="false" tabindex="-1">${icon("table")} List</button></span><label class="vtsort">Order<select aria-label="Order of items"><option value="page">As on the page</option><option value="az">A to Z</option><option value="za">Z to A</option></select></label><span class="vtn mono" aria-live="polite"></span>`;
  g.before(bar);
  const setMode=m=>{g.classList.toggle("as-list",m==="list");bar.querySelectorAll(".vtb").forEach(b=>{b.setAttribute("aria-checked",String(b.dataset.m===m));b.tabIndex=b.dataset.m===m?0:-1})};
  bar.querySelector(".vtrg").addEventListener("keydown",e=>{if(!/^Arrow(Left|Right|Up|Down)$/.test(e.key))return;e.preventDefault();const bs=[...bar.querySelectorAll(".vtb")];const i=bs.indexOf(document.activeElement);const n=bs[(i+(/Right|Down/.test(e.key)?1:bs.length-1))%bs.length];n.focus();n.click()});
  let pref="cards";try{pref=store.get(CARDMODE_KEY,"cards")}catch(e){}setMode(pref);
  bar.querySelectorAll(".vtb").forEach(b=>b.addEventListener("click",()=>{setMode(b.dataset.m);try{store.set(CARDMODE_KEY,b.dataset.m)}catch(e){}
    document.querySelectorAll(".grid[data-vt]").forEach(o=>{if(o!==g){o.classList.toggle("as-list",b.dataset.m==="list");const ob=o.previousElementSibling;if(ob&&ob.classList.contains("vtbar"))ob.querySelectorAll(".vtb").forEach(x=>{x.setAttribute("aria-checked",String(x.dataset.m===b.dataset.m));x.tabIndex=x.dataset.m===b.dataset.m?0:-1})}})}));
  const sel=bar.querySelector("select");const count=()=>{const k=_cardKids(g);const v=k.filter(c=>!c.hidden).length;bar.querySelector(".vtn").textContent=v===k.length?`${k.length} items`:`${v} of ${k.length}`};
  let busy=false,gobs=null;const apply=()=>{if(busy)return;busy=true;const k=_cardKids(g);k.forEach((c,i)=>{if(c.dataset.ord===undefined)c.dataset.ord=i});
    const m=sel.value;const s=[...k].sort((a,b)=>m==="page"?(+a.dataset.ord)-(+b.dataset.ord):(m==="az"?1:-1)*_cardTitle(a).localeCompare(_cardTitle(b)));s.forEach(c=>g.appendChild(c));count();if(gobs)gobs.takeRecords();busy=false};
  sel.addEventListener("change",apply);gobs=new MutationObserver(recs=>{if(busy)return;if(recs.some(r=>r.type==="childList"&&r.target===g)){_cardKids(g).forEach(c=>{delete c.dataset.ord});if(sel.value!=="page"){apply();return}}count();gobs.takeRecords()});gobs.observe(g,{childList:true,attributes:true,subtree:true,attributeFilter:["hidden"]});count()})}
/* ---- tables ---- */
function _cellVal(td){const t=(td?td.textContent:"").trim();const n=t.replace(/[£$€,%\s×x]/g,"").replace("−","-");const x=Number(n);return{t,n:n!==""&&/^-?\d+(\.\d+)?$/.test(n)&&isFinite(x)?x:null}}
function _colNumeric(rows,i){const v=rows.map(r=>_cellVal(r.cells[i])).filter(c=>c.t!==""&&c.t!=="—");return v.length>0&&v.every(c=>c.n!==null)}
function enhanceTables(root){(root||document).querySelectorAll(".view table").forEach(t=>{
  if(t.dataset.smart||t.closest(".tskip,[role=grid]")||t.matches(".cal"))return;const head=t.tHead&&t.tHead.rows[0];const body=t.tBodies[0];if(!head||!body)return;
  const rows=[...body.rows];if(rows.length<4||rows.some(r=>[...r.cells].some(c=>c.rowSpan>1||c.colSpan>1)))return;
  const cols=[...head.cells];if(cols.some(c=>c.colSpan>1))return;t.dataset.smart="1";
  const st={sort:-1,dir:1,q:"",grp:-1,closed:new Set(),lim:(rows.length>150&&!rows.some(r=>r.id))?50:Infinity}; /* D-157: long registers show 50 rows at a time; filter and CSV still cover every row */
  const host=t.closest(".tablewrap,.scrollx,.tscroll")||t;const bar=document.createElement("div");bar.className="tbar";bar.setAttribute("role","group");bar.setAttribute("aria-label","Table tools");
  const name=(t.caption&&t.caption.textContent)||(t.getAttribute("aria-label"))||"table";
  bar.innerHTML=`<label>Filter rows<input type="search" class="tq" placeholder="type to filter"></label><label>Group by<select class="tg"><option value="-1">No grouping</option></select></label><label class="tsortl">Sort<select class="ts"><option value="">As shown</option></select></label><span class="tn mono" aria-live="polite"></span><button type="button" class="btn small tcsv">${icon("doc")} Download CSV</button>`;
  const prev=host.previousElementSibling;if(prev&&prev.classList.contains("tbar"))prev.remove();host.before(bar);
  const data=()=>[...body.rows].filter(r=>!r.classList.contains("grp"));
  const gsel=bar.querySelector(".tg");cols.forEach((c,i)=>{const vals=new Set(data().map(r=>_cellVal(r.cells[i]).t));if(vals.size>=2&&vals.size<=12&&vals.size<data().length)gsel.insertAdjacentHTML("beforeend",`<option value="${i}">${esc(c.textContent.trim())}</option>`)});
  if(gsel.options.length<2)gsel.closest("label").hidden=true;
  cols.forEach((c,i)=>{if(c.querySelector("button.thsort"))return;const lab=c.textContent.trim();c.innerHTML=`<button type="button" class="thsort" aria-label="Sort by ${esc(lab)}">${esc(lab)}<span class="sarr" aria-hidden="true">↕</span></button>`;c.setAttribute("aria-sort","none");
    c.querySelector("button").addEventListener("click",()=>{st.dir=st.sort===i?-st.dir:1;st.sort=i;render()})});
  const ssel=bar.querySelector(".ts");cols.forEach((c,i)=>{const l=c.textContent.replace(/[↕↑↓]/g,"").trim();ssel.insertAdjacentHTML("beforeend",`<option value="${i}:1">${esc(l)}, ascending</option><option value="${i}:-1">${esc(l)}, descending</option>`)});
  ssel.addEventListener("change",()=>{const v=ssel.value;if(!v){st.sort=-1}else{const [i,d]=v.split(":").map(Number);st.sort=i;st.dir=d}render()});
  rows.forEach(r=>[...r.cells].forEach((td,i)=>{if(!td.dataset.label&&cols[i])td.dataset.label=cols[i].textContent.replace(/[↕↑↓]/g,"").trim()}));if(cols.length<=6&&!t.closest(".nostack"))t.classList.add("stackable");
  let busy=false,tobs=null,more=null;
  if(st.lim<Infinity){more=document.createElement("div");more.className="tmorebar";more.innerHTML=`<button type="button" class="btn tmore"></button> <button type="button" class="btn tall"></button>`;host.after(more);
    more.querySelector(".tmore").addEventListener("click",()=>{st.lim+=50;render()});more.querySelector(".tall").addEventListener("click",()=>{st.lim=Infinity;t.dataset.showall="1";render();more.hidden=true})}
  const render=()=>{busy=true;[...body.querySelectorAll("tr.grp")].forEach(r=>r.remove());let rs=data();
    if(st.sort>=0){const i=st.sort;const num=_colNumeric(rs,i);rs.sort((a,b)=>{const x=_cellVal(a.cells[i]),y=_cellVal(b.cells[i]);if(num){const xn=x.n===null?-Infinity:x.n,yn=y.n===null?-Infinity:y.n;return st.dir*(xn-yn)}return st.dir*x.t.localeCompare(y.t,"en",{numeric:true})})}
    if(ssel)ssel.value=st.sort<0?"":(st.sort+":"+st.dir);
    cols.forEach((c,i)=>{c.setAttribute("aria-sort",i===st.sort?(st.dir>0?"ascending":"descending"):"none");const a=c.querySelector(".sarr");if(a)a.textContent=i===st.sort?(st.dir>0?"↑":"↓"):"↕"});
    const q=st.q.toLowerCase();let shown=0;
    if(st.grp>=0){const g=st.grp;const groups=new Map();rs.forEach(r=>{const k=_cellVal(r.cells[g]).t||"(blank)";if(!groups.has(k))groups.set(k,[]);groups.get(k).push(r)});
      [...groups.keys()].sort((a,b)=>a.localeCompare(b,"en",{numeric:true})).forEach(k=>{const list=groups.get(k);const vis=list.filter(r=>!q||r.textContent.toLowerCase().includes(q));
        const h=document.createElement("tr");h.className="grp";const open=!st.closed.has(k);h.innerHTML=`<th colspan="${cols.length}" scope="rowgroup"><button type="button" class="grpb" data-k="${esc(k)}" aria-expanded="${open}">${icon(open?"down":"right")} ${esc(k)} <span class="mono muted">${vis.length}</span></button></th>`;
        h.querySelector("button").addEventListener("click",()=>{open?st.closed.add(k):st.closed.delete(k);render();const nb=[...body.querySelectorAll("button.grpb")].find(x=>x.dataset.k===k);if(nb)nb.focus()});body.appendChild(h);
        list.forEach(r=>{body.appendChild(r);const ok=vis.includes(r)&&open;r.hidden=!ok;if(vis.includes(r))shown++})})}
    else rs.forEach(r=>{body.appendChild(r);const ok=!q||r.textContent.toLowerCase().includes(q);r.hidden=!ok||shown>=st.lim;if(ok)shown++});
    const total=data().length;const vis=Math.min(shown,st.lim);bar.querySelector(".tn").textContent=vis===total?`${total} rows`:(vis<shown?`${vis} of ${shown} matching rows shown (${total} in all)`:`${shown} of ${total} rows`);
    if(more){more.hidden=!(shown>st.lim&&st.grp<0);more.querySelector(".tmore").textContent=`Show ${Math.min(50,shown-st.lim)} more`;more.querySelector(".tall").textContent=`Show all ${shown}`}if(tobs)tobs.takeRecords();busy=false};
  bar.querySelector(".tq").addEventListener("input",e=>{st.q=e.target.value;render()});
  gsel.addEventListener("change",e=>{st.grp=+e.target.value;st.closed.clear();render()});
  bar.querySelector(".tcsv").addEventListener("click",async()=>{const q=v=>{let x=String(v);if(/^[=+\-@\t\r]/.test(x))x="'"+x;return `"${x.replace(/"/g,'""')}"`};const lines=[cols.map(c=>q(c.textContent.replace(/[↕↑↓]/g,"").trim())).join(","),...data().filter(r=>!st.q||r.textContent.toLowerCase().includes(st.q.toLowerCase())).map(r=>[...r.cells].map(c=>q(c.textContent.trim())).join(","))];const text=lines.join("\r\n");
    const fn="bhm2026-"+String(name).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,40)+".csv";let d=null;try{d=await claude.use("downloads")}catch(e){}
    if(d){try{await d.save({filename:fn,data:text});toast("Saved")}catch(e){toast("Download cancelled")}}else{copyText(text);toast("Downloads are not available here: table copied as CSV")}});
  tobs=new MutationObserver(()=>{if(!busy)render()});tobs.observe(body,{childList:true});render()})}
let _enhT=0;function enhanceAll(){clearTimeout(_enhT);_enhT=setTimeout(()=>{try{enhanceGrids();enhanceTables()}catch(e){console.warn("enhance",e)}},250)}
