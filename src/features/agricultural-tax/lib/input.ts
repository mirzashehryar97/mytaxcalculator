import {
  DEFAULT_AGRICULTURAL_FISCAL_YEAR,
  DEFAULT_AGRICULTURAL_PROVINCE,
} from '@/features/agricultural-tax/lib/rates';
import type {
  AgriculturalFiscalYear,
  AgriculturalProvince,
  AgriculturalTaxpayerType,
  OrchardIrrigation,
} from '@/features/agricultural-tax/types';

export interface AgriculturalFormState {
  fiscalYear: AgriculturalFiscalYear;
  province: AgriculturalProvince;
  taxpayerType: AgriculturalTaxpayerType;
  income: string;
  acres: string;
  orchardAcres: string;
  orchardIrrigation: OrchardIrrigation;
  taxAlreadyPaid: string;
}

export const DEFAULT_AGRICULTURAL_FORM_STATE = {
  fiscalYear: DEFAULT_AGRICULTURAL_FISCAL_YEAR,
  province: DEFAULT_AGRICULTURAL_PROVINCE,
  taxpayerType: 'farmer',
  income: '1200000',
  acres: '',
  orchardAcres: '',
  // Irrigated is the dearer of the two rates, so an untouched field never
  // understates the bill for someone who skips past the question.
  orchardIrrigation: 'irrigated',
  taxAlreadyPaid: '',
} satisfies AgriculturalFormState;

export function parseAgriculturalNumberInput(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export type AgriculturalFormField = keyof AgriculturalFormState;

export type UpdateAgriculturalField = <TField extends AgriculturalFormField>(
  field: TField,
  value: AgriculturalFormState[TField],
) => void;
