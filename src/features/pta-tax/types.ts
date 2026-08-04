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

/**
 * One row of a table that charges a flat rupee amount per set inside a band.
 *
 * `minUsd` is **exclusive** and `maxUsd` inclusive, because that is how every
 * one of these tables is drafted — "Up to 30", then "Above 30 and up to 100".
 * Writing the lower bound as the figure the document prints keeps the data
 * readable against the source; `findAmountBand` applies the exclusivity.
 */
export interface PtaAmountBand {
  /** The figure the band is stated to start above, in US dollars, as printed. */
  minUsd: number;
  /** Highest C&F value the band covers; `null` for the open top band. */
  maxUsd: number | null;
  amountPkr: number;
}

/**
 * The §148 table twice, because serial 1 reads "Up to 30 **except smart
 * phones**" and serial 2 reads "Above 30 – 100, **and smart phones up to 100**".
 * A smartphone under US$ 30 therefore pays serial 2's Rs 100, not serial 1's
 * Rs 70 — the only place on this page where device type moves income tax.
 */
export interface PtaIncomeTax148Bands {
  smartphone: readonly PtaAmountBand[];
  featurePhone: readonly PtaAmountBand[];
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
  incomeTax148: PtaIncomeTax148Bands;
  /** Section 10 of the Finance Act 2018, as amended. */
  handsetLevy: readonly PtaAmountBand[];
  /** Customs duty per set on an ordinary cellular phone (a smartphone pays nil). */
  featurePhoneCustomsDutyPkr: number;
  /** Documents the year's figures were read from, for the on-page rate guide. */
  sources: {
    regulatoryDuty: string;
    /** The ACD notification in force that year — the one the nil is cited to. */
    additionalCustomsDuty: string;
    incomeTax148: string;
    handsetLevy: string;
  };
}

export interface PtaInputs {
  route: PtaRoute;
  deviceKind: PtaDeviceKind;
  /** C&F value in US dollars — a customs valuation, never a retail price. */
  cnfUsd: number;
  /** Rupees per US dollar, used to turn the C&F value into a customs value. */
  exchangeRate: number;
}

/** Whether a result line is payable, legally nil, or cannot yet be quantified. */
export type PtaTaxLineStatus = 'charged' | 'exempt' | 'unknown';

/** One line of the assessment, in the order the PSID prints them. */
export interface PtaTaxLine {
  id: string;
  label: string;
  amountPkr: number;
  /** Keeps an unresolved amount distinct from a genuine statutory exemption. */
  status: PtaTaxLineStatus;
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
  /** True when `totalPkr` is only the sum of known lines and is therefore a floor. */
  hasUnknownCharge: boolean;
  /** The same computation on the other route, for the side-by-side comparison. */
  otherRouteTotalPkr: number;
  /** Whether the comparison route also omits an unquantified charge. */
  otherRouteHasUnknownCharge: boolean;
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
  /** Customs class used to filter the picker and apply device-specific charges. */
  deviceKind: PtaDeviceKind;
  /** Model family, with the storage split out into `variant`. */
  model: string;
  /** Storage/RAM tier, or `''` where the ruling lists the model only once. */
  variant: string;
  cnfUsd: number;
}
