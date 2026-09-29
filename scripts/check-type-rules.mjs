#!/usr/bin/env node
/**
 * Type-rules guard (maintainer ruling, 2026-09-29; workspace
 * knowledge/design-rules.md, the section on fixed-width faces, separating
 * dots and the section sign). Zero dependencies. The same logic ships in aimformat-landing,
 * tndm-landing and tndm; only ROOTS differ.
 *
 * Fails (exit 1) on:
 *   glyph check, no exceptions: the separating dots U+00B7, U+2022, U+22C5,
 *     U+2219, U+30FB, U+2027 and the section sign U+00A7, typed or escaped
 *     (HTML named/numeric entities, JS/CSS escapes), in any text file.
 *   mono check: any fixed-width font declaration or face name. A line
 *     carrying the pragma "type-rules: document-content" is exempt from the
 *     mono check only; it exists for the editor's rendering of the user's own
 *     document and nothing else. The two Tailwind v4 declarations that REMOVE
 *     the default fixed-width theme are allowed (see ALLOWED below).
 *
 * Prints `file:line: rule: excerpt` per hit.
 *
 * The banned tokens are assembled from parts at runtime so this file, which
 * lives under a scanned root, never matches itself.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------- per repo
const ROOTS = ["src", "public", "scripts"];

// ------------------------------------------------------------ shared logic
const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  ".open-next",
  ".wrangler",
  "dist",
  "release",
  "coverage",
  ".git",
]);
const SKIP_FILES = new Set([
  "package-lock.json",
  "npm-shrinkwrap.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "bun.lockb",
]);
const BINARY_EXT = new Set(
  (
    "png jpg jpeg gif webp avif ico icns bmp tiff psd " +
    "ttf otf woff woff2 eot " +
    "pdf zip gz tgz br 7z dmg pkg exe dll so dylib node wasm " +
    "mp3 mp4 m4a mov webm wav ogg " +
    "docx pptx xlsx aim-bin sqlite db"
  )
    .split(/\s+/)
    .map((e) => "." + e),
);

const cp = (n) => String.fromCodePoint(n);
const hex = (n) => n.toString(16).padStart(4, "0");

// Glyphs: [code point, rule, name]
const GLYPHS = [
  [0x00b7, "separator-dot", "middle dot"],
  [0x2022, "separator-dot", "bullet"],
  [0x22c5, "separator-dot", "dot operator"],
  [0x2219, "separator-dot", "bullet operator"],
  [0x30fb, "separator-dot", "katakana middle dot"],
  [0x2027, "separator-dot", "hyphenation point"],
  [0x00a7, "section-sign", "section sign"],
];
const NAMED_ENTITIES = [
  ["middot", "separator-dot"],
  ["bull", "separator-dot"],
  ["bullet", "separator-dot"],
  ["centerdot", "separator-dot"],
  ["CenterDot", "separator-dot"],
  ["sdot", "separator-dot"],
  ["sect", "section-sign"],
];

const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const glyphChecks = [];
for (const [n, rule, name] of GLYPHS) {
  const h = hex(n);
  const bare = n.toString(16);
  const alts = [
    reEsc(cp(n)),
    // JS/JSON \uXXXX and \u{XX}, CSS \XX / \0000XX, Python/JS \xXX
    reEsc("\\") + "u" + h,
    reEsc("\\") + "u\\{0*" + bare + "\\}",
    reEsc("\\") + "0*" + bare + "(?![0-9a-f])",
    ...(n < 0x100 ? [reEsc("\\") + "x" + bare] : []),
    // HTML numeric entities
    "&#0*" + n + ";",
    "&#x0*" + bare + ";",
  ];
  glyphChecks.push({ rule, name: `U+${h.toUpperCase()} ${name}`, re: new RegExp(alts.join("|"), "i") });
}
for (const [ent, rule] of NAMED_ENTITIES) {
  glyphChecks.push({ rule, name: `&${ent}; entity`, re: new RegExp("&" + ent + ";") });
}

const j = (...parts) => parts.join("");
const MONO_TOKENS = [
  j("font", "-", "mono"),
  j("label", "-", "mono"),
  j("mono", "space"),
  j("IBM", " Plex ", "Mono"),
  j("IBM", "_Plex_", "Mono"),
  j("ibm", "-plex-", "mono"),
  j("IBM", "Plex", "Mono"),
  j("Jet", "Brains"),
  j("SF", "Mono"),
  j("Men", "lo"),
  j("Conso", "las"),
  j("Cour", "ier"),
];
const MONO_RE = new RegExp(MONO_TOKENS.map(reEsc).join("|"), "i");

// The Tailwind v4 declarations that REMOVE its default fixed-width theme
// (the utility and preflight's code/kbd/samp/pre family). They are the
// removal, not a use.
const ALLOWED = [
  new RegExp(reEsc(j("--font", "-", "mono")) + ":\\s*initial\\s*;", "g"),
  new RegExp(reEsc(j("--default-", "mono", "-font-family")) + ":\\s*var\\(--font-body\\)\\s*;", "g"),
];
const PRAGMA = j("type-rules", ": ", "document-content");

function* walk(abs) {
  let st;
  try {
    st = fs.statSync(abs);
  } catch {
    return;
  }
  if (st.isFile()) {
    yield abs;
    return;
  }
  if (!st.isDirectory()) return;
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      yield* walk(path.join(abs, entry.name));
    } else if (entry.isFile()) {
      yield path.join(abs, entry.name);
    }
  }
}

const hits = [];
let files = 0;
for (const root of ROOTS) {
  for (const abs of walk(path.join(REPO, root))) {
    const base = path.basename(abs);
    if (SKIP_FILES.has(base)) continue;
    if (BINARY_EXT.has(path.extname(base).toLowerCase())) continue;
    const buf = fs.readFileSync(abs);
    if (buf.includes(0)) continue; // binary without a known extension
    files++;
    const rel = path.relative(REPO, abs);
    const lines = buf.toString("utf8").split(/\r?\n/);
    lines.forEach((line, i) => {
      const excerpt = line.trim().slice(0, 160);
      for (const g of glyphChecks) {
        if (g.re.test(line)) hits.push(`${rel}:${i + 1}: ${g.rule} (${g.name}): ${excerpt}`);
      }
      if (line.includes(PRAGMA)) return;
      let stripped = line;
      for (const re of ALLOWED) stripped = stripped.replace(re, "");
      const m = stripped.match(MONO_RE);
      if (m) hits.push(`${rel}:${i + 1}: mono-font (${m[0]}): ${excerpt}`);
    });
  }
}

if (hits.length) {
  for (const h of hits) console.error(h);
  console.error(
    `\ncheck-type-rules: ${hits.length} violation(s) in ${ROOTS.join(", ")}. ` +
      "No fixed-width fonts, no separating dots, no section sign: see the workspace " +
      "knowledge/design-rules.md. Restructure instead of swapping in another glyph.",
  );
  process.exit(1);
}
console.log(`check-type-rules: ${files} files clean (${ROOTS.join(", ")}).`);
