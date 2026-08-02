'use client';

import { useState } from 'react';

import type { SalaryInsightPeriod, SalaryInsightTab } from '@/features/salary-tax/types';

export default function useSalaryInsights() {
  const [activeTab, setActiveTab] = useState<SalaryInsightTab>('overview');
  const [period, setPeriod] = useState<SalaryInsightPeriod>('monthly');
  const [comparisonPeriod, setComparisonPeriod] = useState<SalaryInsightPeriod>('annual');
  const [taxBandPeriod, setTaxBandPeriod] = useState<SalaryInsightPeriod>('annual');

  return {
    activeTab,
    comparisonPeriod,
    period,
    setActiveTab,
    setComparisonPeriod,
    setPeriod,
    setTaxBandPeriod,
    taxBandPeriod,
  };
}
