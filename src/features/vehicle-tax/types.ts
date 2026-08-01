/** Years the registration and transfer calculator covers. */
export type VehicleFiscalYear = '2026-2027' | '2025-2026' | '2024-2025' | '2023-2024';

/**
 * Years the annual token calculator covers. Shorter than the registration list
 * because a provincial token schedule has to be read off that province's own
 * published table, and only these years are published.
 */
export type VehicleTokenFiscalYear = '2026-2027' | '2025-2026';

/** Whether the taxpayer is registering a new vehicle or buying a used one. */
export type VehicleRegistrationMode = 'register' | 'transfer';

/**
 * Engine-powered vehicles are charged on their engine size. Electric vehicles
 * have no engine size, so the law charges them on value instead.
 */
export type VehicleEngineType = 'combustion' | 'electric';

export type VehicleProvince = 'punjab' | 'ict' | 'sindh' | 'kp' | 'balochistan';

/** A charge is either a rupee amount or a percentage of the vehicle's value. */
export type VehicleCharge =
  | { kind: 'amount'; amount: number }
  | { kind: 'percent'; percent: number };

/** One engine-size band and what it is charged. */
export interface VehicleCcTier {
  id: string;
  /** Band as it reads on the official table, e.g. "1,001 – 1,300 cc". */
  label: string;
  minCc: number;
  /** Null on the open-ended top band. */
  maxCc: number | null;
  charge: VehicleCharge;
}

export interface VehicleRegistrationYear {
  tiers: readonly VehicleCcTier[];
  /**
   * Percentage charged when the vehicle has no engine size and is worth at
   * least `VEHICLE_HIGH_VALUE_THRESHOLD`.
   */
  noEngineSizePercent: number;
  /** How much more someone off the taxpayer list pays, as a multiple. */
  nonFilerMultiplier: number;
  /** Whether every band is a percentage, or some bands are still fixed amounts. */
  basis: 'percentOfValue' | 'mixed';
}

export interface VehicleTransferYear {
  tiers: readonly VehicleCcTier[];
  /** Flat charge when the vehicle has no engine size and is worth at least the threshold. */
  noEngineSizeAmount: number;
  nonFilerMultiplier: number;
}

export interface VehicleAnnualTaxYear {
  /** Charged every year, alongside a yearly token. */
  perYear: readonly VehicleCcTier[];
  /** Charged once, alongside a one-off lifetime token. */
  lumpSum: readonly VehicleCcTier[];
  nonFilerMultiplier: number;
}

/** Whether a token is charged every year or once for the life of the vehicle. */
export type VehicleTokenFrequency = 'annual' | 'lifetime';

/** A yearly token band, or a one-off band paid once for the life of the vehicle. */
export interface VehicleTokenTier extends VehicleCcTier {
  frequency: VehicleTokenFrequency;
  /**
   * Completed years of age the band starts at. Left out where the province
   * charges the same whatever the age of the vehicle.
   */
  minCompletedYears?: number;
  /** Completed years of age the band stops at. Null on an open-ended band. */
  maxCompletedYears?: number | null;
}

/**
 * Whether a province's bands were transcribed from the government itself or
 * from somewhere else. Anything not `official` is labelled as such on the page.
 */
export type VehicleTokenSourceTier = 'official' | 'secondary';

/** Where a province's published bands were read from. */
export interface VehicleTokenSource {
  tier: VehicleTokenSourceTier;
  /** The document or page the bands were transcribed from. */
  label: string;
  url: string;
}

export interface VehicleTokenSchedule {
  tiers: readonly VehicleTokenTier[];
  /** Percentage taken off a yearly token that is paid by the deadline. */
  earlyPaymentDiscount: number;
  /** Plain-language deadline for that discount, e.g. "31 August". */
  earlyPaymentDeadline: string | null;
  source: VehicleTokenSource;
}

export interface VehicleProvinceConfig {
  province: VehicleProvince;
  label: string;
  /** Office that sets and collects the token in that province. */
  authority: string;
  authorityUrl: string;
  /** Published schedules by year. A missing year means we have nothing verified. */
  schedules: Partial<Record<VehicleTokenFiscalYear, VehicleTokenSchedule>>;
  /** Rules that only apply in this province, shown next to the result. */
  notes: readonly string[];
}

export interface VehicleRegistrationInputs {
  mode: VehicleRegistrationMode;
  engineType: VehicleEngineType;
  engineCc: number;
  vehicleValue: number;
  filer: boolean;
  /** Full years since the vehicle was first registered. Only used on a transfer. */
  completedYears: number;
  /**
   * Whether a first-registration date was actually given. `completedYears` is 0
   * both for a brand-new vehicle and for one whose date we were never told, and
   * only the first of those may be shown as "no reduction yet".
   */
  firstRegistrationKnown: boolean;
}

export interface VehicleRegistrationResult {
  fiscalYear: VehicleFiscalYear;
  mode: VehicleRegistrationMode;
  engineType: VehicleEngineType;
  filer: boolean;
  engineCc: number;
  vehicleValue: number;
  /** Band the vehicle falls into, or null when no band applies. */
  tierLabel: string | null;
  /** How the charge for that band is worked out. */
  charge: VehicleCharge | null;
  /** The charge before the used-vehicle reduction. */
  taxBeforeReduction: number;
  /** Percentage taken off for the years since first registration. */
  reductionPercent: number;
  completedYears: number;
  firstRegistrationKnown: boolean;
  /** True once the vehicle is more than five years past first registration. */
  pastFiveYears: boolean;
  tax: number;
  filerTax: number;
  nonFilerTax: number;
  filerSaving: number;
  /** True when the law sets no charge for this combination of answers. */
  unrated: boolean;
  /** Tax as a percentage of the vehicle's value. */
  effectiveRate: number;
  nonFilerMultiplier: number;
  basis: 'percentOfValue' | 'mixed';
}

export interface VehicleTokenInputs {
  province: VehicleProvince;
  engineCc: number;
  invoiceValue: number;
  filer: boolean;
  /** Whether the whole year is paid by the province's early-payment deadline. */
  payEarly: boolean;
  /** Full years since the vehicle was first registered. */
  completedYears: number;
}

export interface VehicleTokenResult {
  fiscalYear: VehicleTokenFiscalYear;
  province: VehicleProvince;
  filer: boolean;
  engineCc: number;
  invoiceValue: number;
  completedYears: number;
  /** True when that province publishes a schedule we have checked for this year. */
  tokenCovered: boolean;
  /** Where the province's bands came from, or null when we have none. */
  tokenSource: VehicleTokenSource | null;
  tokenTierLabel: string | null;
  tokenCharge: VehicleCharge | null;
  tokenFrequency: VehicleTokenFrequency | null;
  tokenBeforeDiscount: number;
  earlyPaymentDiscount: number;
  earlyPaymentDeadline: string | null;
  discountAmount: number;
  tokenTax: number;
  /** The federal yearly charge collected with the token (Section 234). */
  federalTierLabel: string | null;
  federalTax: number;
  federalFilerTax: number;
  federalNonFilerTax: number;
  /** True when the federal charge is the one-off amount paid with a lifetime token. */
  federalIsOneOff: boolean;
  /** True when the vehicle is old enough that the federal charge stops. */
  federalExempt: boolean;
  total: number;
  filerSaving: number;
}

export interface VehicleOption<TValue extends string> {
  value: TValue;
  label: string;
  /** Plain-language explanation shown on the segmented-control option. */
  tooltip?: string;
}

export interface VehicleFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface VehicleRateGuideRow {
  id: string;
  band: string;
  filerRate: string;
  nonFilerRate: string;
}
