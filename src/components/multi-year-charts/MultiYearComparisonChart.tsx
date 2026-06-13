'use client';

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { formatChartCurrency } from '@/utils/formatChartCurrency';

import { MULTI_YEAR_CHART_COLORS } from './colors';
import type { ComparisonDatum } from './types';

interface MultiYearComparisonChartProps {
  data: ComparisonDatum[];
  isMobile: boolean;
}

export default function MultiYearComparisonChart({
  data,
  isMobile,
}: MultiYearComparisonChartProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-6">
      <h4 className="mb-4 font-semibold text-base text-gray-800">
        Income & Tax Comparison by Fiscal Year
      </h4>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 5, right: 5, left: isMobile ? -10 : 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: isMobile ? 11 : 12 }} />
            <YAxis
              yAxisId="left"
              tickFormatter={(value) => formatChartCurrency(value)}
              tick={{ fontSize: isMobile ? 11 : 12 }}
              width={isMobile ? 40 : 60}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value) => formatChartCurrency(value)}
              tick={{ fontSize: isMobile ? 11 : 12 }}
              width={isMobile ? 40 : 60}
            />
            <Tooltip formatter={(value) => `Rs. ${Number(value).toLocaleString()}`} />
            <Legend />
            <Bar yAxisId="left" dataKey="Gross Salary" fill={MULTI_YEAR_CHART_COLORS.salary} />
            <Bar yAxisId="left" dataKey="Net Income" fill={MULTI_YEAR_CHART_COLORS.netIncome} />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Tax"
              stroke={MULTI_YEAR_CHART_COLORS.tax}
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
