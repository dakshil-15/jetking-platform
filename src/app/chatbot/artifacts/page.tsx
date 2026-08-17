import { Shapes } from 'lucide-react';

import { AppShell } from '@/components/layout/app-shell';
import { PlaceholderPage } from '@/components/layout/placeholder-page';

export default function ArtifactsPage() {
  return (
    <AppShell>
      <PlaceholderPage
        title="Artifacts"
        description="Artifacts collect the documents, diagrams, and apps produced across your chats."
        icon={<Shapes className="size-5" />}
      />
    </AppShell>
  );
}
