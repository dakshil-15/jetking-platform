/**
 * Pure city-name extraction — no KB/corpus dependency, so it can be imported
 * by scripts/eval-conversations.mts (plain Node ESM, which can't load the
 * website-corpus.json import that resolve-centre-answer.ts needs) as well as
 * by the route and resolve-centre-answer.ts itself.
 */
const CITY_RE =
  /\b(mumbai|delhi|pune|bangalore|bengaluru|hyderabad|chennai|kolkata|ahmedabad|nagpur|thane|noida|gurgaon|gurugram|lucknow|kanpur|indore|bhopal|chandigarh|jammu|kochi|varanasi|prayagraj|vasai|borivali|dadar|vashi|shivajinagar|hinjewadi|ameerpet|andheri|koramangala|laxmi nagar|maninagar|khar)\b/gi;

/** Prefer the last city named in the question (follow-ups like "… Borivali … Mumbai"). */
export function extractCityHint(query: string): string | null {
  const matches = [...query.matchAll(CITY_RE)].map((m) => m[1]!.toLowerCase());
  return matches.length ? matches[matches.length - 1]! : null;
}
