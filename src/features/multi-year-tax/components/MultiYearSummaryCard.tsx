import { MULTI_YEAR_RESULT_COPY } from '@/features/multi-year-tax/lib/content';
import {
  getFiscalYearCountLabel,
  getSummaryStats,
} from '@/features/multi-year-tax/lib/presentation';
import { getSummaryStatToneClass, RESULT_PANEL_CLASS } from '@/features/multi-year-tax/lib/styles';
import type { MultiYearResult } from '@/features/multi-year-tax/types';

interface MultiYearSummaryCardProps {
  result: MultiYearResult;
}

export default function MultiYearSummaryCard({ result }: MultiYearSummaryCardProps) {
  return (
    <section aria-labelledby="multi-year-summary-heading" className={RESULT_PANEL_CLASS}>
      <h3 className="font-bold text-gray-900 text-lg" id="multi-year-summary-heading">
        {MULTI_YEAR_RESULT_COPY.summaryTitle}
      </h3>
      <p className="mt-1 flex flex-wrap items-center gap-x-2 text-gray-500 text-sm">
        <span className="font-medium text-emerald-700">{getFiscalYearCountLabel(result)}</span>
        <span aria-hidden="true" className="text-gray-300">
          •
        </span>
        <span>{result.coverageLabel}</span>
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-gray-200 sm:grid-cols-4">
        {getSummaryStats(result).map((stat) => (
          <div className="min-w-0 bg-white px-3 py-4 text-center" key={stat.id}>
            <dt className="text-gray-500 text-xs uppercase tracking-wide">{stat.label}</dt>
            <dd
              className={`amount-wrap mt-1 font-bold text-lg tabular-nums sm:text-xl ${getSummaryStatToneClass(
                stat.tone,
              )}`}
            >
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
