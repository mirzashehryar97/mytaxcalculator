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
  getFirstBrand,
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
    () => getVariantOptions(formState.deviceKind, formState.brand, formState.model),
    [formState.deviceKind, formState.brand, formState.model],
  );

  /**
   * The same handset in the old-and-used ruling, where it appears there. Shown
   * as context under the used-phone note, never fed into the calculation.
   *
   * Only in model mode: `brand` and `model` keep their defaults while a value is
   * being typed in by hand, so without the check a visitor who never touched the
   * picker is shown a bulk-import figure for a phone they did not name.
   */
  const usedPhone = useMemo(
    () =>
      formState.condition === 'used' && formState.valueSource === 'model'
        ? findUsedPhone(formState.deviceKind, formState.brand, formState.model)
        : null,
    [
      formState.condition,
      formState.valueSource,
      formState.deviceKind,
      formState.brand,
      formState.model,
    ],
  );

  /**
   * Changing device class, brand or model invalidates the choices below it, so
   * those are reset in the same update. A brand is preserved across classes
   * only when the filtered catalogue contains it in both.
   */
  const updateField = useCallback(
    <TField extends PtaFormField>(field: TField, value: PtaFormState[TField]) => {
      setFormState((current) => {
        const next = { ...current, [field]: value };

        if (field === 'brand') {
          next.model = getFirstModel(next.deviceKind, next.brand);
          next.variant = getFirstVariant(next.deviceKind, next.brand, next.model);
          next.declaredCnfUsd = '';
        }
        if (field === 'model') {
          next.variant = getFirstVariant(next.deviceKind, next.brand, next.model);
          next.declaredCnfUsd = '';
        }
        if (field === 'deviceKind') {
          next.brand = getFirstBrand(next.deviceKind, next.brand);
          next.model = getFirstModel(next.deviceKind, next.brand);
          next.variant = getFirstVariant(next.deviceKind, next.brand, next.model);
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
