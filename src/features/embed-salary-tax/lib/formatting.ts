export function formatEmbedPkr(value: number): string {
  const amount = Number.isFinite(value) ? Math.round(value) : 0;
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

export function formatEmbedPercent(value: number): string {
  const percentage = Number.isFinite(value) ? value : 0;
  return `${percentage.toLocaleString('en-PK', { maximumFractionDigits: 2 })}%`;
}
