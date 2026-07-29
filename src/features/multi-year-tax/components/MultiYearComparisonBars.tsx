import MultiYearChartLegend from '@/features/multi-year-tax/components/MultiYearChartLegend';
import { getComparisonBarRows } from '@/features/multi-year-tax/lib/presentation';
import type { MultiYearResult } from '@/features/multi-year-tax/types';

interface MultiYearComparisonBarsProps {
  result: MultiYearResult;
}

/**
 * Phone-sized year comparison. Horizontal bars keep the fiscal-year labels and
 * amounts readable where a column chart would squeeze them.
 */
export default function MultiYearComparisonBars({ result }: MultiYearComparisonBarsProps) {
  return (
    <figure>
      <ul className="divide-y divide-gray-100">
        {getComparisonBarRows(result).map((row) => (
          <li className="py-3 first:pt-0" key={row.id}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-bold text-gray-900 text-sm">{row.label}</span>
              <span className="amount-wrap font-semibold text-gray-900 text-sm tabular-nums">
                {row.grossLabel}
              </span>
            </div>
            <div
              aria-hidden="true"
              className="mt-2 flex h-6 w-full overflow-hidden rounded-md bg-gray-100"
            >
              <div className="h-full bg-emerald-700" style={{ width: `${row.takeHomeWidth}%` }} />
              <div className="h-full bg-red-600" style={{ width: `${row.taxWidth}%` }} />
            </div>
            <div className="mt-1.5 flex items-baseline justify-between gap-3 text-xs tabular-nums">
              <span className="font-semibold text-emerald-700">{row.takeHomeLabel}</span>
              <span className="font-semibold text-red-600">{row.taxLabel}</span>
            </div>
          </li>
        ))}
      </ul>
      <MultiYearChartLegend />
    </figure>
  );
}
