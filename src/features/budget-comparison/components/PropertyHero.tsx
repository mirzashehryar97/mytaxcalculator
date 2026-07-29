import BudgetHeroShell from '@/features/budget-comparison/components/BudgetHeroShell';
import { PROPERTY_HERO } from '@/features/budget-comparison/lib/propertyContent';

export default function PropertyHero() {
  return (
    <BudgetHeroShell
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Budget Comparison', href: '/budget-2025-26-vs-2026-27' },
        { label: 'Property' },
      ]}
      content={PROPERTY_HERO}
    />
  );
}
