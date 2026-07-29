import { MONTH_SHORT_LABELS, MULTI_YEAR_DATE_REASONS } from '@/features/multi-year-tax/lib/content';
import {
  createDate,
  formatDisplayDate,
  getDaysInMonth,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  isAfter,
  isBefore,
  toDate,
  toDateParts,
} from '@/features/multi-year-tax/lib/dates';
import {
  EARLIEST_FISCAL_YEAR_LABEL,
  getEarliestSupportedDate,
  getLatestSupportedDate,
  LATEST_FISCAL_YEAR_LABEL,
  SUPPORTED_CALENDAR_YEARS,
} from '@/features/multi-year-tax/lib/rates';
import type {
  DateBoundary,
  DateFieldBounds,
  DatePartName,
  DatePartOption,
  DateParts,
  PeriodDateName,
} from '@/features/multi-year-tax/types';

const MAX_DAYS_IN_ANY_MONTH = 31;

function getSupportedMinBoundary(): DateBoundary {
  const date = getEarliestSupportedDate();
  return {
    date,
    reason: MULTI_YEAR_DATE_REASONS.beforeSupportedRange(
      formatDisplayDate(date),
      EARLIEST_FISCAL_YEAR_LABEL,
    ),
  };
}

function getSupportedMaxBoundary(): DateBoundary {
  const date = getLatestSupportedDate();
  return {
    date,
    reason: MULTI_YEAR_DATE_REASONS.afterSupportedRange(
      formatDisplayDate(date),
      LATEST_FISCAL_YEAR_LABEL,
    ),
  };
}

/** e.g. `01 Jul 2014 – 30 Jun 2027`. */
export function getSupportedRangeLabel(): string {
  return `${formatDisplayDate(getEarliestSupportedDate())} – ${formatDisplayDate(
    getLatestSupportedDate(),
  )}`;
}

/**
 * What a single date field may cover. The start date is bounded only by the
 * fiscal years we hold slabs for; the end date additionally can't fall before
 * its own period's start. Each edge carries the reason it is there, so a
 * blocked dropdown option can explain itself.
 */
export function getDateFieldBounds(
  field: PeriodDateName,
  periodStartDate: Date | null,
): DateFieldBounds {
  const supportedMin = getSupportedMinBoundary();
  const supportedMax = getSupportedMaxBoundary();

  if (field === 'start' || !periodStartDate || !isAfter(periodStartDate, supportedMin.date)) {
    return { min: supportedMin, max: supportedMax };
  }

  return {
    min: {
      date: periodStartDate,
      reason: MULTI_YEAR_DATE_REASONS.beforePeriodStart(formatDisplayDate(periodStartDate)),
    },
    max: supportedMax,
  };
}

function getBlockedReason(
  firstMoment: Date,
  lastMoment: Date,
  bounds: DateFieldBounds,
): string | undefined {
  if (isBefore(lastMoment, bounds.min.date)) {
    return bounds.min.reason;
  }

  if (isAfter(firstMoment, bounds.max.date)) {
    return bounds.max.reason;
  }

  return;
}

/**
 * Years outside the supported fiscal years are left out of the list entirely —
 * only a year that is still selected survives, marked blocked, so the dropdown
 * never renders empty after another field narrows the range.
 */
export function getYearOptions(bounds: DateFieldBounds, selectedYear: string): DatePartOption[] {
  const options: DatePartOption[] = [];

  for (const year of SUPPORTED_CALENDAR_YEARS) {
    const value = String(year);
    const disabledReason = getBlockedReason(
      createDate(year, 1, 1),
      createDate(year, 12, 31),
      bounds,
    );

    if (!disabledReason || value === selectedYear) {
      options.push({ value, label: value, disabledReason });
    }
  }

  return options;
}

/**
 * All twelve months always show. The ones the period can't reach are kept but
 * blocked with the reason attached, which is what the tooltip reads out.
 */
export function getMonthOptions(parts: DateParts, bounds: DateFieldBounds): DatePartOption[] {
  const year = Number.parseInt(parts.year, 10);

  return MONTH_SHORT_LABELS.map((label, index) => {
    const month = index + 1;
    const value = String(month);

    if (Number.isNaN(year)) {
      return { value, label };
    }

    return {
      value,
      label,
      disabledReason: getBlockedReason(
        getFirstDayOfMonth(year, month),
        getLastDayOfMonth(year, month),
        bounds,
      ),
    };
  });
}

/**
 * Days that don't exist in the chosen month are never listed; days that exist
 * but sit outside the period's range are blocked with a reason.
 */
export function getDayOptions(parts: DateParts, bounds: DateFieldBounds): DatePartOption[] {
  const year = Number.parseInt(parts.year, 10);
  const month = Number.parseInt(parts.month, 10);
  const hasMonth = !(Number.isNaN(year) || Number.isNaN(month));
  const dayCount = hasMonth ? getDaysInMonth(year, month) : MAX_DAYS_IN_ANY_MONTH;

  return Array.from({ length: dayCount }, (_unused, index) => {
    const day = index + 1;
    const value = String(day);
    const label = value.padStart(2, '0');

    if (!hasMonth) {
      return { value, label };
    }

    const date = createDate(year, month, day);
    return { value, label, disabledReason: getBlockedReason(date, date, bounds) };
  });
}

export function getDatePartOptions(
  part: DatePartName,
  parts: DateParts,
  bounds: DateFieldBounds,
): DatePartOption[] {
  if (part === 'year') {
    return getYearOptions(bounds, parts.year);
  }

  return part === 'month' ? getMonthOptions(parts, bounds) : getDayOptions(parts, bounds);
}

/** Pulls a complete date back inside its bounds; leaves half-picked dates alone. */
export function clampDateParts(parts: DateParts, bounds: DateFieldBounds): DateParts {
  const date = toDate(parts);

  if (!date) {
    return parts;
  }

  if (isBefore(date, bounds.min.date)) {
    return toDateParts(bounds.min.date);
  }

  if (isAfter(date, bounds.max.date)) {
    return toDateParts(bounds.max.date);
  }

  return parts;
}

/**
 * Applies one dropdown change: a day that the new month is too short for snaps
 * to that month's last day, and a date pushed outside its range snaps to the
 * edge it crossed.
 */
export function applyDatePartChange(
  parts: DateParts,
  part: DatePartName,
  value: string,
  bounds: DateFieldBounds,
): DateParts {
  const next: DateParts = { ...parts, [part]: value };
  const year = Number.parseInt(next.year, 10);
  const month = Number.parseInt(next.month, 10);
  const day = Number.parseInt(next.day, 10);

  if (!(Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day))) {
    const lastDay = getDaysInMonth(year, month);
    if (day > lastDay) {
      next.day = String(lastDay);
    }
  }

  return clampDateParts(next, bounds);
}
