import type { BusinessTaxFormState } from '@/features/business-tax/types';

export const BUSINESS_ANALYTICS_EVENTS = {
  pageView: 'business_calculator_view',
  calculatorUse: 'business_calculator_use',
} as const;

export const BUSINESS_ANALYTICS_CONTEXT = {
  calculator: 'business',
  page_path: '/business-tax-calculator',
} as const;

export function buildBusinessUseEventParameters(formState: BusinessTaxFormState) {
  return {
    ...BUSINESS_ANALYTICS_CONTEXT,
    fiscal_year: formState.fiscalYear,
    taxpayer_type: formState.taxpayerType,
    income_mode: formState.incomeMode,
  } as const;
}
