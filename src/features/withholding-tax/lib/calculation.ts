import {
  getCashWithdrawalYear,
  getElectricityYear,
  getTelecomYear,
  resolveWithholdingFiscalYear,
} from '@/features/withholding-tax/lib/rates';
import type {
  CashWithdrawalInputs,
  CashWithdrawalResult,
  ElectricityBand,
  ElectricityInputs,
  ElectricityResult,
  TelecomInputs,
  TelecomResult,
} from '@/features/withholding-tax/types';

const PERCENT = 100;

function toNonNegative(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function percentOf(amount: number, rate: number): number {
  return (amount * rate) / PERCENT;
}

/** The row of the shop/office/factory table a bill falls into. */
export function findElectricityBand(
  bands: readonly ElectricityBand[],
  billAmount: number,
): ElectricityBand | null {
  return bands.find((band) => band.upTo === null || billAmount <= band.upTo) ?? null;
}

function applyElectricityBand(band: ElectricityBand, billAmount: number): number {
  return band.fixed + percentOf(Math.max(0, billAmount - band.rateAppliesAbove), band.rate);
}

/**
 * Advance tax a bank deducts when someone takes cash out — section 231AB.
 *
 * It only touches non-filers, and only once
 * the day's withdrawals added together pass the threshold. Once they do, the
 * rate applies to the whole day's cash rather than the part above the threshold:
 * FBR Circular No. 01 of 2025-26 puts the rate on "the amount of cash withdrawn".
 */
export function calcCashWithdrawalTax(
  inputs: CashWithdrawalInputs,
  fiscalYear: string,
): CashWithdrawalResult {
  const resolvedFiscalYear = resolveWithholdingFiscalYear(fiscalYear);
  const year = getCashWithdrawalYear(resolvedFiscalYear);

  const dailyWithdrawal = toNonNegative(inputs.dailyWithdrawal);
  const aboveThreshold = dailyWithdrawal > year.dailyThreshold;

  const nonFilerTax = aboveThreshold ? percentOf(dailyWithdrawal, year.nonFilerRate) : 0;
  const tax = inputs.filer ? 0 : nonFilerTax;

  return {
    fiscalYear: resolvedFiscalYear,
    filer: inputs.filer,
    dailyWithdrawal,
    dailyThreshold: year.dailyThreshold,
    aboveThreshold,
    rate: inputs.filer ? 0 : year.nonFilerRate,
    nonFilerRate: year.nonFilerRate,
    tax,
    filerTax: 0,
    nonFilerTax,
    saving: nonFilerTax,
    cashInHand: Math.max(0, dailyWithdrawal - tax),
  };
}

/**
 * Advance tax collected with an electricity bill — section 235.
 *
 * A home meter is charged only where the owner is a non-filer, and
 * only from the threshold bill upwards. A shop, office or factory meter is
 * charged from its own band table and pays the same either way, because rule
 * 10(i) of the Tenth Schedule keeps section 235 out of the non-filer uplift.
 */
export function calcElectricityTax(
  inputs: ElectricityInputs,
  fiscalYear: string,
): ElectricityResult {
  const resolvedFiscalYear = resolveWithholdingFiscalYear(fiscalYear);
  const year = getElectricityYear(resolvedFiscalYear);

  const billAmount = toNonNegative(inputs.billAmount);
  // Pulled into a local so the narrowing below reaches `year.business`, which
  // has no home-meter table — home meters are charged by their own rule.
  const { connection } = inputs;
  const isDomestic = connection === 'domestic';
  const { threshold, nonFilerRate } = year.domestic;

  const band =
    connection === 'domestic' ? null : findElectricityBand(year.business[connection], billAmount);

  const belowDomesticThreshold = isDomestic && billAmount < threshold;
  const domesticNonFilerTax = belowDomesticThreshold ? 0 : percentOf(billAmount, nonFilerRate);
  const businessTax = band ? applyElectricityBand(band, billAmount) : 0;

  const filerTax = isDomestic ? 0 : businessTax;
  const nonFilerTax = isDomestic ? domesticNonFilerTax : businessTax;
  const tax = inputs.filer ? filerTax : nonFilerTax;

  return {
    fiscalYear: resolvedFiscalYear,
    connection: inputs.connection,
    filer: inputs.filer,
    billAmount,
    bandLabel: band?.label ?? null,
    fixed: band?.fixed ?? 0,
    rate: isDomestic ? nonFilerRate : (band?.rate ?? 0),
    rateAppliesAbove: band?.rateAppliesAbove ?? 0,
    domesticThreshold: threshold,
    belowDomesticThreshold,
    sameForEveryone: !isDomestic,
    tax,
    filerTax,
    nonFilerTax,
    saving: Math.max(0, nonFilerTax - filerTax),
    totalPayable: billAmount + tax,
    effectiveRate: billAmount > 0 ? (tax / billAmount) * PERCENT : 0,
  };
}

/**
 * Advance tax on a phone or internet payment — section 236.
 *
 * Mobile, internet and prepaid loads are charged on the whole amount; a landline
 * bill is charged only on the part above the threshold. Both rates are the same
 * for filers and non-filers, so there is no filer toggle
 * here — rule 10(l) of the Tenth Schedule keeps section 236 out of the uplift.
 */
export function calcTelecomTax(inputs: TelecomInputs, fiscalYear: string): TelecomResult {
  const resolvedFiscalYear = resolveWithholdingFiscalYear(fiscalYear);
  const year = getTelecomYear(resolvedFiscalYear);

  const amount = toNonNegative(inputs.amount);
  const isLandline = inputs.service === 'landline';
  // A landline is always billed monthly; only a mobile number can be loaded.
  const payment = isLandline ? 'bill' : inputs.payment;

  const rate = isLandline ? year.landlineRate : year.mobileInternetRate;
  const taxableAmount = isLandline ? Math.max(0, amount - year.landlineThreshold) : amount;
  const tax = percentOf(taxableAmount, rate);

  return {
    fiscalYear: resolvedFiscalYear,
    service: inputs.service,
    payment,
    amount,
    rate,
    taxableAmount,
    landlineThreshold: year.landlineThreshold,
    tax,
    totalPayable: amount + tax,
    amountReceived: Math.max(0, amount - tax),
    effectiveRate: amount > 0 ? (tax / amount) * PERCENT : 0,
    namedDefaulterRate: isLandline ? null : year.namedDefaulterRate,
    namedDefaulterTax:
      isLandline || year.namedDefaulterRate === null
        ? 0
        : percentOf(amount, year.namedDefaulterRate),
  };
}
