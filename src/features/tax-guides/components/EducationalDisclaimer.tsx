import { AlertCircle } from 'lucide-react';

import { TAX_GUIDES_PAGE_COPY } from '@/features/tax-guides/lib/content';

export default function EducationalDisclaimer() {
  return (
    <aside className="flex items-start gap-3 rounded-xl border-[1.5px] border-amber-300 bg-amber-50 px-4 py-3 text-amber-950 sm:items-center sm:px-5">
      <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-amber-600 sm:mt-0" aria-hidden="true" />
      <p className="text-sm leading-relaxed">{TAX_GUIDES_PAGE_COPY.disclaimer}</p>
    </aside>
  );
}
