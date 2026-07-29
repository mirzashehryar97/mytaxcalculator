import { Info } from 'lucide-react';

import { SOLAR_EXAMPLE } from '@/features/budget-comparison/lib/solarContent';

export default function SolarExample() {
  return (
    <section id="example" aria-labelledby="solar-example-heading" className="scroll-mt-24">
      <h2 id="solar-example-heading" className="mb-4 font-bold text-[#0b1736] text-xl sm:text-2xl">
        {SOLAR_EXAMPLE.title}
      </h2>
      <div className="overflow-hidden rounded-xl border-[1.5px] border-slate-300 bg-white shadow-sm">
        <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-3">
          {SOLAR_EXAMPLE.results.map((result) => {
            const Icon = result.icon;

            return (
              <article
                key={result.id}
                className="flex min-h-32 items-center gap-4 rounded-lg border border-slate-200 bg-slate-50/70 p-5"
              >
                <Icon className="h-10 w-10 shrink-0 text-emerald-800" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-slate-600 text-sm leading-5 sm:text-base">
                    {result.label}
                  </h3>
                  <p className="mt-1 font-bold text-emerald-800 text-xl leading-7">
                    {result.value}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
        <p className="flex items-start gap-2 border-slate-200 border-t bg-slate-50 px-5 py-3 text-slate-700 text-sm leading-6">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-800" aria-hidden="true" />
          {SOLAR_EXAMPLE.note}
        </p>
      </div>
    </section>
  );
}
