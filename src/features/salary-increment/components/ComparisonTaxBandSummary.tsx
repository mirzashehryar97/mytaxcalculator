import { ArrowRight, ReceiptText } from 'lucide-react';

import { SALARY_COMPARISON_INSIGHT_COPY } from '@/features/salary-increment/lib/content';
import { formatSignedPkr } from '@/features/salary-increment/lib/formatting';
import {
  getInsightToneClasses,
  getTaxChangeTone,
} from '@/features/salary-increment/lib/insightStyles';
import type {
  SalaryComparisonInsightPeriod,
  SalaryComparisonTaxBandImpact,
} from '@/features/salary-increment/types';

interface ComparisonTaxBandSummaryProps {
  impact: SalaryComparisonTaxBandImpact;
  period: SalaryComparisonInsightPeriod;
}

export default function ComparisonTaxBandSummary({
  impact,
  period,
}: ComparisonTaxBandSummaryProps) {
  const taxTone = getInsightToneClasses(getTaxChangeTone(impact.taxChange));
  const periodLabel = period === 'annual' ? 'Annual' : 'Monthly';

  return (
    <aside className="mt-4 grid gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center sm:p-4">
      <div>
        <p className="font-semibold text-emerald-800 text-xs uppercase tracking-wider">
          {SALARY_COMPARISON_INSIGHT_COPY.taxImpact}
        </p>
        <p className="mt-1 text-gray-600 text-sm">
          {impact.crossedBand
            ? SALARY_COMPARISON_INSIGHT_COPY.crossedBand
            : SALARY_COMPARISON_INSIGHT_COPY.sameBand}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-lg bg-white/80 px-3 py-2 sm:block sm:text-center">
        <p className="text-gray-500 text-xs">{SALARY_COMPARISON_INSIGHT_COPY.activeRateChange}</p>
        <p className="flex items-center gap-2 font-bold text-sm tabular-nums sm:mt-1">
          <span className="text-gray-700">{impact.current.activeRate}%</span>
          <ArrowRight aria-hidden className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-emerald-700">{impact.next.activeRate}%</span>
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-lg bg-white/80 px-3 py-2 sm:block sm:text-right">
        <p className="flex items-center gap-1.5 text-gray-500 text-xs sm:justify-end">
          <ReceiptText aria-hidden className="h-3.5 w-3.5" />
          {periodLabel} {SALARY_COMPARISON_INSIGHT_COPY.taxDifferenceLabel}
        </p>
        <p className={`amount-wrap font-bold text-sm tabular-nums sm:mt-1 ${taxTone.text}`}>
          {formatSignedPkr(impact.taxChange)}
        </p>
      </div>
    </aside>
  );
}
