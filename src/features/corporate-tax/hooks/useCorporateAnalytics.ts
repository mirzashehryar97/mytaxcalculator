'use client';

import { useEffect, useRef } from 'react';

import { trackAnalyticsEvent } from '@/lib/analytics';

import {
  buildCorporateAnalyticsContext,
  CORPORATE_ANALYTICS_EVENTS,
} from '@/features/corporate-tax/lib/analytics';
import type { CorporateMode } from '@/features/corporate-tax/types';

type UseEventParameters = Record<string, string>;

/**
 * One page-view event when the calculator mounts, and one "was actually used"
 * event the first time the form moves away from its defaults with a usable
 * value in it. Shared by all three corporate calculators.
 */
export default function useCorporateAnalytics<TFormState>(
  mode: CorporateMode,
  formState: TFormState,
  isValid: boolean,
  buildUseParameters: (formState: TFormState) => UseEventParameters,
) {
  const initialFormState = useRef(formState);
  const hasTrackedPageView = useRef(false);
  const hasTrackedCalculatorUse = useRef(false);

  useEffect(() => {
    if (hasTrackedPageView.current) {
      return;
    }

    trackAnalyticsEvent(CORPORATE_ANALYTICS_EVENTS.pageView, buildCorporateAnalyticsContext(mode));
    hasTrackedPageView.current = true;
  }, [mode]);

  useEffect(() => {
    if (hasTrackedCalculatorUse.current || formState === initialFormState.current || !isValid) {
      return;
    }

    trackAnalyticsEvent(CORPORATE_ANALYTICS_EVENTS.calculatorUse, buildUseParameters(formState));
    hasTrackedCalculatorUse.current = true;
  }, [formState, isValid, buildUseParameters]);
}
