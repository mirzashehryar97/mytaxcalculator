import { ShieldCheck } from 'lucide-react';

import { SOLAR_BOTTOM_LINE } from '@/features/budget-comparison/lib/solarContent';

export default function SolarBottomLine() {
  return (
    <aside
      id="scope"
      aria-labelledby="solar-bottom-line-heading"
      className="scroll-mt-24 rounded-xl border-[1.5px] border-emerald-300 bg-emerald-50/60 p-5 text-emerald-950 shadow-sm"
    >
      <div className="flex gap-3">
        <ShieldCheck className="mt-0.5 h-8 w-8 shrink-0 text-emerald-800" aria-hidden="true" />
        <div>
          <h2 id="solar-bottom-line-heading" className="font-bold text-lg">
            {SOLAR_BOTTOM_LINE.title}
          </h2>
          <p className="mt-2 text-base leading-7">{SOLAR_BOTTOM_LINE.description}</p>
        </div>
      </div>
    </aside>
  );
}
