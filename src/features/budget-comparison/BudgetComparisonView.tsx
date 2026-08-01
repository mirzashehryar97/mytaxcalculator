import { BUDGET_COMPARISON_FAQS } from '@/lib/seo';

import BudgetArticleLayout from '@/features/budget-comparison/components/BudgetArticleLayout';
import BudgetDisclaimer from '@/features/budget-comparison/components/BudgetDisclaimer';
import BudgetFaqs from '@/features/budget-comparison/components/BudgetFaqs';
import BudgetGlance from '@/features/budget-comparison/components/BudgetGlance';
import BudgetHero from '@/features/budget-comparison/components/BudgetHero';
import BudgetHighlightsBand from '@/features/budget-comparison/components/BudgetHighlightsBand';
import BudgetImpact from '@/features/budget-comparison/components/BudgetImpact';
import BudgetOfficialSources from '@/features/budget-comparison/components/BudgetOfficialSources';
import BudgetPageShell from '@/features/budget-comparison/components/BudgetPageShell';
import BudgetQuickTools from '@/features/budget-comparison/components/BudgetQuickTools';
import BudgetSectors from '@/features/budget-comparison/components/BudgetSectors';
import SalaryBudgetImpact from '@/features/budget-comparison/components/SalaryBudgetImpact';
import { BUDGET_TOC, BUDGET_TOOLS } from '@/features/budget-comparison/lib/content';

export default function BudgetComparisonView() {
  return (
    <BudgetPageShell>
      <BudgetHero />
      <BudgetHighlightsBand>
        <BudgetGlance />
      </BudgetHighlightsBand>
      <BudgetArticleLayout toc={BUDGET_TOC}>
        <BudgetImpact />
        <SalaryBudgetImpact />
        <BudgetSectors />
        <BudgetQuickTools tools={BUDGET_TOOLS} />
        <BudgetFaqs faqs={BUDGET_COMPARISON_FAQS} />
        <BudgetDisclaimer />
        <BudgetOfficialSources />
      </BudgetArticleLayout>
    </BudgetPageShell>
  );
}
