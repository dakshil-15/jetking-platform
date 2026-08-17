import { cn } from '@/lib/utils';

interface JetkingMarkProps {
  className?: string;
  /** Render the glyph alone, without the rounded brand tile behind it. */
  bare?: boolean;
}

/**
 * The Jetking "J" monogram.
 *
 * Drawn as a path rather than SVG `<text>` so it renders identically
 * regardless of which fonts have loaded.
 */
export function JetkingMark({ className, bare = false }: JetkingMarkProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={cn('size-full', className)}>
      {bare ? null : <rect width="100" height="100" rx="24" fill="currentColor" />}
      <path
        d="M70 22 V56 a20 20 0 0 1 -40 0 v-5 h14 v5 a6 6 0 0 0 12 0 V22 Z"
        fill={bare ? 'currentColor' : 'var(--brand-ink, #fff)'}
      />
    </svg>
  );
}
