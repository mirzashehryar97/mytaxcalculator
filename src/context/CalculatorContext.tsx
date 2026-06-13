import { createContext, type Dispatch, type SetStateAction } from 'react';

export interface SingleYearState {
  salary: string;
  selectedYear: string;
  result: {
    monthlyIncome: number;
    monthlyTax: number;
    salaryAfterTax: number;
    yearlyIncome: number;
    yearlyTax: number;
    yearlyIncomeAfterTax: number;
    taxRate: number;
  } | null;
}

export interface SalaryPeriod {
  startDate: string;
  endDate: string;
  salary: string;
}

export interface BreakdownItem {
  period: string;
  tax: number;
  salary: number;
  netIncome: number;
  fiscalYear: string;
  months: number;
  taxRate: number;
}

export interface MultiYearResult {
  totalTax: number;
  breakdown: BreakdownItem[];
}

export interface MultiYearState {
  periods: SalaryPeriod[];
  result: MultiYearResult | null;
}

export interface CalculatorContextType {
  singleYear: SingleYearState;
  setSingleYear: Dispatch<SetStateAction<SingleYearState>>;
  multiYear: MultiYearState;
  setMultiYear: Dispatch<SetStateAction<MultiYearState>>;
}

export const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);
