import { AlertCircle } from 'lucide-react';

import { BUSINESS_SUPER_TAX_RETAILER_NOTE } from '@/features/budget-comparison/lib/businessSuperTaxContent';

export default function BusinessSuperTaxRetailerNote() {
  return (
    <aside
      id="retailer-note"
      aria-labelledby="business-super-tax-retailer-heading"
      className="scroll-mt-24 rounded-xl border-[1.5px] border-amber-300 bg-amber-50/70 p-5 text-amber-950 shadow-sm"
    >
      <div className="flex gap-3">
        <AlertCircle className="mt-0.5 h-7 w-7 shrink-0 text-amber-600" aria-hidden="true" />
        <div>
          <h2 id="business-super-tax-retailer-heading" className="font-bold text-lg">
            {BUSINESS_SUPER_TAX_RETAILER_NOTE.title}
          </h2>
          <p className="mt-2 text-base leading-7">{BUSINESS_SUPER_TAX_RETAILER_NOTE.description}</p>
        </div>
      </div>
    </aside>
  );
}
