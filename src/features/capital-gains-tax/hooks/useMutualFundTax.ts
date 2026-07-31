'use client';

import { useCallback, useMemo, useState } from 'react';

import { calcMutualFundTax } from '@/features/capital-gains-tax/lib/calculation';
import {
  buildMutualFundInputs,
  DEFAULT_MUTUAL_FUND_FORM_STATE,
  isProceedsValid,
} from '@/features/capital-gains-tax/lib/input';
import { getCapitalGainsTaxYearForDate } from '@/features/capital-gains-tax/lib/rates';
import type { MutualFundFormField, MutualFundFormState } from '@/features/capital-gains-tax/types';

export default function useMutualFundTax() {
  const [formState, setFormState] = useState<MutualFundFormState>(DEFAULT_MUTUAL_FUND_FORM_STATE);

  const inputs = useMemo(() => buildMutualFundInputs(formState), [formState]);
  const result = useMemo(() => calcMutualFundTax(inputs), [inputs]);
  const taxYear = useMemo(
    () => getCapitalGainsTaxYearForDate(formState.redemptionDate),
    [formState.redemptionDate],
  );
  const isValid = isProceedsValid(inputs.redemptionProceeds);

  const updateField = useCallback(
    <TField extends MutualFundFormField>(field: TField, value: MutualFundFormState[TField]) => {
      setFormState((current) => ({ ...current, [field]: value }));
    },
    [],
  );

  return { formState, inputs, result, taxYear, isValid, updateField };
}
