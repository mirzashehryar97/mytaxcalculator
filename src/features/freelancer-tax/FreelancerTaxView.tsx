import FreelancerCalculationGuide from '@/features/freelancer-tax/components/FreelancerCalculationGuide';
import FreelancerEligibilityAndIncome from '@/features/freelancer-tax/components/FreelancerEligibilityAndIncome';
import FreelancerFaq from '@/features/freelancer-tax/components/FreelancerFaq';
import FreelancerHero from '@/features/freelancer-tax/components/FreelancerHero';
import FreelancerRateGuide from '@/features/freelancer-tax/components/FreelancerRateGuide';
import FreelancerScenarios from '@/features/freelancer-tax/components/FreelancerScenarios';
import FreelancerSources from '@/features/freelancer-tax/components/FreelancerSources';
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
      <FreelancerSources />
      <FreelancerFaq />
    </>
  );
}
