'use client';

import { useCallback, useMemo, useState } from 'react';

import { calcMinimumTurnoverTax } from '@/features/corporate-tax/lib/calculation';
import {
  DEFAULT_MINIMUM_TAX_FORM_STATE,
  type MinimumTaxFormField,
  type MinimumTaxFormState,
  parseCorporateNumberInput,
} from '@/features/corporate-tax/lib/input';

export default function useMinimumTurnoverTax() {
  const [formState, setFormState] = useState<MinimumTaxFormState>(DEFAULT_MINIMUM_TAX_FORM_STATE);

  const inputs = useMemo(
    () => ({
      turnover: parseCorporateNumberInput(formState.turnover),
      taxpayerType: formState.taxpayerType,
      sector: formState.sector,
      normalTax: parseCorporateNumberInput(formState.normalTax),
    }),
    [formState],
  );

  const result = useMemo(
    () => calcMinimumTurnoverTax(inputs, formState.fiscalYear),
    [inputs, formState.fiscalYear],
  );

  const updateField = useCallback(
    <TField extends MinimumTaxFormField>(field: TField, value: MinimumTaxFormState[TField]) => {
      setFormState((current) => ({ ...current, [field]: value }));
    },
    [],
  );

  return {
    formState,
    result,
    isValid: inputs.turnover > 0,
    updateField,
  };
}
