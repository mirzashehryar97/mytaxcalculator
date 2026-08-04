import { Coins, FileText, Landmark, Receipt, ShieldCheck, Smartphone } from 'lucide-react';

import { PTA_COMPONENT_CARDS } from '@/features/pta-tax/lib/content';

const CARD_ICONS = [Smartphone, ShieldCheck, Landmark, Receipt, FileText, Coins] as const;

/** What the single PSID figure is actually made of, one card per levy. */
export default function PtaComponentCards() {
  return (
    <section className="mx-auto mt-6 max-w-6xl" aria-labelledby="pta-components">
      <h2 className="sr-only" id="pta-components">
        What makes up your estimate
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {PTA_COMPONENT_CARDS.map((card, index) => {
          const Icon = CARD_ICONS[index % CARD_ICONS.length];

          return (
            <div
              key={card.id}
              className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 text-center"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-3 font-semibold text-gray-900 text-sm">{card.title}</h3>
              <p className="mt-1.5 text-gray-600 text-xs leading-relaxed">{card.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
