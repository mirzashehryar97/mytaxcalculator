import { UserRoundCheck } from 'lucide-react';

import { formatPkr } from '@/features/withholding-tax/lib/formatting';

interface WithholdingFilerComparisonProps {
  title: string;
  body: string;
  savingLabel: string;
  saving: number;
}

/**
 * The nudge that matters on these pages: what being a filer would have saved on
 * this exact transaction.
 */
export default function WithholdingFilerComparison({
  title,
  body,
  savingLabel,
  saving,
}: WithholdingFilerComparisonProps) {
  return (
    <div className="space-y-3">
      <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-blue-600 ring-1 ring-blue-200">
          <UserRoundCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <strong className="block font-semibold text-blue-950 text-sm">{title}</strong>
          <span className="mt-0.5 block text-blue-950/75 text-sm leading-relaxed">{body}</span>
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
        <span className="min-w-0 text-emerald-900 text-sm">{savingLabel}</span>
        <strong className="amount-wrap font-bold text-emerald-700 text-lg tabular-nums">
          {formatPkr(saving)}
        </strong>
      </div>
    </div>
  );
}
