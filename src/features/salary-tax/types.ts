import type { CalculatorContextType } from '@/context/CalculatorContext';

export type SalaryTaxResult = NonNullable<CalculatorContextType['singleYear']['result']>;

export type SalaryInsightTab = 'overview' | 'fiscalComparison' | 'taxBands';

export type SalaryInsightPeriod = 'monthly' | 'annual';

export interface SalaryInsightsProps {
  onHide: () => void;
  result: SalaryTaxResult;
  selectedYear: string;
}

export interface SalaryAllocation {
  takeHomePercent: number;
  taxPercent: number;
}

export interface SalaryPeriodBreakdown extends SalaryAllocation {
  gross: number;
  net: number;
  periodLabel: string;
  secondaryNet: number;
  secondaryPeriodLabel: string;
  tax: number;
}

export interface FiscalComparisonRow extends SalaryAllocation {
  fiscalYear: string;
  fiscalYearLabel: string;
  isSelected: boolean;
  tax: number;
  takeHome: number;
}

export type FiscalComparisonOutcome = 'save' | 'pay-more' | 'same';

export interface FiscalComparisonSummary {
  annualDifference: number;
  comparisonYearLabel: string;
  monthlyDifference: number;
  outcome: FiscalComparisonOutcome;
}

export interface TaxBandContribution {
  barPercent: number;
  contribution: number;
  isActive: boolean;
  label: string;
  rate: number;
}

export interface TaxBandInsights {
  activeBandLabel: string;
  activeRate: number;
  annualIncome: number;
  baseTax: number;
  effectiveRate: number;
  fiscalYearLabel: string;
  rows: TaxBandContribution[];
  surcharge: number;
  totalTax: number;
}
