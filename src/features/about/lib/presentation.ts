import type { AboutPreviewTone } from '@/features/about/types';

interface PreviewToneStyle {
  row: string;
  label: string;
  dashes: string;
}

const PROCESS_RAIL_BASE = 'absolute top-1/2 hidden h-px bg-emerald-800/30 sm:block';

/**
 * Connector rail behind a numbered step. The rail bleeds half the grid gap (`-3`)
 * into the neighbouring column so the line reads as continuous, and the first and
 * last steps only draw on their inner side so the timeline ends on a circle.
 */
export function getProcessRailClass(isFirst: boolean, isLast: boolean): string {
  if (isFirst && isLast) {
    return 'hidden';
  }
  if (isFirst) {
    return `${PROCESS_RAIL_BASE} -right-3 left-1/2`;
  }
  if (isLast) {
    return `${PROCESS_RAIL_BASE} -left-3 right-1/2`;
  }
  return `${PROCESS_RAIL_BASE} -inset-x-3`;
}

/**
 * Result colours for the hero preview card: the income base stays neutral, tax is
 * red and take-home pay is green — the same convention every calculator uses.
 */
export const ABOUT_PREVIEW_TONE_STYLES: Record<AboutPreviewTone, PreviewToneStyle> = {
  neutral: {
    row: 'bg-[#f6f7f6]',
    label: 'text-gray-900',
    dashes: 'text-gray-400',
  },
  negative: {
    row: 'bg-red-50/80',
    label: 'text-red-600',
    dashes: 'text-red-400',
  },
  positive: {
    row: 'bg-emerald-50/80',
    label: 'text-emerald-700',
    dashes: 'text-emerald-500',
  },
};
