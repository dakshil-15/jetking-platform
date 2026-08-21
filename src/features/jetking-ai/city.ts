/**
 * Pure city-name extraction — no KB/corpus dependency, so it can be imported
 * by scripts/eval-conversations.mts (plain Node ESM, which can't load the
 * website-corpus.json import that resolve-centre-answer.ts needs) as well as
 * by the route and resolve-centre-answer.ts itself.
 */
// Cities plus recognisable neighbourhoods/IT hubs within them. Only
// well-known, unambiguous names — a mis-mapped neighbourhood sends someone
// confidently to the wrong city's centre, which is worse than not
// recognising it at all (see CITY_ALIASES in resolve-centre-answer.ts).
const CITY_RE =
  /\b(mumbai|delhi|pune|bangalore|bengaluru|hyderabad|chennai|kolkata|ahmedabad|nagpur|thane|noida|gurgaon|gurugram|lucknow|kanpur|indore|bhopal|chandigarh|jammu|kochi|varanasi|prayagraj|vasai|borivali|dadar|vashi|shivajinagar|hinjewadi|ameerpet|andheri|koramangala|laxmi nagar|maninagar|khar|bandra|powai|malad|kandivali|goregaon|juhu|colaba|worli|chembur|ghatkopar|mulund|dwarka|rohini|karol bagh|connaught place|pitampura|janakpuri|saket|nehru place|whitefield|electronic city|indiranagar|marathahalli|hsr layout|jayanagar|btm layout|jp nagar|malleshwaram|hitech city|gachibowli|madhapur|secunderabad|begumpet|dilsukhnagar|wakad|kothrud|baner|viman nagar|hadapsar|aundh|kharadi|salt lake|park street|howrah|rajarhat|behala|garia|satellite|navrangpura|bopal|vastrapur|gomti nagar|hazratganj|sitabuldi|dharampeth|cyber city|dlf phase)\b/gi;

/** Prefer the last city named in the question (follow-ups like "… Borivali … Mumbai"). */
export function extractCityHint(query: string): string | null {
  const matches = [...query.matchAll(CITY_RE)].map((m) => m[1]!.toLowerCase());
  return matches.length ? matches[matches.length - 1]! : null;
}
