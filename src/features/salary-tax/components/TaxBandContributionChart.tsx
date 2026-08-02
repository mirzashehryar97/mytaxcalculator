import { formatCompactPkr, formatPkr } from '@/features/salary-tax/lib/insights';
import type { TaxBandInsights } from '@/features/salary-tax/types';

interface TaxBandContributionChartProps {
  insights: TaxBandInsights;
}

export default function TaxBandContributionChart({ insights }: TaxBandContributionChartProps) {
  return (
    <figure>
      <figcaption className="mb-3 font-semibold text-gray-800 text-sm">
        Tax contribution by band
      </figcaption>
      <div className="space-y-1.5">
        {insights.rows.map((row) => (
          <div
            key={`${row.label}-${row.rate}`}
            className={`grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-2 gap-y-1 rounded-lg px-2 py-1.5 sm:grid-cols-[minmax(8rem,1.15fr)_2.75rem_minmax(5rem,1.8fr)_4.75rem] ${
              row.isActive ? 'border border-emerald-300 bg-emerald-50/80' : ''
            }`}
          >
            <div className="min-w-0">
              <p
                className={`font-medium text-xs sm:text-sm ${row.isActive ? 'text-emerald-700' : 'text-gray-600'}`}
              >
                {row.label}
              </p>
              {row.isActive && (
                <p className="font-semibold text-[10px] text-emerald-700">Your active band</p>
              )}
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

            <p className="col-start-3 row-start-1 text-right font-bold text-red-600 text-xs tabular-nums sm:col-start-4 sm:text-sm">
              {formatCompactPkr(row.contribution)}
            </p>
          </div>
        ))}

        {insights.surcharge > 0 && (
          <div className="flex items-center justify-between gap-4 rounded-lg bg-red-50 px-2 py-2 text-sm">
            <span className="font-medium text-gray-700">Salary tax surcharge</span>
            <span className="font-bold text-red-600 tabular-nums">
              {formatCompactPkr(insights.surcharge)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 border-gray-200 border-t pt-3">
        <span className="font-bold text-gray-800 text-sm">{insights.periodLabel} total tax</span>
        <span className="amount-wrap text-right font-bold text-lg text-red-600 tabular-nums">
          {formatPkr(insights.totalTax)}
        </span>
      </div>
    </figure>
  );
}
