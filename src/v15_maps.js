
/* ================= v1.5: ICONS, VIEW ICONS ================= */
Object.assign(ICONS,{
 globe:"M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2c3 3 4 6 4 10s-1 7-4 10c-3-3-4-6-4-10s1-7 4-10",
 grid:"M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
 bars:"M3 6h12M3 12h18M3 18h8",
 table:"M3 4h18v16H3zM3 10h18M3 15h18M9 4v16",
 plus:"M12 5v14M5 12h14",minus:"M5 12h14",
 reset:"M3 12a9 9 0 109-9 9 9 0 00-7 3.3M3 3v4h4",
 up:"M12 19V5M5 12l7-7 7 7",down:"M12 5v14M5 12l7 7 7-7",left:"M19 12H5M12 5l-7 7 7 7",right:"M5 12h14M12 5l7 7-7 7",
 bulb:"M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z",
 hands:"M7 11V5a2 2 0 014 0v5M11 10V4a2 2 0 014 0v6M15 10V6a2 2 0 014 0v8a8 8 0 01-8 8 7 7 0 01-6-3l-3-5a2 2 0 013-2l2 2",
 ladder:"M7 2v20M17 2v20M7 6h10M7 11h10M7 16h10",
 trend:"M3 17l6-6 4 4 8-8M15 7h6v6",
 people:"M9 11a4 4 0 100-8 4 4 0 000 8zM2 21v-1a6 6 0 0112 0v1M17 11a3 3 0 100-6M22 21v-1a5 5 0 00-4-5",
 megaphone:"M3 10v4h4l7 5V5L7 10zM18 8a5 5 0 010 8",
 slides:"M3 4h18v12H3zM12 16v4M8 20h8",
 branch:"M6 3v12M6 15a3 3 0 100 6 3 3 0 000-6zM18 3a3 3 0 100 6 3 3 0 000-6zM18 9c0 5-12 3-12 6",
 pin:"M12 22s-7-7-7-12a7 7 0 0114 0c0 5-7 12-7 12zM12 12a2 2 0 100-4 2 2 0 000 4",
 home:"M3 11l9-8 9 8v10h-6v-6H9v6H3z",
 star:"M12 2l3 7 7 .6-5.3 4.6L18.4 22 12 18.3 5.6 22l1.7-7.8L2 9.6 9 9z",
 heart:"M12 21s-8-5-8-11a5 5 0 019-3 5 5 0 019 3c0 6-8 11-8 11z",
 award:"M12 15a6 6 0 100-12 6 6 0 000 12zM8.5 14L7 22l5-3 5 3-1.5-8",
 briefcase:"M3 7h18v13H3zM8 7V4h8v3M3 13h18",
 check:"M4 12l5 5L20 6",
 bowl:"M3 11h18a9 9 0 01-18 0zM8 7c0-2 2-2 2-4M14 7c0-2 2-2 2-4",
 cpu:"M7 7h10v10H7zM10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3",
 candle:"M12 2c2 2 2 4 0 5-2-1-2-3 0-5zM9 9h6v13H9z",
 debate:"M3 4h12v8H8l-5 4zM21 9v8l-4-3h-6v-2",
 link:"M10 14a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 10a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1",
 doc:"M6 2h9l5 5v15H6zM14 2v6h6M9 13h8M9 17h8",
 eye:"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6",
 route:"M6 19a2 2 0 100-4 2 2 0 000 4zM18 9a2 2 0 100-4 2 2 0 000 4zM6 15V9a3 3 0 013-3h6M18 9v6a3 3 0 01-3 3H9"
});
const VIEW_ICONS={overview:"home",theme:"spark",africa:"symbol",diaspora:"globe",history:"clock",futures:"compass",innovation:"award",tech:"cpu",design:"doc",food:"bowl",remember:"candle",debates:"debate",myths:"bulb",calendar:"calendar",toolkit:"tool",leaders:"flag",belonging:"heart",involve:"hands",careers:"ladder",networks:"people",posters:"image",brand:"layers",connect:"link",resources:"book",knowledge:"graph",about:"info",assurance:"shield"};
const GROUP_ICONS={"Learn":"book","Act":"hands","Make and share":"image","Reference":"graph"};
const vIcon=id=>icon(VIEW_ICONS[id]||"info");

/* ================= v1.5: INTERACTIVE MAPS ================= */
/* UN M49 regions for each diaspora place, and UK nation for each history place */
const M49={london:"Northern Europe",lisbon:"Southern Europe",paris:"Western Europe",amsterdam:"Western Europe",harlem:"Northern America",gullah:"Northern America",birchtown:"Northern America",havana:"Caribbean",accompong:"Caribbean",haiti:"Caribbean",barbados:"Caribbean",trinidad:"Caribbean",garifuna:"Central America",costachica:"Central America",palenque:"South America",esmeraldas:"South America",suriname:"South America",salvador:"South America",peru:"South America",izmir:"Western Asia",basra:"Western Asia",karachi:"Southern Asia",siddi:"Southern Asia",andaman:"Southern Asia",lemorne:"Eastern Africa",aeta:"South-eastern Asia",melanesia:"Melanesia",australia:"Australia and New Zealand"};
const M49_CONT={"Northern Europe":"Europe","Southern Europe":"Europe","Western Europe":"Europe","Northern America":"Americas","Caribbean":"Americas","Central America":"Americas","South America":"Americas","Western Asia":"Asia","Southern Asia":"Asia","South-eastern Asia":"Asia","Eastern Africa":"Africa","Melanesia":"Oceania","Australia and New Zealand":"Oceania"};
const UK_NATION={westminster:"England",nottinghill:"England",tilbury:"England",bristol:"England",manchester:"England",glasgow:"Scotland",belfast:"Northern Ireland",cardiff:"Wales"};
const MAPS={};
function mapTip(){let t=$("#mapTip");if(!t){t=document.createElement("div");t.id="mapTip";t.className="maptip";t.setAttribute("aria-hidden","true");t.hidden=true;document.body.appendChild(t)}return t}
function showMapTip(el,ev){const t=mapTip();t.innerHTML=el.dataset.tip;t.hidden=false;const r=ev&&ev.clientX!==undefined&&ev.type!=="focusin"?{x:ev.clientX,y:ev.clientY}:(()=>{const b=el.getBoundingClientRect();return{x:b.left+b.width/2,y:b.top}})();
  const w=t.offsetWidth,h=t.offsetHeight;t.style.left=Math.max(8,Math.min(innerWidth-w-8,r.x-w/2))+"px";t.style.top=Math.max(8,r.y-h-12)+"px"}
function hideMapTip(){const t=$("#mapTip");if(t)t.hidden=true}
function bindTips(root){root.querySelectorAll("[data-tip]").forEach(el=>{if(el._tip)return;el._tip=1;el.addEventListener("pointermove",e=>showMapTip(el,e));el.addEventListener("pointerleave",hideMapTip);el.addEventListener("focusin",e=>showMapTip(el,e));el.addEventListener("focusout",hideMapTip)})}

function mapKit(cfg){
  const svg=$(cfg.svg);const base=svg.getAttribute("viewBox").split(/[ ,]+/).map(Number);
  const st={x:base[0],y:base[1],w:base[2],h:base[3],z:1,view:cfg.views[0].k};
  let frame=cfg.frame?$(cfg.frame):null;
  if(!frame){frame=document.createElement("div");frame.className="mapframe";svg.before(frame);frame.appendChild(svg)}
  const outer=cfg.outer?$(cfg.outer):frame;
  const bar=document.createElement("div");bar.className="mapbar";bar.id="mb-"+cfg.id;
  bar.innerHTML=`<div class="seg" role="group" aria-label="${esc(cfg.label)}: choose how to view it">${cfg.views.map((v,i)=>`<button type="button" data-v="${v.k}" aria-pressed="${i===0}">${icon(v.ic)}<span>${esc(v.l)}</span></button>`).join("")}</div>
   <div class="zoom" role="group" aria-label="Zoom and move the map">
    <button type="button" data-z="in" title="Zoom in" aria-label="Zoom in">${icon("plus")}</button><button type="button" data-z="out" title="Zoom out" aria-label="Zoom out">${icon("minus")}</button>
    <button type="button" data-z="left" title="Move left" aria-label="Move left">${icon("left")}</button><button type="button" data-z="up" title="Move up" aria-label="Move up">${icon("up")}</button><button type="button" data-z="down" title="Move down" aria-label="Move down">${icon("down")}</button><button type="button" data-z="right" title="Move right" aria-label="Move right">${icon("right")}</button>
    <button type="button" data-z="reset" title="Reset the view" aria-label="Reset the view">${icon("reset")}</button><span class="mono zl" aria-hidden="true">1×</span></div>
   <p class="sr-only" role="status" aria-live="polite" id="mbs-${cfg.id}"></p>`;
  outer.before(bar);
  const hint=document.createElement("p");hint.className="maphint mono";hint.id="mh-"+cfg.id;hint.textContent="Drag, or use the buttons, to move. Ctrl and scroll, or + and −, to zoom. When the map has focus, arrow keys move it and 0 resets it.";
  frame.appendChild(hint);
  const alt=document.createElement("div");alt.className="altview";alt.id="alt-"+cfg.id;alt.hidden=true;outer.after(alt);
  svg.setAttribute("tabindex","0");svg.setAttribute("aria-describedby",hint.id);
  const say=m=>{$("#mbs-"+cfg.id).textContent=m};
  const apply=()=>{svg.setAttribute("viewBox",`${st.x.toFixed(2)} ${st.y.toFixed(2)} ${st.w.toFixed(2)} ${st.h.toFixed(2)}`);svg.style.setProperty("--z",st.z.toFixed(3));bar.querySelector(".zl").textContent=(Math.round(st.z*10)/10)+"×"};
  const clamp=()=>{st.x=Math.max(base[0]-st.w*.25,Math.min(base[0]+base[2]-st.w*.75,st.x));st.y=Math.max(base[1]-st.h*.25,Math.min(base[1]+base[3]-st.h*.75,st.y))};
  const zoomAt=(f,cx,cy)=>{const nz=Math.max(1,Math.min(8,st.z*f));if(nz===st.z)return;const k=st.z/nz;cx=cx??st.x+st.w/2;cy=cy??st.y+st.h/2;st.x=cx-(cx-st.x)*k;st.y=cy-(cy-st.y)*k;st.w*=k;st.h*=k;st.z=nz;if(nz===1){st.x=base[0];st.y=base[1]}clamp();apply();say(`Zoom ${Math.round(st.z*10)/10} times`)};
  const pan=(dx,dy)=>{if(st.z===1){say("Zoom in first to move the map");return}st.x+=dx*st.w;st.y+=dy*st.h;clamp();apply();say("Map moved")};
  const reset=()=>{Object.assign(st,{x:base[0],y:base[1],w:base[2],h:base[3],z:1});apply();say("View reset")};
  const zoomTo=(px,py,z=3)=>{reset();st.z=z;st.w=base[2]/z;st.h=base[3]/z;st.x=px-st.w/2;st.y=py-st.h/2;clamp();apply();say(`Zoomed to ${z} times`)};
  bar.querySelectorAll("[data-z]").forEach(b=>b.addEventListener("click",()=>{const z=b.dataset.z;if(z==="in")zoomAt(1.6);else if(z==="out")zoomAt(1/1.6);else if(z==="reset")reset();else pan(z==="left"?-.2:z==="right"?.2:0,z==="up"?-.2:z==="down"?.2:0)}));
  svg.addEventListener("keydown",e=>{if(e.target!==svg&&!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","+","=","-","0"].includes(e.key))return;
    const m={ArrowLeft:[-.15,0],ArrowRight:[.15,0],ArrowUp:[0,-.15],ArrowDown:[0,.15]}[e.key];
    if(m){e.preventDefault();pan(...m)}else if(e.key==="+"||e.key==="="){e.preventDefault();zoomAt(1.6)}else if(e.key==="-"){e.preventDefault();zoomAt(1/1.6)}else if(e.key==="0"){e.preventDefault();reset()}});
  svg.addEventListener("wheel",e=>{if(!(e.ctrlKey||e.metaKey)){hint.classList.add("flash");clearTimeout(hint._t);hint._t=setTimeout(()=>hint.classList.remove("flash"),1200);return}e.preventDefault();const p=svgPt(svg,e);zoomAt(e.deltaY<0?1.25:.8,p.x,p.y)},{passive:false});
  let drag=null;
  svg.addEventListener("pointerdown",e=>{if(st.z===1||e.button!==0)return;drag={x:e.clientX,y:e.clientY,sx:st.x,sy:st.y,moved:false,id:e.pointerId}});
  svg.addEventListener("pointermove",e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(!drag.moved&&Math.hypot(dx,dy)<4)return;if(!drag.moved){drag.moved=true;svg.setPointerCapture(drag.id);svg.classList.add("dragging")}const r=svg.getBoundingClientRect();st.x=drag.sx-dx*st.w/r.width;st.y=drag.sy-dy*st.h/r.height;clamp();apply()});
  const end=()=>{if(drag&&drag.moved){svg.classList.remove("dragging");svg.addEventListener("click",ev=>{ev.stopPropagation();ev.preventDefault()},{capture:true,once:true})}drag=null};
  svg.addEventListener("pointerup",end);svg.addEventListener("pointercancel",end);
  const setView=k=>{const v=cfg.views.find(x=>x.k===k);if(!v)return;st.view=k;bar.querySelectorAll("[data-v]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.v===k));
    const onMap=!v.render;outer.hidden=!onMap;alt.hidden=onMap;bar.querySelector(".zoom").hidden=!onMap;if(cfg.wrap)$(cfg.wrap).classList.toggle("alton",!onMap);
    cfg.views.forEach(x=>{if(x.off&&x.k!==k)x.off()});if(v.on)v.on();
    if(v.render){alt.innerHTML="";v.render(alt);bindTips(alt)};if(typeof fixA11y==="function")fixA11y();
    say(`Showing ${v.l.toLowerCase()} view`);try{store.set("mv:"+cfg.id,k)}catch(e){}};
  bar.querySelectorAll("[data-v]").forEach(b=>b.addEventListener("click",()=>setView(b.dataset.v)));
  apply();bindTips(svg);
  const api={cfg,st,svg,bar,alt,zoomAt,zoomTo,reset,pan,setView};MAPS[cfg.id]=api;
  return api;
}
function svgPt(svg,e){const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const m=svg.getScreenCTM();return m?p.matrixTransform(m.inverse()):{x:0,y:0}}

/* ---------- shared renderers for alternative views ---------- */
function tableView(host,{caption,cols,rows,sortable=true}){
  let sortI=-1,dir=1;
  const draw=()=>{const r=[...rows];if(sortI>=0)r.sort((a,b)=>String(a[sortI]).localeCompare(String(b[sortI]),"en",{numeric:true})*dir);
    host.querySelector("tbody").innerHTML=r.map(x=>`<tr>${x.map((c,i)=>`<td${i===0?' scope="row"':""}>${c}</td>`).join("")}</tr>`).join("");
    host.querySelectorAll("th button").forEach((b,i)=>{b.closest("th").setAttribute("aria-sort",i===sortI?(dir>0?"ascending":"descending"):"none")})};
  host.innerHTML=`<div class="tablewrap"><table><caption>${esc(caption)}</caption><thead><tr>${cols.map(c=>`<th scope="col">${sortable?`<button type="button" class="thsort">${esc(c)} <span aria-hidden="true">↕</span></button>`:esc(c)}</th>`).join("")}</tr></thead><tbody></tbody></table></div>`;
  host.querySelectorAll("th button").forEach((b,i)=>b.addEventListener("click",()=>{dir=sortI===i?-dir:1;sortI=i;draw()}));draw();}
function stackedBars(host,{title,cats,groups,colors,note}){/* groups: [{k,label,counts:{cat:n}}] */
  const W=640,rowH=30,top=10,left=190,right=40,maxV=Math.max(1,...groups.map(g=>cats.reduce((a,c)=>a+(g.counts[c]||0),0)));const H=top+groups.length*rowH+30;const sx=v=>v*(W-left-right)/maxV;
  let s="";groups.forEach((g,i)=>{let x=left;const y=top+i*rowH;s+=`<text class="cl" x="${left-8}" y="${y+18}" text-anchor="end">${esc(g.label)}</text>`;cats.forEach(c=>{const v=g.counts[c]||0;if(!v)return;const w=sx(v);s+=`<rect x="${x.toFixed(1)}" y="${y+4}" width="${Math.max(1,w-1).toFixed(1)}" height="${rowH-10}" rx="3" fill="${colors[c]}" data-tip="${esc(g.label)}: ${v} ${esc(cats.length>1?c:"")}" tabindex="0" aria-label="${esc(g.label)}, ${esc(c)}: ${v}"></rect>`;x+=w});
    const tot=cats.reduce((a,c)=>a+(g.counts[c]||0),0);s+=`<text class="cv" x="${(x+6).toFixed(1)}" y="${y+18}">${tot}</text>`});
  host.insertAdjacentHTML("beforeend",`<figure class="chartfig"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title>${s}</svg>${note?`<figcaption class="muted">${note}</figcaption>`:""}</figure>`)}

/* ---------- world map: views ---------- */
function diaRows(){return DIASPORA.map(d=>[`<b>${esc(d.n)}</b>`,M49[d.id],M49_CONT[M49[d.id]],esc(DCATS[d.cat].n),d.maroon?"Yes":"",d.lat.toFixed(2),d.lon.toFixed(2),d.src?evTag(d.src):'<span class="tag ref">Reference</span>'])}
const DCOL={atlantic:"var(--red)",indian:"var(--r-east)",modern:"var(--gold-ink)",deemed:"var(--r-pan)"};
function worldByRegion(host){const regs=[...new Set(DIASPORA.map(d=>M49[d.id]))].sort((a,b)=>M49_CONT[a].localeCompare(M49_CONT[b])||a.localeCompare(b));
  host.innerHTML=`<p class="muted" style="margin-bottom:var(--s3)">The ${DIASPORA.length} places grouped by UN M49 region and continent. Colour shows the kind of community. Select a tile to find it in the list below.</p><div class="regtiles">${regs.map(r=>`<div class="regcol"><p class="eyebrow">${esc(M49_CONT[r])}</p><h3>${esc(r)} <span class="mono muted">${DIASPORA.filter(d=>M49[d.id]===r).length}</span></h3><div class="tilewrap">${DIASPORA.filter(d=>M49[d.id]===r).map(d=>`<button type="button" class="ptile" style="--c:${DCOL[d.cat]}" data-pick="${d.id}" data-tip="<b>${esc(d.n)}</b><br>${esc(DCATS[d.cat].n)}">${esc(d.short||d.n.split(",")[0])}</button>`).join("")}</div></div>`).join("")}</div>`;
  host.querySelectorAll("[data-pick]").forEach(b=>b.addEventListener("click",()=>{selectDia(b.dataset.pick,true)}))}
function worldChart(host){const conts=["Africa","Americas","Asia","Europe","Oceania"];const cats=Object.keys(DCATS);
  const groups=conts.map(c=>({label:c,counts:Object.fromEntries(cats.map(k=>[k,DIASPORA.filter(d=>M49_CONT[M49[d.id]]===c&&d.cat===k).length]))})).filter(g=>Object.values(g.counts).some(Boolean));
  host.innerHTML=`<p class="muted" style="margin-bottom:var(--s3)">How many of the places on this map are in each continent, split by kind of community. These are the places this hub covers, not a census of the diaspora.</p>`;
  stackedBars(host,{title:"Places on the map by continent and kind of community",cats,groups,colors:DCOL});
  host.insertAdjacentHTML("beforeend",`<div class="legend">${cats.map(k=>`<span><i style="background:${DCOL[k]}"></i>${esc(DCATS[k].n)}</span>`).join("")}</div>`)}
function worldTable(host){tableView(host,{caption:`All ${DIASPORA.length} diaspora and settlement places`,cols:["Place","UN M49 region","Continent","Kind of community","Maroon heritage","Latitude","Longitude","Evidence"],rows:diaRows()})}

/* ---------- globe (orthographic) ---------- */
const GLOBE_RINGS="%%GLOBE%%".split(";").map(r=>r.split(" ").map(p=>p.split(",").map(n=>+n/2)));
const globeSt={lon:-20,lat:10,spin:false};
function orthoP(lon,lat,c){const r=Math.PI/180,l=(lon-c.lon)*r,p=lat*r,p0=c.lat*r;
  const x=Math.cos(p)*Math.sin(l),y=Math.cos(p0)*Math.sin(p)-Math.sin(p0)*Math.cos(p)*Math.cos(l),cz=Math.sin(p0)*Math.sin(p)+Math.cos(p0)*Math.cos(p)*Math.cos(l);return[x,y,cz>=0]}
function globeSVG(c){const R=190,C=210;const P=(lon,lat)=>{let [x,y,v]=orthoP(lon,lat,c);if(!v){const h=Math.hypot(x,y)||1;x/=h;y/=h}return[C+x*R,C-y*R,v]};
  let land="";GLOBE_RINGS.forEach(ring=>{const pts=ring.map(([lo,la])=>P(lo,la));if(!pts.some(p=>p[2]))return;land+="M"+pts.map(p=>p[0].toFixed(1)+" "+p[1].toFixed(1)).join("L")+"Z"});
  let grat="";for(let lo=-180;lo<180;lo+=30){let d="",pen=false;for(let la=-90;la<=90;la+=5){const [x,y,v]=orthoP(lo,la,c);if(v){d+=(pen?"L":"M")+(C+x*R).toFixed(1)+" "+(C-y*R).toFixed(1);pen=true}else pen=false}grat+=d}
  for(let la=-60;la<=60;la+=30){let d="",pen=false;for(let lo=-180;lo<=180;lo+=5){const [x,y,v]=orthoP(lo,la,c);if(v){d+=(pen?"L":"M")+(C+x*R).toFixed(1)+" "+(C-y*R).toFixed(1);pen=true}else pen=false}grat+=d}
  const vis=DIASPORA.filter(d=>diCats.has(d.cat)).map(d=>{const [x,y,v]=orthoP(d.lon,d.lat,c);return{d,x:C+x*R,y:C-y*R,v}}).filter(p=>p.v);
  const af=orthoP(20,4,c);
  return {vis,svg:`<svg id="globeSvg" viewBox="0 0 420 420" role="img" aria-labelledby="globeT" tabindex="0"><title id="globeT">Globe centred on longitude ${Math.round(c.lon)}, latitude ${Math.round(c.lat)}, showing ${vis.length} of the diaspora places on the side facing you</title>
   <defs><radialGradient id="gshade" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></radialGradient></defs>
   <circle cx="${C}" cy="${C}" r="${R}" fill="var(--sea)" stroke="var(--line)"/><path d="${grat}" fill="none" stroke="var(--line)" stroke-width=".6"/><path d="${land}" fill="var(--land)" stroke="var(--muted)" stroke-width=".4" fill-rule="nonzero"/>
   ${af[2]?`<text class="clbl" x="${(C+af[0]*R).toFixed(1)}" y="${(C-af[1]*R).toFixed(1)}" text-anchor="middle">Africa</text>`:""}
   ${vis.map(p=>`<g class="dpin c-${p.d.cat}" data-gid="${p.d.id}" tabindex="0" role="button" aria-label="${esc(p.d.n)}" data-tip="<b>${esc(p.d.n)}</b><br>${esc(DCATS[p.d.cat].n)}"><circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="5"/></g>`).join("")}
   <circle cx="${C}" cy="${C}" r="${R}" fill="url(#gshade)" pointer-events="none"/></svg>`}}
function globeView(host){
  host.innerHTML=`<div class="globewrap"><div id="globeBox"></div><div><h3>Turn the globe</h3><p class="muted">Drag the globe, use the arrow keys when it has focus, or use these buttons. A globe shows true shapes near the centre and hides the far side, so it is best for seeing which places face each other across an ocean.</p>
   <div class="btnrow" role="group" aria-label="Turn the globe"><button class="btn" type="button" data-g="-30,0">${icon("left")} West</button><button class="btn" type="button" data-g="30,0">East ${icon("right")}</button><button class="btn" type="button" data-g="0,15">${icon("up")} North</button><button class="btn" type="button" data-g="0,-15">${icon("down")} South</button></div>
   <p class="eyebrow" style="margin-top:var(--s3)">Centre on</p><div class="btnrow" role="group" aria-label="Centre the globe on">${[["Africa",20,5],["The Atlantic",-35,15],["Indian Ocean",70,-5],["The Caribbean",-70,15],["Asia and Pacific",120,0]].map(([n,lo,la])=>`<button class="btn" type="button" data-c="${lo},${la}">${n}</button>`).join("")}</div>
   <button class="btn" type="button" id="globeSpin" aria-pressed="false" style="margin-top:var(--s3)">Spin slowly</button>
   <p class="sr-only" role="status" aria-live="polite" id="globeSt"></p><ul class="globelist" id="globeList" aria-label="Places on the side of the globe facing you"></ul></div></div>`;
  const draw=()=>{const g=globeSVG(globeSt);$("#globeBox").innerHTML=g.svg;window.__globe={n:g.vis.length,ids:g.vis.map(p=>p.d.id),c:{...globeSt}};
    $("#globeList").innerHTML=g.vis.map(p=>`<li><button type="button" class="linkish" data-pick="${p.d.id}">${esc(p.d.short||p.d.n.split(",")[0])}</button></li>`).join("");
    $("#globeSt").textContent=`Globe centred on longitude ${Math.round(globeSt.lon)}, latitude ${Math.round(globeSt.lat)}. ${g.vis.length} places face you.`;
    bindTips($("#globeBox"));$$("#globeBox [data-gid],#globeList [data-pick]").forEach(b=>{const id=b.dataset.gid||b.dataset.pick;const go=()=>selectDia(id,true);b.addEventListener("click",go);b.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go()}})});
    const sv=$("#globeSvg");sv.addEventListener("keydown",e=>{const m={ArrowLeft:[-15,0],ArrowRight:[15,0],ArrowUp:[0,10],ArrowDown:[0,-10]}[e.key];if(m&&e.target===sv){e.preventDefault();turn(...m);$("#globeSvg").focus()}});
    let d=null;sv.addEventListener("pointerdown",e=>{d={x:e.clientX,y:e.clientY,lo:globeSt.lon,la:globeSt.lat};sv.setPointerCapture(e.pointerId)});
    sv.addEventListener("pointermove",e=>{if(!d)return;globeSt.lon=d.lo-(e.clientX-d.x)*.4;globeSt.lat=Math.max(-60,Math.min(60,d.la+(e.clientY-d.y)*.4));requestAnimationFrame(()=>{const keep=d;draw();d=keep})});
    sv.addEventListener("pointerup",()=>{d=null});if(typeof fixA11y==="function")fixA11y()};
  const turn=(dl,dp)=>{globeSt.lon=((globeSt.lon+dl+540)%360)-180;globeSt.lat=Math.max(-60,Math.min(60,globeSt.lat+dp));draw()};
  host.querySelectorAll("[data-g]").forEach(b=>b.addEventListener("click",()=>{const [a,c]=b.dataset.g.split(",").map(Number);turn(a,c)}));
  host.querySelectorAll("[data-c]").forEach(b=>b.addEventListener("click",()=>{const [a,c]=b.dataset.c.split(",").map(Number);globeSt.lon=a;globeSt.lat=c;draw()}));
  $("#globeSpin").addEventListener("click",e=>{if(!motionOn()){toast("Animations are switched off in the Access panel");return}globeSt.spin=!globeSt.spin;e.currentTarget.setAttribute("aria-pressed",globeSt.spin);const step=()=>{if(!globeSt.spin||!$("#globeSvg")||!motionOn()){globeSt.spin=false;return}turn(.6,0);setTimeout(()=>requestAnimationFrame(step),60)};step()});
  draw()}

/* ---------- Africa: views ---------- */
const AF_SETS=()=>({Motifs:MOTIFS.map(m=>m.region),Scripts:SCRIPTS.map(s=>s.r),Words:WORDS.map(w=>w.r),Proverbs:PROVERBS.map(p=>p.r),Customs:CUSTOMS.map(c=>c.r),Dishes:DISHES.map(d=>d.r)});
const AF_COL={Motifs:"var(--gold-ink)",Scripts:"var(--r-east)",Words:"var(--red)",Proverbs:"var(--green)",Customs:"var(--r-central)",Dishes:"var(--r-north)"};
function afCounts(){const S=AF_SETS();const regs=Object.keys(REGIONS).filter(r=>REGIONS[r].au);return regs.map(r=>({r,label:REGIONS[r].n,counts:Object.fromEntries(Object.entries(S).map(([k,arr])=>[k,arr.filter(x=>x===r).length])),countries:WORLD.countries.filter(c=>c.r===r).length}))}
function afTiles(host){const rows=afCounts();const pos={north:"1 / 2 / 2 / 4",west:"2 / 1 / 3 / 2",central:"2 / 2 / 3 / 3",east:"2 / 3 / 3 / 4",south:"3 / 2 / 4 / 4"};
  host.innerHTML=`<p class="muted" style="margin-bottom:var(--s3)">A tile map: each African Union region is one tile, placed roughly where it sits on the continent, so small regions are as easy to read as large ones. Numbers count the countries drawn on the map and the heritage items in this hub from each region.</p>
   <div class="aftiles">${rows.map(x=>{const tot=Object.values(x.counts).reduce((a,b)=>a+b,0);return `<button type="button" class="aftile" style="grid-area:${pos[x.r]};--c:var(--r-${x.r})" data-r="${x.r}" aria-label="${esc(x.label)}: ${x.countries} countries on the map, ${tot} heritage items. Select to filter motifs."><span class="eyebrow">${esc(x.label)}</span><span class="stat">${tot}</span><span class="mono">heritage items</span><span class="mono muted">${x.countries} countries on the map</span></button>`}).join("")}</div>`;
  host.querySelectorAll("[data-r]").forEach(b=>b.addEventListener("click",()=>{setAfRegion(b.dataset.r);toast(REGIONS[b.dataset.r].n+": motifs filtered below")}))}
function afChart(host){const rows=afCounts();const cats=Object.keys(AF_SETS());host.innerHTML=`<p class="muted" style="margin-bottom:var(--s3)">Heritage items in this hub by African Union region and type. Uneven bars show where this edition is thin, not where heritage is.</p>`;
  stackedBars(host,{title:"Heritage items by African Union region and type",cats,groups:rows,colors:AF_COL});
  host.insertAdjacentHTML("beforeend",`<div class="legend">${cats.map(k=>`<span><i style="background:${AF_COL[k]}"></i>${k}</span>`).join("")}</div>`)}
function afTable(host){const rows=WORLD.countries.filter(c=>c.r).map(c=>[`<b>${esc(c.n)}</b>`,`<span class="rdot" style="background:var(--r-${c.r})"></span>${esc(REGIONS[c.r].n)}`]);
  tableView(host,{caption:`${rows.length} African countries and territories drawn on the map, by African Union region`,cols:["Country or territory","African Union region"],rows});
  const sum=afCounts();host.insertAdjacentHTML("afterbegin",`<div class="grid g3" style="margin-bottom:var(--s3)">${sum.map(x=>`<div class="card"><span class="eyebrow">${esc(x.label)}</span><span class="stat">${x.countries}</span><span class="mono muted">countries on the map</span></div>`).join("")}</div>`)}
function afChoroOn(){const rows=afCounts();const tot=Object.fromEntries(rows.map(x=>[x.r,Object.values(x.counts).reduce((a,b)=>a+b,0)]));const mx=Math.max(...Object.values(tot));
  $$("#afSvg .af").forEach(p=>{const v=tot[p.dataset.r]||0;p.style.fill=`color-mix(in srgb, var(--gold-ink) ${Math.round(15+85*v/mx)}%, var(--surface))`;const t=p.querySelector("title");p.dataset.tip=`<b>${esc(t?t.textContent:"")}</b><br>${v} heritage items in this region`});
  $("#afChoroKey").hidden=false;$("#afChoroKey").innerHTML=`<span class="mono muted">Fewer items</span><span class="ramp"></span><span class="mono muted">More (${mx})</span>`;bindTips($("#afSvg"))}
function afChoroOff(){$$("#afSvg .af").forEach(p=>{p.style.fill="";const t=p.querySelector("title");p.dataset.tip=t?`<b>${esc(t.textContent)}</b>`:""});const k=$("#afChoroKey");if(k)k.hidden=true}

/* ---------- UK: views ---------- */
function ukTimeline(host){const evs=PLACES.flatMap(p=>p.ev.map(id=>({p,e:EVENTS.find(x=>x.id===id)}))).filter(x=>x.e);
  const y0=1890,y1=2000,W=640,left=150,top=16,rowH=28,H=top+PLACES.length*rowH+30,X=y=>left+(y-y0)/(y1-y0)*(W-left-20);
  let s="";for(let y=1900;y<=2000;y+=20)s+=`<line x1="${X(y)}" x2="${X(y)}" y1="${top-6}" y2="${H-24}" stroke="var(--line)"/><text class="cv" x="${X(y)}" y="${H-8}" text-anchor="middle">${y}</text>`;
  PLACES.forEach((p,i)=>{const y=top+i*rowH+10;s+=`<text class="cl" x="${left-10}" y="${y+4}" text-anchor="end">${esc(p.n.split(",")[0].replace(" (Tiger Bay)",""))}</text>`;
    evs.filter(x=>x.p===p).forEach(x=>{s+=`<a href="#${x.e.id}" data-tip="<b>${x.e.yl||x.e.y}</b> ${esc(x.e.t)}" aria-label="${x.e.yl||x.e.y}: ${esc(x.e.t)}"><circle cx="${X(x.e.y).toFixed(1)}" cy="${y}" r="7" fill="var(--red)" stroke="var(--surface)" stroke-width="2"/></a>`})});
  host.innerHTML=`<p class="muted" style="margin-bottom:var(--s3)">Each row is a place on the map; each dot is a timeline entry that happened there. Select a dot to read the entry.</p><figure class="chartfig"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Timeline entries by place, 1890 to 2000"><title>Timeline entries by place, 1890 to 2000</title>${s}</svg></figure>`;window.__ukdots=evs.length}
function ukNations(host){const n=["England","Scotland","Wales","Northern Ireland"];const pos={"Scotland":"1 / 2 / 2 / 3","Northern Ireland":"2 / 1 / 3 / 2","England":"2 / 2 / 4 / 3","Wales":"3 / 1 / 4 / 2"};
  host.innerHTML=`<p class="muted" style="margin-bottom:var(--s3)">A tile map of the four nations, sized equally so that each nation's coverage is easy to compare. Coverage outside England is thin in this edition.</p><div class="uktiles">${n.map(x=>{const ps=PLACES.filter(p=>UK_NATION[p.id]===x);const ev=ps.reduce((a,p)=>a+p.ev.length,0);return `<div class="uktile" style="grid-area:${pos[x]}"><span class="eyebrow">${x}</span><span class="stat">${ps.length}</span><span class="mono">${ps.length===1?"place":"places"}, ${ev} ${ev===1?"entry":"entries"}</span><span class="muted" style="font-size:.85rem">${ps.map(p=>esc(p.n.split(",")[0])).join(", ")||"None yet"}</span></div>`}).join("")}</div>`}
function ukTable(host){tableView(host,{caption:`${PLACES.length} places on the history map`,cols:["Place","Nation","What happened","Years","Latitude","Longitude"],rows:PLACES.map(p=>[`<b>${esc(p.n)}</b>`,UK_NATION[p.id],esc(p.d),p.ev.map(id=>{const e=EVENTS.find(x=>x.id===id);return e?`<a href="#${id}">${e.yl||e.y}</a>`:""}).join(", "),p.lat.toFixed(3),p.lon.toFixed(3)])})}

/* ---------- networks: nation tiles ---------- */
function renderNwTiles(){const host=$("#nwTiles");if(!host)return;const by={};NETWORKS.forEach(n=>{by[n.na]=(by[n.na]||0)+1});
  host.innerHTML=Object.entries(by).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<button type="button" class="nwtile" data-na="${esc(k)}" aria-pressed="${$("#nwNation").value===k}">${icon(k==="UK-wide"?"globe":"pin")}<span class="stat">${v}</span><span>${esc(k)}</span></button>`).join("");
  host.querySelectorAll("[data-na]").forEach(b=>b.addEventListener("click",()=>{const s=$("#nwNation");const v=b.dataset.na;s.value=s.value===v?"all":v;if(s.value!==v&&![...s.options].some(o=>o.value===v))return;renderNetworks();renderNwTiles()}))}

function initMaps(){
  // world
  const w=mapKit({id:"world",svg:"#worldSvg",frame:".worldbox",label:"World map",views:[
    {k:"map",l:"Map",ic:"map"},{k:"globe",l:"Globe",ic:"globe",render:globeView},{k:"regions",l:"By region",ic:"grid",render:worldByRegion},{k:"chart",l:"Chart",ic:"bars",render:worldChart},{k:"table",l:"Table",ic:"table",render:worldTable}]});
  $$("#worldSvg .dpin").forEach(g=>{const d=DIASPORA.find(x=>x.id===g.dataset.id);g.dataset.tip=`<b>${esc(d.n)}</b><br>${esc(DCATS[d.cat].n)} · ${esc(M49[d.id])}`});
  $$("#worldSvg .wl").forEach(p=>{const t=p.querySelector("title");if(t)p.dataset.tip=`<b>${esc(t.textContent)}</b>`});bindTips($("#worldSvg"));
  // Africa
  const af=mapKit({id:"africa",svg:"#afSvg",wrap:".afwrap",label:"Africa map",views:[
    {k:"map",l:"Regions",ic:"map",on:afChoroOff},{k:"heat",l:"Heritage density",ic:"layers",on:afChoroOn,off:afChoroOff},{k:"tiles",l:"Tile map",ic:"grid",render:afTiles},{k:"chart",l:"Chart",ic:"bars",render:afChart},{k:"table",l:"Table",ic:"table",render:afTable}]});
  $("#afSvg").closest(".mapframe").insertAdjacentHTML("beforeend",`<div class="choro" id="afChoroKey" hidden></div>`);afChoroOff();bindTips($("#afSvg"));
  // UK
  const uk=mapKit({id:"uk",svg:"#mapSvg",wrap:".mapwrap",label:"History map",views:[
    {k:"map",l:"Map",ic:"map"},{k:"time",l:"Timeline by place",ic:"clock",render:ukTimeline},{k:"nations",l:"Four nations",ic:"grid",render:ukNations},{k:"table",l:"Table",ic:"table",render:ukTable}]});
  $$("#mapSvg .pin").forEach(g=>{const p=PLACES.find(x=>x.id===g.dataset.id);g.dataset.tip=`<b>${esc(p.n)}</b><br>${esc(UK_NATION[p.id])}`});bindTips($("#mapSvg"));
  // remember chosen views
  [w,af,uk].forEach(m=>{let k=null;try{k=store.get("mv:"+m.cfg.id,null)}catch(e){}if(k&&k!==m.cfg.views[0].k)m.setView(k)});
  // "Show on map" zooms to the pin
  $$("[data-show]").forEach(b=>b.addEventListener("click",()=>{if(MAPS.world.st.view!=="map")MAPS.world.setView("map");const d=DIASPORA.find(x=>x.id===b.dataset.show);const [x,y]=eeXY(d.lon,d.lat);MAPS.world.zoomTo(x,y,3)}));
  renderNwTiles();["#nwSector","#nwNation"].forEach(x=>$(x).addEventListener("change",renderNwTiles));
}
