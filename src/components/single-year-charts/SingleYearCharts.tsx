'use client';

import SingleYearDistributionChart from './SingleYearDistributionChart';
import SingleYearMonthlyBreakdownChart from './SingleYearMonthlyBreakdownChart';
import SingleYearSalaryComponentsChart from './SingleYearSalaryComponentsChart';
import type { SingleYearChartsProps } from './types';

export default function SingleYearCharts({ result, activeChart, isMobile }: SingleYearChartsProps) {
  switch (activeChart) {
    case 'distribution':
      return <SingleYearDistributionChart result={result} isMobile={isMobile} />;
    case 'monthlyBreakdown':
      return <SingleYearMonthlyBreakdownChart result={result} isMobile={isMobile} />;
    case 'salaryComponents':
      return <SingleYearSalaryComponentsChart result={result} isMobile={isMobile} />;
    default:
      return null;
  }
}
