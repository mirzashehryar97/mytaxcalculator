import { Briefcase, CheckCircle2, TrendingUp, User, UserCheck, Wallet } from 'lucide-react';

import { SALARY_COMPARISON_RESULT_COPY } from '@/features/salary-increment/lib/content';
import { formatPkr } from '@/features/salary-increment/lib/formatting';
import type { SalaryComparison } from '@/features/salary-increment/types';

import ComparisonInsights from './ComparisonInsights';
import ScenarioCard from './ScenarioCard';

interface ComparisonResultsProps {
  comparison: SalaryComparison;
}

export default function ComparisonResults({ comparison }: ComparisonResultsProps) {
  const isIncrement = comparison.mode === 'increment';
  const currentTitle = isIncrement
    ? SALARY_COMPARISON_RESULT_COPY.currentIncrementTitle
    : SALARY_COMPARISON_RESULT_COPY.currentJobTitle;
  const newTitle = isIncrement
    ? SALARY_COMPARISON_RESULT_COPY.newIncrementTitle
    : SALARY_COMPARISON_RESULT_COPY.newJobTitle;
  const leadLabel = isIncrement
    ? SALARY_COMPARISON_RESULT_COPY.incrementLead
    : SALARY_COMPARISON_RESULT_COPY.jobOfferLead;
  const takeHomeImproved = comparison.takeHomeIncreaseMonthly >= 0;

  const improvementBadge = (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 font-semibold text-emerald-800 text-xs">
      <CheckCircle2 aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
      {SALARY_COMPARISON_RESULT_COPY.improvementTitle}
    </span>
  );

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-emerald-700 text-xs uppercase tracking-wider">
        {SALARY_COMPARISON_RESULT_COPY.heading}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ScenarioCard
          title={currentTitle}
          icon={User}
          scenario={comparison.current}
          showBonusChip={!isIncrement}
        />
        <ScenarioCard
          title={newTitle}
          icon={isIncrement ? UserCheck : Briefcase}
          scenario={comparison.next}
          showBonusChip={!isIncrement}
        />
      </div>

      <aside className="overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-100/90 via-emerald-50/60 to-white sm:bg-gradient-to-r">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
            <div className="flex justify-center sm:hidden">{improvementBadge}</div>

            <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
              <div
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white sm:h-12 sm:w-12"
              >
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-1.5 hidden sm:block">{improvementBadge}</p>
                <p className="font-bold text-gray-900 text-lg leading-snug max-[400px]:text-sm sm:text-xl">
                  {leadLabel}{' '}
                  <span className="text-emerald-700 tabular-nums">
                    {formatPkr(comparison.grossIncreaseMonthly)}
                  </span>
                </p>
                <p className="mt-1 text-gray-600 text-sm sm:text-base">
                  {SALARY_COMPARISON_RESULT_COPY.takeHomeConnector}{' '}
                  <span className="font-semibold text-emerald-700 tabular-nums">
                    {formatPkr(comparison.takeHomeIncreaseMonthly)}
                  </span>{' '}
                  {SALARY_COMPARISON_RESULT_COPY.afterTax}
                </p>
              </div>
            </div>
          </div>

          <div aria-hidden className="mx-4 h-px shrink-0 bg-gray-200 sm:mx-0 sm:h-14 sm:w-px" />

          <div className="flex items-center justify-center gap-3 p-4 sm:justify-end sm:gap-5 sm:px-5 sm:py-4">
            <div className="min-w-0 text-center">
              <p className="text-left text-base text-gray-500 max-[400px]:text-sm sm:hidden">
                That&apos;s{' '}
                <span className="font-semibold text-emerald-700 tabular-nums">
                  {formatPkr(comparison.takeHomeIncreaseAnnual)}
                </span>{' '}
                <span className="whitespace-nowrap">take-home per year</span>
              </p>

              <div className="hidden sm:block">
                <p className="text-gray-400 text-xs">That&apos;s</p>
                <p className="font-semibold text-emerald-700 text-xl tabular-nums">
                  {formatPkr(comparison.takeHomeIncreaseAnnual)}
                </p>
                <p className="text-gray-400 text-xs">take-home per year</p>
              </div>
            </div>

            <div
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100/80 text-emerald-700 ring-1 ring-emerald-200/60 sm:h-12 sm:w-12"
            >
              <Wallet className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
            </div>
          </div>
        </div>
      </aside>

      {takeHomeImproved ? null : (
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800 text-sm">
          {SALARY_COMPARISON_RESULT_COPY.lowerTakeHomeNote}
        </p>
      )}

      <div>
        <h3 className="mb-4 font-semibold text-emerald-700 text-xs uppercase tracking-wider">
          {SALARY_COMPARISON_RESULT_COPY.insightsHeading}
        </h3>
        <ComparisonInsights comparison={comparison} />
      </div>
    </div>
  );
}
