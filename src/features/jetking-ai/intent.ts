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

/**
 * A self-contained task request — "write me a poem about...", "give me a
 * recipe for...", "translate this into..." — has neither a referential
 * pronoun nor a Jetking subject keyword, so without this it fell through to
 * `!SUBJECT_RE.test()` and got treated as a follow-up to whatever topic came
 * before. That merged it into the previous turn's subject and let a
 * completely unrelated request clear the retrieval gate on borrowed context
 * (confirmed live: "write me a poem about the ocean" right after a CEO
 * question answered from founder/leadership passages). A short reactive word
 * ("shorter", "yes", "address") or a real question ("what is the eligibility")
 * never matches this, so genuine follow-ups are unaffected.
 */
const IMPERATIVE_TASK_RE =
  /^(write|compose|create|generate|make|give me|tell me a|draw|design|code|solve|translate|summarize|summarise|sing|recite)\b/i;

/**
 * A complete, subject-less, facet-less question needs nothing from the prior
 * turn to mean what it means — unlike a short reactive reply ("shorter",
 * "yes", "address") that's meaningless without it. Below this word count, a
 * bare utterance is assumed to be exactly that kind of short reply and stays
 * a follow-up; every genuine short-reply case in the eval fixtures is 1 word,
 * so 5 leaves a wide margin. Confirmed live: "how do I bake sourdough
 * bread?", asked right after an unrelated question, inherited that
 * question's retrieval context (no subject keyword, no facet, no referential
 * pronoun) and answered from an unrelated Cloud Computing passage instead of
 * running fresh retrieval and correctly gating as off-topic.
 */
const STANDALONE_MIN_WORDS = 5;

export function isFollowUpMessage(message: string, hasPrevUser: boolean): boolean {
  if (!hasPrevUser) return false;
  const trimmed = message.trim();
  if (IMPERATIVE_TASK_RE.test(trimmed) && !SUBJECT_RE.test(message)) return false;
  if (REFERENTIAL_RE.test(message)) return true;
  if (SUBJECT_RE.test(message)) return false;
  // No subject and no referential pronoun. A facet word ("fees", "eligibility",
  // "duration", ...) always means "of whatever we were just discussing", so it
  // stays a follow-up regardless of length; otherwise only a short utterance
  // is assumed to be relying on context — a longer one stands on its own.
  if (Object.values(detectWants(message)).some(Boolean)) return true;
  return trimmed.split(/\s+/).length < STANDALONE_MIN_WORDS;
}

/**
 * Explicit "I need guidance, not a fact" language — "not sure what to do",
 * "coding nahi aata", "confused which course". A message can carry this
 * AND still trip a facet/subject keyword ("job jaldi chahiye" matches
 * wantPlacement's "jobs?"; "finished my BCA" matches the BCA subject regex),
 * which used to make needsPlanner() treat it as already understood and skip
 * straight to a keyword-matched deterministic answer — exactly the garbled,
 * off-topic reply the planner exists to prevent. This overrides that.
 */
const NEEDS_GUIDANCE_RE =
  /\b(not sure|don'?t know|no idea|confused|which (course|one) (is )?(right|best|suitable)|not good at|nahi aata|kya karu|kaunsa|samajh nahi|pata nahi|weak in)\b/i;

export function needsGuidance(message: string): boolean {
  return NEEDS_GUIDANCE_RE.test(message);
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
  wantAbout: boolean;
}

// Deliberately "centre(s)" only, not the American "center(s)" spelling: this
// site and its Indian visitors consistently write "centre" for a physical
// branch, and "center" alone is common as an ordinary English verb/adjective
// ("center a div", "center-aligned") — matching it misclassified CSS/design
// questions as "where is the nearest Jetking centre" location queries.
const LOCATION_RE = /\b(centres?|near(est)?|location|address|branch|directions?|visit|where)\b/i;

export function isLocationMessage(message: string, hasCityHint: boolean): boolean {
  return LOCATION_RE.test(message) || hasCityHint;
}

/**
 * A follow-up that continues a centre lookup already in progress — e.g.
 * "vapi" alone, replying to "Which city are you in?", isn't a place
 * `extractCityHint` recognises (that list can't cover every Indian town) or
 * a sentence `isLocationMessage`'s keyword regex matches ("centre", "near"
 * ...). Without this, it fell through to general semantic search, scored
 * just high enough to reach the LLM, which invented a plausible-looking but
 * fake centre address. `session.lastFacet === 'centre'` is set once a real
 * /api/chat centre turn has happened; the route additionally checks the
 * assistant's own immediately-prior message text for its client-scripted
 * starter prompts ("locations", "counselor", "enquire"), which never call
 * /api/chat until the user answers, so no session exists yet to carry this.
 */
export function isLocationFollowUp(input: {
  isFollowUp: boolean;
  lastFacet?: string;
  message: string;
  hasExplicitFacet: boolean;
}): boolean {
  return (
    input.isFollowUp &&
    input.lastFacet === 'centre' &&
    !detectSubject(input.message) &&
    !input.hasExplicitFacet
  );
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
    // Company-identity questions (founder, leadership, history, awards) —
    // distinct from course facets above. Added when the About page's
    // leadership bios, timeline and achievements were wired into the
    // knowledge base, so those passages actually lead the ranking instead of
    // relying on the LLM to fish the right fact out of the broader context.
    wantAbout:
      /\b(founder|founded|company history|jetking'?s? history|legacy|\bceo\b|chairman|managing director|leadership|awards?|achievements?|about jetking)\b/i.test(
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
  if (wants.wantAbout) return 'about';
  if (isLocation) return 'centre';
  return 'course';
}
