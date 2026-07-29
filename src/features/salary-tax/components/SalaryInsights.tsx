'use client';

import dynamic from 'next/dynamic';

import useSalaryInsights from '@/features/salary-tax/hooks/useSalaryInsights';
import type { SalaryInsightsProps } from '@/features/salary-tax/types';

import SalaryInsightsHeader from './SalaryInsightsHeader';
import SalaryInsightsLoading from './SalaryInsightsLoading';
import SalaryInsightsTabs from './SalaryInsightsTabs';

const SalaryOverviewPanel = dynamic(() => import('./SalaryOverviewPanel'), {
  loading: () => <SalaryInsightsLoading />,
});
const SalaryFiscalComparisonPanel = dynamic(() => import('./SalaryFiscalComparisonPanel'), {
  loading: () => <SalaryInsightsLoading />,
});
const SalaryTaxBandsPanel = dynamic(() => import('./SalaryTaxBandsPanel'), {
  loading: () => <SalaryInsightsLoading />,
});

export default function SalaryInsights({ onHide, result, selectedYear }: SalaryInsightsProps) {
  const { activeTab, comparisonPeriod, period, setActiveTab, setComparisonPeriod, setPeriod } =
    useSalaryInsights();

  return (
    <section
      aria-labelledby="salary-insights-heading"
      className="animate-fade-up space-y-4 sm:space-y-5"
    >
      <SalaryInsightsHeader
        effectiveRate={result.taxRate}
        monthlyIncome={result.monthlyIncome}
        onHide={onHide}
        selectedYear={selectedYear}
      />
      <SalaryInsightsTabs activeTab={activeTab} onSelect={setActiveTab} />
      <div
        id="salary-insights-panel"
        aria-labelledby={`salary-insights-tab-${activeTab}`}
        role="tabpanel"
      >
        {activeTab === 'overview' && (
          <SalaryOverviewPanel
            onPeriodChange={setPeriod}
            period={period}
            result={result}
            selectedYear={selectedYear}
          />
        )}
        {activeTab === 'fiscalComparison' && (
          <SalaryFiscalComparisonPanel
            onPeriodChange={setComparisonPeriod}
            period={comparisonPeriod}
            result={result}
            selectedYear={selectedYear}
          />
        )}
        {activeTab === 'taxBands' && (
          <SalaryTaxBandsPanel result={result} selectedYear={selectedYear} />
        )}
      </div>
    </section>
  );
}
