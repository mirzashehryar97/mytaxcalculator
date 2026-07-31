import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import CorporateCombinationGuide from '@/features/corporate-tax/components/CorporateCombinationGuide';
import CorporateFaq from '@/features/corporate-tax/components/CorporateFaq';
import CorporateHero from '@/features/corporate-tax/components/CorporateHero';
import CorporateOfficialSources from '@/features/corporate-tax/components/CorporateOfficialSources';
import CorporateRateGuide from '@/features/corporate-tax/components/CorporateRateGuide';
import SuperTaxCalculator from '@/features/corporate-tax/components/SuperTaxCalculator';
import { SUPER_TAX_ROUTE } from '@/features/corporate-tax/lib/modes';

export default function SuperTaxView() {
  return (
    <>
      <CorporateHero mode="super-tax" />
      <SuperTaxCalculator />
      <CorporateRateGuide mode="super-tax" />
      <CorporateCombinationGuide />
      <CorporateFaq mode="super-tax" />
      <RelatedCalculators currentHref={SUPER_TAX_ROUTE} />
      <CorporateOfficialSources mode="super-tax" />
    </>
  );
}
