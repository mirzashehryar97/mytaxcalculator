'use client';

import Link from 'next/link';

import { ArrowRight, Search } from 'lucide-react';

import useTaxGuideSearch from '@/features/tax-guides/hooks/useTaxGuideSearch';
import { TAX_GUIDES_PAGE_COPY } from '@/features/tax-guides/lib/content';

export default function GuideSearch() {
  const { query, setQuery, results, hasQuery, submitSearch, clearSearch } = useTaxGuideSearch();

  return (
    <div className="relative mt-5 max-w-lg">
      <search>
        <form onSubmit={submitSearch}>
          <label htmlFor="tax-guide-search" className="sr-only">
            {TAX_GUIDES_PAGE_COPY.searchLabel}
          </label>
          <Search
            className="pointer-events-none absolute top-4 left-4 h-5 w-5 text-slate-500 sm:top-3.5 sm:h-6 sm:w-6"
            aria-hidden="true"
          />
          <input
            id="tax-guide-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={TAX_GUIDES_PAGE_COPY.searchPlaceholder}
            autoComplete="off"
            aria-controls="tax-guide-search-results"
            aria-describedby="tax-guide-search-hint"
            className="w-full rounded-xl border border-white/70 bg-white py-4 pr-4 pl-12 text-slate-900 shadow-emerald-950/20 shadow-xl outline-none transition placeholder:text-slate-500 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-300/25 sm:py-3.5 sm:pl-14"
          />
          <span id="tax-guide-search-hint" className="sr-only">
            {TAX_GUIDES_PAGE_COPY.searchHint}
          </span>
        </form>
      </search>

      {hasQuery ? (
        <div
          id="tax-guide-search-results"
          className="absolute top-full right-0 left-0 z-20 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-emerald-950/25"
          aria-live="polite"
        >
          {results.length > 0 ? (
            <ul className="max-h-80 divide-y divide-slate-100 overflow-y-auto py-1">
              {results.map((result) => (
                <li key={result.id}>
                  <Link
                    href={result.href}
                    onClick={clearSearch}
                    className="group flex items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-emerald-50 focus:bg-emerald-50 focus:outline-none"
                  >
                    <span className="min-w-0">
                      <span className="block font-semibold text-slate-900 group-hover:text-emerald-800">
                        {result.title}
                      </span>
                      <span className="mt-0.5 block truncate text-slate-500 text-sm">
                        {result.description}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-emerald-700 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-4 text-slate-600 text-sm">
              {TAX_GUIDES_PAGE_COPY.searchNoResults}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
