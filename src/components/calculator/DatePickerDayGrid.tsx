'use client';

import { getDayCellClass } from '@/components/calculator/datePickerStyles';

import {
  type CalendarDay,
  formatIsoDateFull,
  type IsoDateRange,
  isIsoWithinRange,
  WEEKDAY_LABELS,
} from '@/utils/calendarDates';

interface DatePickerDayGridProps {
  /** The day arrow keys are sitting on — the only cell in the tab order. */
  focusedIso: string;
  gridRef: React.RefObject<HTMLDivElement>;
  monthTitle: string;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  onSelect: (iso: string) => void;
  range: IsoDateRange;
  selectedIso: string;
  todayIso: string;
  weeks: CalendarDay[][];
}

export default function DatePickerDayGrid({
  focusedIso,
  gridRef,
  monthTitle,
  onKeyDown,
  onSelect,
  range,
  selectedIso,
  todayIso,
  weeks,
}: DatePickerDayGridProps) {
  return (
    <div ref={gridRef}>
      <table className="w-full table-fixed border-collapse">
        <caption className="sr-only">{monthTitle}</caption>
        <thead>
          <tr>
            {WEEKDAY_LABELS.map((weekday) => (
              <th
                className="pb-1 font-medium text-gray-400 text-xs"
                key={weekday.short}
                scope="col"
              >
                <span aria-hidden="true">{weekday.short}</span>
                <span className="sr-only">{weekday.long}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={week[0].iso}>
              {week.map((day) => {
                const isBlocked = !isIsoWithinRange(day.iso, range);
                const isToday = day.iso === todayIso;

                return (
                  <td className="p-0" key={day.iso}>
                    <button
                      aria-current={isToday ? 'date' : undefined}
                      aria-disabled={isBlocked}
                      aria-label={formatIsoDateFull(day.iso)}
                      aria-pressed={day.iso === selectedIso}
                      className={`mx-auto ${getDayCellClass({
                        isBlocked,
                        isOutsideMonth: !day.inMonth,
                        isSelected: day.iso === selectedIso,
                        isToday,
                      })}`}
                      data-focused={day.iso === focusedIso}
                      onClick={() => {
                        if (!isBlocked) {
                          onSelect(day.iso);
                        }
                      }}
                      onKeyDown={onKeyDown}
                      tabIndex={day.iso === focusedIso ? 0 : -1}
                      type="button"
                    >
                      {day.day}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
