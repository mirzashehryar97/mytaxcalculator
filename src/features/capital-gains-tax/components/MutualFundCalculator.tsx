'use client';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import CapitalGainsModeTabs from '@/features/capital-gains-tax/components/CapitalGainsModeTabs';
import CapitalGainsRateGuide from '@/features/capital-gains-tax/components/CapitalGainsRateGuide';
import MutualFundForm from '@/features/capital-gains-tax/components/MutualFundForm';
import MutualFundResultSummary from '@/features/capital-gains-tax/components/MutualFundResultSummary';
import useCapitalGainsAnalytics from '@/features/capital-gains-tax/hooks/useCapitalGainsAnalytics';
import useMutualFundTax from '@/features/capital-gains-tax/hooks/useMutualFundTax';
import {
  buildMutualFundUseParameters,
  CAPITAL_GAINS_ANALYTICS_EVENTS,
  MUTUAL_FUND_ANALYTICS_CONTEXT,
} from '@/features/capital-gains-tax/lib/analytics';
import { CAPITAL_GAINS_PAGE_COPY } from '@/features/capital-gains-tax/lib/content';
import {
  buildMutualFundRateRows,
  getMutualFundActiveRowId,
} from '@/features/capital-gains-tax/lib/presentation';

export default function MutualFundCalculator() {
  const { formState, result, taxYear, isValid, updateField } = useMutualFundTax();

  useCapitalGainsAnalytics({
    formState,
    isValid,
    pageViewEvent: CAPITAL_GAINS_ANALYTICS_EVENTS.mutualFundPageView,
    pageViewContext: MUTUAL_FUND_ANALYTICS_CONTEXT,
    useEvent: CAPITAL_GAINS_ANALYTICS_EVENTS.mutualFundUse,
    buildUseParameters: buildMutualFundUseParameters,
  });

  return (
    <CalculatorLayout
      ariaLabel={CAPITAL_GAINS_PAGE_COPY['mutual-funds'].title}
      header={<CapitalGainsModeTabs activeMode="mutual-funds" />}
      form={
        <MutualFundForm
          formState={formState}
          taxYear={taxYear}
          result={result}
          isValid={isValid}
          updateField={updateField}
        />
      }
      result={<MutualFundResultSummary result={result} />}
    >
      <CapitalGainsRateGuide
        mode="mutual-funds"
        rows={buildMutualFundRateRows(result.fiscalYear)}
        activeRowId={getMutualFundActiveRowId(result)}
      />
    </CalculatorLayout>
  );
}
