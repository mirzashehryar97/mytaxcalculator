import type { TaxBracket } from '@/utils/slabEngine';

import type {
  AgriculturalFiscalYear,
  AgriculturalLandTaxRule,
  AgriculturalProvince,
  AgriculturalSuperTaxBand,
  AgriculturalTaxpayerType,
  LandTaxBand,
  OrchardRate,
} from '@/features/agricultural-tax/types';

/**
 * Every table below was read out of the province's own Act or gazette
 * notification — never out of a summary. Agricultural income is exempt from
 * federal income tax, so the FBR sets none of this. See
 * docs/tax-sectors/agricultural-income.md for the quoted text behind each row.
 */

export const AGRICULTURAL_FISCAL_YEARS = [
  '2026-2027',
  '2025-2026',
] as const satisfies readonly AgriculturalFiscalYear[];

export const DEFAULT_AGRICULTURAL_FISCAL_YEAR: AgriculturalFiscalYear = '2026-2027';
export const DEFAULT_AGRICULTURAL_PROVINCE: AgriculturalProvince = 'punjab';

const MILLION = 1_000_000;

/* ------------------------------------------------------------------ */
/* Income slabs                                                        */
/* ------------------------------------------------------------------ */

/**
 * All four provinces moved to this table with effect from 1 January 2025 and
 * all four copied the federal non-salaried slabs, so it is written once rather
 * than four times. If one province breaks away, split it out here.
 */
const FARMER_SLABS: TaxBracket[] = [
  { min: 0, max: 600_000, rate: 0, fixed: 0 },
  { min: 600_001, max: 1_200_000, rate: 15, fixed: 0 },
  { min: 1_200_001, max: 1_600_000, rate: 20, fixed: 90_000 },
  { min: 1_600_001, max: 3_200_000, rate: 30, fixed: 170_000 },
  { min: 3_200_001, max: 5_600_000, rate: 40, fixed: 650_000 },
  { min: 5_600_001, max: null, rate: 45, fixed: 1_610_000 },
];

/** Income a farmer can earn before any tax is due. */
export const AGRICULTURAL_EXEMPT_THRESHOLD = 600_000;

/** Corporate farming, identical in all four provinces. */
const COMPANY_RATES = {
  'small-company': 20,
  company: 29,
} as const satisfies Omit<Record<AgriculturalTaxpayerType, number>, 'farmer'>;

/* ------------------------------------------------------------------ */
/* Super tax on high earning persons                                   */
/* ------------------------------------------------------------------ */

export const AGRICULTURAL_SUPER_TAX_FLOOR = 150 * MILLION;

/** Sindh, KP and Balochistan each print this same eight-row table. */
const PROVINCIAL_SUPER_TAX_BANDS: readonly AgriculturalSuperTaxBand[] = [
  { over: 0, upTo: 150 * MILLION, rate: 0 },
  { over: 150 * MILLION, upTo: 200 * MILLION, rate: 1 },
  { over: 200 * MILLION, upTo: 250 * MILLION, rate: 2 },
  { over: 250 * MILLION, upTo: 300 * MILLION, rate: 3 },
  { over: 300 * MILLION, upTo: 350 * MILLION, rate: 4 },
  { over: 350 * MILLION, upTo: 400 * MILLION, rate: 6 },
  { over: 400 * MILLION, upTo: 500 * MILLION, rate: 8 },
  { over: 500 * MILLION, upTo: null, rate: 10 },
];

/**
 * Punjab writes no table of its own. Section 3-AA charges super tax "at such
 * rate as may be specified in the Income Tax Ordinance, 2001 for high earning
 * persons", so Punjab follows federal Section 4C — which stopped matching the
 * provincial table when the Finance Act 2025 shaved the middle bands, and
 * differs again from tax year 2027.
 */
const PUNJAB_SUPER_TAX_BANDS_2025_2026: readonly AgriculturalSuperTaxBand[] = [
  { over: 0, upTo: 150 * MILLION, rate: 0 },
  { over: 150 * MILLION, upTo: 200 * MILLION, rate: 1 },
  { over: 200 * MILLION, upTo: 250 * MILLION, rate: 1.5 },
  { over: 250 * MILLION, upTo: 300 * MILLION, rate: 2.5 },
  { over: 300 * MILLION, upTo: 350 * MILLION, rate: 3.5 },
  { over: 350 * MILLION, upTo: 400 * MILLION, rate: 5.5 },
  { over: 400 * MILLION, upTo: 500 * MILLION, rate: 7.5 },
  { over: 500 * MILLION, upTo: null, rate: 10 },
];

const PUNJAB_SUPER_TAX_BANDS_2026_2027: readonly AgriculturalSuperTaxBand[] = [
  { over: 0, upTo: 500 * MILLION, rate: 0 },
  { over: 500 * MILLION, upTo: null, rate: 8 },
];

/* ------------------------------------------------------------------ */
/* Land tax (per acre)                                                 */
/* ------------------------------------------------------------------ */

/**
 * Ordinary cultivated land up to this size is never charged the per-acre tax.
 * A mature orchard is: its rows sit outside these bands and repeat no Nil row,
 * so the floor does not reach it.
 */
export const LAND_TAX_EXEMPT_ACRES = 12.5;

/** Punjab AIT Rules 1997, rule 3 — one figure per band, no zones. */
const PUNJAB_LAND_TAX_BANDS: readonly LandTaxBand[] = [
  { over: 0, upTo: LAND_TAX_EXEMPT_ACRES, perAcreLow: 0, perAcreHigh: 0 },
  { over: LAND_TAX_EXEMPT_ACRES, upTo: 25, perAcreLow: 300, perAcreHigh: 300 },
  { over: 25, upTo: 50, perAcreLow: 400, perAcreHigh: 400 },
  { over: 50, upTo: null, perAcreLow: 500, perAcreHigh: 500 },
];

/**
 * KP and Balochistan publish the same four-zone table. The Board of Revenue
 * groups districts into zones by a separate notification that is not gazetted
 * with the Act, so a district cannot be resolved to a zone here — the low
 * figure is Zone IV and the high is Zone I, and the UI shows the range.
 */
const ZONED_LAND_TAX_BANDS: readonly LandTaxBand[] = [
  { over: 0, upTo: LAND_TAX_EXEMPT_ACRES, perAcreLow: 0, perAcreHigh: 0 },
  { over: LAND_TAX_EXEMPT_ACRES, upTo: 25, perAcreLow: 300, perAcreHigh: 1200 },
  { over: 25, upTo: 50, perAcreLow: 600, perAcreHigh: 2500 },
  { over: 50, upTo: null, perAcreLow: 900, perAcreHigh: 3500 },
];

/** Punjab gazette 147-2025/233-RS(II), Schedule row (B). */
const PUNJAB_ORCHARD_RATE: OrchardRate = {
  irrigatedLow: 600,
  irrigatedHigh: 600,
  unirrigatedLow: 300,
  unirrigatedHigh: 300,
};

/**
 * KP Schedule Part-II row (2) and Balochistan First Schedule row (2), which are
 * word for word the same table. Irrigated repeats the "over 50 acres" figure of
 * its zone and unirrigated is half of it.
 */
const ZONED_ORCHARD_RATE: OrchardRate = {
  irrigatedLow: 900,
  irrigatedHigh: 3500,
  unirrigatedLow: 450,
  unirrigatedHigh: 1750,
};

const PUNJAB_LAND_TAX: AgriculturalLandTaxRule = {
  status: 'charged',
  bands: PUNJAB_LAND_TAX_BANDS,
  orchard: PUNJAB_ORCHARD_RATE,
  // Punjab's Act charges the per-acre tax under s.3(1) and the income tax under
  // s.3(3) without stating how the two are set off, so it is shown beside the
  // income tax rather than as a floor under it.
  isMinimumTax: false,
};

const ZONED_LAND_TAX: AgriculturalLandTaxRule = {
  status: 'charged',
  bands: ZONED_LAND_TAX_BANDS,
  orchard: ZONED_ORCHARD_RATE,
  // KP s.3 proviso and Balochistan s.6(2)-(3) both make it a minimum tax.
  isMinimumTax: true,
};

/* ------------------------------------------------------------------ */
/* Per-province, per-year assembly                                     */
/* ------------------------------------------------------------------ */

interface AgriculturalProvinceYear {
  slabs: TaxBracket[];
  companyRates: typeof COMPANY_RATES;
  superTaxBands: readonly AgriculturalSuperTaxBand[];
  landTax: AgriculturalLandTaxRule;
}

const SINDH_LAND_TAX: AgriculturalLandTaxRule = { status: 'none' };

/** The Punjab Finance Act 2026 per-acre table has not been located. */
const PUNJAB_LAND_TAX_2026_2027: AgriculturalLandTaxRule = { status: 'unconfirmed' };

function buildYear(
  superTaxBands: readonly AgriculturalSuperTaxBand[],
  landTax: AgriculturalLandTaxRule,
): AgriculturalProvinceYear {
  return { slabs: FARMER_SLABS, companyRates: COMPANY_RATES, superTaxBands, landTax };
}

export const AGRICULTURAL_RATES = {
  '2026-2027': {
    punjab: buildYear(PUNJAB_SUPER_TAX_BANDS_2026_2027, PUNJAB_LAND_TAX_2026_2027),
    sindh: buildYear(PROVINCIAL_SUPER_TAX_BANDS, SINDH_LAND_TAX),
    kp: buildYear(PROVINCIAL_SUPER_TAX_BANDS, ZONED_LAND_TAX),
    balochistan: buildYear(PROVINCIAL_SUPER_TAX_BANDS, ZONED_LAND_TAX),
  },
  '2025-2026': {
    punjab: buildYear(PUNJAB_SUPER_TAX_BANDS_2025_2026, PUNJAB_LAND_TAX),
    sindh: buildYear(PROVINCIAL_SUPER_TAX_BANDS, SINDH_LAND_TAX),
    kp: buildYear(PROVINCIAL_SUPER_TAX_BANDS, ZONED_LAND_TAX),
    balochistan: buildYear(PROVINCIAL_SUPER_TAX_BANDS, ZONED_LAND_TAX),
  },
} as const satisfies Record<
  AgriculturalFiscalYear,
  Record<AgriculturalProvince, AgriculturalProvinceYear>
>;

/* ------------------------------------------------------------------ */
/* Resolvers                                                           */
/* ------------------------------------------------------------------ */

function isAgriculturalFiscalYear(value: string): value is AgriculturalFiscalYear {
  return Object.hasOwn(AGRICULTURAL_RATES, value);
}

export function resolveAgriculturalFiscalYear(value: string): AgriculturalFiscalYear {
  return isAgriculturalFiscalYear(value) ? value : DEFAULT_AGRICULTURAL_FISCAL_YEAR;
}

function isAgriculturalProvince(value: string): value is AgriculturalProvince {
  return Object.hasOwn(AGRICULTURAL_RATES[DEFAULT_AGRICULTURAL_FISCAL_YEAR], value);
}

export function resolveAgriculturalProvince(value: string): AgriculturalProvince {
  return isAgriculturalProvince(value) ? value : DEFAULT_AGRICULTURAL_PROVINCE;
}

export function getAgriculturalSlabs(fiscalYear: string, province: string): TaxBracket[] {
  return AGRICULTURAL_RATES[resolveAgriculturalFiscalYear(fiscalYear)][
    resolveAgriculturalProvince(province)
  ].slabs;
}

export function getAgriculturalCompanyRate(
  fiscalYear: string,
  province: string,
  taxpayerType: Exclude<AgriculturalTaxpayerType, 'farmer'>,
): number {
  return AGRICULTURAL_RATES[resolveAgriculturalFiscalYear(fiscalYear)][
    resolveAgriculturalProvince(province)
  ].companyRates[taxpayerType];
}

export function getAgriculturalSuperTaxBands(
  fiscalYear: string,
  province: string,
): readonly AgriculturalSuperTaxBand[] {
  return AGRICULTURAL_RATES[resolveAgriculturalFiscalYear(fiscalYear)][
    resolveAgriculturalProvince(province)
  ].superTaxBands;
}

export function getAgriculturalLandTaxRule(
  fiscalYear: string,
  province: string,
): AgriculturalLandTaxRule {
  return AGRICULTURAL_RATES[resolveAgriculturalFiscalYear(fiscalYear)][
    resolveAgriculturalProvince(province)
  ].landTax;
}
