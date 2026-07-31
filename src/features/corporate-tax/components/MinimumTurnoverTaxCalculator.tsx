'use client';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import CorporateModeSwitchCards from '@/features/corporate-tax/components/CorporateModeSwitchCards';
import CorporateModeTabs from '@/features/corporate-tax/components/CorporateModeTabs';
import MinimumTurnoverTaxForm from '@/features/corporate-tax/components/MinimumTurnoverTaxForm';
import MinimumTurnoverTaxResultSummary from '@/features/corporate-tax/components/MinimumTurnoverTaxResultSummary';
import useCorporateAnalytics from '@/features/corporate-tax/hooks/useCorporateAnalytics';
import useMinimumTurnoverTax from '@/features/corporate-tax/hooks/useMinimumTurnoverTax';
import { buildMinimumTaxUseParameters } from '@/features/corporate-tax/lib/analytics';
import { CORPORATE_PAGE_COPY } from '@/features/corporate-tax/lib/modeContent';

export default function MinimumTurnoverTaxCalculator() {
  const { formState, result, isValid, updateField } = useMinimumTurnoverTax();
  useCorporateAnalytics('minimum-tax', formState, isValid, buildMinimumTaxUseParameters);

  return (
    <CalculatorLayout
      ariaLabel={CORPORATE_PAGE_COPY['minimum-tax'].title}
      header={<CorporateModeTabs activeMode="minimum-tax" />}
      form={
        <MinimumTurnoverTaxForm formState={formState} isValid={isValid} updateField={updateField} />
      }
      result={<MinimumTurnoverTaxResultSummary result={result} />}
    >
      <CorporateModeSwitchCards activeMode="minimum-tax" />
    </CalculatorLayout>
  );
}
