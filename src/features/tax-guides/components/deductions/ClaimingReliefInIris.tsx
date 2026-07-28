import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  CLAIMING_RELIEF_STEPS,
  DEDUCTIONS_SECTION_COPY,
} from '@/features/tax-guides/lib/taxDeductionsCreditsContent';

export default function ClaimingReliefInIris() {
  return (
    <section aria-labelledby="claiming-relief-in-iris">
      <TaxGuideArticleSectionHeading id="claiming-relief-in-iris" number={8}>
        {DEDUCTIONS_SECTION_COPY.irisTitle}
      </TaxGuideArticleSectionHeading>
      <ol className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {CLAIMING_RELIEF_STEPS.map((step, index) => {
          const Icon = step.icon;

          return (
            <li
              key={step.id}
              className="relative flex min-h-32 items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:min-h-36 xl:min-h-40"
            >
              <span className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 font-bold text-sm text-white">
                {step.number}
              </span>
              <Icon className="mt-5 h-10 w-10 shrink-0 text-emerald-800" aria-hidden="true" />
              <p className="pt-5 font-semibold text-[#0b1736] text-sm leading-5">{step.title}</p>
              {index < CLAIMING_RELIEF_STEPS.length - 1 ? (
                <ArrowRight
                  className="-right-4 absolute z-10 hidden h-5 w-5 rounded-full bg-[#fbfcfb] text-emerald-800 xl:block"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
      <Link
        href="/tax-guides/filing-tax-return"
        className="mt-5 inline-flex min-h-12 items-center gap-3 rounded-md bg-emerald-800 px-6 py-2.5 font-semibold text-base text-white transition hover:bg-emerald-900"
      >
        {DEDUCTIONS_SECTION_COPY.filingGuideLabel}
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </Link>
    </section>
  );
}
