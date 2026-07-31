import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { CORPORATE_SWITCH_COPY } from '@/features/corporate-tax/lib/content';
import { getOtherCorporateModes } from '@/features/corporate-tax/lib/modes';
import type { CorporateMode } from '@/features/corporate-tax/types';

interface CorporateModeSwitchCardsProps {
  activeMode: CorporateMode;
}

/** In-card links to the two corporate calculators the visitor is not on. */
export default function CorporateModeSwitchCards({ activeMode }: CorporateModeSwitchCardsProps) {
  const modes = getOtherCorporateModes(activeMode);

  return (
    <section
      className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4 sm:p-6"
      aria-labelledby="corporate-mode-switch-heading"
    >
      <h2
        id="corporate-mode-switch-heading"
        className="font-bold text-gray-900 text-lg tracking-tight"
      >
        {CORPORATE_SWITCH_COPY.title}
      </h2>
      <p className="mt-1.5 text-gray-600 text-sm leading-relaxed">
        {CORPORATE_SWITCH_COPY.description}
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {modes.map((config) => {
          const Icon = config.icon;

          return (
            <Link
              key={config.mode}
              href={config.href}
              className="group flex min-w-0 items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:border-emerald-300 hover:shadow-md sm:p-5"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${config.accent.iconWrap}`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-base text-gray-900">{config.shortLabel}</span>
                <span className="mt-1 block text-gray-600 text-sm leading-relaxed">
                  {config.inputsSummary}
                </span>
                <span
                  className={`mt-2 inline-flex items-center gap-1.5 font-semibold text-sm ${config.accent.link}`}
                >
                  {CORPORATE_SWITCH_COPY.linkPrefix} {config.shortLabel.toLowerCase()} calculator
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
