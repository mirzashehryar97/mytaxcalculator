'use client';

import { useContext } from 'react';

import { CalculatorContext } from './CalculatorContext';

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}
