import BudgetFaqs from '@/features/budget-comparison/components/BudgetFaqs';
import BudgetSectorExplorer from '@/features/budget-comparison/components/BudgetSectorExplorer';
import BudgetSidebar from '@/features/budget-comparison/components/BudgetSidebar';
import PropertyComparison from '@/features/budget-comparison/components/PropertyComparison';
import PropertyExample from '@/features/budget-comparison/components/PropertyExample';
import PropertyHero from '@/features/budget-comparison/components/PropertyHero';
import PropertyOverview from '@/features/budget-comparison/components/PropertyOverview';
import PropertySources from '@/features/budget-comparison/components/PropertySources';
import PropertyTaxNote from '@/features/budget-comparison/components/PropertyTaxNote';
import {
  PROPERTY_FAQS,
  PROPERTY_PAGE_LABELS,
  PROPERTY_TOC,
  PROPERTY_TOOLS,
} from '@/features/budget-comparison/lib/propertyContent';

export default function BudgetPropertyView() {
  return (
    <div className="-mb-20 -mt-12 -translate-x-1/2 relative left-1/2 w-screen bg-[#fbfcfb] text-slate-800">
      <PropertyHero />
      <article className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-10 lg:px-12 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-10">
          <PropertyOverview />
          <PropertyComparison />
          <PropertyExample />
          <PropertyTaxNote />
          <BudgetFaqs faqs={PROPERTY_FAQS} />
          <BudgetSectorExplorer currentSectorId="property" />
          <PropertySources />
        </div>
        <BudgetSidebar
          toc={PROPERTY_TOC}
          tools={PROPERTY_TOOLS}
          sourceStatusTitle={PROPERTY_PAGE_LABELS.sourceStatusTitle}
          sourceStatusDetail={PROPERTY_PAGE_LABELS.sourceStatusDetail}
        />
      </article>
    </div>
  );
}
