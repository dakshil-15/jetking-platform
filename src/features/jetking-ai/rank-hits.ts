import type { WantFlags } from './intent';

/**
 * Extracted out of app/api/chat/route.ts so scripts/eval-conversations.mts
 * can reproduce the exact deterministic KB-fallback text route.ts itself
 * would show (passagesAnswer()) without duplicating the weighting logic.
 * Behaviour unchanged from before the extraction.
 */

export interface SearchHit {
  type: string;
  text: string;
  score: number;
}

export interface RankedHit {
  type: string;
  text: string;
}

/**
 * Re-ranks retrieved chunks by relevance to the detected want* facet, and
 * demotes centre SEO pages so they never lead a non-location answer.
 */
export function rankHits(searchHits: SearchHit[], wants: WantFlags): RankedHit[] {
  const nonCentre = searchHits.filter((h) => h.type !== 'centre');
  const pool = nonCentre.length === 0 ? searchHits : nonCentre;
  const weight = (t: string) => {
    if (t === 'centre') return 0;
    if (t === 'home') return -0.1;
    let w = 0;
    if (wants.wantFees) w += t === 'fees' ? 0.14 : t === 'overview' || t === 'course' ? 0.05 : 0;
    if (wants.wantEligibility) w += t === 'eligibility' ? 0.14 : 0;
    if (wants.wantCurriculum) w += t === 'curriculum' ? 0.13 : t === 'course' ? 0.05 : 0;
    if (wants.wantPlacement) w += t === 'placement' ? 0.13 : t === 'info' || t === 'blog' ? 0.05 : 0;
    if (wants.wantDuration) w += t === 'duration' ? 0.14 : 0;
    if (wants.wantCourse) w += t === 'course' || t === 'overview' || t === 'curriculum' ? 0.05 : 0;
    if (wants.wantAbout) w += t === 'about' ? 0.14 : 0;
    return w;
  };
  return pool
    .map((h) => ({ h, adj: h.score + weight(h.type) }))
    .sort((a, b) => b.adj - a.adj)
    .map(({ h }) => ({ type: h.type, text: h.text }));
}

/**
 * formatPassagesAnswer's `max` param: a precise facet (fees/eligibility/
 * duration/curriculum/about) leads with one focused hit; a broader ask
 * composes two.
 */
export function passagesMax(wants: WantFlags): number {
  return wants.wantFees ||
    wants.wantEligibility ||
    wants.wantDuration ||
    wants.wantCurriculum ||
    wants.wantAbout
    ? 1
    : 2;
}
