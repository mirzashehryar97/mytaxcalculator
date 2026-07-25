import { deriveNetIncome } from '@/features/business-tax/lib/calculation';
import { DEFAULT_BUSINESS_FISCAL_YEAR } from '@/features/business-tax/lib/rates';
import type { BusinessTaxFormState, BusinessTaxInputs } from '@/features/business-tax/types';

export const DEFAULT_BUSINESS_FORM_STATE = {
  taxpayerType: 'individual',
  incomeMode: 'net',
  netIncome: '3000000',
  revenue: '',
  expenses: '',
  advanceTaxPaid: '',
  fiscalYear: DEFAULT_BUSINESS_FISCAL_YEAR,
} satisfies BusinessTaxFormState;

export function parseBusinessNumberInput(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

/** Net taxable income for the active input mode. */
export function resolveBusinessNetIncome(formState: BusinessTaxFormState): number {
  if (formState.incomeMode === 'revenue-expenses') {
    return deriveNetIncome(
      parseBusinessNumberInput(formState.revenue),
      parseBusinessNumberInput(formState.expenses),
    );
  }
  return parseBusinessNumberInput(formState.netIncome);
}

export function buildBusinessTaxInputs(formState: BusinessTaxFormState): BusinessTaxInputs {
  return {
    netIncome: resolveBusinessNetIncome(formState),
    taxpayerType: formState.taxpayerType,
    advanceTaxPaid: parseBusinessNumberInput(formState.advanceTaxPaid),
  };
}

export function isBusinessFormValid(inputs: BusinessTaxInputs): boolean {
  return inputs.netIncome > 0;
}
