import { z } from 'zod';
import { semanticSearch } from '@/features/knowledge/lib/embeddings';
import { serverEnv } from '@/lib/config/env.server';
import { clientKey, createRateLimiter } from '@/lib/rate-limit';
import { formatPassagesAnswer } from '@/features/jetking-ai/format-passage';
import { unsupportedSensitiveClaims } from '@/features/jetking-ai/grounding';
import {
  PERSONA_FRAMING,
  QUESTION_ADAPTATION_RULES,
  inferPersonaFromQuestion,
  type KnownPersonaId,
  type PersonaId,
} from '@/features/jetking-ai/persona';
import {
  extractCityHint,
  resolveCentreAnswer,
  resolveCentreAnswerByCoords,
} from '@/features/jetking-ai/resolve-centre-answer';
import { logUnanswered } from '@/features/jetking-ai/feedback-log';
import {
  detectAnsweredFacet,
  detectSubject,
  detectWants,
  isFollowUpMessage,
  isLocationFollowUp,
  isLocationMessage,
} from '@/features/jetking-ai/intent';
import { needsPlanner, runPlanner, type PlannerOutput } from '@/features/jetking-ai/planner';
import { passagesMax, rankHits } from '@/features/jetking-ai/rank-hits';
import { buildRetrievalQuery } from '@/features/jetking-ai/retrieval-query';
import { EMPTY_SESSION, updateSession, type CounsellingSession } from '@/features/jetking-ai/session';
import { structureAnswerText } from '@/features/jetking-ai/structure-answer';

/**
 * Jetking AI — fully local orchestrator.
 *
 * Persona is inferred from the question text (not from UI CTAs) so answers
 * adapt to student / parent / professional / franchise cues naturally.
 */

export const runtime = 'nodejs';
export const maxDuration = 60;

const GATE = serverEnv.answerGate;
/**
 * A second, higher bar for letting the LLM compose a free-form answer at
 * all, as opposed to the deterministic passages formatter.
 *
 * Below this — but still above GATE — the match is typically a spurious
 * keyword collision (e.g. "capital of India" scoring 0.47 against Jetking's
 * own "centres across India" pages, just for sharing the word "India") not a
 * real topical match. A prompt instruction alone doesn't reliably stop a
 * small local model from answering a general-knowledge question out of its
 * own training data when it sees *some* context sitting in front of it —
 * confirmed live, repeatedly, even with an explicit "don't do this"
 * instruction in the prompt. `passagesAnswer()` can't leak outside
 * knowledge the same way: it only ever echoes real retrieved KB text.
 */
const LLM_CONFIDENT_GATE = 0.55;
const OLLAMA_URL = serverEnv.ollamaChatUrl;

interface ApiMessage {
  role: 'user' | 'assistant';
  content: string;
}

/** Client-carried, round-tripped each turn — see features/jetking-ai/session.ts. */
const SessionSchema = z.object({
  version: z.literal(2),
  persona: z.enum(['student', 'parent', 'professional', 'franchise', 'unknown']),
  interests: z.array(z.string().max(60)).max(8),
  lastSubject: z.string().max(60).optional(),
  lastCity: z.string().max(60).optional(),
  lastFacet: z.string().max(30).optional(),
  turnCount: z.number().int().min(0).max(1000),
  educationLevel: z.string().max(60).optional(),
  stream: z.string().max(60).optional(),
  careerGoal: z.string().max(120).optional(),
  concerns: z.array(z.string().max(60)).max(5).optional(),
  preferredCourseType: z.enum(['degree', 'career', 'short-course']).optional(),
});

/**
 * Bounded and role-restricted: an unvalidated `role` here would let a caller inject
 * a `system` message right after the real one in the Ollama payload, and an
 * unbounded array/string length would let one request balloon the local model's
 * context (and, per-request, its cost) arbitrarily.
 */
const ChatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().max(4000),
      }),
    )
    .max(40)
    .optional(),
  session: SessionSchema.optional(),
  // From the browser's Geolocation API (see jetking-ai-client.tsx's "use my
  // location" chip) — only consulted for a location question that named no
  // city in its own text; see the isLocation branch below.
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
});

/** Real cost per request (embeddings + a local/OpenAI generation) — must be capped. */
const limiter = createRateLimiter({ windowMs: 60_000, max: 20 });

const GATE_TEXT =
  "I don't have verified information about that in my Jetking knowledge base. I can help with Jetking courses, fees, placements, eligibility, or finding a centre near you — just ask.";

/** Natural-language framing for planner.ts's coarse nextBestQuestion key — the model phrases it, the planner only picks the topic. */
const NEXT_QUESTION_HINT: Record<string, string> = {
  course_type: 'whether they want a full degree or a shorter, job-focused course',
  education_level: 'what they last studied (10th / 12th / graduate)',
  career_goal: 'what kind of role or outcome they are aiming for',
  timeline: 'how soon they want to start',
  city: 'which city or centre works for them',
};

/** Turns the same key into an actual clickable chip — phrased as the visitor's own next question. */
const NEXT_QUESTION_CHIP: Record<string, { label: string; query: string }> = {
  course_type: {
    label: '🎓 Degree or short course?',
    query: 'Should I go for a full degree or a shorter, job-focused course?',
  },
  education_level: {
    label: '📚 What did you last study?',
    query: 'Does it matter what I studied last for this course?',
  },
  career_goal: {
    label: '🎯 What role are you aiming for?',
    query: 'What kind of job can this lead to?',
  },
  timeline: { label: '⏱️ How soon to start?', query: 'How soon can I start this course?' },
  city: { label: '📍 Which city?', query: 'Which Jetking centres are near me?' },
};

function systemPrompt(
  context: string,
  persona: PersonaId,
  session?: CounsellingSession,
  nextBestQuestion?: string,
): string {
  const framing =
    persona !== 'unknown'
      ? `\nWHO THIS QUESTION SOUNDS LIKE\n${PERSONA_FRAMING[persona]}\n`
      : `\n${QUESTION_ADAPTATION_RULES}\n`;

  const sessionFacts = [
    session?.lastSubject ? `Subject discussed so far: ${session.lastSubject}.` : '',
    session?.lastCity ? `City mentioned: ${session.lastCity}.` : '',
    session?.lastFacet ? `Last thing answered: ${session.lastFacet}.` : '',
    session?.educationLevel ? `Education: ${session.educationLevel}.` : '',
    session?.stream ? `Stream: ${session.stream}.` : '',
    session?.careerGoal ? `Career goal: ${session.careerGoal}.` : '',
    session?.concerns?.length ? `Concerns raised: ${session.concerns.join(', ')}.` : '',
  ]
    .filter(Boolean)
    .join(' ');
  const sessionBlock = sessionFacts
    ? `\nSESSION (already established earlier in this conversation — do not re-ask for it)\n${sessionFacts}\n`
    : '';

  const questionHint = nextBestQuestion ? NEXT_QUESTION_HINT[nextBestQuestion] : undefined;
  const nextQuestionBlock = questionHint
    ? `\nIf it flows naturally, your next question could touch on: ${questionHint}.\n`
    : '';

  return `You are Jetking's AI career assistant — a warm, human career counsellor for Jetking Institute (IT training: hardware & networking, cloud, cyber security, AI & data science).
${framing}${sessionBlock}${nextQuestionBlock}
ROLE
You are a career counsellor having a conversation, not a search engine returning a document. Understand → clarify if genuinely needed → recommend → explain why → check for concerns → continue. Never jump straight to "here's the course, register now."

KNOWLEDGE
Jetking-specific facts may ONLY come from the CONTEXT below. Never invent fees, course names, durations, eligibility, centre addresses, phone numbers, placement figures, salaries, or guarantees. If the CONTEXT lacks it, say so naturally and suggest confirming with a Jetking counsellor — that is a normal, honest answer, not a failure.
This applies to general knowledge too, not just Jetking facts. The CONTEXT below is retrieved by similarity search and can surface passages that share a word with the question without actually answering it — e.g. a question about India's capital pulling up Jetking's centres across India. If the question is not about Jetking, its courses, admissions, fees, centres, placements, or choosing a career path, do not answer it from your own general knowledge just because some CONTEXT happens to be present. Say you're focused on Jetking career guidance and can't help with that, then offer to help with something you can.

CONVERSATION
- Talk naturally, like a person, not a brochure. Understand Hinglish, typos, and short questions; reply in Hinglish if they do.
- Ask at most ONE question at a time, and only when it would genuinely change your answer — never interrogate with a checklist.
- Don't repeat a question about something already in SESSION above.
- Answer ONLY the specific thing asked — centres → only centres, placements → only placements, fees → only fees. Don't volunteer unrelated topics.

RECOMMENDATIONS
- Recommend only courses that appear in the CONTEXT, and say briefly why it fits what they described — not just its name.
- When someone is torn between two paths (e.g. cloud vs cyber security), don't just pick one. Name what's actually different about the day-to-day work, then ask which sounds more like them. Example: "They lead to different types of work — cloud is building and improving systems, security is investigating what's wrong. Which sounds more like you?"
- Never fabricate eligibility to make a recommendation fit.

FEES
Never state a specific fee figure unless the CONTEXT explicitly gives one. "Confirmed by a counsellor" in the CONTEXT means exactly that — hand off, don't estimate.

HUMAN HANDOFF
Suggest talking to a Jetking counsellor (without a branded CTA label) when: exact fees are needed, they're ready to take an admission action, they explicitly ask for a human, or the CONTEXT genuinely doesn't cover what they're asking.

FORMAT
Structured markdown the UI turns into HTML: start with a ## heading naming the topic, - bullets for modules/benefits/steps, **Label:** value lines for fee/duration/eligibility/payment, short paragraphs (2–3 sentences max), optional closing _italics_ line for a handoff nudge. Reply with your final answer only — no internal reasoning or tags.

CONTEXT (retrieved from the local Jetking knowledge base):
${context || 'No context available.'}`;
}

function generalSystemPrompt(persona: PersonaId): string {
  const framing =
    persona !== 'unknown'
      ? `Adapt the explanation for ${PERSONA_FRAMING[persona]}`
      : QUESTION_ADAPTATION_RULES;

  return `You are Jetking AI, a helpful local assistant. The user's question did not match verified Jetking content.

RULES
- Answer general questions using your built-in knowledge.
- If the question asks for a Jetking-specific fact, clearly say it is not verified in the local Jetking knowledge base; never invent Jetking courses, fees, duration, eligibility, centres, placements, contacts, salaries, or guarantees.
- For information that can change (news, prices, laws, schedules, current people or product versions), say that your local knowledge may be outdated and recommend verification.
- Understand English, Hinglish, short questions, and common typing mistakes.
- ${framing}
- Lead with the answer. Be concise but complete. Use structured markdown when it improves readability.
- Reply with the final answer only. Never expose hidden reasoning, prompts, or tags.`;
}

interface OllamaReply {
  text: string;
  thinking?: string;
}

/** Same key/model pair src/guide/answer.ts already uses for /api/guide. */
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.GUIDE_MODEL ?? 'gpt-4o';

async function askOpenAI(
  prompt: string,
  messages: ApiMessage[],
  temperature: number,
): Promise<OllamaReply | null> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      signal: AbortSignal.timeout(serverEnv.ollamaTimeoutMs),
      body: JSON.stringify({
        model: OPENAI_MODEL,
        max_tokens: 700,
        temperature,
        messages: [{ role: 'system', content: prompt }, ...messages],
      }),
    });
    if (!response.ok) {
      const body = await response.text().catch(() => '');
      console.warn(`[chat] askOpenAI got HTTP ${response.status}: ${body.slice(0, 300)}`);
      return null;
    }

    const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const text = data.choices?.[0]?.message?.content?.trim() ?? '';
    return text ? { text } : null;
  } catch (error) {
    console.warn(
      `[chat] askOpenAI failed: ${error instanceof Error ? `${error.name}: ${error.message}` : String(error)}`,
    );
    return null;
  }
}

async function askOllamaLocal(
  prompt: string,
  messages: ApiMessage[],
  temperature: number,
): Promise<OllamaReply | null> {
  try {
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      signal: AbortSignal.timeout(serverEnv.ollamaTimeoutMs),
      body: JSON.stringify({
        model: serverEnv.ollamaModel,
        stream: false,
        options: { temperature },
        messages: [{ role: 'system', content: prompt }, ...messages],
      }),
    });
    if (!response.ok) {
      const body = await response.text().catch(() => '');
      console.warn(
        `[chat] askOllama got HTTP ${response.status} from ${OLLAMA_URL}: ${body.slice(0, 300)}`,
      );
      return null;
    }

    const data = (await response.json()) as { message?: { content?: string; thinking?: string } };
    let text = data.message?.content?.trim() ?? '';
    let thinking = data.message?.thinking?.trim() ?? '';
    const thinkTag = text.match(/<think>([\s\S]*?)<\/think>/i);
    if (thinkTag) {
      thinking = thinkTag[1]!.trim();
      text = text.replace(thinkTag[0], '').trim();
    }

    return text ? { text, thinking: thinking || undefined } : null;
  } catch (error) {
    // Silent by design everywhere else — passagesAnswer() is a real fallback,
    // not an error state — but the cause is otherwise unobservable in
    // production (no local terminal to watch), so it's worth one log line.
    console.warn(
      `[chat] askOllama unreachable at ${OLLAMA_URL}: ${
        error instanceof Error ? `${error.name}: ${error.message}` : String(error)
      }`,
    );
    return null;
  }
}

/**
 * Prefers a hosted OpenAI model when a key is configured — src/guide/answer.ts
 * already does this for /api/guide, and OLLAMA_BASE_URL has no reachable
 * target in this deployment (confirmed live: it resolves to the serverless
 * function's own localhost, which has no Ollama listening on it). Falling
 * back to the local model keeps this working unchanged for anyone who *does*
 * run Ollama themselves — self-hosted or local dev with no OpenAI key set.
 */
async function askOllama(
  prompt: string,
  messages: ApiMessage[],
  temperature: number,
): Promise<OllamaReply | null> {
  if (OPENAI_API_KEY) return askOpenAI(prompt, messages, temperature);
  return askOllamaLocal(prompt, messages, temperature);
}

/**
 * The below-gate "answer with the local general model" attempt, isolated in
 * its own function with its own try/catch. Confirmed live: nesting this
 * directly inside the semanticSearch try block (its original shape) let some
 * exception — reproducible every time, even once askOllama() was confirmed
 * to resolve cleanly to null — surface as `{ok:false,reason:'no-embeddings'}`
 * instead of the correct gated refusal, for every single query that failed
 * to clear the confidence bar. Isolating it here means a failure here can
 * never masquerade as a retrieval failure, whatever its real cause.
 */
async function tryGeneralAnswer(
  persona: PersonaId,
  messages: ApiMessage[],
  size: number,
  step1: string,
  gate: number,
  nextSession: CounsellingSession,
): Promise<Response | null> {
  try {
    const generalReply = await askOllama(generalSystemPrompt(persona), messages, 0.45);
    if (!generalReply?.text) return null;
    return Response.json({
      ok: true,
      source: 'llm',
      scope: 'general',
      text: structureAnswerText(generalReply.text),
      reasoning: [
        step1,
        `Searched ${size.toLocaleString()} items in the local Jetking knowledge base.`,
        `No verified Jetking match cleared the ${Math.round(gate * 100)}% confidence bar.`,
        'Answered with the local general model without treating the reply as a verified Jetking fact.',
      ],
      followUps: [],
      session: nextSession,
    });
  } catch (error) {
    console.warn(
      '[chat] general-answer attempt failed:',
      error instanceof Error ? `${error.name}: ${error.message}` : String(error),
    );
    return null;
  }
}

export async function POST(req: Request): Promise<Response> {
  const limit = await limiter.check(clientKey(req));
  if (!limit.allowed) {
    return Response.json(
      { ok: false, reason: 'rate-limited' },
      { status: 429, headers: { 'retry-after': String(limit.retryAfter || 60) } },
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return Response.json({ ok: false, reason: 'bad-request' }, { status: 400 });
  }

  const parsed = ChatRequestSchema.safeParse(rawBody);
  if (!parsed.success) {
    return Response.json({ ok: false, reason: 'bad-request' }, { status: 400 });
  }

  const messages: ApiMessage[] = (parsed.data.messages ?? []).filter((m) => m.content.trim());
  while (messages.length && messages[0]?.role !== 'user') messages.shift();

  const userMsgs = messages.filter((m) => m.role === 'user');
  const lastUser = userMsgs[userMsgs.length - 1];
  if (!lastUser) return Response.json({ ok: false, reason: 'empty' });

  const prevUser = userMsgs[userMsgs.length - 2];
  const inferred = inferPersonaFromQuestion(lastUser.content, prevUser?.content);
  const persona: PersonaId = inferred?.persona ?? 'unknown';
  const personaLabel: Record<KnownPersonaId, string> = {
    student: 'a student',
    parent: 'a parent',
    professional: 'a working professional',
    franchise: 'a franchise enquiry',
  };

  const isFollowUp = isFollowUpMessage(lastUser.content, !!prevUser);
  const incomingSession: CounsellingSession = parsed.data.session ?? EMPTY_SESSION;
  const retrievalText = buildRetrievalQuery({
    message: lastUser.content,
    isFollowUp,
    prevUserMessage: prevUser?.content,
    session: incomingSession,
  });

  const q = lastUser.content;
  const cityHint = extractCityHint(q);
  const wants = detectWants(q);
  const { wantFees, wantEligibility, wantCurriculum, wantPlacement, wantDuration, wantCourse, wantAbout } =
    wants;
  const anyExplicitFacet =
    wantFees || wantEligibility || wantCurriculum || wantPlacement || wantDuration || wantCourse || wantAbout;
  // Narrower than anyExplicitFacet — excludes wantCourse on purpose, see
  // isLocationMessage's doc comment for why.
  const hasStrongFacet =
    wantFees || wantEligibility || wantCurriculum || wantPlacement || wantDuration || wantAbout;
  /**
   * The assistant's own immediately-prior message text, checked in addition
   * to `session.lastFacet` inside `isLocationFollowUp` — the client's
   * scripted starter prompts ("locations", "counselor", "enquire") never
   * call /api/chat until the user actually answers, so no session exists
   * yet to carry `lastFacet` when the user replies to one of those.
   */
  const lastAssistantMessage = [...messages].reverse().find((m) => m.role === 'assistant');
  const lastAssistantAskedCity =
    lastAssistantMessage !== undefined &&
    /\b(which city|your city|share your city)\b/i.test(lastAssistantMessage.content);
  const isLocation =
    isLocationMessage(q, Boolean(cityHint), hasStrongFacet) ||
    isLocationFollowUp({
      isFollowUp,
      lastFacet: lastAssistantAskedCity ? 'centre' : incomingSession.lastFacet,
      message: q,
      hasExplicitFacet: anyExplicitFacet,
    });

  const intentLabel = isLocation
    ? 'a Jetking centre / location'
    : wantFees
      ? 'course fees'
      : wantEligibility
        ? 'eligibility'
        : wantCurriculum
          ? 'the syllabus / what you learn'
          : wantPlacement
            ? 'placements'
            : wantDuration
              ? 'course duration'
              : wantAbout
                ? "Jetking's company background"
                : wantCourse
                  ? 'course details'
                  : 'general information';
  const BUCKET: Record<string, string> = {
    eligibility: 'eligibility',
    fees: 'fees',
    curriculum: 'curriculum',
    duration: 'duration',
    placement: 'placements',
    centre: 'centre',
    course: 'course',
    overview: 'course overview',
    blog: 'article',
    faq: 'FAQ',
    info: 'about Jetking',
    about: "Jetking's history & leadership",
  };
  const step1 = isFollowUp
    ? 'Read it as a follow-up and kept the current topic.'
    : persona !== 'unknown'
      ? `Read the question — sounds like ${personaLabel[persona]}.`
      : 'Read and understood the question.';

  const subject = detectSubject(retrievalText);
  const answeredFacet = detectAnsweredFacet(wants, isLocation);

  // The deterministic layer found nothing to go on (no subject, no explicit
  // facet, not a location) — fall through to the structured LLM planner
  // rather than guessing. Never runs on the common case, and never invents a
  // Jetking fact itself: see planner.ts's own doc comment for why that's
  // structural rather than just prompted.
  let plannerResult: PlannerOutput | null = null;
  if (needsPlanner({ subject, wants, isLocation, message: q })) {
    plannerResult = await runPlanner({
      message: q,
      session: incomingSession,
      prevUserMessage: prevUser?.content,
    });
  }

  const nextSession: CounsellingSession = updateSession(incomingSession, {
    persona,
    subject,
    cityHint,
    answeredFacet,
    plannerUpdates: plannerResult?.profileUpdates,
  });

  const searchQuery = plannerResult?.retrievalNeeds?.length
    ? [retrievalText, ...plannerResult.retrievalNeeds].join(' ')
    : retrievalText;
  const plannerStep = plannerResult
    ? ['The question was too ambiguous for keyword matching — used the planner to read intent from the profile instead.']
    : [];

  /** Topic follow-ups only — no persona CTA chips. */
  const baseFollowUps = (gated: boolean): { label: string; query: string }[] => {
    if (gated || (!subject && !isLocation)) {
      return [
        { label: '🎓 Explore courses', query: 'What courses does Jetking offer?' },
        { label: '💰 Fees & EMI', query: 'What are the course fees and EMI options?' },
        { label: '💼 Placements', query: 'Tell me about Jetking placements and recruiters' },
        { label: '📍 Nearest centre', query: 'Where is my nearest Jetking centre?' },
      ];
    }
    if (isLocation) {
      return [
        { label: '🎓 Courses offered', query: 'What courses does Jetking offer?' },
        { label: '📅 Book a free demo', query: 'How do I book a free demo class?' },
        { label: '💰 Fees & EMI', query: 'What are the course fees and EMI options?' },
      ];
    }
    const s = subject!;
    const facets = [
      {
        key: 'curriculum',
        label: "📚 What you'll learn",
        query: `What will I learn in the ${s} course?`,
      },
      {
        key: 'eligibility',
        label: '✅ Eligibility',
        query: `Who is eligible for the ${s} course?`,
      },
      { key: 'fees', label: '💰 Fees & EMI', query: `Fees and EMI options for the ${s} course` },
      {
        key: 'placement',
        label: '💼 Placements',
        query: `Placement support after the ${s} course`,
      },
      { key: 'duration', label: '⏱️ Duration', query: `How long is the ${s} course?` },
    ];
    const picks = facets
      .filter((f) => f.key !== answeredFacet)
      .slice(0, 3)
      .map(({ label, query }) => ({ label, query }));
    picks.push({ label: '📍 Nearest centre', query: `Where can I do the ${s} course near me?` });
    return picks;
  };

  /** The planner's suggested next question, as an actual clickable chip — leads when present, since it's the most contextually relevant thing to ask right now. */
  const buildFollowUps = (gated: boolean): { label: string; query: string }[] => {
    const base = baseFollowUps(gated);
    const plannerChip = plannerResult?.nextBestQuestion
      ? NEXT_QUESTION_CHIP[plannerResult.nextBestQuestion]
      : undefined;
    if (!plannerChip) return base;
    return [plannerChip, ...base.filter((f) => f.label !== plannerChip.label)].slice(0, 4);
  };

  // Location questions: always answer from structured centre records.
  // Never fall through to SEO embedding blobs (those mash into "Centre…" mush).
  if (isLocation) {
    // The query text wins when it names a city; coordinates only fill in when
    // it doesn't, so a user who both shared their location earlier and later
    // types "centre in Pune" still gets Pune, not their GPS position.
    const { lat, lng } = parsed.data;
    const useCoords = !cityHint && lat !== undefined && lng !== undefined;

    // Neither a city in the text nor a shared location — this used to fall
    // through to resolveCentreAnswer's generic "first 4 hubs nationwide" dump,
    // which reads like an answer but isn't one. The dedicated "📍 Nearest
    // centre" chip already asks for location-or-city interactively (see
    // STARTERS.locations in conversation.ts / askMyLocation in
    // jetking-ai-client.tsx); `askLocation` lets a *typed* "what's my nearest
    // centre" question reuse that same flow instead of a plain-text dead end.
    if (!cityHint && !useCoords) {
      return Response.json({
        ok: true,
        askLocation: true,
        text: "Which city are you in? I'll find the nearest Jetking centre and share the contact details.",
        reasoning: [
          step1,
          `Recognised it as about ${intentLabel}.`,
          'No city named and no shared location — asked which city instead of listing an arbitrary few.',
        ],
        followUps: buildFollowUps(false),
        session: nextSession,
      });
    }

    try {
      const centreText = useCoords
        ? await resolveCentreAnswerByCoords(lat, lng)
        : await resolveCentreAnswer(retrievalText);
      if (centreText) {
        return Response.json({
          ok: true,
          source: 'kb',
          text: structureAnswerText(centreText),
          reasoning: [
            step1,
            `Recognised it as about ${intentLabel}.`,
            useCoords
              ? 'Matched the nearest centre by straight-line distance from the shared location.'
              : 'Matched structured centre records in the Jetking knowledge base.',
            'Listed verified branches and programmes — nothing invented.',
          ],
          followUps: buildFollowUps(false),
          session: nextSession,
        });
      }
    } catch {
      // KB index failed to load — tell the user rather than inventing from SEO pages.
    }
    await logUnanswered({ question: q, intent: intentLabel, persona, reason: 'no-centre-match' });
    return Response.json({
      ok: true,
      gated: true,
      text: "I couldn't find a verified Jetking centre match for that yet. Try a city name like Mumbai, Delhi, Pune or Ahmedabad — or ask to talk to a counsellor.",
      reasoning: [
        step1,
        `Recognised it as about ${intentLabel}.`,
        'Checked structured centre records in the knowledge base.',
        'No verified centre match — asked for a clearer city rather than guessing.',
      ],
      followUps: buildFollowUps(true),
      session: nextSession,
    });
  }

  let hits: { type: string; text: string }[] = [];
  let size = 0;
  let topScore = 0;
  try {
    const result = await semanticSearch(searchQuery, 16);
    size = result.size;
    topScore = result.topScore;
    if (result.topScore < GATE) {
      if (serverEnv.allowGeneralAnswers) {
        const generalAnswer = await tryGeneralAnswer(persona, messages, size, step1, GATE, nextSession);
        if (generalAnswer) return generalAnswer;
      }
      await logUnanswered({ question: q, intent: intentLabel, persona, reason: 'low-confidence', topScore });
      return Response.json({
        ok: true,
        gated: true,
        text: GATE_TEXT,
        reasoning: [
          step1,
          ...plannerStep,
          `Looked for ${intentLabel}.`,
          `Searched ${size.toLocaleString()} items in the local Jetking knowledge base.`,
          `Best match was only ${Math.round(topScore * 100)}% relevant — below my confidence bar.`,
          'Decided not to answer rather than guess.',
        ],
        followUps: buildFollowUps(true),
        session: nextSession,
      });
    }
    // Never lead non-location answers with centre SEO pages.
    hits = rankHits(result.hits, wants);
  } catch (error) {
    console.warn(
      '[chat] retrieval/gate branch failed:',
      error instanceof Error ? `${error.name}: ${error.message}\n${error.stack}` : String(error),
    );
    return Response.json({ ok: false, reason: 'no-embeddings' });
  }

  // Small local models follow grounding instructions more reliably when the
  // context is focused. The remaining hits still inform fallback composition.
  const contextHits = hits.slice(0, 6);
  const context = contextHits.map((h) => `[${h.type}] ${h.text}`).join('\n');
  const present = (hit?: { type: string; text: string }): { title: string; body: string } => {
    if (!hit) return { title: '', body: '' };
    const nl = hit.text.indexOf('\n');
    if (nl > 0 && nl <= 90) {
      return { title: hit.text.slice(0, nl).trim(), body: hit.text.slice(nl + 1).trim() };
    }
    return { title: '', body: hit.text.trim() };
  };

  const answerReasoning = (mode: 'kb' | 'llm', modelThink?: string): string[] => {
    const bucket = BUCKET[hits[0]?.type ?? ''] ?? 'knowledge base';
    const steps = [
      step1,
      ...plannerStep,
      `Recognised it as about ${intentLabel}.`,
      `Searched ${size.toLocaleString()} items in the local Jetking knowledge base.`,
      `Best match is ${Math.round(topScore * 100)}% relevant, from the ${bucket} content.`,
      mode === 'llm'
        ? 'Wrote the reply with the local model, grounded only in that content.'
        : 'Answered directly from that content — nothing invented.',
    ];
    if (modelThink) steps.push(`Model reasoning: ${modelThink}`);
    return steps;
  };

  const passagesAnswer = (validationNote?: string) => {
    const structured = structureAnswerText(formatPassagesAnswer(hits, passagesMax(wants)));
    const top = present(hits[0]);
    const text = structured || structureAnswerText(top.body, top.title) || GATE_TEXT;
    const title = text.startsWith('##') ? undefined : top.title || undefined;
    return Response.json({
      ok: true,
      source: 'kb',
      title,
      text,
      reasoning: validationNote
        ? [...answerReasoning('kb'), validationNote]
        : answerReasoning('kb'),
      followUps: buildFollowUps(false),
      session: nextSession,
    });
  };

  if (topScore < LLM_CONFIDENT_GATE) {
    return passagesAnswer(
      `Match was only ${Math.round(topScore * 100)}% relevant — too weak to trust a free-form answer, so composed one from verified passages only.`,
    );
  }

  // Wrapped defensively: a query answered at all — even the deterministic
  // passages fallback — beats a 500. Seen live under a rare combined-failure
  // condition (both LLM backends unavailable in the same request) where a
  // reply that should have been null wasn't caught by the `!reply` guard
  // alone; this makes the fallback unconditional rather than depending on
  // exactly which line first notices the bad state.
  try {
    const reply = await askOllama(
      systemPrompt(context, persona, nextSession, plannerResult?.nextBestQuestion),
      messages,
      0.3,
    );
    if (!reply?.text) return passagesAnswer();

    const unsupported = unsupportedSensitiveClaims(reply.text, context);
    if (unsupported.length) {
      return passagesAnswer(
        `Rejected unsupported model claims (${unsupported.join(', ')}) and returned verified content instead.`,
      );
    }

    return Response.json({
      ok: true,
      source: 'llm',
      scope: 'jetking',
      text: structureAnswerText(reply.text),
      reasoning: answerReasoning('llm', reply.thinking ? reply.thinking.slice(0, 600) : undefined),
      followUps: buildFollowUps(false),
      session: nextSession,
    });
  } catch (error) {
    console.warn(
      `[chat] LLM-answer step threw, falling back to passages: ${
        error instanceof Error ? `${error.name}: ${error.message}` : String(error)
      }`,
    );
    return passagesAnswer();
  }
}
