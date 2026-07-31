import { diffInYears, parseIsoDate } from '@/utils/calendarDates';

import {
  applyNonFilerUplift,
  findListedLadderBand,
  getCapitalGainsTaxYearForDate,
  getCapitalGainsYear,
  getListedFlatRate,
  getListedRegime,
  isExemptFromNonFilerUplift,
  qualifiesForSixYearExemption,
} from '@/features/capital-gains-tax/lib/rates';
import type {
  CapitalGainsYear,
  ListedSecuritiesInputs,
  ListedSecuritiesResult,
  MutualFundInputs,
  MutualFundResult,
  RateConfidence,
} from '@/features/capital-gains-tax/types';

const PERCENT = 100;

function toNonNegative(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function percentOf(amount: number, rate: number): number {
  return (amount * rate) / PERCENT;
}

/** Both dates have to be real, and nothing can be sold before it was bought. */
function readDates(startIso: string, endIso: string) {
  const startAt = parseIsoDate(startIso);
  const endAt = parseIsoDate(endIso);
  const datesAreValid = startAt !== null && endAt !== null && endAt >= startAt;

  return {
    datesAreValid,
    holdingYears: datesAreValid ? diffInYears(startIso, endIso) : 0,
  };
}

/**
 * A filer's figure is only ever the enacted Division VII rate, so it is always
 * confirmed. A non-filer's rests on the Tenth Schedule, which is the part waiting
 * on NCCPL for the current year — and a nil rate is certain either way.
 */
function getConfidence(year: CapitalGainsYear, filer: boolean, rate: number): RateConfidence {
  return filer || rate === 0 ? 'confirmed' : year.nonFilerConfidence;
}

/** The shared money and status half of a result, once the rates are known. */
function buildOutcome(gain: number, filer: boolean, filerRate: number, nonFilerRate: number) {
  const filerTax = percentOf(gain, filerRate);
  const nonFilerTax = percentOf(gain, nonFilerRate);
  const tax = filer ? filerTax : nonFilerTax;

  return {
    rate: filer ? filerRate : nonFilerRate,
    tax,
    netGain: Math.max(0, gain - tax),
    filerTax,
    nonFilerTax,
    saving: Math.max(0, nonFilerTax - filerTax),
  };
}

/**
 * Capital gains tax on listed securities — section 37A, Division VII.
 *
 * The two dates do different jobs, and neither is the taxpayer's to choose:
 *
 *   • The BUYING date picks the regime, and it sticks for the life of the
 *     holding. Bought before 1 July 2013 nothing is charged; up to 30 June 2022
 *     a flat 12.5%; up to 30 June 2024 the rate falls the longer it is held; from
 *     1 July 2024 a flat 15%.
 *   • The SELLING date picks the tax year, because a gain is taxed in the year it
 *     is realised.
 *
 * The buying date decides the non-filer question too, since rule 10(y) turned on
 * when the security was acquired rather than when it was sold.
 */
export function calcListedSecuritiesTax(inputs: ListedSecuritiesInputs): ListedSecuritiesResult {
  const taxYear = getCapitalGainsTaxYearForDate(inputs.disposalDate);
  const year = getCapitalGainsYear(taxYear.fiscalYear);

  const purchaseCost = toNonNegative(inputs.purchaseCost);
  const saleProceeds = toNonNegative(inputs.saleProceeds);
  const capitalGain = Math.max(0, saleProceeds - purchaseCost);
  const isLoss = saleProceeds > 0 && saleProceeds < purchaseCost;

  const { datesAreValid, holdingYears } = readDates(inputs.acquisitionDate, inputs.disposalDate);

  const regime = getListedRegime(inputs.acquisitionDate);
  const flatRate = getListedFlatRate(year, regime);
  const ladderBand = findListedLadderBand(year.listedLadder, holdingYears);

  const filerRate = flatRate ?? ladderBand.rate;
  const nonFilerRate = applyNonFilerUplift(year, inputs.acquisitionDate, filerRate);
  const outcome = buildOutcome(capitalGain, inputs.filer, filerRate, nonFilerRate);

  return {
    fiscalYear: taxYear.fiscalYear,
    coverage: taxYear.coverage,
    filer: inputs.filer,
    purchaseCost,
    saleProceeds,
    capitalGain,
    isLoss,
    lossAmount: isLoss ? purchaseCost - saleProceeds : 0,
    datesAreValid,
    confidence: getConfidence(year, inputs.filer, outcome.rate),
    acquisitionDate: inputs.acquisitionDate,
    upliftExempt: isExemptFromNonFilerUplift(year, inputs.acquisitionDate),
    regime,
    holdingYears,
    ladderBandLabel: flatRate === null ? ladderBand.label : null,
    ...outcome,
  };
}

/**
 * Capital gains tax on cashing in units of an open-ended mutual fund — the fund
 * table in Division VII, worked out and deducted by the fund company and handed
 * to NCCPL.
 *
 * Holding period does not move the rate here. The one relief left is the
 * six-year rule, and the Finance Act 2025 limited it to units bought on or before
 * 30 June 2024.
 */
export function calcMutualFundTax(inputs: MutualFundInputs): MutualFundResult {
  const taxYear = getCapitalGainsTaxYearForDate(inputs.redemptionDate);
  const year = getCapitalGainsYear(taxYear.fiscalYear);

  const purchaseCost = toNonNegative(inputs.purchaseCost);
  const redemptionProceeds = toNonNegative(inputs.redemptionProceeds);
  const capitalGain = Math.max(0, redemptionProceeds - purchaseCost);
  const isLoss = redemptionProceeds > 0 && redemptionProceeds < purchaseCost;

  const { datesAreValid, holdingYears } = readDates(inputs.acquisitionDate, inputs.redemptionDate);

  const isSixYearExempt = qualifiesForSixYearExemption(inputs.acquisitionDate, holdingYears);
  const tableRate = year.mutualFunds[inputs.investorType][inputs.fundClass];

  const filerRate = isSixYearExempt ? 0 : tableRate;
  const nonFilerRate = applyNonFilerUplift(year, inputs.acquisitionDate, filerRate);
  const outcome = buildOutcome(capitalGain, inputs.filer, filerRate, nonFilerRate);

  return {
    fiscalYear: taxYear.fiscalYear,
    coverage: taxYear.coverage,
    filer: inputs.filer,
    purchaseCost,
    redemptionProceeds,
    capitalGain,
    isLoss,
    lossAmount: isLoss ? purchaseCost - redemptionProceeds : 0,
    datesAreValid,
    confidence: getConfidence(year, inputs.filer, outcome.rate),
    acquisitionDate: inputs.acquisitionDate,
    upliftExempt: isExemptFromNonFilerUplift(year, inputs.acquisitionDate),
    investorType: inputs.investorType,
    fundClass: inputs.fundClass,
    holdingYears,
    isSixYearExempt,
    ...outcome,
  };
}
