import { Landmark, ShieldCheck, TicketPercent } from 'lucide-react';

import { VEHICLE_TOKEN_RESULT_COPY } from '@/features/vehicle-tax/lib/content';
import { buildTokenBreakdown } from '@/features/vehicle-tax/lib/presentation';
import type { VehicleTokenResult } from '@/features/vehicle-tax/types';

interface VehicleTokenBreakdownProps {
  result: VehicleTokenResult;
}

const ITEM_ICONS = {
  provincial: Landmark,
  discount: TicketPercent,
  federal: ShieldCheck,
} as const;

/** Matches the result rows above: what you owe is red, what comes off is green. */
const TONE_CLASSES = {
  negative: 'text-red-600',
  positive: 'text-emerald-700',
} as const;

/** The lines behind the total, spelled out one card at a time. */
export default function VehicleTokenBreakdown({ result }: VehicleTokenBreakdownProps) {
  const items = buildTokenBreakdown(result);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h3 className="font-bold text-gray-900 text-lg">
        {VEHICLE_TOKEN_RESULT_COPY.breakdownTitle}
      </h3>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => {
          const Icon = ITEM_ICONS[item.id as keyof typeof ITEM_ICONS] ?? Landmark;

          return (
            <article key={item.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h4 className="mt-4 font-bold text-gray-900">{item.label}</h4>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">{item.description}</p>
              <p
                className={`amount-wrap mt-3 font-bold text-sm tabular-nums ${
                  TONE_CLASSES[item.tone]
                }`}
              >
                {item.detail}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
