import { AlertTriangle } from 'lucide-react';

import { formatCapitalGainsFiscalYear } from '@/features/capital-gains-tax/lib/formatting';
import type { CapitalGainsFiscalYear } from '@/features/capital-gains-tax/types';

interface CapitalGainsPendingRateNoticeProps {
  fiscalYear: CapitalGainsFiscalYear;
}

/**
 * Shown only on a non-filer result for a year whose non-filer rates are not yet
 * confirmed by the people who collect them.
 *
 * The rates themselves did not change for 2026-27 — the Finance Act 2026 left
 * Division VII alone. What changed is that it deleted the rule that had been
 * sparing non-filers the doubling on recent purchases, and NCCPL has not
 * republished its collection table since. The filer figure beside this notice is
 * unaffected, which is why the year still calculates instead of being switched
 * off.
 */
export default function CapitalGainsPendingRateNotice({
  fiscalYear,
}: CapitalGainsPendingRateNoticeProps) {
  return (
    <div className="flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
      <div className="min-w-0 text-amber-950 text-sm leading-relaxed">
        <p className="font-semibold">Check this one before you rely on it.</p>
        <p className="mt-1">
          For {formatCapitalGainsFiscalYear(fiscalYear)} the law doubles this rate because you are
          not a filer, but NCCPL has not published its collection table for the year yet. The figure
          here follows the Finance Act 2026 as written. The filer figure is not affected.
        </p>
      </div>
    </div>
  );
}
