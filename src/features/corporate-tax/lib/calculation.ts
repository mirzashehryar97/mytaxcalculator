import {
  getCompanyTaxRate,
  getMinimumTaxRate,
  getSuperTaxBands,
  hasSuperTaxExportExemption,
  MINIMUM_TAX_TURNOVER_FLOOR,
  resolveCorporateFiscalYear,
} from '@/features/corporate-tax/lib/rates';
import type {
  CompanyTaxInputs,
  CompanyTaxResult,
  MinimumTaxInputs,
  MinimumTaxResult,
  SuperTaxBand,
  SuperTaxInputs,
  SuperTaxResult,
} from '@/features/corporate-tax/types';

const PERCENT = 100;

function toNonNegative(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

/**
 * Company income tax is a flat multiply — Division II sets one rate per company
 * class, with no bands to step through. Pure: nothing is rounded here so the
 * presentation layer can round once, when it formats.
 */
export function calcCompanyTax(inputs: CompanyTaxInputs, fiscalYear: string): CompanyTaxResult {
  const resolvedFiscalYear = resolveCorporateFiscalYear(fiscalYear);
  const rate = getCompanyTaxRate(resolvedFiscalYear, inputs.companyType);

  const taxableProfit = toNonNegative(inputs.taxableProfit);
  const taxAlreadyPaid = toNonNegative(inputs.taxAlreadyPaid);
  const tax = (taxableProfit * rate) / PERCENT;

  return {
    fiscalYear: resolvedFiscalYear,
    companyType: inputs.companyType,
    taxableProfit,
    rate,
    tax,
    taxAlreadyPaid,
    remainingTax: Math.max(0, tax - taxAlreadyPaid),
    profitAfterTax: Math.max(0, taxableProfit - tax),
  };
}

/**
 * Section 113 compares the normal tax with a percentage of turnover and charges
 * whichever is higher — subsection (2)(b) substitutes the minimum tax for the
 * normal tax rather than adding to it. An individual or AOP only falls inside
 * the section once turnover reaches Rs 100 million.
 */
export function calcMinimumTurnoverTax(
  inputs: MinimumTaxInputs,
  fiscalYear: string,
): MinimumTaxResult {
  const resolvedFiscalYear = resolveCorporateFiscalYear(fiscalYear);
  const rate = getMinimumTaxRate(resolvedFiscalYear, inputs.sector);

  const turnover = toNonNegative(inputs.turnover);
  const normalTax = toNonNegative(inputs.normalTax);
  const minimumTax = (turnover * rate) / PERCENT;

  const isCovered = inputs.taxpayerType === 'company' || turnover >= MINIMUM_TAX_TURNOVER_FLOOR;
  const minimumTaxApplies = isCovered && minimumTax > normalTax;
  const taxPayable = minimumTaxApplies ? minimumTax : normalTax;

  return {
    fiscalYear: resolvedFiscalYear,
    taxpayerType: inputs.taxpayerType,
    sector: inputs.sector,
    turnover,
    rate,
    minimumTax,
    normalTax,
    isCovered,
    minimumTaxApplies,
    taxPayable,
    carryForward: minimumTaxApplies ? minimumTax - normalTax : 0,
  };
}

/** The band an income falls in. Bands run low to high and the last one is open-ended. */
function findSuperTaxBand(bands: readonly SuperTaxBand[], income: number): SuperTaxBand {
  // Every table ends in an open-ended row, so the fallback is defensive only.
  return bands.find((band) => band.upTo === null || income <= band.upTo) ?? bands[0];
}

/** Income above which the first paying band starts for this person and year. */
function findSuperTaxThreshold(bands: readonly SuperTaxBand[]): number {
  return bands.find((band) => band.rate > 0)?.over ?? 0;
}

/**
 * Super tax under Section 4C. Every row of Division IIB reads "N% of the
 * income", so the rate applies to the whole income rather than to the slice
 * above the threshold — one rupee more can step the whole bill up a band.
 */
export function calcSuperTax(inputs: SuperTaxInputs, fiscalYear: string): SuperTaxResult {
  const resolvedFiscalYear = resolveCorporateFiscalYear(fiscalYear);
  const bands = getSuperTaxBands(resolvedFiscalYear, inputs.taxpayerType);
  const hasExportExemption = hasSuperTaxExportExemption(resolvedFiscalYear);

  const income = toNonNegative(inputs.income);
  const isExportExempt = hasExportExemption && inputs.isExportExempt;

  const band = findSuperTaxBand(bands, income);
  const rate = isExportExempt ? 0 : band.rate;
  const superTax = (income * rate) / PERCENT;

  const bandIndex = bands.indexOf(band);
  const nextBand = bandIndex >= 0 ? bands[bandIndex + 1] : undefined;

  return {
    fiscalYear: resolvedFiscalYear,
    taxpayerType: inputs.taxpayerType,
    income,
    rate,
    superTax,
    threshold: findSuperTaxThreshold(bands),
    bandOver: band.over,
    applies: rate > 0,
    isExportExempt,
    hasExportExemption,
    incomeAfterSuperTax: Math.max(0, income - superTax),
    nextBandOver: nextBand ? nextBand.over : null,
    nextBandRate: nextBand ? nextBand.rate : null,
  };
}
