import { sendGAEvent } from '@next/third-parties/google';

type AnalyticsPropertyValue = boolean | null | number | string;

type AnalyticsProperties = Record<string, AnalyticsPropertyValue>;

/**
 * Custom events currently go to Google Analytics only. Vercel Web Analytics caps custom events at
 * two properties per event on Pro, which most of our events exceed, so `track()` from
 * `@vercel/analytics` is intentionally not called here. Automatic page views are unaffected —
 * those come from `<Analytics />` in the root layout.
 */
export function trackAnalyticsEvent(eventName: string, properties: AnalyticsProperties = {}) {
  sendGAEvent('event', eventName, properties);
}
