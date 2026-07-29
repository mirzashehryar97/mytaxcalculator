'use client';

import { Trash2 } from 'lucide-react';

import NumberInput from '@/components/calculator/NumberInput';

import PeriodBadge from '@/features/multi-year-tax/components/PeriodBadge';
import PeriodDateField from '@/features/multi-year-tax/components/PeriodDateField';
import { MULTI_YEAR_COPY } from '@/features/multi-year-tax/lib/content';
import { isPeriodComplete } from '@/features/multi-year-tax/lib/input';
import { FIELD_GROUP_LABEL_CLASS } from '@/features/multi-year-tax/lib/styles';
import type { DatePartName, PeriodDateName, SalaryPeriod } from '@/features/multi-year-tax/types';

interface MultiYearPeriodCardProps {
  period: SalaryPeriod;
  periodNumber: number;
  canRemove: boolean;
  onRemove: () => void;
  onDateChange: (field: PeriodDateName, part: DatePartName, value: string) => void;
  onSalaryChange: (value: string) => void;
}

export default function MultiYearPeriodCard({
  canRemove,
  onDateChange,
  onRemove,
  onSalaryChange,
  period,
  periodNumber,
}: MultiYearPeriodCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <PeriodBadge isComplete={isPeriodComplete(period)} periodNumber={periodNumber} />
          <h3 className="truncate font-bold text-base text-gray-900">
            {MULTI_YEAR_COPY.periodLabel} {periodNumber}
          </h3>
        </div>
        {canRemove ? (
          <button
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 font-semibold text-red-600 text-sm transition-colors hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-500/20"
            onClick={onRemove}
            type="button"
          >
            <Trash2 aria-hidden="true" className="h-4 w-4" />
            {MULTI_YEAR_COPY.removePeriod}
            <span className="sr-only"> period {periodNumber}</span>
          </button>
        ) : null}
      </div>

      <div className="mt-4 grid gap-4 border-gray-100 border-t pt-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,13rem)] lg:gap-5">
        <PeriodDateField
          field="start"
          label={MULTI_YEAR_COPY.startDateLabel}
          onChange={(part, value) => onDateChange('start', part, value)}
          period={period}
          periodNumber={periodNumber}
        />
        <PeriodDateField
          field="end"
          label={MULTI_YEAR_COPY.endDateLabel}
          onChange={(part, value) => onDateChange('end', part, value)}
          period={period}
          periodNumber={periodNumber}
        />
        <NumberInput
          helpText={MULTI_YEAR_COPY.salaryHelp}
          id={`${period.id}-salary`}
          label={MULTI_YEAR_COPY.salaryLabel}
          labelClassName={FIELD_GROUP_LABEL_CLASS}
          onChange={onSalaryChange}
          placeholder={MULTI_YEAR_COPY.salaryPlaceholder}
          prefix="Rs."
          value={period.salary}
        />
      </div>
    </div>
  );
}
