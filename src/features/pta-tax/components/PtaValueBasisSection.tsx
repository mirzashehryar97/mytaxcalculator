import { ArrowRight, Info } from 'lucide-react';

import { PTA_VALUE_BASIS_NOTE } from '@/features/pta-tax/lib/content';

/**
 * The distinction the whole calculator rests on, given its own section because
 * confusing C&F value with retail price is what makes every competing figure
 * wrong.
 */
export default function PtaValueBasisSection() {
  return (
    <section
      className="surface-card mx-auto mt-6 max-w-6xl scroll-mt-24 p-4 sm:p-6"
      aria-labelledby="pta-value-basis"
      id="pta-how-it-is-worked-out"
    >
      <h2 className="font-bold text-gray-900 text-xl" id="pta-value-basis">
        {PTA_VALUE_BASIS_NOTE.title}
      </h2>
      <p className="mt-2 max-w-3xl text-gray-600 text-sm leading-relaxed">
        {PTA_VALUE_BASIS_NOTE.body}
      </p>

      <ol className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {PTA_VALUE_BASIS_NOTE.steps.map((step, index) => (
          <li
            key={step.id}
            className="relative min-w-0 scroll-mt-24 rounded-2xl border border-gray-200 bg-gray-50 p-4"
            id={`pta-step-${step.id}`}
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 font-bold text-sm text-white">
              {index + 1}
            </span>
            <h3 className="mt-3 font-semibold text-gray-900 text-sm">{step.title}</h3>
            <p className="mt-1 text-gray-600 text-xs leading-relaxed">{step.body}</p>
            {index < PTA_VALUE_BASIS_NOTE.steps.length - 1 ? (
              <ArrowRight
                aria-hidden="true"
                className="-right-2.5 -translate-y-1/2 absolute top-1/2 hidden h-5 w-5 text-gray-300 xl:block"
              />
            ) : null}
          </li>
        ))}
      </ol>

      <p className="mt-5 flex items-start gap-2 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-900/90 text-sm leading-relaxed">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
        {PTA_VALUE_BASIS_NOTE.floorNote}
      </p>
    </section>
  );
}
