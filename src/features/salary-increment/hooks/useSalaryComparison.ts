'use client';

import { useCallback, useMemo, useState } from 'react';

import { compareSalaryScenarios } from '@/features/salary-increment/lib/calculation';
import {
  buildScenarioInputs,
  DEFAULT_SALARY_COMPARISON_FORM,
  isSalaryComparisonValid,
  resolveComparisonFiscalYear,
} from '@/features/salary-increment/lib/input';
import type {
  SalaryComparisonFormField,
  SalaryComparisonFormState,
  SalaryComparisonMode,
} from '@/features/salary-increment/types';

export default function useSalaryComparison(mode: SalaryComparisonMode) {
  const [formState, setFormState] = useState<SalaryComparisonFormState>(
    DEFAULT_SALARY_COMPARISON_FORM,
  );

  const fiscalYear = resolveComparisonFiscalYear(formState.fiscalYear);
  const isValid = isSalaryComparisonValid(mode, formState);

  const comparison = useMemo(() => {
    const { current, next } = buildScenarioInputs(mode, formState);
    return compareSalaryScenarios(mode, current, next, fiscalYear);
  }, [mode, formState, fiscalYear]);

  const updateField = useCallback(
    <TField extends SalaryComparisonFormField>(
      field: TField,
      value: SalaryComparisonFormState[TField],
    ) => {
      setFormState((current) => ({ ...current, [field]: value }));
    },
    [],
  );

  return {
    formState,
    comparison,
    isValid,
    updateField,
  };
}
