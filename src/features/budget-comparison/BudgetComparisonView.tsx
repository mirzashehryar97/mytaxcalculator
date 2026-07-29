import { BUDGET_COMPARISON_FAQS } from '@/lib/seo';

import BudgetDisclaimer from '@/features/budget-comparison/components/BudgetDisclaimer';
import BudgetFaqs from '@/features/budget-comparison/components/BudgetFaqs';
import BudgetGlance from '@/features/budget-comparison/components/BudgetGlance';
import BudgetHero from '@/features/budget-comparison/components/BudgetHero';
import BudgetImpact from '@/features/budget-comparison/components/BudgetImpact';
import BudgetOfficialSources from '@/features/budget-comparison/components/BudgetOfficialSources';
import BudgetSectors from '@/features/budget-comparison/components/BudgetSectors';
import BudgetSidebar from '@/features/budget-comparison/components/BudgetSidebar';
import SalaryBudgetImpact from '@/features/budget-comparison/components/SalaryBudgetImpact';

export default function BudgetComparisonView() {
  return (
    <div className="-mb-20 -mt-12 -translate-x-1/2 relative left-1/2 w-screen bg-[#fbfcfb] text-slate-800">
      <BudgetHero />
      <article className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-10 lg:px-12 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-10">
          <BudgetGlance />
          <BudgetImpact />
          <SalaryBudgetImpact />
          <BudgetSectors />
          <BudgetFaqs faqs={BUDGET_COMPARISON_FAQS} />
          <BudgetDisclaimer />
          <BudgetOfficialSources />
        </div>
        <BudgetSidebar />
      </article>
    </div>
  );
}
