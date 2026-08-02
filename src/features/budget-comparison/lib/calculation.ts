import { salaryTaxForYear } from '@/utils/taxCalculator';

import type { SalaryBudgetResult } from '@/features/budget-comparison/types';

export const PREVIOUS_FISCAL_YEAR = '2025-2026';
export const CURRENT_FISCAL_YEAR = '2026-2027';

function calculateAnnualSalaryTax(monthlySalary: number, fiscalYear: string): number {
  return salaryTaxForYear(monthlySalary * 12, fiscalYear).totalTax;
}

export function calculateSalaryBudgetComparison(monthlySalary: number): SalaryBudgetResult {
  const previousTax = calculateAnnualSalaryTax(monthlySalary, PREVIOUS_FISCAL_YEAR);
  const currentTax = calculateAnnualSalaryTax(monthlySalary, CURRENT_FISCAL_YEAR);

  return {
    monthlySalary,
    previousTax,
    currentTax,
    annualSavings: previousTax - currentTax,
  };
}

export function parseMonthlySalary(value: string): number | null {
  const parsedValue = Number(value.replaceAll(',', '').trim());
  return Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : null;
}

export function formatPkr(value: number): string {
  return `PKR ${Math.round(value).toLocaleString('en-PK')}`;
}
