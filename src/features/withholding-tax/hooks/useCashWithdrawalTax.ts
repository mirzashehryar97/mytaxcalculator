'use client';

import { useCallback, useMemo, useState } from 'react';

import { calcCashWithdrawalTax } from '@/features/withholding-tax/lib/calculation';
import {
  buildCashWithdrawalInputs,
  DEFAULT_CASH_WITHDRAWAL_FORM_STATE,
  isAmountValid,
} from '@/features/withholding-tax/lib/input';
import type {
  CashWithdrawalFormField,
  CashWithdrawalFormState,
} from '@/features/withholding-tax/types';

export default function useCashWithdrawalTax() {
  const [formState, setFormState] = useState<CashWithdrawalFormState>(
    DEFAULT_CASH_WITHDRAWAL_FORM_STATE,
  );

  const inputs = useMemo(() => buildCashWithdrawalInputs(formState), [formState]);
  const result = useMemo(
    () => calcCashWithdrawalTax(inputs, formState.fiscalYear),
    [inputs, formState.fiscalYear],
  );
  const isValid = isAmountValid(inputs.dailyWithdrawal);

  const updateField = useCallback(
    <TField extends CashWithdrawalFormField>(
      field: TField,
      value: CashWithdrawalFormState[TField],
    ) => {
      setFormState((current) => ({ ...current, [field]: value }));
    },
    [],
  );

  return { formState, inputs, result, isValid, updateField };
}
