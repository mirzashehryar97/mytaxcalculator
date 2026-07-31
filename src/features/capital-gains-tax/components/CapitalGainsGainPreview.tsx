import { CheckCircle2, TrendingDown } from 'lucide-react';

import { formatPkr } from '@/features/capital-gains-tax/lib/formatting';

interface CapitalGainsGainPreviewProps {
  label: string;
  /** The profit, already floored at zero. */
  gain: number;
  isLoss: boolean;
  /** How much was lost, as a positive number. */
  lossAmount: number;
}

/**
 * Sits at the foot of the form so the profit is visible while the amounts are
 * still being typed — it is the number the whole calculation turns on, and
 * people get it wrong by entering the sale amount instead.
 */
export default function CapitalGainsGainPreview({
  label,
  gain,
  isLoss,
  lossAmount,
}: CapitalGainsGainPreviewProps) {
  if (isLoss) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <TrendingDown className="h-6 w-6 shrink-0 text-amber-600" aria-hidden="true" />
        <span className="min-w-0">
          <span className="block text-amber-900 text-sm">You made a loss of</span>
          <strong className="amount-wrap block font-bold text-amber-700 text-xl tabular-nums">
            {formatPkr(lossAmount)}
          </strong>
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
      <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" aria-hidden="true" />
      <span className="min-w-0">
        <span className="block text-emerald-900 text-sm">{label}</span>
        <strong className="amount-wrap block font-bold text-emerald-700 text-xl tabular-nums">
          {formatPkr(gain)}
        </strong>
      </span>
    </div>
  );
}
