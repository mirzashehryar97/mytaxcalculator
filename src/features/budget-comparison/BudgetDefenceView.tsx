import BudgetArticleLayout from '@/features/budget-comparison/components/BudgetArticleLayout';
import BudgetFaqs from '@/features/budget-comparison/components/BudgetFaqs';
import BudgetHighlightsBand from '@/features/budget-comparison/components/BudgetHighlightsBand';
import BudgetPageShell from '@/features/budget-comparison/components/BudgetPageShell';
import BudgetQuickTools from '@/features/budget-comparison/components/BudgetQuickTools';
import BudgetSectorExplorer from '@/features/budget-comparison/components/BudgetSectorExplorer';
import DefenceComparison from '@/features/budget-comparison/components/DefenceComparison';
import DefenceEstimateNote from '@/features/budget-comparison/components/DefenceEstimateNote';
import DefenceHero from '@/features/budget-comparison/components/DefenceHero';
import DefenceIncreaseBreakdown from '@/features/budget-comparison/components/DefenceIncreaseBreakdown';
import DefenceOverview from '@/features/budget-comparison/components/DefenceOverview';
import DefenceSources from '@/features/budget-comparison/components/DefenceSources';
import DefenceTotalsNote from '@/features/budget-comparison/components/DefenceTotalsNote';
import {
  DEFENCE_FAQS,
  DEFENCE_TOC,
  DEFENCE_TOOLS,
} from '@/features/budget-comparison/lib/defenceContent';

export default function BudgetDefenceView() {
  return (
    <BudgetPageShell>
      <DefenceHero />
      <BudgetHighlightsBand>
        <DefenceOverview />
      </BudgetHighlightsBand>
      <BudgetArticleLayout toc={DEFENCE_TOC}>
        <DefenceComparison />
        <DefenceIncreaseBreakdown />
        <DefenceTotalsNote />
        <DefenceEstimateNote />
        <BudgetSectorExplorer currentSectorId="defence-sector" />
        <BudgetQuickTools tools={DEFENCE_TOOLS} />
        <BudgetFaqs faqs={DEFENCE_FAQS} />
        <DefenceSources />
      </BudgetArticleLayout>
    </BudgetPageShell>
  );
}
