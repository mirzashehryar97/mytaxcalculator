import BudgetHeroShell from '@/features/budget-comparison/components/BudgetHeroShell';
import { BUSINESS_SUPER_TAX_HERO } from '@/features/budget-comparison/lib/businessSuperTaxContent';

export default function BusinessSuperTaxHero() {
  return (
    <BudgetHeroShell
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Budget Comparison', href: '/budget-2025-26-vs-2026-27' },
        { label: 'Business & super tax' },
      ]}
      content={BUSINESS_SUPER_TAX_HERO}
    />
  );
}
