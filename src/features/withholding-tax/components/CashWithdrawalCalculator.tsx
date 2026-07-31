'use client';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import CashWithdrawalForm from '@/features/withholding-tax/components/CashWithdrawalForm';
import CashWithdrawalResultSummary from '@/features/withholding-tax/components/CashWithdrawalResultSummary';
import WithholdingModeTabs from '@/features/withholding-tax/components/WithholdingModeTabs';
import WithholdingRateGuide from '@/features/withholding-tax/components/WithholdingRateGuide';
import useCashWithdrawalTax from '@/features/withholding-tax/hooks/useCashWithdrawalTax';
import useWithholdingAnalytics from '@/features/withholding-tax/hooks/useWithholdingAnalytics';
import {
  buildCashWithdrawalUseParameters,
  CASH_WITHDRAWAL_ANALYTICS_CONTEXT,
  WITHHOLDING_ANALYTICS_EVENTS,
} from '@/features/withholding-tax/lib/analytics';
import { WITHHOLDING_PAGE_COPY } from '@/features/withholding-tax/lib/content';
import { buildCashWithdrawalRateRows } from '@/features/withholding-tax/lib/presentation';

export default function CashWithdrawalCalculator() {
  const { formState, result, isValid, updateField } = useCashWithdrawalTax();

  useWithholdingAnalytics({
    formState,
    isValid,
    pageViewEvent: WITHHOLDING_ANALYTICS_EVENTS.cashWithdrawalPageView,
    pageViewContext: CASH_WITHDRAWAL_ANALYTICS_CONTEXT,
    useEvent: WITHHOLDING_ANALYTICS_EVENTS.cashWithdrawalUse,
    buildUseParameters: buildCashWithdrawalUseParameters,
  });

  return (
    <CalculatorLayout
      ariaLabel={WITHHOLDING_PAGE_COPY['cash-withdrawal'].title}
      header={<WithholdingModeTabs activeMode="cash-withdrawal" />}
      form={
        <CashWithdrawalForm
          formState={formState}
          result={result}
          isValid={isValid}
          updateField={updateField}
        />
      }
      result={<CashWithdrawalResultSummary result={result} />}
    >
      <WithholdingRateGuide
        mode="cash-withdrawal"
        rows={buildCashWithdrawalRateRows()}
        activeRowId={formState.fiscalYear}
      />
    </CalculatorLayout>
  );
}
