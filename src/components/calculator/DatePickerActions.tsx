'use client';

import { PANEL_ACTION_CLASS } from '@/components/calculator/datePickerStyles';

interface DatePickerActionsProps {
  /** False when today falls outside the dates this field accepts. */
  canSelectToday: boolean;
  hasValue: boolean;
  onClear: () => void;
  onToday: () => void;
}

export default function DatePickerActions({
  canSelectToday,
  hasValue,
  onClear,
  onToday,
}: DatePickerActionsProps) {
  return (
    <div className="mt-2 flex items-center justify-between border-gray-100 border-t pt-2">
      <button
        className={`${PANEL_ACTION_CLASS} text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
        disabled={!hasValue}
        onClick={onClear}
        type="button"
      >
        Clear
      </button>
      <button
        className={`${PANEL_ACTION_CLASS} text-emerald-700 hover:bg-emerald-50`}
        disabled={!canSelectToday}
        onClick={onToday}
        type="button"
      >
        Today
      </button>
    </div>
  );
}
