import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import BudgetSectionHeading from '@/features/budget-comparison/components/BudgetSectionHeading';
import BudgetSectorGrid from '@/features/budget-comparison/components/BudgetSectorGrid';
import { BUDGET_SECTOR_SUMMARIES } from '@/features/budget-comparison/lib/content';

interface BudgetSectorExplorerProps {
  currentSectorId: string;
}

export default function BudgetSectorExplorer({ currentSectorId }: BudgetSectorExplorerProps) {
  return (
    <section
      id="explore-sectors"
      aria-labelledby="explore-sectors-heading"
      className="scroll-mt-24"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <BudgetSectionHeading id="explore-sectors-heading">
            Explore budget impact by sector
          </BudgetSectionHeading>
          <p className="-mt-3 mb-5 max-w-2xl text-base text-slate-600 leading-7">
            Compare the enacted FY 2026–27 changes across taxpayers and industries.
          </p>
        </div>
        <Link
          href="/budget-2025-26-vs-2026-27"
          className="mb-5 inline-flex w-fit shrink-0 items-center gap-2 font-semibold text-base text-emerald-800 hover:text-emerald-950 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Full budget comparison
        </Link>
      </div>
      <BudgetSectorGrid
        sectors={BUDGET_SECTOR_SUMMARIES}
        linkLabel="View comparison"
        currentSectorId={currentSectorId}
        compact
      />
    </section>
  );
}
