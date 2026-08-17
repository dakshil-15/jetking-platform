/**
 * Deterministic guard for high-risk Jetking claims produced by a local model.
 * Prompt instructions are not a security boundary, especially for small models.
 */

const SENSITIVE_PATTERNS = [
  /(?:₹|\b(?:rs\.?|inr|usd)\b|\$)\s*[\d,.]+(?:\s*(?:k|lakh(?:s)?|crore(?:s)?|million|billion|trillion))?/gi,
  /\b\d+(?:\.\d+)?\s*%/g,
  /\b\d+(?:\.\d+)?\s*(?:days?|weeks?|months?|years?)\b/gi,
  /(?:\+?\d[\d\s()-]{8,}\d)/g,
  /\b\d[\d,]*(?:\+)?\s*(?:students?|recruiters?|centres?|centers?|branches?|companies|partners?)\b/gi,
  /\b(?:100%\s+)?(?:job|placement)\s+guarantee(?:d)?\b/gi,
];

function canonical(value: string): string {
  return value
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\brupees?\b|\binr\b|\brs\.?\b/g, '₹')
    .replace(/crores\b/g, 'crore')
    .replace(/lakhs\b/g, 'lakh')
    .replace(/months\b/g, 'month')
    .replace(/years\b/g, 'year')
    .replace(/weeks\b/g, 'week')
    .replace(/days\b/g, 'day')
    .replace(/[^a-z0-9₹$%]+/g, '');
}

export function unsupportedSensitiveClaims(answer: string, context: string): string[] {
  const contextCanonical = canonical(context);
  const claims = new Set<string>();

  for (const pattern of SENSITIVE_PATTERNS) {
    pattern.lastIndex = 0;
    for (const match of answer.matchAll(pattern)) {
      const claim = match[0].trim();
      if (claim) claims.add(claim);
    }
  }

  const distinctClaims = [...claims]
    .sort((a, b) => b.length - a.length)
    .filter(
      (claim, index, all) =>
        !all.some(
          (other, otherIndex) => otherIndex < index && canonical(other).includes(canonical(claim)),
        ),
    );

  return distinctClaims.filter((claim) => !contextCanonical.includes(canonical(claim)));
}
