import { toLabelledOptions } from '@/components/calculator/options';

import type {
  VehicleAnnualTaxYear,
  VehicleCcTier,
  VehicleFiscalYear,
  VehicleProvince,
  VehicleProvinceConfig,
  VehicleRegistrationYear,
  VehicleTokenFiscalYear,
  VehicleTokenSchedule,
  VehicleTokenSource,
  VehicleTokenTier,
  VehicleTransferYear,
} from '@/features/vehicle-tax/types';

/**
 * Value at which a vehicle with no engine size falls into the special rule in
 * Division VII, Part IV of the First Schedule (both provisos).
 */
export const VEHICLE_HIGH_VALUE_THRESHOLD = 5_000_000;

/** Nothing is collected on a transfer once the vehicle passes this age — section 231B(2). */
export const VEHICLE_TRANSFER_CUTOFF_YEARS = 5;

/** Percentage taken off a used-vehicle charge for each full year of age. */
export const VEHICLE_TRANSFER_REDUCTION_PER_YEAR = 10;

/** The federal yearly charge stops on a car this old — section 234(2A). */
export const VEHICLE_ANNUAL_TAX_CUTOFF_YEARS = 10;

/**
 * Someone who is not on the Active Taxpayer List pays three times the
 * registration or transfer charge. Rule 1 of the Tenth Schedule raises most
 * withholding by 100%, but its first proviso singles out section 231B for a
 * 200% increase.
 */
const REGISTRATION_NON_FILER_MULTIPLIER = 3;

/** The yearly charge collected with the token follows the ordinary Rule 1 doubling. */
const ANNUAL_TAX_NON_FILER_MULTIPLIER = 2;

/**
 * Engine-size bands for the charge at registration, as a percentage of the
 * vehicle's value. Read off the FBR Withholding Income Tax Rate Card (Division
 * VII, Part IV, First Schedule, clause 1) and identical to the table the
 * Finance Act 2024 substituted, which is when this basis started.
 */
const PERCENT_OF_VALUE_TIERS = [
  {
    id: 'cc-850',
    label: 'Up to 850 cc',
    minCc: 0,
    maxCc: 850,
    charge: { kind: 'percent', percent: 0.5 },
  },
  {
    id: 'cc-1000',
    label: '851 – 1,000 cc',
    minCc: 851,
    maxCc: 1000,
    charge: { kind: 'percent', percent: 1 },
  },
  {
    id: 'cc-1300',
    label: '1,001 – 1,300 cc',
    minCc: 1001,
    maxCc: 1300,
    charge: { kind: 'percent', percent: 1.5 },
  },
  {
    id: 'cc-1600',
    label: '1,301 – 1,600 cc',
    minCc: 1301,
    maxCc: 1600,
    charge: { kind: 'percent', percent: 2 },
  },
  {
    id: 'cc-1800',
    label: '1,601 – 1,800 cc',
    minCc: 1601,
    maxCc: 1800,
    charge: { kind: 'percent', percent: 3 },
  },
  {
    id: 'cc-2000',
    label: '1,801 – 2,000 cc',
    minCc: 1801,
    maxCc: 2000,
    charge: { kind: 'percent', percent: 5 },
  },
  {
    id: 'cc-2500',
    label: '2,001 – 2,500 cc',
    minCc: 2001,
    maxCc: 2500,
    charge: { kind: 'percent', percent: 7 },
  },
  {
    id: 'cc-3000',
    label: '2,501 – 3,000 cc',
    minCc: 2501,
    maxCc: 3000,
    charge: { kind: 'percent', percent: 9 },
  },
  {
    id: 'cc-over',
    label: 'Above 3,000 cc',
    minCc: 3001,
    maxCc: null,
    charge: { kind: 'percent', percent: 12 },
  },
] as const satisfies readonly VehicleCcTier[];

/**
 * The basis before the Finance Act 2024: a fixed amount up to 2,000 cc and a
 * percentage of value above it. Transcribed from the table the Finance Act 2023
 * substituted into Division VII, clause (1).
 */
const MIXED_BASIS_TIERS = [
  {
    id: 'cc-850',
    label: 'Up to 850 cc',
    minCc: 0,
    maxCc: 850,
    charge: { kind: 'amount', amount: 10_000 },
  },
  {
    id: 'cc-1000',
    label: '851 – 1,000 cc',
    minCc: 851,
    maxCc: 1000,
    charge: { kind: 'amount', amount: 20_000 },
  },
  {
    id: 'cc-1300',
    label: '1,001 – 1,300 cc',
    minCc: 1001,
    maxCc: 1300,
    charge: { kind: 'amount', amount: 25_000 },
  },
  {
    id: 'cc-1600',
    label: '1,301 – 1,600 cc',
    minCc: 1301,
    maxCc: 1600,
    charge: { kind: 'amount', amount: 50_000 },
  },
  {
    id: 'cc-1800',
    label: '1,601 – 1,800 cc',
    minCc: 1601,
    maxCc: 1800,
    charge: { kind: 'amount', amount: 150_000 },
  },
  {
    id: 'cc-2000',
    label: '1,801 – 2,000 cc',
    minCc: 1801,
    maxCc: 2000,
    charge: { kind: 'amount', amount: 200_000 },
  },
  {
    id: 'cc-2500',
    label: '2,001 – 2,500 cc',
    minCc: 2001,
    maxCc: 2500,
    charge: { kind: 'percent', percent: 6 },
  },
  {
    id: 'cc-3000',
    label: '2,501 – 3,000 cc',
    minCc: 2501,
    maxCc: 3000,
    charge: { kind: 'percent', percent: 8 },
  },
  {
    id: 'cc-over',
    label: 'Above 3,000 cc',
    minCc: 3001,
    maxCc: null,
    charge: { kind: 'percent', percent: 10 },
  },
] as const satisfies readonly VehicleCcTier[];

const PERCENT_OF_VALUE_YEAR = {
  tiers: PERCENT_OF_VALUE_TIERS,
  noEngineSizePercent: 3,
  nonFilerMultiplier: REGISTRATION_NON_FILER_MULTIPLIER,
  basis: 'percentOfValue',
} as const satisfies VehicleRegistrationYear;

const MIXED_BASIS_YEAR = {
  tiers: MIXED_BASIS_TIERS,
  noEngineSizePercent: 3,
  nonFilerMultiplier: REGISTRATION_NON_FILER_MULTIPLIER,
  basis: 'mixed',
} as const satisfies VehicleRegistrationYear;

/**
 * The Finance Act 2026 amends Part IV of the First Schedule only at Divisions X,
 * XVIII, XXVII and XA, so the vehicle table carries into 2026-27 unchanged.
 */
export const VEHICLE_REGISTRATION_RATES = {
  '2026-2027': PERCENT_OF_VALUE_YEAR,
  '2025-2026': PERCENT_OF_VALUE_YEAR,
  '2024-2025': PERCENT_OF_VALUE_YEAR,
  '2023-2024': MIXED_BASIS_YEAR,
} as const satisfies Record<VehicleFiscalYear, VehicleRegistrationYear>;

/**
 * Fixed amounts for a used-vehicle transfer (Division VII, clause 2). Unchanged
 * from the Finance Act 2023 through the Finance Act 2026, so one table covers
 * every year we show.
 */
const TRANSFER_TIERS = [
  {
    id: 'cc-850',
    label: 'Up to 850 cc',
    minCc: 0,
    maxCc: 850,
    charge: { kind: 'amount', amount: 0 },
  },
  {
    id: 'cc-1000',
    label: '851 – 1,000 cc',
    minCc: 851,
    maxCc: 1000,
    charge: { kind: 'amount', amount: 5000 },
  },
  {
    id: 'cc-1300',
    label: '1,001 – 1,300 cc',
    minCc: 1001,
    maxCc: 1300,
    charge: { kind: 'amount', amount: 7500 },
  },
  {
    id: 'cc-1600',
    label: '1,301 – 1,600 cc',
    minCc: 1301,
    maxCc: 1600,
    charge: { kind: 'amount', amount: 12_500 },
  },
  {
    id: 'cc-1800',
    label: '1,601 – 1,800 cc',
    minCc: 1601,
    maxCc: 1800,
    charge: { kind: 'amount', amount: 18_750 },
  },
  {
    id: 'cc-2000',
    label: '1,801 – 2,000 cc',
    minCc: 1801,
    maxCc: 2000,
    charge: { kind: 'amount', amount: 25_000 },
  },
  {
    id: 'cc-2500',
    label: '2,001 – 2,500 cc',
    minCc: 2001,
    maxCc: 2500,
    charge: { kind: 'amount', amount: 37_500 },
  },
  {
    id: 'cc-3000',
    label: '2,501 – 3,000 cc',
    minCc: 2501,
    maxCc: 3000,
    charge: { kind: 'amount', amount: 50_000 },
  },
  {
    id: 'cc-over',
    label: 'Above 3,000 cc',
    minCc: 3001,
    maxCc: null,
    charge: { kind: 'amount', amount: 62_500 },
  },
] as const satisfies readonly VehicleCcTier[];

const TRANSFER_YEAR = {
  tiers: TRANSFER_TIERS,
  noEngineSizeAmount: 20_000,
  nonFilerMultiplier: REGISTRATION_NON_FILER_MULTIPLIER,
} as const satisfies VehicleTransferYear;

export const VEHICLE_TRANSFER_RATES = {
  '2026-2027': TRANSFER_YEAR,
  '2025-2026': TRANSFER_YEAR,
  '2024-2025': TRANSFER_YEAR,
  '2023-2024': TRANSFER_YEAR,
} as const satisfies Record<VehicleFiscalYear, VehicleTransferYear>;

/**
 * The federal yearly charge collected with the token (section 234, Division III
 * of Part IV). Read off the FBR Withholding Income Tax Rate Card. No Finance
 * Act from 2023 to 2026 touches Division III, so one table covers every year.
 */
const ANNUAL_TAX_PER_YEAR_TIERS = [
  {
    id: 'cc-1000',
    label: 'Up to 1,000 cc',
    minCc: 0,
    maxCc: 1000,
    charge: { kind: 'amount', amount: 800 },
  },
  {
    id: 'cc-1199',
    label: '1,001 – 1,199 cc',
    minCc: 1001,
    maxCc: 1199,
    charge: { kind: 'amount', amount: 1500 },
  },
  {
    id: 'cc-1299',
    label: '1,200 – 1,299 cc',
    minCc: 1200,
    maxCc: 1299,
    charge: { kind: 'amount', amount: 1750 },
  },
  {
    id: 'cc-1499',
    label: '1,300 – 1,499 cc',
    minCc: 1300,
    maxCc: 1499,
    charge: { kind: 'amount', amount: 2500 },
  },
  {
    id: 'cc-1599',
    label: '1,500 – 1,599 cc',
    minCc: 1500,
    maxCc: 1599,
    charge: { kind: 'amount', amount: 3750 },
  },
  {
    id: 'cc-1999',
    label: '1,600 – 1,999 cc',
    minCc: 1600,
    maxCc: 1999,
    charge: { kind: 'amount', amount: 4500 },
  },
  {
    id: 'cc-over',
    label: '2,000 cc and above',
    minCc: 2000,
    maxCc: null,
    charge: { kind: 'amount', amount: 10_000 },
  },
] as const satisfies readonly VehicleCcTier[];

/** The same charge where the provincial token itself is collected as one lump sum. */
const ANNUAL_TAX_LUMP_SUM_TIERS = [
  {
    id: 'cc-1000',
    label: 'Up to 1,000 cc',
    minCc: 0,
    maxCc: 1000,
    charge: { kind: 'amount', amount: 10_000 },
  },
  {
    id: 'cc-1199',
    label: '1,001 – 1,199 cc',
    minCc: 1001,
    maxCc: 1199,
    charge: { kind: 'amount', amount: 18_000 },
  },
  {
    id: 'cc-1299',
    label: '1,200 – 1,299 cc',
    minCc: 1200,
    maxCc: 1299,
    charge: { kind: 'amount', amount: 20_000 },
  },
  {
    id: 'cc-1499',
    label: '1,300 – 1,499 cc',
    minCc: 1300,
    maxCc: 1499,
    charge: { kind: 'amount', amount: 30_000 },
  },
  {
    id: 'cc-1599',
    label: '1,500 – 1,599 cc',
    minCc: 1500,
    maxCc: 1599,
    charge: { kind: 'amount', amount: 45_000 },
  },
  {
    id: 'cc-1999',
    label: '1,600 – 1,999 cc',
    minCc: 1600,
    maxCc: 1999,
    charge: { kind: 'amount', amount: 60_000 },
  },
  {
    id: 'cc-over',
    label: '2,000 cc and above',
    minCc: 2000,
    maxCc: null,
    charge: { kind: 'amount', amount: 120_000 },
  },
] as const satisfies readonly VehicleCcTier[];

/**
 * Annotated rather than `as const`, because callers pick between the two tables
 * at runtime and the literal types would not unify.
 */
export const VEHICLE_ANNUAL_TAX: VehicleAnnualTaxYear = {
  perYear: ANNUAL_TAX_PER_YEAR_TIERS,
  lumpSum: ANNUAL_TAX_LUMP_SUM_TIERS,
  nonFilerMultiplier: ANNUAL_TAX_NON_FILER_MULTIPLIER,
};

const PUNJAB_TOKEN_SOURCE = {
  tier: 'official',
  label: 'Punjab Excise & Taxation Department motor-car token table',
  url: 'https://excise.punjab.gov.pk/motorvehicle_tax',
} as const satisfies VehicleTokenSource;

const ICT_TOKEN_SOURCE = {
  tier: 'official',
  label: 'Finance Act 2026, Schedule to the West Pakistan Motor Vehicles Taxation Act 1958',
  url: 'https://download1.fbr.gov.pk/Docs/20266291261044366FinanceAct2026.pdf',
} as const satisfies VehicleTokenSource;

const SINDH_TOKEN_SOURCE = {
  tier: 'official',
  label: 'Sindh Excise & Taxation Department four-wheeler tax calculator',
  url: 'https://excise.gos.pk/online_services/four_wheeler/',
} as const satisfies VehicleTokenSource;

const KP_TOKEN_SOURCE = {
  tier: 'official',
  label: 'Khyber Pakhtunkhwa Finance Act 2025, Appendix-III (Schedule-II)',
  url: 'https://kpcode.kp.gov.pk/uploads/THE_KHYBER_PAKHTUNKHWA_FINANCE_ACT_2025.pdf',
} as const satisfies VehicleTokenSource;

const BALOCHISTAN_TOKEN_SOURCE = {
  tier: 'official',
  label: 'Balochistan Excise Schedule of Taxes and Fees, in force from 1 July 2025',
  url: 'https://excise.balochistan.gov.pk/wp-content/uploads/2026/01/mvtx.pdf',
} as const satisfies VehicleTokenSource;

/**
 * Punjab charges the smallest cars once for the life of the vehicle and everyone
 * else a percentage of the invoice price. Both years below are transcribed from
 * the Punjab Excise & Taxation Department's published motor-car table, which
 * lists 2026-27 and 2025-26 side by side.
 */
const PUNJAB_2026_TIERS = [
  {
    id: 'punjab-1000',
    label: 'Up to 1,000 cc',
    minCc: 0,
    maxCc: 1000,
    charge: { kind: 'amount', amount: 20_000 },
    frequency: 'lifetime',
  },
  {
    id: 'punjab-2000',
    label: '1,001 – 2,000 cc',
    minCc: 1001,
    maxCc: 2000,
    charge: { kind: 'percent', percent: 0.3 },
    frequency: 'annual',
  },
  {
    id: 'punjab-over',
    label: 'Above 2,000 cc',
    minCc: 2001,
    maxCc: null,
    charge: { kind: 'percent', percent: 0.4 },
    frequency: 'annual',
  },
] as const satisfies readonly VehicleTokenTier[];

const PUNJAB_2025_TIERS = [
  {
    id: 'punjab-1000',
    label: 'Up to 1,000 cc',
    minCc: 0,
    maxCc: 1000,
    charge: { kind: 'amount', amount: 20_000 },
    frequency: 'lifetime',
  },
  {
    id: 'punjab-2000',
    label: '1,001 – 2,000 cc',
    minCc: 1001,
    maxCc: 2000,
    charge: { kind: 'percent', percent: 0.2 },
    frequency: 'annual',
  },
  {
    id: 'punjab-over',
    label: 'Above 2,000 cc',
    minCc: 2001,
    maxCc: null,
    charge: { kind: 'percent', percent: 0.3 },
    frequency: 'annual',
  },
] as const satisfies readonly VehicleTokenTier[];

/**
 * Islamabad's token is set by the federal budget, not a province. The Finance
 * Act 2026 substituted Table 2 of the Schedule to the West Pakistan Motor
 * Vehicles Taxation Act 1958 as it applies in the Capital Territory, which is
 * where these bands come from. The Act only gives the new table, so 2025-26 is
 * left out rather than guessed.
 */
const ICT_2026_TIERS = [
  {
    id: 'ict-1000',
    label: 'Up to 1,000 cc',
    minCc: 0,
    maxCc: 1000,
    charge: { kind: 'amount', amount: 20_000 },
    frequency: 'lifetime',
  },
  {
    id: 'ict-1300',
    label: '1,001 – 1,300 cc',
    minCc: 1001,
    maxCc: 1300,
    charge: { kind: 'percent', percent: 0.25 },
    frequency: 'annual',
  },
  {
    id: 'ict-1500',
    label: '1,301 – 1,500 cc',
    minCc: 1301,
    maxCc: 1500,
    charge: { kind: 'percent', percent: 0.25 },
    frequency: 'annual',
  },
  {
    id: 'ict-2000',
    label: '1,501 – 2,000 cc',
    minCc: 1501,
    maxCc: 2000,
    charge: { kind: 'percent', percent: 0.25 },
    frequency: 'annual',
  },
  {
    id: 'ict-2500',
    label: '2,001 – 2,500 cc',
    minCc: 2001,
    maxCc: 2500,
    charge: { kind: 'percent', percent: 0.35 },
    frequency: 'annual',
  },
  {
    id: 'ict-over',
    label: '2,501 cc and above',
    minCc: 2501,
    maxCc: null,
    charge: { kind: 'percent', percent: 0.35 },
    frequency: 'annual',
  },
] as const satisfies readonly VehicleTokenTier[];

/**
 * Sindh charges a set yearly amount for every band — the invoice price only
 * decides the registration fee, not the token. Read off the Excise & Taxation
 * Department's own four-wheeler calculator, whose registration-fee output
 * matches the department's published fee table band for band.
 */
const SINDH_TIERS = [
  {
    id: 'sindh-1000',
    label: 'Up to 1,000 cc',
    minCc: 0,
    maxCc: 1000,
    charge: { kind: 'amount', amount: 1500 },
    frequency: 'annual',
  },
  {
    id: 'sindh-1300',
    label: '1,001 – 1,300 cc',
    minCc: 1001,
    maxCc: 1300,
    charge: { kind: 'amount', amount: 2000 },
    frequency: 'annual',
  },
  {
    id: 'sindh-1600',
    label: '1,301 – 1,600 cc',
    minCc: 1301,
    maxCc: 1600,
    charge: { kind: 'amount', amount: 4000 },
    frequency: 'annual',
  },
  {
    id: 'sindh-2000',
    label: '1,601 – 2,000 cc',
    minCc: 1601,
    maxCc: 2000,
    charge: { kind: 'amount', amount: 4500 },
    frequency: 'annual',
  },
  {
    id: 'sindh-2500',
    label: '2,001 – 2,500 cc',
    minCc: 2001,
    maxCc: 2500,
    charge: { kind: 'amount', amount: 5000 },
    frequency: 'annual',
  },
  {
    id: 'sindh-over',
    label: 'Above 2,500 cc',
    minCc: 2501,
    maxCc: null,
    charge: { kind: 'amount', amount: 7000 },
    frequency: 'annual',
  },
] as const satisfies readonly VehicleTokenTier[];

/**
 * Khyber Pakhtunkhwa also charges a set yearly amount by engine size. From
 * item 4(a) of Schedule-II to the West Pakistan Motor Vehicles Taxation Act
 * 1958, as substituted by Appendix-III of the KP Finance Act 2025 for private
 * cars, jeeps, pickups and vans seating up to six people.
 */
const KP_TIERS = [
  {
    id: 'kp-1000',
    label: 'Up to 1,000 cc',
    minCc: 0,
    maxCc: 1000,
    charge: { kind: 'amount', amount: 2000 },
    frequency: 'annual',
  },
  {
    id: 'kp-1300',
    label: '1,001 – 1,300 cc',
    minCc: 1001,
    maxCc: 1300,
    charge: { kind: 'amount', amount: 3000 },
    frequency: 'annual',
  },
  {
    id: 'kp-1500',
    label: '1,301 – 1,500 cc',
    minCc: 1301,
    maxCc: 1500,
    charge: { kind: 'amount', amount: 4000 },
    frequency: 'annual',
  },
  {
    id: 'kp-2500',
    label: '1,501 – 2,500 cc',
    minCc: 1501,
    maxCc: 2500,
    charge: { kind: 'amount', amount: 5000 },
    frequency: 'annual',
  },
  {
    id: 'kp-over',
    label: 'Above 2,500 cc',
    minCc: 2501,
    maxCc: null,
    charge: { kind: 'amount', amount: 8000 },
    frequency: 'annual',
  },
] as const satisfies readonly VehicleTokenTier[];

/**
 * Balochistan is the one province where age changes the basis rather than just
 * the amount: a car up to 1,000 cc pays once for the life of the vehicle while
 * it is under five years old, and only starts paying yearly after that. Larger
 * cars pay the same yearly amount whatever their age. From items 13 to 15 of
 * the Excise department's Schedule of Taxes and Fees.
 */
const BALOCHISTAN_TIERS = [
  {
    id: 'bal-660-new',
    label: 'Up to 660 cc, under 5 years old',
    minCc: 0,
    maxCc: 660,
    maxCompletedYears: 4,
    charge: { kind: 'amount', amount: 10_500 },
    frequency: 'lifetime',
  },
  {
    id: 'bal-660-older',
    label: 'Up to 660 cc, 5 years or older',
    minCc: 0,
    maxCc: 660,
    minCompletedYears: 5,
    charge: { kind: 'amount', amount: 1000 },
    frequency: 'annual',
  },
  {
    id: 'bal-1000-new',
    label: '661 – 1,000 cc, under 5 years old',
    minCc: 661,
    maxCc: 1000,
    maxCompletedYears: 4,
    charge: { kind: 'amount', amount: 12_000 },
    frequency: 'lifetime',
  },
  {
    id: 'bal-1000-older',
    label: '661 – 1,000 cc, 5 years or older',
    minCc: 661,
    maxCc: 1000,
    minCompletedYears: 5,
    charge: { kind: 'amount', amount: 1100 },
    frequency: 'annual',
  },
  {
    id: 'bal-1500',
    label: '1,001 – 1,500 cc',
    minCc: 1001,
    maxCc: 1500,
    charge: { kind: 'amount', amount: 1400 },
    frequency: 'annual',
  },
  {
    id: 'bal-2000',
    label: '1,501 – 2,000 cc',
    minCc: 1501,
    maxCc: 2000,
    charge: { kind: 'amount', amount: 1700 },
    frequency: 'annual',
  },
  {
    id: 'bal-over',
    label: 'Above 2,000 cc',
    minCc: 2001,
    maxCc: null,
    charge: { kind: 'amount', amount: 2000 },
    frequency: 'annual',
  },
] as const satisfies readonly VehicleTokenTier[];

const SINDH_SCHEDULE = {
  tiers: SINDH_TIERS,
  earlyPaymentDiscount: 0,
  earlyPaymentDeadline: null,
  source: SINDH_TOKEN_SOURCE,
} as const satisfies VehicleTokenSchedule;

const KP_SCHEDULE = {
  tiers: KP_TIERS,
  earlyPaymentDiscount: 0,
  earlyPaymentDeadline: null,
  source: KP_TOKEN_SOURCE,
} as const satisfies VehicleTokenSchedule;

const BALOCHISTAN_SCHEDULE = {
  tiers: BALOCHISTAN_TIERS,
  earlyPaymentDiscount: 0,
  earlyPaymentDeadline: null,
  source: BALOCHISTAN_TOKEN_SOURCE,
} as const satisfies VehicleTokenSchedule;

export const VEHICLE_PROVINCES = [
  {
    province: 'punjab',
    label: 'Punjab',
    authority: 'Punjab Excise & Taxation Department',
    authorityUrl: 'https://excise.punjab.gov.pk/motorvehicle_tax',
    schedules: {
      '2026-2027': {
        tiers: PUNJAB_2026_TIERS,
        earlyPaymentDiscount: 10,
        earlyPaymentDeadline: '31 August',
        source: PUNJAB_TOKEN_SOURCE,
      },
      '2025-2026': {
        tiers: PUNJAB_2025_TIERS,
        earlyPaymentDiscount: 10,
        earlyPaymentDeadline: '31 August',
        source: PUNJAB_TOKEN_SOURCE,
      },
    },
    notes: [
      'Cars up to 1,000 cc pay Rs. 20,000 once, for the life of the vehicle, instead of every year.',
      'Everything above 1,000 cc is charged on the invoice price of the car, not its engine size.',
      'Paying the whole year by 31 August takes 10% off the yearly amount.',
      'Electric vehicles get 95% off both the registration fee and the yearly motor vehicle tax.',
    ],
  },
  {
    province: 'ict',
    label: 'Islamabad (ICT)',
    authority: 'Islamabad Excise & Taxation Department',
    authorityUrl: 'https://excise.punjab.gov.pk/motorvehicle_tax',
    schedules: {
      '2026-2027': {
        tiers: ICT_2026_TIERS,
        earlyPaymentDiscount: 0,
        earlyPaymentDeadline: null,
        source: ICT_TOKEN_SOURCE,
      },
    },
    notes: [
      'Islamabad moved to invoice-price charging on 1 July 2026, under the Finance Act 2026.',
      'Cars up to 1,000 cc pay Rs. 20,000 once, for the life of the vehicle.',
      'Cars from 1,001 cc to 2,000 cc pay 0.25% of the invoice price each year, and 0.35% above 2,000 cc.',
    ],
  },
  {
    province: 'sindh',
    label: 'Sindh',
    authority: 'Sindh Excise, Taxation & Narcotics Control Department',
    authorityUrl: 'https://excise.gos.pk/taxes/Motor-Vehicle-Tax',
    schedules: {
      '2026-2027': SINDH_SCHEDULE,
    },
    notes: [
      'Every band is a set yearly amount — Sindh charges the token on engine size, not on the price of the car.',
      'A car up to 1,000 cc can instead pay Rs. 20,000 once, for the life of the vehicle.',
      'There is no early-payment discount on the yearly token.',
    ],
  },
  {
    province: 'kp',
    label: 'Khyber Pakhtunkhwa',
    authority: 'Khyber Pakhtunkhwa Excise, Taxation & Narcotics Control Department',
    authorityUrl: 'https://www.kpexcise.gov.pk/new/mvtax/',
    schedules: {
      '2026-2027': KP_SCHEDULE,
      '2025-2026': KP_SCHEDULE,
    },
    notes: [
      'Every band is a set yearly amount, charged on engine size rather than the price of the car.',
      'These amounts came in on 1 July 2025 and no later Act has changed them.',
      'Electric four-wheelers pay no token tax at all until 30 June 2028.',
    ],
  },
  {
    province: 'balochistan',
    label: 'Balochistan',
    authority: 'Balochistan Excise, Taxation & Anti-Narcotics Department',
    authorityUrl: 'https://excise.balochistan.gov.pk/',
    schedules: {
      '2026-2027': BALOCHISTAN_SCHEDULE,
      '2025-2026': BALOCHISTAN_SCHEDULE,
    },
    notes: [
      'A car up to 1,000 cc pays once for the life of the vehicle while it is under five years old, then a yearly amount after that.',
      'Cars above 1,000 cc pay a set yearly amount that does not change with the age of the car.',
      'Older cars may instead settle a lifetime figure, which falls the longer the car has been registered.',
    ],
  },
] as const satisfies readonly VehicleProvinceConfig[];

export const VEHICLE_PROVINCE_OPTIONS = toLabelledOptions(
  VEHICLE_PROVINCES,
  (entry) => entry.province,
);

export const VEHICLE_FISCAL_YEARS = [
  '2026-2027',
  '2025-2026',
  '2024-2025',
  '2023-2024',
] as const satisfies readonly VehicleFiscalYear[];

export const VEHICLE_TOKEN_FISCAL_YEARS = [
  '2026-2027',
  '2025-2026',
] as const satisfies readonly VehicleTokenFiscalYear[];

export const DEFAULT_VEHICLE_FISCAL_YEAR: VehicleFiscalYear = '2026-2027';
export const DEFAULT_VEHICLE_TOKEN_FISCAL_YEAR: VehicleTokenFiscalYear = '2026-2027';
export const DEFAULT_VEHICLE_PROVINCE: VehicleProvince = 'punjab';

export function isVehicleFiscalYear(value: string): value is VehicleFiscalYear {
  return Object.hasOwn(VEHICLE_REGISTRATION_RATES, value);
}

export function resolveVehicleFiscalYear(value: string): VehicleFiscalYear {
  return isVehicleFiscalYear(value) ? value : DEFAULT_VEHICLE_FISCAL_YEAR;
}

export function isVehicleTokenFiscalYear(value: string): value is VehicleTokenFiscalYear {
  return VEHICLE_TOKEN_FISCAL_YEARS.includes(value as VehicleTokenFiscalYear);
}

export function resolveVehicleTokenFiscalYear(value: string): VehicleTokenFiscalYear {
  return isVehicleTokenFiscalYear(value) ? value : DEFAULT_VEHICLE_TOKEN_FISCAL_YEAR;
}

export function getVehicleRegistrationYear(fiscalYear: string): VehicleRegistrationYear {
  return VEHICLE_REGISTRATION_RATES[resolveVehicleFiscalYear(fiscalYear)];
}

export function getVehicleTransferYear(fiscalYear: string): VehicleTransferYear {
  return VEHICLE_TRANSFER_RATES[resolveVehicleFiscalYear(fiscalYear)];
}

export function getVehicleProvince(province: VehicleProvince): VehicleProvinceConfig {
  return VEHICLE_PROVINCES.find((entry) => entry.province === province) ?? VEHICLE_PROVINCES[0];
}

export function isVehicleProvince(value: string): value is VehicleProvince {
  return VEHICLE_PROVINCES.some((entry) => entry.province === value);
}

export function resolveVehicleProvince(value: string): VehicleProvince {
  return isVehicleProvince(value) ? value : DEFAULT_VEHICLE_PROVINCE;
}
