import Link from 'next/link';

import { ArrowRight, CheckCircle2 } from 'lucide-react';

import type { BudgetSectorSummary } from '@/features/budget-comparison/types';

interface BudgetSectorGridProps {
  sectors: readonly BudgetSectorSummary[];
  linkLabel: string;
  currentSectorId?: string;
  compact?: boolean;
}

export default function BudgetSectorGrid({
  sectors,
  linkLabel,
  currentSectorId,
  compact = false,
}: BudgetSectorGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {sectors.map((sector) => {
        const Icon = sector.icon;
        const isCurrent = sector.id === currentSectorId;

        return (
          <article
            key={sector.id}
            id={compact ? undefined : sector.id}
            className={`flex scroll-mt-24 flex-col rounded-xl border-[1.5px] bg-white p-5 shadow-sm ${
              compact ? 'min-h-[220px]' : 'min-h-[250px]'
            } ${isCurrent ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-slate-300'}`}
          >
            <div className="flex min-h-10 items-center gap-3">
              <Icon
                className="h-10 w-10 shrink-0 text-emerald-800"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <h3 className="min-w-0 font-bold text-[#0b1736] text-lg leading-6">{sector.title}</h3>
            </div>
            <ul className="mt-4 space-y-2 pl-6 text-base text-slate-700 leading-6 marker:text-[#0b1736]">
              {sector.highlights.map((highlight) => (
                <li key={highlight} className="list-disc">
                  {highlight}
                </li>
              ))}
            </ul>
            {isCurrent ? (
              <span className="mt-auto inline-flex w-fit items-center gap-1.5 pt-5 font-semibold text-base text-emerald-800">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Current page
              </span>
            ) : (
              <Link
                href={sector.href}
                className="group mt-auto inline-flex w-fit items-center gap-1.5 pt-5 font-semibold text-base text-emerald-800 hover:text-emerald-950 hover:underline"
              >
                {linkLabel}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            )}
          </article>
        );
      })}
    </div>
  );
}
