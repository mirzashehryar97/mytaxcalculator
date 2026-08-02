import {
  CalendarDays,
  DollarSign,
  Equal,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

import { SALARY_COMPARISON_RESULT_COPY } from '@/features/salary-increment/lib/content';
import { formatPercent, formatPkr } from '@/features/salary-increment/lib/formatting';
import {
  buildSalaryComparisonPresentation,
  type ComparisonDirection,
} from '@/features/salary-increment/lib/presentation';
import type { SalaryComparison } from '@/features/salary-increment/types';

import ComparisonInsightCard from './ComparisonInsightCard';

const TAKE_HOME_ICONS: Record<ComparisonDirection, typeof TrendingUp> = {
  increase: TrendingUp,
  decrease: TrendingDown,
  same: Equal,
};

interface ComparisonInsightsProps {
  comparison: SalaryComparison;
}

export default function ComparisonInsights({ comparison }: ComparisonInsightsProps) {
  const presentation = buildSalaryComparisonPresentation(comparison);
  const effectiveRateLabel =
    comparison.mode === 'increment'
      ? SALARY_COMPARISON_RESULT_COPY.effectiveRateIncrement
      : SALARY_COMPARISON_RESULT_COPY.effectiveRateJob;
  const TakeHomeIcon = TAKE_HOME_ICONS[presentation.variant];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <ComparisonInsightCard
        icon={TakeHomeIcon}
        label={presentation.monthlyTakeHomeLabel}
        tone={presentation.takeHomeTone}
        value={formatPkr(presentation.takeHomeMonthlyAmount ?? 0)}
      />
      <ComparisonInsightCard
        icon={CalendarDays}
        label={presentation.annualTakeHomeLabel}
        tone={presentation.takeHomeTone}
        value={formatPkr(presentation.takeHomeAnnualAmount)}
      />
      <ComparisonInsightCard
        icon={DollarSign}
        label={presentation.monthlyTaxLabel}
        tone={presentation.taxTone}
        value={formatPkr(presentation.monthlyTaxAmount)}
      />
      <ComparisonInsightCard
        icon={CalendarDays}
        label={presentation.annualTaxLabel}
        tone={presentation.taxTone}
        value={formatPkr(presentation.annualTaxAmount)}
      />
      <ComparisonInsightCard
        icon={ShieldCheck}
        label={effectiveRateLabel}
        tone="info"
        value={formatPercent(comparison.next.effectiveRate)}
      />
    </div>
  );
}
