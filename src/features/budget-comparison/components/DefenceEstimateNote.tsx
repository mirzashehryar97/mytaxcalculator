import { AlertCircle } from 'lucide-react';

import { DEFENCE_ESTIMATE_NOTE } from '@/features/budget-comparison/lib/defenceContent';

export default function DefenceEstimateNote() {
  return (
    <aside className="rounded-xl border-[1.5px] border-amber-300 bg-amber-50/70 p-5 text-amber-950 shadow-sm">
      <p className="flex items-start gap-3 text-base leading-7">
        <AlertCircle className="mt-0.5 h-7 w-7 shrink-0 text-amber-600" aria-hidden="true" />
        {DEFENCE_ESTIMATE_NOTE}
      </p>
    </aside>
  );
}
