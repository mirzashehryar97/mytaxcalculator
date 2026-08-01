import BudgetArticleLayout from '@/features/budget-comparison/components/BudgetArticleLayout';
import BudgetFaqs from '@/features/budget-comparison/components/BudgetFaqs';
import BudgetHighlightsBand from '@/features/budget-comparison/components/BudgetHighlightsBand';
import BudgetPageShell from '@/features/budget-comparison/components/BudgetPageShell';
import BudgetQuickTools from '@/features/budget-comparison/components/BudgetQuickTools';
import BudgetSectorExplorer from '@/features/budget-comparison/components/BudgetSectorExplorer';
import FreelancersItComparison from '@/features/budget-comparison/components/FreelancersItComparison';
import FreelancersItExample from '@/features/budget-comparison/components/FreelancersItExample';
import FreelancersItHero from '@/features/budget-comparison/components/FreelancersItHero';
import FreelancersItOverview from '@/features/budget-comparison/components/FreelancersItOverview';
import FreelancersItScope from '@/features/budget-comparison/components/FreelancersItScope';
import FreelancersItSources from '@/features/budget-comparison/components/FreelancersItSources';
import {
  FREELANCERS_IT_FAQS,
  FREELANCERS_IT_TOC,
  FREELANCERS_IT_TOOLS,
} from '@/features/budget-comparison/lib/freelancersItContent';

export default function BudgetFreelancersItView() {
  return (
    <BudgetPageShell>
      <FreelancersItHero />
      <BudgetHighlightsBand>
        <FreelancersItOverview />
      </BudgetHighlightsBand>
      <BudgetArticleLayout toc={FREELANCERS_IT_TOC}>
        <FreelancersItComparison />
        <FreelancersItExample />
        <FreelancersItScope />
        <BudgetSectorExplorer currentSectorId="freelancers-it" />
        <BudgetQuickTools tools={FREELANCERS_IT_TOOLS} />
        <BudgetFaqs faqs={FREELANCERS_IT_FAQS} />
        <FreelancersItSources />
      </BudgetArticleLayout>
    </BudgetPageShell>
  );
}
