import type { SalaryComparisonInsightTone } from '@/features/salary-increment/types';

const INSIGHT_TONE_CLASSES = {
  neutral: {
    icon: 'bg-gray-100 text-gray-600',
    text: 'text-gray-900',
  },
  positive: {
    icon: 'bg-emerald-100 text-emerald-700',
    text: 'text-emerald-700',
  },
  negative: {
    icon: 'bg-red-100 text-red-600',
    text: 'text-red-600',
  },
  info: {
    icon: 'bg-blue-100 text-blue-700',
    text: 'text-blue-700',
  },
} as const;

export function getInsightToneClasses(tone: SalaryComparisonInsightTone) {
  return INSIGHT_TONE_CLASSES[tone];
}

export function getValueChangeTone(value: number): SalaryComparisonInsightTone {
  if (value > 0) {
    return 'positive';
  }
  if (value < 0) {
    return 'negative';
  }
  return 'neutral';
}

export function getTaxChangeTone(value: number): SalaryComparisonInsightTone {
  if (value > 0) {
    return 'negative';
  }
  if (value < 0) {
    return 'positive';
  }
  return 'neutral';
}
