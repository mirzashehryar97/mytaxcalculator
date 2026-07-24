import { DEFAULT_FREELANCER_INPUTS } from '@/features/freelancer-tax/lib/content';
import { DEFAULT_FREELANCER_FISCAL_YEAR } from '@/features/freelancer-tax/lib/rates';
import type {
  FreelancerCurrency,
  FreelancerTaxFormState,
  FreelancerTaxInputs,
} from '@/features/freelancer-tax/types';

export const DEFAULT_FREELANCER_FORM_STATE = {
  amount: String(DEFAULT_FREELANCER_INPUTS.amount),
  currency: DEFAULT_FREELANCER_INPUTS.currency,
  exchangeRate: String(DEFAULT_FREELANCER_INPUTS.exchangeRate),
  psebRegistered: DEFAULT_FREELANCER_INPUTS.psebRegistered,
  atl: DEFAULT_FREELANCER_INPUTS.atl,
  fiscalYear: DEFAULT_FREELANCER_FISCAL_YEAR,
} satisfies FreelancerTaxFormState;

export function parseFreelancerNumberInput(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function buildFreelancerTaxInputs(formState: FreelancerTaxFormState): FreelancerTaxInputs {
  return {
    amount: parseFreelancerNumberInput(formState.amount),
    currency: formState.currency,
    exchangeRate: parseFreelancerNumberInput(formState.exchangeRate),
    psebRegistered: formState.psebRegistered,
    atl: formState.atl,
  };
}

export function isFreelancerFormValid(inputs: FreelancerTaxInputs): boolean {
  return inputs.amount > 0 && (inputs.currency === 'PKR' || inputs.exchangeRate > 0);
}

export function getFreelancerCurrencyPrefix(currency: FreelancerCurrency): string {
  return currency === 'USD' ? '$' : 'Rs.';
}
