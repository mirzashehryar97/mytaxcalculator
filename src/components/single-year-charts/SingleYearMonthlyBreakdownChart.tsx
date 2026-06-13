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

interface SingleYearMonthlyBreakdownChartProps {
  result: SingleYearTaxResult;
  isMobile: boolean;
}

export default function SingleYearMonthlyBreakdownChart({
  result,
  isMobile,
}: SingleYearMonthlyBreakdownChartProps) {
  const monthlyBreakdownData = [
    { name: 'Gross', value: result.monthlyIncome },
    { name: 'Take Home', value: result.salaryAfterTax },
    { name: 'Tax', value: result.monthlyTax },
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-6">
      <h4 className="mb-4 font-semibold text-base text-gray-800">Monthly Breakdown</h4>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyBreakdownData}
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
            <Bar dataKey="value" name="Amount" fill={SINGLE_YEAR_CHART_COLORS.salary} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
