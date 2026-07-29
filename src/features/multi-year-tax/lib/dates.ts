import { MONTH_SHORT_LABELS } from '@/features/multi-year-tax/lib/content';
import type { DateParts } from '@/features/multi-year-tax/types';

export const EMPTY_DATE_PARTS: DateParts = { day: '', month: '', year: '' };

/** Days in a calendar month, where `month` is 1–12. */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/** A local-midnight date, where `month` is 1–12. */
export function createDate(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day);
}

export function isDateComplete(parts: DateParts): boolean {
  return Boolean(parts.day && parts.month && parts.year);
}

/**
 * Parses the three dropdown values into a local-midnight date. Returns `null`
 * while any part is still unset, so callers can treat "half picked" as "no date".
 */
export function toDate(parts: DateParts): Date | null {
  if (!isDateComplete(parts)) {
    return null;
  }

  const year = Number.parseInt(parts.year, 10);
  const month = Number.parseInt(parts.month, 10);
  const day = Number.parseInt(parts.day, 10);

  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return null;
  }

  return createDate(year, month, Math.min(day, getDaysInMonth(year, month)));
}

export function toDateParts(date: Date): DateParts {
  return {
    day: String(date.getDate()),
    month: String(date.getMonth() + 1),
    year: String(date.getFullYear()),
  };
}

/** e.g. `01 Jul 2023`. */
export function formatDisplayDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  return `${day} ${MONTH_SHORT_LABELS[date.getMonth()]} ${date.getFullYear()}`;
}

export function isBefore(date: Date, other: Date): boolean {
  return date.getTime() < other.getTime();
}

export function isAfter(date: Date, other: Date): boolean {
  return date.getTime() > other.getTime();
}

export function getFirstDayOfMonth(year: number, month: number): Date {
  return createDate(year, month, 1);
}

export function getLastDayOfMonth(year: number, month: number): Date {
  return createDate(year, month, getDaysInMonth(year, month));
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date.getTime());
  next.setDate(next.getDate() + days);
  return next;
}

/** The fiscal year (`2023-2024`) a date falls in — July starts a new one. */
export function getFiscalYear(date: Date): string {
  const year = date.getFullYear();
  return date.getMonth() + 1 >= 7 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
}

export function getFiscalYearDates(fiscalYear: string): { start: Date; end: Date } {
  const startYear = Number.parseInt(fiscalYear.split('-')[0], 10);
  return {
    start: createDate(startYear, 7, 1),
    end: createDate(startYear + 1, 6, 30),
  };
}

/** e.g. `FY 2023–2024`. */
export function formatFiscalYearLabel(fiscalYear: string): string {
  const [start, end] = fiscalYear.split('-');
  return `FY ${start}–${end}`;
}

/** e.g. `FY 23–24`, short enough for a chart axis. */
export function formatShortFiscalYearLabel(fiscalYear: string): string {
  const [start, end] = fiscalYear.split('-');
  return `FY ${start.slice(-2)}–${end.slice(-2)}`;
}
