/**
 * Three small taxes come out of ordinary transactions — taking cash out of a
 * bank, paying an electricity bill, and paying for a phone or internet. Each one
 * gets its own route, because people search for them separately.
 */
export type WithholdingMode = 'cash-withdrawal' | 'electricity' | 'phone-internet';

export type WithholdingFiscalYear = '2026-2027' | '2025-2026' | '2024-2025' | '2023-2024';

/** What the electricity meter is registered as. */
export type ElectricityConnection = 'domestic' | 'commercial' | 'industrial';

/** Meters that are charged the same whether or not the owner is on the list. */
export type ElectricityBusinessConnection = Exclude<ElectricityConnection, 'domestic'>;

/** Which service the money is being paid for. */
export type TelecomService = 'mobile-internet' | 'landline';

/** Whether the money pays a bill that arrives later or loads a prepaid number now. */
export type TelecomPayment = 'bill' | 'top-up';

/* ------------------------------------------------------------------ */
/* Rate tables                                                        */
/* ------------------------------------------------------------------ */

export interface CashWithdrawalYear {
  /** The day's cash has to pass this figure before anything is deducted. */
  dailyThreshold: number;
  /** Percentage taken from a non-filer. */
  nonFilerRate: number;
}

/**
 * One row of the shop/office/factory table. `fixed` is charged first, then
 * `rate` is applied to whatever part of the bill sits above `rateAppliesAbove`
 * — which is zero on the rows that charge a straight percentage of the bill.
 */
export interface ElectricityBand {
  id: string;
  label: string;
  /** Top of the band in rupees; null on the open-ended top row. */
  upTo: number | null;
  fixed: number;
  rate: number;
  rateAppliesAbove: number;
}

export interface ElectricityDomesticRates {
  /** Home meters are only charged from this monthly bill upwards. */
  threshold: number;
  /** And only where the owner is a non-filer. */
  nonFilerRate: number;
}

export interface ElectricityYear {
  business: Record<ElectricityBusinessConnection, readonly ElectricityBand[]>;
  domestic: ElectricityDomesticRates;
}

export interface TelecomYear {
  /** Mobile, internet and prepaid loads. */
  mobileInternetRate: number;
  /** A landline bill is only charged on the part above this figure. */
  landlineThreshold: number;
  landlineRate: number;
  /**
   * Rate for people the FBR has publicly named for not filing a return. Null in
   * the years before that rule existed.
   */
  namedDefaulterRate: number | null;
}

/* ------------------------------------------------------------------ */
/* Inputs                                                             */
/* ------------------------------------------------------------------ */

export interface CashWithdrawalInputs {
  /** Everything taken out in cash on one day, added together. */
  dailyWithdrawal: number;
  filer: boolean;
}

export interface ElectricityInputs {
  billAmount: number;
  connection: ElectricityConnection;
  filer: boolean;
}

export interface TelecomInputs {
  amount: number;
  service: TelecomService;
  payment: TelecomPayment;
}

/* ------------------------------------------------------------------ */
/* Form state                                                         */
/* ------------------------------------------------------------------ */

export interface CashWithdrawalFormState {
  fiscalYear: WithholdingFiscalYear;
  dailyWithdrawal: string;
  filer: boolean;
}

export interface ElectricityFormState {
  fiscalYear: WithholdingFiscalYear;
  billAmount: string;
  connection: ElectricityConnection;
  filer: boolean;
}

export interface TelecomFormState {
  fiscalYear: WithholdingFiscalYear;
  amount: string;
  service: TelecomService;
  payment: TelecomPayment;
}

export type CashWithdrawalFormField = keyof CashWithdrawalFormState;
export type ElectricityFormField = keyof ElectricityFormState;
export type TelecomFormField = keyof TelecomFormState;

export type UpdateCashWithdrawalField = <TField extends CashWithdrawalFormField>(
  field: TField,
  value: CashWithdrawalFormState[TField],
) => void;

export type UpdateElectricityField = <TField extends ElectricityFormField>(
  field: TField,
  value: ElectricityFormState[TField],
) => void;

export type UpdateTelecomField = <TField extends TelecomFormField>(
  field: TField,
  value: TelecomFormState[TField],
) => void;

/* ------------------------------------------------------------------ */
/* Results                                                            */
/* ------------------------------------------------------------------ */

export interface CashWithdrawalResult {
  fiscalYear: WithholdingFiscalYear;
  filer: boolean;
  dailyWithdrawal: number;
  dailyThreshold: number;
  /** True once the day's cash passes the threshold, so a deduction starts. */
  aboveThreshold: boolean;
  /** Percentage charged to this person — nought for anyone on the list. */
  rate: number;
  /** The year's rate for someone off the list. */
  nonFilerRate: number;
  tax: number;
  filerTax: number;
  nonFilerTax: number;
  /** What being on the list saves on this one withdrawal. */
  saving: number;
  /** Cash actually in hand after the bank takes its cut. */
  cashInHand: number;
}

export interface ElectricityResult {
  fiscalYear: WithholdingFiscalYear;
  connection: ElectricityConnection;
  filer: boolean;
  billAmount: number;
  /** Band label for a shop, office or factory meter; null for a home meter. */
  bandLabel: string | null;
  /** Flat part of the band, charged before the percentage. */
  fixed: number;
  rate: number;
  /** The percentage only touches the part of the bill above this figure. */
  rateAppliesAbove: number;
  /** Bill a home meter has to reach before anything is charged. */
  domesticThreshold: number;
  /** True for a home meter whose bill is under that figure. */
  belowDomesticThreshold: boolean;
  /** True where the meter is charged the same whatever the owner's status. */
  sameForEveryone: boolean;
  tax: number;
  filerTax: number;
  nonFilerTax: number;
  saving: number;
  /** Bill plus this tax — what actually leaves the account. */
  totalPayable: number;
  /** The tax as a share of the bill. */
  effectiveRate: number;
}

export interface TelecomResult {
  fiscalYear: WithholdingFiscalYear;
  service: TelecomService;
  payment: TelecomPayment;
  amount: number;
  rate: number;
  /** Part of the amount the rate is actually applied to. */
  taxableAmount: number;
  /** A landline bill is only charged above this figure. */
  landlineThreshold: number;
  tax: number;
  /** Bill plus tax, for a bill that arrives at the end of the month. */
  totalPayable: number;
  /** Talk-time or data left after the tax, for a prepaid load. */
  amountReceived: number;
  effectiveRate: number;
  /** Rate for people the FBR has named for not filing; null before that rule. */
  namedDefaulterRate: number | null;
  /** What the same amount would cost at that higher rate. */
  namedDefaulterTax: number;
}

/* ------------------------------------------------------------------ */
/* Content shapes                                                     */
/* ------------------------------------------------------------------ */

export interface WithholdingOption<TValue extends string> {
  value: TValue;
  label: string;
  /** Short plain-language note shown on the option itself. */
  tooltip?: string;
}

export interface WithholdingFaqItem {
  id: string;
  question: string;
  answer: string;
}

/** One row of the rate table shown under each calculator. */
export interface WithholdingRateRow {
  id: string;
  /** Who or what the row is about. */
  situation: string;
  /** What comes off, in plain words. */
  charge: string;
}
