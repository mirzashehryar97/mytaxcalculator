'use client';

import { useCallback, useState } from 'react';

import { useCalculator } from '@/context/useCalculator';

import useMultiYearAnalytics from '@/features/multi-year-tax/hooks/useMultiYearAnalytics';
import { calcMultiYearTax } from '@/features/multi-year-tax/lib/calculation';
import {
  applyPeriodDateChange,
  arePeriodsComplete,
  createPeriod,
  getNextPeriodId,
} from '@/features/multi-year-tax/lib/input';
import { getMultiYearValidationError } from '@/features/multi-year-tax/lib/validation';
import type { DatePartName, PeriodDateName, SalaryPeriod } from '@/features/multi-year-tax/types';

/**
 * Owns the salary history: which period is being edited, every edit to it, and
 * the calculation. Periods live in the calculator context so switching between
 * the single-year and multi-year tabs doesn't throw the entries away.
 */
export default function useMultiYearTax() {
  const { multiYear, setMultiYear } = useCalculator();
  const { periods, result } = multiYear;
  const [validationError, setValidationError] = useState<string | null>(null);
  const [expandedPeriodId, setExpandedPeriodId] = useState<string | null>(periods[0]?.id ?? null);
  const trackCalculation = useMultiYearAnalytics();

  /** Any edit invalidates the totals on screen, so they're cleared until recalculated. */
  const editPeriods = useCallback(
    (update: (current: SalaryPeriod[]) => SalaryPeriod[]) => {
      setMultiYear((current) => ({ periods: update(current.periods), result: null }));
      setValidationError(null);
    },
    [setMultiYear],
  );

  const updateDatePart = useCallback(
    (periodId: string, field: PeriodDateName, part: DatePartName, value: string) => {
      editPeriods((current) =>
        current.map((period) =>
          period.id === periodId ? applyPeriodDateChange(period, field, part, value) : period,
        ),
      );
    },
    [editPeriods],
  );

  const updateSalary = useCallback(
    (periodId: string, salary: string) => {
      editPeriods((current) =>
        current.map((period) => (period.id === periodId ? { ...period, salary } : period)),
      );
    },
    [editPeriods],
  );

  const addPeriod = useCallback(() => {
    const nextId = getNextPeriodId(periods);
    editPeriods((current) => [...current, createPeriod(nextId)]);
    setExpandedPeriodId(nextId);
  }, [editPeriods, periods]);

  const removePeriod = useCallback(
    (periodId: string) => {
      editPeriods((current) => current.filter((period) => period.id !== periodId));
      setExpandedPeriodId((current) => (current === periodId ? null : current));
    },
    [editPeriods],
  );

  const togglePeriod = useCallback((periodId: string) => {
    setExpandedPeriodId((current) => (current === periodId ? null : periodId));
  }, []);

  const calculate = useCallback(() => {
    const error = getMultiYearValidationError(periods);

    if (error) {
      setValidationError(error);
      setMultiYear((current) => ({ ...current, result: null }));
      return;
    }

    const nextResult = calcMultiYearTax(periods);
    setValidationError(null);
    setMultiYear((current) => ({ ...current, result: nextResult }));

    if (nextResult) {
      trackCalculation(periods, nextResult);
      setExpandedPeriodId(null);
    }
  }, [periods, setMultiYear, trackCalculation]);

  return {
    addPeriod,
    calculate,
    canCalculate: arePeriodsComplete(periods),
    expandedPeriodId,
    periods,
    removePeriod,
    result,
    togglePeriod,
    updateDatePart,
    updateSalary,
    validationError,
  };
}
