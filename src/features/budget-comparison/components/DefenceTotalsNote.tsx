import { FileCheck2 } from 'lucide-react';

import { DEFENCE_TOTALS_NOTE } from '@/features/budget-comparison/lib/defenceContent';

export default function DefenceTotalsNote() {
  return (
    <aside
      id="pensions"
      aria-labelledby="defence-totals-note-heading"
      className="scroll-mt-24 rounded-xl border-[1.5px] border-emerald-300 bg-emerald-50/60 p-5 text-emerald-950 shadow-sm"
    >
      <div className="flex gap-3">
        <FileCheck2 className="mt-0.5 h-8 w-8 shrink-0 text-emerald-800" aria-hidden="true" />
        <div>
          <h2 id="defence-totals-note-heading" className="font-bold text-lg">
            {DEFENCE_TOTALS_NOTE.title}
          </h2>
          <p className="mt-2 text-base leading-7">{DEFENCE_TOTALS_NOTE.description}</p>
        </div>
      </div>
    </aside>
  );
}
