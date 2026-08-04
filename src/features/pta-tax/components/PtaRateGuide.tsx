import { Info } from 'lucide-react';

import PtaRateTable from '@/features/pta-tax/components/PtaRateTable';
import { PTA_RATE_GUIDE_COPY } from '@/features/pta-tax/lib/content';
import { formatPtaFiscalYear } from '@/features/pta-tax/lib/formatting';
import { buildPtaRateGuideRows, getRateGuideSourceLine } from '@/features/pta-tax/lib/presentation';
import { DEFAULT_PTA_FISCAL_YEAR, PTA_FISCAL_YEARS } from '@/features/pta-tax/lib/rates';

const RATE_GUIDE_YEARS = PTA_FISCAL_YEARS.map((fiscalYear) => ({
  fiscalYear,
  heading: `${PTA_RATE_GUIDE_COPY.yearHeadingPrefix} ${formatPtaFiscalYear(fiscalYear)}`,
  sources: getRateGuideSourceLine(fiscalYear),
  rows: buildPtaRateGuideRows(fiscalYear),
}));

/**
 * Both years the calculator prices, printed in full. The page charges 2025-26
 * as readily as 2026-27, and a rate guide that shows only the current year
 * leaves the other half of its own answers unsourced.
 */
export default function PtaRateGuide() {
  return (
    <section
      aria-labelledby="pta-rate-guide-heading"
      className="surface-card mx-auto mt-6 max-w-6xl scroll-mt-24 p-4 sm:p-6"
      id="pta-tax-rates"
    >
      <span className="font-semibold text-[11px] text-emerald-700 uppercase tracking-[0.2em]">
        {PTA_RATE_GUIDE_COPY.eyebrow}
      </span>
      <h2
        className="mt-2 font-bold text-gray-900 text-xl tracking-tight sm:text-2xl"
        id="pta-rate-guide-heading"
      >
        {PTA_RATE_GUIDE_COPY.title}
      </h2>
      <p className="mt-2 max-w-4xl text-gray-600 text-sm leading-relaxed">
        {PTA_RATE_GUIDE_COPY.description}
      </p>

      <div className="mt-6 space-y-8">
        {RATE_GUIDE_YEARS.map((year) => (
          <PtaRateTable
            current={year.fiscalYear === DEFAULT_PTA_FISCAL_YEAR}
            heading={year.heading}
            id={`pta-rates-${year.fiscalYear}`}
            key={year.fiscalYear}
            rows={year.rows}
            sources={year.sources}
          />
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {[
          PTA_RATE_GUIDE_COPY.salesTaxNote,
          PTA_RATE_GUIDE_COPY.incomeTaxNote,
          PTA_RATE_GUIDE_COPY.gapNote,
        ].map((note) => (
          <p
            className="flex items-start gap-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-600 text-sm leading-relaxed"
            key={note}
          >
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <span className="min-w-0">{note}</span>
          </p>
        ))}
      </div>
    </section>
  );
}
