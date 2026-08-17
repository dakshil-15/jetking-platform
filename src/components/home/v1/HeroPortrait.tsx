import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

/**
 * The tilted portrait in the homepage lead.
 *
 * The source design fills this from a fillable image slot. Here the source is
 * resolved in `loadHomeData` — the CMS variant's `banner.imageUrl` first, then a
 * file dropped at `public/home/hero.<ext>`. With neither present it renders a
 * labelled frame rather than a broken `<img>` or a stock photo of somebody who has
 * never been to a Jetking centre: design-system MASTER.md asks for real
 * photography, and a placeholder that says so is the honest interim.
 */
export function HeroPortrait({ src, alt }: { src?: string; alt?: string }) {
  return (
    <div className="v1-portrait relative aspect-4/5 w-full max-w-[420px] overflow-hidden rounded-[28px] xs:rounded-[32px] sm:rounded-[40px] lg:aspect-auto lg:h-[520px] lg:max-w-none lg:rounded-[56px_56px_22px_22px] xl:h-[600px] xl:rounded-[68px_68px_26px_26px] 2xl:h-[700px] 3xl:h-[760px] 4xl:h-[820px]">
      {src ? (
        <Image
          src={src}
          alt={alt ?? 'Jetking learners at a centre'}
          fill
          priority
          sizes="(min-width: 2560px) 360px, (min-width: 1920px) 340px, (min-width: 1536px) 318px, (min-width: 1280px) 290px, (min-width: 1024px) 260px, (min-width: 640px) 420px, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="grid h-full w-full place-items-center bg-[linear-gradient(160deg,#e9e4f4_0%,#f6eef0_55%,#fbe6e7_100%)]">
          <div className="px-8 text-center">
            <ImageIcon
              className="mx-auto h-8 w-8 text-[rgb(120_110_150)]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="mt-4 text-sm font-semibold text-[var(--v1-ink-secondary)]">
              Centre photography
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--v1-ink-muted)]">
              Drop a photo at <code className="font-mono text-[12px]">public/home/hero.jpg</code>{' '}
              to fill this frame.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
