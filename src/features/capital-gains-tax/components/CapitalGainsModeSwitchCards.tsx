import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { CAPITAL_GAINS_CATEGORY_COPY } from '@/features/capital-gains-tax/lib/content';
import { getOtherCapitalGainsModes } from '@/features/capital-gains-tax/lib/modes';
import type { CapitalGainsMode } from '@/features/capital-gains-tax/types';

interface CapitalGainsModeSwitchCardsProps {
  activeMode: CapitalGainsMode;
}

/** Points at whichever two of the three calculators the reader is not on. */
export default function CapitalGainsModeSwitchCards({
  activeMode,
}: CapitalGainsModeSwitchCardsProps) {
  const others = getOtherCapitalGainsModes(activeMode);

  return (
    <section
      className="mt-6 rounded-3xl border border-white/70 bg-white/95 p-5 shadow-emerald-950/10 shadow-xl sm:p-6"
      aria-labelledby="capital-gains-switch-heading"
    >
      <h2 id="capital-gains-switch-heading" className="font-bold text-gray-900 text-lg">
        {CAPITAL_GAINS_CATEGORY_COPY.title}
      </h2>
      <p className="mt-1 text-gray-600 text-sm leading-relaxed">
        {CAPITAL_GAINS_CATEGORY_COPY.description}
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {others.map((config) => {
          const Icon = config.icon;

          return (
            <Link
              key={config.mode}
              href={config.href}
              className="group flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-5 transition-colors hover:border-emerald-300 hover:bg-white"
            >
              <span className="flex items-center gap-3">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1 ${config.accent.iconWrap}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-bold text-gray-900 group-hover:text-emerald-700">
                    {config.shortLabel}
                  </span>
                  <span className="block text-gray-500 text-xs">
                    {config.collectorLabel} collects it
                  </span>
                </span>
              </span>

              <span className="block text-gray-600 text-sm leading-relaxed">{config.summary}</span>
              <span className="block text-gray-500 text-xs leading-relaxed">
                Asks for: {config.inputsSummary}
              </span>

              <span
                className={`inline-flex items-center gap-1.5 font-semibold text-sm ${config.accent.link}`}
              >
                Open this calculator
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
