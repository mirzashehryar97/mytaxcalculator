'use client';

import { useEffect, useRef } from 'react';

import { trackAnalyticsEvent } from '@/lib/analytics';

import {
  buildSalaryComparisonUseParameters,
  SALARY_COMPARISON_ANALYTICS_CONFIG,
} from '@/features/salary-increment/lib/analytics';
import type {
  SalaryComparisonFormState,
  SalaryComparisonMode,
} from '@/features/salary-increment/types';

export default function useSalaryComparisonAnalytics(
  mode: SalaryComparisonMode,
  formState: SalaryComparisonFormState,
  isValid: boolean,
) {
  const analytics = SALARY_COMPARISON_ANALYTICS_CONFIG[mode];
  const initialFormState = useRef(formState);
  const hasTrackedPageView = useRef(false);
  const hasTrackedCalculatorUse = useRef(false);

  useEffect(() => {
    if (hasTrackedPageView.current) {
      return;
    }

    trackAnalyticsEvent(analytics.events.pageView, analytics.context);
    hasTrackedPageView.current = true;
  }, [analytics]);

  useEffect(() => {
    if (hasTrackedCalculatorUse.current || formState === initialFormState.current || !isValid) {
      return;
    }

    trackAnalyticsEvent(
      analytics.events.calculatorUse,
      buildSalaryComparisonUseParameters(mode, formState),
    );
    hasTrackedCalculatorUse.current = true;
  }, [analytics, mode, formState, isValid]);
}
