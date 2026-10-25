
/* ================= v2.0 MISSION, CHARTER, RULES OF ENGAGEMENT AND TERMS OF REFERENCE (proposed, for comment) ================= */
const CH_SRC={code:()=>SRCU("Civil Service Code (gov.uk)","https://www.gov.uk/government/publications/civil-service-code/the-civil-service-code","Core values: integrity, honesty, objectivity and impartiality"),nolan:()=>SRCU("The Seven Principles of Public Life (gov.uk)","https://www.gov.uk/government/publications/the-7-principles-of-public-life/the-7-principles-of-public-life--2","Selflessness, integrity, objectivity, accountability, openness, honesty, leadership")};
const MISSION="To help everyone working in the UK public sector learn, honour and act on Black history all year round, with evidence they can trust, content everyone can use, and communities who shape it.";
const CHARTER=[
 ["Accurate","Every fact links to a source that was read. We say what the evidence does not show, correct errors openly and record every change."],
 ["Accessible","Everyone can use the hub, whatever their device, ability or setting. Accessibility is tested in every release."],
 ["Inclusive","Black history is plural: African, Caribbean, mixed heritage and diaspora; every nation and region; every age, faith, gender, sexuality, disability and class."],
 ["Balanced","We show strengths as well as gaps, and both sides where evidence or opinion is divided. The hub takes no political position."],
 ["Community-led","Communities shape what is said about them. We credit contributors, seek consent and act on their reviews."],
 ["Open","Content is reusable under open licences and open standards; the code and issues are public; decisions are written down."],
 ["Respectful and safe","No personal data on the hub. Difficult history carries content notes. Racism, harassment and personal attacks are not tolerated."],
 ["Sustainable","Light, regular effort from many people rather than heavy effort from a few; nobody is the single point of failure."]];
const RULES=[
 ["Values","Everyone involved in public-sector roles acts in line with the Civil Service Code (integrity, honesty, objectivity, impartiality) and the Seven Principles of Public Life, or their own organisation's equivalent.","code"],
 ["Respect","Assume good intent, listen first, disagree with ideas not people, and use the words people use for themselves.",""],
 ["Consent and credit","Share a person's story, image or words only with their consent; credit contributors by name only if they agree.",""],
 ["Privacy","Do not post personal or sensitive information in comments, the ideas box, issues or the hub. Expressions of interest are private to the owner.",""],
 ["Impartiality","Present debates fairly and do not use the hub for party-political campaigning. Personal views are labelled as such.","nolan"],
 ["Network rules","Follow your organisation's rules for staff network activity, including sign-off and working-hours rules.",""],
 ["Evidence","Bring a source for any fact you add or correct. If you can only find a summary, say so.",""],
 ["Raising concerns","Raise a problem in the thread, with the hub owner, or through your organisation's procedures. Security problems go privately to the owner.",""],
 ["Escalation","Unresolved disagreements go to the owner, then the quarterly review with the senior sponsor, whose decision is recorded.",""]];
const TOR=[
 ["Purpose","Run, maintain and improve the BHM 2026 Hub all year round, in line with the mission and charter."],
 ["Scope","Content, data, design, accessibility, code, community review, events linked to the hub, and its ideas and issues. Networks' own events stay with the networks."],
 ["Membership","The roles on this page; membership is voluntary and open to colleagues across the UK public sector and community partners, with at least one person from each UK nation where possible."],
 ["Decisions","The owner decides day-to-day matters and releases; the quarterly review agrees priorities. Changes to the mission, charter or these terms need the quarterly review."],
 ["Quorum","A quarterly review needs the owner or deputy, at least two stewards and the senior sponsor or their delegate."],
 ["Meetings","Monthly triage (30 minutes, online); quarterly review (one hour); an annual plan in January and an annual review in November."],
 ["Reporting","A short monthly note of releases and corrections; a quarterly report with the dashboards and self-report; an annual review published on the hub."],
 ["Conflicts of interest","Members declare any interest in organisations, schemes or awards listed on the hub and step back from related decisions."],
 ["Review","These terms are reviewed every year, or sooner if the hub is adopted as departmental work."]];
function renderCharter(){const host=$("#suCharter");if(!host)return;const s1=CH_SRC.code(),s2=CH_SRC.nolan();
  host.innerHTML=`<div class="card mission"><p class="eyebrow">${icon("compass2")} Mission</p><p class="missiontext">${esc(MISSION)}</p></div>
   <h3 class="lsh">${icon("star")} Charter</h3><div class="grid g4 vtskip">${CHARTER.map(([h,p])=>`<div class="card"><h4>${esc(h)}</h4><p>${esc(p)}</p></div>`).join("")}</div>
   <h3 class="lsh">${icon("hands")} Rules of engagement</h3><ol class="flow">${RULES.map(([h,p,s])=>`<li><b>${esc(h)}.</b> ${esc(p)} ${s==="code"?evTag(s1):s==="nolan"?evTag(s2):""}</li>`).join("")}</ol>
   <h3 class="lsh">${icon("clipboard")} Terms of reference</h3><div class="tablewrap"><table class="tskip"><caption>Terms of reference for the people who run the hub (proposed)</caption><tbody>${TOR.map(([h,p])=>`<tr><th scope="row">${esc(h)}</th><td>${esc(p)}</td></tr>`).join("")}</tbody></table></div>
   <p class="muted">Proposed for comment, like the rest of this page. Agreed versions will be dated and logged.</p>`}
