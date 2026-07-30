import { CalendarClock, Clock } from 'lucide-react';

import {
  PROPERTY_CGT_REGIME_CARDS,
  PROPERTY_SECTION_COPY,
} from '@/features/property-tax/lib/content';

const REGIME_STYLES = [
  {
    icon: CalendarClock,
    card: 'border-amber-200 bg-amber-50/60',
    iconWrap: 'bg-amber-100 text-amber-700',
    title: 'text-amber-800',
  },
  {
    icon: Clock,
    card: 'border-blue-200 bg-blue-50/60',
    iconWrap: 'bg-blue-100 text-blue-700',
    title: 'text-blue-800',
  },
];

/** The two capital gains regimes, split by the day the property was bought. */
export default function PropertyCgtRegimes() {
  return (
    <section
      className="surface-card mx-auto mt-5 max-w-6xl p-4 sm:p-6"
      aria-labelledby="property-cgt-regimes-heading"
    >
      <h2 id="property-cgt-regimes-heading" className="font-bold text-gray-900 text-lg">
        {PROPERTY_SECTION_COPY.cgtRegimesTitle}
      </h2>
      <p className="mt-1 text-gray-500 text-sm leading-relaxed">
        {PROPERTY_SECTION_COPY.cgtRegimesDescription}
      </p>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {PROPERTY_CGT_REGIME_CARDS.map((card, index) => {
          const style = REGIME_STYLES[index];
          const Icon = style.icon;

          return (
            <div key={card.id} className={`rounded-2xl border p-5 ${style.card}`}>
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.iconWrap}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className={`font-bold ${style.title}`}>{card.title}</h3>
              </div>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">{card.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
