'use client';

import Image from 'next/image';
import type { Testimonial } from '@/lib/content/types';
import { Carousel } from '@/components/Carousel';

const AVATARS = [
  '/franchise/partner-avatar-2.png',
  '/franchise/partner-avatar-1.png',
  '/franchise/partner-avatar-3.png',
] as const;

const FALLBACK: Testimonial[] = [
  {
    id: 'fra-fallback-1',
    quote:
      'The brand opened doors with parents in our city that a standalone centre never would. Within 18 months we broke even and are now expanding.',
    name: 'Rohit Verma',
    role: 'Franchise Partner · Pune',
  },
  {
    id: 'fra-fallback-2',
    quote:
      "Jetking's end-to-end support — from centre setup to marketing — made the move from corporate life to education entrepreneurship smooth.",
    name: 'Priya Nair',
    role: 'Franchise Partner · Bengaluru',
  },
  {
    id: 'fra-fallback-3',
    quote:
      'The proven curriculum and placement partnerships gave us credibility from day one. Parents trust the Jetking name.',
    name: 'Amit Desai',
    role: 'Franchise Partner · Ahmedabad',
  },
];

export function FranchiseTestimonialSliderLight({
  testimonials,
}: {
  testimonials?: Testimonial[];
}) {
  const fromCms = (testimonials ?? []).filter(
    (t) => t.quote?.trim() && !/placeholder/i.test(t.name),
  );
  const items = fromCms.length ? fromCms : FALLBACK;

  return (
    <Carousel
      items={items}
      label="Partner stories"
      itemKey={(item) => item.id}
      itemLabel={(item) => `${item.name}, ${item.role}`}
      classNames={{ viewport: 'rounded-[24px]' }}
    >
      {(item, i) => (
        <blockquote className="stu-quote p-6 text-white sm:p-7">
          <span
            aria-hidden="true"
            className="font-display text-[56px] leading-none font-extrabold text-white/30"
          >
            &ldquo;
          </span>
          <p className="-mt-5 text-[15.5px] leading-relaxed font-medium sm:text-[16.5px]">
            {item.quote}
          </p>
          <footer className="mt-6 flex items-center gap-3">
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white/40">
              <Image
                src={AVATARS[i % AVATARS.length] ?? AVATARS[0]}
                alt=""
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>
            <cite className="not-italic">
              <span className="block text-[14.5px] font-bold">{item.name}</span>
              <span className="mt-0.5 block text-[13px] text-white">{item.role}</span>
            </cite>
          </footer>
        </blockquote>
      )}
    </Carousel>
  );
}
