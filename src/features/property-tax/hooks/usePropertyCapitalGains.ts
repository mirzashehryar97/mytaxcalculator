'use client';

import { useCallback, useMemo, useState } from 'react';

import { calcPropertyCapitalGains } from '@/features/property-tax/lib/calculation';
import {
  buildPropertyCapitalGainsInputs,
  DEFAULT_PROPERTY_CAPITAL_GAINS_FORM_STATE,
  isPropertyCapitalGainsFormValid,
  resolveStatusForYear,
} from '@/features/property-tax/lib/input';
import { getPropertyTaxYearForDate } from '@/features/property-tax/lib/rates';
import type {
  PropertyCapitalGainsFormField,
  PropertyCapitalGainsFormState,
} from '@/features/property-tax/types';

export default function usePropertyCapitalGains() {
  const [formState, setFormState] = useState<PropertyCapitalGainsFormState>(
    DEFAULT_PROPERTY_CAPITAL_GAINS_FORM_STATE,
  );

  // The gain is taxed in the year the sale falls in, so the year is read off the
  // sale date instead of being picked. The form shows this rather than hiding it.
  const taxYear = useMemo(
    () => getPropertyTaxYearForDate(formState.saleDate),
    [formState.saleDate],
  );
  const inputs = useMemo(() => buildPropertyCapitalGainsInputs(formState), [formState]);
  const result = useMemo(() => calcPropertyCapitalGains(inputs), [inputs]);
  const isValid = isPropertyCapitalGainsFormValid(inputs);

  const updateField = useCallback(
    <TField extends PropertyCapitalGainsFormField>(
      field: TField,
      value: PropertyCapitalGainsFormState[TField],
    ) => {
      setFormState((current) => {
        const next = { ...current, [field]: value };
        // The status only reaches the maths through the Section 236C credit, so
        // it is validated against the seller's rate table for the year the sale
        // lands in — which a new sale date can move out from under it.
        const { fiscalYear } = getPropertyTaxYearForDate(next.saleDate);
        return { ...next, status: resolveStatusForYear(next.status, 'sale', fiscalYear) };
      });
    },
    [],
  );

  return { formState, taxYear, inputs, result, isValid, updateField };
}
