import Link from 'next/link';

import { ArrowRight, Info } from 'lucide-react';

import { CORPORATE_COMBINATION_COPY } from '@/features/corporate-tax/lib/content';

/**
 * The order the three company taxes are worked out in. Steps 1 and 2 compete
 * with each other and step 3 is added on top, which is the single thing people
 * get wrong about Sections 113 and 4C.
 */
export default function CorporateCombinationGuide() {
  return (
    <section
      id="how-they-combine"
      className="mt-12 scroll-mt-24 rounded-3xl border border-white/70 bg-white/95 p-5 shadow-emerald-950/10 shadow-xl sm:mt-16 sm:p-8"
      aria-labelledby="corporate-combination-heading"
    >
      <h2
        id="corporate-combination-heading"
        className="font-bold text-gray-900 text-xl tracking-tight sm:text-2xl"
      >
        {CORPORATE_COMBINATION_COPY.title}
      </h2>
      <p className="mt-3 max-w-4xl text-gray-600 leading-relaxed">
        {CORPORATE_COMBINATION_COPY.description}
      </p>

      <ol className="mt-6 grid gap-4 lg:grid-cols-3">
        {CORPORATE_COMBINATION_COPY.steps.map((step) => (
          <li
            key={step.id}
            className="flex min-w-0 flex-col rounded-2xl border border-gray-200 bg-gray-50/70 p-5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 font-bold text-sm text-white">
              {step.order}
            </span>
            <h3 className="mt-3 font-bold text-base text-gray-900">{step.title}</h3>
            <p className="mt-2 flex-1 text-gray-600 text-sm leading-relaxed">{step.body}</p>
            <Link
              href={step.href}
              className="group mt-3 inline-flex items-center gap-1.5 font-semibold text-emerald-700 text-sm hover:text-emerald-800"
            >
              {step.linkLabel}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ol>

      <p className="mt-4 flex items-start gap-2 text-gray-500 text-sm leading-relaxed">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span>{CORPORATE_COMBINATION_COPY.note}</span>
      </p>
    </section>
  );
}
