import { salaryTaxForYear } from '@/utils/taxCalculator';

import type {
  SalaryComparison,
  SalaryComparisonMode,
  SalaryScenario,
  SalaryScenarioInput,
} from '@/features/salary-increment/types';

const MONTHS_IN_YEAR = 12;

function toNonNegative(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

/**
 * Computes the salary tax and take-home figures for one scenario using the salary slab
 * engine. Bonus is treated as taxable salary; deductions reduce take-home after tax
 * (e.g. a salary advance being recovered, society dues) and do not lower the taxable amount.
 */
export function computeSalaryScenario(
  input: SalaryScenarioInput,
  fiscalYear: string,
): SalaryScenario {
  const bonusMonthly = toNonNegative(input.bonusMonthly);
  const grossMonthly = toNonNegative(input.baseMonthly) + bonusMonthly;
  const deductionMonthly = toNonNegative(input.deductionMonthly);

  const annualGross = grossMonthly * MONTHS_IN_YEAR;
  const tax = salaryTaxForYear(annualGross, fiscalYear);
  const annualTax = tax.totalTax;
  const monthlyTax = annualTax / MONTHS_IN_YEAR;
  const netMonthly = grossMonthly - monthlyTax - deductionMonthly;
  const effectiveRate = annualGross > 0 ? (annualTax / annualGross) * 100 : 0;

  return {
    grossMonthly,
    bonusMonthly,
    monthlyTax,
    monthlySurcharge: tax.surcharge / MONTHS_IN_YEAR,
    netMonthly,
    annualGross,
    annualTax,
    annualNet: netMonthly * MONTHS_IN_YEAR,
    effectiveRate,
  };
}

export function compareSalaryScenarios(
  mode: SalaryComparisonMode,
  currentInput: SalaryScenarioInput,
  nextInput: SalaryScenarioInput,
  fiscalYear: string,
): SalaryComparison {
  const current = computeSalaryScenario(currentInput, fiscalYear);
  const next = computeSalaryScenario(nextInput, fiscalYear);

  const takeHomeIncreaseMonthly = next.netMonthly - current.netMonthly;

  return {
    mode,
    current,
    next,
    grossIncreaseMonthly: next.grossMonthly - current.grossMonthly,
    takeHomeIncreaseMonthly,
    takeHomeIncreaseAnnual: takeHomeIncreaseMonthly * MONTHS_IN_YEAR,
    extraMonthlyTax: next.monthlyTax - current.monthlyTax,
    extraAnnualTax: next.annualTax - current.annualTax,
  };
}

/** Applies a percentage increment to a base monthly salary. */
export function applyIncrement(baseMonthly: number, incrementPercent: number): number {
  const base = toNonNegative(baseMonthly);
  const percent = Number.isFinite(incrementPercent) ? incrementPercent : 0;
  return base * (1 + percent / 100);
}
