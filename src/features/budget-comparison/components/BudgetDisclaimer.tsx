import { AlertCircle } from 'lucide-react';

import { BUDGET_DISCLAIMER } from '@/features/budget-comparison/lib/content';

export default function BudgetDisclaimer() {
  return (
    <aside className="flex items-center justify-center gap-3 rounded-lg border-[1.5px] border-amber-300 bg-amber-50/70 px-5 py-4 text-center text-amber-950 text-base leading-6">
      <AlertCircle className="h-6 w-6 shrink-0 text-amber-600" aria-hidden="true" />
      <p>{BUDGET_DISCLAIMER}</p>
    </aside>
  );
}
