import { FileCode2, FileText, ImageIcon, Paperclip } from 'lucide-react';

import type { Attachment, AttachmentKind } from '@/features/chat/types';
import { cn } from '@/lib/utils';

const KIND_ICON: Record<AttachmentKind, typeof Paperclip> = {
  image: ImageIcon,
  document: FileText,
  code: FileCode2,
  other: Paperclip,
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface AttachmentListProps {
  attachments: readonly Attachment[];
  className?: string;
}

export function AttachmentList({ attachments, className }: AttachmentListProps) {
  if (attachments.length === 0) return null;

  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {attachments.map((attachment) => {
        const Icon = KIND_ICON[attachment.kind];

        return (
          <li
            key={attachment.id}
            className="flex max-w-56 items-center gap-2 rounded-lg border border-line bg-surface px-2.5 py-1.5"
          >
            <Icon className="size-4 shrink-0 text-ink-subtle" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-medium text-ink">{attachment.name}</span>
              <span className="block text-[0.6875rem] text-ink-subtle">
                {formatSize(attachment.size)}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
