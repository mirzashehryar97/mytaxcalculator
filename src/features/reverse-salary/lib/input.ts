import { DEFAULT_SALARY_TAX_YEAR, resolveSalaryTaxYear } from '@/lib/salaryTaxYears';

import type { ReverseSalaryFormState } from '@/features/reverse-salary/types';

export const REVERSE_SALARY_QUICK_PICKS = [100_000, 200_000, 300_000, 500_000] as const;

export const DEFAULT_REVERSE_SALARY_FORM = {
  fiscalYear: DEFAULT_SALARY_TAX_YEAR,
  desiredTakeHome: '300000',
} satisfies ReverseSalaryFormState;

export function parseDesiredTakeHome(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function isReverseSalaryValid(formState: ReverseSalaryFormState): boolean {
  return parseDesiredTakeHome(formState.desiredTakeHome) > 0;
}

export function resolveReverseFiscalYear(value: string): string {
  return resolveSalaryTaxYear(value);
}
