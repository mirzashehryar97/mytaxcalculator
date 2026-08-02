'use client';

import { useCallback, useState } from 'react';

import { trackAnalyticsEvent } from '@/lib/analytics';

import {
  buildSalaryComparisonInsightsParameters,
  SALARY_COMPARISON_ANALYTICS_CONFIG,
} from '@/features/salary-increment/lib/analytics';
import type {
  SalaryComparisonInsightPeriod,
  SalaryComparisonInsightTab,
  SalaryComparisonMode,
} from '@/features/salary-increment/types';

export default function useComparisonInsights(mode: SalaryComparisonMode, fiscalYear: string) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<SalaryComparisonInsightTab>('taxBands');
  const [period, setPeriod] = useState<SalaryComparisonInsightPeriod>('monthly');

  const showInsights = useCallback(() => {
    trackAnalyticsEvent(
      SALARY_COMPARISON_ANALYTICS_CONFIG[mode].events.showInsights,
      buildSalaryComparisonInsightsParameters(mode, fiscalYear),
    );
    setIsVisible(true);
  }, [fiscalYear, mode]);

  const hideInsights = useCallback(() => setIsVisible(false), []);

  return {
    activeTab,
    hideInsights,
    isVisible,
    period,
    setActiveTab,
    setPeriod,
    showInsights,
  };
}
