import { getCompletedYears } from '@/features/vehicle-tax/lib/calculation';
import {
  DEFAULT_VEHICLE_FISCAL_YEAR,
  DEFAULT_VEHICLE_PROVINCE,
  DEFAULT_VEHICLE_TOKEN_FISCAL_YEAR,
} from '@/features/vehicle-tax/lib/rates';
import type {
  VehicleCharge,
  VehicleEngineType,
  VehicleFiscalYear,
  VehicleProvince,
  VehicleRegistrationInputs,
  VehicleRegistrationMode,
  VehicleTokenFiscalYear,
  VehicleTokenInputs,
} from '@/features/vehicle-tax/types';

export interface VehicleRegistrationFormState {
  fiscalYear: VehicleFiscalYear;
  mode: VehicleRegistrationMode;
  engineType: VehicleEngineType;
  engineCc: string;
  vehicleValue: string;
  filer: boolean;
  /** `YYYY-MM-DD`; only read when the mode is a transfer. */
  firstRegistrationDate: string;
}

export interface VehicleTokenFormState {
  fiscalYear: VehicleTokenFiscalYear;
  province: VehicleProvince;
  engineCc: string;
  invoiceValue: string;
  filer: boolean;
  payEarly: boolean;
  firstRegistrationDate: string;
}

export type VehicleRegistrationFormField = keyof VehicleRegistrationFormState;
export type VehicleTokenFormField = keyof VehicleTokenFormState;

export type UpdateVehicleRegistrationField = <TField extends VehicleRegistrationFormField>(
  field: TField,
  value: VehicleRegistrationFormState[TField],
) => void;

export type UpdateVehicleTokenField = <TField extends VehicleTokenFormField>(
  field: TField,
  value: VehicleTokenFormState[TField],
) => void;

export const DEFAULT_VEHICLE_REGISTRATION_FORM_STATE = {
  fiscalYear: DEFAULT_VEHICLE_FISCAL_YEAR,
  mode: 'register',
  engineType: 'combustion',
  engineCc: '1300',
  vehicleValue: '4000000',
  filer: true,
  firstRegistrationDate: '',
} satisfies VehicleRegistrationFormState;

export const DEFAULT_VEHICLE_TOKEN_FORM_STATE = {
  fiscalYear: DEFAULT_VEHICLE_TOKEN_FISCAL_YEAR,
  province: DEFAULT_VEHICLE_PROVINCE,
  engineCc: '1300',
  invoiceValue: '4000000',
  filer: true,
  payEarly: true,
  firstRegistrationDate: '',
} satisfies VehicleTokenFormState;

export function parseVehicleNumberInput(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

/**
 * The price is only an input where the law charges on it — a new registration,
 * or any vehicle with no engine size. On a used engine-powered car the form
 * hides the field, so the held value must not leak into the result and quietly
 * drive the effective rate.
 */
export function vehicleValueApplies(formState: VehicleRegistrationFormState): boolean {
  return formState.mode !== 'transfer' || formState.engineType === 'electric';
}

export function buildVehicleRegistrationInputs(
  formState: VehicleRegistrationFormState,
  today: Date = new Date(),
): VehicleRegistrationInputs {
  const isTransfer = formState.mode === 'transfer';

  return {
    mode: formState.mode,
    engineType: formState.engineType,
    engineCc: parseVehicleNumberInput(formState.engineCc),
    vehicleValue: vehicleValueApplies(formState)
      ? parseVehicleNumberInput(formState.vehicleValue)
      : 0,
    filer: formState.filer,
    completedYears: isTransfer ? getCompletedYears(formState.firstRegistrationDate, today) : 0,
    firstRegistrationKnown: isTransfer && formState.firstRegistrationDate !== '',
  };
}

export function buildVehicleTokenInputs(
  formState: VehicleTokenFormState,
  today: Date = new Date(),
): VehicleTokenInputs {
  return {
    province: formState.province,
    engineCc: parseVehicleNumberInput(formState.engineCc),
    invoiceValue: parseVehicleNumberInput(formState.invoiceValue),
    filer: formState.filer,
    payEarly: formState.payEarly,
    completedYears: getCompletedYears(formState.firstRegistrationDate, today),
  };
}

/**
 * An engine-powered vehicle needs its engine size; an electric one needs a value
 * instead, because that is what the law charges it on. Either way a percentage
 * band cannot be priced without the price, so the resolved charge decides too —
 * every band starts at 0 cc, so a blank engine size otherwise matches the
 * smallest band and produces a confident figure for a vehicle nobody described.
 */
export function isVehicleRegistrationFormValid(
  inputs: VehicleRegistrationInputs,
  charge: VehicleCharge | null,
): boolean {
  if (inputs.engineType === 'electric') {
    return inputs.vehicleValue > 0;
  }
  if (inputs.engineCc <= 0) {
    return false;
  }
  return charge?.kind !== 'percent' || inputs.vehicleValue > 0;
}

export function isVehicleTokenFormValid(
  inputs: VehicleTokenInputs,
  tokenCharge: VehicleCharge | null,
): boolean {
  if (inputs.engineCc <= 0) {
    return false;
  }
  return tokenCharge?.kind !== 'percent' || inputs.invoiceValue > 0;
}
