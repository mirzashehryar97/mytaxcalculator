'use client';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import RentalTaxForm from '@/features/rental-income-tax/components/RentalTaxForm';
import RentalTaxResultSummary from '@/features/rental-income-tax/components/RentalTaxResultSummary';
import RentalYearComparison from '@/features/rental-income-tax/components/RentalYearComparison';
import useRentalAnalytics from '@/features/rental-income-tax/hooks/useRentalAnalytics';
import useRentalTax from '@/features/rental-income-tax/hooks/useRentalTax';
import { RENTAL_PAGE_COPY } from '@/features/rental-income-tax/lib/content';

export default function RentalTaxCalculator() {
  const { formState, result, annualRent, isValid, updateField } = useRentalTax();
  useRentalAnalytics(formState, isValid);

  return (
    <CalculatorLayout
      ariaLabel={RENTAL_PAGE_COPY.title}
      form={
        <RentalTaxForm
          formState={formState}
          annualRent={annualRent}
          isValid={isValid}
          updateField={updateField}
        />
      }
      result={<RentalTaxResultSummary result={result} />}
    >
      <RentalYearComparison
        annualRent={annualRent}
        ownerType={formState.ownerType}
        filer={formState.filer}
      />
    </CalculatorLayout>
  );
}
