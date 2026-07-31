const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const MS_PER_DAY = 86_400_000;
const MONTHS_IN_YEAR = 12;
const DAYS_IN_WEEK = 7;
/** The grid always renders six weeks so the panel never changes height. */
const WEEKS_IN_GRID = 6;

/** Years shown on one page of the year picker. */
export const YEAR_PAGE_SIZE = 12;

/** Widest span any calculator here needs; also bounds calendar navigation. */
export const EARLIEST_ISO_DATE = '1900-01-01';
export const LATEST_ISO_DATE = '2100-12-31';

export interface IsoDateParts {
  year: number;
  /** 1-12, as written in the string rather than JavaScript's 0-11. */
  month: number;
  day: number;
}

/** A month of the calendar, with `month` as 1-12. */
export interface CalendarMonth {
  year: number;
  month: number;
}

export interface CalendarDay {
  iso: string;
  day: number;
  /** False for the leading/trailing days that belong to a neighbouring month. */
  inMonth: boolean;
}

export interface IsoDateRange {
  min: string;
  max: string;
}

export const WEEKDAY_LABELS = [
  { short: 'Mon', long: 'Monday' },
  { short: 'Tue', long: 'Tuesday' },
  { short: 'Wed', long: 'Wednesday' },
  { short: 'Thu', long: 'Thursday' },
  { short: 'Fri', long: 'Friday' },
  { short: 'Sat', long: 'Saturday' },
  { short: 'Sun', long: 'Sunday' },
] as const;

export const MONTH_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const MONTH_SHORT_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

/** Splits a `YYYY-MM-DD` value into its numeric parts, or null if it is not one. */
export function parseIsoDateParts(value: string): IsoDateParts | null {
  const match = ISO_DATE_PATTERN.exec(value);
  if (!match) {
    return null;
  }

  const [, year, month, day] = match;
  return { year: Number(year), month: Number(month), day: Number(day) };
}

/** Parses a `YYYY-MM-DD` value into UTC milliseconds, so no timezone shifts the day. */
export function parseIsoDate(value: string): number | null {
  const parts = parseIsoDateParts(value);
  if (parts === null) {
    return null;
  }

  const timestamp = Date.UTC(parts.year, parts.month - 1, parts.day);
  return Number.isNaN(timestamp) ? null : timestamp;
}

/**
 * Whole years between two `YYYY-MM-DD` dates, counting anniversaries rather than
 * dividing by 365 — leap years would otherwise drift a holding period across a
 * band boundary. Returns the whole years plus the part-year on top.
 *
 * Both the property and securities capital-gains grids turn on whether a period
 * "exceeds" a given number of years, so an exact anniversary has to land on the
 * boundary rather than a day either side of it.
 */
export function diffInYears(startIso: string, endIso: string): number {
  const start = parseIsoDate(startIso);
  const end = parseIsoDate(endIso);
  if (start === null || end === null || end <= start) {
    return 0;
  }

  const startDate = new Date(start);
  let wholeYears = new Date(end).getUTCFullYear() - startDate.getUTCFullYear();

  const anniversaryAt = (yearsLater: number) =>
    Date.UTC(
      startDate.getUTCFullYear() + yearsLater,
      startDate.getUTCMonth(),
      startDate.getUTCDate(),
    );

  if (anniversaryAt(wholeYears) > end) {
    wholeYears -= 1;
  }

  const lastAnniversary = anniversaryAt(wholeYears);
  const nextAnniversary = anniversaryAt(wholeYears + 1);
  const fraction = (end - lastAnniversary) / (nextAnniversary - lastAnniversary);

  return wholeYears + fraction;
}

/** Joins numeric parts back into a zero-padded `YYYY-MM-DD` value. */
export function toIsoDate({ year, month, day }: IsoDateParts): string {
  const paddedMonth = String(month).padStart(2, '0');
  const paddedDay = String(day).padStart(2, '0');
  return `${String(year).padStart(4, '0')}-${paddedMonth}-${paddedDay}`;
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/**
 * Whether the parts describe a day that exists — `parseIsoDateParts` only checks
 * the shape, so `2025-02-31` gets through it and would silently roll over.
 */
export function isRealDate({ year, month, day }: IsoDateParts): boolean {
  if (month < 1 || month > MONTHS_IN_YEAR) {
    return false;
  }

  const iso = toIsoDate({ year, month, day });
  if (iso < EARLIEST_ISO_DATE || iso > LATEST_ISO_DATE) {
    return false;
  }

  return day >= 1 && day <= getDaysInMonth(year, month);
}

/** Today in the visitor's own timezone, as `YYYY-MM-DD`. */
export function getTodayIso(today: Date = new Date()): string {
  return toIsoDate({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  });
}

function fromTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return toIsoDate({
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  });
}

/** Moves an ISO date by whole days. Returns null if the value is not a date. */
export function shiftIsoByDays(iso: string, days: number): string | null {
  const timestamp = parseIsoDate(iso);
  return timestamp === null ? null : fromTimestamp(timestamp + days * MS_PER_DAY);
}

export function addMonths({ year, month }: CalendarMonth, step: number): CalendarMonth {
  const index = year * MONTHS_IN_YEAR + (month - 1) + step;
  return { year: Math.floor(index / MONTHS_IN_YEAR), month: (index % MONTHS_IN_YEAR) + 1 };
}

/** Moves an ISO date by whole months, holding the day back to the month's length. */
export function shiftIsoByMonths(iso: string, step: number): string | null {
  const parts = parseIsoDateParts(iso);
  if (parts === null) {
    return null;
  }

  const { year, month } = addMonths(parts, step);
  return toIsoDate({ year, month, day: Math.min(parts.day, getDaysInMonth(year, month)) });
}

/** Moves a date to another month of the same year, holding the day back if it is short. */
export function setIsoMonth(iso: string, month: number): string | null {
  const parts = parseIsoDateParts(iso);
  if (parts === null) {
    return null;
  }

  return toIsoDate({
    year: parts.year,
    month,
    day: Math.min(parts.day, getDaysInMonth(parts.year, month)),
  });
}

/** Moves a date to another year, holding the day back for a shorter February. */
export function setIsoYear(iso: string, year: number): string | null {
  const parts = parseIsoDateParts(iso);
  if (parts === null) {
    return null;
  }

  return toIsoDate({
    year,
    month: parts.month,
    day: Math.min(parts.day, getDaysInMonth(year, parts.month)),
  });
}

export function getCalendarMonth(iso: string): CalendarMonth | null {
  const parts = parseIsoDateParts(iso);
  return parts === null ? null : { year: parts.year, month: parts.month };
}

export function getTodayCalendarMonth(today: Date = new Date()): CalendarMonth {
  return { year: today.getFullYear(), month: today.getMonth() + 1 };
}

export function getMonthTitle({ year, month }: CalendarMonth): string {
  return `${MONTH_LABELS[month - 1]} ${year}`;
}

/** First year of the 12-year page a year belongs to. */
export function getYearPageStart(year: number): number {
  return Math.floor(year / YEAR_PAGE_SIZE) * YEAR_PAGE_SIZE;
}

export function getYearPage(year: number): number[] {
  const start = getYearPageStart(year);
  return Array.from({ length: YEAR_PAGE_SIZE }, (_unused, index) => start + index);
}

/** Six Monday-first weeks covering the month, padded with neighbouring days. */
export function buildCalendarWeeks({ year, month }: CalendarMonth): CalendarDay[][] {
  const firstOfMonth = Date.UTC(year, month - 1, 1);
  const leadingDays = (new Date(firstOfMonth).getUTCDay() + 6) % DAYS_IN_WEEK;

  return Array.from({ length: WEEKS_IN_GRID }, (_week, weekIndex) =>
    Array.from({ length: DAYS_IN_WEEK }, (_day, dayIndex) => {
      const offset = weekIndex * DAYS_IN_WEEK + dayIndex - leadingDays;
      const date = new Date(firstOfMonth + offset * MS_PER_DAY);

      return {
        iso: fromTimestamp(date.getTime()),
        day: date.getUTCDate(),
        inMonth: date.getUTCFullYear() === year && date.getUTCMonth() === month - 1,
      };
    }),
  );
}

export function isIsoWithinRange(iso: string, { min, max }: IsoDateRange): boolean {
  return iso >= min && iso <= max;
}

export function clampIsoToRange(iso: string, { min, max }: IsoDateRange): string {
  if (iso < min) {
    return min;
  }

  return iso > max ? max : iso;
}

/** True when any day of the month is selectable. */
export function isMonthWithinRange({ year, month }: CalendarMonth, range: IsoDateRange): boolean {
  const first = toIsoDate({ year, month, day: 1 });
  const last = toIsoDate({ year, month, day: getDaysInMonth(year, month) });
  return last >= range.min && first <= range.max;
}

/** True when any day of the year is selectable. */
export function isYearWithinRange(year: number, range: IsoDateRange): boolean {
  const first = toIsoDate({ year, month: 1, day: 1 });
  const last = toIsoDate({ year, month: MONTHS_IN_YEAR, day: 31 });
  return last >= range.min && first <= range.max;
}

/**
 * Pulls a date into a month, staying inside the selectable range — used when the
 * calendar jumps months so the focused day never lands on a blocked cell.
 */
export function clampIsoToMonth(iso: string, range: IsoDateRange): string {
  const month = getCalendarMonth(iso);
  if (month === null) {
    return clampIsoToRange(iso, range);
  }

  const first = toIsoDate({ ...month, day: 1 });
  const last = toIsoDate({ ...month, day: getDaysInMonth(month.year, month.month) });

  return clampIsoToRange(iso, {
    min: range.min > first ? range.min : first,
    max: range.max < last ? range.max : last,
  });
}

/** Turns `2025-06-21` into `21 Jun 2025`. */
export function formatIsoDateShort(iso: string): string {
  const timestamp = parseIsoDate(iso);
  if (timestamp === null) {
    return '—';
  }

  return new Date(timestamp).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Turns `2025-06-21` into `Saturday, 21 June 2025` for spoken labels. */
export function formatIsoDateFull(iso: string): string {
  const timestamp = parseIsoDate(iso);
  if (timestamp === null) {
    return iso;
  }

  return new Date(timestamp).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
