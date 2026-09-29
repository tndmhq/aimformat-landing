#!/usr/bin/env node
/**
 * Type-rules guard (maintainer ruling, 2026-09-29; workspace
 * knowledge/design-rules.md, the section on fixed-width faces, separating
 * dots and the section sign). Zero dependencies. The same file ships in
 * aimformat-landing, tndm-landing and tndm; only the per-repo block (ROOTS,
 * DOCUMENT_PATHS, ALLOW_PRAGMA and their comments) differs, and everything
 * else is kept byte-identical across the three copies.
 *
 * Fails (exit 1) on:
 *   glyph check, no exceptions: the separating dots (the middle dot U+00B7,
 *     its look-alikes U+0387, U+2027, U+2E31, U+2E33, U+16EB, U+30FB, U+FF65,
 *     and the bullets U+2022, U+2043, U+2219, U+22C5, U+25E6) and the section
 *     sign U+00A7, typed or escaped (HTML named and numeric entities, with or
 *     without the closing semicolon where browsers accept that, JS and CSS
 *     escapes), in any text file.
 *   fixed-width check: the generic fixed-width family keywords, any face,
 *     token or identifier with a standalone fixed-width part (separated by
 *     an underscore, hyphen, space or quote, or camel-cased), and the named
 *     fixed-width faces listed below. A line carrying the document-content
 *     pragma (PRAGMA below) is exempt from this check only, and only where
 *     ALLOW_PRAGMA is true: it exists for the editor's rendering of the
 *     user's own document and nothing else. Where ALLOW_PRAGMA is false the
 *     pragma is itself a violation. The two Tailwind v4 declarations that
 *     REMOVE the default fixed-width theme are allowed (see ALLOWED below).
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
// Everything under src/, public/ (text files) and scripts/. Wired into
// `npm run build` (and `npm run check:type`), which Workers Builds runs on
// every deploy, so a violation cannot ship.
const ROOTS = ["src", "public", "scripts"];
// Users' documents kept as test inputs, skipped whole. The landing sites
// have none.
const DOCUMENT_PATHS = new Set([]);
// Whether a line may opt out of the fixed-width check with the
// document-content pragma. Only the editor renders a user's document; the
// landing sites have none, so here the pragma is reported instead of honored.
const ALLOW_PRAGMA = false;

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
  [0x0387, "separator-dot", "greek ano teleia"],
  [0x16eb, "separator-dot", "runic single punctuation"],
  [0x2022, "separator-dot", "bullet"],
  [0x2027, "separator-dot", "hyphenation point"],
  [0x2043, "separator-dot", "hyphen bullet"],
  [0x2219, "separator-dot", "bullet operator"],
  [0x22c5, "separator-dot", "dot operator"],
  [0x25e6, "separator-dot", "white bullet"],
  [0x2e31, "separator-dot", "word separator middle dot"],
  [0x2e33, "separator-dot", "raised dot"],
  [0x30fb, "separator-dot", "katakana middle dot"],
  [0xff65, "separator-dot", "halfwidth katakana middle dot"],
  [0x00a7, "section-sign", "section sign"],
];
// [name, rule, legacy]: a legacy entity is one HTML parsers still decode
// without its closing semicolon.
const NAMED_ENTITIES = [
  ["middot", "separator-dot", true],
  ["centerdot", "separator-dot", false],
  ["CenterDot", "separator-dot", false],
  ["bull", "separator-dot", false],
  ["bullet", "separator-dot", false],
  ["hybull", "separator-dot", false],
  ["sdot", "separator-dot", false],
  ["sect", "section-sign", true],
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
    // HTML numeric entities; parsers accept them without the semicolon
    "&#0*" + n + ";?(?![0-9])",
    "&#x0*" + bare + ";?(?![0-9a-f])",
  ];
  glyphChecks.push({ rule, name: `U+${h.toUpperCase()} ${name}`, re: new RegExp(alts.join("|"), "i") });
}
for (const [ent, rule, legacy] of NAMED_ENTITIES) {
  const re = new RegExp("&" + ent + (legacy ? ";?(?![A-Za-z0-9])" : ";"));
  glyphChecks.push({ rule, name: `&${ent}; entity`, re });
}

const j = (...parts) => parts.join("");
const FW = j("mo", "no"); // the standalone fixed-width word
const FW_CAP = j("Mo", "no");
// Regex sources, matched case-insensitively unless noted.
const FIXED_WIDTH_PATTERNS = [
  // font-*, label-*, the family keywords, and Tailwind's ui- stack
  reEsc(j("font", "-", FW)),
  reEsc(j("label", "-", FW)),
  reEsc(j(FW, "space")),
  // any standalone part: Plex_X, "Roboto X", --font-geist-X,
  // --default-X-font-family, X in a comment
  "(?<![a-z])" + FW + "(?![a-z])",
  // named faces without such a part
  reEsc(j("IBM", "Plex", FW_CAP)),
  reEsc(j("Jet", "Brains")),
  reEsc(j("SF", FW_CAP)),
  reEsc(j("Men", "lo")),
  reEsc(j("Mon", "aco")),
  reEsc(j("Conso", "las")),
  reEsc(j("Cour", "ier")),
  j("Lucida", "[ _-]?", "(Console|Sans[ _-]?Typewriter)"),
  j("Fira", "[ _-]?", "Code"),
  j("Source", "[ _-]?", "Code", "[ _-]?", "Pro"),
  j("Cascadia", "[ _-]?", "(Code|", FW, ")"),
  j("Anonymous", "[ _-]?", "Pro"),
  reEsc(j("Incon", "solata")),
  reEsc(j("Cous", "ine")),
  reEsc(j("Iose", "vka")),
];
const FIXED_WIDTH_RES = [
  new RegExp(FIXED_WIDTH_PATTERNS.join("|"), "i"),
  // camel-cased identifiers (geistX, robotoX); case-sensitive on purpose
  new RegExp("(?<=[a-z])" + FW_CAP + "(?![a-z])"),
];

// The Tailwind v4 declarations that REMOVE its default fixed-width theme
// (the utility and preflight's code/kbd/samp/pre family). They are the
// removal, not a use.
const ALLOWED = [
  new RegExp(reEsc(j("--font", "-", FW)) + ":\\s*initial\\s*;", "g"),
  new RegExp(reEsc(j("--default-", FW, "-font-family")) + ":\\s*var\\(--font-body\\)\\s*;", "g"),
];
const PRAGMA = j("type-rules", ": ", "document-content");

function* walk(abs) {
  if (DOCUMENT_PATHS.has(path.relative(REPO, abs).split(path.sep).join("/"))) return;
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
      if (line.includes(PRAGMA)) {
        if (ALLOW_PRAGMA) return;
        hits.push(`${rel}:${i + 1}: pragma-not-allowed: ${excerpt}`);
      }
      let stripped = line;
      for (const re of ALLOWED) stripped = stripped.replace(re, "");
      for (const re of FIXED_WIDTH_RES) {
        const m = stripped.match(re);
        if (m) {
          hits.push(`${rel}:${i + 1}: fixed-width-font (${m[0]}): ${excerpt}`);
          break;
        }
      }
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
