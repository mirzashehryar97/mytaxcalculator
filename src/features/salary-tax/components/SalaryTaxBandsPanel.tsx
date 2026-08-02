import ActiveTaxBandCard from '@/features/salary-tax/components/ActiveTaxBandCard';
import ProgressiveTaxExplainer from '@/features/salary-tax/components/ProgressiveTaxExplainer';
import SalaryPeriodSelect from '@/features/salary-tax/components/SalaryPeriodSelect';
import TaxBandContributionChart from '@/features/salary-tax/components/TaxBandContributionChart';
import { formatCompactPkr, getTaxBandInsights } from '@/features/salary-tax/lib/insights';
import type { SalaryInsightPeriod, SalaryTaxResult } from '@/features/salary-tax/types';

interface SalaryTaxBandsPanelProps {
  onPeriodChange: (period: SalaryInsightPeriod) => void;
  period: SalaryInsightPeriod;
  result: SalaryTaxResult;
  selectedYear: string;
}

export default function SalaryTaxBandsPanel({
  onPeriodChange,
  period,
  result,
  selectedYear,
}: SalaryTaxBandsPanelProps) {
  const insights = getTaxBandInsights(result, selectedYear, period);

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-3 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h4 className="font-bold text-gray-900 text-lg">How your annual income is taxed</h4>
          <p className="mt-0.5 text-gray-500 text-sm">
            {insights.fiscalYearLabel} progressive salary tax on{' '}
            {formatCompactPkr(insights.annualIncome)}
          </p>
        </div>
        <SalaryPeriodSelect
          id="salary-tax-bands-period"
          label="Tax band display period"
          onChange={onPeriodChange}
          value={period}
        />
      </div>

      <div className="mt-5 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <TaxBandContributionChart insights={insights} />
        <ActiveTaxBandCard insights={insights} />
      </div>

      <div className="mt-5">
        <ProgressiveTaxExplainer />
      </div>
    </div>
  );
}
