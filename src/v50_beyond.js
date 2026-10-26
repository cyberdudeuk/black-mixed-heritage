/* ================= v2.24.0 BEYOND GOVERNMENT, INTERSECTIONS AND PLACE =================
   A new Lead page on where public bodies meet employers, the voluntary and faith sector, funders, trade unions and
   professional bodies; and two sections shown inside Life stages and identities: intersections (age, disability,
   sexual orientation and gender identity) and place (the four nations and the regions). */
const NEW24=[["beyond","Beyond government"]].filter(([id])=>typeof LP!=="undefined"&&LP[id]&&document.getElementById("v-"+id));VIEWS.push(...NEW24);
(function(){if(!NEW24.length)return;const g=NAV_ORDER_V21.find(x=>x.g==="Lead");if(g&&!g.items.includes("beyond"))g.items.splice(g.items.indexOf("enterprise")+1,0,"beyond");applyNavV21()})();
VIEW_ICONS.beyond="hands";LABEL_V21.beyond="Beyond government";
NEW24.forEach(([id])=>{PK_CONTENT.push(id);RP_NEW.push(id)});
NEW24.map(v=>v[0]).forEach(id=>DATASETS.push({k:id,n:(LP[id]||{}).name||id,ic:VIEW_ICONS[id]||"globe",arr:()=>LP[id]?lpAllPoints(LP[id]).map(x=>({...x.p,id:x.id})):[],id:x=>x.id,lab:x=>x.h,srcs:x=>x.src||[],view:id,href:x=>"#"+x.id,out:["pages","jsonld"],chk:["C138"]}));
RELATED_V21.push(["beyond","enterprise"],["beyond","careers"],["beyond","represent"],["beyond","leaders"]);
COV_DONE["Beyond government: employers and supply chains, the voluntary and faith sectors, funders, trade unions and professional bodies"]="2.24.0";
COV_DONE["Society and demographics: older people, disability, LGBT+ people, and place across the four nations"]="2.24.0";
/* India's 'Scheduled Tribes' is a legal category set by Parliament, so it is a name, not the hub's own word (C123) */
LANG_NAMES.push(/Scheduled Tribes?/g);
BUILD_TESTS["D-141"]="A reviewer's corrections carried instructions ('Source to add: …') and raw links that would have been published inside notes, and a 'figure: year' correction that would have overwritten a headline figure. The generator now refuses any point whose heading, text, note or figure holds a raw link or a reviewer instruction, proven by restoring one such note";
