import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import PropertyCalculationGuide from '@/features/property-tax/components/PropertyCalculationGuide';
import PropertyFaq from '@/features/property-tax/components/PropertyFaq';
import PropertyHero from '@/features/property-tax/components/PropertyHero';
import PropertyModeSwitchCards from '@/features/property-tax/components/PropertyModeSwitchCards';
import PropertyOfficialSources from '@/features/property-tax/components/PropertyOfficialSources';
import PropertySectionComparison from '@/features/property-tax/components/PropertySectionComparison';
import PropertyTransferCalculator from '@/features/property-tax/components/PropertyTransferCalculator';
import { PROPERTY_PURCHASE_ROUTE } from '@/features/property-tax/lib/modes';

export default function PropertyPurchaseTaxView() {
  return (
    <>
      <PropertyHero mode="purchase" />
      <PropertyTransferCalculator mode="purchase" />
      <PropertyCalculationGuide mode="purchase" />
      <PropertyModeSwitchCards activeMode="purchase" />
      <PropertySectionComparison mode="purchase" />
      <PropertyFaq mode="purchase" />
      <RelatedCalculators currentHref={PROPERTY_PURCHASE_ROUTE} />
      <PropertyOfficialSources mode="purchase" />
    </>
  );
}
