'use client';

import { FileCode2, FileText, ImageIcon, Paperclip, X } from 'lucide-react';

import { Button } from '@/components/ui/index';
import type { Attachment, AttachmentKind } from '@/features/chat/types';

const KIND_ICON: Record<AttachmentKind, typeof Paperclip> = {
  image: ImageIcon,
  document: FileText,
  code: FileCode2,
  other: Paperclip,
};

interface ComposerAttachmentsProps {
  attachments: readonly Attachment[];
  onRemove: (attachmentId: string) => void;
}

export function ComposerAttachments({ attachments, onRemove }: ComposerAttachmentsProps) {
  if (attachments.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2 px-3 pt-3">
      {attachments.map((attachment) => {
        const Icon = KIND_ICON[attachment.kind];

        return (
          <li
            key={attachment.id}
            className="flex max-w-52 items-center gap-1.5 rounded-lg border border-line bg-surface-sunken py-1 pr-1 pl-2.5"
          >
            <Icon className="size-3.5 shrink-0 text-ink-subtle" />
            <span className="truncate text-xs text-ink">{attachment.name}</span>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Remove ${attachment.name}`}
              onClick={() => onRemove(attachment.id)}
              className="size-5 shrink-0"
            >
              <X className="size-3" />
            </Button>
          </li>
        );
      })}
    </ul>
  );
}

