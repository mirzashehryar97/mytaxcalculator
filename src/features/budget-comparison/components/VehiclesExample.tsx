import { ArrowDown, ArrowRight, Info } from 'lucide-react';

import { VEHICLES_EXAMPLE } from '@/features/budget-comparison/lib/vehiclesContent';

export default function VehiclesExample() {
  return (
    <section id="example" aria-labelledby="vehicles-example-heading" className="scroll-mt-24">
      <h2
        id="vehicles-example-heading"
        className="mb-4 font-bold text-[#0b1736] text-xl sm:text-2xl"
      >
        {VEHICLES_EXAMPLE.title}
      </h2>
      <div className="overflow-hidden rounded-xl border-[1.5px] border-emerald-700/40 bg-emerald-50/40 shadow-sm">
        <div className="grid items-stretch gap-3 p-4 sm:p-5 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
          {VEHICLES_EXAMPLE.results.map((result, index) => {
            const Icon = result.icon;

            return (
              <div key={result.id} className="contents">
                <article className="flex min-h-32 items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:min-h-36">
                  <Icon className="h-10 w-10 shrink-0 text-emerald-800" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-[#0b1736] text-sm sm:text-base">
                      {result.label}
                    </h3>
                    <p className="mt-1 font-bold text-emerald-800 text-lg leading-6">
                      {result.value}
                    </p>
                  </div>
                </article>
                {index < VEHICLES_EXAMPLE.results.length - 1 ? (
                  <span className="flex items-center justify-center text-emerald-800">
                    <ArrowDown className="h-6 w-6 md:hidden" aria-hidden="true" />
                    <ArrowRight className="hidden h-6 w-6 md:block" aria-hidden="true" />
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
        <p className="flex items-start gap-2 border-emerald-700/20 border-t bg-white/70 px-5 py-3 text-slate-700 text-sm leading-6">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-800" aria-hidden="true" />
          {VEHICLES_EXAMPLE.note}
        </p>
      </div>
    </section>
  );
}
