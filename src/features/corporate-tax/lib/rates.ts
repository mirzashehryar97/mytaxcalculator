import type {
  CompanyType,
  CorporateFiscalYear,
  MinimumTaxSector,
  SuperTaxBand,
  SuperTaxpayerType,
  SuperTaxYear,
} from '@/features/corporate-tax/types';

/**
 * Every table below was read out of the Income Tax Ordinance 2001 as amended up
 * to 30 June 2026 (which already carries the Finance Act 2026 amendments) and
 * cross-checked against the Finance Act 2026 gazette itself. See
 * docs/tax-sectors/corporate-companies.md for the quoted text and footnote
 * history behind each figure.
 */

export const CORPORATE_FISCAL_YEARS = [
  '2026-2027',
  '2025-2026',
  '2024-2025',
  '2023-2024',
  '2022-2023',
] as const satisfies readonly CorporateFiscalYear[];

export const DEFAULT_CORPORATE_FISCAL_YEAR: CorporateFiscalYear = '2026-2027';

/* ------------------------------------------------------------------ */
/* Company income tax — First Schedule, Part I, Division II            */
/* ------------------------------------------------------------------ */

/**
 * 29% and 20% have not moved since tax year 2023. Only the banking rate steps:
 * 39% under the table the Finance Act 2022 installed, then 44% / 43% / 42% for
 * tax years 2025 / 2026 / 2027 onwards under the Income Tax (Amendment) Act
 * 2025. Finance Act 2026 left Division II alone.
 */
export const COMPANY_TAX_RATES = {
  '2026-2027': { standard: 29, small: 20, banking: 42 },
  '2025-2026': { standard: 29, small: 20, banking: 43 },
  '2024-2025': { standard: 29, small: 20, banking: 44 },
  '2023-2024': { standard: 29, small: 20, banking: 39 },
  '2022-2023': { standard: 29, small: 20, banking: 39 },
} as const satisfies Record<CorporateFiscalYear, Record<CompanyType, number>>;

/* ------------------------------------------------------------------ */
/* Minimum tax on turnover — Section 113 + Division IX                 */
/* ------------------------------------------------------------------ */

/** Turnover at which an individual or AOP is drawn into Section 113. */
export const MINIMUM_TAX_TURNOVER_FLOOR = 100_000_000;

/**
 * Division IX has been stable since the Finance Act 2021 substituted it: 1.25%
 * in all other cases, with 0.75% / 0.5% / 0.25% groups above it. The one rate
 * that moves inside our range is the reduced rate for distributors of specified
 * goods in clause (24D) of Part II of the Second Schedule, which the Finance
 * Act 2026 raised from 0.25% to 0.5% for tax year 2027.
 */
const MINIMUM_TAX_SECTOR_RATES = {
  general: 1.25,
  'fuel-and-motorcycle': 0.5,
  'gas-airline-poultry': 0.75,
  'low-margin-trades': 0.25,
} as const satisfies Omit<Record<MinimumTaxSector, number>, 'specified-goods-distributor'>;

export const MINIMUM_TAX_RATES = {
  '2026-2027': { ...MINIMUM_TAX_SECTOR_RATES, 'specified-goods-distributor': 0.5 },
  '2025-2026': { ...MINIMUM_TAX_SECTOR_RATES, 'specified-goods-distributor': 0.25 },
  '2024-2025': { ...MINIMUM_TAX_SECTOR_RATES, 'specified-goods-distributor': 0.25 },
  '2023-2024': { ...MINIMUM_TAX_SECTOR_RATES, 'specified-goods-distributor': 0.25 },
  '2022-2023': { ...MINIMUM_TAX_SECTOR_RATES, 'specified-goods-distributor': 0.25 },
} as const satisfies Record<CorporateFiscalYear, Record<MinimumTaxSector, number>>;

/* ------------------------------------------------------------------ */
/* Super tax — Section 4C + Division IIB                               */
/* ------------------------------------------------------------------ */

const MILLION = 1_000_000;

/** Tax years 2023, 2024 and 2025 shared one eight-row table. */
const SUPER_TAX_BANDS_2023_2025: SuperTaxBand[] = [
  { over: 0, upTo: 150 * MILLION, rate: 0 },
  { over: 150 * MILLION, upTo: 200 * MILLION, rate: 1 },
  { over: 200 * MILLION, upTo: 250 * MILLION, rate: 2 },
  { over: 250 * MILLION, upTo: 300 * MILLION, rate: 3 },
  { over: 300 * MILLION, upTo: 350 * MILLION, rate: 4 },
  { over: 350 * MILLION, upTo: 400 * MILLION, rate: 6 },
  { over: 400 * MILLION, upTo: 500 * MILLION, rate: 8 },
  { over: 500 * MILLION, upTo: null, rate: 10 },
];

/** Finance Act 2025 took 0.5 points off every band from Rs 200m to Rs 500m. */
const SUPER_TAX_BANDS_2026: SuperTaxBand[] = [
  { over: 0, upTo: 150 * MILLION, rate: 0 },
  { over: 150 * MILLION, upTo: 200 * MILLION, rate: 1 },
  { over: 200 * MILLION, upTo: 250 * MILLION, rate: 1.5 },
  { over: 250 * MILLION, upTo: 300 * MILLION, rate: 2.5 },
  { over: 300 * MILLION, upTo: 350 * MILLION, rate: 3.5 },
  { over: 350 * MILLION, upTo: 400 * MILLION, rate: 5.5 },
  { over: 400 * MILLION, upTo: 500 * MILLION, rate: 7.5 },
  { over: 500 * MILLION, upTo: null, rate: 10 },
];

/** Everyone outside banking, petroleum and fertilizer, from tax year 2027. */
const SUPER_TAX_BANDS_2027_OTHER: SuperTaxBand[] = [
  { over: 0, upTo: 500 * MILLION, rate: 0 },
  { over: 500 * MILLION, upTo: null, rate: 8 },
];

/** Banking, petroleum exploration and fertilizer, from tax year 2027. */
const SUPER_TAX_BANDS_2027_NAMED: SuperTaxBand[] = [
  { over: 0, upTo: 150 * MILLION, rate: 0 },
  { over: 150 * MILLION, upTo: null, rate: 10 },
];

/**
 * A proviso still attached to the older table charged banking companies 10%
 * above Rs 300 million for tax year 2023 only; the lower bands still applied
 * below that point.
 */
const SUPER_TAX_BANDS_2023_BANKING: SuperTaxBand[] = [
  { over: 0, upTo: 150 * MILLION, rate: 0 },
  { over: 150 * MILLION, upTo: 200 * MILLION, rate: 1 },
  { over: 200 * MILLION, upTo: 250 * MILLION, rate: 2 },
  { over: 250 * MILLION, upTo: 300 * MILLION, rate: 3 },
  { over: 300 * MILLION, upTo: null, rate: 10 },
];

export const SUPER_TAX_YEARS = {
  '2026-2027': {
    bands: SUPER_TAX_BANDS_2027_OTHER,
    overrides: {
      banking: SUPER_TAX_BANDS_2027_NAMED,
      petroleum: SUPER_TAX_BANDS_2027_NAMED,
      fertilizer: SUPER_TAX_BANDS_2027_NAMED,
    },
    hasExportExemption: true,
  },
  '2025-2026': { bands: SUPER_TAX_BANDS_2026, overrides: {}, hasExportExemption: false },
  '2024-2025': { bands: SUPER_TAX_BANDS_2023_2025, overrides: {}, hasExportExemption: false },
  '2023-2024': { bands: SUPER_TAX_BANDS_2023_2025, overrides: {}, hasExportExemption: false },
  '2022-2023': {
    bands: SUPER_TAX_BANDS_2023_2025,
    overrides: { banking: SUPER_TAX_BANDS_2023_BANKING },
    hasExportExemption: false,
  },
} as const satisfies Record<CorporateFiscalYear, SuperTaxYear>;

/* ------------------------------------------------------------------ */
/* Resolvers                                                           */
/* ------------------------------------------------------------------ */

function isCorporateFiscalYear(value: string): value is CorporateFiscalYear {
  return Object.hasOwn(COMPANY_TAX_RATES, value);
}

export function resolveCorporateFiscalYear(value: string): CorporateFiscalYear {
  return isCorporateFiscalYear(value) ? value : DEFAULT_CORPORATE_FISCAL_YEAR;
}

export function getCompanyTaxRate(fiscalYear: string, companyType: CompanyType): number {
  return COMPANY_TAX_RATES[resolveCorporateFiscalYear(fiscalYear)][companyType];
}

export function getMinimumTaxRate(fiscalYear: string, sector: MinimumTaxSector): number {
  return MINIMUM_TAX_RATES[resolveCorporateFiscalYear(fiscalYear)][sector];
}

export function getSuperTaxBands(
  fiscalYear: string,
  taxpayerType: SuperTaxpayerType,
): readonly SuperTaxBand[] {
  const year: SuperTaxYear = SUPER_TAX_YEARS[resolveCorporateFiscalYear(fiscalYear)];
  return year.overrides[taxpayerType] ?? year.bands;
}

export function hasSuperTaxExportExemption(fiscalYear: string): boolean {
  return SUPER_TAX_YEARS[resolveCorporateFiscalYear(fiscalYear)].hasExportExemption;
}
