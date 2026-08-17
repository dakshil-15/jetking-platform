import { FolderClosed } from 'lucide-react';

import { AppShell } from '@/components/layout/app-shell';
import { PlaceholderPage } from '@/components/layout/placeholder-page';

export default function ProjectsPage() {
  return (
    <AppShell>
      <PlaceholderPage
        title="Projects"
        description="Projects group related chats with shared context and instructions."
        icon={<FolderClosed className="size-5" />}
      />
    </AppShell>
  );
}
