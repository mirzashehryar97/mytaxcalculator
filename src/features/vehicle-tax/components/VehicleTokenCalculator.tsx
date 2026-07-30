'use client';

import CalculatorLayout from '@/components/calculator/CalculatorLayout';

import { getTodayIso } from '@/utils/calendarDates';

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
import { VEHICLE_TOKEN_PAGE_COPY } from '@/features/vehicle-tax/lib/content';

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
          updateField={updateField}
        />
      }
      result={<VehicleTokenResultSummary result={result} />}
    >
      <VehicleTokenBreakdown result={result} />
    </CalculatorLayout>
  );
}
