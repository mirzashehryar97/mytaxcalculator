import type {
  VehicleRegistrationFormState,
  VehicleTokenFormState,
} from '@/features/vehicle-tax/lib/input';
import { VEHICLE_REGISTRATION_ROUTE, VEHICLE_TOKEN_ROUTE } from '@/features/vehicle-tax/lib/modes';

export const VEHICLE_ANALYTICS_EVENTS = {
  registrationPageView: 'vehicle_registration_calculator_view',
  registrationUse: 'vehicle_registration_calculator_use',
  tokenPageView: 'vehicle_token_calculator_view',
  tokenUse: 'vehicle_token_calculator_use',
} as const;

export const VEHICLE_REGISTRATION_ANALYTICS_CONTEXT = {
  calculator: 'vehicle-registration',
  page_path: VEHICLE_REGISTRATION_ROUTE,
} as const;

export const VEHICLE_TOKEN_ANALYTICS_CONTEXT = {
  calculator: 'vehicle-token',
  page_path: VEHICLE_TOKEN_ROUTE,
} as const;

export function buildVehicleRegistrationUseParameters(formState: VehicleRegistrationFormState) {
  return {
    ...VEHICLE_REGISTRATION_ANALYTICS_CONTEXT,
    fiscal_year: formState.fiscalYear,
    mode: formState.mode,
    engine_type: formState.engineType,
    filer: formState.filer,
  } as const;
}

export function buildVehicleTokenUseParameters(formState: VehicleTokenFormState) {
  return {
    ...VEHICLE_TOKEN_ANALYTICS_CONTEXT,
    fiscal_year: formState.fiscalYear,
    province: formState.province,
    pay_early: formState.payEarly,
    filer: formState.filer,
  } as const;
}
