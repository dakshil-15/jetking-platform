import type { LucideIcon } from 'lucide-react';
import { FolderClosed, MessageSquare, Shapes } from 'lucide-react';
import type { Route } from 'next';

import { ROUTES } from '@/lib/config/routes';

export interface NavItem {
  id: string;
  label: string;
  href: Route;
  icon: LucideIcon;
}

export const PRIMARY_NAV: readonly NavItem[] = [
  { id: 'chats', label: 'Chats', href: ROUTES.home(), icon: MessageSquare },
  { id: 'projects', label: 'Projects', href: ROUTES.projects(), icon: FolderClosed },
  { id: 'artifacts', label: 'Artifacts', href: ROUTES.artifacts(), icon: Shapes },
] as const;
