import type { AnswerIntent } from '@/features/knowledge/types/answer';

/**
 * Intent selects which blocks the answer leads with. Retrieval itself is
 * intent-agnostic, so a misclassification changes the layout rather than the
 * accuracy.
 */
interface IntentRule {
  intent: AnswerIntent;
  pattern: RegExp;
}

/**
 * Declaration order is the tie-break: when two intents match equally often,
 * the earlier one wins. Placement sits above course so "will I get a job after
 * the course?" is answered with the guarantee, not a course list.
 */
const RULES: readonly IntentRule[] = [
  {
    intent: 'contact',
    pattern:
      /\b(contact|phone|call|email|address|reach|enquir|enrol|enroll|admission|apply|visit|office)\b/gi,
  },
  {
    intent: 'centres',
    pattern:
      /\b(centre|centres|center|centers|branch|location|near me|city|cities|campus|franchise)\b/gi,
  },
  {
    intent: 'fees',
    pattern: /\b(fee|fees|cost|price|pricing|charges|emi|installment|scholarship)\b/gi,
  },
  {
    intent: 'placement',
    pattern: /\b(job|jobs|placement|placed|salary|package|hiring|recruit|recruiter|guarantee)\b/gi,
  },
  {
    intent: 'eligibility',
    pattern:
      /\b(eligib\w*|qualif\w*|requirement|criteria|who can|after 12th|after 10th|graduate)\b/gi,
  },
  {
    intent: 'about',
    pattern: /\b(about|history|founded|founder|ceo|leadership|award|legacy|vision|mission)\b/gi,
  },
  {
    intent: 'course',
    // Stems, not whole words: "cybersecurity" must count for the course
    // intent, and `\bcyber\b` does not match inside a compound.
    pattern:
      /\b(course|courses|program|programme|training|learn|study|syllabus|curriculum|duration|certif\w*|degree|diploma|bca|mca|cloud\w*|cyber\w*|secur\w*|hack\w*|network\w*|aws|linux|data|analytic\w*|gaming|metaverse|marketing|hardware|animation)\b/gi,
  },
];

/**
 * Scores every intent and returns the strongest.
 *
 * First-match-wins misclassifies mixed questions: "which course is best for a
 * cybersecurity job?" hits the placement pattern once but the course pattern
 * three times, and the course reading is plainly the right one.
 */
export function detectIntent(query: string): AnswerIntent {
  let best: AnswerIntent = 'general';
  let bestScore = 0;

  for (const { intent, pattern } of RULES) {
    // `matchAll` needs a fresh lastIndex on a shared global regex.
    pattern.lastIndex = 0;
    const score = [...query.matchAll(pattern)].length;

    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }

  return best;
}
