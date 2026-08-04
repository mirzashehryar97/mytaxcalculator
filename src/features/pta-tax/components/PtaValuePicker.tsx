import { BadgeCheck } from 'lucide-react';

import NumberInput from '@/components/calculator/NumberInput';
import SelectInput from '@/components/calculator/SelectInput';
import type { SelectOption } from '@/components/calculator/select';
import InfoTooltip from '@/components/ui/InfoTooltip';

import { PTA_FORM_COPY, PTA_TERMS } from '@/features/pta-tax/lib/content';
import { formatUsd } from '@/features/pta-tax/lib/formatting';
import type { PtaFormState, UpdatePtaField } from '@/features/pta-tax/lib/input';
import { getModelOptions, PTA_BRAND_OPTIONS } from '@/features/pta-tax/lib/phoneLookup';

interface PtaValuePickerProps {
  formState: PtaFormState;
  /** Storage tiers for the chosen model; empty where the ruling prices none. */
  variantOptions: readonly SelectOption<string>[];
  /** The published C&F value, or null when no ruling covers the handset. */
  officialCnfUsd: number | null;
  updateField: UpdatePtaField;
}

/**
 * Brand → model → storage, then the value those three resolve to. The storage
 * field is absent rather than disabled when a model has only one listed
 * configuration, because a dropdown holding a single choice asks a question
 * the ruling never posed.
 */
export default function PtaValuePicker({
  formState,
  variantOptions,
  officialCnfUsd,
  updateField,
}: PtaValuePickerProps) {
  if (formState.valueSource === 'manual') {
    return (
      <NumberInput
        id="pta-manual-cnf"
        label={PTA_FORM_COPY.manualValueLabel}
        value={formState.manualCnfUsd}
        onChange={(value) => updateField('manualCnfUsd', value)}
        prefix="US$"
        placeholder={PTA_FORM_COPY.manualValuePlaceholder}
        helpText={PTA_FORM_COPY.manualValueHelp}
        labelAdornment={
          <InfoTooltip label={PTA_TERMS.cnfValue.label} text={PTA_TERMS.cnfValue.text} />
        }
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectInput
          id="pta-brand"
          label={PTA_FORM_COPY.brandLabel}
          onChange={(value) => updateField('brand', value)}
          options={PTA_BRAND_OPTIONS}
          value={formState.brand}
        />

        <SelectInput
          id="pta-model"
          label={PTA_FORM_COPY.modelLabel}
          onChange={(value) => updateField('model', value)}
          options={getModelOptions(formState.brand)}
          searchPlaceholder={PTA_FORM_COPY.modelSearchPlaceholder}
          searchable={true}
          value={formState.model}
        />
      </div>

      {variantOptions.length > 0 ? (
        <SelectInput
          id="pta-variant"
          label={PTA_FORM_COPY.variantLabel}
          onChange={(value) => updateField('variant', value)}
          options={variantOptions}
          value={formState.variant}
        />
      ) : null}

      {officialCnfUsd === null ? null : (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <span className="inline-flex min-w-0 items-center gap-2 font-medium text-emerald-800 text-sm">
            <BadgeCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
            {PTA_FORM_COPY.officialValueBadge}
            <InfoTooltip label={PTA_TERMS.cnfValue.label} text={PTA_TERMS.cnfValue.text} />
          </span>
          <strong className="amount-wrap font-bold text-emerald-900 text-lg tabular-nums">
            {formatUsd(officialCnfUsd)}
          </strong>
        </div>
      )}

      <NumberInput
        id="pta-declared-cnf"
        label={PTA_FORM_COPY.declaredValueLabel}
        value={formState.declaredCnfUsd}
        onChange={(value) => updateField('declaredCnfUsd', value)}
        prefix="US$"
        placeholder={PTA_FORM_COPY.declaredValuePlaceholder}
        helpText={PTA_FORM_COPY.declaredValueHelp}
        labelAdornment={
          <InfoTooltip label={PTA_TERMS.declaredValue.label} text={PTA_TERMS.declaredValue.text} />
        }
      />
    </div>
  );
}
