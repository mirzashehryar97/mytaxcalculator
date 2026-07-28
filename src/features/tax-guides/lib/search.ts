import type { TaxGuideSearchEntry } from '@/features/tax-guides/types';

const MAX_SEARCH_RESULTS = 6;

export function filterTaxGuideSearchEntries(
  entries: readonly TaxGuideSearchEntry[],
  query: string,
): readonly TaxGuideSearchEntry[] {
  const normalizedQuery = query.trim().toLocaleLowerCase('en-PK');

  if (!normalizedQuery) {
    return [];
  }

  return entries
    .filter((entry) =>
      [entry.title, entry.description, ...entry.keywords].some((value) =>
        value.toLocaleLowerCase('en-PK').includes(normalizedQuery),
      ),
    )
    .slice(0, MAX_SEARCH_RESULTS);
}
