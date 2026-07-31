'use client';

import { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';

import { BarChart2 } from 'lucide-react';

import { toSelectOptions } from '@/components/calculator/options';
import SelectInput from '@/components/calculator/SelectInput';

import { useCalculator } from '@/context/useCalculator';

import { trackAnalyticsEvent } from '@/lib/analytics';
import { calculateBudgetYearTax } from '@/lib/budgetComparison';

import SalaryInsightsLoading from '@/features/salary-tax/components/SalaryInsightsLoading';

import { calculateTax } from '../utils/taxCalculator';
import SingleYearBudgetSavingsNote from './SingleYearBudgetSavingsNote';

const SalaryInsights = dynamic(() => import('@/features/salary-tax/components/SalaryInsights'), {
  loading: () => <SalaryInsightsLoading />,
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

const fiscalYearOptions = toSelectOptions(fiscalYears);

function SingleYearCalculator() {
  const { singleYear, setSingleYear } = useCalculator();
  const { salary, selectedYear, result } = singleYear;
  const [showInsights, setShowInsights] = useState(false);
  const hasTrackedUse = useRef(false);

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
      setShowInsights(false);
    }
  };

  useEffect(() => {
    calculateTaxResult();
  }, [salary, selectedYear]);

  // Track a single-year "use" once per visit, the first time a valid result appears.
  useEffect(() => {
    if (result && !hasTrackedUse.current) {
      hasTrackedUse.current = true;
      trackAnalyticsEvent('calculator_use', { calculator: 'single' });
    }
  }, [result]);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SelectInput
            id="fiscal-year"
            label="Fiscal Year"
            onChange={(value) => setSingleYear((prev) => ({ ...prev, selectedYear: value }))}
            options={fiscalYearOptions}
            value={selectedYear}
          />

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
              <div className="stat-card min-w-0 border-emerald-100 bg-[#ecfdf5]">
                <h3 className="mb-5 font-bold text-emerald-700 text-sm uppercase tracking-wider">
                  Monthly Breakdown
                </h3>
                <div className="space-y-5">
                  <div>
                    <p className="text-gray-500 text-sm">Gross Income</p>
                    <p className="amount-wrap font-semibold text-2xl text-gray-900 tabular-nums">
                      Rs. {result.monthlyIncome.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Tax</p>
                    <p className="amount-wrap font-semibold text-2xl text-red-600 tabular-nums">
                      Rs. {result.monthlyTax.toLocaleString()}
                    </p>
                    {!!result.surcharge && (
                      <p className="amount-wrap mt-1 text-gray-500 text-xs tabular-nums">
                        Includes Rs. {Math.round(result.surcharge / 12).toLocaleString()} monthly
                        surcharge
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Net Income</p>
                    <p className="amount-wrap font-semibold text-2xl text-emerald-600 tabular-nums">
                      Rs. {result.salaryAfterTax.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="stat-card min-w-0 border-emerald-100 bg-[#ecfdf5]">
                <h3 className="mb-5 font-bold text-emerald-700 text-sm uppercase tracking-wider">
                  Annual Breakdown
                </h3>
                <div className="space-y-5">
                  <div>
                    <p className="text-gray-500 text-sm">Gross Income</p>
                    <p className="amount-wrap font-semibold text-2xl text-gray-900 tabular-nums">
                      Rs. {result.yearlyIncome.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Tax</p>
                    <p className="amount-wrap font-semibold text-2xl text-red-600 tabular-nums">
                      Rs. {result.yearlyTax.toLocaleString()}
                    </p>
                    {!!result.surcharge && (
                      <p className="amount-wrap mt-1 text-gray-500 text-xs tabular-nums">
                        Includes Rs. {result.surcharge.toLocaleString()} surcharge
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Net Income</p>
                    <p className="amount-wrap font-semibold text-2xl text-emerald-600 tabular-nums">
                      Rs. {result.yearlyIncomeAfterTax.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <SingleYearBudgetSavingsNote
              key={selectedYear}
              monthlySalary={result.monthlyIncome}
              selectedYear={selectedYear}
            />

            <div className="section-divider" />

            {showInsights ? (
              <SalaryInsights
                onHide={() => setShowInsights(false)}
                result={result}
                selectedYear={selectedYear}
              />
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-500 text-sm">Effective Tax Rate</span>
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-800 text-lg">
                    {result.taxRate.toFixed(2)}%
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    trackAnalyticsEvent('show_insights_click', {
                      calculator: 'salary_tax',
                      page_path: '/',
                    });
                    setShowInsights(true);
                  }}
                  className="flex min-h-11 items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-600/20"
                >
                  <BarChart2 aria-hidden className="h-5 w-5" />
                  <span>Show insights</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleYearCalculator;
