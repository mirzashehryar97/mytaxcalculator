import { calculateTaxForTotalAmount } from '@/utils/taxCalculator';

import type { ReverseSalaryResult } from '@/features/reverse-salary/types';

const MONTHS_IN_YEAR = 12;
const MAX_ITERATIONS = 100;
const MAX_GROSS = 1e15;

function annualNetFor(annualGross: number, fiscalYear: string): number {
  return annualGross - calculateTaxForTotalAmount(annualGross, fiscalYear);
}

/**
 * Inverts the salary slab engine: finds the smallest annual gross whose after-tax
 * income is at least `targetAnnualNet`. Salary take-home is continuous and increasing
 * in gross across every fiscal year, so a binary search converges reliably and reuses
 * the exact verified tax figures rather than re-deriving the slab maths.
 */
export function grossForNetAnnual(targetAnnualNet: number, fiscalYear: string): number {
  if (!Number.isFinite(targetAnnualNet) || targetAnnualNet <= 0) {
    return 0;
  }

  let low = targetAnnualNet;
  let high = targetAnnualNet;
  while (annualNetFor(high, fiscalYear) < targetAnnualNet && high < MAX_GROSS) {
    high *= 2;
  }

  for (let iteration = 0; iteration < MAX_ITERATIONS; iteration += 1) {
    const mid = (low + high) / 2;
    if (annualNetFor(mid, fiscalYear) < targetAnnualNet) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return high;
}

export function calcReverseSalary(
  desiredMonthlyNet: number,
  fiscalYear: string,
): ReverseSalaryResult {
  const monthlyNet =
    Number.isFinite(desiredMonthlyNet) && desiredMonthlyNet > 0 ? desiredMonthlyNet : 0;
  const targetAnnualNet = monthlyNet * MONTHS_IN_YEAR;
  const requiredAnnualGross = Math.round(grossForNetAnnual(targetAnnualNet, fiscalYear));
  const annualTax = calculateTaxForTotalAmount(requiredAnnualGross, fiscalYear);
  const annualNet = requiredAnnualGross - annualTax;
  const effectiveRate = requiredAnnualGross > 0 ? (annualTax / requiredAnnualGross) * 100 : 0;

  return {
    fiscalYear,
    desiredMonthlyNet: monthlyNet,
    requiredMonthlyGross: requiredAnnualGross / MONTHS_IN_YEAR,
    requiredAnnualGross,
    monthlyTax: annualTax / MONTHS_IN_YEAR,
    annualTax,
    monthlyNet: annualNet / MONTHS_IN_YEAR,
    annualNet,
    effectiveRate,
  };
}
