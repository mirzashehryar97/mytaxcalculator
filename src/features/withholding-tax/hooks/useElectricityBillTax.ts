'use client';

import { useCallback, useMemo, useState } from 'react';

import { calcElectricityTax } from '@/features/withholding-tax/lib/calculation';
import {
  buildElectricityInputs,
  DEFAULT_ELECTRICITY_FORM_STATE,
  isAmountValid,
} from '@/features/withholding-tax/lib/input';
import type { ElectricityFormField, ElectricityFormState } from '@/features/withholding-tax/types';

export default function useElectricityBillTax() {
  const [formState, setFormState] = useState<ElectricityFormState>(DEFAULT_ELECTRICITY_FORM_STATE);

  const inputs = useMemo(() => buildElectricityInputs(formState), [formState]);
  const result = useMemo(
    () => calcElectricityTax(inputs, formState.fiscalYear),
    [inputs, formState.fiscalYear],
  );
  const isValid = isAmountValid(inputs.billAmount);

  const updateField = useCallback(
    <TField extends ElectricityFormField>(field: TField, value: ElectricityFormState[TField]) => {
      setFormState((current) => ({ ...current, [field]: value }));
    },
    [],
  );

  return { formState, inputs, result, isValid, updateField };
}
