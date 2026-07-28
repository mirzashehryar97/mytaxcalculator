'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { trackAnalyticsEvent } from '@/lib/analytics';

import { calcEmbedSalaryTax } from '@/features/embed-salary-tax/lib/calculation';
import {
  DEFAULT_EMBED_SALARY_TAX_FORM,
  isEmbedSalaryTaxFormValid,
  parseMonthlySalary,
} from '@/features/embed-salary-tax/lib/input';
import type {
  EmbedSalaryTaxFormField,
  EmbedSalaryTaxFormState,
} from '@/features/embed-salary-tax/types';

export default function useEmbedSalaryTax() {
  const [formState, setFormState] = useState<EmbedSalaryTaxFormState>(
    DEFAULT_EMBED_SALARY_TAX_FORM,
  );
  const hasInteracted = useRef(false);

  const isValid = isEmbedSalaryTaxFormValid(formState);
  const result = useMemo(
    () =>
      isValid
        ? calcEmbedSalaryTax(parseMonthlySalary(formState.monthlySalary), formState.fiscalYear)
        : null,
    [formState.fiscalYear, formState.monthlySalary, isValid],
  );

  const updateField = useCallback(
    <TField extends EmbedSalaryTaxFormField>(
      field: TField,
      value: EmbedSalaryTaxFormState[TField],
    ) => {
      hasInteracted.current = true;
      setFormState((current) => ({ ...current, [field]: value }));
    },
    [],
  );

  useEffect(() => {
    if (!(hasInteracted.current && isValid)) return;

    const timeout = window.setTimeout(() => {
      trackAnalyticsEvent('calculation_completed', {
        calculator: 'embed_salary_tax',
        fiscal_year: formState.fiscalYear,
        calculation_mode: 'automatic',
      });
    }, 600);

    return () => window.clearTimeout(timeout);
  }, [formState.fiscalYear, formState.monthlySalary, isValid]);

  return {
    formState,
    result,
    updateField,
  };
}
