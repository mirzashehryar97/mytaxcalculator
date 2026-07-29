import BudgetHeroShell from '@/features/budget-comparison/components/BudgetHeroShell';
import { SOLAR_HERO } from '@/features/budget-comparison/lib/solarContent';

export default function SolarHero() {
  return (
    <BudgetHeroShell
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Budget Comparison', href: '/budget-2025-26-vs-2026-27' },
        { label: 'Solar' },
      ]}
      content={SOLAR_HERO}
    />
  );
}
