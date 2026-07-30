'use client';

import { useEffect, useRef } from 'react';

import { trackAnalyticsEvent } from '@/lib/analytics';

import {
  buildPropertyAnalyticsContext,
  PROPERTY_ANALYTICS_EVENTS,
} from '@/features/property-tax/lib/analytics';
import type { PropertyMode } from '@/features/property-tax/types';

/** Mirrors the value types `trackAnalyticsEvent` accepts. */
type PropertyEventParameters = Record<string, boolean | null | number | string>;

/**
 * Records one page view and, the first time the visitor changes anything, one
 * "they actually used it" event. Both fire at most once per mount.
 */
export default function usePropertyAnalytics(
  mode: PropertyMode,
  formState: object,
  isValid: boolean,
  eventParameters: PropertyEventParameters,
) {
  const initialFormState = useRef(formState);
  const hasTrackedPageView = useRef(false);
  const hasTrackedCalculatorUse = useRef(false);
  const latestParameters = useRef(eventParameters);
  latestParameters.current = eventParameters;

  useEffect(() => {
    if (hasTrackedPageView.current) {
      return;
    }

    trackAnalyticsEvent(PROPERTY_ANALYTICS_EVENTS.pageView, buildPropertyAnalyticsContext(mode));
    hasTrackedPageView.current = true;
  }, [mode]);

  useEffect(() => {
    if (hasTrackedCalculatorUse.current || formState === initialFormState.current || !isValid) {
      return;
    }

    trackAnalyticsEvent(PROPERTY_ANALYTICS_EVENTS.calculatorUse, latestParameters.current);
    hasTrackedCalculatorUse.current = true;
  }, [formState, isValid]);
}
