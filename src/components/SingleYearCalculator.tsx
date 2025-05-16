import React, { useEffect, useState } from 'react';
import { calculateTax } from '../utils/taxCalculator';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  Legend, CartesianGrid
} from 'recharts';
import { useCalculator } from '../context/CalculatorContext';

const fiscalYears = [
  "2024-2025",
  "2023-2024",
  "2022-2023",
  "2021-2022",
  "2020-2021",
  "2019-2020",
  "2018-2019",
  "2017-2018",
  "2016-2017",
  "2015-2016",
  "2014-2015"
];

// Chart color constants matching MultiYearCalculator
const COLORS = {
  tax: '#dc2626',
  netIncome: '#059669',
  salary: '#3b82f6',
  taxRate: '#8b5cf6',
  primary: ['#047857', '#059669', '#10b981', '#34d399', '#6ee7b7'],
  secondary: ['#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'],
  accent: ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']
};

function SingleYearCalculator() {
  const { singleYear, setSingleYear } = useCalculator();
  const { salary, selectedYear, result } = singleYear;
  // Add state for active chart selection
  const [activeChart, setActiveChart] = useState<string>('distribution');

  const calculateTaxResult = () => {
    const salaryNum = parseFloat(salary);
    if (!isNaN(salaryNum) && salaryNum > 0) {
      // The calculateTax function now handles both monthly salary and total salary calculations
      // For SingleYearCalculator, we're still using the default 12 months
      const tax = calculateTax(salaryNum, selectedYear);
      setSingleYear(prev => ({ ...prev, result: tax }));
    } else {
      // Clear the result if salary is invalid
      setSingleYear(prev => ({ ...prev, result: null }));
    }
  };

  // Recalculate tax whenever salary or fiscal year changes
  useEffect(() => {
    calculateTaxResult();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salary, selectedYear]);

  // Data for the distribution pie chart
  const getDistributionData = () => {
    if (!result) return [];
    return [
      { name: 'Tax', value: result.yearlyTax },
      { name: 'Take Home', value: result.yearlyIncomeAfterTax }
    ];
  };

  // Data for the monthly breakdown bar chart
  const getMonthlyBreakdownData = () => {
    if (!result) return [];
    return [
      { name: 'Gross', value: result.monthlyIncome },
      { name: 'Take Home', value: result.salaryAfterTax },
      { name: 'Tax', value: result.monthlyTax }
    ];
  };

  // We've removed tax bracket analysis and monthly comparison functions

  // Data for salary components
  const getSalaryComponentsData = () => {
    if (!result) return [];
    return [
      { name: 'Monthly', income: result.monthlyIncome, tax: result.monthlyTax, netIncome: result.salaryAfterTax },
      { name: 'Yearly', income: result.yearlyIncome, tax: result.yearlyTax, netIncome: result.yearlyIncomeAfterTax }
    ];
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
      case 'distribution':
        return (
          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-base font-medium text-gray-700 mb-4">Income Distribution</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getDistributionData()}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {getDistributionData().map((entry, index) => (
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
            <h4 className="text-base font-medium text-gray-700 mb-4">Monthly Breakdown</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getMonthlyBreakdownData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip formatter={(value) => `Rs. ${Number(value).toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="value" name="Amount" fill={COLORS.salary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      
      // We've removed tax brackets and monthly comparison chart implementations

      case 'salaryComponents':
        return (
          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-base font-medium text-gray-700 mb-4">Salary Components</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getSalaryComponentsData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip formatter={(value) => `Rs. ${Number(value).toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="income" name="Gross Income" fill={COLORS.salary} />
                  <Bar dataKey="tax" name="Tax" fill={COLORS.tax} />
                  <Bar dataKey="netIncome" name="Net Income" fill={COLORS.netIncome} />
                </BarChart>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label text-gray-800">
              Fiscal Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSingleYear(prev => ({ ...prev, selectedYear: e.target.value }))}
              className="form-select"
            >
              {fiscalYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label text-gray-800">
              Monthly Salary (Rs.)
            </label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSingleYear(prev => ({ ...prev, salary: e.target.value }))}
              placeholder="Enter your monthly salary"
              className="form-input"
              min="0"
              required
            />
          </div>
        </div>

        {result && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-emerald-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-emerald-800 mb-4">Monthly Breakdown</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Gross Income</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      Rs. {result.monthlyIncome.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Monthly Tax</p>
                    <p className="text-2xl font-semibold text-red-600">
                      Rs. {result.monthlyTax.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Monthly Net Income</p>
                    <p className="text-2xl font-semibold text-emerald-600">
                      Rs. {result.salaryAfterTax.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-emerald-800 mb-4">Annual Breakdown</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Yearly Gross Income</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      Rs. {result.yearlyIncome.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Yearly Tax</p>
                    <p className="text-2xl font-semibold text-red-600">
                      Rs. {result.yearlyTax.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Yearly Net Income</p>
                    <p className="text-2xl font-semibold text-emerald-600">
                      Rs. {result.yearlyIncomeAfterTax.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-divider" />

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Tax Rate: {result.taxRate.toFixed(2)}%</h3>
              
              <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="flex space-x-2 overflow-x-auto pb-2">
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
                    Monthly Breakdown
                  </button>
                  {/* Removed tax brackets and monthly comparison buttons */}
                  <button
                    onClick={() => setActiveChart('salaryComponents')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                      activeChart === 'salaryComponents' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Salary Components
                  </button>
                </div>
              </div>
              
              <div className="space-y-6">
                {renderActiveChart()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleYearCalculator;