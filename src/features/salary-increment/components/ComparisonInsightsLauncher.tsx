import { BarChart2 } from 'lucide-react';

import { SALARY_COMPARISON_INSIGHT_COPY } from '@/features/salary-increment/lib/content';
import { formatPercent } from '@/features/salary-increment/lib/formatting';
import type { SalaryComparison } from '@/features/salary-increment/types';

interface ComparisonInsightsLauncherProps {
  comparison: SalaryComparison;
  onShow: () => void;
}

export default function ComparisonInsightsLauncher({
  comparison,
  onShow,
}: ComparisonInsightsLauncherProps) {
  const isIncrement = comparison.mode === 'increment';

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50/60 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="min-w-0">
        <p className="font-bold text-emerald-700 text-xs uppercase tracking-[0.12em]">
          {SALARY_COMPARISON_INSIGHT_COPY.launcherEyebrow}
        </p>
        <p className="mt-1 font-bold text-gray-900 text-lg">
          {isIncrement
            ? SALARY_COMPARISON_INSIGHT_COPY.launcherIncrementTitle
            : SALARY_COMPARISON_INSIGHT_COPY.launcherJobOfferTitle}
        </p>
        <p className="mt-1 text-gray-500 text-sm">
          {SALARY_COMPARISON_INSIGHT_COPY.launcherDescription}
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-4 sm:flex-nowrap">
        <div>
          <p className="font-bold text-emerald-600 text-xl tabular-nums">
            {formatPercent(comparison.next.effectiveRate)}
          </p>
          <p className="text-gray-500 text-xs">
            {SALARY_COMPARISON_INSIGHT_COPY.effectiveRateLabel}
          </p>
        </div>
        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 font-semibold text-sm text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-600/20"
          onClick={onShow}
          type="button"
        >
          <BarChart2 aria-hidden className="h-5 w-5" />
          {SALARY_COMPARISON_INSIGHT_COPY.showButton}
        </button>
      </div>
    </div>
  );
}
