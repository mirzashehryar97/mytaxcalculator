import { Briefcase, User, UserCheck } from 'lucide-react';

import { SALARY_COMPARISON_RESULT_COPY } from '@/features/salary-increment/lib/content';
import type { SalaryComparison } from '@/features/salary-increment/types';

import ComparisonInsights from './ComparisonInsights';
import ComparisonSummary from './ComparisonSummary';
import ScenarioCard from './ScenarioCard';

interface ComparisonResultsProps {
  comparison: SalaryComparison;
}

export default function ComparisonResults({ comparison }: ComparisonResultsProps) {
  const isIncrement = comparison.mode === 'increment';
  const currentTitle = isIncrement
    ? SALARY_COMPARISON_RESULT_COPY.currentIncrementTitle
    : SALARY_COMPARISON_RESULT_COPY.currentJobTitle;
  const newTitle = isIncrement
    ? SALARY_COMPARISON_RESULT_COPY.newIncrementTitle
    : SALARY_COMPARISON_RESULT_COPY.newJobTitle;

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-emerald-700 text-xs uppercase tracking-wider">
        {SALARY_COMPARISON_RESULT_COPY.heading}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ScenarioCard
          title={currentTitle}
          icon={User}
          scenario={comparison.current}
          showBonusChip={!isIncrement}
        />
        <ScenarioCard
          title={newTitle}
          icon={isIncrement ? UserCheck : Briefcase}
          scenario={comparison.next}
          showBonusChip={!isIncrement}
        />
      </div>

      <ComparisonSummary comparison={comparison} />

      <ComparisonInsights comparison={comparison} />
    </div>
  );
}
