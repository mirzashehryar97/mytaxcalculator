import BudgetFaqs from '@/features/budget-comparison/components/BudgetFaqs';
import BudgetSectorExplorer from '@/features/budget-comparison/components/BudgetSectorExplorer';
import BudgetSidebar from '@/features/budget-comparison/components/BudgetSidebar';
import SolarBottomLine from '@/features/budget-comparison/components/SolarBottomLine';
import SolarComparison from '@/features/budget-comparison/components/SolarComparison';
import SolarExample from '@/features/budget-comparison/components/SolarExample';
import SolarHero from '@/features/budget-comparison/components/SolarHero';
import SolarOverview from '@/features/budget-comparison/components/SolarOverview';
import SolarSources from '@/features/budget-comparison/components/SolarSources';
import SolarTaxNote from '@/features/budget-comparison/components/SolarTaxNote';
import {
  SOLAR_FAQS,
  SOLAR_PAGE_LABELS,
  SOLAR_TOC,
  SOLAR_TOOLS,
} from '@/features/budget-comparison/lib/solarContent';

export default function BudgetSolarView() {
  return (
    <div className="-mb-20 -mt-12 -translate-x-1/2 relative left-1/2 w-screen bg-[#fbfcfb] text-slate-800">
      <SolarHero />
      <article className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-10 lg:px-12 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-10">
          <SolarOverview />
          <SolarComparison />
          <SolarExample />
          <SolarTaxNote />
          <SolarBottomLine />
          <BudgetFaqs faqs={SOLAR_FAQS} />
          <BudgetSectorExplorer currentSectorId="solar" />
          <SolarSources />
        </div>
        <BudgetSidebar
          toc={SOLAR_TOC}
          tools={SOLAR_TOOLS}
          sourceStatusTitle={SOLAR_PAGE_LABELS.sourceStatusTitle}
          sourceStatusDetail={SOLAR_PAGE_LABELS.sourceStatusDetail}
        />
      </article>
    </div>
  );
}
