import { Landmark } from 'lucide-react';

import PtaNoteCard from '@/features/pta-tax/components/PtaNoteCard';
import {
  PTA_AUTHORITY_NOTE,
  PTA_BREAKDOWN_COPY,
  PTA_DECLARED_VALUE_NOTE,
  PTA_LEVY_GAP_NOTE,
  PTA_RESULT_COPY,
  PTA_SALES_TAX_BASE_NOTE,
} from '@/features/pta-tax/lib/content';
import { formatPkr } from '@/features/pta-tax/lib/formatting';
import type { PtaTaxResult } from '@/features/pta-tax/types';

interface PtaTaxBreakdownProps {
  result: PtaTaxResult;
  /** True when a typed declared value displaced the ruling's published figure. */
  isDeclaredValueUsed: boolean;
}

/** Every line with the document and band that produced it, under the result. */
export default function PtaTaxBreakdown({ result, isDeclaredValueUsed }: PtaTaxBreakdownProps) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
        <h3 className="font-bold text-gray-900 text-lg">{PTA_BREAKDOWN_COPY.title}</h3>
        <p className="mt-1 text-gray-600 text-sm leading-relaxed">
          {PTA_BREAKDOWN_COPY.description}
        </p>
        <ul className="mt-4 space-y-3">
          {result.lines.map((line) => (
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
              {/* The reason a line is nil lives in `basis` directly above, so the
                  amount column stays a short figure — a sentence here refuses to
                  shrink beside the label and pushes the row off a narrow screen. */}
              <strong
                className={`amount-wrap shrink-0 text-left font-bold tabular-nums sm:text-right ${
                  line.amountPkr > 0 ? 'text-red-600' : 'text-emerald-600'
                }`}
              >
                {line.exemptReason && line.amountPkr === 0
                  ? PTA_RESULT_COPY.nothingToPay
                  : formatPkr(line.amountPkr)}
              </strong>
            </li>
          ))}
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
    </div>
  );
}
