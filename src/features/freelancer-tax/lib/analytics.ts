import type { FreelancerTaxFormState } from '@/features/freelancer-tax/types';

export const FREELANCER_ANALYTICS_EVENTS = {
  pageView: 'freelancer_calculator_view',
  calculatorUse: 'freelancer_calculator_use',
} as const;

export const FREELANCER_ANALYTICS_CONTEXT = {
  calculator: 'freelancer',
  page_path: '/freelancer-tax-calculator',
} as const;

export function buildFreelancerUseEventParameters(formState: FreelancerTaxFormState) {
  return {
    ...FREELANCER_ANALYTICS_CONTEXT,
    currency: formState.currency.toLowerCase(),
    fiscal_year: formState.fiscalYear,
    filer_status: formState.atl ? 'filer' : 'non_filer',
    pseb_status: formState.psebRegistered ? 'registered' : 'not_registered',
  } as const;
}
