import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import CompanyTaxCalculator from '@/features/corporate-tax/components/CompanyTaxCalculator';
import CorporateCombinationGuide from '@/features/corporate-tax/components/CorporateCombinationGuide';
import CorporateFaq from '@/features/corporate-tax/components/CorporateFaq';
import CorporateHero from '@/features/corporate-tax/components/CorporateHero';
import CorporateOfficialSources from '@/features/corporate-tax/components/CorporateOfficialSources';
import CorporateRateGuide from '@/features/corporate-tax/components/CorporateRateGuide';
import { CORPORATE_TAX_ROUTE } from '@/features/corporate-tax/lib/modes';

export default function CorporateTaxView() {
  return (
    <>
      <CorporateHero mode="company-tax" />
      <CompanyTaxCalculator />
      <CorporateRateGuide mode="company-tax" />
      <CorporateCombinationGuide />
      <CorporateFaq mode="company-tax" />
      <RelatedCalculators currentHref={CORPORATE_TAX_ROUTE} />
      <CorporateOfficialSources mode="company-tax" />
    </>
  );
}
