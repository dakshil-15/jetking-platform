import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      aria-hidden
      style={style}
      className={cn(
        'animate-shimmer rounded-md bg-[length:200%_100%]',
        'bg-gradient-to-r from-surface-hover via-surface-active to-surface-hover',
        className,
      )}
    />
  );
}
