interface MultiYearAllocationBarProps {
  takeHomePercent: number;
  taxPercent: number;
  label: string;
  /** `thin` sits under a table row; `thick` carries a card. */
  thickness?: 'thin' | 'thick';
}

/** How one fiscal year's gross splits between take-home and tax. */
export default function MultiYearAllocationBar({
  label,
  takeHomePercent,
  taxPercent,
  thickness = 'thin',
}: MultiYearAllocationBarProps) {
  return (
    <div
      aria-label={label}
      className={`flex w-full overflow-hidden rounded-full bg-gray-100 ${
        thickness === 'thin' ? 'h-1' : 'h-1.5'
      }`}
      role="img"
    >
      <div className="h-full bg-emerald-600" style={{ width: `${takeHomePercent}%` }} />
      <div className="h-full bg-red-600" style={{ width: `${taxPercent}%` }} />
    </div>
  );
}
