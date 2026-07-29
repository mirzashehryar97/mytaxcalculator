import BudgetHeroShell from '@/features/budget-comparison/components/BudgetHeroShell';
import { DEFENCE_HERO } from '@/features/budget-comparison/lib/defenceContent';

export default function DefenceHero() {
  return (
    <BudgetHeroShell
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Budget Comparison', href: '/budget-2025-26-vs-2026-27' },
        { label: 'Defence' },
      ]}
      content={DEFENCE_HERO}
    />
  );
}
