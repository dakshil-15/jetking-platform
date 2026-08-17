import { semanticSearch } from '@/features/knowledge/lib/embeddings';
import { serverEnv } from '@/lib/config/env.server';
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
} from '@/features/jetking-ai/resolve-centre-answer';
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
const OLLAMA_URL = serverEnv.ollamaChatUrl;

interface ApiMessage {
  role: 'user' | 'assistant';
  content: string;
}

const GATE_TEXT =
  "I don't have verified information about that in my Jetking knowledge base. I can help with Jetking courses, fees, placements, eligibility, or finding a centre near you — just ask.";

function systemPrompt(context: string, persona: PersonaId): string {
  const framing =
    persona !== 'unknown'
      ? `\nWHO THIS QUESTION SOUNDS LIKE\n${PERSONA_FRAMING[persona]}\n`
      : `\n${QUESTION_ADAPTATION_RULES}\n`;

  return `You are Jetking's AI career assistant — a warm, human career counsellor for Jetking Institute (IT training: hardware & networking, cloud, cyber security, AI & data science).
${framing}
RULES
- Answer using ONLY the CONTEXT below. Do NOT use outside knowledge to state Jetking facts.
- Never invent fees, course names, durations, eligibility, centre addresses, phone numbers, placement figures, salaries, or guarantees. If the CONTEXT lacks it, say you don't have that verified yet and suggest confirming with a Jetking counsellor.
- Answer ONLY the specific thing asked. If they ask about centres, talk only about centres; placements → only placements; fees → only fees. Don't volunteer other topics.
- Adapt tone and emphasis to cues in the question (parent vs student vs working professional vs franchise) — without asking them to pick a path or showing a menu of roles.
- Talk naturally, like a counsellor. Understand Hinglish, typos, and short questions; you may reply in Hinglish if they do. Be concise — lead with the answer, ask a follow-up only if truly needed. Not salesy.
- Format EVERY reply as structured markdown the UI turns into HTML:
  - Start with a ## heading naming the topic (course / fees / placements / centre).
  - Use - bullet lists for modules, benefits, or steps.
  - Use **Label:** value lines for fee, duration, eligibility, payment.
  - Use short paragraphs (2–3 sentences max each). Never one long run-on block.
  - Optional closing note in _italics_ for counsellor handoff.
- When they are ready to act, you may mention talking to a Jetking counsellor — do not push a branded persona CTA label.
- Reply with your final answer only. No internal reasoning or tags.

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

async function askOllama(
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
    if (!response.ok) return null;

    const data = (await response.json()) as { message?: { content?: string; thinking?: string } };
    let text = data.message?.content?.trim() ?? '';
    let thinking = data.message?.thinking?.trim() ?? '';
    const thinkTag = text.match(/<think>([\s\S]*?)<\/think>/i);
    if (thinkTag) {
      thinking = thinkTag[1]!.trim();
      text = text.replace(thinkTag[0], '').trim();
    }

    return text ? { text, thinking: thinking || undefined } : null;
  } catch {
    return null;
  }
}

export async function POST(req: Request): Promise<Response> {
  let body: { messages?: ApiMessage[] };
  try {
    body = (await req.json()) as { messages?: ApiMessage[] };
  } catch {
    return Response.json({ ok: false, reason: 'bad-request' }, { status: 400 });
  }

  const messages = (body.messages ?? []).filter((m) => m?.content?.trim());
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

  const REFERENTIAL_RE =
    /\b(it|its|it's|that|this|these|those|they|them|their|there|same|also|too|another|what about|how about|and|aur|iska|uska|isme|usme|kitni|kitna)\b/i;
  const SUBJECT_RE =
    /\b(cyber|security|cloud|network|networking|hacking|ethical|blockchain|animation|gaming|metaverse|hardware|software|bca|mca|linux|red ?hat|rhcsa|aws|azure|data science|\bai\b|course|courses|diploma|masters|certification|centre|center|placement|blog)\b/i;
  const isFollowUp =
    !!prevUser && (REFERENTIAL_RE.test(lastUser.content) || !SUBJECT_RE.test(lastUser.content));
  const retrievalText = isFollowUp ? `${prevUser.content} ${lastUser.content}` : lastUser.content;

  const q = lastUser.content;
  const LOCATION_RE =
    /\b(cent(re|er)s?|near(est)?|location|address|branch|directions?|visit|where)\b/i;
  const isLocation = LOCATION_RE.test(q) || Boolean(extractCityHint(q));
  const wantFees =
    /\b(fee|fees|cost|price|emi|installment|scholarship|payment|charges?|kitni|kitna)\b/i.test(q);
  const wantEligibility =
    /\b(eligib|entry requirement|who can|who should|qualification|documents?|after (10th|12th|graduation)|10\+2)/i.test(
      q,
    );
  const wantCurriculum =
    /\b(curriculum|syllabus|module|topics?|what.{0,15}(learn|study|cover)|program structure)\b/i.test(
      q,
    );
  const wantPlacement =
    /\b(placement|placed|jobs?|salary|package|recruit|hiring|compan(y|ies)|career|scope)\b/i.test(
      q,
    );
  const wantDuration = /\b(duration|how long|months?|years?|kitne (mahine|saal))\b/i.test(q);
  const wantCourse =
    /\b(course|courses|diploma|masters|learn|training|program|certification|specialization)\b/i.test(
      q,
    );

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
  };
  const step1 = isFollowUp
    ? 'Read it as a follow-up and kept the current topic.'
    : persona !== 'unknown'
      ? `Read the question — sounds like ${personaLabel[persona]}.`
      : 'Read and understood the question.';

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
  const subject = SUBJECT_LABELS.find(([re]) => re.test(retrievalText.toLowerCase()))?.[1] ?? null;
  const answeredFacet = wantFees
    ? 'fees'
    : wantEligibility
      ? 'eligibility'
      : wantCurriculum
        ? 'curriculum'
        : wantDuration
          ? 'duration'
          : wantPlacement
            ? 'placement'
            : isLocation
              ? 'centre'
              : 'course';

  /** Topic follow-ups only — no persona CTA chips. */
  const buildFollowUps = (gated: boolean): { label: string; query: string }[] => {
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

  // Location questions: always answer from structured centre records.
  // Never fall through to SEO embedding blobs (those mash into "Centre…" mush).
  if (isLocation) {
    try {
      const centreText = await resolveCentreAnswer(retrievalText);
      if (centreText) {
        return Response.json({
          ok: true,
          source: 'kb',
          text: structureAnswerText(centreText),
          reasoning: [
            step1,
            `Recognised it as about ${intentLabel}.`,
            'Matched structured centre records in the Jetking knowledge base.',
            'Listed verified branches and programmes — nothing invented.',
          ],
          followUps: buildFollowUps(false),
        });
      }
    } catch {
      // KB index failed to load — tell the user rather than inventing from SEO pages.
    }
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
    });
  }

  let hits: { type: string; text: string }[] = [];
  let size = 0;
  let topScore = 0;
  try {
    const result = await semanticSearch(retrievalText, 12);
    size = result.size;
    topScore = result.topScore;
    if (result.topScore < GATE) {
      if (serverEnv.allowGeneralAnswers) {
        const generalReply = await askOllama(generalSystemPrompt(persona), messages, 0.45);
        if (generalReply) {
          return Response.json({
            ok: true,
            source: 'llm',
            scope: 'general',
            text: structureAnswerText(generalReply.text),
            reasoning: [
              step1,
              `Searched ${size.toLocaleString()} items in the local Jetking knowledge base.`,
              `No verified Jetking match cleared the ${Math.round(GATE * 100)}% confidence bar.`,
              'Answered with the local general model without treating the reply as a verified Jetking fact.',
            ],
            followUps: [],
          });
        }
      }
      return Response.json({
        ok: true,
        gated: true,
        text: GATE_TEXT,
        reasoning: [
          step1,
          `Looked for ${intentLabel}.`,
          `Searched ${size.toLocaleString()} items in the local Jetking knowledge base.`,
          `Best match was only ${Math.round(topScore * 100)}% relevant — below my confidence bar.`,
          'Decided not to answer rather than guess.',
        ],
        followUps: buildFollowUps(true),
      });
    }
    // Never lead non-location answers with centre SEO pages.
    const nonCentre = result.hits.filter((h) => h.type !== 'centre');
    const pool = nonCentre.length === 0 ? result.hits : nonCentre;
    const weight = (t: string) => {
      if (t === 'centre') return 0;
      if (t === 'home') return -0.1;
      let w = 0;
      if (wantFees) w += t === 'fees' ? 0.14 : t === 'overview' || t === 'course' ? 0.05 : 0;
      if (wantEligibility) w += t === 'eligibility' ? 0.14 : 0;
      if (wantCurriculum) w += t === 'curriculum' ? 0.13 : t === 'course' ? 0.05 : 0;
      if (wantPlacement) w += t === 'placement' ? 0.13 : t === 'info' || t === 'blog' ? 0.05 : 0;
      if (wantDuration) w += t === 'duration' ? 0.14 : 0;
      if (wantCourse) w += t === 'course' || t === 'overview' || t === 'curriculum' ? 0.05 : 0;
      return w;
    };
    hits = pool
      .map((h) => ({ h, adj: h.score + weight(h.type) }))
      .sort((a, b) => b.adj - a.adj)
      .map(({ h }) => ({ type: h.type, text: h.text }));
  } catch {
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
    const preciseFacet = wantFees || wantEligibility || wantDuration || wantCurriculum;
    const structured = structureAnswerText(formatPassagesAnswer(hits, preciseFacet ? 1 : 2));
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
    });
  };

  const reply = await askOllama(systemPrompt(context, persona), messages, 0.3);
  if (!reply) return passagesAnswer();

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
  });
}
