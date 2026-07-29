import { Info, PiggyBank } from 'lucide-react';

import InfoTooltip from '@/components/ui/InfoTooltip';

import { RENTAL_RESULT_COPY, RENTAL_TERMS } from '@/features/rental-income-tax/lib/content';
import { formatPkr } from '@/features/rental-income-tax/lib/formatting';
import type { RentalTaxResult } from '@/features/rental-income-tax/types';

interface RentalFilerComparisonProps {
  result: RentalTaxResult;
}

/** Side-by-side of what the same rent costs a filer and a non-filer. */
export default function RentalFilerComparison({ result }: RentalFilerComparisonProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className="flex items-center gap-1.5">
          <h3 className="font-semibold text-gray-900 text-sm">
            {RENTAL_RESULT_COPY.comparisonTitle}
          </h3>
          <InfoTooltip
            label={RENTAL_TERMS.filerStatus.label}
            text={RENTAL_TERMS.filerStatus.text}
          />
        </span>
        <p className="text-gray-500 text-xs">
          {RENTAL_RESULT_COPY.comparisonSubtitle} ({formatPkr(result.annualRent)})
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div
          className={`min-w-0 rounded-xl border p-4 ${
            result.filer ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 bg-gray-50'
          }`}
        >
          <p className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
            {RENTAL_RESULT_COPY.filerLabel}
          </p>
          <p className="amount-wrap mt-1 font-bold text-emerald-700 text-xl tabular-nums">
            {formatPkr(result.filerTax)}
          </p>
        </div>
        <div
          className={`min-w-0 rounded-xl border p-4 ${
            result.filer ? 'border-gray-200 bg-gray-50' : 'border-red-300 bg-red-50'
          }`}
        >
          <p className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
            {RENTAL_RESULT_COPY.nonFilerLabel}
          </p>
          <p className="amount-wrap mt-1 font-bold text-red-600 text-xl tabular-nums">
            {formatPkr(result.nonFilerTax)}
          </p>
        </div>
      </div>

      {result.nonFilerUpliftApplies ? (
        <p className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <span className="inline-flex items-center gap-2 font-semibold text-emerald-800 text-sm">
            <PiggyBank className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
            {RENTAL_RESULT_COPY.savingLabel}
          </span>
          <span className="amount-wrap font-bold text-emerald-700 tabular-nums">
            {formatPkr(result.filerSaving)}
          </span>
        </p>
      ) : (
        <p className="mt-3 flex gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600 text-sm leading-relaxed">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
          <span>{RENTAL_RESULT_COPY.noUpliftNote}</span>
        </p>
      )}
    </section>
  );
}
