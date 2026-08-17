/**
 * Where links in an answer point.
 *
 * The knowledge base stores relative paths only — it is a self-contained local
 * corpus and must not carry the address of whatever machine crawled it. The
 * public origin is joined on at render time, so the same committed data works
 * in dev, in staging, and embedded in the live site.
 */
import { serverEnv } from '@/lib/config/env.server';

/** Static product metadata. Single source of truth for naming and copy. */
export const SITE = {
  name: 'Jetking Assistant',
  shortName: 'Jetking',
  description:
    'Ask anything about Jetking courses, placements, fees, eligibility and training centres — answered from jetking.com.',
  organisation: 'Jetking Infotrain Limited',
  /** The site every answer is grounded in. */
  sourceSite: serverEnv.siteUrl,
  sourceLabel: serverEnv.siteHost,
} as const;

/**
 * Resolve a knowledge-base path to a link.
 *
 * Accepts a stored relative path ("/courses/x"). Absolute URLs are passed
 * through untouched so any legacy row still renders rather than producing a
 * broken `https://site.com/http://…`.
 */
export function siteHref(path: string): string {
  if (!path) return SITE.sourceSite;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.sourceSite}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Placeholder identity — swap for real session data when auth is added. */
export const CURRENT_USER = {
  id: 'usr_local',
  name: 'Guest',
  email: 'guest@jetking.com',
  plan: 'Course explorer',
} as const;
