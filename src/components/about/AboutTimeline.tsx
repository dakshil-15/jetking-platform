'use client';

import { useEffect, useRef } from 'react';
import { TIMELINE } from './data';

/**
 * Legacy timeline — alternating curved-branch design (styles in about.css),
 * animated with GSAP ScrollTrigger:
 *
 *   • the bright spine fill is SCRUBBED to scroll — it draws down the timeline as
 *     you move the page, connecting node to node;
 *   • each milestone's node pops in, its branch fades, and the card slides in from
 *     the spine as it enters view;
 *   • a node lights up (`is-active`) once the fill line has reached it.
 *
 * GSAP is dynamically imported off the critical path, the whole effect is a
 * no-op under `prefers-reduced-motion`, and content ships visible in the
 * server HTML — nothing is hidden until GSAP has loaded, so a script failure
 * leaves the timeline intact.
 */
export function AboutTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let disposed = false;
    let cleanup = () => {};

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Spine fill follows the scroll position through the whole timeline.
        const progress = root.querySelector<HTMLElement>('.about-tl-progress');
        if (progress) {
          gsap.fromTo(
            progress,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: root,
                start: 'top 62%',
                end: 'bottom 75%',
                scrub: 0.6,
              },
            },
          );
        }

        // Per-milestone reveal — number counts up, data slides in — as it enters.
        const items = gsap.utils.toArray<HTMLElement>('.about-tl-item');
        items.forEach((item) => {
          const node = item.querySelector<HTMLElement>('.about-tl-node');
          const elbow = item.querySelector('.about-tl-elbow');
          const card = item.querySelector('.about-tl-card');
          const yearEl = node?.querySelector<HTMLElement>('b') ?? null;
          const target = yearEl ? parseInt(yearEl.textContent ?? '', 10) : NaN;
          const base = Number.isFinite(target) ? Math.max(0, target - 18) : 0;
          const fromX = item.classList.contains('is-l') ? 24 : -24;

          gsap.set(node, { scale: 0.5, opacity: 0 });
          gsap.set(elbow, { opacity: 0 });
          gsap.set(card, { opacity: 0, x: fromX });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
              // Play on the way down, reverse on the way back up — so the reveal and
              // the count-up run in both scroll directions and replay on re-entry.
              toggleActions: 'play none none reverse',
            },
            // Reset to the base value each time the reveal begins, so before scroll the
            // real year stands in the server HTML (safe if GSAP never runs).
            onStart: () => {
              if (yearEl && Number.isFinite(target)) yearEl.textContent = String(base);
            },
          });
          tl.to(node, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.7)' }, 0)
            .to(card, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, 0.2)
            .to(elbow, { opacity: 1, duration: 0.3 }, 0.25);

          // The year rolls up to its value as the node appears.
          if (yearEl && Number.isFinite(target)) {
            const counter = { v: base };
            tl.to(
              counter,
              {
                v: target,
                duration: 0.7,
                ease: 'power2.out',
                snap: { v: 1 },
                onUpdate: () => {
                  yearEl.textContent = String(Math.round(counter.v));
                },
              },
              0.05,
            );
          }

          // Light the node once the fill line reaches it; unlight on the way back up.
          if (node) {
            ScrollTrigger.create({
              trigger: node,
              start: 'center 58%',
              onEnter: () => item.classList.add('is-active'),
              onLeaveBack: () => item.classList.remove('is-active'),
            });
          }
        });

        // Positions were measured at hydration; recompute once layout settles.
        ScrollTrigger.refresh();
      }, root);

      cleanup = () => ctx.revert();
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={rootRef} className="about-tl mt-10 sm:mt-12">
      <span className="about-tl-cap is-top" aria-hidden="true" />
      <span className="about-tl-progress" aria-hidden="true" />
      <ol>
        {TIMELINE.map((item, index) => (
          <li
            key={`${item.year}-${item.title}`}
            className={`about-tl-item ${index % 2 === 0 ? 'is-r' : 'is-l'}`}
          >
            <span className="about-tl-node">
              <b className="numeral">{item.year}</b>
            </span>
            <span className="about-tl-elbow" aria-hidden="true" />
            <div className="about-tl-card">
              <h3>{item.title}</h3>
              {item.body ? <p>{item.body}</p> : null}
            </div>
          </li>
        ))}
      </ol>
      <span className="about-tl-cap is-bot" aria-hidden="true" />
    </div>
  );
}
