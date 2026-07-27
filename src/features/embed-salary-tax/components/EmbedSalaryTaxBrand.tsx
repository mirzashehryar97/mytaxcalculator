import Image from 'next/image';

import { EMBED_SALARY_TAX_COPY } from '@/features/embed-salary-tax/lib/content';

export default function EmbedSalaryTaxBrand() {
  return (
    <header className="flex flex-wrap items-center gap-2 border-gray-200 border-b px-4 py-4 sm:gap-3 sm:px-7 sm:py-5">
      <Image
        src="/main-logo.png"
        alt=""
        width={44}
        height={44}
        className="h-10 w-10 sm:h-11 sm:w-11"
        priority
      />
      <span className="font-bold text-gray-950 text-lg tracking-tight sm:text-2xl">
        {EMBED_SALARY_TAX_COPY.brand}
      </span>
      <span className="rounded-lg border border-emerald-600 bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-800 text-xs sm:ml-2 sm:px-3 sm:text-sm">
        {EMBED_SALARY_TAX_COPY.fiscalYearBadge}
      </span>
    </header>
  );
}
