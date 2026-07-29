import type { ReactNode } from 'react';

interface TaxBreakdownCardProps {
  title: string;
  grossValue: string;
  taxValue: string;
  netValue: string;
  /** Row labels. Default to the salary/freelancer wording; override per sector. */
  grossLabel?: ReactNode;
  taxLabel?: ReactNode;
  netLabel?: ReactNode;
  taxNote?: ReactNode;
}

export default function TaxBreakdownCard({
  title,
  grossValue,
  taxValue,
  netValue,
  grossLabel = 'Gross Income',
  taxLabel = 'Tax',
  netLabel = 'Net Income',
  taxNote,
}: TaxBreakdownCardProps) {
  return (
    <section className="stat-card min-w-0 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
      <h3 className="mb-5 font-bold text-emerald-700 text-sm uppercase tracking-wider">{title}</h3>
      <div className="space-y-5">
        <div>
          <p className="flex items-center gap-1.5 text-gray-500 text-sm">{grossLabel}</p>
          <p className="amount-wrap font-semibold text-2xl text-gray-900 tabular-nums">
            {grossValue}
          </p>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-gray-500 text-sm">{taxLabel}</p>
          <p className="amount-wrap font-semibold text-2xl text-red-600 tabular-nums">{taxValue}</p>
          {taxNote}
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-gray-500 text-sm">{netLabel}</p>
          <p className="amount-wrap font-semibold text-2xl text-emerald-600 tabular-nums">
            {netValue}
          </p>
        </div>
      </div>
    </section>
  );
}
