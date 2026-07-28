'use client';

import { useEffect, useRef } from 'react';

import { trackAnalyticsEvent } from '@/lib/analytics';

import {
  buildReverseSalaryUseParameters,
  REVERSE_SALARY_ANALYTICS_CONTEXT,
  REVERSE_SALARY_ANALYTICS_EVENTS,
} from '@/features/reverse-salary/lib/analytics';
import type { ReverseSalaryFormState } from '@/features/reverse-salary/types';

export default function useReverseSalaryAnalytics(
  formState: ReverseSalaryFormState,
  isValid: boolean,
) {
  const initialFormState = useRef(formState);
  const hasTrackedPageView = useRef(false);
  const hasTrackedCalculatorUse = useRef(false);

  useEffect(() => {
    if (hasTrackedPageView.current) {
      return;
    }

    trackAnalyticsEvent(REVERSE_SALARY_ANALYTICS_EVENTS.pageView, REVERSE_SALARY_ANALYTICS_CONTEXT);
    hasTrackedPageView.current = true;
  }, []);

  useEffect(() => {
    if (hasTrackedCalculatorUse.current || formState === initialFormState.current || !isValid) {
      return;
    }

    trackAnalyticsEvent(
      REVERSE_SALARY_ANALYTICS_EVENTS.calculatorUse,
      buildReverseSalaryUseParameters(formState),
    );
    hasTrackedCalculatorUse.current = true;
  }, [formState, isValid]);
}
