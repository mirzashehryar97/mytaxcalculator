'use client';

import { useCallback, useMemo, useState } from 'react';

import { calcListedSecuritiesTax } from '@/features/capital-gains-tax/lib/calculation';
import {
  buildListedSecuritiesInputs,
  DEFAULT_LISTED_SECURITIES_FORM_STATE,
  isProceedsValid,
} from '@/features/capital-gains-tax/lib/input';
import { getCapitalGainsTaxYearForDate } from '@/features/capital-gains-tax/lib/rates';
import type {
  ListedSecuritiesFormField,
  ListedSecuritiesFormState,
} from '@/features/capital-gains-tax/types';

export default function useListedSecuritiesTax() {
  const [formState, setFormState] = useState<ListedSecuritiesFormState>(
    DEFAULT_LISTED_SECURITIES_FORM_STATE,
  );

  const inputs = useMemo(() => buildListedSecuritiesInputs(formState), [formState]);
  const result = useMemo(() => calcListedSecuritiesTax(inputs), [inputs]);
  const taxYear = useMemo(
    () => getCapitalGainsTaxYearForDate(formState.disposalDate),
    [formState.disposalDate],
  );
  const isValid = isProceedsValid(inputs.saleProceeds);

  const updateField = useCallback(
    <TField extends ListedSecuritiesFormField>(
      field: TField,
      value: ListedSecuritiesFormState[TField],
    ) => {
      setFormState((current) => ({ ...current, [field]: value }));
    },
    [],
  );

  return { formState, inputs, result, taxYear, isValid, updateField };
}
