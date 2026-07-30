import { CheckCircle2, Lock } from 'lucide-react';

import FiscalYearSelect from '@/components/calculator/FiscalYearSelect';
import NumberInput from '@/components/calculator/NumberInput';
import InfoTooltip from '@/components/ui/InfoTooltip';

import PropertyStatusToggle from '@/features/property-tax/components/PropertyStatusToggle';
import {
  PROPERTY_FORM_COPY,
  PROPERTY_PAGE_COPY,
  PROPERTY_TERMS,
} from '@/features/property-tax/lib/content';
import { formatPkr } from '@/features/property-tax/lib/formatting';
import { getPropertyTaxBaseNote } from '@/features/property-tax/lib/presentation';
import {
  PROPERTY_FISCAL_YEARS,
  resolvePropertyFiscalYear,
} from '@/features/property-tax/lib/rates';
import type {
  PropertyTransferFormState,
  PropertyTransferResult,
  UpdatePropertyTransferField,
} from '@/features/property-tax/types';

interface PropertyTransferFormProps {
  mode: 'purchase' | 'sale';
  formState: PropertyTransferFormState;
  result: PropertyTransferResult;
  isValid: boolean;
  updateField: UpdatePropertyTransferField;
}

export default function PropertyTransferForm({
  mode,
  formState,
  result,
  isValid,
  updateField,
}: PropertyTransferFormProps) {
  return (
    <div className="space-y-5">
      <h2 className="border-gray-100 border-b pb-5 font-bold text-gray-900 text-xl">
        {PROPERTY_PAGE_COPY[mode].formTitle}
      </h2>

      <FiscalYearSelect
        id="property-fiscal-year"
        label={PROPERTY_FORM_COPY.fiscalYearLabel}
        years={PROPERTY_FISCAL_YEARS}
        value={formState.fiscalYear}
        onChange={(value) => updateField('fiscalYear', resolvePropertyFiscalYear(value))}
      />

      <NumberInput
        id="property-declared-value"
        label={PROPERTY_FORM_COPY.declaredValueLabel[mode]}
        value={formState.declaredValue}
        onChange={(value) => updateField('declaredValue', value)}
        prefix="Rs."
        helpText={PROPERTY_FORM_COPY.declaredValueHelp}
        placeholder="30000000"
        labelAdornment={
          <InfoTooltip
            label={PROPERTY_TERMS.declaredValue.label}
            text={PROPERTY_TERMS.declaredValue.text}
          />
        }
      />

      <NumberInput
        id="property-fbr-value"
        label={PROPERTY_FORM_COPY.fbrValueLabel}
        value={formState.fbrValue}
        onChange={(value) => updateField('fbrValue', value)}
        prefix="Rs."
        helpText={PROPERTY_FORM_COPY.fbrValueHelp}
        placeholder="30000000"
        labelAdornment={
          <InfoTooltip label={PROPERTY_TERMS.fbrValue.label} text={PROPERTY_TERMS.fbrValue.text} />
        }
      />

      <div className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 font-medium text-emerald-800 text-sm">
            {PROPERTY_FORM_COPY.taxBaseLabel}
            <InfoTooltip label={PROPERTY_TERMS.taxBase.label} text={PROPERTY_TERMS.taxBase.text} />
          </p>
          <p className="amount-wrap mt-1 font-bold text-emerald-900 text-lg tabular-nums">
            {formatPkr(result.taxBase)}
          </p>
          <p className="mt-1 text-emerald-900/70 text-xs leading-relaxed">
            {getPropertyTaxBaseNote(result)}
          </p>
        </div>
      </div>

      <PropertyStatusToggle
        label={PROPERTY_FORM_COPY.statusLabel[mode]}
        status={formState.status}
        hasLateFilerTier={result.hasLateFilerTier}
        onChange={(status) => updateField('status', status)}
        helpText={
          result.hasLateFilerTier
            ? PROPERTY_FORM_COPY.statusHelp
            : `${PROPERTY_FORM_COPY.statusHelp} ${PROPERTY_FORM_COPY.lateFilerRetiredNote}`
        }
      />

      {isValid ? null : (
        <p className="text-red-600 text-sm" role="alert">
          {PROPERTY_FORM_COPY.invalidTransferMessage}
        </p>
      )}

      <p className="flex items-center gap-2 text-gray-500 text-xs leading-relaxed">
        <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {PROPERTY_FORM_COPY.privacyNote}
      </p>
    </div>
  );
}
