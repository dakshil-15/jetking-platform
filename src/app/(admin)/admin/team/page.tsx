import { requireRole } from '../actions';
import { isDatabaseConfigured, listUsers } from '@/lib/auth/users';
import { listCentreOptions } from '@/lib/leads/centre-scope';
import { TeamTable } from './TeamTable';

export default async function TeamPage() {
  await requireRole(['admin']);

  if (!isDatabaseConfigured()) {
    return (
      <div className="max-w-2xl">
        <p className="label-mono text-[var(--accent-ink)]">team</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">Team &amp; access</h1>
        <div
          role="alert"
          className="mt-8 rounded-[var(--radius-card)] border border-[var(--color-error-200)] bg-[var(--color-error-50)] px-5 py-4 text-sm font-medium text-[var(--color-error-600)]"
        >
          <code className="text-foreground">DATABASE_URL</code> is not set, so there&apos;s nowhere to
          store staff accounts. Everyone who knows <code className="text-foreground">ADMIN_PASSWORD</code>{' '}
          currently has full admin access — set <code className="text-foreground">DATABASE_URL</code>,
          run <code className="text-foreground">npm run db:migrate</code>, then create the first
          account with <code className="text-foreground">npm run create:admin</code>.
        </div>
      </div>
    );
  }

  const [users, centres] = await Promise.all([listUsers(), listCentreOptions()]);
  return <TeamTable initialUsers={users} centres={centres} />;
}
