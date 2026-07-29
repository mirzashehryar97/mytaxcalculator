'use client';

import { useCallback, useMemo, useState } from 'react';

import { calcRentalTax } from '@/features/rental-income-tax/lib/calculation';
import {
  buildRentalTaxInputs,
  DEFAULT_RENTAL_FORM_STATE,
  isRentalFormValid,
  resolveRentalAnnualRent,
} from '@/features/rental-income-tax/lib/input';
import type { RentalTaxFormField, RentalTaxFormState } from '@/features/rental-income-tax/types';

export default function useRentalTax() {
  const [formState, setFormState] = useState<RentalTaxFormState>(DEFAULT_RENTAL_FORM_STATE);

  const inputs = useMemo(() => buildRentalTaxInputs(formState), [formState]);
  const result = useMemo(
    () => calcRentalTax(inputs, formState.fiscalYear),
    [inputs, formState.fiscalYear],
  );
  const annualRent = useMemo(() => resolveRentalAnnualRent(formState), [formState]);
  const isValid = isRentalFormValid(inputs);

  const updateField = useCallback(
    <TField extends RentalTaxFormField>(field: TField, value: RentalTaxFormState[TField]) => {
      setFormState((current) => ({ ...current, [field]: value }));
    },
    [],
  );

  return {
    formState,
    inputs,
    result,
    annualRent,
    isValid,
    updateField,
  };
}
