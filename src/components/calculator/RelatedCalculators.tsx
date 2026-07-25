import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { CALCULATOR_NAV_LINKS, RELATED_CALCULATORS_COPY } from '@/components/layout/navigation';

interface RelatedCalculatorsProps {
  /** Pathname of the current calculator, excluded from the list. */
  currentHref: string;
}

/**
 * Server-rendered cross-links between the calculators. Keeps a keyword-rich, in-content
 * internal link to each sibling calculator in the HTML of every page it is placed on,
 * strengthening the calculator topic cluster for search.
 */
export default function RelatedCalculators({ currentHref }: RelatedCalculatorsProps) {
  const links = CALCULATOR_NAV_LINKS.filter((link) => link.href !== currentHref);

  if (links.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 sm:mt-20" aria-labelledby="related-calculators-heading">
      <div className="mb-6 text-center sm:mb-8">
        <h2
          id="related-calculators-heading"
          className="font-bold text-2xl text-white tracking-tight sm:text-3xl"
        >
          {RELATED_CALCULATORS_COPY.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-emerald-50/80">
          {RELATED_CALCULATORS_COPY.description}
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/95 p-5 shadow-emerald-950/10 shadow-lg backdrop-blur-sm transition-all hover:border-emerald-200 hover:shadow-xl"
          >
            <span className="min-w-0">
              <span className="block font-semibold text-gray-900 group-hover:text-emerald-700">
                {link.label}
              </span>
              <span className="mt-0.5 block text-gray-500 text-sm">{link.description}</span>
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
