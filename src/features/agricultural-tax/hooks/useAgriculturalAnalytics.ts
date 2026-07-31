'use client';

import { useEffect, useRef } from 'react';

import { trackAnalyticsEvent } from '@/lib/analytics';

import {
  AGRICULTURAL_ANALYTICS_EVENTS,
  buildAgriculturalAnalyticsContext,
  buildAgriculturalUseParameters,
} from '@/features/agricultural-tax/lib/analytics';
import type { AgriculturalFormState } from '@/features/agricultural-tax/lib/input';

/**
 * One page-view event when the calculator mounts, and one "was actually used"
 * event the first time the form moves off its defaults with a usable figure in
 * it.
 */
export default function useAgriculturalAnalytics(
  formState: AgriculturalFormState,
  isValid: boolean,
) {
  const initialFormState = useRef(formState);
  const hasTrackedPageView = useRef(false);
  const hasTrackedCalculatorUse = useRef(false);

  useEffect(() => {
    if (hasTrackedPageView.current) {
      return;
    }

    trackAnalyticsEvent(
      AGRICULTURAL_ANALYTICS_EVENTS.pageView,
      buildAgriculturalAnalyticsContext(),
    );
    hasTrackedPageView.current = true;
  }, []);

  useEffect(() => {
    if (hasTrackedCalculatorUse.current || formState === initialFormState.current || !isValid) {
      return;
    }

    trackAnalyticsEvent(
      AGRICULTURAL_ANALYTICS_EVENTS.calculatorUse,
      buildAgriculturalUseParameters(formState),
    );
    hasTrackedCalculatorUse.current = true;
  }, [formState, isValid]);
}
