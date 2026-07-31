import type { AgriculturalFormState } from '@/features/agricultural-tax/lib/input';
import { AGRICULTURAL_TAX_ROUTE } from '@/features/agricultural-tax/lib/provinces';

export const AGRICULTURAL_ANALYTICS_EVENTS = {
  pageView: 'agricultural_calculator_view',
  calculatorUse: 'agricultural_calculator_use',
} as const;

export function buildAgriculturalAnalyticsContext() {
  return {
    calculator: 'agricultural_income_tax',
    page_path: AGRICULTURAL_TAX_ROUTE,
  } as const;
}

export function buildAgriculturalUseParameters(formState: AgriculturalFormState) {
  return {
    ...buildAgriculturalAnalyticsContext(),
    fiscal_year: formState.fiscalYear,
    province: formState.province,
    taxpayer_type: formState.taxpayerType,
  } as const;
}
