/** Smoke-test the configured local Ollama model without starting Next.js. */
const BASE_URL = (process.env.OLLAMA_BASE_URL || 'http://localhost:11434').replace(/\/+$/, '');
const MODEL = process.env.OLLAMA_MODEL || 'jetking-assistant';
const TIMEOUT_MS = Number(process.env.OLLAMA_TIMEOUT_MS || 120_000);

const cases = [
  {
    name: 'general knowledge',
    system: 'Answer the question directly in one sentence.',
    prompt: 'What is the capital of France?',
    mustContain: /paris/i,
  },
  {
    name: 'Jetking grounding',
    system:
      'Use only this verified context for Jetking facts: Jetking offers flexible payment options, but exact course fees must be confirmed by a counsellor.',
    prompt: 'What is the exact fee for a Jetking course?',
    mustContain: /confirm|counsellor|not.*exact|exact.*not/i,
  },
  {
    name: 'Hinglish',
    system: 'Reply briefly and naturally. Understand Hinglish.',
    prompt: 'Cloud computing simple words mein kya hota hai?',
    mustContain: /internet|online|server|cloud/i,
  },
];

let passed = 0;
for (const test of cases) {
  try {
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      body: JSON.stringify({
        model: MODEL,
        stream: false,
        options: { temperature: 0 },
        messages: [
          { role: 'system', content: test.system },
          { role: 'user', content: test.prompt },
        ],
      }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const answer = data.message?.content?.trim() || '';
    const ok = test.mustContain.test(answer);
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${test.name}`);
    console.log(`      ${answer.replace(/\s+/g, ' ').slice(0, 220)}`);
    if (ok) passed++;
  } catch (error) {
    console.log(`FAIL  ${test.name}`);
    console.log(`      ${error instanceof Error ? error.message : String(error)}`);
  }
}

console.log(`\n${passed}/${cases.length} local-model checks passed`);
if (passed !== cases.length) process.exit(1);
