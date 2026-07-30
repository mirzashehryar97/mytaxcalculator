import type { VehicleCharge } from '@/features/vehicle-tax/types';

function finiteOrZero(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

export function formatPkr(value: number): string {
  return `Rs. ${Math.round(finiteOrZero(value)).toLocaleString('en-PK')}`;
}

export function formatPercent(value: number): string {
  return `${finiteOrZero(value).toLocaleString('en-PK', {
    maximumFractionDigits: 2,
  })}%`;
}

export function formatCc(value: number): string {
  return `${Math.round(finiteOrZero(value)).toLocaleString('en-PK')} cc`;
}

/** "Rs. 25,000" for a fixed band, "1.5% of value" for a percentage band. */
export function formatCharge(charge: VehicleCharge): string {
  if (charge.kind === 'amount') {
    return formatPkr(charge.amount);
  }
  return `${formatPercent(charge.percent)} of value`;
}

export function formatVehicleFiscalYear(fiscalYear: string): string {
  const [startYear, endYear] = fiscalYear.split('-');
  if (!endYear) {
    return fiscalYear;
  }
  return `${startYear}-${endYear.slice(-2)}`;
}

/** "2 years" / "1 year" / "less than a year". */
export function formatYears(years: number): string {
  const whole = Math.max(0, Math.floor(finiteOrZero(years)));
  if (whole === 0) {
    return 'less than a year';
  }
  return whole === 1 ? '1 year' : `${whole} years`;
}
