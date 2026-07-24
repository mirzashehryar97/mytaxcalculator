'use client';

import { useCallback, useMemo, useState } from 'react';

import { calcFreelancerTax } from '@/features/freelancer-tax/lib/calculation';
import {
  buildFreelancerTaxInputs,
  DEFAULT_FREELANCER_FORM_STATE,
  isFreelancerFormValid,
} from '@/features/freelancer-tax/lib/input';
import type {
  FreelancerTaxFormField,
  FreelancerTaxFormState,
} from '@/features/freelancer-tax/types';

export default function useFreelancerTax() {
  const [formState, setFormState] = useState<FreelancerTaxFormState>(DEFAULT_FREELANCER_FORM_STATE);

  const inputs = useMemo(() => buildFreelancerTaxInputs(formState), [formState]);
  const result = useMemo(
    () => calcFreelancerTax(inputs, formState.fiscalYear),
    [inputs, formState.fiscalYear],
  );
  const isValid = isFreelancerFormValid(inputs);

  const updateField = useCallback(
    <TField extends FreelancerTaxFormField>(
      field: TField,
      value: FreelancerTaxFormState[TField],
    ) => {
      setFormState((current) => ({ ...current, [field]: value }));
    },
    [],
  );

  return {
    formState,
    result,
    isValid,
    updateField,
  };
}
