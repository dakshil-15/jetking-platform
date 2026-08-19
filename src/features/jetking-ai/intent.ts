/**
 * Deterministic (regex-based) intent detection, extracted out of
 * app/api/chat/route.ts so it's a pure, importable unit — used by the route
 * itself and by scripts/eval-conversations.mts to replay conversations
 * without a server or model call. Behaviour is unchanged from before the
 * extraction; an LLM-based planner replacing this is Phase 2, not this pass.
 */

const REFERENTIAL_RE =
  /\b(it|its|it's|that|this|these|those|they|them|their|there|same|also|too|another|what about|how about|and|aur|iska|uska|isme|usme|kitni|kitna)\b/i;
const SUBJECT_RE =
  /\b(cyber|security|cloud|network|networking|hacking|ethical|blockchain|animation|gaming|metaverse|hardware|software|bca|mca|linux|red ?hat|rhcsa|aws|azure|data science|\bai\b|course|courses|diploma|masters|certification|centre|center|placement|blog)\b/i;

export function isFollowUpMessage(message: string, hasPrevUser: boolean): boolean {
  return hasPrevUser && (REFERENTIAL_RE.test(message) || !SUBJECT_RE.test(message));
}

const SUBJECT_LABELS: [RegExp, string][] = [
  [/ethical|hacking/, 'Ethical Hacking'],
  [/cyber|security/, 'Cyber Security'],
  [/cloud/, 'Cloud Computing'],
  [/blockchain/, 'Blockchain'],
  [/animation|gaming|metaverse|vfx/, 'Animation & Gaming'],
  [/data science|machine learning|\bai\b/, 'AI & Data Science'],
  [/network/, 'Networking'],
  [/hardware/, 'Hardware & Networking'],
  [/\bbca\b/, 'BCA'],
  [/\bmca\b/, 'MCA'],
];

export function detectSubject(text: string): string | null {
  return SUBJECT_LABELS.find(([re]) => re.test(text.toLowerCase()))?.[1] ?? null;
}

export interface WantFlags {
  wantFees: boolean;
  wantEligibility: boolean;
  wantCurriculum: boolean;
  wantPlacement: boolean;
  wantDuration: boolean;
  wantCourse: boolean;
}

const LOCATION_RE = /\b(cent(re|er)s?|near(est)?|location|address|branch|directions?|visit|where)\b/i;

export function isLocationMessage(message: string, hasCityHint: boolean): boolean {
  return LOCATION_RE.test(message) || hasCityHint;
}

export function detectWants(message: string): WantFlags {
  return {
    // "kitni"/"kitna" (Hindi "how much/many") is deliberately NOT matched here —
    // it's a generic quantity word ("iska duration kitna hai" means "what is
    // its duration", not a fee question), and wantFees is checked first in
    // detectAnsweredFacet, so including it here misclassified duration/
    // eligibility Hinglish questions as fee questions. Genuine Hinglish fee
    // asks already say "fee(s)" itself ("iski fees kitni hai").
    wantFees: /\b(fee|fees|cost|price|emi|installment|scholarship|payment|charges?)\b/i.test(
      message,
    ),
    wantEligibility:
      /\b(eligib|entry requirement|who can|who should|qualification|documents?|after (10th|12th|graduation)|10\+2)/i.test(
        message,
      ),
    wantCurriculum:
      /\b(curriculum|syllabus|module|topics?|what.{0,15}(learn|study|cover)|program structure)\b/i.test(
        message,
      ),
    wantPlacement:
      /\b(placement|placed|jobs?|salary|package|recruit|hiring|compan(y|ies)|career|scope)\b/i.test(
        message,
      ),
    wantDuration: /\b(duration|how long|months?|years?|kitne (mahine|saal))\b/i.test(message),
    wantCourse:
      /\b(course|courses|diploma|masters|learn|training|program|certification|specialization)\b/i.test(
        message,
      ),
  };
}

export function detectAnsweredFacet(wants: WantFlags, isLocation: boolean): string {
  if (wants.wantFees) return 'fees';
  if (wants.wantEligibility) return 'eligibility';
  if (wants.wantCurriculum) return 'curriculum';
  if (wants.wantDuration) return 'duration';
  if (wants.wantPlacement) return 'placement';
  if (isLocation) return 'centre';
  return 'course';
}
