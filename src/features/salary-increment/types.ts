import type { SourceLink } from '@/components/calculator/SourcesCard';

/** Which comparison the user is running. */
export type SalaryComparisonMode = 'increment' | 'job-offer';

/** Whether the increment is entered as a percentage of salary or a fixed rupee amount. */
export type IncrementInputType = 'percent' | 'amount';

/** Raw string-backed form state — one object holds every field for both tabs. */
export interface SalaryComparisonFormState {
  fiscalYear: string;
  currentSalary: string;
  /** Increment-tab: whether the raise is entered as a % or a fixed Rs. amount. */
  incrementType: IncrementInputType;
  /** Increment-tab: percentage raise (used when incrementType === 'percent'). */
  incrementPercent: string;
  /** Increment-tab: fixed monthly rupee raise (used when incrementType === 'amount'). */
  incrementAmount: string;
  offeredSalary: string;
  /** Increment-tab: bonus applied to both current and new salary. */
  bonus: string;
  /** Increment-tab: deductions applied to both current and new salary. */
  deductions: string;
  /** Job-offer-tab bonuses. */
  currentBonus: string;
  newBonus: string;
  /** Job-offer-tab deductions. */
  currentDeductions: string;
  newDeductions: string;
}

export type SalaryComparisonFormField = keyof SalaryComparisonFormState;

export type UpdateSalaryComparisonField = <TField extends SalaryComparisonFormField>(
  field: TField,
  value: SalaryComparisonFormState[TField],
) => void;

/** Numeric inputs for a single salary scenario (current or new). */
export interface SalaryScenarioInput {
  baseMonthly: number;
  bonusMonthly: number;
  deductionMonthly: number;
}

/** Fully computed figures for one salary scenario. */
export interface SalaryScenario {
  /** Taxable monthly income (base + bonus). */
  grossMonthly: number;
  bonusMonthly: number;
  monthlyTax: number;
  netMonthly: number;
  annualGross: number;
  annualTax: number;
  annualNet: number;
  /** Effective tax rate on annual gross, as a percentage (e.g. 8.2). */
  effectiveRate: number;
}

export interface SalaryComparison {
  mode: SalaryComparisonMode;
  current: SalaryScenario;
  next: SalaryScenario;
  grossIncreaseMonthly: number;
  takeHomeIncreaseMonthly: number;
  takeHomeIncreaseAnnual: number;
  extraMonthlyTax: number;
  extraAnnualTax: number;
}

export interface SalaryIncrementOption<TValue extends string> {
  value: TValue;
  label: string;
  /** Canonical route used by calculator mode navigation when the option has its own page. */
  href?: string;
}

export interface SalaryIncrementFaqItem {
  id: string;
  question: string;
  answer: string;
}

export type SalaryIncrementSourceLink = SourceLink;
