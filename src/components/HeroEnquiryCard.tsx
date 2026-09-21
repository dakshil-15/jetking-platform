import { QuickEnquiryForm, type EnquiryCentre } from '@/components/QuickEnquiryForm';

/**
 * The lead-form card that sits in the open right-hand side of a page banner (/centres, /courses).
 *
 * Desktop only: below `lg` the banner is a single column, and each of these pages already has a
 * closing "Enquire now" call to action further down. Colours come from the host page's token set
 * — `centres` reads `--centres-*`, `dc` reads the shared `--dc-*` dark-canvas tokens — so the card
 * follows that page's light/dark theme like everything around it.
 */
const TONES = {
  centres: {
    card: 'border-[var(--centres-hairline)] bg-[var(--centres-card)] shadow-[var(--centres-shadow)]',
    eyebrow: 'text-[var(--centres-accent-soft)]',
    title: 'text-[var(--centres-ink)]',
  },
  dc: {
    card: 'border-[var(--dc-hairline-strong)] bg-[var(--dc-card)] shadow-[var(--dc-shadow)]',
    eyebrow: 'text-[var(--dc-accent-soft)]',
    title: 'text-[var(--dc-ink)]',
  },
} as const;

export function HeroEnquiryCard({
  centres,
  source,
  tone,
  titleId,
}: {
  centres: EnquiryCentre[];
  /** Recorded with the lead so it is clear which banner it came from, e.g. `courses-hero-form`. */
  source: string;
  tone: keyof typeof TONES;
  /** Unique id for the heading that names the card. */
  titleId: string;
}) {
  const t = TONES[tone];
  return (
    <aside
      aria-labelledby={titleId}
      className="hidden lg:block lg:w-[400px] lg:shrink-0 lg:py-7 lg:pr-8 xl:w-[456px] xl:pr-14"
    >
      <div className={`rounded-[24px] border p-6 ${t.card}`}>
        <p className={`text-[12px] font-bold tracking-[0.14em] uppercase ${t.eyebrow}`}>Quick enquiry</p>
        <h2
          id={titleId}
          className={`mt-1.5 mb-5 font-display text-[22px] font-extrabold tracking-[-0.02em] ${t.title}`}
        >
          Talk to a counsellor
        </h2>
        <QuickEnquiryForm centres={centres} source={source} />
      </div>
    </aside>
  );
}
