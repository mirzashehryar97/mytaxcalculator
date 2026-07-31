'use client';

import { useCallback, useMemo, useState } from 'react';

import { calcAgriculturalTax } from '@/features/agricultural-tax/lib/calculation';
import {
  type AgriculturalFormField,
  type AgriculturalFormState,
  DEFAULT_AGRICULTURAL_FORM_STATE,
  parseAgriculturalNumberInput,
} from '@/features/agricultural-tax/lib/input';

export default function useAgriculturalTax() {
  const [formState, setFormState] = useState<AgriculturalFormState>(
    DEFAULT_AGRICULTURAL_FORM_STATE,
  );

  const inputs = useMemo(
    () => ({
      income: parseAgriculturalNumberInput(formState.income),
      taxpayerType: formState.taxpayerType,
      acres: parseAgriculturalNumberInput(formState.acres),
      orchardAcres: parseAgriculturalNumberInput(formState.orchardAcres),
      orchardIrrigation: formState.orchardIrrigation,
      taxAlreadyPaid: parseAgriculturalNumberInput(formState.taxAlreadyPaid),
    }),
    [formState],
  );

  const result = useMemo(
    () => calcAgriculturalTax(inputs, formState.fiscalYear, formState.province),
    [inputs, formState.fiscalYear, formState.province],
  );

  const updateField = useCallback(
    <TField extends AgriculturalFormField>(field: TField, value: AgriculturalFormState[TField]) => {
      setFormState((current) => ({ ...current, [field]: value }));
    },
    [],
  );

  return {
    formState,
    result,
    isValid: inputs.income > 0,
    updateField,
  };
}
