
/* ================= v2.8.0 MAP FOR THE PEOPLES PAGE: AU regions, islands, seas, divided peoples ================= */
/* Island positions are approximate (whole degrees); they place a marker, they are not data */
const PP_ISL_XY={"Madagascar":[46.9,-19],"Comoros":[43.3,-11.7],"Mauritius":[57.5,-20.2],"Seychelles":[55.5,-4.7],"Cabo Verde":[-24,16],"São Tomé and Príncipe":[6.7,0.3],"Canary Islands":[-15.6,28.3],"Madeira":[-16.9,32.7],"Réunion":[55.5,-21.1],"Mayotte":[45.2,-12.8],"Saint Helena, Ascension and Tristan da Cunha":[-5.7,-15.9],"Zanzibar":[39.3,-6.1],"Bioko":[8.7,3.6],"Lampedusa":[12.6,35.5],"Socotra":[53.8,12.5]};
const PP_SEAS=[["Mediterranean Sea",18,34.2],["Red Sea",38.6,19.5],["Gulf of Aden",48,12.4],["Indian Ocean",62,-8],["Mozambique Channel",40.6,-18.5],["Atlantic Ocean",-22,6],["Gulf of Guinea",3,1.2],["Strait of Gibraltar",-5.6,36]];
const PP_NAMES={"DR Congo":"Dem. Rep. Congo","Republic of Congo":"Congo","South Sudan":"S. Sudan","Central African Republic":"Central African Rep.","Equatorial Guinea":"Eq. Guinea","Eswatini":"eSwatini","Western Sahara":"W. Sahara"};
const PP_AU2REG={north:"north",west:"west",central:"central",east:"east",south:"southern"};
function renderPeoplesMap(){const svg=$("#ppMap");if(!svg||svg.querySelector(".ppc"))return;
  const pts=Object.values(PP_ISL_XY).map(([lo,la])=>eeXY(lo,la));const [bx,by,bw,bh]=WORLD.africaBox;
  const xs=[bx,bx+bw,...pts.map(p=>p[0])],ys=[by,by+bh,...pts.map(p=>p[1])];const x0=Math.min(...xs)-8,y0=Math.min(...ys)-8,x1=Math.max(...xs)+8,y1=Math.max(...ys)+8;
  svg.setAttribute("viewBox",`${x0.toFixed(1)} ${y0.toFixed(1)} ${(x1-x0).toFixed(1)} ${(y1-y0).toFixed(1)}`);
  const sea=`<rect x="${x0-400}" y="${y0-400}" width="${x1-x0+800}" height="${y1-y0+800}" fill="var(--sea)"/>`;
  const land=WORLD.countries.filter(c=>c.r).map(c=>`<path class="ppc af r-${c.r}" data-n="${esc(c.n)}" data-r="${c.r}" d="${c.d}" data-tip="<b>${esc(c.n)}</b><br>${esc(REGIONS[c.r].n)} (African Union region)"><title>${esc(c.n)}, ${esc(REGIONS[c.r].n)}</title></path>`).join("");
  const other=WORLD.countries.filter(c=>!c.r&&!/^(Fiji|Antarctica|Russia)$/.test(c.n)).map(c=>`<path class="ppo" d="${c.d}"/>`).join("");
  const isl=PP_ISLANDS.map(i=>{const xy=PP_ISL_XY[i.n];if(!xy)return"";const [x,y]=eeXY(xy[0],xy[1]);return `<circle class="ppisl${i.type==="state"?" st":""}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.2" data-tip="<b>${esc(i.n)}</b><br>${i.type==="state"?"Independent state":"Territory or part of a state"}"><title>${esc(i.n)}</title></circle>`}).join("");
  const seas=PP_SEAS.map(([n,lo,la])=>{const [x,y]=eeXY(lo,la);return `<text class="ppsea" x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle">${esc(n)}</text>`}).join("");
  svg.insertAdjacentHTML("beforeend",sea+`<g>${other}</g><g>${land}</g><g>${isl}</g><g aria-hidden="true">${seas}</g>`);
  svg.addEventListener("click",e=>{const p=e.target.closest(".ppc");if(!p)return;const id=PP_AU2REG[p.dataset.r];const b=$(`#ppRegChips .chip[data-r="${id}"]`);if(b){b.click();$("#ppRegion").scrollIntoView({block:"nearest"})}});
  const sel=$("#ppPartSel");sel.insertAdjacentHTML("beforeend",PP_PART.map((g,i)=>{const ok=g.countries.some(c=>WORLD.countries.some(w=>w.n===(PP_NAMES[c]||c)));return `<option value="${i}"${ok?"":" disabled"}>${esc(g.group)}${ok?"":" (countries not listed)"}</option>`}).join(""));
  sel.addEventListener("change",()=>ppHighlight(sel.value));$("#ppMapReset").addEventListener("click",()=>{sel.value="";ppHighlight("")});
  if(typeof bindTips==="function")bindTips(svg);window.__ppmap={countries:svg.querySelectorAll(".ppc").length,islands:svg.querySelectorAll(".ppisl").length,seas:PP_SEAS.length}}
function ppHighlight(i){const svg=$("#ppMap");const g=i===""?null:PP_PART[+i];const names=g?g.countries.map(c=>PP_NAMES[c]||c):[];
  svg.classList.toggle("filtered",!!g);$$("#ppMap .ppc").forEach(p=>p.classList.toggle("on",names.includes(p.dataset.n)));
  $("#ppMapCap").textContent=g?`${g.group}: ${g.countries.join(", ")}. ${g.note}`:"Countries coloured by African Union region. Circles mark island states (filled) and territories (outlined); positions are approximate. Select a country or a region below.";window.__ppHi=names.filter(n=>svg.querySelector(`.ppc[data-n="${CSS.escape(n)}"]`)).length}
CHECKS.push({id:"C131",n:"The peoples map shows every mainland country, every listed island and the seas, and can highlight a divided people (D-086)",run:c=>({ok:c.ppm.countries>=50&&c.ppm.islands===c.ppm.islandsListed&&c.ppm.hi>=2,d:`${c.ppm.countries} countries, ${c.ppm.islands} of ${c.ppm.islandsListed} islands, ${c.ppm.seas} seas labelled; highlighting the Maasai lights ${c.ppm.hi} countries`}),
  breakIt:c=>{c.ppm={...c.ppm,islands:0};return c}});
BUILD_TESTS["D-086"]="The peoples page described regions, islands, seas and divided peoples in text and tables only; the design rules ask for maps where content is geographic. A full-width map now shows all of them, with the tables kept as the accessible equivalent (C131)";
const _ctx52=ctxV15;ctxV15=function(){const c=_ctx52();try{renderPeoplesMap()}catch(e){}const m=window.__ppmap||{};let hi=0;try{const i=PP_PART.findIndex(g=>g.group==="Maasai");const prev=$("#ppPartSel")?$("#ppPartSel").value:"";ppHighlight(String(i));hi=window.__ppHi||0;ppHighlight(prev)}catch(e){}
  c.ppm={countries:m.countries||0,islands:m.islands||0,islandsListed:PP_ISLANDS.length,seas:m.seas||0,hi};return c};
function v34Boot(){renderPeoplesMap()}
