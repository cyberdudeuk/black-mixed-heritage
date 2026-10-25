// Opens each built page in Chromium and fails if any in-page self-check fails or any script error occurs.
// C108 (time to gather the evidence) depends on the machine, so on CI it is reported but does not fail the run.
import { chromium } from 'playwright';
import { resolve } from 'path';
const files = process.argv.slice(2);
const SOFT = new Set(['C108']);
const browser = await chromium.launch();
let failed = 0;
for (const f of files) {
  for (const [w, scheme] of [[1280, 'light'], [390, 'dark']]) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 }, colorScheme: scheme });
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    await page.route('**/*', r => (r.request().url().startsWith('file:') || r.request().url().startsWith('data:')) ? r.continue() : r.abort());
    await page.goto('file://' + resolve(f));
    await page.waitForFunction(() => window.__selfcheck && window.__selfcheck.total, null, { timeout: 120000 });
    const r = await page.evaluate(() => { runChecks(true); const s = window.__selfcheck; return { pass: s.pass, total: s.total, fails: (s.rows || []).filter(x => !x.ok).map(x => [x.id, x.d]) }; });
    const hard = r.fails.filter(([id]) => !SOFT.has(id));
    console.log(`${f} ${w}px ${scheme}: ${r.pass}/${r.total}` + (r.fails.length ? ' | ' + r.fails.map(x => x.join(': ')).join(' | ') : ''));
    if (hard.length || errors.length) { failed++; if (errors.length) console.log('script errors: ' + errors.slice(0, 3).join(' | ')); }
    await page.close();
  }
}
await browser.close();
process.exit(failed ? 1 : 0);
