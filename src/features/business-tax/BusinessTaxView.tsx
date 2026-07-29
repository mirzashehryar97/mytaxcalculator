import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import BusinessCalculationGuide from '@/features/business-tax/components/BusinessCalculationGuide';
import BusinessClassificationCards from '@/features/business-tax/components/BusinessClassificationCards';
import BusinessFaq from '@/features/business-tax/components/BusinessFaq';
import BusinessHero from '@/features/business-tax/components/BusinessHero';
import BusinessOfficialSources from '@/features/business-tax/components/BusinessOfficialSources';
import BusinessRateGuide from '@/features/business-tax/components/BusinessRateGuide';
import BusinessTaxCalculator from '@/features/business-tax/components/BusinessTaxCalculator';

export default function BusinessTaxView() {
  return (
    <>
      <BusinessHero />
      <BusinessTaxCalculator>
        <BusinessClassificationCards />
      </BusinessTaxCalculator>
      <BusinessRateGuide />
      <BusinessCalculationGuide />
      <BusinessFaq />
      <RelatedCalculators currentHref="/business-tax-calculator" />
      <BusinessOfficialSources />
    </>
  );
}
