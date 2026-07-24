'use client';

import type { ReactNode } from 'react';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import FreelancerTaxForm from '@/features/freelancer-tax/components/FreelancerTaxForm';
import FreelancerTaxResultSummary from '@/features/freelancer-tax/components/FreelancerTaxResultSummary';
import useFreelancerAnalytics from '@/features/freelancer-tax/hooks/useFreelancerAnalytics';
import useFreelancerTax from '@/features/freelancer-tax/hooks/useFreelancerTax';
import { FREELANCER_PAGE_COPY } from '@/features/freelancer-tax/lib/content';

interface FreelancerTaxCalculatorProps {
  children: ReactNode;
}

export default function FreelancerTaxCalculator({ children }: FreelancerTaxCalculatorProps) {
  const { formState, result, isValid, updateField } = useFreelancerTax();
  useFreelancerAnalytics(formState, isValid);

  return (
    <CalculatorLayout
      ariaLabel={FREELANCER_PAGE_COPY.title}
      form={<FreelancerTaxForm formState={formState} isValid={isValid} updateField={updateField} />}
      result={<FreelancerTaxResultSummary result={result} />}
    >
      {children}
    </CalculatorLayout>
  );
}
