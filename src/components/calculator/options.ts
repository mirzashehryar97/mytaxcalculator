import type { SelectOption } from '@/components/calculator/select';

export const FILER_OPTIONS = [
  { value: 'filer', label: 'Filer' },
  { value: 'non-filer', label: 'Non-filer' },
] as const;

/** Wraps plain values — fiscal years, mostly — as dropdown options. */
export function toSelectOptions<T extends string>(
  values: readonly T[],
  format?: (value: T) => string,
): SelectOption<T>[] {
  return values.map((value) => ({ value, label: format ? format(value) : value }));
}

/** Dropdown options from a table that already carries its own labels. */
export function toLabelledOptions<T extends string, E extends { label: string }>(
  entries: readonly E[],
  getValue: (entry: E) => T,
): SelectOption<T>[] {
  return entries.map((entry) => ({ value: getValue(entry), label: entry.label }));
}
