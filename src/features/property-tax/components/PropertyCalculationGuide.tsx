import { Calculator } from 'lucide-react';

import { PROPERTY_CALCULATION_GUIDE } from '@/features/property-tax/lib/content';

interface PropertyCalculationGuideProps {
  mode: 'purchase' | 'sale';
}

/**
 * Worked example for the transfer calculators. Both modes turn on the same
 * "higher of the two values" rule, so each shows it with its own rate and its
 * own framing rather than the pages sharing one explainer.
 */
export default function PropertyCalculationGuide({ mode }: PropertyCalculationGuideProps) {
  const guide = PROPERTY_CALCULATION_GUIDE[mode];

  return (
    <section
      className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50/95 p-5 shadow-emerald-950/10 shadow-lg sm:p-8"
      aria-labelledby="property-calculation-guide-heading"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
          <Calculator className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2
            id="property-calculation-guide-heading"
            className="font-bold text-emerald-950 text-xl tracking-tight sm:text-2xl"
          >
            {guide.title}
          </h2>
          <p className="mt-3 text-emerald-950/75 leading-relaxed">{guide.description}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="min-w-0 rounded-2xl border border-emerald-200 bg-white/80 p-5">
          <p className="font-semibold text-emerald-800 text-sm uppercase tracking-wide">
            {guide.formulaLabel}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="font-bold text-gray-900 text-lg">Tax</span>
            <span className="font-medium text-emerald-600 text-lg">=</span>
            {guide.formulaTerms.map((term, index) => (
              <span className="inline-flex items-center gap-2" key={term.id}>
                {index > 0 && <span className="font-medium text-emerald-600 text-lg">×</span>}
                <span className="rounded-lg bg-emerald-50 px-2.5 py-1 font-medium text-emerald-900 text-sm ring-1 ring-emerald-200">
                  {term.text}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-emerald-200 bg-white/80 p-5">
          <h3 className="font-bold text-emerald-900 text-lg">Worked example (2026-27)</h3>
          <p className="mt-2 text-gray-600 text-sm leading-relaxed">{guide.exampleIntro}</p>
          <dl className="mt-4 space-y-2 text-sm">
            {guide.exampleRows.map((row) => (
              <div className="flex items-baseline justify-between gap-4" key={row.id}>
                <dt className="text-gray-600">{row.label}</dt>
                <dd className="shrink-0 font-medium text-gray-900 tabular-nums">{row.value}</dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-4 border-emerald-100 border-t pt-2">
              <dt className="font-semibold text-gray-900">{guide.totalLabel}</dt>
              <dd className="shrink-0 font-bold text-lg text-red-600 tabular-nums">
                {guide.totalValue}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-gray-600">{guide.compareLabel}</dt>
              <dd className="shrink-0 font-medium text-red-600 tabular-nums">
                {guide.compareValue}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
