import BudgetArticleLayout from '@/features/budget-comparison/components/BudgetArticleLayout';
import BudgetFaqs from '@/features/budget-comparison/components/BudgetFaqs';
import BudgetHighlightsBand from '@/features/budget-comparison/components/BudgetHighlightsBand';
import BudgetPageShell from '@/features/budget-comparison/components/BudgetPageShell';
import BudgetQuickTools from '@/features/budget-comparison/components/BudgetQuickTools';
import BudgetSectorExplorer from '@/features/budget-comparison/components/BudgetSectorExplorer';
import VehiclesComparison from '@/features/budget-comparison/components/VehiclesComparison';
import VehiclesExample from '@/features/budget-comparison/components/VehiclesExample';
import VehiclesHero from '@/features/budget-comparison/components/VehiclesHero';
import VehiclesLevyNote from '@/features/budget-comparison/components/VehiclesLevyNote';
import VehiclesOverview from '@/features/budget-comparison/components/VehiclesOverview';
import VehiclesSources from '@/features/budget-comparison/components/VehiclesSources';
import {
  VEHICLES_FAQS,
  VEHICLES_TOC,
  VEHICLES_TOOLS,
} from '@/features/budget-comparison/lib/vehiclesContent';

export default function BudgetVehiclesView() {
  return (
    <BudgetPageShell>
      <VehiclesHero />
      <BudgetHighlightsBand>
        <VehiclesOverview />
      </BudgetHighlightsBand>
      <BudgetArticleLayout toc={VEHICLES_TOC}>
        <VehiclesComparison />
        <VehiclesExample />
        <VehiclesLevyNote />
        <BudgetSectorExplorer currentSectorId="vehicles" />
        <BudgetQuickTools tools={VEHICLES_TOOLS} />
        <BudgetFaqs faqs={VEHICLES_FAQS} />
        <VehiclesSources />
      </BudgetArticleLayout>
    </BudgetPageShell>
  );
}
