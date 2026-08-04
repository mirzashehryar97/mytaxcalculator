import ResultCard from '@/components/calculator/ResultCard';
import InfoTooltip from '@/components/ui/InfoTooltip';

import PtaRouteComparison from '@/features/pta-tax/components/PtaRouteComparison';
import {
  PTA_LINE_TERMS,
  PTA_PAGE_COPY,
  PTA_RESULT_COPY,
  PTA_TERMS,
} from '@/features/pta-tax/lib/content';
import { formatPkr, formatUsd } from '@/features/pta-tax/lib/formatting';
import { formatRouteTotal } from '@/features/pta-tax/lib/presentation';
import type { PtaRoute, PtaTaxResult } from '@/features/pta-tax/types';

interface PtaResultSummaryProps {
  result: PtaTaxResult;
  route: PtaRoute;
}

/**
 * Colour follows the site convention rather than the mockup: every amount here
 * is tax owed, so the totals are red even on the cheaper route. Green would
 * read as money the taxpayer keeps.
 */
export default function PtaResultSummary({ result, route }: PtaResultSummaryProps) {
  return (
    <div className="space-y-5">
      <h2 className="border-gray-100 border-b pb-5 font-bold text-gray-900 text-xl">
        {PTA_PAGE_COPY.resultTitle}
      </h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="min-w-0 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <span className="flex flex-wrap items-center gap-1.5 text-gray-500 text-xs">
            {PTA_RESULT_COPY.valueUsdLabel}
            <InfoTooltip label={PTA_TERMS.cnfValue.label} text={PTA_TERMS.cnfValue.text} />
          </span>
          <strong className="amount-wrap mt-0.5 block font-bold text-gray-900 text-lg tabular-nums">
            {formatUsd(result.cnfUsd)}
          </strong>
        </div>
        <div className="min-w-0 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <span className="flex flex-wrap items-center gap-1.5 text-gray-500 text-xs">
            {PTA_RESULT_COPY.valuePkrLabel}
            <InfoTooltip label={PTA_TERMS.customsValue.label} text={PTA_TERMS.customsValue.text} />
          </span>
          <strong className="amount-wrap mt-0.5 block font-bold text-gray-900 text-lg tabular-nums">
            {formatPkr(result.customsValuePkr)}
          </strong>
        </div>
      </div>

      <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
        <span className="flex flex-wrap items-center gap-1.5 font-semibold text-red-800 text-sm">
          {PTA_RESULT_COPY.totalLabel}
          <InfoTooltip label={PTA_TERMS.totalDue.label} text={PTA_TERMS.totalDue.text} />
        </span>
        <strong className="amount-wrap mt-1 block font-bold text-2xl text-red-600 tabular-nums sm:text-3xl">
          {formatRouteTotal(result.totalPkr, route)}
        </strong>
        <span className="mt-1 block text-red-800/70 text-xs">
          {route === 'passport' ? PTA_RESULT_COPY.passportCaption : PTA_RESULT_COPY.cnicCaption}
        </span>
      </div>

      {/* Each line names the levy the way the PSID does, with the explanation of
          what that levy actually is attached to the label. */}
      <div>
        {result.lines.map((line, index) => (
          <ResultCard
            key={line.id}
            label={line.label}
            labelAdornment={
              PTA_LINE_TERMS[line.id] ? (
                <InfoTooltip
                  label={PTA_LINE_TERMS[line.id].label}
                  text={PTA_LINE_TERMS[line.id].text}
                />
              ) : null
            }
            last={index === result.lines.length - 1}
            tone={line.amountPkr > 0 ? 'negative' : 'positive'}
            value={
              line.exemptReason && line.amountPkr === 0
                ? PTA_RESULT_COPY.nothingToPay
                : formatPkr(line.amountPkr)
            }
          />
        ))}
      </div>

      <PtaRouteComparison result={result} route={route} />
    </div>
  );
}
