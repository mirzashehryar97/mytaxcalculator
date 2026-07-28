'use client';

import { Printer } from 'lucide-react';

import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  FILING_DOCUMENTS,
  FILING_SECTION_COPY,
} from '@/features/tax-guides/lib/filingTaxReturnContent';

export default function FilingDocumentsChecklist() {
  return (
    <section aria-labelledby="documents-checklist">
      <TaxGuideArticleSectionHeading id="documents-checklist" number={3}>
        {FILING_SECTION_COPY.documentsTitle}
      </TaxGuideArticleSectionHeading>
      <ul className="mt-4 grid overflow-hidden rounded-lg border border-slate-300 bg-white sm:grid-cols-2">
        {FILING_DOCUMENTS.map((document, index) => (
          <li
            key={document.id}
            className={`flex min-h-11 items-center gap-3 border-slate-200 px-4 py-2.5 text-slate-700 text-sm ${
              index > 0 ? 'border-t' : ''
            } ${index === 1 ? 'sm:border-t-0' : ''} ${index % 2 === 1 ? 'sm:border-l' : ''}`}
          >
            <span
              className="h-4 w-4 shrink-0 rounded-[3px] border border-emerald-700 bg-emerald-50"
              aria-hidden="true"
            />
            {document.label}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => window.print()}
        className="mx-auto mt-3 flex min-h-10 items-center justify-center gap-2 rounded-md border border-emerald-800 bg-white px-4 font-semibold text-emerald-900 text-sm transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
      >
        <Printer className="h-4 w-4" aria-hidden="true" />
        {FILING_SECTION_COPY.printChecklistLabel}
      </button>
    </section>
  );
}
