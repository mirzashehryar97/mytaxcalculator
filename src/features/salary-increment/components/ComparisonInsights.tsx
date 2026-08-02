'use client';

import useComparisonInsights from '@/features/salary-increment/hooks/useComparisonInsights';
import type { SalaryComparison } from '@/features/salary-increment/types';

import BeforeAfterPanel from './BeforeAfterPanel';
import ComparisonInsightsHeader from './ComparisonInsightsHeader';
import ComparisonInsightsLauncher from './ComparisonInsightsLauncher';
import ComparisonInsightsTabs from './ComparisonInsightsTabs';
import ComparisonTaxBandsPanel from './ComparisonTaxBandsPanel';

interface ComparisonInsightsProps {
  comparison: SalaryComparison;
}

export default function ComparisonInsights({ comparison }: ComparisonInsightsProps) {
  const { activeTab, hideInsights, isVisible, period, setActiveTab, setPeriod, showInsights } =
    useComparisonInsights(comparison.mode, comparison.fiscalYear);

  if (!isVisible) {
    return <ComparisonInsightsLauncher comparison={comparison} onShow={showInsights} />;
  }

  return (
    <section aria-labelledby="comparison-insights-heading" className="animate-fade-up space-y-5">
      <ComparisonInsightsHeader comparison={comparison} onHide={hideInsights} />
      <ComparisonInsightsTabs activeTab={activeTab} onSelect={setActiveTab} />
      <div
        aria-labelledby={`comparison-insights-tab-${activeTab}`}
        id="comparison-insights-panel"
        role="tabpanel"
      >
        {activeTab === 'comparison' ? (
          <BeforeAfterPanel comparison={comparison} onPeriodChange={setPeriod} period={period} />
        ) : null}
        {activeTab === 'taxBands' ? (
          <ComparisonTaxBandsPanel
            comparison={comparison}
            onPeriodChange={setPeriod}
            period={period}
          />
        ) : null}
      </div>
    </section>
  );
}
