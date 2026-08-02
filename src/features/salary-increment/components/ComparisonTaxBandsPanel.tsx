import { SALARY_COMPARISON_INSIGHT_COPY } from '@/features/salary-increment/lib/content';
import { getSalaryComparisonTaxBandImpact } from '@/features/salary-increment/lib/insights';
import type {
  SalaryComparison,
  SalaryComparisonInsightPeriod,
} from '@/features/salary-increment/types';

import ComparisonInsightPanelHeader from './ComparisonInsightPanelHeader';
import ComparisonTaxBandSummary from './ComparisonTaxBandSummary';
import ComparisonTaxBandTable from './ComparisonTaxBandTable';

interface ComparisonTaxBandsPanelProps {
  comparison: SalaryComparison;
  onPeriodChange: (period: SalaryComparisonInsightPeriod) => void;
  period: SalaryComparisonInsightPeriod;
}

export default function ComparisonTaxBandsPanel({
  comparison,
  onPeriodChange,
  period,
}: ComparisonTaxBandsPanelProps) {
  const impact = getSalaryComparisonTaxBandImpact(comparison, period);
  const isIncrement = comparison.mode === 'increment';
  const currentTitle = isIncrement
    ? SALARY_COMPARISON_INSIGHT_COPY.currentIncrement
    : SALARY_COMPARISON_INSIGHT_COPY.currentJobOffer;
  const nextTitle = isIncrement
    ? SALARY_COMPARISON_INSIGHT_COPY.nextIncrement
    : SALARY_COMPARISON_INSIGHT_COPY.nextJobOffer;

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-3 shadow-sm sm:p-5">
      <ComparisonInsightPanelHeader
        description={SALARY_COMPARISON_INSIGHT_COPY.taxBandDescription}
        onPeriodChange={onPeriodChange}
        period={period}
        periodId="tax-band-impact-period"
        title={SALARY_COMPARISON_INSIGHT_COPY.taxBandTitle}
      />

      <div className="mt-5 grid min-w-0 gap-4 lg:grid-cols-2">
        <ComparisonTaxBandTable insights={impact.current} period={period} title={currentTitle} />
        <ComparisonTaxBandTable
          emphasized
          insights={impact.next}
          period={period}
          title={nextTitle}
        />
      </div>
      <ComparisonTaxBandSummary impact={impact} period={period} />
    </div>
  );
}
