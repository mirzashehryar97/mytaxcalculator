'use client';

import { useCallback, useRef } from 'react';

import { trackAnalyticsEvent } from '@/lib/analytics';

import {
  buildMultiYearUseEventParameters,
  MULTI_YEAR_ANALYTICS_EVENTS,
} from '@/features/multi-year-tax/lib/analytics';
import type { MultiYearResult, SalaryPeriod } from '@/features/multi-year-tax/types';

/** Reports one multi-year "use" per visit, on the first successful calculation. */
export default function useMultiYearAnalytics() {
  const hasTrackedUse = useRef(false);

  return useCallback((periods: SalaryPeriod[], result: MultiYearResult) => {
    if (hasTrackedUse.current) {
      return;
    }

    hasTrackedUse.current = true;
    trackAnalyticsEvent(
      MULTI_YEAR_ANALYTICS_EVENTS.calculatorUse,
      buildMultiYearUseEventParameters(periods, result),
    );
  }, []);
}
