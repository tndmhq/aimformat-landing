/**
 * Shared Open Graph / social-preview card renderer ("The Standing Type").
 *
 * One letterpress plate per route: paper ground, an accent-ink rule, a
 * Fraunces headline, a quiet eyebrow in the same face, roman (sentence case;
 * tracked-out caps read as generated, an italic accent line reads the same
 * way, and no typewriter face is allowed here or anywhere else, see the
 * workspace design-rules.md), and a real
 * track-changes proposal chip (redline and greenline are the format's own
 * track-changes metaphor, never a generic icon). Two-ink rules apply here
 * too: the wordmark takes the rubric ink as a standalone mark; no text run
 * ever mixes inks.
 *
 * Everything sits inside the plate frame (inset 44px): the stack is sized so
 * the longest card (a two-line headline over a two-line support line) still
 * clears the frame with air between the rows.
 *
 * Consumed only by `opengraph-image.tsx` route handlers, which run on the
 * Node.js runtime, so reading the vendored fonts off disk is safe. Twitter
 * uses these via its standard `og:image` fallback (card = summary_large_image
 * is set in the page metadata), so no separate `twitter-image` is needed.
 */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { PALETTE } from "@/lib/palette";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const {
  paper: PAPER,
  surface: SURFACE,
  ink: INK,
  inkSoft: INK_SOFT,
  inkFaint: INK_FAINT,
  accent: ACCENT,
  rubric: RUBRIC,
  rule: RULE,
  redline: REDLINE,
  greenline: GREENLINE,
  redlineWash: REDLINE_WASH,
  greenlineWash: GREENLINE_WASH,
} = PALETTE;

export type OgContent = {
  eyebrow: string;
  wordmark: string;
  /** Headline; use "\n" to force line breaks. */
  headline: string;
  support: string;
  footerLeft: string;
  domain: string;
};

async function loadFonts() {
  const dir = join(process.cwd(), "public", "og-fonts");
  const fraunces = await readFile(join(dir, "Fraunces-600.ttf"));
  return [{ name: "Fraunces", data: fraunces, weight: 600 as const, style: "normal" as const }];
}

function ProposalChip() {
  const mark = {
    display: "flex",
    padding: "2px 10px",
    borderRadius: 5,
  } as const;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "flex-start",
        gap: 8,
        backgroundColor: SURFACE,
        border: `1px solid ${RULE}`,
        borderRadius: 12,
        padding: "14px 24px 16px",
        boxShadow: "0 16px 40px -24px rgba(20,14,6,0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          fontFamily: "Fraunces",
          fontWeight: 600,
          fontSize: 17,
          color: INK_FAINT,
        }}
      >
        Proposed edit
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: "Fraunces",
          fontWeight: 600,
          fontSize: 29,
          color: INK,
        }}
      >
        <div style={{ display: "flex" }}>Payment is due</div>
        <div
          style={{
            ...mark,
            color: REDLINE,
            backgroundColor: REDLINE_WASH,
            textDecoration: "line-through",
          }}
        >
          in 30 days
        </div>
        <div
          style={{
            ...mark,
            color: GREENLINE,
            backgroundColor: GREENLINE_WASH,
            textDecoration: "underline",
          }}
        >
          on receipt
        </div>
      </div>
    </div>
  );
}

function Card(c: OgContent) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: PAPER,
        color: INK,
        fontFamily: "Fraunces",
      }}
    >
      {/* letterpress rule */}
      <div style={{ display: "flex", width: "100%", height: 14, backgroundColor: ACCENT }} />
      {/* plate frame */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 44,
          left: 44,
          right: 44,
          bottom: 44,
          border: `1px solid ${RULE}`,
          borderRadius: 3,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
          padding: "66px 88px 70px",
        }}
      >
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Fraunces",
              fontWeight: 600,
              fontSize: 26,
              color: ACCENT,
            }}
          >
            {c.eyebrow}
          </div>
          <div style={{ display: "flex", fontFamily: "Fraunces", fontWeight: 600, fontSize: 34, color: RUBRIC }}>
            {c.wordmark}
          </div>
        </div>

        {/* headline + support */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              whiteSpace: "pre-wrap",
              fontFamily: "Fraunces",
              fontWeight: 600,
              fontSize: 72,
              lineHeight: 1.04,
              letterSpacing: -1.2,
              color: INK,
            }}
          >
            {c.headline}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              maxWidth: 1000,
              fontFamily: "Fraunces",
              fontWeight: 600,
              fontSize: 27,
              lineHeight: 1.3,
              color: INK_SOFT,
            }}
          >
            {c.support}
          </div>
        </div>

        <ProposalChip />

        {/* footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Fraunces",
              fontWeight: 600,
              fontSize: 21,
              color: INK_FAINT,
            }}
          >
            {c.footerLeft}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Fraunces",
              fontWeight: 600,
              fontSize: 24,
              color: INK_SOFT,
            }}
          >
            {c.domain}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function renderOgImage(content: OgContent) {
  const fonts = await loadFonts();
  return new ImageResponse(<Card {...content} />, { ...OG_SIZE, fonts });
}
