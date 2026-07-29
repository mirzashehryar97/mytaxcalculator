import { MULTI_YEAR_VALIDATION_COPY } from '@/features/multi-year-tax/lib/content';
import { getSupportedRangeLabel } from '@/features/multi-year-tax/lib/dateOptions';
import { isAfter, isBefore, toDate } from '@/features/multi-year-tax/lib/dates';
import {
  getEarliestSupportedDate,
  getLatestSupportedDate,
} from '@/features/multi-year-tax/lib/rates';
import type { SalaryPeriod } from '@/features/multi-year-tax/types';

interface DateRange {
  periodNumber: number;
  startDate: Date;
  endDate: Date;
}

function overlaps(range: DateRange, other: DateRange): boolean {
  return range.startDate <= other.endDate && range.endDate >= other.startDate;
}

/**
 * First problem found across the whole salary history, phrased for the user, or
 * `null` when every period can be taxed.
 */
export function getMultiYearValidationError(periods: SalaryPeriod[]): string | null {
  const earliest = getEarliestSupportedDate();
  const latest = getLatestSupportedDate();
  const checked: DateRange[] = [];

  for (const [index, period] of periods.entries()) {
    const periodNumber = index + 1;
    const startDate = toDate(period.start);
    const endDate = toDate(period.end);
    const salary = Number.parseFloat(period.salary);

    if (!(startDate && endDate) || period.salary.trim() === '') {
      return MULTI_YEAR_VALIDATION_COPY.incomplete;
    }

    if (Number.isNaN(salary) || salary <= 0) {
      return MULTI_YEAR_VALIDATION_COPY.invalidSalary(periodNumber);
    }

    if (isAfter(startDate, endDate)) {
      return MULTI_YEAR_VALIDATION_COPY.startAfterEnd(periodNumber);
    }

    if (isBefore(startDate, earliest) || isAfter(endDate, latest)) {
      return MULTI_YEAR_VALIDATION_COPY.outsideRange(periodNumber, getSupportedRangeLabel());
    }

    const range: DateRange = { periodNumber, startDate, endDate };
    const clash = checked.find((other) => overlaps(range, other));

    if (clash) {
      return MULTI_YEAR_VALIDATION_COPY.overlap(periodNumber, clash.periodNumber);
    }

    checked.push(range);
  }

  return null;
}
