import { Info } from 'lucide-react';

import FiscalYearSelect from '@/components/calculator/FiscalYearSelect';
import NumberInput from '@/components/calculator/NumberInput';
import SegmentedControl from '@/components/calculator/SegmentedControl';
import InfoTooltip from '@/components/ui/InfoTooltip';

import {
  BUSINESS_FORM_COPY,
  BUSINESS_INCOME_MODE_OPTIONS,
  BUSINESS_PAGE_COPY,
  BUSINESS_TAXPAYER_OPTIONS,
  BUSINESS_TERMS,
} from '@/features/business-tax/lib/content';
import {
  BUSINESS_FISCAL_YEARS,
  resolveBusinessFiscalYear,
} from '@/features/business-tax/lib/rates';
import type {
  BusinessTaxFormState,
  UpdateBusinessTaxFormField,
} from '@/features/business-tax/types';

interface BusinessTaxFormProps {
  formState: BusinessTaxFormState;
  isValid: boolean;
  updateField: UpdateBusinessTaxFormField;
}

export default function BusinessTaxForm({ formState, isValid, updateField }: BusinessTaxFormProps) {
  const isRevenueMode = formState.incomeMode === 'revenue-expenses';

  return (
    <div className="space-y-5">
      <h2 className="border-gray-100 border-b pb-5 font-bold text-gray-900 text-xl">
        {BUSINESS_PAGE_COPY.formTitle}
      </h2>

      <FiscalYearSelect
        id="business-fiscal-year"
        label={BUSINESS_FORM_COPY.fiscalYearLabel}
        years={BUSINESS_FISCAL_YEARS}
        value={formState.fiscalYear}
        onChange={(value) => updateField('fiscalYear', resolveBusinessFiscalYear(value))}
      />

      <SegmentedControl
        label={BUSINESS_FORM_COPY.taxpayerLabel}
        name="business-taxpayer-type"
        options={BUSINESS_TAXPAYER_OPTIONS}
        value={formState.taxpayerType}
        onChange={(value) => updateField('taxpayerType', value)}
      />

      <SegmentedControl
        label={BUSINESS_FORM_COPY.incomeModeLabel}
        name="business-income-mode"
        options={BUSINESS_INCOME_MODE_OPTIONS}
        value={formState.incomeMode}
        onChange={(value) => updateField('incomeMode', value)}
      />

      {isRevenueMode ? (
        <>
          <NumberInput
            id="business-revenue"
            label={BUSINESS_FORM_COPY.revenueLabel}
            value={formState.revenue}
            onChange={(value) => updateField('revenue', value)}
            prefix="Rs."
            placeholder={BUSINESS_FORM_COPY.revenuePlaceholder}
          />
          <NumberInput
            id="business-expenses"
            label={BUSINESS_FORM_COPY.expensesLabel}
            value={formState.expenses}
            onChange={(value) => updateField('expenses', value)}
            prefix="Rs."
            placeholder={BUSINESS_FORM_COPY.expensesPlaceholder}
            labelAdornment={
              <InfoTooltip
                label={BUSINESS_TERMS.allowedExpenses.label}
                text={BUSINESS_TERMS.allowedExpenses.text}
              />
            }
          />
        </>
      ) : (
        <NumberInput
          id="business-net-income"
          label={BUSINESS_FORM_COPY.netIncomeLabel}
          value={formState.netIncome}
          onChange={(value) => updateField('netIncome', value)}
          prefix="Rs."
          helpText={BUSINESS_FORM_COPY.netIncomeHelp}
          placeholder={BUSINESS_FORM_COPY.netIncomePlaceholder}
          labelAdornment={
            <InfoTooltip
              label={BUSINESS_TERMS.taxableIncome.label}
              text={BUSINESS_TERMS.taxableIncome.text}
            />
          }
        />
      )}

      <NumberInput
        id="business-advance-tax"
        label={`${BUSINESS_FORM_COPY.advanceTaxLabel} (${BUSINESS_FORM_COPY.advanceTaxOptional})`}
        value={formState.advanceTaxPaid}
        onChange={(value) => updateField('advanceTaxPaid', value)}
        prefix="Rs."
        helpText={BUSINESS_FORM_COPY.advanceTaxHelp}
        placeholder={BUSINESS_FORM_COPY.advanceTaxPlaceholder}
        labelAdornment={
          <InfoTooltip
            label={BUSINESS_TERMS.advanceTax.label}
            text={BUSINESS_TERMS.advanceTax.text}
          />
        }
      />

      <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-950 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
        <p>{BUSINESS_FORM_COPY.usageNote}</p>
      </div>

      {isValid ? null : (
        <p className="text-red-600 text-sm" role="alert">
          {BUSINESS_FORM_COPY.invalidMessage}
        </p>
      )}
    </div>
  );
}
