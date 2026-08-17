'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export const TooltipProvider = TooltipPrimitive.Provider;

interface TooltipProps {
  /** Trigger element. Must forward a ref and accept DOM props. */
  children: ReactNode;
  label: ReactNode;
  /** Optional shortcut hint rendered after the label. */
  shortcut?: string;
  side?: TooltipPrimitive.TooltipContentProps['side'];
  align?: TooltipPrimitive.TooltipContentProps['align'];
  sideOffset?: number;
  /** Skip the tooltip entirely — useful on touch devices. */
  disabled?: boolean;
}

/**
 * Compact tooltip wrapper. The common case is a single trigger and a short
 * label, so the Radix parts are collapsed into one component.
 */
export function Tooltip({
  children,
  label,
  shortcut,
  side = 'bottom',
  align = 'center',
  sideOffset = 8,
  disabled = false,
}: TooltipProps) {
  if (disabled) return <>{children}</>;

  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            'z-50 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5',
            'bg-clay-950 text-clay-50 dark:bg-clay-100 dark:text-clay-950',
            'text-xs font-medium shadow-pop',
            'select-none',
            'data-[state=delayed-open]:animate-fade-in',
          )}
        >
          {label}
          {shortcut ? <span className="text-[0.6875rem] opacity-60">{shortcut}</span> : null}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
