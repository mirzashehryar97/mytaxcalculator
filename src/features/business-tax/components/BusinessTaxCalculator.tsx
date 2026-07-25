'use client';

import type { ReactNode } from 'react';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import BusinessTaxForm from '@/features/business-tax/components/BusinessTaxForm';
import BusinessTaxResultSummary from '@/features/business-tax/components/BusinessTaxResultSummary';
import BusinessYearComparison from '@/features/business-tax/components/BusinessYearComparison';
import useBusinessAnalytics from '@/features/business-tax/hooks/useBusinessAnalytics';
import useBusinessTax from '@/features/business-tax/hooks/useBusinessTax';
import { BUSINESS_PAGE_COPY } from '@/features/business-tax/lib/content';

interface BusinessTaxCalculatorProps {
  children: ReactNode;
}

export default function BusinessTaxCalculator({ children }: BusinessTaxCalculatorProps) {
  const { formState, result, netIncome, isValid, updateField } = useBusinessTax();
  useBusinessAnalytics(formState, isValid);

  return (
    <CalculatorLayout
      ariaLabel={BUSINESS_PAGE_COPY.title}
      form={<BusinessTaxForm formState={formState} isValid={isValid} updateField={updateField} />}
      result={<BusinessTaxResultSummary result={result} />}
    >
      {children}
      <BusinessYearComparison netIncome={netIncome} taxpayerType={formState.taxpayerType} />
    </CalculatorLayout>
  );
}
