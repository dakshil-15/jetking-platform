import { describe, expect, it } from 'vitest';
import {
  blocksToPlainText,
  OLLAMA_ANSWER_FORMAT,
  parseStructuredAnswer,
  STRUCTURED_ANSWER_JSON_SCHEMA,
} from '@/features/jetking-ai/answer-schema';
import { saveConversationSchema } from '@/lib/chatbot/types';
import { unsupportedSensitiveClaims } from '@/features/jetking-ai/grounding';

const ok = {
  blocks: [
    { type: 'heading', level: 2, text: 'Fees' },
    { type: 'paragraph', text: 'Hello **there**' },
    { type: 'bullet_list', items: ['a', 'b'] },
    { type: 'numbered_list', items: ['one', 'two'] },
    { type: 'facts', items: [{ label: 'Duration', value: '6 months' }] },
    { type: 'callout', variant: 'warning', text: 'Confirm with a counsellor' },
  ],
};

describe('parseStructuredAnswer', () => {
  it('accepts every block type', () => {
    expect(parseStructuredAnswer(JSON.stringify(ok))?.length).toBe(6);
  });

  it.each([
    ['not json', 'hello world'],
    ['markdown reply', '## Title\n- a'],
    ['empty blocks', '{"blocks":[]}'],
    ['unknown type', '{"blocks":[{"type":"html","text":"<b>x</b>"}]}'],
    ['bad heading level', '{"blocks":[{"type":"heading","level":1,"text":"x"}]}'],
    ['bad callout variant', '{"blocks":[{"type":"callout","variant":"danger","text":"x"}]}'],
    ['missing field', '{"blocks":[{"type":"paragraph"}]}'],
    ['non-string item', '{"blocks":[{"type":"bullet_list","items":[1]}]}'],
    ['too many blocks', JSON.stringify({ blocks: Array(11).fill({ type: 'paragraph', text: 'x' }) })],
    ['overlong text', JSON.stringify({ blocks: [{ type: 'paragraph', text: 'x'.repeat(601) }] })],
    ['null', 'null'],
    ['array root', '[]'],
  ])('rejects %s (fails closed to null, never throws)', (_name, raw) => {
    expect(parseStructuredAnswer(raw)).toBeNull();
  });

  it('strips unknown keys rather than passing them through', () => {
    const r = parseStructuredAnswer('{"blocks":[{"type":"paragraph","text":"x","onclick":"evil()"}]}');
    expect(r?.[0]).toEqual({ type: 'paragraph', text: 'x' });
  });
});

describe('blocksToPlainText', () => {
  it('flattens all block types without leaking JSON syntax', () => {
    const t = blocksToPlainText(parseStructuredAnswer(JSON.stringify(ok))!);
    expect(t).toContain('## Fees');
    expect(t).toContain('- a');
    expect(t).toContain('2. two');
    expect(t).toContain('Duration: 6 months');
    expect(t).not.toContain('"type"');
  });

  it('keeps the grounding guard working on flattened text', () => {
    const blocks = parseStructuredAnswer(
      JSON.stringify({ blocks: [{ type: 'facts', items: [{ label: 'Fee', value: '₹50,000' }] }] }),
    )!;
    const text = blocksToPlainText(blocks);
    expect(unsupportedSensitiveClaims(text, 'fee is confirmed by counsellor').length).toBeGreaterThan(0);
    expect(unsupportedSensitiveClaims(text, 'Fee ₹50,000')).toEqual([]);
  });
});

describe('OpenAI strict JSON schema shape', () => {
  const keywords = new Set(['type', 'properties', 'required', 'additionalProperties', 'items', 'anyOf', 'enum']);

  function check(node: unknown, path: string) {
    if (Array.isArray(node)) {
      node.forEach((n, i) => check(n, `${path}[${i}]`));
      return;
    }
    if (!node || typeof node !== 'object') return;
    const o = node as Record<string, unknown>;
    if (o.type === 'object') {
      expect(o.additionalProperties, path).toBe(false);
      expect([...(o.required as string[])].sort(), path).toEqual(Object.keys(o.properties as object).sort());
    }
    for (const [k, v] of Object.entries(o)) {
      expect(keywords.has(k), `${path}.${k} is outside the strict-mode subset`).toBe(true);
      if (k === 'properties') {
        for (const [field, sub] of Object.entries(v as object)) check(sub, `${path}.${field}`);
      } else {
        check(v, `${path}.${k}`);
      }
    }
  }

  it('uses only supported keywords and marks every object strict', () => {
    expect(STRUCTURED_ANSWER_JSON_SCHEMA.strict).toBe(true);
    check(STRUCTURED_ANSWER_JSON_SCHEMA.schema, 'schema');
  });

  it('ollama format is the bare schema', () => {
    expect(OLLAMA_ANSWER_FORMAT).toBe(STRUCTURED_ANSWER_JSON_SCHEMA.schema);
  });
});

describe('stored conversation schema', () => {
  const base = (extra: object) => ({
    id: '3f2b8c1e-8a3e-4d2e-9d6b-1c2d3e4f5a6b',
    title: 't',
    messages: [{ id: 'm1', role: 'assistant', kind: 'text', text: 'x', ...extra }],
  });

  it('accepts legacy messages without blocks', () => {
    expect(saveConversationSchema.safeParse(base({})).success).toBe(true);
  });
  it('accepts valid blocks', () => {
    expect(saveConversationSchema.safeParse(base({ blocks: ok.blocks })).success).toBe(true);
  });
  it('rejects forged blocks', () => {
    expect(saveConversationSchema.safeParse(base({ blocks: [{ type: 'html', text: '<x>' }] })).success).toBe(false);
    expect(
      saveConversationSchema.safeParse(base({ blocks: [{ type: 'callout', variant: 'x', text: 'a' }] })).success,
    ).toBe(false);
  });
});
