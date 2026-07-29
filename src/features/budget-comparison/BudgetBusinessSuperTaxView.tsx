import BudgetFaqs from '@/features/budget-comparison/components/BudgetFaqs';
import BudgetSectorExplorer from '@/features/budget-comparison/components/BudgetSectorExplorer';
import BudgetSidebar from '@/features/budget-comparison/components/BudgetSidebar';
import BusinessSuperTaxComparison from '@/features/budget-comparison/components/BusinessSuperTaxComparison';
import BusinessSuperTaxExample from '@/features/budget-comparison/components/BusinessSuperTaxExample';
import BusinessSuperTaxHero from '@/features/budget-comparison/components/BusinessSuperTaxHero';
import BusinessSuperTaxOverview from '@/features/budget-comparison/components/BusinessSuperTaxOverview';
import BusinessSuperTaxRetailerNote from '@/features/budget-comparison/components/BusinessSuperTaxRetailerNote';
import BusinessSuperTaxSources from '@/features/budget-comparison/components/BusinessSuperTaxSources';
import {
  BUSINESS_SUPER_TAX_FAQS,
  BUSINESS_SUPER_TAX_PAGE_LABELS,
  BUSINESS_SUPER_TAX_TOC,
  BUSINESS_SUPER_TAX_TOOLS,
} from '@/features/budget-comparison/lib/businessSuperTaxContent';

export default function BudgetBusinessSuperTaxView() {
  return (
    <div className="-mb-20 -mt-12 -translate-x-1/2 relative left-1/2 w-screen bg-[#fbfcfb] text-slate-800">
      <BusinessSuperTaxHero />
      <article className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-10 lg:px-12 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-10">
          <BusinessSuperTaxOverview />
          <BusinessSuperTaxComparison />
          <BusinessSuperTaxExample />
          <BusinessSuperTaxRetailerNote />
          <BudgetFaqs faqs={BUSINESS_SUPER_TAX_FAQS} />
          <BudgetSectorExplorer currentSectorId="business-super-tax" />
          <BusinessSuperTaxSources />
        </div>
        <BudgetSidebar
          toc={BUSINESS_SUPER_TAX_TOC}
          tools={BUSINESS_SUPER_TAX_TOOLS}
          sourceStatusTitle={BUSINESS_SUPER_TAX_PAGE_LABELS.sourceStatusTitle}
          sourceStatusDetail={BUSINESS_SUPER_TAX_PAGE_LABELS.sourceStatusDetail}
        />
      </article>
    </div>
  );
}
