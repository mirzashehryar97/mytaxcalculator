/**
 * Three taxes hit one property transaction, and each has its own route:
 * the buyer pays advance tax under section 236K, the seller pays advance tax
 * under section 236C, and the seller also pays capital gains tax on the profit.
 */
export type PropertyMode = 'purchase' | 'sale' | 'capital-gains';

export type PropertyFiscalYear =
  | '2026-2027'
  | '2025-2026'
  | '2024-2025'
  | '2023-2024'
  | '2022-2023';

/** Whether a date landed inside the years this calculator holds rates for. */
export type PropertyTaxYearCoverage = 'covered' | 'before-range' | 'after-range';

/** A tax year worked out from a transaction date rather than chosen by the user. */
export interface PropertyTaxYearResolution {
  fiscalYear: PropertyFiscalYear;
  /** Anything but `covered` means the year was clamped and must be flagged. */
  coverage: PropertyTaxYearCoverage;
}

/**
 * The three Active Taxpayer List states. `late-filer` only exists in the years
 * whose Tenth Schedule still had rule 1A, so it is never hard-coded into the
 * form — the selected year's rate data decides which states are offered.
 */
export type PropertyFilerStatus = 'filer' | 'late-filer' | 'non-filer';

/** Property categories used by the pre-July-2024 capital gains grid. */
export type PropertyType = 'open-plot' | 'constructed' | 'flat';

export interface PropertyRateBand {
  /** Upper edge of the band in rupees; null for the open-ended top band. */
  upTo: number | null;
  rate: number;
}

/**
 * A year's rate for one filer status. Some years charge one rate on any value,
 * others pick a single rate from a value band — and from 2026-27 a section can
 * be flat for filers while still banded for non-filers, so flat and banded have
 * to coexist inside the same year.
 */
export type PropertyRate =
  | { kind: 'flat'; rate: number }
  | { kind: 'banded'; bands: readonly PropertyRateBand[] };

export interface PropertyTransferRates {
  filer: PropertyRate;
  /** null in the years before rule 1A existed, and from 2026-27 once it was omitted. */
  lateFiler: PropertyRate | null;
  nonFiler: PropertyRate;
}

export interface PropertyTransferInputs {
  /** Price written on the transfer deed. */
  declaredValue: number;
  /** FBR notified value or the provincial DC rate for the same property. */
  fbrValue: number;
  status: PropertyFilerStatus;
}

export interface PropertyTransferFormState {
  declaredValue: string;
  fbrValue: string;
  status: PropertyFilerStatus;
  fiscalYear: PropertyFiscalYear;
}

export type PropertyTransferFormField = keyof PropertyTransferFormState;

export type UpdatePropertyTransferField = <TField extends PropertyTransferFormField>(
  field: TField,
  value: PropertyTransferFormState[TField],
) => void;

export interface PropertyTransferResult {
  mode: Extract<PropertyMode, 'purchase' | 'sale'>;
  fiscalYear: PropertyFiscalYear;
  status: PropertyFilerStatus;
  declaredValue: number;
  fbrValue: number;
  /** The higher of the declared price and the FBR/DC value — what the rate applies to. */
  taxBase: number;
  /** Percentage charged to the selected status. */
  rate: number;
  tax: number;
  filerRate: number;
  filerTax: number;
  nonFilerRate: number;
  nonFilerTax: number;
  /** How much less a filer pays on the same transaction. */
  filerSaving: number;
  /** True when the selected year charges one rate on every value. */
  isFlatRate: boolean;
  /** True when the selected year still has a late-filer tier. */
  hasLateFilerTier: boolean;
}

export interface PropertyCapitalGainsInputs {
  purchasePrice: number;
  salePrice: number;
  /** ISO date the property was acquired. */
  purchaseDate: string;
  /** ISO date the property was sold. */
  saleDate: string;
  propertyType: PropertyType;
  status: PropertyFilerStatus;
}

/**
 * No `fiscalYear` here on purpose: a gain is taxed in the year the sale falls
 * in, so the year is derived from `saleDate` rather than offered as a choice.
 */
export interface PropertyCapitalGainsFormState {
  purchasePrice: string;
  salePrice: string;
  purchaseDate: string;
  saleDate: string;
  propertyType: PropertyType;
  status: PropertyFilerStatus;
}

export type PropertyCapitalGainsFormField = keyof PropertyCapitalGainsFormState;

export type UpdatePropertyCapitalGainsField = <TField extends PropertyCapitalGainsFormField>(
  field: TField,
  value: PropertyCapitalGainsFormState[TField],
) => void;

/** Which of the two capital gains regimes the acquisition date lands in. */
export type PropertyCgtRegime = 'flat-15' | 'holding-grid';

export interface PropertyCapitalGainsResult {
  /** Worked out from the sale date, not selected — see `PropertyCapitalGainsFormState`. */
  fiscalYear: PropertyFiscalYear;
  /** Whether that sale date fell inside the years we hold 236C rates for. */
  fiscalYearCoverage: PropertyTaxYearCoverage;
  /** The ISO sale date the tax year came from, so the UI can show its working. */
  saleDate: string;
  status: PropertyFilerStatus;
  propertyType: PropertyType;
  purchasePrice: number;
  salePrice: number;
  /** Sale price less purchase price, floored at zero. */
  gain: number;
  /** True when the sale did not make a profit, so no capital gains tax arises. */
  isLoss: boolean;
  regime: PropertyCgtRegime;
  holdingYears: number;
  /** Label for the holding band that set the rate, e.g. "Over 2 up to 3 years". */
  holdingBandLabel: string;
  rate: number;
  /**
   * True when the shown rate is only a floor: a non-filer selling property
   * acquired on or after 1 July 2024 pays the higher of 15% and their normal
   * slab rate, which depends on their total income for the year.
   */
  rateIsMinimum: boolean;
  grossTax: number;
  /** Section 236C already collected at transfer, which is set off against the gain tax. */
  transferTaxCredit: number;
  /** The 236C rate behind that credit. */
  transferTaxRate: number;
  /** Gross tax less the 236C credit, floored at zero. */
  netTax: number;
  /** True when 236C already covers the whole capital gains bill. */
  fullyCovered: boolean;
  /** Gain left after the capital gains tax. */
  gainAfterTax: number;
  /** Tax as a percentage of the gain. */
  effectiveRate: number;
  /** True when the dates given do not describe a real holding period. */
  datesAreValid: boolean;
}

/** Everything the derived-tax-year readout renders, worked out in `presentation.ts`. */
export interface PropertyTaxYearNoticeContent {
  /** Short year label, e.g. "2026-27". */
  yearLabel: string;
  /** Plain-language reason that year applies. */
  sourceLine: string;
  /** Set only when the sale date fell outside the years we hold rates for. */
  warning: string | null;
}

export interface PropertyOption<TValue extends string> {
  value: TValue;
  label: string;
  /** Optional plain-language explanation shown on the segmented-control option. */
  tooltip?: string;
}

export interface PropertyFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PropertyRateGuideRow {
  id: string;
  band: string;
  filerRate: string;
  lateFilerRate: string;
  nonFilerRate: string;
}

export interface PropertyCgtGuideRow {
  id: string;
  holdingPeriod: string;
  openPlot: string;
  constructed: string;
  flat: string;
}
