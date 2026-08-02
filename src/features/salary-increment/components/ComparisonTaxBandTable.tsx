import { SALARY_COMPARISON_INSIGHT_COPY } from '@/features/salary-increment/lib/content';
import { formatCompactPkr, formatPkr } from '@/features/salary-increment/lib/formatting';
import type {
  SalaryComparisonInsightPeriod,
  SalaryScenarioTaxBandInsights,
} from '@/features/salary-increment/types';

interface ComparisonTaxBandTableProps {
  emphasized?: boolean;
  insights: SalaryScenarioTaxBandInsights;
  period: SalaryComparisonInsightPeriod;
  title: string;
}

export default function ComparisonTaxBandTable({
  emphasized = false,
  insights,
  period,
  title,
}: ComparisonTaxBandTableProps) {
  const periodLabel = period === 'annual' ? 'Annual' : 'Monthly';

  return (
    <article
      className={`min-w-0 rounded-xl border bg-white p-3 sm:p-4 ${
        emphasized ? 'border-emerald-200 shadow-sm' : 'border-gray-200'
      }`}
    >
      <header className="mb-4 flex flex-col gap-2 border-gray-100 border-b pb-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h5
            className={`font-bold text-base ${emphasized ? 'text-emerald-700' : 'text-gray-900'}`}
          >
            {title}
          </h5>
          <p className="mt-0.5 text-gray-500 text-xs">
            {periodLabel} {SALARY_COMPARISON_INSIGHT_COPY.taxablePay.toLowerCase()}
          </p>
        </div>
        <p className="amount-wrap font-bold text-base text-gray-900 tabular-nums">
          {formatPkr(insights.taxableIncome)}
        </p>
      </header>

      <figure>
        <figcaption className="mb-3 font-semibold text-gray-800 text-sm">
          {SALARY_COMPARISON_INSIGHT_COPY.taxContributionByBand}
        </figcaption>
        <div className="space-y-1.5">
          {insights.rows.map((row) => (
            <div
              className={`grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-2 gap-y-1 rounded-lg px-2 py-1.5 sm:grid-cols-[minmax(6.5rem,1.15fr)_2.65rem_minmax(4rem,1.5fr)_4.75rem] ${
                row.isActive ? 'border border-emerald-300 bg-emerald-50/80' : ''
              }`}
              key={`${row.label}-${row.rate}`}
            >
              <div className="min-w-0">
                <p
                  className={`font-medium text-xs ${
                    row.isActive ? 'text-emerald-700' : 'text-gray-600'
                  }`}
                >
                  {row.label}
                </p>
                {row.isActive ? (
                  <p className="font-semibold text-[10px] text-emerald-700">
                    {SALARY_COMPARISON_INSIGHT_COPY.activeBand}
                  </p>
                ) : null}
              </div>

              <span
                className={`inline-flex justify-center rounded-md px-2 py-1 font-bold text-[11px] tabular-nums ${
                  row.isActive
                    ? 'bg-white text-emerald-700 ring-1 ring-emerald-200'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {row.rate}%
              </span>

              <div className="col-span-3 h-2 overflow-hidden rounded-full bg-gray-200 sm:col-span-1">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-600"
                  style={{ width: `${row.barPercent}%` }}
                />
              </div>

              <p className="col-start-3 row-start-1 text-right font-bold text-red-600 text-xs tabular-nums sm:col-start-4">
                {formatCompactPkr(row.contribution)}
              </p>
            </div>
          ))}

          {insights.surcharge > 0 ? (
            <div className="flex items-center justify-between gap-4 rounded-lg bg-red-50 px-2 py-2 text-sm">
              <span className="font-medium text-gray-700">
                {SALARY_COMPARISON_INSIGHT_COPY.salaryTaxSurcharge}
              </span>
              <span className="font-bold text-red-600 tabular-nums">
                {formatCompactPkr(insights.surcharge)}
              </span>
            </div>
          ) : null}
        </div>

        <div className="mt-3 flex items-center justify-between gap-4 border-gray-200 border-t pt-3">
          <span className="font-bold text-gray-800 text-sm">
            {periodLabel} {SALARY_COMPARISON_INSIGHT_COPY.totalTax.toLowerCase()}
          </span>
          <span className="amount-wrap text-right font-bold text-lg text-red-600 tabular-nums">
            {formatPkr(insights.totalTax)}
          </span>
        </div>
      </figure>
    </article>
  );
}
