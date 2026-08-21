import { formatCentreRecords } from '@/features/jetking-ai/format-passage';
import { extractCityHint } from '@/features/jetking-ai/city';
import { loadIndex } from '@/features/knowledge/lib/engine';
import type { CentreRecord } from '@/features/knowledge/types';
import websiteCorpus from '@/content/website-corpus.json';

export { extractCityHint };

const CITY_ALIASES: Record<string, string[]> = {
  bangalore: ['bangalore', 'bengaluru'],
  bengaluru: ['bangalore', 'bengaluru'],
  gurgaon: ['gurgaon', 'gurugram'],
  gurugram: ['gurgaon', 'gurugram'],
  delhi: ['delhi', 'noida', 'gurgaon', 'gurugram', 'azadpur'],
  mumbai: ['mumbai', 'borivali', 'dadar', 'khar', 'thane', 'vasai', 'vashi'],
  // IT-hub neighbourhoods `extractCityHint` recognises (see CITY_RE in
  // city.ts) that have no Jetking branch of their own — route them to the
  // nearest city hub instead of falling through to the generic "name your
  // city" reply, which was surfacing an unrelated city (Ahmedabad) as the
  // example. Hinjewadi sits right beside the Wakad/Chinchwad branch.
  hinjewadi: ['pune'],
  andheri: ['mumbai'],
  koramangala: ['bangalore', 'bengaluru'],

  // Same idea, extended to every other city Jetking has a centre in —
  // matched against real, well-known localities only (never a guess at
  // which city an ambiguous name belongs to).
  bandra: ['mumbai'],
  powai: ['mumbai'],
  malad: ['mumbai'],
  kandivali: ['mumbai'],
  goregaon: ['mumbai'],
  juhu: ['mumbai'],
  colaba: ['mumbai'],
  worli: ['mumbai'],
  chembur: ['mumbai'],
  ghatkopar: ['mumbai'],
  mulund: ['mumbai'],

  dwarka: ['delhi'],
  rohini: ['delhi'],
  'karol bagh': ['delhi'],
  'connaught place': ['delhi'],
  pitampura: ['delhi'],
  janakpuri: ['delhi'],
  saket: ['delhi'],
  'nehru place': ['delhi'],

  whitefield: ['bangalore', 'bengaluru'],
  'electronic city': ['bangalore', 'bengaluru'],
  indiranagar: ['bangalore', 'bengaluru'],
  marathahalli: ['bangalore', 'bengaluru'],
  'hsr layout': ['bangalore', 'bengaluru'],
  jayanagar: ['bangalore', 'bengaluru'],
  'btm layout': ['bangalore', 'bengaluru'],
  'jp nagar': ['bangalore', 'bengaluru'],
  malleshwaram: ['bangalore', 'bengaluru'],

  'hitech city': ['hyderabad'],
  gachibowli: ['hyderabad'],
  madhapur: ['hyderabad'],
  secunderabad: ['hyderabad'],
  begumpet: ['hyderabad'],
  dilsukhnagar: ['hyderabad'],

  wakad: ['pune'],
  kothrud: ['pune'],
  baner: ['pune'],
  'viman nagar': ['pune'],
  hadapsar: ['pune'],
  aundh: ['pune'],
  kharadi: ['pune'],

  'salt lake': ['kolkata'],
  'park street': ['kolkata'],
  howrah: ['kolkata'],
  rajarhat: ['kolkata'],
  behala: ['kolkata'],
  garia: ['kolkata'],

  satellite: ['ahmedabad'],
  navrangpura: ['ahmedabad'],
  bopal: ['ahmedabad'],
  vastrapur: ['ahmedabad'],

  'gomti nagar': ['lucknow'],
  hazratganj: ['lucknow'],

  sitabuldi: ['nagpur'],
  dharampeth: ['nagpur'],

  'cyber city': ['gurgaon', 'gurugram'],
  'dlf phase': ['gurgaon', 'gurugram'],
};

function norm(s: string): string {
  return s.toLowerCase().replace(/\s+/g, ' ').trim();
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
