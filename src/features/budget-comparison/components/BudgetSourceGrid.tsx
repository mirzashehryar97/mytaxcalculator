import OfficialSourcesGrid from '@/components/calculator/OfficialSourcesGrid';

import type { BudgetSource } from '@/features/budget-comparison/types';

interface BudgetSourceGridProps {
  sources: readonly BudgetSource[];
  columns?: 2 | 3;
}

export default function BudgetSourceGrid({ sources, columns = 3 }: BudgetSourceGridProps) {
  return <OfficialSourcesGrid sources={sources} columns={columns} />;
}
