import { parseIsoDateParts } from '@/utils/calendarDates';

import type {
  PropertyCgtGuideRow,
  PropertyFiscalYear,
  PropertyOption,
  PropertyRate,
  PropertyTaxYearResolution,
  PropertyTransferRates,
  PropertyType,
} from '@/features/property-tax/types';

/**
 * WHERE THESE NUMBERS COME FROM — read this before changing any of them.
 *
 * A property withholding rate is assembled from two different places in the law,
 * and mixing them up is the single easiest way to publish a wrong figure:
 *
 *   • The FILER (ATL) rate lives in the First Schedule, Part IV — Division X for
 *     section 236C (sale) and Division XVIII for section 236K (purchase).
 *   • The NON-FILER (non-ATL) rate lives in the TENTH SCHEDULE, rule 1. Rule 1
 *     sets a general "+100% of the specified rate" uplift, but since the Finance
 *     Act 2024 it also carries section-specific provisos that print explicit
 *     rates for 236C and 236K. Where a proviso exists it displaces the general
 *     uplift, so the non-filer rate is NOT a multiple of the filer rate.
 *   • The LATE-FILER rate lives in Tenth Schedule rule 1A, which the Finance Act
 *     2024 inserted and the Finance Act 2026 omitted. It therefore exists only
 *     for 2024-25 and 2025-26.
 *
 * The Finance Act 2026 substituted both Divisions (making the filer rate flat)
 * but left rule 1 untouched, so the banded non-filer tables carry into 2026-27
 * unchanged. That is why 2026-27 is flat for filers and still banded for
 * non-filers — it is not a mistake.
 *
 * Verified against:
 *   • Finance Act 2026 (Act XLIII of 2026, Gazette 26 Jun 2026), First Schedule
 *     Part IV amendments and item (47) amending the Tenth Schedule.
 *   • Income Tax Ordinance 2001 as amended to 30 Jun 2024 — Division X,
 *     Division XVIII, Division VIII (Part I) and the Tenth Schedule.
 *   • FBR Withholding Income Tax Rate Card updated to 30 Jun 2025, which cites
 *     "Division-X … read with R.1 and R.1A of Tenth Schedule" on every row.
 *   • docs/tax-sectors/property.md, which records the same sourcing.
 */

/** The two value thresholds every banded property table uses. */
const BAND_50M = 50_000_000;
const BAND_100M = 100_000_000;

function flat(rate: number): PropertyRate {
  return { kind: 'flat', rate };
}

/** Builds the standard three-step table: up to 50m, 50m-100m, then above 100m. */
function banded(upTo50m: number, upTo100m: number, above100m: number): PropertyRate {
  return {
    kind: 'banded',
    bands: [
      { upTo: BAND_50M, rate: upTo50m },
      { upTo: BAND_100M, rate: upTo100m },
      { upTo: null, rate: above100m },
    ],
  };
}

/** Section 236C — advance tax collected from the SELLER at transfer. */
export const TAX_236C_RATES = {
  // FA2026 substituted Division X with a single flat 2.75%. Rule 1's 236C entry
  // (11.5%) was not amended, so it stands. Rule 1A was omitted: no late filers.
  '2026-2027': { filer: flat(2.75), lateFiler: null, nonFiler: flat(11.5) },
  // FA2025: Division X banded 4.5/5/5.5; rule 1 raised 236C non-ATL 10% -> 11.5%;
  // rule 1A late-filer 7.5/8.5/9.5.
  '2025-2026': {
    filer: banded(4.5, 5, 5.5),
    lateFiler: banded(7.5, 8.5, 9.5),
    nonFiler: flat(11.5),
  },
  // FA2024 introduced value bands, the rule 1 table entry (10%) and rule 1A.
  '2024-2025': { filer: banded(3, 3.5, 4), lateFiler: banded(6, 7, 8), nonFiler: flat(10) },
  // Before FA2024 the Division was a single rate and the general rule 1
  // "+100%" uplift gave the non-filer figure. No late-filer tier existed.
  '2023-2024': { filer: flat(3), lateFiler: null, nonFiler: flat(6) },
  '2022-2023': { filer: flat(2), lateFiler: null, nonFiler: flat(4) },
} as const satisfies Record<PropertyFiscalYear, PropertyTransferRates>;

/** Section 236K — advance tax collected from the BUYER on purchase. */
export const TAX_236K_RATES = {
  // FA2026 substituted Division XVIII with a flat 1.25% for filers. Rule 1's
  // second proviso keeps its own FMV-banded non-filer table, so the non-filer
  // side stays 10.5/14.5/18.5 even though the filer side is now flat.
  '2026-2027': { filer: flat(1.25), lateFiler: null, nonFiler: banded(10.5, 14.5, 18.5) },
  '2025-2026': {
    filer: banded(1.5, 2, 2.5),
    lateFiler: banded(4.5, 5.5, 6.5),
    nonFiler: banded(10.5, 14.5, 18.5),
  },
  '2024-2025': {
    filer: banded(3, 3.5, 4),
    lateFiler: banded(6, 7, 8),
    nonFiler: banded(12, 16, 20),
  },
  // 2022-23 and 2023-24 ran under the FA2022 proviso, which increased 236K by
  // 250% for non-filers rather than the usual 100% — hence 2% -> 7% and
  // 3% -> 10.5%, a much steeper penalty than the seller ever faced.
  '2023-2024': { filer: flat(3), lateFiler: null, nonFiler: flat(10.5) },
  '2022-2023': { filer: flat(2), lateFiler: null, nonFiler: flat(7) },
} as const satisfies Record<PropertyFiscalYear, PropertyTransferRates>;

/**
 * Capital gains on property acquired on or after 1 July 2024 — Division VIII of
 * Part I, as substituted by the Finance Act 2024 and unchanged since. Sellers on
 * the ATL pay a flat 15% whatever the holding period; sellers who are not pay
 * their normal slab rates with 15% as a floor, which is why the calculator
 * presents 15% as a minimum rather than a final figure for them.
 */
export const CGT_FLAT_RATE = 15;

/** Acquisitions on or after this date leave the holding-period grid behind. */
export const CGT_FLAT_REGIME_START = '2024-07-01';

interface CgtHoldingBand {
  /** Upper edge of the holding period in whole years; null for "and over". */
  upToYears: number | null;
  label: string;
  rates: Record<PropertyType, number>;
}

/**
 * Capital gains on property acquired on or before 30 June 2024 — the
 * holding-period grid in Division VIII, which still governs those older
 * acquisitions in every later tax year. A dash in the statutory table means the
 * charge has already fallen to zero for that property type, so it is 0 here.
 */
export const CGT_HOLDING_BANDS: readonly CgtHoldingBand[] = [
  {
    upToYears: 1,
    label: 'Up to 1 year',
    rates: { 'open-plot': 15, constructed: 15, flat: 15 },
  },
  {
    upToYears: 2,
    label: 'Over 1 up to 2 years',
    rates: { 'open-plot': 12.5, constructed: 10, flat: 7.5 },
  },
  {
    upToYears: 3,
    label: 'Over 2 up to 3 years',
    rates: { 'open-plot': 10, constructed: 7.5, flat: 0 },
  },
  {
    upToYears: 4,
    label: 'Over 3 up to 4 years',
    rates: { 'open-plot': 7.5, constructed: 5, flat: 0 },
  },
  {
    upToYears: 5,
    label: 'Over 4 up to 5 years',
    rates: { 'open-plot': 5, constructed: 0, flat: 0 },
  },
  {
    upToYears: 6,
    label: 'Over 5 up to 6 years',
    rates: { 'open-plot': 2.5, constructed: 0, flat: 0 },
  },
  {
    upToYears: null,
    label: 'Over 6 years',
    rates: { 'open-plot': 0, constructed: 0, flat: 0 },
  },
];

/** The same grid as display rows, so the on-page table cannot drift from the maths. */
export const CGT_GUIDE_ROWS: readonly PropertyCgtGuideRow[] = CGT_HOLDING_BANDS.map((band) => ({
  id: band.label,
  holdingPeriod: band.label,
  openPlot: `${band.rates['open-plot']}%`,
  constructed: `${band.rates.constructed}%`,
  flat: `${band.rates.flat}%`,
}));

export const PROPERTY_FISCAL_YEARS = [
  '2026-2027',
  '2025-2026',
  '2024-2025',
  '2023-2024',
  '2022-2023',
] as const satisfies readonly PropertyFiscalYear[];

export const DEFAULT_PROPERTY_FISCAL_YEAR: PropertyFiscalYear = '2026-2027';

export const PROPERTY_FISCAL_YEAR_OPTIONS = [
  { value: '2026-2027', label: '2026-27' },
  { value: '2025-2026', label: '2025-26' },
  { value: '2024-2025', label: '2024-25' },
  { value: '2023-2024', label: '2023-24' },
  { value: '2022-2023', label: '2022-23' },
] as const satisfies readonly PropertyOption<PropertyFiscalYear>[];

export function isPropertyFiscalYear(value: string): value is PropertyFiscalYear {
  return Object.hasOwn(TAX_236C_RATES, value);
}

export function resolvePropertyFiscalYear(value: string): PropertyFiscalYear {
  return isPropertyFiscalYear(value) ? value : DEFAULT_PROPERTY_FISCAL_YEAR;
}

/** Pakistan's tax year opens on 1 July, so July onwards belongs to the later year. */
const TAX_YEAR_START_MONTH = 7;

const EARLIEST_PROPERTY_FISCAL_YEAR = PROPERTY_FISCAL_YEARS.at(-1) ?? DEFAULT_PROPERTY_FISCAL_YEAR;
const LATEST_PROPERTY_FISCAL_YEAR = PROPERTY_FISCAL_YEARS[0];

/**
 * The tax year a transaction falls in. Pakistan's tax year runs 1 July to
 * 30 June, so a sale on 21 July 2026 is taxed in 2026-27 — the date fixes the
 * year, nobody picks it. Dates outside the years we hold rates for clamp to the
 * nearest one and report that, so the caller can say which table it fell back to
 * rather than quietly pricing the wrong year.
 */
export function getPropertyTaxYearForDate(isoDate: string): PropertyTaxYearResolution {
  const parts = parseIsoDateParts(isoDate);
  if (parts === null) {
    return { fiscalYear: DEFAULT_PROPERTY_FISCAL_YEAR, coverage: 'covered' };
  }

  const startYear = parts.month >= TAX_YEAR_START_MONTH ? parts.year : parts.year - 1;
  const candidate = `${startYear}-${startYear + 1}`;
  if (isPropertyFiscalYear(candidate)) {
    return { fiscalYear: candidate, coverage: 'covered' };
  }

  const isAfterRange = startYear > Number(LATEST_PROPERTY_FISCAL_YEAR.slice(0, 4));
  return isAfterRange
    ? { fiscalYear: LATEST_PROPERTY_FISCAL_YEAR, coverage: 'after-range' }
    : { fiscalYear: EARLIEST_PROPERTY_FISCAL_YEAR, coverage: 'before-range' };
}

/** The rate table for one section in one year. */
export function getPropertyTransferRates(
  mode: 'purchase' | 'sale',
  fiscalYear: string,
): PropertyTransferRates {
  const year = resolvePropertyFiscalYear(fiscalYear);
  return mode === 'purchase' ? TAX_236K_RATES[year] : TAX_236C_RATES[year];
}

/** Whether the selected year still offers the late-filer tier. */
export function hasLateFilerTier(mode: 'purchase' | 'sale', fiscalYear: string): boolean {
  return getPropertyTransferRates(mode, fiscalYear).lateFiler !== null;
}
