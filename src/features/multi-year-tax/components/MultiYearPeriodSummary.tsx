import { ChevronDown, Pencil } from 'lucide-react';

import PeriodBadge from '@/features/multi-year-tax/components/PeriodBadge';
import { MULTI_YEAR_COPY } from '@/features/multi-year-tax/lib/content';
import { getPeriodSummary } from '@/features/multi-year-tax/lib/input';
import type { SalaryPeriod } from '@/features/multi-year-tax/types';

interface MultiYearPeriodSummaryProps {
  period: SalaryPeriod;
  periodNumber: number;
  onExpand: () => void;
}

/** The collapsed row: what a period says once it is filled in and folded away. */
export default function MultiYearPeriodSummary({
  onExpand,
  period,
  periodNumber,
}: MultiYearPeriodSummaryProps) {
  const summary = getPeriodSummary(period);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-nowrap sm:px-5">
      <PeriodBadge isComplete={summary.isComplete} periodNumber={periodNumber} />
      <h3 className="font-bold text-base text-gray-900">
        {MULTI_YEAR_COPY.periodLabel} {periodNumber}
      </h3>

      <dl className="order-last flex w-full min-w-0 flex-wrap items-center gap-x-5 gap-y-1 text-sm sm:order-none sm:w-auto sm:flex-1 sm:justify-around">
        <div className="min-w-0">
          <dt className="sr-only">Dates</dt>
          <dd className="amount-wrap font-medium text-gray-900">{summary.dateRangeLabel}</dd>
        </div>
        {summary.salaryLabel ? (
          <div className="min-w-0">
            <dt className="sr-only">Monthly salary</dt>
            <dd className="amount-wrap text-gray-600 tabular-nums">{summary.salaryLabel}</dd>
          </div>
        ) : null}
        {summary.monthsLabel ? (
          <div className="min-w-0">
            <dt className="sr-only">Length</dt>
            <dd className="text-gray-600 tabular-nums">{summary.monthsLabel}</dd>
          </div>
        ) : null}
      </dl>

      <div className="ml-auto flex shrink-0 items-center gap-1">
        <button
          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-gray-200 px-3 font-semibold text-emerald-700 text-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-600/15"
          onClick={onExpand}
          type="button"
        >
          <Pencil aria-hidden="true" className="h-4 w-4" />
          {MULTI_YEAR_COPY.editPeriod}
          <span className="sr-only"> period {periodNumber}</span>
        </button>
        <button
          aria-label={`Expand period ${periodNumber}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-4 focus:ring-emerald-600/15"
          onClick={onExpand}
          type="button"
        >
          <ChevronDown aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
