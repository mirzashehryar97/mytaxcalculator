'use client';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import PtaAwaitingInput from '@/features/pta-tax/components/PtaAwaitingInput';
import PtaResultSummary from '@/features/pta-tax/components/PtaResultSummary';
import PtaTaxBreakdown from '@/features/pta-tax/components/PtaTaxBreakdown';
import PtaTaxForm from '@/features/pta-tax/components/PtaTaxForm';
import usePtaTax from '@/features/pta-tax/hooks/usePtaTax';
import { PTA_PAGE_COPY } from '@/features/pta-tax/lib/content';

export default function PtaTaxCalculator() {
  const {
    formState,
    result,
    variantOptions,
    usedPhone,
    officialCnfUsd,
    isDeclaredValueUsed,
    isValid,
    missingInput,
    updateField,
  } = usePtaTax();

  return (
    <CalculatorLayout
      ariaLabel={PTA_PAGE_COPY.title}
      form={
        <PtaTaxForm
          formState={formState}
          officialCnfUsd={officialCnfUsd}
          updateField={updateField}
          usedPhone={usedPhone}
          variantOptions={variantOptions}
        />
      }
      result={
        isValid ? (
          <PtaResultSummary result={result} route={formState.route} />
        ) : (
          <PtaAwaitingInput missing={missingInput ?? ''} />
        )
      }
    >
      {isValid ? (
        <PtaTaxBreakdown
          fiscalYear={formState.fiscalYear}
          isDeclaredValueUsed={isDeclaredValueUsed}
          result={result}
        />
      ) : null}
    </CalculatorLayout>
  );
}
