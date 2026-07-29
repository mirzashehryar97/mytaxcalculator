import { AlertCircle } from 'lucide-react';

import { SOLAR_TAX_NOTE } from '@/features/budget-comparison/lib/solarContent';

export default function SolarTaxNote() {
  return (
    <aside className="rounded-xl border-[1.5px] border-amber-300 bg-amber-50/70 p-5 text-amber-950 shadow-sm">
      <div className="flex gap-3">
        <AlertCircle className="mt-0.5 h-7 w-7 shrink-0 text-amber-600" aria-hidden="true" />
        <div>
          <h2 className="font-bold text-lg">{SOLAR_TAX_NOTE.title}</h2>
          <p className="mt-2 text-base leading-7">{SOLAR_TAX_NOTE.description}</p>
        </div>
      </div>
    </aside>
  );
}
