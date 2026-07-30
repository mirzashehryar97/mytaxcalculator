import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import { PROPERTY_SECTION_COPY } from '@/features/property-tax/lib/content';
import { getOtherPropertyModes } from '@/features/property-tax/lib/modes';
import type { PropertyMode } from '@/features/property-tax/types';

interface PropertyModeSwitchCardsProps {
  activeMode: PropertyMode;
}

/** In-content links to the other two sides of the same property deal. */
export default function PropertyModeSwitchCards({ activeMode }: PropertyModeSwitchCardsProps) {
  return (
    <section
      className="surface-card mx-auto mt-5 max-w-6xl p-4 sm:p-6"
      aria-labelledby="property-switch-mode-heading"
    >
      <h2 id="property-switch-mode-heading" className="font-bold text-gray-900 text-lg">
        {PROPERTY_SECTION_COPY.switchModeTitle}
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {getOtherPropertyModes(activeMode).map((config) => {
          const Icon = config.icon;

          return (
            <Link
              key={config.mode}
              href={config.href}
              className="group flex items-center gap-4 rounded-2xl border border-gray-200 p-4 transition-all hover:border-emerald-200 hover:bg-emerald-50/40"
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${config.accent.iconWrap}`}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>

              <span className="min-w-0 flex-1">
                <span className={`block font-bold ${config.accent.link}`}>{config.tabLabel}</span>
                <span className="mt-0.5 block text-gray-500 text-sm leading-relaxed">
                  <span className="font-semibold text-gray-600">Inputs:</span>{' '}
                  {config.inputsSummary}
                </span>
              </span>

              <ChevronRight
                className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
