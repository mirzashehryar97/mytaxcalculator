'use client';

import MultiYearComparisonChart from './MultiYearComparisonChart';
import MultiYearDistributionChart from './MultiYearDistributionChart';
import MultiYearMonthlyBreakdownChart from './MultiYearMonthlyBreakdownChart';
import MultiYearTaxRateChart from './MultiYearTaxRateChart';
import MultiYearTimelineChart from './MultiYearTimelineChart';
import type { MultiYearChartsProps } from './types';

export default function MultiYearCharts({
  activeChart,
  isMobile,
  comparisonData,
  taxRateData,
  distributionData,
  monthlyBreakdownData,
}: MultiYearChartsProps) {
  switch (activeChart) {
    case 'comparison':
      return <MultiYearComparisonChart data={comparisonData} isMobile={isMobile} />;
    case 'taxRate':
      return <MultiYearTaxRateChart data={taxRateData} isMobile={isMobile} />;
    case 'distribution':
      return <MultiYearDistributionChart data={distributionData} isMobile={isMobile} />;
    case 'monthlyBreakdown':
      return <MultiYearMonthlyBreakdownChart data={monthlyBreakdownData} isMobile={isMobile} />;
    case 'timeline':
      return <MultiYearTimelineChart data={comparisonData} isMobile={isMobile} />;
    default:
      return null;
  }
}
