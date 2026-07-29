import { getMonthsInRange } from '@/features/multi-year-tax/lib/calculation';
import { MULTI_YEAR_COPY } from '@/features/multi-year-tax/lib/content';
import {
  applyDatePartChange,
  clampDateParts,
  getDateFieldBounds,
} from '@/features/multi-year-tax/lib/dateOptions';
import {
  EMPTY_DATE_PARTS,
  formatDisplayDate,
  isAfter,
  toDate,
} from '@/features/multi-year-tax/lib/dates';
import { formatMonthlySalary, formatMonthsCompact } from '@/features/multi-year-tax/lib/formatting';
import type {
  DatePartName,
  MultiYearState,
  PeriodDateName,
  PeriodSummary,
  SalaryPeriod,
} from '@/features/multi-year-tax/types';

const PERIOD_ID_PREFIX = 'period-';

function getPeriodNumber(id: string): number {
  return Number.parseInt(id.replace(PERIOD_ID_PREFIX, ''), 10) || 0;
}

export function createPeriod(id: string): SalaryPeriod {
  return { id, start: { ...EMPTY_DATE_PARTS }, end: { ...EMPTY_DATE_PARTS }, salary: '' };
}

/** Ids stay unique for React keys and field ids even after periods are removed. */
export function getNextPeriodId(periods: SalaryPeriod[]): string {
  const highest = periods.reduce((max, period) => Math.max(max, getPeriodNumber(period.id)), 0);
  return `${PERIOD_ID_PREFIX}${highest + 1}`;
}

export function isPeriodComplete(period: SalaryPeriod): boolean {
  const startDate = toDate(period.start);
  const endDate = toDate(period.end);
  const salary = Number.parseFloat(period.salary);

  return Boolean(startDate && endDate && !isAfter(startDate, endDate) && salary > 0);
}

export function arePeriodsComplete(periods: SalaryPeriod[]): boolean {
  return periods.length > 0 && periods.every(isPeriodComplete);
}

/** The one-line view of a period shown once it is collapsed. */
export function getPeriodSummary(period: SalaryPeriod): PeriodSummary {
  const startDate = toDate(period.start);
  const endDate = toDate(period.end);
  const isComplete = isPeriodComplete(period);

  if (!(startDate && endDate && isComplete)) {
    return {
      dateRangeLabel: MULTI_YEAR_COPY.incompletePeriod,
      salaryLabel: '',
      monthsLabel: '',
      isComplete: false,
    };
  }

  return {
    dateRangeLabel: `${formatDisplayDate(startDate)} – ${formatDisplayDate(endDate)}`,
    salaryLabel: formatMonthlySalary(Number.parseFloat(period.salary)),
    monthsLabel: formatMonthsCompact(getMonthsInRange(startDate, endDate)),
    isComplete: true,
  };
}

/**
 * Applies one dropdown change to a period. Moving the start date past the end
 * date pulls the end date along with it, so a period is never left describing a
 * span that runs backwards.
 */
export function applyPeriodDateChange(
  period: SalaryPeriod,
  field: PeriodDateName,
  part: DatePartName,
  value: string,
): SalaryPeriod {
  const bounds = getDateFieldBounds(field, field === 'end' ? toDate(period.start) : null);
  const nextParts = applyDatePartChange(period[field], part, value, bounds);
  const next: SalaryPeriod = { ...period, [field]: nextParts };

  if (field === 'end') {
    return next;
  }

  return { ...next, end: clampDateParts(next.end, getDateFieldBounds('end', toDate(nextParts))) };
}

export function createInitialMultiYearState(): MultiYearState {
  return { periods: [createPeriod(`${PERIOD_ID_PREFIX}1`)], result: null };
}
