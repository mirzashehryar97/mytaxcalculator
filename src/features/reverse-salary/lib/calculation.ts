import { getSalarySurcharge, salaryTaxForYear } from '@/utils/taxCalculator';

import type { ReverseSalaryResult } from '@/features/reverse-salary/types';

const MONTHS_IN_YEAR = 12;
const MAX_ITERATIONS = 100;
const MAX_GROSS = 1e15;

function annualNetFor(annualGross: number, fiscalYear: string): number {
  return annualGross - salaryTaxForYear(annualGross, fiscalYear).totalTax;
}

/**
 * Smallest gross up to `highGross` whose take-home clears the target. Gross is never
 * below the net it leaves, so the target itself is the lower bound; the caller picks
 * `highGross` so that take-home rises continuously across the whole span.
 */
function smallestGrossUpTo(highGross: number, targetAnnualNet: number, fiscalYear: string): number {
  let low = targetAnnualNet;
  let high = highGross;

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

/**
 * Inverts the salary engine: finds the smallest annual gross whose after-tax income is
 * at least `targetAnnualNet`, reusing the exact verified tax figures rather than
 * re-deriving the slab maths.
 *
 * Take-home rises continuously with gross *except* at the §4AB surcharge threshold,
 * where the whole surcharge lands at once and take-home drops — a raise of one rupee
 * can leave someone worse off. That makes a plain bisection unsafe: take-home crosses
 * the target twice, and the search could settle on the far side of the gap and quote a
 * gross far higher than the job actually needs. So the span below the threshold is
 * tried first; a gross at or under it that already clears the target is the real answer.
 */
export function grossForNetAnnual(targetAnnualNet: number, fiscalYear: string): number {
  if (!Number.isFinite(targetAnnualNet) || targetAnnualNet <= 0) {
    return 0;
  }

  const surcharge = getSalarySurcharge(fiscalYear);
  if (surcharge && annualNetFor(surcharge.threshold, fiscalYear) >= targetAnnualNet) {
    return smallestGrossUpTo(surcharge.threshold, targetAnnualNet, fiscalYear);
  }

  let high = targetAnnualNet;
  while (annualNetFor(high, fiscalYear) < targetAnnualNet && high < MAX_GROSS) {
    high *= 2;
  }

  return smallestGrossUpTo(high, targetAnnualNet, fiscalYear);
}

export function calcReverseSalary(
  desiredMonthlyNet: number,
  fiscalYear: string,
): ReverseSalaryResult {
  const monthlyNet =
    Number.isFinite(desiredMonthlyNet) && desiredMonthlyNet > 0 ? desiredMonthlyNet : 0;
  const targetAnnualNet = monthlyNet * MONTHS_IN_YEAR;
  const requiredAnnualGross = Math.round(grossForNetAnnual(targetAnnualNet, fiscalYear));
  const tax = salaryTaxForYear(requiredAnnualGross, fiscalYear);
  const annualTax = tax.totalTax;
  const annualNet = requiredAnnualGross - annualTax;
  const effectiveRate = requiredAnnualGross > 0 ? (annualTax / requiredAnnualGross) * 100 : 0;

  return {
    fiscalYear,
    desiredMonthlyNet: monthlyNet,
    requiredMonthlyGross: requiredAnnualGross / MONTHS_IN_YEAR,
    requiredAnnualGross,
    monthlyTax: annualTax / MONTHS_IN_YEAR,
    annualTax,
    monthlySurcharge: tax.surcharge / MONTHS_IN_YEAR,
    annualSurcharge: tax.surcharge,
    monthlyNet: annualNet / MONTHS_IN_YEAR,
    annualNet,
    effectiveRate,
  };
}
