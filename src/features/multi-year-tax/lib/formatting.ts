function finiteOrZero(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

export function formatPkr(value: number): string {
  return `Rs. ${Math.round(finiteOrZero(value)).toLocaleString('en-PK')}`;
}

/** Short currency for chart labels, e.g. 2,460,000 → `Rs. 2.46M`. */
export function formatCompactPkr(value: number): string {
  const amount = finiteOrZero(value);
  const absolute = Math.abs(amount);

  if (absolute >= 1_000_000) {
    return `Rs. ${Number((amount / 1_000_000).toFixed(2))}M`;
  }

  if (absolute >= 1000) {
    return `Rs. ${Number((amount / 1000).toFixed(1))}K`;
  }

  return formatPkr(amount);
}

/** Compact amount for a chart axis, e.g. 2,460,000 → `2.5M`. */
export function formatAxisAmount(value: number): string {
  const amount = finiteOrZero(value);
  const absolute = Math.abs(amount);

  if (absolute >= 1_000_000) {
    return `${Number((amount / 1_000_000).toFixed(1))}M`;
  }

  if (absolute >= 1000) {
    return `${Math.round(amount / 1000)}K`;
  }

  return String(Math.round(amount));
}

export function formatPercent(value: number): string {
  return `${finiteOrZero(value).toFixed(2)}%`;
}

/** Months keep two decimals because partial months are prorated by day. */
export function formatMonths(value: number): string {
  const months = finiteOrZero(value);
  return `${months.toFixed(2)} month${Math.abs(months - 1) < 0.005 ? '' : 's'}`;
}

/** Whole months when the period is exact, decimals only when it isn't. */
export function formatMonthsCompact(value: number): string {
  const months = finiteOrZero(value);
  const isWhole = Math.abs(months - Math.round(months)) < 0.005;
  return `${isWhole ? Math.round(months) : months.toFixed(2)} month${
    Math.abs(months - 1) < 0.005 ? '' : 's'
  }`;
}

export function formatMonthlySalary(value: number): string {
  return `${formatPkr(value)} / month`;
}
