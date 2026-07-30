'use client';

import { getOptionCellClass } from '@/components/calculator/datePickerStyles';

import { getYearPage, type IsoDateRange, isYearWithinRange } from '@/utils/calendarDates';

interface DatePickerYearGridProps {
  onSelect: (year: number) => void;
  range: IsoDateRange;
  /** The year the calendar is on; its 12-year page is the one being shown. */
  year: number;
}

export default function DatePickerYearGrid({ onSelect, range, year }: DatePickerYearGridProps) {
  return (
    <div className="grid grid-cols-3 gap-1 py-1">
      {getYearPage(year).map((pageYear) => {
        const isBlocked = !isYearWithinRange(pageYear, range);

        return (
          <button
            aria-disabled={isBlocked}
            className={getOptionCellClass({ isBlocked, isSelected: pageYear === year })}
            key={pageYear}
            onClick={() => {
              if (!isBlocked) {
                onSelect(pageYear);
              }
            }}
            type="button"
          >
            {pageYear}
          </button>
        );
      })}
    </div>
  );
}
