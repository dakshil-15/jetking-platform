'use client';

import Image from 'next/image';
import { Carousel } from '@/components/Carousel';
import { HIRING_PARTNERS, SUCCESS_STORIES } from './data';

export function ProfessionalSocialProof() {
  return (
    <section className="bg-[var(--pro-surface)] py-10 sm:py-12 lg:py-14" aria-labelledby="pro-stories-heading">
      <div className="shell">
        <div className="pro-why overflow-hidden rounded-[28px] px-6 py-10 xs:rounded-[32px] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div>
              <p className="text-[13px] font-bold tracking-[0.06em] text-[var(--pro-accent-soft)] uppercase">
                Success stories
              </p>
              <h2
                id="pro-stories-heading"
                className="mt-2 font-display text-[26px] font-extrabold tracking-[-0.02em] text-white xs:text-[28px] sm:text-[32px]"
              >
                Real career transitions
              </h2>
              <p className="mt-2 text-[14px] text-[var(--pro-ink-secondary)] sm:text-[15px]">
                Working professionals like you who upskilled without quitting their day job.
              </p>

              <Carousel
                items={SUCCESS_STORIES}
                label="Success stories"
                className="mt-6 sm:mt-8"
                itemKey={(story) => story.id}
                itemLabel={(story) => `${story.name}, ${story.from} to ${story.to}`}
                classNames={{
                  viewport: 'rounded-[24px]',
                  dotActive: 'bg-[var(--pro-accent-soft)]',
                  dotIdle: 'bg-white/25',
                  button:
                    'border-white/20 bg-white/10 text-white transition-colors hover:border-[var(--pro-accent-soft)] hover:text-[var(--pro-accent-soft)]',
                }}
              >
                {(story) => (
                  <article className="pro-quote p-6 text-white sm:p-7">
                    <p className="text-[12px] font-bold tracking-[0.06em] text-white/70 uppercase">
                      From {story.from} to {story.to}
                    </p>
                    <span
                      aria-hidden="true"
                      className="mt-4 block font-display text-[56px] leading-none font-extrabold text-white/30"
                    >
                      &ldquo;
                    </span>
                    <p className="-mt-5 text-[15.5px] leading-relaxed font-medium sm:text-[16.5px]">
                      {story.quote}
                    </p>
                    <footer className="mt-6 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white/40">
                          <Image
                            src={story.avatar}
                            alt=""
                            fill
                            sizes="48px"
                            className="object-cover object-top"
                          />
                        </span>
                        <cite className="not-italic">
                          <span className="block text-[14.5px] font-bold">{story.name}</span>
                          <span className="mt-0.5 block text-[13px] text-white/85">
                            {story.from} → {story.to}
                          </span>
                        </cite>
                      </div>
                      <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-[12px] font-extrabold text-jk-600">
                        {story.hike} Salary Hike
                      </span>
                    </footer>
                  </article>
                )}
              </Carousel>
            </div>

            <div>
              <h3 className="font-display text-[20px] font-extrabold tracking-[-0.02em] text-white sm:text-[22px]">
                Our Hiring Partners
              </h3>
              <p className="mt-2 text-[14px] text-[var(--pro-ink-secondary)]">
                Illustrative partners — introductions vary by centre and programme.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-3 xs:grid-cols-3 sm:gap-4">
                {HIRING_PARTNERS.map((partner) => (
                  <li key={partner}>
                    <div className="pro-card pro-partner-logo flex h-14 items-center justify-center rounded-[14px] px-3 sm:h-16">
                      <span className="text-[13px] font-extrabold tracking-[0.04em] text-[var(--pro-ink)] uppercase sm:text-[14px]">
                        {partner}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
