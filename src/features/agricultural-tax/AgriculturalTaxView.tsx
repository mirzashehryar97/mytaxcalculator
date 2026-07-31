import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import AgriculturalCalculator from '@/features/agricultural-tax/components/AgriculturalCalculator';
import AgriculturalFaq from '@/features/agricultural-tax/components/AgriculturalFaq';
import AgriculturalHero from '@/features/agricultural-tax/components/AgriculturalHero';
import AgriculturalOfficialSources from '@/features/agricultural-tax/components/AgriculturalOfficialSources';
import AgriculturalOtherIncomeGuide from '@/features/agricultural-tax/components/AgriculturalOtherIncomeGuide';
import AgriculturalProvinceGuide from '@/features/agricultural-tax/components/AgriculturalProvinceGuide';
import AgriculturalRateGuide from '@/features/agricultural-tax/components/AgriculturalRateGuide';
import AgriculturalStepsGuide from '@/features/agricultural-tax/components/AgriculturalStepsGuide';
import { AGRICULTURAL_TAX_ROUTE } from '@/features/agricultural-tax/lib/provinces';

export default function AgriculturalTaxView() {
  return (
    <>
      <AgriculturalHero />
      <AgriculturalCalculator />
      <AgriculturalProvinceGuide />
      <AgriculturalRateGuide />
      <AgriculturalStepsGuide />
      <AgriculturalOtherIncomeGuide />
      <AgriculturalFaq />
      <RelatedCalculators currentHref={AGRICULTURAL_TAX_ROUTE} />
      <AgriculturalOfficialSources />
    </>
  );
}
