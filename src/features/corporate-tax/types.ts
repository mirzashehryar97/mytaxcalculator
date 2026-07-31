/** Tax years the corporate calculators cover, newest first. */
export type CorporateFiscalYear =
  | '2026-2027'
  | '2025-2026'
  | '2024-2025'
  | '2023-2024'
  | '2022-2023';

/** One tab of the corporate suite; each is its own route. */
export type CorporateMode = 'company-tax' | 'minimum-tax' | 'super-tax';

/** Company classes that carry their own rate in Division II of the First Schedule. */
export type CompanyType = 'standard' | 'small' | 'banking';

/** Who is being tested against the turnover floor in Section 113. */
export type MinimumTaxpayerType = 'company' | 'individual-aop';

/** Division IX rate groups, named for what the business does rather than the entry number. */
export type MinimumTaxSector =
  | 'general'
  | 'specified-goods-distributor'
  | 'fuel-and-motorcycle'
  | 'gas-airline-poultry'
  | 'low-margin-trades';

/** The four persons named in the Division IIB super-tax table. */
export type SuperTaxpayerType = 'other' | 'banking' | 'petroleum' | 'fertilizer';

/**
 * One row of a super-tax table. The rate applies to the whole income, not to
 * the slice above `over` — every row of Division IIB reads "N% of the income".
 */
export interface SuperTaxBand {
  /** Income above this amount falls in the band. */
  over: number;
  /** Top of the band; `null` for the open-ended top row. */
  upTo: number | null;
  rate: number;
}

export interface SuperTaxYear {
  /** Bands for a person with no rule of their own. */
  bands: SuperTaxBand[];
  /** Bands that replace the default for a named person, when the year has any. */
  overrides: Partial<Record<SuperTaxpayerType, SuperTaxBand[]>>;
  /** Whether the year has the "exports over 80% of turnover" exemption. */
  hasExportExemption: boolean;
}

export interface CompanyTaxInputs {
  taxableProfit: number;
  companyType: CompanyType;
  /** Advance tax / withholding already collected during the year. */
  taxAlreadyPaid: number;
}

export interface CompanyTaxResult {
  fiscalYear: CorporateFiscalYear;
  companyType: CompanyType;
  taxableProfit: number;
  rate: number;
  tax: number;
  taxAlreadyPaid: number;
  /** Tax left to pay after the credit for tax already collected. */
  remainingTax: number;
  /** What the company keeps: taxable profit − tax. */
  profitAfterTax: number;
}

export interface MinimumTaxInputs {
  turnover: number;
  taxpayerType: MinimumTaxpayerType;
  sector: MinimumTaxSector;
  /** Normal income tax the business has already worked out for the year. */
  normalTax: number;
}

export interface MinimumTaxResult {
  fiscalYear: CorporateFiscalYear;
  taxpayerType: MinimumTaxpayerType;
  sector: MinimumTaxSector;
  turnover: number;
  rate: number;
  /** Turnover × rate, whether or not the rule bites. */
  minimumTax: number;
  normalTax: number;
  /** False for an individual/AOP under the Rs 100 million turnover floor. */
  isCovered: boolean;
  /** True when the minimum tax is the higher figure and therefore the bill. */
  minimumTaxApplies: boolean;
  /** The higher of the two — Section 113 substitutes, it never adds. */
  taxPayable: number;
  /** Minimum tax paid over and above the normal tax, usable for two later years. */
  carryForward: number;
}

export interface SuperTaxInputs {
  income: number;
  taxpayerType: SuperTaxpayerType;
  /** Realised export proceeds are more than 80% of turnover for the year. */
  isExportExempt: boolean;
}

export interface SuperTaxResult {
  fiscalYear: CorporateFiscalYear;
  taxpayerType: SuperTaxpayerType;
  income: number;
  rate: number;
  superTax: number;
  /** Income above which any super tax starts for this person and year. */
  threshold: number;
  /** Lower edge of the band the income landed in — the figure the rate hangs off. */
  bandOver: number;
  /** True when the income clears the first paying band. */
  applies: boolean;
  /** True when the year offers the export exemption and the user claimed it. */
  isExportExempt: boolean;
  /** Whether this year's rules offer the export exemption at all. */
  hasExportExemption: boolean;
  /** Income − super tax. */
  incomeAfterSuperTax: number;
  /** Extra income needed to reach the next band, or null at the top band. */
  nextBandOver: number | null;
  nextBandRate: number | null;
}

export interface CorporateOption<TValue extends string> {
  value: TValue;
  label: string;
  /** Plain-language explanation shown behind an info icon on the option. */
  tooltip?: string;
}

export interface CorporateFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CorporateRateRow {
  id: string;
  /** Left column — who or which income band the row is about. */
  subject: string;
  rate: string;
  note: string;
}
