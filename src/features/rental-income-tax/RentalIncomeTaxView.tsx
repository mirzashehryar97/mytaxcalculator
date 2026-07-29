import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import RentalAdjustableNote from '@/features/rental-income-tax/components/RentalAdjustableNote';
import RentalCalculationGuide from '@/features/rental-income-tax/components/RentalCalculationGuide';
import RentalCompanyRates from '@/features/rental-income-tax/components/RentalCompanyRates';
import RentalDeductions from '@/features/rental-income-tax/components/RentalDeductions';
import RentalFaq from '@/features/rental-income-tax/components/RentalFaq';
import RentalHero from '@/features/rental-income-tax/components/RentalHero';
import RentalOfficialSources from '@/features/rental-income-tax/components/RentalOfficialSources';
import RentalRateGuide from '@/features/rental-income-tax/components/RentalRateGuide';
import RentalTaxCalculator from '@/features/rental-income-tax/components/RentalTaxCalculator';

export default function RentalIncomeTaxView() {
  return (
    <>
      <RentalHero />
      <RentalTaxCalculator />
      <RentalRateGuide />
      <RentalCompanyRates />
      <RentalCalculationGuide />
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <RentalAdjustableNote />
        <RentalDeductions />
      </div>
      <RentalFaq />
      <RelatedCalculators currentHref="/rental-income-tax-calculator" />
      <RentalOfficialSources />
    </>
  );
}
