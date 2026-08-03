import { ShieldCheck } from 'lucide-react';

import RelatedCalculatorGroup from '@/components/calculator/RelatedCalculatorGroup';
import {
  CALCULATOR_NAV_LINKS,
  groupCalculatorLinks,
  RELATED_CALCULATORS_COPY,
} from '@/components/layout/navigation';

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
  const groups = groupCalculatorLinks(
    CALCULATOR_NAV_LINKS.filter((link) => link.href !== currentHref),
  );

  if (groups.length === 0) {
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

      <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-gray-100 p-2 pb-3 shadow-emerald-950/20 shadow-lg">
        {groups.map((group) => (
          <RelatedCalculatorGroup key={group.category} group={group} />
        ))}
      </div>
    </section>
  );
}
