import type { SummaryStatTone } from '@/features/multi-year-tax/types';

/** Small uppercase caption used above each field group in a period card. */
export const FIELD_GROUP_LABEL_CLASS =
  'font-semibold text-gray-500 text-xs uppercase tracking-wide';

/** Label above a single day / month / year dropdown. */
export const DATE_PART_LABEL_CLASS = 'mb-1.5 block font-medium text-gray-600 text-xs';

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

const OPTION_BASE_CLASS =
  'flex min-h-9 items-center justify-between gap-2 px-3 py-2 text-sm transition-colors';

export function getDatePartOptionClass(state: {
  isActive: boolean;
  isBlocked: boolean;
  isSelected: boolean;
}): string {
  if (state.isBlocked) {
    return `${OPTION_BASE_CLASS} cursor-not-allowed text-gray-300 ${
      state.isActive ? 'bg-gray-50' : ''
    }`;
  }

  if (state.isSelected) {
    return `${OPTION_BASE_CLASS} cursor-pointer bg-emerald-50 font-semibold text-emerald-700`;
  }

  return `${OPTION_BASE_CLASS} cursor-pointer text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 ${
    state.isActive ? 'bg-emerald-50 text-emerald-800' : ''
  }`;
}
