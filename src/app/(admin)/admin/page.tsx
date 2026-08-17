import { redirect } from 'next/navigation';
import type { Route } from 'next';
import { isAdminAuthenticated, seedCmsFromFixtures } from './actions';
import { listCollection } from '@/lib/cms/store';

export default async function AdminDashboard() {
  if (!(await isAdminAuthenticated())) redirect('/admin/login' as Route);

  const [courses, posts, rules, variants] = await Promise.all([
    listCollection('courses'),
    listCollection('posts'),
    listCollection('persona_rules'),
    listCollection('homepage_variants'),
  ]);

  const cards = [
    { label: 'Courses', value: courses.length },
    { label: 'Posts', value: posts.length },
    { label: 'Persona rules', value: rules.length },
    { label: 'Homepage variants', value: variants.length },
  ];

  return (
    <div className="max-w-5xl">
      <p className="label-mono text-[var(--accent-ink)]">Dashboard</p>
      <h1 className="mt-4 text-3xl sm:text-4xl">Content and adaptation</h1>
      <p className="lede mt-4">
        Publish content, homepage variants, and persona IF/THEN rules. Saving revalidates
        the site and triggers Guide re-ingest.
      </p>

      <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="border-t border-border pt-5">
            <dd className="numeral font-display text-4xl font-bold text-foreground">
              {card.value}
            </dd>
            <dt className="mt-2 text-sm font-semibold text-foreground-secondary">
              {card.label}
            </dt>
          </div>
        ))}
      </dl>

      <form action={seedCmsFromFixtures} className="mt-14 border-t border-border pt-8">
        <h2 className="text-xl">Reset from fixtures</h2>
        <p className="mt-2 max-w-prose text-sm text-foreground-secondary">
          Replaces every CMS record with the in-repo fixture set. Use on staging when
          seeding a fresh environment — it discards unsaved editorial work.
        </p>
        <button
          type="submit"
          className="mt-5 inline-flex h-12 cursor-pointer items-center rounded-full bg-jk-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-jk-500"
        >
          Reset CMS from fixtures
        </button>
      </form>
    </div>
  );
}
