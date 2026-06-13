'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { formatChartCurrency } from '@/utils/formatChartCurrency';

import { SINGLE_YEAR_CHART_COLORS } from './colors';
import type { SingleYearTaxResult } from './types';

interface SingleYearSalaryComponentsChartProps {
  result: SingleYearTaxResult;
  isMobile: boolean;
}

export default function SingleYearSalaryComponentsChart({
  result,
  isMobile,
}: SingleYearSalaryComponentsChartProps) {
  const salaryComponentsData = [
    {
      name: 'Monthly',
      income: result.monthlyIncome,
      tax: result.monthlyTax,
      netIncome: result.salaryAfterTax,
    },
    {
      name: 'Yearly',
      income: result.yearlyIncome,
      tax: result.yearlyTax,
      netIncome: result.yearlyIncomeAfterTax,
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-6">
      <h4 className="mb-4 font-semibold text-base text-gray-800">Salary Components</h4>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={salaryComponentsData}
            margin={{ top: 5, right: 5, left: isMobile ? -15 : 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: isMobile ? 11 : 12 }} />
            <YAxis
              tickFormatter={formatChartCurrency}
              tick={{ fontSize: isMobile ? 11 : 12 }}
              width={isMobile ? 45 : 60}
            />
            <Tooltip formatter={(value) => `Rs. ${Number(value).toLocaleString()}`} />
            <Legend />
            <Bar dataKey="income" name="Gross Income" fill={SINGLE_YEAR_CHART_COLORS.salary} />
            <Bar dataKey="tax" name="Tax" fill={SINGLE_YEAR_CHART_COLORS.tax} />
            <Bar dataKey="netIncome" name="Net Income" fill={SINGLE_YEAR_CHART_COLORS.netIncome} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
