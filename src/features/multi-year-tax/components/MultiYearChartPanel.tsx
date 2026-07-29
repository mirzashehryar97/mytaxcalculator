'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

import MultiYearChartLoading from '@/features/multi-year-tax/components/MultiYearChartLoading';
import MultiYearChartTabs from '@/features/multi-year-tax/components/MultiYearChartTabs';
import MultiYearComparisonBars from '@/features/multi-year-tax/components/MultiYearComparisonBars';
import MultiYearPeakRateNote from '@/features/multi-year-tax/components/MultiYearPeakRateNote';
import useIsCompactViewport from '@/features/multi-year-tax/hooks/useIsCompactViewport';
import { MULTI_YEAR_CHART_COPY } from '@/features/multi-year-tax/lib/content';
import { getPeakEffectiveRate } from '@/features/multi-year-tax/lib/presentation';
import { RESULT_PANEL_CLASS } from '@/features/multi-year-tax/lib/styles';
import type { MultiYearChartTab, MultiYearResult } from '@/features/multi-year-tax/types';

const MultiYearComparisonChart = dynamic(
  () => import('@/features/multi-year-tax/components/MultiYearComparisonChart'),
  { loading: () => <MultiYearChartLoading />, ssr: false },
);

const MultiYearEffectiveRateChart = dynamic(
  () => import('@/features/multi-year-tax/components/MultiYearEffectiveRateChart'),
  { loading: () => <MultiYearChartLoading />, ssr: false },
);

interface MultiYearChartPanelProps {
  result: MultiYearResult;
}

export default function MultiYearChartPanel({ result }: MultiYearChartPanelProps) {
  const [activeTab, setActiveTab] = useState<MultiYearChartTab>('comparison');
  const isCompact = useIsCompactViewport();
  const isComparison = activeTab === 'comparison';
  const peak = getPeakEffectiveRate(result);
  const copy = isComparison
    ? {
        title: MULTI_YEAR_CHART_COPY.comparison.title,
        description: isCompact
          ? MULTI_YEAR_CHART_COPY.comparison.descriptionMobile
          : MULTI_YEAR_CHART_COPY.comparison.descriptionDesktop,
      }
    : MULTI_YEAR_CHART_COPY.effectiveRate;

  return (
    <section className={RESULT_PANEL_CLASS}>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-6">
        <div className="space-y-3 lg:col-start-1 lg:row-start-1">
          <MultiYearChartTabs activeTab={activeTab} onSelect={setActiveTab} />
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{copy.title}</h3>
            <p className="mt-1 text-gray-500 text-sm">{copy.description}</p>
          </div>
        </div>

        <div
          aria-labelledby={`multi-year-chart-tab-${activeTab}`}
          className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1"
          id="multi-year-chart-panel"
          role="tabpanel"
        >
          {isComparison ? (
            <>
              {isCompact ? <MultiYearComparisonBars result={result} /> : null}
              {isCompact ? null : <MultiYearComparisonChart result={result} />}
            </>
          ) : (
            <MultiYearEffectiveRateChart result={result} />
          )}
        </div>

        {!isComparison && peak ? (
          <div className="lg:col-start-1 lg:row-start-2">
            <MultiYearPeakRateNote peak={peak} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
