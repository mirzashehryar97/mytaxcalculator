'use client';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import ElectricityBillForm from '@/features/withholding-tax/components/ElectricityBillForm';
import ElectricityBillResultSummary from '@/features/withholding-tax/components/ElectricityBillResultSummary';
import WithholdingModeTabs from '@/features/withholding-tax/components/WithholdingModeTabs';
import WithholdingRateGuide from '@/features/withholding-tax/components/WithholdingRateGuide';
import useElectricityBillTax from '@/features/withholding-tax/hooks/useElectricityBillTax';
import useWithholdingAnalytics from '@/features/withholding-tax/hooks/useWithholdingAnalytics';
import {
  buildElectricityUseParameters,
  ELECTRICITY_ANALYTICS_CONTEXT,
  WITHHOLDING_ANALYTICS_EVENTS,
} from '@/features/withholding-tax/lib/analytics';
import { WITHHOLDING_PAGE_COPY } from '@/features/withholding-tax/lib/content';
import { buildElectricityRateRows } from '@/features/withholding-tax/lib/presentation';

export default function ElectricityBillCalculator() {
  const { formState, result, isValid, updateField } = useElectricityBillTax();

  useWithholdingAnalytics({
    formState,
    isValid,
    pageViewEvent: WITHHOLDING_ANALYTICS_EVENTS.electricityPageView,
    pageViewContext: ELECTRICITY_ANALYTICS_CONTEXT,
    useEvent: WITHHOLDING_ANALYTICS_EVENTS.electricityUse,
    buildUseParameters: buildElectricityUseParameters,
  });

  return (
    <CalculatorLayout
      ariaLabel={WITHHOLDING_PAGE_COPY.electricity.title}
      header={<WithholdingModeTabs activeMode="electricity" />}
      form={
        <ElectricityBillForm
          formState={formState}
          result={result}
          isValid={isValid}
          updateField={updateField}
        />
      }
      result={<ElectricityBillResultSummary result={result} />}
    >
      <WithholdingRateGuide
        mode="electricity"
        rows={buildElectricityRateRows(formState.fiscalYear)}
      />
    </CalculatorLayout>
  );
}
