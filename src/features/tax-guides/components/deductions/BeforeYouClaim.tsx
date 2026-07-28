import { Lightbulb } from 'lucide-react';

import { DEDUCTIONS_SECTION_COPY } from '@/features/tax-guides/lib/taxDeductionsCreditsContent';

export default function BeforeYouClaim() {
  return (
    <section className="rounded-xl border-[#b8c8c1] border-[1.5px] bg-white px-5 py-4 shadow-sm sm:px-6">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-white">
          <Lightbulb className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-bold text-[#0b1736] text-xl">
            <span aria-hidden="true">1. </span>
            {DEDUCTIONS_SECTION_COPY.beforeClaimTitle}
          </h2>
          <p className="mt-1 text-slate-700 text-sm leading-6 sm:text-[15px]">
            {DEDUCTIONS_SECTION_COPY.beforeClaimDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
