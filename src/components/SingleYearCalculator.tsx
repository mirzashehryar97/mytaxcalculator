import React from 'react';
import { calculateTax } from '../utils/taxCalculator';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
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

const COLORS = ['#047857', '#059669', '#10b981', '#34d399', '#6ee7b7'];

function SingleYearCalculator() {
  const { singleYear, setSingleYear } = useCalculator();
  const { salary, selectedYear, result } = singleYear;

  const handleCalculate = () => {
    const salaryNum = parseFloat(salary);
    if (!isNaN(salaryNum) && salaryNum > 0) {
      // The calculateTax function now handles both monthly salary and total salary calculations
      // For SingleYearCalculator, we're still using the default 12 months
      const tax = calculateTax(salaryNum, selectedYear);
      setSingleYear(prev => ({ ...prev, result: tax }));
    }
  };

  const getMonthlyComparison = () => {
    if (!result) return [];
    return [
      { name: 'Tax', value: result.monthlyTax },
      { name: 'Take Home', value: result.salaryAfterTax }
    ];
  };

  const getYearlyComparison = () => {
    if (!result) return [];
    return [
      { name: 'Monthly Income', value: result.monthlyIncome },
      { name: 'Monthly Tax', value: result.monthlyTax },
      { name: 'Monthly Take Home', value: result.salaryAfterTax }
    ];
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

        <button
          onClick={handleCalculate}
          className="btn-calculate"
          disabled={!salary || parseFloat(salary) <= 0}
        >
          Calculate Tax
        </button>

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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-4 rounded-xl shadow">
                  <h4 className="text-base font-medium text-gray-700 mb-4">Monthly Distribution</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getMonthlyComparison()}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#047857"
                        >
                          {getMonthlyComparison().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                  <h4 className="text-base font-medium text-gray-700 mb-4">Monthly Breakdown</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getYearlyComparison()}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#047857" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleYearCalculator;