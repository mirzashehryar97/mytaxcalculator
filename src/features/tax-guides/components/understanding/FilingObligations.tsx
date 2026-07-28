import { CheckCircle2 } from 'lucide-react';

import TaxGuideArticleNotice from '@/features/tax-guides/components/article/TaxGuideArticleNotice';
import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  TAX_FILING_CHECKS,
  UNDERSTANDING_SECTION_COPY,
} from '@/features/tax-guides/lib/understandingTaxSystemContent';

export default function FilingObligations() {
  return (
    <section aria-labelledby="who-must-file">
      <TaxGuideArticleSectionHeading id="who-must-file" number={6}>
        {UNDERSTANDING_SECTION_COPY.filingTitle}
      </TaxGuideArticleSectionHeading>
      <p className="mt-1 text-slate-600 text-sm">{UNDERSTANDING_SECTION_COPY.filingDescription}</p>
      <ul className="mt-3 grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:grid-cols-2 md:grid-cols-5">
        {TAX_FILING_CHECKS.map((item) => (
          <li
            key={item.id}
            className="flex gap-2 border-slate-200 border-b p-3 text-[13px] text-slate-700 leading-5 last:border-b-0 sm:border-r md:border-b-0 md:last:border-r-0 sm:[&:nth-child(even)]:border-r-0 md:[&:nth-child(even)]:border-r"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-800" aria-hidden="true" />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <TaxGuideArticleNotice>{UNDERSTANDING_SECTION_COPY.filingNotice}</TaxGuideArticleNotice>
      </div>
    </section>
  );
}
