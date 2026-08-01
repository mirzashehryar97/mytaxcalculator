import { Mail } from 'lucide-react';

import EmeraldGridOverlay from '@/components/ui/EmeraldGridOverlay';
import type { PolicyContactCopy } from '@/components/ui/policy/types';

interface PolicyContactProps {
  headingId: string;
  copy: PolicyContactCopy;
}

export default function PolicyContact({ headingId, copy }: PolicyContactProps) {
  return (
    <section className="relative overflow-hidden bg-[#064e3b]" aria-labelledby={headingId}>
      <EmeraldGridOverlay />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-10 lg:px-12 lg:py-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-bold text-emerald-300 text-xs uppercase tracking-[0.16em]">
              {copy.eyebrow}
            </p>
            <h2 id={headingId} className="mt-3 font-bold text-2xl text-white sm:text-3xl">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-2xl text-emerald-50/85 leading-relaxed">{copy.description}</p>
          </div>

          <a
            href={`mailto:${copy.email}`}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-white px-7 py-3.5 font-semibold text-emerald-800 shadow-emerald-950/20 shadow-lg transition-colors hover:bg-emerald-50 lg:self-auto"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
            {copy.buttonLabel}
          </a>
        </div>

        <p className="mt-8 border-white/10 border-t pt-5 text-emerald-100/65 text-xs leading-relaxed">
          {copy.note}
        </p>
      </div>
    </section>
  );
}
