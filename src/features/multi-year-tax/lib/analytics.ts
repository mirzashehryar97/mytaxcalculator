import type { MultiYearResult, SalaryPeriod } from '@/features/multi-year-tax/types';

export const MULTI_YEAR_ANALYTICS_EVENTS = {
  calculatorUse: 'calculator_use',
} as const;

export const MULTI_YEAR_ANALYTICS_CONTEXT = {
  calculator: 'multi',
} as const;

export function buildMultiYearUseEventParameters(periods: SalaryPeriod[], result: MultiYearResult) {
  return {
    ...MULTI_YEAR_ANALYTICS_CONTEXT,
    periods: periods.length,
    fiscal_years: result.breakdown.length,
  } as const;
}
