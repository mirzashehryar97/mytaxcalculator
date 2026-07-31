import type { SummaryStatTone } from '@/features/multi-year-tax/types';

/** Small uppercase caption used above each field group in a period card. */
export const FIELD_GROUP_LABEL_CLASS =
  'font-semibold text-gray-500 text-xs uppercase tracking-wide';

/** Panels that make up the results: summary, breakdown, charts. */
export const RESULT_PANEL_CLASS = 'rounded-2xl border border-gray-200 bg-white p-4 sm:p-6';

const SUMMARY_TONE_CLASS: Record<SummaryStatTone, string> = {
  neutral: 'text-gray-900',
  negative: 'text-red-600',
  positive: 'text-emerald-600',
};

export function getSummaryStatToneClass(tone: SummaryStatTone): string {
  return SUMMARY_TONE_CLASS[tone];
}
