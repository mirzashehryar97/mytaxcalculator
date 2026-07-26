import { DEFAULT_SALARY_TAX_YEAR, resolveSalaryTaxYear } from '@/lib/salaryTaxYears';

import { applyIncrement } from '@/features/salary-increment/lib/calculation';
import { SALARY_COMPARISON_FORM_COPY } from '@/features/salary-increment/lib/content';
import { formatPercent, formatPkr } from '@/features/salary-increment/lib/formatting';
import type {
  SalaryComparisonFormState,
  SalaryComparisonMode,
  SalaryScenarioInput,
} from '@/features/salary-increment/types';

export const DEFAULT_SALARY_COMPARISON_FORM = {
  fiscalYear: DEFAULT_SALARY_TAX_YEAR,
  currentSalary: '200000',
  incrementType: 'percent',
  incrementPercent: '20',
  incrementAmount: '',
  offeredSalary: '260000',
  bonus: '',
  deductions: '',
  currentBonus: '',
  newBonus: '',
  currentDeductions: '',
  newDeductions: '',
} satisfies SalaryComparisonFormState;

export function parseAmount(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

/** New base monthly salary after applying the increment (percentage or fixed amount). */
export function resolveIncrementedBase(
  baseMonthly: number,
  form: SalaryComparisonFormState,
): number {
  if (form.incrementType === 'amount') {
    return baseMonthly + parseAmount(form.incrementAmount);
  }
  return applyIncrement(baseMonthly, Number(form.incrementPercent));
}

/** The absolute monthly rupee raise the increment represents. */
export function resolveIncrementRaiseAmount(
  baseMonthly: number,
  form: SalaryComparisonFormState,
): number {
  return resolveIncrementedBase(baseMonthly, form) - baseMonthly;
}

/** The increment expressed as a percentage of the current base salary. */
export function resolveIncrementRaisePercent(
  baseMonthly: number,
  form: SalaryComparisonFormState,
): number {
  if (form.incrementType === 'percent') {
    const percent = Number(form.incrementPercent);
    return Number.isFinite(percent) ? percent : 0;
  }
  return baseMonthly > 0 ? (parseAmount(form.incrementAmount) / baseMonthly) * 100 : 0;
}

/**
 * Complementary read-out under the increment field: shows the equivalent Rs. raise when the
 * user typed a percentage, and the equivalent percentage when they typed a rupee amount.
 */
export function buildIncrementHelpText(form: SalaryComparisonFormState): string | undefined {
  const baseMonthly = parseAmount(form.currentSalary);
  if (baseMonthly <= 0) {
    return;
  }
  if (form.incrementType === 'amount') {
    if (form.incrementAmount.trim() === '') {
      return;
    }
    const percent = resolveIncrementRaisePercent(baseMonthly, form);
    return `${formatPercent(percent)} ${SALARY_COMPARISON_FORM_COPY.incrementHelpSuffix}`;
  }
  if (form.incrementPercent.trim() === '') {
    return;
  }
  const amount = resolveIncrementRaiseAmount(baseMonthly, form);
  return `${formatPkr(amount)} ${SALARY_COMPARISON_FORM_COPY.incrementHelpSuffix}`;
}

export function buildScenarioInputs(
  mode: SalaryComparisonMode,
  form: SalaryComparisonFormState,
): { current: SalaryScenarioInput; next: SalaryScenarioInput } {
  const currentBase = parseAmount(form.currentSalary);

  if (mode === 'increment') {
    const bonus = parseAmount(form.bonus);
    const deductions = parseAmount(form.deductions);
    return {
      current: { baseMonthly: currentBase, bonusMonthly: bonus, deductionMonthly: deductions },
      next: {
        baseMonthly: resolveIncrementedBase(currentBase, form),
        bonusMonthly: bonus,
        deductionMonthly: deductions,
      },
    };
  }

  return {
    current: {
      baseMonthly: currentBase,
      bonusMonthly: parseAmount(form.currentBonus),
      deductionMonthly: parseAmount(form.currentDeductions),
    },
    next: {
      baseMonthly: parseAmount(form.offeredSalary),
      bonusMonthly: parseAmount(form.newBonus),
      deductionMonthly: parseAmount(form.newDeductions),
    },
  };
}

export function isSalaryComparisonValid(
  mode: SalaryComparisonMode,
  form: SalaryComparisonFormState,
): boolean {
  if (parseAmount(form.currentSalary) <= 0) {
    return false;
  }
  if (mode === 'job-offer') {
    return parseAmount(form.offeredSalary) > 0;
  }
  if (form.incrementType === 'amount') {
    const amount = Number(form.incrementAmount);
    return Number.isFinite(amount) && amount >= 0 && form.incrementAmount.trim() !== '';
  }
  const percent = Number(form.incrementPercent);
  return Number.isFinite(percent) && percent >= 0 && form.incrementPercent.trim() !== '';
}

export function resolveComparisonFiscalYear(value: string): string {
  return resolveSalaryTaxYear(value);
}
