'use client';

import SelectInput from '@/components/calculator/SelectInput';

import { DATE_PART_FIELDS } from '@/features/multi-year-tax/lib/content';
import { getDateFieldBounds, getDatePartOptions } from '@/features/multi-year-tax/lib/dateOptions';
import { toDate } from '@/features/multi-year-tax/lib/dates';
import { FIELD_GROUP_LABEL_CLASS } from '@/features/multi-year-tax/lib/styles';
import type { DatePartName, PeriodDateName, SalaryPeriod } from '@/features/multi-year-tax/types';

interface PeriodDateFieldProps {
  period: SalaryPeriod;
  periodNumber: number;
  field: PeriodDateName;
  label: string;
  onChange: (part: DatePartName, value: string) => void;
}

export default function PeriodDateField({
  field,
  label,
  onChange,
  period,
  periodNumber,
}: PeriodDateFieldProps) {
  const parts = period[field];
  const bounds = getDateFieldBounds(field, field === 'end' ? toDate(period.start) : null);

  return (
    <fieldset className="min-w-0">
      <legend className={`${FIELD_GROUP_LABEL_CLASS} mb-2`}>{label}</legend>
      <div className="flex min-w-0 gap-2">
        {DATE_PART_FIELDS.map((datePart) => (
          <SelectInput
            ariaLabel={`${label} ${datePart.label.toLowerCase()} for period ${periodNumber}`}
            className="flex-1"
            id={`${period.id}-${field}-${datePart.part}`}
            key={datePart.part}
            label={datePart.label}
            onChange={(value) => onChange(datePart.part, value)}
            options={getDatePartOptions(datePart.part, parts, bounds)}
            placeholder={datePart.placeholder}
            size="sm"
            value={parts[datePart.part]}
          />
        ))}
      </div>
    </fieldset>
  );
}
