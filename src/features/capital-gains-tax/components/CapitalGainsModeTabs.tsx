import Link from 'next/link';

import { CAPITAL_GAINS_MODES, getCapitalGainsMode } from '@/features/capital-gains-tax/lib/modes';
import type { CapitalGainsMode } from '@/features/capital-gains-tax/types';

interface CapitalGainsModeTabsProps {
  activeMode: CapitalGainsMode;
}

/**
 * The strip that heads the calculator card. Each tab is a real link to its own
 * route, so the three calculators stay separately indexable and shareable
 * instead of hiding behind client-side tab state.
 */
export default function CapitalGainsModeTabs({ activeMode }: CapitalGainsModeTabsProps) {
  return (
    <nav
      aria-label="Investment capital gains tax calculators"
      className="border-gray-200 border-b bg-white"
    >
      <ul className="grid grid-cols-1 sm:grid-cols-3">
        {CAPITAL_GAINS_MODES.map((config, index) => {
          const active = config.mode === activeMode;
          const Icon = config.icon;
          const { accent } = getCapitalGainsMode(config.mode);

          return (
            <li
              key={config.mode}
              className={`min-w-0 ${index > 0 ? 'border-gray-200 border-t sm:border-t-0 sm:border-l' : ''}`}
            >
              <Link
                href={config.href}
                aria-current={active ? 'page' : undefined}
                className={`relative flex min-h-16 w-full flex-col items-center justify-center gap-0.5 px-3 py-4 text-center transition-colors sm:py-5 ${
                  active ? accent.activeTab : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex min-w-0 items-center gap-2 font-semibold text-sm sm:text-base">
                  <Icon className={`h-5 w-5 shrink-0 ${accent.icon}`} aria-hidden="true" />
                  <span className="truncate">{config.tabLabel}</span>
                </span>
                <span className="text-[11px] text-gray-500 sm:text-xs">
                  {config.collectorLabel} collects it
                </span>
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
