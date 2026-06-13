'use client';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { MULTI_YEAR_CHART_COLORS } from './colors';
import type { DistributionDatum } from './types';

interface MultiYearDistributionChartProps {
  data: DistributionDatum[];
  isMobile: boolean;
}

export default function MultiYearDistributionChart({
  data,
  isMobile,
}: MultiYearDistributionChartProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-6">
      <h4 className="mb-4 font-semibold text-base text-gray-800">Total Income Distribution</h4>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={isMobile ? '70%' : 130}
              labelLine={false}
              label={
                isMobile
                  ? ({ percent }) => `${(percent * 100).toFixed(0)}%`
                  : ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index === 0 ? MULTI_YEAR_CHART_COLORS.tax : MULTI_YEAR_CHART_COLORS.netIncome
                  }
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `Rs. ${Number(value).toLocaleString()}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
