import BudgetHeroShell from '@/features/budget-comparison/components/BudgetHeroShell';
import { BUDGET_HERO } from '@/features/budget-comparison/lib/content';

export default function BudgetHero() {
  return (
    <BudgetHeroShell
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Budget Comparison' }]}
      content={BUDGET_HERO}
    />
  );
}
