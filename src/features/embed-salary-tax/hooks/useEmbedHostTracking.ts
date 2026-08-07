'use client';

import { useEffect, useRef } from 'react';

import { trackAnalyticsEvent } from '@/lib/analytics';

import { EMBED_SALARY_TAX_ROUTE } from '@/features/embed-salary-tax/lib/content';
import { resolveEmbedHost } from '@/features/embed-salary-tax/lib/embedHost';

/**
 * Reports one `embed_calculator_load` event per framed page load, tagged with the hostname of the
 * site doing the embedding, so the Vercel dashboard can list publishers instead of guessing from
 * referrers. Top-level visits to `/embed/salary-tax` are our own preview and are not counted.
 */
export default function useEmbedHostTracking() {
  const hasReported = useRef(false);

  useEffect(() => {
    if (hasReported.current || window.self === window.top) {
      return;
    }
    hasReported.current = true;

    // `ancestorOrigins` is absent in Firefox; `Array.from` over the array-like keeps the pure
    // resolver free of DOM types.
    const ancestorOrigins = Array.from(window.location.ancestorOrigins ?? []);

    trackAnalyticsEvent('embed_calculator_load', {
      calculator: 'embed_salary_tax',
      page_path: EMBED_SALARY_TAX_ROUTE,
      // Bucketed rather than dropped: an unresolvable host still tells us how much of the embed
      // traffic this measurement cannot see.
      host: resolveEmbedHost(ancestorOrigins, document.referrer) ?? 'unknown',
    });
  }, []);
}
