import { DEFAULT_PROPERTY_FISCAL_YEAR, hasLateFilerTier } from '@/features/property-tax/lib/rates';
import type {
  PropertyCapitalGainsFormState,
  PropertyCapitalGainsInputs,
  PropertyFilerStatus,
  PropertyTransferFormState,
  PropertyTransferInputs,
} from '@/features/property-tax/types';

/** A 30m purchase matches the worked example in the sector notes. */
export const DEFAULT_PROPERTY_TRANSFER_FORM_STATE = {
  declaredValue: '30000000',
  fbrValue: '30000000',
  status: 'filer',
  fiscalYear: DEFAULT_PROPERTY_FISCAL_YEAR,
} satisfies PropertyTransferFormState;

/** The sale date carries the tax year here, so it sits in the current one. */
export const DEFAULT_PROPERTY_CAPITAL_GAINS_FORM_STATE = {
  purchasePrice: '20000000',
  salePrice: '30000000',
  purchaseDate: '2024-08-01',
  saleDate: '2026-07-21',
  propertyType: 'open-plot',
  status: 'filer',
} satisfies PropertyCapitalGainsFormState;

export function parsePropertyNumberInput(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export function buildPropertyTransferInputs(
  formState: PropertyTransferFormState,
): PropertyTransferInputs {
  return {
    declaredValue: parsePropertyNumberInput(formState.declaredValue),
    fbrValue: parsePropertyNumberInput(formState.fbrValue),
    status: formState.status,
  };
}

export function isPropertyTransferFormValid(inputs: PropertyTransferInputs): boolean {
  return Math.max(inputs.declaredValue, inputs.fbrValue) > 0;
}

export function buildPropertyCapitalGainsInputs(
  formState: PropertyCapitalGainsFormState,
): PropertyCapitalGainsInputs {
  return {
    purchasePrice: parsePropertyNumberInput(formState.purchasePrice),
    salePrice: parsePropertyNumberInput(formState.salePrice),
    purchaseDate: formState.purchaseDate,
    saleDate: formState.saleDate,
    propertyType: formState.propertyType,
    status: formState.status,
  };
}

export function isPropertyCapitalGainsFormValid(inputs: PropertyCapitalGainsInputs): boolean {
  return inputs.salePrice > 0 && Boolean(inputs.purchaseDate) && Boolean(inputs.saleDate);
}

/**
 * Keeps the chosen status legal for the chosen year. The late-filer tier only
 * existed while the Tenth Schedule had rule 1A, so switching to a year without
 * it has to fall back rather than silently price a tier that never applied.
 */
export function resolveStatusForYear(
  status: PropertyFilerStatus,
  mode: 'purchase' | 'sale',
  fiscalYear: string,
): PropertyFilerStatus {
  if (status === 'late-filer' && !hasLateFilerTier(mode, fiscalYear)) {
    return 'filer';
  }
  return status;
}
