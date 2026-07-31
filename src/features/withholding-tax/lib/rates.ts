import type {
  CashWithdrawalYear,
  ElectricityBand,
  ElectricityYear,
  TelecomYear,
  WithholdingFiscalYear,
} from '@/features/withholding-tax/types';

/**
 * Every figure in this file is read off a primary FBR document:
 *
 * - **Card 2026** — FBR Withholding Income Tax Rate Card, "updated up to June 30,
 *   2025 as per Finance Act, 2025" (pp. 8, 11, 12). Covers 2025-26.
 * - **Card 2024** — FBR Withholding Income Tax Rates Card, "as per Finance Act
 *   2023 — updated up to June 30, 2023" (pp. 10, 17, 18). Covers 2023-24.
 * - **Finance Act 2023**, clause 23, which inserted section 231AB at 0.6%.
 * - **FBR Circular No. 01 of 2025-26 (Income Tax)**, para 3, which records the
 *   Finance Act 2025 increase to 0.8%.
 * - **Finance Act 2024**, First Schedule Part IV Division V, which added the 75%
 *   rate for people named in a section 114B general order.
 * - **Finance Act 2026**, which touches Part IV of the First Schedule only at
 *   Division X (section 236C) — so nothing here changes for 2026-27.
 */

/**
 * The day's cash has to pass this figure before a bank deducts anything, and it
 * is the total of the day's withdrawals rather than any single one — the
 * Explanation to section 231AB says so in as many words.
 */
const CASH_WITHDRAWAL_DAILY_THRESHOLD = 50_000;

const CASH_WITHDRAWAL_YEAR_0_8 = {
  dailyThreshold: CASH_WITHDRAWAL_DAILY_THRESHOLD,
  nonFilerRate: 0.8,
} as const satisfies CashWithdrawalYear;

const CASH_WITHDRAWAL_YEAR_0_6 = {
  dailyThreshold: CASH_WITHDRAWAL_DAILY_THRESHOLD,
  nonFilerRate: 0.6,
} as const satisfies CashWithdrawalYear;

export const CASH_WITHDRAWAL_RATES = {
  '2026-2027': CASH_WITHDRAWAL_YEAR_0_8,
  '2025-2026': CASH_WITHDRAWAL_YEAR_0_8,
  '2024-2025': CASH_WITHDRAWAL_YEAR_0_6,
  '2023-2024': CASH_WITHDRAWAL_YEAR_0_6,
} as const satisfies Record<WithholdingFiscalYear, CashWithdrawalYear>;

/** The first two rows are the same for a shop, an office and a factory. */
const ELECTRICITY_SHARED_BANDS = [
  {
    id: 'up-to-500',
    label: 'Up to Rs. 500',
    upTo: 500,
    fixed: 0,
    rate: 0,
    rateAppliesAbove: 0,
  },
  {
    id: 'up-to-20000',
    label: 'Rs. 501 – Rs. 20,000',
    upTo: 20_000,
    fixed: 0,
    rate: 10,
    rateAppliesAbove: 0,
  },
] as const satisfies readonly ElectricityBand[];

const ELECTRICITY_COMMERCIAL_BANDS = [
  ...ELECTRICITY_SHARED_BANDS,
  {
    id: 'above-20000-commercial',
    label: 'Above Rs. 20,000',
    upTo: null,
    fixed: 1950,
    rate: 12,
    rateAppliesAbove: 20_000,
  },
] as const satisfies readonly ElectricityBand[];

const ELECTRICITY_INDUSTRIAL_BANDS = [
  ...ELECTRICITY_SHARED_BANDS,
  {
    id: 'above-20000-industrial',
    label: 'Above Rs. 20,000',
    upTo: null,
    fixed: 1950,
    rate: 5,
    rateAppliesAbove: 20_000,
  },
] as const satisfies readonly ElectricityBand[];

/**
 * Both rate cards carry an identical section 235 table, and no Finance Act from
 * 2023 to 2026 amends Division IV of Part IV — so one table covers every year
 * this calculator offers.
 */
const ELECTRICITY_YEAR = {
  business: {
    commercial: ELECTRICITY_COMMERCIAL_BANDS,
    industrial: ELECTRICITY_INDUSTRIAL_BANDS,
  },
  domestic: { threshold: 25_000, nonFilerRate: 7.5 },
} as const satisfies ElectricityYear;

export const ELECTRICITY_RATES = {
  '2026-2027': ELECTRICITY_YEAR,
  '2025-2026': ELECTRICITY_YEAR,
  '2024-2025': ELECTRICITY_YEAR,
  '2023-2024': ELECTRICITY_YEAR,
} as const satisfies Record<WithholdingFiscalYear, ElectricityYear>;

/**
 * The rate a person named in a section 114B general order pays on mobile,
 * internet and prepaid loads. Added by the Finance Act 2024, so it does not
 * exist in 2023-24.
 */
const NAMED_DEFAULTER_RATE = 75;

const TELECOM_BASE_YEAR = {
  mobileInternetRate: 15,
  landlineThreshold: 1000,
  landlineRate: 10,
} as const;

const TELECOM_YEAR_WITH_NAMED_RATE = {
  ...TELECOM_BASE_YEAR,
  namedDefaulterRate: NAMED_DEFAULTER_RATE,
} as const satisfies TelecomYear;

const TELECOM_YEAR_WITHOUT_NAMED_RATE = {
  ...TELECOM_BASE_YEAR,
  namedDefaulterRate: null,
} as const satisfies TelecomYear;

export const TELECOM_RATES = {
  '2026-2027': TELECOM_YEAR_WITH_NAMED_RATE,
  '2025-2026': TELECOM_YEAR_WITH_NAMED_RATE,
  '2024-2025': TELECOM_YEAR_WITH_NAMED_RATE,
  '2023-2024': TELECOM_YEAR_WITHOUT_NAMED_RATE,
} as const satisfies Record<WithholdingFiscalYear, TelecomYear>;

export const WITHHOLDING_FISCAL_YEARS = Object.keys(
  CASH_WITHDRAWAL_RATES,
) as readonly WithholdingFiscalYear[];

export const DEFAULT_WITHHOLDING_FISCAL_YEAR: WithholdingFiscalYear = '2026-2027';

export function isWithholdingFiscalYear(value: string): value is WithholdingFiscalYear {
  return value in CASH_WITHDRAWAL_RATES;
}

export function resolveWithholdingFiscalYear(value: string): WithholdingFiscalYear {
  return isWithholdingFiscalYear(value) ? value : DEFAULT_WITHHOLDING_FISCAL_YEAR;
}

export function getCashWithdrawalYear(fiscalYear: string): CashWithdrawalYear {
  return CASH_WITHDRAWAL_RATES[resolveWithholdingFiscalYear(fiscalYear)];
}

export function getElectricityYear(fiscalYear: string): ElectricityYear {
  return ELECTRICITY_RATES[resolveWithholdingFiscalYear(fiscalYear)];
}

export function getTelecomYear(fiscalYear: string): TelecomYear {
  return TELECOM_RATES[resolveWithholdingFiscalYear(fiscalYear)];
}
