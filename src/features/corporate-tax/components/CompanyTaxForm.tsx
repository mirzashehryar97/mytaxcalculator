import { Info } from 'lucide-react';

import FiscalYearSelect from '@/components/calculator/FiscalYearSelect';
import NumberInput from '@/components/calculator/NumberInput';
import SegmentedControl from '@/components/calculator/SegmentedControl';
import InfoTooltip from '@/components/ui/InfoTooltip';

import {
  COMPANY_TAX_FORM_COPY,
  COMPANY_TYPE_OPTIONS,
} from '@/features/corporate-tax/lib/companyTaxContent';
import { CORPORATE_TERMS } from '@/features/corporate-tax/lib/content';
import type {
  CompanyTaxFormState,
  UpdateCompanyTaxField,
} from '@/features/corporate-tax/lib/input';
import { CORPORATE_PAGE_COPY } from '@/features/corporate-tax/lib/modeContent';
import {
  CORPORATE_FISCAL_YEARS,
  resolveCorporateFiscalYear,
} from '@/features/corporate-tax/lib/rates';

interface CompanyTaxFormProps {
  formState: CompanyTaxFormState;
  isValid: boolean;
  updateField: UpdateCompanyTaxField;
}

export default function CompanyTaxForm({ formState, isValid, updateField }: CompanyTaxFormProps) {
  return (
    <div className="space-y-5">
      <h2 className="border-gray-100 border-b pb-5 font-bold text-gray-900 text-xl">
        {CORPORATE_PAGE_COPY['company-tax'].formTitle}
      </h2>

      <FiscalYearSelect
        id="company-tax-year"
        label={COMPANY_TAX_FORM_COPY.fiscalYearLabel}
        years={CORPORATE_FISCAL_YEARS}
        value={formState.fiscalYear}
        onChange={(value) => updateField('fiscalYear', resolveCorporateFiscalYear(value))}
      />

      <SegmentedControl
        label={COMPANY_TAX_FORM_COPY.companyTypeLabel}
        name="company-type"
        options={COMPANY_TYPE_OPTIONS}
        value={formState.companyType}
        onChange={(value) => updateField('companyType', value)}
        helpText={COMPANY_TAX_FORM_COPY.companyTypeHelp}
      />

      <NumberInput
        id="company-taxable-profit"
        label={COMPANY_TAX_FORM_COPY.taxableProfitLabel}
        value={formState.taxableProfit}
        onChange={(value) => updateField('taxableProfit', value)}
        prefix="Rs."
        helpText={COMPANY_TAX_FORM_COPY.taxableProfitHelp}
        placeholder={COMPANY_TAX_FORM_COPY.taxableProfitPlaceholder}
        labelAdornment={
          <InfoTooltip
            label={CORPORATE_TERMS.taxableProfit.label}
            text={CORPORATE_TERMS.taxableProfit.text}
          />
        }
      />

      <NumberInput
        id="company-tax-already-paid"
        label={`${COMPANY_TAX_FORM_COPY.taxAlreadyPaidLabel} (${COMPANY_TAX_FORM_COPY.taxAlreadyPaidOptional})`}
        value={formState.taxAlreadyPaid}
        onChange={(value) => updateField('taxAlreadyPaid', value)}
        prefix="Rs."
        helpText={COMPANY_TAX_FORM_COPY.taxAlreadyPaidHelp}
        placeholder={COMPANY_TAX_FORM_COPY.taxAlreadyPaidPlaceholder}
        labelAdornment={
          <InfoTooltip
            label={CORPORATE_TERMS.taxAlreadyPaid.label}
            text={CORPORATE_TERMS.taxAlreadyPaid.text}
          />
        }
      />

      <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-950 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
        <p>{COMPANY_TAX_FORM_COPY.usageNote}</p>
      </div>

      {isValid ? null : (
        <p className="text-red-600 text-sm" role="alert">
          {COMPANY_TAX_FORM_COPY.invalidMessage}
        </p>
      )}
    </div>
  );
}
