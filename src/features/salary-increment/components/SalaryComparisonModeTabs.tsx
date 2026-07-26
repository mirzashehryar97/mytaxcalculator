import Link from 'next/link';

import { Briefcase, TrendingUp } from 'lucide-react';

import { SALARY_COMPARISON_MODE_OPTIONS } from '@/features/salary-increment/lib/content';
import type { SalaryComparisonMode } from '@/features/salary-increment/types';

const MODE_ICONS = {
  increment: TrendingUp,
  'job-offer': Briefcase,
} as const;

interface SalaryComparisonModeTabsProps {
  mode: SalaryComparisonMode;
}

export default function SalaryComparisonModeTabs({ mode }: SalaryComparisonModeTabsProps) {
  return (
    <div className="border-gray-100 border-b bg-gray-50/80 p-2 sm:p-3">
      <nav
        className="mx-auto flex max-w-lg gap-2 rounded-2xl bg-gray-100 p-1.5"
        aria-label="Salary comparison calculators"
      >
        {SALARY_COMPARISON_MODE_OPTIONS.map((option) => {
          const Icon = MODE_ICONS[option.value];
          const active = option.value === mode;
          return (
            <Link
              key={option.value}
              href={option.href}
              aria-current={active ? 'page' : undefined}
              className={`calculator-tab ${active ? 'calculator-tab-active' : 'calculator-tab-inactive'}`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{option.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
