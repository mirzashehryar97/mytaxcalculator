import type { ReactNode } from 'react';

import type { BudgetTocItem } from '@/features/budget-comparison/types';

interface BudgetArticleLayoutProps {
  toc: readonly BudgetTocItem[];
  children: ReactNode;
}

export default function BudgetArticleLayout({ toc, children }: BudgetArticleLayoutProps) {
  return (
    <article className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-[4.5rem]">
        <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-14">
          <aside className="hidden lg:block">
            <nav
              className="sticky top-24 rounded-2xl border border-slate-200 bg-[#fafaf8] p-5"
              aria-label="On this page"
            >
              <p className="font-bold text-slate-900 text-sm">On this page</p>
              <ol className="mt-4 space-y-1.5">
                {toc.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className="flex gap-2 rounded-lg px-2 py-2 text-slate-600 text-sm transition-colors hover:bg-emerald-50 hover:text-emerald-800"
                    >
                      <span className="font-semibold text-emerald-700">{index + 1}.</span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0 space-y-12 lg:space-y-14">{children}</div>
        </div>
      </div>
    </article>
  );
}
