import { DEFAULT_SALARY_TAX_YEAR, resolveSalaryTaxYear } from '@/lib/salaryTaxYears';

import type { EmbedSalaryTaxFormState } from '@/features/embed-salary-tax/types';

export const DEFAULT_EMBED_SALARY_TAX_FORM = {
  monthlySalary: '250000',
  fiscalYear: DEFAULT_SALARY_TAX_YEAR,
} satisfies EmbedSalaryTaxFormState;

export function parseMonthlySalary(value: string): number {
  const parsed = Number(value.replaceAll(',', '').trim());
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function isEmbedSalaryTaxFormValid(formState: EmbedSalaryTaxFormState): boolean {
  return parseMonthlySalary(formState.monthlySalary) > 0;
}

export function resolveEmbedSalaryTaxFiscalYear(value: string): string {
  return resolveSalaryTaxYear(value);
}
