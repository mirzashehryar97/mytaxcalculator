import { calcSlabTax, findTaxBracket } from '@/utils/slabEngine';

import {
  AGRICULTURAL_EXEMPT_THRESHOLD,
  AGRICULTURAL_SUPER_TAX_FLOOR,
  getAgriculturalCompanyRate,
  getAgriculturalLandTaxRule,
  getAgriculturalSlabs,
  getAgriculturalSuperTaxBands,
  LAND_TAX_EXEMPT_ACRES,
  resolveAgriculturalFiscalYear,
  resolveAgriculturalProvince,
} from '@/features/agricultural-tax/lib/rates';
import type {
  AgriculturalLandTaxResult,
  AgriculturalLandTaxRule,
  AgriculturalLandTaxStatus,
  AgriculturalSuperTaxBand,
  AgriculturalTaxInputs,
  AgriculturalTaxResult,
  LandTaxBand,
  LandTaxCharge,
  OrchardIrrigation,
  OrchardRate,
} from '@/features/agricultural-tax/types';

const PERCENT = 100;

function toNonNegative(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

/** The band an income falls in. Bands run low to high and the last one is open-ended. */
function findSuperTaxBand(
  bands: readonly AgriculturalSuperTaxBand[],
  income: number,
): AgriculturalSuperTaxBand {
  return bands.find((band) => band.upTo === null || income <= band.upTo) ?? bands[0];
}

/** Income at which the first paying super-tax band starts. */
function findSuperTaxThreshold(bands: readonly AgriculturalSuperTaxBand[]): number {
  return bands.find((band) => band.rate > 0)?.over ?? AGRICULTURAL_SUPER_TAX_FLOOR;
}

function findLandTaxBand(bands: readonly LandTaxBand[], acres: number): LandTaxBand {
  return bands.find((band) => band.upTo === null || acres <= band.upTo) ?? bands[0];
}

const NO_CHARGE: LandTaxCharge = {
  acres: 0,
  perAcreLow: 0,
  perAcreHigh: 0,
  amountLow: 0,
  amountHigh: 0,
};

/** Ordinary cultivated land: banded, and free up to the 12½-acre floor. */
function calcCultivatedCharge(bands: readonly LandTaxBand[], acres: number): LandTaxCharge {
  if (acres <= LAND_TAX_EXEMPT_ACRES) {
    return { ...NO_CHARGE, acres };
  }

  const band = findLandTaxBand(bands, acres);
  return {
    acres,
    perAcreLow: band.perAcreLow,
    perAcreHigh: band.perAcreHigh,
    amountLow: band.perAcreLow * acres,
    amountHigh: band.perAcreHigh * acres,
  };
}

/**
 * Mature orchards: one flat rate for the whole holding, picked by irrigation
 * rather than converted for it, and charged from the very first acre. The
 * acreage bands and their Nil row are expressly written to exclude orchards,
 * so nothing here consults them.
 */
function calcOrchardCharge(
  rate: OrchardRate,
  acres: number,
  irrigation: OrchardIrrigation,
): LandTaxCharge {
  if (acres <= 0) {
    return NO_CHARGE;
  }

  const perAcreLow = irrigation === 'irrigated' ? rate.irrigatedLow : rate.unirrigatedLow;
  const perAcreHigh = irrigation === 'irrigated' ? rate.irrigatedHigh : rate.unirrigatedHigh;

  return {
    acres,
    perAcreLow,
    perAcreHigh,
    amountLow: perAcreLow * acres,
    amountHigh: perAcreHigh * acres,
  };
}

/**
 * Entering nothing earns a different message from entering land that falls under
 * the floor, so the two are told apart before any figure is shown.
 */
function resolveChargedStatus(
  acres: number,
  orchardAcres: number,
  amountHigh: number,
): AgriculturalLandTaxStatus {
  if (acres <= 0 && orchardAcres <= 0) {
    return 'not-entered';
  }
  return amountHigh > 0 ? 'charged' : 'exempt';
}

/**
 * The per-acre tax, which every schedule levies as two separate charges: a band
 * on ordinary cultivated land, and a flat rate on mature orchards standing
 * outside those bands. Punjab publishes one figure per row; KP and Balochistan
 * publish four (one per zone) and never gazette the district to zone map with
 * the Act, so those come back as a low-to-high range rather than a single
 * answer we cannot honestly produce.
 *
 * Where the province's Act makes the per-acre figure a minimum tax (KP,
 * Balochistan) the payable figures are the higher of it and the income-side
 * tax; elsewhere they simply mirror the income-side tax.
 */
function calcLandTax(
  rule: AgriculturalLandTaxRule,
  acres: number,
  orchardAcres: number,
  orchardIrrigation: OrchardIrrigation,
  incomeSideTax: number,
): AgriculturalLandTaxResult {
  const mirrorsIncomeTax = { payableLow: incomeSideTax, payableHigh: incomeSideTax };

  if (rule.status !== 'charged') {
    return {
      status: rule.status,
      cultivated: { ...NO_CHARGE, acres },
      orchard: { ...NO_CHARGE, acres: orchardAcres },
      amountLow: 0,
      amountHigh: 0,
      isRange: false,
      isMinimumTax: false,
      ...mirrorsIncomeTax,
    };
  }

  const cultivated = calcCultivatedCharge(rule.bands, acres);
  const orchard = calcOrchardCharge(rule.orchard, orchardAcres, orchardIrrigation);
  const amountLow = cultivated.amountLow + orchard.amountLow;
  const amountHigh = cultivated.amountHigh + orchard.amountHigh;

  return {
    status: resolveChargedStatus(acres, orchardAcres, amountHigh),
    cultivated,
    orchard,
    amountLow,
    amountHigh,
    isRange: amountLow !== amountHigh,
    isMinimumTax: rule.isMinimumTax,
    payableLow: rule.isMinimumTax ? Math.max(incomeSideTax, amountLow) : incomeSideTax,
    payableHigh: rule.isMinimumTax ? Math.max(incomeSideTax, amountHigh) : incomeSideTax,
  };
}

/**
 * Provincial agricultural income tax. A farmer runs through the slab table with
 * the first Rs 600,000 free; a company pays one flat rate on the whole income.
 * Super tax is charged on top once agricultural income passes the province's
 * floor, and — because every row reads "N% of the income" — it applies to the
 * whole income rather than to the slice above the floor, so one rupee more can
 * step the entire bill up a band.
 *
 * Pure: nothing is rounded here so the presentation layer rounds once, when it
 * formats.
 */
export function calcAgriculturalTax(
  inputs: AgriculturalTaxInputs,
  fiscalYear: string,
  province: string,
): AgriculturalTaxResult {
  const resolvedFiscalYear = resolveAgriculturalFiscalYear(fiscalYear);
  const resolvedProvince = resolveAgriculturalProvince(province);

  const income = toNonNegative(inputs.income);
  const taxAlreadyPaid = toNonNegative(inputs.taxAlreadyPaid);
  const acres = toNonNegative(inputs.acres);
  const orchardAcres = toNonNegative(inputs.orchardAcres);
  const { taxpayerType } = inputs;

  const slabs = getAgriculturalSlabs(resolvedFiscalYear, resolvedProvince);
  const isFarmer = taxpayerType === 'farmer';
  const companyRate = isFarmer
    ? 0
    : getAgriculturalCompanyRate(resolvedFiscalYear, resolvedProvince, taxpayerType);

  const exemptThreshold = isFarmer ? AGRICULTURAL_EXEMPT_THRESHOLD : 0;
  const incomeTax = isFarmer ? calcSlabTax(income, slabs) : (income * companyRate) / PERCENT;
  const rate = isFarmer ? findTaxBracket(slabs, income).rate : companyRate;

  const superTaxBands = getAgriculturalSuperTaxBands(resolvedFiscalYear, resolvedProvince);
  const superTaxRate = findSuperTaxBand(superTaxBands, income).rate;
  const superTax = (income * superTaxRate) / PERCENT;

  const totalTax = incomeTax + superTax;
  const landRule = getAgriculturalLandTaxRule(resolvedFiscalYear, resolvedProvince);

  return {
    fiscalYear: resolvedFiscalYear,
    province: resolvedProvince,
    taxpayerType: inputs.taxpayerType,
    income,
    exemptThreshold,
    taxableIncome: Math.max(0, income - exemptThreshold),
    rate,
    incomeTax,
    superTax,
    superTaxRate,
    superTaxApplies: superTaxRate > 0,
    superTaxThreshold: findSuperTaxThreshold(superTaxBands),
    totalTax,
    taxAlreadyPaid,
    remainingTax: Math.max(0, totalTax - taxAlreadyPaid),
    incomeAfterTax: Math.max(0, income - totalTax),
    effectiveRate: income > 0 ? (totalTax / income) * PERCENT : 0,
    land: calcLandTax(landRule, acres, orchardAcres, inputs.orchardIrrigation, totalTax),
  };
}
