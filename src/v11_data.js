/* ================= v1.1 DATA ================= */
const WORLD=%%WORLD%%;
/* Equal Earth projection (Šavrič, Patterson and Jenny, 2018); the same function drew the coastline at build time */
function eeXY(lon,lat){const A1=1.340264,A2=-0.081106,A3=0.000893,A4=0.003796,M=Math.sqrt(3)/2;const l=lon*Math.PI/180,p=Math.max(-58,lat)*Math.PI/180;const th=Math.asin(M*Math.sin(p)),t2=th*th,t6=t2*t2*t2;
  const x=l*Math.cos(th)/(M*(A1+3*A2*t2+t6*(7*A3+9*A4*t2))),y=th*(A1+A2*t2+t6*(A3+A4*t2));return[(x+WORLD.X0)*WORLD.S,(WORLD.Y0-y)*WORLD.S]}

const REGIONS={north:{n:"North Africa",au:true},west:{n:"West Africa",au:true},central:{n:"Central Africa",au:true},east:{n:"East Africa",au:true},south:{n:"Southern Africa",au:true},pan:{n:"Across Africa",au:false},diaspora:{n:"The diaspora",au:false}};

/* Pattern tiles are original drawings inspired by the named traditions. Each returns {w,h,s} (SVG body). */
const T={
 kente:(()=>{let s="";const seq=[["#E2AE45",18],["#D2483B",4],["#E2AE45",18],["#2E8B57",18],["#14110E",4],["#2E8B57",18]];let x=0;seq.forEach(([c,w])=>{s+=`<rect x="${x}" y="0" width="${w}" height="24" fill="${c}"/>`;x+=w});for(let y=2;y<24;y+=4)s+=`<rect x="44" y="${y}" width="6" height="2" fill="#E2AE45"/><rect x="58" y="${y+2}" width="6" height="2" fill="#E2AE45"/>`;for(let y=3;y<24;y+=4)s+=`<rect x="0" y="${y}" width="80" height="1" fill="#000" fill-opacity=".15"/>`;return{w:80,h:24,s}})(),
 adinkra:{w:48,h:24,s:`<rect width="48" height="24" fill="#E8D5AE"/><g fill="none" stroke="#2A1D14" stroke-width="1.6"><rect x="4" y="8" width="9" height="8" rx="4"/><rect x="9" y="8" width="9" height="8" rx="4"/><rect x="14" y="8" width="9" height="8" rx="4"/></g><g fill="#2A1D14"><circle cx="34" cy="7" r="1.4"/><circle cx="40" cy="12" r="1.4"/><circle cx="34" cy="17" r="1.4"/><circle cx="28" cy="12" r="1.4"/><circle cx="34" cy="12" r="2"/></g>`},
 bogolan:{w:48,h:24,s:`<rect width="48" height="24" fill="#3A2618"/><polyline points="0,6 6,2 12,6 18,2 24,6 30,2 36,6 42,2 48,6" fill="none" stroke="#EADBC0" stroke-width="1.6"/><g fill="#EADBC0"><circle cx="3" cy="12" r="1.2"/><circle cx="9" cy="12" r="1.2"/><circle cx="15" cy="12" r="1.2"/><circle cx="21" cy="12" r="1.2"/><circle cx="27" cy="12" r="1.2"/><circle cx="33" cy="12" r="1.2"/><circle cx="39" cy="12" r="1.2"/><circle cx="45" cy="12" r="1.2"/></g><path d="M6 16v6M3 19h6M18 16v6M15 19h6M30 16v6M27 19h6M42 16v6M39 19h6" stroke="#EADBC0" stroke-width="1.4"/>`},
 kuba:{w:48,h:24,s:`<rect width="48" height="24" fill="#D8C39A"/><path d="M0 12L12 0L24 12L12 24ZM24 12L36 0L48 12L36 24Z" fill="none" stroke="#5A3A1E" stroke-width="2"/><path d="M6 12L12 6L18 12L12 18ZM30 12L36 6L42 12L36 18Z" fill="none" stroke="#1C1813" stroke-width="1.5"/><path d="M12 10v4M36 10v4" stroke="#5A3A1E" stroke-width="1.5"/>`},
 ndebele:{w:48,h:24,s:`<rect width="48" height="24" fill="#F7F3EA"/><rect x="1" y="1" width="14" height="22" fill="#C8372D" stroke="#14110E" stroke-width="2"/><rect x="5" y="6" width="6" height="12" fill="#E8B230" stroke="#14110E" stroke-width="1.5"/><path d="M17 23V13H21V7H27V13H31V23Z" fill="#2B5BA8" stroke="#14110E" stroke-width="2"/><rect x="33" y="1" width="14" height="22" fill="#2E8B57" stroke="#14110E" stroke-width="2"/><path d="M36 20L40 6L44 20Z" fill="#F7F3EA" stroke="#14110E" stroke-width="1.5"/>`},
 beads:(()=>{const c=["#D2483B","#F4ECDD","#2B5BA8","#E8892B","#2E8B57"];let s=`<rect width="30" height="24" fill="#1C1813"/>`;let i=0;for(let y=4;y<24;y+=8)for(let x=3;x<30;x+=6)s+=`<circle cx="${x}" cy="${y}" r="2.4" fill="${c[(i++)%5]}"/>`;return{w:30,h:24,s}})(),
 tibeb:{w:40,h:24,s:`<rect width="40" height="24" fill="#F7F3EA"/><path d="M0 7H40M0 17H40" stroke="#1B6643" stroke-width="1.4"/><path d="M0 16L5 8L10 16Z" fill="#2E8B57"/><path d="M10 8L15 16L20 8Z" fill="#E8B230"/><path d="M20 16L25 8L30 16Z" fill="#C8372D"/><path d="M30 8L35 16L40 8Z" fill="#E8B230"/>`},
 amazigh:{w:40,h:24,s:`<rect width="40" height="24" fill="#EFE3CC"/><path d="M0 12L10 2L20 12L10 22ZM20 12L30 2L40 12L30 22Z" fill="none" stroke="#A3271E" stroke-width="2"/><path d="M7 12L10 9L13 12L10 15ZM27 12L30 9L33 12L30 15Z" fill="#1C1813"/><g fill="#A3271E"><circle cx="20" cy="2" r="1.2"/><circle cx="20" cy="22" r="1.2"/></g>`},
 quilt:{w:48,h:24,s:`<rect width="48" height="24" fill="#EADBC0"/><rect width="14" height="24" fill="#3E5C7A"/><rect x="14" width="20" height="10" fill="#B5542B"/><rect x="14" y="10" width="20" height="14" fill="#E2AE45"/><rect x="36" y="0" width="3" height="24" fill="#3E5C7A"/><rect x="42" y="0" width="3" height="24" fill="#B5542B"/><path d="M2 2H46M2 22H46" stroke="#F4ECDD" stroke-width="1" stroke-dasharray="2 2"/>`}
};
const SYM={
 sankofa:`<path fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round" d="M50 88C28 70 12 54 16 36C20 20 38 18 44 30L50 42L56 30C62 18 80 20 84 36C88 54 72 70 50 88ZM44 30C40 24 32 26 33 33C34 39 41 38 41 33M56 30C60 24 68 26 67 33C66 39 59 38 59 33"/>`,
 chain:`<g fill="none" stroke="currentColor" stroke-width="7"><rect x="6" y="34" width="40" height="32" rx="16"/><rect x="30" y="34" width="40" height="32" rx="16"/><rect x="54" y="34" width="40" height="32" rx="16"/></g>`,
 ankh:`<g fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"><ellipse cx="50" cy="28" rx="13" ry="18"/><path d="M50 46V92M26 52H74"/></g>`,
 cowrie:`<g fill="none" stroke="currentColor" stroke-linecap="round"><ellipse cx="50" cy="50" rx="24" ry="36" stroke-width="6"/><path d="M50 22C44 40 56 60 50 78" stroke-width="4"/><path d="M42 34H47M42 44H48M42 54H48M42 64H47M53 34H58M52 44H58M52 54H58M53 64H58" stroke-width="3"/></g>`,
 baobab:`<path d="M38 92C40 70 36 52 40 40H60C64 52 60 70 62 92Z" fill="currentColor"/><g fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"><path d="M42 42L28 22M46 40L40 14M54 40L60 14M58 42L74 24M50 40V18M40 44L20 40M60 44L80 40"/><path d="M14 92H86" stroke-width="3"/></g>`,
 geez:`<text x="50" y="66" text-anchor="middle" font-family="'Noto Sans Ethiopic',Nyala,serif" font-size="40" fill="currentColor" lang="gez">ግዕዝ</text>`,
 yaz:`<text x="50" y="74" text-anchor="middle" font-family="'Noto Sans Tifinagh',Ebrima,serif" font-size="70" fill="currentColor" lang="ber-Tfng">ⵣ</text>`
};
const MOTIFS=[
 {id:"kente",n:"Kente-inspired strip weave",kind:"pattern",region:"west",people:"Asante and Ewe weavers, Ghana and Togo",meaning:"Narrow strips woven on a loom and sewn edge to edge into one cloth. Colours and named designs carry meanings, and some were reserved for royalty.",use:"The edging bands across the hub and posters: many strips, one cloth.",avoid:"Copying named or royal designs, or calling a print kente."},
 {id:"adinkra",n:"Adinkra stamped cloth",kind:"pattern",region:"west",people:"Akan peoples, Ghana and Côte d'Ivoire",meaning:"Symbols stamped on cloth with carved calabash stamps; each carries a proverb or idea.",use:"The Theme section band, and the Sankofa and Nkonsonkonson symbols.",avoid:"Inventing new meanings for existing symbols."},
 {id:"sankofa",n:"Sankofa",kind:"symbol",region:"west",people:"Akan Adinkra symbol, Ghana",meaning:"Often read as \"go back and fetch it\": return to the past to carry forward what you need.",use:"The learning poster and the History section.",avoid:"Using it as a logo without explaining it."},
 {id:"chain",n:"Nkonsonkonson",kind:"symbol",region:"west",people:"Akan Adinkra symbol, Ghana",meaning:"Chain links: unity, human relations and shared responsibility.",use:"The theme poster.",avoid:"Using it to suggest bondage; it means connection."},
 {id:"bogolan",n:"Bògòlanfini-inspired mud cloth",kind:"pattern",region:"west",people:"Bamana (Bambara) makers, Mali",meaning:"Cotton cloth dyed with plant dyes and fermented mud. Motifs can record events, proverbs and status.",use:"The History section band.",avoid:"Copying specific family or ritual designs."},
 {id:"kuba",n:"Kuba-inspired raffia cloth",kind:"pattern",region:"central",people:"Kuba Kingdom, Democratic Republic of the Congo",meaning:"Raffia textiles embroidered and appliquéd with interlacing geometric patterns, used as prestige cloth and in ceremonies.",use:"The Leaders and Knowledge bands.",avoid:"Reproducing a named design."},
 {id:"ndebele",n:"Ndebele-inspired painting",kind:"pattern",region:"south",people:"Ndebele, South Africa and Zimbabwe",meaning:"Bold geometric house painting and beadwork, traditionally made by women, with strong black outlines.",use:"The Toolkit band.",avoid:"Copying the work of named artists such as Esther Mahlangu."},
 {id:"beads",n:"East African beadwork-inspired rows",kind:"pattern",region:"east",people:"Maasai and Samburu beadwork, Kenya and Tanzania",meaning:"Colour and arrangement can signal age set, marital status and community.",use:"The Posters and About bands.",avoid:"Assigning colour meanings out of context."},
 {id:"tibeb",n:"Tibeb-inspired woven border",kind:"pattern",region:"east",people:"Weavers of Ethiopia and Eritrea",meaning:"Colourful woven borders on cotton garments such as the habesha kemis and netela.",use:"The Year-round and Assurance bands.",avoid:"Using religious crosses as decoration."},
 {id:"geez",n:"Ge'ez script",kind:"script",region:"east",people:"Ethiopia and Eritrea",meaning:"An African writing system used for Ge'ez, Amharic and Tigrinya. The word shown is \"Ge'ez\".",use:"The writing systems section.",avoid:"Using letters as decoration without saying what they say."},
 {id:"amazigh",n:"Amazigh-inspired lozenges",kind:"pattern",region:"north",people:"Imazighen (Amazigh) peoples, North Africa and the Sahara",meaning:"Lozenges, chevrons and lines found in weaving, pottery, jewellery and tattoos.",use:"The Debates and Resources bands.",avoid:"Treating Amazigh designs as generically \"Moroccan\" or \"Arab\"."},
 {id:"yaz",n:"Yaz (ⵣ)",kind:"symbol",region:"north",people:"Tifinagh letter, Amazigh peoples",meaning:"The letter yaz, used as a symbol of the Amazigh people and often read as \"free person\".",use:"The writing systems section.",avoid:"Using it in ways that take a side in political disputes."},
 {id:"ankh",n:"Ankh",kind:"symbol",region:"north",people:"Ancient Egypt (Kemet), Nile valley",meaning:"The hieroglyph for life. Widely used across the diaspora as a sign of African heritage.",use:"This gallery only.",avoid:"Using it as decoration in religious settings without context."},
 {id:"baobab",n:"Baobab",kind:"symbol",region:"pan",people:"Savanna regions across Africa and Madagascar",meaning:"A long-lived tree that is often a meeting place where communities gather, talk and settle disputes.",use:"A symbol of community gathering.",avoid:"Treating it as a symbol of one country."},
 {id:"cowrie",n:"Cowrie shell",kind:"symbol",region:"pan",people:"West Africa, the Indian Ocean and the diaspora",meaning:"Shells used as currency and in divination. Their trade linked the Indian Ocean and Atlantic worlds.",use:"A symbol of connection across oceans.",avoid:"Using it in sacred contexts you do not understand."},
 {id:"quilt",n:"Improvisational quilt blocks",kind:"pattern",region:"diaspora",people:"African American quilting traditions, such as Gee's Bend, Alabama",meaning:"Patchwork built from available cloth with bold, improvised geometry, passed down through families.",use:"The Diaspora band.",avoid:"Copying named quilters' works."}
];
const SCRIPTS=[
 {n:"Ge'ez (Fidel)",g:"ግዕዝ",cls:"ethi",lang:"gez",r:"east",d:"An abugida used to write Ge'ez, Amharic, Tigrinya and other languages of Ethiopia and Eritrea, with roots in the first millennium."},
 {n:"Tifinagh",g:"ⵜⵉⴼⵉⵏⴰⵖ",cls:"tfng",lang:"ber-Tfng",r:"north",d:"The script of the Amazigh peoples, descended from ancient Libyco-Berber writing. A modern form is taught in Moroccan schools."},
 {n:"Nsibidi",g:"",r:"west",d:"Ideographic signs from the Cross River region of Nigeria and Cameroon. Some signs belong to closed societies, so this hub does not reproduce them."},
 {n:"Vai",g:"",r:"west",d:"A syllabary devised in Liberia in the 1830s, associated with Momolu Duwalu Bukele."},
 {n:"Bamum",g:"",r:"central",d:"Created in Cameroon by King Ibrahim Njoya around 1896, and refined over the following decades."},
 {n:"N'Ko",g:"",r:"west",d:"Created by Solomana Kanté in 1949 to write the Manding languages of West Africa."},
 {n:"Adlam",g:"",r:"west",d:"Created in 1989 by the brothers Ibrahima and Abdoulaye Barry to write Fula (Pulaar)."}
];
const WORDS=[
 {id:"ubuntu",w:"Ubuntu",lang:"zu",l:"isiZulu and other Nguni languages",g:"Shared humanity, often glossed as \"I am because we are\".",r:"south"},
 {id:"kandandu",w:"Kandandu",lang:"kmb",l:"Kimbundu, Angola",g:"An embrace; used for warm greetings between family and friends.",r:"south"},
 {id:"harambee",w:"Harambee",lang:"sw",l:"Kiswahili",g:"\"Let us all pull together\"; Kenya's national motto.",r:"east"},
 {id:"umoja",w:"Umoja",lang:"sw",l:"Kiswahili",g:"Unity.",r:"east"},
 {id:"ujamaa",w:"Ujamaa",lang:"sw",l:"Kiswahili",g:"Familyhood; the extended family as a model for society.",r:"east"},
 {id:"lisanga",w:"Lisanga",lang:"ln",l:"Lingala",g:"A gathering or meeting of people.",r:"central"},
 {id:"teranga",w:"Teranga",lang:"wo",l:"Wolof, Senegal",g:"Hospitality and generosity towards guests and neighbours.",r:"west"},
 {id:"sankofa",w:"Sankofa",lang:"tw",l:"Twi (Akan), Ghana",g:"\"Go back and fetch it.\"",r:"west"},
 {id:"tiwizi",w:"Tiwizi",lang:"ber",l:"Amazigh languages",g:"Collective voluntary work for the community.",r:"north"},
 {id:"konbit",w:"Konbit",lang:"ht",l:"Haitian Creole",g:"A collective work gathering among neighbours.",r:"diaspora"},
 {id:"mutirao",w:"Mutirão",lang:"pt-BR",l:"Brazilian Portuguese",g:"A community effort in which neighbours work together.",r:"diaspora"}
];
const DCATS={atlantic:{n:"Atlantic world",d:"Descendants of people taken across the Atlantic in the slave trade"},indian:{n:"Indian Ocean, Arab and Ottoman worlds",d:"Communities formed through trade, service and enslavement across the Indian Ocean and Middle East"},modern:{n:"Migration after empire",d:"Communities formed by voluntary migration, mostly since 1945"},deemed:{n:"Peoples classed as \"Black\"",d:"Peoples outside the African diaspora who were classed as Black by colonial or racial systems"}};
const DIASPORA=[
 {id:"london",n:"London and British cities",lat:51.5,lon:-0.12,cat:"modern",d:"Caribbean and African communities built since the war, alongside a Black presence recorded since at least Tudor times.",src:null},
 {id:"lisbon",n:"Lisbon, Portugal",lat:38.72,lon:-9.14,cat:"modern",d:"A Black presence since the 15th century; today home to communities from Angola, Cabo Verde, Guinea-Bissau, Mozambique and São Tomé and Príncipe.",src:null},
 {id:"paris",n:"Paris, France",lat:48.86,lon:2.35,cat:"modern",d:"West and Central African and Caribbean communities; the Négritude movement began here in the 1930s.",src:null},
 {id:"amsterdam",n:"Amsterdam, Netherlands",lat:52.37,lon:4.9,cat:"modern",d:"Surinamese and Caribbean communities. Keti Koti on 1 July marks the end of slavery in Suriname and the Dutch Caribbean in 1863.",src:null},
 {id:"harlem",n:"Harlem, New York, USA",lat:40.81,lon:-73.95,cat:"atlantic",d:"Centre of the Harlem Renaissance in the 1920s and of African American and Caribbean life.",src:null},
 {id:"gullah",n:"Sea Islands, South Carolina and Georgia, USA",lat:32.4,lon:-80.6,cat:"atlantic",d:"Gullah Geechee communities keep a creole language and West African traditions.",src:null},
 {id:"birchtown",n:"Birchtown, Nova Scotia, Canada",lat:43.75,lon:-65.4,cat:"atlantic",d:"Founded by Black Loyalists who left the United States after the American Revolution, in 1783.",src:"S28"},
 {id:"havana",n:"Havana, Cuba",lat:23.1,lon:-82.36,cat:"atlantic",d:"Afro-Cuban music, faith and culture shaped the island's identity.",src:null},
 {id:"accompong",n:"Accompong, Jamaica",lat:18.23,lon:-77.75,cat:"atlantic",maroon:true,d:"A Maroon town whose people won a treaty with the British in 1739. Jamaica is also home to much of Britain's Windrush generation.",src:null},
 {id:"haiti",n:"Port-au-Prince, Haiti",lat:18.54,lon:-72.34,cat:"atlantic",d:"Haiti's revolution created the first independent Black republic in 1804.",src:null},
 {id:"barbados",n:"Bridgetown, Barbados",lat:13.1,lon:-59.62,cat:"atlantic",d:"London Transport recruited staff directly from Barbados from 1956; similar schemes were run with British Rail and the NHS.",src:null},
 {id:"trinidad",n:"Port of Spain, Trinidad and Tobago",lat:10.65,lon:-61.5,cat:"atlantic",d:"Carnival traditions, and the home of Henry Sylvester Williams, who organised the 1900 Pan-African Conference in London.",src:"S13"},
 {id:"garifuna",n:"Garifuna coast, Honduras and Belize",lat:15.9,lon:-86.5,cat:"atlantic",d:"The Garifuna, of African and Indigenous Caribbean descent, whose language, dance and music are recognised by UNESCO.",src:null},
 {id:"costachica",n:"Costa Chica, Guerrero and Oaxaca, Mexico",lat:16.5,lon:-98.4,cat:"atlantic",d:"Afro-Mexican communities. Mexico's constitution recognised Afro-Mexican peoples in 2019; the 2020 census counted about 2.6 million.",src:"S25"},
 {id:"palenque",n:"San Basilio de Palenque, Colombia",lat:10.1,lon:-75.2,cat:"atlantic",maroon:true,d:"Founded around 1600 by people led by Benkos Biohó, described as the first free African town in the Americas. Its Palenquero creole is endangered.",src:"S24"},
 {id:"esmeraldas",n:"Esmeraldas, Ecuador",lat:0.96,lon:-79.65,cat:"atlantic",d:"The heart of Afro-Ecuadorian culture, including marimba music.",src:null},
 {id:"suriname",n:"Suriname interior",lat:4.2,lon:-55.5,cat:"atlantic",maroon:true,d:"Maroon peoples such as the Saamaka and Ndyuka, descended from people who escaped plantations.",src:null},
 {id:"salvador",n:"Salvador, Bahia, Brazil",lat:-12.97,lon:-38.5,cat:"atlantic",d:"The centre of Afro-Brazilian culture. Brazil has the largest population of African descent outside Africa.",src:null},
 {id:"peru",n:"El Carmen, Chincha, Peru",lat:-13.5,lon:-76.05,cat:"atlantic",d:"A centre of Afro-Peruvian music and dance.",src:null},
 {id:"izmir",n:"Izmir, Turkey",lat:38.42,lon:27.14,cat:"indian",d:"Afro-Turkish communities, many descended from Africans brought into the Ottoman Empire.",src:null},
 {id:"basra",n:"Basra, Iraq",lat:30.5,lon:47.8,cat:"indian",d:"Afro-Iraqi communities, many descended from East Africans brought through Gulf and Indian Ocean trade.",src:null},
 {id:"karachi",n:"Karachi, Pakistan",lat:24.86,lon:67.0,cat:"indian",d:"Sheedi communities of African descent.",src:null},
 {id:"siddi",n:"Gujarat and Karnataka, India",lat:21.2,lon:70.7,cat:"indian",d:"Siddi and Habshi communities of diverse African origins. Siddis ruled the state of Janjira from 1621 to 1948.",src:"S26"},
 {id:"lemorne",n:"Le Morne, Mauritius",lat:-20.45,lon:57.32,cat:"indian",maroon:true,d:"A mountain refuge for people escaping slavery, now a UNESCO World Heritage Site (2008) and a symbol of the fight for freedom.",src:"S27"},
 {id:"andaman",n:"Andaman Islands, India",lat:11.7,lon:92.7,cat:"deemed",d:"The Great Andamanese, Onge and Jarawa, among the oldest populations outside Africa, were labelled \"Negrito\" by colonial writers. They are not an African diaspora.",src:null},
 {id:"aeta",n:"Luzon, Philippines",lat:15.2,lon:120.3,cat:"deemed",d:"The Aeta and related peoples were given the same colonial label. Use the names they use.",src:null},
 {id:"melanesia",n:"Papua New Guinea and Melanesia",lat:-6.3,lon:147,cat:"deemed",d:"\"Melanesia\" comes from the Greek for \"black islands\", a name given by a French explorer in 1832.",src:null},
 {id:"australia",n:"Aboriginal and Torres Strait Islander peoples, Australia",lat:-23.7,lon:133.9,cat:"deemed",d:"Classed as \"Black\" under colonial law. Many Aboriginal people use \"Blak\" as a self-chosen identity.",src:null}
];
const ROUTES=[
 {f:[13.23,-8.84],t:"salvador",k:"forced",n:"West-Central Africa to Brazil"},{f:[2.4,6.35],t:"haiti",k:"forced",n:"Bight of Benin to the Caribbean"},{f:[-1.2,5.1],t:"gullah",k:"forced",n:"Gold Coast to North America"},{f:[-17.45,14.7],t:"accompong",k:"forced",n:"Senegambia to Jamaica"},
 {f:[39.2,-6.16],t:"siddi",k:"trade",n:"Swahili coast to India"},{f:[39.2,-6.16],t:"basra",k:"trade",n:"Swahili coast to the Gulf"},
 {f:[-76.8,18],t:"london",k:"modern",n:"Jamaica to Britain (Windrush)"},{f:[3.4,6.45],t:"london",k:"modern",n:"Nigeria to Britain"},{f:[13.23,-8.84],t:"lisbon",k:"modern",n:"Angola to Portugal"},{f:[-17.45,14.7],t:"paris",k:"modern",n:"Senegal to France"},{f:[-55.2,5.85],t:"amsterdam",k:"modern",n:"Suriname to the Netherlands"}
];

const DEBATES={
 rep:{title:"Reparations",intro:"Reparations are measures to repair a serious historical wrong. The current debate centres on the transatlantic trade in enslaved Africans and colonialism, and on what, if anything, states such as the UK owe today. Proposals range from formal apologies, education and memorials, debt relief, development funding and the return of cultural objects to direct financial compensation.",
  facts:[
   {w:"2025",t:"The African Union makes reparations its theme for the year, and the UN opens a Second International Decade for People of African Descent.",src:"S33"},
   {w:"2025",t:"CARICOM and the African Union move to form a joint reparations coalition. CARICOM's Ten-Point Plan includes a full formal apology, debt cancellation, restoring cultural heritage and education reform.",src:"S33"},
   {w:"25 Mar 2026",t:"The UN General Assembly declares the trafficking of enslaved Africans the gravest crime against humanity and calls for reparations and the return of cultural objects. 123 states vote for, 3 against (Argentina, Israel and the United States) and 52 abstain, including the UK and all EU members. The resolution is not binding.",src:"S30"},
   {w:"25 Mar 2026",t:"The United States says it does not recognise a legal right to reparations for wrongs that were not illegal under international law at the time. The EU objects to wording that ranks one atrocity above others.",src:"S30"},
   {w:"26 Mar 2026",t:"The Leader of the Opposition, Kemi Badenoch, says the UK should have voted against, arguing that Britain should not pay for a crime it helped to end.",src:"S31"},
   {w:"7 Sep 2026",t:"Jamaica delivers a petition to Buckingham Palace asking the King to seek advice from the Judicial Committee of the Privy Council on whether slavery in Jamaica was lawful and whether the UK must pay compensation. A UK government spokesperson says the UK will not pay reparations, while describing slavery as abhorrent.",src:"S32"}],
  sides:[{h:"Arguments made by supporters",items:["The harms of slavery and colonialism were vast, and their effects can still be traced in gaps in wealth, health and development.","Britain and other states profited, and several British institutions have already researched their links and set up repair funds.","Reparations need not mean cash payments: apology, debt relief, education, health and the return of artefacts are all proposed.","International law recognises reparation for serious wrongs, and the 2026 UN vote shows wide international support."]},
         {h:"Arguments made by critics",items:["People alive today did not commit these wrongs, and today's taxpayers should not pay for them.","Britain abolished its trade in enslaved Africans in 1807 and slavery in most of its colonies in 1833, and spent heavily to suppress the trade.","Slavery was legal at the time under the laws then in force, so there is no legal basis for a claim today.","It is unclear who would pay, who would receive and how much; money may do more good through present-day development and trade.","Some argue the debate divides communities rather than building a shared future."]}],
  act:["State the UK government position accurately: as of September 2026 it says the UK will not pay reparations.","If you host a discussion, invite more than one view, or make clear that a speaker is giving their own view.","Focus your organisation's action on what is within its remit: its own history and records, and how fairly its services work today."]},
 cur:{title:"The national curriculum",intro:"Education is devolved, so history is taught differently in each UK nation. In England, a major review of the national curriculum and assessment reported in November 2025, and a revised curriculum is due in 2027.",
  facts:[
   {w:"Jul 2024",t:"The government commissions the Curriculum and Assessment Review for England, chaired by Professor Becky Francis.",src:"S34"},
   {w:"Nov 2025",t:"The government responds. History will build pupils' ability to judge sources and evidence. Teachers should be able to reflect the innate diversity of British history, including British Black and Asian history. The Holocaust stays compulsory at key stage 3, and more content becomes optional so teachers can use local history.",src:"S34"},
   {w:"2027 to 2029",t:"A revised national curriculum will be published in 2027 for first teaching in 2028, with new GCSEs from 2029. Citizenship becomes statutory in primary schools.",src:"S34"},
   {w:"Nov 2025",t:"The Historical Association supports the diversity recommendation but worries that more testing could squeeze time for history.",src:"S35"},
   {w:"Nov 2025",t:"The Black Curriculum calls the review cautious, notes it does not explicitly mention race, migration or colonialism, and calls for a new review co-designed with young people, teachers and under-represented communities.",src:"S36"},
   {w:"2022",t:"Wales becomes the first UK nation to make teaching the histories of Black, Asian and minority ethnic people mandatory, through the Curriculum for Wales.",src:null}],
  sides:[{h:"Arguments for the review's approach",items:["Flexibility lets teachers choose local and diverse histories that fit their pupils and places.","A source-critical, knowledge-rich curriculum gives pupils the tools to weigh contested history for themselves.","A slimmer statutory core avoids overloading teachers and pupils."]},
         {h:"Arguments made by critics",items:["Without named, statutory content on empire, migration and Black British history, coverage will depend on individual schools.","Teachers need time and training to teach contested histories well, and the review says little about either.","From a different direction, some critics warn against teaching that they see as presenting British history mainly as a story of wrongdoing."]}],
  act:["Offer schools and colleges access to your organisation's archives, local records and staff stories.","Point teachers to free resources from The National Archives.","Support local history projects in all four nations, not only in England."]},
 mem:{title:"Memory and erasure",intro:"Every society revisits what it remembers. Many historians and communities warn that this can tip into erasure: records lost, signs removed, languages and cultural knowledge not passed on. Others argue that some revision is needed to rebalance public history or to restore a unifying national story. Both sides say they are protecting history.",
  facts:[
   {w:"31 Mar 2025",t:"A US executive order, Restoring Truth and Sanity to American History, directs a review of Smithsonian exhibitions and of National Park Service signs installed since 2020. The Park Service removes or flags material at 25 or more sites, including material about slavery.",src:"S37"},
   {w:"Jan–Feb 2026",t:"Panels about people enslaved by George Washington are removed from the President's House site in Philadelphia. The city sues, and a federal judge orders the panels reinstated.",src:"S37"},
   {w:"Jun 2026",t:"A federal court orders signs on slavery, climate change and Indigenous history restored, saying history cannot be told faithfully if it excludes communities' experiences.",src:"S37"},
   {w:"2010",t:"In the UK, the Home Office destroyed landing cards recording Windrush-era arrivals, which later made it harder for some people to prove their right to live in the UK.",src:null},
   {w:"2020",t:"Protesters pull down the statue of Edward Colston, a merchant and enslaver, in Bristol; it is later displayed in a museum with its history explained. Some saw this as erasing history, others as ending an honour.",src:null},
   {w:"2007",t:"Fewer than half of San Basilio de Palenque's residents still spoke Palenquero, the creole of the first free African town in the Americas.",src:"S24"},
   {w:"20th century",t:"Some African languages have already been lost, such as Kwadi, a click language of south-west Angola that fell out of use in the mid-20th century.",src:null}],
  sides:[{h:"Concerns raised about erasure",items:["Removing records, signs or exhibits removes evidence later generations need to understand the past.","Black, mixed-heritage and African-descended histories often survive in fragile forms: oral memory, community archives and minority languages.","Changes made quietly are the hardest to challenge; changes to public history should be public and recorded."]},
         {h:"Arguments for revision or restraint",items:["Supporters of the US order say public history should inspire and unite, not divide people by race.","Interpretation that has become one-sided should be rebalanced, and context can be added rather than content removed.","Some argue that removing monuments, including to enslavers, is itself erasure, and prefer to keep them and explain them."]}],
  act:["Keep records according to your records management and Public Records Act duties; never delete public history content silently.","Archive web pages before you change them. The UK Government Web Archive captures central government websites.","Publish a change log for public-facing history content, as this hub does.","Support community archives, oral history and minority-language projects, and return or share cultural material where you hold it.","Publish data in open formats so it outlives any one platform. This hub exports JSON-LD."]}
};

const PURPOSE={
 mission:"Help every UK public body mark Black History Month 2026 well, and turn it into lasting, measurable action for the communities it serves.",
 aim:"One trusted, accessible place where public sector staff can learn, plan and act, rooted in evidence and in the 2026 theme.",
 purpose:"To save organisers time, raise the accuracy of what is shared, and connect October activity to year-round equality duties.",
 goals:["Show Black history as plural, global and British","Make everyday contributors visible, with their consent","Support fair, impartial discussion of contested questions","Connect October to year-round duties and commitments","Show that accessibility and accuracy can be built in from the start"],
 priorities:["Accuracy before volume","Consent and safety for anyone whose story is shared","Accessibility for everyone, including people who are offline or use assistive technology","Impartiality on contested questions","Action that lasts beyond October"],
 objectives:[
  {o:"Organisations publish three named commitments with owners and dates",measure:"Number of commitments published by organisations using the hub",by:"31 Oct 2026"},
  {o:"Commitments are reviewed in public",measure:"Progress reports published",by:"22 Apr 2027"},
  {o:"Every factual item carries its evidence level",measure:"Self-check C02 passes; items marked as reference history fall in each edition",by:"Each edition"},
  {o:"The hub meets WCAG 2.2 AA",measure:"Automated checks pass and an independent audit is completed",by:"31 Mar 2027"},
  {o:"Scotland, Wales and Northern Ireland are fully represented",measure:"At least five checked items for each nation",by:"1 Oct 2027"},
  {o:"Community partners review the motifs and words",measure:"Every motif and word confirmed by a speaker or practitioner",by:"30 Jun 2027"}],
 outcomes:[
  {h:"Short term (October 2026)",items:["Staff know the theme and its history","Everyday contributors are recognised, with consent","Events are accessible and impartial"],ind:"Attendance, nominations received, accessibility requests met"},
  {h:"Medium term (6 to 12 months)",items:["Commitments are delivered and reported","Staff networks are resourced","Services check their data for gaps by ethnicity"],ind:"Commitments completed, network time recognised, data gaps found and fixed"},
  {h:"Long term (3 to 5 years)",items:["Fairer outcomes in services","Better representation at senior grades","Greater trust in public bodies among under-served communities"],ind:"Outcome gaps, representation by grade, trust and satisfaction measures"}],
 toc:["Inputs: people, time, evidence","Activities: events, stories, learning, posters","Outputs: people reached, commitments made","Outcomes: knowledge, belonging, changed practice","Impact: fairer services and workplaces"]
};
const RATIONALE=[
 {h:"Ethno-linguistic diversity",p:"Africa alone has around 2,000 languages, and the diaspora has created new ones, from Haitian Creole to Palenquero. Offer interpreters in community languages and British Sign Language, and never assume English or one \"African language\".",src:"S29"},
 {h:"Socio-cultural diversity",p:"There is no single Black community. People differ by heritage, faith, culture, class, region and generation. Plan with the communities you actually serve."},
 {h:"Equality and equity",p:"Equality law protects nine characteristics, including race, disability, sex, age and religion. Equity goes further: giving people the support they need to reach fair outcomes."},
 {h:"Intersectionality",p:"Black disabled people, Black LGBTQ+ people, Black women, older and younger Black people and carers can face combined barriers. Design for the overlap, not the average."},
 {h:"Inclusion and voice",p:"Inclusion means belonging and influence, not only attendance. Co-design with staff networks and community groups, and pay people for their expertise."},
 {h:"Accessibility",p:"Public sector websites must meet accessibility standards. This hub aims at WCAG 2.2 AA and includes an Access panel, Easy read and alternatives to every map."},
 {h:"Duties in all four nations",p:"The Public Sector Equality Duty applies in Great Britain, section 75 of the Northern Ireland Act in Northern Ireland, and socio-economic duties in Scotland and Wales."},
 {h:"Under-represented and disenfranchised groups",p:"Some people have little say in decisions that affect them, such as some migrants, refugees, Gypsy, Roma and Traveller communities, and people with no recourse to public funds. Bring them into design, not only consultation."}
];
const VULN=[
 {h:"Circumstances, not labels",p:"Anyone can be in vulnerable circumstances: low income, insecure housing, ill health, disability, caring, bereavement, language barriers, insecure immigration status, domestic abuse, or contact with care or justice systems. Say \"people in vulnerable circumstances\", not \"the vulnerable\"."},
 {h:"Offline and low-cost routes",p:"Keep phone, paper and face-to-face options, free-to-call numbers and assisted digital help. Digital-only services exclude people who cannot afford data or devices."},
 {h:"Language",p:"Use plain English and Easy read, translate key information, and provide professional interpreters. Do not rely on children to interpret."},
 {h:"Trust and safety",p:"Some communities have good reason to be wary of public bodies, as the Windrush scandal showed. Use trauma-informed practice, explain why you ask for information, and follow safeguarding procedures."},
 {h:"Data with care",p:"Collect only what you need. Ethnicity is special category data. Let people describe themselves, and use data to find gaps in services, not to label people."},
 {h:"Households, not just individuals",p:"Many households are multi-generational or include extended family and carers. Rules that assume a nuclear household can fail them. Ask who lives together and who cares for whom."}
];
const A11Y_STATEMENT=[
 {h:"Standard",p:"This hub aims to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA, the standard behind the Public Sector Bodies Accessibility Regulations 2018. It is unofficial but follows them."},
 {h:"What you can do",p:"Change text size up to 150%, switch to a highly legible font, add spacing, underline links, use high contrast, pause animations and choose a light or dark theme. You can use a keyboard throughout, and there is a skip link."},
 {h:"Built in",p:"Images, posters and maps have text alternatives. Words in other languages carry language tags for screen readers. Every map and the knowledge graph has a list or table alternative."},
 {h:"Known limitations",p:"Wide tables scroll sideways when text is enlarged. Ge'ez and Tifinagh text needs fonts that load from Google Fonts. Poster text becomes part of an image when printed, so the posters carry full alternative text. The hub has not yet been independently audited."},
 {h:"How it is tested",p:"Self-checks run on every load, including contrast, language tags, accessible names and pausable motion. Automated browser tests run at phone and desktop widths in light and dark themes before each release."},
 {h:"Feedback",p:"If something does not work for you, leave a comment on this page and say what you were trying to do."}
];
const EASY=[["spark","October is Black History Month in the UK."],["quote","This year's theme is Honouring Our Communities."],["flag","It means thanking people who help their communities every day."],["tool","This hub has ideas, posters and history you can use at work."],["edit","You can make the words bigger with the Aa Access button at the top."]];
const BANDS={theme:"adinkra",africa:"kente",diaspora:"quilt",history:"bogolan",debates:"amazigh",toolkit:"ndebele",leaders:"kuba",posters:"beads",dates:"tibeb",resources:"amazigh",knowledge:"kuba",about:"beads",assurance:"tibeb"};

/* Access settings */
const A11Y_DEF={size:0,legible:false,spacing:false,links:false,contrast:false,motion:true};
let A11Y={...A11Y_DEF,...(function(){try{return JSON.parse(localStorage.getItem("bhm26:a11y"))||{}}catch(e){return{}}})()};
const reduceMQ=matchMedia("(prefers-reduced-motion: reduce)");
function motionOn(){return A11Y.motion&&!reduceMQ.matches}
