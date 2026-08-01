'use client';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import { getTodayIso } from '@/utils/calendarDates';

import VehicleAwaitingInput from '@/features/vehicle-tax/components/VehicleAwaitingInput';
import VehicleModeTabs from '@/features/vehicle-tax/components/VehicleModeTabs';
import VehicleRegistrationForm from '@/features/vehicle-tax/components/VehicleRegistrationForm';
import VehicleRegistrationResultSummary from '@/features/vehicle-tax/components/VehicleRegistrationResultSummary';
import VehicleYearComparison from '@/features/vehicle-tax/components/VehicleYearComparison';
import useVehicleAnalytics from '@/features/vehicle-tax/hooks/useVehicleAnalytics';
import useVehicleRegistrationTax from '@/features/vehicle-tax/hooks/useVehicleRegistrationTax';
import {
  buildVehicleRegistrationUseParameters,
  VEHICLE_ANALYTICS_EVENTS,
  VEHICLE_REGISTRATION_ANALYTICS_CONTEXT,
} from '@/features/vehicle-tax/lib/analytics';
import {
  VEHICLE_REGISTRATION_FORM_COPY,
  VEHICLE_REGISTRATION_PAGE_COPY,
} from '@/features/vehicle-tax/lib/content';
import { getRegistrationInvalidMessage } from '@/features/vehicle-tax/lib/presentation';

export default function VehicleRegistrationCalculator() {
  const { formState, inputs, result, isValid, updateField } = useVehicleRegistrationTax();

  useVehicleAnalytics({
    formState,
    isValid,
    pageViewEvent: VEHICLE_ANALYTICS_EVENTS.registrationPageView,
    pageViewContext: VEHICLE_REGISTRATION_ANALYTICS_CONTEXT,
    useEvent: VEHICLE_ANALYTICS_EVENTS.registrationUse,
    buildUseParameters: buildVehicleRegistrationUseParameters,
  });

  return (
    <CalculatorLayout
      ariaLabel={VEHICLE_REGISTRATION_PAGE_COPY.title}
      header={<VehicleModeTabs activeMode="registration" />}
      form={
        <VehicleRegistrationForm
          formState={formState}
          isValid={isValid}
          todayIso={getTodayIso()}
          updateField={updateField}
        />
      }
      result={
        isValid ? (
          <VehicleRegistrationResultSummary result={result} />
        ) : (
          <VehicleAwaitingInput
            title={VEHICLE_REGISTRATION_FORM_COPY.awaitingTitle}
            body={VEHICLE_REGISTRATION_FORM_COPY.awaitingBody}
            missing={getRegistrationInvalidMessage(result.engineType, result.engineCc)}
          />
        )
      }
    >
      {isValid ? <VehicleYearComparison inputs={inputs} /> : null}
    </CalculatorLayout>
  );
}
