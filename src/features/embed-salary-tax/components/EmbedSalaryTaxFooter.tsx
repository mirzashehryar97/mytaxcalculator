import Link from 'next/link';

import { ExternalLink } from 'lucide-react';

import { EMBED_SALARY_TAX_COPY } from '@/features/embed-salary-tax/lib/content';

export default function EmbedSalaryTaxFooter() {
  return (
    <footer className="flex flex-col gap-3 border-gray-200 border-t px-4 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-7">
      <p className="text-gray-600">
        {EMBED_SALARY_TAX_COPY.poweredBy}{' '}
        <Link
          href="/?utm_source=salary_tax_widget&utm_medium=referral"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
        >
          {EMBED_SALARY_TAX_COPY.brand}
        </Link>
      </p>
      <Link
        href="/?utm_source=salary_tax_widget&utm_medium=referral"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
      >
        {EMBED_SALARY_TAX_COPY.fullCalculatorLink}
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </Link>
    </footer>
  );
}
