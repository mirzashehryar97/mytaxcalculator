import { ArrowDown, ArrowUp, Minus } from 'lucide-react';

import type { BudgetComparisonRow, BudgetMetric } from '@/features/budget-comparison/types';

export function getMetricToneStyle(tone: BudgetMetric['tone']) {
  if (tone === 'negative') {
    return { icon: ArrowDown, badgeClass: 'bg-red-50 text-red-700' };
  }

  if (tone === 'positive') {
    return { icon: ArrowUp, badgeClass: 'bg-emerald-50 text-emerald-800' };
  }

  return { icon: Minus, badgeClass: 'bg-slate-100 text-slate-600' };
}

export function getComparisonImpactClass(tone: BudgetComparisonRow['tone']) {
  if (tone === 'positive') return 'bg-emerald-50 text-emerald-800 ring-emerald-100';
  if (tone === 'negative') return 'bg-red-50 text-red-700 ring-red-100';
  if (tone === 'info') return 'bg-blue-50 text-blue-800 ring-blue-100';
  return 'bg-slate-100 text-slate-700 ring-slate-200';
}
