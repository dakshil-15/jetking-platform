/**
 * Centre URL helpers — the live jetking.com site uses flat paths:
 *   /centres/ameerpet   (not /centres/hyderabad/ameerpet)
 *
 * Nested paths still resolve for backwards compatibility, but new links and
 * canonicals should prefer the flat form to preserve SEO equity on migration.
 */
export function centrePath(slug: string): `/centres/${string}` {
  return `/centres/${slug}`;
}
