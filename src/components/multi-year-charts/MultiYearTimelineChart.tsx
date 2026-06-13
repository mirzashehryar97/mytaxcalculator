'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { formatChartCurrency } from '@/utils/formatChartCurrency';

import { MULTI_YEAR_CHART_COLORS } from './colors';
import type { ComparisonDatum } from './types';

interface MultiYearTimelineChartProps {
  data: ComparisonDatum[];
  isMobile: boolean;
}

export default function MultiYearTimelineChart({ data, isMobile }: MultiYearTimelineChartProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-6">
      <h4 className="mb-4 font-semibold text-base text-gray-800">
        Tax Timeline (Cumulative Analysis)
      </h4>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: isMobile ? -15 : 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: isMobile ? 11 : 12 }} />
            <YAxis
              tickFormatter={(value) => formatChartCurrency(value)}
              tick={{ fontSize: isMobile ? 11 : 12 }}
              width={isMobile ? 45 : 60}
            />
            <Tooltip formatter={(value) => `Rs. ${Number(value).toLocaleString()}`} />
            <Legend />
            <Area
              type="monotone"
              dataKey="Tax"
              stackId="1"
              stroke={MULTI_YEAR_CHART_COLORS.tax}
              fill={MULTI_YEAR_CHART_COLORS.tax}
            />
            <Area
              type="monotone"
              dataKey="Net Income"
              stackId="1"
              stroke={MULTI_YEAR_CHART_COLORS.netIncome}
              fill={MULTI_YEAR_CHART_COLORS.netIncome}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
