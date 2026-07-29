import { ArrowRight, PlusCircle } from 'lucide-react';

import { MULTI_YEAR_COPY } from '@/features/multi-year-tax/lib/content';

interface MultiYearEditorActionsProps {
  canCalculate: boolean;
  onAddPeriod: () => void;
  onCalculate: () => void;
}

export default function MultiYearEditorActions({
  canCalculate,
  onAddPeriod,
  onCalculate,
}: MultiYearEditorActionsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <button
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-emerald-200 border-dashed px-4 font-semibold text-emerald-700 transition-colors hover:border-emerald-400 hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-600/15"
        onClick={onAddPeriod}
        type="button"
      >
        <PlusCircle aria-hidden="true" className="h-5 w-5" />
        {MULTI_YEAR_COPY.addPeriod}
      </button>

      <button
        className="btn-calculate inline-flex items-center justify-center gap-2 sm:w-auto"
        disabled={!canCalculate}
        onClick={onCalculate}
        type="button"
      >
        {MULTI_YEAR_COPY.calculate}
        <ArrowRight aria-hidden="true" className="h-5 w-5" />
      </button>
    </div>
  );
}
