// JavaScript linter (OpenSSF warnings criterion; secure development standing rule, 15 Nov 2026).
// CI installs the pinned versions below and runs `npx eslint .`, which fails on any finding.
// eslint@9.39.5, @eslint/js@9.39.5, globals@16.5.0
import js from "@eslint/js";
import globals from "globals";

export default [
  {ignores: ["node_modules/**", "**/vendor/**", "**/*.min.js", "dist/**", "src/v*.js", "src/*.html"]  /* page fragments: joined at build time, linted as one script by tests/lint_bundle.mjs */},
  js.configs.recommended,
  {files: ["**/*.js", "**/*.cjs"], languageOptions: {ecmaVersion: 2024, sourceType: "script", globals: {...globals.browser}}},
  {files: ["**/*.mjs"], languageOptions: {ecmaVersion: 2024, sourceType: "module", globals: {...globals.node, ...globals.browser}}},
  // Unused names are errors unless they start with an underscore (kept on purpose, e.g. superseded data).
  {rules: {"no-unused-vars": ["error", {varsIgnorePattern: "^_", argsIgnorePattern: "^_", caughtErrors: "none"}]}},
  // These scripts pass callbacks to the page (Playwright page.evaluate, jsdom): inside them, names such as VIEWS or
  // META are the page's own globals, so no-undef cannot judge them here. The assembled page script itself is linted
  // with no-undef on by tests/lint_bundle.mjs.
  {files: ["tests/**/*.mjs", "src/export.mjs", "teams/mkicons.mjs"], rules: {"no-undef": "off"}},
];
