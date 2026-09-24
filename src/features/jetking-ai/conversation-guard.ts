import { smallTalk } from './small-talk';

/**
 * Deterministic, no-model handling of messages that must never reach retrieval
 * or the LLM: greetings, prompt-injection / credential fishing, abuse, and
 * clearly off-topic requests. Runs first in /api/chat so these get an instant,
 * predictable reply instead of whichever KB passage happens to share a word
 * (a "python function" request used to return a Python blog post).
 *
 * `strip` handles "hello, what courses do you have?" — the greeting is
 * dropped and the real question continues through the normal pipeline.
 */

export type GuardResult =
  | { kind: 'reply'; text: string; reason: string }
  | { kind: 'continue'; message: string };

const HELP =
  'I can help with Jetking courses, fees, eligibility, placements, centres, demo classes and franchise enquiries.';

const GREETING_PREFIX =
  /^\s*(?:hi+|hey+|h(?:e|a)llo+|helo+|hlo+|yo+|namaste|namaskar|hola|good (?:morning|afternoon|evening|day))\b[\s,!.:-]*(?:there|jetking|team|bro|bhai|sir|maam|madam)?[\s,!.:-]*/i;

const INJECTION =
  /\b(ignore|disregard|forget|override|bypass)\b[^.?!]{0,40}\b(instructions?|prompts?|rules?|guidelines?|restrictions?)\b|\b(system|hidden|initial|developer) (prompt|instructions?|message)\b|\b(reveal|show|print|repeat|leak)\b[^.?!]{0,30}\b(prompt|instructions|rules|api[ -]?key|secret|token|password|credentials?)\b|\bjailbreak\b|\bdeveloper mode\b|\bpretend (?:you (?:are|have)|to be)\b[^.?!]{0,40}\b(no (?:rules|restrictions)|unrestricted|unfiltered)\b/i;

/** Case-sensitive on purpose: the "DAN" jailbreak persona, not someone named Dan. */
const DAN_MODE = /\bDAN\b/;
const CREDENTIALS =
  /\b(admin|root|database|db|server|login)\b[^.?!]{0,20}\b(password|passcode|credentials?|token|key)\b|\b(password|api[ -]?key|secret key)\b[^.?!]{0,20}\b(of|for)\b[^.?!]{0,20}\b(admin|jetking|server|database)\b/i;

const ABUSE =
  /\b(stupid|useless|idiot|dumb|worthless|garbage|trash|moron|bakwas|bekar|chutiya|madarchod|bhosdi|fuck|shit|bitch|asshole)\b/i;

const OFF_TOPIC: { pattern: RegExp; reason: string }[] = [
  {
    // Writing/debugging code as a service — not asking about a course.
    pattern:
      /\b(write|generate|debug|implement|fix)\b[^.?!]{0,30}\b(function|program|script|code|algorithm|regex|snippet)\b|\bcode (?:for|to)\b/i,
    reason: 'off-topic:code',
  },
  { pattern: /^[\s\d+\-*/x×÷().,%^=]+\??$/, reason: 'off-topic:math' },
  {
    pattern: /\bwhat(?:'s| is)?\s+(?:\d[\d\s+\-*/x×÷().,%^]*\d)\b|\b(?:calculate|compute)\b[^.?!]{0,20}\d/i,
    reason: 'off-topic:math',
  },
  {
    pattern:
      /\b(capital of|president of|prime minister of|who won|weather|temperature in|stock price|bitcoin|cricket score|ipl|movie|recipe|joke|poem|song lyrics|horoscope|translate\b)/i,
    reason: 'off-topic:general',
  },
];

const COMPETITOR =
  /\b(niit|aptech|arena animation|edureka|simplilearn|coursera|udemy|byju'?s|upgrad|great learning|scaler|coding ninjas)\b/i;

const GUARANTEE =
  /\b(100\s*%|hundred percent|guarantee[ds]?|assured|sure(?:ly)?)\b[^.?!]{0,40}\b(job|placement|package|salary|lpa|lakh)\b|\b(job|placement)\b[^.?!]{0,30}\b(guarantee[ds]?|assured)\b/i;

const followUps = [
  { label: '🎓 Explore courses', query: 'What courses does Jetking offer?' },
  { label: '💰 Fees & EMI', query: 'What are the course fees and EMI options?' },
  { label: '💼 Placements', query: 'Tell me about Jetking placements and recruiters' },
  { label: '📍 Nearest centre', query: 'Where is my nearest Jetking centre?' },
];
export const GUARD_FOLLOW_UPS = followUps;

function normalize(s: string): string {
  return s.replace(/\s+/g, ' ').trim();
}

export function guardMessage(input: string): GuardResult {
  const message = normalize(input);

  const talk = smallTalk(message);
  if (talk) return { kind: 'reply', text: talk.text, reason: 'small-talk' };

  if (INJECTION.test(message) || DAN_MODE.test(message) || CREDENTIALS.test(message)) {
    return {
      kind: 'reply',
      reason: 'blocked:injection',
      text: `I can't share internal instructions, credentials or anything behind the scenes — and I can't change how I work. ${HELP} What would you like to know?`,
    };
  }

  // Retrieval is English/Roman-script only; a Devanagari or other non-Latin
  // question would otherwise match an unrelated passage on stray tokens.
  const letters = message.match(/\p{L}/gu) ?? [];
  const nonLatin = message.match(/(?!\p{Script=Latin})\p{L}/gu) ?? [];
  if (letters.length >= 3 && nonLatin.length / letters.length > 0.4) {
    return {
      kind: 'reply',
      reason: 'non-latin-script',
      text: 'Namaste! Abhi main English ya Hinglish (Roman letters mein Hindi) mein sabse achha jawab de pata hoon. Kripya apna sawaal isi tarah likhiye — jaise "Cyber Security course ki fees kitni hai?" — aur main turant madad karunga. (I can currently answer best in English or Hinglish — please type your question that way.)',
    };
  }

  // "hello, who are you?" / "hi what courses do you have" — drop the greeting.
  let rest = message;
  const greet = message.match(GREETING_PREFIX);
  if (greet && greet[0].length < message.length) rest = message.slice(greet[0].length).trim();
  if (rest !== message) {
    const again = smallTalk(rest);
    if (again) return { kind: 'reply', text: again.text, reason: 'small-talk' };
  }

  if (ABUSE.test(rest)) {
    return {
      kind: 'reply',
      reason: 'abuse',
      text: `Sorry I wasn't helpful there — I'm happy to try again. ${HELP} Tell me what you're looking for and I'll do my best.`,
    };
  }

  for (const { pattern, reason } of OFF_TOPIC) {
    if (pattern.test(rest)) {
      return {
        kind: 'reply',
        reason,
        text: `That's outside what I can help with — I'm focused on Jetking career guidance. ${HELP} Is there something along those lines I can help you with?`,
      };
    }
  }

  if (GUARANTEE.test(rest)) {
    return {
      kind: 'reply',
      reason: 'guarantee',
      text: "I can't promise a specific job or salary — and it wouldn't be honest for anyone to. Jetking provides placement support: resume preparation, mock interviews and introductions to hiring partners, but outcomes depend on the course, the centre, the local job market and your own effort. A Jetking counsellor can share recent placement records for the course you're considering.",
    };
  }

  if (COMPETITOR.test(rest)) {
    return {
      kind: 'reply',
      reason: 'competitor',
      text: "I can only speak about Jetking, so I can't make a fair comparison with other institutes. What I can do is show you what Jetking offers — the syllabus, labs, certifications and placement support — so you can compare on the things that matter to you. Which course are you looking at?",
    };
  }

  return { kind: 'continue', message: rest };
}
