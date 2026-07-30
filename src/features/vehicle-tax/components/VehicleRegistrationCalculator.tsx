'use client';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import { getTodayIso } from '@/utils/calendarDates';

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
import { VEHICLE_REGISTRATION_PAGE_COPY } from '@/features/vehicle-tax/lib/content';

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
      result={<VehicleRegistrationResultSummary result={result} />}
    >
      <VehicleYearComparison inputs={inputs} />
    </CalculatorLayout>
  );
}
