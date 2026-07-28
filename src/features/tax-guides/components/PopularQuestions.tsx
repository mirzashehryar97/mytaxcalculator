import Link from 'next/link';

import { ChevronDown } from 'lucide-react';

import { TAX_GUIDES_FAQS, TAX_GUIDES_PAGE_COPY } from '@/features/tax-guides/lib/content';

export default function PopularQuestions() {
  return (
    <section
      className="rounded-2xl border-[1.5px] border-slate-200 bg-white p-5 sm:p-6"
      aria-labelledby="popular-tax-questions-heading"
    >
      <h2
        id="popular-tax-questions-heading"
        className="font-bold text-2xl text-slate-900 tracking-tight"
      >
        {TAX_GUIDES_PAGE_COPY.questionsTitle}
      </h2>
      <div className="mt-5 divide-y divide-slate-200 overflow-hidden rounded-xl border-[1.5px] border-slate-200">
        {TAX_GUIDES_FAQS.map((faq) => (
          <details key={faq.id} className="group bg-white open:bg-emerald-50/50">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 font-medium text-slate-800 transition-colors hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-inset">
              <span>{faq.question}</span>
              <ChevronDown
                className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="px-4 pb-4 text-sm leading-relaxed">
              <p className="text-slate-600">{faq.answer}</p>
              <Link
                href={faq.href}
                className="mt-2 inline-flex font-semibold text-emerald-800 hover:underline"
              >
                {faq.linkLabel}
              </Link>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
