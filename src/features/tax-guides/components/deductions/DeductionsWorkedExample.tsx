import { ArrowDown, Info } from 'lucide-react';

import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  DEDUCTIONS_SECTION_COPY,
  DEDUCTIONS_WORKED_EXAMPLE,
} from '@/features/tax-guides/lib/taxDeductionsCreditsContent';

export default function DeductionsWorkedExample() {
  return (
    <section aria-labelledby="worked-example">
      <TaxGuideArticleSectionHeading id="worked-example" number={6}>
        {DEDUCTIONS_SECTION_COPY.exampleTitle}
      </TaxGuideArticleSectionHeading>
      <div className="mt-3 grid gap-5 rounded-lg border-[1.5px] border-blue-300 bg-blue-50/50 p-5 sm:grid-cols-[minmax(0,1fr)_220px] sm:items-center">
        <div>
          {DEDUCTIONS_WORKED_EXAMPLE.map((row, index) => {
            const Icon = row.icon;

            return (
              <div key={row.id}>
                <div className="grid grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-3 py-1.5 text-sm">
                  <Icon className="h-5 w-5 text-emerald-800" aria-hidden="true" />
                  <span className="font-semibold text-[#0b1736]">{row.label}:</span>
                  <span className="font-bold text-[#0b1736]">{row.value}</span>
                </div>
                {index < DEDUCTIONS_WORKED_EXAMPLE.length - 1 ? (
                  <ArrowDown className="ml-0.5 h-5 w-5 text-emerald-800" aria-hidden="true" />
                ) : null}
              </div>
            );
          })}
          <div className="mt-1 grid grid-cols-[24px_minmax(0,1fr)] gap-3 text-sm">
            <ArrowDown className="h-5 w-5 text-emerald-800" aria-hidden="true" />
            <p className="font-semibold text-[#0b1736]">
              {DEDUCTIONS_SECTION_COPY.exampleCreditLabel}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-blue-400 border-dashed bg-white/70 p-4 text-blue-950">
          <Info className="h-6 w-6 shrink-0 text-blue-800" aria-hidden="true" />
          <p className="text-xs leading-5">{DEDUCTIONS_SECTION_COPY.exampleNotice}</p>
        </div>
      </div>
    </section>
  );
}
