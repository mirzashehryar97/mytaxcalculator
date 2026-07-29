import FiscalComparisonSummary from '@/features/salary-tax/components/FiscalComparisonSummary';
import FiscalYearComparisonChart from '@/features/salary-tax/components/FiscalYearComparisonChart';
import SalaryAllocationBar from '@/features/salary-tax/components/SalaryAllocationBar';
import SalaryPeriodSelect from '@/features/salary-tax/components/SalaryPeriodSelect';
import {
  formatCompactPkr,
  getActiveTaxBand,
  getFiscalComparisonPeriodAmount,
  getFiscalComparisonRows,
  getFiscalComparisonSummary,
  getSalaryAllocation,
} from '@/features/salary-tax/lib/insights';
import { SALARY_INSIGHT_PERIOD_COPY } from '@/features/salary-tax/lib/insightsContent';
import type { SalaryInsightPeriod, SalaryTaxResult } from '@/features/salary-tax/types';

interface SalaryFiscalComparisonPanelProps {
  onPeriodChange: (period: SalaryInsightPeriod) => void;
  period: SalaryInsightPeriod;
  result: SalaryTaxResult;
  selectedYear: string;
}

export default function SalaryFiscalComparisonPanel({
  onPeriodChange,
  period,
  result,
  selectedYear,
}: SalaryFiscalComparisonPanelProps) {
  const rows = getFiscalComparisonRows(result.monthlyIncome, selectedYear);
  const summary = getFiscalComparisonSummary(rows, selectedYear);
  const activeBand = getActiveTaxBand(selectedYear, result.yearlyIncome);
  const allocation = getSalaryAllocation(result);
  const periodCopy = SALARY_INSIGHT_PERIOD_COPY[period];
  const grossIncome = getFiscalComparisonPeriodAmount(result.yearlyIncome, period);

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-3 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h4 className="font-bold text-gray-900 text-lg">Same salary, different tax years</h4>
          <p className="mt-0.5 text-gray-500 text-sm">
            {periodCopy.label} outcome on the same {formatCompactPkr(grossIncome)} gross salary
          </p>
        </div>
        <SalaryPeriodSelect
          id="salary-fiscal-comparison-period"
          label="Fiscal comparison period"
          onChange={onPeriodChange}
          value={period}
        />
      </div>

      <div className="mt-5 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <FiscalYearComparisonChart period={period} rows={rows} />
        <FiscalComparisonSummary
          activeBandLabel={activeBand.label}
          marginalRate={activeBand.rate}
          period={period}
          result={result}
          summary={summary}
        />
      </div>

      <div className="mt-5">
        <SalaryAllocationBar annualIncome={result.yearlyIncome} {...allocation} />
      </div>
    </div>
  );
}
