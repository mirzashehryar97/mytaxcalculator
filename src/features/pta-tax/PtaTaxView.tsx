import RelatedCalculators from '@/components/calculator/RelatedCalculators';

import PtaComponentCards from '@/features/pta-tax/components/PtaComponentCards';
import PtaFaq from '@/features/pta-tax/components/PtaFaq';
import PtaHero from '@/features/pta-tax/components/PtaHero';
import PtaHighlights from '@/features/pta-tax/components/PtaHighlights';
import PtaOfficialSources from '@/features/pta-tax/components/PtaOfficialSources';
import PtaPopularPhones from '@/features/pta-tax/components/PtaPopularPhones';
import PtaRateGuide from '@/features/pta-tax/components/PtaRateGuide';
import PtaTaxCalculator from '@/features/pta-tax/components/PtaTaxCalculator';
import PtaValueBasisSection from '@/features/pta-tax/components/PtaValueBasisSection';
import { PTA_ROUTE } from '@/features/pta-tax/lib/content';

export default function PtaTaxView() {
  return (
    <>
      <PtaHero />
      <PtaTaxCalculator />
      <PtaComponentCards />
      <PtaValueBasisSection />
      <PtaRateGuide />
      <PtaPopularPhones />
      <PtaHighlights />
      <PtaFaq />
      <RelatedCalculators currentHref={PTA_ROUTE} />
      <PtaOfficialSources />
    </>
  );
}
