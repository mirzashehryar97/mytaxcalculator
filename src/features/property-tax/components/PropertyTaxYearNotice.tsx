import { AlertTriangle, CalendarCheck } from 'lucide-react';

import { PROPERTY_FORM_COPY } from '@/features/property-tax/lib/content';
import type { PropertyTaxYearNoticeContent } from '@/features/property-tax/types';

interface PropertyTaxYearNoticeProps {
  notice: PropertyTaxYearNoticeContent;
}

/**
 * Stands where a tax-year dropdown normally goes on a calculator. A capital gain
 * is taxed in the year its sale falls in, so the year is shown as a result of the
 * dates above it rather than offered as a choice that could contradict them.
 */
export default function PropertyTaxYearNotice({ notice }: PropertyTaxYearNoticeProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-2 font-medium text-gray-600 text-sm">
          <CalendarCheck className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
          {PROPERTY_FORM_COPY.taxYearNoticeLabel}
        </p>
        <output
          htmlFor="property-sale-date"
          className="font-bold text-gray-900 text-lg tabular-nums"
        >
          {notice.yearLabel}
        </output>
      </div>

      <p className="mt-2 text-gray-500 text-xs leading-relaxed">
        {notice.sourceLine} {PROPERTY_FORM_COPY.taxYearNoticeHelp}
      </p>

      {notice.warning ? (
        <p className="mt-3 flex gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-950 text-xs leading-relaxed">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
          {notice.warning}
        </p>
      ) : null}
    </div>
  );
}
