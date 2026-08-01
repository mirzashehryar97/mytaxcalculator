import { calcVehicleRegistrationTax } from '@/features/vehicle-tax/lib/calculation';
import {
  VEHICLE_REGISTRATION_FORM_COPY,
  VEHICLE_REGISTRATION_RESULT_COPY,
  VEHICLE_TOKEN_FORM_COPY,
  VEHICLE_TOKEN_RESULT_COPY,
} from '@/features/vehicle-tax/lib/content';
import {
  formatCc,
  formatCharge,
  formatPercent,
  formatPkr,
  formatVehicleFiscalYear,
  formatYears,
} from '@/features/vehicle-tax/lib/formatting';
import {
  getVehicleProvince,
  getVehicleRegistrationYear,
  getVehicleTransferYear,
  VEHICLE_ANNUAL_TAX,
  VEHICLE_FISCAL_YEARS,
  VEHICLE_TRANSFER_REDUCTION_PER_YEAR,
} from '@/features/vehicle-tax/lib/rates';
import type {
  VehicleCcTier,
  VehicleCharge,
  VehicleEngineType,
  VehicleFiscalYear,
  VehicleProvince,
  VehicleRateGuideRow,
  VehicleRegistrationInputs,
  VehicleRegistrationMode,
  VehicleRegistrationResult,
  VehicleTokenFiscalYear,
  VehicleTokenResult,
  VehicleTokenSource,
} from '@/features/vehicle-tax/types';

/** A charge multiplied out for the non-filer column of a rate table. */
function scaleCharge(charge: VehicleCharge, multiplier: number): VehicleCharge {
  if (charge.kind === 'amount') {
    return { kind: 'amount', amount: charge.amount * multiplier };
  }
  return { kind: 'percent', percent: charge.percent * multiplier };
}

function formatChargeOrNil(charge: VehicleCharge): string {
  if (charge.kind === 'amount' && charge.amount === 0) {
    return 'Nothing';
  }
  return formatCharge(charge);
}

/**
 * Rate-guide rows are built from the same tables the calculator uses, so the
 * printed tables can never drift from the maths.
 */
export function buildRegistrationRateRows(fiscalYear: string): VehicleRateGuideRow[] {
  const year = getVehicleRegistrationYear(fiscalYear);

  return year.tiers.map((tier) => ({
    id: tier.id,
    band: tier.label,
    filerRate: formatChargeOrNil(tier.charge),
    nonFilerRate: formatChargeOrNil(scaleCharge(tier.charge, year.nonFilerMultiplier)),
  }));
}

export function buildTransferRateRows(fiscalYear: string): VehicleRateGuideRow[] {
  const year = getVehicleTransferYear(fiscalYear);

  return year.tiers.map((tier) => ({
    id: tier.id,
    band: tier.label,
    filerRate: formatChargeOrNil(tier.charge),
    nonFilerRate: formatChargeOrNil(scaleCharge(tier.charge, year.nonFilerMultiplier)),
  }));
}

function buildAnnualTaxRowsFrom(tiers: readonly VehicleCcTier[]): VehicleRateGuideRow[] {
  return tiers.map((tier) => ({
    id: tier.id,
    band: tier.label,
    filerRate: formatChargeOrNil(tier.charge),
    nonFilerRate: formatChargeOrNil(
      scaleCharge(tier.charge, VEHICLE_ANNUAL_TAX.nonFilerMultiplier),
    ),
  }));
}

/** Division III, clause (3) — the charge collected with a yearly token. */
export function buildAnnualTaxRows(): VehicleRateGuideRow[] {
  return buildAnnualTaxRowsFrom(VEHICLE_ANNUAL_TAX.perYear);
}

/**
 * Division III, clause (4) — "where the motor vehicle tax is collected in lump
 * sum". The calculator charges from this table on a lifetime token, so the page
 * has to print it; showing only the yearly table understates it twelvefold.
 */
export function buildAnnualTaxLumpSumRows(): VehicleRateGuideRow[] {
  return buildAnnualTaxRowsFrom(VEHICLE_ANNUAL_TAX.lumpSum);
}

/** "Tax on registering a vehicle in Pakistan (2026-27)" — the table is pinned to one year. */
export function getRateGuideTitle(title: string, fiscalYear: string): string {
  return `${title} (${formatVehicleFiscalYear(fiscalYear)})`;
}

export interface VehicleTokenGuideRow {
  id: string;
  band: string;
  amount: string;
  /** "Every year" or "Once, for the life of the vehicle". */
  frequency: string;
}

export interface VehicleTokenProvinceSummary {
  rows: VehicleTokenGuideRow[];
  /** Null where that province publishes nothing we could check for the year. */
  source: VehicleTokenSource | null;
}

/** One province's published bands for a year, with where they were read from. */
export function buildTokenProvinceSummary(
  province: VehicleProvince,
  fiscalYear: VehicleTokenFiscalYear,
): VehicleTokenProvinceSummary {
  const schedule = getVehicleProvince(province).schedules[fiscalYear];
  if (!schedule) {
    return { rows: [], source: null };
  }

  return {
    source: schedule.source,
    rows: schedule.tiers.map((tier) => ({
      id: tier.id,
      band: tier.label,
      amount: formatCharge(tier.charge),
      frequency: tier.frequency === 'lifetime' ? 'Once, for the life of the vehicle' : 'Every year',
    })),
  };
}

/**
 * The federal line's label, with its cc band. Where the provincial token is
 * paid once for the life of the vehicle the federal charge is collected the
 * same way — from the lump-sum table, not the yearly one — so calling it
 * "yearly" would contradict the total.
 */
export function getFederalLabel(result: VehicleTokenResult): string {
  const base = result.federalIsOneOff
    ? VEHICLE_TOKEN_RESULT_COPY.federalOneOffLabel
    : VEHICLE_TOKEN_RESULT_COPY.federalLabel;

  return result.federalTierLabel ? `${base} (${result.federalTierLabel})` : base;
}

/**
 * The early-payment switch's help line. A lifetime token has no yearly amount
 * to discount, so the switch is disabled and this says why rather than leaving
 * a live control that changes nothing.
 */
export function getEarlyPaymentHelp(
  provinceLabel: string,
  discount: number,
  deadline: string,
  isLifetime: boolean,
): string {
  if (isLifetime) {
    return VEHICLE_TOKEN_FORM_COPY.payEarlyLifetimeHelp;
  }

  return `${provinceLabel} takes ${discount}% off the yearly token if you pay it all by ${deadline}.`;
}

/**
 * Whether the invoice price is doing any work. Only a percentage band reads it,
 * so on a set-amount band the field is disabled rather than left live and inert.
 */
export function isTokenInvoiceValueUsed(result: VehicleTokenResult): boolean {
  return result.tokenCharge?.kind === 'percent';
}

export function getTokenInvoiceValueHelp(result: VehicleTokenResult): string {
  if (isTokenInvoiceValueUsed(result)) {
    return VEHICLE_TOKEN_FORM_COPY.invoiceValueHelp;
  }

  return result.tokenCovered
    ? VEHICLE_TOKEN_FORM_COPY.invoiceValueSetAmountHelp
    : VEHICLE_TOKEN_FORM_COPY.invoiceValueNotCoveredHelp;
}

/**
 * The date only changes the federal cut-off in most provinces, but in
 * Balochistan it also picks the band, so calling it optional there would be
 * wrong.
 */
export function getTokenFirstRegistrationHelp(province: VehicleProvince): string {
  return province === 'balochistan'
    ? VEHICLE_TOKEN_FORM_COPY.firstRegistrationBalochistanHelp
    : VEHICLE_TOKEN_FORM_COPY.firstRegistrationHelp;
}

/** Which missing answer is holding the token result up. */
export function getTokenInvalidMessage(engineCc: number): string {
  return engineCc > 0
    ? VEHICLE_TOKEN_FORM_COPY.invalidValueMessage
    : VEHICLE_TOKEN_FORM_COPY.invalidEngineMessage;
}

/** Which missing answer is holding the registration result up. */
export function getRegistrationInvalidMessage(
  engineType: VehicleEngineType,
  engineCc: number,
): string {
  return engineType !== 'electric' && engineCc <= 0
    ? VEHICLE_REGISTRATION_FORM_COPY.invalidEngineMessage
    : VEHICLE_REGISTRATION_FORM_COPY.invalidValueMessage;
}

/** The line under the token heading: engine size, and the price only when it counts. */
export function getTokenVehicleSummary(result: VehicleTokenResult): string {
  if (!isTokenInvoiceValueUsed(result)) {
    return formatCc(result.engineCc);
  }
  return `${formatCc(result.engineCc)} · invoice price ${formatPkr(result.invoiceValue)}`;
}

/**
 * The age rows only make sense once we know the age. `completedYears` is 0 both
 * for a car registered this year and for one whose date we were never given,
 * and past the five-year cut-off the taper is overridden entirely — printing
 * "70% off" beside a nil bill contradicts it.
 */
export function showsRegistrationReduction(result: VehicleRegistrationResult): boolean {
  return result.mode === 'transfer' && result.firstRegistrationKnown && !result.pastFiveYears;
}

/** One line naming where a province's bands were read from. */
export function getTokenSourceSummary(source: VehicleTokenSource): string {
  const lead =
    source.tier === 'official'
      ? VEHICLE_TOKEN_RESULT_COPY.sourceOfficialTitle
      : VEHICLE_TOKEN_RESULT_COPY.sourceSecondaryTitle;

  return `${lead}: ${source.label}.`;
}

const MODE_LABELS: Record<VehicleRegistrationMode, string> = {
  register: 'New registration',
  transfer: 'Used vehicle',
};

export function getRegistrationModeLabel(mode: VehicleRegistrationMode): string {
  return MODE_LABELS[mode];
}

/** The warning to show instead of figures when no charge is set, or null. */
export function getUnratedNotice(
  result: VehicleRegistrationResult,
): { title: string; body: string } | null {
  if (!result.unrated) {
    return null;
  }

  return result.engineType === 'electric'
    ? {
        title: VEHICLE_REGISTRATION_RESULT_COPY.unratedElectricTitle,
        body: VEHICLE_REGISTRATION_RESULT_COPY.unratedElectricBody,
      }
    : {
        title: VEHICLE_REGISTRATION_RESULT_COPY.unratedTitle,
        body: VEHICLE_REGISTRATION_RESULT_COPY.unratedBody,
      };
}

/** Plain-language description of how the shown registration tax was reached. */
export function getRegistrationWorking(result: VehicleRegistrationResult): string {
  if (result.unrated) {
    return result.engineType === 'electric'
      ? VEHICLE_REGISTRATION_RESULT_COPY.unratedElectricBody
      : VEHICLE_REGISTRATION_RESULT_COPY.unratedBody;
  }

  if (result.pastFiveYears) {
    return VEHICLE_REGISTRATION_RESULT_COPY.pastCutoffBody;
  }

  const charge = result.charge;
  if (!charge) {
    return VEHICLE_REGISTRATION_RESULT_COPY.unratedBody;
  }

  const base =
    charge.kind === 'percent'
      ? `${formatPercent(charge.percent * (result.filer ? 1 : result.nonFilerMultiplier))} of ${formatPkr(result.vehicleValue)}`
      : formatPkr(charge.amount * (result.filer ? 1 : result.nonFilerMultiplier));

  if (result.mode === 'register') {
    return `${base} for the ${result.tierLabel ?? 'selected'} band.`;
  }

  if (result.completedYears === 0) {
    return `${base} for the ${result.tierLabel ?? 'selected'} band, with no reduction yet — the vehicle is ${formatYears(0)} old.`;
  }

  return `${base} for the ${result.tierLabel ?? 'selected'} band, less ${formatPercent(result.reductionPercent)} because the vehicle is ${formatYears(result.completedYears)} old (${VEHICLE_TRANSFER_REDUCTION_PER_YEAR}% for each full year).`;
}

/** Plain-language description of how the shown token bill was reached. */
export function getTokenWorking(result: VehicleTokenResult): string {
  if (!result.tokenCovered) {
    return VEHICLE_TOKEN_RESULT_COPY.notCoveredBody;
  }

  const charge = result.tokenCharge;
  if (!charge) {
    return VEHICLE_TOKEN_RESULT_COPY.notCoveredBody;
  }

  const base =
    charge.kind === 'percent'
      ? `${formatPercent(charge.percent)} of the ${formatPkr(result.invoiceValue)} invoice price`
      : `a set ${formatPkr(charge.amount)}`;

  if (result.discountAmount > 0) {
    return `${base} comes to ${formatPkr(result.tokenBeforeDiscount)}, less ${formatPercent(result.earlyPaymentDiscount)} for paying by ${result.earlyPaymentDeadline}.`;
  }

  return `${base} comes to ${formatPkr(result.tokenBeforeDiscount)}.`;
}

export interface VehicleYearComparisonRow {
  fiscalYear: VehicleFiscalYear;
  label: string;
  tax: number;
  formattedTax: string;
  /** 0–1 share of the largest figure in the set, for the bar width. */
  share: number;
}

/** The same vehicle taxed under every year we cover, for a quick comparison. */
export function buildVehicleYearComparison(
  inputs: VehicleRegistrationInputs,
): VehicleYearComparisonRow[] {
  const rows = VEHICLE_FISCAL_YEARS.map((fiscalYear) => {
    const { tax } = calcVehicleRegistrationTax(inputs, fiscalYear);
    return {
      fiscalYear,
      label: formatVehicleFiscalYear(fiscalYear),
      tax,
      formattedTax: formatPkr(tax),
    };
  });

  const maxTax = Math.max(...rows.map((row) => row.tax), 0);
  return rows.map((row) => ({
    ...row,
    share: maxTax > 0 ? row.tax / maxTax : 0,
  }));
}

export interface VehicleTotalBreakdownItem {
  id: string;
  label: string;
  description: string;
  detail: string;
  /** Money owed reads red and money off reads green, as in the result rows above. */
  tone: 'negative' | 'positive';
}

/** The three lines behind the token total, for the "what makes up the total" cards. */
export function buildTokenBreakdown(result: VehicleTokenResult): VehicleTotalBreakdownItem[] {
  const items: VehicleTotalBreakdownItem[] = [];

  if (result.tokenCovered && result.tokenCharge) {
    items.push({
      id: 'provincial',
      label: VEHICLE_TOKEN_RESULT_COPY.provincialLabel,
      description:
        result.tokenCharge.kind === 'percent'
          ? `Your province charges ${formatPercent(result.tokenCharge.percent)} of the invoice price for the ${result.tokenTierLabel} band.`
          : `Your province charges a set amount for the ${result.tokenTierLabel} band.`,
      detail: `${formatCharge(result.tokenCharge)} = ${formatPkr(result.tokenBeforeDiscount)}`,
      tone: 'negative',
    });
  }

  if (result.discountAmount > 0) {
    items.push({
      id: 'discount',
      label: VEHICLE_TOKEN_RESULT_COPY.discountLabel,
      description: `Paying the whole year by ${result.earlyPaymentDeadline} takes ${formatPercent(result.earlyPaymentDiscount)} off the token.`,
      detail: `− ${formatPkr(result.discountAmount)}`,
      tone: 'positive',
    });
  }

  items.push({
    id: 'federal',
    label: result.federalIsOneOff
      ? VEHICLE_TOKEN_RESULT_COPY.federalOneOffLabel
      : VEHICLE_TOKEN_RESULT_COPY.federalLabel,
    description: getFederalBreakdownDescription(result),
    detail: formatPkr(result.federalTax),
    tone: 'negative',
  });

  return items;
}

function getFederalBreakdownDescription(result: VehicleTokenResult): string {
  if (result.federalExempt) {
    return 'This car is more than ten years old, so the federal part is no longer collected.';
  }

  if (result.federalIsOneOff) {
    return `A fixed FBR amount for the ${result.federalTierLabel} band, collected once alongside the lifetime token and doubled for a non-filer.`;
  }

  return `A fixed FBR amount for the ${result.federalTierLabel} band, doubled for a non-filer.`;
}
