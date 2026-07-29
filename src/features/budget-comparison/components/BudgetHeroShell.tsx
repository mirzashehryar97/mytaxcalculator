import Link from 'next/link';

import { CheckCircle2, ChevronRight } from 'lucide-react';

import BudgetHeroActions from '@/features/budget-comparison/components/BudgetHeroActions';
import type { BudgetHeroBreadcrumb, BudgetHeroContent } from '@/features/budget-comparison/types';

interface BudgetHeroShellProps {
  breadcrumbs: readonly BudgetHeroBreadcrumb[];
  content: BudgetHeroContent;
}

export default function BudgetHeroShell({ breadcrumbs, content }: BudgetHeroShellProps) {
  return (
    <header className="relative z-10 overflow-hidden bg-[#064e3b]">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:42px_42px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-10 sm:py-12 lg:px-12">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-emerald-100/80 text-sm sm:text-base"
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

        <div className="mt-5 inline-flex rounded-full border border-emerald-300/60 bg-emerald-950/25 px-3 py-1.5 font-semibold text-emerald-200 text-sm uppercase tracking-wide">
          {content.badge}
        </div>
        <h1 className="mt-4 max-w-5xl text-balance font-bold text-4xl text-white leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          {content.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base text-emerald-50/85 leading-7 sm:text-lg">
          {content.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 text-emerald-50/85 text-sm sm:text-base">
          {content.meta.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className={`flex items-center gap-2 ${index > 0 ? 'sm:border-emerald-200/25 sm:border-l sm:pl-4' : ''}`}
              >
                <Icon className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                {item.dateTime ? (
                  <time dateTime={item.dateTime}>{item.label}</time>
                ) : (
                  <span>{item.label}</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <BudgetHeroActions />
          <div className="flex shrink-0 items-center gap-3 rounded-lg border-[1.5px] border-emerald-200/55 bg-emerald-950/30 px-4 py-3 text-white shadow-sm backdrop-blur-sm">
            <CheckCircle2 className="h-7 w-7 text-emerald-300" aria-hidden="true" />
            <p className="text-sm leading-6 sm:text-base">
              <span className="block font-semibold">{content.statusTitle}</span>
              <span className="text-emerald-50/85">{content.statusDetail}</span>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
