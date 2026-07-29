import { MULTI_YEAR_CHART_COPY } from '@/features/multi-year-tax/lib/content';

/** Shared key for both year-comparison layouts, so they read the same. */
export default function MultiYearChartLegend() {
  return (
    <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-gray-600 text-xs">
      <li className="inline-flex items-center gap-2">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-emerald-700" />
        {MULTI_YEAR_CHART_COPY.takeHomeLegend}
      </li>
      <li className="inline-flex items-center gap-2">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-red-600" />
        {MULTI_YEAR_CHART_COPY.taxLegend}
      </li>
    </ul>
  );
}
