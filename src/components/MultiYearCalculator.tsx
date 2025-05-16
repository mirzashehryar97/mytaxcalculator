import React, { useState } from 'react';
import { calculateTaxForTotalAmount } from '../utils/taxCalculator';
import { PlusCircle, MinusCircle, Calendar, AlertTriangle, Info } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend, CartesianGrid, 
  Area, AreaChart, ComposedChart, Scatter
} from 'recharts';
import { useCalculator } from '../context/CalculatorContext';
import { taxSlabs } from '../utils/taxCalculator';

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

// Chart color constants
const COLORS = {
  tax: '#dc2626',
  netIncome: '#059669',
  salary: '#3b82f6',
  taxRate: '#8b5cf6',
  primary: ['#047857', '#059669', '#10b981', '#34d399', '#6ee7b7'],
  secondary: ['#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'],
  accent: ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']
};

function MultiYearCalculator() {
  const { multiYear, setMultiYear } = useCalculator();
  const { periods, result } = multiYear;
  const [validationError, setValidationError] = useState<string | null>(null);
  // Add state for active chart selection
  const [activeChart, setActiveChart] = useState<string>('comparison');

  const addPeriod = () => {
    setMultiYear(prev => ({
      ...prev,
      periods: [...prev.periods, { startDate: '', endDate: '', salary: '' }]
    }));
  };

  const removePeriod = (index: number) => {
    setMultiYear(prev => ({
      ...prev,
      periods: prev.periods.filter((_, i) => i !== index)
    }));
    // Clear validation error when removing a period
    setValidationError(null);
  };

  const updatePeriod = (index: number, field: keyof typeof periods[0], value: string) => {
    setMultiYear(prev => ({
      ...prev,
      periods: prev.periods.map((period, i) =>
        i === index ? { ...period, [field]: value } : period
      )
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
    } else {
      // For end date, calculate proportion from beginning of month to the date
      return day / daysInMonth;
    }
  };

  // Calculate actual salary for a period including partial months
  const calculateActualSalary = (startDate: Date, endDate: Date, monthlySalary: number): number => {
    // If dates are in the same month and year
    if (startDate.getFullYear() === endDate.getFullYear() && 
        startDate.getMonth() === endDate.getMonth()) {
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
      (currentDate.getFullYear() < endDate.getFullYear()) || 
      (currentDate.getFullYear() === endDate.getFullYear() && currentDate.getMonth() < endDate.getMonth())
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

  // Check if two date ranges overlap
  const doRangesOverlap = (rangeA: DayRange, rangeB: DayRange): boolean => {
    return (
      (rangeA.startDate <= rangeB.endDate) && 
      (rangeA.endDate >= rangeB.startDate)
    );
  };

  // Check if a date is within available fiscal years
  const isDateInAvailableFiscalYears = (date: Date): boolean => {
    const availableFiscalYears = Object.keys(taxSlabs);
    
    // Get the earliest and latest fiscal years
    const sortedYears = [...availableFiscalYears].sort();
    const earliestYear = sortedYears[0];
    const latestYear = sortedYears[sortedYears.length - 1];
    
    // Parse the years from strings like "2015-2016"
    const [earliestStartYear] = earliestYear.split('-').map(Number);
    const [, latestEndYear] = latestYear.split('-').map(Number);
    
    // Create normalized date for comparison (strip time portion)
    const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    // Calculate the earliest fiscal year start date (July 1st of earliestStartYear)
    const earliestFiscalYearStart = new Date(earliestStartYear, 6, 1); // July 1st (0-indexed months)
    
    // Calculate the latest fiscal year end date (June 30th of latestEndYear)
    const latestFiscalYearEnd = new Date(latestEndYear, 5, 30); // June 30th (0-indexed months)
    
    // Check if the date is within the range of available fiscal years
    // Using >= for start date and <= for end date to include both boundary days
    return normalizedDate >= earliestFiscalYearStart && normalizedDate <= latestFiscalYearEnd;
  };

  // Get a formatted date range for error messages
  const getFormattedDateRange = (): string => {
    const availableFiscalYears = Object.keys(taxSlabs);
    
    // Get the earliest and latest fiscal years
    const sortedYears = [...availableFiscalYears].sort();
    const earliestYear = sortedYears[0];
    const latestYear = sortedYears[sortedYears.length - 1];
    
    // Parse the years from strings like "2015-2016"
    const [earliestStartYear] = earliestYear.split('-').map(Number);
    const [, latestEndYear] = latestYear.split('-').map(Number);
    
    return `July 1, ${earliestStartYear} to June 30, ${latestEndYear}`;
  };

  // Validate that no two periods overlap and all dates are within available fiscal years
  const validatePeriods = (): boolean => {
    // First convert string dates to Date objects for comparison
    const dateRanges: DayRange[] = [];
    
    for (const period of periods) {
      if (!period.startDate || !period.endDate || !period.salary) {
        continue; // Skip incomplete periods
      }
      
      const startDate = new Date(period.startDate);
      const endDate = new Date(period.endDate);
      
      if (startDate > endDate) {
        setValidationError("Start date cannot be after end date.");
        return false;
      }
      
      // Check if start date is within available fiscal years
      if (!isDateInAvailableFiscalYears(startDate)) {
        setValidationError(`The start date (${period.startDate}) is outside the range of available tax slabs. Please use dates within the range: ${getFormattedDateRange()}`);
        return false;
      }
      
      // Check if end date is within available fiscal years
      if (!isDateInAvailableFiscalYears(endDate)) {
        setValidationError(`The end date (${period.endDate}) is outside the range of available tax slabs. Please use dates within the range: ${getFormattedDateRange()}`);
        return false;
      }
      
      // Check for overlap with existing ranges
      for (const range of dateRanges) {
        if (doRangesOverlap({ startDate, endDate }, range)) {
          setValidationError("Periods cannot overlap. Please ensure no date is covered by multiple periods.");
          return false;
        }
      }
      
      dateRanges.push({ startDate, endDate });
    }
    
    return true;
  };

  const getMonthsInRange = (start: Date, end: Date): number => {
    // Calculate full months
    const fullMonths = (end.getFullYear() - start.getFullYear()) * 12 + 
                      (end.getMonth() - start.getMonth());
    
    // Calculate partial months as decimal
    const startDayProportion = start.getDate() === 1 ? 0 : (1 - getMonthProportion(start, true));
    const endDayProportion = end.getDate() === getDaysInMonth(end.getFullYear(), end.getMonth()) ? 0 : (1 - getMonthProportion(end, false));
    
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
      start: new Date(parseInt(startYear), 6, 1), // July 1st
      end: new Date(parseInt(startYear) + 1, 5, 30) // June 30th
    };
  };
  const splitPeriodByFiscalYear = (startDate: Date, endDate: Date, monthlySalary: number): FiscalYearBreakdown[] => {
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
        netIncome: 0 // We'll calculate this after combining all periods
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

    periods.forEach(period => {
      const salary = parseFloat(period.salary);
      if (isNaN(salary) || !period.startDate || !period.endDate) return;

      const startDate = new Date(period.startDate);
      const endDate = new Date(period.endDate);
      const breakdowns = splitPeriodByFiscalYear(startDate, endDate, salary);
      allBreakdowns.push(...breakdowns);
    });

    // First, group all periods by fiscal year
    const fiscalYearGroups = new Map<string, FiscalYearBreakdown[]>();
    allBreakdowns.forEach(breakdown => {
      const existing = fiscalYearGroups.get(breakdown.fiscalYear) || [];
      fiscalYearGroups.set(breakdown.fiscalYear, [...existing, breakdown]);
    });

    // Now process each fiscal year group
    const finalBreakdowns: FiscalYearBreakdown[] = [];
    fiscalYearGroups.forEach((breakdowns, fiscalYear) => {
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
        endDate: breakdowns[breakdowns.length - 1].endDate, // Use the last end date
        months: totalMonths,
        monthlySalary: averageMonthlySalary, // Average monthly salary across all periods
        totalSalary: totalSalary,
        tax: tax,
        netIncome: totalSalary - tax
      });
    });

    const totalTax = finalBreakdowns.reduce((sum, b) => sum + b.tax, 0);

    setMultiYear(prev => ({
      ...prev,
      result: {
        totalTax,
        breakdown: finalBreakdowns.map(b => ({
          period: `Fiscal Year ${b.fiscalYear} (${b.months.toFixed(2)} months)`,
          tax: b.tax,
          salary: b.totalSalary,
          netIncome: b.netIncome,
          fiscalYear: b.fiscalYear,  // Add fiscalYear for charts
          months: b.months,          // Add months for charts
          taxRate: (b.tax / b.totalSalary) * 100  // Add tax rate for visualization
        }))
      }
    }));
    
    // Set default chart view when calculation is done
    setActiveChart('comparison');
  };

  // Chart data preparation functions
  const getComparisonChartData = () => {
    if (!result) return [];
    return result.breakdown.map(item => ({
      name: `FY ${item.fiscalYear}`,
      Tax: Math.round(item.tax),
      'Net Income': Math.round(item.netIncome),
      'Gross Salary': Math.round(item.salary)
    }));
  };

  const getTaxRateChartData = () => {
    if (!result) return [];
    return result.breakdown.map(item => ({
      name: `FY ${item.fiscalYear}`,
      'Tax Rate (%)': parseFloat((item.tax / item.salary * 100).toFixed(2)),
      'Months Worked': parseFloat(item.months.toFixed(2))
    }));
  };

  const getDistributionChartData = () => {
    if (!result) return [];
    return [
      { name: 'Tax', value: Math.round(result.totalTax) },
      { name: 'Net Income', value: Math.round(result.breakdown.reduce((sum, item) => sum + item.netIncome, 0)) }
    ];
  };

  const getMonthlyBreakdownData = () => {
    if (!result) return [];
    return result.breakdown.map(item => ({
      name: `FY ${item.fiscalYear}`,
      'Monthly Salary': Math.round(item.salary / 12),
      'Monthly Tax': Math.round(item.tax / 12),
      'Monthly Net': Math.round(item.netIncome / 12)
    }));
  };

  // Format large numbers
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  // Render chart based on active selection
  const renderActiveChart = () => {
    switch (activeChart) {
      case 'comparison':
        return (
          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-base font-medium text-gray-700 mb-4">Income & Tax Comparison by Fiscal Year</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={getComparisonChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    yAxisId="left"
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <Tooltip formatter={(value) => `Rs. ${Number(value).toLocaleString()}`} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="Gross Salary" fill={COLORS.salary} />
                  <Bar yAxisId="left" dataKey="Net Income" fill={COLORS.netIncome} />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="Tax" 
                    stroke={COLORS.tax} 
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      
      case 'taxRate':
        return (
          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-base font-medium text-gray-700 mb-4">Tax Rate Analysis by Fiscal Year</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={getTaxRateChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    yAxisId="left"
                    domain={[0, 'dataMax + 2']}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    domain={[0, 12]}
                    tickFormatter={(value) => `${value} mo`}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="right" dataKey="Months Worked" fill={COLORS.salary} />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="Tax Rate (%)" 
                    stroke={COLORS.taxRate} 
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      
      case 'distribution':
        return (
          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-base font-medium text-gray-700 mb-4">Total Income Distribution</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getDistributionChartData()}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {getDistributionChartData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? COLORS.tax : COLORS.netIncome} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `Rs. ${Number(value).toLocaleString()}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      
      case 'monthlyBreakdown':
        return (
          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-base font-medium text-gray-700 mb-4">Monthly Averages by Fiscal Year</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getMonthlyBreakdownData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip formatter={(value) => `Rs. ${Number(value).toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="Monthly Salary" fill={COLORS.salary} />
                  <Bar dataKey="Monthly Net" fill={COLORS.netIncome} />
                  <Bar dataKey="Monthly Tax" fill={COLORS.tax} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      
      case 'timeline':
        return (
          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-base font-medium text-gray-700 mb-4">Tax Timeline (Cumulative Analysis)</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getComparisonChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip formatter={(value) => `Rs. ${Number(value).toLocaleString()}`} />
                  <Legend />
                  <Area type="monotone" dataKey="Tax" stackId="1" stroke={COLORS.tax} fill={COLORS.tax} />
                  <Area type="monotone" dataKey="Net Income" stackId="1" stroke={COLORS.netIncome} fill={COLORS.netIncome} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
        {validationError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>{validationError}</p>
          </div>
        )}
        
        <div className="bg-emerald-50 p-4 rounded-lg flex items-start">
          <Info className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-emerald-800">
            <p className="font-medium mb-1">Partial Month Calculation</p>
            <p>For periods that don't align with complete months, your salary is calculated proportionally based on the actual days worked.</p>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg flex items-start">
          <Calendar className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Available Fiscal Years</p>
            <p>This calculator supports tax calculations for periods between {getFormattedDateRange()}. Please ensure your dates fall within this range.</p>
          </div>
        </div>
      
        {periods.map((period, index) => (
          <div key={index} className="period-card space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-semibold text-gray-900">Period {index + 1}</h3>
              </div>
              {periods.length > 1 && (
                <button
                  onClick={() => removePeriod(index)}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  <MinusCircle className="h-6 w-6" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="form-label text-gray-800">
                  Start Date
                </label>
                <input
                  type="date"
                  value={period.startDate}
                  onChange={(e) => updatePeriod(index, 'startDate', e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label text-gray-800">
                  End Date
                </label>
                <input
                  type="date"
                  value={period.endDate}
                  onChange={(e) => updatePeriod(index, 'endDate', e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label text-gray-800">
                  Monthly Salary (Rs.)
                </label>
                <input
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

        <div className="flex justify-between items-center">
          <button
            onClick={addPeriod}
            className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Another Period
          </button>

          <button
            onClick={handleCalculate}
            className="btn-calculate md:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow transition-colors"
            disabled={periods.some(p => !p.startDate || !p.endDate || !p.salary)}
          >
            Calculate Total Tax
          </button>
        </div>

        {result && (
          <div className="space-y-8">
            <div className="bg-emerald-50/80 p-8 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Tax Breakdown by Fiscal Year</h3>
              
              <div className="space-y-6">
                {result.breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-4 border-b border-emerald-100">
                    <div className="space-y-1">
                      <p className="text-base font-medium text-gray-900">{item.period}</p>
                      <div className="flex space-x-4">
                        <span className="text-sm text-gray-500">
                          Gross: Rs. {Math.round(item.salary).toLocaleString()}
                        </span>
                        <span className="text-sm text-emerald-600">
                          Net: Rs. {Math.round(item.netIncome).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <span className="text-lg font-medium text-red-600">
                      Tax: Rs. {Math.round(item.tax).toLocaleString()}
                    </span>
                  </div>
                ))}
                
                <div className="pt-4 flex justify-between items-center">
                  <span className="text-xl font-semibold text-gray-900">Total Tax</span>
                  <span className="text-2xl font-bold text-gray-900">
                    Rs. {Math.round(result.totalTax).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setActiveChart('comparison')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                    activeChart === 'comparison' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Income & Tax
                </button>
                <button
                  onClick={() => setActiveChart('taxRate')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                    activeChart === 'taxRate' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Tax Rate
                </button>
                <button
                  onClick={() => setActiveChart('distribution')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                    activeChart === 'distribution' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Distribution
                </button>
                <button
                  onClick={() => setActiveChart('monthlyBreakdown')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                    activeChart === 'monthlyBreakdown' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Monthly Averages
                </button>
                <button
                  onClick={() => setActiveChart('timeline')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                    activeChart === 'timeline' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Timeline
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {renderActiveChart()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MultiYearCalculator;