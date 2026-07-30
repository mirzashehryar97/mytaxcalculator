import { parseIsoDate } from '@/utils/calendarDates';

import {
  CGT_FLAT_RATE,
  CGT_FLAT_REGIME_START,
  CGT_HOLDING_BANDS,
  getPropertyTaxYearForDate,
  getPropertyTransferRates,
  resolvePropertyFiscalYear,
} from '@/features/property-tax/lib/rates';
import type {
  PropertyCapitalGainsInputs,
  PropertyCapitalGainsResult,
  PropertyFilerStatus,
  PropertyRate,
  PropertyTransferInputs,
  PropertyTransferRates,
  PropertyTransferResult,
} from '@/features/property-tax/types';

const PERCENT = 100;

function toNonNegative(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

/**
 * The rate a value attracts. A banded table is not progressive: whichever band
 * the value lands in sets one rate for the whole amount.
 */
export function resolvePropertyRate(rate: PropertyRate, value: number): number {
  if (rate.kind === 'flat') {
    return rate.rate;
  }

  const band = rate.bands.find((candidate) => candidate.upTo === null || value <= candidate.upTo);
  return band?.rate ?? rate.bands.at(-1)?.rate ?? 0;
}

/**
 * The rate table for one status, falling back to the filer table in the years
 * that have no late-filer tier so a stale selection can never read as zero.
 */
function selectStatusRate(rates: PropertyTransferRates, status: PropertyFilerStatus): PropertyRate {
  if (status === 'non-filer') {
    return rates.nonFiler;
  }
  if (status === 'late-filer') {
    return rates.lateFiler ?? rates.filer;
  }
  return rates.filer;
}

/**
 * Advance tax on a property transfer — section 236K when the buyer is paying and
 * section 236C when the seller is. Both work the same way: take the higher of the
 * declared price and the FBR/DC value, then apply one percentage to it.
 */
export function calcPropertyTransferTax(
  inputs: PropertyTransferInputs,
  mode: 'purchase' | 'sale',
  fiscalYear: string,
): PropertyTransferResult {
  const resolvedFiscalYear = resolvePropertyFiscalYear(fiscalYear);
  const rates = getPropertyTransferRates(mode, resolvedFiscalYear);

  const declaredValue = toNonNegative(inputs.declaredValue);
  const fbrValue = toNonNegative(inputs.fbrValue);
  const taxBase = Math.max(declaredValue, fbrValue);

  const rate = resolvePropertyRate(selectStatusRate(rates, inputs.status), taxBase);
  const filerRate = resolvePropertyRate(rates.filer, taxBase);
  const nonFilerRate = resolvePropertyRate(rates.nonFiler, taxBase);

  const tax = taxBase * (rate / PERCENT);
  const filerTax = taxBase * (filerRate / PERCENT);
  const nonFilerTax = taxBase * (nonFilerRate / PERCENT);

  return {
    mode,
    fiscalYear: resolvedFiscalYear,
    status: inputs.status,
    declaredValue,
    fbrValue,
    taxBase,
    rate,
    tax,
    filerRate,
    filerTax,
    nonFilerRate,
    nonFilerTax,
    filerSaving: Math.max(0, nonFilerTax - filerTax),
    isFlatRate: rates.filer.kind === 'flat' && rates.nonFiler.kind === 'flat',
    hasLateFilerTier: rates.lateFiler !== null,
  };
}

/**
 * Elapsed years between two dates, counting whole years by calendar anniversary
 * and adding the part-year on top. The statutory bands turn on whether a period
 * "exceeds" a given number of years, so an exact anniversary has to land on the
 * boundary rather than a day either side of it.
 */
export function diffInYears(startIso: string, endIso: string): number {
  const start = parseIsoDate(startIso);
  const end = parseIsoDate(endIso);
  if (start === null || end === null || end <= start) {
    return 0;
  }

  const startDate = new Date(start);
  let wholeYears = new Date(end).getUTCFullYear() - startDate.getUTCFullYear();

  const anniversaryAt = (yearsLater: number) =>
    Date.UTC(
      startDate.getUTCFullYear() + yearsLater,
      startDate.getUTCMonth(),
      startDate.getUTCDate(),
    );

  if (anniversaryAt(wholeYears) > end) {
    wholeYears -= 1;
  }

  const lastAnniversary = anniversaryAt(wholeYears);
  const nextAnniversary = anniversaryAt(wholeYears + 1);
  const fraction = (end - lastAnniversary) / (nextAnniversary - lastAnniversary);

  return wholeYears + fraction;
}

/** The grid band a holding period falls into, defaulting to the "over 6 years" row. */
function findHoldingBand(holdingYears: number) {
  return (
    CGT_HOLDING_BANDS.find((band) => band.upToYears === null || holdingYears <= band.upToYears) ??
    CGT_HOLDING_BANDS.at(-1) ??
    CGT_HOLDING_BANDS[0]
  );
}

/**
 * Capital gains tax on a property sale, plus the section 236C already collected
 * at transfer, which is set off against it.
 *
 * Both dates do a different job here, and neither is the taxpayer's to choose:
 *
 *   • The PURCHASE date picks the regime. Property bought on or after 1 July
 *     2024 is taxed at a flat 15% for sellers on the ATL, while anything bought
 *     earlier stays on the holding-period grid for good.
 *   • The SALE date picks the tax year, because a gain is taxed in the year the
 *     disposal falls in and the 236C credited against it was collected on that
 *     same day at that year's rate.
 */
export function calcPropertyCapitalGains(
  inputs: PropertyCapitalGainsInputs,
): PropertyCapitalGainsResult {
  const taxYear = getPropertyTaxYearForDate(inputs.saleDate);
  const resolvedFiscalYear = taxYear.fiscalYear;

  const purchasePrice = toNonNegative(inputs.purchasePrice);
  const salePrice = toNonNegative(inputs.salePrice);
  const gain = Math.max(0, salePrice - purchasePrice);
  const isLoss = salePrice > 0 && salePrice <= purchasePrice;

  const purchaseAt = parseIsoDate(inputs.purchaseDate);
  const saleAt = parseIsoDate(inputs.saleDate);
  const datesAreValid = purchaseAt !== null && saleAt !== null && saleAt > purchaseAt;

  const holdingYears = datesAreValid ? diffInYears(inputs.purchaseDate, inputs.saleDate) : 0;
  const regimeStart = parseIsoDate(CGT_FLAT_REGIME_START) ?? 0;
  const isFlatRegime = purchaseAt !== null && purchaseAt >= regimeStart;

  const holdingBand = findHoldingBand(holdingYears);
  const isNonFiler = inputs.status === 'non-filer';

  const rate = isFlatRegime ? CGT_FLAT_RATE : holdingBand.rates[inputs.propertyType];
  // A non-filer selling post-July-2024 property pays their normal slab rates
  // with 15% as the floor, so 15% is a minimum here rather than the answer.
  const rateIsMinimum = isFlatRegime && isNonFiler;
  const grossTax = gain * (rate / PERCENT);

  // The seller's own 236C at transfer is advance tax, so it comes off the gain
  // tax rather than being paid twice.
  const transferRates = getPropertyTransferRates('sale', resolvedFiscalYear);
  const transferTaxRate = resolvePropertyRate(
    selectStatusRate(transferRates, inputs.status),
    salePrice,
  );
  const transferTaxCredit = salePrice * (transferTaxRate / PERCENT);
  const netTax = Math.max(0, grossTax - transferTaxCredit);

  return {
    fiscalYear: resolvedFiscalYear,
    fiscalYearCoverage: taxYear.coverage,
    saleDate: inputs.saleDate,
    status: inputs.status,
    propertyType: inputs.propertyType,
    purchasePrice,
    salePrice,
    gain,
    isLoss,
    regime: isFlatRegime ? 'flat-15' : 'holding-grid',
    holdingYears,
    holdingBandLabel: isFlatRegime ? 'Any holding period' : holdingBand.label,
    rate,
    rateIsMinimum,
    grossTax,
    transferTaxCredit,
    transferTaxRate,
    netTax,
    // Only claim the credit covers the bill when the rate behind that bill is
    // final. Where 15% is merely a floor, the real gain tax can be higher.
    fullyCovered: gain > 0 && grossTax > 0 && transferTaxCredit >= grossTax && !rateIsMinimum,
    gainAfterTax: Math.max(0, gain - netTax),
    effectiveRate: gain > 0 ? (netTax / gain) * PERCENT : 0,
    datesAreValid,
  };
}
