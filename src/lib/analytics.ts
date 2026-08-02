import { sendGAEvent } from '@next/third-parties/google';
import { track as trackVercelEvent } from '@vercel/analytics';

type AnalyticsPropertyValue = boolean | null | number | string;

type AnalyticsProperties = Record<string, AnalyticsPropertyValue>;

const VERCEL_CUSTOM_EVENTS = new Set([
  'embed_calculator_click',
  'show_insights_click',
  'salary_increment_show_insights_click',
  'job_offer_comparison_show_insights_click',
]);

/**
 * All custom events go to Google Analytics. Vercel receives only the explicitly allowlisted
 * conversion events above; automatic page views remain handled by `<Analytics />` in the root
 * layout.
 */
export function trackAnalyticsEvent(eventName: string, properties: AnalyticsProperties = {}) {
  sendGAEvent('event', eventName, properties);

  if (VERCEL_CUSTOM_EVENTS.has(eventName)) {
    trackVercelEvent(eventName, properties);
  }
}
