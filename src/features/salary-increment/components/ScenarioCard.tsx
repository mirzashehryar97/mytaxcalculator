import { Gift, type LucideIcon } from 'lucide-react';

import { SALARY_COMPARISON_RESULT_COPY } from '@/features/salary-increment/lib/content';
import { formatPkr } from '@/features/salary-increment/lib/formatting';
import type { SalaryScenario } from '@/features/salary-increment/types';

interface ScenarioCardProps {
  title: string;
  icon: LucideIcon;
  scenario: SalaryScenario;
  /** Shows a bonus chip (job-offer tab, where each side has its own bonus). */
  showBonusChip?: boolean;
}

export default function ScenarioCard({
  title,
  icon: Icon,
  scenario,
  showBonusChip = false,
}: ScenarioCardProps) {
  return (
    <div className="stat-card border-emerald-100 bg-[#ecfdf5]">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-emerald-600 ring-1 ring-emerald-100">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="font-bold text-emerald-700 text-sm uppercase tracking-wider">{title}</h3>
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-gray-500 text-sm">{SALARY_COMPARISON_RESULT_COPY.grossLabel}</p>
          <p className="font-semibold text-2xl text-gray-900 tabular-nums">
            {formatPkr(scenario.grossMonthly)}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">{SALARY_COMPARISON_RESULT_COPY.monthlyTaxLabel}</p>
          <p className="font-semibold text-2xl text-red-600 tabular-nums">
            {formatPkr(scenario.monthlyTax)}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">{SALARY_COMPARISON_RESULT_COPY.netLabel}</p>
          <p className="font-semibold text-2xl text-emerald-600 tabular-nums">
            {formatPkr(scenario.netMonthly)}
          </p>
        </div>
        <div className="border-emerald-100 border-t pt-5">
          <p className="text-gray-500 text-sm">{SALARY_COMPARISON_RESULT_COPY.annualNetLabel}</p>
          <p className="font-semibold text-2xl text-emerald-600 tabular-nums">
            {formatPkr(scenario.annualNet)}
          </p>
        </div>
      </div>

      {showBonusChip && scenario.bonusMonthly > 0 ? (
        <p className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-1.5 font-medium text-emerald-800 text-xs">
          <Gift className="h-3.5 w-3.5" aria-hidden="true" />
          {SALARY_COMPARISON_RESULT_COPY.bonusChipPrefix} {formatPkr(scenario.bonusMonthly)}{' '}
          {SALARY_COMPARISON_RESULT_COPY.bonusChipSuffix}
        </p>
      ) : null}
    </div>
  );
}
