/**
 * Prints a summary of questions the chatbot couldn't answer (see
 * src/features/jetking-ai/feedback-log.ts) — the unanswered-question
 * feedback loop: each gate refusal is a knowledge-base gap, and this is
 * where someone finds out which gaps matter most.
 *
 * Requires Supabase to be configured (NEXT_PUBLIC_SUPABASE_URL and
 * SUPABASE_SERVICE_ROLE_KEY — same vars the admin CMS falls back without,
 * see src/lib/supabase.ts) and a one-time table created via:
 *
 *   create table if not exists unanswered_questions (
 *     id bigint generated always as identity primary key,
 *     question text not null,
 *     intent text not null,
 *     persona text not null,
 *     reason text not null,
 *     top_score real,
 *     created_at timestamptz not null default now()
 *   );
 *   create index if not exists unanswered_questions_created_at_idx
 *     on unanswered_questions (created_at desc);
 *
 * Until that's set up, entries are still visible as `[jetking-ai:unanswered]`
 * lines in `vercel logs` — this script is a nicer view once the table exists.
 */
import './load-dotenv.mjs';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

if (!isSupabaseConfigured()) {
  console.log(
    'Supabase is not configured (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing).',
  );
  console.log(
    'Unanswered questions are still logged as `[jetking-ai:unanswered]` lines — check `vercel logs` in the meantime.',
  );
  process.exit(0);
}

const supabase = getSupabase()!;
const { data, error } = await supabase
  .from('unanswered_questions')
  .select('question, intent, persona, reason, top_score, created_at')
  .order('created_at', { ascending: false })
  .limit(500);

if (error) {
  console.error('Failed to read unanswered_questions — has the table been created yet?');
  console.error(error.message);
  process.exit(1);
}

const rows = data ?? [];
console.log(`${rows.length} unanswered questions on record (most recent 500):\n`);

const byIntent = new Map<string, number>();
for (const row of rows) byIntent.set(row.intent, (byIntent.get(row.intent) ?? 0) + 1);

console.log('By topic:');
for (const [intent, count] of [...byIntent.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(count).padStart(3)}  ${intent}`);
}

console.log('\nMost recent 20:');
for (const row of rows.slice(0, 20)) {
  const score = row.top_score !== null ? ` ${Math.round(row.top_score * 100)}%` : '';
  console.log(`  [${row.created_at}] (${row.persona}/${row.reason}${score}) ${row.question}`);
}
