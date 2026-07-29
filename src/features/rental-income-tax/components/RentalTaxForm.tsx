import { Info } from 'lucide-react';

import FilerToggle from '@/components/calculator/FilerToggle';
import FiscalYearSelect from '@/components/calculator/FiscalYearSelect';
import NumberInput from '@/components/calculator/NumberInput';
import SegmentedControl from '@/components/calculator/SegmentedControl';
import InfoTooltip from '@/components/ui/InfoTooltip';

import { deriveMonthlyRent } from '@/features/rental-income-tax/lib/calculation';
import {
  RENTAL_FORM_COPY,
  RENTAL_OWNER_OPTIONS,
  RENTAL_PAGE_COPY,
  RENTAL_PERIOD_OPTIONS,
  RENTAL_TERMS,
} from '@/features/rental-income-tax/lib/content';
import { formatPkr } from '@/features/rental-income-tax/lib/formatting';
import {
  RENTAL_FISCAL_YEARS,
  resolveRentalFiscalYear,
} from '@/features/rental-income-tax/lib/rates';
import type {
  RentalTaxFormState,
  UpdateRentalTaxFormField,
} from '@/features/rental-income-tax/types';

interface RentalTaxFormProps {
  formState: RentalTaxFormState;
  annualRent: number;
  isValid: boolean;
  updateField: UpdateRentalTaxFormField;
}

export default function RentalTaxForm({
  formState,
  annualRent,
  isValid,
  updateField,
}: RentalTaxFormProps) {
  const isMonthly = formState.rentPeriod === 'monthly';

  return (
    <div className="space-y-5">
      <h2 className="border-gray-100 border-b pb-5 font-bold text-gray-900 text-xl">
        {RENTAL_PAGE_COPY.formTitle}
      </h2>

      <FiscalYearSelect
        id="rental-fiscal-year"
        label={RENTAL_FORM_COPY.fiscalYearLabel}
        years={RENTAL_FISCAL_YEARS}
        value={formState.fiscalYear}
        onChange={(value) => updateField('fiscalYear', resolveRentalFiscalYear(value))}
      />

      <SegmentedControl
        label={RENTAL_FORM_COPY.rentPeriodLabel}
        name="rental-period"
        options={RENTAL_PERIOD_OPTIONS}
        value={formState.rentPeriod}
        onChange={(value) => updateField('rentPeriod', value)}
      />

      {isMonthly ? (
        <NumberInput
          id="rental-monthly-rent"
          label={RENTAL_FORM_COPY.monthlyRentLabel}
          value={formState.monthlyRent}
          onChange={(value) => updateField('monthlyRent', value)}
          prefix="Rs."
          helpText={RENTAL_FORM_COPY.monthlyRentHelp}
          placeholder={RENTAL_FORM_COPY.monthlyRentPlaceholder}
          labelAdornment={
            <InfoTooltip label={RENTAL_TERMS.grossRent.label} text={RENTAL_TERMS.grossRent.text} />
          }
        />
      ) : (
        <NumberInput
          id="rental-annual-rent"
          label={RENTAL_FORM_COPY.annualRentLabel}
          value={formState.annualRent}
          onChange={(value) => updateField('annualRent', value)}
          prefix="Rs."
          helpText={RENTAL_FORM_COPY.annualRentHelp}
          placeholder={RENTAL_FORM_COPY.annualRentPlaceholder}
          labelAdornment={
            <InfoTooltip label={RENTAL_TERMS.grossRent.label} text={RENTAL_TERMS.grossRent.text} />
          }
        />
      )}

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <p className="font-medium text-gray-600 text-sm">
          {isMonthly ? RENTAL_FORM_COPY.derivedAnnualLabel : RENTAL_FORM_COPY.derivedMonthlyLabel}
        </p>
        <p className="amount-wrap mt-1 font-bold text-gray-900 text-lg tabular-nums">
          {formatPkr(isMonthly ? annualRent : deriveMonthlyRent(annualRent))}
        </p>
        <p className="mt-1 text-gray-500 text-xs leading-relaxed">
          {isMonthly ? RENTAL_FORM_COPY.derivedAnnualHelp : RENTAL_FORM_COPY.derivedMonthlyHelp}
        </p>
      </div>

      <SegmentedControl
        label={RENTAL_FORM_COPY.ownerLabel}
        name="rental-owner-type"
        options={RENTAL_OWNER_OPTIONS}
        value={formState.ownerType}
        onChange={(value) => updateField('ownerType', value)}
      />

      <FilerToggle
        label={RENTAL_FORM_COPY.filerLabel}
        filer={formState.filer}
        onChange={(filer) => updateField('filer', filer)}
        description={RENTAL_FORM_COPY.filerHelp}
      />

      <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-950 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
        <p>{RENTAL_FORM_COPY.payerNote}</p>
      </div>

      {isValid ? null : (
        <p className="text-red-600 text-sm" role="alert">
          {RENTAL_FORM_COPY.invalidMessage}
        </p>
      )}
    </div>
  );
}
