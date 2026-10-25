// Accessibility scan for CI: axe-core (WCAG 2.0, 2.1 and 2.2, levels A and AA) on every page of the hub (the page itself plus the
// header and footer, which is much faster than the whole document; hidden pages are skipped by axe either way),
// at 1280px light and 390px dark. Fails if any page has a violation. The full suite (tests/test.mjs) runs more widths.
import { chromium } from 'playwright';
import { readFileSync } from 'fs';
import { createRequire } from 'module';
import { resolve } from 'path';
const require = createRequire(import.meta.url);
const AXE = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const file = resolve(process.argv[2] || 'site/index.html');
const browser = await chromium.launch();
const all = [];
for (const [w, scheme] of [[1280, 'light'], [390, 'dark']]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 }, colorScheme: scheme });
  await page.route('**/*', r => (/^(file|data|blob):/.test(r.request().url()) ? r.continue() : r.abort()));
  await page.goto('file://' + file);
  await page.waitForFunction(() => window.__selfcheck && window.__selfcheck.total, null, { timeout: 120000 });
  await page.addScriptTag({ content: AXE });
  const views = await page.evaluate(() => VIEWS.map(v => v[0]));
  for (const v of views) {
    await page.evaluate(v => { location.hash = v; }, v);
    await page.waitForTimeout(160);
    await page.mouse.move(1, 1);
    await page.evaluate(() => { if (document.activeElement) document.activeElement.blur(); if (typeof hideTip2 === 'function') hideTip2(true); });
    await page.waitForTimeout(220);
    const found = await page.evaluate(async v => (await axe.run({ include: [['#v-' + v], ['header'], ['#main-nav'], ['footer']].filter(([sel]) => document.querySelector(sel)) }, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] }, resultTypes: ['violations'] })).violations.map(x => x.id + ': ' + x.nodes.slice(0, 2).map(n => n.target.join(' ')).join(' | ')), v);
    found.forEach(x => all.push(`${w}px ${scheme} #${v} ${x}`));
  }
  console.log(`${w}px ${scheme}: ${views.length} pages scanned`);
  await page.close();
}
await browser.close();
if (all.length) { console.log(all.join('\n')); process.exit(1); }
console.log('axe-core: no violations');
