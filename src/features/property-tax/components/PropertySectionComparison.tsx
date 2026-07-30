import { PROPERTY_SECTION_GUIDE } from '@/features/property-tax/lib/content';
import { getPropertyMode } from '@/features/property-tax/lib/modes';
import type { PropertyMode } from '@/features/property-tax/types';

interface PropertySectionComparisonProps {
  mode: PropertyMode;
}

/**
 * Explains how the three property taxes divide between buyer and seller, told
 * from the standpoint of the page it sits on: the tax this calculator prices
 * leads and is marked as the active one.
 */
export default function PropertySectionComparison({ mode }: PropertySectionComparisonProps) {
  const guide = PROPERTY_SECTION_GUIDE[mode];

  return (
    <section
      className="surface-card mx-auto mt-5 max-w-6xl p-4 sm:p-6"
      aria-labelledby="property-sections-heading"
    >
      <h2 id="property-sections-heading" className="font-bold text-gray-900 text-lg">
        {guide.title}
      </h2>
      <p className="mt-1 text-gray-500 text-sm leading-relaxed">{guide.description}</p>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {guide.cards.map((card) => {
          const { icon: Icon, accent } = getPropertyMode(card.mode);
          const isActive = card.mode === mode;

          return (
            <div
              key={card.id}
              className={`rounded-2xl border p-4 ${
                isActive
                  ? 'border-emerald-300 bg-emerald-50/40 ring-1 ring-emerald-200/70'
                  : 'border-gray-200'
              }`}
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${accent.iconWrap}`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className={`mt-3 font-bold ${accent.link}`}>{card.title}</h3>
              <p className="mt-0.5 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                {card.who}
              </p>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">{card.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
