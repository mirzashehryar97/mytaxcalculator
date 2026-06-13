'use client';

import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { AlertTriangle, Calendar, Info, MinusCircle, PlusCircle } from 'lucide-react';
import DatePicker from 'react-datepicker';

import { useCalculator } from '@/context/useCalculator';

import { calculateTaxForTotalAmount, taxSlabs } from '../utils/taxCalculator';
import MultiYearChartsLoading from './MultiYearChartsLoading';

const MultiYearCharts = dynamic(() => import('./multi-year-charts/MultiYearCharts'), {
  loading: () => <MultiYearChartsLoading />,
  ssr: false,
});
import 'react-datepicker/dist/react-datepicker.css';
import '../datepicker.css';

// Helper function to format date as YYYY-MM-DD
const formatDateToYYYYMMDD = (date: Date | null): string => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

interface FiscalYearBreakdown {
  fiscalYear: string;
  startDate: string;
  endDate: string;
  months: number;
  monthlySalary: number;
  totalSalary: number;
  tax: number;
  netIncome: number;
}

interface DayRange {
  startDate: Date;
  endDate: Date;
}

interface PeriodInput {
  startDate: string;
  endDate: string;
  salary: string;
}

function getFiscalYearBounds(): { earliestStartYear: number; latestEndYear: number } {
  const sortedYears = [...Object.keys(taxSlabs)].sort();
  const earliestYear = sortedYears[0];
  const latestYear = sortedYears.at(-1) ?? earliestYear;
  const [earliestStartYear] = earliestYear.split('-').map(Number);
  const [, latestEndYear] = latestYear.split('-').map(Number);
  return { earliestStartYear, latestEndYear };
}

function isDateInAvailableFiscalYears(date: Date): boolean {
  const { earliestStartYear, latestEndYear } = getFiscalYearBounds();
  const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const earliestFiscalYearStart = new Date(earliestStartYear, 6, 1);
  const latestFiscalYearEnd = new Date(latestEndYear, 5, 30);
  return normalizedDate >= earliestFiscalYearStart && normalizedDate <= latestFiscalYearEnd;
}

function getFormattedDateRange(): string {
  const { earliestStartYear, latestEndYear } = getFiscalYearBounds();
  return `July 1, ${earliestStartYear} to June 30, ${latestEndYear}`;
}

function doRangesOverlap(rangeA: DayRange, rangeB: DayRange): boolean {
  return rangeA.startDate <= rangeB.endDate && rangeA.endDate >= rangeB.startDate;
}

function getPeriodValidationError(
  period: PeriodInput,
  dateRanges: DayRange[],
  formattedDateRange: string,
): string | null {
  if (!(period.startDate && period.endDate && period.salary)) {
    return null;
  }

  const startDate = new Date(period.startDate);
  const endDate = new Date(period.endDate);

  if (startDate > endDate) {
    return 'Start date cannot be after end date.';
  }

  if (!isDateInAvailableFiscalYears(startDate)) {
    return `The start date (${period.startDate}) is outside the range of available tax slabs. Please use dates within the range: ${formattedDateRange}`;
  }

  if (!isDateInAvailableFiscalYears(endDate)) {
    return `The end date (${period.endDate}) is outside the range of available tax slabs. Please use dates within the range: ${formattedDateRange}`;
  }

  for (const range of dateRanges) {
    if (doRangesOverlap({ startDate, endDate }, range)) {
      return 'Periods cannot overlap. Please ensure no date is covered by multiple periods.';
    }
  }

  return null;
}

function MultiYearCalculator() {
  const { multiYear, setMultiYear } = useCalculator();
  const { periods, result } = multiYear;
  const [validationError, setValidationError] = useState<string | null>(null);
  // Add state for active chart selection
  const [activeChart, setActiveChart] = useState<string>('comparison');
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addPeriod = () => {
    setMultiYear((prev) => ({
      ...prev,
      periods: [...prev.periods, { startDate: '', endDate: '', salary: '' }],
    }));
  };

  const removePeriod = (index: number) => {
    setMultiYear((prev) => ({
      ...prev,
      periods: prev.periods.filter((_, i) => i !== index),
    }));
    // Clear validation error when removing a period
    setValidationError(null);
  };

  const updatePeriod = (
    index: number,
    field: keyof (typeof periods)[0],
    value: string | Date | null,
  ) => {
    setMultiYear((prev) => ({
      ...prev,
      periods: prev.periods.map((period, i) =>
        i === index
          ? {
              ...period,
              [field]: field === 'salary' ? value : formatDateToYYYYMMDD(value as Date | null),
            }
          : period,
      ),
    }));

    // Clear validation error when updating a period
    setValidationError(null);
  };

  // Calculate the number of days in a month
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Calculate the proportion of the month based on days
  const getMonthProportion = (date: Date, isStartDate: boolean): number => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const daysInMonth = getDaysInMonth(year, month);

    if (isStartDate) {
      // For start date, calculate proportion from the date to end of month
      return (daysInMonth - day + 1) / daysInMonth;
    }
    // For end date, calculate proportion from beginning of month to the date
    return day / daysInMonth;
  };

  // Calculate actual salary for a period including partial months
  const calculateActualSalary = (startDate: Date, endDate: Date, monthlySalary: number): number => {
    // If dates are in the same month and year
    if (
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth()
    ) {
      const daysInMonth = getDaysInMonth(startDate.getFullYear(), startDate.getMonth());
      const daysDifference = endDate.getDate() - startDate.getDate() + 1;
      return monthlySalary * (daysDifference / daysInMonth);
    }

    let totalSalary = 0;
    let currentDate = new Date(startDate);

    // Handle first partial month (if not starting on the 1st)
    if (currentDate.getDate() !== 1) {
      const firstMonthProportion = getMonthProportion(currentDate, true);
      totalSalary += monthlySalary * firstMonthProportion;

      // Move to the first day of the next month
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    }

    // Handle full months in between
    while (
      currentDate.getFullYear() < endDate.getFullYear() ||
      (currentDate.getFullYear() === endDate.getFullYear() &&
        currentDate.getMonth() < endDate.getMonth())
    ) {
      totalSalary += monthlySalary;
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    }

    // Handle last partial month (if not ending on the last day of month)
    const lastDayOfMonth = getDaysInMonth(endDate.getFullYear(), endDate.getMonth());
    if (endDate.getDate() !== lastDayOfMonth) {
      const lastMonthProportion = getMonthProportion(endDate, false);
      totalSalary += monthlySalary * lastMonthProportion;
    } else {
      // If it ends on the last day of the month, add the full month
      totalSalary += monthlySalary;
    }

    return totalSalary;
  };

  // Validate that no two periods overlap and all dates are within available fiscal years

  const validatePeriods = (): boolean => {
    const dateRanges: DayRange[] = [];
    const formattedDateRange = getFormattedDateRange();

    for (const period of periods) {
      const error = getPeriodValidationError(period, dateRanges, formattedDateRange);
      if (error) {
        setValidationError(error);
        return false;
      }

      if (period.startDate && period.endDate && period.salary) {
        dateRanges.push({
          startDate: new Date(period.startDate),
          endDate: new Date(period.endDate),
        });
      }
    }

    return true;
  };

  const getMonthsInRange = (start: Date, end: Date): number => {
    // Calculate full months
    const fullMonths =
      (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

    // Calculate partial months as decimal
    const startDayProportion = start.getDate() === 1 ? 0 : 1 - getMonthProportion(start, true);
    const endDayProportion =
      end.getDate() === getDaysInMonth(end.getFullYear(), end.getMonth())
        ? 0
        : 1 - getMonthProportion(end, false);

    return fullMonths + 1 - startDayProportion - endDayProportion;
  };

  const getFiscalYear = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return month >= 7 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
  };

  const getFiscalYearDates = (fiscalYear: string): { start: Date; end: Date } => {
    const [startYear] = fiscalYear.split('-');
    return {
      start: new Date(Number.parseInt(startYear, 10), 6, 1), // July 1st
      end: new Date(Number.parseInt(startYear, 10) + 1, 5, 30), // June 30th
    };
  };
  const splitPeriodByFiscalYear = (
    startDate: Date,
    endDate: Date,
    monthlySalary: number,
  ): FiscalYearBreakdown[] => {
    const breakdowns: FiscalYearBreakdown[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const fiscalYear = getFiscalYear(currentDate);
      const { start: fiscalYearStart, end: fiscalYearEnd } = getFiscalYearDates(fiscalYear);

      const periodStart = currentDate > fiscalYearStart ? currentDate : fiscalYearStart;
      const periodEnd = endDate < fiscalYearEnd ? endDate : fiscalYearEnd;

      // Calculate exact months including partial months
      const months = getMonthsInRange(periodStart, periodEnd);

      // Calculate the actual salary for this period considering partial months
      const totalSalary = calculateActualSalary(periodStart, periodEnd, monthlySalary);

      breakdowns.push({
        fiscalYear,
        startDate: periodStart.toISOString().split('T')[0],
        endDate: periodEnd.toISOString().split('T')[0],
        months,
        monthlySalary,
        totalSalary,
        tax: 0, // We'll calculate this after combining all periods
        netIncome: 0, // We'll calculate this after combining all periods
      });

      // Move to next fiscal year
      currentDate = new Date(fiscalYearEnd);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return breakdowns;
  };

  const handleCalculate = () => {
    // Validate periods first
    if (!validatePeriods()) {
      return;
    }

    const allBreakdowns: FiscalYearBreakdown[] = [];

    for (const period of periods) {
      const salary = Number.parseFloat(period.salary);
      if (Number.isNaN(salary) || !period.startDate || !period.endDate) continue;

      const startDate = new Date(period.startDate);
      const endDate = new Date(period.endDate);
      const breakdowns = splitPeriodByFiscalYear(startDate, endDate, salary);
      allBreakdowns.push(...breakdowns);
    }

    // First, group all periods by fiscal year
    const fiscalYearGroups = new Map<string, FiscalYearBreakdown[]>();
    for (const breakdown of allBreakdowns) {
      const existing = fiscalYearGroups.get(breakdown.fiscalYear) || [];
      fiscalYearGroups.set(breakdown.fiscalYear, [...existing, breakdown]);
    }

    // Now process each fiscal year group
    const finalBreakdowns: FiscalYearBreakdown[] = [];
    for (const [fiscalYear, breakdowns] of fiscalYearGroups) {
      // Calculate total months and salary for this fiscal year
      const totalMonths = breakdowns.reduce((sum, b) => sum + b.months, 0);
      const totalSalary = breakdowns.reduce((sum, b) => sum + b.totalSalary, 0);

      // Calculate the average monthly salary for this period
      const averageMonthlySalary = totalSalary / totalMonths;

      // Use the tax utility function to calculate tax directly on the total amount
      const tax = calculateTaxForTotalAmount(totalSalary, fiscalYear);

      finalBreakdowns.push({
        fiscalYear,
        startDate: breakdowns[0].startDate, // Just use the first start date
        endDate: breakdowns.at(-1)?.endDate ?? breakdowns[0].endDate,
        months: totalMonths,
        monthlySalary: averageMonthlySalary, // Average monthly salary across all periods
        totalSalary,
        tax,
        netIncome: totalSalary - tax,
      });
    }

    const totalTax = finalBreakdowns.reduce((sum, b) => sum + b.tax, 0);

    setMultiYear((prev) => ({
      ...prev,
      result: {
        totalTax,
        breakdown: finalBreakdowns.map((b) => ({
          period: `Fiscal Year ${b.fiscalYear} (${b.months.toFixed(2)} months)`,
          tax: b.tax,
          salary: b.totalSalary,
          netIncome: b.netIncome,
          fiscalYear: b.fiscalYear, // Add fiscalYear for charts
          months: b.months, // Add months for charts
          taxRate: (b.tax / b.totalSalary) * 100, // Add tax rate for visualization
        })),
      },
    }));

    // Set default chart view when calculation is done
    setActiveChart('comparison');
  };

  // Chart data preparation functions
  const getComparisonChartData = () => {
    if (!result) return [];
    return result.breakdown.map((item) => ({
      name: `FY ${item.fiscalYear}`,
      Tax: Math.round(item.tax),
      'Net Income': Math.round(item.netIncome),
      'Gross Salary': Math.round(item.salary),
    }));
  };

  const getTaxRateChartData = () => {
    if (!result) return [];
    return result.breakdown.map((item) => ({
      name: `FY ${item.fiscalYear}`,
      'Tax Rate (%)': Number.parseFloat(((item.tax / item.salary) * 100).toFixed(2)),
      'Months Worked': Number.parseFloat(item.months.toFixed(2)),
    }));
  };

  const getDistributionChartData = () => {
    if (!result) return [];
    return [
      { name: 'Tax', value: Math.round(result.totalTax) },
      {
        name: 'Net Income',
        value: Math.round(result.breakdown.reduce((sum, item) => sum + item.netIncome, 0)),
      },
    ];
  };

  const getMonthlyBreakdownData = () => {
    if (!result) return [];
    return result.breakdown.map((item) => ({
      name: `FY ${item.fiscalYear}`,
      'Monthly Salary': Math.round(item.salary / 12),
      'Monthly Tax': Math.round(item.tax / 12),
      'Monthly Net': Math.round(item.netIncome / 12),
    }));
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="space-y-6">
        {validationError && (
          <div className="flex animate-fade-in items-start rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            <AlertTriangle className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
            <p className="text-sm">{validationError}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-start rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <Info className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-emerald-600" />
            <div className="text-emerald-900 text-sm">
              <p className="mb-1 font-semibold">Partial Month Calculation</p>
              <p className="text-emerald-800/80">
                For periods that don't align with complete months, salary is calculated
                proportionally based on actual days worked.
              </p>
            </div>
          </div>

          <div className="flex items-start rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <Calendar className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-blue-600" />
            <div className="text-blue-900 text-sm">
              <p className="mb-1 font-semibold">Available Fiscal Years</p>
              <p className="text-blue-800/80">
                Supports tax calculations for periods between {getFormattedDateRange()}. Ensure your
                dates fall within this range.
              </p>
            </div>
          </div>
        </div>

        {periods.map((period, index) => (
          <div key={index} className="period-card space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                  <Calendar className="h-5 w-5" />
                </span>
                <h3 className="font-bold text-gray-900 text-lg">Period {index + 1}</h3>
              </div>
              {periods.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePeriod(index)}
                  aria-label="Remove period"
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <MinusCircle className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label
                  htmlFor={`period-${index}-start`}
                  className="form-label flex items-center gap-1 text-gray-800"
                >
                  Start Date
                  <Calendar className="ml-1 h-4 w-4 text-blue-500" />
                </label>
                <div className="relative">
                  <DatePicker
                    id={`period-${index}-start`}
                    selected={period.startDate ? new Date(period.startDate) : null}
                    onChange={(date: Date | null) => updatePeriod(index, 'startDate', date)}
                    dateFormat="dd-MM-yyyy"
                    className="form-input w-full rounded-xl border-emerald-300 pr-10 text-lg shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    popperClassName="z-50"
                    calendarClassName="rounded-xl shadow-lg border border-emerald-200"
                    placeholderText="Select start date"
                    minDate={new Date(getFormattedDateRange().split(' to ')[0])}
                    maxDate={new Date(getFormattedDateRange().split(' to ')[1])}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={30}
                    showMonthDropdown
                    dateFormatCalendar="MMMM yyyy"
                  />
                  <Calendar className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 h-5 w-5 text-blue-400" />
                </div>
                <div className="mt-1 text-gray-500 text-xs">Between {getFormattedDateRange()}</div>
              </div>

              <div>
                <label
                  htmlFor={`period-${index}-end`}
                  className="form-label flex items-center gap-1 text-gray-800"
                >
                  End Date
                  <Calendar className="ml-1 h-4 w-4 text-blue-500" />
                </label>
                <div className="relative">
                  <DatePicker
                    id={`period-${index}-end`}
                    selected={period.endDate ? new Date(period.endDate) : null}
                    onChange={(date: Date | null) => updatePeriod(index, 'endDate', date)}
                    dateFormat="dd-MM-yyyy"
                    className="form-input w-full rounded-xl border-emerald-300 pr-10 text-lg shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    popperClassName="z-50"
                    calendarClassName="rounded-xl shadow-lg border border-emerald-200"
                    placeholderText="Select end date"
                    minDate={new Date(getFormattedDateRange().split(' to ')[0])}
                    maxDate={new Date(getFormattedDateRange().split(' to ')[1])}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={30}
                    showMonthDropdown
                    dateFormatCalendar="MMMM yyyy"
                  />
                  <Calendar className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 h-5 w-5 text-blue-400" />
                </div>
                <div className="mt-1 text-gray-500 text-xs">Between {getFormattedDateRange()}</div>
              </div>

              <div>
                <label htmlFor={`period-${index}-salary`} className="form-label text-gray-800">
                  Monthly Salary (Rs.)
                </label>
                <input
                  id={`period-${index}-salary`}
                  type="number"
                  value={period.salary}
                  onChange={(e) => updatePeriod(index, 'salary', e.target.value)}
                  placeholder="Enter salary"
                  className="form-input"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={addPeriod}
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-200 border-dashed px-4 py-2.5 font-semibold text-emerald-700 transition-colors hover:border-emerald-400 hover:bg-emerald-50"
          >
            <PlusCircle className="h-5 w-5" />
            Add Another Period
          </button>

          <button
            type="button"
            onClick={handleCalculate}
            className="btn-calculate sm:w-auto"
            disabled={periods.some((p) => !(p.startDate && p.endDate && p.salary))}
          >
            Calculate Total Tax
          </button>
        </div>

        {result && (
          <div className="animate-fade-up space-y-8">
            <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 sm:p-8">
              <h3 className="mb-5 font-bold text-gray-900 text-lg">Tax Breakdown by Fiscal Year</h3>

              <div className="space-y-3">
                {result.breakdown.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 rounded-xl border border-emerald-100/60 bg-white/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-base text-gray-900">{item.period}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        <span className="text-gray-500 text-sm">
                          Gross: Rs. {Math.round(item.salary).toLocaleString()}
                        </span>
                        <span className="font-medium text-emerald-600 text-sm">
                          Net: Rs. {Math.round(item.netIncome).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <span className="whitespace-nowrap font-semibold text-base text-red-600">
                      Tax: Rs. {Math.round(item.tax).toLocaleString()}
                    </span>
                  </div>
                ))}

                <div className="mt-2 flex items-center justify-between border-emerald-200 border-t pt-4">
                  <span className="font-semibold text-gray-900 text-lg">Total Tax</span>
                  <span className="font-semibold text-emerald-700 text-xl sm:text-2xl">
                    Rs. {Math.round(result.totalTax).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveChart('comparison')}
                className={`chip ${activeChart === 'comparison' ? 'chip-active' : 'chip-inactive'}`}
              >
                Income &amp; Tax
              </button>
              <button
                type="button"
                onClick={() => setActiveChart('taxRate')}
                className={`chip ${activeChart === 'taxRate' ? 'chip-active' : 'chip-inactive'}`}
              >
                Tax Rate
              </button>
              <button
                type="button"
                onClick={() => setActiveChart('distribution')}
                className={`chip ${activeChart === 'distribution' ? 'chip-active' : 'chip-inactive'}`}
              >
                Distribution
              </button>
              <button
                type="button"
                onClick={() => setActiveChart('monthlyBreakdown')}
                className={`chip ${activeChart === 'monthlyBreakdown' ? 'chip-active' : 'chip-inactive'}`}
              >
                Monthly Averages
              </button>
              <button
                type="button"
                onClick={() => setActiveChart('timeline')}
                className={`chip ${activeChart === 'timeline' ? 'chip-active' : 'chip-inactive'}`}
              >
                Timeline
              </button>
            </div>

            <div className="space-y-6">
              <MultiYearCharts
                activeChart={activeChart}
                isMobile={isMobile}
                comparisonData={getComparisonChartData()}
                taxRateData={getTaxRateChartData()}
                distributionData={getDistributionChartData()}
                monthlyBreakdownData={getMonthlyBreakdownData()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MultiYearCalculator;
