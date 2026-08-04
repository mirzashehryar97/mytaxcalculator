import { Info } from 'lucide-react';

import { PTA_USED_PHONE_NOTE } from '@/features/pta-tax/lib/content';
import { formatUsd } from '@/features/pta-tax/lib/formatting';
import type { PtaPhone } from '@/features/pta-tax/types';

interface PtaUsedPhoneNoteProps {
  /** The old-and-used ruling's figure, where it lists this handset at all. */
  usedPhone: PtaPhone | null;
}

/**
 * Shown only when the handset is used. The answer people expect — a lower
 * value — is wrong for a traveller, and the reason is buried in a note on the
 * last page of a 29-page valuation ruling.
 */
export default function PtaUsedPhoneNote({ usedPhone }: PtaUsedPhoneNoteProps) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
      <h3 className="flex items-start gap-2 font-semibold text-amber-900 text-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        {PTA_USED_PHONE_NOTE.title}
      </h3>
      <p className="mt-2 text-amber-900/80 text-xs leading-relaxed">{PTA_USED_PHONE_NOTE.body}</p>

      {usedPhone ? (
        <div className="mt-3 border-amber-200 border-t pt-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-amber-900/80 text-xs">{PTA_USED_PHONE_NOTE.commercialLabel}</span>
            <strong className="font-bold text-amber-900 text-sm tabular-nums">
              {formatUsd(usedPhone.cnfUsd)}
            </strong>
          </div>
          <p className="mt-1 text-amber-900/70 text-xs leading-relaxed">
            {PTA_USED_PHONE_NOTE.commercialNote}
          </p>
        </div>
      ) : null}
    </div>
  );
}
