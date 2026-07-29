import { deriveAnnualRent } from '@/features/rental-income-tax/lib/calculation';
import { DEFAULT_RENTAL_FISCAL_YEAR } from '@/features/rental-income-tax/lib/rates';
import type { RentalTaxFormState, RentalTaxInputs } from '@/features/rental-income-tax/types';

export const DEFAULT_RENTAL_FORM_STATE = {
  rentPeriod: 'monthly',
  monthlyRent: '100000',
  annualRent: '',
  ownerType: 'individual',
  filer: true,
  fiscalYear: DEFAULT_RENTAL_FISCAL_YEAR,
} satisfies RentalTaxFormState;

export function parseRentalNumberInput(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

/** Yearly gross rent for whichever period the user is typing in. */
export function resolveRentalAnnualRent(formState: RentalTaxFormState): number {
  if (formState.rentPeriod === 'monthly') {
    return deriveAnnualRent(parseRentalNumberInput(formState.monthlyRent));
  }
  return parseRentalNumberInput(formState.annualRent);
}

export function buildRentalTaxInputs(formState: RentalTaxFormState): RentalTaxInputs {
  return {
    annualRent: resolveRentalAnnualRent(formState),
    ownerType: formState.ownerType,
    filer: formState.filer,
  };
}

export function isRentalFormValid(inputs: RentalTaxInputs): boolean {
  return inputs.annualRent > 0;
}
