const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export type RecencyBucket = 'today' | 'yesterday' | 'previous7Days' | 'previous30Days' | 'older';

export const RECENCY_BUCKET_LABEL: Record<RecencyBucket, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  previous7Days: 'Previous 7 days',
  previous30Days: 'Previous 30 days',
  older: 'Older',
};

/** Order used when rendering grouped conversation lists. */
export const RECENCY_BUCKET_ORDER: readonly RecencyBucket[] = [
  'today',
  'yesterday',
  'previous7Days',
  'previous30Days',
  'older',
] as const;

function startOfDay(timestamp: number): number {
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

export function getRecencyBucket(timestamp: number, now: number = Date.now()): RecencyBucket {
  const dayDelta = Math.round((startOfDay(now) - startOfDay(timestamp)) / DAY);

  if (dayDelta <= 0) return 'today';
  if (dayDelta === 1) return 'yesterday';
  if (dayDelta <= 7) return 'previous7Days';
  if (dayDelta <= 30) return 'previous30Days';
  return 'older';
}

/** Short relative label, e.g. "just now", "12m ago", "3d ago". */
export function formatRelativeTime(timestamp: number, now: number = Date.now()): string {
  const delta = Math.max(0, now - timestamp);

  if (delta < MINUTE) return 'just now';
  if (delta < HOUR) return `${Math.floor(delta / MINUTE)}m ago`;
  if (delta < DAY) return `${Math.floor(delta / HOUR)}h ago`;
  if (delta < 7 * DAY) return `${Math.floor(delta / DAY)}d ago`;

  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(timestamp);
}

export function formatTimestamp(timestamp: number): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(timestamp);
}

/** Time-of-day greeting used on the empty state. */
export function getGreeting(now: Date = new Date()): string {
  const hour = now.getHours();
  if (hour < 5) return 'Still up';
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}
