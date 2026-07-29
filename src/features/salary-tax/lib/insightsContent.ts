import type { SalaryInsightPeriod, SalaryInsightTab } from '@/features/salary-tax/types';

export const SALARY_INSIGHT_TABS: ReadonlyArray<{
  id: SalaryInsightTab;
  label: string;
}> = [
  { id: 'overview', label: 'Overview' },
  { id: 'fiscalComparison', label: 'Fiscal year comparison' },
  { id: 'taxBands', label: 'Tax bands' },
];

export const SALARY_INSIGHT_PERIOD_OPTIONS: ReadonlyArray<{
  label: string;
  value: SalaryInsightPeriod;
}> = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Annual', value: 'annual' },
];

export const SALARY_INSIGHT_PERIOD_COPY = {
  monthly: {
    chartPeriod: 'monthly',
    headlineSuffix: '/ month',
    label: 'Monthly',
    secondaryPeriod: 'year',
    takeHomeLabel: 'Monthly take-home',
  },
  annual: {
    chartPeriod: 'annual',
    headlineSuffix: '/ year',
    label: 'Annual',
    secondaryPeriod: 'month',
    takeHomeLabel: 'Annual take-home',
  },
} as const;

export const PROGRESSIVE_TAX_STEPS = [
  { id: 'split', label: 'Income is split' },
  { id: 'rate', label: 'Each band gets a rate' },
  { id: 'total', label: 'Tax is added together' },
] as const;

export const MARGINAL_RATE_TOOLTIP = {
  label: 'What does marginal tax rate mean?',
  text: 'The rate applied only to the next rupee you earn in your current tax band—not to all of your income.',
} as const;
