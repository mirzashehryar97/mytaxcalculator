import type { ComparisonDirection } from '@/features/salary-increment/lib/presentation';

interface SummaryVariantStyles {
  amount: string;
  badge: string;
  container: string;
  divider: string;
  icon: string;
  wallet: string;
}

export const SALARY_COMPARISON_SUMMARY_STYLES: Record<ComparisonDirection, SummaryVariantStyles> = {
  increase: {
    amount: 'text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-800',
    container:
      'border-emerald-200 bg-gradient-to-br from-emerald-100/90 via-emerald-50/60 to-white sm:bg-gradient-to-r',
    divider: 'bg-gray-200 sm:w-px',
    icon: 'bg-emerald-600 text-white',
    wallet: 'bg-emerald-100/80 text-emerald-700 ring-emerald-200/60',
  },
  decrease: {
    amount: 'text-rose-600',
    badge: 'bg-rose-100 text-rose-800',
    container:
      'border-rose-200 bg-gradient-to-br from-rose-100/90 via-rose-50/60 to-white sm:bg-gradient-to-r',
    divider: 'bg-rose-200 sm:border-rose-300 sm:border-l sm:border-dashed sm:bg-transparent',
    icon: 'bg-white text-rose-600 ring-1 ring-rose-200',
    wallet: 'bg-rose-100/80 text-rose-600 ring-rose-200/60',
  },
  same: {
    amount: 'text-slate-700',
    badge: 'bg-slate-200 text-slate-700',
    container:
      'border-slate-200 bg-gradient-to-br from-slate-100/90 via-slate-50/60 to-white sm:bg-gradient-to-r',
    divider: 'bg-gray-200 sm:w-px',
    icon: 'bg-slate-500 text-white',
    wallet: 'bg-slate-100/80 text-slate-700 ring-slate-200/60',
  },
};
