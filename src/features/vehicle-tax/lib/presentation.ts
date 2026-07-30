import { calcVehicleRegistrationTax } from '@/features/vehicle-tax/lib/calculation';
import {
  VEHICLE_REGISTRATION_RESULT_COPY,
  VEHICLE_TOKEN_RESULT_COPY,
} from '@/features/vehicle-tax/lib/content';
import {
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
  VehicleCharge,
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

export function buildAnnualTaxRows(): VehicleRateGuideRow[] {
  return VEHICLE_ANNUAL_TAX.perYear.map((tier) => ({
    id: tier.id,
    band: tier.label,
    filerRate: formatChargeOrNil(tier.charge),
    nonFilerRate: formatChargeOrNil(
      scaleCharge(tier.charge, VEHICLE_ANNUAL_TAX.nonFilerMultiplier),
    ),
  }));
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
    });
  }

  if (result.discountAmount > 0) {
    items.push({
      id: 'discount',
      label: VEHICLE_TOKEN_RESULT_COPY.discountLabel,
      description: `Paying the whole year by ${result.earlyPaymentDeadline} takes ${formatPercent(result.earlyPaymentDiscount)} off the token.`,
      detail: `− ${formatPkr(result.discountAmount)}`,
    });
  }

  items.push({
    id: 'federal',
    label: VEHICLE_TOKEN_RESULT_COPY.federalLabel,
    description: result.federalExempt
      ? 'This car is more than ten years old, so the federal part is no longer collected.'
      : `A fixed FBR amount for the ${result.federalTierLabel} band, doubled for anyone off the taxpayer list.`,
    detail: formatPkr(result.federalTax),
  });

  return items;
}
