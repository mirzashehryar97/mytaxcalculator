import { SALARY_COMPARISON_INSIGHT_COPY } from '@/features/salary-increment/lib/content';
import { getSalaryComparisonInsightSummary } from '@/features/salary-increment/lib/insights';
import type {
  SalaryComparison,
  SalaryComparisonInsightPeriod,
} from '@/features/salary-increment/types';

import BeforeAfterGrowthSummary from './BeforeAfterGrowthSummary';
import BeforeAfterScenarioCard from './BeforeAfterScenarioCard';
import ComparisonInsightPanelHeader from './ComparisonInsightPanelHeader';

interface BeforeAfterPanelProps {
  comparison: SalaryComparison;
  onPeriodChange: (period: SalaryComparisonInsightPeriod) => void;
  period: SalaryComparisonInsightPeriod;
}

export default function BeforeAfterPanel({
  comparison,
  onPeriodChange,
  period,
}: BeforeAfterPanelProps) {
  const summary = getSalaryComparisonInsightSummary(comparison, period);
  const isIncrement = comparison.mode === 'increment';
  const showDeductions = summary.current.deductions !== 0 || summary.next.deductions !== 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-3 shadow-sm sm:p-5">
      <ComparisonInsightPanelHeader
        description={SALARY_COMPARISON_INSIGHT_COPY.beforeAfterDescription}
        onPeriodChange={onPeriodChange}
        period={period}
        periodId="before-after-period"
        title={SALARY_COMPARISON_INSIGHT_COPY.beforeAfterTitle}
      />

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <BeforeAfterScenarioCard
          scenario={summary.current}
          showDeductions={showDeductions}
          title={
            isIncrement
              ? SALARY_COMPARISON_INSIGHT_COPY.currentIncrement
              : SALARY_COMPARISON_INSIGHT_COPY.currentJobOffer
          }
        />
        <BeforeAfterScenarioCard
          scenario={summary.next}
          showDeductions={showDeductions}
          title={
            isIncrement
              ? SALARY_COMPARISON_INSIGHT_COPY.nextIncrement
              : SALARY_COMPARISON_INSIGHT_COPY.nextJobOffer
          }
        />
      </div>

      <BeforeAfterGrowthSummary summary={summary} />
    </div>
  );
}
