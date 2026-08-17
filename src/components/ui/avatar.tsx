import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const avatarVariants = cva(
  'inline-flex shrink-0 items-center justify-center rounded-full font-medium select-none',
  {
    variants: {
      size: {
        sm: 'size-6 text-[0.625rem]',
        md: 'size-7 text-xs',
        lg: 'size-9 text-sm',
      },
      tone: {
        brand: 'bg-brand text-brand-ink',
        neutral: 'bg-clay-500 dark:bg-clay-600 text-white',
      },
    },
    defaultVariants: { size: 'md', tone: 'brand' },
  },
);

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  name: string;
  className?: string;
}

/** Derive up to two uppercase initials from a display name. */
function toInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';

  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
  return (first + last).toUpperCase();
}

export function Avatar({ name, size, tone, className }: AvatarProps) {
  return (
    <span aria-hidden className={cn(avatarVariants({ size, tone }), className)}>
      {toInitials(name)}
    </span>
  );
}
