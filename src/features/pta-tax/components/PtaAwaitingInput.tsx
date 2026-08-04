import { Smartphone } from 'lucide-react';

import { PTA_FORM_COPY, PTA_PAGE_COPY } from '@/features/pta-tax/lib/content';

interface PtaAwaitingInputProps {
  /** The specific answer still missing, named rather than hinted at. */
  missing: string;
}

/**
 * Stands in for the result until the figures it turns on are present. Every one
 * of the four band tables starts at US$ 0, so without this a blank value falls
 * into the cheapest band and prints a confident bill for nothing.
 */
export default function PtaAwaitingInput({ missing }: PtaAwaitingInputProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-gray-200 border-dashed bg-gray-50 p-8 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-gray-400 shadow-sm">
        <Smartphone className="h-6 w-6" aria-hidden="true" />
      </span>
      <h2 className="mt-4 font-bold text-gray-900 text-lg">{PTA_FORM_COPY.awaitingTitle}</h2>
      <p className="mt-2 max-w-sm text-gray-600 text-sm leading-relaxed">{missing}</p>
      <p className="mt-3 max-w-sm text-gray-500 text-xs leading-relaxed">
        {PTA_FORM_COPY.awaitingBody}
      </p>
      <p className="sr-only">{PTA_PAGE_COPY.resultTitle}</p>
    </div>
  );
}
