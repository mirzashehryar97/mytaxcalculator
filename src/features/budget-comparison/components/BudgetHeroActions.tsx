'use client';

import { Printer, Share2 } from 'lucide-react';

import useBudgetHeroActions from '@/features/budget-comparison/hooks/useBudgetHeroActions';

export default function BudgetHeroActions() {
  const { printPage, sharePage, shareStatus } = useBudgetHeroActions();

  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={printPage}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 font-semibold text-base text-emerald-900 shadow-emerald-950/20 shadow-lg transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-200"
        >
          <Printer className="h-5 w-5" aria-hidden="true" />
          Print comparison
        </button>
        <button
          type="button"
          onClick={sharePage}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/80 px-5 font-semibold text-base text-white transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-emerald-200"
        >
          <Share2 className="h-5 w-5" aria-hidden="true" />
          Share
        </button>
      </div>
      {shareStatus ? (
        <p className="mt-2 text-emerald-100 text-sm" aria-live="polite">
          {shareStatus}
        </p>
      ) : null}
    </div>
  );
}
