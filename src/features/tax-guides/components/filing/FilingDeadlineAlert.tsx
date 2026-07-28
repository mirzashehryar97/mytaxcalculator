import { ExternalLink } from 'lucide-react';

import {
  FILING_DUE_DATES_SOURCE,
  FILING_SECTION_COPY,
} from '@/features/tax-guides/lib/filingTaxReturnContent';

export default function FilingDeadlineAlert() {
  return (
    <section
      aria-labelledby="income-tax-return-deadlines"
      className="scroll-mt-24 rounded-lg border border-amber-400 bg-amber-50/60 px-4 py-4 sm:px-5"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-600 font-bold text-base text-white">
          1
        </span>
        <div>
          <h2
            id="income-tax-return-deadlines"
            className="font-bold text-amber-900 text-lg leading-6"
          >
            {FILING_SECTION_COPY.deadlineTitle}
          </h2>
          <p className="mt-1 text-slate-700 text-sm leading-6 sm:text-[15px]">
            {FILING_SECTION_COPY.deadlineDescription}
          </p>
          <a
            href={FILING_DUE_DATES_SOURCE.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 font-semibold text-amber-900 text-sm hover:underline"
          >
            {FILING_DUE_DATES_SOURCE.label}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
