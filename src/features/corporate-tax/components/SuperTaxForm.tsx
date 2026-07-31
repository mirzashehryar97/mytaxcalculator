import { Info } from 'lucide-react';

import FiscalYearSelect from '@/components/calculator/FiscalYearSelect';
import NumberInput from '@/components/calculator/NumberInput';
import SelectInput from '@/components/calculator/SelectInput';
import SwitchToggle from '@/components/calculator/SwitchToggle';
import InfoTooltip from '@/components/ui/InfoTooltip';

import { CORPORATE_TERMS } from '@/features/corporate-tax/lib/content';
import type { SuperTaxFormState, UpdateSuperTaxField } from '@/features/corporate-tax/lib/input';
import { CORPORATE_PAGE_COPY } from '@/features/corporate-tax/lib/modeContent';
import {
  getSuperTaxpayerDescription,
  resolveSuperTaxpayerType,
} from '@/features/corporate-tax/lib/presentation';
import {
  CORPORATE_FISCAL_YEARS,
  hasSuperTaxExportExemption,
  resolveCorporateFiscalYear,
} from '@/features/corporate-tax/lib/rates';
import {
  SUPER_TAX_FORM_COPY,
  SUPER_TAXPAYER_OPTIONS,
} from '@/features/corporate-tax/lib/superTaxContent';

interface SuperTaxFormProps {
  formState: SuperTaxFormState;
  isValid: boolean;
  updateField: UpdateSuperTaxField;
}

export default function SuperTaxForm({ formState, isValid, updateField }: SuperTaxFormProps) {
  // The export exemption only exists from 2026-27, so the toggle is hidden in
  // years where offering it would let the user state something the law did not.
  const showExportExemption = hasSuperTaxExportExemption(formState.fiscalYear);

  return (
    <div className="space-y-5">
      <h2 className="border-gray-100 border-b pb-5 font-bold text-gray-900 text-xl">
        {CORPORATE_PAGE_COPY['super-tax'].formTitle}
      </h2>

      <FiscalYearSelect
        id="super-tax-year"
        label={SUPER_TAX_FORM_COPY.fiscalYearLabel}
        years={CORPORATE_FISCAL_YEARS}
        value={formState.fiscalYear}
        onChange={(value) => updateField('fiscalYear', resolveCorporateFiscalYear(value))}
      />

      {/* A dropdown rather than a segmented control: four options with labels this
          long would be unreadable squeezed into one row on a narrow screen. */}
      <SelectInput
        helpText={getSuperTaxpayerDescription(formState.taxpayerType)}
        id="super-taxpayer-type"
        label={SUPER_TAX_FORM_COPY.taxpayerLabel}
        onChange={(value) => updateField('taxpayerType', resolveSuperTaxpayerType(value))}
        options={SUPER_TAXPAYER_OPTIONS}
        value={formState.taxpayerType}
      />

      <NumberInput
        id="super-tax-income"
        label={SUPER_TAX_FORM_COPY.incomeLabel}
        value={formState.income}
        onChange={(value) => updateField('income', value)}
        prefix="Rs."
        helpText={SUPER_TAX_FORM_COPY.incomeHelp}
        placeholder={SUPER_TAX_FORM_COPY.incomePlaceholder}
        labelAdornment={
          <InfoTooltip
            label={CORPORATE_TERMS.superTaxIncome.label}
            text={CORPORATE_TERMS.superTaxIncome.text}
          />
        }
      />

      {showExportExemption ? (
        <SwitchToggle
          id="super-tax-export-exempt"
          label={SUPER_TAX_FORM_COPY.exportExemptLabel}
          checked={formState.isExportExempt}
          onChange={(checked) => updateField('isExportExempt', checked)}
          description={SUPER_TAX_FORM_COPY.exportExemptDescription}
        />
      ) : null}

      <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-950 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
        <p>{SUPER_TAX_FORM_COPY.usageNote}</p>
      </div>

      {isValid ? null : (
        <p className="text-red-600 text-sm" role="alert">
          {SUPER_TAX_FORM_COPY.invalidMessage}
        </p>
      )}
    </div>
  );
}
