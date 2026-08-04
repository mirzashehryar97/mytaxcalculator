import { findPhone, getFirstVariant } from '@/features/pta-tax/lib/phoneLookup';
import { DEFAULT_PTA_FISCAL_YEAR, PTA_DEFAULT_EXCHANGE_RATE } from '@/features/pta-tax/lib/rates';
import type {
  PtaCondition,
  PtaDeviceKind,
  PtaFiscalYear,
  PtaInputs,
  PtaRoute,
  PtaValueSource,
} from '@/features/pta-tax/types';

export interface PtaFormState {
  fiscalYear: PtaFiscalYear;
  route: PtaRoute;
  deviceKind: PtaDeviceKind;
  condition: PtaCondition;
  valueSource: PtaValueSource;
  brand: string;
  model: string;
  /** Storage tier; `''` both when the model has no tiers and before one is picked. */
  variant: string;
  /** C&F value typed by hand, used when no ruling covers the handset. */
  manualCnfUsd: string;
  /** Optional higher declared value, which section 25(1) makes the assessment on. */
  declaredCnfUsd: string;
  exchangeRate: string;
}

export type PtaFormField = keyof PtaFormState;

export type UpdatePtaField = <TField extends PtaFormField>(
  field: TField,
  value: PtaFormState[TField],
) => void;

const DEFAULT_BRAND = 'Apple';
const DEFAULT_MODEL = 'iPhone 16';

export const DEFAULT_PTA_FORM_STATE: PtaFormState = {
  fiscalYear: DEFAULT_PTA_FISCAL_YEAR,
  route: 'passport',
  deviceKind: 'smartphone',
  condition: 'new',
  valueSource: 'model',
  brand: DEFAULT_BRAND,
  model: DEFAULT_MODEL,
  variant: getFirstVariant(DEFAULT_BRAND, DEFAULT_MODEL),
  manualCnfUsd: '',
  declaredCnfUsd: '',
  exchangeRate: String(PTA_DEFAULT_EXCHANGE_RATE),
};

export function parsePtaNumberInput(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

/** The value the ruling puts on the chosen handset, or null when none does. */
export function getOfficialCnfUsd(formState: PtaFormState): number | null {
  if (formState.valueSource !== 'model') {
    return null;
  }
  return findPhone(formState.brand, formState.model, formState.variant)?.cnfUsd ?? null;
}

/**
 * What the assessment actually runs on. A ruling value is a floor: where the
 * declared value is higher, section 25(1) of the Customs Act makes the
 * assessment on the declared figure instead, so the higher of the two wins.
 */
export function getEffectiveCnfUsd(formState: PtaFormState): number {
  if (formState.valueSource === 'manual') {
    return parsePtaNumberInput(formState.manualCnfUsd);
  }
  return Math.max(getOfficialCnfUsd(formState) ?? 0, parsePtaNumberInput(formState.declaredCnfUsd));
}

/** True when the typed declared value is the figure being used, not the ruling's. */
export function isDeclaredValueUsed(formState: PtaFormState): boolean {
  if (formState.valueSource !== 'model') {
    return false;
  }
  const declared = parsePtaNumberInput(formState.declaredCnfUsd);
  return declared > 0 && declared > (getOfficialCnfUsd(formState) ?? 0);
}

export function buildPtaInputs(formState: PtaFormState): PtaInputs {
  return {
    route: formState.route,
    deviceKind: formState.deviceKind,
    cnfUsd: getEffectiveCnfUsd(formState),
    exchangeRate: parsePtaNumberInput(formState.exchangeRate),
  };
}

/**
 * Every band in every one of the four tables starts at US$ 0, so a blank value
 * lands in the cheapest band and prints a complete, confident bill for a phone
 * nobody has described. The result is withheld until both figures the answer
 * turns on are present.
 */
export function isPtaFormValid(formState: PtaFormState): boolean {
  return getEffectiveCnfUsd(formState) > 0 && parsePtaNumberInput(formState.exchangeRate) > 0;
}

/** Names the one answer still missing, for the placeholder that stands in. */
export function getPtaMissingInput(formState: PtaFormState): string | null {
  if (getEffectiveCnfUsd(formState) <= 0) {
    return formState.valueSource === 'manual'
      ? 'Enter the C&F value in US dollars that your own assessment uses.'
      : 'Pick a handset that carries an official customs value, or switch to entering it yourself.';
  }
  if (parsePtaNumberInput(formState.exchangeRate) <= 0) {
    return 'Enter the exchange rate, so the C&F value can be converted into rupees.';
  }
  return null;
}
