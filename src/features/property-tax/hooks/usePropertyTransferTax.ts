'use client';

import { useCallback, useMemo, useState } from 'react';

import { calcPropertyTransferTax } from '@/features/property-tax/lib/calculation';
import {
  buildPropertyTransferInputs,
  DEFAULT_PROPERTY_TRANSFER_FORM_STATE,
  isPropertyTransferFormValid,
  resolveStatusForYear,
} from '@/features/property-tax/lib/input';
import type {
  PropertyTransferFormField,
  PropertyTransferFormState,
} from '@/features/property-tax/types';

/** Drives the 236K and 236C calculators, which differ only by rate table. */
export default function usePropertyTransferTax(mode: 'purchase' | 'sale') {
  const [formState, setFormState] = useState<PropertyTransferFormState>(
    DEFAULT_PROPERTY_TRANSFER_FORM_STATE,
  );

  const inputs = useMemo(() => buildPropertyTransferInputs(formState), [formState]);
  const result = useMemo(
    () => calcPropertyTransferTax(inputs, mode, formState.fiscalYear),
    [inputs, mode, formState.fiscalYear],
  );
  const isValid = isPropertyTransferFormValid(inputs);

  const updateField = useCallback(
    <TField extends PropertyTransferFormField>(
      field: TField,
      value: PropertyTransferFormState[TField],
    ) => {
      setFormState((current) => {
        const next = { ...current, [field]: value };
        // Moving to a year without a late-filer tier has to drop the selection
        // rather than price a tier that did not exist that year.
        return { ...next, status: resolveStatusForYear(next.status, mode, next.fiscalYear) };
      });
    },
    [mode],
  );

  return { formState, inputs, result, isValid, updateField };
}
