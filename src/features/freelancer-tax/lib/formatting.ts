import type { FreelancerCurrency, FreelancerFiscalYear } from '@/features/freelancer-tax/types';

function finiteOrZero(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

export function formatPkr(value: number): string {
  const roundedValue = Math.round(finiteOrZero(value));
  return `Rs. ${roundedValue.toLocaleString('en-PK')}`;
}

export function formatUsd(value: number): string {
  return `$${finiteOrZero(value).toLocaleString('en-US', {
    maximumFractionDigits: 2,
  })}`;
}

export function formatFreelancerAmount(value: number, currency: FreelancerCurrency): string {
  return currency === 'USD' ? formatUsd(value) : formatPkr(value);
}

export function formatFreelancerRate(ratePercent: number): string {
  return `${finiteOrZero(ratePercent).toLocaleString('en-PK', {
    maximumFractionDigits: 2,
  })}%`;
}

export function formatFreelancerFiscalYear(fiscalYear: FreelancerFiscalYear): string {
  const [startYear, endYear] = fiscalYear.split('-');
  return `FY ${startYear}-${endYear.slice(-2)}`;
}
