import { ArrowDown, Info } from 'lucide-react';

import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  DEDUCTION_CREDIT_COMPARISONS,
  DEDUCTIONS_SECTION_COPY,
} from '@/features/tax-guides/lib/taxDeductionsCreditsContent';

const toneClasses = {
  emerald: {
    border: 'border-emerald-300',
    icon: 'text-emerald-800',
    step: 'border-emerald-200 bg-emerald-50/50',
  },
  blue: {
    border: 'border-blue-300',
    icon: 'text-blue-800',
    step: 'border-blue-200 bg-blue-50/60',
  },
} as const;

export default function DeductionCreditComparison() {
  return (
    <section aria-labelledby="deduction-vs-tax-credit">
      <TaxGuideArticleSectionHeading id="deduction-vs-tax-credit" number={2}>
        {DEDUCTIONS_SECTION_COPY.comparisonTitle}
      </TaxGuideArticleSectionHeading>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {DEDUCTION_CREDIT_COMPARISONS.map((comparison) => {
          const Icon = comparison.icon;
          const tone = toneClasses[comparison.tone];

          return (
            <article
              key={comparison.id}
              className={`rounded-lg border-[1.5px] bg-white p-4 shadow-sm ${tone.border}`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`h-8 w-8 shrink-0 ${tone.icon}`} aria-hidden="true" />
                <div>
                  <h3 className="font-bold text-[#0b1736] text-base">{comparison.title}</h3>
                  <p className="mt-0.5 text-slate-700 text-sm leading-5">
                    {comparison.description}
                  </p>
                </div>
              </div>
              <div className="mx-auto mt-4 max-w-52">
                {comparison.steps.map((step, index) => (
                  <div key={step}>
                    <div
                      className={`rounded-md border px-3 py-2 text-center font-semibold text-[13px] text-slate-800 ${tone.step}`}
                    >
                      {step}
                    </div>
                    {index < comparison.steps.length - 1 ? (
                      <ArrowDown className={`mx-auto h-5 w-5 ${tone.icon}`} aria-hidden="true" />
                    ) : null}
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-lg border border-blue-300 bg-blue-50 px-4 py-2 text-blue-950">
        <Info className="h-5 w-5 shrink-0 text-blue-800" aria-hidden="true" />
        <p className="font-semibold text-sm">{DEDUCTIONS_SECTION_COPY.comparisonNotice}</p>
      </div>
    </section>
  );
}
