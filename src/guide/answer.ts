import { content } from '@/lib/content';
import { serverEnv } from '@/lib/config/env.server';
import type { PersonaId } from '@/persona/types';
import { HANDOFF_COPY, answerFeeQuestion, postCheck, preCheck } from './guardrails';
import { buildSystemPrompt, buildUserTurn } from './prompt';
import { MIN_HYBRID_SCORE, MIN_RETRIEVAL_SCORE, getRetriever } from './retrieve';
import type { GuideOutcome } from './types';

/**
 * Guide orchestration — the full pipeline in one readable function.
 *
 *   preCheck → [fee path] → retrieve → confidence gate → generate → postCheck → answer
 *
 * Generation prefers OpenAI (GUIDE_MODEL) when OPENAI_API_KEY is configured, and
 * otherwise falls back to the same local Ollama model the main /chatbot uses
 * (OLLAMA_MODEL, see src/app/api/chat/route.ts) — so this widget answers with a
 * real generated reply instead of degrading to "here's the most relevant page"
 * just because no OpenAI key is set. Retrieval already had this fallback
 * (getRetriever() in ./retrieve); generation did not, until now.
 *
 * On ungrounded-number / unknown-entity, regenerate once with a violation hint
 * (DEVELOPMENT-PLAN §5.2), then hand off if still unsafe.
 */

export interface AnswerRequest {
  question: string;
  persona: PersonaId;
}

export interface AnswerResult {
  outcome: GuideOutcome;
  diagnostics: {
    retrievedCount: number;
    topScore: number;
    guardrail?: string;
    model?: string;
    regenerated?: boolean;
  };
}

async function matchCourseSlug(question: string): Promise<string | undefined> {
  const courses = await content.listCourses();
  const q = question.toLowerCase();

  let best: { slug: string; score: number } | undefined;
  for (const course of courses) {
    const terms = [course.shortTitle, course.title, course.slug.replace(/-/g, ' ')];
    let score = 0;
    for (const term of terms) {
      const words = term.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
      for (const word of words) if (q.includes(word)) score += 1;
    }
    if (score > 0 && (!best || score > best.score)) best = { slug: course.slug, score };
  }

  return best && best.score >= 2 ? best.slug : undefined;
}

export async function answerQuestion(req: AnswerRequest): Promise<AnswerResult> {
  const { question, persona } = req;

  const pre = preCheck(question);
  if (!pre.allowed) {
    const reason = pre.reason ?? 'out-of-scope';
    return {
      outcome: { kind: 'handoff', reason, text: HANDOFF_COPY[reason] },
      diagnostics: { retrievedCount: 0, topScore: 0, guardrail: `pre:${reason}` },
    };
  }

  if (pre.feeIntent) {
    const courses = await content.listCourses();
    const slug = await matchCourseSlug(question);
    return {
      outcome: answerFeeQuestion(courses, slug),
      diagnostics: { retrievedCount: 0, topScore: 0, guardrail: 'pre:fee-deterministic' },
    };
  }

  const retriever = getRetriever();
  const retrieved = await retriever.retrieve(question, { limit: 5 });
  const topScore = retrieved[0]?.score ?? 0;
  const minScore = retriever.name.includes('hybrid') ? MIN_HYBRID_SCORE : MIN_RETRIEVAL_SCORE;

  if (retrieved.length === 0 || topScore < minScore) {
    return {
      outcome: { kind: 'handoff', reason: 'no-grounding', text: HANDOFF_COPY['no-grounding'] },
      diagnostics: { retrievedCount: retrieved.length, topScore, guardrail: 'retrieval:below-threshold' },
    };
  }

  if (process.env.GUIDE_ENABLED === 'false') {
    const top = retrieved[0];
    if (!top) {
      return {
        outcome: { kind: 'handoff', reason: 'unavailable', text: HANDOFF_COPY.unavailable },
        diagnostics: { retrievedCount: 0, topScore, guardrail: 'model:unavailable' },
      };
    }
    return {
      outcome: {
        kind: 'answer',
        text: `Here is the most relevant page I have on that: **${top.title}**. ${truncate(top.text, 260)}`,
        citations: [{ title: top.title, url: top.url }],
      },
      diagnostics: { retrievedCount: retrieved.length, topScore, guardrail: 'model:degraded-retrieval-only' },
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = apiKey ? (process.env.GUIDE_MODEL ?? 'gpt-4o') : serverEnv.ollamaModel;
  const courses = await content.listCourses();
  const knownTitles = courses.map((c) => c.title);

  let generated: string;
  try {
    generated = await generateReply({
      apiKey,
      model,
      system: buildSystemPrompt(persona),
      user: buildUserTurn(question, retrieved),
    });
  } catch {
    const top = retrieved[0];
    if (!top) {
      return {
        outcome: { kind: 'handoff', reason: 'unavailable', text: HANDOFF_COPY.unavailable },
        diagnostics: { retrievedCount: retrieved.length, topScore, guardrail: 'model:error', model },
      };
    }
    // Both the configured model and (if applicable) the local Ollama fallback
    // are unavailable — degrade to the same retrieval-only answer used when
    // generation is disabled outright, rather than a bare handoff.
    return {
      outcome: {
        kind: 'answer',
        text: `Here is the most relevant page I have on that: **${top.title}**. ${truncate(top.text, 260)}`,
        citations: [{ title: top.title, url: top.url }],
      },
      diagnostics: {
        retrievedCount: retrieved.length,
        topScore,
        guardrail: 'model:degraded-retrieval-only',
        model,
      },
    };
  }

  let post = postCheck(generated, retrieved, knownTitles);
  let regenerated = false;

  if (
    !post.ok &&
    (post.violation === 'ungrounded-number' || post.violation === 'unknown-entity')
  ) {
    regenerated = true;
    try {
      generated = await generateReply({
        apiKey,
        model,
        system: buildSystemPrompt(persona),
        user: [
          buildUserTurn(question, retrieved),
          '',
          'REVISION REQUIRED: Your previous draft failed a safety check',
          `(${post.violation}). Rewrite using ONLY facts present in the context.`,
          'Do not invent course names, durations, fees, or numbers that are not in the context.',
          'If you cannot answer from the context, reply exactly: I do not have that in Jetking published material.',
        ].join('\n'),
      });
      post = postCheck(generated, retrieved, knownTitles);
    } catch {
      return {
        outcome: { kind: 'handoff', reason: 'unavailable', text: HANDOFF_COPY.unavailable },
        diagnostics: {
          retrievedCount: retrieved.length,
          topScore,
          guardrail: 'model:regen-error',
          model,
          regenerated,
        },
      };
    }
  }

  if (!post.ok) {
    const reason = post.reason ?? 'no-grounding';
    return {
      outcome: { kind: 'handoff', reason, text: HANDOFF_COPY[reason] },
      diagnostics: {
        retrievedCount: retrieved.length,
        topScore,
        guardrail: `post:${post.violation ?? 'unknown'}`,
        model,
        regenerated,
      },
    };
  }

  // A long article can retrieve several chunks (one per heading) that all
  // cite the same URL — de-dupe by URL first, or the widget lists (and reacts
  // to) the same link two or three times.
  const seenUrls = new Set<string>();
  const citations: Array<{ title: string; url: string }> = [];
  for (const c of retrieved) {
    if (seenUrls.has(c.url)) continue;
    seenUrls.add(c.url);
    citations.push({ title: c.title, url: c.url });
    if (citations.length === 3) break;
  }
  if (citations.length === 0) {
    return {
      outcome: { kind: 'handoff', reason: 'no-grounding', text: HANDOFF_COPY['no-grounding'] },
      diagnostics: {
        retrievedCount: retrieved.length,
        topScore,
        guardrail: 'post:no-citation',
        model,
        regenerated,
      },
    };
  }

  return {
    outcome: { kind: 'answer', text: generated, citations },
    diagnostics: { retrievedCount: retrieved.length, topScore, model, regenerated },
  };
}

function truncate(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max).trimEnd()}…`;
}

async function callOpenAI(opts: {
  apiKey: string;
  model: string;
  system: string;
  user: string;
}): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${opts.apiKey}`,
      },
      body: JSON.stringify({
        model: opts.model,
        max_tokens: 600,
        temperature: 0.2,
        messages: [
          { role: 'system', content: opts.system },
          { role: 'user', content: opts.user },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`OpenAI API returned ${response.status}`);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error('Empty completion');
    return text;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * OpenAI when `apiKey` is set (the widget's original path); otherwise the same
 * local Ollama model the main /chatbot uses. Throws if the chosen backend
 * fails — callers already handle that by degrading to a retrieval-only answer.
 */
async function generateReply(opts: {
  apiKey: string | undefined;
  model: string;
  system: string;
  user: string;
}): Promise<string> {
  if (opts.apiKey) {
    return callOpenAI({ apiKey: opts.apiKey, model: opts.model, system: opts.system, user: opts.user });
  }
  const text = await callOllama({ model: opts.model, system: opts.system, user: opts.user });
  if (!text) throw new Error('Ollama generation failed');
  return text;
}

async function callOllama(opts: {
  model: string;
  system: string;
  user: string;
}): Promise<string | null> {
  try {
    const response = await fetch(serverEnv.ollamaChatUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      signal: AbortSignal.timeout(serverEnv.ollamaTimeoutMs),
      body: JSON.stringify({
        model: opts.model,
        stream: false,
        options: { temperature: 0.2 },
        messages: [
          { role: 'system', content: opts.system },
          { role: 'user', content: opts.user },
        ],
      }),
    });
    if (!response.ok) return null;

    const data = (await response.json()) as { message?: { content?: string } };
    let text = data.message?.content?.trim() ?? '';
    // Some local models emit a <think> block ahead of the reply — strip it,
    // matching src/app/api/chat/route.ts's askOllama().
    const thinkTag = text.match(/<think>([\s\S]*?)<\/think>/i);
    if (thinkTag) text = text.replace(thinkTag[0], '').trim();
    return text || null;
  } catch {
    return null;
  }
}

