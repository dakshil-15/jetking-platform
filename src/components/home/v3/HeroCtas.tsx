'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight, Phone } from 'lucide-react';
import { EnquiryModal, type EnquiryCentre } from '@/components/EnquiryModal';
import { track } from '@/lib/analytics';

export function HeroCtas({ centres }: { centres: EnquiryCentre[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Link
          href={'/courses' as Route}
          className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-jk-600 px-6 py-3 text-[15px] font-bold text-white shadow-[0_10px_24px_rgb(199_20_28/0.28)] transition-colors hover:bg-jk-700"
        >
          Explore Courses
          <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={() => {
            track('enquiry_started', { surface: 'home-hero-modal' });
            setOpen(true);
          }}
          aria-haspopup="dialog"
          className="inline-flex min-h-12 cursor-pointer items-center gap-2.5 rounded-full border-2 border-jk-600 bg-background px-6 py-3 text-[15px] font-bold text-foreground transition-colors hover:bg-surface"
        >
          <Phone className="h-4 w-4 text-[var(--accent-ink)]" strokeWidth={2} aria-hidden="true" />
          Enquire Now
        </button>
      </div>
      <EnquiryModal open={open} onClose={() => setOpen(false)} centres={centres} source="home-hero-modal" />
    </>
  );
}
