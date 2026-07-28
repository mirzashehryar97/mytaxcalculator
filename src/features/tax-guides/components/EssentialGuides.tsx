import EssentialGuideCard from '@/features/tax-guides/components/EssentialGuideCard';
import TaxGuidesSectionHeading from '@/features/tax-guides/components/TaxGuidesSectionHeading';
import { ESSENTIAL_TAX_GUIDES, TAX_GUIDES_PAGE_COPY } from '@/features/tax-guides/lib/content';

export default function EssentialGuides() {
  return (
    <section aria-labelledby="essential-tax-guides-heading">
      <TaxGuidesSectionHeading
        id="essential-tax-guides-heading"
        title={TAX_GUIDES_PAGE_COPY.startTitle}
        description={TAX_GUIDES_PAGE_COPY.startDescription}
      />
      <div className="grid gap-5 md:grid-cols-3">
        {ESSENTIAL_TAX_GUIDES.map((guide) => (
          <EssentialGuideCard key={guide.id} guide={guide} />
        ))}
      </div>
    </section>
  );
}
