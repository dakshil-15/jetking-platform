'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { useEffect, useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import { track } from '@/lib/analytics';
import { usePersona } from '@/persona/PersonaProvider';

/**
 * "Watch how Jetking shapes careers" — shared by both leads.
 *
 * With a video configured on the default homepage variant it opens that video in a
 * native `<dialog>`: modal semantics, Esc-to-close and focus trapping come from the
 * element rather than from a hand-rolled overlay. With no video it degrades to a
 * link to /placements, keeping the affordance real instead of rendering a play
 * button that plays nothing.
 *
 * The two leads present it differently — v1 as a white pill, v2 as a bare circle
 * beside its label — so `variant` picks the shell. The dialog, the fallback and the
 * analytics are identical, which is why this is one component and not two.
 */
export function WatchVideo({
  video,
  variant = 'pill',
}: {
  video?: { title: string; src: string };
  variant?: 'pill' | 'inline';
}) {
  const { classification } = usePersona();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const face =
    variant === 'pill' ? (
      <>
        <span
          aria-hidden="true"
          className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-[var(--v1-ink)] text-[var(--v1-card)]"
        >
          <Play className="h-4 w-4 fill-current" strokeWidth={0} />
        </span>
        <span className="text-left text-[14.5px] leading-tight font-bold text-[var(--v1-ink)]">
          Watch how Jetking
          <br />
          shapes careers
        </span>
      </>
    ) : (
      <>
        <span
          aria-hidden="true"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--v2-accent,#e8242b)] text-white v2-play-glow transition-shadow duration-200 ease-[var(--ease-out-soft)] group-hover/watch:shadow-[0_0_40px_rgb(232_36_43/0.75)]"
        >
          <Play className="h-4 w-4 fill-current" strokeWidth={0} />
        </span>
        <span className="text-left text-[14.5px] leading-snug font-semibold text-[var(--v2-ink-secondary,#3a3a46)]">
          Watch how Jetking
          <br />
          shapes careers
        </span>
      </>
    );

  const shell =
    variant === 'pill'
      ? 'group/watch inline-flex min-h-12 cursor-pointer items-center gap-3.5 rounded-full bg-[var(--v1-card)] py-2.5 pr-6 pl-2.5 shadow-[var(--v1-shadow-float)] transition-shadow duration-200 ease-[var(--ease-out-soft)] hover:shadow-[var(--v1-shadow-card-hover)]'
      : 'group/watch inline-flex min-h-12 cursor-pointer items-center gap-4 text-left';

  return (
    <>
      {video ? (
        <button
          type="button"
          className={shell}
          onClick={() => {
            setOpen(true);
            track('video_played', { title: video.title, persona: classification.persona });
          }}
        >
          {face}
        </button>
      ) : (
        <Link href={'/placements' as Route} className={shell}>
          {face}
        </Link>
      )}

      {video ? (
        <dialog
          ref={dialogRef}
          onClose={() => setOpen(false)}
          aria-label={video.title}
          className="m-auto w-[min(920px,92vw)] rounded-[var(--radius-dialog)] bg-transparent p-0 backdrop:bg-black/60"
        >
          <div className="relative overflow-hidden rounded-[var(--radius-dialog)] bg-black">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute top-3 right-3 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
            >
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </button>
            {open ? (
              <iframe
                title={video.title}
                src={video.src}
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : null}
          </div>
        </dialog>
      ) : null}
    </>
  );
}
