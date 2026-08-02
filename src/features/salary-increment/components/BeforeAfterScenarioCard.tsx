import { SALARY_COMPARISON_INSIGHT_COPY } from '@/features/salary-increment/lib/content';
import { formatPkr } from '@/features/salary-increment/lib/formatting';
import type { SalaryScenarioPeriodBreakdown } from '@/features/salary-increment/types';

interface BeforeAfterScenarioCardProps {
  scenario: SalaryScenarioPeriodBreakdown;
  showDeductions: boolean;
  title: string;
}

export default function BeforeAfterScenarioCard({
  scenario,
  showDeductions,
  title,
}: BeforeAfterScenarioCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <h5 className="font-bold text-gray-900">{title}</h5>
      <dl className="mt-4 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-gray-500 text-sm">{SALARY_COMPARISON_INSIGHT_COPY.grossPay}</dt>
          <dd className="amount-wrap font-semibold text-gray-900 tabular-nums">
            {formatPkr(scenario.gross)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-gray-500 text-sm">{SALARY_COMPARISON_INSIGHT_COPY.incomeTax}</dt>
          <dd className="amount-wrap font-semibold text-red-600 tabular-nums">
            {formatPkr(scenario.tax)}
          </dd>
        </div>
        {showDeductions ? (
          <div className="flex items-center justify-between gap-4">
            <dt className="text-gray-500 text-sm">
              {SALARY_COMPARISON_INSIGHT_COPY.payrollDeductions}
            </dt>
            <dd className="amount-wrap font-semibold text-red-600 tabular-nums">
              {formatPkr(scenario.deductions)}
            </dd>
          </div>
        ) : null}
        <div className="flex items-center justify-between gap-4 border-gray-100 border-t pt-3">
          <dt className="font-semibold text-gray-700 text-sm">
            {SALARY_COMPARISON_INSIGHT_COPY.takeHomePay}
          </dt>
          <dd className="amount-wrap font-bold text-emerald-700 text-lg tabular-nums">
            {formatPkr(scenario.takeHome)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
