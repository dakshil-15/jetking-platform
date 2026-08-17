import { evaluateBehaviour, evaluateFirstTouch } from './rules';
import { resolveAcquisitionChannel, type AcquisitionChannel } from './channel';
import {
  CONFIDENCE_THRESHOLD,
  PERSONA_IDS,
  RULES_VERSION,
  type BehaviourInput,
  type Classification,
  type FirstTouchInput,
  type KnownPersonaId,
  type SignalHit,
} from './types';

/**
 * Pure classification. No I/O, no side effects, no clock beyond the injected one —
 * so it runs identically at the edge, on the server, on the client, and in tests.
 */

function combine(weights: number[]): number {
  let inverse = 1;
  for (const w of weights) {
    inverse *= 1 - Math.max(0, Math.min(1, w));
  }
  return 1 - inverse;
}

export interface ClassifyInput {
  firstTouch?: FirstTouchInput;
  behaviour?: BehaviourInput;
  /** Signals carried over from a previous visit, already evaluated. */
  priorSignals?: SignalHit[];
  /** Acquisition channel from a previous visit (cookie). */
  priorChannel?: AcquisitionChannel;
  now?: Date;
}

function buildResult(
  partial: Omit<Classification, 'acquisitionChannel'>,
  channel: AcquisitionChannel | undefined,
): Classification {
  return { ...partial, acquisitionChannel: channel };
}

export function classify(input: ClassifyInput): Classification {
  const signals: SignalHit[] = [
    ...(input.priorSignals ?? []),
    ...(input.firstTouch ? evaluateFirstTouch(input.firstTouch) : []),
    ...(input.behaviour ? evaluateBehaviour(input.behaviour) : []),
  ];

  const strongestById = new Map<string, SignalHit>();
  for (const hit of signals) {
    const existing = strongestById.get(hit.id);
    if (!existing || hit.weight > existing.weight) strongestById.set(hit.id, hit);
  }
  const deduped = [...strongestById.values()];

  const channel: AcquisitionChannel | undefined = input.firstTouch
    ? resolveAcquisitionChannel(input.firstTouch)
    : input.priorChannel;

  const scores = new Map<KnownPersonaId, number[]>();
  for (const persona of PERSONA_IDS) scores.set(persona, []);
  for (const hit of deduped) scores.get(hit.persona)?.push(hit.weight);

  const ranked = PERSONA_IDS.map((persona) => ({
    persona,
    score: combine(scores.get(persona) ?? []),
  })).sort((a, b) => b.score - a.score);

  const top = ranked[0];
  const second = ranked[1];
  const classifiedAt = (input.now ?? new Date()).toISOString();

  if (!top || top.score < CONFIDENCE_THRESHOLD) {
    return buildResult(
      {
        persona: 'unknown',
        confidence: top?.score ?? 0,
        signals: deduped,
        version: RULES_VERSION,
        classifiedAt,
      },
      channel,
    );
  }

  const margin = second ? top.score - second.score : top.score;
  const confidence = second && margin < 0.15 ? top.score * 0.8 : top.score;

  if (confidence < CONFIDENCE_THRESHOLD) {
    return buildResult(
      {
        persona: 'unknown',
        confidence,
        signals: deduped,
        version: RULES_VERSION,
        classifiedAt,
      },
      channel,
    );
  }

  return buildResult(
    {
      persona: top.persona,
      confidence: Number(confidence.toFixed(3)),
      signals: deduped.sort((a, b) => b.weight - a.weight),
      version: RULES_VERSION,
      runnerUp: second && second.score > 0.2 ? second.persona : undefined,
      classifiedAt,
    },
    channel,
  );
}
