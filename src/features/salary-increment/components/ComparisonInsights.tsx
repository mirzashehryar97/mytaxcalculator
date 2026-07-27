import { CalendarDays, DollarSign, ShieldCheck, TrendingUp } from 'lucide-react';

import { SALARY_COMPARISON_RESULT_COPY } from '@/features/salary-increment/lib/content';
import {
  formatPercent,
  formatPkr,
  formatSignedPkr,
} from '@/features/salary-increment/lib/formatting';
import type { SalaryComparison } from '@/features/salary-increment/types';

interface ComparisonInsightsProps {
  comparison: SalaryComparison;
}

export default function ComparisonInsights({ comparison }: ComparisonInsightsProps) {
  const effectiveRateLabel =
    comparison.mode === 'increment'
      ? SALARY_COMPARISON_RESULT_COPY.effectiveRateIncrement
      : SALARY_COMPARISON_RESULT_COPY.effectiveRateJob;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <TrendingUp className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          {SALARY_COMPARISON_RESULT_COPY.extraMonthlyTakeHome}
        </div>
        <p className="amount-wrap mt-2 font-bold text-emerald-600 text-lg tabular-nums">
          {formatSignedPkr(comparison.takeHomeIncreaseMonthly)}
        </p>
      </div>

      <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <CalendarDays className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          {SALARY_COMPARISON_RESULT_COPY.extraAnnualTakeHome}
        </div>
        <p className="amount-wrap mt-2 font-bold text-emerald-600 text-lg tabular-nums">
          {formatSignedPkr(comparison.takeHomeIncreaseAnnual)}
        </p>
      </div>

      <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <DollarSign className="h-4 w-4 text-red-500" aria-hidden="true" />
          {SALARY_COMPARISON_RESULT_COPY.extraMonthlyTax}
        </div>
        <p className="amount-wrap mt-2 font-bold text-lg text-red-600 tabular-nums">
          {formatPkr(comparison.extraMonthlyTax)}
        </p>
      </div>

      <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <CalendarDays className="h-4 w-4 text-red-500" aria-hidden="true" />
          {SALARY_COMPARISON_RESULT_COPY.extraAnnualTax}
        </div>
        <p className="amount-wrap mt-2 font-bold text-lg text-red-600 tabular-nums">
          {formatPkr(comparison.extraAnnualTax)}
        </p>
      </div>

      <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          {effectiveRateLabel}
        </div>
        <p className="amount-wrap mt-2 font-bold text-blue-600 text-lg tabular-nums">
          {formatPercent(comparison.next.effectiveRate)}
        </p>
      </div>
    </div>
  );
}
