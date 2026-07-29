import BudgetFaqs from '@/features/budget-comparison/components/BudgetFaqs';
import BudgetSectorExplorer from '@/features/budget-comparison/components/BudgetSectorExplorer';
import BudgetSidebar from '@/features/budget-comparison/components/BudgetSidebar';
import FreelancersItComparison from '@/features/budget-comparison/components/FreelancersItComparison';
import FreelancersItExample from '@/features/budget-comparison/components/FreelancersItExample';
import FreelancersItHero from '@/features/budget-comparison/components/FreelancersItHero';
import FreelancersItOverview from '@/features/budget-comparison/components/FreelancersItOverview';
import FreelancersItScope from '@/features/budget-comparison/components/FreelancersItScope';
import FreelancersItSources from '@/features/budget-comparison/components/FreelancersItSources';
import {
  FREELANCERS_IT_FAQS,
  FREELANCERS_IT_PAGE_LABELS,
  FREELANCERS_IT_TOC,
  FREELANCERS_IT_TOOLS,
} from '@/features/budget-comparison/lib/freelancersItContent';

export default function BudgetFreelancersItView() {
  return (
    <div className="-mb-20 -mt-12 -translate-x-1/2 relative left-1/2 w-screen bg-[#fbfcfb] text-slate-800">
      <FreelancersItHero />
      <article className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-10 lg:px-12 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-10">
          <FreelancersItOverview />
          <FreelancersItComparison />
          <FreelancersItExample />
          <FreelancersItScope />
          <BudgetFaqs faqs={FREELANCERS_IT_FAQS} />
          <BudgetSectorExplorer currentSectorId="freelancers-it" />
          <FreelancersItSources />
        </div>
        <BudgetSidebar
          toc={FREELANCERS_IT_TOC}
          tools={FREELANCERS_IT_TOOLS}
          sourceStatusTitle={FREELANCERS_IT_PAGE_LABELS.sourceStatusTitle}
          sourceStatusDetail={FREELANCERS_IT_PAGE_LABELS.sourceStatusDetail}
        />
      </article>
    </div>
  );
}
