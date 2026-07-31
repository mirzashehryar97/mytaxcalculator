import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import CorporateCombinationGuide from '@/features/corporate-tax/components/CorporateCombinationGuide';
import CorporateFaq from '@/features/corporate-tax/components/CorporateFaq';
import CorporateHero from '@/features/corporate-tax/components/CorporateHero';
import CorporateOfficialSources from '@/features/corporate-tax/components/CorporateOfficialSources';
import CorporateRateGuide from '@/features/corporate-tax/components/CorporateRateGuide';
import MinimumTurnoverTaxCalculator from '@/features/corporate-tax/components/MinimumTurnoverTaxCalculator';
import { MINIMUM_TURNOVER_TAX_ROUTE } from '@/features/corporate-tax/lib/modes';

export default function MinimumTurnoverTaxView() {
  return (
    <>
      <CorporateHero mode="minimum-tax" />
      <MinimumTurnoverTaxCalculator />
      <CorporateRateGuide mode="minimum-tax" />
      <CorporateCombinationGuide />
      <CorporateFaq mode="minimum-tax" />
      <RelatedCalculators currentHref={MINIMUM_TURNOVER_TAX_ROUTE} />
      <CorporateOfficialSources mode="minimum-tax" />
    </>
  );
}
