import { REVERSE_SALARY_RESULT_COPY } from '@/features/reverse-salary/lib/content';
import { formatPkr } from '@/features/reverse-salary/lib/formatting';
import type { ReverseSalaryResult } from '@/features/reverse-salary/types';

/**
 * Result colour convention (see CLAUDE.md): pre-tax gross is neutral, tax owed is
 * negative (red), and the take-home kept is positive (green).
 */
export type ReverseResultTone = 'neutral' | 'negative' | 'positive';

export interface ReverseBreakdownRow {
  label: string;
  value: string;
  tone: ReverseResultTone;
}

export interface ReverseBreakdownSection {
  id: string;
  title: string;
  rows: ReverseBreakdownRow[];
}

/**
 * Builds the monthly and annual breakdown sections, mirroring the salary-tax
 * calculator's two-card layout (gross → tax → net).
 */
export function buildReverseBreakdownSections(
  result: ReverseSalaryResult,
): ReverseBreakdownSection[] {
  const copy = REVERSE_SALARY_RESULT_COPY;
  return [
    {
      id: 'monthly',
      title: copy.monthlyBreakdownTitle,
      rows: [
        {
          label: copy.grossRowLabel,
          value: formatPkr(result.requiredMonthlyGross),
          tone: 'neutral',
        },
        { label: copy.taxRowLabel, value: formatPkr(result.monthlyTax), tone: 'negative' },
        { label: copy.netRowLabel, value: formatPkr(result.monthlyNet), tone: 'positive' },
      ],
    },
    {
      id: 'annual',
      title: copy.annualBreakdownTitle,
      rows: [
        {
          label: copy.grossRowLabel,
          value: formatPkr(result.requiredAnnualGross),
          tone: 'neutral',
        },
        { label: copy.taxRowLabel, value: formatPkr(result.annualTax), tone: 'negative' },
        { label: copy.netRowLabel, value: formatPkr(result.annualNet), tone: 'positive' },
      ],
    },
  ];
}
