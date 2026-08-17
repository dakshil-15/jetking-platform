import { AppShell } from '@/components/layout/app-shell';
import { ConversationView } from '@/features/chat/components/conversation-view';

interface ConversationPageProps {
  params: Promise<{ conversationId: string }>;
}

export default async function ConversationPage({ params }: ConversationPageProps) {
  const { conversationId } = await params;
  return (
    <AppShell>
      <ConversationView conversationId={conversationId} />
    </AppShell>
  );
}
