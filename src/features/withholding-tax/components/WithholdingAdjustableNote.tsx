import Link from 'next/link';

import { ArrowRight, ShieldCheck } from 'lucide-react';

import { WITHHOLDING_ADJUSTABLE_COPY } from '@/features/withholding-tax/lib/content';

/**
 * The point every one of these deductions turns on: the money counts towards
 * your income tax, but only a person who files ever sees it again.
 */
export default function WithholdingAdjustableNote() {
  return (
    <section className="mt-6 rounded-3xl border border-blue-200 bg-blue-50 p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 ring-1 ring-blue-200">
          <ShieldCheck className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2 className="font-bold text-blue-950 text-lg">{WITHHOLDING_ADJUSTABLE_COPY.title}</h2>
          <p className="mt-2 text-blue-950/80 text-sm leading-relaxed">
            {WITHHOLDING_ADJUSTABLE_COPY.body}
          </p>
          <Link
            href={WITHHOLDING_ADJUSTABLE_COPY.ctaHref}
            className="mt-3 inline-flex items-center gap-1.5 font-semibold text-blue-700 text-sm hover:text-blue-900"
          >
            {WITHHOLDING_ADJUSTABLE_COPY.ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
