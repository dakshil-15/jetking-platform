import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { Landmark, Mail, Phone } from 'lucide-react';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import { Breadcrumbs, JsonLd, type Crumb } from '@/components/ui';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = buildMetadata(
  {
    title: `Investors | ${siteConfig.name}`,
    description: `Investor relations contact and information for ${siteConfig.legalName}.`,
  },
  '/investors',
);

const trail: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Investors', path: '/investors' },
];

const INVESTOR_CONTACT = {
  email: 'info@jetking.com',
  phone: '07666830000',
  tel: 'tel:07666830000',
} as const;

/**
 * Placeholder page, built on the same dark-canvas hero/panel language as
 * /about-us and /placements. Real investor-relations content (disclosures,
 * financials, board composition, annual reports) is intentionally not
 * fabricated here — this ships with only real, already-published contact
 * details until Jetking supplies the rest.
 */
export default function InvestorsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <div className="dark-canvas pb-16 sm:pb-20 lg:pb-24">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="shell relative pt-6 sm:pt-8" data-reveal-skip>
          <Breadcrumbs trail={trail} />

          <div className="relative mt-5 sm:mt-6">
            <div className="dc-banner relative min-h-[min(78vw,420px)] overflow-hidden rounded-[24px] xs:min-h-[400px] xs:rounded-[28px] sm:min-h-[460px] sm:rounded-[32px] lg:min-h-[520px]">
              <Image
                src="/home/journey-franchise-v2.jpg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_28%]"
              />
              <div aria-hidden="true" className="dc-banner-wash pointer-events-none absolute inset-0" />

              <div className="relative z-[1] flex h-full min-h-[inherit] flex-col justify-end px-6 py-10 xs:px-8 xs:py-12 sm:justify-center sm:px-10 sm:py-14 lg:max-w-[62%] lg:px-12 lg:py-16 xl:px-14">
                <p className="dc-eyebrow label-mono">Investors</p>

                <h1 className="dc-heading-glow mt-4 font-display text-[32px] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance text-[var(--dc-ink)] xs:text-[38px] sm:mt-5 sm:text-[44px] md:text-[48px] lg:text-[52px]">
                  Investor <span className="dc-accent-glow">Relations</span>
                </h1>

                <p className="mt-4 max-w-[46ch] text-[14.5px] leading-[1.65] text-[var(--dc-ink-secondary)] xs:text-[15.5px] sm:mt-5 sm:text-[16px]">
                  Information for shareholders, analysts and prospective investors in{' '}
                  {siteConfig.legalName}.
                </p>

                <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
                  <a
                    href={`mailto:${INVESTOR_CONTACT.email}`}
                    className="dc-cta inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-bold sm:h-14 sm:px-7 sm:text-base"
                  >
                    Email investor relations
                  </a>
                  <a
                    href={INVESTOR_CONTACT.tel}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--dc-hairline-strong)] bg-[var(--dc-card)] px-6 text-sm font-bold text-[var(--dc-ink)] transition-colors hover:border-[var(--dc-accent-soft)] sm:h-14 sm:px-7 sm:text-base"
                  >
                    Call {INVESTOR_CONTACT.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Status — load-bearing, not decorative ────────────────────────
            Same honest-disclaimer pattern as /placements: no disclosures,
            financials or governance figures are invented here. */}
        <section className="shell relative mt-8 sm:mt-10">
          <div className="dc-panel rounded-[18px] px-5 py-5 sm:rounded-[20px] sm:px-6 sm:py-6">
            <p className="text-[13.5px] leading-relaxed text-[var(--dc-ink-secondary)] sm:text-[14.5px]">
              Formal disclosures, financial statements, annual reports and governance
              information will be published on this page. In the meantime, investor queries
              can be directed to the contacts below.
            </p>
          </div>
        </section>

        {/* ── Contact ───────────────────────────────────────────────────── */}
        <section className="shell relative mt-16 sm:mt-20 lg:mt-24" aria-labelledby="investors-contact">
          <p className="dc-eyebrow label-mono">Get in touch</p>
          <h2
            id="investors-contact"
            className="dc-heading-glow mt-3 font-display text-[28px] font-extrabold tracking-[-0.03em] text-[var(--dc-ink)] xs:text-[32px] sm:text-[36px]"
          >
            Investor <span className="dc-accent-glow">queries</span>
          </h2>

          <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
            <li>
              <article className="dc-card-shell h-full">
                <div className="dc-card flex h-full flex-col p-5 sm:p-6">
                  <Landmark className="h-5 w-5 text-[var(--dc-accent-soft)]" strokeWidth={1.75} aria-hidden="true" />
                  <h3 className="mt-4 font-display text-[16px] font-extrabold tracking-[-0.02em] text-[var(--dc-ink)]">
                    {siteConfig.legalName}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--dc-ink-secondary)]">
                    Registered office: 5th Floor, Amore Building, Junction of 2nd &amp; 4th
                    Road, Khar, Mumbai – 400052, India.
                  </p>
                </div>
              </article>
            </li>

            <li>
              <article className="dc-card-shell h-full">
                <div className="dc-card flex h-full flex-col p-5 sm:p-6">
                  <Mail className="h-5 w-5 text-[var(--dc-accent-soft)]" strokeWidth={1.75} aria-hidden="true" />
                  <h3 className="mt-4 font-display text-[16px] font-extrabold tracking-[-0.02em] text-[var(--dc-ink)]">
                    Email
                  </h3>
                  <Link
                    href={`mailto:${INVESTOR_CONTACT.email}` as Route}
                    className="mt-2 text-[13.5px] font-bold text-[var(--dc-accent-soft)] hover:underline"
                  >
                    {INVESTOR_CONTACT.email}
                  </Link>
                </div>
              </article>
            </li>

            <li>
              <article className="dc-card-shell h-full">
                <div className="dc-card flex h-full flex-col p-5 sm:p-6">
                  <Phone className="h-5 w-5 text-[var(--dc-accent-soft)]" strokeWidth={1.75} aria-hidden="true" />
                  <h3 className="mt-4 font-display text-[16px] font-extrabold tracking-[-0.02em] text-[var(--dc-ink)]">
                    Phone
                  </h3>
                  <a
                    href={INVESTOR_CONTACT.tel}
                    className="mt-2 text-[13.5px] font-bold text-[var(--dc-accent-soft)] hover:underline"
                  >
                    {INVESTOR_CONTACT.phone}
                  </a>
                </div>
              </article>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
