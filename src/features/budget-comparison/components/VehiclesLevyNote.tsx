import Link from 'next/link';

import { AlertCircle, ArrowRight } from 'lucide-react';

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
        <div className="min-w-0">
          <h2 id="vehicles-levy-note-heading" className="font-bold text-lg">
            {VEHICLES_LEVY_NOTE.title}
          </h2>
          <p className="mt-2 text-base leading-7">{VEHICLES_LEVY_NOTE.description}</p>

          <p className="mt-4 font-semibold text-sm">{VEHICLES_LEVY_NOTE.calculatorsIntro}</p>
          <ul className="mt-2 space-y-2">
            {VEHICLES_LEVY_NOTE.calculators.map((calculator) => (
              <li key={calculator.id}>
                <Link
                  href={calculator.href}
                  className="group inline-flex items-start gap-2 font-semibold text-amber-900 text-sm underline decoration-amber-400 underline-offset-4 hover:text-amber-950"
                >
                  <span>{calculator.label}</span>
                  <ArrowRight
                    className="mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
