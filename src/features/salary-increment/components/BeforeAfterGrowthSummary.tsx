import { ArrowRight } from 'lucide-react';

import { SALARY_COMPARISON_INSIGHT_COPY } from '@/features/salary-increment/lib/content';
import { formatSignedPercent, formatSignedPkr } from '@/features/salary-increment/lib/formatting';
import { getInsightToneClasses } from '@/features/salary-increment/lib/insightStyles';
import type { SalaryComparisonInsightSummary } from '@/features/salary-increment/types';

interface BeforeAfterGrowthSummaryProps {
  summary: SalaryComparisonInsightSummary;
}

export default function BeforeAfterGrowthSummary({ summary }: BeforeAfterGrowthSummaryProps) {
  const takeHomeTone = getInsightToneClasses(summary.takeHomeChange >= 0 ? 'positive' : 'negative');

  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-gray-500 text-xs">{SALARY_COMPARISON_INSIGHT_COPY.grossGrowth}</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="font-bold text-gray-900 text-lg tabular-nums">
            {formatSignedPercent(summary.grossGrowthPercent)}
          </p>
          <ArrowRight aria-hidden className="h-4 w-4 text-gray-400" />
          <p className="amount-wrap font-semibold text-gray-700 text-sm tabular-nums">
            {formatSignedPkr(summary.grossChange)}
          </p>
        </div>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-gray-500 text-xs">{SALARY_COMPARISON_INSIGHT_COPY.takeHomeGrowth}</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className={`font-bold text-lg tabular-nums ${takeHomeTone.text}`}>
            {formatSignedPercent(summary.takeHomeGrowthPercent)}
          </p>
          <ArrowRight aria-hidden className="h-4 w-4 text-gray-400" />
          <p className={`amount-wrap font-semibold text-sm tabular-nums ${takeHomeTone.text}`}>
            {formatSignedPkr(summary.takeHomeChange)}
          </p>
        </div>
      </div>
    </div>
  );
}
