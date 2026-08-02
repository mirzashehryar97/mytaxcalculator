import { salaryTaxForYear } from '@/utils/taxCalculator';

import {
  addDays,
  formatDisplayDate,
  formatFiscalYearLabel,
  formatShortFiscalYearLabel,
  getDaysInMonth,
  getFiscalYear,
  getFiscalYearDates,
  isAfter,
  isBefore,
  toDate,
} from '@/features/multi-year-tax/lib/dates';
import type {
  FiscalYearBreakdown,
  MultiYearResult,
  SalaryPeriod,
} from '@/features/multi-year-tax/types';

interface FiscalYearSlice {
  fiscalYear: string;
  months: number;
  gross: number;
}

interface ParsedPeriod {
  startDate: Date;
  endDate: Date;
  monthlySalary: number;
}

/**
 * How much of a month a date covers: from a start date to month end, or from
 * month start to an end date. Partial months are paid by the day.
 */
function getMonthProportion(date: Date, isStartDate: boolean): number {
  const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth() + 1);
  const day = date.getDate();

  return isStartDate ? (daysInMonth - day + 1) / daysInMonth : day / daysInMonth;
}

/** Months between two dates, counting partial months as a fraction of their days. */
export function getMonthsInRange(startDate: Date, endDate: Date): number {
  const fullMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  const startDayProportion =
    startDate.getDate() === 1 ? 0 : 1 - getMonthProportion(startDate, true);
  const lastDayOfEndMonth = getDaysInMonth(endDate.getFullYear(), endDate.getMonth() + 1);
  const endDayProportion =
    endDate.getDate() === lastDayOfEndMonth ? 0 : 1 - getMonthProportion(endDate, false);

  return fullMonths + 1 - startDayProportion - endDayProportion;
}

/** Gross pay earned between two dates, prorating the first and last months. */
export function calculateActualSalary(
  startDate: Date,
  endDate: Date,
  monthlySalary: number,
): number {
  if (
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth()
  ) {
    const daysInMonth = getDaysInMonth(startDate.getFullYear(), startDate.getMonth() + 1);
    const daysWorked = endDate.getDate() - startDate.getDate() + 1;
    return monthlySalary * (daysWorked / daysInMonth);
  }

  let total = 0;
  let cursor = new Date(startDate.getTime());

  if (cursor.getDate() !== 1) {
    total += monthlySalary * getMonthProportion(cursor, true);
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
  }

  while (
    cursor.getFullYear() < endDate.getFullYear() ||
    (cursor.getFullYear() === endDate.getFullYear() && cursor.getMonth() < endDate.getMonth())
  ) {
    total += monthlySalary;
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
  }

  const lastDayOfEndMonth = getDaysInMonth(endDate.getFullYear(), endDate.getMonth() + 1);
  total +=
    endDate.getDate() === lastDayOfEndMonth
      ? monthlySalary
      : monthlySalary * getMonthProportion(endDate, false);

  return total;
}

/** Cuts one period at every 30 June it crosses, since each side is taxed separately. */
export function splitPeriodByFiscalYear(
  startDate: Date,
  endDate: Date,
  monthlySalary: number,
): FiscalYearSlice[] {
  const slices: FiscalYearSlice[] = [];
  let cursor = new Date(startDate.getTime());

  while (!isAfter(cursor, endDate)) {
    const fiscalYear = getFiscalYear(cursor);
    const { start: fiscalYearStart, end: fiscalYearEnd } = getFiscalYearDates(fiscalYear);
    const sliceStart = isAfter(cursor, fiscalYearStart) ? cursor : fiscalYearStart;
    const sliceEnd = isBefore(endDate, fiscalYearEnd) ? endDate : fiscalYearEnd;

    slices.push({
      fiscalYear,
      months: getMonthsInRange(sliceStart, sliceEnd),
      gross: calculateActualSalary(sliceStart, sliceEnd, monthlySalary),
    });

    cursor = addDays(fiscalYearEnd, 1);
  }

  return slices;
}

function parsePeriod(period: SalaryPeriod): ParsedPeriod | null {
  const startDate = toDate(period.start);
  const endDate = toDate(period.end);
  const monthlySalary = Number.parseFloat(period.salary);

  if (!(startDate && endDate) || Number.isNaN(monthlySalary) || monthlySalary <= 0) {
    return null;
  }

  return isAfter(startDate, endDate) ? null : { startDate, endDate, monthlySalary };
}

function toPercent(part: number, whole: number): number {
  if (!(whole > 0)) {
    return 0;
  }

  return Math.min(100, Math.max(0, (part / whole) * 100));
}

function buildBreakdown(slices: Map<string, FiscalYearSlice>): FiscalYearBreakdown[] {
  return [...slices.values()]
    .sort((a, b) => a.fiscalYear.localeCompare(b.fiscalYear))
    .map((slice) => {
      // Each slice is that tax year's whole salary income, so the §4AB
      // threshold is tested against the slice rather than the career total.
      const { totalTax: tax } = salaryTaxForYear(slice.gross, slice.fiscalYear);
      const taxPercent = toPercent(tax, slice.gross);

      return {
        fiscalYear: slice.fiscalYear,
        label: formatFiscalYearLabel(slice.fiscalYear),
        shortLabel: formatShortFiscalYearLabel(slice.fiscalYear),
        months: slice.months,
        gross: slice.gross,
        tax,
        takeHome: slice.gross - tax,
        effectiveRate: slice.gross > 0 ? (tax / slice.gross) * 100 : 0,
        takeHomePercent: 100 - taxPercent,
        taxPercent,
      };
    });
}

function addSlices(slices: Map<string, FiscalYearSlice>, period: ParsedPeriod): void {
  for (const slice of splitPeriodByFiscalYear(
    period.startDate,
    period.endDate,
    period.monthlySalary,
  )) {
    const existing = slices.get(slice.fiscalYear);
    slices.set(slice.fiscalYear, {
      fiscalYear: slice.fiscalYear,
      months: (existing?.months ?? 0) + slice.months,
      gross: (existing?.gross ?? 0) + slice.gross,
    });
  }
}

/** Every usable period, merged into one fiscal-year map plus the span they cover. */
function collectSlices(periods: SalaryPeriod[]) {
  const slices = new Map<string, FiscalYearSlice>();
  const parsed = periods
    .map(parsePeriod)
    .filter((period): period is ParsedPeriod => period !== null);

  for (const period of parsed) {
    addSlices(slices, period);
  }

  const startTimes = parsed.map((period) => period.startDate.getTime());
  const endTimes = parsed.map((period) => period.endDate.getTime());

  return {
    slices,
    earliestStart: parsed.length > 0 ? new Date(Math.min(...startTimes)) : null,
    latestEnd: parsed.length > 0 ? new Date(Math.max(...endTimes)) : null,
  };
}

/**
 * Totals every period, taxing each fiscal year's combined gross against that
 * year's own slabs. Returns `null` when nothing usable has been entered yet.
 */
export function calcMultiYearTax(periods: SalaryPeriod[]): MultiYearResult | null {
  const { earliestStart, latestEnd, slices } = collectSlices(periods);

  if (slices.size === 0 || !(earliestStart && latestEnd)) {
    return null;
  }

  const breakdown = buildBreakdown(slices);
  const totalGross = breakdown.reduce((sum, year) => sum + year.gross, 0);
  const totalTax = breakdown.reduce((sum, year) => sum + year.tax, 0);
  const totalMonths = breakdown.reduce((sum, year) => sum + year.months, 0);

  return {
    breakdown,
    totalGross,
    totalTax,
    totalTakeHome: totalGross - totalTax,
    totalMonths,
    effectiveRate: totalGross > 0 ? (totalTax / totalGross) * 100 : 0,
    coverageLabel: `${formatDisplayDate(earliestStart)} – ${formatDisplayDate(latestEnd)}`,
  };
}
