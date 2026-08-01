'use client';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import { getTodayIso } from '@/utils/calendarDates';

import VehicleAwaitingInput from '@/features/vehicle-tax/components/VehicleAwaitingInput';
import VehicleModeTabs from '@/features/vehicle-tax/components/VehicleModeTabs';
import VehicleTokenBreakdown from '@/features/vehicle-tax/components/VehicleTokenBreakdown';
import VehicleTokenForm from '@/features/vehicle-tax/components/VehicleTokenForm';
import VehicleTokenResultSummary from '@/features/vehicle-tax/components/VehicleTokenResultSummary';
import useVehicleAnalytics from '@/features/vehicle-tax/hooks/useVehicleAnalytics';
import useVehicleTokenTax from '@/features/vehicle-tax/hooks/useVehicleTokenTax';
import {
  buildVehicleTokenUseParameters,
  VEHICLE_ANALYTICS_EVENTS,
  VEHICLE_TOKEN_ANALYTICS_CONTEXT,
} from '@/features/vehicle-tax/lib/analytics';
import {
  VEHICLE_TOKEN_FORM_COPY,
  VEHICLE_TOKEN_PAGE_COPY,
} from '@/features/vehicle-tax/lib/content';
import { getTokenInvalidMessage } from '@/features/vehicle-tax/lib/presentation';

export default function VehicleTokenCalculator() {
  const { formState, result, isValid, updateField } = useVehicleTokenTax();

  useVehicleAnalytics({
    formState,
    isValid,
    pageViewEvent: VEHICLE_ANALYTICS_EVENTS.tokenPageView,
    pageViewContext: VEHICLE_TOKEN_ANALYTICS_CONTEXT,
    useEvent: VEHICLE_ANALYTICS_EVENTS.tokenUse,
    buildUseParameters: buildVehicleTokenUseParameters,
  });

  return (
    <CalculatorLayout
      ariaLabel={VEHICLE_TOKEN_PAGE_COPY.title}
      header={<VehicleModeTabs activeMode="token" />}
      form={
        <VehicleTokenForm
          formState={formState}
          isValid={isValid}
          todayIso={getTodayIso()}
          result={result}
          updateField={updateField}
        />
      }
      result={
        isValid ? (
          <VehicleTokenResultSummary result={result} />
        ) : (
          <VehicleAwaitingInput
            title={VEHICLE_TOKEN_FORM_COPY.awaitingTitle}
            body={VEHICLE_TOKEN_FORM_COPY.awaitingBody}
            missing={getTokenInvalidMessage(result.engineCc)}
          />
        )
      }
    >
      {isValid ? <VehicleTokenBreakdown result={result} /> : null}
    </CalculatorLayout>
  );
}
