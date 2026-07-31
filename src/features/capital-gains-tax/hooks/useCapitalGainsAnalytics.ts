'use client';

import { useEffect, useRef } from 'react';

import { trackAnalyticsEvent } from '@/lib/analytics';

type AnalyticsParameters = Record<string, boolean | number | string>;

interface UseCapitalGainsAnalyticsOptions<TFormState> {
  formState: TFormState;
  isValid: boolean;
  pageViewEvent: string;
  pageViewContext: AnalyticsParameters;
  useEvent: string;
  buildUseParameters: (formState: TFormState) => AnalyticsParameters;
}

/**
 * One page-view event per mount, and one "somebody actually used it" event the
 * first time the form moves away from its defaults. Shared by all three
 * capital-gains calculators so they report identically.
 */
export default function useCapitalGainsAnalytics<TFormState>({
  formState,
  isValid,
  pageViewEvent,
  pageViewContext,
  useEvent,
  buildUseParameters,
}: UseCapitalGainsAnalyticsOptions<TFormState>) {
  const initialFormState = useRef(formState);
  const hasTrackedPageView = useRef(false);
  const hasTrackedUse = useRef(false);
  const trackedUseEvent = useRef({ useEvent, buildUseParameters });

  trackedUseEvent.current = { useEvent, buildUseParameters };

  useEffect(() => {
    if (hasTrackedPageView.current) {
      return;
    }

    trackAnalyticsEvent(pageViewEvent, pageViewContext);
    hasTrackedPageView.current = true;
  }, [pageViewEvent, pageViewContext]);

  useEffect(() => {
    if (hasTrackedUse.current || formState === initialFormState.current || !isValid) {
      return;
    }

    const { useEvent: eventName, buildUseParameters: build } = trackedUseEvent.current;
    trackAnalyticsEvent(eventName, build(formState));
    hasTrackedUse.current = true;
  }, [formState, isValid]);
}
