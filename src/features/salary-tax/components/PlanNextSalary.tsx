import Link from 'next/link';

import { ArrowRight, Briefcase, type LucideIcon, Target, TrendingUp } from 'lucide-react';

import {
  PLAN_NEXT_SALARY_COPY,
  PLAN_NEXT_SALARY_TOOLS,
  type PlanNextSalaryToolId,
} from '@/features/salary-tax/lib/content';

const TOOL_ICONS: Record<PlanNextSalaryToolId, LucideIcon> = {
  'salary-increment': TrendingUp,
  'job-offer': Briefcase,
  'reverse-salary': Target,
};

/**
 * Teaser section below the salary calculator that links to the salary-planning tools:
 * salary increments, job-offer comparisons and reverse-salary planning.
 */
export default function PlanNextSalary() {
  return (
    <section className="mt-16 sm:mt-20" aria-labelledby="plan-next-salary-heading">
      <div className="mb-6 text-center sm:mb-8">
        <h2
          id="plan-next-salary-heading"
          className="font-bold text-2xl text-white tracking-tight sm:text-3xl"
        >
          {PLAN_NEXT_SALARY_COPY.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-emerald-50/80">
          {PLAN_NEXT_SALARY_COPY.description}
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PLAN_NEXT_SALARY_TOOLS.map((tool) => {
          const Icon = TOOL_ICONS[tool.id];
          return (
            <div
              key={tool.id}
              className="flex flex-col rounded-2xl border border-white/60 bg-white p-6 shadow-emerald-950/10 shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
                <Icon className="h-6 w-6 text-emerald-600" aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-bold text-gray-900 text-lg">{tool.title}</h3>
              <p className="mb-6 text-gray-600 text-sm leading-relaxed">{tool.description}</p>
              <Link
                href={tool.href}
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-2.5 font-semibold text-sm text-white shadow-emerald-900/20 shadow-md transition-all hover:from-emerald-700 hover:to-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
              >
                {tool.ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
