'use client';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import PropertyModeTabs from '@/features/property-tax/components/PropertyModeTabs';
import PropertyRateGuide from '@/features/property-tax/components/PropertyRateGuide';
import PropertyTransferForm from '@/features/property-tax/components/PropertyTransferForm';
import PropertyTransferResultSummary from '@/features/property-tax/components/PropertyTransferResultSummary';
import PropertyYearComparison from '@/features/property-tax/components/PropertyYearComparison';
import usePropertyAnalytics from '@/features/property-tax/hooks/usePropertyAnalytics';
import usePropertyTransferTax from '@/features/property-tax/hooks/usePropertyTransferTax';
import { buildPropertyTransferUseEventParameters } from '@/features/property-tax/lib/analytics';
import { PROPERTY_PAGE_COPY } from '@/features/property-tax/lib/content';

interface PropertyTransferCalculatorProps {
  mode: 'purchase' | 'sale';
}

/** Section 236K and 236C share one calculator — only the rate table differs. */
export default function PropertyTransferCalculator({ mode }: PropertyTransferCalculatorProps) {
  const { formState, result, isValid, updateField } = usePropertyTransferTax(mode);
  usePropertyAnalytics(
    mode,
    formState,
    isValid,
    buildPropertyTransferUseEventParameters(mode, formState),
  );

  return (
    <CalculatorLayout
      ariaLabel={PROPERTY_PAGE_COPY[mode].title}
      header={<PropertyModeTabs activeMode={mode} />}
      form={
        <PropertyTransferForm
          mode={mode}
          formState={formState}
          result={result}
          isValid={isValid}
          updateField={updateField}
        />
      }
      result={<PropertyTransferResultSummary result={result} />}
    >
      <PropertyRateGuide mode={mode} fiscalYear={formState.fiscalYear} />
      <PropertyYearComparison
        mode={mode}
        taxBase={result.taxBase}
        status={formState.status}
        selectedYear={formState.fiscalYear}
      />
    </CalculatorLayout>
  );
}
