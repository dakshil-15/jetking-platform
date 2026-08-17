import { adminLogin, isAdminAuthenticated } from '../actions';
import { redirect } from 'next/navigation';
import type { Route } from 'next';

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) redirect('/admin' as Route);
  const params = await searchParams;

  return (
    <div className="w-full max-w-sm rounded-[var(--radius-dialog)] border border-border bg-card p-8">
      <span
        aria-hidden="true"
        className="grid h-9 w-9 place-items-center rounded-[0.6rem] bg-jk-600 font-display text-sm font-extrabold text-white"
      >
        Jk
      </span>

      <h1 className="mt-6 text-2xl">Staff login</h1>
      <p className="mt-2 text-sm text-foreground-secondary">
        Use <code className="text-foreground">ADMIN_PASSWORD</code> from env (default{' '}
        <code className="text-foreground">changeme</code>).
      </p>

      {params.error ? (
        <p
          role="alert"
          className="mt-5 rounded-[var(--radius-input)] border border-jk-500/30 bg-jk-500/10 px-4 py-3 text-sm font-medium text-jk-400"
        >
          Incorrect password.
        </p>
      ) : null}

      <form action={adminLogin} className="mt-7 space-y-4">
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-semibold text-foreground">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="h-12 w-full rounded-[var(--radius-input)] border border-border bg-background px-4 text-base text-foreground transition-colors hover:border-border-medium focus:border-jk-400 focus:ring-2 focus:ring-jk-400/25 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-full bg-jk-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-jk-500"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
