/**
 * Verify every data-i18n* key used across HTML entry files exists in each locale's merged flat map.
 * From this folder: node verify_locales.cjs
 * Exits 1 if any locale has missing keys vs the HTML reference set R.
 */
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SITE = __dirname;
const HTML_FILES = [
  "index.html",
  "member/index.html",
  "team/index.html",
  "bonus/index.html",
  "training/index.html",
  "about/index.html"
];
const LANGS = ["en", "sv", "no", "fi", "is", "da", "ar", "fa"];

function extractHtmlKeys() {
  const R = new Set();
  const attrRe = /data-i18n-attr="([^"]+)"/g;
  for (const f of HTML_FILES) {
    const s = fs.readFileSync(path.join(SITE, f), "utf8");
    for (const m of s.matchAll(/data-i18n="([^"]+)"/g)) R.add(m[1]);
    for (const m of s.matchAll(/data-i18n-html="([^"]+)"/g)) R.add(m[1]);
    for (const m of s.matchAll(/data-i18n-desc="([^"]+)"/g)) R.add(m[1]);
    for (const m of s.matchAll(/data-i18n-title="([^"]+)"/g)) R.add(m[1]);
    let m;
    while ((m = attrRe.exec(s))) {
      m[1].split(";").forEach((pair) => {
        const bits = pair.split("|");
        if (bits.length >= 2) R.add(bits[1].trim());
      });
    }
  }
  return R;
}

function flattenEn(obj, prefix) {
  const out = {};
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    const p = prefix ? prefix + "." + k : k;
    if (v && typeof v === "object" && !Array.isArray(v)) Object.assign(out, flattenEn(v, p));
    else if (typeof v === "string") out[p] = v;
  }
  return out;
}

function loadRuntime() {
  const ctx = {
    window: {},
    console,
    document: {
      documentElement: { setAttribute() {}, getAttribute() { return null; } },
      body: { getAttribute() { return null; } },
      title: "",
      querySelectorAll() {
        return { forEach() {} };
      }
    }
  };
  ctx.window = ctx;
  const files = ["i18n.js", "locale-ar-fa-patches.js", "locale-da-full.js", "locale-fi-full.js", "locale-bootstrap.js"];
  for (const f of files) {
    const code = fs.readFileSync(path.join(SITE, f), "utf8");
    vm.runInNewContext(code, ctx, { filename: f });
  }
  return ctx;
}

function main() {
  const R = extractHtmlKeys();
  const ctx = loadRuntime();
  const M = ctx.NOVYRA_I18N_MESSAGES;
  const F = ctx.NOVYRA_LOCALE_FLATS;
  if (!M || !M.en || !F) {
    console.error("Failed to load i18n / locale-bootstrap");
    process.exit(1);
  }
  const enFlat = flattenEn(M.en, "");

  const rows = [];
  let anyMissing = false;
  for (const lang of LANGS) {
    const flat = lang === "en" ? enFlat : F[lang];
    const missing = [];
    if (!flat || typeof flat !== "object") {
      rows.push({ lang, missing: R.size, list: ["(no flat object)"] });
      anyMissing = true;
      continue;
    }
    for (const k of R) {
      if (!Object.prototype.hasOwnProperty.call(flat, k) || flat[k] === "" || flat[k] == null) {
        missing.push(k);
      }
    }
    if (missing.length) anyMissing = true;
    rows.push({ lang, missing: missing.length, list: missing });
  }

  console.log("Keys in HTML (R):", R.size);
  console.log("");
  console.log("| locale | missing |");
  console.log("|--------|---------|");
  for (const r of rows) console.log("| " + r.lang + " | " + r.missing + " |");

  if (anyMissing) {
    for (const r of rows) {
      if (r.list && r.list.length && r.list[0] !== "(no flat object)") {
        console.log("\n## " + r.lang + " (" + r.missing + ")\n" + r.list.slice(0, 80).join("\n"));
        if (r.list.length > 80) console.log("… +" + (r.list.length - 80) + " more");
      }
    }
    process.exit(1);
  }
  console.log("\nOK: all locales cover every HTML i18n key.");
  process.exit(0);
}

main();
