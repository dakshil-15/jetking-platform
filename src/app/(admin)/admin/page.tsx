import type { Route } from 'next';
import { Layers, PenLine, Users, Building2 } from 'lucide-react';
import { requireRole, seedCmsFromFixtures } from './actions';
import { listCollection } from '@/lib/cms/store';
import { isDatabaseConfigured } from '@/lib/leads/store';
import { getLeadsSummary } from './leads/actions';
import { StatCard, BarChartCard, DonutChartCard } from './DashboardWidgets';

// `route` differs from `key` for the two collections whose folder name
// doesn't match the CMS collection key (homepage_variants → /admin/variants,
// persona_rules → /admin/rules) — everything else lines up 1:1.
const COLLECTIONS = [
  { key: 'courses', label: 'Courses', route: 'courses' },
  { key: 'centres', label: 'Centres', route: 'centres' },
  { key: 'posts', label: 'Posts', route: 'posts' },
  { key: 'faqs', label: 'FAQs', route: 'faqs' },
  { key: 'policies', label: 'Policies', route: 'policies' },
  { key: 'faculty', label: 'Faculty', route: 'faculty' },
  { key: 'homepage_variants', label: 'Homepage variants', route: 'variants' },
  { key: 'persona_rules', label: 'Persona rules', route: 'rules' },
] as const;

export default async function AdminDashboard() {
  // Every role lands here — this is `requireRole`'s own redirect target for
  // "signed in but wrong role", so restricting it to a subset of roles would
  // bounce anyone outside that subset straight back to itself.
  const user = await requireRole(['admin', 'editor', 'centre_staff']);

  const rows = await Promise.all(
    COLLECTIONS.map(async (c) => ({ ...c, items: await listCollection(c.key) })),
  );
  const bars = rows.map((r) => ({
    label: r.label,
    value: r.items.length,
    href: `/admin/${r.route}` as Route,
  }));

  const totalContent = rows.reduce((sum, r) => sum + r.items.length, 0);
  const draftCount = rows.reduce(
    (sum, r) => sum + r.items.filter((item) => item.status === 'draft').length,
    0,
  );
  const publishedCount = totalContent - draftCount;

  const centresCount = rows.find((r) => r.key === 'centres')?.items.length ?? 0;
  // First collection with a draft — the natural "go fix this" destination for
  // the drafts stat card when there's more than one collection to check.
  const firstDraftRoute = rows.find((r) => r.items.some((item) => item.status === 'draft'))?.route;

  // Goes through the leads action (not the store directly) so `centre_staff`
  // gets the same centre-scoped count here as on the Leads page itself.
  const leadStats = isDatabaseConfigured() ? await getLeadsSummary() : null;

  return (
    <div className="max-w-5xl">
      <p className="label-mono text-[var(--accent-ink)]">Dashboard</p>
      <h1 className="mt-4 text-3xl sm:text-4xl">Content and adaptation</h1>
      <p className="lede mt-4">
        Publish content, homepage variants, and persona IF/THEN rules. Saving revalidates
        the site and triggers Guide re-ingest.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Layers} label="Total content" value={totalContent} />
        <StatCard
          icon={PenLine}
          label="Drafts awaiting review"
          value={draftCount}
          badge={draftCount > 0 ? 'needs review' : 'all clear'}
          badgeTone={draftCount > 0 ? 'warn' : 'good'}
          href={draftCount > 0 && firstDraftRoute ? (`/admin/${firstDraftRoute}` as Route) : undefined}
        />
        <StatCard
          icon={Users}
          label="Leads"
          value={leadStats ? leadStats.total : '—'}
          badge={leadStats ? `${leadStats.byStatus.new} new` : 'not configured'}
          badgeTone={leadStats && leadStats.byStatus.new > 0 ? 'warn' : 'neutral'}
          href={
            leadStats
              ? ((leadStats.byStatus.new > 0 ? '/admin/leads?status=new' : '/admin/leads') as Route)
              : undefined
          }
        />
        <StatCard icon={Building2} label="Centres" value={centresCount} href={'/admin/centres' as Route} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <BarChartCard
          title="Content by type"
          description="Record count per collection, across draft and published."
          bars={bars}
        />
        <DonutChartCard
          title="Publish status"
          description="Share of every content record that's live vs. still a draft."
          segments={[
            { label: 'Published', value: publishedCount, color: 'var(--color-growth-600)' },
            { label: 'Draft', value: draftCount, color: 'var(--color-signal-600)' },
          ]}
        />
      </div>

      {user.role !== 'centre_staff' ? (
        <form action={seedCmsFromFixtures} className="mt-10 rounded-[var(--radius-card)] border border-border bg-background p-6">
          <h2 className="text-xl">Reset from fixtures</h2>
          <p className="mt-2 max-w-prose text-sm text-foreground-secondary">
            Replaces every CMS record with the in-repo fixture set. Use on staging when
            seeding a fresh environment — it discards unsaved editorial work.
          </p>
          <button
            type="submit"
            className="mt-5 inline-flex h-11 cursor-pointer items-center rounded-[var(--admin-radius)] bg-[var(--accent)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            Reset CMS from fixtures
          </button>
        </form>
      ) : null}
    </div>
  );
}
