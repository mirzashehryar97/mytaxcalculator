import BudgetHeroShell from '@/features/budget-comparison/components/BudgetHeroShell';
import { FREELANCERS_IT_HERO } from '@/features/budget-comparison/lib/freelancersItContent';

export default function FreelancersItHero() {
  return (
    <BudgetHeroShell
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Budget Comparison', href: '/budget-2025-26-vs-2026-27' },
        { label: 'Freelancers & IT' },
      ]}
      content={FREELANCERS_IT_HERO}
    />
  );
}
