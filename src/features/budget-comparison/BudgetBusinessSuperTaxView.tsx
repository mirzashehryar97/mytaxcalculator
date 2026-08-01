import BudgetArticleLayout from '@/features/budget-comparison/components/BudgetArticleLayout';
import BudgetFaqs from '@/features/budget-comparison/components/BudgetFaqs';
import BudgetHighlightsBand from '@/features/budget-comparison/components/BudgetHighlightsBand';
import BudgetPageShell from '@/features/budget-comparison/components/BudgetPageShell';
import BudgetQuickTools from '@/features/budget-comparison/components/BudgetQuickTools';
import BudgetSectorExplorer from '@/features/budget-comparison/components/BudgetSectorExplorer';
import BusinessSuperTaxComparison from '@/features/budget-comparison/components/BusinessSuperTaxComparison';
import BusinessSuperTaxExample from '@/features/budget-comparison/components/BusinessSuperTaxExample';
import BusinessSuperTaxHero from '@/features/budget-comparison/components/BusinessSuperTaxHero';
import BusinessSuperTaxOverview from '@/features/budget-comparison/components/BusinessSuperTaxOverview';
import BusinessSuperTaxRetailerNote from '@/features/budget-comparison/components/BusinessSuperTaxRetailerNote';
import BusinessSuperTaxSources from '@/features/budget-comparison/components/BusinessSuperTaxSources';
import {
  BUSINESS_SUPER_TAX_FAQS,
  BUSINESS_SUPER_TAX_TOC,
  BUSINESS_SUPER_TAX_TOOLS,
} from '@/features/budget-comparison/lib/businessSuperTaxContent';

export default function BudgetBusinessSuperTaxView() {
  return (
    <BudgetPageShell>
      <BusinessSuperTaxHero />
      <BudgetHighlightsBand>
        <BusinessSuperTaxOverview />
      </BudgetHighlightsBand>
      <BudgetArticleLayout toc={BUSINESS_SUPER_TAX_TOC}>
        <BusinessSuperTaxComparison />
        <BusinessSuperTaxExample />
        <BusinessSuperTaxRetailerNote />
        <BudgetSectorExplorer currentSectorId="business-super-tax" />
        <BudgetQuickTools tools={BUSINESS_SUPER_TAX_TOOLS} />
        <BudgetFaqs faqs={BUSINESS_SUPER_TAX_FAQS} />
        <BusinessSuperTaxSources />
      </BudgetArticleLayout>
    </BudgetPageShell>
  );
}
