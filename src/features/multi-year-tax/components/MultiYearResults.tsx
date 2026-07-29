'use client';

import MultiYearBreakdown from '@/features/multi-year-tax/components/MultiYearBreakdown';
import MultiYearChartPanel from '@/features/multi-year-tax/components/MultiYearChartPanel';
import MultiYearSummaryCard from '@/features/multi-year-tax/components/MultiYearSummaryCard';
import type { MultiYearResult } from '@/features/multi-year-tax/types';

interface MultiYearResultsProps {
  result: MultiYearResult;
}

export default function MultiYearResults({ result }: MultiYearResultsProps) {
  return (
    <div className="animate-fade-up space-y-4 sm:space-y-5">
      <MultiYearSummaryCard result={result} />
      <MultiYearBreakdown result={result} />
      <MultiYearChartPanel result={result} />
    </div>
  );
}
