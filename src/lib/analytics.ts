import { sendGAEvent } from '@next/third-parties/google';
import { track } from '@vercel/analytics';

type AnalyticsPropertyValue = boolean | null | number | string;

type AnalyticsProperties = Record<string, AnalyticsPropertyValue>;

export function trackAnalyticsEvent(eventName: string, properties: AnalyticsProperties = {}) {
  sendGAEvent('event', eventName, properties);
  track(eventName, properties);
}
