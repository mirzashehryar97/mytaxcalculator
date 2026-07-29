import Image from 'next/image';

import { ExternalLink } from 'lucide-react';

import type { BudgetSource } from '@/features/budget-comparison/types';

interface BudgetSourceGridProps {
  sources: readonly BudgetSource[];
  columns?: 2 | 3;
}

export default function BudgetSourceGrid({ sources, columns = 3 }: BudgetSourceGridProps) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 ${columns === 3 ? '2xl:grid-cols-3' : ''}`}>
      {sources.map((source) => {
        const Icon = source.icon;

        return (
          <a
            key={source.id}
            href={source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group hover:-translate-y-0.5 flex min-h-28 items-center gap-4 rounded-xl border-[1.5px] border-slate-300 bg-white p-5 shadow-sm transition hover:border-emerald-400 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-200"
          >
            <span
              className={`flex h-12 shrink-0 items-center overflow-hidden text-emerald-800 ${source.logo ? 'w-20' : 'w-16 justify-center'}`}
            >
              {source.logo ? (
                <Image
                  src={source.logo.src}
                  alt={source.logo.alt}
                  width={532}
                  height={77}
                  className="h-9 w-auto max-w-none shrink-0 object-left"
                />
              ) : null}
              {Icon ? <Icon className="h-11 w-11" strokeWidth={1.6} aria-hidden="true" /> : null}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-bold text-[#0b1736] text-base leading-6">
                {source.title}
              </span>
              <span className="mt-1 block text-slate-500 text-sm">{source.description}</span>
            </span>
            <ExternalLink
              className="h-5 w-5 shrink-0 self-start text-slate-400 transition-colors group-hover:text-emerald-700"
              aria-hidden="true"
            />
          </a>
        );
      })}
    </div>
  );
}
