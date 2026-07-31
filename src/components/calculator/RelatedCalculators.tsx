import Link from 'next/link';

import { ArrowRight, ShieldCheck } from 'lucide-react';

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
      <div className="mb-8 text-center sm:mb-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-4 py-1.5 font-semibold text-[11px] text-emerald-200 uppercase tracking-[0.2em] backdrop-blur-sm">
          <ShieldCheck className="h-4 w-4 text-emerald-300" aria-hidden="true" />
          {RELATED_CALCULATORS_COPY.eyebrow}
        </span>
        <h2
          id="related-calculators-heading"
          className="mt-6 text-balance font-bold text-3xl text-white tracking-tight sm:text-4xl"
        >
          {RELATED_CALCULATORS_COPY.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-emerald-50/80 text-lg">
          {RELATED_CALCULATORS_COPY.description}
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:max-w-7xl xl:grid-cols-5">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group flex h-full flex-col rounded-2xl border border-white/60 bg-white/95 p-5 shadow-emerald-950/10 shadow-lg backdrop-blur-sm transition-all hover:border-emerald-200 hover:shadow-xl"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>

              <span className="mt-4 block text-balance font-bold text-base text-gray-900 group-hover:text-emerald-700">
                {link.label}
              </span>
              <span className="mt-1.5 block text-gray-500 text-sm">{link.description}</span>

              <span className="mt-auto flex items-center gap-1.5 pt-4 font-semibold text-emerald-700 text-sm group-hover:text-emerald-800">
                {RELATED_CALCULATORS_COPY.cta}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
