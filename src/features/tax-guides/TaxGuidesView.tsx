import BrowseTopics from '@/features/tax-guides/components/BrowseTopics';
import EducationalDisclaimer from '@/features/tax-guides/components/EducationalDisclaimer';
import EssentialGuides from '@/features/tax-guides/components/EssentialGuides';
import OfficialResources from '@/features/tax-guides/components/OfficialResources';
import PopularQuestions from '@/features/tax-guides/components/PopularQuestions';
import TaxGuidesHero from '@/features/tax-guides/components/TaxGuidesHero';
import TaxYearSnapshot from '@/features/tax-guides/components/TaxYearSnapshot';

export default function TaxGuidesView() {
  return (
    <div className="-mb-20 -mt-12 -translate-x-1/2 relative left-1/2 w-screen bg-[#f8faf9]">
      <TaxGuidesHero />
      <div className="mx-auto max-w-7xl space-y-8 px-5 py-10 sm:px-10 sm:py-8 lg:space-y-10 lg:px-12 lg:py-10">
        <EssentialGuides />
        <BrowseTopics />
        <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
          <TaxYearSnapshot />
          <PopularQuestions />
        </div>
        <OfficialResources />
        <EducationalDisclaimer />
      </div>
    </div>
  );
}
