'use client';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import AgriculturalResultSummary from '@/features/agricultural-tax/components/AgriculturalResultSummary';
import AgriculturalTaxForm from '@/features/agricultural-tax/components/AgriculturalTaxForm';
import useAgriculturalAnalytics from '@/features/agricultural-tax/hooks/useAgriculturalAnalytics';
import useAgriculturalTax from '@/features/agricultural-tax/hooks/useAgriculturalTax';
import { AGRICULTURAL_PAGE_COPY } from '@/features/agricultural-tax/lib/content';

export default function AgriculturalCalculator() {
  const { formState, result, isValid, updateField } = useAgriculturalTax();
  useAgriculturalAnalytics(formState, isValid);

  return (
    <CalculatorLayout
      ariaLabel={AGRICULTURAL_PAGE_COPY.title}
      form={
        <AgriculturalTaxForm formState={formState} isValid={isValid} updateField={updateField} />
      }
      result={<AgriculturalResultSummary result={result} />}
    />
  );
}
