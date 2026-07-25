import type { BusinessFiscalYear } from '@/features/business-tax/types';

function finiteOrZero(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

export function formatPkr(value: number): string {
  return `Rs. ${Math.round(finiteOrZero(value)).toLocaleString('en-PK')}`;
}

/** Short currency for thresholds, e.g. 1,600,000 → "Rs. 1.6M". */
export function formatCompactPkr(value: number): string {
  const amount = finiteOrZero(value);
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    const trimmed = Number(millions.toFixed(2));
    return `Rs. ${trimmed}M`;
  }
  return formatPkr(amount);
}

export function formatPercent(value: number): string {
  return `${finiteOrZero(value).toLocaleString('en-PK', {
    maximumFractionDigits: 2,
  })}%`;
}

export function formatBusinessFiscalYear(fiscalYear: BusinessFiscalYear): string {
  const [startYear, endYear] = fiscalYear.split('-');
  return `${startYear}-${endYear.slice(-2)}`;
}
