import { Wallet } from 'lucide-react';

import InfoTooltip from '@/components/ui/InfoTooltip';

import { VEHICLE_TERMS } from '@/features/vehicle-tax/lib/content';
import { formatPkr } from '@/features/vehicle-tax/lib/formatting';

interface VehicleFilerComparisonProps {
  title: string;
  subtitle: string;
  filerLabel: string;
  nonFilerLabel: string;
  savingLabel: string;
  filerTax: number;
  nonFilerTax: number;
  saving: number;
  /** Which side to highlight, from the reader's own answer. */
  filer: boolean;
}

/** Side-by-side of what the same vehicle costs on and off the taxpayer list. */
export default function VehicleFilerComparison({
  title,
  subtitle,
  filerLabel,
  nonFilerLabel,
  savingLabel,
  filerTax,
  nonFilerTax,
  saving,
  filer,
}: VehicleFilerComparisonProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className="flex items-center gap-1.5">
          <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
          <InfoTooltip
            label={VEHICLE_TERMS.filerStatus.label}
            text={VEHICLE_TERMS.filerStatus.text}
          />
        </span>
        <p className="text-gray-500 text-xs">{subtitle}</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div
          className={`min-w-0 rounded-xl border p-4 ${
            filer ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 bg-gray-50'
          }`}
        >
          <p className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
            {filerLabel}
          </p>
          <p className="amount-wrap mt-1 font-bold text-emerald-700 text-xl tabular-nums">
            {formatPkr(filerTax)}
          </p>
        </div>
        <div
          className={`min-w-0 rounded-xl border p-4 ${
            filer ? 'border-gray-200 bg-gray-50' : 'border-red-300 bg-red-50'
          }`}
        >
          <p className="font-semibold text-gray-600 text-xs uppercase tracking-wider">
            {nonFilerLabel}
          </p>
          <p className="amount-wrap mt-1 font-bold text-red-600 text-xl tabular-nums">
            {formatPkr(nonFilerTax)}
          </p>
        </div>
      </div>

      <p className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
        <span className="inline-flex items-center gap-2 font-semibold text-emerald-800 text-sm">
          <Wallet className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
          {savingLabel}
        </span>
        <span className="amount-wrap font-bold text-emerald-700 tabular-nums">
          {formatPkr(saving)}
        </span>
      </p>
    </section>
  );
}
