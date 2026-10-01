import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/meta";

// Every public route. /llms.txt is listed too: it is a real page for agents,
// and the in-file agent note in every .aim document points at it.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/editors`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/llms.txt`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
