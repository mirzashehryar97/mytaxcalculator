export type AgriculturalFiscalYear = '2026-2027' | '2025-2026';

/** Agricultural income tax is provincial, so every figure hangs off a province. */
export type AgriculturalProvince = 'punjab' | 'sindh' | 'kp' | 'balochistan';

export type AgriculturalTaxpayerType = 'farmer' | 'small-company' | 'company';

/**
 * Super-tax rows read "N% of the income", so the rate applies to the whole
 * income rather than to the slice above the threshold.
 */
export interface AgriculturalSuperTaxBand {
  over: number;
  upTo: number | null;
  rate: number;
}

/**
 * A per-acre band. Punjab publishes one figure per band; KP and Balochistan
 * publish four (one per zone) and the zone map is not gazetted with the Act, so
 * those bands carry a low and a high and the UI shows a range.
 */
export interface LandTaxBand {
  /** Acres the band starts above. */
  over: number;
  upTo: number | null;
  perAcreLow: number;
  perAcreHigh: number;
}

/** The only split the schedules make inside a mature orchard. */
export type OrchardIrrigation = 'irrigated' | 'unirrigated';

/**
 * Mature-orchard rates. All three schedules print these as a flat pair standing
 * outside the acreage bands — Punjab's slab reads "other than mature orchards"
 * and KP's and Balochistan's read "excluding mature orchards" — so an orchard
 * carries no bands and, since none of the three repeats the Nil row underneath,
 * no exempt floor either. Low is Zone IV and high Zone I where zones exist.
 */
export interface OrchardRate {
  irrigatedLow: number;
  irrigatedHigh: number;
  unirrigatedLow: number;
  unirrigatedHigh: number;
}

export type AgriculturalLandTaxRule =
  | {
      status: 'charged';
      bands: readonly LandTaxBand[];
      orchard: OrchardRate;
      /** True where the province's Act makes the per-acre figure a floor under the income tax. */
      isMinimumTax: boolean;
    }
  /** The province charges no per-acre tax at all (Sindh repealed its Ordinance). */
  | { status: 'none' }
  /** The province charges one but we have no official table for this year. */
  | { status: 'unconfirmed' };

export type AgriculturalLandTaxStatus =
  | 'charged'
  | 'none'
  | 'unconfirmed'
  | 'exempt'
  | 'not-entered';

/** One of the two charges a schedule makes: the acreage bands, or the orchard rate. */
export interface LandTaxCharge {
  acres: number;
  perAcreLow: number;
  perAcreHigh: number;
  amountLow: number;
  amountHigh: number;
}

export interface AgriculturalLandTaxResult {
  status: AgriculturalLandTaxStatus;
  /** Ordinary cultivated land, orchards excluded — the banded charge. */
  cultivated: LandTaxCharge;
  /** Mature orchards — one flat rate, charged from the first acre. */
  orchard: LandTaxCharge;
  /** The two charges added together. */
  amountLow: number;
  amountHigh: number;
  /** True when the two ends differ, i.e. the answer is a range. */
  isRange: boolean;
  isMinimumTax: boolean;
  /** Higher of the income-side tax and the per-acre tax, where the province works that way. */
  payableLow: number;
  payableHigh: number;
}

export interface AgriculturalTaxInputs {
  income: number;
  taxpayerType: AgriculturalTaxpayerType;
  /** Cultivated acres excluding any orchard, already stated as irrigated-equivalent. */
  acres: number;
  orchardAcres: number;
  orchardIrrigation: OrchardIrrigation;
  taxAlreadyPaid: number;
}

export interface AgriculturalTaxResult {
  fiscalYear: AgriculturalFiscalYear;
  province: AgriculturalProvince;
  taxpayerType: AgriculturalTaxpayerType;
  income: number;
  /** Slice of a farmer's income that is never taxed. Zero for a company. */
  exemptThreshold: number;
  taxableIncome: number;
  /** Marginal slab rate for a farmer, or the flat company rate. */
  rate: number;
  incomeTax: number;
  superTax: number;
  superTaxRate: number;
  superTaxApplies: boolean;
  superTaxThreshold: number;
  totalTax: number;
  taxAlreadyPaid: number;
  remainingTax: number;
  incomeAfterTax: number;
  effectiveRate: number;
  land: AgriculturalLandTaxResult;
}

export interface AgriculturalFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface AgriculturalRateRow {
  id: string;
  band: string;
  rate: string;
}
