'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import MultiYearChartLegend from '@/features/multi-year-tax/components/MultiYearChartLegend';
import { MULTI_YEAR_CHART_COLORS } from '@/features/multi-year-tax/lib/chartColors';
import { MULTI_YEAR_CHART_COPY } from '@/features/multi-year-tax/lib/content';
import {
  formatAxisAmount,
  formatCompactPkr,
  formatPkr,
} from '@/features/multi-year-tax/lib/formatting';
import { getComparisonChartData } from '@/features/multi-year-tax/lib/presentation';
import type { MultiYearResult } from '@/features/multi-year-tax/types';

interface MultiYearComparisonChartProps {
  result: MultiYearResult;
}

const AXIS_TICK = { fill: MULTI_YEAR_CHART_COLORS.axis, fontSize: 12 };

/** Wide year comparison: one stacked column per fiscal year, totalling gross. */
export default function MultiYearComparisonChart({ result }: MultiYearComparisonChartProps) {
  return (
    <figure>
      <div className="h-72 w-full sm:h-80">
        <ResponsiveContainer height="100%" width="100%">
          <BarChart
            data={getComparisonChartData(result)}
            margin={{ top: 28, right: 8, bottom: 0, left: 0 }}
          >
            <CartesianGrid
              stroke={MULTI_YEAR_CHART_COLORS.grid}
              strokeDasharray="4 4"
              vertical={false}
            />
            <XAxis
              axisLine={{ stroke: MULTI_YEAR_CHART_COLORS.grid }}
              dataKey="label"
              tick={AXIS_TICK}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={AXIS_TICK}
              tickFormatter={formatAxisAmount}
              tickLine={false}
              width={48}
            />
            <Tooltip
              cursor={{ fill: 'rgba(16, 185, 129, 0.06)' }}
              formatter={(value) => formatPkr(Number(value))}
            />
            <Bar
              dataKey="takeHome"
              fill={MULTI_YEAR_CHART_COLORS.takeHome}
              name={MULTI_YEAR_CHART_COPY.takeHomeLegend}
              stackId="allocation"
            />
            <Bar
              dataKey="tax"
              fill={MULTI_YEAR_CHART_COLORS.tax}
              name={MULTI_YEAR_CHART_COPY.taxLegend}
              radius={[4, 4, 0, 0]}
              stackId="allocation"
            >
              <LabelList
                dataKey="gross"
                fill={MULTI_YEAR_CHART_COLORS.label}
                fontSize={12}
                fontWeight={600}
                formatter={(value: number) => formatCompactPkr(value)}
                position="top"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <MultiYearChartLegend />
    </figure>
  );
}
