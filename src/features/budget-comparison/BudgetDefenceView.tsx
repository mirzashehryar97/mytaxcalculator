import BudgetFaqs from '@/features/budget-comparison/components/BudgetFaqs';
import BudgetSectorExplorer from '@/features/budget-comparison/components/BudgetSectorExplorer';
import BudgetSidebar from '@/features/budget-comparison/components/BudgetSidebar';
import DefenceComparison from '@/features/budget-comparison/components/DefenceComparison';
import DefenceEstimateNote from '@/features/budget-comparison/components/DefenceEstimateNote';
import DefenceHero from '@/features/budget-comparison/components/DefenceHero';
import DefenceIncreaseBreakdown from '@/features/budget-comparison/components/DefenceIncreaseBreakdown';
import DefenceOverview from '@/features/budget-comparison/components/DefenceOverview';
import DefenceSources from '@/features/budget-comparison/components/DefenceSources';
import DefenceTotalsNote from '@/features/budget-comparison/components/DefenceTotalsNote';
import {
  DEFENCE_FAQS,
  DEFENCE_PAGE_LABELS,
  DEFENCE_TOC,
  DEFENCE_TOOLS,
} from '@/features/budget-comparison/lib/defenceContent';

export default function BudgetDefenceView() {
  return (
    <div className="-mb-20 -mt-12 -translate-x-1/2 relative left-1/2 w-screen bg-[#fbfcfb] text-slate-800">
      <DefenceHero />
      <article className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-10 lg:px-12 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-10">
          <DefenceOverview />
          <DefenceComparison />
          <DefenceIncreaseBreakdown />
          <DefenceTotalsNote />
          <DefenceEstimateNote />
          <BudgetFaqs faqs={DEFENCE_FAQS} />
          <BudgetSectorExplorer currentSectorId="defence-sector" />
          <DefenceSources />
        </div>
        <BudgetSidebar
          toc={DEFENCE_TOC}
          tools={DEFENCE_TOOLS}
          sourceStatusTitle={DEFENCE_PAGE_LABELS.sourceStatusTitle}
          sourceStatusDetail={DEFENCE_PAGE_LABELS.sourceStatusDetail}
        />
      </article>
    </div>
  );
}
