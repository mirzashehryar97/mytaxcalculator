import type { ResultCardTone } from '@/components/calculator/ResultCard';

/**
 * Two markets share one capital-gains regime under section 37A, and NCCPL
 * computes both under the Eighth Schedule — rule 1(1) listed securities and
 * rule 1(1A) units of open-ended mutual funds. Each gets its own route because
 * people search for them separately.
 */
export type CapitalGainsMode = 'listed-securities' | 'mutual-funds';

/** Tax years this calculator holds verified rates for. */
export type CapitalGainsFiscalYear = '2026-2027' | '2025-2026';

/** Whether the sale date lands inside the years we hold rates for. */
export type CapitalGainsCoverage = 'covered' | 'before-range' | 'after-range';

export interface CapitalGainsTaxYearResolution {
  fiscalYear: CapitalGainsFiscalYear;
  coverage: CapitalGainsCoverage;
}

/** Who is holding the investment — the fund tables charge a company differently. */
export type InvestorType = 'individual' | 'company';

/**
 * A fund holding more than 70% of its investable money in shares is a "stock
 * fund" (section 2(61A)); everything else is an "other fund".
 */
export type FundClass = 'stock' | 'other';

/**
 * How sure we are of a rate.
 *
 * - `confirmed` — the rate is in Division VII *and* in the table NCCPL published
 *   for that tax year.
 * - `pending-operator-table` — Division VII is unchanged, but the non-filer
 *   figure follows from the Finance Act 2026 dropping Tenth Schedule rule 10(y),
 *   and NCCPL has not published its table for that year yet. Shown with a
 *   warning rather than hidden, because the filer figure beside it is certain.
 */
export type RateConfidence = 'confirmed' | 'pending-operator-table';

/* ------------------------------------------------------------------ */
/* Rate tables                                                        */
/* ------------------------------------------------------------------ */

/**
 * Which set of rules a listed security falls under. The *buying* date picks
 * this, and it never changes afterwards.
 */
export type ListedRegime =
  /** Bought before 1 July 2013 — never taxed. */
  | 'pre-2013'
  /** Bought 1 July 2013 – 30 June 2022 — one flat rate, holding period ignored. */
  | 'flat-12-5'
  /** Bought 1 July 2022 – 30 June 2024 — the rate falls the longer you hold. */
  | 'holding-ladder'
  /** Bought on or after 1 July 2024 — one flat rate for filers. */
  | 'flat-15';

/** One rung of the 1 July 2022 – 30 June 2024 ladder. */
export interface ListedLadderBand {
  id: string;
  label: string;
  /** Top of the band in years; null on the open-ended "over six years" rung. */
  upToYears: number | null;
  /** Division VII column (3). A non-filer pays twice this unless rule 10(y) covers them. */
  rate: number;
}

/** The fund table for one tax year, split by who holds the units. Filer rates. */
export type MutualFundYear = Record<InvestorType, Record<FundClass, number>>;

/**
 * One tax year's rates across both markets. `nonFilerConfidence` covers every
 * non-filer figure in the year, because they all rest on the same Tenth
 * Schedule question.
 */
export interface CapitalGainsYear {
  nonFilerConfidence: RateConfidence;
  /**
   * Units and contracts bought on or after this date escaped the non-filer
   * uplift while Tenth Schedule rule 10(y) was in force. Null once the Finance
   * Act 2026 removed that rule, so nothing escapes.
   */
  nonFilerUpliftExemptFrom: string | null;
  /** Filer rates for the regimes that do not use the ladder. */
  listed: Record<Exclude<ListedRegime, 'holding-ladder'>, number>;
  listedLadder: readonly ListedLadderBand[];
  mutualFunds: MutualFundYear;
}

/* ------------------------------------------------------------------ */
/* Inputs                                                             */
/* ------------------------------------------------------------------ */

export interface ListedSecuritiesInputs {
  purchaseCost: number;
  saleProceeds: number;
  /** `YYYY-MM-DD`. Picks the regime. */
  acquisitionDate: string;
  /** `YYYY-MM-DD`. Picks the tax year. */
  disposalDate: string;
  filer: boolean;
}

export interface MutualFundInputs {
  purchaseCost: number;
  redemptionProceeds: number;
  acquisitionDate: string;
  redemptionDate: string;
  investorType: InvestorType;
  fundClass: FundClass;
  filer: boolean;
}

/* ------------------------------------------------------------------ */
/* Form state                                                         */
/* ------------------------------------------------------------------ */

/**
 * No `investorType`: Division VII prices a listed security by when it was
 * bought, not by who held it. Only the fund table splits individual/company.
 */
export interface ListedSecuritiesFormState {
  purchaseCost: string;
  saleProceeds: string;
  acquisitionDate: string;
  disposalDate: string;
  filer: boolean;
}

export interface MutualFundFormState {
  purchaseCost: string;
  redemptionProceeds: string;
  acquisitionDate: string;
  redemptionDate: string;
  investorType: InvestorType;
  fundClass: FundClass;
  filer: boolean;
}

export type ListedSecuritiesFormField = keyof ListedSecuritiesFormState;
export type MutualFundFormField = keyof MutualFundFormState;

export type UpdateListedSecuritiesField = <TField extends ListedSecuritiesFormField>(
  field: TField,
  value: ListedSecuritiesFormState[TField],
) => void;

export type UpdateMutualFundField = <TField extends MutualFundFormField>(
  field: TField,
  value: MutualFundFormState[TField],
) => void;

/* ------------------------------------------------------------------ */
/* Results                                                            */
/* ------------------------------------------------------------------ */

/** Everything both results share, so one summary component can read them. */
export interface CapitalGainsResultBase {
  fiscalYear: CapitalGainsFiscalYear;
  coverage: CapitalGainsCoverage;
  filer: boolean;
  /** Sale proceeds less purchase cost, floored at zero. */
  capitalGain: number;
  /** True where the investment was sold for less than it cost. */
  isLoss: boolean;
  /** How much was lost, as a positive number. Zero on a gain. */
  lossAmount: number;
  rate: number;
  tax: number;
  netGain: number;
  /** What the same sale would cost the other filer status. */
  filerTax: number;
  nonFilerTax: number;
  saving: number;
  /** True once both dates are real and the sale is not before the purchase. */
  datesAreValid: boolean;
  /** Whether the non-filer figure is confirmed or still inferred. */
  confidence: RateConfidence;
  /** `YYYY-MM-DD` the investment was bought — it, not the sale, picks the rate. */
  acquisitionDate: string;
  /**
   * True where Tenth Schedule rule 10(y) spared this purchase the non-filer
   * doubling. Reported so the rate table can point at the row that produced the
   * figure rather than guessing from the regime alone.
   */
  upliftExempt: boolean;
}

export interface ListedSecuritiesResult extends CapitalGainsResultBase {
  purchaseCost: number;
  saleProceeds: number;
  regime: ListedRegime;
  holdingYears: number;
  /** Band label on the ladder regime; null on the flat regimes. */
  ladderBandLabel: string | null;
}

export interface MutualFundResult extends CapitalGainsResultBase {
  purchaseCost: number;
  redemptionProceeds: number;
  investorType: InvestorType;
  fundClass: FundClass;
  holdingYears: number;
  /** True where units bought on or before 30 June 2024 were held over six years. */
  isSixYearExempt: boolean;
}

/* ------------------------------------------------------------------ */
/* Content shapes                                                     */
/* ------------------------------------------------------------------ */

export interface CapitalGainsOption<TValue extends string> {
  value: TValue;
  label: string;
  tooltip?: string;
}

/** A term and its plain-language explanation, shown behind an info icon. */
export interface CapitalGainsTerm {
  label: string;
  text: string;
}

/** One money row of a result panel. */
export interface CapitalGainsResultRow {
  id: string;
  label: string;
  value: string;
  tone: ResultCardTone;
  /** Print the value larger — used on the tax and the take-home. */
  highlight?: boolean;
  tooltip?: CapitalGainsTerm;
}

export interface CapitalGainsFaqItem {
  id: string;
  question: string;
  answer: string;
}

/** One row of the rate table shown under each calculator. */
export interface CapitalGainsRateRow {
  id: string;
  /** When the investment was bought, or which fund it is. */
  situation: string;
  filerRate: string;
  nonFilerRate: string;
}

/** The notice that stands where a tax-year dropdown would normally sit. */
export interface CapitalGainsTaxYearNoticeContent {
  yearLabel: string;
  sourceLine: string;
  warning: string | null;
}
