import { Lock } from 'lucide-react';

import DateInput from '@/components/calculator/DateInput';
import NumberInput from '@/components/calculator/NumberInput';
import SegmentedControl from '@/components/calculator/SegmentedControl';
import InfoTooltip from '@/components/ui/InfoTooltip';

import PropertyStatusToggle from '@/features/property-tax/components/PropertyStatusToggle';
import PropertyTaxYearNotice from '@/features/property-tax/components/PropertyTaxYearNotice';
import {
  PROPERTY_FORM_COPY,
  PROPERTY_PAGE_COPY,
  PROPERTY_TERMS,
  PROPERTY_TYPE_OPTIONS,
} from '@/features/property-tax/lib/content';
import { getPropertyTaxYearNotice } from '@/features/property-tax/lib/presentation';
import { hasLateFilerTier } from '@/features/property-tax/lib/rates';
import type {
  PropertyCapitalGainsFormState,
  PropertyCapitalGainsResult,
  PropertyTaxYearResolution,
  UpdatePropertyCapitalGainsField,
} from '@/features/property-tax/types';

interface PropertyCapitalGainsFormProps {
  formState: PropertyCapitalGainsFormState;
  /** Tax year read off the sale date — shown, not selected. */
  taxYear: PropertyTaxYearResolution;
  result: PropertyCapitalGainsResult;
  isValid: boolean;
  updateField: UpdatePropertyCapitalGainsField;
}

export default function PropertyCapitalGainsForm({
  formState,
  taxYear,
  result,
  isValid,
  updateField,
}: PropertyCapitalGainsFormProps) {
  const propertyTypeIsIgnored = result.regime === 'flat-15';
  const taxYearNotice = getPropertyTaxYearNotice(taxYear, formState.saleDate);

  return (
    <div className="space-y-5">
      <h2 className="border-gray-100 border-b pb-5 font-bold text-gray-900 text-xl">
        {PROPERTY_PAGE_COPY['capital-gains'].formTitle}
      </h2>

      <NumberInput
        id="property-purchase-price"
        label={PROPERTY_FORM_COPY.purchasePriceLabel}
        value={formState.purchasePrice}
        onChange={(value) => updateField('purchasePrice', value)}
        prefix="Rs."
        helpText={PROPERTY_FORM_COPY.purchasePriceHelp}
        placeholder="20000000"
      />

      <NumberInput
        id="property-sale-price"
        label={PROPERTY_FORM_COPY.salePriceLabel}
        value={formState.salePrice}
        onChange={(value) => updateField('salePrice', value)}
        prefix="Rs."
        helpText={PROPERTY_FORM_COPY.salePriceHelp}
        placeholder="30000000"
        labelAdornment={
          <InfoTooltip
            label={PROPERTY_TERMS.capitalGain.label}
            text={PROPERTY_TERMS.capitalGain.text}
          />
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <DateInput
          id="property-purchase-date"
          label={PROPERTY_FORM_COPY.purchaseDateLabel}
          value={formState.purchaseDate}
          onChange={(value) => updateField('purchaseDate', value)}
          max={formState.saleDate || undefined}
          helpText={PROPERTY_FORM_COPY.purchaseDateHelp}
          labelAdornment={
            <InfoTooltip
              label={PROPERTY_TERMS.holdingPeriod.label}
              text={PROPERTY_TERMS.holdingPeriod.text}
            />
          }
        />
        <DateInput
          id="property-sale-date"
          label={PROPERTY_FORM_COPY.saleDateLabel}
          value={formState.saleDate}
          onChange={(value) => updateField('saleDate', value)}
          min={formState.purchaseDate || undefined}
          helpText={PROPERTY_FORM_COPY.saleDateHelp}
        />
      </div>

      <PropertyTaxYearNotice notice={taxYearNotice} />

      <SegmentedControl
        label={PROPERTY_FORM_COPY.propertyTypeLabel}
        name="property-type"
        options={PROPERTY_TYPE_OPTIONS}
        value={formState.propertyType}
        onChange={(value) => updateField('propertyType', value)}
        helpText={
          propertyTypeIsIgnored
            ? 'Not used here — you bought on or after 1 July 2024, where one rate covers every property type.'
            : PROPERTY_FORM_COPY.propertyTypeHelp
        }
      />

      <PropertyStatusToggle
        label={PROPERTY_FORM_COPY.statusLabel['capital-gains']}
        status={formState.status}
        hasLateFilerTier={hasLateFilerTier('sale', taxYear.fiscalYear)}
        onChange={(status) => updateField('status', status)}
        helpText={PROPERTY_FORM_COPY.statusHelp}
      />

      {isValid ? null : (
        <p className="text-red-600 text-sm" role="alert">
          {PROPERTY_FORM_COPY.invalidCapitalGainsMessage}
        </p>
      )}

      {isValid && !result.datesAreValid ? (
        <p className="text-red-600 text-sm" role="alert">
          {PROPERTY_FORM_COPY.invalidDatesMessage}
        </p>
      ) : null}

      <p className="flex items-center gap-2 text-gray-500 text-xs leading-relaxed">
        <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {PROPERTY_FORM_COPY.privacyNote}
      </p>
    </div>
  );
}
