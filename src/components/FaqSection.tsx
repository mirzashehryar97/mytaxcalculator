import { ChevronDown, HelpCircle } from 'lucide-react';

import { HOME_FAQS } from '@/lib/seo';

import FaqSlabsItem from './FaqSlabsItem';

export default function FaqSection() {
  return (
    <section className="mt-20" aria-labelledby="faq-heading">
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-medium text-emerald-100 text-sm backdrop-blur-sm">
          <HelpCircle className="h-4 w-4 text-emerald-300" />
          Got questions?
        </span>
        <h2
          id="faq-heading"
          className="mt-5 font-bold text-3xl text-white tracking-tight sm:text-4xl"
        >
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-emerald-50/80">
          Everything you need to know about calculating income tax in Pakistan.
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-4">
        {HOME_FAQS.map((faq) =>
          faq.slabs ? (
            <FaqSlabsItem key={faq.question} question={faq.question} />
          ) : (
            <details
              key={faq.question}
              className="group rounded-2xl border border-white/60 bg-white/95 shadow-emerald-950/10 shadow-lg backdrop-blur-sm transition-all duration-200 open:shadow-xl open:ring-1 open:ring-emerald-100 hover:border-emerald-200"
            >
              <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 p-5 font-semibold text-base text-gray-900 transition-colors group-open:text-emerald-700 group-hover:text-emerald-700 sm:p-6 sm:text-lg">
                <span>{faq.question}</span>
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-transform duration-300 group-open:rotate-180">
                  <ChevronDown className="h-5 w-5" />
                </span>
              </summary>
              <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                <div className="border-gray-100 border-t pt-4 text-gray-600 text-sm leading-relaxed sm:text-base">
                  {faq.answer}
                </div>
              </div>
            </details>
          ),
        )}
      </div>
    </section>
  );
}
