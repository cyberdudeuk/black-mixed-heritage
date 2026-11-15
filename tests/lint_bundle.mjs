// Lints the page's assembled script (D-LINT-01; secure development standard, 15 Nov 2026).
// The script is built from fragments in src/ (v11_data.js ... v60_pathways.js) that only make sense joined, so they
// are linted as the one script the browser runs, taken from dist/bhm-2026-hub.html. Any finding fails.
//
// Allowed on purpose, each for a stated reason:
// - no-func-assign: later fragments wrap earlier functions by reassigning them (the build's wrapper chains).
// - empty catch blocks: storage and optional features fail closed and silently when the browser blocks them.
// - claude, QRCode, JsBarcode, microsoftTeams: provided by the artifact runtime and the vendored libraries; every use
//   is guarded.
// - The vendored Microsoft Teams SDK (minified third-party code in site/index.html) is skipped: it is not ours to edit.
//
// Self-test first: a duplicate object key (the S265 defect) and an undefined name must both be reported.
// Run: node tests/lint_bundle.mjs   (after npm install of the pinned ESLint packages; see .github/workflows/checks.yml)
import {readFileSync} from "fs";
import {ESLint} from "eslint";
import js from "@eslint/js";
import globals from "globals";

const config = [
  js.configs.recommended,
  {
    languageOptions: {ecmaVersion: 2024, sourceType: "script", globals: {...globals.browser, claude: "readonly", QRCode: "readonly", JsBarcode: "readonly", microsoftTeams: "readonly"}},
    rules: {
      "no-func-assign": "off",
      "no-empty": ["error", {allowEmptyCatch: true}],
      "no-unused-vars": ["error", {args: "none", caughtErrors: "none", varsIgnorePattern: "^_"}],
    },
  },
];
const VENDORED = [/define\("microsoftTeams"/];
const eslint = new ESLint({overrideConfigFile: true, overrideConfig: config});

async function findings(code) {
  const [r] = await eslint.lintText(code, {filePath: "bundle.js"});
  return r.messages;
}

const planted = await findings('const SRC={S265:{s:"a"},S308:{},S265:{}};console.log(SRC,notDefinedAnywhere);');
const rules = new Set(planted.map(m => m.ruleId));
if (!rules.has("no-dupe-keys") || !rules.has("no-undef")) {
  console.error("FAIL self-test: the bundle linter did not catch a planted duplicate key and undefined name", [...rules]);
  process.exit(1);
}

let failed = 0;
for (const page of process.argv.slice(2).length ? process.argv.slice(2) : ["dist/bhm-2026-hub.html"]) {
  const html = readFileSync(page, "utf8");
  const scripts = [...html.matchAll(/<script(?![^>]*type="application\/(?:ld\+)?json)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]).filter(s => s.trim() && !VENDORED.some(v => v.test(s.slice(0, 400))));
  for (const [i, code] of scripts.entries()) {
    const ms = await findings(code);
    const lines = code.split("\n");
    for (const m of ms) {
      failed++;
      const l = lines[m.line - 1] || "";
      console.error(`${page} script ${i + 1}:${m.line}:${m.column} ${m.ruleId} ${m.message} | ${l.slice(Math.max(0, m.column - 60), m.column + 40)}`);
    }
  }
  console.log(`${page}: ${scripts.length} script(s) linted`);
}
if (failed) { console.error(`FAIL ${failed} finding(s) in the assembled page script`); process.exit(1); }
console.log("PASS the assembled page script has no lint findings; self-test caught a duplicate key and an undefined name");
