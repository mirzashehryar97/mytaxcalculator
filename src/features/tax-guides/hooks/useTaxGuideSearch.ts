'use client';

import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { TAX_GUIDE_SEARCH_ENTRIES } from '@/features/tax-guides/lib/content';
import { filterTaxGuideSearchEntries } from '@/features/tax-guides/lib/search';

export default function useTaxGuideSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const results = useMemo(
    () => filterTaxGuideSearchEntries(TAX_GUIDE_SEARCH_ENTRIES, query),
    [query],
  );
  const hasQuery = query.trim().length > 0;

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const firstResult = results[0];

    if (firstResult) {
      router.push(firstResult.href);
    }
  };

  const clearSearch = () => setQuery('');

  return {
    query,
    setQuery,
    results,
    hasQuery,
    submitSearch,
    clearSearch,
  };
}
