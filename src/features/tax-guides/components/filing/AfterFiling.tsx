import { ArrowRight, ShieldCheck } from 'lucide-react';

import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  AFTER_FILING_STEPS,
  FILING_SECTION_COPY,
} from '@/features/tax-guides/lib/filingTaxReturnContent';

export default function AfterFiling() {
  return (
    <section aria-labelledby="after-filing">
      <TaxGuideArticleSectionHeading id="after-filing" number={9}>
        {FILING_SECTION_COPY.afterFilingTitle}
      </TaxGuideArticleSectionHeading>
      <ol className="mt-4 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {AFTER_FILING_STEPS.map((step, index) => {
          const Icon = step.icon;

          return (
            <li
              key={step.id}
              className="relative rounded-lg border border-slate-300 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-800 font-bold text-white text-xs">
                  {step.number}
                </span>
                <Icon className="h-7 w-7 shrink-0 text-emerald-800" aria-hidden="true" />
                <div className="min-w-0">
                  <h3 className="break-words font-bold text-[#0b1736] text-sm leading-5">
                    {step.title}
                  </h3>
                  <p className="mt-1 break-words text-[13px] text-slate-600 leading-5">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < AFTER_FILING_STEPS.length - 1 ? (
                <ArrowRight
                  className="-right-3 -translate-y-1/2 absolute top-1/2 z-10 hidden h-5 w-5 rounded-full bg-[#fbfcfb] text-emerald-800 2xl:block"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
      <div className="mt-3 flex items-center gap-3 rounded-md border border-emerald-400 bg-emerald-50/60 px-4 py-3 text-emerald-950 text-sm">
        <ShieldCheck className="h-5 w-5 shrink-0" aria-hidden="true" />
        {FILING_SECTION_COPY.recordsNotice}
      </div>
    </section>
  );
}
