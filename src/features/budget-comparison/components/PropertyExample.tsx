import { Banknote, Info } from 'lucide-react';

import { PROPERTY_EXAMPLE } from '@/features/budget-comparison/lib/propertyContent';

export default function PropertyExample() {
  return (
    <section id="example" aria-labelledby="property-example-heading" className="scroll-mt-24">
      <h2
        id="property-example-heading"
        className="mb-4 font-bold text-[#0b1736] text-xl sm:text-2xl"
      >
        {PROPERTY_EXAMPLE.title}
      </h2>
      <div className="overflow-hidden rounded-xl border-[1.5px] border-slate-300 bg-white shadow-sm">
        <div className="grid gap-4 p-4 sm:grid-cols-3 sm:p-5">
          {[PROPERTY_EXAMPLE.previous, PROPERTY_EXAMPLE.current].map((period) => (
            <article key={period.label} className="rounded-lg border border-slate-200 p-5">
              <h3 className="font-bold text-base text-emerald-800">{period.label}</h3>
              <dl className="mt-3 space-y-3">
                {period.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4">
                    <dt className="text-slate-600 text-sm">{item.label}</dt>
                    <dd className="font-semibold text-red-600 text-sm">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 border-emerald-700 border-t pt-3 text-right font-bold text-red-600 text-xl">
                {period.total}
              </p>
            </article>
          ))}
          <article className="flex flex-col items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50/70 p-5 text-center">
            <p className="font-semibold text-emerald-900 text-sm">
              {PROPERTY_EXAMPLE.difference.label}
            </p>
            <Banknote className="mt-3 h-10 w-10 text-emerald-800" aria-hidden="true" />
            <p className="mt-3 font-bold text-2xl text-emerald-700 sm:text-3xl">
              {PROPERTY_EXAMPLE.difference.value}
            </p>
          </article>
        </div>
        <p className="flex items-start gap-2 border-slate-200 border-t bg-slate-50 px-5 py-3 text-slate-700 text-sm leading-6">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-800" aria-hidden="true" />
          {PROPERTY_EXAMPLE.note}
        </p>
      </div>
    </section>
  );
}
