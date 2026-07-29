'use client';

import SalaryAllocationBar from '@/features/salary-tax/components/SalaryAllocationBar';
import SalaryAtGlanceCard from '@/features/salary-tax/components/SalaryAtGlanceCard';
import SalaryCashFlowChart from '@/features/salary-tax/components/SalaryCashFlowChart';
import SalaryPeriodSelect from '@/features/salary-tax/components/SalaryPeriodSelect';
import { getActiveTaxBand, getSalaryPeriodBreakdown } from '@/features/salary-tax/lib/insights';
import type { SalaryInsightPeriod, SalaryTaxResult } from '@/features/salary-tax/types';

interface SalaryOverviewPanelProps {
  onPeriodChange: (period: SalaryInsightPeriod) => void;
  period: SalaryInsightPeriod;
  result: SalaryTaxResult;
  selectedYear: string;
}

export default function SalaryOverviewPanel({
  onPeriodChange,
  period,
  result,
  selectedYear,
}: SalaryOverviewPanelProps) {
  const breakdown = getSalaryPeriodBreakdown(result, period);
  const activeBand = getActiveTaxBand(selectedYear, result.yearlyIncome);

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-3 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h4 className="font-bold text-gray-900 text-lg">Your salary in one view</h4>
          <p className="mt-0.5 text-gray-500 text-sm">
            A clear view of what you earn, pay and keep
          </p>
        </div>
        <SalaryPeriodSelect
          id="salary-insights-period"
          label="Salary insight period"
          value={period}
          onChange={onPeriodChange}
        />
      </div>

      <div className="mt-5 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <SalaryCashFlowChart breakdown={breakdown} />
        <SalaryAtGlanceCard
          annualTax={result.yearlyTax}
          breakdown={breakdown}
          marginalRate={activeBand.rate}
        />
      </div>

      <div className="mt-5">
        <SalaryAllocationBar
          annualIncome={result.yearlyIncome}
          takeHomePercent={breakdown.takeHomePercent}
          taxPercent={breakdown.taxPercent}
        />
      </div>
    </div>
  );
}
