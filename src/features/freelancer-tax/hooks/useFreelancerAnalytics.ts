'use client';

import { useEffect, useRef } from 'react';

import { trackAnalyticsEvent } from '@/lib/analytics';

import {
  buildFreelancerUseEventParameters,
  FREELANCER_ANALYTICS_CONTEXT,
  FREELANCER_ANALYTICS_EVENTS,
} from '@/features/freelancer-tax/lib/analytics';
import type { FreelancerTaxFormState } from '@/features/freelancer-tax/types';

export default function useFreelancerAnalytics(
  formState: FreelancerTaxFormState,
  isValid: boolean,
) {
  const initialFormState = useRef(formState);
  const hasTrackedPageView = useRef(false);
  const hasTrackedCalculatorUse = useRef(false);

  useEffect(() => {
    if (hasTrackedPageView.current) {
      return;
    }

    trackAnalyticsEvent(FREELANCER_ANALYTICS_EVENTS.pageView, FREELANCER_ANALYTICS_CONTEXT);
    hasTrackedPageView.current = true;
  }, []);

  useEffect(() => {
    if (hasTrackedCalculatorUse.current || formState === initialFormState.current || !isValid) {
      return;
    }

    trackAnalyticsEvent(
      FREELANCER_ANALYTICS_EVENTS.calculatorUse,
      buildFreelancerUseEventParameters(formState),
    );
    hasTrackedCalculatorUse.current = true;
  }, [formState, isValid]);
}
