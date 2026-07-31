'use client';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import CompanyTaxForm from '@/features/corporate-tax/components/CompanyTaxForm';
import CompanyTaxResultSummary from '@/features/corporate-tax/components/CompanyTaxResultSummary';
import CorporateModeSwitchCards from '@/features/corporate-tax/components/CorporateModeSwitchCards';
import CorporateModeTabs from '@/features/corporate-tax/components/CorporateModeTabs';
import CorporateYearComparison from '@/features/corporate-tax/components/CorporateYearComparison';
import useCompanyTax from '@/features/corporate-tax/hooks/useCompanyTax';
import useCorporateAnalytics from '@/features/corporate-tax/hooks/useCorporateAnalytics';
import { buildCompanyTaxUseParameters } from '@/features/corporate-tax/lib/analytics';
import { COMPANY_TAX_RESULT_COPY } from '@/features/corporate-tax/lib/companyTaxContent';
import { CORPORATE_PAGE_COPY } from '@/features/corporate-tax/lib/modeContent';
import { buildCompanyTaxYearComparison } from '@/features/corporate-tax/lib/presentation';

export default function CompanyTaxCalculator() {
  const { formState, result, taxableProfit, isValid, updateField } = useCompanyTax();
  useCorporateAnalytics('company-tax', formState, isValid, buildCompanyTaxUseParameters);

  return (
    <CalculatorLayout
      ariaLabel={CORPORATE_PAGE_COPY['company-tax'].title}
      header={<CorporateModeTabs activeMode="company-tax" />}
      form={<CompanyTaxForm formState={formState} isValid={isValid} updateField={updateField} />}
      result={<CompanyTaxResultSummary result={result} />}
    >
      <CorporateYearComparison
        title={COMPANY_TAX_RESULT_COPY.yearComparisonTitle}
        description={COMPANY_TAX_RESULT_COPY.yearComparisonHelp}
        rows={buildCompanyTaxYearComparison(taxableProfit, formState.companyType)}
      />
      <CorporateModeSwitchCards activeMode="company-tax" />
    </CalculatorLayout>
  );
}
