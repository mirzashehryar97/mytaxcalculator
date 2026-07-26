import {
  JOB_OFFER_COMPARISON_ROUTE,
  SALARY_INCREMENT_ROUTE,
} from '@/features/salary-increment/lib/content';
import type {
  SalaryComparisonFormState,
  SalaryComparisonMode,
} from '@/features/salary-increment/types';

export const SALARY_COMPARISON_ANALYTICS_CONFIG = {
  increment: {
    events: {
      pageView: 'salary_increment_view',
      calculatorUse: 'salary_increment_use',
    },
    context: {
      calculator: 'salary_increment',
      page_path: SALARY_INCREMENT_ROUTE,
    },
  },
  'job-offer': {
    events: {
      pageView: 'job_offer_comparison_view',
      calculatorUse: 'job_offer_comparison_use',
    },
    context: {
      calculator: 'job_offer_comparison',
      page_path: JOB_OFFER_COMPARISON_ROUTE,
    },
  },
} as const;

export function buildSalaryComparisonUseParameters(
  mode: SalaryComparisonMode,
  formState: SalaryComparisonFormState,
) {
  return {
    ...SALARY_COMPARISON_ANALYTICS_CONFIG[mode].context,
    mode,
    fiscal_year: formState.fiscalYear,
  } as const;
}
