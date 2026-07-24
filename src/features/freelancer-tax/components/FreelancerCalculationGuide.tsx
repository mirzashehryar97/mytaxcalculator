import { Calculator } from 'lucide-react';

import { FREELANCER_GUIDE_COPY } from '@/features/freelancer-tax/lib/content';

export default function FreelancerCalculationGuide() {
  return (
    <section
      className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50/95 p-5 shadow-emerald-950/10 shadow-lg sm:p-8"
      aria-labelledby="freelancer-calculation-guide-heading"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
          <Calculator className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2
            id="freelancer-calculation-guide-heading"
            className="font-bold text-emerald-950 text-xl tracking-tight sm:text-2xl"
          >
            {FREELANCER_GUIDE_COPY.calculationTitle}
          </h2>
          <p className="mt-3 text-emerald-950/75 leading-relaxed">
            {FREELANCER_GUIDE_COPY.calculationDescription}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-emerald-200 bg-white/80 p-5">
          <p className="font-semibold text-emerald-800 text-sm uppercase tracking-wide">
            {FREELANCER_GUIDE_COPY.formulaLabel}
          </p>
          <p className="mt-2 font-bold text-gray-900 text-lg">{FREELANCER_GUIDE_COPY.formula}</p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-white/80 p-5">
          <h3 className="font-bold text-emerald-900 text-lg">
            {FREELANCER_GUIDE_COPY.exampleTitle}
          </h3>
          <p className="mt-2 text-gray-700 text-sm leading-relaxed">
            {FREELANCER_GUIDE_COPY.exampleBody}
          </p>
          <p className="mt-3 text-gray-500 text-xs leading-relaxed">
            {FREELANCER_GUIDE_COPY.exchangeRateCaveat}
          </p>
        </div>
      </div>
    </section>
  );
}
