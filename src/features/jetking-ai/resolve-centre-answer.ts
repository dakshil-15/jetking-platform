import { formatCentreRecords } from '@/features/jetking-ai/format-passage';
import { loadIndex } from '@/features/knowledge/lib/engine';
import type { CentreRecord } from '@/features/knowledge/types';
import websiteCorpus from '@/content/website-corpus.json';

const CITY_RE =
  /\b(mumbai|delhi|pune|bangalore|bengaluru|hyderabad|chennai|kolkata|ahmedabad|nagpur|thane|noida|gurgaon|gurugram|lucknow|kanpur|indore|bhopal|chandigarh|jammu|kochi|varanasi|prayagraj|vasai|borivali|dadar|vashi|shivajinagar|hinjewadi|ameerpet|andheri|koramangala|laxmi nagar|maninagar|khar)\b/gi;

const CITY_ALIASES: Record<string, string[]> = {
  bangalore: ['bangalore', 'bengaluru'],
  bengaluru: ['bangalore', 'bengaluru'],
  gurgaon: ['gurgaon', 'gurugram'],
  gurugram: ['gurgaon', 'gurugram'],
  delhi: ['delhi', 'noida', 'gurgaon', 'gurugram', 'azadpur'],
  mumbai: ['mumbai', 'borivali', 'dadar', 'khar', 'thane', 'vasai', 'vashi'],
};

function norm(s: string): string {
  return s.toLowerCase().replace(/\s+/g, ' ').trim();
}

/** Prefer the last city named in the question (follow-ups like "… Borivali … Mumbai"). */
export function extractCityHint(query: string): string | null {
  const matches = [...query.matchAll(CITY_RE)].map((m) => m[1]!.toLowerCase());
  return matches.length ? matches[matches.length - 1]! : null;
}

function cityMatches(centreCity: string, hint: string): boolean {
  const city = norm(centreCity);
  const h = norm(hint);
  if (city === h || city.includes(h) || h.includes(city)) return true;
  const aliases = CITY_ALIASES[h];
  return Boolean(aliases?.some((a) => city === a || city.includes(a)));
}

function websiteCentres(): CentreRecord[] {
  const courses = new Map(
    websiteCorpus.structured.courses.map((course) => [course.slug, course.title]),
  );

  return websiteCorpus.structured.cities.map((city) => {
    const branches = websiteCorpus.structured.centres.filter(
      (centre) => centre.citySlug === city.slug,
    );
    const programmes = [
      ...new Set(
        branches.flatMap((branch) =>
          branch.coursesOffered.map((slug) => courses.get(slug) ?? slug.replace(/-/g, ' ')),
        ),
      ),
    ];

    return {
      id: `website-${city.slug}`,
      city: city.name,
      path: `/centres/${city.slug}`,
      summary: city.intro,
      locations: branches.map((branch) => ({
        name: branch.name,
        locality: `${branch.locality} · ${branch.pincode}`,
      })),
      programmes,
    };
  });
}

/**
 * Pick the best centre record(s) for a location question from the structured KB.
 * Prefers a city hub that has branch `locations` over suburb SEO pages.
 */
export function pickCentresForQuery(
  centres: CentreRecord[],
  query: string,
): CentreRecord[] {
  const hint = extractCityHint(query);
  if (!hint) return centres.filter((c) => c.locations.length > 0).slice(0, 4);

  const matched = centres.filter(
    (c) =>
      cityMatches(c.city, hint) ||
      c.locations.some(
        (location) =>
          norm(location.name).includes(hint) || norm(location.locality).includes(hint),
      ),
  );
  if (!matched.length) return [];

  // Exact city hub with branches (e.g. Mumbai with 6 localities)
  const hub =
    matched.find((c) => norm(c.city) === hint && c.locations.length > 0) ??
    matched.find((c) => c.locations.length > 0) ??
    matched.find((c) => norm(c.city) === hint) ??
    matched[0];

  return hub ? [hub] : matched.slice(0, 3);
}

/**
 * Build a structured centre reply from the KB — never SEO embedding blobs.
 * Returns null when the KB has no usable centre match.
 */
export async function resolveCentreAnswer(query: string): Promise<string | null> {
  const index = await loadIndex();
  const picked = pickCentresForQuery([...websiteCentres(), ...index.base.centres], query);
  if (!picked.length) {
    // No city named — offer a short national overview from hubs that have branches.
    const hubs = [...websiteCentres(), ...index.base.centres]
      .filter((c) => c.locations.length > 0)
      .slice(0, 4);
    if (!hubs.length) return null;
    return formatCentreRecords(
      hubs,
      'Jetking training centres',
      `Jetking runs training centres across India. Name your city and I will list the nearest branches.`,
    );
  }

  const title =
    picked.length === 1 ? `Jetking centres in ${picked[0]!.city}` : 'Jetking training centres';
  const lede = picked.length === 1 ? picked[0]!.summary : undefined;
  return formatCentreRecords(picked, title, lede);
}
