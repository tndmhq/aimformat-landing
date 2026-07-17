import { renderOgImage } from "@/lib/og";

export const alt = "Where .aim files open: editors and viewers for the open format";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Editors & Viewers",
    wordmark: ".aim",
    headline: "Where .aim\nfiles open.",
    support:
      ".aim renders in any browser, because it is the page. An editor adds the review surface: word-level diffs, one-click accept and reject.",
    footerLeft: "A directory",
    domain: "aimformat.com/editors",
  });
}
