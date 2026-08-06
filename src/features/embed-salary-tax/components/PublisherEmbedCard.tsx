import Link from 'next/link';

import { ArrowRight, Check, Code2 } from 'lucide-react';

import { SUPPORT_EMAIL, SUPPORT_MAILTO } from '@/lib/contact';

import {
  EMBED_SALARY_TAX_DISCOVERY_COPY,
  EMBED_SALARY_TAX_PUBLISHER_BENEFITS,
  EMBED_SALARY_TAX_ROUTE,
} from '@/features/embed-salary-tax/lib/content';

export default function PublisherEmbedCard() {
  return (
    <section
      className="mt-10 rounded-3xl border border-emerald-200 bg-white p-6 shadow-[0_18px_45px_-24px_rgba(6,78,59,0.5)] sm:mt-12 sm:p-8"
      aria-labelledby="publisher-embed-heading"
    >
      <div className="grid items-center gap-6 lg:grid-cols-[auto_1fr_auto] lg:gap-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 sm:h-20 sm:w-20">
          <Code2 className="h-8 w-8 sm:h-10 sm:w-10" aria-hidden="true" />
        </div>

        <div>
          <p className="font-bold text-emerald-700 text-xs uppercase tracking-[0.16em]">
            {EMBED_SALARY_TAX_DISCOVERY_COPY.publisherEyebrow}
          </p>
          <h2
            id="publisher-embed-heading"
            className="mt-3 text-balance font-bold text-2xl text-gray-950 tracking-tight sm:text-3xl"
          >
            {EMBED_SALARY_TAX_DISCOVERY_COPY.publisherTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-gray-600 leading-relaxed">
            {EMBED_SALARY_TAX_DISCOVERY_COPY.publisherDescription}
          </p>

          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-gray-700 text-sm">
            {EMBED_SALARY_TAX_PUBLISHER_BENEFITS.map((benefit) => (
              <li key={benefit} className="inline-flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <p className="mt-4 text-gray-600 text-sm">
            {EMBED_SALARY_TAX_DISCOVERY_COPY.publisherSupportPrompt}{' '}
            <a
              href={SUPPORT_MAILTO}
              className="font-semibold text-emerald-700 underline underline-offset-2 transition-colors hover:text-emerald-900"
            >
              {SUPPORT_EMAIL}
            </a>
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 lg:items-stretch">
          <Link
            href={`${EMBED_SALARY_TAX_ROUTE}#embed-code`}
            className="hover:-translate-y-0.5 inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white shadow-sm transition-all hover:bg-emerald-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30"
          >
            {EMBED_SALARY_TAX_DISCOVERY_COPY.publisherPrimaryLink}
          </Link>
          <Link
            href={EMBED_SALARY_TAX_ROUTE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-1 font-semibold text-emerald-700 text-sm transition-colors hover:text-emerald-900"
          >
            {EMBED_SALARY_TAX_DISCOVERY_COPY.publisherSecondaryLink}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
