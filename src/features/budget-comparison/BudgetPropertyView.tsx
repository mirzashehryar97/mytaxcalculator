import BudgetArticleLayout from '@/features/budget-comparison/components/BudgetArticleLayout';
import BudgetFaqs from '@/features/budget-comparison/components/BudgetFaqs';
import BudgetHighlightsBand from '@/features/budget-comparison/components/BudgetHighlightsBand';
import BudgetPageShell from '@/features/budget-comparison/components/BudgetPageShell';
import BudgetQuickTools from '@/features/budget-comparison/components/BudgetQuickTools';
import BudgetSectorExplorer from '@/features/budget-comparison/components/BudgetSectorExplorer';
import PropertyCalculatorLinks from '@/features/budget-comparison/components/PropertyCalculatorLinks';
import PropertyComparison from '@/features/budget-comparison/components/PropertyComparison';
import PropertyExample from '@/features/budget-comparison/components/PropertyExample';
import PropertyHero from '@/features/budget-comparison/components/PropertyHero';
import PropertyOverview from '@/features/budget-comparison/components/PropertyOverview';
import PropertySources from '@/features/budget-comparison/components/PropertySources';
import PropertyTaxNote from '@/features/budget-comparison/components/PropertyTaxNote';
import {
  PROPERTY_FAQS,
  PROPERTY_TOC,
  PROPERTY_TOOLS,
} from '@/features/budget-comparison/lib/propertyContent';

export default function BudgetPropertyView() {
  return (
    <BudgetPageShell>
      <PropertyHero />
      <BudgetHighlightsBand>
        <PropertyOverview />
      </BudgetHighlightsBand>
      <BudgetArticleLayout toc={PROPERTY_TOC}>
        <PropertyComparison />
        <PropertyExample />
        <PropertyCalculatorLinks />
        <PropertyTaxNote />
        <BudgetSectorExplorer currentSectorId="property" />
        <BudgetQuickTools tools={PROPERTY_TOOLS} />
        <BudgetFaqs faqs={PROPERTY_FAQS} />
        <PropertySources />
      </BudgetArticleLayout>
    </BudgetPageShell>
  );
}
