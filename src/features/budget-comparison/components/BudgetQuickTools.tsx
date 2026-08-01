import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { BUDGET_QUICK_TOOLS_COPY } from '@/features/budget-comparison/lib/content';
import type { BudgetTool } from '@/features/budget-comparison/types';

interface BudgetQuickToolsProps {
  tools: readonly BudgetTool[];
}

export default function BudgetQuickTools({ tools }: BudgetQuickToolsProps) {
  return (
    <section
      id="quick-tools"
      aria-labelledby="quick-tools-heading"
      className="scroll-mt-24 rounded-2xl bg-[#fafaf8] p-6 ring-1 ring-slate-200 sm:p-8"
    >
      <p className="font-bold text-emerald-700 text-xs uppercase tracking-[0.16em]">
        {BUDGET_QUICK_TOOLS_COPY.eyebrow}
      </p>
      <h2
        id="quick-tools-heading"
        className="mt-3 font-bold text-2xl text-slate-900 tracking-tight sm:text-3xl"
      >
        {BUDGET_QUICK_TOOLS_COPY.title}
      </h2>
      <p className="mt-4 max-w-2xl text-[15px] text-slate-600 leading-relaxed sm:text-base">
        {BUDGET_QUICK_TOOLS_COPY.description}
      </p>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon;

          return (
            <Link
              key={tool.id}
              href={tool.href}
              className="group flex min-h-20 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-slate-900/5 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50/50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100">
                <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1 font-semibold text-sm leading-5">{tool.label}</span>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-emerald-700 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
