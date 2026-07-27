const FALLBACK_SPEC_VERSION = "0.5";

/**
 * The published `.aim` spec version as a "major.minor" string (e.g. "0.5").
 *
 * Pulled live from PyPI so the site tracks releases without a manual bump:
 * the package version and the spec version are coupled upstream (a release
 * test asserts `__version__` starts with `SPEC_VERSION`), so the published
 * package's major.minor IS the spec version. The embedded stylesheet
 * (`data-aim-css`) is stamped with that same value.
 *
 * Falls back to a pinned constant if PyPI is unreachable, and the result is
 * cached for a day — so at worst this behaves like the old hardcoded value.
 */
export async function getSpecVersion(): Promise<string> {
  try {
    const res = await fetch("https://pypi.org/pypi/aimformat/json", {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return FALLBACK_SPEC_VERSION;
    const data = (await res.json()) as { info?: { version?: string } };
    const match = (data.info?.version ?? "").match(/^(\d+)\.(\d+)/);
    return match ? `${match[1]}.${match[2]}` : FALLBACK_SPEC_VERSION;
  } catch {
    return FALLBACK_SPEC_VERSION;
  }
}
