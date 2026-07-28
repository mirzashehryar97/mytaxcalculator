import { AlertTriangle } from 'lucide-react';

import { FILING_SECTION_COPY } from '@/features/tax-guides/lib/filingTaxReturnContent';

export default function FilingSidebarDeadline() {
  return (
    <aside className="flex items-start gap-3 rounded-lg border border-amber-400 bg-amber-50 px-4 py-3 text-amber-950">
      <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" aria-hidden="true" />
      <p className="text-[13px] leading-5">{FILING_SECTION_COPY.sidebarDeadline}</p>
    </aside>
  );
}
