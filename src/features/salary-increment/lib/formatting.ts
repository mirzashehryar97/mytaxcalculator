function finiteOrZero(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

export function formatPkr(value: number): string {
  return `Rs. ${Math.round(finiteOrZero(value)).toLocaleString('en-PK')}`;
}

/** Formats a signed amount with a leading + so gains read clearly (e.g. "+Rs. 36,500"). */
export function formatSignedPkr(value: number): string {
  const rounded = Math.round(finiteOrZero(value));
  const sign = rounded > 0 ? '+' : '';
  return `${sign}${formatPkr(rounded)}`;
}

export function formatPercent(value: number): string {
  return `${finiteOrZero(value).toLocaleString('en-PK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}%`;
}
