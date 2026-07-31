'use client';

import { useCallback, useMemo, useState } from 'react';

import { calcTelecomTax } from '@/features/withholding-tax/lib/calculation';
import {
  buildTelecomInputs,
  DEFAULT_TELECOM_FORM_STATE,
  isAmountValid,
} from '@/features/withholding-tax/lib/input';
import type { TelecomFormField, TelecomFormState } from '@/features/withholding-tax/types';

export default function usePhoneInternetTax() {
  const [formState, setFormState] = useState<TelecomFormState>(DEFAULT_TELECOM_FORM_STATE);

  const inputs = useMemo(() => buildTelecomInputs(formState), [formState]);
  const result = useMemo(
    () => calcTelecomTax(inputs, formState.fiscalYear),
    [inputs, formState.fiscalYear],
  );
  const isValid = isAmountValid(inputs.amount);

  const updateField = useCallback(
    <TField extends TelecomFormField>(field: TField, value: TelecomFormState[TField]) => {
      setFormState((current) => {
        // A landline is always billed monthly, so switching to it drops any
        // prepaid selection rather than leaving a combination that cannot exist.
        const next = { ...current, [field]: value };
        return next.service === 'landline' ? { ...next, payment: 'bill' } : next;
      });
    },
    [],
  );

  return { formState, inputs, result, isValid, updateField };
}
