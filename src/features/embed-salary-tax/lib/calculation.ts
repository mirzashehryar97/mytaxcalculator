import { calculateBudgetYearTax } from '@/lib/budgetComparison';

import type { EmbedSalaryTaxResult } from '@/features/embed-salary-tax/types';

export function calcEmbedSalaryTax(
  monthlySalary: number,
  fiscalYear: string,
): EmbedSalaryTaxResult {
  const calculation = calculateBudgetYearTax(monthlySalary, fiscalYear);

  return {
    monthlyGross: monthlySalary,
    monthlyTax: calculation.monthlyTax,
    monthlyTakeHome: calculation.monthlyTakeHome,
    annualGross: calculation.yearlyIncome,
    annualTax: calculation.yearlyTax,
    annualTakeHome: calculation.yearlyTakeHome,
    effectiveRate: calculation.effectiveRate,
  };
}
