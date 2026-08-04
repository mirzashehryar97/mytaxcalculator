import { AlertCircle, CheckCircle2 } from 'lucide-react';

import {
  formatRouteTotal,
  getRouteFacts,
  getRouteLabel,
} from '@/features/pta-tax/lib/presentation';
import type { PtaRoute, PtaTaxResult } from '@/features/pta-tax/types';

interface PtaRouteComparisonProps {
  result: PtaTaxResult;
  route: PtaRoute;
}

/**
 * Both routes side by side, because the gap between them is the question
 * everybody arrives with — and because the CNIC column is only ever a floor.
 */
export default function PtaRouteComparison({ result, route }: PtaRouteComparisonProps) {
  const totals: Record<PtaRoute, number> = {
    passport: route === 'passport' ? result.totalPkr : result.otherRouteTotalPkr,
    cnic: route === 'cnic' ? result.totalPkr : result.otherRouteTotalPkr,
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {(['passport', 'cnic'] as const).map((option) => {
        const isSelected = option === route;
        const Icon = option === 'passport' ? CheckCircle2 : AlertCircle;

        return (
          <div
            key={option}
            className={`min-w-0 rounded-xl border p-4 ${
              isSelected ? 'border-emerald-300 bg-emerald-50/60' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-semibold text-gray-900 text-sm">{getRouteLabel(option)}</span>
              {isSelected ? (
                <span className="rounded-full bg-emerald-600 px-2 py-0.5 font-medium text-[11px] text-white">
                  Selected
                </span>
              ) : null}
            </div>
            <strong className="amount-wrap mt-1 block font-bold text-lg text-red-600 tabular-nums">
              {formatRouteTotal(totals[option], option)}
            </strong>
            <ul className="mt-3 space-y-1.5">
              {getRouteFacts(option).map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-2 text-gray-600 text-xs leading-snug"
                >
                  <Icon
                    aria-hidden="true"
                    className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                      option === 'passport' ? 'text-emerald-600' : 'text-amber-500'
                    }`}
                  />
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
