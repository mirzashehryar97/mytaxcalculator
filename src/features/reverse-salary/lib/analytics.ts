import { REVERSE_SALARY_ROUTE } from '@/features/reverse-salary/lib/content';
import type { ReverseSalaryFormState } from '@/features/reverse-salary/types';

export const REVERSE_SALARY_ANALYTICS_EVENTS = {
  pageView: 'reverse_salary_view',
  calculatorUse: 'reverse_salary_use',
} as const;

export const REVERSE_SALARY_ANALYTICS_CONTEXT = {
  calculator: 'reverse_salary',
  page_path: REVERSE_SALARY_ROUTE,
} as const;

export function buildReverseSalaryUseParameters(formState: ReverseSalaryFormState) {
  return {
    ...REVERSE_SALARY_ANALYTICS_CONTEXT,
    fiscal_year: formState.fiscalYear,
  } as const;
}
