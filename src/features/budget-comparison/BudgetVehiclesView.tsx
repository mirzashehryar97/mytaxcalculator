import BudgetFaqs from '@/features/budget-comparison/components/BudgetFaqs';
import BudgetSectorExplorer from '@/features/budget-comparison/components/BudgetSectorExplorer';
import BudgetSidebar from '@/features/budget-comparison/components/BudgetSidebar';
import VehiclesComparison from '@/features/budget-comparison/components/VehiclesComparison';
import VehiclesExample from '@/features/budget-comparison/components/VehiclesExample';
import VehiclesHero from '@/features/budget-comparison/components/VehiclesHero';
import VehiclesLevyNote from '@/features/budget-comparison/components/VehiclesLevyNote';
import VehiclesOverview from '@/features/budget-comparison/components/VehiclesOverview';
import VehiclesSources from '@/features/budget-comparison/components/VehiclesSources';
import {
  VEHICLES_FAQS,
  VEHICLES_PAGE_LABELS,
  VEHICLES_TOC,
  VEHICLES_TOOLS,
} from '@/features/budget-comparison/lib/vehiclesContent';

export default function BudgetVehiclesView() {
  return (
    <div className="-mb-20 -mt-12 -translate-x-1/2 relative left-1/2 w-screen bg-[#fbfcfb] text-slate-800">
      <VehiclesHero />
      <article className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-10 lg:px-12 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-10">
          <VehiclesOverview />
          <VehiclesComparison />
          <VehiclesExample />
          <VehiclesLevyNote />
          <BudgetFaqs faqs={VEHICLES_FAQS} />
          <BudgetSectorExplorer currentSectorId="vehicles" />
          <VehiclesSources />
        </div>
        <BudgetSidebar
          toc={VEHICLES_TOC}
          tools={VEHICLES_TOOLS}
          sourceStatusTitle={VEHICLES_PAGE_LABELS.sourceStatusTitle}
          sourceStatusDetail={VEHICLES_PAGE_LABELS.sourceStatusDetail}
        />
      </article>
    </div>
  );
}
