'use client';

import { Check, Copy, Pencil, RefreshCw, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

import { Button, Tooltip } from '@/components/ui/index';
import type { Message } from '@/features/chat/types';
import { useCopyToClipboard } from '@/hooks';
import { cn } from '@/lib/utils';
import { siteHref } from '@/lib/config/site';

type Vote = 'up' | 'down' | null;

interface MessageActionsProps {
  message: Message;
  /** Hidden until the message row is hovered or focused. */
  revealOnHover?: boolean;
  onEdit?: () => void;
  onRetry?: () => void;
  disabled?: boolean;
}

/** Flattens a composed answer into plain text for the clipboard. */
function toPlainText(message: Message): string {
  const { answer } = message;
  if (!answer) return message.content;

  const lines = [answer.title, '', answer.lede, ''];

  for (const block of answer.blocks) {
    switch (block.type) {
      case 'prose':
        lines.push(...block.paragraphs, '');
        break;
      case 'courses':
        lines.push(block.heading);
        for (const course of block.courses) {
          lines.push(`- ${course.name}${course.durationLabel ? ` (${course.durationLabel})` : ''}`);
        }
        lines.push('');
        break;
      case 'faqs':
        lines.push(block.heading);
        for (const faq of block.faqs) lines.push(`Q: ${faq.question}`, `A: ${faq.answer}`, '');
        break;
      case 'stats':
        lines.push(block.heading, block.stats.map((s) => `${s.value} ${s.label}`).join(' Â· '), '');
        break;
      case 'facts':
        lines.push(block.heading, block.items.map((i) => `${i.label}: ${i.value}`).join(' Â· '), '');
        break;
      case 'contact':
        lines.push(
          block.heading,
          block.contact.phone,
          block.contact.email,
          block.contact.address,
          '',
        );
        break;
    }
  }

  if (answer.sources.length) {
    lines.push('Sources:', ...answer.sources.map((source) => siteHref(source.path)));
  }

  return lines.join('\n').trim();
}

export function MessageActions({
  message,
  revealOnHover = true,
  onEdit,
  onRetry,
  disabled = false,
}: MessageActionsProps) {
  const { copied, copy } = useCopyToClipboard();
  const [vote, setVote] = useState<Vote>(null);

  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={cn(
        'flex items-center gap-0.5',
        'transition-opacity duration-150',
        revealOnHover &&
          'opacity-0 group-focus-within/message:opacity-100 group-hover/message:opacity-100',
      )}
    >
      <Tooltip label={copied ? 'Copied' : 'Copy'}>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={copied ? 'Copied' : 'Copy answer'}
          onClick={() => void copy(toPlainText(message))}
        >
          {copied ? <Check className="text-success-500" /> : <Copy />}
        </Button>
      </Tooltip>

      {onEdit ? (
        <Tooltip label="Edit">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Edit question"
            onClick={onEdit}
            disabled={disabled}
          >
            <Pencil />
          </Button>
        </Tooltip>
      ) : null}

      {isAssistant && onRetry ? (
        <Tooltip label="Search again">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Search again"
            onClick={onRetry}
            disabled={disabled}
          >
            <RefreshCw />
          </Button>
        </Tooltip>
      ) : null}

      {isAssistant ? (
        <>
          <Tooltip label="Helpful">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Helpful"
              aria-pressed={vote === 'up'}
              onClick={() => setVote((current) => (current === 'up' ? null : 'up'))}
              className={cn(vote === 'up' && 'text-brand')}
            >
              <ThumbsUp className={cn(vote === 'up' && 'fill-current')} />
            </Button>
          </Tooltip>

          <Tooltip label="Not helpful">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Not helpful"
              aria-pressed={vote === 'down'}
              onClick={() => setVote((current) => (current === 'down' ? null : 'down'))}
              className={cn(vote === 'down' && 'text-brand')}
            >
              <ThumbsDown className={cn(vote === 'down' && 'fill-current')} />
            </Button>
          </Tooltip>
        </>
      ) : null}
    </div>
  );
}

