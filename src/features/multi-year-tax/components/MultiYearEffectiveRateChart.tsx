'use client';

import {
  Area,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { MULTI_YEAR_CHART_COLORS } from '@/features/multi-year-tax/lib/chartColors';
import { formatPercent } from '@/features/multi-year-tax/lib/formatting';
import {
  getEffectiveRateAxisMax,
  getEffectiveRateChartData,
  getOverallRateLabel,
} from '@/features/multi-year-tax/lib/presentation';
import type { MultiYearResult } from '@/features/multi-year-tax/types';

interface MultiYearEffectiveRateChartProps {
  result: MultiYearResult;
}

const AXIS_TICK = { fill: MULTI_YEAR_CHART_COLORS.axis, fontSize: 12 };

/** Effective rate per fiscal year, against the overall rate for the whole span. */
export default function MultiYearEffectiveRateChart({ result }: MultiYearEffectiveRateChartProps) {
  return (
    <figure>
      <div className="h-72 w-full sm:h-80">
        <ResponsiveContainer height="100%" width="100%">
          <ComposedChart
            data={getEffectiveRateChartData(result)}
            margin={{ top: 28, right: 12, bottom: 0, left: 0 }}
          >
            <CartesianGrid
              stroke={MULTI_YEAR_CHART_COLORS.grid}
              strokeDasharray="4 4"
              vertical={false}
            />
            <XAxis
              axisLine={{ stroke: MULTI_YEAR_CHART_COLORS.grid }}
              dataKey="label"
              padding={{ left: 28, right: 28 }}
              tick={AXIS_TICK}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              domain={[0, getEffectiveRateAxisMax(result)]}
              tick={AXIS_TICK}
              tickFormatter={(value) => `${value}%`}
              tickLine={false}
              width={44}
            />
            <Tooltip formatter={(value) => formatPercent(Number(value))} />
            <Area
              dataKey="rate"
              fill={MULTI_YEAR_CHART_COLORS.rateArea}
              fillOpacity={0.45}
              stroke="none"
              type="linear"
            />
            <ReferenceLine
              stroke={MULTI_YEAR_CHART_COLORS.reference}
              strokeDasharray="6 6"
              y={Number(result.effectiveRate.toFixed(2))}
            />
            <Line
              activeDot={{ r: 7 }}
              dataKey="rate"
              dot={{ fill: MULTI_YEAR_CHART_COLORS.rateLine, r: 5, strokeWidth: 0 }}
              name="Effective rate"
              stroke={MULTI_YEAR_CHART_COLORS.rateLine}
              strokeWidth={2.5}
              type="linear"
            >
              <LabelList
                dataKey="rate"
                fill={MULTI_YEAR_CHART_COLORS.rateLine}
                fontSize={12}
                fontWeight={700}
                formatter={(value: number) => formatPercent(value)}
                offset={12}
                position="top"
              />
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="mt-2 flex items-center justify-center gap-2 text-gray-600 text-xs">
        <span aria-hidden="true" className="w-6 border-gray-400 border-t-2 border-dashed" />
        {getOverallRateLabel(result.effectiveRate)}
      </figcaption>
    </figure>
  );
}
