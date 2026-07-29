import type { RentalTaxFormState } from '@/features/rental-income-tax/types';

export const RENTAL_ANALYTICS_EVENTS = {
  pageView: 'rental_calculator_view',
  calculatorUse: 'rental_calculator_use',
} as const;

export const RENTAL_ANALYTICS_CONTEXT = {
  calculator: 'rental-income',
  page_path: '/rental-income-tax-calculator',
} as const;

export function buildRentalUseEventParameters(formState: RentalTaxFormState) {
  return {
    ...RENTAL_ANALYTICS_CONTEXT,
    fiscal_year: formState.fiscalYear,
    owner_type: formState.ownerType,
    rent_period: formState.rentPeriod,
    filer: formState.filer,
  } as const;
}
