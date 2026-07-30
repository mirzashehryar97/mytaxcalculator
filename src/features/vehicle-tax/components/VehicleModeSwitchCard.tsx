import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { getOtherVehicleMode, type VehicleCalculatorMode } from '@/features/vehicle-tax/lib/modes';

interface VehicleModeSwitchCardProps {
  currentMode: VehicleCalculatorMode;
}

/** Points at whichever of the two vehicle calculators the reader is not on. */
export default function VehicleModeSwitchCard({ currentMode }: VehicleModeSwitchCardProps) {
  const other = getOtherVehicleMode(currentMode);
  const Icon = other.icon;

  return (
    <section className="mt-6 rounded-3xl border border-white/70 bg-white/95 p-5 shadow-emerald-950/10 shadow-xl sm:p-6">
      <Link
        href={other.href}
        className="group flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5"
      >
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ring-1 ${other.accent.iconWrap}`}
        >
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block font-bold text-gray-900 text-lg group-hover:text-emerald-700">
            {other.shortLabel}
          </span>
          <span className="mt-1 block text-gray-600 text-sm leading-relaxed">{other.summary}</span>
          <span className="mt-1 block text-gray-500 text-xs leading-relaxed">
            Asks for: {other.inputsSummary}
          </span>
        </span>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 font-semibold text-sm ${other.accent.link}`}
        >
          {other.tabLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </Link>
    </section>
  );
}
