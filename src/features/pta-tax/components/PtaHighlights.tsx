import { CalendarClock, Info } from 'lucide-react';

import {
  PTA_COVERAGE_NOTE,
  PTA_HIGHLIGHTS,
  PTA_INSTALMENTS_NOTE,
  PTA_TEMPORARY_REGISTRATION,
} from '@/features/pta-tax/lib/content';

/** The things worth knowing before paying, none of which the PSID tells you. */
export default function PtaHighlights() {
  return (
    <section className="mx-auto mt-6 max-w-6xl space-y-3" aria-labelledby="pta-highlights">
      <h2 className="sr-only" id="pta-highlights">
        Important before you calculate
      </h2>

      <div className="surface-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-6">
        <span className="inline-flex shrink-0 items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-emerald-800">
          <CalendarClock className="h-6 w-6 shrink-0" aria-hidden="true" />
          <strong className="font-bold text-2xl tabular-nums">
            {PTA_TEMPORARY_REGISTRATION.days}
            <span className="ml-1 font-medium text-sm">days</span>
          </strong>
        </span>
        <div className="min-w-0">
          <h3 className="font-bold text-gray-900">{PTA_TEMPORARY_REGISTRATION.title}</h3>
          <p className="mt-1 text-gray-600 text-sm leading-relaxed">
            {PTA_TEMPORARY_REGISTRATION.body}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {PTA_HIGHLIGHTS.map((item) => (
          <div key={item.id} className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
            <p className="mt-1.5 text-gray-600 text-xs leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {[PTA_COVERAGE_NOTE, PTA_INSTALMENTS_NOTE].map((note) => (
          <div
            key={note.title}
            className="flex min-w-0 items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-5"
          >
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" aria-hidden="true" />
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm">{note.title}</h3>
              <p className="mt-1.5 text-gray-600 text-xs leading-relaxed">{note.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
