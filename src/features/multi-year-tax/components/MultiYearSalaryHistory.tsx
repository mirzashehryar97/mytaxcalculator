'use client';

import MultiYearEditorActions from '@/features/multi-year-tax/components/MultiYearEditorActions';
import MultiYearPeriodList from '@/features/multi-year-tax/components/MultiYearPeriodList';
import MultiYearRangeNote from '@/features/multi-year-tax/components/MultiYearRangeNote';
import MultiYearValidationAlert from '@/features/multi-year-tax/components/MultiYearValidationAlert';
import { MULTI_YEAR_COPY } from '@/features/multi-year-tax/lib/content';
import type { DatePartName, PeriodDateName, SalaryPeriod } from '@/features/multi-year-tax/types';

interface MultiYearSalaryHistoryProps {
  periods: SalaryPeriod[];
  expandedPeriodId: string | null;
  canCalculate: boolean;
  validationError: string | null;
  onAddPeriod: () => void;
  onCalculate: () => void;
  onDateChange: (
    periodId: string,
    field: PeriodDateName,
    part: DatePartName,
    value: string,
  ) => void;
  onRemove: (periodId: string) => void;
  onSalaryChange: (periodId: string, value: string) => void;
  onToggle: (periodId: string) => void;
}

export default function MultiYearSalaryHistory({
  canCalculate,
  expandedPeriodId,
  onAddPeriod,
  onCalculate,
  onDateChange,
  onRemove,
  onSalaryChange,
  onToggle,
  periods,
  validationError,
}: MultiYearSalaryHistoryProps) {
  return (
    <section aria-labelledby="salary-history-heading" className="space-y-4">
      <div>
        <h2 className="font-bold text-gray-900 text-xl" id="salary-history-heading">
          {MULTI_YEAR_COPY.title}
        </h2>
        <p className="mt-1 text-gray-600 text-sm">{MULTI_YEAR_COPY.subtitle}</p>
      </div>

      <MultiYearRangeNote />

      {validationError ? <MultiYearValidationAlert message={validationError} /> : null}

      <MultiYearPeriodList
        expandedPeriodId={expandedPeriodId}
        onDateChange={onDateChange}
        onRemove={onRemove}
        onSalaryChange={onSalaryChange}
        onToggle={onToggle}
        periods={periods}
      />

      <MultiYearEditorActions
        canCalculate={canCalculate}
        onAddPeriod={onAddPeriod}
        onCalculate={onCalculate}
      />
    </section>
  );
}
