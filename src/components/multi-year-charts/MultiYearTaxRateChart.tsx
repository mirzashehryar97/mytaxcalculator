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

import { MULTI_YEAR_CHART_COLORS } from './colors';
import type { TaxRateDatum } from './types';

interface MultiYearTaxRateChartProps {
  data: TaxRateDatum[];
  isMobile: boolean;
}

export default function MultiYearTaxRateChart({ data, isMobile }: MultiYearTaxRateChartProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-6">
      <h4 className="mb-4 font-semibold text-base text-gray-800">
        Tax Rate Analysis by Fiscal Year
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
              domain={[0, 'dataMax + 2']}
              tickFormatter={(value) => `${value}%`}
              tick={{ fontSize: isMobile ? 11 : 12 }}
              width={isMobile ? 35 : 60}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 12]}
              tickFormatter={(value) => `${value} mo`}
              tick={{ fontSize: isMobile ? 11 : 12 }}
              width={isMobile ? 38 : 60}
            />
            <Tooltip />
            <Legend />
            <Bar yAxisId="right" dataKey="Months Worked" fill={MULTI_YEAR_CHART_COLORS.salary} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Tax Rate (%)"
              stroke={MULTI_YEAR_CHART_COLORS.taxRate}
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
