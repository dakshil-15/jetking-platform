import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { content } from '@/lib/content';
import { siteConfig } from '@/lib/site';

/**
 * Registered-office contact details, as published on the Investors page
 * (src/app/investors/page.tsx). Reused here so the footer's "Contact" block
 * always has real, working details instead of sitting empty when
 * NEXT_PUBLIC_PHONE is unset.
 */
const COMPANY_CONTACT = {
  address: '5th Floor, Amore Building, Junction of 2nd & 4th Road, Khar, Mumbai – 400052, India',
  email: 'info@jetking.com',
  phone: '07666830000',
} as const;

/** Curated subset shown directly; the rest stay reachable via the "View all" link and sitemap. */
const FEATURED_COURSE_SLUGS = [
  'bca-cloud-cyber-security',
  'mca-cloud-cyber-security',
  'cloud-cyber-security-engineer',
  'ethical-hacking-specialist',
  'aws-solution-specialist',
  'data-analyst',
  'networking-essentials',
  'digital-marketing',
];

const FEATURED_CITY_SLUGS = [
  'mumbai',
  'delhi',
  'bengaluru',
  'pune',
  'hyderabad',
  'kolkata',
  'ahmedabad',
  'chandigarh',
];

const company = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Placements', href: '/placements' },
  { label: 'Franchise', href: '/franchise' },
  { label: 'Investors', href: '/investors' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Enquire', href: '/enquiry' },
] as const;

/**
 * Server component, rendered on every public route except the homepage (see
 * FooterChrome). The footer is a significant internal-linking surface for
 * SEO — the course and city links here are how crawl equity reaches those
 * pages — so it stays fully static and identical for every visitor.
 *
 * `bg-surface` follows the site's own light/dark toggle rather than forcing a
 * permanently dark panel, so the utilities below are the same ones used on
 * every other themed section. There is no separate dark-mode branch.
 */
export async function SiteFooter() {
  const [courses, cities] = await Promise.all([content.listCourses(), content.listCities()]);

  const featuredCourses = FEATURED_COURSE_SLUGS.map((slug) =>
    courses.find((c) => c.slug === slug),
  ).filter((c) => c !== undefined);

  const featuredCities = FEATURED_CITY_SLUGS.map((slug) =>
    cities.find((c) => c.slug === slug),
  ).filter((c) => c !== undefined);

  const phoneHref = siteConfig.phone || COMPANY_CONTACT.phone;
  const phoneLabel = siteConfig.phone || COMPANY_CONTACT.phone;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))] lg:gap-8">
          <div>
            <Image
              src="/brand/jetking-wordmark.png"
              alt={siteConfig.name}
              width={7789}
              height={2448}
              className="h-8 w-auto object-contain object-left"
            />
            <p className="mt-5 max-w-sm text-base text-foreground-secondary text-balance">
              {siteConfig.description}
            </p>

            <ul className="mt-6 space-y-3 text-sm text-foreground-secondary">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-foreground-muted" aria-hidden="true" />
                <span>{COMPANY_CONTACT.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-foreground-muted" aria-hidden="true" />
                <a href={`tel:${phoneHref}`} className="link-underline hover:text-foreground">
                  {phoneLabel}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-foreground-muted" aria-hidden="true" />
                <a
                  href={`mailto:${COMPANY_CONTACT.email}`}
                  className="link-underline hover:text-foreground"
                >
                  {COMPANY_CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

          <FooterNav label="Courses">
            {featuredCourses.map((course) => (
              <FooterLink key={course.slug} href={`/courses/${course.slug}`}>
                {course.shortTitle}
              </FooterLink>
            ))}
            <FooterLink href="/courses" emphasis>
              View all courses
            </FooterLink>
          </FooterNav>

          <FooterNav label="Centres">
            {featuredCities.map((city) => (
              <FooterLink key={city.slug} href={`/centres/${city.slug}`}>
                IT courses in {city.name}
              </FooterLink>
            ))}
            <FooterLink href="/centres" emphasis>
              View all centres
            </FooterLink>
          </FooterNav>

          <FooterNav label="Company">
            {company.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterNav>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-col gap-2 py-6 text-sm text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>India&rsquo;s No.1 Technology Training Institute</p>
        </div>
      </div>
    </footer>
  );
}

function FooterNav({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <nav aria-label={label}>
      <h2 className="label-mono">{label}</h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </nav>
  );
}

function FooterLink({
  href,
  children,
  emphasis,
}: {
  href: string;
  children: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <li>
      <Link
        href={href as never}
        className={
          emphasis
            ? 'link-underline text-sm font-bold text-foreground transition-colors hover:text-[var(--accent-ink)]'
            : 'link-underline text-sm text-foreground-secondary transition-colors hover:text-foreground'
        }
      >
        {children}
      </Link>
    </li>
  );
}
