import Link from 'next/link';

import { VEHICLE_MODE_TABS_LABEL } from '@/features/vehicle-tax/lib/content';
import { VEHICLE_MODES, type VehicleCalculatorMode } from '@/features/vehicle-tax/lib/modes';

interface VehicleModeTabsProps {
  activeMode: VehicleCalculatorMode;
}

/**
 * The two-tab strip that heads the calculator card. Each tab is a real link to
 * its own route, so both calculators stay separately indexable and shareable
 * instead of hiding behind client-side tab state.
 */
export default function VehicleModeTabs({ activeMode }: VehicleModeTabsProps) {
  return (
    <nav aria-label={VEHICLE_MODE_TABS_LABEL} className="border-gray-200 border-b bg-white">
      <ul className="grid grid-cols-1 sm:grid-cols-2">
        {VEHICLE_MODES.map((config, index) => {
          const active = config.mode === activeMode;
          const Icon = config.icon;

          return (
            <li
              key={config.mode}
              className={`min-w-0 ${index > 0 ? 'border-gray-200 border-t sm:border-t-0 sm:border-l' : ''}`}
            >
              <Link
                href={config.href}
                aria-current={active ? 'page' : undefined}
                className={`relative flex min-h-16 w-full items-center justify-center gap-2.5 px-4 py-5 text-center font-semibold text-sm transition-colors sm:text-base ${
                  active ? config.accent.activeTab : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 ${active ? config.accent.activeIcon : 'text-gray-400'}`}
                  aria-hidden="true"
                />
                <span className="truncate">{config.tabLabel}</span>
                {active ? (
                  <span
                    className={`-bottom-px absolute inset-x-4 h-[3px] rounded-full ${config.accent.activeUnderline}`}
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
