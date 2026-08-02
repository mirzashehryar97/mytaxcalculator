function finiteOrZero(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

export function formatPkr(value: number): string {
  return `Rs. ${Math.round(finiteOrZero(value)).toLocaleString('en-PK')}`;
}

export function formatCompactPkr(value: number): string {
  const finiteValue = finiteOrZero(value);
  const absoluteValue = Math.abs(finiteValue);

  if (absoluteValue >= 1_000_000) {
    return `Rs. ${(finiteValue / 1_000_000).toLocaleString('en-PK', {
      maximumFractionDigits: 2,
    })}M`;
  }

  if (absoluteValue >= 1000) {
    return `Rs. ${(finiteValue / 1000).toLocaleString('en-PK', {
      maximumFractionDigits: 1,
    })}K`;
  }

  return formatPkr(finiteValue);
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

export function formatSignedPercent(value: number): string {
  const finiteValue = finiteOrZero(value);
  const sign = finiteValue > 0 ? '+' : '';
  return `${sign}${formatPercent(finiteValue)}`;
}

export function formatFiscalYear(value: string): string {
  const [start, end] = value.split('-');
  return `FY ${start}–${end?.slice(-2) ?? ''}`;
}
