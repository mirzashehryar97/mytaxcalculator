'use client';

import { useEffect, useRef } from 'react';

import { sendGAEvent } from '@next/third-parties/google';

import {
  BUSINESS_ANALYTICS_CONTEXT,
  BUSINESS_ANALYTICS_EVENTS,
  buildBusinessUseEventParameters,
} from '@/features/business-tax/lib/analytics';
import type { BusinessTaxFormState } from '@/features/business-tax/types';

export default function useBusinessAnalytics(formState: BusinessTaxFormState, isValid: boolean) {
  const initialFormState = useRef(formState);
  const hasTrackedPageView = useRef(false);
  const hasTrackedCalculatorUse = useRef(false);

  useEffect(() => {
    if (hasTrackedPageView.current) {
      return;
    }

    sendGAEvent('event', BUSINESS_ANALYTICS_EVENTS.pageView, BUSINESS_ANALYTICS_CONTEXT);
    hasTrackedPageView.current = true;
  }, []);

  useEffect(() => {
    if (hasTrackedCalculatorUse.current || formState === initialFormState.current || !isValid) {
      return;
    }

    sendGAEvent(
      'event',
      BUSINESS_ANALYTICS_EVENTS.calculatorUse,
      buildBusinessUseEventParameters(formState),
    );
    hasTrackedCalculatorUse.current = true;
  }, [formState, isValid]);
}
