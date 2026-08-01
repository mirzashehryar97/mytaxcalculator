import BudgetArticleLayout from '@/features/budget-comparison/components/BudgetArticleLayout';
import BudgetFaqs from '@/features/budget-comparison/components/BudgetFaqs';
import BudgetHighlightsBand from '@/features/budget-comparison/components/BudgetHighlightsBand';
import BudgetPageShell from '@/features/budget-comparison/components/BudgetPageShell';
import BudgetQuickTools from '@/features/budget-comparison/components/BudgetQuickTools';
import BudgetSectorExplorer from '@/features/budget-comparison/components/BudgetSectorExplorer';
import SolarBottomLine from '@/features/budget-comparison/components/SolarBottomLine';
import SolarComparison from '@/features/budget-comparison/components/SolarComparison';
import SolarExample from '@/features/budget-comparison/components/SolarExample';
import SolarHero from '@/features/budget-comparison/components/SolarHero';
import SolarOverview from '@/features/budget-comparison/components/SolarOverview';
import SolarSources from '@/features/budget-comparison/components/SolarSources';
import SolarTaxNote from '@/features/budget-comparison/components/SolarTaxNote';
import { SOLAR_FAQS, SOLAR_TOC, SOLAR_TOOLS } from '@/features/budget-comparison/lib/solarContent';

export default function BudgetSolarView() {
  return (
    <BudgetPageShell>
      <SolarHero />
      <BudgetHighlightsBand>
        <SolarOverview />
      </BudgetHighlightsBand>
      <BudgetArticleLayout toc={SOLAR_TOC}>
        <SolarComparison />
        <SolarExample />
        <SolarTaxNote />
        <SolarBottomLine />
        <BudgetSectorExplorer currentSectorId="solar" />
        <BudgetQuickTools tools={SOLAR_TOOLS} />
        <BudgetFaqs faqs={SOLAR_FAQS} />
        <SolarSources />
      </BudgetArticleLayout>
    </BudgetPageShell>
  );
}
