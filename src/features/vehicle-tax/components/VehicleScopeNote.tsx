import { CarFront, Info, XCircle } from 'lucide-react';

import { VEHICLE_SCOPE_COPY } from '@/features/vehicle-tax/lib/content';

/** Which vehicles Section 231B reaches, and which it leaves alone. */
export default function VehicleScopeNote() {
  return (
    <section
      className="h-full rounded-3xl border border-white/70 bg-white/95 p-5 shadow-emerald-950/10 shadow-xl sm:p-6"
      aria-labelledby="vehicle-scope-heading"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
          <CarFront className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 id="vehicle-scope-heading" className="font-bold text-gray-900 text-lg">
          {VEHICLE_SCOPE_COPY.title}
        </h2>
      </div>

      <p className="mt-4 text-gray-600 text-sm leading-relaxed">{VEHICLE_SCOPE_COPY.intro}</p>
      <ul className="mt-3 space-y-2">
        {VEHICLE_SCOPE_COPY.items.map((item) => (
          <li key={item.id} className="flex gap-2 text-gray-600 text-sm leading-relaxed">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-gray-600 text-sm leading-relaxed">
        {VEHICLE_SCOPE_COPY.excludedIntro}
      </p>
      <ul className="mt-3 space-y-2">
        {VEHICLE_SCOPE_COPY.excludedItems.map((item) => (
          <li key={item.id} className="flex gap-2 text-gray-600 text-sm leading-relaxed">
            <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-950 text-sm leading-relaxed">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
        <span>{VEHICLE_SCOPE_COPY.note}</span>
      </p>
    </section>
  );
}
