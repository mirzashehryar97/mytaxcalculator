import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import VehicleAnnualTaxGuide from '@/features/vehicle-tax/components/VehicleAnnualTaxGuide';
import VehicleModeSwitchCard from '@/features/vehicle-tax/components/VehicleModeSwitchCard';
import VehicleProvinceRules from '@/features/vehicle-tax/components/VehicleProvinceRules';
import VehicleTokenCalculator from '@/features/vehicle-tax/components/VehicleTokenCalculator';
import VehicleTokenFaq from '@/features/vehicle-tax/components/VehicleTokenFaq';
import VehicleTokenHero from '@/features/vehicle-tax/components/VehicleTokenHero';
import VehicleTokenOfficialSources from '@/features/vehicle-tax/components/VehicleTokenOfficialSources';
import { VEHICLE_TOKEN_ROUTE } from '@/features/vehicle-tax/lib/modes';

export default function VehicleTokenTaxView() {
  return (
    <>
      <VehicleTokenHero />
      <VehicleTokenCalculator />
      <VehicleModeSwitchCard currentMode="token" />
      <VehicleAnnualTaxGuide />
      <VehicleProvinceRules />
      <VehicleTokenFaq />
      <RelatedCalculators currentHref={VEHICLE_TOKEN_ROUTE} />
      <VehicleTokenOfficialSources />
    </>
  );
}
