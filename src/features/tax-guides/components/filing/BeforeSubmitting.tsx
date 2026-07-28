import { CheckCircle2 } from 'lucide-react';

import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  BEFORE_SUBMIT_CHECKS,
  FILING_SECTION_COPY,
} from '@/features/tax-guides/lib/filingTaxReturnContent';

export default function BeforeSubmitting() {
  return (
    <section aria-labelledby="before-submitting">
      <TaxGuideArticleSectionHeading id="before-submitting" number={7}>
        {FILING_SECTION_COPY.beforeSubmitTitle}
      </TaxGuideArticleSectionHeading>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {BEFORE_SUBMIT_CHECKS.map((item) => (
          <li
            key={item}
            className="flex min-h-12 items-center gap-3 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-slate-700 text-sm shadow-sm"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-800" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
