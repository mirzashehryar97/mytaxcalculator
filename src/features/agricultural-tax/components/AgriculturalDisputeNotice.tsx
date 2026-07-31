import { ShieldAlert } from 'lucide-react';

import { AGRICULTURAL_RESULT_COPY } from '@/features/agricultural-tax/lib/content';

/**
 * Shown on a Punjab result. Punjab set its rates by notification rather than
 * through the Assembly, and the Assembly ruled those notifications void — so
 * the figures are published but the legal position is not settled.
 */
export default function AgriculturalDisputeNotice() {
  return (
    <p className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-950 text-sm leading-relaxed sm:p-5">
      <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
      <span>
        <strong className="block font-bold text-base">
          {AGRICULTURAL_RESULT_COPY.disputeTitle}
        </strong>
        <span className="mt-1 block">{AGRICULTURAL_RESULT_COPY.disputeBody}</span>
      </span>
    </p>
  );
}
