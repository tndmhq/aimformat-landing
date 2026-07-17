// Fixed-window request throttle, in memory.
//
// State lives in the server instance's memory, so limits apply per
// isolate/process and reset when the instance is recycled — cheap friction
// against scripted abuse, not a distributed guarantee.

type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();

// Bounds memory under sustained distinct-key pressure (e.g. spoofed keys).
const MAX_KEYS = 10_000;

/** Returns true while `key` is within `limit` requests per `windowMs`. */
export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): boolean {
  const now = Date.now();
  const w = windows.get(key);
  if (w && now < w.resetAt) {
    w.count += 1;
    return w.count <= limit;
  }

  if (windows.size >= MAX_KEYS) {
    for (const [k, v] of windows) {
      if (now >= v.resetAt) windows.delete(k);
    }
    if (windows.size >= MAX_KEYS) {
      const oldest = windows.keys().next().value;
      if (oldest !== undefined) windows.delete(oldest);
    }
  }

  windows.set(key, { count: 1, resetAt: now + windowMs });
  return true;
}
