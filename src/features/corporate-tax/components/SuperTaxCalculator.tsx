'use client';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import CorporateModeSwitchCards from '@/features/corporate-tax/components/CorporateModeSwitchCards';
import CorporateModeTabs from '@/features/corporate-tax/components/CorporateModeTabs';
import CorporateYearComparison from '@/features/corporate-tax/components/CorporateYearComparison';
import SuperTaxForm from '@/features/corporate-tax/components/SuperTaxForm';
import SuperTaxResultSummary from '@/features/corporate-tax/components/SuperTaxResultSummary';
import useCorporateAnalytics from '@/features/corporate-tax/hooks/useCorporateAnalytics';
import useSuperTax from '@/features/corporate-tax/hooks/useSuperTax';
import { buildSuperTaxUseParameters } from '@/features/corporate-tax/lib/analytics';
import { CORPORATE_PAGE_COPY } from '@/features/corporate-tax/lib/modeContent';
import { buildSuperTaxYearComparison } from '@/features/corporate-tax/lib/presentation';
import { SUPER_TAX_RESULT_COPY } from '@/features/corporate-tax/lib/superTaxContent';

export default function SuperTaxCalculator() {
  const { formState, result, income, isValid, updateField } = useSuperTax();
  useCorporateAnalytics('super-tax', formState, isValid, buildSuperTaxUseParameters);

  return (
    <CalculatorLayout
      ariaLabel={CORPORATE_PAGE_COPY['super-tax'].title}
      header={<CorporateModeTabs activeMode="super-tax" />}
      form={<SuperTaxForm formState={formState} isValid={isValid} updateField={updateField} />}
      result={<SuperTaxResultSummary result={result} />}
    >
      <CorporateYearComparison
        title={SUPER_TAX_RESULT_COPY.yearComparisonTitle}
        description={SUPER_TAX_RESULT_COPY.yearComparisonHelp}
        rows={buildSuperTaxYearComparison(income, formState.taxpayerType)}
      />
      <CorporateModeSwitchCards activeMode="super-tax" />
    </CalculatorLayout>
  );
}
