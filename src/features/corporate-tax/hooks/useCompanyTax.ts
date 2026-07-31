'use client';

import { useCallback, useMemo, useState } from 'react';

import { calcCompanyTax } from '@/features/corporate-tax/lib/calculation';
import {
  type CompanyTaxFormField,
  type CompanyTaxFormState,
  DEFAULT_COMPANY_TAX_FORM_STATE,
  parseCorporateNumberInput,
} from '@/features/corporate-tax/lib/input';

export default function useCompanyTax() {
  const [formState, setFormState] = useState<CompanyTaxFormState>(DEFAULT_COMPANY_TAX_FORM_STATE);

  const inputs = useMemo(
    () => ({
      taxableProfit: parseCorporateNumberInput(formState.taxableProfit),
      companyType: formState.companyType,
      taxAlreadyPaid: parseCorporateNumberInput(formState.taxAlreadyPaid),
    }),
    [formState],
  );

  const result = useMemo(
    () => calcCompanyTax(inputs, formState.fiscalYear),
    [inputs, formState.fiscalYear],
  );

  const updateField = useCallback(
    <TField extends CompanyTaxFormField>(field: TField, value: CompanyTaxFormState[TField]) => {
      setFormState((current) => ({ ...current, [field]: value }));
    },
    [],
  );

  return {
    formState,
    result,
    taxableProfit: inputs.taxableProfit,
    isValid: inputs.taxableProfit > 0,
    updateField,
  };
}
