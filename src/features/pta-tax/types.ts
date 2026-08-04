export type PtaFiscalYear = '2026-2027' | '2025-2026';

/** Who is registering, which is what decides section 148 and the fine. */
export type PtaRoute = 'passport' | 'cnic';

/**
 * Chapter 85, Note 5 of the Customs Tariff splits these, and the split is worth
 * real money: a smartphone is free of customs duty under Fifth Schedule serial
 * 99, an ordinary cellular phone pays Rs 250 per set.
 */
export type PtaDeviceKind = 'smartphone' | 'feature-phone';

/** Whether the handset is new or already used — see `USED_PHONE_NOTE`. */
export type PtaCondition = 'new' | 'used';

/** Where the C&F value comes from: an official ruling, or typed in by hand. */
export type PtaValueSource = 'model' | 'manual';

/** One row of a table that charges a flat rupee amount per set inside a band. */
export interface PtaAmountBand {
  /** Lowest C&F value the band covers, in US dollars, as the document prints it. */
  minUsd: number;
  /** Highest C&F value the band covers; `null` for the open top band. */
  maxUsd: number | null;
  amountPkr: number;
}

/** One row of the Ninth Schedule sales-tax table, which charges a percentage. */
export interface PtaSalesTaxBand {
  minUsd: number;
  maxUsd: number | null;
  percent: number;
}

export interface PtaYearRates {
  /** Regulatory duty, SRO 1064(I)/2026 and its predecessor. */
  regulatoryDuty: readonly PtaAmountBand[];
  /** Ninth Schedule, Table-II — the only ad valorem component. */
  salesTax: readonly PtaSalesTaxBand[];
  /** First Schedule Part II, second proviso. CBU column. CNIC route only. */
  incomeTax148: readonly PtaAmountBand[];
  /** Section 10 of the Finance Act 2018, as amended. */
  handsetLevy: readonly PtaAmountBand[];
  /** Customs duty per set on an ordinary cellular phone (a smartphone pays nil). */
  featurePhoneCustomsDutyPkr: number;
  /** Documents the year's figures were read from, for the on-page rate guide. */
  sources: { regulatoryDuty: string; incomeTax148: string; handsetLevy: string };
}

export interface PtaInputs {
  route: PtaRoute;
  deviceKind: PtaDeviceKind;
  /** C&F value in US dollars — a customs valuation, never a retail price. */
  cnfUsd: number;
  /** Rupees per US dollar, used to turn the C&F value into a customs value. */
  exchangeRate: number;
}

/** One line of the assessment, in the order the PSID prints them. */
export interface PtaTaxLine {
  id: string;
  label: string;
  amountPkr: number;
  /** Set where the line is nil for a reason worth naming rather than merely zero. */
  exemptReason?: string;
  /**
   * Plain-English account of where the amount came from, shown under the label.
   * Leads with what happened to the reader's money, not with the provision.
   */
  basis: string;
  /**
   * The document and provision behind it, kept separate so the citation can be
   * printed quietly underneath rather than swallowing the explanation. Every
   * figure on this page has to remain traceable to a government document.
   */
  reference: string;
}

export interface PtaTaxResult {
  cnfUsd: number;
  customsValuePkr: number;
  lines: readonly PtaTaxLine[];
  totalPkr: number;
  /** The same computation on the other route, for the side-by-side comparison. */
  otherRouteTotalPkr: number;
  /** True where a band gap in the levy table had to be resolved downward. */
  usedLevyGapFallback: boolean;
  salesTaxPercent: number;
}

/** One printed row of the on-page rate guide, built from the rate tables. */
export interface PtaRateGuideRow {
  id: string;
  /** C&F band, written the way the statute writes it. */
  band: string;
  regulatoryDuty: string;
  salesTax: string;
  incomeTax148: string;
  handsetLevy: string;
}

/** A handset named in the worked-examples table, keyed into the catalogue. */
export interface PtaPopularPhoneRef {
  brand: string;
  model: string;
  variant: string;
}

/** A worked example, priced by the same engine the calculator above runs on. */
export interface PtaPopularPhoneRow {
  id: string;
  name: string;
  cnfUsd: string;
  salesTaxPercent: string;
  passportTotal: string;
  cnicTotal: string;
}

/** A phone the valuation rulings put an official C&F value on. */
export interface PtaPhone {
  brand: string;
  /** Model family, with the storage split out into `variant`. */
  model: string;
  /** Storage/RAM tier, or `''` where the ruling lists the model only once. */
  variant: string;
  cnfUsd: number;
}
