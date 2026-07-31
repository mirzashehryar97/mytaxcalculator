import { Info } from 'lucide-react';

import FiscalYearSelect from '@/components/calculator/FiscalYearSelect';
import NumberInput from '@/components/calculator/NumberInput';
import SegmentedControl from '@/components/calculator/SegmentedControl';
import SelectInput from '@/components/calculator/SelectInput';
import InfoTooltip from '@/components/ui/InfoTooltip';

import { CORPORATE_TERMS } from '@/features/corporate-tax/lib/content';
import type {
  MinimumTaxFormState,
  UpdateMinimumTaxField,
} from '@/features/corporate-tax/lib/input';
import {
  MINIMUM_TAX_FORM_COPY,
  MINIMUM_TAX_SECTOR_OPTIONS,
  MINIMUM_TAXPAYER_OPTIONS,
} from '@/features/corporate-tax/lib/minimumTaxContent';
import { CORPORATE_PAGE_COPY } from '@/features/corporate-tax/lib/modeContent';
import {
  getMinimumTaxSectorDescription,
  resolveMinimumTaxSector,
} from '@/features/corporate-tax/lib/presentation';
import {
  CORPORATE_FISCAL_YEARS,
  resolveCorporateFiscalYear,
} from '@/features/corporate-tax/lib/rates';

interface MinimumTurnoverTaxFormProps {
  formState: MinimumTaxFormState;
  isValid: boolean;
  updateField: UpdateMinimumTaxField;
}

export default function MinimumTurnoverTaxForm({
  formState,
  isValid,
  updateField,
}: MinimumTurnoverTaxFormProps) {
  return (
    <div className="space-y-5">
      <h2 className="border-gray-100 border-b pb-5 font-bold text-gray-900 text-xl">
        {CORPORATE_PAGE_COPY['minimum-tax'].formTitle}
      </h2>

      <FiscalYearSelect
        id="minimum-tax-year"
        label={MINIMUM_TAX_FORM_COPY.fiscalYearLabel}
        years={CORPORATE_FISCAL_YEARS}
        value={formState.fiscalYear}
        onChange={(value) => updateField('fiscalYear', resolveCorporateFiscalYear(value))}
      />

      <SegmentedControl
        label={MINIMUM_TAX_FORM_COPY.taxpayerLabel}
        name="minimum-taxpayer-type"
        options={MINIMUM_TAXPAYER_OPTIONS}
        value={formState.taxpayerType}
        onChange={(value) => updateField('taxpayerType', value)}
      />

      <NumberInput
        id="minimum-tax-turnover"
        label={MINIMUM_TAX_FORM_COPY.turnoverLabel}
        value={formState.turnover}
        onChange={(value) => updateField('turnover', value)}
        prefix="Rs."
        helpText={MINIMUM_TAX_FORM_COPY.turnoverHelp}
        placeholder={MINIMUM_TAX_FORM_COPY.turnoverPlaceholder}
        labelAdornment={
          <InfoTooltip
            label={CORPORATE_TERMS.turnover.label}
            text={CORPORATE_TERMS.turnover.text}
          />
        }
      />

      <SelectInput
        helpText={getMinimumTaxSectorDescription(formState.sector)}
        id="minimum-tax-sector"
        label={MINIMUM_TAX_FORM_COPY.sectorLabel}
        onChange={(value) => updateField('sector', resolveMinimumTaxSector(value))}
        options={MINIMUM_TAX_SECTOR_OPTIONS}
        value={formState.sector}
      />

      <NumberInput
        id="minimum-tax-normal-tax"
        label={`${MINIMUM_TAX_FORM_COPY.normalTaxLabel} (${MINIMUM_TAX_FORM_COPY.normalTaxOptional})`}
        value={formState.normalTax}
        onChange={(value) => updateField('normalTax', value)}
        prefix="Rs."
        helpText={MINIMUM_TAX_FORM_COPY.normalTaxHelp}
        placeholder={MINIMUM_TAX_FORM_COPY.normalTaxPlaceholder}
        labelAdornment={
          <InfoTooltip
            label={CORPORATE_TERMS.normalTax.label}
            text={CORPORATE_TERMS.normalTax.text}
          />
        }
      />

      <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-950 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
        <p>{MINIMUM_TAX_FORM_COPY.usageNote}</p>
      </div>

      {isValid ? null : (
        <p className="text-red-600 text-sm" role="alert">
          {MINIMUM_TAX_FORM_COPY.invalidMessage}
        </p>
      )}
    </div>
  );
}
