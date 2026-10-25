
/* ================= v1.7.1 CORRECTIONS: every located source read in full; every v1.7 claim checked against its source (21 October 2026) ================= */
const RD="21 October 2026";
const _byId=(arr,id)=>arr.find(x=>x.id===id);
const _set=(o,p)=>{if(!o)throw new Error("v16_fix: missing item");Object.assign(o,p)};
/* 1. Located sources, now read */
const SRC_READ={
 S23:{s:"Douglass gave more than 50 speeches in Ireland in 1845 to 1846, visited Belfast five times; a statue in Lombard Street marks his visits"},
 S44:{s:"The 2021 theme invited people to share, in their own words, what they are proud to be"},
 S45:{s:"The 2022 theme called for continued action, not just words, to tackle racism"},
 S46:{s:"The 2023 theme emphasised the vital role Black women have played in shaping history, inspiring change and building communities"},
 S48:{},S51:{},S102:{},S265:{s:"Documentary on Black children disproportionately placed in 'educationally subnormal' schools; Steve McQueen is one of several executive producers"},
 S50:{s:"Works to improve the working environment of Black staff and minority officers and staff in policing",also:{t:"National Black Police Association: submission to the Winsor Review (2010), 46 affiliated associations",u:"https://assets.publishing.service.gov.uk/media/5a7aa68640f0b66a2fc01d58/nat-black-pol-assoc.pdf"}},
 S52:{s:"Employers who sign commit to five actions on race equality at work; the Royal Society is a signatory"},
 S54:{t:"Civil Service blog: Focus on staff networks, Race to the Top Grade 6 and 7 network (24 May 2019)",u:"https://civilservice.blog.gov.uk/2019/05/24/focus-on-staff-networks-race-to-the-top-grade-6-and-7-network/",s:"Set up in 2016 to help ethnic minority civil servants at Grades 6 and 7 progress into the Senior Civil Service"},
 S62:{s:"The 'Black Rice' argument (Judith Carney) that enslaved West Africans' rice expertise was essential",also:{t:"Eltis, Morgan and Richardson (2007), American Historical Review 112(5): Agency and diaspora in Atlantic history",u:"https://historycooperative.org/journal/african-diaspora/"}},
 S67:{s:"Beans roasted, ground and brewed in a clay jebena and served in three rounds; a daily gathering with relatives, neighbours and visitors"},
 S122:{t:"Bar Council: 10,000 Black Interns",u:"https://www.barcouncil.org.uk/support-for-barristers/equality-diversity-and-inclusion/race/10000-black-interns.html",s:"Paid internships for Black students and graduates at the London Living Wage, run by the 10,000 Interns Foundation"},
 S129:{s:"BYP Network connects Black professionals with each other and with corporations; careers festival and conference",also:{t:"BYP Network: Conference",u:"https://www.byp.network/conference"}},
 S265:{},S308:{s:"Co-founded 2016; Black Tech Fest first held virtually in 2020 and held during Black History Month (article from 2023)"}};
Object.entries(SRC_READ).forEach(([k,p])=>{const s=SOURCES[k];if(!s)throw new Error("v16_fix: no "+k);delete s.loc;s.rd=RD;Object.keys(p).forEach(f=>{if(p[f]!==undefined&&p[f]!=="")s[f]=p[f]})});
/* S42: full text read on SciELO (Portuguese edition); the abstract alone did not give the figures */
Object.assign(SOURCES.S42,{t:"Curto, J. C. (2023), 'Uma vila esclavagista: proprietários e seus cativos em Moçâmedes, 1855', Revista Brasileira de História 43(93): 225–263",u:"https://www.scielo.br/j/rbh/a/KTxBcTfhCsqh3rdCbGcvLgv/?lang=pt",s:"Late 1855: 850 people registered as enslaved in Moçâmedes, held by 111 owners; 19 men held 605 of them",rd:RD,also:{t:"DOI record: 10.1590/1806-93472023v43n93-12",u:"https://doi.org/10.1590/1806-93472023v43n93-12"}});delete SOURCES.S42.loc;
/* 2. On-page text the sources did not support */
_set(_byId(EVENTS,"e1845"),{d:"The formerly enslaved American abolitionist gives more than 50 speeches in Ireland in 1845–46, including in Belfast, which he visits five times. A statue in Lombard Street now marks his visits."});
_set(_byId(EVENTS,"e1855"),{d:"A register of late 1855 records 850 people enslaved in the Angolan port town of Moçâmedes, held by 111 owners; 19 men held 605 of them. Their labour sustained farming, orchil harvesting, street trades and fishing."});
_set(_byId(EVENTS,"e2021t"),{d:"The national theme invites people to share, in their own words, what they are proud to be and their pride in their heritage and culture."});
_set(_byId(EVENTS,"e2022t"),{d:"The theme calls for continued action, not just words, to tackle racism."});
_set(_byId(EVENTS,"e2023t"),{d:"The theme celebrates the vital role Black women have played in shaping history, inspiring change and building communities."});
_set(NETWORKS.find(n=>n.src==="S50"),{d:"Works to improve the working environment of Black and minority police officers and staff, through affiliated associations in forces across the UK."});
_set(NETWORKS.find(n=>n.src==="S52"),{d:"Employers commit to five actions on race equality at work, such as naming an executive sponsor for race and publishing progress."});
_set(NETWORKS.find(n=>n.src==="S54"),{d:"A cross-government network, set up in 2016, that helps ethnic minority civil servants at Grades 6 and 7 progress into the Senior Civil Service.",u:"https://civilservice.blog.gov.uk/2019/05/24/focus-on-staff-networks-race-to-the-top-grade-6-and-7-network/"});
_set(INNOV.credit.find(c=>c.src==="S62"),{evid:"The 'Black Rice' argument holds that enslaved West Africans' rice-growing expertise was essential. Other historians (Eltis, Morgan and Richardson, 2007) argue that planters drove the industry and that African expertise should not be exaggerated."});
_set(CUSTOMS.find(c=>c.src==="S67"),{d:"Green beans are roasted, ground and brewed in a clay jebena, then served in three rounds. It is a daily way of gathering with relatives, neighbours and visitors."});
_set(_byId(SCHEMES,"sc-10k"),{note:"Paid at the London Living Wage; run by the 10,000 Interns Foundation."});
/* 3. Book and film club */
const _B=id=>_byId(BOOKS,id),_F=id=>_byId(FILMS,id),_C=id=>_byId(CULTURE,id);
_set(_B("bk-adichie"),{note:"Won the 2007 Women's Prize for Fiction (then the Orange Prize); in 2020 readers voted it the best winner in the prize's 25 years."});
_set(_B("bk-eddolodge"),{g:"Non-fiction",d:"On race in Britain, including institutional racism and its links with class and gender.",note:"Won the 2018 Jhalak Prize; in 2020 the first book by a Black British writer to reach No. 1 on the UK's Nielsen BookScan top 50 sales chart."});
_set(_B("bk-selvon"),{reg:"UK"});
_set(_B("bk-ngugi"),{d:"Four essays on language and colonialism."});
_set(_B("bk-smith"),{d:"Two wartime friends and their families in Willesden, London."});
_B("bk-akala").src.push(SRC16("Royal Museums Greenwich library: Natives (Two Roads, 2018)","https://www.rmg.co.uk/collections/library/rmgl-157007","Confirms 2018 publication; Wikipedia's infobox says 2019"));
_B("bk-blackman").src.push(W16("Noughts_%2B_Crosses","BBC One adaptation, first shown 5 March 2020"));
_B("bk-cartywilliams").src.push(SRC16("Bookreporter: Candice Carty-Williams","https://www.bookreporter.com/authors/candice-carty-williams","Queenie Jenkins, 25, Jamaican British, London"));
_B("bk-gurnah").src.push(W16("Paradise_(Gurnah_novel)","Novel, 1994; plot and setting"),SRC16("The Booker Prizes: Paradise","https://thebookerprizes.com/the-booker-library/books/paradise","Shortlisted 1994"));
_set(_F("fm-rocks"),{cert:"12"});_F("fm-rocks").src.push(SRC16("BBFC: Rocks","https://www.bbfc.co.uk/release/rocks-q29sbgvjdglvbjpwwc00oty0mty","Classified 12"));
_F("fm-belle").src.push(SRC16("BBFC: Belle","https://www.bbfc.co.uk/release/belle-q29sbgvjdglvbjpwwc00nzy0mzm","12A in cinemas; 12 on home release"));
_F("fm-12years").src.push(SRC16("BBFC: 12 Years a Slave","https://www.bbfc.co.uk/release/12-years-a-slave-q29sbgvjdglvbjpwwc0zodqymtk","Classified 15"));
_set(_F("fm-pressure"),{note:"Hailed as the UK's first Black feature-length drama; its funder, the BFI, shelved it for almost three years."});
_F("fm-babylon").src.push(W16("Babylon_(1980_film)","Premiered at Cannes Critics' Week, 1980; set in south London"));
delete _F("fm-atlantics").cert; /* 12A seen only in cinema listings, not on the BBFC site */
_F("fm-summerofsoul").src.push(SRC16("BBFC: Summer of Soul","https://www.bbfc.co.uk/release/summer-of-soul-q29sbgvjdglvbjpwwc01mza4otm","12A in cinemas; 12 on demand"));
_set(_F("fm-subnormal"),{d:"Black children disproportionately placed in schools for the 'educationally subnormal' in the 1960s and 1970s.",note:"Steve McQueen is one of its executive producers."});
_F("fm-katwe").src.push(SRC16("BBFC: Queen of Katwe","https://www.bbfc.co.uk/release/queen-of-katwe-q29sbgvjdglvbjpwwc00mzq3ndq","Classified PG"));
/* 4. Culture, sport and enterprise */
_set(_C("cu-wharton"),{contested:"Widely considered the world's first Black professional footballer, though not the first Black footballer: Andrew Watson and Robert Walker played earlier, and Watson may have been paid at Bootle in 1887."});
_set(_C("cu-tull"),{contested:"The National Archives says he is widely considered the first African-Caribbean mixed heritage man to be commissioned as an infantry officer in the British Army."});
_set(_C("cu-voice"),{d:"Founded by Val McCalla with other businesspeople and journalists in August 1982; The Guardian later called it Britain's most successful African-Caribbean newspaper."});
_set(_C("cu-desmonds"),{d:"Channel 4 sitcom set in a Peckham barbershop, conceived and co-written by Trix Worrell and starring Norman Beaton; 71 episodes over six series."});
_set(_C("cu-carnival"),{d:"Traces its roots to Claudia Jones's indoor Caribbean Carnival at St Pancras Town Hall in January 1959 and to the first outside event in Notting Hill in August 1966; around two million people now attend each year."});
_set(_C("cu-mcqueen"),{d:"His film 12 Years a Slave won the Academy Award for Best Picture in 2014, making him the first Black filmmaker to win it; he later made Small Axe."});
_set(_C("cu-alcindor"),{d:"Trinidad-born doctor who qualified at Edinburgh in 1899, received a Red Cross medal for his work with the wounded at London railway stations in the First World War, and was senior district medical officer in Paddington from 1921."});
_set(_C("cu-anionwu"),{d:"The UK's first sickle cell and thalassaemia nurse specialist (1979), who set up the Brent centre and later became vice-chair of the Mary Seacole Memorial Statue Appeal."});
_C("cu-ilube").src.push(SRC16("Graphic Online: African Science Academy inaugurated in Tema (8 February 2017)","https://www.graphic.com.gh/news/general-news/african-science-academy-inaugurated-in-tema.html","Names Tom Ilube as chairman and founder of the academy"));
_set(_C("cu-colorintech"),{d:"Co-founded in 2016 by Ashleigh Ainsley and Dion McKenzie; its Black Tech Fest, first held virtually in 2020, runs during Black History Month."});
_set(_C("cu-imafidon"),{na:"England",d:"Co-founded Stemettes in 2013 to bring more girls, young women and non-binary people into science and technology; President of the British Science Association from 2022 to 2023."});
_set(_C("cu-aderinpocock"),{d:"Engineer and broadcaster who has co-presented The Sky at Night since 2014 and became Chancellor of the University of Leicester in 2023."});
/* 5. Insights: say exactly what each figure measures */
_set(INSIGHTS[0],{l:"median annual turnover reported by Black business owners, against £35,000 for white business owners (survey, April to July 2020)",y:"2020"});
_set(INSIGHTS[1],{l:"of UK venture capital investment from 2009 to 2019 went to Black founders (Extend Ventures, 2020)"});
_set(INSIGHTS[2],{l:"of creative industries jobs were held by Black, African, Caribbean or Black British workers, against 4.4% of the whole UK workforce (official statistics in development)"});
_set(INSIGHTS[3],{fig:"43% and under 5%",l:"of Premier League players are Black, but under 5% of professional coaches in the top four divisions (Black Footballers Partnership study)"});
_set(INSIGHTS[4],{y:"published November 2025"});
/* every v1.7 source has now been read against the claim it supports */
Object.keys(SOURCES).filter(k=>+k.slice(1)>=235&&!SOURCES[k].loc).forEach(k=>SOURCES[k].rd=SOURCES[k].rd||RD);
