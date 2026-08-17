import Link from 'next/link';
import { content } from '@/lib/content';
import { siteConfig } from '@/lib/site';

/**
 * Server component. The footer is a significant internal-linking surface for SEO —
 * the city links here are how crawl equity reaches the city pages, so it stays fully
 * static and identical for every visitor. It is omitted on `/` and `/v2` (see
 * SiteChrome) so those leads match the design mocks.
 *
 * `.surface-inverse` re-points the colour tokens, so the utilities below are the
 * same ones used on light sections. There is no dark-mode branch.
 */
export async function SiteFooter() {
  const [courses, cities] = await Promise.all([content.listCourses(), content.listCities()]);

  const company = [
    { label: 'Placements', href: '/placements' },
    { label: 'Blog', href: '/blog' },
    { label: 'Franchise', href: '/franchise' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Enquire', href: '/enquiry' },
  ] as const;

  return (
    <footer className="surface-inverse">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))] lg:gap-8">
          <div>
            <span
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center rounded-[0.6rem] bg-jk-600 font-display text-sm font-extrabold tracking-tight text-white"
            >
              Jk
            </span>
            <p className="mt-5 max-w-xs text-base text-foreground-secondary text-balance">
              {siteConfig.tagline}
            </p>
          </div>

          <FooterNav label="Courses">
            {courses.map((course) => (
              <FooterLink key={course.slug} href={`/courses/${course.slug}`}>
                {course.shortTitle}
              </FooterLink>
            ))}
          </FooterNav>

          <FooterNav label="Centres">
            {cities.map((city) => (
              <FooterLink key={city.slug} href={`/centres/${city.slug}`}>
                IT courses in {city.name}
              </FooterLink>
            ))}
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
          <p className="label-mono">
            Placeholder content — pending Jetking data and CMS migration
          </p>
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

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href as never}
        className="link-underline text-sm text-foreground-secondary transition-colors hover:text-foreground"
      >
        {children}
      </Link>
    </li>
  );
}
