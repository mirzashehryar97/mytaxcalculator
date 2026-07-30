'use client';

import { useCallback, useMemo, useState } from 'react';

import { calcVehicleTokenTax } from '@/features/vehicle-tax/lib/calculation';
import {
  buildVehicleTokenInputs,
  DEFAULT_VEHICLE_TOKEN_FORM_STATE,
  isVehicleTokenFormValid,
  type VehicleTokenFormField,
  type VehicleTokenFormState,
} from '@/features/vehicle-tax/lib/input';

export default function useVehicleTokenTax() {
  const [formState, setFormState] = useState<VehicleTokenFormState>(
    DEFAULT_VEHICLE_TOKEN_FORM_STATE,
  );

  const inputs = useMemo(() => buildVehicleTokenInputs(formState), [formState]);
  const result = useMemo(
    () => calcVehicleTokenTax(inputs, formState.fiscalYear),
    [inputs, formState.fiscalYear],
  );
  const isValid = isVehicleTokenFormValid(inputs);

  const updateField = useCallback(
    <TField extends VehicleTokenFormField>(field: TField, value: VehicleTokenFormState[TField]) => {
      setFormState((current) => ({ ...current, [field]: value }));
    },
    [],
  );

  return { formState, inputs, result, isValid, updateField };
}
