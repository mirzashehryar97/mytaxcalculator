'use client';

import { useCallback, useMemo, useState } from 'react';

import { calcBusinessTax } from '@/features/business-tax/lib/calculation';
import {
  buildBusinessTaxInputs,
  DEFAULT_BUSINESS_FORM_STATE,
  isBusinessFormValid,
  resolveBusinessNetIncome,
} from '@/features/business-tax/lib/input';
import type { BusinessTaxFormField, BusinessTaxFormState } from '@/features/business-tax/types';

export default function useBusinessTax() {
  const [formState, setFormState] = useState<BusinessTaxFormState>(DEFAULT_BUSINESS_FORM_STATE);

  const inputs = useMemo(() => buildBusinessTaxInputs(formState), [formState]);
  const result = useMemo(
    () => calcBusinessTax(inputs, formState.fiscalYear),
    [inputs, formState.fiscalYear],
  );
  const netIncome = useMemo(() => resolveBusinessNetIncome(formState), [formState]);
  const isValid = isBusinessFormValid(inputs);

  const updateField = useCallback(
    <TField extends BusinessTaxFormField>(field: TField, value: BusinessTaxFormState[TField]) => {
      setFormState((current) => ({ ...current, [field]: value }));
    },
    [],
  );

  return {
    formState,
    inputs,
    result,
    netIncome,
    isValid,
    updateField,
  };
}
