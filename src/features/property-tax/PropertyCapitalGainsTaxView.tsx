import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import PropertyCapitalGainsCalculator from '@/features/property-tax/components/PropertyCapitalGainsCalculator';
import PropertyCgtRegimes from '@/features/property-tax/components/PropertyCgtRegimes';
import PropertyFaq from '@/features/property-tax/components/PropertyFaq';
import PropertyHero from '@/features/property-tax/components/PropertyHero';
import PropertyModeSwitchCards from '@/features/property-tax/components/PropertyModeSwitchCards';
import PropertyOfficialSources from '@/features/property-tax/components/PropertyOfficialSources';
import PropertySectionComparison from '@/features/property-tax/components/PropertySectionComparison';
import { PROPERTY_CAPITAL_GAINS_ROUTE } from '@/features/property-tax/lib/modes';

export default function PropertyCapitalGainsTaxView() {
  return (
    <>
      <PropertyHero mode="capital-gains" />
      <PropertyCapitalGainsCalculator />
      <PropertyModeSwitchCards activeMode="capital-gains" />
      <PropertyCgtRegimes />
      <PropertySectionComparison mode="capital-gains" />
      <PropertyFaq mode="capital-gains" />
      <RelatedCalculators currentHref={PROPERTY_CAPITAL_GAINS_ROUTE} />
      <PropertyOfficialSources mode="capital-gains" />
    </>
  );
}
