export interface ComparisonDatum {
  name: string;
  Tax: number;
  'Net Income': number;
  'Gross Salary': number;
}

export interface TaxRateDatum {
  name: string;
  'Tax Rate (%)': number;
  'Months Worked': number;
}

export interface DistributionDatum {
  name: string;
  value: number;
}

export interface MonthlyBreakdownDatum {
  name: string;
  'Monthly Salary': number;
  'Monthly Tax': number;
  'Monthly Net': number;
}

export interface MultiYearChartsProps {
  activeChart: string;
  isMobile: boolean;
  comparisonData: ComparisonDatum[];
  taxRateData: TaxRateDatum[];
  distributionData: DistributionDatum[];
  monthlyBreakdownData: MonthlyBreakdownDatum[];
}
