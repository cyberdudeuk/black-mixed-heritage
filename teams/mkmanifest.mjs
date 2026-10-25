// Usage: node mkmanifest.mjs https://OWNER.github.io/REPO/ [version] [rename]
import {writeFileSync,readFileSync,existsSync} from 'fs';
const url=process.argv[2],ver=process.argv[3]||'1.0.0',renamed=process.argv[4]==='rename';
if(!/^https:\/\/[^/]+\.github\.io\/[^/]+\/$/.test(url||'')){console.error('Usage: node mkmanifest.mjs https://OWNER.github.io/REPO/ [version] [rename]');process.exit(1)}
const host=new URL(url).host;
// A stable app id: keep the first one generated so updates replace the same app in Teams
const idf=new URL('./app-id.txt',import.meta.url);const id=existsSync(idf)?readFileSync(idf,'utf8').trim():crypto.randomUUID();writeFileSync(idf,id);
const short=renamed?"Black History Hub":"BHM 2026 Hub";
const full=renamed?"Black History and Heritage Hub (launched for Black History Month 2026)":"Black History Month 2026 Hub: Honouring Our Communities";
const m={"$schema":"https://developer.microsoft.com/json-schemas/teams/v1.19/MicrosoftTeams.schema.json","manifestVersion":"1.19","version":ver,"id":id,
 "developer":{"name":"BHM 2026 Hub","websiteUrl":url,"privacyUrl":url+"#about","termsOfUseUrl":url+"#about"},
 "name":{"short":short,"full":full},
 "description":{"short":"Black history, heritage and inclusion for the UK public sector.","full":"A shared hub for departments, agencies, the NHS, local government, policing, justice and schools: the Black History Month 2026 theme, history and heritage, Africa and the diaspora, language guidance, a ready-to-run toolkit, posters, leadership actions and the evidence behind them. Every fact links to its source. Content only: the hub collects no personal data when used in Teams; anything you save stays in your own browser."},
 "icons":{"outline":"outline.png","color":"color.png"},"accentColor":"#2A1F17",
 "staticTabs":[{"entityId":"hub","name":short,"contentUrl":url,"websiteUrl":url,"scopes":["personal","team","groupChat"]}],
 "validDomains":[host]};
writeFileSync(new URL('./manifest.json',import.meta.url),JSON.stringify(m,null,2)+"\n");console.log('manifest',id,short,ver);
