import { unsupportedSensitiveClaims } from '../src/features/jetking-ai/grounding.ts';

const cases = [
  {
    name: 'reject invented fee',
    answer: 'The fee is ₹1,50,000 and the duration is 2 months.',
    context: 'Course fee: Confirmed by a counsellor. Duration: 2 months.',
    unsupported: ['₹1,50,000'],
  },
  {
    name: 'allow sourced fee and duration',
    answer: 'The fee is INR 25,000 and the duration is 6 months.',
    context: 'Course fee: ₹25,000. The programme runs for 6 months.',
    unsupported: [],
  },
  {
    name: 'reject invented placement guarantee',
    answer: 'This includes a 100% placement guarantee.',
    context: 'Jetking provides placement assistance and interview preparation.',
    unsupported: ['100% placement guarantee'],
  },
  {
    name: 'allow sourced percentage claim',
    answer: 'The course uses 80% practical training.',
    context: 'Students receive 80% practical training in specialised labs.',
    unsupported: [],
  },
];

let passed = 0;
for (const test of cases) {
  const actual = unsupportedSensitiveClaims(test.answer, test.context);
  const ok = JSON.stringify(actual) === JSON.stringify(test.unsupported);
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${test.name}`);
  if (!ok)
    console.log(
      `      expected ${JSON.stringify(test.unsupported)}, got ${JSON.stringify(actual)}`,
    );
  if (ok) passed++;
}

console.log(`\n${passed}/${cases.length} grounding checks passed`);
if (passed !== cases.length) process.exit(1);
