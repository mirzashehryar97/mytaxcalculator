import { UserRoundCheck } from 'lucide-react';

import { CAPITAL_GAINS_RESULT_COPY } from '@/features/capital-gains-tax/lib/content';
import { formatPkr } from '@/features/capital-gains-tax/lib/formatting';

interface CapitalGainsFilerComparisonProps {
  saving: number;
}

/**
 * The nudge that matters on these pages: what being a filer would have saved on
 * this exact sale. Only rendered when there is a difference to show.
 */
export default function CapitalGainsFilerComparison({ saving }: CapitalGainsFilerComparisonProps) {
  return (
    <div className="space-y-3">
      <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-blue-600 ring-1 ring-blue-200">
          <UserRoundCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <strong className="block font-semibold text-blue-950 text-sm">
            {CAPITAL_GAINS_RESULT_COPY.joinListTitle}
          </strong>
          <span className="mt-0.5 block text-blue-950/75 text-sm leading-relaxed">
            {CAPITAL_GAINS_RESULT_COPY.joinListBody}
          </span>
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
        <span className="min-w-0 text-emerald-900 text-sm">
          {CAPITAL_GAINS_RESULT_COPY.savingLabel}
        </span>
        <strong className="amount-wrap font-bold text-emerald-700 text-lg tabular-nums">
          {formatPkr(saving)}
        </strong>
      </div>
    </div>
  );
}
