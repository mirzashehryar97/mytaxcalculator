import BudgetHeroShell from '@/features/budget-comparison/components/BudgetHeroShell';
import { VEHICLES_HERO } from '@/features/budget-comparison/lib/vehiclesContent';

export default function VehiclesHero() {
  return (
    <BudgetHeroShell
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Budget Comparison', href: '/budget-2025-26-vs-2026-27' },
        { label: 'Vehicles' },
      ]}
      content={VEHICLES_HERO}
    />
  );
}
