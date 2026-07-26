'use client';

import { useCallback, useMemo, useState } from 'react';

import { calcReverseSalary } from '@/features/reverse-salary/lib/calculation';
import {
  DEFAULT_REVERSE_SALARY_FORM,
  isReverseSalaryValid,
  parseDesiredTakeHome,
  resolveReverseFiscalYear,
} from '@/features/reverse-salary/lib/input';
import type {
  ReverseSalaryFormField,
  ReverseSalaryFormState,
} from '@/features/reverse-salary/types';

export default function useReverseSalary() {
  const [formState, setFormState] = useState<ReverseSalaryFormState>(DEFAULT_REVERSE_SALARY_FORM);

  const fiscalYear = resolveReverseFiscalYear(formState.fiscalYear);
  const isValid = isReverseSalaryValid(formState);

  const result = useMemo(
    () => calcReverseSalary(parseDesiredTakeHome(formState.desiredTakeHome), fiscalYear),
    [formState.desiredTakeHome, fiscalYear],
  );

  const updateField = useCallback(
    <TField extends ReverseSalaryFormField>(
      field: TField,
      value: ReverseSalaryFormState[TField],
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
