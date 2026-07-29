import type { RentalFiscalYear } from '@/features/rental-income-tax/types';

function finiteOrZero(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

export function formatPkr(value: number): string {
  return `Rs. ${Math.round(finiteOrZero(value)).toLocaleString('en-PK')}`;
}

/** Short currency for thresholds, e.g. 2,000,000 → "Rs. 2M". */
export function formatCompactPkr(value: number): string {
  const amount = finiteOrZero(value);
  if (amount >= 1_000_000) {
    const trimmed = Number((amount / 1_000_000).toFixed(2));
    return `Rs. ${trimmed}M`;
  }
  return formatPkr(amount);
}

export function formatPercent(value: number): string {
  return `${finiteOrZero(value).toLocaleString('en-PK', {
    maximumFractionDigits: 2,
  })}%`;
}

export function formatRentalFiscalYear(fiscalYear: RentalFiscalYear): string {
  const [startYear, endYear] = fiscalYear.split('-');
  return `${startYear}-${endYear.slice(-2)}`;
}
