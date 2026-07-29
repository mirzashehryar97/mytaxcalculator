'use client';

import MultiYearPeriodCard from '@/features/multi-year-tax/components/MultiYearPeriodCard';
import MultiYearPeriodSummary from '@/features/multi-year-tax/components/MultiYearPeriodSummary';
import type { DatePartName, PeriodDateName, SalaryPeriod } from '@/features/multi-year-tax/types';

interface MultiYearPeriodListProps {
  periods: SalaryPeriod[];
  expandedPeriodId: string | null;
  onDateChange: (
    periodId: string,
    field: PeriodDateName,
    part: DatePartName,
    value: string,
  ) => void;
  onSalaryChange: (periodId: string, value: string) => void;
  onRemove: (periodId: string) => void;
  onToggle: (periodId: string) => void;
}

export default function MultiYearPeriodList({
  expandedPeriodId,
  onDateChange,
  onRemove,
  onSalaryChange,
  onToggle,
  periods,
}: MultiYearPeriodListProps) {
  return (
    <ol className="space-y-3">
      {periods.map((period, index) => (
        <li key={period.id}>
          {period.id === expandedPeriodId ? (
            <MultiYearPeriodCard
              canRemove={periods.length > 1}
              onDateChange={(field, part, value) => onDateChange(period.id, field, part, value)}
              onRemove={() => onRemove(period.id)}
              onSalaryChange={(value) => onSalaryChange(period.id, value)}
              period={period}
              periodNumber={index + 1}
            />
          ) : (
            <MultiYearPeriodSummary
              onExpand={() => onToggle(period.id)}
              period={period}
              periodNumber={index + 1}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
