'use client';

import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { BarChart2 } from 'lucide-react';

import { useCalculator } from '@/context/useCalculator';

import { calculateBudgetYearTax } from '@/lib/budgetComparison';

import { calculateTax } from '../utils/taxCalculator';
import SingleYearBudgetSavingsNote from './SingleYearBudgetSavingsNote';
import SingleYearChartsLoading from './SingleYearChartsLoading';

const SingleYearCharts = dynamic(() => import('./single-year-charts/SingleYearCharts'), {
  loading: () => <SingleYearChartsLoading />,
  ssr: false,
});

const fiscalYears = [
  '2026-2027',
  '2025-2026',
  '2024-2025',
  '2023-2024',
  '2022-2023',
  '2021-2022',
  '2020-2021',
  '2019-2020',
  '2018-2019',
  '2017-2018',
  '2016-2017',
  '2015-2016',
  '2014-2015',
];

function SingleYearCalculator() {
  const { singleYear, setSingleYear } = useCalculator();
  const { salary, selectedYear, result } = singleYear;
  const [activeChart, setActiveChart] = useState<string>('distribution');
  const [showCharts, setShowCharts] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculateTaxResult = () => {
    const salaryNum = Number.parseFloat(salary);
    if (!Number.isNaN(salaryNum) && salaryNum > 0) {
      const budgetTax = calculateBudgetYearTax(salaryNum, selectedYear);
      const baseTax = calculateTax(salaryNum, selectedYear);
      const tax = {
        monthlyIncome: salaryNum,
        monthlyTax: budgetTax.monthlyTax,
        salaryAfterTax: budgetTax.monthlyTakeHome,
        yearlyIncome: budgetTax.yearlyIncome,
        yearlyTax: budgetTax.yearlyTax,
        yearlyIncomeAfterTax: budgetTax.yearlyTakeHome,
        taxRate: budgetTax.effectiveRate,
        baseTax: baseTax.yearlyTax,
        surcharge: budgetTax.surcharge,
      };
      setSingleYear((prev) => ({ ...prev, result: tax }));
    } else {
      setSingleYear((prev) => ({ ...prev, result: null }));
      setShowCharts(false);
    }
  };

  useEffect(() => {
    calculateTaxResult();
  }, [salary, selectedYear]);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="fiscal-year" className="form-label text-gray-800">
              Fiscal Year
            </label>
            <select
              id="fiscal-year"
              value={selectedYear}
              onChange={(e) => setSingleYear((prev) => ({ ...prev, selectedYear: e.target.value }))}
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
            <label htmlFor="monthly-salary" className="form-label text-gray-800">
              Monthly Salary (Rs.)
            </label>
            <input
              id="monthly-salary"
              type="number"
              value={salary}
              onChange={(e) => setSingleYear((prev) => ({ ...prev, salary: e.target.value }))}
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
              placeholder="Enter your monthly salary"
              className="form-input no-spinner"
              min="0"
              required
            />
          </div>
        </div>

        {result && (
          <div className="animate-fade-up space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="stat-card border-emerald-100 bg-[#ecfdf5]">
                <h3 className="mb-5 font-bold text-emerald-700 text-sm uppercase tracking-wider">
                  Monthly Breakdown
                </h3>
                <div className="space-y-5">
                  <div>
                    <p className="text-gray-500 text-sm">Gross Income</p>
                    <p className="font-semibold text-2xl text-gray-900">
                      Rs. {result.monthlyIncome.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Tax</p>
                    <p className="font-semibold text-2xl text-red-600">
                      Rs. {result.monthlyTax.toLocaleString()}
                    </p>
                    {!!result.surcharge && (
                      <p className="mt-1 text-gray-500 text-xs">
                        Includes Rs. {Math.round(result.surcharge / 12).toLocaleString()} monthly
                        surcharge
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Net Income</p>
                    <p className="font-semibold text-2xl text-emerald-600">
                      Rs. {result.salaryAfterTax.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="stat-card border-emerald-100 bg-[#ecfdf5]">
                <h3 className="mb-5 font-bold text-emerald-700 text-sm uppercase tracking-wider">
                  Annual Breakdown
                </h3>
                <div className="space-y-5">
                  <div>
                    <p className="text-gray-500 text-sm">Gross Income</p>
                    <p className="font-semibold text-2xl text-gray-900">
                      Rs. {result.yearlyIncome.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Tax</p>
                    <p className="font-semibold text-2xl text-red-600">
                      Rs. {result.yearlyTax.toLocaleString()}
                    </p>
                    {!!result.surcharge && (
                      <p className="mt-1 text-gray-500 text-xs">
                        Includes Rs. {result.surcharge.toLocaleString()} surcharge
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Net Income</p>
                    <p className="font-semibold text-2xl text-emerald-600">
                      Rs. {result.yearlyIncomeAfterTax.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <SingleYearBudgetSavingsNote
              monthlySalary={result.monthlyIncome}
              selectedYear={selectedYear}
            />

            <div className="section-divider" />

            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-500 text-sm">Effective Tax Rate</span>
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-800 text-lg">
                    {result.taxRate.toFixed(2)}%
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCharts(!showCharts)}
                  className="flex items-center space-x-2 rounded-xl bg-emerald-600 px-4 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
                >
                  <BarChart2 className="h-5 w-5" />
                  <span>{showCharts ? 'Hide Charts' : 'Show Charts'}</span>
                </button>
              </div>

              {showCharts && (
                <div className="animate-fade-up space-y-6">
                  <div className="flex flex-wrap gap-2">
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
                      Monthly Breakdown
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveChart('salaryComponents')}
                      className={`chip ${activeChart === 'salaryComponents' ? 'chip-active' : 'chip-inactive'}`}
                    >
                      Salary Components
                    </button>
                  </div>

                  <SingleYearCharts result={result} activeChart={activeChart} isMobile={isMobile} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleYearCalculator;
