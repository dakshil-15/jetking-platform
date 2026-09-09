import { adminLogin, isAdminAuthenticated } from '../actions';
import { redirect } from 'next/navigation';
import type { Route } from 'next';
import { isDatabaseConfigured } from '@/lib/auth/users';
import { LoginForm } from './LoginForm';

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect('/admin' as Route);
  const multiUser = isDatabaseConfigured();

  return (
    <div className="flex min-h-full items-center justify-center bg-surface px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-[920px] overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-sm)] lg:grid-cols-2">
        {/* Brand panel — a light intro, not a full-bleed dark block; the
           accent is reserved for the form's own CTA and focus states. */}
        <div className="flex flex-col justify-between gap-10 border-b border-border bg-surface p-8 sm:p-10 lg:border-r lg:border-b-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- brand asset; sized by caller */}
          <img
            src="/brand/jetking-wordmark.png"
            alt="Jetking"
            draggable={false}
            className="h-8 w-auto shrink-0 select-none object-contain"
          />

          <div>
            <p className="label-mono text-[var(--accent-ink)]">Admin console</p>
            <h1 className="mt-3 text-2xl text-foreground sm:text-[28px]">Admin Console</h1>
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-foreground-secondary">
              Manage content, centres, leads and platform operations.
            </p>
          </div>

          <p className="text-xs text-foreground-muted">
            &copy; {new Date().getFullYear()} Jetking. Staff access only.
          </p>
        </div>

        {/* Form panel */}
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <p className="label-mono text-[var(--accent-ink)]">Welcome back</p>
          <h2 className="mt-3 text-2xl text-foreground">Sign in to Admin</h2>
          <p className="mt-2 text-sm text-foreground-secondary">
            {multiUser ? 'Sign in with your staff account.' : 'Enter the staff password to continue.'}
          </p>

          <LoginForm action={adminLogin} multiUser={multiUser} />
        </div>
      </div>
    </div>
  );
}
