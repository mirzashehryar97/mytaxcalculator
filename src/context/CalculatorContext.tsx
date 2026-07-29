import { createContext, type Dispatch, type SetStateAction } from 'react';

import type { MultiYearState } from '@/features/multi-year-tax/types';

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
    baseTax?: number;
    surcharge?: number;
  } | null;
}

export interface CalculatorContextType {
  singleYear: SingleYearState;
  setSingleYear: Dispatch<SetStateAction<SingleYearState>>;
  multiYear: MultiYearState;
  setMultiYear: Dispatch<SetStateAction<MultiYearState>>;
}

export const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);
