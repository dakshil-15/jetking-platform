import { SITE } from '@/lib/config/site';
import { cn } from '@/lib/utils';

/** Shown while the knowledge base is being loaded and searched. */
export function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-2.5 py-1" role="status" aria-live="polite">
      <span className="flex items-center gap-1.5" aria-hidden>
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className={cn('jk-typing-dot')}
            style={{ animationDelay: `${index * 160}ms` }}
          />
        ))}
      </span>
      <span className="text-sm text-ink-subtle">
        Searching {SITE.sourceLabel}
        <span className="jk-caret ml-0.5 align-middle" />
      </span>
    </div>
  );
}
