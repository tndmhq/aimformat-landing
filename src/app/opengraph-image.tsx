import { renderOgImage } from "@/lib/og";

export const alt = ".aim — the open document format for the AI era";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "The open document format",
    wordmark: ".aim",
    headline: "The document format\nfor the AI era.",
    support:
      "Valid HTML5 and a Tailwind subset. Stable chunks, slides, and three-lane track changes, native to the file.",
    footerLeft: "Open source / MIT",
    domain: "aimformat.com",
  });
}
