import { AlertCircle } from 'lucide-react';

import { VEHICLES_LEVY_NOTE } from '@/features/budget-comparison/lib/vehiclesContent';

export default function VehiclesLevyNote() {
  return (
    <aside
      id="levy-note"
      aria-labelledby="vehicles-levy-note-heading"
      className="scroll-mt-24 rounded-xl border-[1.5px] border-amber-300 bg-amber-50/70 p-5 text-amber-950 shadow-sm"
    >
      <div className="flex gap-3">
        <AlertCircle className="mt-0.5 h-7 w-7 shrink-0 text-amber-600" aria-hidden="true" />
        <div>
          <h2 id="vehicles-levy-note-heading" className="font-bold text-lg">
            {VEHICLES_LEVY_NOTE.title}
          </h2>
          <p className="mt-2 text-base leading-7">{VEHICLES_LEVY_NOTE.description}</p>
        </div>
      </div>
    </aside>
  );
}
