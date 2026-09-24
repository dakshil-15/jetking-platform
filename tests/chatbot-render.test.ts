import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AnswerBody, parseAnswer } from '@/features/jetking-ai/answer-html';
import type { ContentBlock } from '@/features/jetking-ai/answer-schema';

const html = (props: Parameters<typeof AnswerBody>[0]) => renderToStaticMarkup(createElement(AnswerBody, props));

describe('AnswerBody with structured blocks', () => {
  const blocks: ContentBlock[] = [
    { type: 'heading', level: 2, text: 'Fees' },
    { type: 'heading', level: 3, text: 'Sub' },
    { type: 'paragraph', text: 'Plain **bold** and `code`' },
    { type: 'bullet_list', items: ['x', 'y'] },
    { type: 'numbered_list', items: ['1st', '2nd'] },
    { type: 'facts', items: [{ label: 'Duration', value: '6 months' }] },
    { type: 'callout', variant: 'warning', text: 'careful' },
    { type: 'callout', variant: 'info', text: 'fyi' },
    { type: 'callout', variant: 'tip', text: 'psst' },
  ];
  const out = html({ text: 'IGNORED', blocks });

  it('renders semantic elements and ignores text when blocks are present', () => {
    for (const tag of ['<h3', '<h4', '<ul', '<ol', '<dl', '<dt', '<dd', '<aside', '<strong', '<code']) {
      expect(out).toContain(tag);
    }
    expect(out).not.toContain('IGNORED');
  });

  it('uses wired-up Tailwind tokens for callout variants (not the dead info-* ones)', () => {
    expect(out).toContain('bg-signal-50');
    expect(out).toContain('bg-trust-50');
    expect(out).not.toMatch(/info-(50|600)/);
  });

  it('falls back to legacy text parsing when blocks are absent or empty', () => {
    expect(html({ text: '## Hi\n- a\n- b' })).toContain('<ul');
    expect(html({ text: '## Hi\n- a\n- b', blocks: [] })).toContain('<ul');
  });
});

describe('XSS safety', () => {
  const payloads = [
    '<script>alert(1)</script>',
    '<img src=x onerror=alert(1)>',
    '[click](javascript:alert(1))',
    '[click](data:text/html;base64,PHNjcmlwdD4=)',
    '[click](vbscript:x)',
  ];

  for (const payload of payloads) {
    it(`neutralises ${payload}`, () => {
      const blocks: ContentBlock[] = [
        { type: 'heading', level: 2, text: payload },
        { type: 'paragraph', text: payload },
        { type: 'bullet_list', items: [payload] },
        { type: 'facts', items: [{ label: payload, value: payload }] },
        { type: 'callout', variant: 'info', text: payload },
      ];
      const out = html({ text: '', blocks });
      expect(out).not.toMatch(/<script/i);
      expect(out).not.toMatch(/<img/i);
      expect(out).not.toMatch(/href="(javascript|data|vbscript):/i);
    });
  }

  it('still renders safe https links with noopener', () => {
    const out = html({
      text: '',
      blocks: [{ type: 'paragraph', text: '[Jetking](https://www.jetking.com)' }],
    });
    expect(out).toContain('href="https://www.jetking.com"');
    expect(out).toContain('noopener noreferrer');
  });

  it('legacy path is equally safe', () => {
    const out = html({ text: '[x](javascript:alert(1))\n<script>1</script>' });
    expect(out).not.toMatch(/<script|href="javascript/i);
  });
});

describe('legacy parseAnswer', () => {
  it('parses headings, fact rows, lists and notes', () => {
    const kinds = parseAnswer('## T\n- **Branch**: Andheri\n\n- one\n- two\n\n1. a\n2. b\n\n_note_').map((b) => b.kind);
    expect(kinds).toEqual(['h2', 'facts', 'ul', 'ol', 'note']);
  });

  it('keeps "**Label:** value" bullets as bold bullet items (existing behaviour)', () => {
    expect(parseAnswer('- **Course fee:** 5').map((b) => b.kind)).toEqual(['ul']);
  });
});
