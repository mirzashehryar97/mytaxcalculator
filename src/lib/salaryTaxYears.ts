import { taxSlabs } from '@/utils/taxCalculator';

/**
 * Shared salary fiscal-year list for the salary calculator and its planning tools
 * (increment/job-offer and reverse-salary). Driven by the salary slab table so a new
 * fiscal year automatically flows into every salary-based calculator's dropdown.
 * Ordered newest-first by the insertion order of {@link taxSlabs}.
 */
export const SALARY_TAX_YEARS = Object.keys(taxSlabs);

export const DEFAULT_SALARY_TAX_YEAR = SALARY_TAX_YEARS[0] ?? '2026-2027';

export function isSalaryTaxYear(value: string): boolean {
  return Object.hasOwn(taxSlabs, value);
}

export function resolveSalaryTaxYear(value: string): string {
  return isSalaryTaxYear(value) ? value : DEFAULT_SALARY_TAX_YEAR;
}
