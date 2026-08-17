'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

import { Button } from '@/components/ui/index';
import { AttachmentList } from '@/features/chat/components/message/attachment-list';
import { MessageActions } from '@/features/chat/components/message/message-actions';
import type { Message } from '@/features/chat/types';
import { useAutosizeTextarea } from '@/hooks';

interface UserMessageProps {
  message: Message;
  onEdit: (messageId: string, content: string) => void;
  editingDisabled: boolean;
}

const EDIT_MAX_HEIGHT = 320;

export function UserMessage({ message, onEdit, editingDisabled }: UserMessageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(message.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextarea({ ref: textareaRef, value: draft, maxHeight: EDIT_MAX_HEIGHT });

  useEffect(() => {
    if (!isEditing) return;
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  }, [isEditing]);

  const beginEdit = () => {
    setDraft(message.content);
    setIsEditing(true);
  };

  const submitEdit = () => {
    setIsEditing(false);
    if (draft.trim() && draft.trim() !== message.content) {
      onEdit(message.id, draft);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submitEdit();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex justify-end">
        <div className="w-full max-w-[85%] rounded-2xl border border-line bg-surface p-3">
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Edit message"
            className="scrollbar-subtle w-full resize-none bg-transparent text-[0.9375rem] leading-[1.7] text-ink outline-none"
          />
          <div className="mt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={submitEdit} disabled={!draft.trim()}>
              Send
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group/message flex flex-col items-end gap-1.5">
      {message.attachments?.length ? (
        <AttachmentList attachments={message.attachments} className="justify-end" />
      ) : null}

      <div className="max-w-[85%] rounded-2xl bg-bubble-user px-4 py-3">
        <p className="text-[0.9375rem] leading-[1.7] whitespace-pre-wrap text-ink">
          {message.content}
        </p>
      </div>

      <MessageActions
        message={message}
        onEdit={editingDisabled ? undefined : beginEdit}
        disabled={editingDisabled}
      />
    </div>
  );
}

