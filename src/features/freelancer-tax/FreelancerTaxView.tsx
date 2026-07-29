import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import FreelancerCalculationGuide from '@/features/freelancer-tax/components/FreelancerCalculationGuide';
import FreelancerEligibilityAndIncome from '@/features/freelancer-tax/components/FreelancerEligibilityAndIncome';
import FreelancerFaq from '@/features/freelancer-tax/components/FreelancerFaq';
import FreelancerHero from '@/features/freelancer-tax/components/FreelancerHero';
import FreelancerOfficialSources from '@/features/freelancer-tax/components/FreelancerOfficialSources';
import FreelancerRateGuide from '@/features/freelancer-tax/components/FreelancerRateGuide';
import FreelancerScenarios from '@/features/freelancer-tax/components/FreelancerScenarios';
import FreelancerTaxCalculator from '@/features/freelancer-tax/components/FreelancerTaxCalculator';

export default function FreelancerTaxView() {
  return (
    <>
      <FreelancerHero />
      <FreelancerTaxCalculator>
        <FreelancerEligibilityAndIncome />
        <FreelancerScenarios />
      </FreelancerTaxCalculator>
      <FreelancerRateGuide />
      <FreelancerCalculationGuide />
      <FreelancerFaq />
      <RelatedCalculators currentHref="/freelancer-tax-calculator" />
      <FreelancerOfficialSources />
    </>
  );
}
