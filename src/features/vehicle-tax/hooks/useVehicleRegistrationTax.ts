'use client';

import { useCallback, useMemo, useState } from 'react';

import { calcVehicleRegistrationTax } from '@/features/vehicle-tax/lib/calculation';
import {
  buildVehicleRegistrationInputs,
  DEFAULT_VEHICLE_REGISTRATION_FORM_STATE,
  isVehicleRegistrationFormValid,
  type VehicleRegistrationFormField,
  type VehicleRegistrationFormState,
} from '@/features/vehicle-tax/lib/input';

export default function useVehicleRegistrationTax() {
  const [formState, setFormState] = useState<VehicleRegistrationFormState>(
    DEFAULT_VEHICLE_REGISTRATION_FORM_STATE,
  );

  const inputs = useMemo(() => buildVehicleRegistrationInputs(formState), [formState]);
  const result = useMemo(
    () => calcVehicleRegistrationTax(inputs, formState.fiscalYear),
    [inputs, formState.fiscalYear],
  );
  const isValid = isVehicleRegistrationFormValid(inputs);

  const updateField = useCallback(
    <TField extends VehicleRegistrationFormField>(
      field: TField,
      value: VehicleRegistrationFormState[TField],
    ) => {
      setFormState((current) => ({ ...current, [field]: value }));
    },
    [],
  );

  return { formState, inputs, result, isValid, updateField };
}
