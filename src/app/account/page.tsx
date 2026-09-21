import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { AccountView } from './AccountView';

export const metadata: Metadata = buildMetadata(
  {
    title: 'Your Jetking Account',
    description: 'Your Jetking details and saved Jetking AI chats.',
    // Personal page behind a login — nothing here belongs in a search index.
    noindex: true,
  },
  '/account',
);

export default function AccountPage() {
  return (
    <section className="shell pt-12 pb-20 sm:pt-16">
      <h1 className="font-display text-[30px] font-extrabold tracking-[-0.02em] text-foreground sm:text-[36px]">
        Your account
      </h1>
      <AccountView />
    </section>
  );
}
