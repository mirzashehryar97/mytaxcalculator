'use client';

import { useEffect, useRef } from 'react';

import { trackAnalyticsEvent } from '@/lib/analytics';

import {
  buildRentalUseEventParameters,
  RENTAL_ANALYTICS_CONTEXT,
  RENTAL_ANALYTICS_EVENTS,
} from '@/features/rental-income-tax/lib/analytics';
import type { RentalTaxFormState } from '@/features/rental-income-tax/types';

export default function useRentalAnalytics(formState: RentalTaxFormState, isValid: boolean) {
  const initialFormState = useRef(formState);
  const hasTrackedPageView = useRef(false);
  const hasTrackedCalculatorUse = useRef(false);

  useEffect(() => {
    if (hasTrackedPageView.current) {
      return;
    }

    trackAnalyticsEvent(RENTAL_ANALYTICS_EVENTS.pageView, RENTAL_ANALYTICS_CONTEXT);
    hasTrackedPageView.current = true;
  }, []);

  useEffect(() => {
    if (hasTrackedCalculatorUse.current || formState === initialFormState.current || !isValid) {
      return;
    }

    trackAnalyticsEvent(
      RENTAL_ANALYTICS_EVENTS.calculatorUse,
      buildRentalUseEventParameters(formState),
    );
    hasTrackedCalculatorUse.current = true;
  }, [formState, isValid]);
}
