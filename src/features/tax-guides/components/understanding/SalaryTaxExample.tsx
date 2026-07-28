import { ArrowDown } from 'lucide-react';

import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import { SALARY_TAX_EXAMPLE } from '@/features/tax-guides/lib/understandingTaxSystemContent';

export default function SalaryTaxExample() {
  return (
    <section className="rounded-lg border-[1.5px] border-emerald-700 bg-emerald-50/35 p-3 shadow-sm">
      <TaxGuideArticleSectionHeading id="salary-tax-example" number={5}>
        {SALARY_TAX_EXAMPLE.title}
      </TaxGuideArticleSectionHeading>
      <p className="mt-1 text-[13px] text-slate-600 leading-5">{SALARY_TAX_EXAMPLE.description}</p>
      <ol className="mt-3 space-y-2">
        {SALARY_TAX_EXAMPLE.steps.map((step, index) => (
          <li key={step.id} className="relative flex gap-3">
            <div className="flex w-8 shrink-0 flex-col items-center">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-800 font-bold text-white text-xs">
                {index + 1}
              </span>
              {index < SALARY_TAX_EXAMPLE.steps.length - 1 ? (
                <ArrowDown className="mt-1 h-4 w-4 text-emerald-800" aria-hidden="true" />
              ) : null}
            </div>
            <div className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 py-2">
              <p className="font-bold text-[#0b1736] text-sm">{step.title}</p>
              <p
                className={`mt-0.5 text-[13px] ${
                  step.id === 'total' ? 'font-bold text-emerald-800' : 'text-slate-600'
                }`}
              >
                Tax = {step.value}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
