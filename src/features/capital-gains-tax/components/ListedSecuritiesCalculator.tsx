'use client';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import CapitalGainsModeTabs from '@/features/capital-gains-tax/components/CapitalGainsModeTabs';
import CapitalGainsRateGuide from '@/features/capital-gains-tax/components/CapitalGainsRateGuide';
import ListedSecuritiesForm from '@/features/capital-gains-tax/components/ListedSecuritiesForm';
import ListedSecuritiesResultSummary from '@/features/capital-gains-tax/components/ListedSecuritiesResultSummary';
import useCapitalGainsAnalytics from '@/features/capital-gains-tax/hooks/useCapitalGainsAnalytics';
import useListedSecuritiesTax from '@/features/capital-gains-tax/hooks/useListedSecuritiesTax';
import {
  buildListedSecuritiesUseParameters,
  CAPITAL_GAINS_ANALYTICS_EVENTS,
  LISTED_SECURITIES_ANALYTICS_CONTEXT,
} from '@/features/capital-gains-tax/lib/analytics';
import { CAPITAL_GAINS_PAGE_COPY } from '@/features/capital-gains-tax/lib/content';
import {
  buildListedRateRows,
  getListedActiveRowId,
} from '@/features/capital-gains-tax/lib/presentation';

export default function ListedSecuritiesCalculator() {
  const { formState, result, taxYear, isValid, updateField } = useListedSecuritiesTax();

  useCapitalGainsAnalytics({
    formState,
    isValid,
    pageViewEvent: CAPITAL_GAINS_ANALYTICS_EVENTS.listedSecuritiesPageView,
    pageViewContext: LISTED_SECURITIES_ANALYTICS_CONTEXT,
    useEvent: CAPITAL_GAINS_ANALYTICS_EVENTS.listedSecuritiesUse,
    buildUseParameters: buildListedSecuritiesUseParameters,
  });

  return (
    <CalculatorLayout
      ariaLabel={CAPITAL_GAINS_PAGE_COPY['listed-securities'].title}
      header={<CapitalGainsModeTabs activeMode="listed-securities" />}
      form={
        <ListedSecuritiesForm
          formState={formState}
          taxYear={taxYear}
          result={result}
          isValid={isValid}
          updateField={updateField}
        />
      }
      result={<ListedSecuritiesResultSummary result={result} />}
    >
      <CapitalGainsRateGuide
        mode="listed-securities"
        rows={buildListedRateRows(result.fiscalYear)}
        activeRowId={getListedActiveRowId(result)}
      />
    </CalculatorLayout>
  );
}
