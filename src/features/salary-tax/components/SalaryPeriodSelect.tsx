'use client';

import SelectInput from '@/components/calculator/SelectInput';

import { SALARY_INSIGHT_PERIOD_OPTIONS } from '@/features/salary-tax/lib/insightsContent';
import type { SalaryInsightPeriod } from '@/features/salary-tax/types';

interface SalaryPeriodSelectProps {
  id: string;
  label: string;
  onChange: (period: SalaryInsightPeriod) => void;
  value: SalaryInsightPeriod;
}

export default function SalaryPeriodSelect({
  id,
  label,
  onChange,
  value,
}: SalaryPeriodSelectProps) {
  return (
    <SelectInput
      ariaLabel={label}
      className="w-full sm:w-40"
      hideLabel
      id={id}
      label={label}
      onChange={onChange}
      options={SALARY_INSIGHT_PERIOD_OPTIONS}
      size="sm"
      value={value}
    />
  );
}
