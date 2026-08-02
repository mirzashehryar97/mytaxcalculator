import type { SalaryComparisonInsightPeriod } from '@/features/salary-increment/types';

import ComparisonInsightPeriodSelect from './ComparisonInsightPeriodSelect';

interface ComparisonInsightPanelHeaderProps {
  description: string;
  period: SalaryComparisonInsightPeriod;
  periodId: string;
  title: string;
  onPeriodChange: (period: SalaryComparisonInsightPeriod) => void;
}

export default function ComparisonInsightPanelHeader({
  description,
  period,
  periodId,
  title,
  onPeriodChange,
}: ComparisonInsightPanelHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h4 className="font-bold text-gray-900 text-lg">{title}</h4>
        <p className="mt-0.5 text-gray-500 text-sm">{description}</p>
      </div>
      <ComparisonInsightPeriodSelect id={periodId} onChange={onPeriodChange} value={period} />
    </div>
  );
}
