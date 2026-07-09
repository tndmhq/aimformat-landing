import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Near-static marketing site: no incremental cache / R2 override needed.
export default defineCloudflareConfig();
