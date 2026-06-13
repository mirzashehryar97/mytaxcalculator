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

import { MULTI_YEAR_CHART_COLORS } from './colors';
import type { MonthlyBreakdownDatum } from './types';

interface MultiYearMonthlyBreakdownChartProps {
  data: MonthlyBreakdownDatum[];
  isMobile: boolean;
}

export default function MultiYearMonthlyBreakdownChart({
  data,
  isMobile,
}: MultiYearMonthlyBreakdownChartProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-6">
      <h4 className="mb-4 font-semibold text-base text-gray-800">
        Monthly Averages by Fiscal Year
      </h4>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: isMobile ? -15 : 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: isMobile ? 11 : 12 }} />
            <YAxis
              tickFormatter={(value) => formatChartCurrency(value)}
              tick={{ fontSize: isMobile ? 11 : 12 }}
              width={isMobile ? 45 : 60}
            />
            <Tooltip formatter={(value) => `Rs. ${Number(value).toLocaleString()}`} />
            <Legend />
            <Bar dataKey="Monthly Salary" fill={MULTI_YEAR_CHART_COLORS.salary} />
            <Bar dataKey="Monthly Net" fill={MULTI_YEAR_CHART_COLORS.netIncome} />
            <Bar dataKey="Monthly Tax" fill={MULTI_YEAR_CHART_COLORS.tax} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
