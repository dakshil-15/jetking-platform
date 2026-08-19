/**
 * Public environment configuration — safe to import anywhere, including client
 * components.
 *
 * Each value is read through a literal `process.env.NEXT_PUBLIC_*` expression
 * so Next can statically find and inline it into the browser bundle. Reading
 * `process.env` dynamically would leave the client with `undefined` and a
 * silent fallback to the default, which looks correct until someone changes
 * the variable and nothing happens.
 *
 * Server-only settings live in `env.server.ts` so they can never be pulled
 * into a client bundle by an accidental import.
 */

export function envText(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

/** Numeric env var, falling back when unset or not a finite number. */
export function envNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** Boolean env var with explicit truthy/falsy spellings. */
export function envBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  const normalized = value.trim().toLowerCase();
  if (['1', 'true', 'yes', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false;
  return fallback;
}

export const stripTrailingSlash = (url: string): string => url.replace(/\/+$/, '');

const whatsappNumber = envText(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, '919999999999').replace(
  /\D/g,
  '',
);

const whatsappMessage = envText(
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE,
  'Hi Jetking, I have a question about your courses',
);

const siteUrl = stripTrailingSlash(
  envText(process.env.NEXT_PUBLIC_SITE_URL, 'https://www.jetking.com'),
);

export const publicEnv = {
  whatsappNumber,
  whatsappMessage,
  /** Ready-to-use click-to-chat link. */
  whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  /** Origin of the Jetking website that answers link out to. Client-safe. */
  siteUrl,
  /** Host only, for display: "jetking.com". */
  siteHost: siteUrl.replace(/^https?:\/\/(www\.)?/, ''),
} as const;
