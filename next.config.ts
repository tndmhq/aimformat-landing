import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  /* config options here */
};

// Enable Cloudflare bindings during `next dev` (no-op for build/production).
initOpenNextCloudflareForDev();

export default nextConfig;
