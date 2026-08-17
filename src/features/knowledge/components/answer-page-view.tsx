'use client';

import { ExternalLink, Search, Sparkles } from 'lucide-react';

import { AnswerBlockView } from '@/features/knowledge/components/answer-blocks';
import type { AnswerPage } from '@/features/knowledge/types/answer';
import { cn } from '@/lib/utils';
import { siteHref } from '@/lib/config/site';

interface AnswerPageViewProps {
  answer: AnswerPage;
  onFollowUp: (question: string) => void;
  /** Disabled while another answer is being produced. */
  followUpsDisabled?: boolean;
  /** Hide the source attribution ribbon and the sources footer. */
  showSources?: boolean;
  /** Suppress links to external jetking.com pages inside the answer blocks. */
  linkless?: boolean;
  /** Show the "Ask next" follow-up prompts. */
  showFollowUps?: boolean;
}

/**
 * Renders a composed answer as a page: optional attribution ribbon, headline,
 * lede, the composed blocks, the sources they came from, and follow-up prompts.
 */
export function AnswerPageView({
  answer,
  onFollowUp,
  followUpsDisabled = false,
  showSources = true,
  linkless = false,
  showFollowUps = true,
}: AnswerPageViewProps) {
  const grounded = answer.confidence !== 'none';

  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        {showSources ? (
          <div className="flex items-center gap-2 text-xs text-ink-subtle">
            {grounded ? (
              <>
                <Sparkles className="size-3.5 text-brand" />
                <span>
                  Answered from{' '}
                  <a
                    href={answer.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink-muted underline decoration-line-strong underline-offset-2 hover:text-brand"
                  >
                    {answer.sourceLabel}
                  </a>
                </span>
                {answer.sources.length > 0 ? (
                  <span aria-hidden className="text-ink-subtle/60">
                    · {answer.sources.length} {answer.sources.length === 1 ? 'source' : 'sources'}
                  </span>
                ) : null}
              </>
            ) : (
              <>
                <Search className="size-3.5" />
                <span>No match found on {answer.sourceLabel}</span>
              </>
            )}
          </div>
        ) : null}

        <h2 className="font-display text-2xl leading-tight font-semibold tracking-tight text-ink">
          {answer.title}
        </h2>

        <p className="text-[1.0625rem] leading-[1.65] text-ink-muted">{answer.lede}</p>
      </header>

      {answer.blocks.length > 0 ? (
        <div className="flex flex-col gap-6">
          {answer.blocks.map((block, index) => (
            <AnswerBlockView key={`${block.type}-${index}`} block={block} linkless={linkless} />
          ))}
        </div>
      ) : null}

      {showSources && answer.sources.length > 0 ? (
        <footer className="border-t border-line pt-4">
          <h3 className="mb-2.5 text-[0.6875rem] font-semibold tracking-wider text-ink-subtle uppercase">
            Sources
          </h3>
          <ul className="flex flex-wrap gap-2">
            {answer.sources.map((source) => (
              <li key={source.path}>
                <a
                  href={siteHref(source.path)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={source.title}
                  className={cn(
                    'inline-flex max-w-64 items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5',
                    'text-xs text-ink-muted transition-colors',
                    'hover:border-line-strong hover:bg-surface-hover hover:text-ink',
                  )}
                >
                  <ExternalLink className="size-3 shrink-0" />
                  <span className="truncate font-mono">{source.path}</span>
                </a>
              </li>
            ))}
          </ul>
        </footer>
      ) : null}

      {showFollowUps && answer.followUps.length > 0 ? (
        <div>
          <h3 className="mb-2.5 text-[0.6875rem] font-semibold tracking-wider text-ink-subtle uppercase">
            Ask next
          </h3>
          <ul className="flex flex-col gap-1.5">
            {answer.followUps.map((question) => (
              <li key={question}>
                <button
                  type="button"
                  disabled={followUpsDisabled}
                  onClick={() => onFollowUp(question)}
                  className={cn(
                    'group/next flex w-full items-center gap-2.5 rounded-lg border border-line px-3 py-2 text-left',
                    'text-sm text-ink-muted transition-colors',
                    'hover:border-brand/35 hover:bg-brand-soft hover:text-ink',
                    'disabled:pointer-events-none disabled:opacity-50',
                  )}
                >
                  <span className="min-w-0 flex-1">{question}</span>
                  <span
                    aria-hidden
                    className="text-ink-subtle transition-transform group-hover/next:translate-x-0.5"
                  >
                    →
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
