'use client';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import PhoneInternetForm from '@/features/withholding-tax/components/PhoneInternetForm';
import PhoneInternetResultSummary from '@/features/withholding-tax/components/PhoneInternetResultSummary';
import WithholdingModeTabs from '@/features/withholding-tax/components/WithholdingModeTabs';
import WithholdingRateGuide from '@/features/withholding-tax/components/WithholdingRateGuide';
import usePhoneInternetTax from '@/features/withholding-tax/hooks/usePhoneInternetTax';
import useWithholdingAnalytics from '@/features/withholding-tax/hooks/useWithholdingAnalytics';
import {
  buildTelecomUseParameters,
  PHONE_INTERNET_ANALYTICS_CONTEXT,
  WITHHOLDING_ANALYTICS_EVENTS,
} from '@/features/withholding-tax/lib/analytics';
import { WITHHOLDING_PAGE_COPY } from '@/features/withholding-tax/lib/content';
import { buildTelecomRateRows } from '@/features/withholding-tax/lib/presentation';

export default function PhoneInternetCalculator() {
  const { formState, result, isValid, updateField } = usePhoneInternetTax();

  useWithholdingAnalytics({
    formState,
    isValid,
    pageViewEvent: WITHHOLDING_ANALYTICS_EVENTS.phoneInternetPageView,
    pageViewContext: PHONE_INTERNET_ANALYTICS_CONTEXT,
    useEvent: WITHHOLDING_ANALYTICS_EVENTS.phoneInternetUse,
    buildUseParameters: buildTelecomUseParameters,
  });

  return (
    <CalculatorLayout
      ariaLabel={WITHHOLDING_PAGE_COPY['phone-internet'].title}
      header={<WithholdingModeTabs activeMode="phone-internet" />}
      form={
        <PhoneInternetForm
          formState={formState}
          result={result}
          isValid={isValid}
          updateField={updateField}
        />
      }
      result={<PhoneInternetResultSummary result={result} />}
    >
      <WithholdingRateGuide
        mode="phone-internet"
        rows={buildTelecomRateRows(formState.fiscalYear)}
      />
    </CalculatorLayout>
  );
}
