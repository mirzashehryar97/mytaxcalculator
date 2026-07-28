import Link from 'next/link';

import { ArrowRight, ExternalLink } from 'lucide-react';

import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  UNDERSTANDING_RECORD_LINKS,
  UNDERSTANDING_SECTION_COPY,
} from '@/features/tax-guides/lib/understandingTaxSystemContent';

export default function DeadlinesAndRecords() {
  return (
    <section aria-labelledby="deadlines-records">
      <TaxGuideArticleSectionHeading id="deadlines-records" number={7}>
        {UNDERSTANDING_SECTION_COPY.recordsTitle}
      </TaxGuideArticleSectionHeading>
      <p className="mt-2 text-slate-700 text-sm leading-6 sm:text-[15px]">
        {UNDERSTANDING_SECTION_COPY.recordsDescription}
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <Link
          href={UNDERSTANDING_RECORD_LINKS.filingGuide}
          className="inline-flex min-h-10 items-center gap-2 rounded-md bg-emerald-800 px-4 font-semibold text-sm text-white transition hover:bg-emerald-900"
        >
          {UNDERSTANDING_SECTION_COPY.filingGuideLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <a
          href={UNDERSTANDING_RECORD_LINKS.dueDates}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center gap-2 rounded-md border border-emerald-800 bg-white px-4 font-semibold text-emerald-900 text-sm transition hover:bg-emerald-50"
        >
          {UNDERSTANDING_SECTION_COPY.dueDatesLabel}
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
