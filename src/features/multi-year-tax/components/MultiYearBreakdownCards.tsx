import MultiYearAllocationBar from '@/features/multi-year-tax/components/MultiYearAllocationBar';
import { MULTI_YEAR_RESULT_COPY } from '@/features/multi-year-tax/lib/content';
import { formatMonths, formatPercent, formatPkr } from '@/features/multi-year-tax/lib/formatting';
import { getAllocationLabel } from '@/features/multi-year-tax/lib/presentation';
import type { MultiYearResult } from '@/features/multi-year-tax/types';

interface MultiYearBreakdownCardsProps {
  result: MultiYearResult;
}

/** Narrow layout: the same figures as the table, stacked one card per year. */
export default function MultiYearBreakdownCards({ result }: MultiYearBreakdownCardsProps) {
  return (
    <div className="space-y-3">
      {result.breakdown.map((year) => (
        <article className="rounded-xl border border-gray-200 p-4" key={year.fiscalYear}>
          <div className="flex items-center justify-between gap-3">
            <h4 className="font-bold text-base text-gray-900">{year.label}</h4>
            <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-gray-600 text-xs tabular-nums">
              {formatMonths(year.months)}
            </span>
          </div>

          <div className="mt-3 flex items-baseline justify-between gap-3">
            <span className="text-gray-500 text-xs uppercase tracking-wide">
              {MULTI_YEAR_RESULT_COPY.grossLabel}
            </span>
            <span className="amount-wrap font-semibold text-gray-900 tabular-nums">
              {formatPkr(year.gross)}
            </span>
          </div>

          <div className="mt-2">
            <MultiYearAllocationBar
              label={getAllocationLabel(year)}
              takeHomePercent={year.takeHomePercent}
              taxPercent={year.taxPercent}
              thickness="thick"
            />
          </div>

          <dl className="mt-3 grid grid-cols-2 gap-3">
            <div className="min-w-0">
              <dt className="text-gray-500 text-xs uppercase tracking-wide">
                {MULTI_YEAR_RESULT_COPY.takeHomeLabel}
              </dt>
              <dd className="amount-wrap font-bold text-emerald-600 tabular-nums">
                {formatPkr(year.takeHome)}
              </dd>
            </div>
            <div className="min-w-0 border-gray-100 border-l pl-3">
              <dt className="text-gray-500 text-xs uppercase tracking-wide">
                {MULTI_YEAR_RESULT_COPY.taxLabel}
              </dt>
              <dd className="amount-wrap font-bold text-red-600 tabular-nums">
                {formatPkr(year.tax)}
              </dd>
            </div>
          </dl>

          <div className="mt-3 flex items-center justify-between gap-3 border-gray-100 border-t pt-3">
            <span className="font-medium text-gray-700 text-sm">
              {MULTI_YEAR_RESULT_COPY.effectiveRateLabel}
            </span>
            <span className="font-bold text-gray-900 tabular-nums">
              {formatPercent(year.effectiveRate)}
            </span>
          </div>
        </article>
      ))}

      <div className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-4 py-3">
        <span className="font-semibold text-gray-600 text-xs uppercase tracking-wide">
          {MULTI_YEAR_RESULT_COPY.totalTaxLabel}
        </span>
        <span className="amount-wrap font-bold text-lg text-red-600 tabular-nums">
          {formatPkr(result.totalTax)}
        </span>
      </div>
    </div>
  );
}
