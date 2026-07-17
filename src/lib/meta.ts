import type { Metadata } from "next";

/**
 * Per-page metadata for subpages.
 *
 * Next shallow-merges metadata down the segment tree and *replaces* (never
 * deep-merges) the nested `openGraph`/`twitter` objects. A page that sets only
 * top-level `title`/`description` therefore inherits the root layout's homepage
 * `og:title` / `og:description` / `og:url` wholesale — so a shared subpage link
 * would show the homepage's text and point at the homepage. Building the full
 * `openGraph`/`twitter` objects here keeps every share page-specific.
 *
 * `path` is relative (e.g. "/editors"); it resolves to an absolute URL against
 * the `metadataBase` set in the root layout, and also feeds `rel="canonical"`.
 * Replacing `openGraph` also drops the root's file-based card image, so every
 * page using this helper colocates its own `opengraph-image.tsx` — that file
 * supplies the per-page image, and this object intentionally omits
 * `openGraph.images`.
 */
export function pageMeta(o: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: o.title,
    description: o.description,
    alternates: { canonical: o.path },
    openGraph: {
      type: "website",
      siteName: ".aim",
      title: o.title,
      description: o.description,
      url: o.path,
    },
    twitter: {
      card: "summary_large_image",
      title: o.title,
      description: o.description,
    },
  };
}
