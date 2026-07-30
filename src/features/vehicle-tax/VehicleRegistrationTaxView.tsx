import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import VehicleAdjustableNote from '@/features/vehicle-tax/components/VehicleAdjustableNote';
import VehicleCalculationGuide from '@/features/vehicle-tax/components/VehicleCalculationGuide';
import VehicleModeSwitchCard from '@/features/vehicle-tax/components/VehicleModeSwitchCard';
import VehicleRegistrationCalculator from '@/features/vehicle-tax/components/VehicleRegistrationCalculator';
import VehicleRegistrationFaq from '@/features/vehicle-tax/components/VehicleRegistrationFaq';
import VehicleRegistrationHero from '@/features/vehicle-tax/components/VehicleRegistrationHero';
import VehicleRegistrationOfficialSources from '@/features/vehicle-tax/components/VehicleRegistrationOfficialSources';
import VehicleRegistrationRateGuide from '@/features/vehicle-tax/components/VehicleRegistrationRateGuide';
import VehicleScopeNote from '@/features/vehicle-tax/components/VehicleScopeNote';
import { VEHICLE_REGISTRATION_ROUTE } from '@/features/vehicle-tax/lib/modes';

export default function VehicleRegistrationTaxView() {
  return (
    <>
      <VehicleRegistrationHero />
      <VehicleRegistrationCalculator />
      <VehicleModeSwitchCard currentMode="registration" />
      <VehicleRegistrationRateGuide />
      <VehicleCalculationGuide />
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <VehicleAdjustableNote />
        <VehicleScopeNote />
      </div>
      <VehicleRegistrationFaq />
      <RelatedCalculators currentHref={VEHICLE_REGISTRATION_ROUTE} />
      <VehicleRegistrationOfficialSources />
    </>
  );
}
