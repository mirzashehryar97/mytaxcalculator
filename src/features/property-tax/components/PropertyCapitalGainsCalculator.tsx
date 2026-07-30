'use client';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import PropertyCapitalGainsForm from '@/features/property-tax/components/PropertyCapitalGainsForm';
import PropertyCapitalGainsResultSummary from '@/features/property-tax/components/PropertyCapitalGainsResultSummary';
import PropertyCgtGrid from '@/features/property-tax/components/PropertyCgtGrid';
import PropertyModeTabs from '@/features/property-tax/components/PropertyModeTabs';
import usePropertyAnalytics from '@/features/property-tax/hooks/usePropertyAnalytics';
import usePropertyCapitalGains from '@/features/property-tax/hooks/usePropertyCapitalGains';
import { buildPropertyCapitalGainsUseEventParameters } from '@/features/property-tax/lib/analytics';
import { PROPERTY_PAGE_COPY } from '@/features/property-tax/lib/content';

export default function PropertyCapitalGainsCalculator() {
  const { formState, taxYear, result, isValid, updateField } = usePropertyCapitalGains();
  usePropertyAnalytics(
    'capital-gains',
    formState,
    isValid,
    buildPropertyCapitalGainsUseEventParameters(formState, taxYear.fiscalYear),
  );

  return (
    <CalculatorLayout
      ariaLabel={PROPERTY_PAGE_COPY['capital-gains'].title}
      header={<PropertyModeTabs activeMode="capital-gains" />}
      form={
        <PropertyCapitalGainsForm
          formState={formState}
          taxYear={taxYear}
          result={result}
          isValid={isValid}
          updateField={updateField}
        />
      }
      result={<PropertyCapitalGainsResultSummary result={result} />}
    >
      <PropertyCgtGrid
        highlightedType={result.regime === 'holding-grid' ? result.propertyType : undefined}
      />
    </CalculatorLayout>
  );
}
