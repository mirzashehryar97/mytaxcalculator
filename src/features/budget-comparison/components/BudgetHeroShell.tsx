import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import EmeraldGridOverlay from '@/components/ui/EmeraldGridOverlay';

import BudgetHeroActions from '@/features/budget-comparison/components/BudgetHeroActions';
import BudgetHeroSummary from '@/features/budget-comparison/components/BudgetHeroSummary';
import type { BudgetHeroBreadcrumb, BudgetHeroContent } from '@/features/budget-comparison/types';

interface BudgetHeroShellProps {
  breadcrumbs: readonly BudgetHeroBreadcrumb[];
  content: BudgetHeroContent;
}

export default function BudgetHeroShell({ breadcrumbs, content }: BudgetHeroShellProps) {
  return (
    <header className="relative overflow-hidden bg-[#064e3b]">
      <EmeraldGridOverlay />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-[4.5rem]">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-emerald-100/80 text-sm"
        >
          {breadcrumbs.map((breadcrumb, index) => (
            <span key={breadcrumb.label} className="flex items-center gap-2">
              {index > 0 ? <ChevronRight className="h-4 w-4" aria-hidden="true" /> : null}
              {breadcrumb.href ? (
                <Link
                  href={breadcrumb.href}
                  className="font-medium transition-colors hover:text-white"
                >
                  {breadcrumb.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-white">
                  {breadcrumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        <div className="mt-8 grid items-center gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-14">
          <div>
            <p className="font-bold text-emerald-300 text-xs uppercase tracking-[0.18em] sm:text-sm">
              {content.badge}
            </p>
            <h1 className="mt-4 text-balance font-bold text-4xl text-white leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              {content.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base text-emerald-50/85 leading-relaxed sm:text-lg">
              {content.description}
            </p>

            <p className="mt-6 inline-flex rounded-full border border-emerald-300/25 bg-emerald-950/25 px-4 py-2 font-semibold text-emerald-100 text-xs uppercase tracking-[0.12em] lg:hidden">
              {content.statusTitle} · {content.statusDetail}
            </p>

            <div className="mt-8">
              <BudgetHeroActions />
            </div>
          </div>

          <div className="hidden lg:block">
            <BudgetHeroSummary content={content} />
          </div>
        </div>
      </div>
    </header>
  );
}
