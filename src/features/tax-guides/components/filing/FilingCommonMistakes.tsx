import { XCircle } from 'lucide-react';

import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  FILING_COMMON_MISTAKES,
  FILING_SECTION_COPY,
} from '@/features/tax-guides/lib/filingTaxReturnContent';

export default function FilingCommonMistakes() {
  return (
    <section aria-labelledby="common-filing-mistakes">
      <TaxGuideArticleSectionHeading id="common-filing-mistakes" number={8}>
        {FILING_SECTION_COPY.mistakesTitle}
      </TaxGuideArticleSectionHeading>
      <ul className="mt-4 overflow-hidden rounded-lg border border-red-300 bg-red-50/50">
        {FILING_COMMON_MISTAKES.map((mistake, index) => (
          <li
            key={mistake}
            className={`flex min-h-11 items-center gap-3 px-4 py-2.5 text-red-950 text-sm ${
              index > 0 ? 'border-red-200 border-t' : ''
            }`}
          >
            <XCircle className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
            {mistake}
          </li>
        ))}
      </ul>
    </section>
  );
}
