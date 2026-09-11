/**
 * Regression baseline for /api/chat's deterministic mechanism — session state
 * (session.ts), conversation-aware retrieval (retrieval-query.ts), intent
 * detection (intent.ts), real retrieval ranking (embeddings.ts, rank-hits.ts),
 * the deterministic KB-fallback text route.ts itself falls back to
 * (format-passage.ts + structure-answer.ts), and the grounding guard
 * (grounding.ts).
 *
 * Deliberately makes NO Ollama/LLM call — everything here is deterministic
 * given the committed embeddings index, so results are stable across runs
 * and don't need a model running locally. It does not test what the LLM
 * would actually say on a given turn; only the mechanism that constrains it.
 *
 *   node --conditions=react-server --import ./scripts/register-alias.mjs scripts/eval-conversations.mts             # check
 *   node --conditions=react-server --import ./scripts/register-alias.mjs scripts/eval-conversations.mts --preview   # print actual values, assert nothing (use while authoring cases)
 *   node --conditions=react-server --import ./scripts/register-alias.mjs scripts/eval-conversations.mts --preview <id>  # preview just one case
 */
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { formatPassagesAnswer } from '@/features/jetking-ai/format-passage';
import { unsupportedSensitiveClaims } from '@/features/jetking-ai/grounding';
import {
  detectAnsweredFacet,
  detectSubject,
  detectWants,
  isFollowUpMessage,
  isLocationFollowUp,
  isLocationMessage,
  type WantFlags,
} from '@/features/jetking-ai/intent';
import { needsPlanner } from '@/features/jetking-ai/planner';
import { inferPersonaFromQuestion } from '@/features/jetking-ai/persona';
import { passagesMax, rankHits } from '@/features/jetking-ai/rank-hits';
import { extractCityHint } from '@/features/jetking-ai/city';
import { resolveCentreAnswer } from '@/features/jetking-ai/resolve-centre-answer';
import { buildRetrievalQuery } from '@/features/jetking-ai/retrieval-query';
import { EMPTY_SESSION, updateSession, type CounsellingSession } from '@/features/jetking-ai/session';
import { structureAnswerText } from '@/features/jetking-ai/structure-answer';
import { semanticSearch } from '@/features/knowledge/lib/embeddings';
import { serverEnv } from '@/lib/config/env.server';

const HERE = dirname(fileURLToPath(import.meta.url));
const CASES_PATH = resolve(HERE, 'fixtures/conversation-eval.json');
const GATE = serverEnv.answerGate;

interface Expect {
  isFollowUp?: boolean;
  subject?: string | null;
  cityHint?: string | null;
  isLocation?: boolean;
  facet?: string;
  /** Deterministic-only: does planner.ts's gate fire? Never invokes the LLM planner itself. */
  needsPlanner?: boolean;
  retrievalQueryContains?: string[];
  session?: Partial<CounsellingSession>;
  shouldGround?: boolean;
  kbAnswerContains?: string[];
  kbAnswerNotContains?: string[];
  /** A synthetic bad-claim string; expect grounding.ts to flag it against this case's real retrieved context. */
  unsupportedClaimProbe?: string;
}

interface ConversationCase {
  id: string;
  category: string;
  turns: string[];
  expect?: Expect;
}

interface LastTurnResult {
  message: string;
  isFollowUp: boolean;
  retrievalQuery: string;
  subject: string | null;
  cityHint: string | null;
  isLocation: boolean;
  answeredFacet: string;
  wants: WantFlags;
  needsPlanner: boolean;
}

interface CaseActual {
  id: string;
  category: string;
  lastTurn: LastTurnResult;
  finalSession: CounsellingSession;
  shouldGround: boolean;
  topScore?: number;
  kbAnswer: string;
  unsupportedClaims?: string[];
}

/** Mirrors route.ts's `present()` — used only when formatPassagesAnswer comes back empty. */
function present(hit?: { type: string; text: string }): { title: string; body: string } {
  if (!hit) return { title: '', body: '' };
  const nl = hit.text.indexOf('\n');
  if (nl > 0 && nl <= 90) {
    return { title: hit.text.slice(0, nl).trim(), body: hit.text.slice(nl + 1).trim() };
  }
  return { title: '', body: hit.text.trim() };
}

/** Replays a conversation through the real mechanism, then evaluates the last turn only (matching how `expect` is scoped). */
async function runCase(kase: ConversationCase): Promise<CaseActual> {
  let session: CounsellingSession | undefined;
  let prevUserMessage: string | undefined;
  let lastTurn: LastTurnResult | undefined;

  for (const message of kase.turns) {
    const isFollowUp = isFollowUpMessage(message, prevUserMessage !== undefined);
    const incoming = session ?? EMPTY_SESSION;
    const retrievalQuery = buildRetrievalQuery({ message, isFollowUp, prevUserMessage, session: incoming });

    const cityHint = extractCityHint(message);
    const wants = detectWants(message);
    const hasExplicitFacet =
      wants.wantFees ||
      wants.wantEligibility ||
      wants.wantCurriculum ||
      wants.wantPlacement ||
      wants.wantDuration ||
      wants.wantCourse ||
      wants.wantAbout;
    // Narrower than hasExplicitFacet — excludes wantCourse on purpose, see
    // isLocationMessage's doc comment for why. Mirrors route.ts.
    const hasStrongFacet =
      wants.wantFees ||
      wants.wantEligibility ||
      wants.wantCurriculum ||
      wants.wantPlacement ||
      wants.wantDuration ||
      wants.wantAbout;
    // Mirrors route.ts's isLocation computation — see isLocationFollowUp's
    // own doc comment for why a session-only continuation check exists.
    const isLocation =
      isLocationMessage(message, Boolean(cityHint), hasStrongFacet) ||
      isLocationFollowUp({
        isFollowUp,
        lastFacet: incoming.lastFacet,
        message,
        hasExplicitFacet,
      });
    const subject = detectSubject(retrievalQuery);
    const answeredFacet = detectAnsweredFacet(wants, isLocation);
    const persona = inferPersonaFromQuestion(message, prevUserMessage)?.persona ?? 'unknown';

    session = updateSession(incoming, { persona, subject, cityHint, answeredFacet });
    lastTurn = {
      message,
      isFollowUp,
      retrievalQuery,
      subject,
      cityHint,
      isLocation,
      answeredFacet,
      wants,
      needsPlanner: needsPlanner({ subject, wants, isLocation, message }),
    };
    prevUserMessage = message;
  }

  if (!lastTurn) throw new Error(`${kase.id}: no turns`);
  const finalSession = session ?? EMPTY_SESSION;

  if (lastTurn.isLocation) {
    const centreText = await resolveCentreAnswer(lastTurn.retrievalQuery);
    return {
      id: kase.id,
      category: kase.category,
      lastTurn,
      finalSession,
      shouldGround: centreText !== null,
      kbAnswer: centreText ? structureAnswerText(centreText) : '',
    };
  }

  const result = await semanticSearch(lastTurn.retrievalQuery, 16); // must match route.ts's topK
  const grounded = result.topScore >= GATE;
  if (!grounded) {
    return { id: kase.id, category: kase.category, lastTurn, finalSession, shouldGround: false, topScore: result.topScore, kbAnswer: '' };
  }

  const hits = rankHits(result.hits, lastTurn.wants);
  const contextHits = hits.slice(0, 6);
  const context = contextHits.map((h) => `[${h.type}] ${h.text}`).join('\n');
  const structured = structureAnswerText(formatPassagesAnswer(hits, passagesMax(lastTurn.wants)));
  const top = present(hits[0]);
  const kbAnswer = structured || structureAnswerText(top.body, top.title) || '';

  return {
    id: kase.id,
    category: kase.category,
    lastTurn,
    finalSession,
    shouldGround: true,
    topScore: result.topScore,
    kbAnswer,
    unsupportedClaims: unsupportedSensitiveClaims(kase.expect?.unsupportedClaimProbe ?? '', context),
  };
}

function containsText(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

/** Returns failure messages for this case; empty array = pass. */
function checkCase(kase: ConversationCase, actual: CaseActual): string[] {
  const e = kase.expect;
  if (!e) return [];
  const fails: string[] = [];

  if (e.isFollowUp !== undefined && actual.lastTurn.isFollowUp !== e.isFollowUp)
    fails.push(`isFollowUp: expected ${e.isFollowUp}, got ${actual.lastTurn.isFollowUp}`);
  if (e.subject !== undefined && actual.lastTurn.subject !== e.subject)
    fails.push(`subject: expected ${JSON.stringify(e.subject)}, got ${JSON.stringify(actual.lastTurn.subject)}`);
  if (e.cityHint !== undefined && actual.lastTurn.cityHint !== e.cityHint)
    fails.push(`cityHint: expected ${JSON.stringify(e.cityHint)}, got ${JSON.stringify(actual.lastTurn.cityHint)}`);
  if (e.isLocation !== undefined && actual.lastTurn.isLocation !== e.isLocation)
    fails.push(`isLocation: expected ${e.isLocation}, got ${actual.lastTurn.isLocation}`);
  if (e.facet !== undefined && actual.lastTurn.answeredFacet !== e.facet)
    fails.push(`facet: expected ${e.facet}, got ${actual.lastTurn.answeredFacet}`);
  if (e.needsPlanner !== undefined && actual.lastTurn.needsPlanner !== e.needsPlanner)
    fails.push(`needsPlanner: expected ${e.needsPlanner}, got ${actual.lastTurn.needsPlanner}`);

  if (e.retrievalQueryContains) {
    for (const term of e.retrievalQueryContains) {
      if (!containsText(actual.lastTurn.retrievalQuery, term)) {
        fails.push(`retrievalQuery missing "${term}": got "${actual.lastTurn.retrievalQuery}"`);
      }
    }
  }

  if (e.session) {
    for (const [key, expected] of Object.entries(e.session)) {
      const got = (actual.finalSession as unknown as Record<string, unknown>)[key];
      if (JSON.stringify(got) !== JSON.stringify(expected)) {
        fails.push(`session.${key}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(got)}`);
      }
    }
  }

  if (e.shouldGround !== undefined && actual.shouldGround !== e.shouldGround) {
    fails.push(
      `shouldGround: expected ${e.shouldGround}, got ${actual.shouldGround}` +
        (actual.topScore !== undefined ? ` (topScore=${actual.topScore.toFixed(3)}, GATE=${GATE})` : ''),
    );
  }

  if (e.kbAnswerContains) {
    for (const term of e.kbAnswerContains) {
      if (!containsText(actual.kbAnswer, term)) {
        fails.push(`kbAnswer missing "${term}"`);
      }
    }
  }
  if (e.kbAnswerNotContains) {
    for (const term of e.kbAnswerNotContains) {
      if (containsText(actual.kbAnswer, term)) {
        fails.push(`kbAnswer unexpectedly contains "${term}"`);
      }
    }
  }

  if (e.unsupportedClaimProbe !== undefined) {
    const flagged = (actual.unsupportedClaims ?? []).length > 0;
    if (!flagged) {
      fails.push(`unsupportedClaimProbe "${e.unsupportedClaimProbe}" was NOT flagged by grounding.ts`);
    }
  }

  return fails;
}

const cases = JSON.parse(await readFile(CASES_PATH, 'utf8')) as ConversationCase[];

const previewFlagIndex = process.argv.indexOf('--preview');
if (previewFlagIndex !== -1) {
  const onlyId = process.argv[previewFlagIndex + 1];
  const targets = onlyId && !onlyId.startsWith('--') ? cases.filter((c) => c.id === onlyId) : cases;
  for (const kase of targets) {
    const actual = await runCase(kase);
    console.log('─'.repeat(78));
    console.log(`${actual.id}  [${actual.category}]`);
    console.log(`  turns: ${JSON.stringify(kase.turns)}`);
    console.log(`  lastTurn: ${JSON.stringify(actual.lastTurn, null, 2).replace(/\n/g, '\n  ')}`);
    console.log(`  finalSession: ${JSON.stringify(actual.finalSession)}`);
    console.log(`  shouldGround: ${actual.shouldGround}${actual.topScore !== undefined ? ` (topScore=${actual.topScore.toFixed(3)})` : ''}`);
    console.log(`  kbAnswer:\n    ${actual.kbAnswer.replace(/\n/g, '\n    ') || '(empty)'}`);
    if (kase.expect?.unsupportedClaimProbe) {
      console.log(`  unsupportedClaims for probe "${kase.expect.unsupportedClaimProbe}": ${JSON.stringify(actual.unsupportedClaims)}`);
    }
  }
  process.exit(0);
}

let failures = 0;
const byCategory = new Map<string, { pass: number; fail: number }>();

for (const kase of cases) {
  const actual = await runCase(kase);
  const fails = checkCase(kase, actual);
  const bucket = byCategory.get(kase.category) ?? { pass: 0, fail: 0 };
  byCategory.set(kase.category, bucket);
  if (fails.length) {
    console.error(`FAIL ${kase.id} [${kase.category}]`);
    for (const f of fails) console.error(`  - ${f}`);
    bucket.fail++;
    failures++;
  } else {
    bucket.pass++;
  }
}

console.log('\nBy category:');
for (const [category, { pass, fail }] of [...byCategory.entries()].sort()) {
  console.log(`  ${category}: ${pass}/${pass + fail}`);
}
console.log(`\n${cases.length - failures}/${cases.length} conversation cases passed.`);
if (failures > 0) process.exit(1);
