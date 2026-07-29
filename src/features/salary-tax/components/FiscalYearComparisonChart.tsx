import {
  formatCompactPkr,
  getFiscalComparisonPeriodAmount,
} from '@/features/salary-tax/lib/insights';
import { SALARY_INSIGHT_PERIOD_COPY } from '@/features/salary-tax/lib/insightsContent';
import type { FiscalComparisonRow, SalaryInsightPeriod } from '@/features/salary-tax/types';

interface FiscalYearComparisonChartProps {
  period: SalaryInsightPeriod;
  rows: FiscalComparisonRow[];
}

// A "00.00%" label needs ~45px; below this share the take-home segment is too
// narrow to hold it at the smallest bar width, so the label is dropped rather
// than stretching the segment past its real width. The tax share is always
// rendered outside the bar, where it stays readable at any percentage.
const MIN_INLINE_LABEL_PERCENT = 25;

export default function FiscalYearComparisonChart({
  period,
  rows,
}: FiscalYearComparisonChartProps) {
  const periodCopy = SALARY_INSIGHT_PERIOD_COPY[period];

  return (
    <figure>
      <figcaption className="sr-only">
        Take-home and tax percentage, with {periodCopy.chartPeriod} tax amounts, for the same salary
        across fiscal years
      </figcaption>
      <div className="mb-3 flex flex-wrap items-center gap-4 text-gray-600 text-xs">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="h-2.5 w-2.5 rounded-sm bg-emerald-600" />
          Take-home
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="h-2.5 w-2.5 rounded-sm bg-red-600" />
          Tax
        </span>
      </div>

      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={row.fiscalYear}
            className={`grid grid-cols-1 items-center gap-x-2 gap-y-2 rounded-lg px-2 py-2 sm:grid-cols-[4.75rem_minmax(0,1fr)_5rem] sm:gap-x-3 sm:gap-y-1 ${
              row.isSelected ? 'border border-emerald-200 bg-emerald-50/80' : ''
            }`}
          >
            <div className="flex min-w-0 items-center justify-between gap-2 sm:block">
              <p
                className={`font-semibold text-xs tabular-nums sm:text-sm ${row.isSelected ? 'text-emerald-700' : 'text-gray-600'}`}
              >
                {row.fiscalYearLabel}
              </p>
              {row.isSelected && (
                <span className="inline-flex rounded border border-emerald-300 bg-white px-1.5 py-0.5 font-semibold text-[10px] text-emerald-700 sm:mt-1">
                  Selected
                </span>
              )}
            </div>

            <div className="flex min-w-0 items-center gap-2">
              <div
                aria-label={`${row.takeHomePercent.toFixed(2)} percent take-home, ${row.taxPercent.toFixed(2)} percent tax`}
                className="flex h-8 min-w-0 flex-1 overflow-hidden rounded-md bg-gray-100 text-[10px] text-white sm:text-xs"
                role="img"
              >
                <div
                  className="flex min-w-0 shrink-0 items-center justify-center overflow-hidden bg-gradient-to-r from-emerald-700 to-emerald-600 px-1 font-bold tabular-nums"
                  style={{ width: `${row.takeHomePercent}%` }}
                >
                  {row.takeHomePercent >= MIN_INLINE_LABEL_PERCENT &&
                    `${row.takeHomePercent.toFixed(2)}%`}
                </div>
                <div
                  className="min-w-0 shrink-0 bg-gradient-to-r from-red-600 to-red-500"
                  style={{ width: `${row.taxPercent}%` }}
                />
              </div>

              <p
                aria-hidden
                className="w-14 shrink-0 text-right font-semibold text-[10px] text-red-600 tabular-nums sm:text-xs"
              >
                {row.taxPercent.toFixed(2)}%
              </p>
            </div>

            <p className="text-right font-bold text-red-600 text-xs tabular-nums sm:col-start-3 sm:row-start-1 sm:text-sm">
              {formatCompactPkr(getFiscalComparisonPeriodAmount(row.tax, period))}
            </p>
          </div>
        ))}
      </div>
    </figure>
  );
}
