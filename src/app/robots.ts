import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/meta";

export default function robots(): MetadataRoute.Robots {
  return {
    // /api only hosts the newsletter POST endpoint; nothing there to index.
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
