import Link from 'next/link';

import { ArrowRight, ExternalLink } from 'lucide-react';

import {
  FINANCE_ACT_2026_SOURCE,
  TAX_GUIDES_PAGE_COPY,
  TAX_YEAR_FACTS,
} from '@/features/tax-guides/lib/content';

export default function TaxYearSnapshot() {
  return (
    <section
      className="rounded-2xl border-[1.5px] border-emerald-700 bg-[#f6f9f7] p-5 sm:p-6"
      aria-labelledby="tax-year-snapshot-heading"
    >
      <h2
        id="tax-year-snapshot-heading"
        className="font-bold text-2xl text-slate-900 tracking-tight"
      >
        {TAX_GUIDES_PAGE_COPY.snapshotTitle}
      </h2>
      <dl className="mt-5 divide-y divide-emerald-100">
        {TAX_YEAR_FACTS.map((fact) => {
          const Icon = fact.icon;

          return (
            <div key={fact.id} className="flex gap-4 py-4 first:pt-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm ring-1 ring-emerald-100">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-slate-500 text-sm">{fact.label}</dt>
                <dd className="mt-0.5 font-bold text-slate-900">{fact.value}</dd>
              </div>
            </div>
          );
        })}
      </dl>
      <Link
        href="/tax-guides/understanding-tax-system"
        className="mt-2 inline-flex items-center gap-2 font-semibold text-emerald-800 text-sm underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950"
      >
        {TAX_GUIDES_PAGE_COPY.snapshotLinkLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <a
        href={FINANCE_ACT_2026_SOURCE.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex w-fit items-center gap-1.5 text-emerald-800 text-xs hover:text-emerald-950"
      >
        {FINANCE_ACT_2026_SOURCE.label}
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </section>
  );
}
