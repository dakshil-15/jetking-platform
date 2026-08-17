import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { AppProviders } from '@/components/providers/app-providers';

export const metadata: Metadata = {
  title: 'Chat with Jetking AI',
  description: 'Your Jetking learning assistant — courses, placements, fees and more.',
  robots: { index: false, follow: false },
};

export default function ChatbotLayout({ children }: { children: ReactNode }) {
  return (
    <AppProviders>
      <div className="chatbot-app h-dvh overflow-hidden antialiased">{children}</div>
    </AppProviders>
  );
}
