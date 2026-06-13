import type { CalculatorContextType } from '@/context/CalculatorContext';

export type SingleYearTaxResult = NonNullable<CalculatorContextType['singleYear']['result']>;

export interface SingleYearChartsProps {
  result: SingleYearTaxResult;
  activeChart: string;
  isMobile: boolean;
}
