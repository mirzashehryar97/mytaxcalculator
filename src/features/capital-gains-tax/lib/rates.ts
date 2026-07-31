import { parseIsoDateParts } from '@/utils/calendarDates';

import type {
  CapitalGainsFiscalYear,
  CapitalGainsTaxYearResolution,
  CapitalGainsYear,
  ListedLadderBand,
  ListedRegime,
  MutualFundYear,
} from '@/features/capital-gains-tax/types';

/**
 * Every figure here is read off a primary FBR document:
 *
 * - **Ordinance 2026** — Income Tax Ordinance 2001 "amended upto 30th June,
 *   2026": First Schedule Part I **Division VII** (pp. 523-525), section **37A**
 *   (pp. 93-94), section **100B** (p. 175), the **Eighth Schedule** (pp. 769-770)
 *   and the **Tenth Schedule** (pp. 779-785).
 * - **Finance Act 2024** — substituted Division VII, adding the two
 *   acquisition-date columns and raising the fund rates to 15% / 25%.
 * - **Finance Act 2026** — left the Division VII rates alone but omitted Tenth
 *   Schedule **rule 10(y)**, the clause that had kept section 37A collections out
 *   of the non-filer uplift.
 *
 * Two rules do all the work here:
 *
 *  1. **Division VII charges by when the investment was bought**, not by the tax
 *     year — so the tables below are keyed on the buying date.
 *  2. **A non-filer pays double** (Tenth Schedule rule 1), and the only escape is
 *     rule 10(y), which covered buys made from 1 July 2025 until the Finance Act
 *     2026 removed it. So no non-filer rate is written out by hand; every one is
 *     the filer rate times two unless that rule reaches the purchase.
 */

/** Bought before this and the gain is never taxed — Division VII proviso (ii). */
export const LISTED_EXEMPT_BEFORE = '2013-07-01';

/** The window that carries one flat 12.5%, whatever the holding period. */
export const LISTED_LADDER_FROM = '2022-07-01';

/** Bought on or after this and a filer pays a flat 15%, whatever the holding period. */
export const LISTED_FLAT_15_FROM = '2024-07-01';

/**
 * Units bought on or before this date drop to 0% once held over six years. The
 * Finance Act 2025 closed that door for anything bought later.
 */
export const SIX_YEAR_EXEMPTION_ACQUIRED_BY = '2024-06-30';
const SIX_YEAR_EXEMPTION_YEARS = 6;

/** Tenth Schedule rule 1 — "increased by hundred percent" for anyone off the list. */
export const NON_FILER_MULTIPLIER = 2;

/** Filer rates for the listed regimes that do not use the ladder. */
const LISTED_FLAT_RATES = {
  'pre-2013': 0,
  'flat-12-5': 12.5,
  'flat-15': 15,
} as const satisfies Record<Exclude<ListedRegime, 'holding-ladder'>, number>;

/**
 * The 1 July 2022 - 30 June 2024 ladder — Division VII column (3). Nothing in
 * this window is ever reached by rule 10(y), which only covered purchases made
 * from 1 July 2025, so a non-filer always pays double here.
 */
const LISTED_LADDER_BANDS = [
  { id: 'up-to-1', label: 'Held up to 1 year', upToYears: 1, rate: 15 },
  { id: 'up-to-2', label: 'Held 1 to 2 years', upToYears: 2, rate: 12.5 },
  { id: 'up-to-3', label: 'Held 2 to 3 years', upToYears: 3, rate: 10 },
  { id: 'up-to-4', label: 'Held 3 to 4 years', upToYears: 4, rate: 7.5 },
  { id: 'up-to-5', label: 'Held 4 to 5 years', upToYears: 5, rate: 5 },
  { id: 'up-to-6', label: 'Held 5 to 6 years', upToYears: 6, rate: 2.5 },
  { id: 'over-6', label: 'Held over 6 years', upToYears: null, rate: 0 },
] as const satisfies readonly ListedLadderBand[];

/**
 * Division VII's fund table. A fund charges the same whatever the holding period;
 * the only relief left is the six-year rule on units bought on or before 30 June
 * 2024.
 */
const MUTUAL_FUND_RATES = {
  individual: { stock: 15, other: 15 },
  company: { stock: 15, other: 25 },
} as const satisfies MutualFundYear;

/**
 * Tax year 2026. Tenth Schedule rule 10(y) was still in force, so anything bought
 * on or after 1 July 2025 escaped the uplift — which is why NCCPL's published
 * table shows one rate for both statuses on recent buys, and double the rate on
 * everything older.
 */
const YEAR_2025_2026 = {
  nonFilerConfidence: 'confirmed',
  nonFilerUpliftExemptFrom: '2025-07-01',
  listed: LISTED_FLAT_RATES,
  listedLadder: LISTED_LADDER_BANDS,
  mutualFunds: MUTUAL_FUND_RATES,
} as const satisfies CapitalGainsYear;

/**
 * Tax year 2027. The Finance Act 2026 omitted rule 10(y), so nothing escapes the
 * uplift any more and every non-filer rate doubles. The Division VII rates
 * themselves did not move, so the filer side of this year is as certain as last
 * year's — only the non-filer side waits on NCCPL publishing its table, which is
 * why it carries a warning instead of a quiet number.
 */
const YEAR_2026_2027 = {
  nonFilerConfidence: 'pending-operator-table',
  nonFilerUpliftExemptFrom: null,
  listed: LISTED_FLAT_RATES,
  listedLadder: LISTED_LADDER_BANDS,
  mutualFunds: MUTUAL_FUND_RATES,
} as const satisfies CapitalGainsYear;

export const CAPITAL_GAINS_RATES = {
  '2026-2027': YEAR_2026_2027,
  '2025-2026': YEAR_2025_2026,
} as const satisfies Record<CapitalGainsFiscalYear, CapitalGainsYear>;

export const CAPITAL_GAINS_FISCAL_YEARS = Object.keys(
  CAPITAL_GAINS_RATES,
) as readonly CapitalGainsFiscalYear[];

export const DEFAULT_CAPITAL_GAINS_FISCAL_YEAR: CapitalGainsFiscalYear = '2026-2027';

export function isCapitalGainsFiscalYear(value: string): value is CapitalGainsFiscalYear {
  return Object.hasOwn(CAPITAL_GAINS_RATES, value);
}

export function resolveCapitalGainsFiscalYear(value: string): CapitalGainsFiscalYear {
  return isCapitalGainsFiscalYear(value) ? value : DEFAULT_CAPITAL_GAINS_FISCAL_YEAR;
}

export function getCapitalGainsYear(fiscalYear: string): CapitalGainsYear {
  return CAPITAL_GAINS_RATES[resolveCapitalGainsFiscalYear(fiscalYear)];
}

/** Pakistan's tax year opens on 1 July, so July onwards belongs to the later year. */
const TAX_YEAR_START_MONTH = 7;

const EARLIEST_FISCAL_YEAR = CAPITAL_GAINS_FISCAL_YEARS.at(-1) ?? DEFAULT_CAPITAL_GAINS_FISCAL_YEAR;
const LATEST_FISCAL_YEAR = CAPITAL_GAINS_FISCAL_YEARS[0];

/**
 * The tax year a sale falls in. A gain is taxed in the year it is realised, so
 * the sale date fixes the year and nobody picks it. Dates outside the years we
 * hold rates for fall back to the nearest one and say so, rather than quietly
 * pricing the wrong year.
 */
export function getCapitalGainsTaxYearForDate(isoDate: string): CapitalGainsTaxYearResolution {
  const parts = parseIsoDateParts(isoDate);
  if (parts === null) {
    return { fiscalYear: DEFAULT_CAPITAL_GAINS_FISCAL_YEAR, coverage: 'covered' };
  }

  const startYear = parts.month >= TAX_YEAR_START_MONTH ? parts.year : parts.year - 1;
  const candidate = `${startYear}-${startYear + 1}`;
  if (isCapitalGainsFiscalYear(candidate)) {
    return { fiscalYear: candidate, coverage: 'covered' };
  }

  const isAfterRange = startYear > Number(LATEST_FISCAL_YEAR.slice(0, 4));
  return isAfterRange
    ? { fiscalYear: LATEST_FISCAL_YEAR, coverage: 'after-range' }
    : { fiscalYear: EARLIEST_FISCAL_YEAR, coverage: 'before-range' };
}

/**
 * Which Division VII rule a security falls under, decided entirely by the day it
 * was bought. An empty field is treated as a recent buy, which is the regime
 * almost every visitor is in.
 */
export function getListedRegime(acquisitionDate: string): ListedRegime {
  if (acquisitionDate === '' || acquisitionDate >= LISTED_FLAT_15_FROM) {
    return 'flat-15';
  }
  if (acquisitionDate < LISTED_EXEMPT_BEFORE) {
    return 'pre-2013';
  }
  return acquisitionDate < LISTED_LADDER_FROM ? 'flat-12-5' : 'holding-ladder';
}

/** The flat filer rate for a regime, or null on the ladder, which has its own rows. */
export function getListedFlatRate(year: CapitalGainsYear, regime: ListedRegime): number | null {
  return regime === 'holding-ladder' ? null : year.listed[regime];
}

/** The rung of the ladder a holding period lands on. */
export function findListedLadderBand(
  bands: readonly ListedLadderBand[],
  holdingYears: number,
): ListedLadderBand {
  return (
    bands.find((band) => band.upToYears === null || holdingYears <= band.upToYears) ??
    bands.at(-1) ??
    bands[0]
  );
}

/**
 * Whether a non-filer escapes the Tenth Schedule uplift on this purchase. True
 * only while rule 10(y) was in force, and only for purchases it reached.
 */
export function isExemptFromNonFilerUplift(
  year: CapitalGainsYear,
  acquisitionDate: string,
): boolean {
  const { nonFilerUpliftExemptFrom } = year;
  return nonFilerUpliftExemptFrom !== null && acquisitionDate >= nonFilerUpliftExemptFrom;
}

/** The rate someone off the Active Taxpayer List actually pays on that purchase. */
export function applyNonFilerUplift(
  year: CapitalGainsYear,
  acquisitionDate: string,
  filerRate: number,
): number {
  return isExemptFromNonFilerUplift(year, acquisitionDate)
    ? filerRate
    : filerRate * NON_FILER_MULTIPLIER;
}

/**
 * Units bought on or before 30 June 2024 and held longer than six years are not
 * charged at all — the last surviving long-hold relief in the fund table.
 */
export function qualifiesForSixYearExemption(
  acquisitionDate: string,
  holdingYears: number,
): boolean {
  return (
    acquisitionDate !== '' &&
    acquisitionDate <= SIX_YEAR_EXEMPTION_ACQUIRED_BY &&
    holdingYears > SIX_YEAR_EXEMPTION_YEARS
  );
}
