import { DEFAULT_CORPORATE_FISCAL_YEAR } from '@/features/corporate-tax/lib/rates';
import type {
  CompanyType,
  CorporateFiscalYear,
  MinimumTaxpayerType,
  MinimumTaxSector,
  SuperTaxpayerType,
} from '@/features/corporate-tax/types';

export interface CompanyTaxFormState {
  fiscalYear: CorporateFiscalYear;
  companyType: CompanyType;
  taxableProfit: string;
  taxAlreadyPaid: string;
}

export interface MinimumTaxFormState {
  fiscalYear: CorporateFiscalYear;
  taxpayerType: MinimumTaxpayerType;
  turnover: string;
  sector: MinimumTaxSector;
  normalTax: string;
}

export interface SuperTaxFormState {
  fiscalYear: CorporateFiscalYear;
  taxpayerType: SuperTaxpayerType;
  income: string;
  isExportExempt: boolean;
}

export const DEFAULT_COMPANY_TAX_FORM_STATE = {
  fiscalYear: DEFAULT_CORPORATE_FISCAL_YEAR,
  companyType: 'standard',
  taxableProfit: '50000000',
  taxAlreadyPaid: '',
} satisfies CompanyTaxFormState;

export const DEFAULT_MINIMUM_TAX_FORM_STATE = {
  fiscalYear: DEFAULT_CORPORATE_FISCAL_YEAR,
  taxpayerType: 'company',
  turnover: '500000000',
  sector: 'general',
  normalTax: '',
} satisfies MinimumTaxFormState;

export const DEFAULT_SUPER_TAX_FORM_STATE = {
  fiscalYear: DEFAULT_CORPORATE_FISCAL_YEAR,
  taxpayerType: 'other',
  income: '600000000',
  isExportExempt: false,
} satisfies SuperTaxFormState;

export function parseCorporateNumberInput(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

export type CompanyTaxFormField = keyof CompanyTaxFormState;
export type MinimumTaxFormField = keyof MinimumTaxFormState;
export type SuperTaxFormField = keyof SuperTaxFormState;

export type UpdateCompanyTaxField = <TField extends CompanyTaxFormField>(
  field: TField,
  value: CompanyTaxFormState[TField],
) => void;

export type UpdateMinimumTaxField = <TField extends MinimumTaxFormField>(
  field: TField,
  value: MinimumTaxFormState[TField],
) => void;

export type UpdateSuperTaxField = <TField extends SuperTaxFormField>(
  field: TField,
  value: SuperTaxFormState[TField],
) => void;
