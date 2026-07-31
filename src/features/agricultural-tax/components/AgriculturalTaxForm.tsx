import { Info } from 'lucide-react';

import FiscalYearSelect from '@/components/calculator/FiscalYearSelect';
import NumberInput from '@/components/calculator/NumberInput';
import SegmentedControl from '@/components/calculator/SegmentedControl';
import SelectInput from '@/components/calculator/SelectInput';
import InfoTooltip from '@/components/ui/InfoTooltip';

import {
  AGRICULTURAL_FORM_COPY,
  AGRICULTURAL_PAGE_COPY,
  AGRICULTURAL_TERMS,
  ORCHARD_IRRIGATION_OPTIONS,
  TAXPAYER_TYPE_OPTIONS,
} from '@/features/agricultural-tax/lib/content';
import {
  type AgriculturalFormState,
  parseAgriculturalNumberInput,
  type UpdateAgriculturalField,
} from '@/features/agricultural-tax/lib/input';
import { AGRICULTURAL_PROVINCE_OPTIONS } from '@/features/agricultural-tax/lib/provinces';
import {
  AGRICULTURAL_FISCAL_YEARS,
  resolveAgriculturalFiscalYear,
  resolveAgriculturalProvince,
} from '@/features/agricultural-tax/lib/rates';

interface AgriculturalTaxFormProps {
  formState: AgriculturalFormState;
  isValid: boolean;
  updateField: UpdateAgriculturalField;
}

export default function AgriculturalTaxForm({
  formState,
  isValid,
  updateField,
}: AgriculturalTaxFormProps) {
  // The irrigation choice only means anything once there is an orchard to price.
  const hasOrchard = parseAgriculturalNumberInput(formState.orchardAcres) > 0;

  return (
    <div className="space-y-5">
      <h2 className="border-gray-100 border-b pb-5 font-bold text-gray-900 text-xl">
        {AGRICULTURAL_PAGE_COPY.formTitle}
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <FiscalYearSelect
          id="agricultural-fiscal-year"
          label={AGRICULTURAL_FORM_COPY.fiscalYearLabel}
          years={AGRICULTURAL_FISCAL_YEARS}
          value={formState.fiscalYear}
          onChange={(value) => updateField('fiscalYear', resolveAgriculturalFiscalYear(value))}
        />

        <SelectInput
          helpText={AGRICULTURAL_FORM_COPY.provinceHelp}
          id="agricultural-province"
          label={AGRICULTURAL_FORM_COPY.provinceLabel}
          onChange={(value) => updateField('province', resolveAgriculturalProvince(value))}
          options={AGRICULTURAL_PROVINCE_OPTIONS}
          value={formState.province}
        />
      </div>

      <SegmentedControl
        label={AGRICULTURAL_FORM_COPY.taxpayerTypeLabel}
        name="agricultural-taxpayer-type"
        options={TAXPAYER_TYPE_OPTIONS}
        value={formState.taxpayerType}
        onChange={(value) => updateField('taxpayerType', value)}
        helpText={AGRICULTURAL_FORM_COPY.taxpayerTypeHelp}
      />

      <NumberInput
        id="agricultural-income"
        label={AGRICULTURAL_FORM_COPY.incomeLabel}
        value={formState.income}
        onChange={(value) => updateField('income', value)}
        prefix="Rs."
        helpText={AGRICULTURAL_FORM_COPY.incomeHelp}
        placeholder={AGRICULTURAL_FORM_COPY.incomePlaceholder}
        labelAdornment={
          <InfoTooltip
            label={AGRICULTURAL_TERMS.farmIncome.label}
            text={AGRICULTURAL_TERMS.farmIncome.text}
          />
        }
      />

      <NumberInput
        id="agricultural-acres"
        label={`${AGRICULTURAL_FORM_COPY.acresLabel} (${AGRICULTURAL_FORM_COPY.acresOptional})`}
        value={formState.acres}
        onChange={(value) => updateField('acres', value)}
        suffix={AGRICULTURAL_FORM_COPY.acresSuffix}
        step="any"
        helpText={AGRICULTURAL_FORM_COPY.acresHelp}
        placeholder={AGRICULTURAL_FORM_COPY.acresPlaceholder}
        labelAdornment={
          <InfoTooltip
            label={AGRICULTURAL_TERMS.cultivatedAcres.label}
            text={AGRICULTURAL_TERMS.cultivatedAcres.text}
          />
        }
      />

      <NumberInput
        id="agricultural-orchard-acres"
        label={`${AGRICULTURAL_FORM_COPY.orchardAcresLabel} (${AGRICULTURAL_FORM_COPY.orchardAcresOptional})`}
        value={formState.orchardAcres}
        onChange={(value) => updateField('orchardAcres', value)}
        suffix={AGRICULTURAL_FORM_COPY.acresSuffix}
        step="any"
        helpText={AGRICULTURAL_FORM_COPY.orchardAcresHelp}
        placeholder={AGRICULTURAL_FORM_COPY.orchardAcresPlaceholder}
        labelAdornment={
          <InfoTooltip
            label={AGRICULTURAL_TERMS.orchardAcres.label}
            text={AGRICULTURAL_TERMS.orchardAcres.text}
          />
        }
      />

      {hasOrchard ? (
        <SegmentedControl
          label={AGRICULTURAL_FORM_COPY.orchardIrrigationLabel}
          name="agricultural-orchard-irrigation"
          options={ORCHARD_IRRIGATION_OPTIONS}
          value={formState.orchardIrrigation}
          onChange={(value) => updateField('orchardIrrigation', value)}
          helpText={AGRICULTURAL_FORM_COPY.orchardIrrigationHelp}
        />
      ) : null}

      <NumberInput
        id="agricultural-tax-already-paid"
        label={`${AGRICULTURAL_FORM_COPY.taxAlreadyPaidLabel} (${AGRICULTURAL_FORM_COPY.taxAlreadyPaidOptional})`}
        value={formState.taxAlreadyPaid}
        onChange={(value) => updateField('taxAlreadyPaid', value)}
        prefix="Rs."
        helpText={AGRICULTURAL_FORM_COPY.taxAlreadyPaidHelp}
        placeholder={AGRICULTURAL_FORM_COPY.taxAlreadyPaidPlaceholder}
        labelAdornment={
          <InfoTooltip
            label={AGRICULTURAL_TERMS.taxAlreadyPaid.label}
            text={AGRICULTURAL_TERMS.taxAlreadyPaid.text}
          />
        }
      />

      <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-950 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
        <p>{AGRICULTURAL_FORM_COPY.usageNote}</p>
      </div>

      {isValid ? null : (
        <p className="text-red-600 text-sm" role="alert">
          {AGRICULTURAL_FORM_COPY.invalidMessage}
        </p>
      )}
    </div>
  );
}
