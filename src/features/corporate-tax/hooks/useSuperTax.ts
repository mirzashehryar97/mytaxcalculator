'use client';

import { useCallback, useMemo, useState } from 'react';

import { calcSuperTax } from '@/features/corporate-tax/lib/calculation';
import {
  DEFAULT_SUPER_TAX_FORM_STATE,
  parseCorporateNumberInput,
  type SuperTaxFormField,
  type SuperTaxFormState,
} from '@/features/corporate-tax/lib/input';

export default function useSuperTax() {
  const [formState, setFormState] = useState<SuperTaxFormState>(DEFAULT_SUPER_TAX_FORM_STATE);

  const inputs = useMemo(
    () => ({
      income: parseCorporateNumberInput(formState.income),
      taxpayerType: formState.taxpayerType,
      isExportExempt: formState.isExportExempt,
    }),
    [formState],
  );

  const result = useMemo(
    () => calcSuperTax(inputs, formState.fiscalYear),
    [inputs, formState.fiscalYear],
  );

  const updateField = useCallback(
    <TField extends SuperTaxFormField>(field: TField, value: SuperTaxFormState[TField]) => {
      setFormState((current) => ({ ...current, [field]: value }));
    },
    [],
  );

  return {
    formState,
    result,
    income: inputs.income,
    isValid: inputs.income > 0,
    updateField,
  };
}
