import { Landmark } from 'lucide-react';

import PtaNoteCard from '@/features/pta-tax/components/PtaNoteCard';
import {
  PTA_AUTHORITY_NOTE,
  PTA_BREAKDOWN_COPY,
  PTA_DECLARED_VALUE_NOTE,
  PTA_LEVY_GAP_NOTE,
  PTA_PROVENANCE_NOTE,
  PTA_SALES_TAX_BASE_NOTE,
} from '@/features/pta-tax/lib/content';
import { getPtaTaxLineDisplay } from '@/features/pta-tax/lib/presentation';
import type { PtaFiscalYear, PtaTaxResult } from '@/features/pta-tax/types';

/** The year whose figures are partly reconstructed — see `PTA_PROVENANCE_NOTE`. */
const PROVENANCE_CAVEAT_YEAR: PtaFiscalYear = '2026-2027';

interface PtaTaxBreakdownProps {
  result: PtaTaxResult;
  fiscalYear: PtaFiscalYear;
  /** True when a typed declared value displaced the ruling's published figure. */
  isDeclaredValueUsed: boolean;
}

/** Every line with the document and band that produced it, under the result. */
export default function PtaTaxBreakdown({
  result,
  fiscalYear,
  isDeclaredValueUsed,
}: PtaTaxBreakdownProps) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
        <h3 className="font-bold text-gray-900 text-lg">{PTA_BREAKDOWN_COPY.title}</h3>
        <p className="mt-1 text-gray-600 text-sm leading-relaxed">
          {PTA_BREAKDOWN_COPY.description}
        </p>
        <ul className="mt-4 space-y-3">
          {result.lines.map((line) => {
            const display = getPtaTaxLineDisplay(line);

            return (
              <li
                key={line.id}
                className="flex min-w-0 flex-col gap-1 border-gray-100 border-b pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <div className="min-w-0">
                  <span className="block font-medium text-gray-900 text-sm">{line.label}</span>
                  <span className="block text-gray-600 text-xs leading-relaxed">{line.basis}</span>
                  {/* The citation is what makes the sentence above checkable, but
                      it is not what a reader is here for — so it sits under it,
                      quieter, rather than in place of it. */}
                  <span className="mt-0.5 block text-[11px] text-gray-400 leading-relaxed">
                    {PTA_BREAKDOWN_COPY.referencePrefix} {line.reference}
                  </span>
                </div>
                {/* Exemptions are green, payable tax red, and an amount that is
                    not established is amber rather than masquerading as nil. */}
                <strong
                  className={`amount-wrap shrink-0 text-left font-bold tabular-nums sm:text-right ${display.textClassName}`}
                >
                  {display.value}
                </strong>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <Landmark className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
        <p className="text-blue-900/90 text-sm leading-relaxed">{PTA_AUTHORITY_NOTE}</p>
      </div>

      {isDeclaredValueUsed ? (
        <PtaNoteCard
          title={PTA_DECLARED_VALUE_NOTE.title}
          body={PTA_DECLARED_VALUE_NOTE.body}
          tone="info"
        />
      ) : null}

      {result.usedLevyGapFallback ? (
        <PtaNoteCard title={PTA_LEVY_GAP_NOTE.title} body={PTA_LEVY_GAP_NOTE.body} tone="warning" />
      ) : null}

      <PtaNoteCard
        title={PTA_SALES_TAX_BASE_NOTE.title}
        body={PTA_SALES_TAX_BASE_NOTE.body}
        tone="neutral"
      />

      {fiscalYear === PROVENANCE_CAVEAT_YEAR ? (
        <PtaNoteCard
          title={PTA_PROVENANCE_NOTE.title}
          body={PTA_PROVENANCE_NOTE.body}
          tone="neutral"
        />
      ) : null}
    </div>
  );
}
