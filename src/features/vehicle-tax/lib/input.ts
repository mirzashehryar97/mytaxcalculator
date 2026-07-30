import { getCompletedYears } from '@/features/vehicle-tax/lib/calculation';
import {
  DEFAULT_VEHICLE_FISCAL_YEAR,
  DEFAULT_VEHICLE_PROVINCE,
  DEFAULT_VEHICLE_TOKEN_FISCAL_YEAR,
} from '@/features/vehicle-tax/lib/rates';
import type {
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

export function buildVehicleRegistrationInputs(
  formState: VehicleRegistrationFormState,
  today: Date = new Date(),
): VehicleRegistrationInputs {
  return {
    mode: formState.mode,
    engineType: formState.engineType,
    engineCc: parseVehicleNumberInput(formState.engineCc),
    vehicleValue: parseVehicleNumberInput(formState.vehicleValue),
    filer: formState.filer,
    completedYears:
      formState.mode === 'transfer' ? getCompletedYears(formState.firstRegistrationDate, today) : 0,
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
 * instead, because that is what the law charges it on.
 */
export function isVehicleRegistrationFormValid(inputs: VehicleRegistrationInputs): boolean {
  if (inputs.engineType === 'electric') {
    return inputs.vehicleValue > 0;
  }
  return inputs.engineCc > 0;
}

export function isVehicleTokenFormValid(inputs: VehicleTokenInputs): boolean {
  return inputs.engineCc > 0;
}
