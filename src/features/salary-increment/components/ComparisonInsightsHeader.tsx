import { BarChart2 } from 'lucide-react';

import { SALARY_COMPARISON_INSIGHT_COPY } from '@/features/salary-increment/lib/content';
import {
  formatFiscalYear,
  formatPercent,
  formatPkr,
} from '@/features/salary-increment/lib/formatting';
import type { SalaryComparison } from '@/features/salary-increment/types';

interface ComparisonInsightsHeaderProps {
  comparison: SalaryComparison;
  onHide: () => void;
}

export default function ComparisonInsightsHeader({
  comparison,
  onHide,
}: ComparisonInsightsHeaderProps) {
  const isIncrement = comparison.mode === 'increment';

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="font-bold text-emerald-700 text-xs uppercase tracking-[0.12em]">
          {isIncrement
            ? SALARY_COMPARISON_INSIGHT_COPY.incrementEyebrow
            : SALARY_COMPARISON_INSIGHT_COPY.jobOfferEyebrow}
        </p>
        <h3
          className="mt-1 scroll-mt-24 font-bold text-gray-900 text-xl sm:text-2xl"
          id="comparison-insights-heading"
        >
          {isIncrement
            ? SALARY_COMPARISON_INSIGHT_COPY.incrementTitle
            : SALARY_COMPARISON_INSIGHT_COPY.jobOfferTitle}
        </h3>
        <p className="mt-1 text-gray-500 text-sm">
          <span className="tabular-nums">{formatPkr(comparison.next.grossMonthly)}</span>{' '}
          {isIncrement
            ? SALARY_COMPARISON_INSIGHT_COPY.incrementSubtitle
            : SALARY_COMPARISON_INSIGHT_COPY.jobOfferSubtitle}
          <span aria-hidden className="mx-2 text-gray-300">
            •
          </span>
          {formatFiscalYear(comparison.fiscalYear)}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap sm:justify-end">
        <div className="text-left sm:text-right">
          <p className="font-bold text-2xl text-emerald-600 tabular-nums">
            {formatPercent(comparison.next.effectiveRate)}
          </p>
          <p className="text-gray-500 text-xs">
            {SALARY_COMPARISON_INSIGHT_COPY.effectiveRateLabel}
          </p>
        </div>
        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 font-semibold text-gray-600 text-sm shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-emerald-600/15"
          onClick={onHide}
          type="button"
        >
          <BarChart2 aria-hidden className="h-4 w-4" />
          {SALARY_COMPARISON_INSIGHT_COPY.hideButton}
        </button>
      </div>
    </header>
  );
}
