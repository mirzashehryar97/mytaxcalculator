'use client';

import { useCallback, useMemo, useState } from 'react';

import { calcPtaTax } from '@/features/pta-tax/lib/calculation';
import {
  buildPtaInputs,
  DEFAULT_PTA_FORM_STATE,
  getOfficialCnfUsd,
  getPtaMissingInput,
  isDeclaredValueUsed,
  isPtaFormValid,
  type PtaFormField,
  type PtaFormState,
} from '@/features/pta-tax/lib/input';
import {
  findUsedPhone,
  getFirstModel,
  getFirstVariant,
  getVariantOptions,
} from '@/features/pta-tax/lib/phoneLookup';

export default function usePtaTax() {
  const [formState, setFormState] = useState<PtaFormState>(DEFAULT_PTA_FORM_STATE);

  const inputs = useMemo(() => buildPtaInputs(formState), [formState]);
  const result = useMemo(
    () => calcPtaTax(inputs, formState.fiscalYear),
    [inputs, formState.fiscalYear],
  );

  const variantOptions = useMemo(
    () => getVariantOptions(formState.brand, formState.model),
    [formState.brand, formState.model],
  );

  /**
   * The same handset in the old-and-used ruling, where it appears there. Shown
   * as context under the used-phone note, never fed into the calculation.
   */
  const usedPhone = useMemo(
    () => (formState.condition === 'used' ? findUsedPhone(formState.brand, formState.model) : null),
    [formState.condition, formState.brand, formState.model],
  );

  /**
   * Changing brand or model invalidates the choices below it, so those are
   * reset in the same update — otherwise a Samsung storage tier survives a
   * switch to Nokia and the lookup silently finds nothing.
   */
  const updateField = useCallback(
    <TField extends PtaFormField>(field: TField, value: PtaFormState[TField]) => {
      setFormState((current) => {
        const next = { ...current, [field]: value };

        if (field === 'brand') {
          next.model = getFirstModel(next.brand);
          next.variant = getFirstVariant(next.brand, next.model);
          next.declaredCnfUsd = '';
        }
        if (field === 'model') {
          next.variant = getFirstVariant(next.brand, next.model);
          next.declaredCnfUsd = '';
        }

        return next;
      });
    },
    [],
  );

  return {
    formState,
    inputs,
    result,
    variantOptions,
    usedPhone,
    officialCnfUsd: getOfficialCnfUsd(formState),
    isDeclaredValueUsed: isDeclaredValueUsed(formState),
    isValid: isPtaFormValid(formState),
    missingInput: getPtaMissingInput(formState),
    updateField,
  };
}
