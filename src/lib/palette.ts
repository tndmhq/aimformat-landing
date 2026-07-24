/**
 * The Standing Type palette — TS mirror of the `:root` block in
 * `src/app/globals.css` ("Spring run" two-ink cut).
 *
 * globals.css is the canonical definition for everything the browser renders;
 * this file exists for the two consumers that cannot read CSS variables:
 * the OG/social card renderer (draws to a PNG) and the `themeColor` viewport
 * meta. To change the palette, edit the `:root` block and this object — the
 * keys are roles, so nothing else in the codebase names a hue.
 */
export const PALETTE = {
  paper: "#faf4e3",
  paperDeep: "#f1e8cf",
  surface: "#fefaf0",

  ink: "#262219",
  inkSoft: "#59513c",
  inkFaint: "#665d49",

  /** Leading press ink: display type, primary action. */
  accent: "#23684a",
  accentDeep: "#1a4f37",
  /** Second press ink: eyebrows and standalone marks, never body text. */
  rubric: "#96382a",
  rubricDeep: "#7b2e26",

  rule: "#dbd1b6",
  ruleSoft: "#e6dcc2",
  sepia: "#c6b992",
  stamp: "#8a3a2e",
  highlight: "#f3e9c6",

  /** Track-changes inks — reserved for the metaphor, never generic UI. */
  redline: "#a12f23",
  greenline: "#4a6b33",
  /** Pale washes behind redline/greenline chips on OG cards. */
  redlineWash: "#f2ddd3",
  greenlineWash: "#e9e8cb",
} as const;
