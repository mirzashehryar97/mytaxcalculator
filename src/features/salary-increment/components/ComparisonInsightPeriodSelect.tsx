'use client';

import SelectInput from '@/components/calculator/SelectInput';

import { SALARY_COMPARISON_INSIGHT_PERIOD_OPTIONS } from '@/features/salary-increment/lib/content';
import type { SalaryComparisonInsightPeriod } from '@/features/salary-increment/types';

interface ComparisonInsightPeriodSelectProps {
  id: string;
  onChange: (period: SalaryComparisonInsightPeriod) => void;
  value: SalaryComparisonInsightPeriod;
}

export default function ComparisonInsightPeriodSelect({
  id,
  onChange,
  value,
}: ComparisonInsightPeriodSelectProps) {
  return (
    <SelectInput
      ariaLabel="Insight display period"
      className="w-full sm:w-40"
      hideLabel
      id={id}
      label="Display period"
      onChange={onChange}
      options={SALARY_COMPARISON_INSIGHT_PERIOD_OPTIONS}
      size="sm"
      value={value}
    />
  );
}
