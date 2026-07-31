import type { ReactNode } from 'react';

import ResultCard from '@/components/calculator/ResultCard';
import InfoTooltip from '@/components/ui/InfoTooltip';

import CapitalGainsPendingRateNotice from '@/features/capital-gains-tax/components/CapitalGainsPendingRateNotice';
import { CAPITAL_GAINS_RESULT_COPY } from '@/features/capital-gains-tax/lib/content';
import {
  formatCapitalGainsFiscalYear,
  formatPercent,
} from '@/features/capital-gains-tax/lib/formatting';
import { getFilerStatusLabel } from '@/features/capital-gains-tax/lib/presentation';
import type {
  CapitalGainsFiscalYear,
  CapitalGainsResultRow,
  RateConfidence,
} from '@/features/capital-gains-tax/types';

interface CapitalGainsResultSummaryProps {
  id: string;
  title: string;
  fiscalYear: CapitalGainsFiscalYear;
  filer: boolean;
  rate: number;
  /** One sentence saying which rule produced that rate. */
  ruleLabel: string;
  rows: readonly CapitalGainsResultRow[];
  confidence: RateConfidence;
  /** Notes below the figures — loss panels, filer comparison, working note. */
  children?: ReactNode;
}

/**
 * The right-hand panel every one of the three calculators shows: the rate and
 * why it applies, then the money, then whatever the individual market needs to
 * add underneath.
 */
export default function CapitalGainsResultSummary({
  id,
  title,
  fiscalYear,
  filer,
  rate,
  ruleLabel,
  rows,
  confidence,
  children,
}: CapitalGainsResultSummaryProps) {
  return (
    <div id={id} className="scroll-mt-24 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-gray-100 border-b pb-5">
        <h2 className="font-bold text-gray-900 text-xl">{title}</h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 text-xs">
          {getFilerStatusLabel(filer)} · {formatCapitalGainsFiscalYear(fiscalYear)}
        </span>
      </div>

      <div>
        <p className="text-gray-600 text-sm">{CAPITAL_GAINS_RESULT_COPY.appliedRateLabel}</p>
        <p className="mt-1 font-bold text-4xl text-blue-600 tabular-nums">{formatPercent(rate)}</p>
        <p className="mt-2 text-gray-500 text-sm leading-relaxed">{ruleLabel}</p>
      </div>

      {confidence === 'pending-operator-table' ? (
        <CapitalGainsPendingRateNotice fiscalYear={fiscalYear} />
      ) : null}

      <div className="border-gray-100 border-t pt-1">
        {rows.map((row, index) => (
          <ResultCard
            key={row.id}
            label={row.label}
            value={row.value}
            tone={row.tone}
            highlight={row.highlight}
            last={index === rows.length - 1}
            labelAdornment={
              row.tooltip ? (
                <InfoTooltip label={row.tooltip.label} text={row.tooltip.text} />
              ) : undefined
            }
          />
        ))}
      </div>

      {children}
    </div>
  );
}
