import {
  getVehicleProvince,
  getVehicleRegistrationYear,
  getVehicleTransferYear,
  resolveVehicleFiscalYear,
  resolveVehicleTokenFiscalYear,
  VEHICLE_ANNUAL_TAX,
  VEHICLE_ANNUAL_TAX_CUTOFF_YEARS,
  VEHICLE_HIGH_VALUE_THRESHOLD,
  VEHICLE_TRANSFER_CUTOFF_YEARS,
  VEHICLE_TRANSFER_REDUCTION_PER_YEAR,
} from '@/features/vehicle-tax/lib/rates';
import type {
  VehicleCcTier,
  VehicleCharge,
  VehicleRegistrationInputs,
  VehicleRegistrationResult,
  VehicleTokenInputs,
  VehicleTokenResult,
  VehicleTokenTier,
} from '@/features/vehicle-tax/types';

const PERCENT = 100;

function toNonNegative(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

/** What a charge comes to on a given value. */
export function applyCharge(charge: VehicleCharge, value: number): number {
  if (charge.kind === 'amount') {
    return charge.amount;
  }
  return toNonNegative(value) * (charge.percent / PERCENT);
}

/** The band an engine size falls into, or null when it sits below every band. */
export function findCcTier<TTier extends VehicleCcTier>(
  tiers: readonly TTier[],
  engineCc: number,
): TTier | null {
  return (
    tiers.find(
      (tier) => engineCc >= tier.minCc && (tier.maxCc === null || engineCc <= tier.maxCc),
    ) ?? null
  );
}

/**
 * Full years between two dates. Used for the age of a vehicle, so a car
 * registered on 1 July 2024 is nought years old until 1 July 2025.
 */
export function getCompletedYears(firstRegistrationIso: string, today: Date): number {
  if (!firstRegistrationIso) {
    return 0;
  }

  const start = new Date(`${firstRegistrationIso}T00:00:00Z`);
  if (Number.isNaN(start.getTime())) {
    return 0;
  }

  const endOfToday = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  if (endOfToday <= start.getTime()) {
    return 0;
  }

  const years = today.getUTCFullYear() - start.getUTCFullYear();
  const anniversary = Date.UTC(today.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
  return Math.max(0, endOfToday < anniversary ? years - 1 : years);
}

interface RegistrationCharge {
  tierLabel: string | null;
  charge: VehicleCharge | null;
}

/**
 * The band and charge that apply at registration. An electric vehicle has no
 * engine size, so it only has a rate once its value reaches the threshold in the
 * second proviso to Division VII, clause (1).
 */
function resolveRegistrationCharge(
  inputs: VehicleRegistrationInputs,
  fiscalYear: string,
): RegistrationCharge {
  const year = getVehicleRegistrationYear(fiscalYear);

  if (inputs.engineType === 'electric') {
    if (inputs.vehicleValue < VEHICLE_HIGH_VALUE_THRESHOLD) {
      return { tierLabel: null, charge: null };
    }
    return {
      tierLabel: 'No engine size, value of Rs. 5,000,000 or more',
      charge: { kind: 'percent', percent: year.noEngineSizePercent },
    };
  }

  const tier = findCcTier(year.tiers, inputs.engineCc);
  return tier ? { tierLabel: tier.label, charge: tier.charge } : { tierLabel: null, charge: null };
}

/** The band and charge that apply when a used vehicle changes hands. */
function resolveTransferCharge(
  inputs: VehicleRegistrationInputs,
  fiscalYear: string,
): RegistrationCharge {
  const year = getVehicleTransferYear(fiscalYear);

  if (inputs.engineType === 'electric') {
    if (inputs.vehicleValue < VEHICLE_HIGH_VALUE_THRESHOLD) {
      return { tierLabel: null, charge: null };
    }
    return {
      tierLabel: 'No engine size, value of Rs. 5,000,000 or more',
      charge: { kind: 'amount', amount: year.noEngineSizeAmount },
    };
  }

  const tier = findCcTier(year.tiers, inputs.engineCc);
  return tier ? { tierLabel: tier.label, charge: tier.charge } : { tierLabel: null, charge: null };
}

/**
 * Estimates the advance tax collected under section 231B, either at first
 * registration or when a used vehicle is transferred. Pure — values keep full
 * precision so only formatting rounds.
 */
export function calcVehicleRegistrationTax(
  inputs: VehicleRegistrationInputs,
  fiscalYear: string,
): VehicleRegistrationResult {
  const resolvedFiscalYear = resolveVehicleFiscalYear(fiscalYear);
  const year = getVehicleRegistrationYear(resolvedFiscalYear);
  const isTransfer = inputs.mode === 'transfer';

  const { tierLabel, charge } = isTransfer
    ? resolveTransferCharge(inputs, resolvedFiscalYear)
    : resolveRegistrationCharge(inputs, resolvedFiscalYear);

  const vehicleValue = toNonNegative(inputs.vehicleValue);
  const completedYears = isTransfer ? Math.max(0, Math.floor(inputs.completedYears)) : 0;
  const pastFiveYears = isTransfer && completedYears >= VEHICLE_TRANSFER_CUTOFF_YEARS;

  const filerBeforeReduction = charge ? applyCharge(charge, vehicleValue) : 0;
  const nonFilerBeforeReduction = filerBeforeReduction * year.nonFilerMultiplier;

  const reductionPercent = isTransfer
    ? Math.min(PERCENT, completedYears * VEHICLE_TRANSFER_REDUCTION_PER_YEAR)
    : 0;
  const keptShare = pastFiveYears ? 0 : 1 - reductionPercent / PERCENT;

  const filerTax = filerBeforeReduction * keptShare;
  const nonFilerTax = nonFilerBeforeReduction * keptShare;
  const tax = inputs.filer ? filerTax : nonFilerTax;

  return {
    fiscalYear: resolvedFiscalYear,
    mode: inputs.mode,
    engineType: inputs.engineType,
    filer: inputs.filer,
    engineCc: inputs.engineCc,
    vehicleValue,
    tierLabel,
    charge,
    taxBeforeReduction: inputs.filer ? filerBeforeReduction : nonFilerBeforeReduction,
    reductionPercent,
    completedYears,
    pastFiveYears,
    tax,
    filerTax,
    nonFilerTax,
    filerSaving: Math.max(0, nonFilerTax - filerTax),
    unrated: charge === null,
    effectiveRate: vehicleValue > 0 ? (tax / vehicleValue) * PERCENT : 0,
    nonFilerMultiplier: year.nonFilerMultiplier,
    basis: year.basis,
  };
}

interface TokenLevy {
  tierLabel: string | null;
  charge: VehicleCharge | null;
  frequency: VehicleTokenTier['frequency'] | null;
}

/**
 * The token band an engine size falls into. A province may also split a band by
 * how old the vehicle is — Balochistan charges a car up to 1,000 cc once for
 * life while it is under five years old, then yearly after that — so a band
 * carrying age bounds only applies inside them.
 */
export function findTokenTier(
  tiers: readonly VehicleTokenTier[],
  engineCc: number,
  completedYears: number,
): VehicleTokenTier | null {
  return (
    tiers.find(
      (tier) =>
        engineCc >= tier.minCc &&
        (tier.maxCc === null || engineCc <= tier.maxCc) &&
        completedYears >= (tier.minCompletedYears ?? 0) &&
        (tier.maxCompletedYears === undefined ||
          tier.maxCompletedYears === null ||
          completedYears <= tier.maxCompletedYears),
    ) ?? null
  );
}

function resolveTokenLevy(
  tiers: readonly VehicleTokenTier[] | undefined,
  engineCc: number,
  completedYears: number,
): TokenLevy {
  if (!tiers) {
    return { tierLabel: null, charge: null, frequency: null };
  }

  const tier = findTokenTier(tiers, engineCc, completedYears);
  if (!tier) {
    return { tierLabel: null, charge: null, frequency: null };
  }
  return { tierLabel: tier.label, charge: tier.charge, frequency: tier.frequency };
}

/**
 * Estimates what a private car costs to keep on the road for a year: the
 * provincial token, less any early-payment discount, plus the federal charge
 * collected alongside it under section 234.
 *
 * Where the province pays its token once for the life of the vehicle, the
 * federal charge is the one-off lump-sum amount rather than the yearly one, as
 * section 234(2) allows it to be collected in the same way as the token.
 */
export function calcVehicleTokenTax(
  inputs: VehicleTokenInputs,
  fiscalYear: string,
): VehicleTokenResult {
  const resolvedFiscalYear = resolveVehicleTokenFiscalYear(fiscalYear);
  const province = getVehicleProvince(inputs.province);
  const schedule = province.schedules[resolvedFiscalYear];

  const invoiceValue = toNonNegative(inputs.invoiceValue);
  const completedYears = Math.max(0, Math.floor(inputs.completedYears));

  const levy = resolveTokenLevy(schedule?.tiers, inputs.engineCc, completedYears);
  const tokenBeforeDiscount = levy.charge ? applyCharge(levy.charge, invoiceValue) : 0;

  const earlyPaymentDiscount = schedule?.earlyPaymentDiscount ?? 0;
  const discountApplies =
    inputs.payEarly && levy.frequency === 'annual' && earlyPaymentDiscount > 0;
  const discountAmount = discountApplies
    ? tokenBeforeDiscount * (earlyPaymentDiscount / PERCENT)
    : 0;
  const tokenTax = Math.max(0, tokenBeforeDiscount - discountAmount);

  const federalIsOneOff = levy.frequency === 'lifetime';
  const federalTiers = federalIsOneOff ? VEHICLE_ANNUAL_TAX.lumpSum : VEHICLE_ANNUAL_TAX.perYear;
  const federalTier = findCcTier(federalTiers, inputs.engineCc);
  const federalExempt = completedYears >= VEHICLE_ANNUAL_TAX_CUTOFF_YEARS;

  const federalBase = federalTier ? applyCharge(federalTier.charge, invoiceValue) : 0;
  const federalFilerTax = federalExempt ? 0 : federalBase;
  const federalNonFilerTax = federalExempt
    ? 0
    : federalBase * VEHICLE_ANNUAL_TAX.nonFilerMultiplier;
  const federalTax = inputs.filer ? federalFilerTax : federalNonFilerTax;

  return {
    fiscalYear: resolvedFiscalYear,
    province: inputs.province,
    filer: inputs.filer,
    engineCc: inputs.engineCc,
    invoiceValue,
    completedYears,
    tokenCovered: schedule !== undefined && levy.charge !== null,
    tokenSource: schedule?.source ?? null,
    tokenTierLabel: levy.tierLabel,
    tokenCharge: levy.charge,
    tokenFrequency: levy.frequency,
    tokenBeforeDiscount,
    earlyPaymentDiscount,
    earlyPaymentDeadline: schedule?.earlyPaymentDeadline ?? null,
    discountAmount,
    tokenTax,
    federalTierLabel: federalTier?.label ?? null,
    federalTax,
    federalFilerTax,
    federalNonFilerTax,
    federalIsOneOff,
    federalExempt,
    total: tokenTax + federalTax,
    filerSaving: Math.max(0, federalNonFilerTax - federalFilerTax),
  };
}
