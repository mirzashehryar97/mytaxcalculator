'use client';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { SINGLE_YEAR_CHART_COLORS } from './colors';
import type { SingleYearTaxResult } from './types';

interface SingleYearDistributionChartProps {
  result: SingleYearTaxResult;
  isMobile: boolean;
}

export default function SingleYearDistributionChart({
  result,
  isMobile,
}: SingleYearDistributionChartProps) {
  const distributionData = [
    { name: 'Tax', value: result.yearlyTax },
    { name: 'Take Home', value: result.yearlyIncomeAfterTax },
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-6">
      <h4 className="mb-4 font-semibold text-base text-gray-800">Income Distribution</h4>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={distributionData}
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
              {distributionData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index === 0 ? SINGLE_YEAR_CHART_COLORS.tax : SINGLE_YEAR_CHART_COLORS.netIncome
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
