import Link from 'next/link';

import { ArrowRight, ShieldCheck } from 'lucide-react';

import {
  BUDGET_PAGE_LABELS,
  BUDGET_TOC,
  BUDGET_TOOLS,
} from '@/features/budget-comparison/lib/content';
import type { BudgetTocItem, BudgetTool } from '@/features/budget-comparison/types';

interface BudgetSidebarProps {
  toc?: readonly BudgetTocItem[];
  tools?: readonly BudgetTool[];
  sourceStatusTitle?: string;
  sourceStatusDetail?: string;
}

export default function BudgetSidebar({
  toc = BUDGET_TOC,
  tools = BUDGET_TOOLS,
  sourceStatusTitle = BUDGET_PAGE_LABELS.sourceStatusTitle,
  sourceStatusDetail = BUDGET_PAGE_LABELS.sourceStatusDetail,
}: BudgetSidebarProps) {
  return (
    <aside className="hidden space-y-4 xl:sticky xl:top-24 xl:block xl:h-fit xl:self-start">
      <nav
        aria-labelledby="budget-table-of-contents-heading"
        className="rounded-xl border-[1.5px] border-slate-200 bg-white p-5 shadow-sm"
      >
        <h2 id="budget-table-of-contents-heading" className="font-bold text-[#0b1736] text-xl">
          On this page
        </h2>
        <ol className="mt-4">
          {toc.map((item, index) => (
            <li key={item.id} className="relative flex min-h-9 gap-3 pb-2 last:min-h-0 last:pb-0">
              <span
                className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-emerald-800"
                aria-hidden="true"
              />
              {index < toc.length - 1 ? (
                <span
                  className="absolute top-[15px] bottom-[-7px] left-[3px] w-px bg-emerald-200"
                  aria-hidden="true"
                />
              ) : null}
              <a
                href={item.href}
                className="text-base text-slate-700 leading-6 hover:text-emerald-800 hover:underline"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section className="rounded-xl border-[1.5px] border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="px-1 font-bold text-[#0b1736] text-xl">Quick tools</h2>
        <div className="mt-4 space-y-2.5">
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                key={tool.id}
                href={tool.href}
                className="group flex min-h-14 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-700 shadow-sm transition hover:border-emerald-500 hover:bg-emerald-50/40"
              >
                <Icon className="h-6 w-6 shrink-0 text-emerald-800" aria-hidden="true" />
                <span className="min-w-0 flex-1 text-base leading-6">{tool.label}</span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-emerald-800 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="flex gap-3 rounded-xl border-[1.5px] border-slate-200 bg-[#f7faf8] p-4 shadow-sm">
        <ShieldCheck className="h-8 w-8 shrink-0 text-emerald-800" aria-hidden="true" />
        <div>
          <h2 className="font-semibold text-base text-slate-800">{sourceStatusTitle}</h2>
          <p className="mt-1 text-slate-600 text-sm leading-5">{sourceStatusDetail}</p>
        </div>
      </section>
    </aside>
  );
}
