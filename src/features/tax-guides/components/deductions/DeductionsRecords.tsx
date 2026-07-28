import { CheckCircle2, ShieldCheck } from 'lucide-react';

import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  DEDUCTIONS_RECORDS,
  DEDUCTIONS_SECTION_COPY,
} from '@/features/tax-guides/lib/taxDeductionsCreditsContent';

export default function DeductionsRecords() {
  return (
    <section aria-labelledby="records-to-keep">
      <TaxGuideArticleSectionHeading id="records-to-keep" number={7}>
        {DEDUCTIONS_SECTION_COPY.recordsTitle}
      </TaxGuideArticleSectionHeading>
      <ul className="mt-3 grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:grid-cols-2">
        {DEDUCTIONS_RECORDS.map((record) => (
          <li
            key={record}
            className="flex items-center gap-3 border-slate-200 border-b px-4 py-3 text-slate-700 text-sm sm:border-r sm:[&:nth-child(even)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-800" aria-hidden="true" />
            {record}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center gap-3 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-emerald-950">
        <ShieldCheck className="h-5 w-5 shrink-0" aria-hidden="true" />
        <p className="text-sm">{DEDUCTIONS_SECTION_COPY.recordsNotice}</p>
      </div>
    </section>
  );
}
