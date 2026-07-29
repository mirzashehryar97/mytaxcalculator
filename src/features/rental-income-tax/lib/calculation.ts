import { calcSlabTax, findTaxBracket } from '@/utils/slabEngine';

import { getRentalRateYear, resolveRentalFiscalYear } from '@/features/rental-income-tax/lib/rates';
import type {
  RentalOwnerType,
  RentalRateYear,
  RentalTaxInputs,
  RentalTaxResult,
} from '@/features/rental-income-tax/types';

const PERCENT = 100;
const MONTHS_PER_YEAR = 12;

function toNonNegative(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

/** Yearly rent from a monthly figure. */
export function deriveAnnualRent(monthlyRent: number): number {
  return toNonNegative(monthlyRent) * MONTHS_PER_YEAR;
}

/** Monthly rent from a yearly figure. */
export function deriveMonthlyRent(annualRent: number): number {
  return toNonNegative(annualRent) / MONTHS_PER_YEAR;
}

/**
 * Tax deducted from a year's rent for one filer status. Companies pay a flat
 * percentage of the gross rent; everyone else runs through the slab.
 */
function calcRentTax(
  annualRent: number,
  ownerType: RentalOwnerType,
  filer: boolean,
  year: RentalRateYear,
): number {
  if (ownerType === 'company') {
    const rate = filer ? year.companyFilerRate : year.companyNonFilerRate;
    return annualRent * (rate / PERCENT);
  }

  return calcSlabTax(annualRent, filer ? year.filerSlabs : year.nonFilerSlabs);
}

/**
 * Estimates the section 155 tax a tenant deducts from a year's rent. Pure —
 * values stay at full precision so presentation code rounds only when
 * formatting.
 */
export function calcRentalTax(inputs: RentalTaxInputs, fiscalYear: string): RentalTaxResult {
  const resolvedFiscalYear = resolveRentalFiscalYear(fiscalYear);
  const year = getRentalRateYear(resolvedFiscalYear);

  const annualRent = toNonNegative(inputs.annualRent);
  const isCompany = inputs.ownerType === 'company';

  const filerTax = calcRentTax(annualRent, inputs.ownerType, true, year);
  const nonFilerTax = calcRentTax(annualRent, inputs.ownerType, false, year);
  const tax = inputs.filer ? filerTax : nonFilerTax;

  const marginalBracket = findTaxBracket(
    inputs.filer ? year.filerSlabs : year.nonFilerSlabs,
    annualRent,
  );

  return {
    fiscalYear: resolvedFiscalYear,
    ownerType: inputs.ownerType,
    filer: inputs.filer,
    annualRent,
    monthlyRent: deriveMonthlyRent(annualRent),
    tax,
    monthlyTax: tax / MONTHS_PER_YEAR,
    effectiveRate: annualRent > 0 ? (tax / annualRent) * PERCENT : 0,
    rentAfterTax: Math.max(0, annualRent - tax),
    monthlyRentAfterTax: Math.max(0, annualRent - tax) / MONTHS_PER_YEAR,
    filerTax,
    nonFilerTax,
    filerSaving: Math.max(0, nonFilerTax - filerTax),
    usesFlatRate: isCompany,
    flatRate: isCompany ? (inputs.filer ? year.companyFilerRate : year.companyNonFilerRate) : null,
    nonFilerUpliftApplies: year.nonFilerUpliftApplies,
    taxFree: !isCompany && marginalBracket.rate === 0,
    marginalRate: isCompany ? 0 : marginalBracket.rate,
    marginalFixed: isCompany ? 0 : marginalBracket.fixed,
    marginalBandStart: !isCompany && marginalBracket.min > 0 ? marginalBracket.min - 1 : 0,
  };
}
