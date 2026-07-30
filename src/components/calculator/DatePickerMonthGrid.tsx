'use client';

import { getOptionCellClass } from '@/components/calculator/datePickerStyles';

import {
  type CalendarMonth,
  type IsoDateRange,
  isMonthWithinRange,
  MONTH_LABELS,
  MONTH_SHORT_LABELS,
} from '@/utils/calendarDates';

interface DatePickerMonthGridProps {
  /** The month the calendar is on; its year is the one being shown. */
  month: CalendarMonth;
  onSelect: (month: number) => void;
  range: IsoDateRange;
}

export default function DatePickerMonthGrid({ month, onSelect, range }: DatePickerMonthGridProps) {
  return (
    <div className="grid grid-cols-3 gap-1 py-1">
      {MONTH_SHORT_LABELS.map((label, index) => {
        const monthNumber = index + 1;
        const isBlocked = !isMonthWithinRange({ year: month.year, month: monthNumber }, range);

        return (
          <button
            aria-disabled={isBlocked}
            aria-label={`${MONTH_LABELS[index]} ${month.year}`}
            className={getOptionCellClass({ isBlocked, isSelected: monthNumber === month.month })}
            key={label}
            onClick={() => {
              if (!isBlocked) {
                onSelect(monthNumber);
              }
            }}
            type="button"
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
