'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { SalaryInsightPeriod } from '@/features/salary-tax/types';

export default function useSalaryPeriodSelect(onChange: (period: SalaryInsightPeriod) => void) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  const selectPeriod = useCallback(
    (period: SalaryInsightPeriod) => {
      onChange(period);
      setIsOpen(false);
    },
    [onChange],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) close();
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [close, isOpen]);

  return {
    containerRef,
    isOpen,
    selectPeriod,
    toggle: () => setIsOpen((open) => !open),
  };
}
