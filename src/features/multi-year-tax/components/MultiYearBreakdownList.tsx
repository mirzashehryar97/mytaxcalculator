import MultiYearBreakdownRow from '@/features/multi-year-tax/components/MultiYearBreakdownRow';
import { getBreakdownRows } from '@/features/multi-year-tax/lib/presentation';
import type { MultiYearResult } from '@/features/multi-year-tax/types';

interface MultiYearBreakdownListProps {
  result: MultiYearResult;
}

/** Tablet layout: the table's figures, stacked one compact row per year. */
export default function MultiYearBreakdownList({ result }: MultiYearBreakdownListProps) {
  return (
    <div className="space-y-2.5">
      {getBreakdownRows(result).map((row) => (
        <MultiYearBreakdownRow key={row.id} row={row} />
      ))}
    </div>
  );
}
