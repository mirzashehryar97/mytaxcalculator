import type { TaxBracket } from '@/utils/slabEngine';

export type BusinessFiscalYear =
  | '2026-2027'
  | '2025-2026'
  | '2024-2025'
  | '2023-2024'
  | '2022-2023'
  | '2021-2022';

/** Individual business and AOP share one slab set; professional-firm AOPs are capped at 40%. */
export type BusinessTaxpayerType = 'individual' | 'aop' | 'professional-aop';

/** How the user tells us their taxable income. */
export type BusinessIncomeMode = 'net' | 'revenue-expenses';

export interface BusinessSurcharge {
  /** Taxable income above this triggers the surcharge. */
  threshold: number;
  /** Fraction of the computed tax added as surcharge (e.g. 0.1 for 10%). */
  rate: number;
}

export interface BusinessSlabYear {
  /** Slabs for individual business and AOP taxpayers. */
  standard: TaxBracket[];
  /** Slabs for professional-firm AOPs (top rate capped at 40%). */
  professionalAop: TaxBracket[];
  /** Surcharge regime for the year, or null when none applied. */
  surcharge: BusinessSurcharge | null;
}

export interface BusinessTaxInputs {
  netIncome: number;
  taxpayerType: BusinessTaxpayerType;
  /** Advance tax / withholding already paid during the year. */
  advanceTaxPaid: number;
}

export interface BusinessTaxFormState {
  taxpayerType: BusinessTaxpayerType;
  incomeMode: BusinessIncomeMode;
  /** Used when incomeMode is 'net'. */
  netIncome: string;
  /** Used when incomeMode is 'revenue-expenses'. */
  revenue: string;
  expenses: string;
  advanceTaxPaid: string;
  fiscalYear: BusinessFiscalYear;
}

export type BusinessTaxFormField = keyof BusinessTaxFormState;

export type UpdateBusinessTaxFormField = <TField extends BusinessTaxFormField>(
  field: TField,
  value: BusinessTaxFormState[TField],
) => void;

export interface BusinessTaxResult {
  fiscalYear: BusinessFiscalYear;
  taxpayerType: BusinessTaxpayerType;
  /** Net taxable income the slabs were applied to. */
  netIncome: number;
  /** Tax from the slab table before surcharge. */
  baseTax: number;
  /** Surcharge added on top of the base tax. */
  surcharge: number;
  /** Whether the selected year has a surcharge regime at all. */
  hasSurchargeRegime: boolean;
  /** Whether the surcharge actually applied to this income. */
  surchargeApplies: boolean;
  /** Income above which the surcharge applies, when a regime exists. */
  surchargeThreshold: number | null;
  /** Base tax + surcharge, before advance-tax credits. */
  totalTax: number;
  /** Total tax as a percentage of net income. */
  effectiveRate: number;
  /** What the taxpayer keeps: net income − total tax. */
  incomeAfterTax: number;
  advanceTaxPaid: number;
  /** Total tax after subtracting advance tax / withholding credits. */
  remainingTax: number;
  /** Marginal band the income falls into. */
  marginalRate: number;
  marginalFixed: number;
  /** Lower edge of the marginal band (band min − 1, i.e. "above" figure). */
  marginalBandStart: number;
  /** True when income sits in the tax-free band. */
  taxFree: boolean;
}

export interface BusinessOption<TValue extends string> {
  value: TValue;
  label: string;
  /** Optional plain-language explanation shown on the segmented-control option. */
  tooltip?: string;
}

export interface BusinessFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BusinessRateGuideRow {
  id: string;
  band: string;
  rate: string;
  note: string;
}

export interface BusinessSourceLink {
  href: string;
  label: string;
}

export interface BusinessClassificationCard {
  id: 'net-income' | 'classification';
  title: string;
  intro: string;
  points: string[];
  linkLabel?: string;
  linkHref?: string;
}
