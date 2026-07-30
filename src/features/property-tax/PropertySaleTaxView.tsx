import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import PropertyCalculationGuide from '@/features/property-tax/components/PropertyCalculationGuide';
import PropertyFaq from '@/features/property-tax/components/PropertyFaq';
import PropertyHero from '@/features/property-tax/components/PropertyHero';
import PropertyModeSwitchCards from '@/features/property-tax/components/PropertyModeSwitchCards';
import PropertyOfficialSources from '@/features/property-tax/components/PropertyOfficialSources';
import PropertySectionComparison from '@/features/property-tax/components/PropertySectionComparison';
import PropertyTransferCalculator from '@/features/property-tax/components/PropertyTransferCalculator';
import { PROPERTY_SALE_ROUTE } from '@/features/property-tax/lib/modes';

export default function PropertySaleTaxView() {
  return (
    <>
      <PropertyHero mode="sale" />
      <PropertyTransferCalculator mode="sale" />
      <PropertyCalculationGuide mode="sale" />
      <PropertyModeSwitchCards activeMode="sale" />
      <PropertySectionComparison mode="sale" />
      <PropertyFaq mode="sale" />
      <RelatedCalculators currentHref={PROPERTY_SALE_ROUTE} />
      <PropertyOfficialSources mode="sale" />
    </>
  );
}
