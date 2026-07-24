import FilerToggle from '@/components/calculator/FilerToggle';
import FiscalYearSelect from '@/components/calculator/FiscalYearSelect';
import NumberInput from '@/components/calculator/NumberInput';
import SegmentedControl from '@/components/calculator/SegmentedControl';

import {
  FREELANCER_CURRENCY_OPTIONS,
  FREELANCER_FORM_COPY,
  FREELANCER_PAGE_COPY,
  FREELANCER_PSEB_OPTIONS,
} from '@/features/freelancer-tax/lib/content';
import { getFreelancerCurrencyPrefix } from '@/features/freelancer-tax/lib/input';
import {
  FREELANCER_FISCAL_YEARS,
  resolveFreelancerFiscalYear,
} from '@/features/freelancer-tax/lib/rates';
import type {
  FreelancerTaxFormState,
  UpdateFreelancerTaxFormField,
} from '@/features/freelancer-tax/types';

interface FreelancerTaxFormProps {
  formState: FreelancerTaxFormState;
  isValid: boolean;
  updateField: UpdateFreelancerTaxFormField;
}

export default function FreelancerTaxForm({
  formState,
  isValid,
  updateField,
}: FreelancerTaxFormProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 border-gray-100 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-bold text-gray-900 text-xl">{FREELANCER_PAGE_COPY.formTitle}</h2>
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-500 text-xs">
            {FREELANCER_FORM_COPY.fiscalYearLabel}
          </span>
          <FiscalYearSelect
            id="freelancer-fiscal-year"
            label={FREELANCER_FORM_COPY.fiscalYearLabel}
            years={FREELANCER_FISCAL_YEARS}
            value={formState.fiscalYear}
            onChange={(value) => updateField('fiscalYear', resolveFreelancerFiscalYear(value))}
            compact
          />
        </div>
      </div>

      <SegmentedControl
        label={FREELANCER_FORM_COPY.currencyLabel}
        name="freelancer-currency"
        options={FREELANCER_CURRENCY_OPTIONS}
        value={formState.currency}
        onChange={(value) => updateField('currency', value)}
      />

      <FilerToggle
        label={FREELANCER_FORM_COPY.atlLabel}
        filer={formState.atl}
        onChange={(filer) => updateField('atl', filer)}
        description={FREELANCER_FORM_COPY.atlDescription}
      />

      <SegmentedControl
        label={FREELANCER_FORM_COPY.psebLabel}
        name="freelancer-pseb-status"
        options={FREELANCER_PSEB_OPTIONS}
        value={formState.psebRegistered ? 'registered' : 'not-registered'}
        onChange={(value) => updateField('psebRegistered', value === 'registered')}
        helpText={FREELANCER_FORM_COPY.psebDescription}
      />

      <NumberInput
        id="freelancer-export-receipts"
        label={FREELANCER_FORM_COPY.monthlyAmountLabel}
        value={formState.amount}
        onChange={(value) => updateField('amount', value)}
        prefix={getFreelancerCurrencyPrefix(formState.currency)}
        helpText={FREELANCER_FORM_COPY.amountHelp}
        placeholder={FREELANCER_FORM_COPY.amountPlaceholder}
      />

      {formState.currency === 'USD' ? (
        <NumberInput
          id="freelancer-exchange-rate"
          label={FREELANCER_FORM_COPY.exchangeRateLabel}
          value={formState.exchangeRate}
          onChange={(value) => updateField('exchangeRate', value)}
          prefix="Rs."
          suffix={FREELANCER_FORM_COPY.exchangeRateSuffix}
          helpText={FREELANCER_PAGE_COPY.exchangeRateNote}
          placeholder={FREELANCER_FORM_COPY.exchangeRatePlaceholder}
        />
      ) : null}

      {isValid ? null : (
        <p className="text-red-600 text-sm" role="alert">
          {FREELANCER_FORM_COPY.invalidMessage}
        </p>
      )}
    </div>
  );
}
