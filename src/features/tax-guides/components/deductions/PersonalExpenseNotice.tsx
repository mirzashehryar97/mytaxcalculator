import { AlertTriangle } from 'lucide-react';

import { DEDUCTIONS_SECTION_COPY } from '@/features/tax-guides/lib/taxDeductionsCreditsContent';

export default function PersonalExpenseNotice() {
  return (
    <section className="rounded-lg border-[1.5px] border-amber-300 bg-amber-50 px-5 py-4">
      <div className="flex items-start gap-4">
        <AlertTriangle className="h-9 w-9 shrink-0 text-amber-700" aria-hidden="true" />
        <div>
          <h2 className="font-bold text-amber-950 text-lg">
            <span aria-hidden="true">5. </span>
            {DEDUCTIONS_SECTION_COPY.expensesTitle}
          </h2>
          <p className="mt-1 text-amber-950 text-sm leading-6">
            {DEDUCTIONS_SECTION_COPY.expensesDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
