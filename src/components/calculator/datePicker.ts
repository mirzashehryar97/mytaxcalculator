import {
  addMonths,
  type CalendarMonth,
  clampIsoToRange,
  formatIsoDateShort,
  getCalendarMonth,
  getDaysInMonth,
  getMonthTitle,
  getTodayIso,
  getYearPageStart,
  type IsoDateRange,
  isIsoWithinRange,
  isMonthWithinRange,
  isYearWithinRange,
  shiftIsoByDays,
  shiftIsoByMonths,
  toIsoDate,
  YEAR_PAGE_SIZE,
} from '@/utils/calendarDates';

/** Which grid the panel is showing. The title steps up: days → months → years. */
export type DatePickerView = 'days' | 'months' | 'years';

/** Tallest the panel gets (header + six-week grid + actions), used to flip it above a low field. */
export const DATE_PICKER_PANEL_HEIGHT = 400;

const MONTHS_IN_YEAR = 12;

/** How far one press of the arrows moves, in months, for each view. */
export function getViewStepInMonths(view: DatePickerView): number {
  if (view === 'days') {
    return 1;
  }

  return view === 'months' ? MONTHS_IN_YEAR : MONTHS_IN_YEAR * YEAR_PAGE_SIZE;
}

/** Whether the arrows have anywhere left to go without leaving the allowed range. */
export function canStepCalendar(
  view: DatePickerView,
  month: CalendarMonth,
  step: number,
  range: IsoDateRange,
): boolean {
  if (view === 'days') {
    return isMonthWithinRange(addMonths(month, step), range);
  }

  if (view === 'months') {
    return isYearWithinRange(month.year + step, range);
  }

  const pageStart = getYearPageStart(month.year);
  const nextPageYear = step < 0 ? pageStart - 1 : pageStart + YEAR_PAGE_SIZE;
  return isYearWithinRange(nextPageYear, range);
}

/** Arrow keys walk the day grid; a week is seven days. */
const DAY_STEP_KEYS: Record<string, number> = {
  ArrowLeft: -1,
  ArrowRight: 1,
  ArrowUp: -7,
  ArrowDown: 7,
};

/** Page keys jump by whatever the view is showing. */
const PAGE_STEP_KEYS: Record<string, number> = { PageUp: -1, PageDown: 1 };

/**
 * Where a key press moves the focused day, or null when the key isn't one of
 * ours (or the move would leave the allowed range).
 */
export function getKeyboardTargetIso(
  key: string,
  focusedIso: string,
  view: DatePickerView,
  range: IsoDateRange,
): string | null {
  const dayStep = DAY_STEP_KEYS[key];
  if (dayStep !== undefined) {
    const target = shiftIsoByDays(focusedIso, dayStep);
    return target !== null && isIsoWithinRange(target, range) ? target : null;
  }

  const pageStep = PAGE_STEP_KEYS[key];
  if (pageStep !== undefined) {
    return shiftIsoByMonths(focusedIso, getViewStepInMonths(view) * pageStep);
  }

  const month = key === 'Home' || key === 'End' ? getCalendarMonth(focusedIso) : null;
  if (month === null) {
    return null;
  }

  const day = key === 'Home' ? 1 : getDaysInMonth(month.year, month.month);
  return toIsoDate({ ...month, day });
}

/** The day the calendar opens on: what is already chosen, else today. */
export function getInitialFocusIso(value: string, range: IsoDateRange): string {
  if (value !== '' && isIsoWithinRange(value, range)) {
    return value;
  }

  return clampIsoToRange(getTodayIso(), range);
}

export function getDatePickerTitle(view: DatePickerView, month: CalendarMonth): string {
  if (view === 'days') {
    return getMonthTitle(month);
  }

  if (view === 'months') {
    return String(month.year);
  }

  const pageStart = getYearPageStart(month.year);
  return `${pageStart}–${pageStart + YEAR_PAGE_SIZE - 1}`;
}

/** What the title button steps up to, for the button's spoken label. */
export function getDatePickerTitleAction(view: DatePickerView): string {
  return view === 'days' ? 'Choose a month' : 'Choose a year';
}

/** Names what the arrows move, which differs per view. */
export function getDatePickerStepLabel(view: DatePickerView): string {
  if (view === 'days') {
    return 'month';
  }

  return view === 'months' ? 'year' : 'set of years';
}

/** Spells out the accepted window when the field holds a date outside `min`/`max`. */
export function getDateRangeMessage(min?: string, max?: string): string {
  if (min && max) {
    return `Pick a date between ${formatIsoDateShort(min)} and ${formatIsoDateShort(max)}.`;
  }

  if (min) {
    return `Pick a date on or after ${formatIsoDateShort(min)}.`;
  }

  if (max) {
    return `Pick a date on or before ${formatIsoDateShort(max)}.`;
  }

  return 'Pick a valid date.';
}
