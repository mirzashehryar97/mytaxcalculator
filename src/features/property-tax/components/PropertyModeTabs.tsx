import Link from 'next/link';

import { getPropertyMode, PROPERTY_MODES } from '@/features/property-tax/lib/modes';
import type { PropertyMode } from '@/features/property-tax/types';

interface PropertyModeTabsProps {
  activeMode: PropertyMode;
}

/**
 * The Buy / Sell / Capital Gains strip that heads the calculator card. Each tab
 * is a real link to its own route, so the three calculators stay separately
 * indexable and shareable instead of hiding behind client-side tab state.
 */
export default function PropertyModeTabs({ activeMode }: PropertyModeTabsProps) {
  return (
    <nav aria-label="Property tax calculators" className="border-gray-200 border-b bg-white">
      <ul className="grid grid-cols-1 sm:grid-cols-3">
        {PROPERTY_MODES.map((config, index) => {
          const active = config.mode === activeMode;
          const Icon = config.icon;
          const accent = getPropertyMode(config.mode).accent;

          return (
            <li
              key={config.mode}
              className={`min-w-0 ${index > 0 ? 'border-gray-200 border-t sm:border-t-0 sm:border-l' : ''}`}
            >
              <Link
                href={config.href}
                aria-current={active ? 'page' : undefined}
                className={`relative flex min-h-16 w-full items-center justify-center gap-2.5 px-4 py-5 text-center font-semibold text-sm transition-colors sm:text-base ${
                  active ? accent.activeTab : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 ${accent.icon}`} aria-hidden="true" />
                <span className="truncate">{config.tabLabel}</span>
                {active ? (
                  <span
                    className={`-bottom-px absolute inset-x-4 h-[3px] rounded-full ${accent.activeUnderline}`}
                    aria-hidden="true"
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
