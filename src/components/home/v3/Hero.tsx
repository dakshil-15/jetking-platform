import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight, BadgeCheck, Cpu, Download, MessagesSquare, ShieldCheck, Star, Users, Wrench } from 'lucide-react';
import type { EnquiryCentre } from '@/components/EnquiryModal';
import { HeroCtas } from './HeroCtas';

const CHECKS = [
  { icon: Wrench, label: 'Hands-on labs' },
  { icon: BadgeCheck, label: 'Industry certifications' },
  { icon: ShieldCheck, label: 'Placement support' },
] as const;

const FLOATERS = [
  { icon: Users, top: 'Learn', bottom: 'from experts' },
  { icon: Cpu, top: 'Work on', bottom: 'real projects' },
  { icon: MessagesSquare, top: 'Get placement', bottom: 'support' },
] as const;

/** The same three actions as the live homepage's action bar (`v2/ActionBar.tsx`). */
const BAR = [
  { icon: Download, label: 'Download Brochure', detail: 'Courses, fees & more', href: '/courses' },
  { icon: ShieldCheck, label: 'Placement Support', detail: 'See how placement support works', href: '/placements' },
  { icon: Star, label: 'Student Testimonials', detail: 'Hear from Jetking alumni', href: '/placements#placements-testimonials' },
] as const;

const PERSONAS = [
  { label: 'Student', href: '/student' },
  { label: 'Working professional', href: '/professional' },
  { label: 'Just browsing', href: '/explore' },
] as const;

/**
 * Homepage hero: headline, CTAs, a photo with floating benefit chips, and the dark
 * summary bar. The persona chooser is kept as three plain links (crawlable, no JS) under
 * the checks. Every claim is qualitative or a live catalogue count — nothing like "100%
 * placement" that the placement disclaimer contradicts.
 */
export function Hero({ centres }: { centres: EnquiryCentre[] }) {
  return (
    <section
      className={[
        'relative overflow-hidden bg-background bg-[radial-gradient(70%_80%_at_85%_10%,rgb(234_28_36/0.13),transparent_70%),radial-gradient(50%_60%_at_0%_100%,rgb(234_28_36/0.07),transparent_70%)]',
        /* Pull behind the transparent sticky header (heights match SiteHeader: 72/80/88/96). */
        '-mt-[72px] pt-[72px] xs:-mt-[80px] xs:pt-[80px] sm:-mt-[88px] sm:pt-[88px] 2xl:-mt-[96px] 2xl:pt-[96px]',
      ].join(' ')}
    >
      <div className="shell relative pt-8 pb-8 sm:pt-12 lg:pb-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
          <div>
            <p className="text-[12px] font-bold tracking-[0.14em] text-[var(--accent-ink)] uppercase sm:text-[13px]">
              India&rsquo;s No.1 Technology Training Institute
            </p>
            <h1 className="mt-4 font-display text-[40px] leading-[1.05] font-extrabold tracking-[-0.03em] text-foreground sm:text-[52px] lg:text-[60px]">
              The Power of Three
              <br />
              with <span className="text-[var(--accent-ink)]">Jetking</span>
            </h1>
            <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed font-semibold text-foreground sm:text-[17px]">
              Get Skills. Get a Degree. 100% Placement &mdash; only at Jetking.
            </p>
            <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-foreground-secondary">
              Industry-relevant training. Real-world projects. Placement support that delivers.
            </p>

            <HeroCtas centres={centres} />

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {CHECKS.map((c) => (
                <li key={c.label} className="flex items-center gap-2 text-[13px] font-semibold text-foreground-secondary">
                  <c.icon className="h-4 w-4 text-[var(--accent-ink)]" strokeWidth={2} aria-hidden="true" />
                  {c.label}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span className="text-[13px] font-semibold text-foreground-secondary">I am a</span>
              {PERSONAS.map((p) => (
                <Link
                  key={p.href}
                  href={p.href as Route}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border-medium bg-background px-4 text-[13px] font-bold text-foreground transition-colors hover:border-jk-500"
                >
                  {p.label}
                  <ArrowRight className="h-3.5 w-3.5 text-[var(--accent-ink)]" strokeWidth={2.25} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
            <div className="relative mx-auto aspect-[4/4.2] w-[88%] overflow-hidden rounded-[36px] bg-surface shadow-[0_24px_60px_rgb(199_20_28/0.18)] lg:w-[78%]">
              <Image
                src="/student/hero.png"
                alt="A smiling Jetking student carrying a laptop and a backpack"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-top"
              />
            </div>
            <ul className="absolute top-[8%] right-0 flex w-[44%] flex-col gap-3 sm:w-[34%] lg:w-[36%]">
              {FLOATERS.map((f) => (
                <li
                  key={f.top}
                  className="flex items-center gap-2.5 rounded-2xl border border-border bg-background px-3 py-2.5 shadow-[0_10px_30px_rgb(16_24_40/0.12)]"
                >
                  <span
                    aria-hidden="true"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-jk-50 text-jk-600"
                  >
                    <f.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <span className="text-[12px] leading-tight font-semibold text-foreground">
                    {f.top}
                    <span className="block font-bold">{f.bottom}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-[22px] bg-[#14141c] text-white shadow-[0_18px_40px_rgb(16_24_40/0.2)] sm:grid-cols-3">
          {BAR.map((item, index) => (
            <Link
              key={item.label}
              href={item.href as Route}
              className={[
                'flex items-center gap-4 p-5 transition-colors hover:bg-white/5',
                index > 0 ? 'border-t border-white/10 sm:border-t-0 sm:border-l' : '',
              ].join(' ')}
            >
              <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-jk-400">
                <item.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <p>
                <span className="block font-display text-[16px] font-extrabold">{item.label}</span>
                <span className="mt-1 block text-[13px] text-white/75">{item.detail}</span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
